module.exports = {
	namn: 'presenceUpdate',
	execute(newPresence, oldPresence, client) {
		if(!newPresence.activities.find(activity => activity.type == 'STREAMING')) return;

		// const channel = client.channels.cache.get('787788643983949844');
		// channel.send(`**${newPresence.member.nickname}** is currently streaming GTFO!`);
		console.log(newPresence.activities.indexOf('STREAMING'));
	},
};