import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useAuthRedirect() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const userParam = queryParams.get('user')

    if (!userParam) {
      // `user` パラメータがなければ `/login` へリダイレクト
      navigate('/login')
    } else {
      setUser(userParam)
    }
  }, [location, navigate])

  return user
}
