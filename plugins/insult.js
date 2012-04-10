
var http = require('http');


var trigger = ['insult'];
var help    = [{
               usage       : 'insult', 
               description : 'Offends you (potentially)' // sorry, Bing is what I meant
              }];
module.exports.help = help



module.exports.load = function(bot) 
{
    var assembleInput = "("+trigger.join("|")+")";    
    var callerRegEx   = new RegExp(Util.NedCaller.source + Util.NedName.source   + " " + assembleInput + "(.*)$", "i");
    var pmCallerRegEx = new RegExp(Util.NedCaller.source + Util.NedPMName.source + ""  + assembleInput + "(.*)$", "i");

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

    var assembleInput    = "("+trigger.join("|")+")";
    var regEx            = new RegExp(caller.source + ned.source + assembleInput, "i");
    var message          = tempMessage.replace(regEx, '');
    var isEmpty          = (message.split(' ').join('').length == 0 || message.length == 0) ? true : false;
    var isPrivate        = (isPrivateMessage) ? 1 : 0;
    var message          = Util.clarify(message.split("+").join("%2B"));


    if(isEmpty || tempMessage.indexOf('insult ') != -1)
    {

        var httpRequestParams = 
        {
            host: "randominsults.net",
            port: 80,
            path: "/"
        };

        http.get(httpRequestParams, function(res) 
        {
            var data = '';
            res.on('data', function(chunk) {
                data += chunk;
            });
            
            res.on('end', function(chunk) 
            {
                try 
                {
                    var i = Util.cut('<strong><i>', '</i></strong>', data);
                    
                    if(tempMessage.indexOf('insult ') != -1 && !isEmpty)
                    {
                        var sp = tempMessage.split('insult ')[1];
                        var to = sp.split(' ')[0];
                        var user = Util.ucwords(to);
                        
                        self.message(channel, user+", "+i);
                    }
                    else
                    {
                        self.message(channel, i);
                    }
                    
                    //user = (user.toString() == "undefined") ? '' : user;
                    
                    
                    
                    //self.message(channel, j[1]["url"]+"?hack=1");

                }
                catch(err)
                {
                    self.message(channel, "(facepalm) Error");
                }
            });
        });

    }
        // actual function ends here




    return true;
};


