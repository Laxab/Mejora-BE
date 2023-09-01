import { useState } from "react"
import { useDispatch } from "react-redux"
import ListTitle from "../list_title"
import {color} from "../../others/others_colors"
import SessionValidation from "../../others/sessionValidation"



const BusinessCodes = () =>{
    const [stdbgHighlight,setstdbgHighlight] = useState(999)
    const dispatch = useDispatch();

    const contents = [
        {name:"Code", desc:"Business Names", table:'code',s1:'code',s2:'codedesc',s3:'codedesc',col:[{name:'id',disp:'ID',dim:'10%'},{name:'code',disp:'Code',dim:'20%'},{name:'codedesc',disp:'Business Unit',dim:'50%'},{name:'status',disp:'Status',dim:'20%'}]}
    ]

    const clicked = (data,i) =>{
        setstdbgHighlight(i)
        dispatch({type:'BODYCONTENTS_ADD',payload:data})
        
    }


    return <div>
        <SessionValidation/>
        <ListTitle title="Select Item"/>

        {
            contents.map((item,index)=>(
                <div onClick={()=>clicked(item,index)} key={index} 
                    className={ stdbgHighlight===index?"stdbgHighlight  stdbgList":" stdbgList"} style={{height:'60px',display:'flex',justifyContent:'flex-start'}}>
                    <div style={{display:'flex',margin:"auto 5px auto 20px",borderRadius:'5px',background:`${color(item.name)[0]}`,color:'#fff',height:'40px',width:'40px'}}>
                        <div style={{display:'flex',margin:'auto'}}><b>{item.name.slice(0,2)}</b></div>
                    </div>
                    <div style={{display:'flex',margin:"auto auto auto 5px",border:'0px solid red',textAlign:'left',flexDirection:'column',width:'80%'}}>
                        <div style={{position:'relative',top:'7px'}}><b>{item.name}</b></div>
                        <div className="stdcolorblur" style={{margin:"auto 20px auto auto",fontSize:'small',textAlign:'right'}}>{item.desc.length>15?item.desc.slice(0,15)+"...":item.desc}</div>
                    </div>
                </div>
            ))
        }
    </div>
}

export default BusinessCodes