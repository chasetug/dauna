module.exports = {
	name: 'ping',
	description: 'Provides the bot\'s and API\'s latency.',
	execute(interaction) {
		interaction.reply({ content: 'Ping?' });
		interaction.fetchReply().then(reply => interaction.editReply({ content: `Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms.` }));
	},
};