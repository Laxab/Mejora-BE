import { useDispatch, useSelector } from "react-redux"
import { ImSun } from "react-icons/im";
import { IoMdMoon } from "react-icons/io";
import { WiMoonAltNew } from "react-icons/wi";
import fetchData from "../../others/fetchData";


const AccountSettingTheme = () =>{

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const switchTheme = (input) =>{

        dispatch({type:'BACKDROP_ON'})
        const updateTheme = async () => {
            var uri = 'api/be/v1.0/a3/updateTheme';
            var body = {
            "sid":state.loginData.sid,
            "request": "getRBAC",
            "bu":state?.businessUnit,
            "theme":input
            };
            const data = await fetchData(uri,body,'');
            try{
            if(data.status==="success"){
                if(data?.data?.theme){
                    dispatch({type:'CHANGETHEME',payload:data?.data?.theme});
                }
            }
            dispatch({type:'BACKDROP_OFF'})
            }
            catch (error) {
                dispatch({type:'BACKDROP_OFF'})
            }
        };
        updateTheme();
        
    }

    const clickEvent = (data) =>{
        const themeName = data.toUpperCase();
        if(state.theme!==data){
            switchTheme(data)
        }
        else{
            alert(`'${themeName}' is already applied`)
        }
    }

    return <div style={{margin:'0px auto auto auto'}}>
        <div style={{margin:'20px',padding:'20px',borderRadius:'5px'}}>
            <h2 style={{marginBottom:'20px'}}>Theme</h2>
            Select themes from below
            <div style={{display:'flex'}}>
                <ImSun 
                    onClick={()=>clickEvent('lightMode')}
                    className={state.theme==="lightMode" ? "titleButtonFirst_disabled" : "titleButtonFirst"}
                    style={{padding:'20px 20px',border:'0px',margin:'10px 5px auto auto',borderRadius:'10px',fontSize:'60px',fontWeight:'bolder'}}
                />
                <IoMdMoon 
                    onClick={()=>clickEvent('darkMode')}
                    className={state.theme==="darkMode" ? "titleButtonFirst_disabled" : "titleButtonFirst"}
                    style={{padding:'20px 20px',border:'0px',margin:'10px 5px auto 5px',borderRadius:'10px',fontSize:'60px',fontWeight:'bolder'}}
                />
                <WiMoonAltNew 
                    onClick={()=>clickEvent('darkContrast')}
                    className={state.theme==="darkContrast" ? "titleButtonFirst_disabled" : "titleButtonFirst"}
                    style={{padding:'20px 20px',border:'0px',margin:'10px auto auto 5px',borderRadius:'10px',fontSize:'60px',fontWeight:'bolder'}}
                />
            </div>
        </div>
    </div>
}
export default AccountSettingTheme