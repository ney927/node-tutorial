const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestampls: true});

//first param is the singular version of collection name on mongoDB
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;