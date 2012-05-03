var plugin = {
              name        : 'reminder',
              trigger     : ['remind'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'reminds you of something',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    sendMessage("You set a reminder");
    return true;
}
