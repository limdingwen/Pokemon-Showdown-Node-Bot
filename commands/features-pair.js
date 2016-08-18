/*
	Commands for Pair feature
*/

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

initialPair = {
  "seed": 123456,
  "max": 100,
  "specials": [
    {
      "pair": ["Gekkonidae", "Liziee"],
      "result": "100000"
    },
    {
      "pair": ["Spotted Hyena", "Hydre(Hydreigon)"],
      "result": "100000"
    },
    {
      "pair": ["Gekkonidae", "Ignis (Charmander)"],
      "result": "Lizard madness"
    },
    {
      "pair": ["EriselleClaraHyn", "Marshall De Vos"],
      "result": "-5"
    },
    {
      "pair": ["And his name", "is"],
      "result": "JOHN CENA"
    },
    {
      "pair": ["Hillary", "Trump"],
      "result": "Death of America"
    },
    {
      "pair": ["Gekk", "Onidae"],
      "result": "Holy pineapple"
    },
    {
      "pair": ["Red Marissa", "longsword"],
      "result": "RUN"
    }
  ]
}; // I intend to move this to pair.json soon.

function toCalc(name) {
  return name.toLowerCase().replace(/[\W_]/, ""); // Makes it case-insensitive and removes symbols and spaces.
}

exports.commands = {
	/* Fast aliases */
	//Add games aliases here. Example -> pa: "pokeanagrams",

	/* General commands */
	pair: function (arg, by, room, cmd) {
	  if (!Settings.settings.pair) Settings.settings.pair = initialPair;
	  var seed = Settings.settings.pair.seed;
	  var max = Settings.settings.pair.max;
	  var specials = Settings.settings.pair.specials;

	  var args = arg.split(",");
		if (args.length != 2) return this.restrictReply("Please pair up two people/Pokemon.");
		if (args[0].length > 19 || args[1].length > 19) return this.restrictReply("Names must be up to 19 characters long.");
	  
	  var argsCalc = args.map(toCalc);

	  var result;
	  for (var i = 0; i < specials.length; i++) {
	    var special = specials[i];
	    
	    var specialCalc = special.pair.map(toCalc);

	    if ((argsCalc[0] == specialCalc[0] && argsCalc[1] == specialCalc[1]) || (argsCalc[0] == specialCalc[1] && argsCalc[1] == specialCalc[0])) result = special.result;
	  }
	  
	  if (!result) result = Math.abs(((argsCalc[0].hashCode() + argsCalc[1].hashCode()) * seed) % max).toString();
		this.restrictReply(args[0] + " and " + args[1] + " are " + result + "% compatible!");
	},
	
	rawpair: function (arg, by, room, cmd) {
	  if (!this.isRanked("admin")) return false;
	  
	  var args = arg.split(",");
		if (args.length != 2) return this.restrictReply("Please pair up two people/Pokemon.");
		if (args[0].length > 19 || args[1].length > 19) return this.restrictReply("Names must be up to 19 characters long.");
		
		var argsCalc = args.map(toCalc);
		var arg0Hash = argsCalc[0].hashCode();
		var arg1Hash = argsCalc[1].hashCode();
		var hash = arg0Hash + arg1Hash;
	  
		this.restrictReply(arg0Hash.toString() + ", " + arg1Hash.toString() + ", Total: " + hash.toString());
	},
	
	reloadpairs: function (arg, by, room, cmd) {
	  if (!this.isRanked("admin")) return false;
	  
  	Settings.settings.pair = initialPair;
  	this.reply("Pairs reloaded.");
	}
};
