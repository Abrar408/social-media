import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const [cred,setCred] = useState({
        email:'',
        pass:''
    })
    // console.log(cred)
  return (
    <>
    <Grid>        
        <Paper sx={{height:'70vh',padding:'20px'}}>
            <Grid align='center' >
                <Avatar sx={{backgroundColor:'seagreen'}}><LockOutlinedIcon/></Avatar>
                <h2>Login</h2>
            </Grid>  
            <TextField value={cred.email} onChange={(e)=>{setCred({...cred,email:e.target.value})}} size='small' label='Email' variant='outlined'
            placeholder='Enter Email' required sx={{width:'100%',m:'10px 0px'}} />   
            <TextField value={cred.pass} onChange={(e)=>{setCred({...cred,pass:e.target.value})}} size='small' label='Password' variant='outlined'
            placeholder='Enter Password' type='password' required sx={{width:'100%',m:'10px 0px'}} />  
            <FormControlLabel control={<Checkbox />} label="Remember Me" />  
            <Button variant='contained' type='submit' fullWidth >Login</Button>    
            <Typography sx={{m:'20px 0px 10px 0px'}}>
                <Link>
                    Forgot Password?
                </Link>
            </Typography>
            <Typography>
                Don't have an account? 
                <Link>
                    Register
                </Link>
            </Typography>
        </Paper>
    </Grid>
    </>
  )
}

export default Login