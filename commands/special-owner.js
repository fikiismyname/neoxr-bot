let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['owner'],
	async : async (m, { conn }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		let _owner = [ global.setting.owner, ...global.setting.owners ]
		let list = []
		for (let i of _owner.map(v => v + '@s.whatsapp.net')) {
			list.push({
				"displayName": await conn.getName(i, true),
				"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${await conn.getName(i, true)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
			})
		}
		if (list.length == 1) return conn.sendContact(m.chat, _owner[0], conn.getName(_owner[0] + '@s.whatsapp.net', true), m)
		await conn.sendMessage(m.chat, { "displayName": `${list.length} Contact`, "contacts": list }, 'contactsArrayMessage', { quoted: m })
	},
	error: false
}