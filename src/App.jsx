import { useState } from 'react';
import AppContext from './context/AppContext';
import AppRedux from './redux/AppRedux';

function App() {
  const [mode, setMode] = useState('context');

  const toggleMode = () => {
    setMode((prev) => (prev === 'context' ? 'redux' : 'context'));
  };

  return (
    <div className="app-container">
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            onChange={toggleMode}
            checked={mode === 'redux'}
          />
          {mode === 'redux' ? 'Redux Toolkit' : 'Context API'}
        </label>
      </div>

      {mode === 'context' ? <AppContext /> : <AppRedux />}
    </div>
  );
}

export default App;