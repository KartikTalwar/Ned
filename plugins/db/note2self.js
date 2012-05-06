var plugin = {
              name        : 'note2self',
              trigger     : ['note 2 self','note2self', 'note to self', 'n2s', 'my notes', 'delete note', 'del note', 'to do', 'todo'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : "Create Note : n2s -text- \n   View Note: my notes \n   Delete Note: del #id ",
              usage       : 'todo buy milk'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    if(get.isPrivate)
    {
        var from    = get.channel.split('@')[0].replace(/[^0-9\_]/, '');
        var message = get.message.replace(/[^A-Za-z0-9\s\,\.\?\!\:\)\(\)\&\$\#\-\_]/, '').substring(0, 140);
        var look    = get.fullMessage.toLowerCase();
        
        var date = new Date();
        var hr   = date.getHours();
        var m    = date.getMinutes();
        var dat  = date.getDate();
        var mon  = date.getMonth();
        var ampm = (hr > 11) ? 'PM' : 'AM';
        var curr = " (" + hr + ":" + m +" " + mon + "/" + dat + ")";

         if(look.indexOf('my note') == 0)
         {
            memory.serialize(function() 
            {
              try
              {
                    memory.each("SELECT message,id FROM Note2Self WHERE user='"+from+"' ORDER BY id ASC", function(err, row)
                    {
                        var nmsg = row["message"];
                        var nid  = row["id"];
  
                        sendMessage("#" + nid + " => " + nmsg);                      
                    }, function(a, tot_rows)
                    { 
                        if(tot_rows == 0)
                        {
                            sendMessage("No results found. Please create a new note by typing `n2s ..text..`");
                        }
                    });
              }
              catch (err)
              {
                  sendMessage("Error creating note. Please check your syntax or try again");
              }
            });
         }
         else if(look.indexOf('delete note') == 0 || look.indexOf('del note') == 0)
         {
            var did = message.replace(/[^0-9]/, '');

            memory.serialize(function() 
            {
                try
                {
                    memory.each("SELECT Count(*) FROM Note2Self WHERE user='" + from +"'", function(err, row) 
                    { 
                        var c1 = row["Count(*)"];

                        memory.each("DELETE FROM Note2Self WHERE id='" + did + "' AND user='" + from + "'", function(e, r) {});

                        memory.each("SELECT Count(*) FROM Note2Self WHERE user='" + from + "'", function(err1, row1) 
                        { 
                            var c2 = row1["Count(*)"];

                            if(c1 == c2+1)
                            {
                              sendMessage("Note #" + did + " deleted successfully");
                            }
                            else
                            {
                              sendMessage("Error deleting. Please try again later");
                            }
                        });
                    });
                }
              catch (err) {}
            });
         }
         else if( look.indexOf('note2self') == 0 || look.indexOf('note 2 self') == 0 || look.indexOf('note to self') == 0 || look.indexOf('n2s') == 0 || look.indexOf('to do') == 0 || look.indexOf('todo') == 0)
         {
            if(message.length > 5)
            {
                memory.serialize(function() 
                {
                    try
                    {
                        var insrt = memory.run("INSERT INTO Note2Self(user, message) VALUES (?, ?)", [from, message + curr]);

                        memory.each("SELECT message, id FROM Note2Self WHERE user='"+from+"' ORDER BY id DESC LIMIT 1", function(err, row)
                        {
                            var nmsg = row["message"].substring(0, 15);
                            var nid  = row["id"];
                          
                            sendMessage("Created new note #" + nid + " - [" + nmsg + "..]");
                        });
                    }
                    catch (err)
                    {
                        sendMessage("Error creating note. Please check your syntax or try again");
                    }
                });
            }
            else
            {
                sendMessage("Minimum length must be more than 5 characters");
            }
         }
         else
         {
            sendMessage("Unknown command. Please type Help");
         }
    }
    else
    {
        sendMessage("Sorry, this feature is only available through private chat");
    }

    return true;
}
