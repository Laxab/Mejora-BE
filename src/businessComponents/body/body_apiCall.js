
import fetchData from "../others/fetchData";



const DBA_Select = async (session,table,select,pageNumber,pageSize,condition,conditionType,orderBy,order) =>{
    /**
     * LEVEL 0
     * API call with the requests given by "LoadContents"
     
    var buName=""
    if(session.identity)
        buName=session.identity.buName
        */

    var buName = session?.identity?.buName ?? ""

    const uri = 'api/be/standard/select'
    const body = {
        "sid": session.sid,
        "request": "DBA_Select",
        "bu": buName,
        "type": table,
        "select": select,
        "condition": condition,
        "conditionType": conditionType,
        "order": {
            "orderBy": orderBy,
            "order": order
        },
        "pageNumber": pageNumber,
        "pageSize": pageSize
    }
    const response = await fetchData(uri, body)
    return response
}


const LoadContentsAPI = async (session,table,pageNumber,type,cond) =>{
    /**
     * LEVEL 1
     * Take refresh/ammend requests from INIT, SCROLL, SEARCH 
     */
    var response    = [],
        condition   = [{ "id": "%" }],
        orderBy     = "id",
        order       = "ASC"
    
    if(cond!==""){
        condition = cond
    }
    if(type==="ASYNC") {
        response = await DBA_Select(session,table,["*"],pageNumber,50,condition,"OR",orderBy,order)
    }
    else if (type==="INIT"){
        response = await DBA_Select(session,table,["*"],1,50,condition,"OR",orderBy,order)
    }
    else if (type==="SEARCH"){
        response = await DBA_Select(session,table,["*"],1,50,condition,"OR",orderBy,order)
    }
    if (response?.status === "success") {
        const resp = (prevData => {
            const newData = response?.data?.response?.dbData?.filter(newItem => {
                return !prevData?.some(existingItem => existingItem?.id === newItem?.id) ?? ""
            });
            return [...prevData, ...newData];
        });
        return resp
    }

}

export{DBA_Select,LoadContentsAPI}

const BodyApiCall = () =>{


}

export default BodyApiCall