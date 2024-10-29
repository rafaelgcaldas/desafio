import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import ScrollToTop from '@/components/scrollToTop'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div>
      <Header />
      <div>
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
