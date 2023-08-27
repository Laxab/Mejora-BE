// 6 Aug 2023

import { useEffect, useRef, useState } from "react"
import { LoadContentsAPI } from "../../body/body_apiCall"
import { useDispatch, useSelector } from "react-redux"
import { Box } from "../../others/others_colors"

const ListPatientRecord = () =>{

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const contentRef = useRef(null);
    const [contents,setcontents] = useState([])
    const [pageNumber, setpageNumber] = useState(1)
    const [bugFix,setbugFix] = useState(0)
    const [stdbgHighlight,setstdbgHighlight] = useState(999)

    useEffect(()=>{


        const initialize = async() =>{
            //---> Begin the call
            setcontents([])
            dispatch({type:'LISTINGS_LOADING_ON'})
            const response = await LoadContentsAPI(
                'api/be/std_userAssessment/select',
                "DBA_Select",
                state.loginData,
                'assessment',
                50,
                "INIT",
                "",
                "DESC"
            )
            console.log(response)
            setcontents(response)
            dispatch({type:'LISTINGS_LOADING_OFF'})
        }
        initialize()

    },[])


    const handleScroll = async () => {
        /**
         * Detect instance when scrollbar of listings hits bottom, which should trigger to load more contents in 'useEffect' by changing
         * pageNumber parameter
        */
         
        if (contentRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = contentRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                const newpageNumber = pageNumber + 1
                setpageNumber(newpageNumber)
                //---> Begin the call
                dispatch({type:'LISTINGS_LOADING_ON'})
                if(bugFix===0){
                    const response = await LoadContentsAPI(
                        'api/be/std_userAssessment/select',
                        "DBA_Select",
                        state.loginData,
                        'assessment',
                        newpageNumber,
                        "ASYNC",
                        "",
                        "DESC"
                    )
                    setcontents(response)
                }
                else
                    setbugFix(0)
                dispatch({type:'LISTINGS_LOADING_OFF'})
            }
        }
    };
    const clicked = (data,i) =>{
        setstdbgHighlight(i)
        dispatch({type:'BODYCONTENTS_ADD',payload:data})
        
    }
  

    // JSX Return
    return <div>
        <div style={{display:'flex',height:'60px'}}>
            <div style={{margin:'auto auto auto 10px'}}>Search here</div>
        </div>
        <div ref={contentRef} onScroll={handleScroll} className="scrollbarTypeDefault" 
            style={{height:'calc(100vh - 60px)',overflow:'auto',margin:'0px 0px 0px'}}>
            {
                contents.map((item,index)=>(
                    <div key={index} style={{display:'flex',height:'80px'}} onClick={()=>clicked(item,index)} className={ stdbgHighlight===index?"stdbgHighlight  stdbgList":" stdbgList"}>
                        <div style={{margin:'auto 0px auto 10px'}} ><Box dim={'40px'} txt={item.form.slice(0,2)} /></div>
                        <div style={{margin:'auto 10px auto 10px', width:'100%'}}>
                            <div style={{textAlign:'left'}}>{item.userid.length>20 ? item.userid.slice(0,20)+"..." : item.userid}</div>
                            <div style={{textAlign:'right', fontSize:'small'}}>{item.code.length>30 ? item.code.slice(0,30)+"..." : item.code}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
}


export default ListPatientRecord