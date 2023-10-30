import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Alert, Badge, Box, Button, Input, Modal, Snackbar, Stack, makeStyles } from '@mui/material';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { Container, TextField, Grid } from '@mui/material';
import { signUpUser } from './utils/user.signup';
import { loginUser } from './utils/user.login';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { Link } from 'react-router-dom';
import fetchConnectedVendors from './utils/fetchVendors';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { sendDataToServer } from './utils/postData';
import { fetchVendorResponse } from './utils/fetchvendorresponse';
import { VendorOrder } from './components/VendorOrder';
import { VendorResponse } from './components/VendorResponse';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SignUpinitialState = {
  username: '',
  email: '',
  password: '',
};
const LogininitialState = {
  email: '',
  password: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return SignUpinitialState;
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
const reducer2 = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return LogininitialState;
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

function User() {
  
  const [state, dispatch] = useReducer(reducer, SignUpinitialState);
  const [state2, dispatch2] = useReducer(reducer2, LogininitialState);
  const [open, setOpen] = useState(false);
  const[btn,setbtn] = useState(true)
  const[openalert,setopenAlert] = useState(false)
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shippingDate, setShippingDate] = useState(Date.now);
  const [open2, setOpen2] = useState(false);
  const [linkedVendors, setLinkedVendors] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const[downloadlink,setlink] = useState()
  const[resp,setresp] = useState([])
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value.name === 'string' ? value.split(',') : value,
    );
  };
    const handleClosealert = ()=>{
      setopenAlert(false)
    }
    const handleFile = (event) => {
      const selectedFile = event.target.files[0];
      if (!selectedFile) {
        alert('Please select a file first.');
        return;
      }
  
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      // Make a POST request to the backend to upload the file
      fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response, which contains the download link
          const downloadLink = data.downloadLink;
          setlink(downloadLink)
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          alert('Error uploading the file. Please try again later.');
        });
    };
  
  const handleSignup = (e) => {
    e.preventDefault();
    
    const { username, email, password } = state;
    signUpUser(email,username,password).then((res)=>{
      dispatch({ type: 'RESET' })
      setOpen2(true)
    }).catch((err)=>{
      setopenAlert(true)
    })
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // You can access form data in 'state' and perform your signup logic here
    const {  email, password } = state2;
    loginUser(email, password)
    .then((response) => {
      // Handle success
      console.log('Login successful:', response);
      
      dispatch2({ type: 'RESET' });
      setOpen(false)
      setOpen2(false)
      setbtn(false)
    })
    .catch((error) => {
      // Handle error
      console.log(error);
      setopenAlert(true)
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = ()=>{

    setOpen(true)
  }
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen2 = ()=>{

    setOpen2(true)
  }
  const handleformSubmit = (e) =>{
    e.preventDefault()
    console.log({quantity,shippingDate,downloadlink,product,linkedVendors});
    sendDataToServer(linkedVendors,downloadlink,product,quantity,shippingDate).then((res)=>{
      console.log(res);
      setProduct("")
      setQuantity("")
      setShippingDate("")
      alert(`Data sent to selected vendors.🎉🎉`)
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    if(localStorage.getItem('user-token')){
      const result = fetchConnectedVendors()
      result.then((res)=>setLinkedVendors(res))
      fetchVendorResponse().then((res)=>{
        console.log(res);
        setresp(res)
      }).catch((err)=>{
        console.log(err);
      })
    }
   
  },[])
  return (
    <div>
      <div className="vendor-nav">
      <Snackbar open={openalert} autoHideDuration={6000} onClose={handleClosealert}>
        <Alert onClose={handleClosealert} variant='filled' severity="error" sx={{ width: '100%' }}>
          Something Went Wrong
        </Alert>
        
      </Snackbar>
      { !localStorage.getItem('user-token')?<Button variant="contained" onClick={handleOpen}>signup</Button> : <h1>Welcome</h1>}
      { !localStorage.getItem('user-token')?null : <Link to={`/user/profile`}><AccountCircleSharpIcon fontSize='large'>
        </AccountCircleSharpIcon></Link>}

      
      
      </div>
      <Container maxWidth="sm">
      <h1>User Frontend</h1>
      <form >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              fullWidth
              variant="outlined"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              fullWidth
              variant="outlined"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Shipping"
              fullWidth
              variant="outlined"
              type='date'
              value={shippingDate}
              onChange={(e) => setShippingDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept=".pdf" onChange={handleFile} />
          </Grid>
          <Grid item xs={12}>
          <FormControl  sx={{ m: 1, width: 300 }}>
        <InputLabel  id="demo-multiple-checkbox-label">Select Vendors</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput  label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {linkedVendors?.map((name) => (
            <MenuItem key={name._id} value={name._id}>
              <Checkbox checked={personName.includes(name._id)} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

          </Grid>
          <Grid item xs={20}>
          
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleformSubmit}
            >
              Submit
            </Button>
            
          </Grid>
        </Grid>
      </form>
    </Container>


  <div className="vendorresp">
    <Box alignContent={'center'} textAlign={'center'}>
      <h1>Vendor Responses</h1>
    </Box>
    <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
          {resp?.map((ele,idx)=>{
          return(<Item key={idx}>
            <VendorResponse data={ele} />
          </Item>)

        })}
          </Stack>
        </Box>
    </div> 
     <Modal
        open={open}
        className='modal'
        onClose={handleClose}
        sx={{ 
          "& > .MuiBackdrop-root" : {
                  backdropFilter: "blur(8px)"
                }
          }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         <div className="modal-content">
            <h2>Sign Up</h2>
            <form>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          fullWidth
          id="username"
          name="username"
          required
          value={state.username}
          onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
        />
      </div>
      <div className="input-container">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          fullWidth
          id="email"
          name="email"
          required
          value={state.email}
          onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <Input
          color="secondary"
          fullWidth
          type="password"
          id="password"
          name="password"
          required
          value={state.password}
          onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
        />
      </div>
      <Button variant="contained" type="submit" onClick={handleSignup}>
        Submit
      </Button>
    </form>
            <p>Already have an account  <Button onClick={()=>{handleClose();handleOpen2()}} >Login</Button> </p>
        </div>
       
      </Modal>
      <div className="modal2">
      <Modal
        open={open2}
        className="modal"
        sx={{ 
          "& > .MuiBackdrop-root" : {
                  backdropFilter: "blur(8px)"
                }
          }}
        onClose={handleClose2}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         <div className="modal-content">
            <h2>Login</h2>
            <form>
      
      <div className="input-container">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          fullWidth
          id="email"
          name="email"
          required
          value={state2.email}
          onChange={(e) => dispatch2({ type: 'SET_EMAIL', payload: e.target.value })}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <Input
          color="secondary"
          fullWidth
          type="password"
          id="password"
          name="password"
          required
          value={state2.password}
          onChange={(e) => dispatch2({ type: 'SET_PASSWORD', payload: e.target.value })}
        />
      </div>
      <Button variant="contained" type="submit" onClick={handleLogin}>
        Submit
      </Button>
    </form>
            
        </div>
       
      </Modal>
      </div>
      
    </div>
   
  );
}

export default User;
