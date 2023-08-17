
// Import Components
import { useSelector } from "react-redux"
import BodyBusinessLogic from "./subbody/body_businessLogic"


const BizBody = () =>{

    // Primary Definitions
    const state = useSelector((state)=>state)

    //Business Methods
    const bodySelector = () =>{
        
        if(state.selectedMenu.name==="Business Logic")
            return <BodyBusinessLogic/>
    }

    return <div className="bizBody" style={{padding:'0px',height:'500px'}}>
            {bodySelector()}
    </div>
}
export default BizBody