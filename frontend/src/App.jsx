import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobseekerDashboard from "./pages/JobseekerDashboard";
import JobDetails from "./pages/JobDetails";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeProvider";
import PrivateRoute from "./utils/PrivateRoute";
import JobPostingForm from './components/JobPostForm';
import JobApplicationForm from './components/JobApplicationForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';

const App = () => {
  return (
    <div>
      <ToastContainer
        className="toast-container"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />
      <ThemeProvider>
      <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/dashboard" element={<PrivateRoute component={EmployerDashboard} />} />
            <Route path="/jobseeker" element={<PrivateRoute component={JobseekerDashboard} />} />
            <Route path="/apply/:jobId" element={<JobApplicationForm />} />
            <Route path="/post-job" element={<JobPostingForm />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
