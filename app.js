const express = require('express');

const app = express();
app.set('view engine', 'ejs');

app.listen(3000, ()=>{console.log('listening')});

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.get('/', (req, res) => {
    const fillerBlogs = [
        {title: 'Blog 1', snippet: '1live love laugh the day until it fades into the endless dark that is life #lol'},
        {title: 'Blog 2', snippet: '2live love laugh the day until it fades into the endless dark that is life #lol'},
        {title: 'Blog 3', snippet: '3live love laugh the day until it fades into the endless dark that is life #lol'},
    ];

    res.render('index', {title: 'HomePage', blogs: fillerBlogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create Blog'});
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});