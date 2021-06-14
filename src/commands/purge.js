module.exports = {
	name: 'purge',
	description: 'Bulk deletes messages from a channel.',
	requiredRoles: '782438962248548352', // Moderator (Corrections Officer) Role
	async execute(client, message, args) {
		const purgeCount = parseInt(args[0]);
		if(isNaN(purgeCount)) return message.channel.send('Please specify a number of messages to purge (purge <#messages>)');

		await message.channel.messages.fetch({ limit: args[0] })
			.then(messages => message.channel.bulkDelete(messages))
			.catch(console.error);
	},
};