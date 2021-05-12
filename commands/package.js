const { default: axios } = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'package',
	description: 'Queries a package from the thunderstore.',
	async execute(client, message, args) {
		// Package list command
		if(args[0].toLowerCase() == 'list' && args[1] == undefined) {
			const msg = await message.channel.send('Retrieving a list of mods from Thunderstore...');
			// Query thunderstore api for list of packages
			axios.get('https://gtfo.thunderstore.io/api/v1/package/')
				.then(res => {
					let mods = '';
					// Add each package to the list
					for(let i = 0; i < res.data.length; i++) {
						if(!res.data[i].is_deprecated) {
							mods += (`\`${res.data[i].name}\` `);
						}
					}
					// Create the pretty embed
					const modEmbed = new Discord.MessageEmbed()
						.setColor('#000080')
						.setTitle('GTFO Thunderstore')
						.setURL('https://gtfo.thunderstore.io/')
						.setThumbnail('https://i.imgur.com/dfowE52.png')
						.addField('All Mods', mods)
						.setTimestamp();
					msg.delete();
					message.channel.send(modEmbed);
				})
				.catch (err => {
					console.error(err);
				});
		}
		else {
			// Querying a specific package
			const msg = await message.channel.send('Retrieving package from Thunderstore...');
			// Get package from experimental api
			axios.get(`https://gtfo.thunderstore.io/api/experimental/package/${args[0]}/${args[1]}`)
				.then(res => {
					msg.delete();
					// message.channel.send(res.data.package_url);
					// Create pretty embed
					const modEmbed = new Discord.MessageEmbed()
						.setColor('#000080')
						.setTitle(res.data.name)
						.setDescription(res.data.latest.description)
						.setURL(res.data.package_url)
						.setThumbnail(res.data.latest.icon)
						.addFields(
							{ name: 'Owner', value: res.data.owner, inline: true },
							{ name: 'Rating', value: res.data.rating_score, inline: true },
							{ name: 'Downloads', value: res.data.total_downloads, inline: true },
						)
						.addField('Categories', res.data.community_listings[0].categories[0] == undefined ? 'None' : res.data.community_listings[0].categories)
						.setFooter(`Last Updated: ${res.data.date_updated.substr(0, 10)} (v${res.data.latest.version_number})`);
					message.channel.send(modEmbed);
				})
				.catch (err => {
					msg.edit('Cannot find package. Please check author and package name.');
					console.error(err);
				});
		}
	},
};