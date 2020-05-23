let mongoose = require('mongoose')
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

module.exports =  mongoose.model('User', UserSchema)