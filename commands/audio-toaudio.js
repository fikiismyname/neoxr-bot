let { Presence } = require('@adiwajshing/baileys')
let fs = require('fs')
let { exec } = require('child_process')
exports.run = {
	usage: ['tomp3', 'toaudio', 'tovn'],
	async: async (m, { conn, _func, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '') 
        if (/audio|video/.test(mime)) {
        	m.reply(_func.status.wait)
			let media = await conn.downloadAndSaveMediaMessage(q)
			let ran = _func.named('mp3')
			exec(`ffmpeg -i ${media} ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return m.reply(`*Conversion failed!*`)
                let buff = fs.readFileSync(ran)
                await conn.updatePresence(m.chat, Presence.recording)
				if (/tomp3|toaudio/.test(command)) return conn.sendAudio(m.chat, buff, false, m).then(() => { fs.unlinkSync(ran) })
				if (/tovn/.test(command)) return conn.sendAudio(m.chat, buff, true, m).then(() => { fs.unlinkSync(ran) })
            })
         } else {
         	m.reply(`*Only for video or audio!*`)
         }
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false
}