import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in:", userCredential.user);
      alert("Login successful");
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      alert(error.message); // Show actual error
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.2)', backgroundColor: '#fff' }}>
      
      {/* ✅ Society Image */}
      <img
        src="/apartment.jpg"
        alt="Apartment Society"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />

      {/* ✅ Heading */}
      <h2 style={{ textAlign: 'center', marginTop: '15px', color: '#2c3e50' }}>
        Brindaban Garden Society
      </h2>

      {/* ✅ Login Form */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ width: '100%', padding: '10px', marginTop: '15px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#2980b9',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
