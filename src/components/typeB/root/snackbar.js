import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = () => {
  const [open, setOpen] = React.useState(false);
  const state = useSelector(state=>state);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={state.snackBar.severity} sx={{ width: '100%' }}>
            {state.snackBar.message}
          </Alert>
        </Snackbar>
    }
    </>
  );
}

export default SnackBar