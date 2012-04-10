var ImapConnection = require('imap').ImapConnection, util = require('util'), imap = new ImapConnection({
    username: Config.email_address,
    password: Config.email_password,
    host: 'imap.gmail.com',
    port: 993,
    secure: true
});
var now = new Date();
var dateStr = '' + now.getFullYear() + '/' + (now.getMonth()+1) + '/' + now.getDate();


function checkEmail () {
    Logger.consoleLog("Checking email");
    //imap.connect(imapConnectCallback);
}
function imapConnectCallback(err) {
    if (err) {
        Logger.consoleLog(err);
        return;
    }
    //imap.openBox('INBOX', false, imapOpenBoxCallback);
}
function imapOpenBoxCallback(err, box) {
    if (err) {
        Logger.consoleLog(err);
        imap.logout(imapLogoutCallback);
        return;
    }

    //imap.search([ 'UNSEEN', ['SINCE', dateStr] ], imapSearchCallback);
}
function imapSearchCallback(err, results) {
    if (err) {
        Logger.consoleLog(err);
        //imap.logout(imapLogoutCallback);
        return;
    } else if (results.length == 0) {
        //imap.logout(imapLogoutCallback);
        return;
    }

    var fetch = imap.fetch(results, { request: { headers: ['from', 'to', 'subject', 'date'] }, markSeen: true });
    fetch.on('message', function(msg) {
        msg.on('end', function() {
            alertSummary = msg.headers.subject + ' (' + msg.headers.date + ')';

            for (var i = 0; i < Config.rooms.length; i++) {
                if (Config.rooms[i].alerts == true && (Config.rooms[i].alertRegex == null || alertSummary.match(Config.rooms[i].alertRegex))) {
                    TaggedBot.message(Config.rooms[i].jid, alertSummary);
                }
            }
        });
    });
    fetch.on('end', function() {
        imap.logout(imapLogoutCallback);
    });
}
function imapLogoutCallback(err) {
    Logger.consoleLog("Email checked");
}

// run after 10 seconds
//setTimeout(checkEmail, 10000);
// repeat every 5 minutes
//setInterval(checkEmail, 300000);
