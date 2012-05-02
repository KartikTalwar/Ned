var plugin = {
              name        : 'podbaydoors',
              trigger     : "[Nn]ed.+[Oo]pen.*pod.*bay.*door.*$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    sendMessage("I'm sorry " + get.firstName + ", I can't do that");

    return true;
}
