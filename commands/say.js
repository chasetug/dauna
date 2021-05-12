module.exports = {
	name: 'say',
	description: 'Copies a message to the specified channel.',
	async execute(client, message, args) {
		if(!message.member.roles.cache.find(r => r.name === 'Corrections Officer') && !message.member.roles.cache.find(r => r.name === 'Admins')) return message.channel.send('You must be a moderator to use this command!');

		const sayChannel = message.mentions.channels.first();
		const sayMessage = args.slice(1).join(' ');
		const sayAttachment = message.attachments.first();
		sayChannel.send(sayMessage, sayAttachment);
	},
};