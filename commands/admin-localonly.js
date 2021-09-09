let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['localonly'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.groups[m.chat]
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.db.setting.cover), `*This command to turn off and turn on autokick when someone join to group not using indonesian number.*`, global.db.setting.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.localonly) return m.reply(`*Localonly already ON.*`)
			setting.localonly = true
			m.reply(`*Localonly successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.localonly) return m.reply(`*Localonly already OFF.*`)
			setting.localonly = false
			m.reply(`Localonly successfully turned off.*`)
		}
	},
	admin: true,
	group: true,
	botAdmin: true
}