
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


const BizBody = () =>{

    // Primary Definitions
    const state = useSelector((state)=>state)

    //Business Methods
    const bodySelector = () =>{
        if (state.selectedMenu.name==="Business Accounts")
            return <BODY_MD_TABLE/>
        else {
            return null
        } 
    }

    return <div className="bizBody" style={{padding:'0px',height:'500px'}}>
            {bodySelector()}
    </div>
}
export default BizBody