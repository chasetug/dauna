const { MessageButton } = require('discord-buttons');

module.exports = {
	name: 'thunderstore',
	description: 'Provides a link to the GTFO Thunderstore mod database.',
	execute(client, message) {
		const button = new MessageButton()
			.setStyle('url')
			.setLabel('GTFO Thunderstore')
			.setURL('https://gtfo.thunderstore.io/')
			.setID('thunderstore-link');
		message.channel.send('Here is a link to our mod database:', button);
	},
};