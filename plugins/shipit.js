
module.exports.load = function(bot) 
{
    var assembleInput = /.*(LGTM|lgtm|ship it).*/;
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

    var resp  = [
                 "http://i42.tinypic.com/qnlgf9.png",
                 "http://i43.tinypic.com/33nuebq.jpg",
                 "http://i41.tinypic.com/2crrgis.jpg",
                 "http://i39.tinypic.com/1fu0c6.jpg"
                ]
    
    var words = message.split(' ').length

    if(Util.triggersRandom([3, 7]))
    {
        self.message(channel, resp[Math.floor(Math.random()*resp.length)]);
    }


    return true;
};

