let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['listprem'],
	async: async (m, { conn, _func, isPrefix }) => {
		let users = global.db.users
		conn.updatePresence(m.chat, Presence.composing)
		userPrem = []
		for (let jid in users) {
			if (users[jid].premium) userPrem.push(jid)
		}
		function gName(arr) {
			let isName = conn.getName(arr, true)
			let name = (typeof isName !== 'undefined') ? isName : 'Unnamed'
			return name
		} 
		if (userPrem.length == 0) return m.reply(`*No users are premium user.*`)
		return conn.go(m.chat, `❏  *L I S T P R E M*\n\n*“There are ${userPrem.length} users who have been premium user in the database.”*\n\n${userPrem.map(v => '  ›  *Name*  :  ' + gName(v) + '\n     wa.me/' + v.replace(/@.+/, '') + '\n     *Expired*  :  ' + _func.expire(global.db.users[v].expired - new Date * 1)).join('\n') + '\n\n' + global.footer}`, global.headtext, [m.sender])
	},
	error: false
}