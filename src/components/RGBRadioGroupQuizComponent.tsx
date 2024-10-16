import HelpIconWithDialog from '@/components/HelpIconWithDialog'
import OfficialIcon from '@/components/OfficialIcon'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const RGB_OPTIONS = [51, 102, 153, 204]

const RGBRadioGroupQuizComponent = () => {
  const { t } = useTranslation()
  const [rgbValues, setRgbValues] = useState({ red: 51, green: 102, blue: 153 })
  const [randomColor, setRandomColor] = useState('rgb(51,102,153)')
  const [isLocked, setIsLocked] = useState(false)

  const [openResultDialog, setOpenResultDialog] = useState(false)

  // ランダムカラーの生成
  useEffect(() => {
    const randomColor = `rgb(${RGB_OPTIONS[Math.floor(Math.random() * RGB_OPTIONS.length)]},${RGB_OPTIONS[Math.floor(Math.random() * RGB_OPTIONS.length)]},${RGB_OPTIONS[Math.floor(Math.random() * RGB_OPTIONS.length)]})`
    setRandomColor(randomColor)
  }, [])

  const handleRadioChange = (color: 'red' | 'green' | 'blue') => (event: React.ChangeEvent<HTMLInputElement>) => {
    setRgbValues((prev) => ({
      ...prev,
      [color]: Number(event.target.value),
    }))
  }

  const currentColor = `rgb(${rgbValues.red},${rgbValues.green},${rgbValues.blue})`

  const handleSubmit = () => {
    setOpenResultDialog(true)
  }

  const handleDialogClose = () => {
    setOpenResultDialog(false)
    if (currentColor === randomColor) {
      setIsLocked(true)
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
        {t('This is a sample for the radio group.')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <Typography variant="h6" sx={{ marginRight: 1 }}>
          {t('最終問題：このアイコンを作ってみよう')}
        </Typography>
        <HelpIconWithDialog
          message={
            <>
              {t('ええ、無茶ですとも。')}<br />
              {t('これは Automation プログラムによる回答を期待しているのです。がんばって正解してください。')}<br />
              {t('ただ……ええ、作ってる私自身がテストできないのでここに答えを書いときマス。')}<br />
              {t('今回の答えは')}: {randomColor}
            </>
          }
        />
      </Box>

      <Paper elevation={3} sx={{ display: 'inline-block', padding: 2, borderRadius: '50%', marginBottom: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <OfficialIcon width={100} height={100} fill={randomColor} />
        </Box>
      </Paper>

      <Box sx={{ marginBottom: 4 }}>
        <Typography>{t('RED')}</Typography>
        <RadioGroup
          row
          value={rgbValues.red}
          onChange={handleRadioChange('red')}
          sx={{ justifyContent: 'center' }}
        >
          {RGB_OPTIONS.map((value) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
          ))}
        </RadioGroup>

        <Typography>{t('GREEN')}</Typography>
        <RadioGroup
          row
          value={rgbValues.green}
          onChange={handleRadioChange('green')}
          sx={{ justifyContent: 'center' }}
        >
          {RGB_OPTIONS.map((value) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
          ))}
        </RadioGroup>

        <Typography>{t('BLUE')}</Typography>
        <RadioGroup
          row
          value={rgbValues.blue}
          onChange={handleRadioChange('blue')}
          sx={{ justifyContent: 'center' }}
        >
          {RGB_OPTIONS.map((value) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
          ))}
        </RadioGroup>
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <OfficialIcon width={100} height={100} fill={currentColor} />
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
            {currentColor === randomColor
              ? t('正解です！あなたは光の三原色の支配者です。')
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

export default RGBRadioGroupQuizComponent
