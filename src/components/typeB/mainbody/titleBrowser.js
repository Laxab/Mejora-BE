import { useEffect, useState } from 'react'
// Components and Methods
import {icon} from '../../typeC/icons'
import { LuSettings } from 'react-icons/lu';
import {checkSubComponent} from '../../../businessComponents/others/roleChecks';

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
                    state?.selectedMenu?.dynamic !== false
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
                    state?.selectedMenu?.dynamic !== false
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
            </div>
            
        }
    </div>
}

export default Title