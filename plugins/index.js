module.exports.load = function(bot) 
{
    var callerRegEx = new RegExp("(.+)$", "i");
    
    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(callerRegEx, onMessage);
};


var onMessage = function(channel, frm, msg, x)
{
    var self        = this;
    var isPM        = (arguments.length == 3) ? true : false;
    var from        = isPM ? ''  : frm;
    var fullMessage = isPM ? frm : msg;
    var roomName    = channel.split('@')[0];

    var ned         = (isPM) ? Util.NedPMName.source : Util.NedName.source + "( ?)";
    var regEx       = new RegExp(Util.NedCaller.source + ned, "i");

    var message     = fullMessage.replace(regEx, '');
    var isPrivate   = (isPM) ? true : false;
    var message     = message.split("+").join("%2B");
    var input       = message;
    var firstName   = (!isPrivate) ? from.split(' ')[0] : '';


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


    var detectPlugin = Brain.analyze(plugins, parameters);


    if(detectPlugin != null)
    {
        try
        {
            plugins[detectPlugin].run(parameters);
        }
        catch(err)
        {
            print("Tried running " + detectPlugin + " but got this error:\n" + err);
        }
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
                try
                {
                    plugins["wolfram"].run(parameters);
                }
                catch(err)
                {
                    print("Tried running wolfram but got this error:\n" + err);
                }
            }
        }
    }


    return true;
};
