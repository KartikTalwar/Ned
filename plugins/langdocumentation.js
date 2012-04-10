
var trigger = ['doc ', 'docs '];
var help    = [{
               usage       : 'doc [langname]', 
               description : 'Returns function or method usage of the given language [ned doc php explode]'
              }];
module.exports.help = help



module.exports.load = function(bot) 
{
    var assembleInput = "("+trigger.join("|")+")";    
    var callerRegEx   = new RegExp(Util.NedCaller.source + Util.NedName.source   + " " + assembleInput + "(.*)$", "i");
    var pmCallerRegEx = new RegExp(Util.NedCaller.source + Util.NedPMName.source + ""  + assembleInput + "(.*)$", "i");

    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(pmCallerRegEx, onMessage);
};


var onMessage = function(channel, frm, msg, x) 
{
    var self             = this;
    var isPrivateMessage = (arguments.length == 3) ? true : false;
    var from             = isPrivateMessage ? '' : frm;
    var tempMessage      = isPrivateMessage ? frm : msg;
    var roomName         = channel.split('@')[0];
    var isSingleWord     = (tempMessage.indexOf(" ") == -1) ? true : false;

    var caller           = /^([\@\!\#\$\~\%\/\\/]*)?/;
    var ned              = (isPrivateMessage && isSingleWord) ? 
                           /([Nn][Ee][Dd][Dd]?([Dd]?[Aa][Rr][Dd])?(( *[^A-Za-z0-9]* *))?)?$/ :
                           /([Nn][Ee][Dd][Dd]?([Dd]?[Aa][Rr][Dd])?(( *[^A-Za-z0-9]* *))? ?)?/; 

    var assembleInput    = "("+trigger.join("|")+")";
    var regEx            = new RegExp(caller.source + ned.source + assembleInput, "i");
    var message          = tempMessage.replace(regEx, '');
    var isEmpty          = (message.split(' ').join('').length == 0 || message.length == 0) ? true : false;
    var isPrivate        = (isPrivateMessage) ? 1 : 0;
    var message          = Util.clarify(message.split("+").join("%2B"));



    var langs = ['clojure', 'cobol', 'git', 'emacs', 'javascript', 'java', 'jquery', 'mercurial', 'mysql', 'perl', 'php', 'python',
                   'sql', 'svn'];
    

    if(!isEmpty)
    {
    
        var reqlang = message.split(' ')[0].toLowerCase();
        
        if(langs.indexOf(reqlang) != -1)
        {

            var httpRequestParams = 
            {
                host: "searchco.de",
                port: 80,
                path: "/?q=" + Util.padd(message)
            };


            http.get(httpRequestParams, function(res) 
            {
                var data = '';
                res.on('data', function(chunk) {
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
                            self.message(channel, "No results found");
                        }

                        
                        for(var j=0; j<i.length; j++)
                        {
                            var url = Util.cut('href="', '"', i[j]);
                            var eg  = Util.cut('<pre class="synopsis">', '</pre>', i[j]);
                                eg  = Util.str_replace(x, y, eg.replace(/(<([^>]+)>)/ig,""));
                        
                            if(!isPrivate)
                            {
                                self.message(channel, url);
                                self.message(channel, "\n\n"+eg+"\n\n");
                                self.message(channel, "For for examples, run this command in private chat");
                                break;
                            }
                            else
                            {
                                self.message(channel, url);
                                self.message(channel, "\n"+eg+"\n");
                            }
                            if(j == 2)
                            {
                                break;
                            }
                            
                        }

                    }
                    catch(err)
                    {
                        self.message(channel, "(facepalm) Error");
                    }
                });
            });

        }
        else
        {
            self.message(channel, "No support for that language");
        }

    }
    else
    {
        self.message(channel, "Invalid input");
    }
        // actual function ends here




    return true;
};


