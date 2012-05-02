var plugin = {
              name        : 'therules',
              trigger     : "[Nn]ed ([Ww]hat are )?[Tt]he (three |3 )?(rules|laws)$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var rules = [
  	             "1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
                 "2. A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.",
                 "3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law."
                ];

    sendMessage(rules.join("\n"));

    return true;
}
