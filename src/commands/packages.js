const { MessageEmbed } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
	name: 'packages',
	description: 'Sends a list of packages from the Thunderstore.',
	async execute(client, message, args) {
		// Package list command
		const msg = await message.channel.send('Retrieving a list of mods from Thunderstore...');
		// Query thunderstore api for list of packages
		axios.get('https://gtfo.thunderstore.io/api/v1/package/')
			.then(res => {
				let mods = '';
				// Add each package to the list
				for (let i = 0; i < res.data.length; i++) {
					if (!res.data[i].is_deprecated) {
						mods += (`\`${res.data[i].name}\` `);
					}
				}
				// Create the pretty embed
				const modEmbed = new MessageEmbed()
					.setColor('#000080')
					.setTitle('GTFO Thunderstore')
					.setURL('https://gtfo.thunderstore.io/')
					.setThumbnail('https://i.imgur.com/dfowE52.png')
					.addField('All Mods', mods)
					.setTimestamp();
				msg.delete();
				message.channel.send(modEmbed);
			})
			.catch(err => {
				console.error(err);
			});
	},
};