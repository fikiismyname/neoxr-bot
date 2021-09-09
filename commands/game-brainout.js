let { Presence } = require('@adiwajshing/baileys')
let fs = require('fs')
exports.run = {
	usage: ['brainout'],
	async: async (m, { conn, _func, isPrefix }) => {
    	conn.brainout = conn.brainout ? conn.brainout : {}
   	 let id = m.chat
		let timeout = 120000
		let poin = 0
    	if (id in conn.brainout) return conn.reply(m.chat, '*^ soal ini belum terjawab!*', conn.brainout[id][0])  
    	let _brainout = JSON.parse(fs.readFileSync('./database/brainout.json'))
    	let mix = Math.floor(Math.random() * _brainout.length)
   	 const res = _brainout[mix]
   	 let json = res
   	 let caption = `Timeout : [ *${((timeout / 1000) / 60)} menit* ]`
   	 conn.brainout[id] = [
    	await conn.sendButtonLoc(m.chat, await _func.buffer('https://telegra.ph/file/fb7601f5a92a2ce723472.jpg'), 'Brainout : *' + json.pertanyaan + '*\n\n' + caption, '*ʀᴇᴘʟʏ ᴘᴇꜱᴀɴ ɪɴɪ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀᴡᴀʙ*', 'CLUE', `${isPrefix}brclue`, m),
    	json, poin,
        setTimeout(() => {
        	conn.updatePresence(m.chat, Presence.composing) 
            if (conn.brainout[id]) conn.reply(m.chat, `*Time's up!*\nJawaban : *${json.jawaban}*`, conn.brainout[id][0])
            delete conn.brainout[id]
        }, timeout)
    ]},
	group: true,
	limit: true
}