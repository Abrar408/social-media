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
import axios from 'axios';
import { Stack } from '@mui/system';
import { CurrUser } from '../App';

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
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  let currUser = React.useContext(CurrUser);
  const [input,setInput] = React.useState('')
  const [userList,setUserList] = React.useState([])
  console.log(input)

  React.useEffect(()=>{
    async function myFunc(){
      if(input){
      await axios.post('http://127.0.0.1:3000/userList',{input})
          .then(res => {
            // console.log(res.status)
            if(res.status == 200){
              console.log(res.data)
              setUserList(res.data)
            }
          })
          .catch(err => console.log(err))
        }else{
          setUserList([])
        }
    }
    myFunc()
    return ()=>{}
  },[input])

  const addFollowing = async (user) => {
    console.log(user.user._id)
    await axios.post('http://127.0.0.1:3000/addFollowing',{userid: user.user._id,currUser:currUser.email})
    .then(res => {
      if(res.status == 200){
        console.log(res.data)
      }
    })
    .catch(err => console.log(err))
  }
        
  return (
    <>
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:'#1e211f'}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          
          <Typography
            variant="h6"
            noWrap
            component="div"            
          >
            {currUser.user}
          </Typography>
          <Search>
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
          <Button variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Card sx={{position:'absolute', width:'300px',left:'50%',transform:'translateX(-50%)',zIndex:"1"}}>
      {userList.map((user)=>{
        return (
          <>
            <Paper elevation='5' sx={{display:'flex',m:'1px 0px',p:'5px',alignItems:'center'}}>
              <Stack sx={{flex:'1'}}>
                  <Typography sx={{fontWeight:'bold'}}>{user.user}</Typography>
                  <Typography sx={{fontSize:'15px',color:'gray'}}>{user.email}</Typography>
              </Stack>
              <Stack>
                  <Button variant='contained' onClick={()=>{addFollowing({user})}}>Follow</Button>
              </Stack>
            </Paper>
          </>
        )
      })}
      </Card>
    </>
  );
}