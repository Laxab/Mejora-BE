import { useEffect } from "react";
import { useDispatch } from "react-redux"


const Logout = () =>{


    const dispatch = useDispatch ();

    useEffect(()=>{
        //dispatch({type:'DIALOG_ON',title:`Logout`,body:`Your session was timed out, please login again`,return:''})
        dispatch({type:'LOGIN_FALSE'})
    },[dispatch])

    return <div></div>
}

export default Logout