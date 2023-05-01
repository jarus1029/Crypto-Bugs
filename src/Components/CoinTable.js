import { createTheme, LinearProgress, Pagination, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container, ThemeProvider } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import "./CoinTable.css"
import { Navigate, useNavigate } from 'react-router-dom';
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page,setPage]=useState(1);
    
    const { currency,symbol } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    const [search, setSearch] = useState(coins);
    // console.log(coins);
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
        components:{
            Pagination:{
                "& .MuiButtonBase-root-MuiPaginationItem-root":{
                    color:"white",
                },
            }
        }
    })

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ));
    };
    
    // console.log(coins);
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>

                <Typography
                    variant="h4"
                    style={{
                        margin: 18,
                        fontFamily: "Montserrat"
                    }}>
                    Crptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    sx={{
                        "& .MuiInputBase-root": {
                            color: 'primary.main'

                        }
                    }}
                    className='textfield'
                    InputLabelProps={{ className: "textfield_label" }}
                    label="Search For a Cryptocurrency"
                    variant='outlined'
                    style={{ marginBottom: 20, width: "100%", border: "2px solid white" }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer component={Paper}>
                    {
                        loading ?
                            (
                                <LinearProgress style={{ backgroundColor: "#07542B" }} />
                            )
                            :
                            (
                                <Table aria-label='simple table'>
                                    <TableHead style={{ backgroundColor: "#0be106ed" }}>
                                        <TableRow>
                                            {/* {["Coin","Price","24h Change","Market Cap"].map((head)=>{
                                <TableCell
                                style={{
                                    color:"black",
                                    fontWeight:"700",
                                    fontFamily:"Montserrat",
                                }}
                                key={head}
                                align="right">
                                    {head}
                                </TableCell>
                            })} */}
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                            >Coin</TableCell>
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }} align="right">Price</TableCell>
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }} align="right">24h Change&nbsp;</TableCell>
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }} align="right">Market Cap&nbsp;</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {
                                        handleSearch()
                                        .slice((page-1)*10,(page-1)*10+10)
                                        .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            // <Box style={{color:"white"}}>row.price_change_percentage_24h</Box>
                                            // console.log( row.price_change_percentage_24h );
                                            return (
                                                <TableRow
                                                    onClick={() => (navigate(`/coins/${row.id}`))}
                                                    key={row.name}
                                                    sx={{
                                                        backgroundColor: "#16171a",
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            backgroundColor: "#131111",
                                                        },
                                                    }}
                                                >
                                                    <TableCell
                                                        component='th'
                                                        scope="row"
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}>
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10
                                                             }}
                                                        />
                                                        <Box
                                                            style={{
                                                                disply: "flex",
                                                                flexDirection: "column"
                                                            }}>
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                    color:"white",
                                                                    display:"flex",
                                                                    flexDirection:"row"
                                                                }}>
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{color:"darkgrey"}}>{row.name}</span>
                                                        </Box>
                                                    </TableCell>

                                                    <TableCell
                                                    align="right"
                                                    style={{
                                                        color:"white"
                                                    }}

                                                    >
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>

                                                    <TableCell
                                                    align="right"
                                                    style={{
                                                        color:profit>0?"rgb(14,203,129":"red",
                                                        fontWeight:500,
                                                    }}>
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell
                                                    align="right"
                                                    style={{
                                                        color:"white"
                                                    }}>
                                                        {symbol}
                                                        {numberWithCommas(row.market_cap.toString().slice(0,-6))}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                        </TableBody>
                                </Table>
                            )
                    }
                </TableContainer>
                <Pagination
                style={{
                    padding:20,
                    width:'100%',
                    display:"flex",
                    justifyContent:"center",
                    // color:isActive?'red':'',
                }}
                className="pagination"
                // onClick={handleClick}
                count={Number((coins?.length)/10).toFixed(0)}
                onChange={(_,value)=>{
                    setPage(value);
                    window.scroll(0,450);
                }}
                />
        </Container>

        </ThemeProvider>
    )
}

export default CoinTable
