
/*
    (C) - Copyright 2023, All rights reserved
    Laxab Digital Solutions Private Limited, Pune - India

    Version 1, 30 May 2023 - Initial code
*/

// Standard imports
import { useEffect, useState } from "react"
// Components & Methods
import {icon} from '../../typeC/icons'

// Redux definitions
const { useSelector, useDispatch } = require("react-redux")


const Sidenav = (props) =>{

    // Primary Definitions
    const state     = useSelector((state)=>state)
    const dispatch  = useDispatch()

    //Secondary Definitions
    const [selected,setselected] = useState(100)
    
    // Onload useEffect
    /*
    useEffect(()=>{
        console.log(props.sidenav)
    },[props])
    */

    // Business methods
    const toggle = () =>{
        props.setsidenav(!props.sidenav)
        dispatch({type:'INCREMENT'});
    }
    const displayButtonNames = (name) => {
        return(
            <div className='buttonName'>{name}</div>
        )
    }
    const selectMenu = (data,index) => {
        dispatch({type:'SELECTMENU',payload:data})
        dispatch({type:'LIST',list:data.isMenu.name})
        setselected(index)
    }
    const logo = (sidenavStatus) =>{
        if(sidenavStatus === 1)
            return(
                <div style={{width:'40px',height:'40px',borderRadius:'5px',padding:'3px 5px 5px',display:'flex',justifyContent:'center'}}>
                    <div style={{display:'flex',margin:'auto 0px auto',position:'relative',top:'-6px',left:'-1px',fontSize:'40px',color:'#fff',fontFamily:'logo'}}>be</div>
                </div>
            )
        else
            return(
                <div style={{width:'40px',height:'40px',borderRadius:'5px',padding:'3px 5px 5px',display:'flex',justifyContent:'center'}}>
                    <div style={{display:'flex',margin:'auto 0px auto',position:'relative',top:'-6px',left:'-1px',fontSize:'40px',color:'#fff',fontFamily:'logo'}}>be</div>
                </div>
            )
    }

    // Return JSX
    return <div className={props.sidenav ? 'sidenavBodyMax' : 'sidenavBodyMin'} style={{display:'flex',flexDirection:'column'}} >
        <div onClick={()=>toggle()}>

            <div className='sidenavBorder' style={{display:'flex',cursor:'pointer',margin:'4px 0px 4px'}}>
                {
                    !props.sidenav
                    &&
                    <div className='buttonIcon'>{logo(2)}</div>
                }
                {
                    props.sidenav
                    &&
                    <div className='buttonName' style={{width:'100%',fontFamily:'logo', fontSize:'25px',paddingTop:'3px',color:'#fff',justifyContent:'center'}}>Business Exp</div>
                }
            </div>

        </div>
        <div className="sidenavSeparation scrollbarType1">
        {
            state.sidenav && state.sidenav.map((data, index) => (
                <div 
                    key={index} 
                    className={index === selected ? 'buttonhighlight' : 'button'}
                    onClick={()=>selectMenu(data,index)} 
                >
                    {
                        data.position==="top"
                        &&
                        <>
                            <div className='buttonIcon'>{icon(data.name)}</div>
                            {
                                props.sidenav
                                &&
                                displayButtonNames(data.name)
                            }
                        </>
                    }
                </div>
            ))
        }
        </div>
        <div style={{marginTop:'auto'}}>
        {
            state.sidenav && state.sidenav.map((data, index) => (
                <div 
                    key={index} 
                    className={index === selected ? 'buttonhighlight' : 'button'}
                    onClick={()=>selectMenu(data,index)} 
                >
                    {
                        data.position==="bottom"
                        &&
                        <>
                            <div className='buttonIcon'>{icon(data.name)}</div>
                            {
                                props.sidenav
                                &&
                                displayButtonNames(data.name)
                            }
                        </>
                    }
                </div>
            ))
        }

        </div>
    </div>
}

export default Sidenav