const { ThreadChannel } = require('discord.js');

module.exports = {
	name: 'removemember',
	description: 'Removes a member from a thread',
	requiredRoles: '782438962248548352', // Moderator role
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const thread = interaction.options.getChannel('thread');

		if (!(thread instanceof ThreadChannel)) return interaction.reply({ content: 'The channel must be a thread!', ephemeral: true });

		thread.members.remove(user.id);
		interaction.reply({ content: `Removed ${user} from ${thread}`, ephemeral: true });
	},
};