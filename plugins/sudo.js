var plugin = {
              name        : 'sudo',
              trigger     : ['sudo'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    if(!get.isEmpty)
    {
        var greetings = ["Alright", "Okay", "Fine"];
        var reference = [' me ', ' my ', ' mine ', ' us ', ' yourself ', ' our '];
        var toreplace = [' you ', ' your ', ' yours ', ' you guys ', ' myself ', ' your '];
        var message   = Util.str_replace(reference, toreplace, get.message + " ");

        sendMessage(Util.chooseRandom(greetings) + ". I'll " + message);
    }

    return true;
}
