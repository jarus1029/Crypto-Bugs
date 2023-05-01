import React, { useState } from 'react'
import {  LinearProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import  { CryptoState } from '../CryptoContext';
import axios from 'axios';
import {SingleCoin} from "../config/api"
import { useEffect } from 'react';
import { Box } from '@mui/system';
import CoinInfo from '../Components/CoinInfo';
import styled from '@emotion/styled';


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Coinpage = () => {
  const {id}=useParams();
  const [coin,setCoin]=useState();
  const {currency,symbol}=CryptoState();

  const fetchCoin=async()=>{
    const {data}=await axios.get(SingleCoin(id));
    setCoin(data);
  };
 

// console.log(coin);
  useEffect(()=>{
    fetchCoin();
  },[currency]);
  const Boxi = styled('div')(({ theme }) => ({
    alignSelf:"start",
    padding:25,
    paddingTop:10,
    width:"100%",
    [theme.breakpoints.down('lg')]: {
      display:"flex",
      justifyContent:"space-around"
    },
    [theme.breakpoints.down('md')]: {
      flexDirection:"column",
      alignItems:"center"
    },
    [theme.breakpoints.down('sm')]: {
      alignItems:"start"
    },
  }));

  const Boxer=styled('div')(({theme})=>({
    display:"flex",
    [theme.breakpoints.down("md")]:{
      flexDirection:"column",
      alignItems:"center"

    }
  }))

  const Box_side=styled('div')(({theme})=>({
    width:"30%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginTop:25,
    borderRight:"2px solid gray",
    [theme.breakpoints.down("md")]:{
      width:"100%",
      display:"flex",
    }
  }))


  if(!coin)
  return <LinearProgress style={{backgroundColor:"#0be106ed"}}></LinearProgress>

  return (
    <Boxer>
      <Box_side>
        <img
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{
          marginBottom:20
        }}/>
          <Typography 
          variant="h3"
          style={{
            fontWeight:"bold",
            marginBottom:20,
            fontFamily:"Montserrat",
            color:"#0be106ed",
          }}
          >{coin?.name}
          </Typography>
          <Typography variant="subtitle1"
          style={{
            width:"100%",
            fontFamily:"Montserrat",
            padding:25,
            paddingBottom:15,
            paddingTop:0,
            textAlign:"justify"
          }}>
            {
              (<div dangerouslySetInnerHTML={{__html:coin?.description.en.split(". ")[0]}}/>)
            }
            {/* {parse(desc)} */}
          </Typography>
          <Boxi>
            <span
            style={{
              display:"flex"
            }}>
              <Typography
              variant="h5"
              style={{
                color:"#0be106ed"
              }}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
              variant='h5'
              style={{
                fontFamily:"Montserrat",
                color:"#0be106ed"
              }}>
                {coin?.market_cap_rank}
              </Typography>
            </span>

            <span
            style={{
              display:"flex",
              color:"#0be106ed"
            }}>
              <Typography
              variant="h5">
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
              variant='h5'
              style={{
                fontFamily:"Montserrat",
                fontWeight:"500"
              }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
                
              </Typography>
            </span>

            <span
            style={{
              display:"flex"
            }}>
              <Typography
              variant="h5"
              style={{
                color:"#0be106ed"
              }}>
                Market Cap:{" "}
              </Typography>
              &nbsp; &nbsp;
              <Typography
              variant='h5'
              style={{
                fontFamily:"Montserrat",
                color:"#0be106ed"
              }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)
                )}
              </Typography>
            </span>
          </Boxi>
      </Box_side>
      <Box>
        {/* Chart */}
        <CoinInfo coin={coin}></CoinInfo>
      </Box>
    </Boxer>
  )
}

export default Coinpage
