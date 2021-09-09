let { Presence } = require('@adiwajshing/baileys')
let fs = require('fs')
let chalk = require('chalk')

module.exports = async (conn, m, users, groupSet, isBotAdmin, isAdmin, setting) => {
	console.log([ isBotAdmin, isAdmin ])

	if (m.mtype == 'viewOnceMessage') {
		await conn.updatePresence(m.chat, Presence.composing)
		await m.reply(`*View Once Detected!*`)
		await conn.copyNForward(m.chat, await conn.loadMessage(m.chat, m.id), false, { readViewOnce: true })
	}
	
	if (!m.fromMe && m.isGroup && isBotAdmin && !isAdmin) {
		
		if (groupSet.nolink) {
			if (m.text.match(/(https:\/\/chat.whatsapp.com)/gi)) {
				conn.groupRemove(m.chat, [m.sender])
			}
        }
        
        if (groupSet.novirtex) {
        	if (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื)/gi) || m.text.length > 10000) {
				conn.groupRemove(m.chat, [m.sender]).then(async () => {
					await conn.modifyChat(m.chat, 'delete').catch(console.log)
				})
			}  
        }
        
        if (groupSet.nobadword) {
        	let txc = setting.toxic
        	if((new RegExp( '\\b' + txc.join('\\b|\\b') + '\\b') ).test(m.text)) {
        		conn.updatePresence(m.chat, Presence.composing) 
				var cBad = users.warning += 1
				var warning = users.warning
        			if(warning > 4) {
						conn.reply(m.chat, `*Over badword!*`, m).then(() => {
							conn.groupRemove(m.chat, [m.sender])
							users.warning = 0
           			 })
					} else {
						conn.reply(m.chat, `❏  *Kamu mendapat peringatan : [ ${warning} / 5 ]*\n\n*Apabila kamu mendapat 5 peringatan kamu akan dikeluarkan secara otomatis.*`, m).then(() => {
							function dom(list) { return list[Math.floor(Math.random() * list.length)] }	
							// conn.sendFile(m.chat, fs.readFileSync(dom(['./media/audio/lungomong.opus', './media/audio/gaboleh.opus'])), 'tts.opus', null, m, true)
						})
					}
				}
        	}        
		
		
		
		
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update './jjs'"))
  delete require.cache[file]
  require(file)
})