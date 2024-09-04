import React, { useState } from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Footer from './Footer';

const LoginPage = ({setAuthenticated}) => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
        <Header />
        {showLoginForm ? <LoginForm toggleForm={toggleForm} setAuthenticated = {setAuthenticated}/> : <SignupForm toggleForm={toggleForm} />}
        <Footer />
    </div>
  );
};

export default LoginPage;
