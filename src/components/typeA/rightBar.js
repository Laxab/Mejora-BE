import { useEffect, useState } from "react"
import { RiCloseCircleFill } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import BixRightbar from "../../businessComponents/rightBar/bizRightbar";


const RightBar = () =>{

    const state = useSelector(state=>state)
    const dispatch = useDispatch();
    const [width,setwidth] = useState('500px')

    useEffect(()=>{
        dispatch({type:'BACKDROP_ON'})
        setwidth(state.rightBar.width)
        dispatch({type:'BACKDROP_OFF'})
    },[state.rightBar.width,dispatch])


    const onClose=()=>{
        dispatch({type:'RIGHTBAR_OFF'})
    }

    return <div>{ state.rightBar.state &&
        <div className="stdbox" style={{
            position:'absolute',width:width,
            borderRadius:'0px',right:'0px',top:'0px',padding:'0px'
        }}>
            <div style={{zIndex:'10'}}>
                <div className="stdBorder" style={{width:'calc(100% - 20px)',padding:'0px 10px',height:'60px',borderTop:'0px',borderLeft:'0px',borderRight:'0px',display:'flex'}}>
                    <div style={{display:'flex',margin:'auto 0px',width:'80%',border:'0px dashed red'}}><h3>{state.rightBar.title}</h3></div>
                    <div style={{display:'flex',margin:'auto 0px',width:'20%',fontSize:'28px',justifyContent:'flex-end',border:'0px dashed red'}}><h2><RiCloseCircleFill onClick={()=>onClose()} className="stdclose" style={{paddingTop:'7px'}}/></h2></div>
                </div>
                <div className="scrollbarTypeDefault" style={{height:'calc(100vh - 61px)',overflow:'auto',background:'#eee'}}>
                    <BixRightbar/>
                </div>
    
            </div>
            <div style={{width:`calc(100% - ${width})`,height:'100%',position:'fixed',left:'0px',top:'0px',background:'#0000007a',zIndex:'9',display:'flex'}}>
            </div>
        </div>
    }</div>
}

export default RightBar