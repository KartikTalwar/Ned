# Ned Bot - Artificial Intelligence for HipChat


## About

#### Ned is an XMPP bot, build on top of `wobot` that adds useful features like doing web searches, todo lists, weather information and much more to HipChat and allows you to have access to external data without the trouble of leaving your chat window.


## Installation

### Dependencies
----------------------------

**Node.js**

```sh
$ wget http://nodejs.org/dist/v0.6.13/node-v0.6.13.tar.gz
$ cd node-v0.6.13
$ sudo ./configure
$ sudo make
$ sudo make install
```

**NPM**

```sh
$ sudo curl http://npmjs.org/install.sh | sh
```


**Various Packages**

```sh 
$ sudo apt-get install libexpat1-dev
$ sudo apt-get install libicu-dev
```

### Installing Ned
----------------------------

**Downloading the files**

```
$ git clone https://github.com/KartikTalwar/Ned.git
$ cd Ned
$ npm install wobot
$ npm install request
$ npm install sqlite3
$ npm install node-stringprep
```


## Starting the Bot

### Service

```sh
$ node server.js
```

#### Logging

```sh
$ node server.js | tee log.txt
```

## Authors

- Kartik Talwar
- Misha Nasleodov


## Legal Stuff

Copyright (C) 2012 Kartik Talwar. See [LICENSE](https://github.com/KartikTalwar/Ned/blob/master/LICENSE) for details.

