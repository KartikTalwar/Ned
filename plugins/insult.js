var plugin = {
              name        : 'insult',
              trigger     : ['insult'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Insults you or someone else',
              usage       : 'ned insult Ben'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var httpRequestParams = 
    {
        host : "randominsults.net",
        port : 80,
        path : "/"
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
                var joke = Util.cut('<strong><i>', '</i></strong>', data);
                var user = Util.ucwords(get.message);
                var pre  = '';                

                if(!get.isEmpty)
                {
                    pre = user + ", ";
                }

                if(!get.message.match(/.*(o [Mm]amma| [Mm]other|[Mm]om)/))
                {
                    sendMessage(pre + joke);
                }
            }
            catch(err)
            {
                sendMessage(Util.errorMessage() + " Error");
            }
        });
    });
}
