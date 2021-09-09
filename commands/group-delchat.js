exports.run = {
	usage: ['del', 'delete'],
	async: async (m, { conn }) => {
		if (!m.quoted) return m.reply(`*Reply chat from me.*`)
		if (m.quoted.sender !== global.conn.user.jid) return m.reply(`*Can only delete chat from me*`)
		await conn.deleteMessage(m.chat, { id: m.quoted.id, remoteJid: m.chat, fromMe: true })
	},
	group: true
}