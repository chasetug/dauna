module.exports = {
	name: 'help',
	description: 'Provides help about a given command',
	async execute(client, message, args) {
		// const msg = await message.channel.send('Ping?');
		const command = client.commands.get(args[0]);
		if (!command) return message.channel.send('That command does not exist');
		message.channel.send(`Command: ${command.name}\nDescription: ${command.description}`);
	},
};