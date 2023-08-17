import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';


export default function DialogBox() {

  // Primary definitions
  const state = useSelector(state => state)
  const dispatch = useDispatch();

  // Secondary definitions
  const [open, setOpen] = React.useState(true);
  const [message, setmessage] = React.useState("Message")
  const [title, settitle] = React.useState("Title")

  // Business methods
  React.useEffect(()=>{
    if(state.dialogbox.status===true){
      setOpen(true)
      setmessage(state.dialogbox.body)
      settitle(state.dialogbox.title)
    }
    else{
      setOpen(false)
      setmessage("")
      settitle("")
    }
  },[state.dialogbox])


  const handleClose = (value) => {
    dispatch({type:'DIALOG_OFF'})
  };

  return (
    <div style={{
      position:'absolute',zIndex:'10'
      
    }}>

      <Dialog open={open}>
        <div style={{
          padding:'30px 50px 30px',
          fontSize:'normal'
        }}>

          {
            title!==""
            &&
            <div style={{paddingBottom:'20px'}}><h1>{title}</h1></div>
          } 
          <div>{message}</div>
          <div onClick={handleClose} className="stdButton" style={{margin:'20px 0px 0px',textAlign:'center'}}>Close</div>
        </div>
      </Dialog>
    </div>
  );
}