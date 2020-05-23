let mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/blog_demo')
// POST - title, content
let PostSchema = new mongoose.Schema({
	title   : String,
	content : String
})
let Post = mongoose.model('Post', PostSchema)


// USER - email, name
let UserSchema = new mongoose.Schema({
	email : String,
	name  : String,
	posts : [PostSchema]
})
let User = mongoose.model('User', UserSchema)

// let newUser = new User({
// 	email : 'hermione@hogwarts.edu',
// 	name  : 'Herminoe Granger'  
// })

// newUser.posts.push({
// 	title   : 'how to bre poly juice portion',
// 	content : 'Just Kidding. Go to portions class to learn it!' 
// })

// newUser.save((err, user) => {
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log(user)
// 	}
// })

	// let newPost = new Post({
	// 	title   : 'Charlie`s post',
	// 	content : 'The post of Charlie' 
	// })

	// newPost.save((err, post) => {
	// 	if(err) {
	// 		console.log(err)
	// 	} else {
	// 		console.log(post)
	// 	}
	// })


// User.findOne({name: 'Herminoe Granger'}, (err, user) => {
// 	if (err) {
// 		console.log(err)
// 	} else {
// 		// console.log(user)
// 		user.posts.push({
// 			title: "The project",
// 			content : "IDKWAWT"
// 		})

// 		user.save((err, user) => {
// 			if(err) {
// 				console.log(err)
// 			} else {
// 				console.log(user)
// 			}
// 		})
// 	}
// })