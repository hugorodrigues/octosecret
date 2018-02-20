#!/usr/bin/env node
const meow = require('meow')
const getStdin = require('get-stdin')
const chalk = require('chalk')
const CLI = require('./lib/cli')

const cmd = meow(`
${chalk.bold('Usage:')}
  $ octosecret [command] [args]

${chalk.bold('Commands:')}
  encrypt [github username] [file]    Encrypt using github user public key
  decrypt [file]                      Decrypt using your private key

${chalk.bold('How it works:')}
  This tool will encrypt/decrypt files or streams. Data will be encrypted
  using the public key of the github user you specify. Decryption will use
  your private key (located at ~/.ssh/id_rsa)

${chalk.bold('Examples:')}
  ${chalk.grey('Start encryption in interactive mode.')}
  $ octosecret encrypt

  ${chalk.grey(`Encrypt '/some/file' using github.com/hugorodrigues public key.`)}
  $ octosecret encrypt hugorodrigues /some/file

  ${chalk.grey('Encrypt data using github.com/hugorodrigues public key.')}
  $ echo "Hello" | octosecret encrypt hugorodrigues

  ${chalk.grey('Decrypt in interactive mode.')}
  $ octosecret decrypt

  ${chalk.grey(`Decrypt '/some/file.octosecret' using your private key.`)}
  $ octosecret decrypt /some/file.octosecret
`)

const boot = async function () {
  // Get main command
  const command = cmd.input[0]
  // Get input from stdin
  const stdin = await getStdin()

  switch (command) {
    case 'encrypt':
      // Start encryption cli
      CLI.encrypt({
        stdin,
        username: cmd.input[1],
        file: cmd.input[2]
      })
      break
    case 'decrypt':
      // Start decryption cli
      CLI.decrypt({
        stdin,
        file: cmd.input[2]
      })
      break
    default:
      // Show help
      cmd.showHelp()
      process.exit(1)
  }
}

boot()
