import { useState } from "react"
import { useForm } from 'react-hook-form';
import fetchData from "../others/fetchData";
import { useDispatch, useSelector } from "react-redux";

const BO_nV_search = () =>{
    // Primary Definitions
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const { handleSubmit } = useForm();

    // Secondary Definitions
    const [topology,setTopology] = useState([]);
    const [inputValue, setInputValue] = useState('');


    const handleInputChange = async (event) => {
        /**
         * Detect changes down to the input text bar
         * and search the text contents by querying Search API
         */
        setInputValue(event.target.value);
    };

    const onSubmit = async () =>{
        
        setTopology([])
        const getTopology = async() =>{
            //---> Begin the call
            dispatch({type:'BACKDROP_ON'})
            const uri='api/be/networkVisualization/search';
            const body={
                "sid": state.loginData.sid,
                "request": "NV_Search",
                "bu":state?.businessUnit,
                "search":inputValue
            }
            const resp = await fetchData(uri,body)
            setTopology(resp)
            try{
                dispatch({type:'BACKDROP_OFF'})
                    if(resp.status==="success"){
                }
                else{
                    dispatch({type:"SNACKBAR_ON",message:resp.message, severity:"error"})
                }
            }
            catch(e){}
        }
        getTopology()
    }

    return <div style={{width:'100%'}}>

        <div style={{margin:'20px auto auto auto', width:'calc(100% - 0px)', height:'calc(100vh - 82px)'}}>
            <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
                <input 
                    type='text'
                    name='searchBox'
                    value={inputValue} onChange={handleInputChange} placeholder={`x.x.x.x to y.y.y.y`}
                    style={{
                        width:'500px',
                        textAlign:'center',
                        fontSize:'20px',
                        marginBottom:'20px'
                    }}
                />
            </form>
            <div className='scrollbarTypeDefault' style={{width:'100%',height:'calc(100vh - 145px)', overflow:'auto'}}>
                <pre style={{margin:'20px',textAlign:'left'}}>{JSON.stringify(topology,2,2)}</pre>

            </div>
        </div>
    </div>
}

export default BO_nV_search;