import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layout'
import { CharacterDetails } from './pages/character-details'
import { Home } from './pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/details',
        element: <CharacterDetails />,
      },
    ],
  },
])
