
var trigger = ['groupon deal',"today's groupon", 'todays groupon'];
var help    = [{
               usage       : 'groupon deal OR todays groupon', 
               description : 'Returns todays groupon deal'
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
        var city  = "san-francisco"

        // Actual function begins here
        
        var httpRequestParams = 
        {
            host: "api.groupon.com",
            port: 80,
            path: "/v2/deals?client_id=" + Config.groupon_key
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
                    var title = j.deals[0].title;
                    var price = j.deals[0].options[0].price.formattedAmount;
                    var image = j.deals[0].grid6ImageUrl;

                    self.message(channel, title + "  [" + price + "]");
                    self.message(channel, image);

                }
                catch(err)
                {
                    self.message(channel, "(facepalm) Error");
                }
            });
        });
        
        
        // actual function ends here


}

    return true;
};


