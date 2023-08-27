import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import fetchData from "../../others/fetchData"


const BodyPatientRecord = () =>{

    const state = useSelector(state => state)

    const [results,setresults] = useState([])

    useEffect(()=>{

        const getData = async() =>{
            const uri = 'api/be/std_userInteraction/beAssessment'
            const body = {
                "sid": state.loginData.sid,
                "bu": "GreyInsights",
                "request": "DBA_Select",
                "userid":state.bodyContents.userid,
                "Date":state.bodyContents.Date,
                "form":state.bodyContents.form
            }
            const response = await fetchData (uri,body)
            setresults(response)
        }
        getData()
    },[state.bodyContents])

    return <div>
        {
            results?.status==="success" &&
            <div style={{}}>
                <pre style={{textAlign:'left'}}>
                    {//JSON.stringify(state.bodyContents,2,2)}
                    }
                    Response: {JSON.stringify(results,2,2)}
                </pre>

            </div>
        }
    </div>
}

export default BodyPatientRecord