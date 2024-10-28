import LanguageSwitcher from '@/components/LanguageSwitcher'
import RGBCheckBoxQuizComponent from '@/components/RGBCheckBoxQuizComponent'
import RGBRadioGroupQuizComponent from '@/components/RGBRadioGroupQuizComponent'
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

// "クイズの答えを固定してほしい" という無粋な要望に対応する定数。
const FIXED_ANSWER = true

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
        {showFirstQuiz && <RGBCheckBoxQuizComponent onCorrect={handleQuizCorrect} fixedAnswer={FIXED_ANSWER} />}
        {/* 2問目 */}
        {!showFirstQuiz && <RGBRadioGroupQuizComponent fixedAnswer={FIXED_ANSWER} />}
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

export default VariousControlsPage
