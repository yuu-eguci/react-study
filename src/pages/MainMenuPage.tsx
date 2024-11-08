import CustomImageButton from '@/components/CustomImageButton'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// アイコンのインポート
import LogoutIcon from '@mui/icons-material/Logout'
import TableChartIcon from '@mui/icons-material/TableChart'
import ToysIcon from '@mui/icons-material/Toys'

// 画像のインポート（@/assets/images の中にある画像を使う場合）
import cityImg from '@/assets/images/bg_city.jpg'
import seasideImg from '@/assets/images/bg_seaside.jpg'
import wavingImg from '@/assets/images/bg_waving.jpg'

function MainMenuPage() {
  const { t } = useTranslation()
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
      title: t('発注入力'),
      width: '100%',
      link: `/table?user=${encodeURIComponent(user || '')}`,
      icon: <TableChartIcon />,
      // NOTE: Automate で id 指定で操作したい、という要望のため、 id を固定。
      buttonId: 'MainMenuPage-order-entry-button',
    },
    {
      url: seasideImg,
      title: t('いろいろなコントロール'),
      width: '100%',
      link: `/various-controls?user=${encodeURIComponent(user || '')}`,
      icon: <ToysIcon />,
      // NOTE: Automate で id 指定で操作したい、という要望のため、 id を固定。
      buttonId: 'MainMenuPage-various-control-button',
    },
    {
      url: wavingImg,
      title: t('ログアウト'),
      width: '100%',
      link: '/login',
      icon: <LogoutIcon />,
      // NOTE: Automate で id 指定で操作したい、という要望のため、 id を固定。
      buttonId: 'MainMenuPage-logout-button',
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: 3,
        minHeight: '80vh',
      }}
    >
      {user && (
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {t('ようこそ')} {t('{{name}} さん', {name: user})}
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

      {/* 言語スイッチ */}
      <LanguageSwitcher />
    </Box>
  )
}

export default MainMenuPage
