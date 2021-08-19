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

		client.user.setActivity(statusGame, { type: 'PLAYING' });
		console.log(`Activity set to ${statusGame}`);

		// Register slash commands
		const data = [
			{
				name: 'ping',
				description: 'Provides API and Bot latency.',
			},
			{
				name: 'lfg',
				description: 'Creates a link to a GTFO lobby',
				options: [
					{
						name: 'rundown',
						type: 'STRING',
						description: 'The rundown you are playing',
						required: true,
					},
					{
						name: 'lobbyid',
						type: 'INTEGER',
						description: 'The lobby id',
						required: true,
					},
				],
			},
			{
				name: 'package',
				description: 'Finds a package on the thunderstore',
				options: [
					{
						name: 'package',
						type: 'STRING',
						description: 'The package to query',
						required: true,
					},
				],
			},
			{
				name: 'packages',
				description: 'Provides a list of packages from the thunderstore',
			},
			{
				name: 'thunderstore',
				description: 'Provides a link to the thunderstore',
			},
			{
				name: 'suggestion',
				description: 'Suggest an idea for a mod',
				options: [
					{
						name: 'idea',
						type: 'STRING',
						description: 'The idea to post',
						required: true,
					},
				],
			},
		];
		await client.application?.commands.set(data);
	},
};