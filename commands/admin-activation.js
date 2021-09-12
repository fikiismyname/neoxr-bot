let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['mute'],
	async: async (m, { conn, args, _func, isPrefix, command }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		let gc = global.groups[m.chat]
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to change the bot activation in the group.*`, global.footer, 'YES', `${isPrefix + command} 1`, 'NO', `${isPrefix + command} 0`, m)
		if (args[0] == 1) {
			if (gc.mute) return m.reply(`*Bot has been muted.*`)
			gc.mute = true
			m.reply(`*Successfully muted.*`)
		} else if (args[0] == 0) {
			if (!gc.mute) return m.reply(`*Bot has been unmuted.*`)
			gc.mute = false
			m.reply(`*Successfully unmuted.*`)
		}
	},
	admin: true
}