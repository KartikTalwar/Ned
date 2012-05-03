var plugin = {
              name        : 'wolfram',
              trigger     : ['wolfram'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'wolframs things for you',
              usage       : 'ned wolfram 5^123'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    sendMessage("You wolframed something");
    return true;
}
