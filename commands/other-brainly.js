let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
exports.run = {
	usage: ['brainly'],
	async: async (m, { conn, _func, text, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!text) return m.reply(`• *Example* : ${isPrefix + command} how to cooking rice*`)
		let json = await (await fetch(global.API('pk', '/api/brainly', { search: text }, 'apikey'))).json()
		if (json.data.length == 0) return m.reply(_func.status.fail)
		for (let i=0; i<3; i++) {
			conn.updatePresence(m.chat, Presence.composing)
			m.reply(`${json.data[i].pertanyaan}\n\n*Jawaban* : ${(json.data[i].jawaban).replace('Jawaban:', '').trim()}`)
    		await _func.delay(1500)	
		}
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false
}