// const data = {
//   id: 1,
//   title: '',
//   cover: '',
//   desc: '',
//   author: {
//     name: '',
//     image: ''
//   },
//   theme: '',
//   created_at: '',
//   action: {
//     like: 511,
//     comments: [
//       {
//         id: 1,
//         author: {
//           name: '',
//           image: ''
//         },
//         comment: '',
//         created_at: '',
//       }
//     ]
//   }
// }

const PostCard = ({ data, onClick }) => {
  const handleCopy = (id) => {
    console.log('copy', id);
  }
  return (
    <div className="w-[700px] border-b border-gray-200 border-solid pb-5 mb-5" onClick={() => onClick(data.id)}>
      <div className="mb-5 text-sm text-[rgba(0,0,0,0.5)]">
        <img className="w-6 h-6 inline-block mr-2 object-cover rounded-full" src={data.author.image} alt="image" />
        <span>{data?.theme}</span>
        <span>．</span>
        <span>{data.created_at}</span>
      </div>
      <div className="flex justify-between">
        <div className="w-[504px]">
          <h2 className="whitespace-nowrap text-ellipsis overflow-hidden text-xl font-bold mb-3">{data.title}</h2>
          <p className="whitespace-nowrap text-ellipsis overflow-hidden text-sm mb-3">
            {data.desc}
          </p>
          <div className="flex items-center text-[rgba(0,0,0,0.5)]">
            <div className="mr-3">
              <i className="fa-regular fa-heart mr-2"></i>
              <span>{data.action.likes}</span>
            </div>
            <div className="mr-3">
              <i className="fa-regular fa-comment mr-2"></i>
              <span>{data.action.comments.length}</span>
            </div>
            <div className="mr-3" onClick={() => handleCopy(data.id)}>
              <i className="fa-solid fa-link"></i>
            </div>
          </div>
        </div>
        <div className="w-20 h-20 rounded-xl overflow-hidden">
          <img
            className="w-full h-full"
            src={data.cover}
            alt="" />
        </div>
      </div>
    </div>
  )
}

export default PostCard