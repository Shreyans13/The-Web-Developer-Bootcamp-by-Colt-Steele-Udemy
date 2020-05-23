let mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/blog_demo_2')
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
	posts : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"	
		}
	]
})
let User = mongoose.model('User', UserSchema)

User.findOne({email: 'bob@gmail.com'}).populate('posts').exec((err, user) => {
	if(err){
		console.log(err)
	} else {
		console.log(user)
	}
})

// Post.create({
// 	title: 'How to cook the best burger part 3',
// 	content: 'abcdefghijklmnopqrstuvwxyz'
// }, (err, post)=>{
// 	User.findOne({name: 'Bob Belcher'}, (err, foundUser) => {
// 		if(err){
// 			console.log(err)
// 		} else {
// 			foundUser.posts.push(post)
// 			foundUser.save((err, data) => {
// 				if(err){
// 					console.log(err)
// 				} else {
// 					console.log(data)
// 				}
// 			})
// 		}
// 	})
// })

// User.create({
// 	email: 'bob@gmail.com',
// 	name: 'Bob Belcher'
// })
