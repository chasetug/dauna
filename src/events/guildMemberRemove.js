const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberRemove',
	execute(member, client) {
		const welcomeChannel = client.channels.cache.get('782470041382944818');
		welcomeChannel.send(`<:hmmm:820908652650954793> **${member.user.username}** has left the server.`);

		// Member leave bot logs
		const embed = new MessageEmbed()
			.setColor('#FF0000')
			.setAuthor(`${member.user.username} (${member.id})`, member.user.avatarURL() == null ? 'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png' : member.user.avatarURL())
			.setThumbnail(member.user.avatarURL() == null ? 'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png' : member.user.avatarURL())
			.addFields(
				{ name: 'Joined Guild', value: `${member.joinedAt}`, inline: true },
				{ name: 'Joined Discord', value: `${member.user.createdAt}`, inline: true },
			)
			.setTimestamp()
			.setFooter('Member left');

		const memberLogs = client.channels.cache.get('782753763441770586');
		memberLogs.send(embed);
	},
};