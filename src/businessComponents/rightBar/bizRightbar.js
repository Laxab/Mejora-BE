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
import RB_MD_COLS from "../body/mejoraDefault/RB_mD_columns"
import RB_MD_EDIT from "../body/mejoraDefault/RB_mD_edit"
import RB_MD_ADD from "../body/mejoraDefault/RB_mD_add"
import RB_MA3_COLS from "../body/mejoraA3/RB_mA3_columns"
import RB_MA3_EDIT from "../body/mejoraA3/RB_mA3_edit"
import RB_MA3_ADD from "../body/mejoraA3/RB_mA3_add"
import RB_MR_ADDREPORT from "../dynamicModules/mejoraReports/RB_mR_addRepAdv"
import RB_MR_EDITREPORT from "../dynamicModules/mejoraReports/RB_mR_editReport"
import RB_MA_ADDREPORT from "../dynamicModules/mejoraAnalytics/RB_mR_addRepAdv"
import RB_MA_EDITREPORT from "../dynamicModules/mejoraAnalytics/RB_mR_editReport"

const BixRightbar = () =>{
    // Primary Definitions
    const state = useSelector(state => state)
    // Render Destination components as per requests
    const listSelector = (list) =>{
        if(list === "RB_mD_columns")
            return <div><RB_MD_COLS/></div>
        else if(list === "RB_mD_edit")
            return <div><RB_MD_EDIT/></div>
        else if(list === "RB_mD_add")
            return <div><RB_MD_ADD/></div>
        else if(list === "RB_mA3_columns")
            return <div><RB_MA3_COLS/></div>
        else if(list === "RB_mA3_edit")
            return <div><RB_MA3_EDIT/></div>
        else if(list === "RB_mA3_add")
            return <div><RB_MA3_ADD/></div>
        else if(list === "RB_mR_addRepAdv")
            return <div><RB_MR_ADDREPORT/></div>
        else if(list === "RB_mR_editReport")
            return <div><RB_MR_EDITREPORT/></div>
        else if(list === "RB_mA_addRepAdv")
            return <div><RB_MA_ADDREPORT/></div>
        else if(list === "RB_mA_editReport")
            return <div><RB_MA_EDITREPORT/></div>
        else
            return <div style={{zIndex:10}}> Test - {list}</div>
    }
    return <div  >
        {listSelector(state.rightBar.body)}
    </div>
}
export default BixRightbar