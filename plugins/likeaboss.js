var plugin = {
              name        : 'likeaboss',
              trigger     : ".*([Ll]ike a (baws|boss|bauss|baus)).*$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
   var resp  = [
                "http://s3.amazonaws.com/kym-assets/photos/images/original/000/114/151/14185212UtNF3Va6.gif?1302832919",
                "http://verydemotivational.files.wordpress.com/2011/06/demotivational-posters-like-a-boss.jpg",
                "http://assets.head-fi.org/b/b3/b3ba6b88_funny-facebook-fails-like-a-boss3.jpg",
                "http://img.anongallery.org/img/6/0/like-a-boss.jpg",
                "http://www.18seven.com/wp-content/uploads/IMG_1745.jpg",
                "http://i3.kym-cdn.com/photos/images/original/000/151/513/memes-like-a-boss2.jpg",
                "http://i3.kym-cdn.com/photos/images/original/000/094/222/epic-win-photos-therapy-evaluation-win.jpg",
                "http://i2.kym-cdn.com/photos/images/original/000/193/948/UnLitPipe03-filtered1.jpg",
                "http://images.cheezburger.com/completestore/2011/2/20/a4ea536d-4b21-4517-b498-a3491437d224.jpg",
                "http://www.japemonster.com/wp-content/uploads/2011/08/demotivational-posters-like-a-boss.jpg",
               ]

    if(Util.triggersRandom([7, 3]))
    {
        sendMessage(Util.chooseRandom(resp));
    }

    return true;
}
