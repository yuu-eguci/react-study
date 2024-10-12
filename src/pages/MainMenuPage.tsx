import CustomImageButton from '@/components/CustomImageButton'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'

// アイコンのインポート
import LogoutIcon from '@mui/icons-material/Logout'
import TableChartIcon from '@mui/icons-material/TableChart'
import ToysIcon from '@mui/icons-material/Toys'

// 画像のインポート（@/assets/images の中にある画像を使う場合）
import cityImg from '@/assets/images/bg_city.jpg'
import seasideImg from '@/assets/images/bg_seaside.jpg'
import wavingImg from '@/assets/images/bg_waving.jpg'

function MainMenuPage() {
  const user = useAuthRedirect()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const images = [
    {
      url: cityImg,
      title: 'メインの入力ページ',
      width: '100%',
      link: `/table?user=${encodeURIComponent(user || '')}`,
      icon: <TableChartIcon />,
    },
    {
      url: seasideImg,
      title: 'いろいろなコントロール',
      width: '100%',
      link: `/various-controls?user=${encodeURIComponent(user || '')}`,
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

  return (
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

      {/* ローディング */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}

export default MainMenuPage
