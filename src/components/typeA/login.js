import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import md5 from "md5";
import fetchData from '../../businessComponents/others/fetchData'
import { useDispatch, useSelector } from "react-redux";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Login = () =>{
    const { register, handleSubmit, formState: { errors }, trigger } = useForm();
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const tdstyle1={width:'150px',padding:'5px 10px 5px'}
    const tdstyle2={width:'150px',padding:'5px 10px 5px'}
    const [a,seta] = useState("")
    const [reset,setreset] = useState(0)


    const onSubmit = (data) => {
        const request = {
            "bu":state?.businessUnit,
            "request":"authentication",
            "sid": null,
            "username":data.username,
            "secret":md5(data.password)
        }
        dispatch({type:'BACKDROP_ON'})
        const loginNow = async (request) => {
            setreset(0)
            var uri = 'api/be/v1.0/a3/authenticate';
            var body = request;
            //const [sidkey,sidvalue] = document.cookie.split("=");

            const data = await fetchData(uri,body,'');
            try{
                dispatch({type:'BACKDROP_OFF'})

                if(data.status === "success"){
                    seta("");
                    if(data.data.account==="reset"){
                        setreset(1)
                    }
                    else if(data.data.account==="active"){
                        if(data?.data?.theme){
                            dispatch({type:'CHANGETHEME',payload:data?.data?.theme});
                        }
                        cookies.set('sid', data.data.sid, { path: '/', expires: new Date(Date.now() + 30 * 60 * 1000)});
                        dispatch({type:'LOGIN_TRUE',payload:data.data})
                    }
                }
                else {
                    if(data.message)
                        seta(data.message);
                    else
                        seta("Authentication Failed");
                    cookies.remove('sid', { path: '/' });
                    dispatch({type:'LOGIN_FALSE'})
                }
            }
            catch (error) {
                dispatch({type:'BACKDROP_OFF'})
                dispatch({type:'CHANGE_BODY',payload:'Maintenance'})
            }
        };
        loginNow(request);
    };

    const onConfirmSubmit =(data) =>{
    }

    const handleChange = async (event) => {
        await trigger(event.target.name);
    };


    return <div style={{width:'100%',height:'100%',display:'flex',
        justifyContent:'center'
        }}>

        <div
            className='fabric'
            style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',
                position:'absolute',zIndex:'10'
            }}
        >

        </div>
        
        <div className="stdbox" style={{borderRadius:'0px',height:'auto',zIndex:'20',display:'flex',margin:'10% 0px auto',padding:'30px 40px 10px'}}>
            <div style={{display:'flex',flexDirection:'column',color:'#000'}}>
                <div className='buttonName fabricTextColor' style={{fontFamily:'logo', fontSize:state.shortLogoSize,margin:'0px',
                    padding:'0px 0px 30px',
                    textAlign:'center',lineHeight:'120px'
                }}>
                        {state.businessNameShort}
                </div>

                {
                    reset===0?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table>
                            <tr>
                                <td style={tdstyle1}>Username</td>
                                <td style={tdstyle2}>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        {...register(
                                                'username', 
                                                { 
                                                    required:"Please Enter Username"
                                                }
                                            )
                                        } 
                                        onKeyUp={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={tdstyle1}>Password</td>
                                
                                <td style={tdstyle2}>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        {...register(
                                                'password', 
                                                { 
                                                    required:"Please Enter Password"
                                                }
                                            )
                                        } 
                                        onKeyUp={handleChange}
                                    />
                                </td>
                            </tr>
                        </table>
                        <div className="stdButtonLogin" style={{margin:'20px 0px 10px'}}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Login
                        </div>
                        {errors.username && <div className="error" style={{textAlign:'center'}}>{errors.username.message}</div>}
                        {errors.password && <div className="error" style={{textAlign:'center'}}>{errors.password.message}</div>}
                        {a!=="" && <div className="error" style={{textAlign:'center'}}>{a}</div>}
                    </form>
                    :
                    <form onSubmit={handleSubmit(onConfirmSubmit)}>
                        <table>
                            <tr>
                                <td style={tdstyle1}>Enter New Password</td>
                                <td style={tdstyle2}>
                                    <input 
                                        type="password1" 
                                        name="password1" 
                                        {...register(
                                                'password1', 
                                                { 
                                                    required:"Enter Password"
                                                }
                                            )
                                        } 
                                        onKeyUp={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={tdstyle1}>Confirm Password</td>
                                <td style={tdstyle2}>
                                    <input 
                                        type="password2" 
                                        name="password2" 
                                        {...register(
                                                'password2', 
                                                { 
                                                    required:"Confirm Password"
                                                }
                                            )
                                        } 
                                        onKeyUp={handleChange}
                                    />
                                </td>
                            </tr>
                        </table>
                        <div className="stdButtonLogin" style={{margin:'20px 0px 10px'}}
                            onClick={handleSubmit(onConfirmSubmit)}
                        >
                            Reset Password
                        </div>
                        {errors.username && <div className="error" style={{textAlign:'center'}}>{errors.username.message}</div>}
                        {errors.password && <div className="error" style={{textAlign:'center'}}>{errors.password.message}</div>}
                        {a!=="" && <div className="error" style={{textAlign:'center'}}>{a}</div>}
                    </form>
                }
                <pre>{/*JSON.stringify(b,2,2)*/}</pre>

            </div>
        </div>

        <div style={{
            position:'absolute',zIndex:'20',bottom:'0px',width:'100%',background:'#000',color:'#666',textAlign:'center',
            padding:'10px 0px', fontSize:'15px', letterSpacing:'0.8px'
        }}>
            {state.loginPageFooter}
        </div>
    </div>
}

export default Login