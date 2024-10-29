import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  const params = useParams()

  useEffect(() => {
    window.scrollTo(0, 0) // Move o scroll para o topo
  }, [pathname, params])

  return null // Esse componente não renderiza nada visível
}

export default ScrollToTop
