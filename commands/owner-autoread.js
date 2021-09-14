let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['autoread'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.setting
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.db.setting.cover), `*This command to turn off and turn on autoread.*`, global.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.autoread) return m.reply(`*Autoread already ON.*`)
			setting.autoread = true
			m.reply(`*Autoread successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.autoread) return m.reply(`*Autoread already OFF.*`)
			setting.autoread = false
			m.reply(`*Autoread successfully turned off.*`)
		}
	},
	owner: true
}