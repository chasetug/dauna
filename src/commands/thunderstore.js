const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'thunderstore',
	description: 'Provides a link to the GTFO Thunderstore mod database.',
	execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setLabel('GTFO Thunderstore')
					.setURL('https://gtfo.thunderstore.io/'),
			);
		interaction.reply({ content: 'Here is a link to our mod database:', components: [row] });
	},
};