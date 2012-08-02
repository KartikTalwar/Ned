// cross-module globals
Db      = require('sqlite3');
Config  = require('./config');
Util    = require('./lib/functions');
Brain   = require('./lib/brain');
http    = require('http');


Util.getFilesFromDir('plugins', function(err, files)
{
    plugins = {};

    for(var i=0; i<files.length; i++)
    {
        var plugin   = files[i];
        var toImport = './plugins/' + plugin.substring(plugin.indexOf('/'));
        var dontinc  = ['plugins/index.js', 'plugins/help.js'];

        if(!Util.in_array(plugin, dontinc) && plugin.split('.').pop() == "js")
        {
            var execute = require(toImport);
            var name    = execute.plugin.name;
            var trigger = execute.plugin.trigger;
            var enabled = execute.plugin.enabled.toLowerCase();
            var fuzzy   = execute.plugin.fuzzy;

            var details = {
                            "name"    : name,
                            "trigger" : trigger,
                            "fuzzy"   : fuzzy,
                            "run"     : execute[name]
                          };

            if(enabled == 'true')
            {
                plugins[name] = details;
            }
        }
    }
});


for(var i=0; i<Config.roomsToJoin.length; i++) 
{
    Config.roomsToJoin[i] = Config.customerID + Config.roomsToJoin[i] + '@' + Config.confServer;
}

var wobot = require('wobot');
var main  = "index.js";

NedBot = new wobot.Bot(
{
    debug    : Config.debugXMPP,
    jid      : Config.userID + '@' + Config.chatServer + '/bot',
    password : Config.password,
    name     : Config.name
});


NedBot.loadPlugin("main", require('./plugins/' + main));
NedBot.connect();


NedBot.onConnect(function() 
{
    Util.consoleLog('Connected');
    self = this;

    if(Config.joinAllRooms)
    {
        this.getRooms(function(err, items, stanza)
        {
            for(var i=0; i<items.length; i++)
            {
                var roomName = items[i]["jid"];
                Util.consoleLog('Joining: ' + roomName.toString().split('@')[0]);
                
                if(!in_array(roomName, Config.roomsNotToJoin))
                {
                    self.join(roomName);
                }
            }
        });
    }
    else
    {
        for (var i=0; i<Config.roomsToJoin.length; i++) 
        {
            Util.consoleLog('Joining: ' + Config.roomsToJoin[i].toString().split('@')[0]);
            self.join(Config.roomsToJoin[i]);
        }
    }
});



NedBot.onInvite(function(roomJid, fromJid, reason)
{
    Util.consoleLog('Invited: ' + roomJid.toString().split('@')[0]);
    Util.consoleLog('Joining: ' + roomJid.toString().split('@')[0]);

    self = this;
    self.join(roomJid);

    self.getRoster(function(err, roster, stanza)
    {
        var from  = fromJid["user"] + "@" + fromJid["domain"];
        var group = roomJid["user"] + "@" + roomJid["domain"];

        for(var i=0; i<roster.length; i++)
        {
            var toCompare = roster[i]["jid"];
            if(from == toCompare)
            {
                var user = roster[i]["name"].toString().split(' ')[0];
                self.message(group, "Thank you for the invite " + user + "!");

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
    self = this;

    var reconnect = setTimeout(function()
    {
        Util.consoleLog('Reconnecting');
        self.connect();
    }, Config.reconnectWaitMs);
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
    Util.consoleLog('Attempting to reconnect..');
    Util.consoleLog('You should still try to restart me manually');

    memory.serialize(function() 
    {
        try
        {
            memory.get("SELECT * FROM Debug ORDER BY time DESC LIMIT 1", function(err, row)
            {
                var tm = Config.customerID + Util.chooseRandom(Config.admins) + "@" + Config.chatServer;
                var ts = Math.round(new Date().getTime() / 1000);

                NedBot = new wobot.Bot(
                {
                    debug    : Config.debugXMPP,
                    jid      : Config.userID + '@' + Config.chatServer + '/bot',
                    password : Config.password,
                    name     : Config.name
                });

                if( (ts - row["time"]) >= Config.imBrokenMsgFreq * 60 )
                {
                    var counter = row["attempts"] + 1;

                    NedBot.connect();
                    NedBot.onConnect(function()
                    {
                        this.message(tm, Config.imBrokenMessage);
                        Util.consoleLog(Config.imBrokenMessage);
                    });

                    memory.run("INSERT INTO Debug(user, attempts, time) VALUES (?, ?, ?)", [tm, counter, ts]);
                    NedBot.disconnect();
                }
            });
        }
        catch (err)
        {
            Util.consoleLog(err);
        }
    });
});

