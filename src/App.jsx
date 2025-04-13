import { useState, useEffect, createContext, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Box, CssBaseline, ThemeProvider, Container, GlobalStyles } from '@mui/material'
import Navbar from './components/Navigation/Navbar'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Course from './pages/Course'
import LoginForm from './components/Auth/LoginForm'
import RegisterForm from './components/Auth/RegisterForm'
import './App.css'
import createTheme from './theme'

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body': {
    minHeight: '100vh',
    scrollBehavior: 'smooth',
  },
  body: {
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  '.page-transition-enter': {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  '.page-transition-enter-active': {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 300ms, transform 300ms',
  },
  '.page-transition-exit': {
    opacity: 1,
  },
  '.page-transition-exit-active': {
    opacity: 0,
    transition: 'opacity 300ms',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes slideIn': {
    from: {
      transform: 'translateX(-100%)',
    },
    to: {
      transform: 'translateX(0)',
    },
  },
  '.animate-fadeIn': {
    animation: 'fadeIn 0.5s ease-out forwards',
  },
  '.animate-slideIn': {
    animation: 'slideIn 0.3s ease-out forwards',
  },
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    navigate('/')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleAuthAction = (action) => {
    navigate(`/${action}`)
  }

  return (
    <Box className="page-container">
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onAuthAction={handleAuthAction}
      />
      <Container component="main" maxWidth={false} sx={{ 
        flex: 1, 
        py: 3,
        px: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courses"
              element={
                isAuthenticated ? (
                  <Courses />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/course/:courseId"
              element={
                isAuthenticated ? (
                  <Course />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <LoginForm onSuccess={handleAuthSuccess} />
                ) : (
                  <Navigate to="/courses" replace />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <RegisterForm onSuccess={handleAuthSuccess} />
                ) : (
                  <Navigate to="/courses" replace />
                )
              }
            />
          </Routes>
        </Box>
      </Container>
    </Box>
  )
}

function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Router>
          <div className="app-container">
            <AppContent />
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App 