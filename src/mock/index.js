import Mock from "mockjs";
import login from './data/login.json'
import posts from './data/posts.json'

Mock.mock('/mock/login', {
  code: 200,
  data: login
})

Mock.mock('/mock/posts', {
  code: 200,
  data: posts
})