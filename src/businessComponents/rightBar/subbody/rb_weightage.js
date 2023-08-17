
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {ValidateSQLInjection} from "../../others/validations"
import fetchData from '../../others/fetchData';
import { useDispatch, useSelector } from 'react-redux';

const RbWeightage = () =>{

    const state = useSelector(state=>state)
    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm();
    const [input,setinput] = useState({form:"",option:"",weight:0,comments:"",status:0,id:"",language:""})
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
                        form:state.rightBar.contents.form,
                        option:state.rightBar.contents.option,
                        status:state.rightBar.contents.status,
                        weight:state.rightBar.contents.weight,
                        comments:state.rightBar.contents.comments,
                        language:state.rightBar.contents.language
                    }))
                setValue('id', state.rightBar.contents.id);
                setValue('form', state.rightBar.contents.form);
                setValue('option', state.rightBar.contents.option);
                setValue('status', state.rightBar.contents.status);
                setValue('weight', state.rightBar.contents.weight);
                setValue('comments', state.rightBar.contents.comments);
                setValue('language', state.rightBar.contents.language);
                await trigger("id");
                await trigger("form");
                await trigger("option");
                await trigger("status");
                await trigger("weight");
                await trigger("comments");
                await trigger("language");
            }
            validateInputs()
                
        }
        else {
            setreqType("add");
        }

    },[state.rightBar,setValue, trigger])

    const handlechange = async (e,type) =>{
        if (type==="option"){
            setinput(prev => ({...prev, option:e.target.value}))
            await trigger(e.target.name);
        }
        else if (type==="form"){
            setinput(prev => ({...prev, form:e?.target?.value?.toUpperCase()}))
            await trigger(e.target.name);
        }
        else if (type==="weight"){
            setinput(prev => ({...prev, weight:parseInt(e.target.value)}))
            await trigger(e.target.name);
        }
        else if (type==="status"){
            setinput(prev => ({...prev, status:parseInt(e.target.value)}))
            await trigger(e.target.name);
        }
        else if (type==="comments"){
            setinput(prev => ({...prev, comments:e.target.value}))
            await trigger(e.target.name);
        }
        else if (type==="language"){
            setinput(prev => ({...prev, language:e.target.value}))
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
                    "type":"weightage",
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
                    "type":"weightage",
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
                    "type":"weightage",
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
                    <div>Form Name</div>
                    <input 
                        type='text' name='form'
                        {...register('form',{required:"Mandatory",validate: ValidateSQLInjection})}
                        onKeyUp={(e)=>handlechange(e,'form')} placeholder="Enter Form Name" style={stdDiv2}
                        defaultValue={input.form}
                    />
                    {errors.form && <div style={{color:'#F37512'}}>{errors.form.message}</div>}
                </div>

                <div style={stdDiv}>
                    <div>Option</div>
                    <input 
                        type='text' name='option'
                        {...register('option',{required:"Mandatory",validate: ValidateSQLInjection})}
                        onKeyUp={(e)=>handlechange(e,'option')} placeholder="Enter Option" style={stdDiv2}
                        defaultValue={input.option}
                    />
                    {errors.option && <div style={{color:'#F37512'}}>{errors.option.message}</div>}
                </div>



                <div style={stdDiv}>
                    <div>Comments</div>
                    <input 
                        type='text' name='comments'
                        {...register('comments',{required:"Mandatory",validate: ValidateSQLInjection})}
                        onKeyUp={(e)=>handlechange(e,'comments')} placeholder="Enter Comments" style={stdDiv2}
                        defaultValue={input.comments}
                    />
                    {errors.comments && <div style={{color:'#F37512'}}>{errors.comments.message}</div>}
                </div>


                <div style={stdDiv}>
                    <div>Status</div>
                    <select onChange={(e)=>handlechange(e,'status')}  style={stdDiv2a} >
                        <option value={input.status} selected>{input.status===1?"Enable":"Disable"}</option>
                        <option value={1}>Enable</option>
                        <option value={0}>Disable</option>
                    </select>
                    {errors.status && <div style={{color:'#F37512'}}>{errors.status.message}</div>}
                </div>

                <div style={stdDiv}>
                    <div>Weight</div>
                    <input 
                        type='text' name='weight'
                        {...register('weight',{required:"Mandatory",validate: ValidateSQLInjection})}
                        onKeyUp={(e)=>handlechange(e,'weight')} placeholder="Enter Weight" style={stdDiv2}
                        defaultValue={input.weight}
                    />
                    {errors.weight && <div style={{color:'#F37512'}}>{errors.weight.message}</div>}
                </div>


                <div style={stdDiv}>
                    <div>Language</div>
                    <select onChange={(e)=>handlechange(e,'language')}  style={stdDiv2a} >
                        <option value={input.language} selected>{input.language}</option>
                        <option value="en">en</option>
                        <option value="fr">fr</option>
                        <option value="ar">ar</option>
                        <option value="hi">hi</option>
                    </select>
                    {errors.language && <div style={{color:'#F37512'}}>{errors.language.message}</div>}
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

export default RbWeightage