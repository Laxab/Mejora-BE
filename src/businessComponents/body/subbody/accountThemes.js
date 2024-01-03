
import { colorBank } from "../../others/others_colors"

const accountThemes = () =>{

    const dispColorBox = (color) =>{

        return <div style={{background:`${color}`,width:'130px',height:'100px',margin:'5px',color:'#fff',borderRadius:'5px',display:'flex'}}>
            <div style={{margin:'auto'}}>
                {color}
            </div>
        </div>
    }

    return <div style={{margin:'20px'}}>
        <div style={{display:'flex',width:'1000px'}}>
        {
            colorBank.map((item)=>{
                return dispColorBox(item)
            })
        }
        </div>
    </div>
}

export default accountThemes