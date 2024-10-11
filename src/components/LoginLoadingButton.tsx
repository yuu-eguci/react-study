import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'

interface LoginLoadingButtonProps {
  disabled: boolean
}

const LoginLoadingButton = ({ disabled }: LoginLoadingButtonProps) => {
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
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      <CircularProgress size={24} sx={{ color: theme.palette.text.secondary }} />
    </Button>
  )
}

export default LoginLoadingButton
