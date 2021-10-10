const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'rolemenu',
	description: 'Create a role menu',
	requiredRoles: '813847117105070131', // Admins Role
	execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('news')
					.setLabel('News')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('lfg')
					.setLabel('LFG')
					.setStyle('PRIMARY'),
			);
		const channel = interaction.client.channels.cache.get('782758021137694823');
		channel.send({ content:'**Role Menu**\nClick a button below to recieve that role.', components: [row] });
		interaction.reply({ content: 'Role menu has been created!', ephemeral: true });
	},
};