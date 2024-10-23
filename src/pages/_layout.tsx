import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div>
      <div>Header</div>
      <div>
        <Outlet />
      </div>
      <div>footer</div>
    </div>
  )
}
