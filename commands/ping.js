module.exports = {
	name: 'ping',
	description: 'Provides the bot\'s and API\'s latency.',
	async execute(client, message) {
		const msg = await message.reply('Ping?');
		msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
	},
};