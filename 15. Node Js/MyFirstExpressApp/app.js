let express = require('express')

let app = express()

app.get('/', (req, res) => {
	res.send("Hello there")
})

app.get('/bye' , (req, res) => {
	res.send("Goodbye my friend. Meet you again")
})

app.get('/new', (req, res) => {
	res.send("Hello new friend")
})

app.get('/r/:sub', (req, res) => {
	console.log(req.params)
	let n = req.params.sub
	res.send("welcome to sub routes/pages " + n)
})

app.get('/r/:sub/comments/:id/:title/', (req, res) => {
	console.log(res.params)

	res.send("Welcome to comments section")
})

app.get('/*', (req, res) => {
	res.send("Page not found or not supported")
	console.log(res.params)
})

app.listen(8000, () => {
	console.log(`Server running at 8000`)
})