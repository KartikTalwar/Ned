

module.exports.load = function(bot) 
{
    var assembleInput = /.*(big|small|long|hard|soft|mouth|face|fast|slow|in there|on there|in that|on that|wet|dry|on the|in the|suck|blow|jaw|all in|fit that|fit it|hurts|hot|huge|balls|stuck)$/;
    var callerRegEx   = new RegExp(assembleInput.source, "i");
    var pmCallerRegEx = new RegExp(assembleInput.source, "i");

    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(pmCallerRegEx, PM);
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

    var resp  = "That's what she said!";
    var rand  = Math.floor(Math.random()*11);
    var words = message.split(' ').length

    if((rand == 3 || rand == 7) && words > 2)
    {
        self.message(channel, resp);
    }


    return true;
};

var PM = function(channel, frm, msg, x) 
{
    this.message(channel, "That's what she said!");
    return true;
}
