import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTheme } from '@mui/material/styles'

interface LoginSuccessButtonProps {
  disabled: boolean
}

const LoginSuccessButton = ({ disabled }: LoginSuccessButtonProps) => {
  const theme = useTheme()

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={disabled}
      sx={{
        borderRadius: '50%',
        width: 56,
        height: 56,
        minWidth: 0,
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
        '&:hover': {
          backgroundColor: theme.palette.success.dark,
        },
      }}
    >
      <CheckCircleIcon color="inherit" />
    </Button>
  )
}

export default LoginSuccessButton
