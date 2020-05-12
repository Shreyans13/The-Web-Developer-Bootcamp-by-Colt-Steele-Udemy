let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs');

let friends = ["Vttrix", "Yogesh", "Shivam Bro", "Suraj Singh"]

app.get('/', (req,res) => {
	res.render("home")
})

app.get('/friends', (req, res) => {
	res.render("friends", {friends})
})

app.post('/addFriend', (req, res) => {
	let newFriend = req.body.newFriend
	friends.push(newFriend)
	res.redirect("/friends")
})

app.listen(3000, () => {
	console.log("Server running at http://localhost/3000")
})