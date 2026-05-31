import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--glass-bg-heavy)',
                backdropFilter: 'var(--glass-blur)',
                border: 'var(--glass-border-neon)',
                color: 'var(--color-text-primary)',
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '13px',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-luxury-glass)',
              },
              success: { iconTheme: { primary: 'var(--color-sys-success)', secondary: '#fff' } },
              error: { iconTheme: { primary: 'var(--color-sys-error)', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
