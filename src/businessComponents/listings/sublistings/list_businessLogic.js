import { useState } from "react"
import { useDispatch } from "react-redux"
import ListTitle from "../list_title"
import {color} from "../../others/others_colors"
import SessionValidation from "../../others/sessionValidation"



const BusinessLogic = () =>{
    const [stdbgHighlight,setstdbgHighlight] = useState(999)
    const dispatch = useDispatch();

    const contents = [
        {name:"Code", desc:"Business Names", table:'code',s1:'code',s2:'codedesc',s3:'codedesc',col:[{name:'id',disp:'ID',dim:'10%'},{name:'code',disp:'Code',dim:'20%'},{name:'codedesc',disp:'Business Unit',dim:'50%'},{name:'status',disp:'Status',dim:'20%'}]},
        {name:"Forms", desc:"Test Plan", table:'forms',s1:'form',s2:'formdesc',s3:'formdesc',col:[{name:'id',disp:'ID',dim:'10%'},{name:'form',disp:'Form Name',dim:'20%'},{name:'formdesc',disp:'Description',dim:'50%'},{name:'status',disp:'Status',dim:'10%'},{name:'formLang',disp:'Language',dim:'10%'}]},
        {name:"CoI", desc:"Category of Interpretation", table:'coi',s1:'form',s2:'description',s3:'comments',col:[{name:'id',disp:'ID',dim:'10%'}, {name:'form',disp:'Form',dim:'20%'}, {name:'start',disp:'ST',dim:'5%'}, {name:'end',disp:'EN',dim:'5%'}, {name:'description',disp:'Description',dim:'20%'}, {name:'comments',disp:'Comments',dim:'20%'}, {name:'status',disp:'Status',dim:'10%'}, {name:'language',disp:'Language',dim:'10%'}]},
        {name:"Quiz", desc:"Patient Assessmnt Questions", table:'quiz',s1:'form',s2:'question',s3:'question',col:[{name:'id',disp:'ID',dim:'10%'}, {name:'form',disp:'Form',dim:'20%'}, {name:'question',disp:'Question',dim:'50%'}, {name:'status',disp:'Status',dim:'10%'}, {name:'language',disp:'Language',dim:'10%'}]},
        {name:"Mappings", desc:"User, Business & Forms", table:'Mappings',s1:'Form',s2:'Entity',s3:'Entity',col:[{name:'id',disp:'ID',dim:'5%'}, {name:'EntityType',disp:'Type',dim:'10%'}, {name:'Entity',disp:'Entity Name',dim:'40%'}, {name:'Form',disp:'Form Name',dim:'10%'}, {name:'AutoClear',disp:'AutoClear',dim:'5%'}, {name:'Status',disp:'Status',dim:'5%'}, {name:'Language',disp:'Lang',dim:'5%'}]},
        {name:"Weightage", desc:"Response analysis", table:'weightage',s1:'form',s2:'option',s3:'option',col:[{name:'id',disp:'ID',dim:'10%'}, {name:'form',disp:'Form',dim:'20%'}, {name:'option',disp:'Option',dim:'20%'}, {name:'weight',disp:'Weight',dim:'5%'}, {name:'comments',disp:'Comments',dim:'30%'}, {name:'status',disp:'Status',dim:'5%'}, {name:'language',disp:'Lang',dim:'5%'}]}
    ]

    const clicked = (data,i) =>{
        setstdbgHighlight(i)
        dispatch({type:'BODYCONTENTS_ADD',payload:data})
        
    }


    return <div>
        <SessionValidation/>
        <ListTitle title="Forms"/>

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

export default BusinessLogic