// Library dependencies
const fs = require('fs');
const Discord = require('discord.js');
const express = require('express');
const https = require('https');
const path = require('path');
require('dotenv').config();


// Establish discord bot and collection of command files
const client = new Discord.Client();
client.commands = new Discord.Collection();
const guildID = '782438773690597389';
const prefix = '!';

// Establish Express
const app = express();
const port = 443;

app.use(express.json());

app.post('/api/v1/lfg', (req, res) => {
	res.send('Sending message!');
	const channel = client.channels.cache.get('799196767961743410');
	const { player, lobbyID, rundownName, levelName, playersNeeded } = req.body;

	const embed = new Discord.MessageEmbed()
		.setColor('#4287f5')
		.setTitle(`Looking for ${playersNeeded}`)
		.setAuthor(player)
		.addFields(
			{ name: 'Rundown', value: rundownName, inline: true },
			{ name: 'Level', value: levelName, inline: true },
			{ name: 'LobbyID', value: lobbyID, inline: true },
		)
		.setTimestamp();
	channel.send(`<@&786076869203722250> steam://joinlobby/493520/${lobbyID}/`, embed);
	console.log(req.body);
});

const sslServer = https.createServer({
	key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
	cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app);

sslServer.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


// Called once bot has logged in
client.once('ready', async () => {
	console.log('Ready!');
	// Refresh user cache
	const guild = client.guilds.cache.get(guildID);
	guild.members.fetch();
});

// Called upon every message
client.on('message', message => {
	// Ignore bot messages
	if (message.author.bot) return;

	// Ignore messages w/out prefix
	if (!message.content.startsWith(prefix)) return;

	// Create args array
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Ignore non-commands
	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	// Try to execute command
	try {
		command.execute(client, message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// Called when cached member joins guild
client.on('guildMemberAdd', member => {
	// Dauna counter
	memberCounter();

	// Welcome announcements
	const welcomeChannel = client.channels.cache.get('782470041382944818');
	welcomeChannel.send(`**${member.user.username}** has joined the server!`);

	// DM welcome message
	member.user.send('Welcome to **Unofficial GTFO Modding**! \n\nPlease make sure to accept our rules to gain access to the server. \n*Cheating in public matches will get you removed from this server permanently!*')
		.catch(e => {
			console.error(e);
		});

	// Member join bot logs
	const embed = new Discord.MessageEmbed()
		.setColor('#32CD32')
		.setAuthor(`${member.user.username} (${member.id})`, member.user.avatarURL() == null ? 'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png' : member.user.avatarURL())
		.setThumbnail(member.user.avatarURL() == null ? 'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png' : member.user.avatarURL())
		.addFields(
			{ name: 'Joined Guild', value: `${member.joinedAt}`, inline: true },
			{ name: 'Joined Discord', value: `${member.user.createdAt}`, inline: true },
		)
		.setTimestamp()
		.setFooter('Member joined');

	const memberLogs = client.channels.cache.get('782753763441770586');
	memberLogs.send(embed);
});

// Called when cached member leaves guild (kick or leave)
client.on('guildMemberRemove', member => {
	// Dauna member counter
	memberCounter();

	// Leave announcements
	const welcomeChannel = client.channels.cache.get('782470041382944818');
	welcomeChannel.send(`**${member.user.username}** has left the server.`);

	// Member leave bot logs
	const embed = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setAuthor(`${member.user.username} (${member.id})`, member.user.avatarURL() == null ? 'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png' : member.user.avatarURL())
		.setThumbnail(member.user.avatarURL() == null ? 'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png' : member.user.avatarURL())
		.addFields(
			{ name: 'Joined Guild', value: `${member.joinedAt}`, inline: true },
			{ name: 'Joined Discord', value: `${member.user.createdAt}`, inline: true },
		)
		.setTimestamp()
		.setFooter('Member left');

	const memberLogs = client.channels.cache.get('782753763441770586');
	memberLogs.send(embed);
});

// Dauna's member counter
async function memberCounter() {
	const channel = client.channels.cache.get('831368749596409886');
	const message = await channel.messages.fetch('831369508366843944');
	message.edit(`Current Members: ${client.guilds.cache.get('782438773690597389').memberCount}`);
}

// Login to the api and start the bot
client.login(process.env.TOKEN);