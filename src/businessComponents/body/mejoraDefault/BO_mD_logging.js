import { useDispatch, useSelector } from "react-redux"
import {Box} from "../../others/others_colors"
import { useEffect, useState } from "react"
import fetchData from "../../others/fetchData"
import {RiSearchLine } from 'react-icons/ri';

const BO_mD_logging = () =>{

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [cols,setcols] = useState([])

    useEffect(()=>{
        const structApi = async() =>{
            //---> Begin the call
            dispatch({type:'LISTINGS_LOADING_ON'})
            const uri='api/be/standard/select';
            const body={
                "sid": state.loginData.sid,
                "request": "DBA_Select",
                "bu":"GreyInsights",
                "type":"struct_"+state.bodyContents.name,
                "select":["*"],
                "condition":[{"id":"%"}],
                "conditionType":"OR",
                "order":{
                    "orderBy":"id",
                    "order":"DESC"
                },
                "pageNumber":1,
                "pageSize":10
            }

            const resp = await fetchData(uri,body)
            try{
                dispatch({type:'LISTINGS_LOADING_OFF'})
                if(resp.status==="success"){
                    dispatch({type:"STRUCT_SET",payload:JSON.parse(resp.data.response.dbData[0].cols)})
                    setcols(JSON.parse(resp.data.response.dbData[0].cols))
                }
                else{
                    dispatch({type:"STRUCT_UNSET"})
                    setcols([])
                    dispatch({type:"SNACKBAR_ON",message:resp.message, severity:"error"})
                }
            }
            catch(e){}
        }
        structApi()
    },[dispatch,state.bodyContents.name,state.loginData.sid])

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

                <div style={{margin:'auto 10px auto auto'}}>X-Count</div>
                <select style={{width:'130px'}}>
                    {
                        cols.map((col,i)=>{
                            return <option key={i} value={col.name}>{col.dispName}</option>
                        })
                    }
                </select>

                <div style={{margin:'auto 10px auto 10px'}}>Y-Values</div>
                <select style={{width:'130px'}}>
                    {
                        cols.map((col,i)=>{
                            return <option key={i} value={col.name}>{col.dispName}</option>
                        })
                    }
                </select>
            </div>

            <button className="stdButton" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiSearchLine style={{display:'flex',fontSize:'20px'}}/></button>

        </div>
        </>
    }

    const body = (cols) => {

        return <div className="scrollbarTypeDefault" style={{width:'100%',height:'calc(100vh - 141px)',overflow:'auto'}}>
            <pre style={{textAlign:'left'}}>
                This is for logging
            </pre>
        </div>
    }

    return <div style={{width:'100%'}}>
        {
            header()
        }      
        <div style={{display:'flex',height:'0px',borderBottom:'1px solid #ddd'}}></div>
        {
            body(cols)
        }        
        
    </div>
}

export default BO_mD_logging