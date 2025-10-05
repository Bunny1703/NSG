import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Paper, LinearProgress } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FaceIcon from '@mui/icons-material/Face';
import SecurityIcon from '@mui/icons-material/Security';

const StatCard = ({ icon, title, value, color }) => (
  <Card sx={{ height: '100%', borderLeft: `4px solid ${color}` }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ 
          backgroundColor: `${color}22`, 
          borderRadius: '50%', 
          p: 1, 
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const SystemStatus = ({ title, value, color }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="body2" sx={{ color }}>{value}%</Typography>
    </Box>
    <LinearProgress 
      variant="determinate" 
      value={value} 
      sx={{ 
        height: 8, 
        borderRadius: 4,
        backgroundColor: 'background.paper',
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
        }
      }} 
    />
  </Box>
);

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<VideocamIcon sx={{ color: '#00BFFF' }} />} 
            title="Active Feeds" 
            value="24" 
            color="#00BFFF"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<NotificationsActiveIcon sx={{ color: '#FF5722' }} />} 
            title="Alerts Today" 
            value="12" 
            color="#FF5722"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<FaceIcon sx={{ color: '#4CAF50' }} />} 
            title="Watchlist Matches" 
            value="3" 
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<SecurityIcon sx={{ color: '#FFC107' }} />} 
            title="System Health" 
            value="98%" 
            color="#FFC107"
          />
        </Grid>
        
        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>System Status</Typography>
              <SystemStatus title="CPU Usage" value={45} color="#00BFFF" />
              <SystemStatus title="Memory Usage" value={62} color="#4CAF50" />
              <SystemStatus title="Storage" value={38} color="#FFC107" />
              <SystemStatus title="Network" value={78} color="#FF5722" />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Alerts */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Recent Alerts</Typography>
              {[
                { time: '10:45 AM', location: 'North Gate', type: 'Unauthorized Access', severity: 'High' },
                { time: '09:32 AM', location: 'East Wing', type: 'Suspicious Activity', severity: 'Medium' },
                { time: '08:17 AM', location: 'Parking Lot', type: 'Watchlist Match', severity: 'High' },
                { time: '07:55 AM', location: 'Main Entrance', type: 'Unattended Baggage', severity: 'Medium' },
              ].map((alert, index) => (
                <Paper 
                  key={index} 
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    backgroundColor: 'background.paper',
                    border: '1px solid #333'
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">{alert.type}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {alert.location} • {alert.time}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: alert.severity === 'High' ? '#FF5722' : '#FFC107',
                    color: '#fff',
                    px: 1,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    height: 'fit-content'
                  }}>
                    {alert.severity}
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;