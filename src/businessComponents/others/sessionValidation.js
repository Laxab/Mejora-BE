import { useEffect } from "react";
import { useSelector } from "react-redux";
import Logout from "../body/subbody/logout";
import Cookies from 'universal-cookie';


const SessionValidation = () =>{

    const state = useSelector(state => state)
    const cookies = new Cookies();

    const cookiecheck = () =>{
        const [sidkey,sidvalue] = document.cookie.split("=");
            if(sidvalue!==state.loginData.sid){
                return <Logout/>
            }
            else
                cookies.set('sid', sidvalue, { path: '/', expires: new Date(Date.now() + 30 * 60 * 1000)});
    }

    useEffect(()=>{
    },[state])

    return <div>{cookiecheck()}</div>
}
export default SessionValidation