import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import fetchData from "../../others/fetchData"
import { Box } from "../../others/others_colors"
import {FaUserCircle} from 'react-icons/fa'
import {MdAssessment} from 'react-icons/md'
import {BsFillBagCheckFill} from 'react-icons/bs'


const BodyPatientRecord = () =>{

    const state = useSelector(state => state)

    const [results,setresults] = useState([])
    const dynamicBorderStyle = {
        margin: '0px auto',
        textAlign: 'left',
        padding: '0px 0px 10px',
        borderBottom: state.listingsLoading ? '5px solid #63C859' : '5px solid #ffffff',
        background:'#ffffff',
        borderTopLeftRadius:'0px',borderTopRightRadius:'0px'
    };

    useEffect(()=>{

        const getData = async() =>{
            const uri = 'api/be/std_userInteraction/beAssessment'
            const body = {
                "sid": state.loginData.sid,
                "bu": "GreyInsights",
                "request": "DBA_Select",
                "userid":state.bodyContents.userid,
                "Date":state.bodyContents.Date,
                "form":state.bodyContents.form
            }
            const response = await fetchData (uri,body)
            setresults(response)
        }
        getData()
    },[state.bodyContents])

    return <div style={{width:'90%'}}>
        {
            results?.status==="success" ?
            <div >

                <div style={{height:'80px',border:'0px dashed red',display:'flex'}}>

                    <div style={{margin:'auto 10px auto 0px'}}> <Box dim={'45px'} txt={state.bodyContents.form.slice(0,2)}/></div>

                    <div style={{display:'flex',flexDirection:'column',margin:'auto auto auto 0px',textAlign:'left'}}>
                        <div style={{fontSize:'large',color:'#5B6A71'}}><b>{state.bodyContents.form}</b></div>
                        <div style={{fontSize:'small'}}>{state.bodyContents.code}</div>
                    </div>

                    <div  style={{display:'flex',margin:'auto 10px auto auto',flexDirection:'column'}}>
                        <div style={{fontSize:'small',margin:'auto 0px auto auto'}}>Score: {state.bodyContents.average}</div>
                        <div style={{fontSize:'large',margin:'auto 0px auto auto'}}><b>{state.bodyContents.category}</b></div>
                    </div>
                </div>

                <div className="std_box_2" style={{height:'50px',border:'0px dashed #ddd',margin:'10px 0px 0px',borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px',display:'flex',borderBottom:'1px solid #eee'}}>
                        
                        <FaUserCircle style={{margin:'auto 5px auto 0px',fontSize:'40px'}}/>
                        <div style={{fontSize:'large',color:'#5B6A71',margin:'auto auto auto 0px'}}>
                            <b>{results.data.userinfo[0].fname} {results.data.userinfo[0].lname}</b>
                        </div>
                        
                </div>
                <div className="std_box_2" style={dynamicBorderStyle}>
                    <div  className="scrollbarTypeDefault"   style={{height:'calc(100vh - 300px)',overflow:'auto',margin:'0px 0px 0px'}}>


                        <div style={{width:'90%',textAlign:'right',display:'flex',justifyContent:'flex-end',height:'60px',margin:'10px auto 0 auto'}}>
                            <div style={{margin:'auto 5px auto 0px'}}>
                                <div><b>Assessment</b></div>
                                <div style={{fontSize:'small'}}>{results.data.userinfo[0].Date}</div>
                            </div>
                            <MdAssessment style={{fontSize:'50px',lineHeight:'0px',margin:'auto 0px auto 0px'}}/> 
                        </div>

                        <div className="stdbox" style={{margin:'10px auto auto auto',padding:'0px',width:'calc(100% - 40px)',boxSizing:'border-box'}}>
                        {
                            results.data.results.map((item,i)=>(
                                <div key={i} className='stdBorderBottomDashed'>
                                    <div style={{padding:'10px 0 0 10px'}}>{item.question}</div>
                                    <div style={{textAlign:'right',padding:'0px 10px 10px 0'}}><b>{item.answer}</b></div>
                                </div>
                            ))
                        }
                        </div>

                        <div style={{width:'90%',textAlign:'right',display:'flex',justifyContent:'flex-end',height:'60px',margin:'50px auto 0 auto'}}>
                            <div style={{margin:'auto 5px auto 0px'}}>
                                <div><b>About: {results.data.userinfo[0].fname} {results.data.userinfo[0].lname}</b></div>
                                <div style={{fontSize:'small'}}>{results.data.userinfo[0].gender}, {results.data.userinfo[0].married}</div>
                            </div>
                            <FaUserCircle style={{fontSize:'50px',lineHeight:'0px',margin:'auto 0px auto 0px'}}/> 
                        </div>
                        <div className="stdbox" style={{margin:'10px auto auto auto',padding:'0px',width:'calc(100% - 40px)',boxSizing:'border-box'}}>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Full Name</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].fname} {results.data.userinfo[0].lname}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Email Address</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].email}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Date of Birth</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].dob}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Religion</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].religion}</b></div>
                            </div>
                            <div >
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Tribe</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].tribe}</b></div>
                            </div>
                        </div>


                        <div style={{width:'90%',textAlign:'right',display:'flex',justifyContent:'flex-end',height:'60px',margin:'50px auto 0 auto'}}>
                            <div style={{margin:'auto 5px auto 0px'}}>
                                <div><b>Occupation Details</b></div>
                                <div style={{fontSize:'small'}}>{results.data.userinfo[0].occupation}</div>
                            </div>
                            <BsFillBagCheckFill style={{fontSize:'50px',lineHeight:'0px',margin:'auto 0px auto 0px'}}/> 
                        </div>
                        <div className="stdbox" style={{margin:'10px auto 20px auto',padding:'0px',width:'calc(100% - 40px)',boxSizing:'border-box'}}>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Occupation Details</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].occupation}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Number of years worked for current organization</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].years}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Designation in current organization</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].designation}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Job Satisfaction</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].jobsat}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Satisfaction with current payment</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].paysat}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Satisfaction with promotion in current organization</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].promotion}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Satisfaction with the pension</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].pensionsat}</b></div>
                            </div>
                            <div className='stdBorderBottomDashed'>
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Satisfaction with current designation of {results.data.userinfo[0].designation} in {results.data.userinfo[0].occupation}</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].paysat}</b></div>
                            </div>
                            <div >
                                <div style={{textAlign:'left',padding:'10px 0 0 10px'}}>Satisfaction with welfare culture in current organization</div>
                                <div style={{textAlign:'right',padding:'0 10px 10px 0'}}><b>{results.data.userinfo[0].welfaresat}</b></div>
                            </div>
                        </div>

                    </div>
                        
                </div>
                

            </div>
            :
            <div style={{marginTop:'20px'}}>Please select an item</div>
        }
    </div>
}

export default BodyPatientRecord