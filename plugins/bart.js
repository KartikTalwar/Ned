var plugin = {
              name        : 'bart',
              trigger     : ['bart'],
              enabled     : 'true',
              fuzzy       : 'false',
              description : 'Returns BART schedule',
              usage       : '@ned bart from montgomery to powell'
             };

module.exports.plugin = plugin;

module.exports[plugin.name] = function(get)
{

    // This is horribly done, someone please improve it

    var closestValue = function(a, b, c)
    {
        for(var i=0; i<b.length; i++)
        {
            if(b[i] == a)
            {
                var ret = c[i];
                break;
            }
        }
        
        return ret;
    }

    var stations = {
                    "12TH" : "12TH",
                    "16TH" : "16TH",
                    "19TH" : "19TH",
                    "24TH" : "24TH",
                    "ASHB" : "ASHB",
                    "BALB" : "BALB",
                    "BAYF" : "BAYF",
                    "CAST" : "CAST",
                    "CIVC" : "CIVC",
                    "COLS" : "COLS",
                    "COLM" : "COLM",
                    "CONC" : "CONC",
                    "DALY" : "DALY",
                    "DBRK" : "DBRK",
                    "DUBL" : "DUBL",
                    "DELN" : "DELN",
                    "PLZA" : "PLZA",
                    "EMBR" : "EMBR",
                    "FTVL" : "FTVL",
                    "GLEN" : "GLEN",
                    "HAYW" : "HAYW",
                    "LAFY" : "LAFY",
                    "LAKE" : "LAKE",
                    "MCAR" : "MCAR",
                    "MLBR" : "MLBR",
                    "MONT" : "MONT",
                    "FRMT" : "FRMT",
                    "NBRK" : "NBRK",
                    "NCON" : "NCON",
                    "ORIN" : "ORIN",
                    "PITT" : "PITT",
                    "PHILL" : "PHILL",
                    "POWL" : "POWL",
                    "RICH" : "RICH",
                    "ROCK" : "ROCK",
                    "SBRN" : "SBRN",
                    "SFIA" : "SFIA",
                    "SANL" : "SANL",
                    "SHAY" : "SHAY",
                    "SSAN" : "SSAN",
                    "UCITY" : "UCITY",
                    "WCRK" : "WCRK",
                    "WDUB" : "WDUB",
                    "WOAK" : "WOAK",
                    "12th St. Oakland City Center" : "12TH",
                    "16th St. Mission" : "16TH",
                    "19th St. Oakland" : "19TH",
                    "24th St. Mission" : "24TH",
                    "Ashby" : "ASHB",
                    "Balboa Park" : "BALB",
                    "Bay Fair" : "BAYF",
                    "Castro Valley" : "CAST",
                    "Civic Center/UN Plaza" : "CIVC",
                    "Coliseum/Oakland Airport" : "COLS",
                    "Colma" : "COLM",
                    "Concord" : "CONC",
                    "Daly City" : "DALY",
                    "Downtown Berkeley" : "DBRK",
                    "Dublin/Pleasanton" : "DUBL",
                    "El Cerrito del Norte" : "DELN",
                    "El Cerrito Plaza" : "PLZA",
                    "Embarcadero" : "EMBR",
                    "Fremont" : "FRMT",
                    "Fruitvale" : "FTVL",
                    "Glen Park" : "GLEN",
                    "Hayward" : "HAYW",
                    "Lafayette" : "LAFY",
                    "Lake Merritt" : "LAKE",
                    "MacArthur" : "MCAR",
                    "Millbrae" : "MLBR",
                    "Montgomery St" : "MONT",
                    "North Berkeley" : "NBRK",
                    "North Concord/Martinez" : "NCON",
                    "Orinda" : "ORIN",
                    "Pittsburg/Bay Point" : "PITT",
                    "Pleasant Hill/Contra Costa Centre" : "PHILL",
                    "Powell St" : "POWL",
                    "Richmond" : "RICH",
                    "Rockridge" : "ROCK",
                    "San Bruno" : "SBRN",
                    "San Francisco Intl Airport" : "SFIA",
                    "San Leandro" : "SANL",
                    "South Hayward" : "SHAY",
                    "South San Francisco" : "SSAN",
                    "Union City" : "UCITY",
                    "Walnut Creek" : "WCRK",
                    "West Dublin/Pleasanton" : "WDUB",
                    "West Oakland" : "WOAK"
                   };

    if(get.isEmpty)
    {
        sendMessage(Util.errorMessage() + "Please check your input");
    }
    else
    {
        var bad = ['from', 'directions to', 'to', 'directions from', 'directions for', 'directions', 'schedule for', 'schedule of', 'schedule', 'times for', 'times', 'time for', 'time', 'schedules for', 'schedules of', 'schedules'];
        var input = Util.removeBad(Util.clarify(get.message), bad);

        try
        {
            var st    = Util.getArrayKeys(stations);
            var _from = Util.clarify(input.split(' to ')[0]);
            var _to   = input.split(' to ')[1];
            
            if( _to.indexOf(' at ') != -1 )
            { 
                _to = Util.clarify(_to.split(' at ')[0]);
                var _ti   = Util.clarify(input.split(' at ')[1]);
                    _ti = _ti.split(' ').join('');
                    _ti = _ti.replace('pm', '%2Bpm');
                    _ti = _ti.replace('am', '%2Bam');
                    _ti = _ti.replace(/\s/, '');
            }
            else
            {
                var _ti = 'now';
            }

            var gc1 = Util.getArrayValues(Util.computeDistance(_from, st));
            var mx1 = Math.max.apply(null, gc1);
            var d1  = stations[closestValue(mx1, gc1, st)];

            var gc2 = Util.getArrayValues(Util.computeDistance(_to, st));
            var mx2 = Math.max.apply(null, gc2);
            var d2  = stations[closestValue(mx2, gc2, st)];
            
            var httpRequestParams = 
            {
                host : "query.yahooapis.com",
                port : 80,
                path : "/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fapi.bart.gov%2Fapi%2Fsched.aspx%3Fcmd%3Ddepart%26orig%3D" + d1 + "%26dest%3D" + d2 + "%26date%3Dnow%26time%3D" + _ti + "%26key%3D" + Util.getKey("bart") + "%26b%3D0%26a%3D3%26l%3D1'&format=json"
            };

            http.get(httpRequestParams, function(res) 
            {
                var data = '';

                res.on('data', function(chunk)
                {
                    data += chunk;
                });
                
                res.on('end', function(chunk) 
                {
                   
                    try 
                    { 
                        var j      = JSON.parse(data).query.results.root;
                        var fromid = j.origin;
                        var toid   = j.destination;
                        
                        var sched = j.schedule.request.trip;
                        var resp  = ["Upcoming schedules - from " + fromid + " to " + toid + " at "+ _ti.split('%2B').join(' ') + "\n" ];

                        for(var i=1; i < sched.length+1; i++)
                        {
                            var dtime = sched[i-1].origTimeMin;
                            var atime = sched[i-1].destTimeMin;
                            var fare  = sched[i-1].fare;

                            resp[i] =  "Next : " + dtime + " [arrives at " + atime + "] ($" + fare + ")";
                        }
                        
                        sendMessage(resp.join("\n"));
                    }
                    catch(err)
                    {
                        sendMessage("(facepalm) Error");
                    }
                });
            });

        }
        catch(err1)
        {
            sendMessage("(facepalm) Please check the format of your input");
        }
    }

    return true;
}
