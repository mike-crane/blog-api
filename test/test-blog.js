const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');
const should = chai.should();

chai.use(chaiHttp);


describe('BlogPosts', function () {

  before(function () {
    return runServer();
  });

  after(function () {
    return closeServer();
  });


  it('should list blog posts on GET', function () {

    return chai.request(app)
      .get('/blog-posts')
      .then(function (res) {

        res.should.have.status(300);
        res.should.be.json;

        res.body.should.be.a('array');
        res.body.should.have.length.of.at.least(1);
        res.body.forEach(function (item) {
          item.should.be.a('object');
          item.should.include.keys('id', 'title', 'content', 'author');
        });
      });
  });


  it('should add a blog post on POST', function () {
    const newBlog = {
      title: 'New post', content: 'lorem ispsum', author: 'Jane Doe'
    };
    return chai.request(app)
      .post('/blog-posts')
      .send(newBlog)
      .then(function (res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('id', 'title', 'content', 'author');
        res.body.title.should.equal(newBlog.title);
      });
  });


  it('should update blog posts on PUT', function () {

    const updateData = {
      title: 'foo',
      content: 'foo bar',
      author: 'bar foo'
    };

    return chai.request(app)

      .get('/blog-posts')
      .then(function (res) {
        updateData.id = res.body[0].id;

        return chai.request(app)
          .put(`/blog-posts/${updateData.id}`)
          .send(updateData);
      })

      .then(function (res) {
        res.should.have.status(204);
      });
  });


  it('should delete blog posts on DELETE', function () {

    return chai.request(app)
      .get('/blog-posts')
      .then(function (res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`)
      })
      .then(function (res) {
        res.should.have.status(204);
      });
  });
});