# Ned Bot - Artificial Intelligence for HipChat


## About

#### Ned is an XMPP bot, build on top of `wobot` that adds useful features like doing web searches, todo lists, weather information and much more to HipChat and allows you to have access to external data without the trouble of leaving your chat window.


**Why is it called Ned?**

Because, Skynet was taken.


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


## Plugin Development


**Here is the template for a plugin**

Place the plugin inside the `/plugins` directory and it will automatically be included


```js
var plugin = {
              name        : 'greet',                        // must be unique
              trigger     : ['hi', 'hello'],                // prefix ned
          //  trigger     : "([Nn]ed (hi|hello|yo).*)$",    // can also use regex
              enabled     : 'true',                         // plugin can be inactive
              fuzzy       : 'true',                         // autocorrect mispelled trigger
              description : 'Greets a user',                // about the plugin
              usage       : 'ned hi'                        // usage example
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{

    /* Available Data: */

    // get.message
    // get.from
    // get.firstName
    // get.roomName
    // get.fullMessage
    // get.isPrivate
    // get.isEmpty

    var response = "Hello, " + get.fistName + "from " + get.roomName;
    sendMessage(response);
    
    return true;
}
```


## Authors

- Kartik Talwar
- Misha Nasleodov


## Legal Stuff

Copyright (C) 2012 Kartik Talwar. See [LICENSE](https://github.com/KartikTalwar/Ned/blob/master/LICENSE) for details.

