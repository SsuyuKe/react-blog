import Layout from "@/components/Layout"
import { useState, useEffect } from "react"
import { userApi } from "@/api/module/user"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { message } from 'antd';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useLocalStorage('blog-token')
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    const { data, code } = await userApi.login()
    if (code === 200) {
      const { token } = data
      setToken(token)
      message.success('登入成功')
      navigate('/')
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [])
  return (
    <Layout>
      <form className="flex flex-col items-center my-[300px] w-[400px] mx-auto" onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <label className="w-[100px] block text-left mr-2" htmlFor="username">使用者名稱</label>
          <input
            type="text"
            id="username"
            className="px-2 py-1 w-56 rounded bg-gray-100 focus:outline-0"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="flex mb-4">
          <label className="w-[100px] block text-left mr-2" htmlFor="password">密碼</label>
          <input
            type="password"
            id="password"
            className="px-2 py-1 w-56 rounded bg-gray-100 focus:outline-0"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="px-5 py-1 bg-themeColor rounded-sm text-white disabled:bg-gray-200 disabled:text-gray-300 cursor-pointer" type="submit" disabled={!username || !password}>登入</button>
      </form>
    </Layout>
  )
}

export default Login