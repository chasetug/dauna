module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const guildID = '782438773690597389';
		console.log('Logged in and ready!');

		const guild = client.guilds.cache.get(guildID);
		await guild.members.fetch();
		console.log('Fetched member cache!');

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
						name: 'name',
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
			{
				name: 'say',
				description: 'Copy a message into the target channel',
				options: [
					{
						name: 'targetchannel',
						type: 'CHANNEL',
						description: 'The channel to post the message in',
						required: true,
					},
				],
			},
			{
				name: 'status',
				description: 'Sets the bot user\'s status',
				options: [
					{
						name: 'name',
						type: 'STRING',
						description: 'The name of the status',
						required: true,
					},
					{
						name: 'type',
						type: 'STRING',
						description: 'The type of status',
						required: false,
						choices: [
							{
								name: 'playing',
								value: 'PLAYING',
							},
							{
								name: 'watching',
								value: 'WATCHING',
							},
							{
								name: 'competing',
								value: 'COMPETING',
							},
							{
								name: 'streaming',
								value: 'STREAMING',
							},
							{
								name: 'listening',
								value: 'LISTENING',
							},
						],
					},
					{
						name: 'url',
						type: 'STRING',
						description: 'The url of the status (if WATCHING or STREAMING)',
						required: false,
					},
				],
			},
			{
				name: 'addmember',
				description: 'Adds a guild member to a thread',
				options: [
					{
						name: 'user',
						type: 'USER',
						description: 'The user to add',
						required: true,
					},
					{
						name: 'thread',
						type: 'CHANNEL',
						description: 'The thread to add the member to',
						required: true,
					},
				],
			},
			{
				name: 'removemember',
				description: 'Removes a guild member from a thread',
				options: [
					{
						name: 'user',
						type: 'USER',
						description: 'The user to remove',
						required: true,
					},
					{
						name: 'thread',
						type: 'CHANNEL',
						description: 'The thread to remove the member from',
						required: true,
					},
				],
			},
			{
				name: 'rolemenu',
				description: 'Creates a role menu',
			},
			{
				name: 'raid',
				description: 'Disables messages for @ everyone',
			},
			{
				name: 'search',
				description: 'Searches the wiki for a given query',
				options: [
					{
						name: 'query',
						type: 'STRING',
						description: 'The query to search for',
						required: true,
					},
				],
			},
		];
		await client.guilds.cache.get(guildID).commands.set(data).catch(console.error);
	},
};