

module.exports.load = function(bot) 
{
    var assembleInput = /.*([Jj]eff [Dd]ean).*/;
    var callerRegEx   = new RegExp(assembleInput.source, "i");
    var pmCallerRegEx = new RegExp(assembleInput.source, "i");

    bot.onMessage(callerRegEx, onMessage);
    bot.onPrivateMessage(pmCallerRegEx, onMessage);
};


var onMessage = function(channel, frm, msg, x) 
{

    var self             = this;
    var isPrivateMessage = (arguments.length == 3) ? true : false;
    var from             = isPrivateMessage ? '' : frm;
    var tempMessage      = isPrivateMessage ? frm : msg;
    var roomName         = channel.split('@')[0];
    var isSingleWord     = (tempMessage.indexOf(" ") == -1) ? true : false;
    var message          = tempMessage

    var resp  = Util.chooseRandom(jeff);
    var rand  = Math.floor(Math.random()*11);

    if(rand == 3 || rand == 7 || rand == 2)
    {
        self.message(channel, resp);
    }

    return true;
};


var jeff = [
	  "During his own Google interview, Jeff Dean was asked the  implications if P=NP were true.  He said, \"P = 0 or N = 1.\" Then, before  the interviewer had even finished laughing, Jeff examined Google’s  public certificate and wrote the private key on the whiteboard.",
	  "Compilers don’t warn Jeff Dean. Jeff Dean warns compilers.",
	  "The rate at which Jeff Dean produces code jumped by a factor of 40  in late 2000 when he upgraded his keyboard to USB 2.0.",
	  "Jeff Dean builds his code before committing it, but only to check for compiler and linker bugs.",
	  "When Jeff Dean has an ergonomic evaluation, it is for the protection of his keyboard.",
	  "All pointers point to Jeff Dean.",
	  "gcc -O4 emails your code to Jeff Dean for a rewrite.",
	  "Jeff Dean puts his pants on one leg at a time, but if he had more legs, you would see that his approach is O(log n)",
	  "The x86-64 spec includes several undocumented instructions marked 'private use'. They are actually for Jeff Dean's use.",
	  "When he heard that Jeff Dean's autobiography would be exclusive to the platform, Richard Stallman bought a Kindle.",
	  "Jeff Dean writes directly in binary. He then writes the source code as a documentation for other developers.",
	  "Jeff Dean once shifted a bit so hard, it ended up on another computer.",
	  "Jeff Dean Map Reduces his cereal.",
	  "Jeff Dean's Bubble Sort runs in O(1) time",
	  "Jeff Dean's Dropbox quota is bigger than all of YouTube's storage farms",
	  "All of the Google App Engine is actually hosted from Jeff Dean's Nexus S",
	  "PageRank made the Dean's list",
	  "Jeff Dean wrote a genetic algorithm. It made awesome things amongst which are BigTable and Peter Norvig.",
	  "Jeff Dean doesn't kill processes, he slays them.",
	  "Why did Vint Cerf invent the Internet? Because Jeff Dean didn't have time."

	];

