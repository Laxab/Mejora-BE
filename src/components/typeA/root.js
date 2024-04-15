

// Components
import Sidenav from '../typeB/root/sidenav'
import MainBody from '../typeB/root/mainbody'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SessionValidation from '../../businessComponents/others/sessionValidation'
import RightBar from './rightBar'
import SnackBar from '../typeB/root/snackbar'

const cssRoot = {
    display:'flex',alignItems:'stretch'
}

const Root = () =>{

    // Primary Definitions
    const state = useSelector((state)=>state);

    // Secondary Definitions
    const [navOn,setnavOn] = useState(true);
    const [lightMode,setlightMode] = useState(false);

    useEffect(()=>{
        //setlightMode(state.theme)
        setlightMode(state.theme)
    },[state.lightTheme])

    const setTheme = (theme) =>{

    }

    return <div className={state.theme} style={cssRoot}>
        <SnackBar/>
        <RightBar/>
        <SessionValidation/>
        <Sidenav sidenav={navOn} setsidenav={setnavOn}/>
        <MainBody sidenav={navOn}/>
    </div>
}

export default Root