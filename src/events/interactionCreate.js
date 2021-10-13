module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (interaction.isCommand()) {
			if(!client.commands.has(interaction.commandName)) return interaction.reply({ content: 'This command does not exist.', ephemeral: true });

			const command = client.commands.get(interaction.commandName);

			let { requiredRoles = [] } = command;

			if (typeof requiredRoles === 'string') {
				requiredRoles = [requiredRoles];
			}

			for (const requiredRole of requiredRoles) {
				const role = interaction.guild.roles.cache.find(r => r.id === requiredRole);
				if(!role) return console.error(`Role ${role} does not exist`);

				if (!interaction.member.roles.cache.has(role.id)) {
					interaction.reply({ content: `You must have the \`${role.name}\` role to use this command.`, ephemeral: true });
					return;
				}
			}

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
		else if (interaction.isButton()) {
			const memberRoles = interaction.member.roles;
			if (interaction.customId === 'test') {
				await interaction.reply({ content: `Hello ${interaction.user.username}`, ephemeral: true });
			}
			else if (interaction.customId === 'news') {
				if (!memberRoles.cache.find(r => r.id === '786078484681326653')) {
					await memberRoles.add('786078484681326653');
					await interaction.reply({ content: 'Gave you the role <@&786078484681326653>!', ephemeral:true });
				}
				else {
					await memberRoles.remove('786078484681326653');
					await interaction.reply({ content: 'Removed the role <@&786078484681326653>!', ephemeral:true });
				}
			}
			else if (interaction.customId === 'lfg') {
				if (!memberRoles.cache.find(r => r.id === '786076869203722250')) {
					await memberRoles.add('786076869203722250');
					await interaction.reply({ content:'Gave you the role <@&786076869203722250>!', ephemeral:true });
				}
				else {
					await memberRoles.remove('786076869203722250');
					await interaction.reply({ content: 'Removed the role <@&786076869203722250>!', ephemeral:true });
				}
			}
			else if (interaction.customId === 'endskill') {
				if (memberRoles.cache.find(r => r.id === '838110953375531009')) return;
				if (!memberRoles.cache.find(r => r.id === '833714075199602689')) {
					await memberRoles.add('833714075199602689');
					await interaction.reply({ content: 'Gave you the role <@&833714075199602689>!', ephemeral:true });
				}
				else {
					await memberRoles.remove('833714075199602689');
					await interaction.reply({ content: 'Removed the role <@&833714075199602689>!', ephemeral:true });
				}
			}
			/*
			else if (interaction.custom_id.startsWith('ticket')) {
				interaction.reply({ content: 'Creating your ticket...', ephemeral: true });
				const channel = interaction.guild.channels.fetch(784296066035613696);
				const thread = await channel.threads.create({
					name: `ticket-${interaction.user.username}`,
					autoArchiveDuration: 'MAX',
					type: 'GUILD_PRIVATE_THREAD',
					reason: 'User opened a ticket.',
				});
				await thread.members.add(interaction.user.id);
				await thread.send({ content: '<@782438962248548352>' });
			}
	     	*/
		}
	},
};
