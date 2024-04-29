/*
+--------------------------------------------------------------------------------------------------------------------------------+
|                                                            M E J O R A                                                         |
|                                                        All rights reserved                                                     |
|                                                                                                                                |
| No part of this code and associated documentation files may be copied reproduced, distributed, or transmitted in any form      |
| or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written       |
| permission of the author, except  in the case of brief quotations embodied in critical reviews and certain other noncommercial |
| uses.                                                                                                                          |
| For permission requests, kindly contact the author.                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------+
Title:      Mejora Default - Body Table
Overview: 	
            This component takes renders the body for Mejora Default in tabular format.
Usage:
            Below inputs are taken for creating the table dynamically to support any structure

            It also provides "RightBar" links to support column edition, add new records, edit/delete records

Author: 	Abhijit Sawant (abhijitmsawant@gmail.com)
Creation Date: 17 Nov 2023
*/
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import BO_sket_main from "../mejoraSketches/BO_sket_main"
import fetchData from "../../others/fetchData"
import { Box, BoxInitials, Bullet } from "../../others/others_colors"
import { RiSearchLine,RiAddLine } from 'react-icons/ri';
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";
import {RiLayoutColumnLine} from 'react-icons/ri'
import {GoTriangleUp, GoTriangleDown} from 'react-icons/go'
import { useForm } from 'react-hook-form';
import { LoadContentsAPI } from "../body_apiCall";
import { sliceText } from "../../others/others_textFormat"

