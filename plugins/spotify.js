var plugin = {
              name        : 'spotify',
              trigger     : ['spot me', 'spot ', 'spotify', 'sp '],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Returns the spotify url of a song',
              usage       : 'ned spot me everlong'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    if(get.isEmpty)
    {
        sendMessage(Util.errorMessage() + "Please check your input");
    }
    else
    {
        var input = Util.padd(get.message);

        var httpRequestParams = 
        {
            host : "ws.spotify.com",
            port : 80,
            path : "/search/1/track?q=" + input
        };

        http.get(httpRequestParams, function(res) 
        {
            var data = '';

            res.on('data', function(chunk) 
            {
                data += chunk;
            });
            
            res.on('end', function(chunk) 
            {
                try 
                {
                    var id = Util.cut('spotify:track:', '"', data);

                    if(id.length > 10)
                    {
                        response = "http://open.spotify.com/track/" + id;
                        sendMessage(response);
                    }
                }
                catch(err)
                {
                    sendMessage("(facepalm) Error");
                }
            });
        });
    }

    return true;
}
