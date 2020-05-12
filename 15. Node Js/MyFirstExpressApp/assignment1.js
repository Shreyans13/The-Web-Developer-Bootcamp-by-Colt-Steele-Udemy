let express = require('express')

let app = express()

app.get('/', (req, res) => {
	res.send("Welcome to my assignment")
})

app.get('/speak/:i', (req, res) => {
	// console.log()
	let sendData = ''
	sendData = (req.params.i == 'pig') ? `The pig says 'Oink'` : (req.params.i == 'cow') ? `The cow says 'Moo'` : (req.params.i == 'dog') ? `The dog says Woof Woof` : 'Not Found'
	res.send(sendData)
})

app.get('/repeat/:word/:times', (req, res) => {
	let w = req.params.word
	let t = req.params.times
	let sendData = ''
	for(let i = 0; i < req.params.times ; i++ ){
		sendData += req.params.word + "\t"
	}
	res.send(sendData)
})

app.get('\*', (req, res) => {
	res.send("Sorry page not found")
})

app.listen(8000, ()=>{
	console.log("server running at 8000 port")
})