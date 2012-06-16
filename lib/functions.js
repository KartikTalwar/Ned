var fs = require('fs');


var clarify = function(string)
              {
                  first = string.indexOf(" ");
              
                  while(first == 0)
                  {
                      string = string.replace(string[0], '');
                      first  = string.indexOf("+");
                  }
    
                  return string
              }


var padd = function(string) 
           {
               return clarify(string).split(' ').join('+');
           }


var generateRandom = function(left, right)
                     {
                         var newleft = (typeof left  == "undefined") ? 1     : left + 1 ;
                         var isRange = (typeof right == "undefined") ? false : true ;
    
                         if(isRange)
                         {
                             return Math.floor(Math.random() * (right - newleft + 1) + newleft);
                         }
                         else
                         {
                             if(newleft != 1)
                             {
                                 return Math.floor(Math.random() * newleft);
                             }
                             else
                             {
                                 return Math.random();
                             }
                         }
                     }


var triggersRandom = function(rand, xrange)
                     {
                         var left      = (typeof xrange == "undefined") ? 10 : xrange ;
                         var generated = generateRandom(left);
    
                         for(var i=0; i<rand.length; i++)
                         {
                             if(i == generated)
                             {
                                 return true;
                             }
                         }
    
                         return false;
                     }


var getArrayKeys = function(arr)
                   {
                       var keys = [];

                       for(var key in arr)
                       {
                           keys.push(key);
                       }
    
                       return keys;
                   }


var getArrayValues = function(arr)
                     {
                         var values = [];

                         for(var val in arr)
                         {
                             values.push(arr[val]);
                         }
    
                         return values;
                     }



var in_array = function(needle, haystack)
               {
                   for(key in haystack)
                   {
                       if(haystack[key] == needle)
                       {
                           return true;
                       }
                   }

                   return false;
               }



var array_unique = function(arr)
                   {
                       var a = [];
                       var l = arr.length;

                       for(var i=0; i<l; i++) 
                       {
                           for(var j=i+1; j<l; j++) 
                           {
                               if (arr[i] === arr[j])
                               {
                                   j = ++i;
                               }
                           }
                           a.push(arr[i]);
                       }

                       return a;
                   };



var chooseRandom = function(arr)
                   {
                       var len  = arr.length;
                       var rand = Math.random();

                       return arr[Math.floor(rand*len)];
                   }


var getKey = function(apiKey)
             {
                 return chooseRandom(Config.apiKeys[apiKey]);
             }


var dlevenshtein = function(a, b)
                   {
	                   var i, j, cost;
	                   var d = new Array();

                       if(a.length == 0 || b.length == 0) { return 0; }

                       for(i=0; i<=a.length; i++)
                       {
                           d[i]    = new Array();
                           d[i][0] = i;
                       }

                       for(j=0; j<=b.length; j++)
                       {
                           d[0][j] = j;
                       }

                       for(i=1; i<=a.length; i++)
                       {
                           for(j=1; j<=b.length; j++)
                           {
                               if(a.charAt(i-1) == b.charAt(j-1))
                               {
                                   cost = 0;
                               }
                               else
                               {
                                   cost = 1;
                               }

                               d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + cost);

                               if(i > 1 && j > 1 && a.charAt(i - 1) == b.charAt(j-2) && a.charAt(i-2) == b.charAt(j-1))
                               {
                                   d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost)
                               }
                           }
                       }

                       return d[a.length][b.length];
                   }


var computeDistance = function(string, toCmp)
                      {
                          var len  = string.length;
   
                          if(typeof toCmp == "string")
                          {
                              return (len*1.0 - dlevenshtein(string.toLowerCase(), toCmp.toLowerCase()))/len;
                          }
                          else
                          {
                              var rez = {};

                              for(var i=0; i<toCmp.length; i++)
                              {
                                  var arrtl = toCmp[i].toLowerCase();
                                  var itmtl = string.toLowerCase();
                                  var dist  = dlevenshtein(itmtl, arrtl);
                                  var prcnt = (len*1.0 - dist)/len;
            
                                  if(string == arrtl)
                                  {
                                      prcnt = 1.5;    // for the lulz
                                  }
            
                                  rez[i] = prcnt;
                              }
        
                              return rez;
                          }
}


