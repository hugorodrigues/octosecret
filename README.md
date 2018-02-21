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
Encrypt "passwords.conf" file using github.com/hugorodrigues public key
```
$ octosecret encrypt hugorodrigues passwords.conf
```
This will generate "passwords.conf.hugorodrigues.octosecret". To decrypt:
```
$ octosecret decrypt passwords.conf.hugorodrigues.octosecret
```

You can also encrypt text.
```
$ octosecret encrypt hugorodrigues
```
It will promp for data and you can type/paste something. Will output:
```
---- BEGIN OCTOSECRET TO HUGORODRIGUES ----
gvs8mM18gJJAWu3TgO7s0Jv7WZ42pm5vCUGwlc+hGenCAaL0496QagYspgXg1Yn3
lb1Ep/gu4Jro3ZLslvmny3uzo6Y16cKamy5Ossay0y0YYTLchleca27K7g5BceS1
9S4teMGVfJ+re+pqXuC1vrJpL7epw0DWmdenbldIl01UMWcugGQrWZ9HdiWm8AsZ
yt6s+d/qceaL2qv4akwh8jMLAHr9/WQ384aa/BdcKd0hIVa3JdYxEC+YmQUFrlA9
hGQnLWxNDVvg6TSXR3/tC9XybGd7i04Uh4KZZMOQHGfv7BOWApnD/qcCkfD1jccC
kgOrO13eoAOLJaNlwXPtb82x8NDMiXc7q02mne+1ZfmG+EjJjeFS32ucyQlssyBU
7WaYDK///SYQ890jOAbew5rDYuj9+sBBhX7vy7YhzyVu2uFhAfOEErLTcMNiF8V9
QarPkzlaF8vmrUNyt0zog0YV+rZ/Bkwjc/qOKsarY11Gg3mFQBfRU03qLKeuumjf
Oz41H279DgGdq5uFN+hIGVRlqdWp8jBvyMG5/IQ0DpH7li5uHV6oxTMZ3tpdMj6m
LHDeC5qNbQJZqSUGhSVmoSMX/asy5gmG++0aTWD7j9lXlDQXJXPNyeZq2nYiopV+
5IICnNlhw7doM881aOfrVNxPLowHrWJRtCquoUQyARg=U2FsdGVkX18gpKcCLpV5
h/UOuHFqEXBf1DcncgVLtzM=
---- END OCTOSECRET TO HUGORODRIGUES ----
```



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

    Encrypt data using github.com/hugorodrigues public key.
    $ echo "Hello" | octosecret encrypt hugorodrigues

    Decrypt in interactive mode.
    $ octosecret decrypt

    Decrypt '/some/file.octosecret' using your private key.
    $ octosecret decrypt /some/file.octosecret

```
Check [octosecret-crypto](https://github.com/hugorodrigues/octosecret) if you need to use this programmatically.
