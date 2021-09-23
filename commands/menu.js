let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['bot', 'menu', 'help', 'tools', 'admintools'],
	async: async (m, { conn, _func, isPrefix, command }) => {
		let setting = global.db.setting
		let number = m.sender.split`@`[0]
		await conn.updatePresence(m.chat, Presence.composing)
		if (/bot|menu|help/.test(command)) return conn.send2ButtonLoc(m.chat, await _func.buffer(setting.cover), menu(number, isPrefix, readMore, setting), global.footer, 'SCRIPT', `${isPrefix}script`, `OWNER`, `${isPrefix}owner`, m)
		if (command == 'tools') return conn.go(m.chat, menu_owner(isPrefix), global.header, [m.sender])
		if (command == 'admintools') return conn.go(m.chat, menu_admin(isPrefix), global.header, [m.sender])
	},
	error: false
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const menu = (number, prefix, readMore, setting) => {
return `
Hai @${number} 🍃

“${setting.msg}”

Mode : ${setting.groupOnly ? '*Group Only*' : '*Public*'}
${readMore}
*01.*  P O I N T & L I M I T

	›  ${prefix}exchange
	›  ${prefix}claim
	›  ${prefix}limit
	›  ${prefix}me
	›  ${prefix}point
	›  ${prefix}profile

*02.*  S T I C K E R - T O O L S

	›  ${prefix}toimg *reply sticker*
	›  ${prefix}emo *emoji*
	›  ${prefix}flat *emoji*
	›  ${prefix}sk *reply foto / video*
	›  ${prefix}sgif *reply video / gif*
	›  ${prefix}swm *pack | author*
	›  ${prefix}tovid *reply gif sticker*

*03.*  A U D I O - T O O L S

	›  ${prefix}bass *reply audio*
	›  ${prefix}blown *reply audio*
	›  ${prefix}chipmunk *reply audio*
	›  ${prefix}fast *reply audio*
	›  ${prefix}fat *reply audio*
	›  ${prefix}nightcore *reply audio*
	›  ${prefix}reverse *reply audio*
	›  ${prefix}slow *reply audio*
	›  ${prefix}smooth *reply audio*
	›  ${prefix}tuneup *reply audio*
	›  ${prefix}tomp3 *reply video*
	›  ${prefix}tovn *reply video / audio*
	›  ${prefix}toaudio *reply doc mp3*

*04.*  D O W N L O A D E R

	›  ${prefix}fb *link*
	›  ${prefix}goreplay *query*
	›  ${prefix}ig *link*
	›  ${prefix}mediafire *query*
	›  ${prefix}play *query*
	›  ${prefix}tikmp3 *link*
	›  ${prefix}tiktok *link*
	›  ${prefix}tikwm *link*
	›  ${prefix}video *query*
	›  ${prefix}ytmp3 *link*
	›  ${prefix}ytmp4 *link*
	
*05.*  O N L Y - G R O U P

	›  ${prefix}contact *@target*
	›  ${prefix}delete
	›  ${prefix}link
	›  ${prefix}groupinfo
	›  ${prefix}tag *text*
	›  ${prefix}tagme
	›  ${prefix}steal *@target*
	›  ${prefix}saveme *name*
	›  ${prefix}wame

*06.*  O T H E R - M E N U

	›  ${prefix}brainly *query*
	›  ${prefix}goimg *query*
	›  ${prefix}lirik *query*
	›  ${prefix}pinterest *query*
	›  ${prefix}short *link*
	›  ${prefix}tr *iso text*

*07.*  S P E C I A L

	›  ${prefix}admintools
	›  ${prefix}botstat
	›  ${prefix}listban
	›  ${prefix}listblock
	›  ${prefix}listprem
	›  ${prefix}owner
	›  ${prefix}tools
	›  ${prefix}report
	›  ${prefix}runtime
`
}

const menu_owner = (prefix) => {
return `
*01.*  M O D E R A T I O N

	›  ${prefix}addown
	›  ${prefix}delown
	›  ${prefix}enable
	›  ${prefix}disable
	›  ${prefix}setcmd
	›  ${prefix}delcmd
	›  ${prefix}listcmd
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
	›  ${prefix}bctag
	›  ${prefix}clear
	›  ${prefix}clearall
	›  ${prefix}clearpc
	›  ${prefix}cleargc
	›  ${prefix}db
	›  ${prefix}unban
	
*03.*  S Y S T E M

	›  ${prefix}autobackup
	›  ${prefix}autoread
	›  ${prefix}autoclear
	›  ${prefix}global
	›  ${prefix}multiprefix
	›  ${prefix}restart
	›  ${prefix}self
	›  ${prefix}simsimi
	
*04.*  A D V A N C E

	›  $ -- Terminal
	›  > -- JS Evaluate 
	›  => -- JS Evaluate (Return)

${footer}
`
}

const menu_admin = (prefix) => {
return `
*01.*  H E L P E R

   ›  ${prefix}mute
   ›  ${prefix}everyone
   ›  ${prefix}hidetag
   ›  ${prefix}kick
   ›  ${prefix}demote
   ›  ${prefix}revoke
   
*02.*  M O D E R A T I O N

   ›  ${prefix}antidel
   ›  ${prefix}antilink
   ›  ${prefix}antivirtex
   ›  ${prefix}filter
   ›  ${prefix}localonly
   ›  ${prefix}notify
   ›  ${prefix}protect
   ›  ${prefix}left
   ›  ${prefix}welcome
   
*03.*  S E T T I N G S
   
   ›  ${prefix}group
   ›  ${prefix}textwel
   ›  ${prefix}textout
   ›  ${prefix}setdesc
   ›  ${prefix}setname
   ›  ${prefix}seticon
   
${footer}
`
}