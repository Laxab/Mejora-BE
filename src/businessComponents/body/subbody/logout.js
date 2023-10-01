import { useEffect } from "react";
import { useDispatch } from "react-redux"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Logout = () =>{


    const dispatch = useDispatch ();

    useEffect(()=>{
        //dispatch({type:'DIALOG_ON',title:`Logout`,body:`Your session was timed out, please login again`,return:''})
        //cookies.remove('sid', { path: '/' });
        dispatch({type:'LOGIN_FALSE'})
    },[dispatch])

    return <div></div>
}

export default Logout