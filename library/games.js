const { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')

module.exports = (conn, m, groupSet) => {
	let id = m.chat
	
	
	if (m.mtype == 'buttonsResponseMessage' || !m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Brainout :/i.test(m.quoted.contentText)) return
		conn.brainout = conn.brainout ? conn.brainout : {}
	
    if (!(id in conn.brainout)) return m.reply(`*Silahkan kirim _${global.myPrefix}brainout_ untuk mendapatkan soal baru.*`)
    if (m.quoted.id == conn.brainout[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.brainout[id][1]))
        if (['Timeout', ''].includes(m.text)) return
        if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
        	let buff = fs.readFileSync(`./media/sticker/true.webp`)
        	conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m }).then(() => {
        	reward = rwd(500000, 5000000)
			m.reply(`*+ Rp. ${Number(reward).toLocaleString().replace(/,/gi, '.')},-*`)
			global.db.users[m.sender].point += reward
            clearTimeout(conn.brainout[id][3])
            delete conn.brainout[id]
			})
        } else { 
			x = global.db.users[m.sender].point 
        	z = rwd(50000, 1000000)
        	if(x == 0) return m.reply(`*Salah!*`)  
        	if(x < z) {
        		x.point = 0
       	} else {
 			   x.point += z
       	 } 
		let buff = fs.readFileSync(`./media/sticker/false.webp`)
        conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m }).then(() => {
			m.reply(`*- Rp. ${Number(z).toLocaleString().replace(/,/gi, '.')},-*`)
			})
        }
    }
		
		
	
	
function rwd(min, max) {  
    min = Math.ceil(min) 
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}  
}