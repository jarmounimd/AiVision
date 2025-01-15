import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../products/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Image Search', path: '/image-search', icon: <ImageSearchIcon /> },
    { label: 'Text Search', path: '/text-search', icon: <SearchIcon /> },
    { label: 'About', path: '/about', icon: <InfoIcon /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(26, 32, 48, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              color: '#fff',
              textDecoration: 'none',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '0.5px',
              position: 'relative',
              padding: '6px 10px',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05), rgba(100, 181, 246, 0.05))',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(100, 181, 246, 0.1))',
                transform: 'translateY(-1px)',
                '& .logo-icon': {
                  transform: 'scale(1.1) rotate(-5deg)',
                  boxShadow: '0 8px 16px rgba(33, 150, 243, 0.4)',
                  background: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
                },
                '& .ai-text': {
                  color: '#90caf9',
                  textShadow: '0 0 20px rgba(33, 150, 243, 0.6)',
                  transform: 'translateX(-1px)',
                },
                '& .vision-text': {
                  background: 'linear-gradient(90deg, #90caf9 0%, #42a5f5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(33, 150, 243, 0.4)',
                  transform: 'translateX(1px)',
                },
                '& .logo-glow': {
                  opacity: 1,
                  transform: 'scale(1.2)',
                },
              },
            }}
            onClick={() => navigate('/')}
          >
            <Box
              className="logo-glow"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at center, rgba(33, 150, 243, 0.15), transparent 70%)',
                borderRadius: '16px',
                opacity: 0,
                transition: 'all 0.3s ease',
                pointerEvents: 'none',
              }}
            />
            <Box
              className="logo-icon"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: '14px',
                padding: '6px',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                width: '42px',
                height: '42px',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                  borderRadius: '14px',
                },
              }}
            >
              <img 
                src={logo} 
                alt="AiVision Logo"
                style={{
                  width: '115%',
                  height: '115%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: 'scale(1.05)',
                  filter: 'brightness(1.1) contrast(1.1)',
                }}
              />
            </Box>
            <Box
              className="logo-text"
              sx={{
                fontWeight: 700,
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                position: 'relative',
              }}
            >
              <span 
                className="ai-text"
                style={{ 
                  color: '#2196f3',
                  textShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                }}
              >
                Ai
              </span>
              <span 
                className="vision-text"
                style={{ 
                  background: 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1px',
                }}
              >
                Visi
                <Box
                  className="search-icon-container"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    position: 'relative',
                    top: '1px',
                    '@keyframes fullRotation': {
                      '0%': {
                        transform: 'rotate(0deg)',
                      },
                      '100%': {
                        transform: 'rotate(360deg)',
                      }
                    },
                    '&:hover .search-icon': {
                      animation: 'fullRotation 0.8s ease-in-out',
                    }
                  }}
                >
                  <SearchIcon 
                    className="search-icon"
                    sx={{ 
                      fontSize: '22px',
                      background: 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)',
                      borderRadius: '50%',
                      padding: '2px',
                      color: '#fff',
                      transition: 'all 0.3s ease',
                    }} 
                  />
                </Box>
                n
              </span>
            </Box>
          </Typography>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    selected={location.pathname === item.path}
                    sx={{
                      color: location.pathname === item.path ? '#64b5f6' : 'inherit',
                      '& .MuiSvgIcon-root': {
                        color: location.pathname === item.path ? '#64b5f6' : 'inherit',
                      },
                    }}
                  >
                    {item.icon}
                    <Typography sx={{ ml: 1 }}>{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    startIcon={item.icon}
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: 'white',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: isActive ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                        transformOrigin: 'center',
                        width: '80%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #64b5f6 0%, #2196f3 100%)',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        '&::after': {
                          transform: 'translateX(-50%) scaleX(1)',
                        },
                      },
                      ...(isActive && {
                        color: '#64b5f6',
                        '& .MuiSvgIcon-root': {
                          color: '#64b5f6',
                        },
                      }),
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
