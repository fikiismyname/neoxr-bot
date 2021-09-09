let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['clear', 'clearall', 'clearpc', 'cleargc'],
	async: async (m, { conn, _func, command }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		m.reply(_func.status.wait)
		let chats = conn.chats.array.filter(v => !v.read_only && v.message).map(v => v.jid)
		if (command == 'clear') {
			await conn.modifyChat(m.chat, 'delete').catch(console.log)
			conn.reply(m.chat, `*Done!*`, m)
		} else if (command == 'clearall') {
			for (let id of chats) {
				await conn.modifyChat(id, 'delete').catch(console.log)
				if (id.endsWith('g.us')) conn.go(id, '*Group chat has been cleaned.*', global.header, ['0@s.whatsapp.net'])
			} conn.reply(m.chat, `*Succesfully deleted all chat.*`, m)
		} else if (command == 'clearpc') {
			for (let id of chats) {
				if (id.endsWith('s.whatsapp.net')) {
					await conn.modifyChat(id, 'delete').catch(console.log)
				} conn.reply(m.chat, `*Personal chat has been cleaned.*`, m)
			} 
		} else if (command == 'cleargc') {
			for (let id of chats) {
				if (id.endsWith('g.us')) {
					await conn.modifyChat(id, 'delete').catch(console.log)
					conn.go(id, `*Group chat has been cleaned.*`, global.header, ['0@s.whatsapp.net'])
				} 
			} 
		}
	},
	owner: true
}