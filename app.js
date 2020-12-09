const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./contollers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const listHelper = require('./utils/list_helper')

/* Connect to MongoDB server */
const db_url =
  `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.y42xl.mongodb.net/${config.DB_COLLECTION}?retryWrites=true&w=majority`

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithThreeBlogs = [
      {
        id: '5a422aa71b54a676234d17f7',
        title: 'First Test Blog',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Second Test Blog',
        author: 'Eric Butthole',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
      },
      {
        id: '5a422aa71b54a676234d17f9',
        title: 'Third Test Blog',
        author: 'Eric Butthole',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
      }
    ]


    const result1 = listHelper.authorWithMostLikes(listWithOneBlog)
    const result3 = listHelper.authorWithMostLikes(listWithThreeBlogs)

    logger.info('Connection to MongoDB established!')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

/* Finish app configuration */
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

