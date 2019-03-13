'use strict';
/*eslint no-restricted-modules: [0]*/

let color = require('../config/color');
//let moment = require('moment');

let BR = '<br>';
let SPACE = '&nbsp;';
let profileColor = '#24678d';
let trainersprites = [1, 2, 101, 102, 169, 170, 265, 266, 168];

/**
 * Profile constructor.
 *
 * @param {Boolean} isOnline
 * @param {Object|String} user - if isOnline then Object else String
 * @param {String} image
 */
function Profile(isOnline, user, image) {
	this.isOnline = isOnline || false;
	this.user = user || null;
	this.image = image;

	this.username = Chat.escapeHTML(this.isOnline ? this.user.name : this.user);
	this.url = Config.avatarurl || '';
}

/**
 * Create an bold html tag element.
 *
 * Example:
 * createFont('Hello World!');
 * => '<b>Hello World!</b>'
 *
 * @param {String} color
 * @param {String} text
 * @return {String}
 */
function bold(text) {
	return '<b>' + text + '</b>';
}

/**
 * Create an font html tag element.
 *
 * Example:
 * createFont('Hello World!', 'blue');
 * => '<font color="blue">Hello World!</font>'
 *
 * @param {String} color
 * @param {String} text
 * @return {String}
 */
function font(color, text) {
	return '<font color="' + color + '">' + text + '</font>';
}


/**
 * Create an img tag element.
 *
 * Example:
 * createImg('phil.png');
 * => '<img src="phil.png" height="80" width="80" align="left">'
 *
 * @param {String} link
 * @return {String}
 */
function img(link) {
	return '<img src="' + link + '" height="80" width="80">';
}

/**
 * Create a font html element wrap around by a bold html element.
 * Uses to `profileColor` as a color.
 * Adds a colon at the end of the text and a SPACE at the end of the element.
 *
 * Example:
 * label('Name');
 * => '<b><font color="#24678d">Name:</font></b> '
 *
 * @param {String} text
 * @return {String}
 */
function label(text) {
	return bold(font(profileColor, text + ':')) + SPACE;
}

function currencyName(amount) {
	let name = " buck";
	return amount === 1 ? name : name + "s";
}

Profile.prototype.avatar = function () {
	if (this.isOnline) {
		if (typeof this.image === 'string') return img(this.url + ':' + Config.port + '/avatars/' + this.image);
		return img('http://play.pokemonshowdown.com/sprites/trainers/' + this.image + '.png');
	}
	for (let name in Config.customAvatars) {
		if (this.username === name) {
			return img(this.url + ':' + Config.port + '/avatars/' + Config.customAvatars[name]);
		}
	}
	let selectedSprite = trainersprites[Math.floor(Math.random() * trainersprites.length)];
	return img('http://play.pokemonshowdown.com/sprites/trainers/' + selectedSprite + '.png');
};

Profile.prototype.sigPokemon = function () {
	let css = 'border:none;background:none;padding:0;float:left;';
	if (this.username === "KuraiTenshi26") {return '<button style="' + css + '" name="parseCommand" value="/user ' + this.username + '">' + img('http://play.pokemonshowdown.com/sprites/bw-shiny/lopunny-mega.png') + "</button>"}
	else if (this.username === "Nahyma") {return '<button style="' + css + '" name="parseCommand" value="/user ' + this.username + '">' + img('http://play.pokemonshowdown.com/sprites/bw/alakazam-mega.png') + "</button>"}
	else if (this.username === "Just Sayori") {return '<button style="' + css + '" name="parseCommand" value="/user ' + this.username + '">' + img('http://play.pokemonshowdown.com/sprites/bw-shiny/swampert-mega.png') + "</button>"}
		else return '<button style="' + css + '" name="parseCommand" value="/user ' + this.username + '">' + this.avatar() + "</button>";
};

Profile.prototype.buttonAvatar = function () {
	let css = 'border:none;background:none;padding:0;float:left;';
	return '<button style="' + css + '" name="parseCommand" value="/user ' + this.username + '">' + this.avatar() + "</button>";
};

/*Profile.prototype.group = function () {
	if (this.isOnline && this.user.group === ' ') return label('Group') + 'Regular User';
	if (this.isOnline) return label('Group') + Config.groups[this.user.group].name;
	for (let name in Users.usergroups) {
		if (toId(this.username) === name) {
			return label('Group') + Config.groups[Users.usergroups[name].charAt(0)].name;
		}
	}
	return label('Group') + 'Regular User';
};*/

/*Profile.prototype.money = function (amount) {
	return label('Money') + amount + currencyName(amount);
};*/

Profile.prototype.name = function () {
	return label('Name') + bold(font(color(toId(this.username)), this.username));
};

Profile.prototype.title = function () {
	if (this.username === 'KuraiTenshi26') {return label('Title') + 'The Anti-Hero'}
	else if (this.username === 'Nahyma') {return label('Title') + 'The Shadow Mod'}
	else if (this.username === 'Just Sayori') {return label('Title') + 'The Sturdy Boi'}
		else return label('Title') + 'Unknown (DM KuraiTenshi26/Aabrar to set up a title)';
};

Profile.prototype.signature = function () {
	if (this.username === 'KuraiTenshi26') {return label('Signature') + 'Lopunny-Mega'}
	else if (this.username === 'Nahyma') {return label('Signature') + 'Alakazam-Mega'}
	else if (this.username === 'Just Sayori') {return label('Signature') + 'Swampert-Mega'}
		else return label('Signature') + 'Unknown (DM KuraiTenshi26/Aabrar to set up signature pokemon)';
};

Profile.prototype.playstyles = function () {
	if (this.username === 'KuraiTenshi26') {return label('Playstyles') + 'Fast Offense, Hyper Offense, Volt-Turn'}
	else if (this.username === 'Nahyma') {return label('Playstyles') + 'Stall, Balance, 5-protect-1'}
	else if (this.username === 'Just Sayori') {return label('Playstyles') + 'Bulky Offense, Fast Offense'}
		else return label('Playstyles') + 'Unknown (DM KuraiTenshi26/Aabrar to set up your preferred playstyles)';
};

/*Profile.prototype.seen = function (timeAgo) {
	if (this.isOnline) return label('Last Seen') + font('#2ECC40', 'Currently Online');
	if (!timeAgo) return label('Last Seen') + 'Never';
	return label('Last Seen') + moment(timeAgo).fromNow();
};*/

Profile.prototype.show = function (callback) {
	let userid = toId(this.username);

	return this.buttonAvatar() +
		this.sigPokemon() +
		SPACE + this.name() + BR +
		SPACE + this.title() + BR +
		SPACE + this.signature() + BR +
		SPACE + this.playstyles() + BR +
		//SPACE + this.seen(Db.seen.get(userid)) +
		'<br clear="all">';
};

exports.commands = {
	profile: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (target.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
		let targetUser = this.targetUserOrSelf(target);
		let profile;
		if (!targetUser) {
			profile = new Profile(false, target);
		} else {
			profile = new Profile(true, targetUser, targetUser.avatar);
		}
		this.sendReplyBox(profile.show());
	},
	profilehelp: ["/profile -	Shows information regarding user's name, title, signature, and playstyles. Contact KuraiTenshi26/Aabrar to set up a custom profile. ***You must have completed one recent season to get a profile.***"],
};