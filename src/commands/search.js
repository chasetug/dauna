const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'search',
	description: 'Searches a query from the wiki.',
	options: [
		{
			name: 'query',
			type: 'STRING',
			description: 'The query to search for',
			required: true,
		},
	],
	async execute(interaction) {
		const query = interaction.options.getString('query');
		await axios.get('https://api.gitbook.com/v1/owners/-MUvE8lz5uuUCTWJTtdN/search', { 'headers': { 'Authorization': `Bearer ${process.env.GITBOOK}` }, 'params': { 'query': query } })
			.then(res => {
				const pages = res.data.items[0].pages;
				const embeds = [];
				pages.forEach(page => {
					const embed = new MessageEmbed()
						.setTitle(page.title)
						.setURL(`https://gtfo-modding.gitbook.io/wiki/${page.url}`)
						.addField(page.sections[0]?.title ?? 'Empty', page.sections[0]?.content.substring(0, 1023) ?? 'Empty');

					embeds.push(embed);
				});
				interaction.reply({ embeds: embeds });
			});
	},
	async executeAutocomplete(interaction) {
		const query = interaction.options.getString('query');
		console.log(query);
		await axios.get('https://api.gitbook.com/v1/owners/-MUvE8lz5uuUCTWJTtdN/search', { 'headers': { 'Authorization': `Bearer ${process.env.GITBOOK}` }, 'params': { 'query': query } })
			.then(res => {
				console.log(res.data);
				const pages = res.data.items[0].pages;
				const autocompletes = [];
				pages.forEach(page => {
					if(autocompletes.length < 25) {
						autocompletes.push({
							name: page?.title,
							value: page?.title.trim().toLowerCase(),
						});
					}
				});

				interaction.respond(autocompletes);
			});
	},
};
