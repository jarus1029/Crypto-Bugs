import { Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <Box
    sx={{
        backgroundImage:'url(./banner.jpg)',
    }}
    >
        <Container 
        sx={{
            height:400,
            display:"flex",
            flexDirection:"column",
            paddingTop:"50px",
            justifyContent:"space-around",
            textAlign:"center",
        }}
        >
            <Box>
                <Typography 
                variant='h2'
                sx={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:"Montserrat",
                    marginBottom:"0"
                }}>
                    Crypto-Bugs
                </Typography>
                <Typography 
                variant='subtitle2'
                sx={{
                    display:"flex",
                    height:"40%",
                    flexDirection:"column",
                    justifyContent:"center",
                    textAlign:"center",
                    color:"darkgrey",
                    textTransform:"capitalize",
                    fontFamily:"Montserrat",
                }}>
                    Get all the Info regarding your favorite Crypto Currency
                </Typography>
            </Box>
            <Carousel
            sx={{
                paddingBottom:"0px"
            }}/>
        </Container>

    </Box>
  )
}

export default Banner
