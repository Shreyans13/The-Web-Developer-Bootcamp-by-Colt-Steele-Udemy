let express 			= require('express')
let campgroundRoutes 	= express.Router();
let Campground 			= require('../models/campgrounds')
let middleware			= require('../middleware')

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

campgroundRoutes.post('/', middleware.isLoggedIn , (req, res) => {
	Campground.create({
		name : req.body.name,
		image : req.body.image,
		description: req.body.description,
		price: req.body.price,
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

campgroundRoutes.get('/new', middleware.isLoggedIn ,(req, res) => {
	res.render('campgrounds/new')
})

campgroundRoutes.get('/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec(function (err, found){
		if(err || !found){
			req.flash('error', 'Campground not found')
			console.log(err)
			res.redirect('back')
		} else {
			res.render('campgrounds/show', {campground: found})
		}
	})
})

// Edit campgrounds
campgroundRoutes.get('/:id/edit',middleware.checkCampgroundOwnership ,(req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render('campgrounds/edit', {campground: foundCampground})
	})
})

// Update campgrounds
campgroundRoutes.put('/:id',middleware.checkCampgroundOwnership , (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if (err) {
			res.redirect('/campgrounds')
		} else {
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})
// Destroy Campground
campgroundRoutes.delete('/:id',middleware.checkCampgroundOwnership , (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect('/campgrounds')
		} else {
			res.redirect('/campgrounds')
		}
	})
})
module.exports = campgroundRoutes