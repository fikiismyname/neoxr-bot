module.exports = async (conn, m, _func) => {
	// coming soon . . .  
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(redBright.bold('[ UPDATE ]'), blueBright(moment(new Date() * 1).format('DD/MM/YY HH:mm:ss')), green.bold('~ games.js'))
	delete require.cache[file]
	require(file)
})