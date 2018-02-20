const got = require('got')

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

      // User may have multiple keys
      const keys = response.body.split('\n')
      // Get first one
      const key = keys[0]

      // trim the "ssh-rsa " from the key
      this.cache[username] = key
      return this.cache[username]
    } catch (error) {
      throw new Error('Cant fetch key from github.com')
    }
  }
}

module.exports = new Github()
