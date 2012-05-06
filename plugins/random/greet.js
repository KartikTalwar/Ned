var plugin = {
              name        : 'greet',
              trigger     : ['hi', 'hello', 'hey', 'whatsup', 'yo', 'whattup', 'wattup', 'how are you', 'hows it going', 'wassup', 'whatsup'],
              enabled     : 'true',
              fuzzy       : 'true',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{

    var generic = "Hello " + get.firstName;
    var greetings = ['excellent', 'superb', 'wonderful'];


    if(Util.it_has(get.fullMessage, 'it goin') || Util.it_has(get.fullMessage, 'e you'))
    {
        sendMessage(generic + ", I'm " + Util.chooseRandom(greetings) + ", fine thank you");
    }
    else if(Util.it_has(get.fullMessage, 'dawg') || Util.it_has(get.fullMessage, 'dog'))
    {
        sendMessage("Yo Dawg");
    }
    else
    {
        sendMessage(generic);
    }

    return true;
}
