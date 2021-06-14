module.exports = {
	name: 'purge',
	description: 'Bulk deletes messages from a channel.',
	async execute(client, message, args) {
		if(!message.member.roles.cache.find(r => r.name === 'Corrections Officer') && !message.member.roles.cache.find(r => r.name === 'Admins')) return message.channel.send('You must be a moderator to use this command!');

		const purgeCount = parseInt(args[0]);
		if(isNaN(purgeCount)) return message.channel.send('Please specify a number of messages to purge (purge <#messages>)');

		await message.channel.messages.fetch({ limit: args[0] })
			.then(messages => message.channel.bulkDelete(messages))
			.catch(console.error);
	},
};