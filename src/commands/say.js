module.exports = {
	name: 'say',
	description: 'Copies a message to the specified channel.',
	requiredRoles: '782438962248548352', // Moderator role
	async execute(client, message, args) {
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
		});
	},
};