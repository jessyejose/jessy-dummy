import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.userDetails.status === 0) {
          navigate('/admin');
        } else if (data.userDetails.status === 1) {	
		  localStorage.setItem('userDetails', JSON.stringify(data.userDetails));		
          navigate('/user');
        }
      } else {
        if (response.status === 404) {
          setErrorMessage('Not a valid user, Please Signup');
        } else {
          setErrorMessage('Login failed');
        }
      }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
		<div style={{ width: '300px', padding: '20px', border: '1px solid #880085', borderRadius: '5px' }}>
			<h2>Sign In</h2>
			<label htmlFor="email">Email address</label>
			<input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}/>
			<br />
			<label htmlFor="password">Password</label>
			<input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}/>
			<br />
			{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
			<button type="button" style={{ backgroundColor: '#880085', color: 'white', width: '30%', padding: '10px', border: 'none', borderRadius: '5px', marginLeft: '100px' }} onClick={handleLogin}>Sign In</button>
			<p style={{ marginTop: '10px' }}>
			Don't have an Account? <Link to="/register"><span style={{ color: '#880085' }}>Sign Up</span></Link>
			</p>
		</div>
	</div>

  );
}

export default Login;
