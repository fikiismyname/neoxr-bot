let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['protect'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.groups[m.chat]
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.db.setting.cover), `*This command to turn off and turn on spam notification.*`, global.db.setting.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.spamProtect) return m.reply(`*Spam Protect already ON.*`)
			setting.spamProtect = true
			m.reply(`*Spam Protect successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.spamProtect) return m.reply(`*Spam Protect already OFF.*`)
			setting.spamProtect = false
			m.reply(`*Spam Protect successfully turned off.*`)
		}
	},
	admin: true,
	group: true,
	botAdmin: true
}