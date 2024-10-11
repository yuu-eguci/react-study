import LoginIcon from '@mui/icons-material/Login'
import Button from '@mui/material/Button'

interface LoginButtonProps {
  onClick: () => void
  disabled: boolean
}

const LoginButton = ({ onClick, disabled }: LoginButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      sx={{
        borderRadius: '50%',
        width: 56,
        height: 56,
        minWidth: 0,
      }}
    >
      <LoginIcon />
    </Button>
  )
}

export default LoginButton
