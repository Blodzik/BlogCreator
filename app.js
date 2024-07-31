const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app

const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://blodzik:blodzik123@cluster0.0cipgo7.mongodb.net/node-tuts';
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for requests 

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => console.log(err))
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log(err))
});

app.get('/single-blog', (req, res) => {
    Blog.findById('66a38476cca8f744fa0350be')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

//blog routes
app.use(blogRoutes);

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('about', { title: '404' });
});

//404 page

app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404');
}); 