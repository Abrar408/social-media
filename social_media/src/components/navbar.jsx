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
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrUser, setLoggedInUser, setAccessToken } from '../features/UserSlice';
import { useNavigate } from 'react-router-dom';

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
  const currUser = useSelector((state) => state.user.currUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input,setInput] = React.useState('');
  const [userList,setUserList] = React.useState([]);

  React.useEffect(()=>{    
    const getUserList = async () => {
      if(input){
        await axios.post('http://127.0.0.1:3000/userList/get',{input,userid:currUser.email},{
          headers: {
            'authorization': `Bearer ${accessToken}`,
          }
        })
        .then(async res => {
          if(res.status == 200){
            setUserList(res.data);
          }
        })
        .catch(err => console.log(err))
      }else{
        setUserList([]);
      }
    }
    getUserList();
  },[input,rerender])

  const addFollowing = async (user) => {
    await axios.post('http://127.0.0.1:3000/following/add',{userid: user.user._id,currUser:currUser.email},{
      headers: {
        'authorization': `Bearer ${accessToken}`,
      }
    })
    .then(res => {
      if(res.status == 200){
        if(rerender){
          setRerender(false);
        }else{
          setRerender(true);
        }
      }
    })
    .catch(err => console.log(err))
  }
  const handleLogout = async () => {
    await axios.get('http://localhost:3000/logout',{
      withCredentials: true,
    })
    dispatch(setCurrUser({}));
    dispatch(setLoggedInUser({}));
    dispatch(setAccessToken(''));
    navigate('/');
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
            {currUser.username}
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
          <Button variant="contained" endIcon={<LockRoundedIcon/>} sx={{textTransform:'none',backgroundColor:'#03DAC6',color:'black',fontWeight:'bold',':hover':{backgroundColor:'#11bfaf'}}} onClick={()=>{handleLogout()}}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Card sx={{position:'absolute', width:'300px',left:'50%',transform:'translateX(-50%)',zIndex:"1",backgroundColor:'#242526',ml:'-25px',mt:'-10px'}}>
      {userList.map((user)=>{
        return (
          <>
            <Paper sx={{display:'flex',p:'5px',alignItems:'center',border:'none',backgroundColor:'#3A3B3C',borderRadius:'0px'}}>
              <Stack sx={{flex:'1'}}>
                  <Typography sx={{fontWeight:'bold',color:'white'}}>{user.doc.username}</Typography>
                  <Typography sx={{fontSize:'15px',color:'gray'}}>{user.doc.email}</Typography>
              </Stack>
              <Stack>
                {user.b ? <Button variant='outlined' sx={{textTransform:'none'}}>following</Button> :<Button variant='contained' sx={{backgroundColor:'#537FE7',textTransform:'none'}} startIcon={<AddCircleRoundedIcon/>} onClick={()=>{addFollowing({user:user.doc})}}>Follow</Button> }                
              </Stack>
            </Paper>
          </>
        )
      })}
      </Card>
    </>
  );
}