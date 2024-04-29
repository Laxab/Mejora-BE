

// Components
import Sidenav from '../typeB/root/sidenav'
//import MainBody from '../typeB/root/mainbody'
import { lazy, useEffect, useState, Suspense } from 'react'
import { useSelector } from 'react-redux'
import SessionValidation from '../../businessComponents/others/sessionValidation'
//import RightBar from './rightBar'
import SnackBar from '../typeB/root/snackbar'

const MainBody = lazy(()=>import('../typeB/root/mainbody'))
const RightBar = lazy(()=>import('./rightBar'))

const cssRoot = {
    display:'flex',alignItems:'stretch'
}

const Root = () =>{

    // Primary Definitions
    const state = useSelector((state)=>state);

    // Secondary Definitions
    const [navOn,setnavOn] = useState(true);

    useEffect(()=>{
        //setlightMode(state.theme)
    },[state.lightTheme])


    return <div className={state.theme} style={cssRoot}>
        <SnackBar/>
        <Suspense fallback={<></>}><RightBar/></Suspense>
        <SessionValidation/>
        <Sidenav sidenav={navOn} setsidenav={setnavOn}/>
        <Suspense fallback={<></>}><MainBody sidenav={navOn}/></Suspense>
    </div>
}

export default Root