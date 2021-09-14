let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['disable', 'enable'],
	async: async (m, { conn, args, isPrefix, command }) => {
		let cmd = global.db.setting
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} tiktok*`)
		if (command == 'disable') {
			if (cmd.errorCmd.includes(args[0])) return m.reply(`*Command ${isPrefix + args[0]} is already disabled.*`)
			cmd.errorCmd.push(args[0])
			m.reply(`*Done!*`)
		} else if (command == 'enable') {
			if (!cmd.errorCmd.includes(args[0])) return m.reply(`*Command ${isPrefix + args[0]} not found.*`)
			cmd.errorCmd.forEach((data, index) => {
				if (data === args[0]) cmd.errorCmd.splice(index, 1)
			}) 
			m.reply(`*Done*`)
		}
	},
	owner: true
}
