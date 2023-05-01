import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, CircularProgress } from '@mui/material';
import { createTheme } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import {} from "./CoinInfo.css"
import {Chart as ChartJS,Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement} from 'chart.js'
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
ChartJS.register(
  Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement
)

const CoinInfo = ({coin}) => {
  const [historicalData,setHistoricalData]=useState();
  const [days,setDays]=useState(1);

  const {currency}=CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };
  
   useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme=createTheme({
    palette:{
      primary:"#fff",
    },
    type:"dark",
  })

  const Boxi=styled('div')(({theme})=>({
    width:"75%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    marginTop:25,
    padding:40,
    [theme.breakpoints.down("md")]:{
      width:"100%",
      marginTop:0,
      padding:20,
      paddingTop:0
    }
  }))

  return (
    <ThemeProvider theme={darkTheme}>
      <Boxi>
        {
          !historicalData?
          (<CircularProgress 
          style={{
            color:"#0be106ed"
          }}
          size={250}
          thickness={1}
          ></CircularProgress>)
          :(
            <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#0be106ed",
                  },
                ],
              }}
              options={{
                elements:{
                  point:{
                    radius:1,
                  },
                },
              }}
              />
              <Box
              style={{
                display:"flex",
                marginTop:20,
                justifyContent:"space-around",
                width:"100%"
              }}>
                {chartDays.map((day)=>(
                  <SelectButton
                  key={day.value}
                  onClick={()=>setDays(day.value)}
                  selected={day.value===days}
                  >{day.label}</SelectButton>
                ))}
              </Box>
            </>
          )
        }
      </Boxi>
    </ThemeProvider>
  )
}

export default CoinInfo
