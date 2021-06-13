module.exports = {
	name: 'say',
	description: 'Copies a message to the specified channel.',
	async execute(client, message, args) {
		if(!message.member.roles.cache.find(r => r.id === '813847117105070131')) return message.channel.send('You must be an admin to use this command!');

		let targetChannel = message.mentions.channels.first();
		targetChannel ??= message.channel;

		message.channel.send('What would you like me to say?');

		const filter = (newMessage) => {
			return newMessage.author.id === message.author.id;
		};

		const collector = message.channel.createMessageCollector(filter, {
			max: 1,
			time: 1000 * 60,
		});

		collector.on('end', async (collected) => {
			const collectedMessage = collected.first();
			const collectedAttachment = collected.first()?.attachments.first();
			if (!collectedMessage) return message.reply('You did not reply in time.');

			targetChannel.send(collectedMessage, collectedAttachment);
			message.channel.send('Your message has been sent.');
			console.log(collectedMessage);
		});
	},
};