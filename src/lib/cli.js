const readline = require('readline')
const inquirer = require('inquirer')
const chalk = require('chalk')
const wrap = require('word-wrap')
const tmp = require('tmp')
const fs = require('fs-extra')

const Github = require('./github')
const octosecret = require('octosecret-crypto')

/**
 * CLI Helpers
 *
 * @class CLI
 */
class CLI {
  /**
   * Prompt data (Like a text editor)
   * @returns
   * @memberof CLI
   */
  promptData () {
    console.log(`${chalk.green('?')} ${chalk.bold('Enter the text/data you want to encrypt:')} (Press CTRL+C when you are done)]\n`)
    return new Promise((resolve, reject) => {
      const lines = []
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.on('line', input => {
        lines.push(input)
      })

      rl.on('close', input => {
        let finalInput = lines.join('\n')
        resolve(finalInput)
      })
    })
  }

  /**
   * Prompt and validate github username
   *
   * @returns
   * @memberof CLI
   */
  promptUsername () {
    var question = {
      type: 'input',
      name: 'username',
      message: 'Github username:',
      validate: async function (value) {
        try {
          // Validate username and fetch key
          await Github.getUserKey(value)
          return true
        } catch (e) {
          return e
        }
      }
    }

    return inquirer.prompt(question)
  }

  /**
   * Start encrypt process based on user input
   * @param {Object} input
   */
  async encrypt (input) {
    // Ask for the github username if none provided
    if (!input.username) {
      input.username = await this.promptUsername()
    }

    // Ask for data if no file or stdin provided
    if (!input.stdin && !input.file) {
      input.stdin = await this.promptData()
    }

    try {
      // Get user public key
      input.userKey = await Github.getUserKey(input.username)
      // Save key to a temp file
      input.userKeyPath = tmp.fileSync().name
      await fs.outputFile(input.userKeyPath, input.userKey)
    } catch (e) {
      throw new Error('Error getting github key')
    }

    if (input.file) {
      // Final destination of encrypted file
      const destination = `${input.file}.${input.username}.octosecret`
      // Encrypt file
      await octosecret.file.encrypt(input.file, destination, input.userKeyPath)
      // Output
      console.log(`Success! You file has been saved to ${destination}`)
    } else {
      // Encrypt buffer
      const output = await octosecret.buffer.encrypt(input.stdin, input.userKeyPath)
      // Pack output using the template
      const outputPacked = this.bufferPack(input.username, output)
      // Clear console
      process.stdout.write('\x1B[2J\x1B[0f')
      // Output
      console.log(outputPacked)
    }
  }

  /**
   * Start decrypt process based on user input
   * @param {Object} input
   */
  async decrypt (input) {
    // Ask for data if no file or stdin provided
    if (!input.stdin && !input.file) {
      input.stdin = await this.promptData()
    }

    try {
      if (input.file) {
        // Final destination of encrypted file
        const destination = `${input.file}.${input.username}.octosecret`
        await octosecret.file.decrypt(input.file, destination, input.userKey)
        console.log(`Success! You file has been saved to ${destination}`)
      } else {
        const payload = this.bufferUnPack(input.stdin)

        const output = await octosecret.buffer.decrypt(payload)

        // process.stdout.write('\x1B[2J\x1B[0f')
        console.log(`---- BEGIN DECRYPTED MESSAGE ----\n${output}\n---- END DECRYPTED MESSAGE ----`)
      }
    } catch (e) {
      console.log('ddd', e)
    }

    // console.log('decrypt', data)
  }

  bufferPack (username, content) {
    username = username.toUpperCase()

    const maxWidth = 64
    const folded = wrap(content, {width: maxWidth, cut: true, indent: ''})
    const output = []
    output.push(`---- BEGIN OCTOSECRET TO ${username} ----`)
    output.push(folded)
    output.push(`---- END OCTOSECRET TO ${username} ----`)

    return output.join('\n')
  }

  bufferUnPack (content) {
    let output = content.split('\n')
    let outputTrim = []
    var invalidBase64 = RegExp('[^A-Za-z0-9+/=]')

    output.forEach(element => {
      element = element.trim()

      if (element && !invalidBase64.test(element)) {
        outputTrim.push(element)
      }
    })

    return outputTrim.join('')
  }

  // boot();
}

module.exports = new CLI()
