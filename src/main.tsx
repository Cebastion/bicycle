import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './pages/SignUp.tsx'
import Dashboard from './pages/Dasboard.tsx'
import Shop from './pages/Shop.tsx'
import Withdraw from './pages/Withdraw.tsx'
import Buy from './pages/Buy.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/shop',
    element: <Shop />
  },
  {
    path: '/withdraw',
    element: <Withdraw />
  },
  {
    path: '/buy/:id',
    element: <Buy />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
