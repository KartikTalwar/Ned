var plugin = {
              name        : 'carlton',
              trigger     : ".*(dancing|dance|so happy|pumped).*$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var resp  = ['http://i47.tinypic.com/2qnytnc.gif', 
                 'http://i50.tinypic.com/35bib06.jpg'
                ];

    var words = get.message.split(' ').length;

    if(Util.triggersRandom([7, 2, 1]) && words > 2)
    {
        var msg = 'Mee too!!';

        sendMessage(msg);
        sendMessage(Util.chooseRandom(resp));
    }

    return true;
}
