
var trigger = ['hi', 'hello', 'hey', 'whatsup', 'yo ', 'whattup', 'wattup', 'how are you', 'hows it going', 'wassup'];


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


    // Begin greeting
    
    var firstName = from.split(' ')[0];
    var generic = "Hello " + from.split(' ')[0];
    var greetings = ['excellent', 'superb', 'wonderful'];

    if(tempMessage.indexOf('hipchat') == -1)
    {
        if( tempMessage.indexOf('it goin') != -1 || tempMessage.indexOf('you ') != -1)
        {
            self.message(channel, generic + ", I'm " + greetings[Math.floor(Math.random()*greetings.length)] + ", fine thank you");
        }
        else if(tempMessage.indexOf('dawg') != -1 || tempMessage.indexOf('dog') != -1 )
        {
            self.message(channel, "Yo Dawg");
        }
        else
        {
            self.message(channel, generic);
        }
    }

    return true;
};


