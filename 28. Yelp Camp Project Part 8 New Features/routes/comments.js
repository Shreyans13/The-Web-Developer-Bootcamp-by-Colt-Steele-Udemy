let express 		= require('express'),
	commentRoutes 	= express.Router({mergeParams: true}),
	Campground 		= require('../models/campgrounds'),
	Comment 		= require('../models/comment')
	middleware		= require('../middleware')

commentRoutes.get('/new', middleware.isLoggedIn ,(req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err)
		} else {
			res.render('comments/new',{campground})
		}
	})
})

commentRoutes.post('/', middleware.isLoggedIn ,(req, res) => {
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

commentRoutes.get('/:comment_id/edit', middleware.checkCommentOwnership , (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if(err) {
			res.redirect('back')
		} else {
			res.render('comments/edit', {campground_id: req.params.id,comment : foundComment })
		}
	})
})

commentRoutes.put('/:comment_id', middleware.checkCommentOwnership , (req,res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, (err, updatedComment) => {
		if (err) {
			res.redirect('back')
		} else {
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})

commentRoutes.delete('/:comment_id',middleware.checkCommentOwnership , (req, res) =>{
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