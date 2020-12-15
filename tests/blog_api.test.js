const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has an id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Testy McTester',
    url: 'www.nonsense.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('a valid blog without a like property defaults to 0 and can be added', async () => {
  const newBlog = {
    title: 'this blog will not have any likes passed in: NOLIKES',
    author: 'Testy McTester',
    url: 'www.nolikes.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  let blogsAtEnd = await helper.blogsInDb()
  /* Strip server provided dates/ids for test object matching */
  blogsAtEnd = blogsAtEnd.map(b => {
    delete b.id
    delete b.date
    return b
  })

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const expectedBlog = { ...newBlog }
  expectedBlog.likes = 0
  expect(blogsAtEnd).toContainEqual(expectedBlog)
})

test('a valid blog with a likes property can be added', async () => {
  const newBlog = {
    title: 'this blog DOES have likes passed in: YESLIKES',
    author: 'More Popular Tester',
    url: 'www.somanylikes.com',
    likes: 13
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  let blogsAtEnd = await helper.blogsInDb()
  /* Strip server provided dates/ids for test object matching */
  blogsAtEnd = blogsAtEnd.map(b => {
    delete b.id
    delete b.date
    return b
  })

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const expectedBlog = { ...newBlog }
  expect(blogsAtEnd).toContainEqual(expectedBlog)
})

test('a blog without a title is not accepted', async () => {
  const badBlog = {
    author: 'Does this work',
    url: 'www.hopefullynot.lol',
  }

  await api
    .post('/api/blogs')
    .send(badBlog)
    .expect(400)
})

test('a blog without a url is not accepted', async () => {
  const badBlog = {
    title: 'I don\'t feel like adding URLs tho',
    author: 'Does this work',
  }

  await api
    .post('/api/blogs')
    .send(badBlog)
    .expect(400)
})

test('a blog\'s likes can be updated', async () => {
  const blogs = await helper.blogsInDb()
  let blogToTest = blogs[0]

  await api
    .put(`/api/blogs/${blogToTest.id}/like`)
    .send()
    .expect(200)

  const resultBlog = await api
    .get(`/api/blogs/${blogToTest.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual({
    ...blogToTest,
    likes: blogToTest.likes + 1
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
