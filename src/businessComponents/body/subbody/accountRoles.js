import { useSelector } from "react-redux"

const AccountDetails = () =>{

    const state = useSelector(state => state)
    
    return <div style={{marginLeft:'auto',marginRight:'auto',textAlign:'left'}}>
        
        <div style={{margin:'10px'}}>
            {
                state?.sidenav?.map((data,i)=>(
                    <div className="std_box" style={{padding:'0px',margin:'0px'}}>
                        <div 
                            className="backgroundShaded1" 
                            style={{
                                marginTop:'20px', borderTopLeftRadius:'10px', borderTopRightRadius:'10px', padding:'20px'
                            }} >
                            <b>{data.name}</b>
                        </div>
                        <div style={{padding:'20px',width:'700px',background:'#2C3E50',color:'#2ECC71',textAlign:'left',borderBottomRightRadius:'10px',borderBottomLeftRadius:'10px'}}>
                            <pre>
                                dynamicListings: 
                                {
                                    !data?.dynamicListings ? "null" :
                                    JSON.stringify(data.dynamicListings,2,2)
                                }
                            </pre>
                            <pre>
                                menu: {JSON.stringify(data.menu,2,2)}
                            </pre>
                        </div>
                    </div>
                ))
            }
        </div>

        <div style={{border:'0px dashed red',height:'100px'}}>

        </div>

    </div>
    
}

export default AccountDetails