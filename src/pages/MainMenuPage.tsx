import CustomImageButton from '@/components/CustomImageButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// アイコンのインポート
import LogoutIcon from '@mui/icons-material/Logout'
import TableChartIcon from '@mui/icons-material/TableChart'
import ToysIcon from '@mui/icons-material/Toys'

// 画像のインポート（@/assets/images の中にある画像を使う場合）
import cityImg from '@/assets/images/bg_city.jpg'
import seasideImg from '@/assets/images/bg_seaside.jpg'
import wavingImg from '@/assets/images/bg_waving.jpg'

const images = [
  {
    url: cityImg,
    title: 'メインの入力ページ',
    width: '100%',
    link: '/table',
    icon: <TableChartIcon />,
  },
  {
    url: seasideImg,
    title: 'いろいろなコントロール',
    width: '100%',
    link: '/various-controls',
    icon: <ToysIcon />,
  },
  {
    url: wavingImg,
    title: 'ログアウト',
    width: '100%',
    link: '/login',
    icon: <LogoutIcon />,
  },
]

function MainMenuPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const userParam = queryParams.get('user')

    if (!userParam) {
      // `user` パラメータがなければ `/login` へリダイレクト
      navigate('/login')
    } else {
      setUser(userParam)
    }
  }, [location, navigate])

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: 3,
        }}
      >
        {user && (
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            ようこそ {user} さん
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            minWidth: 300,
            width: '100%',
            gap: 2,
          }}
        >
          {images.map((image) => (
            <CustomImageButton key={image.url} image={image} />
          ))}
        </Box>
      </Box>
    </div>
  )
}

export default MainMenuPage
