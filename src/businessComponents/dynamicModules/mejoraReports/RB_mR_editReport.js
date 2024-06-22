import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../../others/fetchData";
import {ButtonIcon} from "../../others/stdComponents/buttonIcon";
import MonacoEditor from 'react-monaco-editor';

const RB_mR_addReport = () =>{

    /***
     * -------------------- All Definitions --------------------
     */
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const stdDiv2a = {margin:'5px 0px 5px',width:'calc(100% - 0px)'};
    const stdDiv3a = {margin:'5px 0px 5px',width:'calc(100% - 20px)'};
    const stdDiv = {padding:'8px 0px 8px'};
    const { register, handleSubmit,formState: {errors}, trigger } = useForm();
    const [database,setDatabase] = useState([])
    const [tableDesc,setTableDesc] = useState([])
    const [tableDesc2,setTableDesc2] = useState([])
    const [tableDesc3,setTableDesc3] = useState([])
    const [queryDisp,setQueryDisp] = useState([])
    const [queryCondition,setQueryCondition] = useState([])
    const [queryGroup,setQueryGroup] = useState([])
    const [finalResponse,setFinalResponse] = useState()
    const allKeys = ["selectDatabase","selectTable","tableDesc","reportName"]
    const [tableNames,setTableNames] = useState([
        {name:'Select Value', value:'', selected:true}
    ])
    //const initialState = JSON.parse(state?.bodyContents[0]?.input);
    const initialState = {
        reportName: state?.bodyContents[0]?.dispName,
        query: state?.bodyContents[0]?.advUnfilteredQuery,
    };
    const [input, setinput] = useState(initialState);
    const [db,setDb] = useState("");
    const [advQuery,setAdvQuery] = useState(initialState);
    const [advQueryFiltered,setAdvQueryFiltered] = useState("");



    /***
     * -------------------- All Definitions --------------------
     * Handles the changes dynamically for each input elements 
     * in the form
     */
    const handlechange = async (e, name, input_datatype, dbcallrequest=null) =>{
        if(input_datatype==="string")
            setinput(prev => ({...prev, [name]:e.target.value}))
        else if(input_datatype==="int")
            setinput(prev => ({...prev, [name]:parseInt(e?.target?.value)}))
        await trigger(e.target.name);
    }


    /***
     * -------------------- Form Submission --------------------
     * This method validates the entries and submits the details
     * to the API
     */
    const onSubmit = async () => {
        var flag = true
        var failureMessage=""
        if(advQuery.hasOwnProperty('reportName')) {}
        else {
            flag = false
            failureMessage="Enter Report Name"
        }
        if(advQuery.hasOwnProperty('query')) {}
        else {
            flag = false
            failureMessage="Enter Query"
        }
        if((advQuery?.reportName==="")||(advQuery?.query==="")||(advQuery?.reportName===null)||(advQuery?.query===null)) {
            flag = false
            failureMessage="Invalid contents"
        }
        if(flag){
            dispatch({type:'BACKDROP_ON'})
            const apiSendData = async () =>{
                const url = 'api/be/reports/editReportAdvanced'
                const body = {
                    "sid": state.loginData.sid,
                    "request": "DBA_Select",
                    "bu":state?.loginData?.identity?.buName ?? "",
                    "input":advQuery
                }
                const response = await fetchData(url,body)
                setFinalResponse(response)
                dispatch({type:'BACKDROP_OFF'})
                dispatch({ type: 'RESET', payload: "Now" });
            }
            apiSendData()
        }
        else alert(failureMessage)
    }


    const deletethis = () =>{
        let confirmation = window.confirm("Are you sure you want to delete this report?")
        if(confirmation){
            dispatch({type:'BACKDROP_ON'})
            const apiSendData = async () =>{
                const url = 'api/be/reports/deleteReport'
                const body = {
                    "sid": state.loginData.sid,
                    "request": "DBA_Select",
                    "bu":state?.loginData?.identity?.buName ?? "",
                    "reportName":state?.bodyContents[0]?.name,
                    "type":"businessLogic"
                }
                const response = await fetchData(url,body)
                if(response.status==="success"){
                    setFinalResponse(response)
                    dispatch({type:'BACKDROP_OFF'})
                    dispatch({ type: 'RESET', payload: "BODYCONTENTS_OFF" });
                    dispatch({type:'RIGHTBAR_OFF'})
                }
                else{
                    dispatch({type:'BACKDROP_OFF'})
                    setFinalResponse(response)
                }
            }
            apiSendData()
        }
    }

    const harmfulSqliPatterns = [
        /;--/, // SQL comment sequence
        /\UNION\b/i,
        /\bINSERT\b/i,
        /\bUPDATE\b/i,
        /\bDELETE\b/i,
        /\bDROP\b/i,
        /\bALTER\b/i,
        /\bCREATE\b/i,
        /\bEXEC\b/i,
        /\bEXECUTE\b/i,
      ];
    const checkSqlQuery = (data) =>{
        data = data.replace(/\[/g,"'").replace(/\]/g,"'")

        let queryAdv = 'select '+data
        let checks=true;
        for(const pattern of harmfulSqliPatterns){
            if(pattern.test(data))
                checks = false
        }
        if(checks)
            setAdvQueryFiltered(queryAdv)
        else
            setAdvQueryFiltered(queryAdv)
    }
    const handleAdvancedChange = async(e, name, input_datatype)=>{
        if(input_datatype==="string")
            setAdvQuery(prev => ({...prev, [name]:e.target.value}))
        
        if((e.target.value) && (name==="query"))
            checkSqlQuery(e.target.value)
    }



    /***
     * -------------------- JSX Return --------------------
     */
    return <div style={{textAlign:'left'}}>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div style={stdDiv}>
                <div>Report Name</div>
                <input 
                        style={stdDiv3a}
                        onChange={(e)=>handleAdvancedChange(e,'reportName', 'string')}
                        name='reportName'
                        value={state?.bodyContents[0]?.dispName}
                        disabled
                />
                {errors['reportName'] && <div style={{color:'#F37512'}}>Error in Report Name</div>}
            </div>

            <div>Enter Query</div>
            <textarea
                width="450"
                height="580"
                rows="10"
                style={stdDiv3a} name='queryTextArea' 
                className={'stdBorder'}
                defaultValue={state?.bodyContents[0]?.advUnfilteredQuery}
                onChange={(e)=>handleAdvancedChange(e,'query','string')}
            />

            <div style={{marginBottom:'8px'}}>Ensure that the query does not include any sqli parameters, otherwise the request will be dropped. Only select queries are accepted, however, do not include 'select' word at the beginning.</div>
            <div style={{marginBottom:'8px'}}><i>{advQueryFiltered}</i></div>
        </form>

        <div style={{display:'flex'}}>
            <button style={{marginRight:'10px'}} className="stdButton" onClick={handleSubmit(onSubmit)}>Save</button>
            <button className="stdButton0" onClick={()=>deletethis()}>Delete</button>
        </div>
        
        <div style={{textAlign:'left', width:'calc(100% - 0px)',overflow:'auto', marginTop:'8px'}}>
            {
                finalResponse?.status!=="fail"
                &&
                finalResponse
                &&
                <div className="txt1">Report created successfully</div>
            }
            {
                finalResponse?.status==="fail"
                &&
                <div className="txt0">{finalResponse?.message}</div>
            }
        </div>

    </div>
}

export default RB_mR_addReport