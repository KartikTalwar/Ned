var plugin = {
              name        : 'weather',
              trigger     : ['weather', 'the weather', 'whats the weather', 'conditions for', 'current weather', 'current temperature'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : 'Tells you the weather',
              usage       : 'ned weather san francisco'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var bad   = ['for ', 'of ', 'in '];
    var input = Util.padd(Util.removeBad(get.message, bad)).split('+').join('%2b');

    if(input.indexOf('here') == 0 || input.indexOf('now') == 0 || input.indexOf('outside') == 0 || input.length < 3) { input = "san+francisco"; }

    var httpRequestParams =
    {
        host : "www.google.com",
        port : 80,
        path : "/ig/api?weather=" + input
    }

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
                var location  = Util.cut('<city data="', '"', data);
                var condition = Util.cut('<condition data="', '"', data);
                var tempf     = Util.cut('<temp_f data="', '"', data);
                var tempc     = Util.cut('<temp_c data="', '"', data);

                sendMessage("It's currently " + tempf + "°F (" + tempc + "°C) and " + condition + " in " + location);   
            }
            catch(err)
            {
                sendMessage("(facepalm) Error");
            }
        });
    });

    return true;
}
