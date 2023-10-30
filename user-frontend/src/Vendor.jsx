import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Alert, Badge, Box, Button, Container, Grid, Input, Modal, Snackbar, Stack, TextField } from '@mui/material';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';

import { signUpVendor } from './utils/vender.signup';
import { loginVendor } from './utils/vendor.login';
import { fetchSelfVendor } from './utils/fetchVendorDetails';
import { fetchVendorDashboardData } from './utils/fetchvendorDash';
import { VendorOrder } from './components/VendorOrder';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const SignUpinitialState = {
  username: '',
  email: '',
  password: '',
};
const LogininitialState = {
  email: '',
  password: '',
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
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
  const[note,setnote] = useState(false)
  const [open, setOpen] = useState(false);
  const[usercollection,setcollection] = useState()
  const[openalert,setopenAlert] = useState(false)
  const[data,setdata] = useState([])

  const [open2, setOpen2] = useState(false);
    const handleClosealert = ()=>{
      setopenAlert(false)
    }
  const handleSignup = (e) => {
    e.preventDefault();
    
    const { username, email, password } = state;
    signUpVendor(email,username,password).then((res)=>{
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
    loginVendor(email, password)
    .then((response) => {
      // Handle success
      console.log('Login successful:', response);
      
      dispatch2({ type: 'RESET' });
      setOpen(false)
      setOpen2(false)
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
if(localStorage.getItem('vendor-token')||localStorage.getItem('vendor-token')!==null){
  setInterval(() => {
    fetchSelfVendor().then((res)=>{
      if(res.users.length>usercollection){
        console.log(res.users.length,usercollection);
        setcollection(res.users.length)
        setnote(true)
      }

    })
  }, 4000);
}
  
  useEffect(()=>{
    if(localStorage.getItem('vendor-token')||localStorage.getItem('vendor-token')!==null){
      fetchSelfVendor().then((res)=>{
        
          setcollection(res.users.length)
      })
      fetchVendorDashboardData().then((res)=>{
        setdata(res)
      }).catch((err)=>{
        alert(`Something went wrong`)
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
      { !localStorage.getItem('vendor-token')||localStorage.getItem('vendor-token')===null?<Button variant="contained" onClick={handleOpen}>signup</Button> : <h1>Welcome</h1>}

      
      <Badge onClick={()=>setnote(true)} badgeContent={note?1:0} color="primary">

      <NotificationsSharpIcon fontSize='large' />
      </Badge>
      </div>
      <Container maxWidth="sm">
      <h1>Vendor Dashboard</h1>
      <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
          {data?.map((ele,idx)=>{
          return(<Item key={idx}>
            <VendorOrder data={ele} />
          </Item>)

        })}
          </Stack>
        </Box>
       
      
    </Container>
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
