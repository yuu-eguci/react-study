import '@/App.css'
import LoginPage from '@/pages/LoginPage'
import MainMenuPage from '@/pages/MainMenuPage'
import NotFoundPage from '@/pages/NotFoundPage'
import TablePage from '@/pages/TablePage'
import VariousControlsPage from '@/pages/VariousControlsPage'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F4C632', // バナナイエロー
    },
    secondary: {
      main: '#91CCD7', // アクアマリン
    },
    error: {
      main: '#DC004E', // 既存のカラーを活かしたい場合
    },
    success: {
      main: '#4CAF50', // グリーン（成功時の色）
      dark: '#388E3C', // グリーンのダークバージョン（成功時のホバー色などに使用）
    },
    background: {
      default: '#FAEBD7', // クリーム色
      paper: '#91CCD7', // アクアマリン色をペーパー背景に
    },
    text: {
      primary: '#2C2C2C', // テキストカラーをダークグレー
      secondary: '#4A4A4A', // ライトグレーに変更して読みやすくしたよ！
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainMenuPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/various-controls" element={<VariousControlsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
