module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const guildID = '782438773690597389';
		console.log('Ready!');

		const guild = client.guilds.cache.get(guildID);
		await guild.members.fetch();

		client.user.setActivity('GTFO', { type: 'PLAYING' })
			.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
			.catch(console.error);
	},
};