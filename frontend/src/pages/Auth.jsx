import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <button onClick={handleLoginClick} className="mr-4">Login</button>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default Auth;
