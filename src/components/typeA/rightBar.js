import { useEffect, useState } from "react"
import { RiCloseCircleFill } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import BixRightbar from "../../businessComponents/rightBar/bizRightbar";
import { Box } from "../../businessComponents/others/others_colors";


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

        <>
            <div style={{width:`calc(100% )`,height:'100%',position:'fixed',left:'0px',top:'0px',background:'#0000007a',zIndex:'9',display:'flex'}}>
            </div>
            <div className="stdbox animationRightBar" style={{
                position:'absolute',width:width,
                borderRadius:'0px',right:`-${width}`,top:'0px',padding:'0px', zIndex:'10'
            }}>
                <div className="animationRightBarss" style={{zIndex:'10'}}>
                    <div className="stdBorder_NOT stdPadding tableTitle" style={{width:'calc(100% - 40px)',height:'auto',borderTop:'0px',borderLeft:'0px',borderRight:'0px',display:'flex'}}>
                        <div style={{margin:'auto 10px auto 0px'}}> <Box dim={'45px'} txt={state.bodyContents.dispName}/></div>
                        <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                            <div style={{fontSize:'large'}}><b>{state.bodyContents.dispName}</b></div>
                            <div style={{fontSize:'small'}}>{state.rightBar.title}</div>
                        </div>
                        <div style={{display:'flex',margin:'auto 0px',width:'20%',fontSize:'28px',justifyContent:'flex-end',border:'0px dashed red'}}><h2><RiCloseCircleFill onClick={()=>onClose()} className="stdclose" style={{paddingTop:'7px'}}/></h2></div>
                    </div>
                    <div className="scrollbarTypeDefault stdPadding" style={{height:'calc(100vh - 100px)',overflow:'auto'}}>
                        <BixRightbar/>
                    </div>
        
                </div>
                {/** Here */}
            </div>
        </>
    }</div>
}

export default RightBar