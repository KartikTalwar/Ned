var plugin = {
              name        : 'define',
              trigger     : ['define', 'definition of'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : 'Defines a word',
              usage       : 'ned define love'
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
            host : "query.yahooapis.com",
            port : 80,
            path : "/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww.abbreviations.com%2Fservices%2Fv2%2Fdefs.php%3Ftokenid%3D" + Config.dictionary_key + "%26word%3D" + Util.padd(input.split(' ')[0]) + "'&format=json"
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
                    var def = JSON.parse(data)["query"]["results"]["results"]["result"];
                    
                    if(typeof def.length == "undefined")
                    {
                        sendMessage("Definition: " + def["definition"]);
                    }
                    else
                    {
                        sendMessage("Definition: " + def[0]["definition"]);
                    }
                }
                catch(err)
                {
                    sendMessage("Sorry, no definitions found");
                }
            });
        });
    }

    return true;
}
