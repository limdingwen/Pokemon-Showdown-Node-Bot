/*
	Commands for Games feature
*/

Settings.addPermissions(['setskrub']);

exports.commands = {
	/* Fast aliases */
	//Add games aliases here. Example -> pa: 'pokeanagrams',
	sk: 'skrub',

	/* General commands */
	skrub: function (arg, by, room, cmd) {
		if (!Settings.settings['skrub']) Settings.settings['skrub'] = {};
    if (!Settings.settings['skrub']['skrub']) return this.reply("No-one's a skrub.");
    return this.reply("The skrub is " + Settings.settings['skrub']['skrub'] + ".");
	},
	
	setskrub: function(arg, by, room, cmd) {
	  if (!this.can("setskrub")) return false;
	  if (!Settings.settings['skrub']) Settings.settings['skrub'] = {};
	  Settings.settings['skrub']['skrub'] = arg;
	  return this.reply("The skrub has been set to " + Settings.settings['skrub']['skrub'] + ".");
	},
	
	clearskrub: function(arg, by, room, cmd) {
	  if (!this.can("setskrub")) return false;
	  if (!Settings.settings['skrub']) Settings.settings['skrub'] = {};
	  Settings.settings['skrub']['skrub'] = undefined;
	  return this.reply("The skrub has been cleared of his skrubness.");
	}
};
