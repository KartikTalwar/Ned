
var http = require('http');


var trigger = ['compute', 'calculate', 'calc', 'math', 'convert'];
var help    = [{
               usage       : 'calc OR calculate', 
               description : 'Will crunch some numbers [@ned calc pi*5+(i^2)]'
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


        if(input.length > 0)
        {

            // Actual function begins here


            var httpRequestParams = 
            {
                host: "www.google.com",
                port: 80,
                path: "/ig/calculator?q=" + input
            };

            http.get(httpRequestParams, function(res) 
            {
                var data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                });
                
                res.on('end', function(chunk) 
                {
                    computed = Util.cut('rhs: "', '"', data).toString("utf8");
                    computed = computed.replace(/\\/g, "");
                    computed = computed.replace(/x26/g, '');
                    computed = computed.replace(/x3c/g, '');
                    computed = computed.replace(/x3e/g, '');
                    computed = computed.replace(/\/sup/g, '');
                    computed = computed.replace(/sup/g, '^');
                    computed = computed.replace(/#215;/g, '*');
                    computed = computed.replace(/�/g, '');
                                        

                    if(input.indexOf('/0') != -1 || input.indexOf('/+0') != -1)
                    {
                        if(input.indexOf('/0.') == -1 && input.indexOf('/+0.') == -1)
                        {
                            self.message(channel, "Only Chuck Norris can divide by zero");
                        }
                        else
                        {
                            self.message(channel, computed.split('(')[0]);
                        }
                    }
                    else
                    {
                        try
                        {
                           self.message(channel, computed.split('(')[0]);
                        }
                        catch(err)
                        {
                            self.message(channel, "(facepalm) Error");
                        }
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


