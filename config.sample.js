
// Can be obtained from https://www.hipchat.com/account/xmpp

var conf_server     = 'conf.hipchat.com';
var chat_server     = 'chat.hipchat.com';

exports.user_id     = '00_12345';
exports.password    = '';
exports.name        = 'Ned Bot'; // this must match the actual name as set on hipchat.com


// HipChat Rooms to Join (can be found from the lobby tab)
exports.rooms  = [
    'devs',
    'interns',
    'engineering',
    'all_employees'
];


exports.printToConsole  = true;   // print logging to stdout
exports.debugXMPP       = false;  // print XMPP protocol dump for debug (very verbose)
exports.reconnectWaitMs = 300;    // time before reconnect attempt (5 mins)
exports.bing_api_key    = '';     // bing.com api key
exports.bart_key        = '';     // california BART api key
exports.dictionary_key  = '';     // abbreviations.com api key


// plugins to load under plugins dir
exports.pluginsToLoad   = [
    {name: 'help',               path: 'help'},
    {name: 'server',             path: 'webAI'},
    {name: 'spotify',            path: 'spotify'},
    {name: 'youtube',            path: 'youtube'},
    {name: 'weather',            path: 'weather'},    
    {name: 'maps',               path: 'maps'},
    {name: 'calculator',         path: 'calculator'},
    {name: 'time',               path: 'time'},
    {name: 'greet',              path: 'greet'},
    {name: 'haters',             path: 'haters'},    
    {name: 'stock',              path: 'stock'},        
    {name: 'sudo',               path: 'sudo'},            
    {name: 'chucknorris',        path: 'chucknorris'},    
    {name: 'likeaboss',          path: 'likeaboss'},        
    {name: 'twss',               path: 'twss'},  
    {name: 'shipit',             path: 'shipit'},        
    {name: 'rules',              path: 'rules'},
    {name: '9gag',               path: '9gag'},    
    {name: 'bing',               path: 'bing'},    
    {name: 'carlton',            path: 'carlton'},
    {name: 'note2self',          path: 'note2self'},
    {name: 'stackoverflow',      path: 'stackoverflow'},            
    {name: 'googleimage',        path: 'googleimage'},                
    {name: 'whoami',             path: 'whoami'},    
    {name: 'lmgtfy',             path: 'lmgtfy'},
    {name: 'mustachify',         path: 'mustachify'},    
    {name: 'ithinkso',           path: 'ithinkso'},
    {name: 'wikipedia',          path: 'wikipedia'},
    {name: 'define',             path: 'define'},        
    {name: 'insult',             path: 'insult'},            
    {name: 'bart',               path: 'bart'},        
    {name: 'langdocumentation',  path: 'langdocumentation'},        
    {name: 'hipchatemoticons',   path: 'hipchatemoticons'},
    {name: 'jeffdean',           path: 'jefdean'}
];




// specify '/bot' resource so we don't get the scrollbacks of rooms
exports.jid          = exports.user_id + '@' + chat_server + '/bot';
exports.customerID   = exports.user_id.split('_')[0] + "_";  // determine the user and room prefix


// Add the conference server string to each channel
for (var i = 0; i < exports.rooms.length; i++) 
{
    exports.rooms[i] = exports.customerID + exports.rooms[i] + '@' + conf_server;
}


