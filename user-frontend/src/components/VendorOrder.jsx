import { Button, Container, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import sendVendorData from '../utils/vendorSendsData'
import {  downloadFileWithFetch } from '../utils/download.pdf'

export const VendorOrder = ({data}) => {
    const[date1,setdate1] = useState(Date.now)
    const[date2,setdate2] = useState(Date.now)
    const[date3,setdate3] = useState(Date.now)
    console.log(data);
    const handleSubmit = () =>{
        sendVendorData(data.user,data.productName,data.quantity,data.dateOfShipping, date1,date2,date3).then((res)=>{
            alert(`send to user`)
        }).catch((err)=>console.log(err))
    }
    useEffect(()=>{
      downloadFileWithFetch(data.downloadLink).then((res)=>{
        console.log(res);
      })
    })
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
          <h4>Download Purchase order PDF <a href=""></a></h4>
          <h4>Send you Shipping dates</h4>
          <Grid item xs={12}>
            <TextField 
            label = "Enter your shipping date"
            type='date'
            value={date1}
            onChange={(e)=>setdate1(e.target.value)}
            required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
            label = "Enter your shipping date"
            type='date'
            value={date2}
            onChange={(e)=>setdate2(e.target.value)}
            required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
            label = "Enter your shipping date"
            value={date3}
            onChange={(e)=>setdate3(e.target.value)}
            type='date'
            required
            />
          </Grid>
          <Grid item xs={12}>
         
              <Button variant='contained' onClick={handleSubmit}>Send</Button>
          </Grid>
          
        </Grid>
      </Container>
  )
}
