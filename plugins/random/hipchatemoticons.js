var plugin = {
              name        : 'hipchatemoticons',
              trigger     : ['hipchat emoticon', 'hipchat emoticons', 'hipchat smilie', 'hipchat meme'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'This will return all the hipchat emoticons and memes',
              usage       : 'ned hipchat emoticons'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{

    var emoticons = ['(allthethings)', '(android)', '(areyoukiddingme)', '(arrington)', '(awyeah)', '(badpokerface)', '(basket)', '(beer)', '(bumble)', '(bunny)', '(cadbury)', '(cake)', '(candycorn) ', '(caruso) ', '(cereal)', '(challengeaccepted)', '(chewie) ', '(chocobunny)',  '(chompy) ', '(chris)', '(coffee)', '(content)', '(cornelius)', '(disapproval)', '(dosequis)', '(ducreux)', '(dumb)', '(facepalm)', '(foreveralone)', '(fry)', '(fu)', '(fuckyeah)', '(garret)', '(gates)', '(gaytroll)', '(ghost) ', '(goodnews)', '(greenbeer)', '(gtfo)', '(haveaseat) ', '(heart)', '(hipchat)', '(hipster)', '(huh)', '(ilied)', '(itsatrap)', '(jackie)', '(jobs)', '(kennypowers)', '(krang)', '(kwanzaa)', '(lincoln)', '(lol)', '(lolwut)', '(megusta)', '(menorah)', '(notbad)', '(ohcrap)', '(okay)', '(omg)', '(pbr)', '(pete)', '(philosoraptor) ', '(pingpong)', '(pirate)', '(poo)', '(present)', '(pumpkin) ', '(rageguy)', '(rebeccablack)', '(reddit)', '(rudolph)', '(sadpanda)', '(sadtroll)', '(samuel) ', '(santa)', '(seomoz)', '(shamrock)', '(sweetjesus)', '(taft)', '(thumbsdown)', '(thumbsup)', '(tree)', '(troll)', '(turkey)', '(washington)', '(wtf)', '(yey)', '(yuno)', '(zoidberg) ', '(zzz)'];

    if(!get.isPrivate)
    {
        sendMessage('Please message me `hipchat emoticons` in private chat');
        sendMessage("Here is a random one " + Util.chooseRandom(emoticons));
    }
    else
    {
        var temp = '';    

        for(var i=1; i < emoticons.length+1; i++)
        {
            temp += emoticons[i-1]+' '.toString().replace(/\n\r/, '');
            
            if(i % 5 == 0)
            {
                sendMessage(temp);
                temp = '';
            }
        }
    }

    return true;
}
