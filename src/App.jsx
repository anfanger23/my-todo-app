import { useState } from 'react';
import AppContext from './context/AppContext';
import AppRedux from './redux/AppRedux';
import './App.css';

function App() {
  const [mode, setMode] = useState('context');

  const toggleMode = () => {
    setMode((prev) => (prev === 'context' ? 'redux' : 'context'));
  };

  return (
    <div className="app-container">
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <span style={{ fontWeight: mode === 'context' ? 'bold' : 'normal' }}>Context API</span>

          <div
            onClick={toggleMode}
            style={{
              width: '50px',
              height: '26px',
              backgroundColor: mode === 'redux' ? '#4ade80' : '#ccc',
              borderRadius: '9999px',
              position: 'relative',
              transition: 'background-color 0.3s',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: mode === 'redux' ? '26px' : '3px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                transition: 'left 0.3s',
              }}
            />
          </div>

          <span style={{ fontWeight: mode === 'redux' ? 'bold' : 'normal' }}>Redux Toolkit</span>
        </label>
      </div>

      {mode === 'context' ? <AppContext /> : <AppRedux />}
    </div>
  );
}

export default App;