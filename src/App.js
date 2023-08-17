// Default imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/stylesheets/main.scss';

// Components
import Login from './components/typeA/login'
import Root from './components/typeA/root'
import Pending from './businessComponents/mui/pending'
import DialogBox from './businessComponents/mui/dialogBox'
import ReduxDebug from './businessComponents/others/others_reduxDebug'
import fetchData from './businessComponents/others/fetchData';

function App() {

  //Secondary Definitions
  const [signedIn, setsignedIn] = useState(false)
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [sidkey,sidvalue] = document.cookie.split("=");

  useEffect(()=>{
    setsignedIn(state.login)
  },[state.login])

  useEffect(()=>{
    
    dispatch({type:'BACKDROP_ON'})
    const loginNow = async () => {
        var uri = 'api/be/v1.0/a3/getRBAC';
        var body = {
          "sid":sidvalue,
          "request": "getRBAC",
          "bu":"GreyInsights"
        };
        const data = await fetchData(uri,body,'');
        try{
          if(data.status==="success"){
            await dispatch({type:'LOGIN_TRUE',payload:sidvalue, identity:data.data.identity,sidenav:data.data.sidenav})
          }
          else{
            await dispatch({type:'LOGIN_FALSE'})
            if(state.login===true) window.location.reload()
            //window.location.reload()
          }
          dispatch({type:'BACKDROP_OFF'})
        }
        catch (error) {
            dispatch({type:'BACKDROP_OFF'})
            dispatch({type:'CHANGE_BODY',payload:'Maintenance'})
            dispatch({type:'LOGIN_FALSE'})
        }
    };
    loginNow();
    
  },[state.login, sidvalue,dispatch,sidkey])

  return (
    <div style={{height:'100vh'}}>
      <DialogBox/>
      <Pending/>
      <ReduxDebug/>

      { signedIn ? <Root/> : <Login/> }

    </div>
  );
}

export default App;
