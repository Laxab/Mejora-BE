import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ImSun } from "react-icons/im";
import { IoIosContrast, IoMdMoon } from "react-icons/io";
import { WiMoonAltNew } from "react-icons/wi";



const AccountSettingTheme = () =>{

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [a,seta] = useState()

    const switchTheme = (input) =>{
        dispatch({type:'CHANGETHEME',payload:input})
    }

    return <div style={{margin:'0px auto auto auto'}}>
        <div style={{margin:'20px',padding:'20px',borderRadius:'5px'}}>
            <h2 style={{marginBottom:'20px'}}>Theme</h2>
            Select themes from below
            <div style={{display:'flex'}}>
                <ImSun 
                    onClick={()=>switchTheme('lightMode')}
                    className={state.theme==="lightMode" ? "titleButtonFirst_disabled" : "titleButtonFirst"}
                    style={{padding:'20px 20px',border:'0px',margin:'10px 5px auto auto',borderRadius:'10px',fontSize:'60px',fontWeight:'bolder'}}
                />
                <IoMdMoon 
                    onClick={()=>switchTheme('darkMode')}
                    className={state.theme==="darkMode" ? "titleButtonFirst_disabled" : "titleButtonFirst"}
                    style={{padding:'20px 20px',border:'0px',margin:'10px 5px auto 5px',borderRadius:'10px',fontSize:'60px',fontWeight:'bolder'}}
                />
                <WiMoonAltNew 
                    onClick={()=>switchTheme('darkContrast')}
                    className={state.theme==="darkContrast" ? "titleButtonFirst_disabled" : "titleButtonFirst"}
                    style={{padding:'20px 20px',border:'0px',margin:'10px auto auto 5px',borderRadius:'10px',fontSize:'60px',fontWeight:'bolder'}}
                />
            </div>
        </div>
    </div>
}
export default AccountSettingTheme