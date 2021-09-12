let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['textwel', 'textleft'],
	async: async (m, { conn, text, _func, isPrefix, command }) => {
		let setup = global.groups[m.chat]
		conn.updatePresence(m.chat, Presence.composing)
		if (command == 'textwel') {
			if (!text) return m.reply(formatWel(isPrefix, command))
			setup.textwel = text
			await m.reply(`*Successfully set.*`)
		} else if (command == 'textleft') {
			if (!text) return m.reply(formatLef(isPrefix, command))
			setup.textleft = text
			await m.reply(`*Successfully set.*`)
		}
	},
	admin: true
}

const formatWel = (prefix, command) => {
return `Sorry, can't return without text, and this explanation and how to use :

*1.* +tag : for mention new member on welcome message.
*2.* +grup : for getting group name.

• *Example* : ${prefix + command} Hi +tag, welcome to +grup group, we hope you enjoyed with us.`
}

const formatLef = (prefix, command) => {
return `Sorry, can't return without text, and this explanation and how to use :

*1.* +tag : for mention new member on left message.
*2.* +grup : for getting group name.

• *Example* : ${prefix + command} Good by +tag`
}