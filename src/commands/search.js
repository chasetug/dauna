const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');

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
		await axios.get('https://api.gitbook.com/v1/spaces/gtfo-modding/search', { params: query })
			.then(res => {
				const results = res.data;
				const embed = new MessageEmbed()
					.setTitle('Search Results:')
					.setURL('gtfo-modding.gitbook.io')
					.setFields(results);
				interaction.reply({ embeds: embed });
			});
	},
};