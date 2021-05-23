module.exports = {
	name: 'say',
	description: 'Copies a message to the specified channel.',
	async execute(client, message, args) {
		if(!message.member.roles.cache.find(r => r.id == '782438962248548352') && !message.member.roles.cache.find(r => r.id == '813847117105070131')) return message.channel.send('You must be a moderator to use this command!');

		const sayChannel = message.mentions.channels.first();
		const sayMessage = args.slice(1).join(' ');
		const sayAttachment = message.attachments.first();
		sayChannel.send(sayMessage, sayAttachment);
	},
};