const Discord = require('discord.js');
const express = require('express');
const https = require('https');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { MessageButton } = require('discord-buttons');
const fs = require('fs');

module.exports = {
	execute(client) {
		const app = express();
		const port = 443;

		const apiLimiter = rateLimit({
			windowMs: 1 * 60 * 1000,
			max: 5,
		});

		const lfgLimiter = rateLimit({
			windowMs: 5 * 60 * 1000,
			max: 1,
			message: 'Too many messages sent, try again in 5 minutes.',
		});

		app.use(express.json());
		app.use('/api/', apiLimiter);

		app.post('/api/lfg', lfgLimiter, (req, res) => {
			res.send('Received Message');
			const channel = client.channels.cache.get('782449248317997057');
			let { rundownName, levelName } = req.body;
			const { player, lobbyID, playerCount } = req.body;

			levelName = levelName.replace(/(<([^>]+)>)/ig, '');
			rundownName = rundownName.replace(/(<([^>]+)>)/ig, '');

			const embed = new Discord.MessageEmbed()
				.setColor('#4287f5')
				.setAuthor(`${player}'s Lobby`)
				.setDescription(`👥 ${playerCount}/4 players`)
				.addFields(
					{ name: 'Rundown', value: rundownName, inline: true },
					{ name: 'Level', value: levelName, inline: true },
					{ name: 'Lobby ID', value: lobbyID, inline: true },
				)
				.setTimestamp();

			const lobbyButton = new MessageButton()
				.setStyle('url')
				.setLabel('Join Lobby')
				.setURL(`https://gtfomodding.dev/api/lobby?id=${lobbyID}`)
				.setID('lfg');
			if (!rundownName.startsWith('Rundown')) {
				const modButton = new MessageButton()
					.setStyle('url')
					.setLabel('View Rundown')
					.setURL('https://gtfo.thunderstore.io/')
					.setID('lfg');

				if (channel instanceof Discord.TextChannel) {
					channel.send('', {
						buttons: [
							modButton, lobbyButton,
						],
						embed: embed,
					}).catch(console.error);
				}
			}
			else {
				channel.send('', { button: lobbyButton, embed: embed });
			}

			console.log(req.body);
		});

		app.get('/api/lobby', (req, res) => {
			const { id } = req.query;
			res.status(301).redirect(`steam://joinlobby/493520/${id}/`);
		});

		const sslServer = https.createServer({
			key: fs.readFileSync(path.join(__dirname, 'cert', 'privkey.pem')),
			cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
		}, app);

		sslServer.listen(port, () => {
			console.log(`Listening at http://localhost:${port}`);
		});
	},
};