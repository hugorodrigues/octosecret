const got = require('got')
const fs = require('fs-extra')

/**
 * Github utilities
 *
 * @class Github
 */
class Github {
  constructor () {
    // Add internal cache
    this.cache = {}
  }

  /**
   * Validates a github username
   * @param {String} username Github username
   * @memberof Github
   */
  validUser (username) {
    // Code from github-username-regex
    const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
    return regex.test(username)
  }

  /**
   * Fetch the RSA public key from a github user
   * @param {*} username
   * @returns {String} RSA public key
   * @memberof Github
   */
  async getUserKey (username) {
    // If in cache return immediately
    if (this.cache[username]) {
      return this.cache[username]
    }

    // Validate username format
    if (!this.validUser(username)) {
      throw new Error('Invalid username format')
    }

    try {
      // Get key from github
      const response = await got(`https://github.com/${username}.keys`)

      // Sometimes the user dont have any key associated
      if (response.body === '') {
        throw new Error('This user dont have a key on github.com')
      }

      // Add keys to the cache
      this.cache[username] = response.body.trim().split('\n')

      return this.cache[username]
    } catch (error) {
      throw new Error('Cant fetch key from github.com')
    }
  }

  /**
   * Save keys to disk
   * @param {Array} keys
   * @param {String} path
   */
  async saveUserKeys (keys, path) {
    const keyPaths = []

    // Save every key to disk
    for (const i in keys) {
      const keyPath = `${path}/public_key_${i}`
      await fs.outputFile(keyPath, keys[i])
      keyPaths.push(keyPath)
    }

    return keyPaths
  }
}

module.exports = new Github()
