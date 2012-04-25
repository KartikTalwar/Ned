var plugin = {
              name        : 'skynet',
              trigger     : "([Nn]ed .+[Ss]kynet.*)$",
              enabled     : 'true',
              general     : 'true',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(params)
{

    var images = ["http://bbh-labs.com/wp-content/uploads/2012/03/t2_600.gif",
                 "http://img.tgdaily.com/sites/default/files/stock/article_images/misc/skynetrobot.jpg"
                ];


    sendMessage(Util.chooseRandom(images));
}
