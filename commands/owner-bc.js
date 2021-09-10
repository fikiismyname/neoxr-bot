let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['bc', 'bcpc', 'bcgc'],
	async: async (m, { conn, _func, text, command }) => {
		let q = m.quoted ? m.quoted : m
		let c = m.quoted ? m.quoted : m.msg
		let chats = conn.chats.array.filter(v => !v.read_only && v.message).map(v => v.jid)
		await conn.updatePresence(m.chat, Presence.composing)
		if (command == 'bc') {
			for (let id of chats) {
				let msg = conn.cMod(id, conn.prepareMessageFromContent(id, {[c.toJSON ? q.mtype : MessageType.extendedText]: c.toJSON ? c.toJSON() : { text: c || '' }}, {contextInfo: { mentionedJid: ["0@s.whatsapp.net"] }, quoted: {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(id ? { remoteJid: 'status@broadcast' } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": 'B R O A D C A S T', "jpegThumbnail": await _func.buffer('./media/images/thumb.jpg')} } }}), text || q.text)
				await conn.relayWAMessage(msg)
				await _func.delay(2500)
			} m.reply(`*Successfully broadcast to all chats.*`)
		} else if (command == 'bcpc') {
			for (let id of chats) {
				if (id.endsWith('s.whatsapp.net')) {
					let msg = conn.cMod(id, conn.prepareMessageFromContent(id, {[c.toJSON ? q.mtype : MessageType.extendedText]: c.toJSON ? c.toJSON() : { text: c || '' }}, {contextInfo: { mentionedJid: ['0@c.us'] }, quoted: {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(id ? { remoteJid: 'status@broadcast' } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": 'B R O A D C A S T', "jpegThumbnail": await _func.buffer('./media/images/thumb.jpg')} } }}), text || q.text)
   				 await conn.relayWAMessage(msg)
					await _func.delay(2500)
	    		}
			} m.reply(`*Successfully broadcast personal chat.*`)
		} else if (command == 'bcgc') {
			for (let id of chats) {
				if (id.endsWith('g.us')) {
					let msg = conn.cMod(id, conn.prepareMessageFromContent(id, {[c.toJSON ? q.mtype : MessageType.extendedText]: c.toJSON ? c.toJSON() : { text: c || '' }}, {contextInfo: { mentionedJid: ['0@c.us'] }, quoted: {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(id ? { remoteJid: 'status@broadcast' } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": 'B R O A D C A S T', "jpegThumbnail": await _func.buffer('./media/images/thumb.jpg')} } }}), text || q.text)
   				 await conn.relayWAMessage(msg)
					await _func.delay(2500)
	    		}
			} m.reply(`*Successfully group broadcast.*`)
		}
	},
	owner: true
}