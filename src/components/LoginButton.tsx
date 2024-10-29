import LoginIcon from '@mui/icons-material/Login'
import Button from '@mui/material/Button'

interface LoginButtonProps {
  onClick: () => void
  disabled: boolean
}

const LoginButton = ({ onClick, disabled }: LoginButtonProps) => {
  return (
    <Button
      // NOTE: Automate で id 指定で操作したい、という要望のため、 id を固定。
      id="LoginButton-button"
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
