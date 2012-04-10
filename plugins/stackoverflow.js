
var http = require('http');


var trigger = ['stackoverflow','so '];
var help    = [{
               usage       : 'stackoverflow OR so', 
               description : 'Returns results from stackoverflow [@ned so out of memory error]' // sorry, Bing is what I meant
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

    if(isEmpty)
    {
        self.message(channel, Util.errorMessage() + "Please check your input");
    }
    else
    {
        var input = Util.padd(message);

        // Actual function begins here
        

        if(input.length > 0)
        {
            var httpRequestParams = 
            {
                host: "api.bing.net",
                port: 80,
                path: "/json.aspx?Appid="+Config.bing_api_key+"&sources=web&query=" + Util.padd(input) + "+site:stackoverflow.com"
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
                        var j = JSON.parse(data);
                        j     = j["SearchResponse"]["Web"]["Results"];

                        
                        for(var i=1; i< j.length+1; i++)
                        {
                            var k = i-1;
                            var reply = '';    
                            reply += j[k]["Title"] + "  =>   ";
                            reply += j[k]["Url"] + "\n";
                            
                            self.message(channel, reply);
                            
                            if(k == 2)
                            {
                                break;
                            }
                        }
                    }
                    catch(err)
                    {
                        self.message(channel, "(facepalm) Error");
                    }
                });
            });
            
            
            // actual function ends here

        }
        else
        {
            self.message(channel, Util.errorMessage() + "Please check your input");
        }
    }


    return true;
};


