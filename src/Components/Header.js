import { AppBar, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {
    const navigate=useNavigate();
    const {currency,setCurrency}=CryptoState();
    // console.log(currency);
  return (
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography 
                onClick={()=>(navigate('/'))}
                sx={{
                    flex:1,
                    color:"#0be106ed",
                    fontFamily:"Montserrat",
                    fontWeight:"bold",
                    cursor:"pointer",
                    letterSpacing:"0.25mm"
                }}
                variant='h6'
                >Crypto-Bugs</Typography>
                <Select
                variant='outlined'
                sx={{
                    width:100,
                    height:40,
                    marginRight:2,
                    color:"black",
                    border:"1px solid white",
                    bgcolor:"#1dae04",
                }}
                value={currency}
                onChange={(e)=>setCurrency(e.target.value)}>
                    
                    <MenuItem value={'USD'} >USD</MenuItem>
                    <MenuItem value={'INR'} >INR</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Header
