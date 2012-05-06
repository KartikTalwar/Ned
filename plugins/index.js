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


    var getTerm = function(msg, list)
                  {
                      var terms = "(" + list.join('|') + ")";
                      var clean = msg.replace(RegExp(terms, "i"), '');

                      return Util.clarify(clean);
                  }


    var analyze = function(message, fullMessage, plugins)
                  {
                      for(i in plugins)
                      {
                          var id   = i;
                          var det  = plugins[id];
                          var trig = det.trigger;
                          var fuzz = det.fuzzy;

                          if(typeof trig == "object")
                          {
                              if(fullMessage.match(new RegExp(Util.NedCaller.source + ned, "i")))
                              {
                                  var threshold = (fuzz == "true") ? 0.80 : 0.99;
                                  var closest   = Util.getClosest(message, trig, threshold);

                                  if(closest != null)
                                  {
                                      if(!closest[1])
                                      {
                                          var brk = closest[0].split(' ');
                                          message = (typeof brk == "object") ? message.split(' ').splice(brk.length).join(' ') : message.substring(brk.length);
                                      }

                                      parameters.message  = getTerm(message, plugins[id].trigger);
                                      parameters.isEmpty  = (parameters.message.split(' ').join('').length == 0) ? true : false;
                                      parameters.pluginId = id;

                                      return id;
                                  }
                              }
                          }
                          else
                          {
                              if(fullMessage.match(new RegExp(trig, 'i')))
                              {
                                  parameters.pluginId = id;
                                  return id;
                              }
                          }
                      }

                      return null;
                  }


    var detectPlugin = analyze(message, fullMessage, plugins);


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
            var skynet = "wolfram";
            var regex  = ned + "([Ww]ho|[Ww]hat|[Ww]hen|[Ww]here|[Ww]hy|[Hh]ow).*$";

            if(parameters.fullMessage.match(regex))
            {
                plugins[skynet].run(parameters);
            }
            else
            {
                if(parameters.fullMessage.match(ned + ".*$") && Util.triggersRandom([2, 4, 6]))
                {
                    plugins[skynet].run(parameters);
                }
            }
        }
    }


    return true;
};
