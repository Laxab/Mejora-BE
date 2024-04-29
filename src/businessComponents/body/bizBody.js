
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
import { lazy, Suspense } from "react"

const BODY_MA3_TABLE = lazy(()=>import("./mejoraA3/BO_mA3_table"))
const BODY_MA3_ANALYTICS = lazy(()=>import("./mejoraA3/BO_mA3_analytics"))
const BODY_NV_HISTORY = lazy(()=>import("../networkVirtualization/BO_nV_history"))
const BODY_NV_SEARCH = lazy(()=>import("../networkVirtualization/BO_nV_search"))
const DefaultSelectLeft = lazy(()=>import("./subbody/defaultSelectLeft"))
const ACCOUNT_SETTING_PASSWORD = lazy(()=>import("./account/BO_accountSettingPassword"))
const ACCOUNT_SETTING_THEME = lazy(()=>import("./account/BO_accountSettingTheme"))
const BODY_MA3_LOGGING = lazy(()=>import("./mejoraA3/BO_mA3_logging"))
const ACCOUNT_THEMES = lazy(()=>import("./account/BO_accountThemes"))
const BODY_MD_LOGGING = lazy(()=>import("./mejoraDefault/BO_mD_logging"))
const BODY_MD_ANALYTICS = lazy(()=>import("./mejoraDefault/BO_mD_analytics"))
const ACCOUNT_ROLES = lazy(()=>import("./account/BO_accountRoles"))
const ACCOUNT_DETAILS = lazy(()=>import("./account/BO_accountDetails"))
const BODY_MD_TABLE = lazy(()=>import("./mejoraDefault/BO_mD_table"))
const HOMEPAGE = lazy(()=>import("../../components/typeA/homepage"))


const BizBody = () =>{

    // Primary Definitions
    const state = useSelector((state)=>state)

    //Business Methods
    const bodySelector = () =>{
        
        if (state.selectedMenu.dynamic !== false){
            if ((state.selectedMenu.dynamic==="mejoraDefault")&&(state.selectedMenu.isMenu.name==="List"))
                return <Suspense fallback={<div>Loading</div>}>
                            <BODY_MD_TABLE/>
                        </Suspense>
            else if ((state.selectedMenu.dynamic==="mejoraDefault")&&(state.selectedMenu.isMenu.name==="Analytics"))
                return <Suspense fallback={<div>Loading</div>}><BODY_MD_ANALYTICS/></Suspense>
            else if ((state.selectedMenu.dynamic==="mejoraDefault")&&(state.selectedMenu.isMenu.name==="Logging"))
                return <Suspense fallback={<div>Loading</div>}><BODY_MD_LOGGING/></Suspense>
            else if ((state.selectedMenu.dynamic==="mejoraA3")&&(state.selectedMenu.isMenu.name==="List"))
                return <Suspense fallback={<div>Loading</div>}><BODY_MA3_TABLE/></Suspense>
            else if ((state.selectedMenu.dynamic==="mejoraA3")&&(state.selectedMenu.isMenu.name==="Analytics"))
                return <Suspense fallback={<div>Loading</div>}><BODY_MA3_ANALYTICS/></Suspense>
            else if ((state.selectedMenu.dynamic==="mejoraA3")&&(state.selectedMenu.isMenu.name==="Logging"))
                return <Suspense fallback={<div>Loading</div>}><BODY_MA3_LOGGING/></Suspense>
        }
        else{
            if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Account Details"))
                return <Suspense fallback={<div>Loading</div>}><ACCOUNT_DETAILS/></Suspense>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Roles"))
                return <Suspense fallback={<div>Loading</div>}><ACCOUNT_ROLES/></Suspense>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Developer Lookup"))
                return <Suspense fallback={<div>Loading</div>}><ACCOUNT_THEMES/></Suspense>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Settings")&&(state.bodyContents.dispName==="Roles"))
                return <Suspense fallback={<div>Loading</div>}><ACCOUNT_ROLES/></Suspense>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Settings")&&(state.bodyContents.dispName==="Theme"))
                return <Suspense fallback={<div>Loading</div>}><ACCOUNT_SETTING_THEME/></Suspense>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Settings")&&(state.bodyContents.dispName==="Password"))
                return <Suspense fallback={<div>Loading</div>}><ACCOUNT_SETTING_PASSWORD/></Suspense>
            else if ((state.selectedMenu.name==="Account")&&(state.selectedMenu.isMenu.name==="Settings"))
                return <Suspense fallback={<div>Loading</div>}><DefaultSelectLeft/></Suspense>
            else if ((state.selectedMenu.name==="Network Visualization") && (state.selectedMenu.isMenu.name==="Search"))
                return <Suspense fallback={<div>Loading</div>}><BODY_NV_SEARCH/></Suspense>
            else if ((state.selectedMenu.name==="Network Visualization") && (state.selectedMenu.isMenu.name==="History"))
                return <Suspense fallback={<div>Loading</div>}><BODY_NV_HISTORY/></Suspense>
            else if ((state.selectedMenu.name==="Home") && (state.selectedMenu.isMenu.name==="About"))
                return <Suspense fallback={<div>Loading</div>}><HOMEPAGE/></Suspense>
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