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
  'seed': 123456,
  'max': 100
}

exports.commands = {
	/* Fast aliases */
	//Add games aliases here. Example -> pa: 'pokeanagrams',

	/* General commands */
	pair: function (arg, by, room, cmd) {
	  if (!Settings.settings['pair']) Settings.settings['pair'] = initialPair;
	  var seed = Settings.settings['pair']['seed'];
	  var max = Settings.settings['pair']['max'];
	  
	  var args = arg.split(",");
		if (args.length != 2) return this.restrictReply("Please pair up two people/Pokemon.");
		if (args[0].length > 19 || args[1].length > 19) return this.restrictReply("Names must be up to 19 characters long.");
	  
		this.restrictReply(args[0] + " and " + args[1] + " are " + Math.abs(((args[0].trim().hashCode() + args[1].trim().hashCode()) * seed) % max).toString() + "% compatible!");
	},
	
	rawpair: function (arg, by, room, cmd) {
	  if (!this.isRanked('admin')) return false;
	  
	  var args = arg.split(",");
		if (args.length != 2) return this.restrictReply("Please pair up two people/Pokemon.");
		if (args[0].length > 19 || args[1].length > 19) return this.restrictReply("Names must be up to 19 characters long.");
		
		var arg0Hash = args[0].trim().hashCode();
		var arg1Hash = args[1].trim().hashCode();
		var hash = arg0Hash + arg1Hash;
	  
		this.restrictReply(arg0Hash.toString() + ", " + arg1Hash.toString() + ", Total: " + hash.toString());
	}
};
