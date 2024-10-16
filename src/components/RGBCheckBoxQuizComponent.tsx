import HelpIconWithDialog from '@/components/HelpIconWithDialog'
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const COLORS: Array<'red' | 'green' | 'blue'> = ['red', 'green', 'blue']
const COLOR_COMBINATIONS = ['yellow', 'magenta', 'cyan', 'white']

type CheckedColors = {
  red: boolean
  green: boolean
  blue: boolean
}

type RGBCheckBoxQuizComponentProps = {
  onCorrect: () => void
  fixedAnswer?: boolean
}

const RGBCheckBoxQuizComponent = ({ onCorrect, fixedAnswer }: RGBCheckBoxQuizComponentProps) => {
  const { t } = useTranslation()
  const [checkedColors, setCheckedColors] = useState<CheckedColors>({
    red: false,
    green: false,
    blue: false,
  })

  const [randomColor, setRandomColor] = useState('red')
  const [isLocked, setIsLocked] = useState(false)

  const [openResultDialog, setOpenResultDialog] = useState(false)

  useEffect(() => {
    if (fixedAnswer) {
      setRandomColor('white')
    } else {
      const randomIndex = Math.floor(Math.random() * COLOR_COMBINATIONS.length)
      setRandomColor(COLOR_COMBINATIONS[randomIndex])
    }
  }, [fixedAnswer])

  const handleCheckboxChange = (color: 'red' | 'green' | 'blue') => {
    setCheckedColors((prev) => ({
      ...prev,
      [color]: !prev[color],
    }))
  }

  const activeColor = useMemo(() => {
    const { red, green, blue } = checkedColors
    if (red && green && blue) return 'white'
    if (red && green) return 'yellow'
    if (red && blue) return 'magenta'
    if (green && blue) return 'cyan'
    if (red) return 'red'
    if (green) return 'green'
    if (blue) return 'blue'
    return 'black'
  }, [checkedColors])

  const handleSubmit = () => {
    setOpenResultDialog(true)
    if (activeColor === randomColor) {
      setIsLocked(true)
    }
  }

  const handleDialogClose = () => {
    setOpenResultDialog(false)
    if (activeColor === randomColor && onCorrect) {
      onCorrect()
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        borderRadius: 2,
        minWidth: { xs: '100%', sm: 400 },
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="caption" sx={{ marginBottom: 2 }}>
        {t('This is a sample for the checkboxes.')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <Typography variant="h6" sx={{ marginRight: 1 }}>
          {t('このアイコンを作ってみよう')}
        </Typography>
        <HelpIconWithDialog message={t('チェックボックスの色を組み合わせて、同じ色を作ってみましょう！')} />
      </Box>

      <Paper elevation={3} sx={{ display: 'inline-block', padding: 2, borderRadius: '50%', marginBottom: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BrightnessHighIcon sx={{ fontSize: 100, color: randomColor }} />
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
        {COLORS.map((color) => (
          <Checkbox
            key={color}
            size="large"
            sx={{ color: color, '&.Mui-checked': { color: color } }}
            checked={checkedColors[color]}
            onChange={() => handleCheckboxChange(color)}
            disabled={isLocked}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <BrightnessHighIcon sx={{ fontSize: 80, color: activeColor }} />
      </Box>

      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
        disabled={isLocked}
        sx={{ width: '100%' }}
      >
        {t('回答する')}
      </Button>

      <Dialog
        open={openResultDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>{t('結果')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {activeColor === randomColor
              ? <>
                  {t('正解です！あなたは光の三原色を完全に理解しています。')}<br />
                  {t('次の問題に進みましょう……')}
                </>
              : t('残念、不正解です……！')}
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default RGBCheckBoxQuizComponent
