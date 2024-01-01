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
Title:      BUSINESS LISTINGS
Overview: 	
            This component takes below redux inputs and renders the "Destination component" in Listings.
            Redux Inputs (Button from "SideNav")
            state.selectedMenu.name (eg: Business Accounts)
            state.selectedMenu.isMenu.name (eg: Manage)
Usage:
            Usage is only done in sidenav.js, as the menu items will change on every click of item in sidenav
            dispatch({type:'SELECTMENU',payload:data})

Author: 	Abhijit Sawant (abhijitmsawant@gmail.com)
Creation Date: 17 Nov 2023
*/
import { useSelector } from "react-redux"
// Import Destination
import LIST_MD_ITEMS from "../body/mejoraDefault/LI_mD_items"

const BizListings = () =>{

    // Primary Definitions
    const state = useSelector(state => state)
    // Business Methods
    //  else if((state.selectedMenu.name === "Assessment")&&(list === "Patient Record")) return <ListPatientRecord/>
    const listSelector = () =>{
        if(state.selectedMenu.dynamic!==false){
            if(state.selectedMenu.dynamic === "mejoraDefault") 
                return <LIST_MD_ITEMS/>
        }
        else{
            if(state.selectedMenu.name === "random") 
                return null
        }
    }
    return <div >
        {listSelector()}
    </div>
}
export default BizListings