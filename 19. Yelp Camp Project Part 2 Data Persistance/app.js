let app          = require(`express`)(),
    bodyParser   = require('body-parser'),
    mongoose     = require('mongoose')

const PORT = 3000

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/yelp_camp_v2')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
})

let Campground = mongoose.model('Campground', campgroundSchema)

app.get('/', (req, res) => {
	res.render('landing')
})

	
Campground.create({
			name:"Camp Ground 1",
			image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
			description: "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}, (err, data) => {
			if(err){
				console.log("error occured")
				console.log(err)
			} else {
				console.log("data added")
				console.log(data)
			}
		})

let campgrounds = [
			{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
			{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
		]

app.get('/campgrounds' , (req, res) => {
	Campground.find({},(err, allCampgrounds) => {
		if(err){
			console.log(err)
		} else {
			res.render('index', {campgrounds: allCampgrounds})
		}
	})
	// res.render('campgrounds', {campgrounds})
})

app.post('/campgrounds', (req, res) => {
	Campground.create({
		name : req.body.name,
		image : req.body.image,
		description: req.body.description
	} , (err, data) => {
		if(err){
			console.log("error occured")
			console.log(err)
		} else {
			// console.log("data added")
			// console.log(data)
			res.redirect('/campgrounds')
		}
	})
})

app.get('/campgrounds/new', (req, res) => {
	res.render('new')
})

app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id, (err, found) => {
		if(err){
			console.log('error ocured')
		} else {
			// console.log(found)
			res.render('show',{campground: found})
		}
	})
	// res.render('show')
})

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT} and network\thttp://localhost:${PORT}\n`)
})