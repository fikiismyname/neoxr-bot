let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['ping'],
	async: async (m) => {
		m.reply(`Pwu`)
	},
	error: false
}
