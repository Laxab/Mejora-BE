import { useSelector } from "react-redux"
import RbCode from "./subbody/rb_code"
import RbForms from "./subbody/rb_forms"
import RbCoi from "./subbody/rb_coi"
import RbQuiz from "./subbody/rb_quiz"
import RbMappings from "./subbody/rb_mappings"
import RbWeightage from "./subbody/rb_weightage"

const BixRightbar = () =>{

    // Primary Definitions
    const state = useSelector(state => state)

    // Business Methods
    const listSelector = (list) =>{
        if(list === "Code")
            return <div><RbCode/></div>
        else if(list === "Forms")
            return <div><RbForms/></div>
        else if(list === "CoI")
            return <div><RbCoi/></div>
        else if(list === "Quiz")
            return <div><RbQuiz/></div>
        else if(list === "Mappings")
            return <div><RbMappings/></div>
        else if(list === "Weightage")
            return <div><RbWeightage/></div>
        else
            return <div>Default</div>
    }

    return <div >
    
        {listSelector(state.rightBar.body)}
    </div>
}
export default BixRightbar