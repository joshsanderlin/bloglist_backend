const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

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

const listWithTies = [
  {
    id: '5a422aa71b54a676234d17f7',
    title: 'First Test Blog',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    id: '5a422aa71b54a676234d17a8',
    title: 'How to Suck',
    author: 'The Vagitarian',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    id: '5a422aa71b54a676234d17a8',
    title: 'I\'m a wuss',
    author: 'The Vagitarian',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Second Test Blog',
    author: 'Eric Butthole',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
  },
  {
    id: '5a422aa71b54a676234d17f9',
    title: 'Third Test Blog',
    author: 'Eric Butthole',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
  },
]

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])

    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)

    expect(result).toBe(11)
  })

})

describe('authorWithMostLikes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.authorWithMostLikes([])

    expect(result).toBe(undefined)
  })

  test('when list has only one blog equals the sole author', () => {
    const result = listHelper.authorWithMostLikes(listWithOneBlog)

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when list has multiple blogs equals the right author', () => {
    const result = listHelper.authorWithMostLikes(listWithThreeBlogs)

    expect(result).toEqual({
      author: 'Eric Butthole',
      likes: 6,
    })
  })

  test('ties resolve gracefully (however unfairly)', () => {
    const result = listHelper.authorWithMostLikes(listWithTies)

    expect(result).toEqual({
      author: 'The Vagitarian',
      likes: 8,
    })
  })
})

describe('authorWithMostBlogs', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.authorWithMostBlogs([])

    expect(result).toBe(undefined)
  })

  test('when list has only one blog equals the sole author', () => {
    const result = listHelper.authorWithMostBlogs(listWithOneBlog)

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('when list has multiple blogs equals the right author', () => {
    const result = listHelper.authorWithMostBlogs(listWithThreeBlogs)

    expect(result).toEqual({
      author: 'Eric Butthole',
      blogs: 2,
    })
  })

  test('ties resolve gracefully (however unfairly)', () => {
    const result = listHelper.authorWithMostBlogs(listWithTies)

    expect(result).toEqual({
      author: 'The Vagitarian',
      blogs: 2,
    })
  })
})
