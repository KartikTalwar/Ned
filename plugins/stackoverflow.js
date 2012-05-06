var plugin = {
              name        : 'stackoverflow',
              trigger     : ['stackoverflow','so'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : 'Returns results from stackoverflow',
              usage       : '@ned so Out of memory error'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    if(get.isEmpty)
    {
        sendMessage("Please check your input");
    }
    else
    {
        var input = Util.padd(get.message);
        var site  = "stackoverflow.com";

        var httpRequestParams = 
        {
            host : "api.bing.net",
            port : 80,
            path : "/json.aspx?Appid=" + Config.bing_api_key + "&sources=web&query=" + Util.padd(input) + "+site:" + site
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
                    var resp = JSON.parse(data)["SearchResponse"]["Web"]["Results"];
                    
                    for(var i=0; i< resp.length; i++)
                    {
                        var reply  = '';
                            reply += resp[i]["Title"] + "  =>   ";
                            reply += resp[i]["Url"] + "\n";
                        
                        sendMessage(reply);
                        
                        if(i == 2) { break; }
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
