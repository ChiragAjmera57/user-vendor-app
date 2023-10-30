import React from 'react';
import { Card, CardContent, CardActions, IconButton, Typography, Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';


const SearchResults = ({ result,addVendor }) => {
  return (
    <Card >
    <CardContent >
      <Typography variant="h6">Search Result</Typography>
      <Typography variant="h5" component="div">
        <p>Vendor Name: {result.name}</p>
        <p >
          
          Email: {result.email}
        </p>
        {/* Add more vendor information as needed */}
        <Button variant='contained' onClick={addVendor} endIcon={<IconButton
             
              aria-label="Add to Connections"
            >
              <AddCircleOutline />
            </IconButton>}>Add to connection</Button>
      </Typography>
    </CardContent>
  </Card>
  );
};

export default SearchResults;
