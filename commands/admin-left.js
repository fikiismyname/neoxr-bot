let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['left'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.groups[m.chat]
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.setting.cover), `*This command to turn off and turn on left message in group.*`, global.setting.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.left) return m.reply(`*Left Message already ON.*`)
			setting.left = true
			m.reply(`*Left Message successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.left) return m.reply(`*Left Message already OFF.*`)
			setting.left = false
			m.reply(`Left Message successfully turned off.*`)
		}
	},
	admin: true,
	group: true
}