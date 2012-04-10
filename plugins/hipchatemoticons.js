    
var http = require('http');


var trigger = ['hipchat emoticon', 'hipchat smilie', 'hipchat meme'];
var help    = [{
               usage       : 'hipchat emoticons', 
               description : 'This will return all the hipchat emoticons and memes'
              }];
module.exports.help = help



module.exports.load = function(bot) 
{
    var assembleInput = "("+trigger.join("|")+")";    
    var callerRegEx   = new RegExp(Util.NedCaller.source + Util.NedName.source   + " " + assembleInput + "(.*)$", "i");
    var pmCallerRegEx = new RegExp(Util.NedCaller.source + Util.NedPMName.source + ""  + assembleInput + "(.*)$", "i");

    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(pmCallerRegEx, onPMessage);
};


var onMessage = function(channel, frm, msg, x) 
{
    this.message(channel, 'Please message me `hipchat emoticons` in private chat');
    this.message(channel, "Here is a random one " + all[Math.floor(Math.random()*all.length)]);
    
}

var onPMessage = function(channel, frm, msg, x) 
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

    
    var temp = '';    

    for(var i=1; i < all.length+1; i++)
    {
        temp += all[i-1]+' '.toString().replace(/\n\r/, '');
        
        if(i % 5 == 0)
        {
            self.message(channel, temp);
            temp = '';
        }
        
    }


    return true;
};

var all = ['(allthethings)', '(android)', '(areyoukiddingme)', '(arrington)', '(awyeah)', '(badpokerface)', '(basket)', '(beer)', '(bumble)', '(bunny)', '(cadbury)', '(cake)', '(candycorn) ', '(caruso) ', '(cereal)', '(challengeaccepted)', '(chewie) ', '(chocobunny)',  '(chompy) ', '(chris)', '(coffee)', '(content)', '(cornelius)', '(disapproval)', '(dosequis)', '(ducreux)', '(dumb)', '(facepalm)', '(foreveralone)', '(fry)', '(fu)', '(fuckyeah)', '(garret)', '(gates)', '(gaytroll)', '(ghost) ', '(goodnews)', '(greenbeer)', '(gtfo)', '(haveaseat) ', '(heart)', '(hipchat)', '(hipster)', '(huh)', '(ilied)', '(itsatrap)', '(jackie)', '(jobs)', '(kennypowers)', '(krang)', '(kwanzaa)', '(lincoln)', '(lol)', '(lolwut)', '(megusta)', '(menorah)', '(notbad)', '(ohcrap)', '(okay)', '(omg)', '(pbr)', '(pete)', '(philosoraptor) ', '(pingpong)', '(pirate)', '(poo)', '(present)', '(pumpkin) ', '(rageguy)', '(rebeccablack)', '(reddit)', '(rudolph)', '(sadpanda)', '(sadtroll)', '(samuel) ', '(santa)', '(seomoz)', '(shamrock)', '(sweetjesus)', '(taft)', '(thumbsdown)', '(thumbsup)', '(tree)', '(troll)', '(turkey)', '(washington)', '(wtf)', '(yey)', '(yuno)', '(zoidberg) ', '(zzz)'];

