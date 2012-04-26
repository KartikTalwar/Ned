var plugin = {
              name        : 'maps',
              trigger     : ['map', 'locate', 'directions'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Displays a map of the given location',
              usage       : 'ned map of Toronto'
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
        var bad   = ['of ', 'for ', 'me ', 'to '];
        var input = Util.padd(Util.removeBad(get.message, bad));
        
        var img = "http://maps.google.com/maps/api/staticmap?markers=" + input + "&size=300x250&maptype=roadmap&sensor=false&format=png"
        var url = "http://maps.google.com/maps?q=" + input + "&hl=en&sll=37.0625,-95.677068&sspn=73.579623,100.371094&vpsrc=0&hnear=" + input + "&t=m&z=17"

        sendMessage(img);
        sendMessage(url);
    }

    return true;
}
