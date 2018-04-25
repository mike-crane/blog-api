const express = require('express');
const morgan = require('morgan');
const app = express();

const blogPostsRouter = require('./blogPostsRouter');

// log the http layer
app.use(morgan('common'));

// router instances
app.use('/blog-posts', blogPostsRouter);

// app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(3000, () => console.log('Blog app listening on port 3000!'));

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});