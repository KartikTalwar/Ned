var plugin = {
              name        : 'ronswanson',
              trigger     : ".*([Rr]on .*[Ss]wanson).*$",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var resp  = [
                  "http://i.imgur.com/kW0f7.jpg",
                  "http://i.imgur.com/vw9gZ.jpg",
                  "http://i.imgur.com/aV6ju.jpg",
                  "http://i.imgur.com/AQBJW.jpg",
                  "http://i.imgur.com/tKkRO.png",
                  "http://i.imgur.com/lkbGP.png",
                  "http://i.imgur.com/mx54e.jpg",
                  "http://i.imgur.com/LASrK.jpg",
                  "http://i.imgur.com/zvUBG.jpg",
                  "http://i.imgur.com/tjqca.jpg",
                  "http://i.imgur.com/q5CYv.jpg",
                  "http://i.imgur.com/HsoXm.jpg",
                  "http://i.imgur.com/6EGQm.jpg",
                  "http://i.imgur.com/DxpKu.jpg",
                  "http://i.imgur.com/h2c7L.jpg",
                  "http://i.imgur.com/jNyXL.jpg",
                  "http://i.imgur.com/K09cJ.jpg",
                  "http://i.imgur.com/mO0UE.jpg",
                  "http://i.imgur.com/9hhkx.jpg"
               ];

    sendMessage(Util.chooseRandom(resp));

    return true;
}
