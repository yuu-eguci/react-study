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
      main: '#00BCD4',  // シアン
    },
    secondary: {
      main: '#009688',  // ティール
    },
    error: {
      main: '#E91E63',  // ピンクレッド
    },
    success: {
      main: '#8BC34A',  // ライトグリーン
      dark: '#689F38',  // グリーンのダークバージョン
    },
    background: {
      default: '#E0F7FA',  // 明るいシアン背景
      paper: '#B2EBF2',  // 淡いシアン
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
