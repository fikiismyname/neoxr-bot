let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['brclue'],
	async: async (m, { conn, isPrefix }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
  	  conn.brainout = conn.brainout ? conn.brainout : {}
   	 let id = m.chat
   	 if (!(id in conn.brainout)) return
		let json = conn.brainout[id][1]
    	let nya = json.jawaban
    	let nyanya = nya.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    	m.reply('```' + nyanya + '```')
	},
	group: true
}