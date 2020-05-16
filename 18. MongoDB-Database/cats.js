const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/cat_app')

let catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
})

let Cat = mongoose.model('Cat', catSchema)

// let george = new Cat({
// 	name: 'George',
// 	age: 11,
// 	temperament: 'Grouchy'
// })

// george.save((err, cat) =>{
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log(`${cat} added to database`)
// 	}
// })

// Cat.create({
// 	name: 'Snow White',
// 	age: 15,
// 	temperament: 'Bland'
// },(err, cat) => {
// 	if(err){
// 		console.log(`Error occured\n${err}`)
// 	} else {
// 		console.log('Cat added')
// 	}
// })

Cat.find({}, (err, cats) => {
	if(err){
		console.log(`Error occured\n${err}`)
	} else {
		console.log(cats)
	}
})
