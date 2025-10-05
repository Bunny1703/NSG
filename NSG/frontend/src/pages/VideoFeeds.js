import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import FlightIcon from '@mui/icons-material/Flight';
import PersonIcon from '@mui/icons-material/Person';
import FilterListIcon from '@mui/icons-material/FilterList';

// Mock video feed data
const mockVideoFeeds = {
  drones: [
    { id: 'd1', name: 'Drone 1 - North Perimeter', location: 'North Perimeter', status: 'active' },
    { id: 'd2', name: 'Drone 2 - East Wing', location: 'East Wing', status: 'active' },
    { id: 'd3', name: 'Drone 3 - South Gate', location: 'South Gate', status: 'inactive' },
    { id: 'd4', name: 'Drone 4 - West Boundary', location: 'West Boundary', status: 'active' },
  ],
  bodyCams: [
    { id: 'b1', name: 'Officer Singh - Main Gate', location: 'Main Gate', status: 'active' },
    { id: 'b2', name: 'Officer Kumar - Patrol', location: 'East Wing', status: 'active' },
    { id: 'b3', name: 'Officer Sharma - Checkpoint', location: 'Checkpoint Alpha', status: 'active' },
    { id: 'b4', name: 'Officer Patel - Rooftop', location: 'Rooftop', status: 'inactive' },
  ],
  cctv: [
    { id: 'c1', name: 'CCTV 1 - Main Entrance', location: 'Main Entrance', status: 'active' },
    { id: 'c2', name: 'CCTV 2 - Lobby', location: 'Lobby', status: 'active' },
    { id: 'c3', name: 'CCTV 3 - Parking', location: 'Parking Lot', status: 'active' },
    { id: 'c4', name: 'CCTV 4 - Rear Exit', location: 'Rear Exit', status: 'active' },
    { id: 'c5', name: 'CCTV 5 - Server Room', location: 'Server Room', status: 'active' },
    { id: 'c6', name: 'CCTV 6 - Armory', location: 'Armory', status: 'active' },
    { id: 'c7', name: 'CCTV 7 - Cafeteria', location: 'Cafeteria', status: 'inactive' },
    { id: 'c8', name: 'CCTV 8 - Training Area', location: 'Training Area', status: 'active' },
  ]
};

// Video feed component
const VideoFeed = ({ feed }) => {
  const getRandomColor = () => {
    const colors = ['#00BFFF', '#4CAF50', '#FFC107', '#FF5722'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Box 
        sx={{ 
          height: 180, 
          backgroundColor: '#1A1A1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {feed.status === 'active' ? (
          <Box 
            sx={{ 
              width: '100%', 
              height: '100%', 
              background: `linear-gradient(135deg, #121212 25%, #1E1E1E 25%, #1E1E1E 50%, #121212 50%, #121212 75%, #1E1E1E 75%, #1E1E1E 100%)`,
              backgroundSize: '20px 20px',
              animation: 'moveBackground 2s linear infinite',
              '@keyframes moveBackground': {
                '0%': { backgroundPosition: '0 0' },
                '100%': { backgroundPosition: '20px 20px' },
              },
            }}
          />
        ) : (
          <Typography variant="body1" color="text.secondary">Feed Offline</Typography>
        )}
        
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            backgroundColor: feed.status === 'active' ? '#4CAF50' : '#FF5722',
            width: 10,
            height: 10,
            borderRadius: '50%',
            boxShadow: feed.status === 'active' ? '0 0 8px #4CAF50' : 'none'
          }} 
        />
        
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            left: 10, 
            backgroundColor: 'rgba(0,0,0,0.7)',
            px: 1,
            borderRadius: 1
          }}
        >
          <Typography variant="caption" sx={{ color: '#fff' }}>
            {feed.location}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
          {feed.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Chip 
            label={feed.status === 'active' ? 'Live' : 'Offline'} 
            size="small"
            sx={{ 
              backgroundColor: feed.status === 'active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 87, 34, 0.1)',
              color: feed.status === 'active' ? '#4CAF50' : '#FF5722',
              borderRadius: 1
            }}
          />
          <Typography variant="caption" color="text.secondary">
            ID: {feed.id}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const VideoFeeds = () => {
  const [tabValue, setTabValue] = useState(0);
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getFeeds = () => {
    let feeds;
    switch(tabValue) {
      case 0: feeds = [...mockVideoFeeds.drones, ...mockVideoFeeds.bodyCams, ...mockVideoFeeds.cctv]; break;
      case 1: feeds = mockVideoFeeds.drones; break;
      case 2: feeds = mockVideoFeeds.bodyCams; break;
      case 3: feeds = mockVideoFeeds.cctv; break;
      default: feeds = [];
    }

    // Apply filters
    return feeds.filter(feed => {
      const matchesLocation = !locationFilter || feed.location === locationFilter;
      const matchesStatus = !statusFilter || feed.status === statusFilter;
      return matchesLocation && matchesStatus;
    });
  };

  const getLocations = () => {
    const allFeeds = [...mockVideoFeeds.drones, ...mockVideoFeeds.bodyCams, ...mockVideoFeeds.cctv];
    return [...new Set(allFeeds.map(feed => feed.location))];
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Video Feeds
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: 120,
            },
            '& .Mui-selected': {
              color: 'primary.main',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <Tab 
            icon={<VideocamIcon />} 
            label="All Feeds" 
            iconPosition="start"
          />
          <Tab 
            icon={<FlightIcon />} 
            label="Drones" 
            iconPosition="start"
          />
          <Tab 
            icon={<PersonIcon />} 
            label="Body Cams" 
            iconPosition="start"
          />
          <Tab 
            icon={<VideocamIcon />} 
            label="CCTV" 
            iconPosition="start"
          />
        </Tabs>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={locationFilter}
              label="Location"
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <MenuItem value="">All Locations</MenuItem>
              {getLocations().map(location => (
                <MenuItem key={location} value={location}>{location}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          onClick={() => {
            setLocationFilter('');
            setStatusFilter('');
          }}
        >
          Clear Filters
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {getFeeds().map((feed) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={feed.id}>
            <VideoFeed feed={feed} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoFeeds;