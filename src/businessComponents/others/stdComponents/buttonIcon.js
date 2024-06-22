
import { RiCloseCircleFill } from 'react-icons/ri';
import { IoMdAddCircle } from "react-icons/io";

export const ButtonIcon = (props) =>{
    const {size, type} = props;
    const customStyle = {width:size, height:size, borderRadius:'50%', display:'flex', marginLeft:'10px'}
    
    if(type==="close") return <RiCloseCircleFill className='stdcloseRed' style={customStyle}/>
    else if(type==="add") return <IoMdAddCircle className='stdcloseGreen' style={customStyle}/>
}