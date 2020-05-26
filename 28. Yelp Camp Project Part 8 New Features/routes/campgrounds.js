let express 			= require('express')
let campgroundRoutes 	= express.Router();
let Campground 			= require('../models/campgrounds')

let isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

campgroundRoutes.get('/' , (req, res) => {
	// console.log(req.user)
	Campground.find({},(err, allCampgrounds) => {
		if(err){
			console.log(err)
		} else {
			res.render('campgrounds/index', {campgrounds: allCampgrounds})
		}
	})
})

campgroundRoutes.post('/',isLoggedIn , (req, res) => {
	Campground.create({
		name : req.body.name,
		image : req.body.image,
		description: req.body.description,
		author: {
			id : req.user._id,
			username : req.user.username
		}
	} , (err, data) => {
		if(err){
			console.log("error occured")
			console.log(err)
		} else {
			res.redirect('/campgrounds')
		}
	})
})

campgroundRoutes.get('/new', isLoggedIn ,(req, res) => {
	res.render('campgrounds/new')
})

campgroundRoutes.get('/:id', (req, res) => {
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
})

module.exports = campgroundRoutes