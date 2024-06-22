

// Standard imports
import { useState } from "react"
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
            <div className='buttonName' style={{marginLeft:'-5px',border:'0px dashed pink',width:'122px'}}>{name}</div>
        )
    }
    const selectMenu = (data,index) => {
        dispatch({type:'SELECTMENU',payload:data})
        dispatch({type:'BODYCONTENTS_OFF'})
        dispatch({type:'LIST',list:data.isMenu.name})
        setselected(index)
    }
    const logo = (sidenavStatus) =>{
        if(sidenavStatus === 1)
            return(
                <div style={{width:'40px',height:'40px',borderRadius:'5px',padding:'3px 5px 5px',display:'flex',justifyContent:'center'}}>
                    <div style={{display:'flex',margin:'auto 0px auto',position:'relative',top:'-6px',left:'-1px',fontSize:state.sidenavSmallLogoSize,color:'#fff',fontFamily:'logo'}}>{state.businessNameShort}</div>
                </div>
            )
        else
            return(
                <div style={{width:'40px',height:'40px',borderRadius:'5px',padding:'3px 5px 5px',display:'flex',justifyContent:'center'}}>
                    <div style={{display:'flex',margin:'auto 0px auto',position:'relative',top:'-6px',left:'-1px',fontSize:state.sidenavSmallLogoSize,color:'#fff',fontFamily:'logo'}}>
                        <div style={{color:'#fff'}}>{state.businessNameShort}</div>
                    </div>
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
                    <div className='buttonName' style={{width:'100%',fontFamily:'logo', fontSize:state.sidenavLongLogoSize,paddingTop:'3px',color:'#fff',justifyContent:'center'}}>{state.businessName}</div>
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
                        <div style={{display:'flex',margin:'auto'}}>
                            <div className='buttonIcon' style={{width:'35px',marginLeft:'5px'}}>{icon(data.icon)}</div>
                            <div style={{border:'0px dashed red',paddingLeft:'11px',paddingTop:'2px'}}>
                            {
                                props.sidenav
                                &&
                                displayButtonNames(data.name)
                            }
                            
                            </div>
                        </div>
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
                            <div className='buttonIcon' style={{marginLeft:'-5px'}}>{icon(data.icon)}</div>
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