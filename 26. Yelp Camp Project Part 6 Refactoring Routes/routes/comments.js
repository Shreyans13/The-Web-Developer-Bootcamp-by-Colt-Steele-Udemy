let express 		= require('express'),
	commentRoutes 	= express.Router({mergeParams: true}),
	Campground 		= require('../models/campgrounds'),
	Comment 		= require('../models/comment')

let isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

commentRoutes.get('/new', isLoggedIn ,(req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err)
		} else {
			res.render('comments/new',{campground})
		}
	})
})

commentRoutes.post('/', isLoggedIn ,(req, res) => {
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

module.exports = commentRoutes