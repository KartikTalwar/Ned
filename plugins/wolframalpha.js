var plugin = {
              name        : 'wolfram',
              trigger     : ['wolfram'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : 'wolframs things for you',
              usage       : 'ned wolfram 5^123'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var msg = get.message.split(' ').join('%2520');

    var httpRequestParams = 
    {
        host: "query.yahooapis.com",
        port: 80,
        path: "/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http://api.wolframalpha.com/v2/query%3Fappid%3D" + Util.getKey("wolfram") + "%26input%3D" + msg + "'&format=json"
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
                var response = JSON.parse(data).query.results.queryresult.pod[1].subpod.plaintext.toString();

                if(!Util.it_has(response, "data not available") || response == "null")
                {
                    response = response.split('(according')[0];
                    response = response.split('(According')[0];

                    sendMessage(response);
                }
            }
            catch(err) {}
        });
    });

    return true;
}
