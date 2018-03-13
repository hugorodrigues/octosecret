# octosecret
Simple and secure encryption between github users

## What is it?
A convenient way to encrypt files (or text) that only a specific github user can read. After encryption, **you send** the data to the user for decryption.

## How it works?
**Everything happens locally and no data is transmitted.** Data will be encrypted using the **public key** of the github user you specify. Decryption will use your **local private key**. Check [octosecret-crypto](https://github.com/hugorodrigues/octosecret) for more implementation details.

## Install
```
$ npm install -g octosecret
```

## Files
Encrypt *"/some/sensitive.file"* using *github.com/hugorodrigues* public key:
```
$ octosecret encrypt hugorodrigues /some/sensitive.file

Success! You file has been saved to /some/sensitive.file.hugorodrigues.octosecret
```

To decrypt:
```
$ octosecret decrypt /some/sensitive.file.hugorodrigues.octosecret

Success! You file has been saved to /some/sensitive.file
```

## Text
For convenience, you can also encrypt text. The following command will allow you to type (or paste) the text you want to encrypt. The output will be the final encrypted data you should send to the other user:
```
$ octosecret encrypt hugorodrigues
```

To decrypt text just run and paste the output or the previous command:
```
$ octosecret decrypt
```


## API
This project is a CLI, if you need to make something programmatically please check [octosecret-crypto](https://github.com/hugorodrigues/octosecret).
```

  Usage:
    $ octosecret [command] [args]

  Commands:
    encrypt [github username] [file]    Encrypt using github user public key
    decrypt [file]                      Decrypt using your private key
    
```


## More examples
Start encryption in interactive mode
```
$ octosecret encrypt
```

Start decryption in interactive mode
```
$ octosecret decrypt
```

Encrypt data using github.com/hugorodrigues public key
```
$ echo "Hello world" | octosecret encrypt hugorodrigues
```

Decrypt data using your local private key
```
$ echo "11gYhIZTNTbYfT..." | octosecret decrypt
```

## License

MIT © [Hugo Rodrigues](https://hugorodrigues.com)

