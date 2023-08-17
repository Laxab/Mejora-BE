

// Components
import Sidenav from '../typeB/root/sidenav'
import MainBody from '../typeB/root/mainbody'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SessionValidation from '../../businessComponents/others/sessionValidation'
import RightBar from './rightBar'

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
        setlightMode(state.lightTheme)
    },[state.lightTheme])

    return <div className={lightMode ? "lightMode" : "darkMode"} style={cssRoot}>
        <RightBar/>
        <SessionValidation/>
        <Sidenav sidenav={navOn} setsidenav={setnavOn}/>
        <MainBody sidenav={navOn}/>
    </div>
}

export default Root