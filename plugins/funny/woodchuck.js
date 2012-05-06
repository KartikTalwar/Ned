var plugin = {
              name        : 'woodchuck',
              trigger     : "[Nn]ed.*wood.*woodchuck.*chuck.*wood.*chuck.*$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    sendMessage("A woodchuck would chuck all the wood he could chuck if a woodchuck could chuck wood");

    return true;
}
