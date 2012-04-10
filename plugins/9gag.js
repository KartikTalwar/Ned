
var requests = require('request');

var trigger = ['9gag'];
var help    = [{
               usage       : '9gag', 
               description : 'Returns random 9gag post [@ned 9gag]'
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


    try
    {
        var request = require('request');
        request('http://9gag.com/random', function (error, response, body) 
        {
            var redr = response.request.uri.href;
        
            try
            {
                request('http://9gag.com/random', function (error, response, body) 
                {
                    var cut   = Util.cut('<img src=', '>', body);
                    var img   = Util.cut('"', '"', cut);
                    var title = Util.cut('alt="', '"', cut);
                    
                    self.message(channel, title);
                    self.message(channel, img);
                })
            }
            catch (err)
            {
                self.message(channel, Util.errorMessage() + "Error");
            }
            
        })
    }
    catch (err)
    {
        self.message(channel, Util.errorMessage() + "Error");
    }
        



    return true;
};


