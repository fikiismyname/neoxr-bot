let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
exports.run = {
	usage: ['tools'],
	async: async (m, { conn, _func, isPrefix }) => {
		let number = m.sender.split`@`[0]
		await conn.updatePresence(m.chat, Presence.composing)
		conn.go(m.chat, menu(number, isPrefix, global.footer), global.header, [m.sender])
	},
	error: false,
	owner: true
}

const menu = (number, prefix) => {
return `
*01.*  M O D E R A T I O N

	›  ${prefix}addown
	›  ${prefix}delown
	›  ${prefix}set
	›  ${prefix}setcover
	›  ${prefix}enable
	›  ${prefix}disable
	
*02.*  H E L P E R
	
	›  ${prefix}ban
	›  ${prefix}bc
	›  ${prefix}bcpc
	›  ${prefix}bcgc
	›  ${prefix}clear
	›  ${prefix}clearall
	›  ${prefix}clearpc
	›  ${prefix}cleargc
	›  ${prefix}unban
	
*03.*  S Y S T E M

	›  ${prefix}autobackup
	›  ${prefix}autoread
	›  ${prefix}autoclear
	›  ${prefix}global
	›  ${prefix}self
	›  ${prefix}simsimi
	
${footer}
`
}