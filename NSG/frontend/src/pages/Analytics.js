import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#b0b0b0'
        }
      },
      title: {
        display: false
      },
    },
    scales: {
      y: {
        grid: {
          color: '#333333',
        },
        ticks: {
          color: '#b0b0b0'
        }
      },
      x: {
        grid: {
          color: '#333333',
        },
        ticks: {
          color: '#b0b0b0'
        }
      }
    }
  };

  const barOptions = {
    ...lineOptions,
    indexAxis: 'y',
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#b0b0b0'
        }
      }
    }
  };

  // Chart data
  const alertsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Critical',
        data: [2, 1, 0, 3, 1, 0, 2],
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
      {
        label: 'High',
        data: [5, 3, 4, 2, 6, 3, 4],
        borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.5)',
      },
      {
        label: 'Medium',
        data: [8, 7, 5, 9, 6, 4, 7],
        borderColor: '#FFC107',
        backgroundColor: 'rgba(255, 193, 7, 0.5)',
      },
      {
        label: 'Low',
        data: [12, 9, 11, 8, 10, 7, 9],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.5)',
      },
    ],
  };

  const detectionData = {
    labels: ['Person', 'Vehicle', 'Unattended Baggage', 'Restricted Area Access', 'Watchlist Match', 'Suspicious Activity'],
    datasets: [
      {
        label: 'Detections',
        data: [120, 85, 32, 18, 7, 42],
        backgroundColor: [
          'rgba(0, 191, 255, 0.7)',
          'rgba(76, 175, 80, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(255, 87, 34, 0.7)',
          'rgba(255, 0, 0, 0.7)',
          'rgba(156, 39, 176, 0.7)',
        ],
      },
    ],
  };

  const sourcesData = {
    labels: ['CCTV', 'Drones', 'Body Cams'],
    datasets: [
      {
        label: 'Alerts by Source',
        data: [65, 20, 15],
        backgroundColor: [
          'rgba(0, 191, 255, 0.7)',
          'rgba(76, 175, 80, 0.7)',
          'rgba(255, 193, 7, 0.7)',
        ],
        borderColor: [
          'rgba(0, 191, 255, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const locationData = {
    labels: ['Main Entrance', 'Parking Lot', 'North Gate', 'East Wing', 'Server Room', 'Perimeter'],
    datasets: [
      {
        label: 'Incidents by Location',
        data: [28, 35, 15, 22, 8, 42],
        backgroundColor: 'rgba(0, 191, 255, 0.7)',
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Analytics & Reporting
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
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
          <Tab label="Overview" />
          <Tab label="Alerts" />
          <Tab label="Detections" />
          <Tab label="Performance" />
        </Tabs>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="24h">Last 24 Hours</MenuItem>
            <MenuItem value="7d">Last 7 Days</MenuItem>
            <MenuItem value="30d">Last 30 Days</MenuItem>
            <MenuItem value="90d">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Overview Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Alert Trends</Typography>
                <Box sx={{ height: 300 }}>
                  <Line options={lineOptions} data={alertsData} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Alerts by Source</Typography>
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                  <Pie options={pieOptions} data={sourcesData} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Top Detection Types</Typography>
                <Box sx={{ height: 300 }}>
                  <Bar options={barOptions} data={detectionData} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Incidents by Location</Typography>
                <Box sx={{ height: 300 }}>
                  <Bar options={{...lineOptions, indexAxis: 'x'}} data={locationData} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>System Performance</Typography>
                <Grid container spacing={3}>
                  {[
                    { label: 'Average Response Time', value: '2.4 sec', status: 'good' },
                    { label: 'Uptime', value: '99.97%', status: 'good' },
                    { label: 'Detection Accuracy', value: '94.2%', status: 'good' },
                    { label: 'False Positive Rate', value: '3.8%', status: 'warning' },
                  ].map((metric, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          textAlign: 'center',
                          backgroundColor: 'background.paper',
                          border: '1px solid #333'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {metric.label}
                        </Typography>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: metric.status === 'good' ? '#4CAF50' : 
                                  metric.status === 'warning' ? '#FFC107' : '#FF5722'
                          }}
                        >
                          {metric.value}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Placeholder for other tabs */}
      {tabValue !== 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <Typography variant="h6" color="text.secondary">
            {tabValue === 1 ? 'Detailed Alerts Analytics' : 
             tabValue === 2 ? 'AI Detection Analytics' : 'System Performance Metrics'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Analytics;