import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

// Mock user data
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@nsg.gov.in', role: 'Administrator', status: 'Active', twoFactorEnabled: true },
  { id: 2, name: 'Security Officer', email: 'security@nsg.gov.in', role: 'Security Officer', status: 'Active', twoFactorEnabled: true },
  { id: 3, name: 'Analyst', email: 'analyst@nsg.gov.in', role: 'Analyst', status: 'Active', twoFactorEnabled: false },
  { id: 4, name: 'Field Agent', email: 'field@nsg.gov.in', role: 'Field Agent', status: 'Inactive', twoFactorEnabled: false },
];

// Mock roles data
const mockRoles = [
  { id: 1, name: 'Administrator', permissions: ['all'], userCount: 1 },
  { id: 2, name: 'Security Officer', permissions: ['view_feeds', 'manage_alerts', 'view_analytics'], userCount: 3 },
  { id: 3, name: 'Analyst', permissions: ['view_feeds', 'view_analytics'], userCount: 5 },
  { id: 4, name: 'Field Agent', permissions: ['view_feeds'], userCount: 10 },
];

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Settings
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
          <Tab icon={<PersonIcon />} label="User Management" iconPosition="start" />
          <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
          <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
          <Tab icon={<SettingsIcon />} label="System" iconPosition="start" />
        </Tabs>
      </Box>
      
      {/* User Management Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Users</Typography>
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
                    Add User
                  </Button>
                </Box>
                
                <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>2FA</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Chip 
                              label={user.status} 
                              size="small"
                              sx={{ 
                                backgroundColor: user.status === 'Active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 87, 34, 0.1)',
                                color: user.status === 'Active' ? '#4CAF50' : '#FF5722',
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={user.twoFactorEnabled ? 'Enabled' : 'Disabled'} 
                              size="small"
                              sx={{ 
                                backgroundColor: user.twoFactorEnabled ? 'rgba(0, 191, 255, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                                color: user.twoFactorEnabled ? '#00BFFF' : '#9E9E9E',
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton size="small" color="primary">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>Roles & Permissions</Typography>
                
                {mockRoles.map((role) => (
                  <Box key={role.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1">{role.name}</Typography>
                      <Chip 
                        label={`${role.userCount} users`} 
                        size="small"
                        sx={{ backgroundColor: 'rgba(0, 191, 255, 0.1)', color: '#00BFFF' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {role.permissions.includes('all') 
                        ? 'Full system access' 
                        : role.permissions.join(', ')}
                    </Typography>
                    <Divider sx={{ mt: 1.5, mb: 1.5 }} />
                  </Box>
                ))}
                
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Add Role
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>Two-Factor Authentication</Typography>
                
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Require 2FA for all administrator accounts"
                />
                
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Require 2FA for security officers"
                />
                
                <FormControlLabel
                  control={<Switch />}
                  label="Require 2FA for all users"
                />
                
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                    }
                  }}
                >
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Security Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>Security Settings</Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Password Policy</Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Require complex passwords"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Password expiration (90 days)"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Prevent password reuse (last 5 passwords)"
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Session Security</Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Automatic logout after inactivity (15 minutes)"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Limit concurrent sessions"
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Access Control</Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="IP restriction for administrative access"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Audit logging for all security events"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>Encryption Settings</Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Data Encryption</Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable end-to-end encryption for video feeds"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Encrypt stored video footage"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Encrypt database containing sensitive information"
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Transport Security</Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Force HTTPS for all connections"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Use TLS 1.3 for all communications"
                  />
                </Box>
                
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                    }
                  }}
                >
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Placeholder for other tabs */}
      {tabValue > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <Typography variant="h6" color="text.secondary">
            {tabValue === 2 ? 'Notification Settings' : 'System Settings'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Settings;