var plugin = {
              name        : 'slowclap',
              trigger     : ".*([Cc]lap|[Ss]low.*[Cc]lap|[Cc]lap.*[Ss]slow.*)$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var resp  = ['http://i42.tinypic.com/2lbm538.gif', 'http://i43.tinypic.com/2z5w5s4.jpg'];

    sendMessage(Util.chooseRandom(resp));

    return true;
}
