import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ImageSearch from './pages/ImageSearch';
import TextSearch from './pages/TextSearch';
import About from './pages/About';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/image-search" element={<ImageSearch />} />
            <Route path="/text-search" element={<TextSearch />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
