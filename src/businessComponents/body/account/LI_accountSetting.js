/*

This code needs to be re-writted to support dynamic operations
- Abhijit Sawant

*/
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LI_TITLE from "../../listings/LI_title"
import {color} from "../../others/others_colors"
import SessionValidation from "../../others/sessionValidation"

const LI_accountSetting = () =>{
    // Primary Definitions
    const state = useSelector(state => state)
    const [stdbgHighlight,setstdbgHighlight] = useState(999)
    const dispatch = useDispatch();
    const [selector,setselector] = useState(999)

    // Secondary Definitions
    const contents = [
        {dispName:'Password', description:'Reset Password'},
        {dispName:'Roles', description:'View assigned Roles'},
        {dispName:'Theme', description:'Switch Themes'}
    ]

    const clicked = (data,i) =>{
        
        setselector(i)
        dispatch({type:'BODYCONTENTS_ADD',payload:data})
        
    }
    useEffect(()=>{
        setstdbgHighlight(selector)
    },[selector])
    useEffect(()=>{
        setstdbgHighlight(999)
    },[state.selectedMenu.name])


    return <div>
        <SessionValidation/>
        <LI_TITLE title="Select Item"/>

        {
            contents.map((item,index)=>(
                <div onClick={()=>clicked(item,index)} key={index} 
                    className={ stdbgHighlight===index?"stdbgHighlight  stdbgList":" stdbgList"} style={{height:'60px',display:'flex',justifyContent:'flex-start'}}>
                    <div style={{display:'flex',margin:"auto 5px auto 20px",borderRadius:'5px',background:`${color(item.dispName)[0]}`,color:'#fff',height:'40px',width:'40px'}}>
                        <div style={{display:'flex',margin:'auto',color:'#fff'}}><b>{item.dispName.slice(0,2)}</b></div>
                    </div>
                    <div style={{display:'flex',margin:"auto auto auto 5px",border:'0px solid red',textAlign:'left',flexDirection:'column',width:'80%'}}>
                        <div style={{position:'relative',top:'6px'}}><b>{item.dispName}</b></div>
                        <div className="stdcolorblur" style={{margin:"05px 20px auto auto",fontSize:'small',textAlign:'left',border:'0px dashed red'}}>{item.description.length>18?item.description.slice(0,18)+"...":item.description}</div>
                    </div>
                </div>
            ))
        }
    </div>
}

export default LI_accountSetting