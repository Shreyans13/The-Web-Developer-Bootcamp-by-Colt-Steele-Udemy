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

let checkCommentOwnership = (req, res, next) => {
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
					// add user id to comment
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					comment.save()
					campground.comments.push(comment)
					campground.save()
					res.redirect('/campgrounds/' + campground._id)
				}
			})
		}
	})
})

commentRoutes.get('/:comment_id/edit', checkCommentOwnership , (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if(err) {
			res.redirect('back')
		} else {
			res.render('comments/edit', {campground_id: req.params.id,comment : foundComment })
		}
	})
})

commentRoutes.put('/:comment_id',checkCommentOwnership , (req,res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, (err, updatedComment) => {
		if (err) {
			res.redirect('back')
		} else {
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})

commentRoutes.delete('/:comment_id',checkCommentOwnership , (req, res) =>{
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if(err) {
			// res.redirect('back')
			console.log(err)
		} else {
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})

module.exports = commentRoutes