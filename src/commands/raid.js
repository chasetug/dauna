const { Permissions } = require('discord.js');

module.exports = {
	name: 'raid',
	description: 'Disables messages for @ everyone',
	requiredRoles: '782438962248548352', // Moderator Role
	async execute(interaction) {
		if (interaction.guild.roles.everyone.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
			await interaction.guild.roles.everyone.setPermissions(0n)
				.then(role => interaction.reply(`All permissions have been removed for ${role}.`));
		}
		else {
			await interaction.guild.roles.everyone.setPermissions(
				[Permissions.FLAGS.VIEW_CHANNEL,
					Permissions.FLAGS.SEND_MESSAGES,
					Permissions.FLAGS.CREATE_INSTANT_INVITE,
					Permissions.FLAGS.CHANGE_NICKNAME,
					Permissions.FLAGS.USE_PUBLIC_THREADS,
					Permissions.FLAGS.USE_PRIVATE_THREADS,
					Permissions.FLAGS.EMBED_LINKS,
					Permissions.FLAGS.ATTACH_FILES,
					Permissions.FLAGS.ADD_REACTIONS,
					Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
					Permissions.FLAGS.USE_EXTERNAL_STICKERS,
					Permissions.FLAGS.READ_MESSAGE_HISTORY,
					Permissions.FLAGS.USE_APPLICATION_COMMANDS,
					Permissions.FLAGS.CONNECT,
					Permissions.FLAGS.SPEAK,
					Permissions.FLAGS.USE_VAD,
					Permissions.FLAGS.REQUEST_TO_SPEAK,
					Permissions.FLAGS.STREAM])
				.then(role => interaction.reply(`All permissions have been restored for ${role}.`));
		}
	},
};