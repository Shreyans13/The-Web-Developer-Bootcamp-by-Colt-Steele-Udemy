let mongoose = require('mongoose')
let Post = require('./models/post')
let User = require('./models/user')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/blog_demo_2')


Post.create({
	title: 'How to cook ',
	content: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
}, (err, post)=>{
	User.findOne({name: 'Bob Belcher'}, (err, foundUser) => {
		if(err){
			console.log(err)
		} else {
			foundUser.posts.push(post)
			foundUser.save((err, data) => {
				if(err){
					console.log(err)
				} else {
					console.log(data)
				}
			})
		}
	})
})

User.create({
	email: 'bob@gmail.com',
	name: 'Bob Belcher'
})
 

User.findOne({email: 'bob@gmail.com'}).populate('posts').exec((err, user) => {
	if(err){
		console.log(err)
	} else {
		console.log(user)
	}
})
