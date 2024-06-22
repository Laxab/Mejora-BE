import { useDispatch, useSelector } from "react-redux"
import { Box } from "../../others/others_colors"
import BO_sket_main from "../../body/mejoraSketches/BO_sket_main"
import { useEffect, useState } from "react"
import fetchData from "../../others/fetchData"
import { RiDownload2Fill } from 'react-icons/ri';
import { MdDelete, MdEditSquare } from "react-icons/md"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import * as XLSX from 'xlsx'
import { RenderChart } from "./analyticsComponents/recharts"
import { TableDisp } from "./tablesDisp"



const BO_mR_table = () =>{
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [bodyContentsInput,setBodyContentsInput] = useState([])
    const [reportData,setReportData] = useState([])
    const [reportHeaderVals, setReportHeaderVals] = useState([])
    const [tableCellIndex,setTableCellIndex] = useState(0)
    const [tableCellCount,setTableCellCount] = useState(15)
    const [thisAnalytics,setthisAnalytics] = useState({})


    useEffect(()=>{

        const getListingData = async () =>{

            const url = 'api/be/analytics/getReportNamesByName'
            const body = {
                "sid": state.loginData.sid,
                "request": "DBA_Select",
                "bu":state?.loginData?.identity?.buName ?? "",
                "type":"businessLogic",
                "grouping":state?.selectedMenu?.grouping,
                "name":state?.bodyContents[0]?.name
            }
            const response = await fetchData(url,body)
            if(response.status==="success"){
                setthisAnalytics(response.data)
            }
        }
        getListingData()
        if(state.reset!=="") {
            if(state.reset==="BODYCONTENTS_OFF")
                dispatch({type:'BODYCONTENTS_OFF'});
            dispatch({type:'RESET',payload:""});
            
        }
    },[state.reset, state?.bodyContents[0]?.name])

    useEffect(()=>{
        
        setTableCellIndex(0)
        setTableCellCount(15)
        try{
            if(state?.bodyContents[0]?.input)
                if(JSON.parse(state?.bodyContents[0]?.input))
                    setBodyContentsInput(JSON.parse(state?.bodyContents[0]?.input))
                else
                    setBodyContentsInput(false)

        }
        catch{
            setBodyContentsInput(false)
        }
    },[state?.bodyContents[0]?.input])

    const [type,setType]=useState("");
    const [repName,setrepName]=useState("")
    useEffect(()=>{
        
        /**
         * This method loads the contents from the database
         */
        
        const loadReportContents = async () =>{
            dispatch({type:'BACKDROP_ON'})
            const url = 'api/be/analytics/getReportData'
            let body = {}

            try{
                if(bodyContentsInput===false){
                    body = {
                        "sid": state.loginData.sid,
                        "request": "DBA_Select",
                        "bu":state?.loginData?.identity?.buName ?? "",
                        "type":'bodyContentsInput?.selectDatabase',
                        "reportName":state?.bodyContents[0]?.name
                    }
                }
                else{
                    body = {
                        "sid": state.loginData.sid,
                        "request": "DBA_Select",
                        "bu":state?.loginData?.identity?.buName ?? "",
                        "type":JSON.parse(state?.bodyContents[0]?.input)?.selectDatabase,
                        "reportName":state?.bodyContents[0]?.name
                    }
                }
                const response = await fetchData(url,body)
                if(response.status==="success"){
                    setReportData(response.data)
                    setReportHeaderVals(getTableHeaders(response?.data))
                }
            }
            catch{
            }
            dispatch({type:'BACKDROP_OFF'})
        }
        if(state?.bodyContents[0]?.input)
            loadReportContents()
        if(state.reset!=="") dispatch({type:'RESET',payload:""})
    },[bodyContentsInput,state.reset,state?.bodyContents])

    const Pagination = (nav) =>{
        
            if(nav==='left'){
                if(tableCellIndex>0)
                    setTableCellIndex(tableCellIndex - 1)
            }
            else if (nav==="right"){
                if(reportData?.length > ((tableCellIndex + 1)*tableCellCount))
                    setTableCellIndex(tableCellIndex + 1)
                else alert("No more records")
            }
        
        else alert("Reached Limit")

    }
    const PaginationChange = (e)=>{
        setTableCellIndex(0)
        setTableCellCount(e.target.value)
    }
    const downloadReport = () =>{
        let confirmation = window.confirm("You are about to download business/user sensetive data. By clicking OK, you are agreeing to uphold its confidentiality in accordance with the General Data Protection Regulation (GDPR).")
        if(confirmation){

            const keys = Object.keys(reportData[0])
            const data = [keys, ...reportData.map(item => keys.map(key => item[key]))];
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, `Data`);
            // Generate a download link for the Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            // Create a temporary link and click it to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = `Reports_${state?.bodyContents[0]?.dispName}_${new Date().toLocaleDateString()}.xlsx`;
            a.click();
        
            // Cleanup
            URL.revokeObjectURL(url);

        }
    }
    const editReport =() =>{
        dispatch({type:"RIGHTBAR_ON",title:`Reports`, body:'RB_mA_editReport', width:'500px',contents:'cols'})
    }

    const renderHeader = () =>{
        return <div style={{width:'90%',height:'79px',border:'0px dashed red',display:'flex',margin:'auto'}}>
            {
                state?.bodyContents[0]?.dispName &&
                <div style={{margin:'auto 10px auto 0px'}}> <Box dim={'45px'} txt={state?.bodyContents[0]?.name}/></div>
            }
            <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                <div style={{fontSize:'large'}}><b>{state?.bodyContents[0]?.dispName}</b></div>
            </div>

            <div style={{margin:'auto 0px auto 10px', display:'flex'}}>
                {
                    state?.selectedMenu?.rbac?.edit
                    ?
                    <div onClick={()=>editReport()} className="titleButtonFirst" style={{display:'flex',margin:'auto 0px auto auto'}}>
                        <MdEditSquare style={{display:'flex',margin:'auto',fontSize:'20px'}}/>
                    </div>
                    :
                    <div onClick={()=>alert("No permission to edit")} className="titleButtonFirst_disabled" style={{display:'flex',margin:'auto 0px auto auto'}}>
                        <MdEditSquare style={{display:'flex',margin:'auto',fontSize:'20px'}}/>
                    </div>
                }
                {
                    state?.selectedMenu?.rbac?.download
                    ?
                    <div onClick={()=>downloadReport()} className="titleButtonLast" style={{display:'flex',margin:'auto 0px auto auto'}}>
                        <RiDownload2Fill style={{display:'flex',margin:'auto',fontSize:'20px'}}/>
                    </div>
                    :
                    <div onClick={()=>alert("No permission to download")} className="titleButtonLast_disabled" style={{display:'flex',margin:'auto 0px auto auto'}}>
                        <RiDownload2Fill style={{display:'flex',margin:'auto',fontSize:'20px'}}/>
                    </div>
                }
            </div>

        </div>
    }

    const getTableHeaders = (a) =>{
        let keys = []
        if(a?.length>0)
            keys = Object.keys(a[0])
        let temp = [], temp2 = []
        let charlen = 0, currentSize = 0, sum = 0
        keys.map((item,i)=>{
            charlen = 0
            a.map((aItem,aIndex)=>{
                currentSize = String(aItem[item])?.length
                if (charlen < currentSize)
                    charlen = currentSize
            })
            temp.push({
                [item]:charlen
            })
        })
        temp?.forEach(obj => {
            Object?.values(obj)?.forEach(val => {
                sum += val
            })
        })
        temp.map((item,i)=>{
            charlen = parseInt(( item[keys[i]] / sum ) *100)
            if (charlen===0) charlen = 1

            if(charlen<20) charlen = charlen + 10
            else charlen = charlen - 10
            temp2.push({[keys[i]]:charlen})
            
        })
        return temp2
    }

    const renderTableCells = (data) =>{
        let sliceStart = tableCellIndex*tableCellCount;
        let sliceEnd = (tableCellIndex*tableCellCount) + tableCellCount;
        let slicedData = data?.slice(sliceStart,sliceEnd)

        return  <>
                    {
                        slicedData?.length > 0
                        &&
                        slicedData?.map((reportItem,i)=>(
                            <div className="stdBorderBottomDashed" style={{display:'flex'}}>
                                {
                                    reportHeaderVals?.map((col,j)=>(
                                        <div 
                                            className="scrollbarTypeDefault"
                                            style={{
                                                textAlign:'left',
                                                display:'flex', 
                                                padding:'10px',
                                                width:`calc(${Object?.values(col)[0]}% - 20px)`,
                                                overflow:'auto'
                                            }}
                                        >
                                            {reportItem[Object?.keys(col)]}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </>
    }
    const renderTable = () =>{
        return <div className="scrollbarTypeDefault" style={{width:'100%',height:'calc(100vh - 140px)',margin:'auto', overflow:'auto'}}>
            <div  className="scrollbarTypeDefault tableTitle" style={{width:'100%',overflow:'auto',display:'flex'}}>
                {
                    reportHeaderVals?.map((item,i)=>(
                        <div style={{border:'0px dashed red',display:'flex', padding:'10px',width:`calc(${Object.values(item)[0]}% - 20px)`}}>
                            {Object.keys(item)[0]}
                        </div>
                    ))
                }
            </div>
            <div className="scrollbarTypeDefault" style={{width:'100%',overflow:'auto', height:'calc(100vh - 180px)'}}>
                {
                    reportData?.length>0
                    ?
                    renderTableCells(reportData)
                    :
                    BO_sket_main({title:"No data found in this report",select:"br_noData2"})
                }
            </div>

        </div>
    }

    const data = [
        {
            name:"Alpha",
            Tcs:200,
            Infosys:100,
            Capita:500
        },
        {
            name:"Bravo",
            Tcs:400,
            Infosys:50,
            Capita:620
        }
    ]

    const data2 = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
    const renderGraphs = () =>{
        
        return  <RenderChart data={reportData} title={state?.bodyContents[0]?.dispName} chartType={thisAnalytics[0]?.widget}/>
        
    }
    const scrollUp = () =>{
        alert(1)
        window.scrollTo(0, 0);
    }

    return <div  style={{width:'100%'}}>
        {
            state?.bodyContents?.length!==0
            ?
            <div>
                {renderHeader()}
                <div onLoad={()=>scrollUp()} className="scrollbarTypeDefault" style={{width:'100%',overflow:'auto', height:'calc(100vh - 180px)'}}>
                    
                    {renderGraphs()}
                    
                    <TableDisp data={reportData}/>
                </div>

            </div>
            :
            <div>
                {BO_sket_main({title:"Select report from left menu",select:"assetSelection"})}
            </div>
        }


    </div>
}

export default BO_mR_table