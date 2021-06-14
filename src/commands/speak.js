module.exports = {
	name: 'speak',
	description: 'Speaks in the given channel',
	execute(client, message, args) {
		if (!message.member.roles.cache.find(r => r.id == '813847117105070131')) return message.channel.send('You must be an admin to use this command!');
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