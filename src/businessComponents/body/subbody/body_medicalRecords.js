import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import fetchData from "../../others/fetchData"
import { Box } from "../../others/others_colors"
import {FaUserCircle} from 'react-icons/fa'
import {MdAssessment} from 'react-icons/md'
import {BsFillBagCheckFill} from 'react-icons/bs'
import { useForm } from "react-hook-form"
import { ValidateSQLInjection } from "../../others/validations"


const BodyMedicalRecords = () =>{

    const state = useSelector(state => state)
    const [results,setresults] = useState([])
    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm();

    const [input, setinput] = useState({comments:''})
    const [a,seta] = useState(false)

    const dynamicBorderStyle = {
        margin: '0px auto',
        textAlign: 'left',
        padding: '0px 0px 10px',
        borderBottom: state.listingsLoading ? '5px solid #63C859' : '5px solid #ffffff',
        background:'#ffffff',
        borderTopLeftRadius:'0px',borderTopRightRadius:'0px'
    };

    const onSubmit = () =>{
        
        const putComments = async () =>{
            seta(false)
            const uri='api/be/std_userInteraction/beComments';
            const body={
                "sid": state.loginData.sid,
                "bu": "GreyInsights",
                "request": "DBA_Select",
                "username":state.loginData.identity.userid,
                "user":state.loginData.identity.userName,
                "role":state.loginData.identity.idRole,
                "comments":input.comments,
                "Date":state.bodyContents.Date,
                "userid":state.bodyContents.userid,
                "form":state.bodyContents.form,
                "code":state.bodyContents.code
            }
            const submitted = await fetchData(uri,body)
            try{
                if(submitted.status==="success") {
                    seta(true)
                    const validateInputs = async() =>{
                        setinput({comments:''})
                        await trigger("comments");
                    }
                    validateInputs()
                }
                else seta(false)
            }
            catch (error) {}
        }
        putComments()
    }

    const handlechange = async (e,type) =>{
        if (type==="comments"){
            setinput(prev => ({...prev, comments:e.target.value}))
            await trigger(e.target.name);
        }

    }

    useEffect(()=>{
        const validateInputs = async() =>{
            await trigger("comments");
        }
        validateInputs()
        const getData = async() =>{
            const uri = 'api/be/std_userInteraction/beGetComments'
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
    },[state.bodyContents,a])

    return <div style={{width:'90%'}}>

        {
            results?.status==="success" ?
            
            <div >

                <div style={{height:'80px',border:'0px dashed red',display:'flex'}}>

                    <div style={{margin:'auto 10px auto 0px'}}> <Box dim={'45px'} txt={state.bodyContents.form.slice(0,2)}/></div>

                    <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                        <div style={{fontSize:'large',color:'#5B6A71'}}><b>{state.bodyContents.form}</b></div>
                        <div style={{fontSize:'small'}}>{state.bodyContents.code}</div>
                    </div>

                    <div  style={{display:'flex',margin:'auto 10px auto auto',flexDirection:'column'}}>
                        <div style={{fontSize:'small',margin:'auto 0px auto auto'}}>Score: {state.bodyContents.average}</div>
                        <div style={{fontSize:'large',margin:'auto 0px auto auto'}}><b>{state.bodyContents.category}</b></div>
                    </div>
                </div>

                <div className="std_box_2" style={{height:'50px',border:'0px dashed #ddd',margin:'10px 0px 0px',borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px',display:'flex',borderBottom:'1px solid #eee'}}>
                        
                        <FaUserCircle style={{margin:'auto 5px auto 0px',fontSize:'40px'}}/>
                        <div style={{fontSize:'large',color:'#5B6A71',margin:'auto auto auto 0px'}}>
                            <b>Medical Logs</b>
                        </div>
                        
                </div>
                <div className="std_box_2" style={dynamicBorderStyle}>
                    <div  className="scrollbarTypeDefault"   style={{height:'calc(100vh - 380px)',overflow:'auto',margin:'0px 0px 0px'}}>
                        {
                            results && results.data && results.data.dbData && results.data.dbData.length > 0 ?
                            <div>
                                {
                                    results.data.dbData.map((item,i)=>(
                                        <div key={i} className="stdboxss" style={{margin:'0px auto auto auto',padding:'20px',width:'calc(100% - 40px)',boxSizing:'border-box'}}>
                                            <div style={{display:'flex',height:'45px'}}>
                                                <Box dim={'45px'} txt={item.adminDisplay.slice(0,2)} style={{margin:'auto 10px auto 0px'}}/>
                                                <div style={{margin:'auto auto auto 10px'}}><b>{item.adminDisplay}</b></div>
                                            </div>
                                            <div style={{padding:'10px',background:'#eee',margin:'10px 0px',borderTopLeftRadius:'0px',borderTopRightRadius:'15px',borderBottomLeftRadius:'20px',borderBottomRightRadius:'20px'}}>
                                                {item.comments}
                                            </div>
                                            <div style={{borderRadius:'10px',textAlign:'right',fontSize:'small',paddingRight:'20px'}}>
                                                {item.time}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <div style={{textAlign:'center',marginTop:'20px'}}>
                                No medical records found
                            </div>

                        }
                        

                    </div>
                    <div style={{borderTop:'1px solid #ddd',display:'flex',height:'80px'}}>
                        <form onSubmit={handleSubmit(onSubmit)} style={{margin:'auto',display:'flex'}}>
                            <div>
                                <textarea 
                                    style={{margin:'auto 10px auto 20px', width:'500px'}}
                                    placeholder="Enter medical comments" rows={2}
                                    type='text' name='comments'
                                    {...register(
                                        'comments',{required:"Mandatory",validate: ValidateSQLInjection}
                                    )}
                                    onKeyUp={(e)=>handlechange(e,'comments')} 
                                    defaultValue={input.comments}
                                
                                />
                                {errors.comments && <div style={{color:'#F37512',textAlign:'center',fontSize:'small'}}>{errors.comments.message}</div>}

                            </div>
                            <button className="stdButton" style={{margin:'auto 20px auto auto'}}>Save</button>
                        </form>
                    </div>
                        
                </div>
                

            </div>
            :
            <div style={{marginTop:'20px'}}>Please select an item</div>
            
        }
    </div>
}

export default BodyMedicalRecords