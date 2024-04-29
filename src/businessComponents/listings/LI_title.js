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
import {MdOutlineSettings} from 'react-icons/md'

const LI_title = (props) =>{
    const {title} = props

    return <div className="stdBorder" style={{borderTop:"0px",borderLeft:"0px",borderRight:"0px",height:'60px',display:'flex'}}>

        <div className="mainTitleIcons" style={{display:'flex',width:'100%',margin:'0px auto 0px 20px',border:'0px dashed #666'}}>
            <div style={{display:'flex',marginRight:'0px',borderRadius:'5px',height:'40px',width:'40px'}}><MdOutlineSettings style={{fontSize:'25px',display:'flex',margin:'auto'}}/></div>
            <b>{title}</b>
        </div>

    </div>

}

export default LI_title