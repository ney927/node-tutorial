const express = require('express');
const router = express.Router();
const Blog  = require('../models/blog');

//to use req.body
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', async (req, res) => {
    allBlogs = await Blog.find({}).sort({$natural:-1});
    res.render('index', {title: 'HomePage', blogs: allBlogs});
 });
 
 router.get('/about', (req, res) => {
     res.render('about', {title: 'About'});
 });
 
 router.get('/blogs/create', (req, res) => {
     res.render('create', {title: 'Create Blog'});
 });
 
 router.get('/blogs/:id', (req, res) => {
     const id = req.params.id;
     Blog.findById(id)
         .then(result => {res.render('display', {title: result.title, blog: result})})
         .catch(err => {console.log(err)});
 });
 
 router.get('/blogs/delete/:id', (req, res) => {
     const id = req.params.id;
     let blog_title;
     Blog.findById(id)
         .then(result => {blog_title = result.title})
         .catch(err => {console.log(err)});
     Blog.findByIdAndDelete(id)
         .then(result => {res.render('delete', {title: 'Deleted Blog', blog_title: blog_title})})
         .catch(err => {console.log(err)});
 });

 router.post('/add-blog', urlencodedParser, (req, res) => {
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

 module.exports = router;