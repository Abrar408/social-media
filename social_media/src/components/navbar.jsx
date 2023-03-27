import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, Paper } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import axios from 'axios';
import { Stack } from '@mui/system';
import { CurrUser } from '../App';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '250px',
      '&:focus': {
        width: '280px',
      },
    },
  },
}));

export default function SearchAppBar({rerender,setRerender}) {
  let currUser = React.useContext(CurrUser);
  const [input,setInput] = React.useState('')
  const [userList,setUserList] = React.useState([])
  // console.log(input)
  async function myFunc(){
    if(input){
    await axios.post('http://127.0.0.1:3000/userList',{input,userid:currUser._id})
        .then(async res => {
          // console.log(res.status)
          if(res.status == 200){
            // console.log("1")
            // console.log(res.data)
            // console.log("2")
            await setUserList(res.data)
            // console.log("3")
            // console.log(userList)
            // console.log("4")
          }
        })
        .catch(err => console.log(err))
      }else{
        setUserList([])
      }
  }

  React.useEffect(()=>{
    
    myFunc()
    return;
  },[input,rerender])

  const addFollowing = async (user) => {
    console.log(user.user.user._id)
    await axios.post('http://127.0.0.1:3000/addFollowing',{userid: user.user.user._id,currUser:currUser.email})
    .then(res => {
      if(res.status == 200){
        console.log(res.data)
        if(rerender){
          setRerender(false)
        }else{
          setRerender(true)
        }
      }
    })
    .catch(err => console.log(err))
  }
        
  return (
    <>
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:'#242526'}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          
          <Typography
            variant="h6"
            noWrap
            component="div" 
            sx={{textTransform:'uppercase'}}           
          >
            {currUser.user}
          </Typography>
          <Search sx={{borderBottom:'3px solid #03DAC6'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={input}
              onChange={(e)=>{setInput(e.target.value)}}
            />
          </Search>
          <Button variant="contained" endIcon={<LockRoundedIcon/>} sx={{textTransform:'none',backgroundColor:'#03DAC6',color:'black',fontWeight:'bold',':hover':{backgroundColor:'#11bfaf'}}}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Card sx={{position:'absolute', width:'300px',left:'50%',transform:'translateX(-50%)',zIndex:"1",backgroundColor:'#242526',ml:'-25px',mt:'-10px'}}>
      {userList.map((user)=>{
        return (
          <>
            <Paper elevation='0' sx={{display:'flex',p:'5px',alignItems:'center',border:'none',backgroundColor:'#3A3B3C',borderRadius:'0px'}}>
              <Stack sx={{flex:'1'}}>
                  <Typography sx={{fontWeight:'bold',color:'white'}}>{user.user.user}</Typography>
                  <Typography sx={{fontSize:'15px',color:'gray'}}>{user.user.email}</Typography>
              </Stack>
              <Stack>
                {user.b ? <Button variant='outlined' sx={{textTransform:'none'}}>following</Button> :<Button variant='contained' sx={{backgroundColor:'#537FE7',textTransform:'none'}} startIcon={<AddCircleRoundedIcon/>} onClick={()=>{addFollowing({user})}}>Follow</Button> }
                {/* <IconButton><CheckCircleRoundedIcon sx={{backgroundColor:'white',color:'green',borderRadius:'50%',boder:'3px solid green',outline:'3px solid green'}}/></IconButton> */}
              </Stack>
            </Paper>
          </>
        )
      })}
      </Card>
    </>
  );
}