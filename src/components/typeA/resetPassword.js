import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import md5 from "md5";
import fetchData from '../../businessComponents/others/fetchData'
import { useDispatch } from "react-redux";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ResetPassword = () =>{
    const { register, handleSubmit, formState: { errors }, trigger } = useForm();
    const dispatch = useDispatch()

    const tdstyle1={width:'150px',padding:'5px 10px 5px'}
    const tdstyle2={width:'150px',padding:'5px 10px 5px'}
    const [a,seta] = useState("")


    const onSubmit = (data) => {
        const request = {
            "bu":"GreyInsights",
            "request":"authentication",
            "sid": null,
            "username":data.username,
            "secret":md5(data.password)
        }
        dispatch({type:'BACKDROP_ON'})
        const loginNow = async (request) => {
            var uri = 'api/be/v1.0/a3/authenticate';
            var body = request;
            //const [sidkey,sidvalue] = document.cookie.split("=");

            const data = await fetchData(uri,body,'');
            try{
                dispatch({type:'BACKDROP_OFF'})

                if(data.status === "success"){
                    seta("");
                    cookies.set('sid', data.data.sid, { path: '/', expires: new Date(Date.now() + 30 * 60 * 1000)});
                    dispatch({type:'LOGIN_TRUE',payload:data.data})
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

    const handleChange = async (event) => {
        await trigger(event.target.name);
    };

    return <div className='fabric' style={{width:'100%',height:'100%',display:'flex',
    justifyContent:'center', 
    }}>
        
        <div className="stdbox" style={{height:'auto',display:'flex',margin:'auto 0px auto',padding:'30px 40px 30px'}}>
            <div style={{display:'flex',flexDirection:'column',color:'#000'}}>
                <div className='buttonName' style={{fontFamily:'logo', fontSize:'170px',margin:'0px',
                    padding:'0px 0px 10px',
                    textAlign:'center',color:'#333',lineHeight:'150px'
                }}>
                        be
                </div>
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
                        Reset Password
                    </div>
                    {errors.username && <div className="error" style={{textAlign:'center'}}>{errors.username.message}</div>}
                    {errors.password && <div className="error" style={{textAlign:'center'}}>{errors.password.message}</div>}
                    {a!=="" && <div className="error" style={{textAlign:'center'}}>{a}</div>}
                </form>

            </div>
        </div>
    </div>
}

export default ResetPassword