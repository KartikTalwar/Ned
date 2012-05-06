var plugin = {
              name        : 'programmingdocs',
              trigger     : ['docs', 'doc'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Returns function or method usage of the given language',
              usage       : '@ned doc php explode'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var langs = ['clojure', 'cobol', 'git', 'emacs', 'javascript', 'java', 'jquery', 'mercurial', 'mysql', 'perl', 'php', 'python',
                   'sql', 'svn'];

    if(!get.isEmpty)
    {
        var reqlang = get.message.split(' ')[0].toLowerCase();
        
        if(langs.indexOf(reqlang) != -1)
        {
            var httpRequestParams = 
            {
                host : "searchco.de",
                port : 80,
                path : "/?q=" + Util.padd(get.message)
            };

            http.get(httpRequestParams, function(res) 
            {
                var data = '';

                res.on('data', function(chunk)
                {
                    data += chunk;
                });
                
                res.on('end', function(chunk) 
                {
                    try 
                    {
                        var i = Util.cutMultiple('class="coderes"><h4>', '</div><center>', data);
                        var x = ["&", "&amp;", "&quot;", "&apos;", "&lt;", "&gt;"];
                        var y = ["&amp;", "&", '"', "'", "<", ">"];
                        
                        if(i.length == 01)
                        {
                            sendMessage("No results found");
                        }

                        for(var j=0; j<i.length; j++)
                        {
                            var url = Util.cut('href="', '"', i[j]);
                            var eg  = Util.cut('<pre class="synopsis">', '</pre>', i[j]);
                                eg  = Util.str_replace(x, y, eg.replace(/(<([^>]+)>)/ig,""));
                        
                            if(!get.isPrivate)
                            {
                                sendMessage(url);
                                sendMessage(eg + "\n  ");
                                sendMessage("For more examples, run this command in private chat");
                                break;
                            }
                            else
                            {
                                sendMessage(url);
                                sendMessage("\n"+eg+"\n");
                            }
                            if(j == 2) { break; }
                        }
                    }
                    catch(err)
                    {
                        sendMessage("(facepalm) Error");
                    }
                });
            });
        }
        else
        {
            sendMessage("No support for that language");
        }
    }
    else
    {
        sendMessage("Invalid input");
    }

    return true;
}
