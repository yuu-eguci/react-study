import { Button, Box } from '@mui/material'
import i18n from '@/i18n'

const LanguageSwitcher = () => {
  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: 'flex',
        gap: 2,
        // 他の UI より前面に。
        zIndex: (theme) => theme.zIndex.tooltip + 1,
      }}
    >
      <Button variant="outlined" onClick={() => switchLanguage('ja')}>
        日本語
      </Button>
      <Button variant="outlined" onClick={() => switchLanguage('en')}>
        English
      </Button>
    </Box>
  )
}

export default LanguageSwitcher
