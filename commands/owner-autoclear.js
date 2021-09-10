let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['autoclear'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.setting
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to turn off and turn on autoclear.*`, global.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.autoclear) return m.reply(`*Autoclear already ON.*`)
			setting.autoclear = true
			m.reply(`*Autoclear successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.autoclear) return m.reply(`*Autoclear already OFF.*`)
			setting.autoclear = false
			m.reply(`*Autoclear successfully turned off.*`)
		}
	},
	owner: true
}