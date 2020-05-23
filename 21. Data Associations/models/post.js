let mongoose = require('mongoose')
// POST - title, content
let PostSchema = new mongoose.Schema({
	title   : String,
	content : String
})

module.exports = mongoose.model('Post', PostSchema)