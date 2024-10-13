import RGBCheckBoxQuizComponent from '@/components/RGBCheckBoxQuizComponent'
import RGBSliderQuizComponent from '@/components/RGBSliderQuizComponent'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import {
  Button
} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function VariousControlsPage() {
  const { t } = useTranslation()
  const user = useAuthRedirect()
  const navigate = useNavigate()

  const [showFirstQuiz, setShowFirstQuiz] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleQuizCorrect = () => {
    setLoading(true)
    setTimeout(() => {
      setShowFirstQuiz(prev => !prev)
      setLoading(false)
    }, 2000);
  }

  return (
    <Box sx={{
      // レスポンシブ対応。
      width: { xs: '100%', sm: '1000px' },
      padding: 2,
    }}>
      {/* メインメニューに戻るボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => navigate(`/?user=${encodeURIComponent(user || '')}`)}
          sx={{ marginBottom: 2 }}
        >
          {t('戻る')}
        </Button>
      </Box>

      {/* 光の三原色のクイズ */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 1問目 */}
        {showFirstQuiz && <RGBCheckBoxQuizComponent onCorrect={handleQuizCorrect} />}
        {/* 2問目 */}
        {!showFirstQuiz && <RGBSliderQuizComponent />}
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

export default VariousControlsPage
