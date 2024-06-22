import { useEffect, useState } from 'react'
// Components and Methods
import {icon} from '../../typeC/icons'
import { LuSettings } from 'react-icons/lu';
import {checkSubComponent} from '../../../businessComponents/others/roleChecks';
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineMinimize } from "react-icons/md";
import { LuMaximize } from "react-icons/lu";
const { ipcRenderer } = window.require('electron');

// Redux definitions
const { useSelector, useDispatch } = require("react-redux")


// ------------ Important Parameters ------------
const buttonsLimit = 2

const Title = () =>{

    // Primary Definitions
    const state     = useSelector((state)=>state)
    const dispatch  = useDispatch()

    // Secondary Definitions
    const [temp,settemp] = useState(0)
    const [menuVisible,setmenuVisible] = useState(false)


    useEffect(()=>{
        settemp(0)
    },[state.selectedMenu.menu])
    // Business Methods
    const clickButton = (data,i) => {
        //alert(data)
        dispatch({type:'SELECTMENUBUTTON',payload:data})
        dispatch({type:'LIST',list:data.name})
        if(i>buttonsLimit) 
            settemp(1)
        else 
            settemp(0)
    }


    const closeWindow = () => {
        const confirmClose = window.confirm("Are you sure you want to close this application?");
        
        if (confirmClose) {
            // User confirmed, send close message to main process
            ipcRenderer.send('close');
        }
    };

    const selectDynamic = (data) =>{
        alert(data);
        const dynamicContents = ["mejoraDefault","mejoraA3"]
        if(dynamicContents?.includes(data)) {return true;}
        else return false
    }


    return <div className='dragOn'>
        {
            state.selectedMenu.name
            &&
            <div className='mainTitle stdBorder' style={{display:'flex',borderTop:'0px',borderLeft:'0px',borderRight:'0px'}}>
                <div className='mainTitleIcons' style={{fontSize:'24px'}}>
                    <div className='mainTitleIconsHolder'>
                        <div style={{display:'flex',alignItems:'center',margin:'auto 0px auto',color:'#fff'}}>{icon(state.selectedMenu.icon)}</div>
                    </div>
                </div>
                <div className='mainTitleIcons' style={{fontWeight:'bold',marginRight:'20px',paddingTop:'3px',height:'57px'}}>
                    <h3>{state.selectedMenu.name}</h3>
                </div>

                
                {
                    selectDynamic(state?.selectedMenu?.dynamic)
                    ?
                    state?.bodyContents?.rbac?.map((data,index) => {
                        if(data.name)
                            return <div className='dragOff' key={index}>
                                {
                                    checkSubComponent(state?.sidenav, state?.selectedMenu, state?.bodyContents?.name, data.name)
                                    &&
                                    state.selectedMenu.isMenu
                                    &&
                                    state.selectedMenu.isMenu.name
                                    &&
                                    index <= buttonsLimit
                                    &&
                                    <div className={state.selectedMenu.isMenu.name===data.name ? 'mainTitleButtonsSelected' : 'mainTitleButtons'} onClick={()=>clickButton(data,index)}>
                                        {data.name}
                                    </div>
                                }
                                </div>
                        else
                            return <div/>
                    })
                    :
                    state?.selectedMenu?.menu?.map((data,index) => {
                        if(data.name)
                            return <div className='dragOff' key={index}>
                                {
                                    checkSubComponent(state?.sidenav, state?.selectedMenu, state?.bodyContents?.name, data.name)
                                    &&
                                    state.selectedMenu.isMenu
                                    &&
                                    state.selectedMenu.isMenu.name
                                    &&
                                    index <= buttonsLimit
                                    &&
                                    <div className={state.selectedMenu.isMenu.name===data.name ? 'mainTitleButtonsSelected' : 'mainTitleButtons'} onClick={()=>clickButton(data,index)}>
                                        {data.name}
                                    </div>
                                }
                                </div>
                        else
                            return <div/>
                    })
                }
                {
                    temp === 1
                    &&
                    <div className='mainTitleButtonsSelected dragOff'>
                        {
                            state.selectedMenu.isMenu
                            &&
                            state.selectedMenu.isMenu.name
                            &&
                            state.selectedMenu.isMenu.name
                        }
                    </div>

                }
                {
                    selectDynamic(state?.selectedMenu?.dynamic)
                    ?
                    state?.bodyContents?.rbac?.length >3 
                    &&
                    <div className='mainTitleButtons dragOff' style={{borderBottom:'0px solid RED'}} onMouseEnter={()=>setmenuVisible(true)} onMouseLeave={()=>setmenuVisible(false)}>
                        <LuSettings style={{fontSize:'20px',padding:'0px',margin:'0px'}}/>
                        <div className={menuVisible ? 'mainTitleExtention' : 'mainTitleExtentionDisable'}>
                        {
                            state?.bodyContents?.rbac?.map((data,index) => (
                                <div key={index}>
                                {
                                    index > buttonsLimit
                                    &&
                                    <div className='mainTitleExtentionButtons' onClick={()=>clickButton(data,index)}>
                                        {data.name}
                                    </div>
                                }
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    :
                    state?.selectedMenu?.menu?.length >3 
                    &&
                    <div className='mainTitleButtons dragOff' style={{borderBottom:'0px solid RED'}} onMouseEnter={()=>setmenuVisible(true)} onMouseLeave={()=>setmenuVisible(false)}>
                        <LuSettings style={{fontSize:'20px',padding:'0px',margin:'0px'}}/>
                        <div className={menuVisible ? 'mainTitleExtention' : 'mainTitleExtentionDisable'}>
                        {
                            state.selectedMenu.menu
                            &&
                            state.selectedMenu.menu.map((data,index) => (
                                <div key={index}>
                                {
                                    index > buttonsLimit
                                    &&
                                    <div className='mainTitleExtentionButtons' onClick={()=>clickButton(data,index)}>
                                        {data.name}
                                    </div>
                                }
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    
                }
                <div className='dragOff' style={{margin:'auto 20px auto auto',display:'flex'}}>
                    <div onClick={()=>{ipcRenderer.send('minimize',[])}} className='topTitleButtonFirst' style={{fontSize:'15px',lineHeight:'0px'}}><MdOutlineMinimize /></div>
                    <div onClick={()=>{ipcRenderer.send('maximize',[])}}  className='topTitleButton' style={{fontSize:'15px',lineHeight:'0px'}}><LuMaximize /></div>
                    <div onClick={closeWindow} className='topTitleButtonLast' style={{fontSize:'15px',lineHeight:'0px'}}><IoCloseSharp /></div>
                </div>
            </div>
            
        }
    </div>
}

export default Title