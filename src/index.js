// Library dependencies
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const express = require('express');
const https = require('https');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
] });
client.commands = new Collection();

// Get commands and events
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('js'));

// Assign commands to client
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Register event handlers
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

// Start API
const api = require('./api/api.js');
try {
	api.execute(client);
}
catch (error) {
	console.error(error);
}


// Login to the api and start the bot
client.login(process.env.TOKEN);