module.exports = {
	name: 'lfg',
	description: 'Creates a link to join a lobby',
	async execute(interaction) {
		const rundown = interaction.options.getString('rundown');
		const lobbyId = interaction.options.getInteger('lobbyid');
		interaction.reply(`Join ${interaction.member} in ${rundown}: \nsteam://joinlobby/493520/${lobbyId}/`);
	},
};