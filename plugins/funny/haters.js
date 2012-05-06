var plugin = {
              name        : 'haters',
              trigger     : ".*(you (hatin|hayte)|haters (gonna|going to) (hate|hait|hayte)).*$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
  var imgs  = [
               "http://www.hatersgoingtohate.com/wp-content/uploads/2010/06/haters-gonna-hate-rubberband-ball.jpg", 
               "http://www.hatersgoingtohate.com/wp-content/uploads/2010/06/haters-gonna-hate-cat.jpg", 
               "http://jesad.com/img/life/haters-gonna-hate/haters-gonna-hate01.jpg", 
               "http://i671.photobucket.com/albums/vv78/Sinsei55/HatersGonnaHatePanda.jpg", 
               "http://24.media.tumblr.com/tumblr_lltwmdVpoL1qekprfo1_500.gif", 
               "http://s3.amazonaws.com/kym-assets/photos/images/newsfeed/000/087/536/1292102239519.gif", 
               "http://i391.photobucket.com/albums/oo351/PikaPow3/squirtle.gif", 
               "http://icanhasinternets.com/wp-content/uploads/2010/05/haters.gif", 
               "http://icanhasinternets.com/wp-content/uploads/2010/05/haters5.jpg"
              ]

    if(Util.triggersRandom([3, 7]))
    {
        sendMessage(Util.chooseRandom(imgs));
    }

    return true;
}
