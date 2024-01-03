import { useDispatch, useSelector } from "react-redux"
import {Box} from "../../others/others_colors"
import {BoxInitials} from "../../others/others_colors"
import { useEffect, useState } from "react"
import fetchData from "../../others/fetchData"
import { color } from "../../others/others_colors"
import { useForm } from "react-hook-form"
import {RiSearchLine } from 'react-icons/ri';

const BO_mD_logging = () =>{

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [log,setlog] = useState([])



    /** -------------------------------------------------------------
     * FORM methods
     * Below methods handle all logic related to the Forms operations
     */
    const { handleSubmit, trigger } = useForm();
    const [input, setinput] = useState([]);
    const [res,setres] = useState([]);
    const onSubmit = async () => {
        const submitForm = async() =>{
        }
        submitForm()
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
    const errorMessage = () =>{
        alert("X and Y should have distinct values")
    }
    // End of form dependent definitions ----------------------------

    useEffect(()=>{
        const submitForm = async() =>{
            dispatch({type:'LISTINGS_LOADING_ON'})
            const uri='api/be/mejoradefault/loggingView';
            const body={
                "sid": state.loginData.sid,
                "request": "DBA_Select",
                "bu":"GreyInsights",
                'type':state.bodyContents.name
            }

            const resp = await fetchData(uri,body)
            try{
                dispatch({type:'LISTINGS_LOADING_OFF'})
                if(resp.status==="success"){
                    setlog(resp?.data?.dbData)
                }
                else{
                    setlog([])
                    dispatch({type:"SNACKBAR_ON",message:resp.message, severity:"error"})
                }
            }
            catch(e){}
        }
        submitForm()
    },[dispatch,state.bodyContents.name,state.loginData.sid])

    const generateColordDiv = (word) =>{
        /**
         * This method assigns background color as per the hash of the text provided.
         */
        const [backgroundColor, val] = color(word);
        return  <div style={{display:'table-cell',background:`${backgroundColor}`,color:'#fff',float:'right',padding:'5px 10px',borderRadius:'5px'}}>
            {word}
        </div>
    }

    const header = () =>{

        return <>

        <div style={{width:'90%',height:'79px',border:'0px dashed red',display:'flex',margin:'auto'}}>
            {
                state?.bodyContents?.dispName &&
                <div style={{margin:'auto 10px auto 0px'}}> 
                    <Box dim={'45px'} txt={state.bodyContents.dispName}/>
                </div>
            }

            <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                <div style={{fontSize:'large',color:'#5B6A71'}}><b>{state.bodyContents.dispName}</b></div>
                <div style={{fontSize:'small'}}>{state.bodyContents.description}</div>
            </div>




            <div style={{margin:'auto 0px auto auto',display:'flex'}}>
                {
                /**
                 * Form for selecting two inputs and rendering the analytics content
                 */
                }
                <form onSubmit={handleSubmit(onSubmit)} style={{margin:'auto 0px auto auto',display:'flex'}}>
                    <div style={{margin:'auto 10px auto 10px'}}>Select Date</div>
                    <input className="backgroundShaded15" type='date' onChange={(e)=>handlechange(e,'yAxis','string')} style={{width:'130px'}}/>
                </form>
            </div>
            <button onClick={handleSubmit(onSubmit)} className="stdButton" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiSearchLine style={{display:'flex',fontSize:'20px'}}/></button>

        </div>
        </>
    }

    const body = () => {

        return <div className="scrollbarTypeDefault" style={{width:'100%',height:'calc(100vh - 141px)',overflow:'auto'}}>
            <div style={{width:'100%',border:'0px dashed RED',textAlign:'left',overflow:'auto'}}>
                {
                    log?.map((item,i)=>(
                        <div key={i} className="stdbox" style={{width:'70%',margin:'20px auto auto 20px',padding:'0px'}}>
                            <div style={{padding:'20px 0px 10px 0px',display:'flex'}}>
                                <div style={{padding:'0px 0px 0px 20px'}}>
                                    <BoxInitials dim={'45px'} txt={item.user}/>
                                </div>
                                <div style={{padding:'0px 0px 0px 10px'}}>
                                    <div><b>{item.user}</b></div>
                                    <div style={{fontSize:'12px', display:'flex'}}>
                                        <div className="backgroundShaded5" style={{margin:'5px 0 5px 0',padding:'5px 10px',borderRadius:'5px'}}>@{item.username}</div> 
                                        <div className="backgroundShaded5" style={{margin:'5px 0px 5px 5px',padding:'5px 10px',borderRadius:'5px'}}>{item.sid}</div>
                                    </div>
                                </div>
                                <div style={{margin:'auto 20px auto auto'}}>
                                {
                                    item.logType==="Update"
                                    &&
                                    generateColordDiv("Update")
                                }
                                {
                                    item.logType==="Insert"
                                    &&
                                    generateColordDiv("Insert")
                                }
                                {
                                    item.logType==="Delete"
                                    &&
                                    generateColordDiv("Delete")
                                }
                                </div>
                            </div>
                            <pre className="backgroundShaded5" style={{width:'100%',overflow:'auto'}}>
                                {JSON.stringify(JSON.parse(item.requestBody),2,2)}
                            </pre>
                            <div style={{textAlign:'right',padding:'0px 20px 10px 0px',fontSize:'small'}}>
                                <i>{item.datetime}</i>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    }

    return <div style={{width:'100%'}}>
        {
            header()
        }      
        <div style={{display:'flex',height:'0px',borderBottom:'1px solid #ddd'}}></div>
        {
            body()
        }        
        
    </div>
}

export default BO_mD_logging