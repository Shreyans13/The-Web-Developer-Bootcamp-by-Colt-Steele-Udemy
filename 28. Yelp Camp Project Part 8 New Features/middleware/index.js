let Campground 		= require('../models/campgrounds'),
    Comment 		= require('../models/comment')
module.exports = {
	checkCampgroundOwnership: (req, res, next) => {
		// is logged in or not
		if (req.isAuthenticated()) {
			// post is owned or not
			Campground.findById(req.params.id, (err, foundCampground) => {
				if (err) {
					res.redirect('back')
				} else {
					if (foundCampground.author.id.equals(req.user.id)) {
						next()
					} else {
						res.redirect('back')
					}
				}
			})
		} else {
			res.redirect('back')
		}
	},
	checkCommentOwnership: (req, res, next) => {
		// is logged in or not
		if (req.isAuthenticated()) {
			// post is owned or not
			Comment.findById(req.params.comment_id, (err, foundComment) => {
				if (err) {
					res.redirect('back')
				} else {
					if (foundComment.author.id.equals(req.user.id)) {
						next()
					} else {
						res.redirect('back')
					}
				}
			})
		} else {
			res.redirect('back')
		}
	},
	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect('/login')
	}
}