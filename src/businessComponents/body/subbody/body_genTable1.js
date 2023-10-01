
import { useEffect, useState } from "react"
import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { LoadContentsAPI } from "../body_apiCall"
import { useForm } from 'react-hook-form';
import { RiCloseCircleFill,RiSearchLine } from 'react-icons/ri';
import SessionValidation from "../../others/sessionValidation";
import {Box} from "../../others/others_colors"
import fetchData from "../../others/fetchData";


const BodyGenTable1 = () => {

    const state = useSelector (state => state)
    const dispatch = useDispatch()
    const contentRef = useRef(null);
    const { handleSubmit } = useForm();

    //Secondary Definitions
    const [contents, setcontents] = useState([])
    const [pageNumber,setpageNumber] = useState(1)
    const [inputValue, setInputValue] = useState('');
    const [close,setClose] = useState(0)
    const [selectedKey,setselectedKey] = useState(999);
    const [bugFix,setbugFix] = useState(0)
    const dynamicBorderStyle = {
        textAlign: 'left',
        padding: '20px 0px 10px',
        borderBottom: state.listingsLoading ? '5px solid #63C859' : '5px solid #ffffff',
        background:'#ffffff',
        borderTopLeftRadius:'0px',borderTopRightRadius:'0px'
    };

    const struct = {
        name:'code',
        dispName:"Code", 
        description:"Business Names", 
        s1:'code',s2:'codedesc',s3:'codedesc',
        col:[
            {name:'id',disp:'ID',dim:'10%',visible:true},
            {name:'code',disp:'Code',dim:'20%',visible:true},
            {name:'codedesc',disp:'Business Unit',dim:'50%',visible:true},
            {name:'status',disp:'Status',dim:'20%',visible:true}
        ]
    }
    /*
    create table struct (
        id int not null auto-increment,
        name varchar(50),
        desc varchar(100),
        table varchar(50),
        s1 varchar(50),
        s2 varchar(50),
        s3 varchar(50),
        col varchar(5000)
    )

    col:[{"name":id,disp:ID,dim:10%,visible:true},{name:'code',disp:'Code',dim:'20%',visible:true},{name:'codedesc',disp:'Business Unit',dim:'50%',visible:true},{name:'status',disp:'Status',dim:'20%',visible:true]
    */

    const [dbStruct,setDbStruct] = useState([])
    const [dbName,setDbName] = useState([])

    useEffect(()=>{
        const structApi = async() =>{
            //---> Begin the call
            setcontents([])
            dispatch({type:'LISTINGS_LOADING_ON'})
            const uri='api/be/standard/select';
            const body={
                "sid": state.loginData.sid,
                "request": "DBA_Select",
                "bu":"GreyInsights",
                "type":"struct",
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
                setDbStruct(JSON.parse(resp.data.response.dbData[0].col))
                setDbName(resp.data.response.dbData[0])
                dispatch({type:'LISTINGS_LOADING_OFF'})

            }
            catch(e){

            }

        }
        structApi()
    },[])
     

    useEffect(()=>{
        setpageNumber(1)
        const initialize = async() =>{
            //---> Begin the call
            setcontents([])
            dispatch({type:'LISTINGS_LOADING_ON'})
            const response = await LoadContentsAPI(
                'api/be/standard/select',
                "DBA_Select",
                state.loginData,
                state.bodyContents.table,
                50,
                "INIT",
                "",
                "id"
                ,
                "ASC"
            )
            console.log(response)
            setcontents(response)
            dispatch({type:'LISTINGS_LOADING_OFF'})
        }
        initialize()

        if(state.reset!=="") dispatch({type:'RESET',payload:""})
    },[state.reset,dispatch,state.loginData,state.bodyContents.table])
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
                        state.bodyContents.table,
                        newpageNumber,
                        "ASYNC",
                        "",
                        "id"
                        ,
                        "ASC"
                    )
                    setcontents(response)
                }
                else
                    setbugFix(0)
                dispatch({type:'LISTINGS_LOADING_OFF'})
            }
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
    const onSubmit = async () =>{
        setbugFix(1)
        setcontents([]);
        dispatch({type:'LISTINGS_LOADING_ON'})
        const response = await LoadContentsAPI(
                'api/be/standard/select',
                "DBA_Select",
                state.loginData,
                state.bodyContents.table,
                pageNumber,
                "SEARCH",
                [
                    { [state.bodyContents.s1] : inputValue + "%" },
                    { [state.bodyContents.s2]: inputValue + "%" },
                    { [state.bodyContents.s3]: "%" + inputValue + "%" }
                ],
                "id"
                ,
                "ASC"
            )
        setcontents(response)
        dispatch({type:'LISTINGS_LOADING_OFF'})
    }

    const addItem = (name) =>{
        dispatch({type:"RIGHTBAR_ON",title:`Add ${name}`, body:name, width:'400px'})
    }

    const editItem = (name,item) =>{
        dispatch({type:"RIGHTBAR_ON",title:`Edit ${name}`, body:name, contents:item, width:'400px'})
    }

    const getJSX = (item) =>{

        return (<div>
            {
                item && item.dispName ?
                <div>
                    <div style={{width:'90%',height:'80px',border:'0px dashed red',display:'flex',margin:'auto'}}>

                        <div style={{margin:'auto 10px auto 0px'}}> <Box dim={'45px'} txt={item.dispName.slice(0,2)}/></div>

                        <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                            <div style={{fontSize:'large',color:'#5B6A71'}}><b>{item.dispName}</b></div>
                            <div style={{fontSize:'small'}}>{state.bodyContents.desc}</div>
                        </div>
                    
                        

                        <div style={{display:'flex',margin:'auto 0px auto auto',paddingTop:'0px',textAlign:'left'}}>
                            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',width:'100%'}}>
                                <input 
                                    style={{background:'#ddd',margin:'0px',borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',width:'200px',height:'15px',display:'flex',borderTopRightRadius:'0px',borderBottomRightRadius:'0px'}}
                                    type='text'
                                    value={inputValue} onChange={handleInputChange} placeholder={"Type and hit enter to search"}
                                />
                                {
                                    close===1 ?
                                    <div className="bg2" onClick={clearSearch} style={{height:'35px',width:'45px',borderTopRightRadius:'5px',borderBottomRightRadius:'5px',display:'flex',margin:'auto 0px auto 0px',fontSize:'20px',lineHeight:'0px'}}><RiCloseCircleFill style={{display:'flex',margin:'auto'}}/></div>
                                    :
                                    <div className="bg1" style={{background:"#c2c2c2",height:'35px',width:'45px',borderTopRightRadius:'5px',borderBottomRightRadius:'5px',display:'flex',margin:'auto 0px auto 0px',fontSize:'20px',lineHeight:'0px'}}><RiSearchLine style={{display:'flex',margin:'auto'}}/></div>
                                }
                            </form>
                        </div>

                        <div onClick={()=>addItem(item.dispName)} className="stdButton" style={{display:'flex',margin:'auto 0px auto 10px'}}>Add</div>

                    </div>

                    
                    <div style={{width:'100%'}}>
                        <div style={{display:'flex',background:'#fff',borderBottom:'0px solid #eee',boxShadow:'0px 15px 15px -10px #aaa'}}>
                            {
                                dbStruct.map((col,i)=>{
                                    if(col.visible===true){
                                        return  <div key={i} style={{width:col.dim,display:'flex',padding:'5px 20px 5px'}}>
                                            <b>{col.disp}</b>
                                        </div>
                                    }
                                })
                            }
                        </div>
                        <div ref={contentRef} onScroll={handleScroll} className="scrollbarTypeDefault"   style={{height:'calc(100vh - 180px)',overflow:'auto',margin:'0px 0px 0px'}}>
                            
                            {
                                contents && contents.map((content,index)=>(
                                    <div className="stdBorderBottomDashed" onClick={()=>editItem(item.dispName,content)} key={index} style={{display:'flex',cursor:'pointer'}}>
                                        {
                                            dbStruct.map((col,i)=>{
                                                if(col.visible){
                                                    return <div key={i} style={{width:col.dim,display:'flex',padding:'7px 20px 7px'}}>
                                                                {
                                                                    (col.name==="status" || col.name==="Status")?(content[col.name]===1?<div className="txt1" style={{display:'flex',margin:'auto auto auto 0px'}}>Enabled</div>:<div className="txt0" style={{display:'flex',margin:'auto auto auto 0px'}}>Disabled</div>):
                                                                    (content[col.name] && content[col.name].length>40 ? content[col.name].slice(0,40)+"..." : <div style={{display:'flex',margin:'auto auto auto 0px'}}>{content[col.name]}</div>)
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
                :
                <div style={{marginTop:'20px'}}>Please select an item</div>
            }
        </div>)
    }

    return <div style={{width:'100%',justifyContent:'center'}}>
    <SessionValidation/>
        <pre style={{textAlign:'left'}}>
            {JSON.stringify(dbName,2,2)}
            item.col
            {JSON.stringify(struct,2,2)}
        </pre>
        {
            state.bodyContents && getJSX(dbName)
        }

    </div>
}

export default BodyGenTable1