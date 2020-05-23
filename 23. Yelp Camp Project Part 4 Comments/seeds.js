let mongoose = require('mongoose')
let Campground = require('./models/campgrounds')
let comment = require('./models/comment')

let data = [
	{
		name        : 'Clouds Rest',
		image       : 'https://loremflickr.com/320/240?random=1',
		description : 'blah blah blah blah'
	},
	{
		name        : 'Waters rest',
		image       : 'https://loremflickr.com/320/240?random=2',
		description : 'blah blah blah blahblah blah blah blahblah blah blah blah'	
	},
	{
		name        : 'Sun Rest',
		image       : 'https://loremflickr.com/320/240?random=3',
		description : 'blah blah blah blah blah blah blah'
	}
]

module.exports = () => {
	// Remove all campgrounds
	Campground.remove({}, (err) => {
		if(err){
			console.log(err)
		} else {
			console.log('removed campground')
			for (var i = 0; i < data.length; i++) {
				Campground.create(data[i], (err,campground) => {
					if(err) {
						console.log(err)
					} else {
						console.log('Added a campground')
						// create a comment
						comment.create({
							text: "This place id great.",
							author: 'Homer'
						}, (err, comment) => {
							if(err) {
								console.log('error')
							} else {
								campground.comments.push(comment)
								campground.save()
								console.log('Created new comment')
							}
						})
					}
				})
			}
		}
	})
}