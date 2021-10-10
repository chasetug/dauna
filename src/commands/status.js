module.exports = {
	name: 'status',
	description: 'Sets the status of the bot',
	requiredRoles: '782438962248548352', // Moderator role
	async execute(interaction) {
		const name = interaction.options.getString('name');
		const type = interaction.options.getString('type') || 'PLAYING';
		const url = interaction.options.getString('url');

		let options;
		if(url && type === 'STREAMING') {
			options = { type: type, url: url };
		}
		else {
			options = { type: type };
		}

		interaction.client.user.setActivity(name, options);
		interaction.reply({ content: `My status has been set to **${name}** with options \`${JSON.stringify(options)}\``, ephemeral: true });
	},
};