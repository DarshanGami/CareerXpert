import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/ui/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Forget from './components/auth/Forget';
import JobPost from './components/jobs/JobPost';
import Job_pages from './components/shared/Job_page';
import ResetPassword from './components/auth/ResetPassword';
// import Profile from './components/auth/Profile';
import { Toaster } from 'react-hot-toast';
// import MyProfile from './components/user/MyProfile';
// import UpdateProfile from './components/user/updateProfile';
import CompanyList from './components/shared/CompanyList';
import JobList from './components/shared/JobList';
import ResumeTable from './components/shared/MyCompany3';
import Profile_user from './components/shared/Profile_user';
import EditCompanyForm from './components/shared/EditCompanyForm';
import Job_Apply from './components/shared/Job_Apply';
import JobDcard from './components/shared/JobDcard';
// import Home_jobs from './components/shared/Home_jobs';
import CompanyD from './components/shared/CompanyD';
import ApplyJobDcard from './components/shared/ApplyJobDcard';

function App() {
  const [companyData, setcompanyData] = useState({});

  console.log(companyData);

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home setcompanyData={setcompanyData}/>,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
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
      element: <Job_pages />,
    },
    {
      path: '/reset-password/:token',
      element: <ResetPassword />,
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
      element: <CompanyList setcompanyData={setcompanyData} />,
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
      element: <Profile_user />,
    },
    {
      path: '/editcompanyprofile',
      element: <EditCompanyForm companyData={companyData} />,
    },
    {
      path: '/jobapply',
      element: <Job_Apply/>,
    },
    {
      path: '/jobdcard',
      element: <JobDcard/>,
    },

    // {
    //   path : '/homejob',
    //        element  : <Home_jobs />
    // },
    
    {
           path : '/companydescription',
           element : <CompanyD />
    },
    {
      path : '/applyjobdcard',
      element : <ApplyJobDcard />
},

  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position='top-right' reverseOrder={false} />
    </>
  );
}

export default App;
