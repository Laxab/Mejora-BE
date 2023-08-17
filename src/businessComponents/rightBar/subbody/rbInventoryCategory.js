

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {IntLen4,ValidateSQLInjection} from "../../../businessComponents/others/validations"
import fetchData from '../../others/fetchData';
import { useDispatch, useSelector } from 'react-redux';

const RbInventoryCategory = () =>{

    const state = useSelector(state=>state)
    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm();
    const [input,setinput] = useState([])
    const dispatch = useDispatch()
    const stdDiv = {padding:'8px 0px 8px'}
    const stdDiv2 = {margin:'5px 0px 5px',width:'calc(100% - 20px)'}
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);


    useEffect(()=>{

        if(state.rightBar.contents){
            const validateInputs = async() =>{

                setinput(prev => (
                    {
                        ...prev, 
                        categoryName:state.rightBar.contents.cname,
                        priority:state.rightBar.contents.priority
                    }))
                setValue('categoryName', state.rightBar.contents.cname);
                setValue('priority', state.rightBar.contents.priority);
                await trigger("categoryName");
                await trigger("priority");
            }
            validateInputs()
                
        }

    },[state.rightBar,setValue, trigger])


    const handlechange = async (e,type) =>{

        if (type==="categoryName"){
            setinput(prev => ({...prev, categoryName:e.target.value}))
            await trigger(e.target.name);
        }
        else if (type==="priority"){
            setinput(prev => ({...prev, priority:e.target.value}))
            await trigger(e.target.name);
        }
    }
    const onSubmit = (data) => {
        
        const apiinstall = async (data2,contents) =>{
            var uri='';
            var body={};

            if(contents){
                uri='api/be/v1.0/inventory/editCategory';
                body={
                    "cname":data2.categoryName,
                    "priority":data2.priority,
                    "id":contents.id
                }
            }
            else{
                uri='api/be/v1.0/inventory/insertCategory';
                body={
                    "category":data2.categoryName,
                    "priority":data2.priority
                }
            }
            const data = await fetchData(uri,body)
            try{
                if(data.status==="fail")
                    dispatch({type:'DIALOG_ON',body:data.message,return:''})
                else{
                    dispatch({type:'DIALOG_ON',body:data.data,return:''})
                    dispatch({type:'RIGHTBAR_OFF'})
                }
            }
            catch(error){
            }
        }
        apiinstall(data,state.rightBar.contents)
    }
    
    // File management
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    
        // Preview the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleFileUpload = () => {
        if (!selectedFile) {
          console.log('No file selected.');
          return;
        }
    
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('data', JSON.stringify({ cname: state.rightBar.contents.cname}));
    
        fetch('https://api.98b870ed6919e4ffdd74527f19020ae9.laxab.com/api/upload_categoryImages', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            dispatch({type:'DIALOG_ON',body:"Image uploaded successfully",return:''})
            dispatch({type:'RIGHTBAR_OFF'})
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
    };

    

    const formHtml = () =>{
        return (

            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={stdDiv}>
                    <div>Category Name</div>
                    <input 
                        type='text' name='categoryName'
                        {...register(
                            'categoryName',{required:"Mandatory",validate: ValidateSQLInjection}
                        )}
                        onKeyUp={(e)=>handlechange(e,'categoryName')} placeholder="Enter Category Name" style={stdDiv2}
                        defaultValue={input.categoryName}
                    />
                    {errors.categoryName && <div style={{color:'#F37512'}}>{errors.categoryName.message}</div>}
                </div>

                <div style={stdDiv}>
                    <div>Priority</div>
                    <input 
                        type='text' name='priority'
                        {...register(
                            'priority',{required:"Mandatory",pattern:IntLen4,validate: ValidateSQLInjection}
                        )}
                        onKeyUp={(e)=>handlechange(e,'priority')} placeholder="Enter Priority" style={stdDiv2}
                        defaultValue={input.priority}
                    />
                    {errors.priority && <div style={{color:'#F37512'}}>{errors.priority.message}</div>}
                </div>

                <button className="stdButton" onClick={handleSubmit(onSubmit)} style={{width:'100%'}}> Save </button>

            </form>
        )
    }

    return <div style={{textAlign:'left'}}>
            

        <div style={{padding:'10px'}}>

            {
                state.rightBar.contents &&
                <div style={{border:'0px solid red',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <h2 style={{margin:'0px 0px 10px'}}>{state.rightBar.contents.cname}</h2>
                    {
                        previewUrl ?
                        <img alt="" src={previewUrl} style={{width:'250px',height:'220px'}}/>
                        :
                        <div>
                        {
                            state.rightBar.contents.imageUrl &&
                            <img alt="" src={"https://api.98b870ed6919e4ffdd74527f19020ae9.laxab.com/api/upload_categoryImages/"+state.rightBar.contents.imageUrl} style={{width:'250px',height:'220px'}}/>
                        }
                        </div>
                    }
                    <input type="file" onChange={handleFileChange}  style={{width:'80%',margin:'10px'}}/>

                    <button className="stdButton" onClick={handleFileUpload} style={{width:'100%'}}> Upload Category Image </button>

                </div>
            }

            { formHtml() }

        </div>

    </div>
}

export default RbInventoryCategory