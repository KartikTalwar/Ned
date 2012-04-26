var plugin = {
              name        : '9gag',
              trigger     : ['9gag'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Displays a random 9gag post',
              usage       : 'ned 9gag'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var requests = require('request');
    
    try
    {
        var request = require('request');
        request('http://9gag.com/random', function (error, response, body) 
        {
            var redr = response.request.uri.href;

            try
            {
                request('http://9gag.com/random', function (error, response, body) 
                {
                    var cut   = Util.cut('<img src=', '>', body);
                    var img   = Util.cut('"', '"', cut);
                    var title = Util.cut('alt="', '"', cut);
                    
                    sendMessage(title);
                    sendMessage(img);
                })
            }
            catch (err)
            {
                sendMessage(Util.errorMessage() + "Error");
            }
            
        })
    }
    catch (err)
    {
        sendMessage(Util.errorMessage() + "Error");
    }

    return true;
}
