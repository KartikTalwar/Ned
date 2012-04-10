
// cross-module globals
Db      = require('sqlite3');
Config  = require('./config');
Util    = require('./lib/functions');
Brain   = require('./lib/brain');
http    = require('http');


var wobot = require('wobot');

NedBot = new wobot.Bot(
{
    debug: Config.debugXMPP,
    jid: Config.jid,
    password: Config.password,
    name: Config.name
});



for (var i = 0; i < Config.pluginsToLoad.length; i++) 
{
    NedBot.loadPlugin(Config.pluginsToLoad[i].name, require('./plugins/' + Config.pluginsToLoad[i].path));
}

NedBot.connect();



NedBot.onConnect(function() 
{
    Util.consoleLog('Connected');

    for (var i = 0; i < Config.rooms.length; i++) 
    {
        Util.consoleLog('Joining: ' + Config.rooms[i].toString().split('@')[0]);
        this.join(Config.rooms[i]);
    }
});



NedBot.onInvite(function(roomJid, fromJid, reason) 
{
    Util.consoleLog('Invited: ' + roomJid.toString().split('@')[0]);
    Util.consoleLog('Joining: ' + roomJid.toString().split('@')[0]);

    this.join(roomJid);
});



NedBot.onDisconnect(function() 
{
    var self = this;

    var reconnect = setTimeout(function() 
    {
        Util.consoleLog('Reconnecting');
        self.connect();
    }, Config.reconnectWaitMs);

    Util.consoleLog('Disconnected');
});



NedBot.onError(function(message, stanza) 
{
    Util.consoleLog('Error: ' + message);
});



NedBot.onMessage(function(channel, from, message) 
{
    Util.consoleLog('Message: ' + from + ' in ' + channel.toString().split('@')[0] + ' said: ' + message);
});



NedBot.onPrivateMessage(function(jid, message) 
{
    Util.consoleLog('PM     : ' + jid.toString().split('@')[0] + ' said: ' + message);
});



process.on('uncaughtException', function(err) 
{
    Util.consoleLog('Caught exception: ' + err);
});


