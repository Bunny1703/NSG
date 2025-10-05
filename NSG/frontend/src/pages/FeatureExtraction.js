import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Paper,
  Tabs,
  Tab,
  Chip,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BackpackIcon from '@mui/icons-material/Backpack';

// Mock detection data
const mockDetections = [
  { 
    id: 1, 
    type: 'Object', 
    objects: ['Person (5)', 'Vehicle (2)', 'Baggage (3)'],
    source: 'CCTV 1', 
    location: 'Main Entrance', 
    timestamp: '2023-06-15 14:32:17',
    confidence: 92,
    severity: 'low'
  },
  { 
    id: 2, 
    type: 'Activity', 
    activity: 'Loitering',
    source: 'Drone 2', 
    location: 'Perimeter East', 
    timestamp: '2023-06-15 14:28:05',
    confidence: 87,
    severity: 'medium'
  },
  { 
    id: 3, 
    type: 'Object', 
    objects: ['Person (2)', 'Weapon (1)'],
    source: 'CCTV 4', 
    location: 'Security Checkpoint', 
    timestamp: '2023-06-15 14:15:42',
    confidence: 95,
    severity: 'high'
  },
  { 
    id: 4, 
    type: 'Activity', 
    activity: 'Running',
    source: 'Body Cam 1', 
    location: 'Corridor B', 
    timestamp: '2023-06-15 14:10:33',
    confidence: 82,
    severity: 'low'
  },
  { 
    id: 5, 
    type: 'Object', 
    objects: ['Person (12)', 'Baggage (8)'],
    source: 'CCTV 7', 
    location: 'Lobby', 
    timestamp: '2023-06-15 14:05:19',
    confidence: 90,
    severity: 'low'
  },
  { 
    id: 6, 
    type: 'Activity', 
    activity: 'Crowd Formation',
    source: 'Drone 1', 
    location: 'Parking Area', 
    timestamp: '2023-06-15 13:58:27',
    confidence: 88,
    severity: 'medium'
  },
  { 
    id: 7, 
    type: 'Object', 
    objects: ['Person (1)', 'Suspicious Package (1)'],
    source: 'CCTV 3', 
    location: 'Waiting Area', 
    timestamp: '2023-06-15 13:45:11',
    confidence: 91,
    severity: 'high'
  },
];

// Mock pattern analysis data
const mockPatterns = [
  { 
    id: 1, 
    pattern: 'Frequent Visitor',
    description: 'Same individual detected 5+ times in 24 hours',
    locations: ['Main Entrance', 'Lobby', 'Cafeteria'],
    lastDetected: '2023-06-15 12:45:23',
    confidence: 89
  },
  { 
    id: 2, 
    pattern: 'Unusual Hours',
    description: 'Activity detected outside normal operational hours',
    locations: ['Server Room', 'Admin Office'],
    lastDetected: '2023-06-15 03:22:17',
    confidence: 94
  },
  { 
    id: 3, 
    pattern: 'Restricted Access',
    description: 'Unauthorized personnel in restricted areas',
    locations: ['Security Zone B', 'Data Center'],
    lastDetected: '2023-06-14 22:15:05',
    confidence: 97
  },
  { 
    id: 4, 
    pattern: 'Crowd Density',
    description: 'Unusual gathering of people',
    locations: ['Main Hall', 'Entrance Plaza'],
    lastDetected: '2023-06-14 18:33:47',
    confidence: 85
  },
];

