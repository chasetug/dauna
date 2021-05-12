module.exports = {
	name: 'speak',
	description: 'Speaks in the given channel',
	async execute(client, message, args) {
		if (!message.member.roles.cache.find(r => r.name === 'Admins')) return message.channel.send('You must be an admin to use this command!');
		if(!client.channels.cache.get(args[0]) && !message.member.voice.channel) return message.channel.send('Please specify a channel!');

		const channel = client.channels.cache.get(args[0]) || message.member.voice.channel;

		channel.join()
			.then(async connection => {
				const dispatcher = connection.play(require('path').join(__dirname, './audio.mp3'));
				const updateMessage = await message.channel.send('Audio is now playing!');

				dispatcher.on('finish', () => {
					updateMessage.edit('Audio has finished playing!');
					connection.disconnect();
				});

				dispatcher.on('error', console.error());
			})
			.catch(err => {
				console.error(err);
				message.channel.send('Channel cannot be joined.');
			});
	},
};