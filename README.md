# octosecret
Simple and secure encryption between github users

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## How it works
This tool can encrypt/decrypt files or streams of data. Data will be encrypted using the public key of the github user you specify. Decryption will use your private key (typically located at ~/.ssh/id_rsa). Check [octosecret-crypto](https://github.com/hugorodrigues/octosecret) for implementation details.

## Install
```
$ npm install -g octosecret
```

## Usage
Encrypt "/some/sensitive.file" using github.com/hugorodrigues public key
```
$ octosecret encrypt hugorodrigues /some/sensitive.file

Success! You file has been saved to /some/sensitive.file.hugorodrigues.octosecret
```

To decrypt
```
$ octosecret decrypt sensitive.file.hugorodrigues.octosecret

Success! You file has been saved to sensitive.file
```

You can also encrypt text:
```
$ octosecret encrypt hugorodrigues
```
It will prompt for data and you can type/paste something. Will output the final encrypted data:
```
---- BEGIN OCTOSECRET TO HUGORODRIGUES ----
gvs8mM18gJJAWu3TgO7s...JRtCquoUQgVLtzM=
---- END OCTOSECRET TO HUGORODRIGUES ----
```


## API
This project is a CLI, if you need to make something programatically you can use [octosecret-crypto](https://github.com/hugorodrigues/octosecret).
```

  Usage:
    $ octosecret [command] [args]

  Commands:
    encrypt [github username] [file]    Encrypt using github user public key
    decrypt [file]                      Decrypt using your private key
    
```


## Examples
Start encryption in interactive mode where you can paste your data
```
$ octosecret encrypt
```

Start decryption in interactive mode where you can paste the data to decrypt
```
$ octosecret decrypt
```

Encrypt '/some/file' using github.com/hugorodrigues public key.
```
$ octosecret encrypt hugorodrigues /some/file
```

Encrypt data using github.com/hugorodrigues public key.
```
$ echo "Hello world" | octosecret encrypt hugorodrigues
```
    

## License

MIT © [Hugo Rodrigues](https://hugorodrigues.com)