var closeEnough = function(string, toCmp, g, t)
                  {
                      var len       = string.length;
                      var get       = (typeof g == 'undefined') ? false : true;
                      var threshold = (typeof t == 'undefined') ? 0.80  : t;

                      if(typeof toCmp == "string")
                      {
                          var dist = (len*1.0 - dlevenshtein(string.toLowerCase(), toCmp.toLowerCase()))/len;
        
                          if(dist >= threshold)
                          {
                              if(get){ return [toCmp, (toCmp == string)]; }
                              return true;
                          }

                          return false;
                      }
                      else
                      {
                          for(var i=0; i<toCmp.length; i++)
                          {
                              var comp  = getFirstNWords(string.toLowerCase(), toCmp[i].toLowerCase().split(' ').length);
                              var lcomp = comp.length;
                              var dist  = dlevenshtein(comp, toCmp[i]);
                              var conf  = (lcomp*1.0 - dist)/lcomp;

                              if(conf >= threshold)
                              {
                                  if(get){ return [toCmp[i], (toCmp[i] == comp)]; }
                                  return true;
                              }
                          }

                          if(get){ return null; }
                          return false;
                      }
                  }


var getClosest = function(string, toCmp, threshold)
                 {
                     var threshold = (typeof threshold == 'undefined') ? 0.80 : threshold;
                     return closeEnough(string, toCmp, true, threshold);
                 }


var greet = function() 
            {
                var phrases = [
                               "Yes, master?",
                               "At your service",
                               "Unleash my strength",
                               "I'm here. As always",
                               "By your command",
                               "Ready to work!",
                               "Yes, milord?",
                               "More work?",
                               "Ready for action",
                               "Orders?",
                               "What do you need?",
                               "Say the word",
                               "Aye, my lord",
                               "Locked and loaded",
                               "Aye, sir?",
                               "I await your command",
                               "Your honor?",
                               "Command me!",
                               "At once",
                               "What ails you?",
                               "Yes, my firend?",
                               "Is my aid required?",
                               "Do you require my aid?",
                               "My powers are ready",
                               "It's hammer time!",
                               "I'm your robot",
                               "I'm on the job",
                               "You're interrupting my calculations!",
                               "What is your wish?",
                               "How may I serve?",
                               "At your call",
                               "You require my assistance?",
                               "What is it now?",
                               "Hmm?",
                               "I'm coming through!",
                               "I'm here, mortal",
                               "What is it now, mortal",
                               "Wattup",
                               "Yo!",
                               "I guess you found the Droid you were looking for",
                               "01001000 01101001",
                               "I'm ready and waiting",
                               "Ah, at last",
                               "I'm here",
                               "Something need doing?"
                ];

                return chooseRandom(phrases);
            }


var errorMessage = function()
                   {
                       messages = ['(facepalm)', '(boom)', '(gtfo)', '(jackie)', '(troll)', '(dumb)', '(yodawg)'];
                       return chooseRandom(messages) + ' ';
                   }


var quoteName = function(name) 
                {
                    return '@"' + name + '" ';
                }


var removeBad = function(string, bad)
                {
                    for(var i=0; i<bad.length; i++)
                    {
                        if(string.indexOf(bad[i]) == 0 )
                        {
                            string = string.replace(bad[i], "");
                        }
                    }
    
                    return string;
                }


var cut = function(a, b, from)
          {
              from = from.split(a);
              from = from[1].split(b);

              return from[0];
          }


var cutMultiple = function(a, b, from)
                  {
                      var x   = from.split(a);
                      var rez = [];
                      var cnt = 0;

                      for(var i=1; i<x.length; i++)
                      {
                          cut = x[i].split(b)[0]
                          
                          if(cut.length > 1 )
                          {
                              rez[cnt]  = cut;
                              cnt      += 1;
                          }
                      }

                      return rez;
                  }


var ucwords = function(str) 
              {
                  return (str + '').replace(/^([a-z])|\s+([a-z])/g, function($1) 
                  {
                      return $1.toUpperCase();
                  });
              }


var str_replace = function(a, b, from)
                  {
                      if(a.length == b.length)
                      {
                          for(var i=0; i<a.length; i++)
                          {
                              from = from.replace(new RegExp(a[i], 'g'), b[i]);
                          }
                      }

                      return from;
                  }


