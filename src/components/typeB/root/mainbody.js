

import Listings from "../mainbody/listings"
import Title from "../mainbody/title"
import Body from "../mainbody/body"
import Homepage from "../../typeA/homepage"
import { useEffect, useState } from "react"

const { useSelector } = require("react-redux")


// ------------ Important Parameters ------------
const defaultListingsSize="250px";

const Mainbody = (props) =>{

    // PRIMARY DEFINITIONS
    const state     = useSelector((state)=>state)
    // Secondary Definitions
    const [size,setSize] = useState("")
    const [bodySize,setbodySize] = useState("")
    
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
                        <Title style={{zIndex:'99'}}/>
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
            <Homepage/>
        }
    </>
}

export default Mainbody