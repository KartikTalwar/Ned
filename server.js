
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
    connected = this;

    if(Config.joinAllRooms)
    {
        this.getRooms(function(err, items, stanza)
        {
            for(var i=0; i<items.length; i++)
            {
                var roomName = items[i]["jid"];
                Util.consoleLog('Joining: ' + roomName.toString().split('@')[0]);
                connected.join(roomName);
            }
        });
    }
    else
    {
        for (var i = 0; i < Config.roomsToJoin.length; i++) 
        {
            Util.consoleLog('Joining: ' + Config.roomsToJoin[i].toString().split('@')[0]);
            connected.join(Config.roomsToJoin[i]);
        }
    }
    
});



NedBot.onInvite(function(roomJid, fromJid, reason) 
{
    Util.consoleLog('Invited: ' + roomJid.toString().split('@')[0]);
    Util.consoleLog('Joining: ' + roomJid.toString().split('@')[0]);

    this.join(roomJid);

    this.getRoster(function(err, roster, stanza)
    {
        var from  = fromJid["user"]+"@"+fromJid["domain"];
        var group = roomJid["user"]+"@"+roomJid["domain"];
        
        for(var i=0; i<roster.length; i++)
        {
            var toCompare = roster[i]["jid"];
            if(from == toCompare)
            {
                var user = roster[i]["name"].toString().split(' ')[0];
                NedBot.message(group, "Thank you for the invite " + user);
                
                break;
            }
        }
    });
});



NedBot.onDisconnect(function() 
{
    var reconnect = setTimeout(function() 
    {
        Util.consoleLog('Reconnecting');
        this.connect();
    }, Config.reconnectWaitMs);

    Util.consoleLog('Disconnected');
});



NedBot.onError(function(message, stanza) 
{
    Util.consoleLog('Error: ' + message);
    Util.consoleLog('Disconnected');

    var reconnect = setTimeout(function()
    {
        Util.consoleLog('Reconnecting');
        this.connect();
    }, Config.reconnectWaitMs/10);
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


