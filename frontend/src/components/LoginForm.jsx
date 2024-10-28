import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const recaptchaRef = React.createRef();
  const navigate = useNavigate();
  const key = import.meta.env.VITE_RECAPTCHA_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = recaptchaRef.current.getValue();
    recaptchaRef.current.reset();

    if (token) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch additional user data from your backend using the email
        const response = await axios.post('/api/auth/login', { email, password });
        const { token: jwtToken, user: userData } = response.data;

        // Store token and user information
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('userRole', userData.role); // Store user role

        // Clear form fields after successful login
        setEmail('');
        setPassword('');

        // Show success notification and redirect based on role
        toast.success('Login successful!', { position: "top-center" });
        if (userData.role === 'employer') {
          navigate('/employer-dashboard');
        } else if (userData.role === 'jobseeker') {
          navigate('/jobseeker-dashboard');
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            toast.error('User not found. Please check your email.', { position: "top-center" });
            break;
          case 'auth/wrong-password':
            toast.error('Incorrect password. Please try again.', { position: "top-center" });
            break;
          case 'auth/too-many-requests':
            toast.error('Too many failed attempts. Please try again later.', { position: "top-center" });
            break;
          default:
            toast.error('Login failed: ' + error.message, { position: "top-center" });
        }
      }
    } else {
      toast.error('Please complete the reCAPTCHA verification.', { position: "top-center" });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email to reset your password.', { position: "top-center" });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!', { position: "top-center" });
    } catch (error) {
      toast.error('Error sending password reset email: ' + error.message, { position: "top-center" });
    }
  };

  return (
    <div className="h-full mb-0 flex items-center justify-center bg-backgroundBlue pt-16 pb-48 w-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={key}
          className="mt-4"
        />

        <button type="submit" className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Login
        </button>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>

        {/* Section for register link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">Don't have an account?
            <Link to="/register" className="text-blue-600 hover:underline p-2">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
