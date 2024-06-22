
const scrollUp = () =>{
    window.scrollTo(0, 0);
}
export const TableDisp = (props) =>{
    const {data} = props

    try{
        
        const headers = Object?.keys(data[0])
        return <div style={{width:'100%'}}>
    
            <h3 style={{margin:'40px auto auto auto'}}>Data Representation</h3>
            <div style={{display:'flex'}}>
                <div onLoad={()=>scrollUp()} className="stdBackground stdBorder scrollbarTypeDefault" style={{width:'60%',margin:'10px auto 0px auto', borderRadius:'9px'}}>
    
                    <div className="stdBorder" style={{display:'flex',padding:'20px',borderLeft:'0px',borderRight:'0px',borderTop:'0px'}}>
                    {
                        headers?.map((key,i)=>(
                            <div style={{width:'150px',overflow:'auto',margin:'auto'}}>
                                {key}
                            </div>
                        ))
                    }
                    </div>
    
                    <div style={{padding:'20px 20px 0 20px',maxHeight:'calc(100vh - 400px)',overflow:'auto'}}>
                    {
                        data?.map((item,i)=>(
                            <div style={{display:'flex',paddingBottom:'20px'}}>
                                {
                                    headers.map((key,i)=>(
                                        <div style={{width:'150px',overflow:'auto',margin:'auto'}}>
                                            {item[key]}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
    
            <h3 style={{margin:'40px auto auto auto'}}>JSON Representation</h3>
            <div style={{display:'flex'}}>
                <div onLoad={()=>scrollUp()} className="stdBackground stdBorder scrollbarTypeDefault" style={{width:'60%',maxHeight:'calc(100vh - 400px',overflow:'auto',margin:'10px auto 0px auto', borderRadius:'9px'}}>
                        <pre style={{textAlign:'left'}}>
                        {JSON.stringify(data,2,2)}
                    </pre>
                </div>
            </div>
    
        </div>
    }
    catch{
        return <div></div>
    }
}