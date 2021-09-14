let { Presence } = require('@adiwajshing/baileys')
let fs = require('fs')
let { exec } = require('child_process')
exports.run = {
	usage: ['bass', 'blown', 'chipmunk', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tuneup'],
	async: async (m, { conn, _func, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
        let set
        if (/bass/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30'
        if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
        if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
        if (/earrape/.test(command)) set = '-af volume=12'
        if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
        if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
        if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
        if (/reverse/.test(command)) set = '-filter_complex "areverse"'
        if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
        if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
        if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
        if (/tupai|squirrel|chipmunk/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
        if (/audio/.test(mime)) {
        	m.reply(_func.status.wait)
			let media = await conn.downloadAndSaveMediaMessage(q)
			let ran = _func.named('mp3')
			exec(`ffmpeg -i ${media} ${set} ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return m.reply(`*Conversion failed!*`)
                let buff = fs.readFileSync(ran)
                await conn.updatePresence(m.chat, Presence.composing)
				conn.sendAudio(m.chat, buff, false, m).then(() => {
                	fs.unlinkSync(ran)
				})
            })
         } else {
         	m.reply(`*Only for audio!*`)
         }
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false
}