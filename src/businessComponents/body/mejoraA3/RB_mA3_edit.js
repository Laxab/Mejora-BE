/*
+--------------------------------------------------------------------------------------------------------------------------------+
|                                                            M E J O R A                                                         |
|                                                        All rights reserved                                                     |
|                                                                                                                                |
| No part of this code and associated documentation files may be copied reproduced, distributed, or transmitted in any form      |
| or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written       |
| permission of the author, except  in the case of brief quotations embodied in critical reviews and certain other noncommercial |
| uses.                                                                                                                          |
| For permission requests, kindly contact the author.                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------+
Title:      Mejora Default - RightBar Edit Items
Overview: 	
            This is a destination component for RightBar
Usage:
            Global component to edit the elements based on the element structure set in redux "state.struct"

Author: 	Abhijit Sawant (abhijitmsawant@gmail.com)
Creation Date: 17 Nov 2023
*/
import { useForm } from "react-hook-form"
import {ValidateSQLInjection, ValidateSQLInjection_Weak} from "../../others/validations"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import fetchData from "../../others/fetchData"

const RB_mA3_edit = () =>{

    // Primary Definitions
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm();

    // Secondary Definitions
    const [triggeronce,settriggeronce] = useState(1);
    const initialState = state.struct.reduce((acc, field) => {
        acc[field.name] = field.name ;
        return acc;
      }, {});
    const [input, setinput] = useState(initialState);
    const [sel,setsel] = useState([])
      
    // CSS Definitions
    const stdDiv = {padding:'8px 0px 8px'}
    const stdDiv2 = {margin:'5px 0px 5px',width:'calc(100% - 20px)'}
    const stdDiv2a = {margin:'5px 0px 5px',width:'calc(100% - 0px)'}
    const [reqType,setreqType] = useState("add")

    const onSubmit = async () => {
        /**
         * Database write request for submitted form
         */
        var buName=state?.loginData?.identity?.buName ?? ""
        if(reqType==="update"){
            /**
             * Perform database Update for editing values
             */
            const putData = async (input,contents) =>{
                const url = 'api/be/v1.0/standard/update'
                const body = {
                    "sid": state.loginData.sid,
                    "request": "DBA_A3_Update",
                    "bu":buName,
                    "type":state.bodyContents.name,
                    "update":[input],
                    "condition":[{"id":input.id}],
                    "conditionType":"AND"
                }
                const response = await fetchData(url,body)
                if(response.status==="success"){
                    const logData = async()=>{
                        const url='api/be/v1.0/mejoradefault/logging';
                        const loggingBody = {
                            "sid": state.loginData.sid,
                            "username": state.loginData.identity.userid,
                            "user": state.loginData.identity.userName,
                            "dbTable":state.bodyContents.name,
                            "request": "DBA_A3_Select",
                            "logType":"Update",
                            "bu":buName,
                            "type":'logging',
                            "requestBody":body
                        }
                        await fetchData(url,loggingBody)
                    }
                    logData()
                    dispatch({type:'RESET',payload:"Now"})
                    dispatch({type:'RIGHTBAR_OFF'})
                }
                dispatch({type:'BACKDROP_OFF'})
            }
            dispatch({type:'BACKDROP_ON'})
            putData(input,state.rightBar.contents)

        }
    }

    const handlechange = async (e,type,datatype)  =>{
        /**
         * Handles the changes dynamically for each input elements in the form
         */
        if(datatype==="string")
            setinput(prev => ({...prev, [type]:e.target.value}))
        else if(datatype==="int")
            setinput(prev => ({...prev, [type]:parseInt(e?.target?.value)}))
        await trigger(e.target.name);
    }

    const fetchOptions = (item) =>{
        /**
         * Database read query
         * This method pulls the list of elements to be part of SELECT OPTIONS
         */
        if(triggeronce){
            settriggeronce(0)
            const asynccall = async() =>{
                dispatch({type:'BACKDROP_ON'})
                const uri='api/be/v1.0/standard/select';
                const body={
                    "sid": state.loginData.sid,
                    "request": "DBA_A3_Select",
                    "bu":state?.businessUnit,
                    "type":item.select_table,
                    "select":["DISTINCT "+item.select_column],
                    "condition":item.select_condition,
                    "conditionType":item.select_conditionType,
                    "order":{
                        "orderBy":item.select_orderBy,
                        "order":item.select_order
                    },
                    "pageNumber":1,
                    "pageSize":100
                }
                /*
                dispatch({type:'BACKDROP_ON'})
                const uri='api/be/v1.0/standard/select';
                const body={
                    "sid": state.loginData.sid,
                    "request": "DBA_A3_Select",
                    "bu":state?.businessUnit,
                    "type":item.select_table,
                    "select":[item.select_column],
                    "condition":[JSON.parse(item.select_condition)],
                    "conditionType":item.select_conditionType,
                    "order":{
                        "orderBy":item.select_orderBy,
                        "order":item.select_order
                    },
                    "pageNumber":1,
                    "pageSize":100
                }
                */
                const resp = await fetchData(uri,body)
                setsel(resp.data.response.dbData)
            } 
            asynccall()
            dispatch({type:'BACKDROP_OFF'})
            
        }
        //console.log(sel[0])
        
        return <>
            {
                sel.map((selitem,i)=>(
                    <option value={selitem[item.select_column]}>{selitem[item.select_column]}</option>
                ))
            }
        </>
    }

    const getOptions = (item) =>{
        /**
         * Create the OPTIONS structure for SELECT input field
         */
        return <>
            {
                item.select_options.map((selitem,i)=>(
                    <option value={selitem}>{selitem}</option>
                ))
            }
        </>
    }

    const [del,setDel] = useState(false)
    const deleteItem = () =>{
        /**
         * Warning before delete operation
         */
         setDel(window.confirm(`Are you sure you want to delete item = ${input.id}`))
    }

    const validators = (validations) =>{
        /**
         * Assigns validations to the input elements
         */
        if(validations === "ValidateSQLInjection") return ValidateSQLInjection
        else if(validations === "ValidateSQLInjection_Weak") return ValidateSQLInjection_Weak
        else return false
    }

    const renderForm = (struct) =>{
        /**
         * This method crafts the INPUT form elements based on the configured state.struct
         */
        return <div style={{textAlign:'left'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    /**
                     * Load the INPUT elements based on "state.struct" which is defined in redux
                     */
                    struct.map((item,i)=>{
                        if(item.input_type==="text"){
                            /**
                             * INPUT filed as text
                             */
                            return <div style={stdDiv}> 
                                <div>{item.input_title}</div>
                                <input 
                                    type='text' name={item.name}
                                    {
                                        ...register(
                                            item.name,
                                            {
                                                required:item.input_mandatory ? "Mandatory" : false,
                                                validate: validators(item.input_validations)
                                            }
                                        )
                                    }
                                    onKeyUp={(e)=>handlechange(e,item.name,item.input_datatype)} placeholder="Enter Form Name" style={stdDiv2}
                                    defaultValue={input.form}
                                />
                                {errors[item.name] && <div style={{color:'#F37512'}}>{errors[item.name].message}</div>}
                            </div>
                        }
                        else if(item.input_type==="textarea"){
                            /**
                             * INPUT filed as textarea
                             */
                            return <div style={stdDiv}> 
                                <div>{item.input_title}</div>
                                <pre><textarea 
                                    name={item.name} rows={10}
                                    {
                                        ...register(
                                            item.name,
                                            {
                                                required:item.input_mandatory ? "Mandatory" : false,
                                                validate: validators(item.input_validations)
                                            }
                                        )
                                    }
                                    onKeyUp={(e)=>handlechange(e,item.name,item.input_datatype)} placeholder="Enter Form Name" style={stdDiv2}
                                    defaultValue={JSON.stringify(input.form, null, 4)}
                                /></pre>
                                {errors[item.name] && <div style={{color:'#F37512'}}>{errors[item.name].message}</div>}
                            </div>
                        }
                        else if(item.input_type==="select"){
                            /**
                             * INPUT filed as select
                             */
                            return <div style={stdDiv}> 
                                <div>{item.input_title}</div>
                                <select onChange={(e)=>handlechange(e,item.name,item.input_datatype)}  style={stdDiv2a} >
                                    <option value={input[item.name]} selected>{input[item.name]}</option>
                                    {
                                        item.select_options===null
                                        ?
                                        fetchOptions(item)
                                        :
                                        getOptions(item)
                                    }
                                </select>
                                {errors.status && <div style={{color:'#F37512'}}>{errors.status.message}</div>}
                            </div>
                        }
                        else return <></>
                    })
                }
                <div style={{display:'flex'}}>
                    {/**
                     * Submit / Delete
                     */}
                    <button className="stdButton" onClick={handleSubmit(onSubmit)}> Save </button>
                    {
                        reqType!=="add" &&
                        <div className="stdButton0" onClick={() => deleteItem()} style={{marginLeft:'10px'}}> Delete </div>
                    }
                </div>
            </form>
        </div>
    }

    useEffect(()=>{
        /**
         * This useEffect initializes the values into "input"
         * -----Error Correction Note-----
         * Added to dependancies - state.struct
         * Using "// eslint-disable-next-line react-hooks/exhaustive-deps" to clear the input dependancy.
         */
        if(state.rightBar.contents){
            setreqType("update")
            const validateInputs = async() =>{
                const newInput = state.struct.reduce((input, field) => {
                    input[field.name] = state.rightBar.contents[field.name];
                    return input;
                  }, {});
                input['id'] = state.rightBar.contents['id'];
                setinput(prev => ({ ...prev, ...newInput }));
                for (const field of state.struct) {
                    const fieldName = field.name;
                    setValue(fieldName, state.rightBar.contents[fieldName]);
                    await trigger(fieldName);
                }
            }
            validateInputs()
        }
        else {
            setreqType("add");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.rightBar,setValue, trigger, state.struct])

    useEffect(()=>{
        /**
         * Database delete request
         * -----Error Correction Note-----
         * state.bodyContents.name added to dependancy
         */
        if(del){
            var buName=state?.loginData?.identity?.buName ?? ""
            const putData = async (input,contents) =>{
                const url = 'api/be/v1.0/standard/delete'
                const body = {
                    "sid": state.loginData.sid,
                    "request": "DBA_A3_Delete",
                    "bu":buName,
                    "type":state.bodyContents.name,
                    "condition":[{"id":input.id}],
                    "conditionType":"OR"
                }
                const response = await fetchData(url,body)
                if(response.status==="success"){
                    dispatch({type:'RESET',payload:"Now"})
                    dispatch({type:'RIGHTBAR_OFF'})
                    setDel(false)
                    const logData = async()=>{
                        const url='api/be/v1.0/mejoradefault/logging';
                        const loggingBody = {
                            "sid": state.loginData.sid,
                            "username": state.loginData.identity.userid,
                            "user": state.loginData.identity.userName,
                            "request": "DBA_A3_Select",
                            "dbTable":state.bodyContents.name,
                            "logType":"Delete",
                            "bu":buName,
                            "type":'logging',
                            "requestBody":body
                        }
                        await fetchData(url,loggingBody)
                    }
                    logData()
                }
                dispatch({type:'BACKDROP_OFF'})
            }
            dispatch({type:'BACKDROP_ON'})
            putData(input,state.rightBar.contents)

        }
    },[dispatch, input, del, state?.loginData?.identity?.buName, state.loginData.sid, state.rightBar.contents, state.bodyContents.name, state.loginData.identity.userName, state.loginData.identity.userid])

    return <div>
        <div>
            {renderForm(state.struct)}
        </div>
    </div>
}

export default RB_mA3_edit