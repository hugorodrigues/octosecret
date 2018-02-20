# octosecret
Simple and secure encryption between github users


## How it works
This tool can encrypt/decrypt files or streams of data. Data will be encrypted using the public key of the github user you specify. Decryption will use your private key (typically located at ~/.ssh/id_rsa). Check [octosecret-crypto](https://github.com/hugorodrigues/octosecret) for implementation details.

## API
```

  Usage:
    $ octosecret [command] [args]

  Commands:
    encrypt [github username] [file]    Encrypt using github user public key
    decrypt [file]                      Decrypt using your private key

  How it works:
    This tool will encrypt/decrypt files or streams. Data will be encrypted
    using the public key of the github user you specify. Decryption will use
    your private key (located at ~/.ssh/id_rsa)

  Examples:
    Start encryption in interactive mode.
    $ octosecret encrypt

    Encrypt '/some/file' using github.com/hugorodrigues public key.
    $ octosecret encrypt hugorodrigues /some/file

    Encrypt data using github.com/hugorodrigues public key.
    $ echo "Hello" | octosecret encrypt hugorodrigues

    Decrypt in interactive mode.
    $ octosecret decrypt

    Decrypt '/some/file.octosecret' using your private key.
    $ octosecret decrypt /some/file.octosecret
    
```
Check [octosecret-crypto](https://github.com/hugorodrigues/octosecret) if you need to use this programatically.
