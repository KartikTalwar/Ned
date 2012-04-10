var http = require('http');


module.exports.load = function(bot) 
{
    var trigger = /( +|)$/;
    var callerRegEx = new RegExp(Util.NedCaller.source + Util.NedName.source + trigger.source, "i");
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
    var isEmpty          = (message.split(' ').join('').length == 0 || message.length == 0) ? true : false;
    var isPrivate        = (isPrivateMessage) ? 1 : 0;
    var message          = message.split("+").join("%2B");

    if(isEmpty)
    {
        self.message(channel, Util.greet());
    }
    else
    {
        var input = message;
        self.message(channel, Util.greet());

        /*
        if(input.length > 0)
        {
            var httpRequestParams = 
            {
                host: "localhost",
                port: 5000,
                path: "/?room=" + escape(roomName) + "&from=" + escape(from) + "&message=" + escape(input) + "&private=" + isPrivate
            };

            http.get(httpRequestParams, function(res) 
            {
                var data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                });
                res.on('end', function(chunk) {
                    self.message(channel, data);
                });
            });
        }
        else
        {
            self.message(channel, Util.greet());
        }
        */
    }


    return true;
};

