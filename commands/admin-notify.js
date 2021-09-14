let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['notify'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.groups[m.chat]
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.db.setting.cover), `*This command to turn off and turn on spam notification.*`, global.db.setting.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.notify) return m.reply(`*Spam Notifcation already ON.*`)
			setting.notify = true
			m.reply(`*Spam Notifcation successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.notify) return m.reply(`*Spam Notifcation already OFF.*`)
			setting.notify = false
			m.reply(`*Spam Notifcation successfully turned off.*`)
		}
	},
	admin: true,
	group: true
}