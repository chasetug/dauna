module.exports = {
	name: 'speak',
	description: 'Speaks in the given channel',
	requiredRoles: '813847117105070131', // Admin role
	execute(client, message, args) {
		if (!client.channels.cache.get(args[0]) && !message.member.voice.channel) return message.channel.send('Please specify a channel!');

		const channel = client.channels.cache.get(args[0]) || message.member.voice.channel;

		channel.join()
			.then(async connection => {
				const sound = args[1] || 'big';
				const dispatcher = connection.play(`./sounds/${sound}.mp3`);
				const updateMessage = await message.channel.send('Audio is now playing!');

				dispatcher.on('finish', async () => {
					await updateMessage.edit('Audio has finished playing!');
					connection.disconnect();
				});

				dispatcher.on('error', err => {
					console.error(err);
				});
			})
			.catch(err => {
				console.error(err);
				message.channel.send('Channel cannot be joined.');
			});
	},
};