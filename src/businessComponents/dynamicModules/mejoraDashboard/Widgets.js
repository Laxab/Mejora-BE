import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import fetchData from "../../others/fetchData"
import { RenderChart } from "../mejoraAnalytics/analyticsComponents/recharts"

const Widgets = (props) =>{
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [res,setres] = useState([])
    const {group,name} = props
    const [reportData,setReportData] = useState([])


    useEffect(()=>{
        const getListingData = async (group, name) =>{
            dispatch({type:'BACKDROP_ON'})
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
                const loadReportContents = async () =>{
                    const url2 = 'api/be/analytics/getReportData'
                    const body2 = {
                        "sid": state.loginData.sid,
                        "request": "DBA_Select",
                        "bu":state?.loginData?.identity?.buName ?? "",
                        "type":response?.data[0]?.name,
                        "reportName":response?.data[0]?.name
                    }
                    const response2 = await fetchData(url2,body2)
                    if(response2.status==="success"){
                        setres(p => ({
                            ...p, [name]:{
                                "type": response.data,
                                "data": response2.data
                            }
                        }))
                    }
                }
                loadReportContents()
            }
        }
        getListingData(group, name)


        dispatch({type:'BACKDROP_OFF'})

    },[])




    return <div style={{display:'flex', width:'100%', margin:'auto auto 10px auto'}}>
            {
                res
                &&
                res[name]
                &&
                <div style={{width:'auto', margin:'auto'}}>
                    <RenderChart data={res[name]?.data} title={res[name]?.type[0]?.dispName} chartType={res[name]?.type[0]?.widget}/>
                </div>
            }
    </div>
}

export default Widgets