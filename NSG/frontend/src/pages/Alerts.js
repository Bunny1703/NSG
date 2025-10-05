import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// Mock alerts data
const mockAlerts = [
  { 
    id: 'a1', 
    timestamp: '2023-06-15 10:45:23', 
    type: 'Unauthorized Access', 
    location: 'North Gate', 
    source: 'CCTV 1',
    severity: 'High',
    status: 'New'
  },
  { 
    id: 'a2', 
    timestamp: '2023-06-15 09:32:17', 
    type: 'Suspicious Activity', 
    location: 'East Wing', 
    source: 'Drone 2',
    severity: 'Medium',
    status: 'Investigating'
  },
  { 
    id: 'a3', 
    timestamp: '2023-06-15 08:17:45', 
    type: 'Watchlist Match', 
    location: 'Parking Lot', 
    source: 'CCTV 3',
    severity: 'High',
    status: 'Resolved'
  },
  { 
    id: 'a4', 
    timestamp: '2023-06-15 07:55:12', 
    type: 'Unattended Baggage', 
    location: 'Main Entrance', 
    source: 'CCTV 1',
    severity: 'Medium',
    status: 'New'
  },
  { 
    id: 'a5', 
    timestamp: '2023-06-14 23:12:33', 
    type: 'Perimeter Breach', 
    location: 'South Fence', 
    source: 'Drone 1',
    severity: 'Critical',
    status: 'Resolved'
  },
  { 
    id: 'a6', 
    timestamp: '2023-06-14 21:45:09', 
    type: 'Suspicious Vehicle', 
    location: 'West Gate', 
    source: 'Body Cam 2',
    severity: 'High',
    status: 'Investigating'
  },
  { 
    id: 'a7', 
    timestamp: '2023-06-14 18:33:27', 
    type: 'Unauthorized Access', 
    location: 'Server Room', 
    source: 'CCTV 5',
    severity: 'Critical',
    status: 'Resolved'
  },
  { 
    id: 'a8', 
    timestamp: '2023-06-14 15:22:51', 
    type: 'Watchlist Match', 
    location: 'Cafeteria', 
    source: 'CCTV 7',
    severity: 'High',
    status: 'Resolved'
  },
  { 
    id: 'a9', 
    timestamp: '2023-06-14 12:11:05', 
    type: 'Suspicious Activity', 
    location: 'Training Area', 
    source: 'Body Cam 3',
    severity: 'Medium',
    status: 'Investigating'
  },
  { 
    id: 'a10', 
    timestamp: '2023-06-14 09:05:38', 
    type: 'Unattended Baggage', 
    location: 'Lobby', 
    source: 'CCTV 2',
    severity: 'Medium',
    status: 'Resolved'
  },
];

const Alerts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return '#FF0000';
      case 'High': return '#FF5722';
      case 'Medium': return '#FFC107';
      case 'Low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return '#00BFFF';
      case 'Investigating': return '#FFC107';
      case 'Resolved': return '#4CAF50';
      default: return '#757575';
    }
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = searchTerm === '' || 
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === '' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === '' || alert.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Alerts & Events
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          placeholder="Search alerts..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Severity</InputLabel>
            <Select
              value={severityFilter}
              label="Severity"
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <MenuItem value="">All Severities</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Investigating">Investigating</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlerts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((alert) => (
                  <TableRow hover key={alert.id}>
                    <TableCell>{alert.id}</TableCell>
                    <TableCell>{alert.timestamp}</TableCell>
                    <TableCell>{alert.type}</TableCell>
                    <TableCell>{alert.location}</TableCell>
                    <TableCell>{alert.source}</TableCell>
                    <TableCell>
                      <Chip 
                        label={alert.severity} 
                        size="small"
                        sx={{ 
                          backgroundColor: `${getSeverityColor(alert.severity)}22`,
                          color: getSeverityColor(alert.severity),
                          fontWeight: 'medium'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={alert.status} 
                        size="small"
                        sx={{ 
                          backgroundColor: `${getStatusColor(alert.status)}22`,
                          color: getStatusColor(alert.status),
                          fontWeight: 'medium'
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
              {filteredAlerts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Box sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <NotificationsActiveIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                      <Typography variant="body1" color="text.secondary">
                        No alerts found matching your filters
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAlerts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Alerts;