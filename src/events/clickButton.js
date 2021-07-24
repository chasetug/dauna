module.exports = {
	name: 'clickButton',
	async execute(button, client) {
		const memberRoles = button.clicker.member.roles;


		if (button.id === 'test') {
			await button.reply.send(`Hello ${button.clicker.user.username}`, true);
		}
		else if (button.id === 'news') {
			if (!memberRoles.cache.find(r => r.id == '786078484681326653')) {
				memberRoles.add('786078484681326653');
				await button.reply.send('Gave you the role <@&786078484681326653>!', true);
			}
			else {
				memberRoles.remove('786078484681326653');
				await button.reply.send('Removed the role <@&786078484681326653>!', true);
			}
		}
		else if (button.id === 'lfg') {
			if (!memberRoles.cache.find(r => r.id == '786076869203722250')) {
				memberRoles.add('786076869203722250');
				await button.reply.send('Gave you the role <@&786076869203722250>!', true);
			}
			else {
				memberRoles.remove('786076869203722250');
				await button.reply.send('Removed the role <@&786076869203722250>!', true);
			}
		}
		else if (button.id === 'endskill') {
			if (memberRoles.cache.find(r => r.id == '838110953375531009')) return;
			if (!memberRoles.cache.find(r => r.id == '833714075199602689')) {
				memberRoles.add('833714075199602689');
				await button.reply.send('Gave you the role <@&833714075199602689>!', true);
			}
			else {
				memberRoles.remove('833714075199602689');
				await button.reply.send('Removed the role <@&833714075199602689>!', true);
			}
		}
	},
};