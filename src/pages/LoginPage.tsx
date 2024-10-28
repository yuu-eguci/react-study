import LoginButton from '@/components/LoginButton'
import LoginLoadingButton from '@/components/LoginLoadingButton'
import LoginSuccessButton from '@/components/LoginSuccessButton'
import {
  Box,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// 画像のインポート（@/assets/images の中にある画像を使う場合）
import birdImg from '@/assets/images/bg_bird.jpg'
import countrysideImg from '@/assets/images/bg_countryside.jpg'
import nightskyImg from '@/assets/images/bg_nightsky.jpg'
import treesImg from '@/assets/images/bg_trees.jpg'
import umbrellaImg from '@/assets/images/bg_umbrella.jpg'
import waterpaintingImg from '@/assets/images/bg_waterpainting.jpg'

// アイコンのインポート
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

function LoginPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [randomImage] = useState(() =>
    [umbrellaImg, waterpaintingImg, birdImg, countrysideImg, nightskyImg, treesImg][Math.floor(Math.random() * 6)]
  )

  const handleLogin = () => {
    if (!agreeToTerms) {
      alert(t('利用規約に同意してください'))
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setLoginSuccess(true)

      setTimeout(() => {
        navigate(`/?user=${encodeURIComponent(loginId)}`)
      }, 2000)
    }, 2000)
  }

  const isDisabled = !loginId || !password || !agreeToTerms || loading

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight: '80vh',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', sm: 600 },
          height: { xs: 150, sm: 200 },
          marginBottom: 2,
        }}
      >
        <Box
          component="img"
          src={randomImage}
          alt="background banner"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 2,
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            <Typography variant="h5" component="div">
              {t('サンプル WEB 発注システム')}
            </Typography>
            <Typography variant="caption">
              {t('Lovely Little Sample Web Page')}
            </Typography>
          </Box>
      </Box>

      <FormControl
        fullWidth
        sx={{
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
          width: 300,
        }}
      >
        <TextField
          label={t('ログイン ID')}
          variant="outlined"
          fullWidth
          value={loginId}
          onChange={(e) => {
            const value = e.target.value
            if (/^[a-zA-Z0-9]*$/.test(value)) {
              setLoginId(value)
            }
          }}
        />
        <TextField
          label={t('パスワード')}
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={password}
          onChange={(e) => {
            const value = e.target.value
            if (/^[a-zA-Z0-9]*$/.test(value)) {
              setPassword(value)
            }
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
          }
          label={t('利用規約に同意する')}
        />
        {loading ? (
          <LoginLoadingButton disabled={isDisabled} />
        ) : loginSuccess ? (
          <LoginSuccessButton disabled={isDisabled} />
        ) : (
          <LoginButton onClick={handleLogin} disabled={isDisabled} />
        )}
      </FormControl>

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

export default LoginPage
