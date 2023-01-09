const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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
app.use(blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});