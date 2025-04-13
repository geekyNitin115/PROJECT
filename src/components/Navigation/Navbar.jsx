import React, { useState, useContext } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  Home as HomeIcon,
  AccountCircle,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Logout as LogoutIcon,
  VideoLibrary as VideoIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeContext } from '../../App';

const Navbar = ({ isAuthenticated, onLogout, onAuthAction, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
    setMobileOpen(false);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Courses', icon: <VideoIcon />, path: '/courses', requiresAuth: true },
  ];

  const navItems = [
    ...(isAuthenticated
      ? [
          { text: 'Courses', icon: <SchoolIcon />, path: '/courses' },
          { text: 'Logout', icon: <LogoutIcon />, onClick: onLogout },
        ]
      : [
          { text: 'Login', icon: <LoginIcon />, onClick: () => onAuthAction('login') },
          { text: 'Register', icon: <RegisterIcon />, onClick: () => onAuthAction('register') },
        ]),
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => {
              if (item.onClick) item.onClick();
              handleDrawerToggle();
            }}
            component={item.path ? RouterLink : 'button'}
            to={item.path}
            sx={{
              textAlign: 'left',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ display: 'flex' }}>
        <AppBar 
          position="sticky" 
          className={className}
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.primary',
            boxShadow: 1,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(to right, #1A2027, #0A1929)'
              : theme.palette.background.gradient,
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <SchoolIcon sx={{ display: { xs: 'none', sm: 'block' }, mr: 1, color: 'primary.main' }} />
            <Typography 
              variant="h6" 
              component={RouterLink}
              to="/"
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #fff, #ccc)'
                  : 'linear-gradient(45deg, #1A2027, #2C7EF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              EduPlatform
            </Typography>

            <IconButton
              sx={{ mr: 2 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  item.path ? (
                    <Button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      color="inherit"
                      startIcon={item.icon}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Button
                      key={item.text}
                      onClick={item.onClick}
                      color="inherit"
                      startIcon={item.icon}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  )
                ))}
              </Box>
            )}
          </Toolbar>

          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
          >
            {drawer}
          </Drawer>
        </AppBar>
      </Box>
    </Fade>
  );
};

export default Navbar; 