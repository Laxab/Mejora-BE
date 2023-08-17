/*
        ----- Important Notice -----
        This code is the intellectual property of Laxab Digital Solutions Pvt Ltd (Regd company in India,
        hereafter referred as 'company'). If you are not an employee this company, you are not authorized 
        to copy, save, or transmit this code in any form or medium without prior written permission from 
        the company.

        For more information, please visit company's website: www.laxab.com/intellectualproperty

        ----->> Pending Display <<-----

        Version 1.0 : 09 Jun 2023, Created      ***Current version***
*/

// Defaults
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

// Material UI
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Pending = () =>{

    // Primary Definitions
    const state     = useSelector(state=>state)

    // Secondary Definitions
    const [open,setOpen] = useState(true)

    // UseEffect
    useEffect(()=>{
        setOpen(state.backdrop.status)
    },[state])

    return <div style={{position:'absolute'}}> 

        {/*}
        <div style={{padding:'2px 7px 2px',color:'#fff',background:'RED',position:'fixed',zIndex:'10'}}><b>
                Pending: {state.backdrop.status ? "YES" : "NO"}
        </b></div>
        {*/}

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
        
        <CircularProgress color="inherit" size={120} thickness={5} />
        
    </Backdrop></div>
}

export default Pending