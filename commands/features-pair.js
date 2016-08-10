/*
	Commands for Games feature
*/

exports.commands = {
	/* Fast aliases */
	//Add games aliases here. Example -> pa: 'pokeanagrams',

	/* General commands */
	pair: function (arg, by, room, cmd) {
		var args = arg.split(",");
		if (args.length != 2) return this.reply("Please pair up two people/Pokemon.");
		if (args[0].length >= 19 || args[1].length >= 19) return this.reply("Names must be up to less than 19 characters long.");
		this.reply(args[0] + " and " + args[1] + " are " + Math.round(Math.random() * 100).toString() + "% compatible!");
	}
};
