
var http = require('http');



var trigger = ['whats the time', 'the time', 'what is the current time', 'tell me the time', 'what time is it', 'what time it is', 'time', 'current time', 'date', 'whats the date', 'todays date'];
var help    = [{
               usage       : 'time OR whats the time', 
               description : 'Will return the current time [@ned time]'
              }];
module.exports.help = help


var currTime = function()
{
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = new Date();
    var hr   = date.getHours();
    var m    = date.getMinutes();
    var day  = days[date.getDay()];
    var dat  = date.getDate();
    var mon  = months[date.getMonth()];
    var ampm = (hr > 11) ? 'PM' : 'AM';
    var curr = "It's " + hr % 12 + ":" + m + " " + ampm + ", " + day + " " + mon + " " + dat;

    var output = ["It's time to get a watch", curr, curr, curr, curr];
    
    return output[Math.floor(Math.random()*output.length)];
}


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
        self.message(channel, currTime());
    }
    else
    {
        var input = Util.padd(message);

        // Actual function begins here


        if(input.length > 0)
        {
            self.message(channel, currTime());
            
        // actual function ends here

        }
        else
        {
            self.message(channel, currTime());
        }
        
        
        GLOBAL.nothingFound = false;
    }


    return true;
};


