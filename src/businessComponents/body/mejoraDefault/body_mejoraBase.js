import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import fetchData from "../../others/fetchData"
import { Box } from "../../others/others_colors"
import { RiCloseCircleFill,RiSearchLine,RiAddLine,RiSortAsc, RiSortDesc } from 'react-icons/ri';
import {RiLayoutColumnLine} from 'react-icons/ri'
import {GoTriangleUp, GoTriangleDown} from 'react-icons/go'
import { useForm } from 'react-hook-form';
import { LoadContentsAPI } from "../body_apiCall";


const BodyMejoraBase = () =>{

    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    const { handleSubmit } = useForm();
    const contentRef = useRef(null);

    const [a,seta] = useState([])
    const [struct,setstruct] = useState([])
    const [cols,setcols] = useState([])
    const [bugFix,setbugFix] = useState(0)
    const [contents, setcontents] = useState([])
    const [pageNumber,setpageNumber] = useState(1)
    const [inputValue, setInputValue] = useState('');
    const [close,setClose] = useState(0);
    const [selectedKey,setselectedKey] = useState(999);
    const [sortName, setSortName] = useState("id")
    const [sortType, setSortType] = useState("Asc")

    const handleInputChange = async (event) => {
        /**
         * Detect changes down to the input text bar
         * and search the text contents by querying Search API
         */
        setClose(1);
        setInputValue(event.target.value);
      
        if (event.target.value === "") {
          setcontents([]);
          setpageNumber(1);
          setClose(0);
          setselectedKey(999); console.log(selectedKey)
          dispatch({ type: 'RESET', payload: "Now" });
        }
    };
    const clearSearch = () =>{
        /**
         * Handle action items when 'close' button is hit on the search bar
         */
        setcontents([]);
        setClose(0);
        dispatch({type:'RESET',payload:"RESETNOW"})
        setInputValue("")
    }
    const onSubmit = async () =>{
        setbugFix(1)
        setcontents([]);
        dispatch({type:'LISTINGS_LOADING_ON'})
        const response = await LoadContentsAPI(
                'api/be/standard/select',
                "DBA_Select",
                state.loginData,
                struct.name,
                pageNumber,
                "SEARCH",
                [
                    { [struct.s1] : inputValue + "%" },
                    { [struct.s2]: inputValue + "%" },
                    { [struct.s3]: "%" + inputValue + "%" }
                ],
                sortName
                ,
                sortType
            )
        setcontents(response)
        dispatch({type:'LISTINGS_LOADING_OFF'})
    }
    useEffect(()=>{
        //setbugFix(1)
        setcontents([]);
        dispatch({type:'LISTINGS_LOADING_ON'})
        const asynccall = async() =>{
            setcontents([]);
            const response = await LoadContentsAPI(
                    'api/be/standard/select',
                    "DBA_Select",
                    state.loginData,
                    struct.name,
                    pageNumber,
                    "SEARCH",
                    [
                        { [struct.s1] : inputValue + "%" },
                        { [struct.s2]: inputValue + "%" },
                        { [struct.s3]: "%" + inputValue + "%" }
                    ],
                    sortName
                    ,
                    sortType
                )
            setcontents(response)
        } 
        asynccall()
        dispatch({type:'LISTINGS_LOADING_OFF'})

    },[sortName, sortType])

    const addItem = (name) =>{
        dispatch({type:"RIGHTBAR_ON",title:`Add ${name}`, body:name, width:'400px'})
    }
    const editTable = (name) =>{
        dispatch({type:"RIGHTBAR_ON",title:`Add ${name}`, body:name, width:'400px'})
    }
    const editItem = (name,item) =>{
        dispatch({type:"RIGHTBAR_ON",title:`Edit ${name}`, body:name, contents:item, width:'400px'})
    }

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
            if(inputValue.length===0){
                const resp = await fetchData(uri,body)
                try{
                    dispatch({type:'LISTINGS_LOADING_OFF'})
                    if(resp.status==="success"){
                        //setcols(JSON.parse(`[\n\t\t{\n\t\t\t\"name\":\"form\"}]`))
                        setcols(JSON.parse(resp.data.response.dbData[0].cols))
                        setstruct(JSON.parse(resp.data.response.dbData[0].struct))
                    }
                    else{
                        setcols([])
                        setstruct([])
                        dispatch({type:"SNACKBAR_ON",message:resp.message, severity:"error"})
                    }
                }
                catch(e){
    
                }

            }

        }
        structApi()

    },[state.bodyContents])



    useEffect(()=>{
        setpageNumber(1)
        const initialize = async() =>{
            //---> Begin the call
            setcontents([])
            setSortName('id')
            setSortType('Asc')
            dispatch({type:'LISTINGS_LOADING_ON'})
            const response = await LoadContentsAPI(
                'api/be/standard/select',
                "DBA_Select",
                state.loginData,
                struct.name,
                50,
                "INIT",
                "",
                sortName
                ,
                sortType
            )
            console.log(response)
            setcontents(response)
            dispatch({type:'LISTINGS_LOADING_OFF'})
        }
        initialize()

        if(state.reset!=="") dispatch({type:'RESET',payload:""})
    },[state.reset,dispatch,state.loginData,state.bodyContents, struct])


    const handleScroll = async () => {
        /**
         * Detect instance when scrollbar of listings hits bottom, which should trigger to load more contents in 'useEffect' by changing
         * pageNumber parameter
        */
        if (contentRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = contentRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                const newpageNumber = pageNumber + 1
                setpageNumber(newpageNumber)
                //---> Begin the call
                dispatch({type:'LISTINGS_LOADING_ON'})
                if(bugFix===0){
                    const response = await LoadContentsAPI(
                        'api/be/standard/select',
                        "DBA_Select",
                        state.loginData,
                        struct.name,
                        newpageNumber,
                        "ASYNC",
                        "",
                        sortName
                        ,
                        sortType
                    )
                    setcontents(response)
                }
                else
                    setbugFix(0)
                dispatch({type:'LISTINGS_LOADING_OFF'})
            }
        }
    };
    const sortKey = (name,sort) =>{
        setpageNumber(1)
        setSortName(name)
        setSortType(sort)
    }

    // state.bodyContents, cols, struct

    return <div style={{width:'100%'}}>

        <div style={{width:'90%',height:'79px',border:'0px dashed red',display:'flex',margin:'auto'}}>
            {
                state?.bodyContents?.dispName &&
                <div style={{margin:'auto 10px auto 0px'}}> <Box dim={'45px'} txt={state.bodyContents.dispName}/></div>
            }

            <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                <div style={{fontSize:'large',color:'#5B6A71'}}><b>{state.bodyContents.dispName}</b></div>
                <div style={{fontSize:'small'}}>{state.bodyContents.description}</div>
            </div>

            <div style={{display:'flex',margin:'auto 0px auto auto',paddingTop:'0px',textAlign:'left'}}>
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',width:'100%'}}>
                    <input 
                        style={{background:'#ddd',margin:'0px',borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',width:'150px',height:'15px',display:'flex',borderTopRightRadius:'0px',borderBottomRightRadius:'0px'}}
                        type='text'
                        value={inputValue} onChange={handleInputChange} placeholder={`Search in ${state.bodyContents.dispName}`}
                    />
                    {
                        close===1 ?
                        <div className="bg2" onClick={clearSearch} style={{height:'35px',width:'45px',borderTopRightRadius:'5px',borderBottomRightRadius:'5px',display:'flex',margin:'auto 0px auto 0px',fontSize:'20px',lineHeight:'0px'}}><RiCloseCircleFill style={{display:'flex',margin:'auto'}}/></div>
                        :
                        <div className="bg1" style={{background:'#ddd',height:'35px',width:'45px',borderTopRightRadius:'5px',borderBottomRightRadius:'5px',display:'flex',margin:'auto 0px auto 0px',fontSize:'20px',lineHeight:'0px'}}></div>
                    }
                    <button onClick={handleSubmit(onSubmit)} className="stdButton" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiSearchLine style={{display:'flex',margin:'auto',fontSize:'20px'}}/></button>
                </form>
            </div>
            

            <div onClick={()=>addItem(state.bodyContents.name)} className="stdButton" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiAddLine style={{display:'flex',margin:'auto',fontSize:'20px'}}/></div>
            <div onClick={()=>editTable(state.bodyContents.name)} className="stdButton" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiLayoutColumnLine style={{display:'flex',margin:'auto',fontSize:'20px'}}/></div>


        </div>

        {/*
        <div style={{width:'90%',border:'0px dashed red',display:'flex',margin:'auto'}}>
            <pre style={{width:'90%',overflow:'auto',textAlign:'left'}}>
                {JSON.stringify(cols,2,2)}
            </pre>
        </div>
                */}



        <div style={{width:'100%'}}>
            <div style={{display:'flex',background:'#fff',borderBottom:'0px solid #eee',boxShadow:'0px 15px 15px -10px #aaa'}}>
                {
                    cols.map((col,i)=>{
                        if(col.visible!=="true"){
                            return  <div key={i} style={{width:col.dimention,display:'flex',padding:'0px 20px 0px'}}>
                                <b style={{margin:'auto 5px auto 0'}}>{col.dispName}</b>
                                <div style={{height:'100%'}}>
                                    <div className="stdcolorblurHover" onClick={()=>sortKey(col.name,'Desc')} style={{border:'0px solid #ccc', lineHeight:'0px', marginTop:'4px',position:'relative',bottom:'-3px' }}><GoTriangleUp/></div>
                                    <div className="stdcolorblurHover" onClick={()=>sortKey(col.name,'Asc')} style={{border:'0px solid #ccc', lineHeight:'0px', marginBottom:'4px',position:'relative',top:'-3px'}}><GoTriangleDown/></div>
                                </div>
                            </div>
                        }
                    })
                }
            </div>
            <div ref={contentRef} onScroll={handleScroll} className="scrollbarTypeDefault"   style={{height:'calc(100vh - 180px)',overflow:'auto',margin:'0px 0px 0px'}}>
                
                {
                    contents && contents.length>0 && contents.map((content,index)=>(
                        <div className="stdBorderBottomDashed" onClick={()=>editItem(state.bodyContents.name,content)} key={index} style={{display:'flex',cursor:'pointer'}}>
                            {
                                cols.map((col,i)=>{
                                    if(col.visible!=="true"){
                                        return <div key={i} style={{width:col.dimention,display:'flex',padding:'7px 20px 7px'}}>
                                                {
                                                    (col.name==="status" || col.name==="Status")?(content[col.name]===1?<div className="txt1" style={{display:'flex',margin:'auto auto auto 0px'}}>Enabled</div>:<div className="txt0" style={{display:'flex',margin:'auto auto auto 0px'}}>Disabled</div>):
                                                    (content[col.name] && content[col.name].length>40 ? content[col.name].slice(0,40)+"..." : <div style={{display:'flex',margin:'auto auto auto 0px',textAlign:'left'}}>{content[col.name]}</div>)
                                                }
                                            </div>
                                    }
                                    
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>


    </div>

}

export default BodyMejoraBase