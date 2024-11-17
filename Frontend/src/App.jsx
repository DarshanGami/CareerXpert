import { useState } from 'react'
import './App.css'
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
import CompanyList from './components/shared/CompanyList'
import JobList from './components/shared/JobList'
import ResumeTable from './components/shared/MyCompany3'
import Profile_user from './components/shared/Profile_user'


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
  },
  // {
  //   path: '/me',
  //   element: <MyProfile />
  // },
  // {
  //   path: 'update-profile',
  //   element: <UpdateProfile />
  // }


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

  {
    path: '/profileuser',
    element: <Profile_user />
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