const BO_mA3_table = () =>{
    // Primary Definitions
    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    const contentRef = useRef(null);
    const { handleSubmit } = useForm();

    // Secondary Definitions
    const [struct,setstruct] = useState([])
    const [cols,setcols] = useState([])
    const [bugFix,setbugFix] = useState(0)
    const [contents, setcontents] = useState([])
    const [pageNumber,setpageNumber] = useState(1)
    const [inputValue, setInputValue] = useState('');
    const [sortName, setSortName] = useState("id")
    const [sortType, setSortType] = useState("Asc")


    useEffect(()=>{
        setSortName('id')
        setSortType("Asc")
        setpageNumber(1)
    },[struct.name])

    const handleInputChange = async (event) => {
        /**
         * Detect changes down to the input text bar
         * and search the text contents by querying Search API
         */
        setInputValue(event.target.value);
      
        if (event.target.value === "") {
          setcontents([]);
          setpageNumber(1);
          dispatch({ type: 'RESET', payload: "Now" });
        }
    };

    const onSubmit = async () =>{
        /**
         * Trigger on pressing <ENTER> on searchbar
         * NOT triggered on each keypress inside searchbar
         */
        setcontents([]);
        dispatch({type:'BACKDROP_ON'})
        setpageNumber(1)
        const asynccall = async() =>{
            setcontents([]);
            const response = await LoadContentsAPI(
                    'api/be/v1.0/standard/select',
                    "DBA_A3_Select",
                    state.loginData,
                    state.bodyContents.name,
                    1,
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
        //alert(struct.name)
        dispatch({type:'BACKDROP_OFF'})
    }

    useEffect(()=>{
        /**
         * FIRST LOAD of contents
         * 
         * This method calls for the lists contents to be rendered in table (with CONDITIONS)
         * Time of call: Whenever sortName or sortType changes -> sortName, sortType
         * -----Error Correction Note-----
         * 'pageNumber' has been commented
         * Original working dependancies = [sortName,sortType]
         */
        //setbugFix(1)
        setcontents([]);
        dispatch({type:'BACKDROP_ON'})
        setpageNumber(1)
        const asynccall = async() =>{
            setcontents([]);
            const response = await LoadContentsAPI(
                    'api/be/v1.0/standard/select',
                    "DBA_A3_Select",
                    state.loginData,
                    state.bodyContents.name,
                    1,
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
        //alert(struct.name)
        dispatch({type:'BACKDROP_OFF'})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sortName,sortType,dispatch,state.loginData,struct.name, struct.s1,struct.s2,struct.s3])

    const addItem = (name) =>{
        /**
         * Open rightbar to add new items
         */
        //dispatch({type:"RIGHTBAR_ON",title:`Add ${name}`, body:name, width:'400px'})
        dispatch({type:"RIGHTBAR_ON",title:`Add ${state.bodyContents.dispName}`, body:'RB_mA3_add', contents:'item', width:'450px'})
    }
    const editTable = (name) =>{
        /**
         * Open rightbar to manage columns
         */
        dispatch({type:"RIGHTBAR_ON",title:`${state.bodyContents.dispName}`, body:'RB_mA3_columns', width:'450px',contents:cols})
    }
    const editItem = (name,item) =>{
        /**
         * Open rightbar to edit items, send 'item' (content) with it.
         */
        var widthPx = '450px'
        if(state.bodyContents.rightbar_size){
            widthPx = state.bodyContents.rightbar_size
        }
        dispatch({type:"RIGHTBAR_ON",title:`Edit ${state.bodyContents.dispName}`, body:'RB_mA3_edit', contents:item, width:`${widthPx}`})
    }

    useEffect(()=>{
        /**
         *  This method gets the structure of the database
         *  Time of call: Whenever new list item is clicked -> state.bodyContents.name changes
         */
        setcontents([])
        const structApi = async() =>{
            //---> Begin the call
            dispatch({type:'BACKDROP_ON'})
            const uri='api/be/v1.0/standard/select';
            const body={
                "sid": state.loginData.sid,
                "request": "DBA_A3_Select",
                "bu":state?.businessUnit,
                "type":"structure",
                "select":["*"],
                "condition":[{"name":state.bodyContents.name}],
                "conditionType":"OR",
                "order":{
                    "orderBy":"id",
                    "order":"DESC"
                },
                "pageNumber":1,
                "pageSize":10
            }
            /**
             * -----Error Correction Note-----
             * Replaced if(1) from if(inputValue.length===0)
             */
            if(1){
                const resp = await fetchData(uri,body)
                try{
                    dispatch({type:'BACKDROP_OFF'})
                    if(resp.status==="success"){
                        //setcols(JSON.parse(`[\n\t\t{\n\t\t\t\"name\":\"form\"}]`))
                        dispatch({type:"STRUCT_SET",payload:JSON.parse(resp.data.response.dbData[0].cols)})
                        setcols(JSON.parse(resp.data.response.dbData[0].cols))
                        setstruct(JSON.parse(resp.data.response.dbData[0].struct))
                    }
                    else{
                        dispatch({type:"STRUCT_UNSET"})
                        setcols([])
                        setstruct([])
                        dispatch({type:"SNACKBAR_ON",message:resp.message, severity:"error"})
                    }
                }
                catch(e){}
            }

        }
        structApi()

    },[state.bodyContents.name, dispatch,state.loginData.sid,state.listings, state?.businessUnit])

    useEffect(()=>{
        /**
         * This method clears out the "Search" whenever the list-item component is changed
         */
        setInputValue("")
    },[state.bodyContents.name])

    useEffect(()=>{
        /**
         * This method calls for the lists contents to be rendered in table
         * Time of call: Whenever list item changes, and so the structure changes -> struct.name
         */
        
        setpageNumber(1)
        setcontents([])
        const clearContents = async() =>{
            await setcontents([])
        }
        const initialize = async() =>{
            clearContents()
            setSortName('id')
            setSortType('Asc')
            dispatch({type:'BACKDROP_ON'})
            const response = await LoadContentsAPI(
                'api/be/v1.0/standard/select',
                "DBA_A3_Select",
                state.loginData,
                struct.name,
                50,
                "INIT",
                "",
                'id'
                ,
                'Asc'
            )
            setcontents(response)
            if(state.reset!=="") dispatch({type:'RESET',payload:""})
            dispatch({type:'BACKDROP_OFF'})
        }
        initialize()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.reset])

    // working - struct.name,state.reset,state.loginData
    //state.reset,dispatch,state.loginData,struct.name, struct
    const handleScroll = async () => {
        /**
         * Detect instance when scrollbar of listings hits bottom, which should trigger to load more contents in 'useEffect' by changing
         * pageNumber parameter
        */
        if (contentRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = contentRef.current;

            if (Math.round(scrollTop) + Math.round(clientHeight) +1 >= Math.round(scrollHeight)) {
                const newpageNumber = pageNumber + 1
                setpageNumber(newpageNumber)
                //---> Begin the call
                dispatch({type:'BACKDROP_ON'})

                if(inputValue===""){
                    if(struct.name === state.bodyContents.name){
                        if(bugFix===0){
                            const response = await LoadContentsAPI(
                                'api/be/v1.0/standard/select',
                                "DBA_A3_Select",
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
                    }
                }
                else{
                    if(struct.name === state.bodyContents.name){
                        if(bugFix===0){
                            const response = await LoadContentsAPI(
                                'api/be/v1.0/standard/select',
                                "DBA_A3_Select",
                                state.loginData,
                                struct.name,
                                newpageNumber,
                                "ASYNC",
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
                        else
                            setbugFix(0)
                    }

                }

                dispatch({type:'BACKDROP_OFF'})
            }
        }
    };
    const sortKey = (name,sort) =>{
        setpageNumber(1)
        setSortName(name)
        setSortType(sort)
    }
    const generateBackground = (col, content) =>{
        if(col.decoration === "Background")
            return <div style={{display:'flex',margin:'auto auto auto 0px',textAlign:'left'}}>
                        <div 
                            className='backgroundShaded15' 
                            style={{width:'40px',padding:'5px 0px',borderRadius:'3px',textAlign:'center'}}
                        >{content[col.name]}</div>
                    </div>
        else if(col.decoration === "EnableDisable"){

            const checkIfEnabled = (data) =>{
                if((data===1)||(data==="ENABLED")||(data==="ACTIVE"))
                    return true
                else
                    return false
            }

            return <div style={{display:'flex',margin:'auto auto auto 0px',textAlign:'left'}}>
                        <div 
                            style={{width:'40px',padding:'5px 0px',borderRadius:'3px',textAlign:'center', fontSize:'22px'}}
                        >
                            {
                                checkIfEnabled(content[col.name])
                                ?
                                <div><FaCircleCheck className="txt1"/></div>
                                :
                                <div><FaCircleXmark className="txt0"/></div>
                            }
                        </div>
                    </div>
        }
        else if(content[col.name]===null)
            return <div style={{display:'flex',margin:'auto auto auto 0px',textAlign:'left'}}>
                        <div className="greyout" style={{padding:'3px 6px', fontSize:'small', borderRadius:'5px'}}>
                            No data
                        </div>
                    </div>
        else 
            return  <div style={{display:'flex',margin:'auto auto auto 0px',textAlign:'left'}}>
                        {content[col.name]}
                    </div>
    }

    const renderBody = () =>{
        return <>
        <div style={{width:'90%',height:'79px',border:'0px dashed red',display:'flex',margin:'auto'}}>
            {
                state?.bodyContents?.dispName &&
                <div style={{margin:'auto 10px auto 0px'}}> <Box dim={'45px'} txt={state.bodyContents.dispName}/></div>
            }

            <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                <div style={{fontSize:'large'}}><b>{state.bodyContents.dispName}</b></div>
                <div style={{fontSize:'small'}}>
                    {state.bodyContents.description} 
                    {/*
                        --- Scrollbar Information ---
                        ScrollTop: {ScrollTop}
                        , ClientHeight: {ClientHeight}
                        , ScrollHeight: {ScrollHeight} / {ScrollTop+ClientHeight}
                    */} 
                </div>
            </div>

            <div style={{display:'flex',margin:'auto 0px auto auto',paddingTop:'0px',textAlign:'left'}}>
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',width:'100%'}}>
                    <input 
                        style={{margin:'0px',borderRadius:'5px',width:'200px',height:'15px',display:'flex'}}
                        type='text'
                        value={inputValue} onChange={handleInputChange} placeholder={sliceText(18,`Search in ${state.bodyContents.dispName}`)}
                    />
                    <button onClick={handleSubmit(onSubmit)} className="titleButtonFirst" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiSearchLine style={{display:'flex',margin:'auto',fontSize:'20px'}}/></button>
                </form>
            </div>
            

            <div onClick={()=>addItem(state.bodyContents.name)} className="titleButton" style={{display:'flex',margin:'auto 0px auto 0px'}}><RiAddLine style={{display:'flex',margin:'auto',fontSize:'20px'}}/></div>
            <div onClick={()=>editTable(state.bodyContents.name)} className="titleButtonLast" style={{display:'flex',margin:'auto 0px auto 0px'}}><RiLayoutColumnLine style={{display:'flex',margin:'auto',fontSize:'20px'}}/></div>


        </div>

        <div style={{width:'100%'}}>
            <div className="tableTitle" style={{display:'flex'}}>
                {
                    state.struct.map((col,i)=>{
                        if(col.visible===true){
                            return  <div key={i} style={{width:col.dimention,display:'flex',padding:'0px 20px 0px'}}>
                                <b style={{margin:'auto 5px auto 0'}}>{col.dispName}</b>
                                <div style={{height:'100%'}}>
                                    <div className="stdcolorblurHover" onClick={()=>sortKey(col.name,'Desc')} style={{border:'0px solid #ccc', lineHeight:'0px', marginTop:'4px' }}><GoTriangleUp/></div>
                                    <div className="stdcolorblurHover" onClick={()=>sortKey(col.name,'Asc')} style={{border:'0px solid #ccc', lineHeight:'0px', marginBottom:'4px'}}><GoTriangleDown/></div>
                                </div>
                            </div>
                        }
                        else return <></>
                    })
                }
            </div>
            <div ref={contentRef} onScroll={handleScroll} className="scrollbarTypeDefault"   style={{height:'calc(100vh - 180px)',overflow:'auto',margin:'0px 0px 0px'}}>
            
                {
                    contents && contents.length>0 && contents.map((content,index)=>(
                        <div className="stdBorderBottomDashed" onClick={()=>editItem(state.bodyContents.name,content)} key={index} style={{display:'flex',cursor:'pointer'}}>
                            
                            {
                                state.struct.map((col,i)=>{
                                    
                                    if(col.visible===true){
                                        return <div key={i} style={{width:col.dimention,display:'flex',padding:'7px 20px 7px',overflow:'auto'}}>
                                                {
                                                    (col.decoration === "BoxInitials")
                                                    &&
                                                    <div style={{marginRight:'10px'}} ><BoxInitials dim={'45px'} txt={content[col.name]}/></div>
                                                }
                                                {
                                                    (col.decoration === "Box")
                                                    &&
                                                    <div style={{marginRight:'10px'}} ><Box dim={'45px'} txt={content[col.name]}/></div>
                                                }
                                                {
                                                    (col.decoration === "Bullet")
                                                    &&
                                                    <div style={{marginRight:'10px'}} ><Bullet dim={'45px'} txt={content[col.name]}/></div>
                                                }
                                                {
                                                        content[col.name] 
                                                        && 
                                                        content[col.name].length>40 
                                                        ? 
                                                        <div style={{textAlign:'left'}}>
                                                            {
                                                                content[col.name]?.slice(0,90)+"..."
                                                            }
                                                        </div>
                                                        : 
                                                        generateBackground(col, content)
                                                }
                                            </div>
                                    }
                                    else return <></>
                                    
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    }


    return <div style={{width:'100%'}}>
        {
            state.bodyContents.length!==0
            ?
            renderBody()
            :
            BO_sket_main({title:"Select item from left menu",select:"assetSelection"})
        }


    </div>

}

export default BO_mA3_table