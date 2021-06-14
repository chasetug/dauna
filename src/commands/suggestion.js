const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'suggestion',
	description: 'Posts a suggestion into the suggestion channel',
	execute(client, message, args) {
		if (!args) return message.channel.send('Please specify a suggestion!');
		const channel = client.channels.cache.get('782451443311050793');

		const embed = new MessageEmbed()
			.setColor('#4e704e')
			.setAuthor(message.member.nickname, message.member.user.avatarURL())
			.addField('Suggestion', args.join(' '))
			.setTimestamp()
			.setFooter('!suggestion');
		channel.send(embed).catch(console.error);
	},
};