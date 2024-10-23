import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <div>footer</div>
    </div>
  )
}
