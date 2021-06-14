module.exports = {
	name: 'lfg',
	description: 'Creates a link to join a lobby',
	async execute(client, message, args) {
		const rundown = args.slice(1).join(' ');
		message.channel.send(`Join ${message.author} in ${rundown}: \nsteam://joinlobby/493520/${args[0]}/`);
		message.delete();
	},
};