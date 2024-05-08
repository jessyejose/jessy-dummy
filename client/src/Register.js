import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
	if (!name || !email || !password) {
		console.error('All fields are required');
		return; 
	  }
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #880085', borderRadius: '5px' }}>
        <h1>Sign Up</h1>
        <label >Username</label>
        <input type="text"  name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} required/>
        <br />
        <label >Email address</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} required/>
        <br />
        <label >Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} required/>
        <br />
        <button type="button" onClick={handleRegister} style={{ backgroundColor: '#880085', color: 'white', width: '30%', padding: '10px', border: 'none', borderRadius: '5px', marginLeft: '100px' }}>Sign Up</button>
        <br />
        <p style={{ marginTop: '10px' }}>
          Already have an Account? <Link to="/"><span style={{ color: '#880085' }}>Sign In</span></Link>
        </p>
      </div>
    </div>
    </>
  );
}

export default Register;
