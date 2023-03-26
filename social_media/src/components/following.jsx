import { Button, Card, Paper, Typography } from '@mui/material'
import React from 'react'

const Following = () => {
  return (
    <>
      <Card sx={{backgroundColor:'yellow',padding:'10px'}}>
        <Typography>Following</Typography>
        <Paper sx={{width:'300px',backgroundColor:'orange',display:'flex',alignItems:'center',padding:'5px'}}>
          <div style={{flex:'1'}}>
            <Typography>Username</Typography>
            <Typography>Email</Typography>
          </div>
          <div>
            <Button variant='contained'>Un Follow</Button>
          </div>
        </Paper>
      </Card>
    </>
  )
}

export default Following