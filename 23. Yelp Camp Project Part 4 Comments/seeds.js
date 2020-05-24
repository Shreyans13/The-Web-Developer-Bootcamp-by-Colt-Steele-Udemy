let mongoose = require('mongoose')
let Campground = require('./models/campgrounds')
let comment = require('./models/comment')

let data = [
	{
		name        : 'Clouds Rest',
		image       : 'https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
		description : 'Example Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components. They have no margin by default, so use spacing utilities as needed. Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they’ll naturally fill the full width of its parent element. This is easily customized with our various sizing options.'
	},
	{
		name        : 'Waters rest',
		image       : 'https://images.unsplash.com/photo-1548707837-20bd138f04db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
		description : 'Example Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components. They have no margin by default, so use spacing utilities as needed. Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they’ll naturally fill the full width of its parent element. This is easily customized with our various sizing options.'	
	},
	{
		name        : 'Sun Rest',
		image       : 'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
		description : 'Example Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components. They have no margin by default, so use spacing utilities as needed. Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they’ll naturally fill the full width of its parent element. This is easily customized with our various sizing options.'
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