var plugin = {
              name        : 'google',
              trigger     : ['google','search'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Performs a web search',
              usage       : 'ned google tagged'
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
        var input = Util.padd(get.message);print(get);

        var httpRequestParams = 
        {
            host: "api.bing.net",
            port: 80,
            path: "/json.aspx?Appid=" + Config.bing_api_key + "&sources=web&query=" + input.replace(/[^^\000-\177]/, '')
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
                    var reqdata = JSON.parse(data)["SearchResponse"]["Web"]["Results"];

                    for(var i=1; i<reqdata.length+1; i++)
                    {
                        var k = i-1;
                        var reply = '';

                        reply += reqdata[k]["Title"] 
                        reply += "  =>   ";
                        reply += reqdata[k]["Url"];
                        
                        sendMessage(reply);
                        
                        if(k == 2) { break; }
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
