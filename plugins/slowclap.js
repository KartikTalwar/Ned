
module.exports.load = function(bot) 
{
    var assembleInput = /.*([Cc]lap|[Ss]low.*[Cc]lap|[Cc]lap.*[Ss]slow.*)$/;
    var callerRegEx   = new RegExp(assembleInput.source, "i");
    var pmCallerRegEx = new RegExp(assembleInput.source, "i");

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
    var message          = tempMessage

    var resp  = ['http://i42.tinypic.com/2lbm538.gif', 'http://i43.tinypic.com/2z5w5s4.jpg'];

    self.message(channel, Util.chooseRandom(resp));

    return true;
};

