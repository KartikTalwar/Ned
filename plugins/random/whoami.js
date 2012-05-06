var plugin = {
              name        : 'whoami',
              trigger     : "[Nn]ed ([Ww]hen are you|[Ww]here are you|[Ww]hoami|[Ww]ho are you|.*ho.*your creator.*|[Ww]ho created you|.*[Tt]uring.*test|[Ww]hy are you)",
              enabled     : 'true',
              fuzzy       : 'false',
              description : '',
              usage       : ''
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{
    var resp = "(jackie) " + get.firstName +  ", I'm here to help you, not try to trick you into thinking I'm something I'm not!";

    if(Util.it_has(get.message, 'ring t'))
    {
        sendMessage(resp);
    }
    else if(Util.it_has(get.message, 'your') || Util.it_has(get.message, 'who a'))
    {
        sendMessage('I am Ned. Its short for Ned');
    }
    else if(Util.it_has(get.message, 'hy are you'))
    {
        sendMessage('I just am.');
    }
    else if(Util.it_has(get.message, 'hen are you'))
    {
        sendMessage('Now is when I am');
    }
    else if(Util.it_has(get.message, 'here are you'))
    {
        sendMessage('In the Matrix, just like you are');
    }
    else
    {
        sendMessage('My creator is Kartik Talwar');
    }
    
    return true;
}
