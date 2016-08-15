/*
	Commands for Skrub feature
*/

Settings.addPermissions(['setskrub']);

exports.commands = {
	/* Fast aliases */
	//Add games aliases here. Example -> pa: 'pokeanagrams',
	sk: 'skrub',

	/* General commands */
	skrub: function (arg, by, room, cmd) {
		if (!Settings.settings['skrub']) Settings.settings['skrub'] = {};
		var skrub = Settings.settings['skrub']['skrub'];
		
    if (!skrub) return this.restrictReply("No-one's a skrub.");
    return this.restrictReply("The skrub is " + skrub + ".");
	},
	
	setskrub: function(arg, by, room, cmd) {
	  if (!this.can("setskrub")) return false;
	  if (!Settings.settings['skrub']) Settings.settings['skrub'] = {};
	  var skrub = arg;
	  
	  Settings.settings['skrub']['skrub'] = skrub;
	  return this.reply("The skrub has been set to " + skrub + ".");
	},
	
	clearskrub: function(arg, by, room, cmd) {
	  if (!this.can("setskrub")) return false;
	  if (!Settings.settings['skrub']) Settings.settings['skrub'] = {};

	  Settings.settings['skrub']['skrub'] = undefined;
	  return this.reply("The skrub has been cleared of their skrubness.");
	}
};
