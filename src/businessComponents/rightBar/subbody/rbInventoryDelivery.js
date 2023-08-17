
import { useState } from "react"
import fetchData from "../../others/fetchData"
import { useForm } from 'react-hook-form';
import {Pincode,IntLen4,ValidateSQLInjection} from "../../../businessComponents/others/validations"
import { useDispatch } from "react-redux";

const RBInventoryDelivery = () =>{

    const dispatch = useDispatch()
    const stdDiv = {padding:'8px 0px 8px'}
    const stdDiv2 = {margin:'5px 0px 5px',width:'calc(100% - 20px)'}
    const { register, handleSubmit, formState: { errors }, trigger } = useForm();

    const [a,seta] = useState([])
    const [input,setinput] = useState([])
    const [disabled,setdisabled] = useState([])

    const clearSpace = (data) =>{
        return data.replace(/\s/g, "")
    }
    const getPin = () =>{

        const apiPin = async () =>{

            const uri='api/be/v1.0/inventory/getPin';
            const body={
                "pin":input.pin
            }

            const data = await fetchData(uri,body)

            try{
                seta(data)
                setinput({
                    ...input, 
                    state:data.data[0].state,
                    district:data.data[0].district,
                    pincode:data.data[0].pin,
                    zone:data.data[0].state.replace(/\s/g, "")+"_"+data.data[0].district.replace(/\s/g, "")+"_"+data.data[0].pin
                })
                setdisabled({...disabled, state:false, district:false,pincode:false})
            }
            catch (error) {}

        }
        apiPin()
    }
    const handlechange = async (e,type) =>{

        if (type==="pin"){
            setinput(prev => ({...prev, pin:e.target.value}))
            await trigger(e.target.name);
        }
        if (type==="cost"){
            setinput(prev => ({...prev, cost:e.target.value}))
            await trigger(e.target.name);
        }
        if (type==="zone")
            setinput(prev => ({...prev, zone:e.target.value}))
        if (type==="state"){
            if(e.target.value==="Any"){
                setinput(prev => ({...prev, state:e.target.value, district:"Any", pincode:"Any", zone:"Any_Any_Any"}))
                setdisabled(prev => ({...prev, state:false, district:true, pincode:true}))
            }
            else{
                setinput(prev => ({...prev, state:e.target.value, district:a.data[0].district, pincode:a.data[0].pin,zone:clearSpace(e.target.value)+"_"+clearSpace(a.data[0].district)+"_"+a.data[0].pin}))
                setdisabled(prev => ({...prev, state:false, district:false, pincode:false}))
            }
        }
        if (type==="district"){
            var dist = e.target.value;
            dist = dist.replace(/\s/g, "");

            if(e.target.value==="Any"){
                setinput(prev => ({...prev, district:dist, pincode:"Any",zone:clearSpace(a.data[0].state)+"_Any_Any"}))
                setdisabled(prev => ({...prev, district:false, pincode:true}))
            }
            else{
                setinput(prev => ({...prev, district:dist, pincode:a.data[0].pin, zone:clearSpace(a.data[0].state)+"_"+dist+"_"+a.data[0].pin}))
                setdisabled(prev => ({...prev, district:false, pincode:false}))
            }
        }
        if (type==="pincode")
            setinput(prev => ({...prev, pincode:e.target.value, zone:clearSpace(a.data[0].state)+"_"+clearSpace(a.data[0].district)+"_"+e.target.value}))

    }
    
    const onSubmit = (data) => {

        const apisave = async (data) =>{

            var uri='api/be/v1.0/inventory/deliveryCostUpdate'
            var body={
                "pincode":input.pincode,
                "state":input.state,
                "district":input.district,
                "cost":input.cost,
                "zone":input.zone,
            }
            const resp = await fetchData(uri,body)
            try {
                if(resp.status==="fail")
                    dispatch({type:'DIALOG_ON',title:`Error`,body:resp.message,return:''})
                else{
                    dispatch({type:'DIALOG_ON',title:`Success`,body:"Zone added",return:''})
                    dispatch({type:'RIGHTBAR_OFF'})
                    seta([])
                }
            }
            catch (error) {}
        }
        apisave(data)
    } 

    return <div style={{textAlign:'left'}}>
            

        <div style={{padding:'10px'}}>
            <div style={stdDiv}>
                <div>Pincode</div>
                <input 
                    type='text' name='pin'
                    {...register(
                        'pin',{required:"Mandatory",pattern:Pincode,validate: ValidateSQLInjection}
                    )}
                    onKeyUp={(e)=>handlechange(e,'pin')} style={stdDiv2} placeholder="Enter Pincode Name"
                />
                {
                    errors.pin ? 
                    <div style={{color:'#F37512'}}>{errors.pin.message}</div>
                    :
                    <div>
                        {
                            input.pin && input.pin.length > 0 &&
                            <div onClick={()=>getPin()} style={{color:'blue',margin:'5px 0px 5px',cursor:'pointer'}}>Search Pincode Details</div>
                        }
                    </div>
                }
            </div>
        </div>

        <div className="stdBorder" style={{borderBottom:'0px',borderLeft:'0px',borderRight:'0px'}}></div>

        {
            a.status==="success"
            &&
            <div>
                <div style={{padding:'10px'}}>
                    <div style={stdDiv}>
                        <div>Add each individual details below or '*' if you wish to cover all.</div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={stdDiv}>
                            <div>State</div>
                            <select onChange={(e)=>handlechange(e,'state')} style={stdDiv2} disabled={disabled.state} >
                                <option selected value={input.state}>{input.state}</option>
                                {
                                    input.state!==a.data[0].state &&
                                    <option value={a.data[0].state}>{a.data[0].state}</option>
                                }
                                {
                                    input.state!=="Any" &&
                                    <option value="Any">Any</option>
                                }
                            </select>
                        </div>
                        <div style={stdDiv}>
                            <div>District</div>
                            <select onChange={(e)=>handlechange(e,'district')} style={stdDiv2} disabled={disabled.district} >
                                <option selected value={input.district}>{input.district}</option>
                                {
                                    input.district!==a.data[0].district &&
                                    <option value={a.data[0].district}>{a.data[0].district}</option>
                                }
                                {
                                    input.district!=="Any" &&
                                    <option value="Any">Any</option>
                                }
                            </select>
                        </div>
                        <div style={stdDiv}>
                            <div>Pincode</div>
                            <select onChange={(e)=>handlechange(e,'pincode')} style={stdDiv2} disabled={disabled.pincode} >
                                <option selected value={input.pincode}>{input.pincode}</option>
                                {
                                    input.pincode!==a.data[0].pin &&
                                    <option value={a.data[0].pin}>{a.data[0].pin}</option>
                                }
                                {
                                    input.pincode!=="Any" &&
                                    <option value="Any">Any</option>
                                }
                            </select>
                        </div>
                        <div style={stdDiv}>
                            <div>Enter deliver charge you want to define for above rule.</div>
                            <input type='text' name='cost' 
                                placeholder="Enter Cost Name"
                                {...register(
                                    'cost',{required:"Please add cost", pattern:IntLen4,validate: ValidateSQLInjection}
                                )}
                                onKeyUp={(e)=>handlechange(e,'cost')} style={stdDiv2} 
                            />
                            {   errors.cost && <div style={{color:'#F37512'}}>{errors.cost.message}</div>}
                            
                        </div>
                        <div style={stdDiv}>
                            <div>Zone name</div>
                            <input value={input.zone}
                                {...register(
                                    'zone',{required:"Please add zone",validate: ValidateSQLInjection}
                                )} onChange={(e)=>handlechange(e,'zone')} style={stdDiv2} type='text' name='zone' placeholder="Enter Zone Name"/>
                                {   errors.zone && <div style={{color:'#F37512'}}>{errors.zone.message}</div>}
                        </div>
                        <button className="stdButton" onClick={handleSubmit(onSubmit)} style={{width:'100%'}}> Save </button>
                    </form>




                </div>

            </div>
        }


    </div>
}

export default RBInventoryDelivery