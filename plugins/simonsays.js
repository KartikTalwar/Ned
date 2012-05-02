var plugin = {
              name        : 'simonsays',
              trigger     : ['shout'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Says what you want it to say',
              usage       : 'ned shout lunch is ready --tagged'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    if(!get.isEmpty)
    {
        if(get.isPrivate)
        {
            var msg = get.message;

            if(Util.it_has(msg, '--'))
            {
                var text  = msg.split('--')[0].replace(/[^A-Za-z0-9\:\,\(\)\[\@\!\#\$\~\%\/\\/\-\+\.\s]/, '');
                var group = msg.split('--')[1].toLowerCase().split(' ').join('_');
                var room  = Config.customerID + group + '@conf.hipchat.com'; 

                if(Util.in_array(room, Config.roomsToJoin))
                {
                    if(Util.in_array(get.room, Config.admins))
                    {
                        try
                        {
                            self.message(room, text);
                        }
                        catch(err) {}
                    }
                }
            }
            else
            {
                sendMessage('Please specify the roomname (spaces with underscores) by adding --[name] (2 dashes) after your message');
                sendMessage('Sample Usage: shout Lunch is ready --interns');
            }
        }
    }

    return true;
}
