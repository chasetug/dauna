module.exports = {
	name: 'presenceUpdate',
	execute(oldPresence, newPresence, client) {
		const { member, activities } = newPresence;
		const streamingActivity = activities.find(a => a.type == 'STREAMING');

		if (!streamingActivity) return;
		const { state, details, url } = streamingActivity;

		if (state != 'GTFO') return;
		if (!details.toLowerCase().includes('mod')) return;

		const channel = client.channels.cache.get('787788643983949844');
		channel.send(`**${member.nickname}** is currently streaming GTFO!\nCheck out **${details}** here:\n${url}`);
	},
};