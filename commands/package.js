const { default: axios } = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'package',
	description: 'Queries a package from the thunderstore.',
	async execute(client, message, args) {
		// Package list command
		if(args[0].toLowerCase() === 'list' && args[1] === undefined) {
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
			axios.get('https://gtfo.thunderstore.io/api/v1/package/')
				.then(res => {
					// message.channel.send(res.data.package_url);
					// Create pretty embed
					const packages = res.data;
					const package = packages.find(p => p.name.toLowerCase() === args[0].toLowerCase());
					if (!package) return msg.edit('Cannot find package. Please check package name.');
					const totalDownloads = package.versions.reduce((sum, { downloads }) => sum + downloads, 0);
					const latestVersion = package.versions[0];

					const modEmbed = new Discord.MessageEmbed()
						.setColor('#000080')
						.setTitle(`${package.name} v${latestVersion.version_number}`)
						.setDescription(latestVersion.description)
						.setURL(package.package_url)
						.setThumbnail(latestVersion.icon)
						.addFields(
							{ name: 'Owner', value: package.owner, inline: true },
							{ name: 'Rating', value: package.rating_score, inline: true },
							{ name: 'Downloads', value: totalDownloads, inline: true },
						)
						.addField('Categories', package.categories[0] === undefined ? 'None' : package.categories.join(', '))
						.setFooter(`Last Updated: ${package.date_updated.substr(0, 10)}`);
					msg.delete();
					message.channel.send(modEmbed);
				})
				.catch (err => {
					msg.edit('Cannot find package. Please check package name.');
					console.error(err);
				});
		}
	},
};