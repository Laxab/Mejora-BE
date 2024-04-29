import { useDispatch, useSelector } from "react-redux"
import {Box} from "../../others/others_colors"
import {BoxInitials} from "../../others/others_colors"
import { useEffect, useState } from "react"
import fetchData from "../../others/fetchData"
import { color } from "../../others/others_colors"
import { useForm } from "react-hook-form"
import {RiSearchLine } from 'react-icons/ri'
import BO_sket_main from "../mejoraSketches/BO_sket_main"


const BO_mA3_logging = () =>{

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [log,setlog] = useState([])
    const [message,setmessage] = useState("")



    /** -------------------------------------------------------------
     * FORM methods
     * Below methods handle all logic related to the Forms operations
     */
    const { handleSubmit, trigger } = useForm();
    const [input, setinput] = useState([]);
    const onSubmit = async () => {
        const submitForm = async() =>{
            dispatch({type:'BACKDROP_ON'})
            const uri='api/be/v1.0/mejoradefault/loggingView';
            const body={
                "sid": state.loginData.sid,
                "request": "DBA_A3_Select",
                "bu":state?.businessUnit,
                'type':state.bodyContents.name,
                "inputDate":input['inputDate']
            }
            setmessage("")
            const resp = await fetchData(uri,body)
            try{
                dispatch({type:'BACKDROP_OFF'})
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
    }

    const handlechange = async (e,type,datatype)  =>{
        /**
         * Handles the changes dynamically for each input elements in the form
         */
        if(datatype==="string"){

            if(type==="inputDate"){


                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                var formattedDate = new Date(e?.target?.value).toLocaleDateString('en-GB', options);
                if (formattedDate.startsWith('0')) {
                    formattedDate = formattedDate.substring(1);
                }

                //const formattedDate = `${day}-${month}-${year}`;
                setinput(prev => ({...prev, [type]:formattedDate.replace(/ /g, '-')}))

            }
            else
                setinput(prev => ({...prev, [type]:e.target.value}))

        }
        else if(datatype==="int")
            setinput(prev => ({...prev, [type]:parseInt(e?.target?.value)}))
        else if(type==='inputDate'){

            const d = new Date(e?.target?.value);
            const day = ('0' + d.getDate()).slice(-2);
            const month = ('0' + (d.getMonth() + 1)).slice(-2);
            const year = d.getFullYear();
            const formattedDate = `${day} / ${month}-${year}`;
            setinput(prev => ({...prev, [type]:formattedDate}))
            
        }
        await trigger(e.target.name);
    }
    // End of form dependent definitions ----------------------------

    useEffect(()=>{
        const submitForm = async() =>{
            dispatch({type:'BACKDROP_ON'})
            const uri='api/be/v1.0/mejoradefault/loggingView';
            const body={
                "sid": state.loginData.sid,
                "request": "DBA_A3_Select",
                "bu":state?.businessUnit,
                'type':state.bodyContents.name
            }
            setmessage("Displaying latest 10 records. Select date to check entire logging.")
            const resp = await fetchData(uri,body)
            try{
                dispatch({type:'BACKDROP_OFF'})
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
    },[dispatch,state.bodyContents.name,state.loginData.sid, state?.businessUnit])

    const generateColordDiv = (word) =>{
        /**
         * This method assigns background color as per the hash of the text provided.
         */
        const [backgroundColor] = color(word);
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
                <div style={{fontSize:'large'}}><b>{state.bodyContents.dispName}</b></div>
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
                    <input 
                        className="backgroundShaded15" 
                        type='date' 
                        name='inputDate' 
                        onChange={(e)=>handlechange(e,'inputDate','string')} 
                        style={{width:'130px'}}
                    />
                
                </form>
            </div>
            <button onClick={handleSubmit(onSubmit)} className="stdButton" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiSearchLine style={{display:'flex',fontSize:'20px'}}/></button>

        </div>
        </>
    }

    const body = () => {

        return <div className="scrollbarTypeDefault" style={{width:'100%',height:'calc(100vh - 141px)',overflow:'auto'}}>
            {
                message===""
                ?
                ""
                :
                <div style={{margin:'20px 0px 0px 20px',textAlign:'left'}}>
                    {message}
                </div>
            }
            <div style={{width:'100%',border:'0px dashed RED',textAlign:'left',overflow:'auto',paddingBottom:'50px'}}>
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

    const renderComponent = () =>{
        return <div style={{width:'100%'}}>
        {
            header()
        }      
        <div className={'stdBorder'} style={{display:'flex',height:'0px',borderTop:'0px',borderLeft:'0px',borderRight:'0px'}}></div>
        {}
        {
            log.length === 0 ?
            BO_sket_main({title:'No logs found',select:'br_noData2'})
            :
            body()
        }        
        
    </div>
    }

    return <div style={{width:'100%'}}>
        {
            state.bodyContents.length!==0
            ?
            renderComponent()
            :
            BO_sket_main({title:"Select item",select:"assetSelection"})
        }
    </div>
}

export default BO_mA3_logging