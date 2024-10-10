import '@/App.css'
import LoginPage from '@/pages/LoginPage'
import MainMenuPage from '@/pages/MainMenuPage'
import TablePage from '@/pages/TablePage'
import VariousControlsPage from '@/pages/VariousControlsPage'

import NotFoundPage from '@/pages/NotFoundPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainMenuPage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/various-controls" element={<VariousControlsPage />} />
      {/* その他のパスは 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
