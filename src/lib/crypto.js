const wrap = require('word-wrap')
const tmp = require('tmp')
const octosecret = require('octosecret-crypto')

const Github = require('./github')
const cli = require('./cli')

/**
 * Crypto Helpers
 *
 * @class Crypto
 */
class Crypto {
  /**
   * Start encrypt process based on user input
   * @param {Object} input
   */
  async encrypt (input) {
    // Ask for the github username if none provided
    if (!input.username) {
      input.username = await cli.promptUsername()
      input.username = input.username.username
    }

    // Ask for data if no file or stdin provided
    if (!input.stdin && !input.file) {
      input.stdin = await cli.promptData('Enter or paste the text you want to encrypt:')
    }

    // Create temp folder to save public keys
    const tempFolder = tmp.dirSync({ unsafeCleanup: true })

    try {
      // Get user public keys
      const userKeys = await Github.getUserKey(input.username)
      // Save keys to a temp folder
      input.userKeyPaths = await Github.saveUserKeys(userKeys, tempFolder.name)
    } catch (e) {
      throw new Error(`Error fetching github key for user "${input.username}"`)
    }

    try {
      if (input.file) {
        // Final destination of encrypted file
        const destination = `${input.file}.${input.username}.octosecret`
        // Encrypt file
        await octosecret.file.encrypt(input.file, destination, input.userKeyPaths)
        // Output
        console.log(`Success! You file has been saved to ${destination}`)
      } else {
        // Encrypt buffer
        const output = await octosecret.stream.encrypt(input.stdin, input.userKeyPaths)
        // Pack output using the template
        const outputPacked = this.payloadPack(input.username, output)
        // Clear console
        cli.promptClean()
        // Output
        console.log(outputPacked)
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * Start decrypt process based on user input
   * @param {Object} input
   */
  async decrypt (input) {
    // Ask for data if no file or stdin provided
    if (!input.stdin && !input.file) {
      input.stdin = await cli.promptData('Enter or paste the data you want to decrypt:')
      // Give and empty line after prompt
      console.log('')
    }

    try {
      if (input.file) {
        // Final destination of encrypted file
        const destination = this.filenameReverse(input.file)
        // Decrypt
        await octosecret.file.decrypt(input.file, destination)
        console.log(`Success! You file has been saved to "${destination}"`)
      } else {
        // Unpack the input (Remove comments, nl, etc)
        const payload = this.payloadUnPack(input.stdin)
        // Decrypt
        const output = await octosecret.stream.decrypt(payload)
        // Clear console
        cli.promptClean()
        console.log(`---- BEGIN DECRYPTED MESSAGE ----\n${output}\n---- END DECRYPTED MESSAGE ----`)
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  // Temp solution
  filenameReverse (file) {
    // Remove extension, twice
    file = file.replace(/\.[^/.]+$/, '')
    file = file.replace(/\.[^/.]+$/, '')
    return file
  }

  /**
   * Pack payload into a convenient format
   *
   * @param {String} username
   * @param {String} content
   * @returns {String}
   * @memberof CLI
   */
  payloadPack (username, content) {
    username = username.toUpperCase()
    // Wrap text around 64 cols
    const folded = wrap(content, {width: 64, cut: true, indent: ''})
    // Build the output
    const output = []
    output.push(`---- BEGIN OCTOSECRET TO ${username} ----`)
    output.push(folded)
    output.push(`---- END OCTOSECRET TO ${username} ----`)
    return output.join('\n')
  }

  /**
   * Unpack payload by removing all non base64 lines
   *
   * @param {any} content
   * @returns {String}
   * @memberof CLI
   */
  payloadUnPack (content) {
    // Split into lines
    let output = content.split('\n')
    let outputTrim = []
    // This will match non base64 chars
    var invalidBase64 = RegExp('[^A-Za-z0-9+/=]')

    // Iterate each line and trim
    output.forEach(element => {
      element = element.trim()
      // Only save valid base64 lines
      if (element && !invalidBase64.test(element)) {
        outputTrim.push(element)
      }
    })

    // Return content into one liner
    return outputTrim.join('')
  }
}

module.exports = new Crypto()
