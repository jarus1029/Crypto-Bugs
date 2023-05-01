import styled from '@emotion/styled'
import React from 'react'

const SelectButton = ({children,selected,onClick}) => {
  return (
    <span onClick={onClick}
    style={{
        border:"1px solid #0be106ed",
        borderRadius:5,
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        fontFamily:"Montserrat",
        cursor:"pointer",
        backgroundColor:selected? "#0be106ed": "",
        color:selected?"black":"",
        fontWeight:selected?700:500,
        "&:hover":{
            backgroundColor:"#0be106ed",
            color:"black"
        },
        width:"22%",

    }}>
      {children}
    </span>
  )
}

export default SelectButton
