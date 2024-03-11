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
Title:      Mejora Default - RightBar Set Columns
Overview: 	
            This rightbar destination component to edit the columns structure

Author: 	Abhijit Sawant (abhijitmsawant@gmail.com)
Creation Date: 17 Nov 2023
*/
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const RB_mA3_columns = () =>{
    // Primary Definition
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    // Secondary Definitions
    const [cols,setcols] = useState([])
    const { handleSubmit } = useForm();

    useEffect(()=>{
        /**
         * Initialize setcols based on the redux value
         */
        setcols(state.struct)
    },[state])

    const onSubmit = async (data) => {
       /**
        * Close this destination component after clicking submit
        */
        dispatch({type:'RIGHTBAR_OFF'})
    }
    const handlechange = (e,i) =>{
        /**
         * Change the structure component in redux "state.struct"
         */
        const tempInput = [...cols];
        /**
         * Just for knowledge, below code caused mutation error
         * tempInput[i].visible = !tempInput[i].visible;
        */
        tempInput[i] = { ...tempInput[i], visible: !tempInput[i].visible };
        dispatch({type:'STRUCT_SET',payload:tempInput})
    }

    return <div>
        <div style={{padding:'10px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    cols.map((content,i)=>(
                        <div style={{textAlign:'left',display:'flex',padding:'2px 0px 2px'}}>
                            {
                                content.visible 
                                ? 
                                <input 
                                    type="checkbox" checked={true} style={{width:'30px',margin:'2px'}} name={content.name}
                                    onClick={(e)=>handlechange(e,i)}
                                />
                                :
                                <input 
                                    type="checkbox" checked={false} style={{width:'30px',margin:'2px'}} name={content.name}
                                    onClick={(e)=>handlechange(e,i)}
                                />
                            }
                            <div >{content.dispName}</div>
                        </div>
                    ))
                }
                <button className="stdButton" onClick={handleSubmit(onSubmit)} style={{marginTop:'10px'}}> Update </button>
            </form>
        </div>
    </div>
}

export default RB_mA3_columns