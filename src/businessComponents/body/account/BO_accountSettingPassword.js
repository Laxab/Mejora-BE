

const AccountSettingPassword = () =>{


    return <div style={{margin:'0px auto auto auto'}}>
        <div style={{margin:'20px',padding:'20px',borderRadius:'5px'}}>
            <h2 style={{marginBottom:'20px'}}>Password Reset</h2>
            Enter your current password
            <div style={{marginTop:'5px',marginBottom:'10px'}}>
                <input type='password' name='currentPassword'/>
            </div>
            Enter new password twice
            <div style={{marginTop:'5px',marginBottom:'5px'}}>
                <input type='password' name='newPassword1'/>
            </div>
            <div style={{marginBottom:'10px'}}>
                <input type='password' name='newPassword1'/>
            </div>
            <button className='stdButton' style={{margin:'auto'}}>Save Password</button>
        </div>
    </div>
}
export default AccountSettingPassword