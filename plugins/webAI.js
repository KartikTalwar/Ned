
module.exports.load = function(bot) 
{
//
    var trigger = /(.+)$/;
    var callerRegEx = new RegExp(trigger.source, "i");
    var pmCallerRegEx = new RegExp(Util.NedCaller.source + Util.NedPMName.source + trigger.source + "(.*)$", "i");
    
    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(pmCallerRegEx, onMessage);
};


var onMessage = function(channel, frm, msg, x) 
{
    var self             = this;
    var isPrivateMessage = (arguments.length == 3) ? true : false;
    var from             = isPrivateMessage ? '' : frm;
    var tempMessage      = isPrivateMessage ? frm : msg;
    var roomName         = channel.split('@')[0];
    var isSingleWord     = (tempMessage.indexOf(" ") == -1) ? true : false;

    var caller           = /^([\@\!\#\$\~\%\/\\/]*)?/;
    var ned              = (isPrivateMessage && isSingleWord) ? 
                           /([Nn][Ee][Dd][Dd]?([Dd]?[Aa][Rr][Dd])?(( *[^A-Za-z0-9]* *))?)?$/ :
                           /([Nn][Ee][Dd][Dd]?([Dd]?[Aa][Rr][Dd])?(( *[^A-Za-z0-9]* *))? ?)?/; 

    var regEx            = new RegExp(caller.source + ned.source, "i");
    var message          = tempMessage.replace(regEx, '');
    var isPrivate        = (isPrivateMessage) ? 1 : 0;
    var message          = message.split("+").join("%2B");


    var firstName = '';
    
    if(!isPrivate) { firstName = from.split(' ')[0];}


    var input = message;
    
    print = function(txt) { console.log(txt); }

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
                   'message' : message, 
                   'fullMessage': tempMessage,                    
                   'from' : from,
                   'firstName' : firstName,
                   'channel' : channel,
                   'room' : roomName.split('_')[1],
                   'isPrivate': isPrivate,
                   'isEmpty' : ''
                   }      
                   
                           
        for(var i=0; i<files.length; i++)
        {
            var plugin   = files[i];
            var toImport = '.' + plugin.substring(plugin.indexOf('/'));
            
            var inc = ['plugins/webAI.js', 'plugins/help.js'];

            if(!Util.in_array(plugin, inc))
            {
                var execute = require(toImport);
                var name    = execute.plugin.name;
                var trigger = execute.plugin.trigger;
                var enabled = execute.plugin.enabled.toLowerCase();
                var fuzzy   = execute.plugin.fuzzy;
                
                var details = { "name" : name, "trigger" : trigger, "fuzzy" : fuzzy, 'run' : execute[name]};
                
                if(enabled == 'true')
                {
                    plugins[name] = details;
                }
            }
        }
        
        
        var getTerm = function(msg, list)
        {
            var terms = "(" + list.join('|') + ")";
            var clean = msg.replace(RegExp(caller.source + ned.source + terms, "i"), '');

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
                    var threshold = (fuzz == "true") ? 0.80 : 0.99; 
                    var closest = Util.getClosest(message, trig, threshold);
                    if(closest != null)
                    {
                        params.message = getTerm(message, plugins[id].trigger);
                        params.isEmpty = (params.message.split(' ').join('').length == 0 || params.message.length == 0) ? true : false;
                        print(id);
                        print(params)
                        return id;
                    }
                }
                else
                {
                    var regex = new RegExp(trig, 'i');
                    if(tempMessage.match(regex))
                    {
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
                var regex = /([Ww]ho|[Ww]hat|[Ww]hen|[Ww]here|[Ww]hy).*$/;

                if(params.message.match(regex))
                {
                    sendMessage("Wolfram it!");
                }
            }
        }

    });



    return true;
};

