import server from '@/api/index'

export const postApi = {
  getPost: async() => {
    const data = await server.get('/posts')
    return data.data
  }
}