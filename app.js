const express = require('express');
const mongoose = require('mongoose');
const Blog  = require('./models/blog');

//to use req.body
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
app.set('view engine', 'ejs');


// app.listen(3000, ()=>{console.log('listening')});

//mongoDB
const p = 'eyfqGjHVu4vTeGgF';
const dbURI = 'mongodb+srv://ney927:'+p+'@cluster0.rxukwuu.mongodb.net/node-tut?retryWrites=true&w=majority'
//start listening to requests after connected to db
mongoose.connect(dbURI)
    .then(result => app.listen(3000, ()=>{console.log('listening\nconnected to db')}))
    .catch(err => console.log(err));

//use static files
app.use(express.static('public'));

//routes
app.get('/', async (req, res) => {
    allBlogs = await Blog.find({}).sort({$natural:-1});
    res.render('index', {title: 'HomePage', blogs: allBlogs});
 });
 
 app.get('/about', (req, res) => {
     res.render('about', {title: 'About'});
 });
 
 app.get('/blogs/create', (req, res) => {
     res.render('create', {title: 'Create Blog'});
 });
 
 app.get('/blogs/:id', (req, res) => {
     const id = req.params.id;
     Blog.findById(id)
         .then(result => {res.render('display', {title: result.title, blog: result})})
         .catch(err => {console.log(err)});
 });
 
 app.get('/blogs/delete/:id', (req, res) => {
     const id = req.params.id;
     let blog_title;
     Blog.findById(id)
         .then(result => {blog_title = result.title})
         .catch(err => {console.log(err)});
     Blog.findByIdAndDelete(id)
         .then(result => {res.render('delete', {title: 'Deleted Blog', blog_title: blog_title})})
         .catch(err => {console.log(err)});
 })

app.post('/add-blog', urlencodedParser, (req, res) => {
    console.log(req.body);
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });

    blog.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {console.log(err)})
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});