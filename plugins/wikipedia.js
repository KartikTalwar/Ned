var plugin = {
              name        : 'wikipedia',
              trigger     : ['wikipedia','w'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : 'Gives you the wikipedia topic, given a query',
              usage       : '@ned w Albert Einstein'
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
        var site  = "wikipedia.org";

        var httpRequestParams = 
        {
            host : "api.bing.net",
            port : 80,
            path : "/json.aspx?Appid=" + Util.getKey("bing") +"&sources=web&query=" + Util.padd(input) + "+site:" + site
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
                    var resp  = JSON.parse(data)["SearchResponse"]["Web"]["Results"];

                    sendMessage(resp[0]["Description"]);
                    sendMessage(resp[0]["Url"]);
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
