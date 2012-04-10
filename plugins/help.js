var plugins = require('../config').pluginsToLoad;

var trigger = ['help', 'usage', 'man ned'];

GLOBAL.nothingFound = true;

module.exports.load = function(bot) 
{
    var assembleInput = "("+trigger.join("|")+")";    
    var callerRegEx   = new RegExp(Util.NedCaller.source + Util.NedName.source   + " " + assembleInput + "(.*)$", "i");
    var pmCallerRegEx = new RegExp(Util.NedCaller.source + Util.NedPMName.source + ""  + assembleInput + "(.*)$", "i");

    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(pmCallerRegEx, onPm);
    
    helpMessage = 'Hello!\nIn public chat you must prefix commands with \'ned\' or I will not reply.\nAll commands:';

    for (var p in plugins){
        var plugin = require('./'+plugins[p].path);
        for (h in plugin.help)
        {
            var help = plugin.help[h];
            helpMessage += '\n\n=> ' + help.usage + (help.description ? '\n   ' + help.description : '');
        }
    }
};

var helpMessage;

var onMessage = function(channel, from, message) 
{
    resp = "I can currently help you with these commands:\n@ned +\n\n=> ";
    aft  = '\n\nFor more detailed usage, please message me with `help` in private chat';
    arr = '';
    for (var p in plugins){
        var plugin = require('./'+plugins[p].path);
        for (h in plugin.help)
        {
            var h = plugin.help[h];
            arr += h.usage.split(' OR')[0] + ", ";
        }
    }
    this.message(channel, resp+arr+aft);
    return true;
};


var onPm = function(jid, message) 
{
    this.message(jid, helpMessage);
    return true;
};
