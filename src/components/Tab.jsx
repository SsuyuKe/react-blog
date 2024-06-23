import clsx from 'clsx';

const Tab = ({ tab, activeKey, className, onClick }) => {
  // tab => { key: string, label: string, image: string }
  const activeCls = 'bg-secondaryTabColor !text-white'
  return (
    <button className={clsx(className, (activeKey === tab.label) && activeCls, 'border border-secondaryTabColor border-solid rounded-2xl px-5 py-1 text-secondaryTabColor')} onClick={() => onClick(tab.label)}>
      {tab.label}
    </button>
  )
}

export default Tab