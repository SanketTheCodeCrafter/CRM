import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { LeadProvider } from './context/LeadContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <LeadProvider>
        {/* Render Dashboard Page */}
        <Dashboard />
        
        {/* React Hot Toast configurations */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#6366f1',
                secondary: '#ffffff',
              },
            },
            error: {
              style: {
                borderColor: '#fca5a5',
              },
            },
          }}
        />
      </LeadProvider>
    </ThemeProvider>
  );
}

export default App;
