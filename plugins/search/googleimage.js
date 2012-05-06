var plugin = {
              name        : 'googleimages',
              trigger     : ['googleimage','img me', 'google image', 'img'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : 'Gets the first google image result',
              usage       : 'ned img nyan cat'
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
            host : "ajax.googleapis.com",
            port : 80,
            path : "/ajax/services/search/images?v=1.0&rsz=8&safe=active&q=" + input
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
                    var resp = JSON.parse(data)["responseData"]["results"];
                    sendMessage(resp[1]["url"]);
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
