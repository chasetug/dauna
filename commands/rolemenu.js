const { MessageButton } = require('discord-buttons');

module.exports = {
	name: 'rolemenu',
	description: 'Test',
	execute(client, message) {
		if (!message.member.roles.cache.find(r => r.id == '813847117105070131')) return message.channel.send('You must be an admin to use this command!');

		const button1 = new MessageButton()
			.setLabel('News')
			.setStyle('blurple')
			.setID('news');
		const button2 = new MessageButton()
			.setLabel('LFG')
			.setStyle('blurple')
			.setID('lfg');
		const button3 = new MessageButton()
			.setLabel('Endskill Cult')
			.setStyle('blurple')
			.setID('endskill');

		message.channel.send('**Role Menu**\nClick a button below to recieve that role.', {
			buttons: [
				button1, button2, button3,
			],
		});
	},
};