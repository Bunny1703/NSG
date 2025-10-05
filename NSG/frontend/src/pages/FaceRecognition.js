import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  TextField,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FaceIcon from '@mui/icons-material/Face';
import UploadIcon from '@mui/icons-material/Upload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

// Mock watchlist data
const mockWatchlist = [
  { id: 1, name: 'Subject A', status: 'High Alert', lastSeen: '10 minutes ago', location: 'North Gate', confidence: 98 },
  { id: 2, name: 'Subject B', status: 'Medium Alert', lastSeen: '2 hours ago', location: 'East Wing', confidence: 87 },
  { id: 3, name: 'Subject C', status: 'Low Alert', lastSeen: '1 day ago', location: 'Parking Lot', confidence: 76 },
  { id: 4, name: 'Subject D', status: 'High Alert', lastSeen: 'Never', location: 'N/A', confidence: 0 },
  { id: 5, name: 'Subject E', status: 'Medium Alert', lastSeen: 'Never', location: 'N/A', confidence: 0 },
];

// Mock detection history
const mockDetections = [
  { id: 1, subject: 'Subject A', timestamp: '2023-06-15 10:45:23', location: 'North Gate', source: 'CCTV 1', confidence: 98 },
  { id: 2, subject: 'Subject B', timestamp: '2023-06-15 09:32:17', location: 'East Wing', source: 'Drone 2', confidence: 87 },
  { id: 3, subject: 'Subject A', timestamp: '2023-06-14 18:22:05', location: 'Main Entrance', source: 'CCTV 4', confidence: 92 },
  { id: 4, subject: 'Subject C', timestamp: '2023-06-14 15:11:47', location: 'Parking Lot', source: 'Body Cam 1', confidence: 76 },
  { id: 5, subject: 'Subject B', timestamp: '2023-06-13 12:05:33', location: 'Cafeteria', source: 'CCTV 7', confidence: 81 },
];

const FaceRecognition = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'High Alert': return '#FF5722';
      case 'Medium Alert': return '#FFC107';
      case 'Low Alert': return '#4CAF50';
      default: return '#757575';
    }
  };

  const filteredWatchlist = mockWatchlist.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Face Recognition & Watchlist
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
          <Tab label="Watchlist" />
          <Tab label="Detection History" />
          <Tab label="AI Settings" />
        </Tabs>
      </Box>
      
      {/* Watchlist Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Watchlist Subjects</Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    sx={{ 
                      background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                      }
                    }}
                  >
                    Add Subject
                  </Button>
                </Box>
                
                <TextField
                  placeholder="Search watchlist..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                  }}
                />
                
                <List sx={{ bgcolor: 'background.paper' }}>
                  {filteredWatchlist.map((person, index) => (
                    <React.Fragment key={person.id}>
                      <ListItem
                        secondaryAction={
                          <Box>
                            <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: getStatusColor(person.status) }}>
                            <FaceIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                                {person.name}
                              </Typography>
                              <Chip 
                                label={person.status} 
                                size="small"
                                sx={{ 
                                  backgroundColor: `${getStatusColor(person.status)}22`,
                                  color: getStatusColor(person.status),
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" component="span">
                                {person.lastSeen === 'Never' ? 'Not detected yet' : `Last seen: ${person.lastSeen} at ${person.location}`}
                              </Typography>
                              {person.confidence > 0 && (
                                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                  • Confidence: {person.confidence}%
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < filteredWatchlist.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                  {filteredWatchlist.length === 0 && (
                    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <FaceIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        No subjects found matching your search
                      </Typography>
                    </Box>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>Add to Watchlist</Typography>
                
                <Box sx={{ 
                  border: '2px dashed #333', 
                  borderRadius: 2, 
                  p: 3, 
                  textAlign: 'center',
                  mb: 3
                }}>
                  <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="body1" gutterBottom>
                    Drag & drop image here
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    or
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component="label"
                    sx={{ mt: 1 }}
                  >
                    Browse Files
                    <input type="file" hidden />
                  </Button>
                </Box>
                
                <TextField
                  label="Subject Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  label="Alert Level"
                  variant="outlined"
                  fullWidth
                  select
                  size="small"
                  defaultValue="medium"
                  sx={{ mb: 2 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="high">High Alert</option>
                  <option value="medium">Medium Alert</option>
                  <option value="low">Low Alert</option>
                </TextField>
                
                <TextField
                  label="Notes"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  sx={{ mb: 3 }}
                />
                
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                    }
                  }}
                >
                  Add to Watchlist
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Recognition Status</Typography>
                
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircleIcon sx={{ color: '#4CAF50', mr: 1 }} />
                    <Typography variant="subtitle2">
                      Face Recognition Active
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    System is actively monitoring all video feeds
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <WarningIcon sx={{ color: '#FFC107', mr: 1 }} />
                    <Typography variant="subtitle2">
                      Processing Load: 68%
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    System resources are adequate for current operations
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Detection History Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>Recent Detections</Typography>
            
            <Grid container spacing={2}>
              {mockDetections.map((detection) => (
                <Grid item xs={12} sm={6} md={4} key={detection.id}>
                  <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <FaceIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">{detection.subject}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Confidence: {detection.confidence}%
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Typography variant="body2" gutterBottom>
                      <strong>Time:</strong> {detection.timestamp}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Location:</strong> {detection.location}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Source:</strong> {detection.source}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* AI Settings Tab */}
      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>AI Feature Extraction Settings</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Face Recognition</Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>Confidence Threshold</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 2 }}>
                        <input
                          type="range"
                          min="50"
                          max="99"
                          defaultValue="75"
                          style={{ width: '100%' }}
                        />
                      </Box>
                      <Typography variant="body2">75%</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>Detection Sensitivity</Typography>
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
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Object Detection</Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>Enabled Object Classes</Typography>
                    {['Person', 'Vehicle', 'Weapon', 'Baggage', 'Animal'].map((item) => (
                      <Chip 
                        key={item}
                        label={item} 
                        sx={{ m: 0.5 }}
                        color={item === 'Weapon' ? 'error' : 'primary'}
                      />
                    ))}
                  </Box>
                  
                  <Box>
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
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" gutterBottom>Activity Recognition</Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" gutterBottom>Suspicious Activities</Typography>
                      {[
                        'Loitering', 
                        'Running', 
                        'Fighting', 
                        'Crowd Formation', 
                        'Object Abandonment'
                      ].map((activity) => (
                        <Box key={activity} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <input type="checkbox" defaultChecked id={activity} />
                          <Typography variant="body2" component="label" htmlFor={activity} sx={{ ml: 1 }}>
                            {activity}
                          </Typography>
                        </Box>
                      ))}
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" gutterBottom>Alert Triggers</Typography>
                      {[
                        'Perimeter Breach', 
                        'Restricted Area Access', 
                        'Weapon Detection', 
                        'Suspicious Package', 
                        'Watchlist Match'
                      ].map((trigger) => (
                        <Box key={trigger} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <input type="checkbox" defaultChecked id={trigger} />
                          <Typography variant="body2" component="label" htmlFor={trigger} sx={{ ml: 1 }}>
                            {trigger}
                          </Typography>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
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
                    Save AI Settings
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

export default FaceRecognition;