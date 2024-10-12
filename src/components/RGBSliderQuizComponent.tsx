import OfficialIcon from '@/components/OfficialIcon'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Box, Button, Paper, Slider, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const RGBSliderQuizComponent = () => {
  const [rgbValues, setRgbValues] = useState({ red: 0, green: 0, blue: 0 })
  const [randomColor, setRandomColor] = useState('rgb(0, 0, 0)')
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    setRandomColor(randomColor)
  }, [])

  const handleSliderChange = (color: 'red' | 'green' | 'blue') => (_: Event, newValue: number | number[]) => {
    setRgbValues((prev) => ({
      ...prev,
      [color]: newValue as number,
    }))
  }

  const currentColor = `rgb(${rgbValues.red}, ${rgbValues.green}, ${rgbValues.blue})`

  const handleSubmit = () => {
    if (currentColor === randomColor) {
      alert('正解です！あなたは光の三原色の支配者です。')
      setIsLocked(true)
    } else {
      alert('残念、不正解です……！')
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
        This is a sample for the sliders.
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        最終問題: このアイコンを作ってみよう
      </Typography>
      <Paper elevation={3} sx={{ display: 'inline-block', padding: 2, borderRadius: '50%', marginBottom: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <OfficialIcon width={100} height={100} fill={randomColor} />
        </Box>
      </Paper>

      <Box sx={{ marginBottom: 4 }}>
        <Typography>R: {rgbValues.red}</Typography>
        <Slider
          value={rgbValues.red}
          onChange={handleSliderChange('red')}
          min={0}
          max={255}
          disabled={isLocked}
        />
        <Typography>G: {rgbValues.green}</Typography>
        <Slider
          value={rgbValues.green}
          onChange={handleSliderChange('green')}
          min={0}
          max={255}
          disabled={isLocked}
        />
        <Typography>B: {rgbValues.blue}</Typography>
        <Slider
          value={rgbValues.blue}
          onChange={handleSliderChange('blue')}
          min={0}
          max={255}
          disabled={isLocked}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        {/* <BrightnessHighIcon sx={{ fontSize: 80, color: currentColor }} /> */}
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
        回答する
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: 2 }}>
        <HelpOutlineIcon
          color="secondary"
          onClick={() => {
            alert(
              'ええ、無茶ですとも。本問題は Automation による自動回答を期待しているのです。'
              + 'でも……ええ、作ってる私自身がテストできないのでここに答えを書いトキマス。'
              + `今回の答えは: ${randomColor}`
            )
          }}
        />
      </Box>
    </Paper>
  )
}

export default RGBSliderQuizComponent
