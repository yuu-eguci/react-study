import LoginButton from '@/components/LoginButton'
import LoginLoadingButton from '@/components/LoginLoadingButton'
import LoginSuccessButton from '@/components/LoginSuccessButton'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// アイコンのインポート
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

function LoginPage() {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const navigate = useNavigate()

  const handleLogin = () => {
    if (!agreeToTerms) {
      alert('利用規約に同意してください')
      return
    }

    setLoading(true)

    // ローディングのふりをして少しだけ待つよ
    setTimeout(() => {
      setLoading(false)
      setLoginSuccess(true)

      // ログイン成功アイコンを少し表示した後、ルートに遷移する
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }, 2000) // 2秒間ローディングのふりをする
  }

  const isDisabled = !loginId || !password || !agreeToTerms || loading

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
        padding: 3,
      }}
    >
      <TextField
        label="ログイン ID"
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
        label="パスワード"
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
        label="利用規約に同意する"
      />
      {loading ? (
        <LoginLoadingButton disabled={isDisabled} />
      ) : loginSuccess ? (
        <LoginSuccessButton disabled={isDisabled} />
      ) : (
        <LoginButton onClick={handleLogin} disabled={isDisabled} />
      )}

      {/* ローディング中はオーバーレイを表示 */}
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
