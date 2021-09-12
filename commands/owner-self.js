let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['self'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.setting
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.setting.cover), `*This command to change bot mode to Public or Self mode.*`, global.setting.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (!setting.public) return m.reply(`*Already in Self mode.*`)
			setting.public = false
			m.reply(`*Successfully changed the bot to Self mode.*`)
		} else if (args[0] == 'off') {
			if (setting.public) return m.reply(`*Already in Public mode.*`)
			setting.public = true
			m.reply(`*Successfully changed the bot to Public mode.*`)
		}
	},
	owner: true
}