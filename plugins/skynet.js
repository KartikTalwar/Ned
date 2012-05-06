var plugin = {
              name        : 'skynet',
              trigger     : "([Nn]ed .+[Ss]kynet.*)$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{

    var images = ["http://bbh-labs.com/wp-content/uploads/2012/03/t2_600.gif",
                  "http://i49.tinypic.com/ea5yk0.gif",
                  "http://i49.tinypic.com/ea5yk0.gif",
                  "http://i47.tinypic.com/4lsj2r.jpg"
                ];


    sendMessage(Util.chooseRandom(images));
    
    return true;
}
