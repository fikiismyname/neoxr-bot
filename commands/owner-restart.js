let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['restart'],
	async: async (m, { conn }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		await m.reply('*Restarting . . .*')
    	await global.save
    	process.send('reset')
	},
	owner: true
}