
var http = require('http');


var trigger = ['weather', 'the weather', 'whats the weather', 'conditions for', 'current weather', 'current temperature'];
var help    = [{
               usage       : 'weather',
               description : 'Tells you the current weather [@ned weather san francisco or 94111]'
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


    var bad   = ['for ', 'of ', 'in '];
    var input = Util.padd(Util.removeBad(message, bad)).split('+').join('%2b');


    if(input.length < 3) { input = "94111"; }
    if(input.indexOf('here') == 0 || input.indexOf('now') == 0 || input.indexOf('outside') == 0) { input = "94111"; }


    /*var httpRequestParams = 
    {
        host: "query.yahooapis.com",
        port: 80,
        path: "/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww.google.com%2Fig%2Fapi%3Fweather%3D" + input + "'&format=json"
    };
    */
    
    var httpRequestParams =
    {
        host : "www.google.com",
        port : 80,
        path : "/ig/api?weather="+input
    }
    

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
                
                var location  = Util.cut('<city data="', '"', data);
                var condition = Util.cut('<condition data="', '"', data);
                var tempf     = Util.cut('<temp_f data="', '"', data);
                var tempc     = Util.cut('<temp_c data="', '"', data);
                
                
                /*
                var j = JSON.parse(data);
                j     = j["query"]["results"]["xml_api_reply"]["weather"];
                
                var location  = j["forecast_information"]["city"]["data"];
                var condition = j["current_conditions"]["condition"]["data"];
                var tempf     = j["current_conditions"]["temp_f"]["data"];
                var tempc     = j["current_conditions"]["temp_c"]["data"];
                */
                
                self.message(channel, "It's currently " + tempf + " F (" + tempc + " C) and " + condition + " in " + location);
                
            }
            catch(err)
            {
                self.message(channel, "(facepalm) Error");
            }
        });
    });


    return true;
};


