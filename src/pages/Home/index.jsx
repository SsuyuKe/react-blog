import Layout from '@/components/Layout'
import Tab from '@/components/Tab';
import IconButton from '@/components/IconButton';
import HotCard from '@/components/HotCard';
import PostCard from '@/components/PostCard'
import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { postApi } from '@/api/module/post';

const carouselImages = [
  'https://plus.unsplash.com/premium_photo-1718479227189-d5f36431b2a8?q=80&w=1537&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1718152220007-6fb2c02fec95?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1565006111656-06a8a9c8f53b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]
const tabData = [
  {
    key: 'recommend',
    label: '推薦'
  },
  {
    key: 'dessert',
    label: '甜點'
  },
  {
    key: 'coffee',
    label: '咖啡'
  },
]
const searchData = [
  {
    key: 'workshop',
    title: '甜點工作坊',
    image: 'https://images.unsplash.com/flagged/photo-1558013276-d925ddb73271?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfHhqUFI0aGxrQkdBfHxlbnwwfHx8fHw%3D'
  },
  {
    key: 'dinner',
    title: '下午茶',
    image: 'https://plus.unsplash.com/premium_photo-1689245691846-c152a885f5ad?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExMXx4alBSNGhsa0JHQXx8ZW58MHx8fHx8'
  }
]

const Home = () => {
  const [tabKey, setTabKey] = useState(tabData[0].label)
  const navigate = useNavigate()
  const [storedPosts, setStoredPosts] = useLocalStorage('posts')
  const [posts, setPosts] = useState(storedPosts || [])
  const [labelPosts, setLabelPosts] = useState(storedPosts || [])
  const changePage = (url) => {
    navigate(url)
  }
  const getPosts = async() => {
    const { code , data } = await postApi.getPost()
    if (code === 200) {
      setPosts(data)
      setStoredPosts(data)
      setLabelPosts(data)
    }
  }
  const changeLabel = (label) => {
    setTabKey(label)
    const filterPosts = storedPosts.filter(post => post.label.includes(label))
    if (label === '推薦') {
      setLabelPosts(storedPosts)
      return
    }
    setLabelPosts(filterPosts)
  }
  // const [collection, setCollection] = useLocalStorage('collection')
  const handleCollect = (id) => {
  }
  useEffect(() => {
    if (!storedPosts || !storedPosts.length) {
      getPosts()
    }
  }, [])
  return (
    <Layout>
      <Carousel autoplay>
        {carouselImages.map((image, idx) => (
          <div key={idx} className='h-96'>
            <img className='w-full h-96 object-cover' src={image} alt="image" />
          </div>
        ))}
      </Carousel>
      <h2 className='text-xl font-bold my-4'>超熱搜話題</h2>
      <div className='flex'>
        {searchData.map(data => <IconButton onClick={(key) => changePage(`/search?keyword=${key}`)} key={data.key} className='mr-3 last:mr-0' item={data} />)}
      </div>
      <h2 className='text-xl font-bold my-4'>本日熱門</h2>
      <div className='flex flex-wrap -mx-2'>
        {posts.map((post, idx) => {
          if (idx < 5) {
            return (
              <div key={post.id} className='w-1/5 px-2 mb-4 last:mb-0'>
          <HotCard onCollect={handleCollect} onPageClick={(id) => changePage(`/post/${id}`)} data={post} />
        </div>
            )
          }
        })}
      </div>
      <div className='mt-5 flex flex-col items-center'>
        <div className='w-[700px] mb-5'>
          {tabData.map(tab => <Tab key={tab.key} tab={tab} className='mr-3 last:mr-0' activeKey={tabKey} onClick={(label) => changeLabel(label)} />)}
        </div>
        {labelPosts.map(post => <PostCard key={post.id} data={post} />)}
      </div>
    </Layout>
  )
}

export default Home