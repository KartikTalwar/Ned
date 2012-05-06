var plugin = {
              name        : 'stocks',
              trigger     : ['stock', 'stocks'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : 'Gets the latest stock quote chart',
              usage       : 'ned stock GOOG'
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
        var ticker = Util.padd(get.message).toUpperCase();

        if(ticker.length > 1)
        {
            var img = "http://www.google.com/finance/chart?tlf=12&q=" + ticker + "&hack=.gif";
            var url = "http://www.google.com/finance?q=" + ticker;

            sendMessage(img);
            sendMessage(url);
        }
        else
        {
            sendMessage(Util.errorMessage() + "Please check your input");
        }
    }

    return true;
}
