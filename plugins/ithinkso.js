
module.exports.load = function(bot) 
{
    var assembleInput = /.*((I|i) think|(I|i) believe|imo|(I|i)n my opinion|my opinion|dont think|you sure|not true|not right|thats true|you are right).*/;
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

    var resp  = ['I definitely agree with you', 'Hmm I see your point', 'Yes, of course', 'I think so too', 'You are correct', 'You are definitely right', 'My computations confirm that as well', 'Hmm.. you sure about that?', 'My calculations dictate otherwise'];
    
    var rand  = Math.floor(Math.random()*11);
    var words = message.split(' ').length

    if((rand == 0 || rand == 4) && words > 2)
    {
        self.message(channel, resp[Math.floor(Math.random()*resp.length)]);
    }


    return true;
};

