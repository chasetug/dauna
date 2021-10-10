const { MessageEmbed } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
	name: 'packages',
	description: 'Sends a list of packages from the Thunderstore.',
	async execute(interaction) {
		// Query thunderstore api for list of packages
		axios.get('https://gtfo.thunderstore.io/api/v1/package/')
			.then(res => {
				let mods = '';
				let mods2 = '';
				// Add each package to the list
				for (let i = 0; i < res.data.length; i++) {
					if (!res.data[i].is_deprecated) {
						if (mods.length < 1000) {
							mods += (`\`${res.data[i].name}\` `);
						}
						else {
							mods2 += (`\`${res.data[i].name}\` `);
						}
					}
				}
				// Create the pretty embed
				const modEmbed = new MessageEmbed()
					.setColor('#000080')
					.setTitle('GTFO Thunderstore')
					.setURL('https://gtfo.thunderstore.io/')
					.setThumbnail('https://i.imgur.com/dfowE52.png')
					.addField('All Mods', mods)
					.addField('​', mods2)
					.setTimestamp();
				interaction.reply({ embeds: [modEmbed] });
			})
			.catch(err => {
				console.error(err);
			});
	},
};