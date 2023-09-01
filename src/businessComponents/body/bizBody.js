
// Import Components
import { useSelector } from "react-redux"
import BodyBusinessLogic from "./subbody/body_businessLogic"
import BodyPatientRecord from "./subbody/body_patientRecord"
import BodyMedicalRecords from "./subbody/body_medicalRecords"
import BodyBusinessCodes from "./subbody/body_businessCodes"


const BizBody = () =>{

    // Primary Definitions
    const state = useSelector((state)=>state)

    //Business Methods
    const bodySelector = () =>{
        
        if(state.selectedMenu.name==="Business Logic")
            return <BodyBusinessLogic/>
        else if((state.selectedMenu.name==="Assessments") && (state.listings==="Patient Record"))
            return <BodyPatientRecord/>
        else if((state.selectedMenu.name==="Assessments") && (state.listings==="Medical Log"))
            return <BodyMedicalRecords/>
        else if((state.selectedMenu.name==="Business Codes"))
            return <BodyBusinessCodes/>
    }

    return <div className="bizBody" style={{padding:'0px',height:'500px'}}>
            {bodySelector()}
    </div>
}
export default BizBody