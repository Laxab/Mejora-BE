import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';


const SnackBar = () => {
  const [open, setOpen] = React.useState(false);
  const state = useSelector(state=>state);
  const dispatch = useDispatch();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <div style={{color:'#fff'}}><MuiAlert elevation={6} ref={ref} variant="filled" {...props} sx={{ color:'#fff' }} style={{color:'#fff'}} /></div>;
  });

  const handleClose = (event, reason) => {
    dispatch({type:"SNACKBAR_OFF"})
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(()=>{
    if(state.snackBar.state===true)
        setOpen(true)
    else
        setOpen(false)
  },[state.snackBar])

  //error warning info success

  return (<>
    {
        <Snackbar className='whiteDiv' open={open} autoHideDuration={6000} onClose={handleClose} sx={{ color:'#fff' }} style={{color:'#fff'}}>
          <Alert style={{color:'#fff'}} onClose={handleClose} severity={state.snackBar.severity} sx={{ width: '100%', color:'#fff' }}>
            {
              state.snackBar?.message
              ?
              <div style={{color:'#fff'}}>{state.snackBar?.message}</div>
              :
              <div style={{color:'#fff'}}>Unable to connect with the API</div>
            }
          </Alert>
        </Snackbar>
    }
    </>
  );
}

export default SnackBar