const _ = require('lodash/fp')

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return _.reduce(
    (acc, blog) => acc + blog.likes,
  )(0)(blogs)
}

const authorWithMostLikes = (blogs) => {
  return  _.flow(
    _.groupBy(blog => blog.author),
    _.toPairs,
    _.maxBy(([, theirBlogs]) => totalLikes(theirBlogs)),
    _.thru((result) => {
      if(!result) return result
      return {
        author: result[0],
        likes: totalLikes(result[1])
      }
    })
  )(blogs)
}

const authorWithMostBlogs = (blogs) => {
  return  _.flow(
    _.groupBy(blog => blog.author),
    _.toPairs,
    _.maxBy(([, theirBlogs]) => _.size(theirBlogs)),
    _.thru((result) => {
      if(!result) return result
      return {
        author: result[0],
        blogs: _.size(result[1])
      }
    })
  )(blogs)
}

module.exports = {
  dummy,
  totalLikes,
  authorWithMostLikes,
  authorWithMostBlogs
}
