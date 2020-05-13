let express = require('express')
let app = express()

let request = require('request')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('search')
})

app.get('/results', (req, res) => {
	let url = "http://www.omdbapi.com/?s=" + req.query.search + '&apikey=thewdb'
	request(url , (error, response, body) => {
		// eval(require('locus'))
		if(!error && response.statusCode == 200){
			res.render('results', {data : JSON.parse(body)["Search"]})	
			// res.send(JSON.parse(body)["Search"][0]["Title"])
		}
	})
})

app.listen(3000, () => {
	console.log("movie server started running at 3000")
})