const FeatureExtraction = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'high': return <ErrorIcon sx={{ color: '#FF5722' }} />;
      case 'medium': return <WarningIcon sx={{ color: '#FFC107' }} />;
      case 'low': return <CheckCircleIcon sx={{ color: '#4CAF50' }} />;
      default: return <CheckCircleIcon sx={{ color: '#4CAF50' }} />;
    }
  };

  const getActivityIcon = (activity) => {
    switch(activity) {
      case 'Loitering': return <DirectionsWalkIcon />;
      case 'Running': return <DirectionsRunIcon />;
      case 'Crowd Formation': return <GroupIcon />;
      default: return <PersonIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        AI Feature Extraction
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
          <Tab label="Live Detections" />
          <Tab label="Pattern Analysis" />
          <Tab label="Object Recognition" />
          <Tab label="Activity Detection" />
        </Tabs>
      </Box>
      
      {/* Live Detections Tab */}
      {tabValue === 0 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Recent AI Detections</Typography>
            <Box>
              <Button 
                variant="outlined" 
                startIcon={<FilterAltIcon />}
                onClick={() => setFilterOpen(!filterOpen)}
                sx={{ mr: 2 }}
              >
                Filter
              </Button>
              <Button 
                variant="contained" 
                startIcon={<SettingsIcon />}
                sx={{ 
                  background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                  }
                }}
              >
                AI Settings
              </Button>
            </Box>
          </Box>
          
          {filterOpen && (
            <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Source"
                    select
                    fullWidth
                    size="small"
                    defaultValue="all"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="all">All Sources</option>
                    <option value="cctv">CCTV</option>
                    <option value="drone">Drone</option>
                    <option value="bodycam">Body Cam</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Detection Type"
                    select
                    fullWidth
                    size="small"
                    defaultValue="all"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="all">All Types</option>
                    <option value="object">Object</option>
                    <option value="activity">Activity</option>
                    <option value="face">Face</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Severity"
                    select
                    fullWidth
                    size="small"
                    defaultValue="all"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="all">All Severities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Time Range"
                    select
                    fullWidth
                    size="small"
                    defaultValue="1h"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="1h">Last Hour</option>
                    <option value="6h">Last 6 Hours</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" sx={{ mr: 1 }}>Reset</Button>
                    <Button variant="contained" color="primary">Apply Filters</Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}
          
          <Grid container spacing={3}>
            {mockDetections.map((detection) => (
              <Grid item xs={12} sm={6} md={4} key={detection.id}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: detection.severity === 'high' ? 'error.light' : 
                                detection.severity === 'medium' ? 'warning.light' : 'success.light',
                    borderLeft: '5px solid',
                    borderLeftColor: detection.severity === 'high' ? 'error.main' : 
                                    detection.severity === 'medium' ? 'warning.main' : 'success.main',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getSeverityIcon(detection.severity)}
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {detection.type} Detection
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <NotificationsIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  {detection.type === 'Object' ? (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Detected Objects:
                      </Typography>
                      <Box>
                        {detection.objects.map((obj, index) => (
                          <Chip 
                            key={index}
                            label={obj} 
                            size="small"
                            sx={{ 
                              m: 0.5, 
                              bgcolor: obj.includes('Weapon') || obj.includes('Suspicious') ? 'error.light' : 'primary.light',
                              color: obj.includes('Weapon') || obj.includes('Suspicious') ? 'error.dark' : 'primary.dark',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2 }}>
                        {getActivityIcon(detection.activity)}
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Activity Type:
                        </Typography>
                        <Typography variant="body1">
                          {detection.activity}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Source:</strong> {detection.source}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Location:</strong> {detection.location}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Time:</strong> {detection.timestamp}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Confidence:</strong> {detection.confidence}%
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      
      {/* Pattern Analysis Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>Behavioral Pattern Analysis</Typography>
            
            <Grid container spacing={3}>
              {mockPatterns.map((pattern) => (
                <Grid item xs={12} md={6} key={pattern.id}>
                  <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {pattern.pattern}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {pattern.description}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="body2" gutterBottom>
                      <strong>Locations:</strong> {pattern.locations.join(', ')}
                    </Typography>
                    
                    <Typography variant="body2" gutterBottom>
                      <strong>Last Detected:</strong> {pattern.lastDetected}
                    </Typography>
                    
                    <Typography variant="body2" gutterBottom>
                      <strong>Confidence:</strong> {pattern.confidence}%
                    </Typography>
                    
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ mr: 1 }}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="contained" 
                        size="small"
                        sx={{ 
                          background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                          }
                        }}
                      >
                        Create Alert Rule
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* Object Recognition Tab */}
      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>Object Recognition Configuration</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Enabled Object Classes</Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Person" 
                        secondary="Detect and count individuals" 
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <AirportShuttleIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Vehicle" 
                        secondary="Cars, trucks, motorcycles, etc." 
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <BackpackIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Baggage" 
                        secondary="Bags, backpacks, luggage, etc." 
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Weapon" 
                        secondary="Firearms, knives, etc." 
                        primaryTypographyProps={{ color: 'error.main' }}
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <LocalParkingIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Suspicious Package" 
                        secondary="Unattended or unusual items" 
                        primaryTypographyProps={{ color: 'warning.main' }}
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                  </List>
                  
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                    >
                      Add Custom Object Class
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Detection Settings</Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" gutterBottom>Confidence Threshold</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 2 }}>
                        <input
                          type="range"
                          min="50"
                          max="99"
                          defaultValue="80"
                          style={{ width: '100%' }}
                        />
                      </Box>
                      <Typography variant="body2">80%</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" gutterBottom>Detection Frequency</Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      defaultValue="realtime"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="realtime">Real-time (every frame)</option>
                      <option value="high">High (every 5 frames)</option>
                      <option value="medium">Medium (every 10 frames)</option>
                      <option value="low">Low (every 30 frames)</option>
                    </TextField>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" gutterBottom>Object Tracking</Typography>
                    <FormControlLabel 
                      control={<Switch defaultChecked />} 
                      label="Enable object tracking across frames" 
                    />
                  </Box>
                </Paper>
                
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Alert Rules</Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Weapon Detection" 
                        secondary="Immediate high priority alert" 
                        primaryTypographyProps={{ color: 'error.main' }}
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="Suspicious Package" 
                        secondary="Medium priority alert if unattended > 5 min" 
                        primaryTypographyProps={{ color: 'warning.main' }}
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="Crowd Density" 
                        secondary="Alert when > 10 people in restricted area" 
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                      }
                    }}
                  >
                    Save Object Recognition Settings
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* Activity Detection Tab */}
      {tabValue === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>Activity Detection Configuration</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Enabled Activities</Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsWalkIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Loitering" 
                        secondary="Person staying in one area for extended period" 
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsRunIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Running" 
                        secondary="Fast movement in restricted areas" 
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <GroupIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Crowd Formation" 
                        secondary="Unusual gathering of people" 
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Fighting" 
                        secondary="Aggressive physical interaction" 
                        primaryTypographyProps={{ color: 'error.main' }}
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <BackpackIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Object Abandonment" 
                        secondary="Items left unattended" 
                        primaryTypographyProps={{ color: 'warning.main' }}
                      />
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Activity Detection Settings</Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" gutterBottom>Sensitivity</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 2 }}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="7"
                          style={{ width: '100%' }}
                        />
                      </Box>
                      <Typography variant="body2">7</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" gutterBottom>Loitering Time Threshold</Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      defaultValue="5"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="2">2 minutes</option>
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                    </TextField>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" gutterBottom>Crowd Size Threshold</Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      defaultValue="10"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="5">5 people</option>
                      <option value="10">10 people</option>
                      <option value="15">15 people</option>
                      <option value="20">20 people</option>
                    </TextField>
                  </Box>
                </Paper>
                
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Zone Configuration</Typography>
                  
                  <Typography variant="body2" gutterBottom>
                    Define specific zones for activity monitoring:
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Restricted Zones" 
                        secondary="High security areas with limited access" 
                        primaryTypographyProps={{ color: 'error.main' }}
                      />
                      <Button size="small" variant="outlined">Configure</Button>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="Monitoring Zones" 
                        secondary="General surveillance areas" 
                      />
                      <Button size="small" variant="outlined">Configure</Button>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="Entry/Exit Points" 
                        secondary="Access points requiring special monitoring" 
                      />
                      <Button size="small" variant="outlined">Configure</Button>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                      }
                    }}
                  >
                    Save Activity Detection Settings
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FeatureExtraction;