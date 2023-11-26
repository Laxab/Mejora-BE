/*

This code needs to be re-writted to support dynamic operations
- Abhijit Sawant

*/
import { useState } from "react"
import { useDispatch } from "react-redux"
import LI_TITLE from "../../listings/LI_title"
import {color} from "../../others/others_colors"
import SessionValidation from "../../others/sessionValidation"

const LI_mD_items = () =>{
    // Primary Definitions
    const [stdbgHighlight,setstdbgHighlight] = useState(999)
    const dispatch = useDispatch();

    // Secondary Definitions
    const contents = [
        {
            dispName:"CoI", 
            name:'coi',
            description:"Category of Interpretation"
        },
        {
            dispName:"Code", 
            name:'code',
            description:"Business Code"
        }
    ]

    const clicked = (data,i) =>{
        setstdbgHighlight(i)
        dispatch({type:'BODYCONTENTS_ADD',payload:data})
        
    }


    return <div>
        <SessionValidation/>
        <LI_TITLE title="Select Item"/>

        {
            contents.map((item,index)=>(
                <div onClick={()=>clicked(item,index)} key={index} 
                    className={ stdbgHighlight===index?"stdbgHighlight  stdbgList":" stdbgList"} style={{height:'60px',display:'flex',justifyContent:'flex-start'}}>
                    <div style={{display:'flex',margin:"auto 5px auto 20px",borderRadius:'5px',background:`${color(item.dispName)[0]}`,color:'#fff',height:'40px',width:'40px'}}>
                        <div style={{display:'flex',margin:'auto'}}><b>{item.dispName.slice(0,2)}</b></div>
                    </div>
                    <div style={{display:'flex',margin:"auto auto auto 5px",border:'0px solid red',textAlign:'left',flexDirection:'column',width:'80%'}}>
                        <div style={{position:'relative',top:'7px'}}><b>{item.dispName}</b></div>
                        <div className="stdcolorblur" style={{margin:"auto 20px auto auto",fontSize:'small',textAlign:'right'}}>{item.description.length>18?item.description.slice(0,18)+"...":item.description}</div>
                    </div>
                </div>
            ))
        }
    </div>
}

export default LI_mD_items