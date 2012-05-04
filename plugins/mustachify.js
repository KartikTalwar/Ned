var plugin = {
              name        : 'mustachify',
              trigger     : ['mustachify', 'moustachify'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Type in mustachify and enter a url with a human face',
              usage       : 'ned mustachify http://i47.tinypic.com/2u4t16p.jpg'
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
        var img   = "http://mustachify.me/?src=" + input + "&hack=.gif";

        if(get.message.indexOf('http') == 0)
        {
            sendMessage(img);
        }
        else
        {
            sendMessage("Please enter a valid image url");
        }
    }

    return true;
}
