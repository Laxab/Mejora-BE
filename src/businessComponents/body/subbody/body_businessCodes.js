
import { useEffect, useState } from "react"
import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { LoadContentsAPI } from "../body_apiCall"
import { useForm } from 'react-hook-form';
import { RiCloseCircleFill,RiSearchLine } from 'react-icons/ri';
import SessionValidation from "../../others/sessionValidation";
import {Box} from "../../others/others_colors"


const BodyBusinessCodes = () => {

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
        margin: '0px auto',
        textAlign: 'left',
        padding: '20px 0px 10px',
        borderBottom: state.listingsLoading ? '5px solid #63C859' : '5px solid #ffffff',
        background:'#ffffff',
        borderTopLeftRadius:'0px',borderTopRightRadius:'0px'
    };
    

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
                item && item.name ?
                <div>
                    <div style={{height:'80px',border:'0px dashed red',display:'flex'}}>

                        <div style={{margin:'auto 10px auto 0px'}}> <Box dim={'45px'} txt={item.name.slice(0,2)}/></div>

                        <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                            <div style={{fontSize:'large',color:'#5B6A71'}}><b>{item.name}</b></div>
                            <div style={{fontSize:'small'}}>{state.bodyContents.desc}</div>
                        </div>

                        <div onClick={()=>addItem(item.name)} className="stdButton" style={{display:'flex',margin:'auto 0px auto auto'}}>Add new Item</div>
                    </div>

                    <div className="std_box_2" style={{height:'30px',border:'0px dashed #ddd',margin:'10px 0px 0px',borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px',display:'flex'}}>
                        <div style={{display:'flex',margin:'auto auto auto 0px',paddingTop:'20px',textAlign:'left'}}>
                            Search anything in {state.bodyContents.name}
                        </div>
                        <div style={{display:'flex',marginLeft:'0px',paddingTop:'10px',textAlign:'left'}}>
                            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',width:'100%'}}>
                                <input 
                                    style={{margin:'0px',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px',width:'280px',height:'20px',display:'flex',borderTopRightRadius:'0px',borderBottomRightRadius:'0px'}}
                                    type='text'
                                    value={inputValue} onChange={handleInputChange} placeholder={"Type and hit enter to search"}
                                />
                                {
                                    close===1 ?
                                    <div className="bg2" onClick={clearSearch} style={{height:'40px',width:'60px',borderTopRightRadius:'10px',borderBottomRightRadius:'10px',display:'flex',margin:'auto 0px auto 0px',fontSize:'25px',lineHeight:'0px'}}><RiCloseCircleFill style={{display:'flex',margin:'auto'}}/></div>
                                    :
                                    <div className="bg1" style={{background:"#c2c2c2",height:'40px',width:'60px',borderTopRightRadius:'10px',borderBottomRightRadius:'10px',display:'flex',margin:'auto 0px auto 0px',fontSize:'25px',lineHeight:'0px'}}><RiSearchLine style={{display:'flex',margin:'auto'}}/></div>
                                }
                            </form>
                        </div>
                    </div>
                    
                    <div className="std_box_2" style={dynamicBorderStyle}>
                        <div style={{display:'flex',borderBottom:'0px solid #eee',boxShadow:'0px 15px 15px -10px #eee'}}>
                            {
                                item.col.map((col,i)=>(
                                    <div key={i} style={{width:col.dim,display:'flex',padding:'0px 20px 15px'}}>
                                        <b>{col.disp}</b>
                                    </div>
                                ))
                            }
                        </div>
                        <div ref={contentRef} onScroll={handleScroll} className="scrollbarTypeDefault"   style={{height:'calc(100vh - 300px)',overflow:'auto',margin:'0px 0px 0px'}}>
                            
                            {
                                contents && contents.map((content,index)=>(
                                    <div className="stdBorderBottomDashed" onClick={()=>editItem(item.name,content)} key={index} style={{display:'flex',cursor:'pointer'}}>
                                        {
                                            item.col.map((col,i)=>(
                                                <div key={i} style={{width:col.dim,display:'flex',padding:'7px 20px 7px'}}>
                                                    {
                                                        (col.name==="status" || col.name==="Status")?(content[col.name]===1?<div className="txt1" style={{display:'flex',margin:'auto auto auto 0px'}}>Enabled</div>:<div className="txt0" style={{display:'flex',margin:'auto auto auto 0px'}}>Disabled</div>):
                                                        (content[col.name] && content[col.name].length>40 ? content[col.name].slice(0,40)+"..." : <div style={{display:'flex',margin:'auto auto auto 0px'}}>{content[col.name]}</div>)
                                                    }
                                                </div>
                                            ))
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

    return <div style={{width:'90%',justifyContent:'center'}}>
    <SessionValidation/>
        {
            state.bodyContents && getJSX(state.bodyContents)
        }

    </div>
}

export default BodyBusinessCodes