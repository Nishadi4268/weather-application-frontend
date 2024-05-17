import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'weather' && password === '123') {
      navigate('/weather');
    } else {
      setErrorMessage('Invalid username or password. Please try again...');
      
    }
  };

  return (
    <div className='body1'>
      <h1 className='welcome-text'>Welcome to Weather App....</h1>
      <h2 className='text-description'>"Welcome to Weather App, your personalized weather companion! Stay ahead of the forecast with real-time updates and detailed weather information for your location. Plan your day with confidence, whether it's checking the temperature, wind speed, or precipitation. Login now to explore the world of weather at your fingertips!"</h2>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
