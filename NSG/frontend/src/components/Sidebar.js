import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideocamIcon from '@mui/icons-material/Videocam';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import FaceIcon from '@mui/icons-material/Face';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Video Feeds', icon: <VideocamIcon />, path: '/video-feeds' },
  { text: 'Face Recognition', icon: <FaceIcon />, path: '/face-recognition' },
  { text: 'Feature Extraction', icon: <SearchIcon />, path: '/feature-extraction' },
  { text: 'Alerts', icon: <NotificationsActiveIcon />, path: '/alerts' },
  { text: 'Analytics', icon: <AssessmentIcon />, path: '/analytics' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 72,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.2s ease-in-out',
        },
      }}
    >
      <Box sx={{ height: 64 }} /> {/* Toolbar spacer */}
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&.Mui-selected': {
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: location.pathname === item.path ? 'primary.light' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                opacity: open ? 1 : 0,
                color: location.pathname === item.path ? 'primary.light' : 'inherit',
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;