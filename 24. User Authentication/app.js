let express 				= 	require('express'),
	mongoose 				= 	require('mongoose'),
	bodyParser 				= 	require('body-parser'),
	passport 				= 	require('passport'),
	LocalStratergy			= 	require('passport-local'),
	passportLocalMongoose	= 	require('passport-local-mongoose'),
	User 					=	require('./models/user'),
	expressSession 			=	require('express-session')
	app 					= 	express()
	

const PORT = 3000

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/auth_demo_app')

app.use(expressSession({
	secret: "Leo is the best dog in the world",
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

let isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/secret', isLoggedIn, (req, res) => {
	res.render('secret')
})

app.get('/register', (req, res) => {
	res.render('register')
})

app.post('/register', (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			console.log(err)
		} else {
			passport.authenticate('local')(req, res, () => {
				res.redirect('/secret')
			})
		}
	})
})

app.get('/login', (req,res) => {
	res.render('login')
})

app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login' 
}), (req, res) => {
})

app.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

app.listen(PORT, () => {
	console.log('Server started at \nport\t: ' + PORT + '\nnetwork\t: http://localhost:' + PORT)
})