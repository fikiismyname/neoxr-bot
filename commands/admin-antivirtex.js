let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['antivirtex'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.groups[m.chat]
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.db.setting.cover), `*This command to turn off and turn on anti virtex in group.*`, global.db.setting.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.novirtex) return m.reply(`*Anti Virtex already ON.*`)
			setting.novirtex = true
			m.reply(`*Anti Virtex successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.novirtex) return m.reply(`*Anti Virtex already OFF.*`)
			setting.novirtex = false
			m.reply(`Anti Virtex successfully turned off.*`)
		}
	},
	admin: true,
	group: true,
	botAdmin: true
}