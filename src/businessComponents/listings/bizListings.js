import { useSelector } from "react-redux"
import ListPatientRecord from "./sublistings/list_patientRecord"
import BusinessLogic from "./sublistings/list_businessLogic"

const BizListings = () =>{

    // Primary Definitions
    const state = useSelector(state => state)

    // Business Methods
    //  else if((state.selectedMenu.name === "Assessment")&&(list === "Patient Record")) return <ListPatientRecord/>

    const listSelector = (list) =>{
        if(state.selectedMenu.name === "Assessments") return <ListPatientRecord/>
        else if(state.selectedMenu.name === "Business Logic") return <BusinessLogic/>
    }

    return <div >
    
        {listSelector(state.listings)}
    </div>
}
export default BizListings