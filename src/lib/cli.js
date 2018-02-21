const readline = require('readline')
const inquirer = require('inquirer')
const chalk = require('chalk')
const Github = require('./github')

/**
 * CLI Helpers
 *
 * @class CLI
 */
class CLI {
  /**
   * Clear console
   *
   * @memberof CLI
   */
  promptClean () {
    process.stdout.write('\x1B[2J\x1B[0f')
  }

  /**
   * Prompt data (Like a text editor)
   * @returns
   * @memberof CLI
   */
  promptData () {
    console.log(`${chalk.green('?')} ${chalk.bold('Enter the text/data you want to encrypt:')} ${chalk.grey('(Press CTRL+C when you are done)')}\n`)
    return new Promise((resolve, reject) => {
      const lines = []

      // Start a new prompt
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      // Every time there is a newline save it for later
      rl.on('line', input => {
        lines.push(input)
      })

      // On CTRL+C we receive this event and we going to add a nl in case the user haven't
      rl.on('SIGINT', () => {
        rl.write('\n')
        rl.close()
      })

      // On close, process and resolve the promise
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
}

module.exports = new CLI()
