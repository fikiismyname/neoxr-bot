let { Presence } = require('@adiwajshing/baileys')
let util = require('util')
exports.run = {
	usage: ['>', 'ev', '=>', 'evr'],
	async: async (m, { text, command }) => {
		conn.updatePresence(m.chat, Presence.composing)
	try {
		if (command == '>' || command == 'ev') {
			evL = await eval(`(async () => { ${text} })()`)
		} else if (command == '=>' || command == 'evr') {
			evL = await eval(`(async () => { return ${text} })()`)
		} m.reply(util.format(evL))
	} catch (e) {
		m.reply(util.format(e))
	}},
	owner: true
}