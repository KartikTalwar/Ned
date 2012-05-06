var plugin = {
              name        : 'lmgfy',
              trigger     : ['lmgtfy', 'lmbtfy', 'lmytfy', 'lmddgtfy', 'lmdtfy'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Googles things for you',
              usage       : 'ned lmgtfy internet'
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
        var url   = "http://lmgtfy.com/?q=" + input

        sendMessage(url);
    }

    return true;
}
