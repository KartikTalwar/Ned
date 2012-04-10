
module.exports.load = function(bot) 
{
    var assembleInput = "(when are you|where are you|whoami|who are you|your creator|who created you|.*turing.*test|why are you)";
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
    var message          = tempMessage;
    var resp = "(jackie) " + from.split(' ')[0] +  ", I'm here to help you, not try to trick you into thinking I'm something I'm not!";

    if(message.indexOf('ring') != -1)
    {
        self.message(channel, resp);
    }
    else if (message.indexOf('your') != -1 || message.indexOf('who a') != -1)
    {
        self.message(channel, 'I am Ned. Its short for Ned');
    }
    else if(message.indexOf('why are you') != -1)
    {
        self.message(channel, "I just am.");
    }
    else if(message.indexOf('when are you') != -1)
    {
        self.message(channel, "Now is when I am");
    }
    else if(message.indexOf('where are you') != -1)
    {
        self.message(channel, "In the Matrix, just like you are");
    }
    else
    {
        self.message(channel, "My creator is that intern Kartik.");
    }
    
    return true;
};


