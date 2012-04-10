
var trigger = ['note 2 self ','note2self', 'note to self', 'n2s', 'my notes', 'delete note', 'del note', 'to do', 'todo'];
var help    = [{
               usage       : 'n2s OR note to self', 
               description : "Create Note : n2s -text- \n   View Note: my notes \n   Delete Note: del #id " // sorry, Bing is what I meant
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
    

    if(isPrivate)
    {
        var from = channel.split('@')[0].replace(/[^0-9\_]/, '');
        message = message.replace(/[^A-Za-z0-9\s\,\.\?\!\:\)\(\)\&\$\#\-\_]/, '').substring(0, 140);
        var look = tempMessage.toLowerCase();
        
        var date = new Date();
        var hr   = date.getHours();
        var m    = date.getMinutes();
        var dat  = date.getDate();
        var mon  = date.getMonth();
        var ampm = (hr > 11) ? 'PM' : 'AM';
        var curr = " (" + hr + ":" + m +" " + mon + "/" + dat + ")";
        
        

         if( look.indexOf('my note') == 0)
         {

            memory.serialize(function() 
            {
              try
              {
                   memory.each("SELECT message,id FROM Note2Self WHERE user='"+from+"' ORDER BY id ASC", function(err, row) {
                      var nmsg = row["message"];
                      var nid  = row["id"];
                      
                      self.message(channel, "#" + nid + " => " + nmsg);
                          
                  }, function(a, tot_rows) { 
                      if(tot_rows == 0)
                      {
                          self.message(channel, "No results found. Please create a new note by typing `n2s ..text..`");
                      }
                  } );
                  
               
              }
              catch (err)
              {
                  self.message(channel, "Error creating note. Please check your syntax or try again");
              }
      
            });

         }
         else if( look.indexOf('delete note') == 0 || look.indexOf('del note') == 0)
         {
            var did = message.replace(/[^0-9]/, '');

            memory.serialize(function() 
            {
              try
              {
                  
                  memory.each("SELECT Count(*) FROM Note2Self WHERE user='" + from +"'", function(err, row) 
                  { 
                      c1 = row["Count(*)"];
                      
                      memory.each("DELETE FROM Note2Self WHERE id='"+ did+ "' AND user='"+from+"'", function(e, r) {});
                      
                      memory.each("SELECT Count(*) FROM Note2Self WHERE user='" + from +"'", function(err1, row1) 
                      { 
                          c2 = row1["Count(*)"];
                          
                          if(c1 == c2+1)
                          {
                            self.message(channel, "Note #"+did+" deleted successfully");
                          }
                          else
                          {
                            self.message(channel, "Error deleting. Please try again later");
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
                      var insrt = memory.run("INSERT INTO Note2Self(user, message) VALUES (?, ?)", [from, message+curr]);

                      memory.each("SELECT message, id FROM Note2Self WHERE user='"+from+"' ORDER BY id DESC LIMIT 1", function(err, row) {
                          var nmsg = row["message"].substring(0, 15);
                          var nid  = row["id"];
                          
                          self.message(channel, "Created new note #" + nid + " - [" + nmsg + "..]");
                      });
                  }
                  catch (err)
                  {
                      self.message(channel, "Error creating note. Please check your syntax or try again");
                  }
          
                });

            }
            else
            {
                self.message(channel, "Minimum length must be more than 5 characters");
            }

         }
         else
         {
            self.message(channel, "Unknown command. Please type Help");
         }

 
    }
    else
    {
        self.message(channel, "Sorry, this feature is only available through private chat");
    }
    


    return true;
};


