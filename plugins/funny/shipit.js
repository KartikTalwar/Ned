var plugin = {
              name        : 'lgtm',
              trigger     : ".*(LGTM|lgtm|ship it).*$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var resp  = [
                 "http://i42.tinypic.com/qnlgf9.png",
                 "http://i43.tinypic.com/33nuebq.jpg",
                 "http://i41.tinypic.com/2crrgis.jpg",
                 "http://i39.tinypic.com/1fu0c6.jpg"
                ]

    if(Util.triggersRandom([3, 7]))
    {
        sendMessage(Util.chooseRandom(resp));
    }

    return true;
}
