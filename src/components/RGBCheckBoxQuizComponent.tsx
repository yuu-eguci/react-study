import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Box, Button, Checkbox, Paper, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

const COLORS: Array<'red' | 'green' | 'blue'> = ['red', 'green', 'blue']
const COLOR_COMBINATIONS = ['yellow', 'magenta', 'cyan', 'white']

type CheckedColors = {
  red: boolean
  green: boolean
  blue: boolean
}

type RGBCheckBoxQuizComponentProps = {
  onCorrect: () => void
}

const RGBCheckBoxQuizComponent = ({ onCorrect }: RGBCheckBoxQuizComponentProps) => {
  const [checkedColors, setCheckedColors] = useState<CheckedColors>({
    red: false,
    green: false,
    blue: false,
  })

  const [randomColor, setRandomColor] = useState('red')
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * COLOR_COMBINATIONS.length)
    setRandomColor(COLOR_COMBINATIONS[randomIndex])
  }, [])

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
    if (activeColor === randomColor) {
      alert('正解です！あなたは光の三原色を完全に理解しています。')
      setIsLocked(true)
      // 親コンポーネントに正解を通知する
      if (onCorrect) {
        onCorrect()
      }
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
        This is a sample for the checkboxes.
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        このアイコンを作ってみよう
      </Typography>
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
        回答する
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: 2 }}>
        <HelpOutlineIcon
          color="secondary"
          onClick={() => {
            alert('チェックボックスの色を組み合わせて、同じ色を作ってみましょう！')
          }}
        />
      </Box>
    </Paper>
  )
}

export default RGBCheckBoxQuizComponent
