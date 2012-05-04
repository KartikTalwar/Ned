var plugin = {
              name        : 'youtube',
              trigger     : ['yt', 'youtube', 'utube', 'watch', 'video of'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Returns the first youtube video',
              usage       : 'ned yt evolution of dance'
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
            host : "gdata.youtube.com",
            port : 80,
            path : "/feeds/api/videos?max-results=1&orderBy=relevance&alt=json&q=" + input
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
                   var vid = JSON.parse(data).feed.entry[0].link[0].href;

                   sendMessage(vid.split('&feature')[0]);
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
