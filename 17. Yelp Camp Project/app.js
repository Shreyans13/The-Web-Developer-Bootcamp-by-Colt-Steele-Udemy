let express = require(`express`)
let app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(require('body-parser').urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.render('landing')
})

let campgrounds = [
		{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1554919699-85fbd442c7f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1554919699-85fbd442c7f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1554919699-85fbd442c7f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	]

app.get('/campgrounds' , (req, res) => {
	res.render('campgrounds', {campgrounds})
})

app.post('/campgrounds', (req, res) => {
	campgrounds.push({name:req.body.name, image:req.body.image})
	res.redirect('/campgrounds')
})

app.get('/campgrounds/new', (req, res) => {
	res.render('new')
})

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT} and network\nhttp://localhost:${PORT}`)
})