import { useState } from 'react'
import './App.css'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/ui/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Forget from './components/auth/Forget'
import JobPost from './components/jobs/JobPost'
import Job_pages from './components/shared/Job_page'
import ResetPassword from './components/auth/ResetPassword'
// import Profile from './components/auth/Profile'
import { Toaster } from 'react-hot-toast'
// import MyProfile from './components/user/MyProfile'
// import UpdateProfile from './components/user/updateProfile'
import Job_page from './components/shared/Job_page'
import JobPost from './components/jobs/JobPost'
import { Toaster } from 'react-hot-toast'
import CompanyList from './components/shared/CompanyList'
import JobList from './components/shared/JobList'
import ResumeTable from './components/shared/MyCompany3'


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
    element: <JobPost />,
  },
  {
    path: '/jobs',
    element: <Job_pages />

  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />
  }
  // {
  //   path: '/me',
  //   element: <MyProfile />
  // },
  // {
  //   path: 'update-profile',
  //   element: <UpdateProfile />
  // }
    element: <JobPost />
  },

  {
    path: '/jobs',
    element: <Job_page />,
  },

  {
    path: '/companylist',
    element: <CompanyList />,
  },

  {
    path: '/joblist',
    element: <JobList />,
  },

  {
    path: '/userdetails',
    element: <ResumeTable />,
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
