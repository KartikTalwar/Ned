module.exports.load = function(bot) 
{
    var callerRegEx = new RegExp("(.+)$", "i");
    
    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(callerRegEx, onMessage);
};


var onMessage = function(channel, frm, msg, x)
{
    var self             = this;
    var isPrivateMessage = (arguments.length == 3) ? true : false;
    var from             = isPrivateMessage ? '' : frm;
    var tempMessage      = isPrivateMessage ? frm : msg;
    var roomName         = channel.split('@')[0];
    var isSingleWord     = (tempMessage.indexOf(" ") == -1) ? true : false;

    var ned              = (isPrivateMessage) ? Util.NedPMName.source : Util.NedName.source + "( ?)";
    var regEx            = new RegExp(Util.NedCaller.source + ned, "i");

    var message          = tempMessage.replace(regEx, '');
    var isPrivate        = (isPrivateMessage) ? true : false;
    var message          = message.split("+").join("%2B");
    var input            = message;
    var firstName        = '';


    if(!isPrivate) { firstName = from.split(' ')[0]; }

    print = function(txt)
    {
        console.log(txt);
    }

    sendMessage = function(txt, group)
    {
        var ch = (typeof group == 'undefined') ? channel : group;
        self.message(ch, txt);

        return true;
    }

    Util.getFilesFromDir('plugins', function(err, files)
    {
        plugins = {};

        params  = {
                   'message'    : message,
                   'fullMessage': tempMessage,
                   'from'       : from,
                   'firstName'  : firstName,
                   'channel'    : channel,
                   'room'       : roomName.split('_')[1],
                   'isPrivate'  : isPrivate,
                   'isEmpty'    : ''
                  }


        for(var i=0; i<files.length; i++)
        {
            var plugin   = files[i];
            var toImport = '.' + plugin.substring(plugin.indexOf('/'));
            var dontinc  = ['plugins/index.js', 'plugins/help.js'];

            if(!Util.in_array(plugin, dontinc) && plugin.split('.').pop() == "js" )
            {
                var execute = require(toImport);
                var name    = execute.plugin.name;
                var trigger = execute.plugin.trigger;
                var enabled = execute.plugin.enabled.toLowerCase();
                var fuzzy   = execute.plugin.fuzzy;
                var details = { "name" : name, "trigger" : trigger, "fuzzy" : fuzzy, 'run' : execute[name] };

                if(enabled == 'true')
                {
                    plugins[name] = details;
                }
            }
        }


        var getTerm = function(msg, list)
        {
            var terms = "(" + list.join('|') + ")";
            var clean = msg.replace(RegExp(terms, "i"), '');

            return Util.clarify(clean);
        }


        var analyze = function(message, tempMessage, plugins)
        {
            for(i in plugins)
            {
                var id   = i;
                var det  = plugins[id];
                var trig = det.trigger;
                var fuzz = det.fuzzy;

                if(typeof trig == "object")
                {
                    var regex = new RegExp(Util.NedCaller.source + ned, "i");

                    if(tempMessage.match(regex))
                    {
                        var threshold = (fuzz == "true") ? 0.80 : 0.99;
                        var closest   = Util.getClosest(message, trig, threshold);

                        if(closest != null)
                        {
                            if(!closest[1])
                            {
                                var brk = closest[0].split(' ');

                                if(typeof brk == "object")
                                {
                                    message = message.split(' ').splice(brk.length).join(' ');
                                }
                                else
                                {
                                    message = message.substring(brk.length);
                                }
                            }

                            params.message  = getTerm(message, plugins[id].trigger);
                            params.isEmpty  = (params.message.split(' ').join('').length == 0 || params.message.length == 0) ? true : false;
                            params.pluginId = id;

                            return id;
                        }
                    }
                }
                else
                {
                    var regex = new RegExp(trig, 'i');
                    if(tempMessage.match(regex))
                    {
                        params.pluginId = id;
                        return id;
                    }
                }
            }

            return null;
        }

        var makeSense = analyze(message, tempMessage, plugins);

        if(makeSense != null)
        {
            plugins[makeSense].run(params);
        }
        else
        {
            if(params.message.length == 0)
            {
                sendMessage(Util.greet());
            }
            else
            {
                var regex = ned + "([Ww]ho|[Ww]hat|[Ww]hen|[Ww]here|[Ww]hy).*$";

                if(params.fullMessage.match(regex))
                {
                    plugins["wolfram"].run(params);
                }
                else
                {
                    if(params.fullMessage.match(ned + ".*$") && Util.triggersRandom([2, 4, 6]))
                    {
                        plugins["wolfram"].run(params);
                    }
                }
            }
        }

    });

    return true;
};
