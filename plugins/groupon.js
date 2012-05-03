var plugin = {
              name        : 'groupon',
              trigger     : ['groupon deal', 'todays groupon'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Returns today\'s groupon deal',
              usage       : '@ned todays groupon'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var httpRequestParams = 
    {
        host : "api.groupon.com",
        port : 80,
        path : "/v2/deals?client_id=" + Config.groupon_key
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
                var j = JSON.parse(data);
                var title = j.deals[0].title;
                var price = j.deals[0].options[0].price.formattedAmount;
                var image = j.deals[0].grid6ImageUrl;

                sendMessage(title + "  [" + price + "]");
                sendMessage(image);
            }
            catch(err)
            {
                sendMessage("(facepalm) Error");
            }
        });
    });

    return true;
}
