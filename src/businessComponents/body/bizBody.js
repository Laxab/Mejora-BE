
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
Title:      BUSINESS BODY
Overview: 	
            This component renders the body by using below inputs:
            Redux Input:
                state.selectedMenu.name (Eg. Manage) 
                state.listings (Eg. Medical Log)

Usage:
            Usage is only done in sidenav.js, as the menu items will change on every click of item in sidenav
            dispatch({type:'SELECTMENU',payload:data})

Author: 	Abhijit Sawant (abhijitmsawant@gmail.com)
Creation Date: 17 Nov 2023
*/
// Import Components
import { useSelector } from "react-redux"
import BODY_MD_TABLE from "./mejoraDefault/BO_mD_table"
import ACCOUNT_DETAILS from "./account/BO_accountDetails"
import ACCOUNT_ROLES from "./account/BO_accountRoles"
import BODY_MD_ANALYTICS from "./mejoraDefault/BO_mD_analytics"
import BODY_MD_LOGGING from "./mejoraDefault/BO_mD_logging"
import ACCOUNT_THEMES from "./account/BO_accountThemes"
import BODY_MA3_ANALYTICS from "./mejoraA3/BO_mA3_analytics"
import BODY_MA3_TABLE from "./mejoraA3/BO_mA3_table"
import BODY_MA3_LOGGING from "./mejoraA3/BO_mA3_logging"
import ACCOUNT_SETTING_THEME from "./account/BO_accountSettingTheme"
import ACCOUNT_SETTING_PASSWORD from "./account/BO_accountSettingPassword"
import DefaultSelectLeft from "./subbody/defaultSelectLeft"
import BODY_NV_SEARCH from "../networkVirtualization/BO_nV_search"
import BODY_NV_HISTORY from "../networkVirtualization/BO_nV_history"

const BizBody = () =>{

    // Primary Definitions
    const state = useSelector((state)=>state)

    //Business Methods
    const bodySelector = () =>{
        
        if (state.selectedMenu.dynamic !== false){
            if ((state.selectedMenu.dynamic==="mejoraDefault")&&(state.selectedMenu.isMenu.name==="List"))
                return <BODY_MD_TABLE/>
            else if ((state.selectedMenu.dynamic==="mejoraDefault")&&(state.selectedMenu.isMenu.name==="Analytics"))
                return <BODY_MD_ANALYTICS/>
            else if ((state.selectedMenu.dynamic==="mejoraDefault")&&(state.selectedMenu.isMenu.name==="Logging"))
                return <BODY_MD_LOGGING/>
            else if ((state.selectedMenu.dynamic==="mejoraA3")&&(state.selectedMenu.isMenu.name==="List"))
                return <BODY_MA3_TABLE/>
            else if ((state.selectedMenu.dynamic==="mejoraA3")&&(state.selectedMenu.isMenu.name==="Analytics"))
                return <BODY_MA3_ANALYTICS/>
            else if ((state.selectedMenu.dynamic==="mejoraA3")&&(state.selectedMenu.isMenu.name==="Logging"))
                return <BODY_MA3_LOGGING/>
        }
        else{
            if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Account Details"))
                return <ACCOUNT_DETAILS/>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Roles"))
                return <ACCOUNT_ROLES/>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Developer Lookup"))
                return <ACCOUNT_THEMES/>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Settings")&&(state.bodyContents.dispName==="Roles"))
                return <ACCOUNT_ROLES/>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Settings")&&(state.bodyContents.dispName==="Theme"))
                return <ACCOUNT_SETTING_THEME/>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Settings")&&(state.bodyContents.dispName==="Password"))
                return <ACCOUNT_SETTING_PASSWORD/>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Settings"))
                return <DefaultSelectLeft/>
            else if ((state.selectedMenu.name==="Network Visualization") && (state.selectedMenu.isMenu.name==="Search"))
                return <BODY_NV_SEARCH/>
            else if ((state.selectedMenu.name==="Network Visualization") && (state.selectedMenu.isMenu.name==="History"))
                return <BODY_NV_HISTORY/>
            else return null
        }
    }

    return <div className="bizBody" style={{padding:'0px',height:'500px'}}>
            {
                /*
                !checkSubComponent(state?.sidenav, state?.selectedMenu?.name, state?.bodyContents?.name, state.selectedMenu.isMenu.name)
                ?
                bodySelector()
                :
                BO_sket_main({title:"Select subcomponent from above",select:"assetSelection"})

                */
                
                bodySelector()
            }
    </div>
}
export default BizBody