
memory = new Db.Database('neuron.mem');


memory.serialize(function() 
{
    memory.run("CREATE TABLE IF NOT EXISTS Note2Self (id INTEGER PRIMARY KEY, user VARCHAR(30), message TEXT)");
    memory.run("CREATE TABLE IF NOT EXISTS Debug (id INTEGER PRIMARY KEY, user VARCHAR(50), attempts INTEGER, time INTEGER)");
});


var getTerm = function(msg, list)
              {
                  var terms = "(" + list.join('|') + ")";
                  var clean = msg.replace(RegExp(terms, "i"), '');

                  return Util.clarify(clean);
              }


var analyze = function(plugins, parameters)
              {
                  var ned         = (parameters.isPrivate) ? Util.NedPMName.source : Util.NedName.source + "( ?)"; 
                  var message     = parameters["message"];
                  var fullMessage = parameters["fullMessage"];

                  for(i in plugins)
                  {
                      var id   = i;
                      var det  = plugins[id];
                      var trig = det.trigger;
                      var fuzz = det.fuzzy;

                      if(typeof trig == "object")
                      {
                          if(fullMessage.match(new RegExp(Util.NedCaller.source + ned, "i")))
                          {
                              var threshold = (fuzz == "true") ? 0.80 : 0.99;
                              var closest   = Util.getClosest(message, trig, threshold);

                              if(closest != null)
                              {
                                  if(!closest[1])
                                  {
                                      var brk = closest[0].split(' ');
                                      message = (typeof brk == "object") ? message.split(' ').splice(brk.length).join(' ') : message.substring(brk.length);
                                  }

                                  parameters.message  = getTerm(message, plugins[id].trigger);
                                  parameters.isEmpty  = (parameters.message.split(' ').join('').length == 0) ? true : false;
                                  parameters.pluginId = id;

                                  return id;
                              }
                          }
                      }
                      else
                      {
                          if(fullMessage.match(new RegExp(trig, 'i')))
                          {
                              parameters.pluginId = id;
                              return id;
                          }
                      }
                  }

                  return null;
              }


exports.analyze = analyze;
exports.getTerm = getTerm;
