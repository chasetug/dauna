const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'suggestion',
	description: 'Posts a suggestion into the suggestion channel',
	execute(interaction) {
		const idea = interaction.options.getString('idea');
		const channel = interaction.client.channels.cache.get('782451443311050793');

		const embed = new MessageEmbed()
			.setColor('#4e704e')
			.setAuthor(interaction.user.username, interaction.user.avatarURL())
			.addField('Suggestion', idea)
			.setTimestamp()
			.setFooter('/suggestion');
		const suggestion = channel.send({ embeds: [embed] }).then(m => {
			m.react('⬆').catch(console.error);
			m.react('⬇').catch(console.error);
		});

		interaction.reply({ content: 'Your suggestion has been posted.', ephemeral: true });
	},
};