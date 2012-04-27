var plugin = {
              name        : 'time',
              trigger     : ['whats the time', 'the time', 'what is the current time', 'tell me the time', 'what time is it', 'what time it is', 'time', 'current time', 'date', 'whats the date', 'todays date'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Tells you the time',
              usage       : 'ned time'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = new Date();
    var hr   = date.getHours();
    var m    = date.getMinutes();
    var day  = days[date.getDay()];
    var dat  = date.getDate();
    var mon  = months[date.getMonth()];
    var ampm = (hr > 11) ? 'PM' : 'AM';
    var curr = "It's " + hr % 12 + ":" + m + " " + ampm + ", " + day + " " + mon + " " + dat;

    var currTime = ["It's time to get a watch", curr, curr, curr, curr];    
    sendMessage(Util.chooseRandom(currTime));

    return true;    
}
