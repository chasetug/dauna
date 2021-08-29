module.exports = {
	name: 'say',
	description: 'Copies a message to the specified channel.',
	requiredRoles: '782438962248548352', // Moderator role
	async execute(interaction) {
		interaction.reply({ content: 'What would you like me to say?', ephemeral: true });
		const targetChannel = interaction.options.getChannel('targetchannel');

		const filter = m => {
			return m.author.id === interaction.member.id;
		};

		const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 });

		collector.on('end', collected => {
			const collectedMessage = collected.first();
			const collectedAttachment = collected.first()?.attachments.first();
			if (!collectedMessage) return interaction.editReply({ content: 'You failed to reply in time.', ephemeral: true });

			collectedMessage.delete();

			if (collectedAttachment) {
				targetChannel.send({ content: `${collected.first()}`, attachments: [collectedAttachment] });
				interaction.editReply({ content: 'Your message has been sent.', ephemeral: true });
			}
			else {
				targetChannel.send({ content: `${collected.first()}` });
				interaction.editReply({ content: 'Your message has been sent.', ephemeral: true });
			}
		});
	},
};