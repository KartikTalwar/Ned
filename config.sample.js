// NOTE: HipChat XMPP details such as the jid and channels to join can be obtained
// from https://www.hipchat.com/account/xmpp

var conf_server         = 'conf.hipchat.com';
var chat_server         = 'chat.hipchat.com';
var user_email          = 'nedbot@mysite.com';  // just for reference

exports.user_id         = '0000_123456';
exports.password        = '';
exports.name            = 'Ned Bot'; // this must match the actual name as set on hipchat.com


// channels for the bot to join upon connect and alerts configuration
exports.roomsToJoin  = [
    'botz',
    'all_employees'
];


// Only bother editing this if you will be setting joinAllRooms below to true
exports.roomsNotToJoin = [
    'super_duper_secret_room'
];


exports.admins = ['123456', '123456'];


exports.printToConsole  = true;   // print logging to stdout
exports.debugXMPP       = false;  // print XMPP protocol dump for debug (very verbose)
exports.joinAllRooms    = false;
exports.reconnectWaitMs = 10000; // time before reconnect attempt
exports.customerID      = exports.user_id.split('_')[0] + "_";  // determine the user and room prefix


// plugins to load under plugins dir
exports.pluginsToLoad   = [
    {name: 'help',    path: 'help' },
    {name: 'server',  path: 'index'}
];


exports.ldap_login      = [''];
exports.ldap_password   = [''];
exports.bing_api_key    = [''];
exports.bart_key        = [''];
exports.groupon_key     = [''];
exports.yahoo_api_key   = [''];
exports.dictionary_key  = [''];
exports.wolfram_key     = [''];

exports.jid = exports.user_id + '@' + chat_server + '/bot';

// Add the conference server string to each channel
for (var i = 0; i < exports.roomsToJoin.length; i++) 
{
    exports.roomsToJoin[i] = exports.customerID + exports.roomsToJoin[i] + '@' + conf_server;
}

