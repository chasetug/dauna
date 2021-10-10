const { ThreadChannel } = require('discord.js');

module.exports = {
	name: 'addmember',
	description: 'Adds a member to a thread',
	requiredRoles: '782438962248548352', // Moderator role
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const thread = interaction.options.getChannel('thread');

		if (!(thread instanceof ThreadChannel)) return interaction.reply({ content: 'The channel must be a thread!', ephemeral: true });

		thread.members.add(user.id);
		interaction.reply({ content: `Added ${user} to ${thread}`, ephemeral: true });
	},
};