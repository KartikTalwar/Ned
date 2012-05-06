var plugin = {
              name        : 'ithinkso',
              trigger     : ".*((I|i) think|(I|i) believe|imo|(I|i)n my opinion|my opinion|dont think|you sure|not true|not right|thats true|you are right).*",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var resp  = ['I definitely agree with you', 'Hmm I see your point', 'Yes, of course', 'I think so too', 'You are correct', 'You are definitely right', 'My computations confirm that as well', 'Hmm.. you sure about that?', 'My calculations dictate otherwise'];

    var words = get.message.split(' ').length

    if(Util.triggersRandom([0, 4, 7]) && words > 2)
    {
        sendMessage(Util.chooseRandom(resp));
    }

    return true;
}
