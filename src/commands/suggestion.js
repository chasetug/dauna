const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'suggestion',
	description: 'Posts a suggestion into the suggestion channel',
	execute(client, message, args) {
		if (!args[0]) return message.channel.send('Please include a suggestion! Usage: !suggestion < suggestion >');
		const channel = client.channels.cache.get('782451443311050793');

		const embed = new MessageEmbed()
			.setColor('#4e704e')
			.setAuthor(message.member.user.username, message.member.user.avatarURL())
			.addField('Suggestion', args.join(' '))
			.setTimestamp()
			.setFooter('!suggestion');
		const suggestion = channel.send(embed).then(m => {
			m.react('⬆').catch(console.error);
			m.react('⬇').catch(console.error);
		});
		message.channel.send('Your suggestion has been posted.');
	},
};