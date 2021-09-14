let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['listban'],
	async: async (m, { conn, _func, isPrefix }) => {
		let users = global.db.users
		conn.updatePresence(m.chat, Presence.composing)
		userBan = []
		for (let jid in users) {
			if (users[jid].banned) userBan.push(jid)
		}
		function gName(arr) {
			let isName = conn.getName(arr, true)
			let name = (typeof isName !== 'undefined') ? isName : 'Unnamed'
			return name
		} 
		if (userBan.length == 0) return m.reply(`*No users are banned.*`)
		return conn.go(m.chat, `❏  *L I S T B A N*\n\n*“There are ${userBan.length} users who have been banned in the database.”*\n\n${userBan.map(v => '  ›  *Name*  :  ' + gName(v) + '\n     wa.me/' + v.replace(/@.+/, '')).join('\n') + '\n\n' + global.footer}`, global.headtext, [m.sender])
	},
	error: false
}