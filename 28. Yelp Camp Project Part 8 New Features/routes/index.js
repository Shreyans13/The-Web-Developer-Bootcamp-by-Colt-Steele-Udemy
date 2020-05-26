let express 		= require('express'),
	indexRoutes 	= express.Router(),
	passport 		= require('passport'),
	User 			= require('../models/user')

let isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

indexRoutes.get('/', (req, res) => {
	res.render('landing')
})

indexRoutes.get('/register', (req, res) => {
	res.render('authorization/register')
})

indexRoutes.post('/register', (req, res) => {
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

indexRoutes.get('/login', (req, res) => {
	res.render('authorization/login')
})

indexRoutes.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}) ,(req,res) => {

})

indexRoutes.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/campgrounds')
})

module.exports = indexRoutes