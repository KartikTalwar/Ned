
module.exports.load = function(bot) 
{
    var assembleInput = /.*(dancing|dance|so happy|so happy|pumped).*/;
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

    var resp  = ['http://media.tumblr.com/tumblr_lrzrlymUZA1qbliwr.gif', 'http://3deadmonkeys.com/gallery3/var/albums/random_stuff/Carlton-Dance-GIF.gif'];
    
    var words = message.split(' ').length

    if(Util.triggersRandom([7]) && words > 2)
    {
        if(message.indexOf('happy') != -1)
        {
            var m = "Happy you say..";
        }
        else
        {
            var m = 'Mee too!!';
        }
        
        self.message(channel, m);
        self.message(channel, resp[Math.floor(Math.random()*resp.length)]);
    }


    return true;
};

