let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['backup'],
	async: async (m, { conn, _func }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		await global.save
		let data = await _func.buffer('./database.json')
		conn.sendDoc(m.chat, data, 'database.json', m)
	} catch {
		return m.reply(_func.status.error)
	}},
	owner: true
}