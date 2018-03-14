require('babel-register')({
  // Ignore node_modules except octosecret-crypto
  ignore: /node_modules\/(?!octosecret-crypto)/
})

// Load the cli app
require('./cli')
