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
Title:      BUSINESS RIGHTBAR
Overview: 	
            This component takes redux input "state.rightBar.body" and renders the "Destination component" associated with it.
Usage:
            Any source component which wants to render the destination component in the Rightbar can make use of below code to 
            render this component:

            dispatch({type:"RIGHTBAR_ON",title:`Enter Title`, body:'RB_mD_edit', contents:item, width:'400px'})
            dispatch({type:'RIGHTBAR_OFF'})
                type: "RIGHTBAR_ON" to show Rightbar or "RIGHTBAR_OFF" to set it off
                title: Enter title to be displayed
                body: This should be exactly same as the component which is imported here.
                contents: (Not mandatory) This can contain any value which can be used in destination component
                width: (Not mandatory) If not mentioned, it takes the default value.

Author: 	Abhijit Sawant (abhijitmsawant@gmail.com)
Creation Date: 17 Nov 2023
*/
// Default Imports
import { useSelector } from "react-redux"
// Import Destination Components
import RB_mD_columns from "../body/mejoraDefault/RB_mD_columns"
import RB_mD_edit from "../body/mejoraDefault/RB_mD_edit"

const BixRightbar = () =>{
    // Primary Definitions
    const state = useSelector(state => state)
    // Render Destination components as per requests
    const listSelector = (list) =>{
        if(list === "RB_mD_columns")
            return <div><RB_mD_columns/></div>
        else if(list === "RB_mD_edit")
            return <div><RB_mD_edit/></div>
        else
            return <div style={{zIndex:10}}>{list}</div>
    }
    return <div  >
        {listSelector(state.rightBar.body)}
    </div>
}
export default BixRightbar