const { statusGame } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const guildID = '782438773690597389';
		console.log('Logged in and ready!');

		const guild = client.guilds.cache.get(guildID);
		await guild.members.fetch();
		console.log('Fetched member cache!');

		client.user.setActivity(statusGame, { type: 'PLAYING' })
			.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
			.catch(console.error);
	},
};