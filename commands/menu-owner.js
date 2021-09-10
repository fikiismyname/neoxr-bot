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
	›  ${prefix}enable
	›  ${prefix}disable
	›  ${prefix}setmsg
	›  ${prefix}setwm
	›  ${prefix}setcover
	›  ${prefix}setheader
	›  ${prefix}setfooter
	
*02.*  H E L P E R
	
	›  ${prefix}backup
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
	›  ${prefix}multiprefix
	›  ${prefix}self
	›  ${prefix}simsimi
	
*04.*  A D V A N C E

	›  $ -- Terminal
	›  > -- JS Evaluate 
	›  => -- JS Evaluate (Return)

${footer}
`
}