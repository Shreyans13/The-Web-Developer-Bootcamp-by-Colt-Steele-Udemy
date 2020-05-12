let express = require('express')
let app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.get('/', (req, res) => {
	res.render("home")
	// res.send("<h2>Welcome to the <span><h1>home page</h1></span></h2>")
})

app.get('/fellinlovewith/:thing', (req, res) => {
	// res.send("You fell in love with " + req.params.thing)
	let thing = req.params.thing
	res.render("love", {thing})
})

app.get('/posts', (req, res) => {
	let posts = [
		{title: "i'll kill noobmaster69", author:"Thor - the king of asgard"},
		{title: "love noobmaster69 do you have your both eyes? Thor the king of eyes", author: "noobmater69"},
		{title: "noobmater69 loves you king of eyes", author: "deadpool"},
		{title: "When did i do that", author: "stop it deadpool by Collosus from X-men"}
	]

	res.render('posts', {posts})
})

app.listen(3000, () => {
	console.log("Server running at 3000")
})