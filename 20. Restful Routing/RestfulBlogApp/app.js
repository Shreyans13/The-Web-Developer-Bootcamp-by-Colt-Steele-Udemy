let express 	= require('express'),
	bodyParser 	= require('body-parser')
	mongoose 	= require('mongoose')
	app 		= express()
	methodOverride = require('method-override')
	expressSanitizer = require('express-sanitizer')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/restful_blog_app')

const PORT = 3000

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.static(__dirname))

app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSanitizer())
app.use(methodOverride('_method'))

let blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created : {type: Date, default: Date.now}
})

let Blog = mongoose.model("Blog", blogSchema)

// Blog.create({
	// 	title: 'Test Title',
	// 	image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
	// 	body: 'Loreum Ipsum Amity Dolar Loreum Ipsum Amity Dolar Loreum Ipsum Amity Dolar Loreum Ipsum Amity Dolar Loreum Ipsum Amity Dolar '
	// })

app.get('/', (req, res) => {
	res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
	Blog.find({}, (err, blogs) => {
		// console.log(blogs)
		if(err){
			console.log('error')
		} else {
			res.render('index', {blogs})
		}
	})
	// res.render('index')
})

app.get('/blogs/new', (req, res) => {
	res.render('new')
})

app.post('/blogs', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.create(req.body.blog, (err, newBlog) =>{
		if(err){
			res.render('new')
		} else {
			res.redirect('/blogs')
		}
	})
})

app.get('/blogs/:id', (req, res) => {
	Blog.findById(req.params.id, (err, foundData) => {
		if (err) {
			console.log(error)
		} else {
			res.render('show', {blog: foundData})
		}
	})
})

app.get('/blogs/:id/edit', (req, res) => {
	Blog.findById(req.params.id, (err, foundData) => {
		if (err) {
			console.log(error)
		} else {
			res.render('edit', {blog: foundData})
		}
	})
	// res.render('edit')
})

app.put('/blogs/:id', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if(err){
			console.log(err)
		} else {
			res.redirect('/blogs/' + req.params.id)
		}
	})
})

app.delete('/blogs/:id', (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect('/blogs')
		} else {
			res.redirect('/blogs')
		}
	})
})

app.listen(PORT, () => {
	console.log('Server is running at http://localhost:' + PORT)
})