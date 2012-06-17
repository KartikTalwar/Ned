  
// HipChat XMPP details such as the jid and channels to join can be obtained
// from https://www.hipchat.com/account/xmpp

var confServer      = 'conf.hipchat.com';
var chatServer      = 'chat.hipchat.com';
var userID          = 'XXXX_01234';
var password        = '';
var name            = 'Ned Bot';
var city            = "San Francisco";
var admins          = ['01234', ''];    // other admin users hipchat ids [without the company id (aka after the "_") ]


var roomsToJoin     = [
                       'botz',
                       '',
                       ''   // dont forget the comma when extending
                      ];

var roomsNotToJoin  = [
                       'super_duper_secret_room'
                       '',
                       ''   // dont forget the comma when extending
                      ];

var apiKeys         = {
                        "bing"       : [''],
                        "bart"       : [''],
                        "groupon"    : [''],
                        "dictionary" : [''],
                        "wolfram"    : ['']
                      }



var printToConsole  = true;   // print logging to stdout
var debugXMPP       = false;  // print XMPP protocol dump for debug (very verbose)
var joinAllRooms    = false;  // join all rooms or not
var reconnectWaitMs = 10000;  // time (s) before reconnect attempt
var reconnectWaitMs = 10000;  // seconds before reconnect attempt
var imBrokenMsgFreq = 2;      // minutes before "I am broken" is sent to admin on error





// The magic happens here
exports.confServer      = confServer;
exports.chatServer      = chatServer;
exports.userID          = userID;
exports.password        = password;
exports.name            = name;
exports.roomsToJoin     = roomsToJoin;
exports.roomsNotToJoin  = roomsNotToJoin;
exports.admins          = admins;
exports.city            = city;
exports.printToConsole  = printToConsole;
exports.debugXMPP       = debugXMPP;
exports.joinAllRooms    = joinAllRooms;
exports.reconnectWaitMs = reconnectWaitMs;
exports.customerID      = userID.split('_')[0] + "_";
exports.apiKeys         = apiKeys;
exports.imBrokenMsgFreq = imBrokenMsgFreq;
exports.imBrokenMessage = "Hello Admin, I just crashed. Can you restart me again?";

