const { ownerId } = require('../config.json');

const clean = text => {
	if(typeof (text) === 'string') {
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	}
	else {
		return text;
	}
};

module.exports = {
	name: 'eval',
	description: 'Executes commands',
	requiredRoles: '782439653776293898',
	async execute(interaction) {
		if(interaction.user.id !== ownerId) return;

		try {
			const code = interaction.options.getInteger('code');
			let evaled = eval(code);

			if(typeof evaled !== 'string') {
				evaled = require('util').inspect(evaled);
			}
			interaction.reply(clean(evaled), { code:'xl' });
		}
		catch (err) {
			interaction.reply({ content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, ephemeral: true });
		}
	},
};