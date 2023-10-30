import { Button, Container, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import sendVendorData from '../utils/vendorSendsData'

export const VendorResponse = ({data}) => {
    
    console.log(data);
    const handleSubmit = () =>{
        
    }
  return (
    <Container  >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              fullWidth
              variant="outlined"
              disabled
              
              value={data.productName}
              // onChange={(e) => setProduct(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              fullWidth
              variant="outlined"
              type="number"
              disabled
              InputProps={{
                readOnly: true, // Set the readOnly attribute to true
              }}
              value={data.quantity}
              // onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Shipping"
              fullWidth
              disabled
              InputProps={{
                readOnly: true, // Set the readOnly attribute to true
              }}
              variant="outlined"
              type='date'
              value={new Date(data.dateOfShipping).toISOString().split('T')[0]}
              // onChange={(e) => setShippingDate(e.target.value)}
            />
          </Grid>
          <h4>Select your Shipping dates</h4>
          <Grid item xs={12}>
                    <TextField 
                    label = "Enter your shipping date"
                    type='date'
                    value={new Date(data.shippingDatesFromVendor.schedule1).toISOString().split('T')[0]}
                    disabled
                    
                    />
                  </Grid>
          <Grid item xs={12}>
                    <TextField 
                    label = "Enter your shipping date"
                    type='date'
                    value={new Date(data.shippingDatesFromVendor.schedule2).toISOString().split('T')[0]}
                    disabled
                    
                    />
                  </Grid>
          <Grid item xs={12}>
                    <TextField 
                    label = "Enter your shipping date"
                    type='date'
                    value={new Date(data.shippingDatesFromVendor.schedule3).toISOString().split('T')[0]}
                    disabled
                    
                    />
                  </Grid>
          
          
          
          <Grid item xs={12}>
         
              <Button variant='contained' onClick={handleSubmit}>Send</Button>
          </Grid>
          
        </Grid>
      </Container>
  )
}
