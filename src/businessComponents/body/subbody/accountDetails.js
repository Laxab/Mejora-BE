import { useSelector, useDispatch } from "react-redux"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const AccountDetails = () =>{

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const signOut = () =>{
        cookies.remove('sid', { path: '/' });
        dispatch({type:'LOGIN_FALSE'})
        window.location.reload()
    }
    
    return <div style={{marginLeft:'auto',marginRight:'auto',textAlign:'left'}}>
        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',marginTop:'20px'}}>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px'}}>Name</div>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>{state.loginData.identity?.userName}</div>
        </div>
        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',borderTop:'0px solid #fff'}}>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px'}}>Role</div>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>{state.loginData.identity?.idRole}</div>
        </div>
        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',borderTop:'0px solid #fff'}}>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px'}}>User ID ({state.loginData.identity?.idType})</div>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>{state.loginData.identity?.userid}</div>
        </div>
        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',borderTop:'0px solid #fff'}}>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px'}}>ID Status</div>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>{state.loginData.identity?.idStatus}</div>
        </div>
        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',borderTop:'0px solid #fff'}}>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px'}}>Registered Email</div>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>{state.loginData.identity?.userEmail}</div>
        </div>
        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',borderTop:'0px solid #fff'}}>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px'}}>Mobile Number</div>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>{state.loginData.identity?.userMobile}</div>
        </div>
        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',borderTop:'0px solid #fff'}}>
            <div style={{width:'30%', margin:'auto',padding:'0px 10px'}}>Session ID</div>
            <div style={{width:'70%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>{state.loginData?.sid}</div>
        </div>

        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',marginTop:'20px'}}>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px'}}>Business Unit</div>
            <div style={{width:'50%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>{state.loginData.identity?.buName}</div>
        </div>
        <div className='stdBorder stdBackground' style={{display:'flex', width:'500px', height:'50px',borderTop:'0px solid #fff'}}>
            <div style={{width:'30%', margin:'auto',padding:'0px 10px'}}>Business Status</div>
            <div style={{width:'70%', margin:'auto',padding:'0px 10px',textAlign:'right'}}>
                {
                    state.loginData.identity?.buStatus==="active" ? "Active" : "Inactive. Please contact support immediately."
                }
            </div>
        </div>

        <button onClick={()=>signOut()} className='stdButtonRed' style={{display:'flex', width:'500px', height:'50px',marginTop:'20px'}}>
            <div style={{margin:'auto'}}>Sign Out</div>
        </button>

    </div>
    
}

export default AccountDetails