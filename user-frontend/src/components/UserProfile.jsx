import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, TextField, Button, List, ListItem, ListItemText, Divider, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { searchVendor } from '../utils/searchForVendor';
import SearchResults from './SearchResults';
import { addVendorToUserList } from '../utils/addVendor';
import fetchConnectedVendors from '../utils/fetchVendors';

export function UserProfile() {
  // State for the user's linked vendors
  const [linkedVendors, setLinkedVendors] = useState([]);
  const[openalert,setopenAlert] = useState(false)
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setresult] = useState(null);
  const handleClosealert = ()=>{
    setopenAlert(false)
  }
  // Function to search for vendors
  const searchVendors = () => {
    // Implement your logic to search for vendors here
    searchVendor(searchQuery).then((res)=>{
      setresult(res)
    }).catch((err)=>console.log(err))
  };
  const addVendor = ()=>{
  addVendorToUserList(result.email).then((res)=>{
    setresult(null)
    setopenAlert(false)
  }).catch((err)=>setopenAlert(true))
  }
useEffect(()=>{
  const result = fetchConnectedVendors()
  result.then((res)=>setLinkedVendors(res))
},[])
  return (
    <Container maxWidth="md">
      <Snackbar open={openalert} autoHideDuration={6000} onClose={handleClosealert}>
        <Alert onClose={handleClosealert} variant='filled' severity="error" sx={{ width: '100%' }}>
          Something Went Wrong
        </Alert>
        
      </Snackbar>
      <Typography variant="h4">User Profile</Typography>
      <Grid container spacing={2}>
        {/* Left part for searching vendors */}
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6">Search for Vendors</Typography>
            <TextField
              label="Search for vendors"
              fullWidth
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={searchVendors}>
              Search
            </Button>
          </Paper>
        </Grid>

        {/* Right part for displaying linked vendors */}
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6">Linked Vendors</Typography>
           
            <List>
              {linkedVendors?.map((vendor,idx) => (
                <div key={idx}>
                  <ListItem>
                    <ListItemText primary={vendor.name} secondary={vendor.email} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Card>
        {
          result?<SearchResults addVendor={addVendor} result={result}/>:null
        }
      
    </Card>
    </Container>
  );
}