var getFirstNWords = function(message, integer)
                     {
                         if(message.indexOf(" ") != -1)
                         {
                             tokens = message.split(' ');

                             if(tokens.length < integer) 
                             {
                                 return message;
                             }
                             else
                             {
                                 toReturn = [];

                                 for(var i = 0; i < integer; i++)
                                 {
                                     toReturn[i] = tokens[i];
                                 }
            
                                 return toReturn.join(' ');
                             }
                         }
    
                         return message;
                     }


var it_has = function(it, has, number)
             {
                 if(it.indexOf(has) != -1)
                 {
                     if(typeof number == "boolean")
                     {
                         return it.indexOf(has);
                     }

                     return true;
                 }

                 if(typeof number == "boolean")
                 {
                     return it.indexOf(has);
                 }
    
                 return false;
             }


var consoleLog = function(message) 
                 {
                     if (Config.printToConsole == true)
                     {
                         var d = new Date;
                         var month = ("0" + (d.getMonth()+1).toString()).slice(-2);
                         var day   = ("0" + d.getDate().toString()).slice(-2);
                         var hours = ("0" + d.getHours().toString()).slice(-2);
                         var mins  = ("0" + d.getMinutes().toString()).slice(-2);
                         var secs  = ("0" + d.getSeconds().toString()).slice(-2);
                         var msecs = ("0" + d.getMilliseconds().toString()).slice(-3);
                         var year  = d.getFullYear().toString();

                         console.log('<[' + month + '-' + day + '-' + year + ' ' + 
                                     hours + ':' + mins + ':' + secs + '.' + msecs + 
                                     ']>   ' + message);
                     }
                 }


var getFileExtension = function(name)
                       {
                           var i = name.lastIndexOf('.');
                           return (i < 0) ? '' : name.substr(i);
                       }


var getFilesFromDir = function(dir, done) 
                      {
                          var results = [];
    
                          fs.readdir(dir, function(err, list) 
                          {
                              if (err) { return done(err); }
        
                              var pending = list.length;

                              if (!pending) { return done(null, results); }
        
                              list.forEach(function(file) 
                              {
                                  file = dir + '/' + file;
            
                                  fs.stat(file, function(err, stat) 
                                  {
                                      if (stat && stat.isDirectory()) 
                                      {
                                          getFilesFromDir(file, function(err, res) 
                                          {
                                              results = results.concat(res);
                                              if (!--pending) { done(null, results); }
                                          });
                                      }
                                      else
                                      {
                                          results.push(file);
                                          if (!--pending) { done(null, results); }
                                      }
                                  });
                              });
                          });
                      };


print = function(txt)
        {
            console.log(txt);
        }


exports.NedCaller          = /^([\@\!\#\$\~\%\/\\/]*)?/;
exports.NedName            = /([Nn][Ee][Dd][Dd]?([Dd]?[Aa][Rr][Dd])?( *[^A-Za-z0-9]* *)?)/;
exports.NedPMName          = /([Nn][Ee][Dd][Dd]?([Dd]?[Aa][Rr][Dd])?( *[^A-Za-z0-9]* *)? ?)?/;
exports.greet              = greet;
exports.cut                = cut;
exports.cutMultiple        = cutMultiple;
exports.padd               = padd;
exports.clarify            = clarify;
exports.quoteName          = quoteName;
exports.removeBad          = removeBad;
exports.getFirstNWords     = getFirstNWords;
exports.ucwords            = ucwords;
exports.str_replace        = str_replace;
exports.getFileExtension   = getFileExtension;
exports.chooseRandom       = chooseRandom;
exports.getKey             = getKey;
exports.errorMessage       = errorMessage;
exports.getArrayKeys       = getArrayKeys;
exports.getArrayValues     = getArrayValues;
exports.in_array           = in_array;
exports.array_unique       = array_unique;
exports.dlevenshtein       = dlevenshtein;
exports.computeDistance    = computeDistance;
exports.closeEnough        = closeEnough;
exports.getClosest         = getClosest;
exports.it_has             = it_has;
exports.consoleLog         = consoleLog;
exports.generateRandom     = generateRandom;
exports.triggersRandom     = triggersRandom;
exports.getFilesFromDir    = getFilesFromDir;
