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
Title:      Mejora Default - Body Analytics
Overview: 	
            This component takes renders analytical contents for the Mejora Default

Author: 	Abhijit Sawant (abhijitmsawant@gmail.com)
Creation Date: 21 Dec 2023
*/
import { useDispatch, useSelector } from "react-redux"
import {Box} from "../../others/others_colors"
import { useEffect, useState, useRef } from "react"
import fetchData from "../../others/fetchData"
import {RiSearchLine } from 'react-icons/ri';
import { useForm } from "react-hook-form"
import { PieChart } from '@mui/x-charts/PieChart';
import { ColorSelection1 } from "../../others/others_colors"
//import html2pdf from 'html2pdf.js';
import BO_sket_main from "../mejoraSketches/BO_sket_main";

const BO_mA3_analytics = () =>{

    // Primady definitions
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [cols,setcols] = useState([])


    /** -------------------------------------------------------------
     * FORM methods
     * Below methods handle all logic related to the Forms operations
     */
    const { handleSubmit, trigger } = useForm();
    const [input, setinput] = useState([]);
    const [res,setres] = useState([]);
    const onSubmit = async () => {
        const submitForm = async() =>{
            dispatch({type:'BACKDROP_ON'})
            const uri='api/be/v1.0/mejoradefault/analytics';
            const body={
                "sid": state.loginData.sid,
                "request": "DBA_A3_Select",
                "bu":state?.businessUnit,
                'type':state.bodyContents.name,
                'xAxis':input.xAxis,
                'yAxis':input.yAxis
            }

            const resp = await fetchData(uri,body)
            try{
                dispatch({type:'BACKDROP_OFF'})
                if(resp.status==="success"){
                    setres(resp.data)
                }
                else{
                    setres([])
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
        /**
         * Onload UseEffect
         * This method gets the column names to be filled to the select inputs upon loading the component
         */
        setres([])
        const structApi = async() =>{
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

            const resp = await fetchData(uri,body)
            try{
                dispatch({type:'BACKDROP_OFF'})
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
    },[dispatch,state.bodyContents.name,state.loginData.sid, state?.businessUnit])

    
    const selectValidity = () =>{
        /**
         * This method is to checks if the two select inputs are valid or invalid/empty
         * Eg: You cannot select 'Forms' in both the select options (x" and y")
         */
        var result = false
        if(input.yAxis===input.xAxis){
            result = false
        }
        else if(!input.yAxis)
            result = false
        else if(!input.xAxis)
            result = false
        else if(input.yAxis==="false")
            result = false
        else if(input.xAxis==="false")
            result = false
        else
            result = true

        return result
    }


    const getDisplayName = (input) =>{
        /**
         * Get the actual name (Display Name) for the column name given as input
         */
        const arrayFound = cols.find(col => col.name === input)
        const dispName = arrayFound ? arrayFound.dispName : null
        return dispName
    }
    
    const pieChartData = (input) => {
        /**
         * Prepare the data for pieChart as required
         */
        const data = input?.map((item, index) => {
            const { x, y } = item;


            const selectedColor = ColorSelection1(index);

            return { id: index, value: x, label: String(y), color:`${selectedColor}` };
          });
        return data
    }

    const componentToSaveRef = useRef(null);
    const generatePDF = () => {
        const element = componentToSaveRef.current;
    
        if (element) {
            /*
          const options = {
            margin: 10,
            filename: `report_${state.bodyContents.dispName}_${new Date().toLocaleDateString()}.pdf`, // Set the filename
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
    
          html2pdf(element, options);
          */
        }
    };

    const header = () =>{
        /**
         * JSX Header
         */
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
                        <div style={{margin:'auto 10px auto auto'}}>X" (Count)</div>
                        <select className="backgroundShaded15" onChange={(e)=>handlechange(e,'xAxis','string')} style={{width:'130px'}}>
                            <option value={false} selected>Select X"</option>
                            {
                                cols.map((col,i)=>{
                                    return <option key={i} value={col.name}>{col.dispName}</option>
                                })
                            }
                        </select>
                        <div style={{margin:'auto 10px auto 10px'}}>Y"</div>
                        <select className="backgroundShaded15" onChange={(e)=>handlechange(e,'yAxis','string')} style={{width:'130px'}}>
                            <option value={false} selected>Select Y"</option>
                            {
                                cols.map((col,i)=>{
                                    return <option key={i} value={col.name}>{col.dispName}</option>
                                })
                            }
                        </select>
                    </form>
                </div>
                {
                    selectValidity(input)
                    ?
                    <button onClick={handleSubmit(onSubmit)} className="stdButton" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiSearchLine style={{display:'flex',fontSize:'20px'}}/></button>
                    :
                    <button onClick={handleSubmit(errorMessage)} className="stdButtonRed" style={{display:'flex',margin:'auto 0px auto 10px'}}><RiSearchLine style={{display:'flex',fontSize:'20px'}}/></button>
                }

            </div>
        </>
    }

    const body = (cols) => {
        /**
         * JSX Body
         */
        return <div className="scrollbarTypeDefault" style={{width:'100%',height:'calc(100vh - 141px)',overflow:'auto'}}>
            <div style={{width:'85%'}}>
                <div className="stdButton" onClick={generatePDF} style={{fontSize:'small',display:'table-cell'}}>Copy to Clipboard</div>
                <div ref={componentToSaveRef}>

                    <div style={{borderBottom:'0px dashed RED',padding:'0px',fontSize:'25px',textAlign:'center',margin:'30px auto 10px auto'}}>
                        <b style={{marginLeft:'20px'}}>{getDisplayName(res?.x)} (Count) vs {getDisplayName(res?.y)}</b>
                    </div>

                    <div style={{margin:'auto',width:'800px',border:'0px dashed red',overflow:'auto'}}>
                        <PieChart
                            series={[
                                {
                                    data: pieChartData(res?.data?.dbData),
                                    innerRadius: 70,
                                    outerRadius: 140,
                                },
                            ]}
                            width={800}
                            height={300}
                            style={{overflow:'auto'}}
                        />
                    </div>

                    <div style={{marginTop:'20px'}}>
                    <div style={{width:'400px',margin:'auto'}}>
                        <div className="stdBorder stdBackground" style={{display:'flex',textAlign:'left',minHeight:'40px'}}>
                            <div style={{width:'80%',margin:'auto 0px auto 20px',textAlign:'left'}}>
                                <b>{getDisplayName(res?.y)}</b>
                            </div>
                            <div style={{width:'20%',margin:'auto 20px auto 0px',padding:'10px', textAlign:'right'}}>
                                <b>{getDisplayName(res?.x)} Count</b>
                            </div>
                        </div>
                    </div>
                    {
                        res?.data?.dbData?.map((element,i)=>(
                            <div key={i} style={{width:'400px',margin:'auto'}}>
                                <div className="stdBorder stdBackground" style={{borderTop:'0px solid red',display:'flex',textAlign:'left',minHeight:'40px'}}>
                                    <div style={{width:'80%',margin:'auto 0px auto 20px',textAlign:'left'}}>
                                        {element?.y}
                                    </div>
                                    <div style={{width:'20%',margin:'auto 20px auto 0px',padding:'10px', textAlign:'right'}}>
                                        {element?.x}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>

                    {/*}
                    <div style={{borderBottom:'0px dashed RED',padding:'0px',fontSize:'25px',textAlign:'center',margin:'30px auto 0px auto'}}>
                        <b>JSON Representation</b>
                    </div>
                    <pre style={{textAlign:'left',padding:'20px',background:'#222',color:'#aaa',borderRadius:'5px',width:'500px',margin:'20px auto'}}>
                        {JSON.stringify(pieChartData(res?.data?.dbData),2,2)}
                    </pre>
                    {*/}

                    <div style={{margin:'20px auto 100px auto',border:'0px dashed red',width:'550px',lineHeight:'30px',letterSpacing:'1px'}}>
                        Analyzing the correlation between {getDisplayName(res?.x)} (Count) and {getDisplayName(res?.y)} to provide trend insights. Analytics derived by {state.businessName}
                    </div>
                </div>
            </div>
        </div>
    }

    const renderComponent = () =>{
        return <div style={{width:'100%'}}>
            {
                header()
            }      
            <div style={{display:'flex',height:'0px',borderBottom:'1px solid #ddd'}}></div>
            {
                res?.data?.dbData?.length>0
                ?
                body(cols)
                :
                <div style={{margin:'20px'}}>
                    {
                        BO_sket_main({title:'Select above inputs to load analytics',select:'br_noData'})
                    }

                </div>
            }
        </div>
    }

    /**
     * Return JSX
     */
    return <div style={{width:'100%'}}>
        {
            state.bodyContents.length!==0
            ?
            renderComponent()
            :
            BO_sket_main({title:"Select item from left menu",select:"assetSelection"})
        }
    </div>
}

export default BO_mA3_analytics