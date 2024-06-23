import Logo from '@/assets/images/logo.png'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const [token, setToken] = useLocalStorage('blog-token')
  const [language, setLanguage] = useLocalStorage('language')
  const [theme, setTheme] = useLocalStorage('theme')
  const changeTheme = (mode) => {
    document.body.className = mode
    setTheme(mode)
  }
  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
  }
  const languageList = {
    zh: 'zh_TW',
    en: 'en_US'
  }
  const changeLanguage = () => {
    if (language === languageList.zh) {
      setLanguage(languageList.en)
      i18n.changeLanguage(languageList.en)
      return
    }
    setLanguage(languageList.zh)
    i18n.changeLanguage(languageList.zh)
  }
  const logout = () => {
    setToken('')
  }
  return (
    <div>
      <div className='border-b border-gray-200 border-solid h-20 flex items-center'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <img onClick={() => changePage('/')} src={Logo} alt="logo" />
              <div className='bg-gray-100 rounded-lg overflow-hidden px-3 leading-10 h-10'>
                <i className="fa-solid fa-magnifying-glass text-gray-300 mr-2" />
                <input className='bg-gray-100 w-72 focus:outline-0' type="text" placeholder='全站搜尋' />
              </div>
            </div>
            <div className='flex items-center'>
              <button onClick={() => changePage('/create-post')} className='bg-themeColor px-2 py-1 mr-3 rounded text-white'>
                <i className="fa-solid fa-pen"></i>
                <span className='ml-2'>發表文章</span>
              </button>
              <ul className='flex items-center text-lg'>
                <li onClick={changeLanguage} className='mr-3 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded'>翻譯{language === languageList.zh ? 'En' : '繁中'}</li>
                <li className='mr-3 cursor-pointer'>
                  {theme === 'darkMode' ? (
                    <button className='px-2 py-1 rounded hover:bg-gray-200' onClick={() => changeTheme('')}>
                      <i class="fa-solid fa-moon"></i>
                    </button>
                  ) : (
                    <button className='px-2 py-1 rounded hover:bg-gray-200' onClick={() => changeTheme('darkMode')}>
                      <i className="fa-regular fa-moon"></i>
                    </button>
                  )}
                </li>
                <li className='cursor-pointer'>{token ? (
                  <button className='px-2 py-1 rounded hover:bg-gray-200' onClick={logout}>登出</button>
                  ) : (
                  <button className='px-2 py-1 rounded hover:bg-gray-200' onClick={() => changePage('/login')}>{t('login')}</button>
                )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto'>
        {children}
      </div>
      <div className='bg-gray-200 py-3'>
        <p className='text-center text-sm border-t border-gray-200 border-solid'>©2024 ssuyuke All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Layout