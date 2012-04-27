var plugin = {
              name        : 'jira',
              trigger     : ['jira'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Gets JIRA url for a bug',
              usage       : 'ned JIRA XY-1234'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    if(get.isEmpty)
    {
        sendMessage(Util.errorMessage() + "Please check your input");
    }
    else
    {
        var input = Util.padd(get.message);
        var url   = "https://jira.mysite.com/browse/" + input.toUpperCase();

        sendMessage(url);
    }

    return true;
}