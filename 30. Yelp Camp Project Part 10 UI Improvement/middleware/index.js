let Campground 		= require('../models/campgrounds'),
    Comment 		= require('../models/comment')
module.exports = {
	checkCampgroundOwnership: (req, res, next) => {
		// is logged in or not
		if (req.isAuthenticated()) {
			// post is owned or not
			Campground.findById(req.params.id, (err, foundCampground) => {
				if (err || !foundCampground) {
					req.flash('error', 'Campground not found')
					res.redirect('back')
				} else {
					if (foundCampground.author.id.equals(req.user.id)) {
						next()
					} else {
						req.flash('You don`t have permission to do that')
						res.redirect('back')
					}
				}
			})
		} else {
			req.flash('error', "You need to be logged in to do that")
			res.redirect('back')
		}
	},
	checkCommentOwnership: (req, res, next) => {
		// is logged in or not
		if (req.isAuthenticated()) {
			// post is owned or not
			Comment.findById(req.params.comment_id, (err, foundComment) => {
				if (err || !foundComment) {
					req.flash('error', 'Comment not found')
					res.redirect('back')
				} else {
					if (foundComment.author.id.equals(req.user.id)) {
						next()
					} else {
						req.flash('You don`t have permission to do that')
						res.redirect('back')
					}
				}
			})
		} else {
			req.flash('error', "You need to be logged in to do that")
			res.redirect('back')
		}
	},
	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next()
		}
		req.flash('error', 'You need to be logged in to do that')
		res.redirect('/login')
	}
}