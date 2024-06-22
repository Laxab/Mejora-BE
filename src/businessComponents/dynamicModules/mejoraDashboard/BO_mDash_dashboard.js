import { useSelector } from "react-redux"
import fetchData from "../../others/fetchData"
import { useEffect, useState } from "react"
import Widgets from "./Widgets"

const BO_mDash_dashboard = () =>{

    const state = useSelector(state => state)
    const [dynamicStates, setDynamicStates] = useState({})
    const [jsonData, setjsonData] = useState([])

    useEffect(()=>{
        setjsonData(state?.selectedMenu?.analytics)
    },[])

    const [mainResp,setmainResp] = useState()
    useEffect(()=>{
        setmainResp()

        const getListingData = async (group, name) =>{
            const url = 'api/be/analytics/getReportNamesByName'
            const body = {
                "sid": state.loginData.sid,
                "request": "DBA_Select",
                "bu":state?.loginData?.identity?.buName ?? "",
                "type":"businessLogic",
                "grouping":group,
                "name":name
            }
            const response = await fetchData(url,body)
            if(response.status==="success"){
                setDynamicStates(p => ({
                    ...p, [name]:response.data
                }))
            }
            
        }
        
        

        const printError = (message) => {
            return <div style={{display:'flex'}}><div className="greyout" style={{margin:'auto auto 20px auto',padding:'15px 20px', borderRadius:'7px'}}>
                        {message}
                    </div></div>
        }


        const renderHostings = (data) =>{
            /*
            const returnContent = data.map((item,i)=>{
                getListingData(item?.grouping, item?.name)
                return <div style={{padding:'10px',margin:'auto auto auto auto',border:'1px dashed #888', borderRadius:'5px'}}>
                    <pre>{JSON.stringify(item,2,2)}</pre>
                    <pre>{JSON.stringify(item?.name,2,2)}</pre>
                    <pre>{JSON.stringify(dynamicStates[item?.name],2,2)}</pre>
                </div>
            })
            return <div style={{display:'flex', width:'89%', border:'0px dotted #999', margin:'auto auto 10px auto'}}>{returnContent}</div>
            */
            const returnContent = data.map((item,i)=>{
                return <Widgets group={item?.grouping} name={item?.name}/>
            })
            return <div style={{display:'flex', width:'1150px', border:'0px dotted #999', margin:'auto auto 10px auto'}}>{returnContent}</div>
            
        }

        const renderParent = (data) =>{
            let flag = true
            const mandatoryItems = ["width","display","type"]
            for(const item of mandatoryItems){
                if (data.hasOwnProperty(item)) {}
                else {
                    flag = false
                }
                if((data[item]===null)||(data[item]==="")){
                    flag = false
                }
            }
            if(flag){
                
                if(data["type"]==="parent") {
                    if (data["child"])
                        return renderParent(data["child"])
                    else
                        return printError("Error 132: No 'child' key in Dashboard JSON, please contact administrator")
                }
                else {
                    if(data["host"])
                        return renderHostings(data["host"])
                    else
                        return printError("Error 132: No 'host' key in Dashboard JSON, please contact administrator")
                }
                /*
                if(data["type"]==="parent") return <div>parent</div>
                else return <div>Hosted Components</div>*/
            }
            else{
                printError("Error 142: Invalid Dashboard JSON structure, please contact administrator")
            }
        }

        const handleData = (jsonData) => {
            const newElements = jsonData.map((element) => renderParent(element));
            setmainResp((p) => {
              if (Array.isArray(p))
                return [...p, ...newElements];
              else
                return [...newElements];
            });
          };
        handleData(jsonData)

    },[jsonData])



    


    return <div className="scrollbarTypeDefault" style={{padding:'20px 0px 20px 0px',width:'calc(100% - 0px)', overflow:'auto', height:'calc(100vh - 101px)'}}>
        
        {mainResp}

    </div>
}

export default BO_mDash_dashboard