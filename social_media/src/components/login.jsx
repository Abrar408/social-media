import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import axios from 'axios'
import {CurrUser} from '../App'

const Login = ({setAuth,setCurrUser}) => {
    let currUser = useContext(CurrUser)

    const [cred,setCred] = useState({
        email:'',
        pass:''
    })
    const [err,setErr] = useState('')

    const checkIfEmpty =()=>{
        if(cred.email == '' || cred.pass == ''){
            setErr('required fields cannot be blank');
            return false
        }
        else{
            setErr('')
            return true
        }
    }
    const checkEmail =()=>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(cred.email))
        {
            setErr('');
            return true
        }else{
            setErr('email is not a valid email address');
            return false
        }            
    }
    const loginUser = async () => {
        if(checkIfEmpty()){
            if(checkEmail()){
                 await axios.post('http://localhost:3000/loginUser',cred)
                .then(res =>{
                    if(res.status == 200){
                        setCurrUser(res.data)
                        console.log(currUser)
                        setAuth(true)
                    }
                })
                .catch(err => {
                    setErr(err.response.data)
                })          
                
            }
        }
    }
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
            <Typography color='red'>{err}</Typography>
            <FormControlLabel control={<Checkbox />} label="Remember Me" />  
            <Button endIcon={<ArrowForwardRoundedIcon/>} variant='contained' type='submit' fullWidth onClick={loginUser} >Login</Button>    
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