import React, { useEffect, useState } from 'react';
import './App.css';
import BlocksList from './components/BlocksList';
import NoticeBoard from './components/NoticeBoard';
import SuggestionsBox from './components/SuggestionsBox';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("🚪 Logged out");
      })
      .catch((error) => {
        console.error("❌ Logout failed:", error.message);
      });
  };

  return (
    <div className="container">
      {!user ? (
        <Login />
      ) : (
        <>
          {/* ✅ Logout Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Welcome to Brindaban Garden Helper App</h1>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Logout
            </button>
          </div>

          {/* Main Content */}
          <NoticeBoard />
          <SuggestionsBox />
          <BlocksList />
        </>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
