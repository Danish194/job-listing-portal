import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmployerDashboard from './pages/EmployerDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import JobDetails from './pages/JobDetails';
import Header from './components/Header';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import default toastify styles

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
        limit={3} // Limits number of toasts displayed at once
      />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
