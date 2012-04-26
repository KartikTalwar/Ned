var plugin = {
              name        : 'twss',
              trigger     : ".* (big|small|long|hard|soft|mouth|face|fast|slow|in there|on there|in that|on that|wet|dry|on the|in the|suck|blow|jaw|all in|fit that|fit it|hurts|hot|huge|balls|stuck)$",
              enabled     : 'false',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var resp  = "That's what she said!";
    var words = get.message.split(' ').length

    if(Util.triggersRandom([3, 7]) && words > 2)
    {
        sendMessage(resp);
    }

    return true;
}
