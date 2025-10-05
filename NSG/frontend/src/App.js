import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import VideoFeeds from './pages/VideoFeeds';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import FaceRecognition from './pages/FaceRecognition';
import FeatureExtraction from './pages/FeatureExtraction';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock login function - would connect to backend in production
  const handleLogin = (credentials) => {
    // In a real app, this would validate with the backend
    if (credentials.username && credentials.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {isAuthenticated && (
        <>
          <Navbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />
          <Sidebar open={sidebarOpen} />
        </>
      )}
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        mt: isAuthenticated ? 8 : 0,
        ml: isAuthenticated ? (sidebarOpen ? 30 : 7) : 0,
        transition: 'margin 0.2s ease-in-out'
      }}>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/video-feeds" element={
            <ProtectedRoute>
              <VideoFeeds />
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          
          <Route path="/alerts" element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="/face-recognition" element={
            <ProtectedRoute>
              <FaceRecognition />
            </ProtectedRoute>
          } />
          
          <Route path="/feature-extraction" element={
            <ProtectedRoute>
              <FeatureExtraction />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;