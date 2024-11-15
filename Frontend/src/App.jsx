import { useState } from 'react'
import './App.css'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/ui/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Forget from './components/auth/Forget'
import JobPost from './components/jobs/JobPost'
import Job_page from './components/shared/Job_page'
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgotpassword',
    element: <Forget />,
  },
  {
    path: '/post-job',
    element: <JobPost />
  }

    path: '/Job',
    element: <Job_page />,
  },
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position='top-right' reverseOrder={false} />
    </>
  )
}

export default App
