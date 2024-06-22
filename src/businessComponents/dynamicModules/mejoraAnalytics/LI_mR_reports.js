import { useDispatch, useSelector} from "react-redux"
import { RiAddLine } from 'react-icons/ri';
import { useEffect, useState } from "react";
import { color } from "../../others/others_colors";
import fetchData from "../../others/fetchData";
import SessionValidation from "../../others/sessionValidation";


const LI_mR_reports = () =>{
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [stdbgHighlight,setstdbgHighlight] = useState(999)
    const [selector,setselector] = useState(999)
    const [reportSearchText,setReportSearchText] = useState("");
    const [reportlist,setReportList] = useState([])


    useEffect(()=>{

        const getListingData = async () =>{

            const url = 'api/be/analytics/getReportNames'
            const body = {
                "sid": state.loginData.sid,
                "request": "DBA_Select",
                "bu":state?.loginData?.identity?.buName ?? "",
                "type":"businessLogic",
                "grouping":state?.selectedMenu?.grouping
            }
            const response = await fetchData(url,body)
            if(response.status==="success"){
                setReportList(response.data)
            }
        }
        getListingData()
        if(state.reset!=="") {
            if(state.reset==="BODYCONTENTS_OFF")
                dispatch({type:'BODYCONTENTS_OFF'});
            dispatch({type:'RESET',payload:""});
            
        }
    },[state.reset, state?.selectedMenu?.grouping])

    const onClickEvent = () =>{
        dispatch({type:"RIGHTBAR_ON",title:`Reports`, body:'RB_mA_addRepAdv', width:'500px',contents:'cols'})
    }

    const onChangeText = (e) =>{
        setReportSearchText(e.target.value)
    }

    const thisListingTitle = () => {
        return  <div 
                    className="stdBorder" 
                    style={{ borderTop:'0px',borderRight:'0px',borderLeft:'0px'
                    }}
                >
                    <div style={{margin:'auto',display:'flex'}}>
                        <div style={{width:'calc(100% - 60px)',height:'60px',display:'flex'}}>
                            <input 
                                name='reportSearchText'
                                className="nullInputText" 
                                type='text' 
                                style={{margin:'auto auto auto auto'}}
                                placeholder="Type to Search"
                                onChange={onChangeText}
                            />
                        </div>
                        {
                            state?.selectedMenu?.rbac?.add
                            &&
                            <div onClick={()=>onClickEvent()} className='listButton' style={{height:'52px',margin:'auto 0px auto auto',width:'60px',display:'flex'}}>
                                <div style={{margin:'auto'}}><RiAddLine style={{lineHeight:'0px', fontSize:'20px', marginTop:'5px'}}/></div>
                            </div>
                        }
                    </div>
                </div>
    }
    const clicked = (data,i) =>{
        setselector(i)
        let temp = []
        temp.push(data)
        
        if(data)
            dispatch({type:'BODYCONTENTS_ADD',payload:temp})
    }

    const thisListingContents = (data) =>{
        return <div className="scrollbarTypeDefault" style={{height:'calc(100vh - 65px)',overflow:'auto'}}>
        {
            data.map((item,index)=>(
                <div onClick={()=>clicked(item,index)} key={index} 
                    className={ stdbgHighlight===index?"stdbgHighlight  stdbgList":" stdbgList"} 
                    style={{height:'60px',display:'flex',justifyContent:'flex-start'}}
                >
                    <div style={{display:'flex',margin:"auto 5px auto 20px",borderRadius:'5px',background:`${color(item.name)[0]}`,color:'#fff',height:'40px',width:'40px'}}>
                        <div style={{display:'flex',margin:'auto', color:'#fff'}}><b>{item.name.slice(0,2)}</b></div>
                    </div>
                    <div style={{width:'220px'}}>
                        <div style={{height:'35px',display:'flex',margin:"auto auto auto 5px",textAlign:'left',flexDirection:'column'}}>
                            <div style={{position:'relative',top:'0px',margin:'auto auto 0px 0px'}}><b>{item.dispName}</b></div>
                        </div>
                        <div style={{display:'flex',margin:"auto auto auto 5px",border:'0px solid red',textAlign:'left',flexDirection:'column'}}>
                            <div style={{position:'relative',top:'0px',fontSize:'small',margin:'auto 10px auto auto'}}>{item.widget}</div>
                        </div>

                    </div>
                </div>
            ))
        }
        </div>
    }


    useEffect(()=>{
        setstdbgHighlight(selector)
    },[selector])
    useEffect(()=>{
        setstdbgHighlight(999)
    },[state.selectedMenu.name])

    const listingContentChecks = () =>{
        if(reportSearchText?.length===0)
            return thisListingContents(reportlist)
        else
            return thisListingContents(
                    reportlist.filter(
                        item => item?.name?.toLowerCase()?.includes(
                                reportSearchText?.toLocaleLowerCase()
                            )
                    )
                )
    }

    return <div>
        <SessionValidation/>
        {thisListingTitle()}
        {listingContentChecks()}
    </div>
}
export default LI_mR_reports