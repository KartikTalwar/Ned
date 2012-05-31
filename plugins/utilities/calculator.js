var plugin = {
              name        : 'calculator',
              trigger     : ['compute', 'calculate', 'calc', 'math', 'convert'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : 'Does your math',
              usage       : 'ned calc calc pi*5+(i^2) + sin(42)'
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
            host : "www.google.com",
            port : 80,
            path : "/ig/calculator?q=" + input
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
                var computed = Util.cut('rhs: "', '"', data).toString("utf8");
                var bad      = ['/', 'x26', 'x3c', 'x3e', '/sup', 'sup', '#215;', '�'];
                var good     = ['',  '',    '',    '',    '',     '^',   '*',     '' ];
                    computed = Util.str_replace(bad, good, computed);
                                    

                if(Util.it_has(input, '/0') || Util.it_has(input, '/+0'))
                {
                    if(Util.it_has(input, '/0.') && Util.it_has(input, '/+0.'))
                    {
                        sendMessage("Division by zero error. Only Chuck Norris can divide by zero");
                    }
                    else
                    {
                        sendMessage(computed.split('(')[0]);
                    }
                }
                else
                {
                    try
                    {
                       sendMessage(computed.split('(')[0]);
                    }
                    catch(err)
                    {
                        sendMessage("(facepalm) Error");
                    }
                }
            });
        });

    }

    return true;
}
