let { Presence } = require('@adiwajshing/baileys')
let gis = require('g-i-s')
exports.run = {
	usage: ['goimg'],
	async: async (m, { conn, _func, text, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing) 
		if (!text) return m.reply(`• *Example* : ${isPrefix + command} hosico cat`)
		m.reply(_func.status.getdata)
		gis(encodeURIComponent(text), logResults)
		async function logResults(error, results) {
		if (error) {
			conn.updatePresence(m.chat, Presence.composing) 
			m.reply(_func.status.fail)
		} else {
			let data = JSON.parse(JSON.stringify(results, null, '  '));
			conn.updatePresence(m.chat, Presence.composing) 
    		for(let i = 0; i < 5; i++) {
    			var rand = Math.floor(data.length * Math.random())
    			conn.sendImage(m.chat, data[rand].url, `›  *${data[rand].width} × ${data[rand].height}*`, m)
    			await _func.delay(2500)
    		}}
		}
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false,
	limit: true
}