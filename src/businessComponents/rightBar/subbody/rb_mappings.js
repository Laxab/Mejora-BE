
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {ValidateSQLInjection} from "../../others/validations"
import fetchData from '../../others/fetchData';
import { useDispatch, useSelector } from 'react-redux';

const RbMappings = () =>{

    const state = useSelector(state=>state)
    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm();
    const [input,setinput] = useState({EntityType:"",Entity:"",Form:"",AutoClear:0,Status:0,id:"",Language:""})
    const dispatch = useDispatch()
    const stdDiv = {padding:'8px 0px 8px'}
    const stdDiv2 = {margin:'5px 0px 5px',width:'calc(100% - 20px)'}
    const stdDiv2a = {margin:'5px 0px 5px',width:'calc(100% - 0px)'}
    const [reqType,setreqType] = useState("add")
    const [apiRes,setapiRes] = useState("")


    useEffect(()=>{

        if(state.rightBar.contents){
            setreqType("update")
            const validateInputs = async() =>{

                setinput(prev => (
                    {
                        ...prev, 
                        id:state.rightBar.contents.id,
                        EntityType:state.rightBar.contents.EntityType,
                        Entity:state.rightBar.contents.Entity,
                        Form:state.rightBar.contents.Form,
                        AutoClear:state.rightBar.contents.AutoClear,
                        Status:state.rightBar.contents.Status,
                        Language:state.rightBar.contents.Language
                    }))
                setValue('id', state.rightBar.contents.id);
                setValue('EntityType', state.rightBar.contents.EntityType);
                setValue('Entity', state.rightBar.contents.Entity);
                setValue('Form', state.rightBar.contents.Form);
                setValue('AutoClear', state.rightBar.contents.AutoClear);
                setValue('Status', state.rightBar.contents.Status);
                setValue('Language', state.rightBar.contents.Language);
                await trigger("id");
                await trigger("EntityType");
                await trigger("Entity");
                await trigger("Form");
                await trigger("AutoClear");
                await trigger("Status");
                await trigger("Language");
            }
            validateInputs()
                
        }
        else {
            setreqType("add");
        }

    },[state.rightBar,setValue, trigger])

    const handlechange = async (e,type) =>{
        if (type==="EntityType"){
            setinput(prev => ({...prev, EntityType:e.target.value}))
            await trigger(e.target.name);
        }
        else if (type==="Entity"){
            setinput(prev => ({...prev, Entity:e?.target?.value}))
            await trigger(e.target.name);
        }
        else if (type==="Form"){
            setinput(prev => ({...prev, Form:e.target.value}))
            await trigger(e.target.name);
        }
        else if (type==="AutoClear"){
            setinput(prev => ({...prev, AutoClear:parseInt(e.target.value)}))
            await trigger(e.target.name);
        }
        else if (type==="Language"){
            setinput(prev => ({...prev, Language:e.target.value}))
            await trigger(e.target.name);
        }
        else if (type==="Status"){
            setinput(prev => ({...prev, Status:parseInt(e.target.value)}))
            await trigger(e.target.name);
        }
    }  

    const onSubmit = async (data) => {
        
        var buName=state?.loginData?.identity?.buName ?? ""

        if(reqType==="add"){
            const putData = async (input,contents) =>{
                const url = 'api/be/standard/insert'
                delete input.id
                const body = {
                    "sid": state.loginData.sid,
                    "request": "DBA_Insert",
                    "bu":buName,
                    "type":"Mappings",
                    "value":[[input]],
                    "key":"id"
                }
                const response = await fetchData(url,body)
                if(response.status==="success"){
                    dispatch({type:'RESET',payload:"Now"})
                    //dispatch({type:'BODYCONTENTS_ADD',payload:input})
                    dispatch({type:'RIGHTBAR_OFF'})
                }
                else setapiRes(response.message)
                dispatch({type:'BACKDROP_OFF'})
            }
            dispatch({type:'BACKDROP_ON'})
            putData(input,state.rightBar.contents)

        }
        else{
            const putData = async (input,contents) =>{
                const url = 'api/be/standard/update'
                const body = {
                    "sid": state.loginData.sid,
                    "request": "DBA_Update",
                    "bu":buName,
                    "type":"Mappings",
                    "update":[input],
                    "condition":[{"id":input.id}],
                    "conditionType":"AND"
                }
                const response = await fetchData(url,body)
                if(response.status==="success"){
                    dispatch({type:'RESET',payload:"Now"})
                    //dispatch({type:'BODYCONTENTS_ADD',payload:input})
                    dispatch({type:'RIGHTBAR_OFF'})
                }
                else setapiRes(response.message)
                dispatch({type:'BACKDROP_OFF'})
            }
            dispatch({type:'BACKDROP_ON'})
            putData(input,state.rightBar.contents)

        }

    }
    const [del,setDel] = useState(false)
        const deleteItem = () =>{
         setDel(window.confirm(`Are you sure you want to delete item = ${input.id}`))
    }
    useEffect(()=>{
        if(del){
            var buName=state?.loginData?.identity?.buName ?? ""
            const putData = async (input,contents) =>{
                const url = 'api/be/standard/delete'
                const body = {
                    "sid": state.loginData.sid,
                    "request": "DBA_Delete",
                    "bu":buName,
                    "type":"Mappings",
                    "condition":[{"id":input.id}],
                    "conditionType":"OR"
                }
                const response = await fetchData(url,body)
                if(response.status==="success"){
                    dispatch({type:'RESET',payload:"Now"})
                    //dispatch({type:'BODYCONTENTS_ADD',payload:input})
                    dispatch({type:'RIGHTBAR_OFF'})
                }
                else setapiRes(response.message)
                dispatch({type:'BACKDROP_OFF'})
            }
            dispatch({type:'BACKDROP_ON'})
            putData(input,state.rightBar.contents)

        }
    },[dispatch, input, del, state?.loginData?.identity?.buName, state.loginData.sid, state.rightBar.contents])


    const formHtml = () =>{
        return (
            
            <form onSubmit={handleSubmit(onSubmit)}>
                


                <div style={stdDiv}>
                    <div>Entity Type</div>
                    <input 
                        type='text' name='EntityType'
                        {...register('EntityType',{required:"Mandatory",validate: ValidateSQLInjection})}
                        onKeyUp={(e)=>handlechange(e,'EntityType')} placeholder="Enter Entity Type" style={stdDiv2}
                        defaultValue={input.EntityType}
                    />
                    {errors.EntityType && <div style={{color:'#F37512'}}>{errors.EntityType.message}</div>}
                </div>


                <div style={stdDiv}>
                    <div>Entity</div>
                    <input 
                        type='text' name='Entity'
                        {...register('Entity',{required:"Mandatory",validate: ValidateSQLInjection})}
                        onKeyUp={(e)=>handlechange(e,'Entity')} placeholder="Enter Entity" style={stdDiv2}
                        defaultValue={input.Entity}
                    />
                    {errors.Entity && <div style={{color:'#F37512'}}>{errors.Entity.message}</div>}
                </div>


                <div style={stdDiv}>
                    <div>Form</div>
                    <input 
                        type='text' name='Form'
                        {...register('Form',{required:"Mandatory",validate: ValidateSQLInjection})}
                        onKeyUp={(e)=>handlechange(e,'Form')} placeholder="Enter Form Name" style={stdDiv2}
                        defaultValue={input.Form}
                    />
                    {errors.Form && <div style={{color:'#F37512'}}>{errors.Form.message}</div>}
                </div>


                <div style={stdDiv}>
                    <div>Status</div>
                    <select onChange={(e)=>handlechange(e,'Status')}  style={stdDiv2a} >
                        <option value={input.Status} selected>{input.Status===1?"Enable":"Disable"}</option>
                        <option value={1}>Enable</option>
                        <option value={0}>Disable</option>
                    </select>
                    {errors.Status && <div style={{color:'#F37512'}}>{errors.Status.message}</div>}
                </div>


                <div style={stdDiv}>
                    <div>Language</div>
                    <select onChange={(e)=>handlechange(e,'Language')}  style={stdDiv2a} >
                        <option value={input.Language} selected>{input.Language}</option>
                        <option value="en">en</option>
                        <option value="fr">fr</option>
                        <option value="ar">ar</option>
                        <option value="hi">hi</option>
                    </select>
                    {errors.Language && <div style={{color:'#F37512'}}>{errors.Language.message}</div>}
                </div>


                <div style={stdDiv}>
                    <div>Auto Clear</div>
                    <input 
                        type='text' name='AutoClear'
                        {...register('AutoClear',{required:"Mandatory",validate: ValidateSQLInjection})}
                        onKeyUp={(e)=>handlechange(e,'AutoClear')} placeholder="Set Auto Clear Value" style={stdDiv2}
                        defaultValue={input.AutoClear}
                    />
                    {errors.AutoClear && <div style={{color:'#F37512'}}>{errors.AutoClear.message}</div>}
                </div>


                <div style={{display:'flex'}}>
                    <button className="stdButton" onClick={handleSubmit(onSubmit)}> Save </button>
                    {
                        reqType!=="add" &&
                        <div className="stdButton0" onClick={() => deleteItem()} style={{marginLeft:'10px'}}> Delete </div>
                    }
                </div>

            </form>
        )
    }

    return <div style={{textAlign:'left'}}>
            

    <div style={{padding:'10px'}}>


        {formHtml()}

        {
            apiRes!=="" &&
            <div className='txt0' style={{marginTop:'20px'}}>Error - {apiRes}</div>
        }


    </div>

</div>
}

export default RbMappings