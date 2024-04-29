

import Listings from "../mainbody/listings"
import Title from "../mainbody/titleBrowser"
//import TitleApp from "../mainbody/titleBrowser"
import Body from "../mainbody/body"
import { useEffect, useState } from "react"

const { useSelector, useDispatch } = require("react-redux")


// ------------ Important Parameters ------------
const defaultListingsSize="250px";

const Mainbody = (props) =>{

    // PRIMARY DEFINITIONS
    const state     = useSelector((state)=>state)
    const dispatch  = useDispatch()
    // Secondary Definitions
    const [size,setSize] = useState("")
    const [bodySize,setbodySize] = useState("")

    const isApp = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
    
    useEffect(()=>{
        try{
            if(state.selectedMenu.isMenu.size){
                setSize(state.selectedMenu.isMenu.size)
                setbodySize('calc(100% - '+state.selectedMenu.isMenu.size+')')
            }
            else{
                setSize(defaultListingsSize);
                setbodySize('calc(100% - '+defaultListingsSize+')');
            }
                
        }
        catch{}
    },[state.selectedMenu.isMenu])

    const checkListing = () =>{
        try{
            if(state.selectedMenu.isMenu.listing)
                return state.selectedMenu.isMenu.listing
            else
                return state.selectedMenu.menu[state.selectedMenu.isMenu].listing
        }
        catch{}
    }

    const home = {
        "name": "Home",
        "icon": "MdDashboard",
        "position": "top",
        "listing": true,
        "dynamic": false,
        "isMenu": {
          "name": "About",
          "listing": false,
          "size": "280px"
        },
        "menu": [
          {
            "name": "About",
            "listing": false,
            "size": "280px"
          }
        ]
      }

    return <>
        {
            state.selectedMenu.name
            ?
            <div className={props.sidenav ? 'mainbodyMin' : 'mainbodyMax'}>
                <Listings size={size}/>
                {
                    checkListing()
                    ?
                    <div className='mainbody'  style={{width:bodySize}}>
                        {
                            isApp
                            ?
                            <Title style={{zIndex:'99'}}/>
                            :
                            <Title style={{zIndex:'99'}}/>
                        }
                        <Body/>
                    </div>
                    :
                    <div className='mainbodyToggle'>
                        <Title style={{zIndex:'99'}}/>
                        <Body/>
                    </div>
                }
            </div>
            :
            dispatch({type:'SELECTMENU',payload:home})
        }
    </>
}

export default Mainbody