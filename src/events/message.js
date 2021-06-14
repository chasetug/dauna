const { prefix } = require('../config.json');

module.exports = {
	name: 'message',
	execute(message, client) {
		const { member, content, channel, guild } = message;
		if (message.author.bot) return;
		if (!content.startsWith(prefix)) return;

		const args = content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.has(commandName)) return;

		const command = client.commands.get(commandName);

		let { permissions = [], requiredRoles = [] } = command;

		if (typeof permissions === 'string') {
			permissions = [permissions];
		}

		for (const permission of permissions) {
			if (!member.hasPermission(permission)) {
				channel.send(`You must have the \`${permission}\` permission to use this command.`);
				return;
			}
		}

		if (typeof requiredRoles === 'string') {
			requiredRoles = [requiredRoles];
		}

		for (const requiredRole of requiredRoles) {
			const role = guild.roles.cache.find(r => r.id === requiredRole);
			if(!role) return console.error(`Role ${role} does not exist`);

			if (!member.roles.cache.has(role.id)) {
				channel.send(`You must have the \`${role.name}\` role to use this command.`);
				return;
			}
		}

		try {
			command.execute(client, message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('There was an error trying to execute that command!');
		}
	},
};

