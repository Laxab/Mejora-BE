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
    const initialState = JSON.parse(state?.bodyContents[0]?.input);
    const [input, setinput] = useState(initialState);
    const [db,setDb] = useState("");

    /***
     * -------------------- Use Effect -------------------- 
     * This function presets the databases to be used, this 
     * needs to be replaced by the RBAC state entry.
     */
    useEffect(()=>{
        try{
            //setinput(JSON.parse(state?.bodyContents[0]?.input))
            apiGetTables(JSON.parse(state?.bodyContents[0]?.input)?.selectDatabase)
            apiGetDesc(JSON.parse(state?.bodyContents[0]?.input)?.selectTable)
            setDatabase([
                {name:`${JSON.parse(state?.bodyContents[0]?.input)?.selectDatabase}`, value:`${JSON.parse(state?.bodyContents[0]?.input)?.selectDatabase}`, selected:true}
            ]);
            setDb(JSON.parse(state?.bodyContents[0]?.input)?.selectDatabase)
        }
        catch{
            setDatabase([
                {name:'Select Value', value:'', selected:true},
                {name:'userAssessment', value:'userAssessment'},
                {name:'userInteraction', value:'userInteraction'},
                {name:'businessLogic', value:'businessLogic'}
            ]);

        }

    },[])


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

        if(dbcallrequest){
            if(dbcallrequest==="database"){
                apiGetTables(e?.target?.value)
                setDb(e?.target?.value)
            }
            if(dbcallrequest==="table")
                apiGetDesc(e?.target?.value)
        }

    }
    /***
     * These methods fetch the data from the API when the <select> value is changed for database
     */
    const apiGetTables = (database) =>{

        dispatch({type:'BACKDROP_ON'})
        const apiGetDatabasesCall = async () =>{
            const url = 'api/be/reports/getTables'
            const body = {
                "sid": state.loginData.sid,
                "request": "DBA_Select",
                "bu":state?.loginData?.identity?.buName ?? "",
                "type":database
            }
            const response = await fetchData(url,body)
            if(response?.data?.length !== 0){
                setTableNames(response.data)
                setinput(prev => ({...prev, ['selectTable']:""}))
                // eslint-disable-next-line no-console
                setinput(prev => ({...prev, ['tableDesc']:""}))
                // eslint-disable-next-line no-console
                setinput(prev => ({...prev, ['tableDesc2']:""}))
                setinput(prev => ({...prev, ['tableDesc3']:""}))
                setQueryDisp([])
                setQueryCondition([])
                setQueryGroup([])
                
            }
            dispatch({type:'BACKDROP_OFF'})
        }
        apiGetDatabasesCall()
    }
    /***
     * These methods fetch the data from the API when the <select> value is changed for table
     */
    const apiGetDesc = (table) =>{
        dispatch({type:'BACKDROP_ON'})
        const apiGetDatabasesCall = async () =>{
            const url = 'api/be/reports/getDesc'
            let thisDb = ""
            try{
                thisDb = JSON.parse(state?.bodyContents[0]?.input)?.selectDatabase;
            }
            catch{
                thisDb = db
            }
                
            const body = {
                "sid": state.loginData.sid,
                "request": "DBA_Select",
                "bu":state?.loginData?.identity?.buName ?? "",
                "type":thisDb,
                "sheet":table
            }
            const response = await fetchData(url,body)
            if(response?.data?.length !== 0){
                setTableDesc(response.data)
                setTableDesc2(response.data)
                setTableDesc3(response.data)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setinput(prev => ({...prev, ['tableDesc']:""}))
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setinput(prev => ({...prev, ['tableDesc2']:""}))
                setinput(prev => ({...prev, ['tableDesc3']:""}))
                setQueryDisp([])
                setQueryCondition([])
                setQueryGroup([])
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }
            dispatch({type:'BACKDROP_OFF'})
        }
        apiGetDatabasesCall()
    }
    useEffect(()=>{

        var filteredInput = Object.keys(input)
        .filter(key => !key.includes('Condition'))
        .reduce((obj, key) => {
          obj[key] = input[key];
          return obj;
        }, {});
        setinput(filteredInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[input.selectDatabase, input.selectTable])



    /***
     * -------------------- Form Submission --------------------
     * This method validates the entries and submits the details
     * to the API
     */
    const onSubmit = async () => {
        var flag = true
        var failureMessage=""
        if(input?.length !== 0)
            for(const item of allKeys){
                if (input.hasOwnProperty(item)) {}
                else {
                    flag = false
                    failureMessage="No items selected"
                }
                if((input[item]===null)||(input[item]==="")){
                    flag = false
                    failureMessage="You need to select all valid items"
                }
            }
        else{
            flag = false
            failureMessage="No items selected"
        }
        if(flag){
            dispatch({type:'BACKDROP_ON'})
            const apiSendData = async () =>{
                const url = 'api/be/reports/editReport'
                const body = {
                    "sid": state.loginData.sid,
                    "request": "DBA_Select",
                    "bu":state?.loginData?.identity?.buName ?? "",
                    "type":input.selectDatabase,
                    "sheet":input.selectTable,
                    "input":input,
                    "queryDisp":queryDisp,
                    "queryCondition":queryCondition,
                    "queryGroup":queryGroup
                }
                const response = await fetchData(url,body)
                setFinalResponse(response)
                dispatch({ type: 'RESET', payload: "Now" });
                dispatch({type:'BACKDROP_OFF'})
                dispatch({type:'RIGHTBAR_OFF'})
                dispatch({type:'BACKDROP_OFF'})
            }
            apiSendData()
        }
        else alert(failureMessage)
    }


    /***
     * -------------------- Load Select: Table Names --------------------
     */
    const loadSingleSelect = (tableNames,textToDisplay, selectType=null) =>{
        return  <div style={stdDiv}>
                    <div>{textToDisplay}*</div>
                    <select style={stdDiv2a} onChange={(e)=>handlechange(e,'selectTable', 'string', selectType)}>
                        {
                            tableNames.map((item,i)=>{
                                return <option key={i} value={item?.value}>{item?.name}</option>
                            })
                        }
                    </select>
                </div>
    }
    const removeElement = (valueToRemove,cond, indexValue = null) =>{
        if(cond === "queryDisp"){
            const filteredArray = queryDisp.filter(item => item !== valueToRemove);
            setQueryDisp(filteredArray);//setQueryCondition
        }
        else if(cond === "queryCondition"){
            var filteredArray = queryCondition.filter(item => item !== valueToRemove);
            setQueryCondition(filteredArray);
            
            var filteredInput = Object.keys(input)
            .filter(key => !key.includes(`Condition${indexValue}`))
            .reduce((obj, key) => {
              obj[key] = input[key];
              return obj;
            }, {});
            setinput(filteredInput);
        }
        else if(cond === "queryGroup"){
            const filteredArray = queryGroup.filter(item => item !== valueToRemove);
            setQueryGroup(filteredArray);//setQueryCondition
        }
    }
    const addElement = (valueToAdd, cond) =>{
        if(cond === "queryDisp"){
            if (!queryDisp.includes(valueToAdd)) {
                setQueryDisp([...queryDisp, valueToAdd]);
            }
        }
        else if(cond === "queryCondition"){
            if (!queryCondition.includes(valueToAdd)) {
                setQueryCondition([...queryCondition, valueToAdd]);
            }
        }
        else if(cond === "queryGroup"){
            if (!queryGroup.includes(valueToAdd)) {
                setQueryGroup([...queryGroup, valueToAdd]);
            }
        }
    }


    /***
     * -------------------- Load Select: Add elements to display --------------------
     */
    const loadMultipleSelect = (queryDisp,textToDisplay) =>{
        return  <div className="stdBorderDarken1" style={{margin:'8px 0 8px 0',padding:'8px'}}>
                    <div style={{paddingBottom:'8px'}}><b>{textToDisplay}</b></div>
                    <div style={{display:'flex', paddingBottom:'8px'}}>
                        <select style={{width:'200px'}} onChange={(e)=>handlechange(e,'tableDesc', 'string')}>
                            <option value='' selected>Select Value</option>
                            {
                                tableDesc.map((item,i)=>{
                                    if(item?.selected){
                                        return <option key={i} value={item?.value} disabled={input.tableDesc !== ''} selected={!input.tableDesc}>{item?.name}</option>
                                    }
                                    else
                                        return <option key={i} value={item?.value}>{item?.name}</option>
                                })
                            }
                            <option value='Count(*) as Count'>Count(*) as Count</option>
                        </select>
                        <div onClick={()=>addElement(input.tableDesc,"queryDisp")} style={{margin:'auto auto auto 0px'}}><ButtonIcon type={"add"} size={"30px"} style={{margin:'auto'}}/></div>
                    </div>
                    {
                        queryDisp?.length !==0
                        &&
                        <div style={{padding:'0px',marginTop:'8px'}}>
                            <div>Selected values to display from {input.selectTable}</div>
                            <div style={{display:'flex', flexWrap:'wrap', marginTop:'8px'}}>
                                {
                                    queryDisp.map((item,i)=>(
                                        <div    onClick={()=>removeElement(item,"queryDisp")} 
                                                className="stdbox stdTextColor" 
                                                style={{margin:'0 9px 9px 0',display:'flex'}} key={i}
                                        >
                                            <div>{item}</div>
                                            <ButtonIcon size={"20px"} type={"close"}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
    }


    /***
     * -------------------- Load Select: Add conditions --------------------
     */
    const loadQueryConditions = (queryCondition,textToDisplay) =>{
        return  <div className="stdBorderDarken1" style={{margin:'8px 0 8px 0',padding:'8px'}}>
                    <div style={{paddingBottom:'8px'}}><b>{textToDisplay}</b></div>
                    <div style={{display:'flex', paddingBottom:'8px'}}>
                        <select style={{width:'200px'}} onChange={(e)=>handlechange(e,'tableDesc2', 'string')}>
                            <option value='' selected>Select Value</option>
                            {
                                tableDesc2.map((item,i)=>{
                                    if(item?.selected){
                                        return <option key={i} value={item?.value} disabled={input.tableDesc2 !== ''} selected={!input.tableDesc2}>{item?.name}</option>
                                    }
                                    else
                                        return <option key={i} value={item?.value + '('+item?.type+')'}>`{item?.name} ({item?.type})`</option>
                                })
                            }
                        </select>
                        <div onClick={()=>addElement(input.tableDesc2, "queryCondition")} style={{margin:'auto auto auto 0px'}}><ButtonIcon size={"30px"} type={"add"} style={{margin:'auto'}}/></div>
                    </div>
                    {
                        queryCondition?.length !==0
                        &&
                        <div style={{padding:'0px',marginTop:'8px'}}>
                            <div>Selected values to display from {input.selectTable}</div>
                            <div style={{display:'flex', flexWrap:'wrap', flexDirection:'column', marginTop:'8px'}}>
                                {
                                    queryCondition.map((item,i)=>(
                                        <div style={{margin:'0 9px 9px 0',display:'flex'}} key={i}>
                                            {
                                                i!==0
                                                &&
                                                <div style={{marginRight:'8px'}}>
                                                    <select style={{width:'100px'}} onChange={(e)=>handlechange(e,`selectCondition${i}`,'string')}>
                                                        <option key="" selected>Select Value</option>
                                                        <option key="AND">AND</option>
                                                        <option key="OR">OR</option>
                                                        <option key="AND (">AND (</option>
                                                        <option key="OR (">OR (</option>
                                                        <option key="OR)">OR)</option>
                                                        <option key="AND)">AND)</option>
                                                    </select>
                                                </div>
                                            }
                                            <div    
                                                    className="stdbox stdTextColor" 
                                                    style={{display:'flex'}}
                                            >
                                                <div>{item}</div>
                                            </div>
                                            <div style={{margin:'auto 8px auto auto'}}>=</div>
                                            <input  style={{width:'100px',marginLeft:'0px'}} 
                                                    onChange={(e)=>handlechange(e,`inputCondition${i}`,'string')}
                                                    name={`inputCondition${i}`}
                                            />
                                            <div    onClick={()=>removeElement(item, "queryCondition",i)}
                                                    style={{margin:'auto 8px auto 3px'}}
                                            >
                                                <ButtonIcon size={"30px"} type={"close"}/>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
    }


    /***
     * -------------------- Load Select: Group By --------------------
     */
    const loadGrouBy = (queryGroup,textToDisplay) =>{
        return  <div className="stdBorderDarken1" style={{margin:'8px 0 8px 0',padding:'8px'}}>
                    <div style={{paddingBottom:'8px'}}><b>{textToDisplay}</b></div>
                    <div style={{display:'flex', paddingBottom:'8px'}}>
                        <select style={{width:'200px'}} onChange={(e)=>handlechange(e,'tableDesc3', 'string')}>
                            <option value='' selected>Select Value</option>
                            {
                                tableDesc3.map((item,i)=>{
                                    if(item?.selected){
                                        return <option key={i} value={item?.value} disabled={input.tableDesc3 !== ''} selected={!input.tableDesc3}>{item?.name}</option>
                                    }
                                    else
                                        return <option key={i} value={item?.value}>{item?.name}</option>
                                })
                            }
                        </select>
                        <div onClick={()=>addElement(input.tableDesc3,"queryGroup")} style={{margin:'auto auto auto 0px'}}><ButtonIcon type={"add"} size={"30px"} style={{margin:'auto'}}/></div>
                    </div>
                    {
                        queryGroup?.length !==0
                        &&
                        <div style={{padding:'0px',marginTop:'8px'}}>
                            <div>Selected values to display from {input.selectTable}</div>
                            <div style={{display:'flex', flexWrap:'wrap', marginTop:'8px'}}>
                                {
                                    queryGroup.map((item,i)=>(
                                        <div    onClick={()=>removeElement(item,"queryGroup")} 
                                                className="stdbox stdTextColor" 
                                                style={{margin:'0 9px 9px 0',display:'flex'}} key={i}
                                        >
                                            <div>{item}</div>
                                            <ButtonIcon size={"20px"} type={"close"}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
    }


    /***
     * -------------------- JSX Return --------------------
     */
    return <div style={{textAlign:'left'}}>
        <form onSubmit={handleSubmit(onSubmit)}>

            {/**
             * Input --- Database Name --- 'selectDatabase' --- 'string' ---
             */}



            <div style={stdDiv}>
                <div>Select Database</div>
                <select style={stdDiv2a} onChange={(e)=>handlechange(e,'selectDatabase', 'string','database')}>
                    {
                        database?.map((item,i)=>(
                            <option key={i} value={item.value}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            {loadSingleSelect(tableNames,"Select database table", 'table')}

            <div style={stdDiv}>
                <div>Report Name</div>
                <input 
                        style={stdDiv3a}
                        onChange={(e)=>handlechange(e,'reportName', 'string')}
                        name='reportName'
                        value={state?.bodyContents[0]?.dispName}
                        disabled
                />
                {errors['reportName'] && <div style={{color:'#F37512'}}>Error in Report Name</div>}
            </div>

            {loadMultipleSelect(queryDisp,"Add elements to display")}
            {loadQueryConditions(queryCondition,"Add conditions (Optional)")}
            {loadGrouBy(queryGroup,"Select Grouping (Optional)")}

            <button className="stdButton" onClick={handleSubmit(onSubmit)}>Create Report</button>
        </form>
        
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
        <pre style={{textAlign:'left'}}>
            {JSON.stringify(input,2,2)}
        </pre>
    </div>
}

export default RB_mR_addReport