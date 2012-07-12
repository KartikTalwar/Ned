# Ned Bot - Artificial Artificial Intelligence for HipChat


## About

Ned is an XMPP bot, build on top of `wobot` that adds useful features like doing web searches, todo lists, weather information and much more to HipChat and allows you to have access to external data without the trouble of leaving your chat window.


### Why is it called Ned?

Because, Skynet was taken.


## Installation

### Dependencies

- Node.js
- NPM
- libexpat1
- libicu


##### Click here for detailed instructions on [Installing Dependencies] (https://github.com/KartikTalwar/Ned/wiki/Installing-Dependencies)


### Installing Ned


**Downloading the files**

```
$ git clone https://github.com/KartikTalwar/Ned.git
$ cd Ned
$ cp config.sample.js config.js
```

**Installing Node Packages**

This should be installed in the same folder such that a folder `Ned/node_modules` exists

```
$ npm install wobot
$ npm install request
$ npm install sqlite3
$ npm install node-stringprep
```

## Configuring the Bot

**Editing `config.js`**


|    **Setting**     |                                   **Value**                                     |
|:------------------:|:-------------------------------------------------------------------------------:|
|  *confServer*      |  Usually **`conf.hipchat.com`**                                                 |
|  *chatServer*      |  Usually **`chat.hipchat.com`**                                                 |
|  *userID*          |  The user id of the bot (generally **customerid_userid**)                       |
|  *password*        |  Password for the id above                                                      |
|  *name*            |  Should be **Ned Bot** since it replys to *ned + command*                       |
|  *city*            |  The local city for weather details                                             |
|  *admins*          |  The userid (number after customer id) for other users for `simon says` plugin  |
|  *roomsToJoin*     |  Array of room names (spaces with **_** ) that it will join upon start          |
|  *roomsNotToJoin*  |  Array of room names that it will never join unless invited                     |
|  *apiKeys*         |  API keys for different services for plugins                                    |


## Starting the Bot

### Service

```sh
$ node server.js
```


## Plugin Development


**Here is the template for a plugin**

Place the plugin inside the `/plugins` directory and it will automatically be included


```js
var plugin = module.exports.plugin = 
             {
                name        : 'greet',                        // must be unique
                trigger     : ['hi', 'hello'],                // prefix ned
                // trigger  : "([Nn]ed (hi|hello|yo).*)$",    // can also use regex
                enabled     : 'true',                         // plugin can be inactive
                fuzzy       : 'true',                         // autocorrect mispelled trigger
                description : 'Greets a user',                // about the plugin
                usage       : 'ned hi'                        // usage example
             };


module.exports[plugin.name] = function(get)
{
    /* Available Methods: */

    // get.from              get.firstName              get.roomName
    // get.message           get.fullMessage 
    // get.isPrivate         get.isEmpty

    var response = "Hello, " + get.fistName + "from " + get.roomName;
    sendMessage(response);
    
    return true;
}
```


## Authors

- Kartik Talwar
- Misha Nasleodov


## Legal Stuff

Copyright (C) 2012 Kartik Talwar. See [LICENSE](https://github.com/KartikTalwar/Ned/blob/master/LICENSE.md) for details.

