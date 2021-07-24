const { default: axios } = require('axios');
const Discord = require('discord.js');

function createLabelString(labels) {
	if (!labels[0]) return 'None';
	let labelString = labels.join('`, `');
	labelString = `\`${labelString}\``;
	return labelString;
}

function createTitle(package) {
	let title = package.name;
	title = `${package.name} v${package.versions[0].version_number}`;
	if (package.is_pinned) return `📌 ${title}`;
	if (package.is_deprecated) return `~~${title}~~`;
	return title;
}

function getRating(rating) {
	const emoji = rating > 0 ? '<:hmmNice:852393444839522325>' : '<:hmmm:820908652650954793>';
	return `${rating} ${emoji}`;
}

module.exports = {
	name: 'package',
	description: 'Queries a package from the thunderstore.',
	async execute(client, message, args) {
		// Querying a specific package
		const msg = await message.channel.send('Retrieving package from Thunderstore...');
		axios.get('https://gtfo.thunderstore.io/api/v1/package/')
			.then(res => {
				const packages = res.data;
				const package = packages.find(p => p.name.toLowerCase() === args[0].toLowerCase());
				if (!package) return msg.edit('Cannot find package. Please check package name.');

				const latestVersion = package.versions[0];
				const totalDownloads = package.versions.reduce((sum, { downloads }) => sum + downloads, 0);
				const lastUpdated = package.date_updated.substr(0, 10);
				const uuid = package.uuid4;

				const modEmbed = new Discord.MessageEmbed()
					.setColor('#000080')
					.setTitle(createTitle(package))
					.setDescription(latestVersion.description)
					.setAuthor(package.owner, '', `https://gtfo.thunderstore.io/package/${package.owner}/`)
					.setURL(package.package_url)
					.setThumbnail(latestVersion.icon)
					.addFields(
						{ name: 'Last Updated', value: lastUpdated, inline:true },
						{ name: 'Downloads', value: totalDownloads, inline: true },
						{ name: 'Rating', value: getRating(package.rating_score), inline: true },
					)
					.addField('Categories', createLabelString(package.categories))
					.addField('Dependencies', createLabelString(package.versions[0].dependencies))
					.setFooter(`${uuid}`);
				msg.delete();
				message.channel.send(modEmbed).catch(console.error);
			})
			.catch(err => {
				msg.edit('Cannot find package. Please check package name.');
				console.error(err);
			});
	},
};