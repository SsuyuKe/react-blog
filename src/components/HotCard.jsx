import { useState } from "react"

const HotCard = ({ data, onPageClick, onCollect }) => {
  const collection = JSON.parse(localStorage.getItem('collection')) || []
  const hasCollection = collection.some(card => card.id === data.id)
  const [isCollect, setIsCollect] = useState(hasCollection)
  const handleCollect = () => {
    setIsCollect(!isCollect)
    onCollect(data.id)
  }

  return (
    <div className='rounded-lg overflow-hidden border border-solid border-gray-200'>
      <div className='h-40 relative'>
        <img className='w-full h-full object-cover' src={data.cover} alt="image" />
        <div className='cursor-pointer' onClick={handleCollect}>
          {isCollect ? (
            <i className="text-2xl text-primaryTabColor fa-solid fa-heart mr-1 absolute top-2 right-2"></i>
          ): (
            <i className="text-2xl text-white fa-regular fa-heart mr-1 absolute top-2 right-2"></i>
          )}
        </div>
      </div>
      <div className='p-3' onClick={() => onPageClick(item.id)}>
        <div className='flex items-center text-sm mb-2'>
          <img className='w-6 h-6 rounded-full object-cover border border-gray-300 border-solid mr-2' src={data.author.image} alt="logo" />
          <span>{data.author.name}</span>
          <span>・</span>
          <span>{data.created_at}</span>
        </div>
        <p className='whitespace-nowrap text-ellipsis overflow-hidden'>{data.title}</p>
        <div className='mt-9 flex justify-between'>
          <p className='bg-cardTagColor px-2 rounded text-white'>{data.label}</p>
          <div className='mr-3 flex items-center text-md text-gray'>
            <i className="fa-regular fa-message mr-1"></i>
            <span className='text-base'>{data.action.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotCard