let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['setprefix', 'addprefix', 'delprefix', 'multiprefix'],
	async: async (m, { conn, args, _func, isPrefix, command }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		let setting = global.setting
		let ignore = [ '>', '=', '$' ]
		if (command == 'setprefix') {
			if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} #`)
			if (args[0].length > 1) return m.reply(`*Give only one prefix.*`)
			if (ignore.includes(args[0])) return m.reply(`*Can't add prefix ${args[0]} because an error will occur.*`)
			if (args[0] == setting.prefix) return m.reply(`*The prefix you provide is the prefix currently in use.*`)
			setting.onlyprefix = args[0], global.save
			m.reply(`*Prefix has been changed to : ${args[0]}*`)
		} else if (command == 'addprefix') {
			if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} #`)
			if (args[0].length > 1) return m.reply(`*Give only one prefix.*`)
			if (ignore.includes(args[0])) return m.reply(`*Can't add prefix ${args[0]} because an error will occur.*`)
			if (setting.prefix.includes(args[0])) return m.reply(`*The prefix is ​​already in the database.*`)
			setting.prefix.push(args[0])
			m.reply(`*Prefix ${args[0]} successfully added.*`)
		} else if (command == 'delprefix') {
			if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} #`)
			if (args[0].length > 1) return m.reply(`*Give only one prefix.*`)
			if (setting.prefix.includes(args[0])) return m.reply(`*Prefix ${args[0]} not in database.*`)
			setting.prefix.forEach((data, index) => {
				if (data === args[0]) setting.prefix.splice(index, 1)
			}) 
			m.reply(`*Prefix ${args[0]} has been removed.*`)
		} else if (command == 'multiprefix') {
			if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to change the multi prefix mode or not.*`, global.footer, 'YES', `${isPrefix + command} 1`, 'NO', `${isPrefix + command} 0`, m)
		if (args[0] == 1) {
			if (setting.multiprefix) return m.reply(`*Already in multi prefix mode.*`)
			setting.multiprefix = true
			m.reply(`*Successfully changed to multi prefix mode.*`)
		} else if (args[0] == 0) {
			if (!setting.multiprefix) return m.reply(`*Is no longer in multi prefix mode.*`)
			setting.multiprefix = false
			m.reply(`*Successfully changed to 1 prefix mode.*`)
		}
	}},
	owner: true
}