let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['db'],
	async: async (m, { conn, args, isPrefix }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		let users = global.users, chats = global.chats
		let day = 86400000 * 10, now = new Date() * 1
		let user = 0
		let chat = 0
		if (args[0] == 'clean') {
   	 	for (let jid in users) {
				if (now - users[jid].lastseen > day && !users[jid].premium) {
				delete users[jid]
				user += 1
			}}
   	 	for (let jid in chats) {
				if (now - chats[jid].lastseen > day) {
				delete chats[jid]
				chat += 1
			}} m.reply(`*Successfully deleted ${user} users and ${chat} chats.*`)
		} else {
		for (let jid in users) {
    		if (now - users[jid].lastseen > day && !users[jid].premium) user += 1
		}
		for (let jid in chats) {
    		if (now - chats[jid].lastseen > day) chat += 1
		}
		let y = `❏  *D B - C L E A N*\n\n`
		y += `There are *${user}* users and *${chat}* chats that are inactive for 1 week.\n\n`
		y += `Send *${isPrefix}db clean* to delete data.`
		m.reply(y)
	}},
	owner: true
}