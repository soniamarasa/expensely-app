import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { ThemeStorage } from './contexts/ThemeContext';
import { ExpenseStorage } from './contexts/ExpenseContext';
import { ToastContextProvider } from './contexts/ToastContext';
import { WorkspaceStorage } from './contexts/WorkspaceContext';
import { TagStorage } from './contexts/TagContext';
import { AuthProvider } from './contexts/AuthContext';   
import { Container } from './pages/container/Container';

import 'primereact/resources/themes/arya-green/theme.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>  
          <ThemeStorage>
            <WorkspaceStorage>
              <ExpenseStorage>
                <TagStorage>
                  <ToastContextProvider>
                    <Container />
                  </ToastContextProvider>
                </TagStorage>
              </ExpenseStorage>
            </WorkspaceStorage>
          </ThemeStorage>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
