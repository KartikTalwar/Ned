module.exports.load = function(bot) 
{
    var callerRegEx = new RegExp("(.+)$", "i");
    
    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(callerRegEx, onMessage);
};


var onMessage = function(channel, frm, msg, x)
{
    var self             = this;
    var isPrivateMessage = (arguments.length == 3) ? true : false;
    var from             = isPrivateMessage ? '' : frm;
    var fullMessage      = isPrivateMessage ? frm : msg;
    var roomName         = channel.split('@')[0];
    var isSingleWord     = (fullMessage.indexOf(" ") == -1) ? true : false;

    var ned              = (isPrivateMessage) ? Util.NedPMName.source : Util.NedName.source + "( ?)";
    var regEx            = new RegExp(Util.NedCaller.source + ned, "i");

    var message          = fullMessage.replace(regEx, '');
    var isPrivate        = (isPrivateMessage) ? true : false;
    var message          = message.split("+").join("%2B");
    var input            = message;
    var firstName        = (!isPrivate) ? from.split(' ')[0] : '';


    parameters  = {
                   'message'    : message,
                   'fullMessage': fullMessage,
                   'from'       : from,
                   'firstName'  : firstName,
                   'channel'    : channel,
                   'room'       : roomName.split('_')[1],
                   'isPrivate'  : isPrivate,
                  }


    sendMessage = function(txt, group)
                  {
                      var ch = (typeof group == 'undefined') ? channel : group;
                      self.message(ch, txt);

                      return true;
                  }


    var detectPlugin = Brain.analyze(message, fullMessage, plugins, parameters);


    if(detectPlugin != null)
    {
        plugins[detectPlugin].run(parameters);
    }
    else
    {
        if(parameters.message.length == 0)
        {
            sendMessage(Util.greet());
        }
        else
        {
            var regex  = ned + "([Ww]ho|[Ww]hat|[Ww]hen|[Ww]here|[Ww]hy|[Hh]ow) .*$";

            if(parameters.fullMessage.match(regex) && parameters.fullMessage.replace(regex, '').length > 5)
            {
                plugins["wolfram"].run(parameters);
            }
        }
    }


    return true;
};
