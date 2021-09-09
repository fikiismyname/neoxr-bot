let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['limit'],
	async: async (m, { conn, _func, isPrefix }) => {
		let user = global.db.users[m.sender]
		let owner = global.db.setting
		conn.updatePresence(m.chat, Presence.composing)
		if (user.limit == 0) return conn.sendButtonLoc(m.chat, await _func.buffer(global.db.setting.cover), `*Sorry @${m.sender.split`@`[0]}, you don't have a limit, please exchange it with your points first.*`, global.footer, 'EXCHANGE', `${isPrefix}exchange 1`, m)
		if (owner.owner.includes(m.sender)) return m.reply(`*Your limit is Unlimited.*`)
		m.reply(`*Your have _${user.limit}_ limits.*`)
	},
	error: false
}