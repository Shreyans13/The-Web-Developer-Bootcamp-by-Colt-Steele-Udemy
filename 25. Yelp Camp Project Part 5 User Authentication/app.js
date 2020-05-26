let express      	= require(`express`),
    bodyParser   	= require('body-parser'),
    mongoose     	= require('mongoose'),
    Campground   	= require('./models/campgrounds'),
    Comment      	= require('./models/comment'),
    seedDB       	= require('./seeds'),
    passport 	 	= require('passport'),
    LocalStratergy 	= require('passport-local'),
    User 			= require('./models/user'),
    expressSession 	= require('express-session'),
    app          	= express()

const PORT = 3000

seedDB()
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/yelp_camp_v3')

app.use(expressSession({
	secret: "Once again leo is a dog",
	resave: false,
	saveUninitialized: false
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')

passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
	res.locals.currentUser = req.user
	next()
})
let isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

app.get('/', (req, res) => {
	res.render('landing')
})

	
// Campground.create({
	// 		name:"Camp Ground 1",
	// 		image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
	// 		description: "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	// 	}, (err, data) => {
	// 		if(err){
	// 			console.log("error occured")
	// 			console.log(err)
	// 		} else {
	// 			console.log("data added")
	// 			console.log(data)
	// 		}
	// 	})

// let campgrounds = [
	// 		{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 0", image: "https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 1", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 2", image: "https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 		{name:"Camp Ground 3", image: "https://images.unsplash.com/photo-1532325404168-631dd4bdf4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
	// 	]

app.get('/campgrounds' , (req, res) => {
	console.log(req.user)
	Campground.find({},(err, allCampgrounds) => {
		if(err){
			console.log(err)
		} else {
			res.render('campgrounds/index', {campgrounds: allCampgrounds})
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

app.get('/campgrounds/new', isLoggedIn ,(req, res) => {
	res.render('campgrounds/new')
})

app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec(function (err, found){
		if(err){
			console.log('error ocured')
		} else {
			console.log( "=====================")
			console.log(found)
			console.log( "=====================")
			res.render('campgrounds/show', {campground: found})
		}
	})
	// res.render('show')
})

// ==================================

app.get('/campgrounds/:id/comments/new', isLoggedIn ,(req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err)
		} else {
			res.render('comments/new',{campground})
		}
	})
})

app.post('/campgrounds/:id/comments', isLoggedIn ,(req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.log(err)
		} else {
			// console.log(req.body.comments)
			Comment.create(req.body.comments, (err, comment) => {
				if (err) {
					console.log(err)
				} else {
					campground.comments.push(comment)
					campground.save()
					res.redirect('/campgrounds/' + campground._id)
				}
			})
		}
	})
})

// ==================================

app.get('/register', (req, res) => {
	res.render('authorization/register')
})

app.post('/register', (req, res) => {
	let newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, (err, user) => {
		if(err) {
			console.log(err)
			return res.render('authorization/register')
		}
			passport.authenticate('local')(req, res, () => {
			res.redirect('/campgrounds')
		})
	})
})

app.get('/login', (req, res) => {
	res.render('authorization/login')
})

app.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}) ,(req,res) => {

})

app.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/campgrounds')
})

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT} and network\thttp://localhost:${PORT}\n`)
})
