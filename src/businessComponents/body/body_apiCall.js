
import fetchData from "../others/fetchData";



const FireQuery = async (uri, request, session, table, select, pageNumber, pageSize, condition, conditionType, orderBy, order) =>{
    /**
     * LEVEL 0
     * API call with the requests given by "LoadContents"
     
    var buName=""
    if(session.identity)
        buName=session.identity.buName
        */

    var buName = session?.identity?.buName ?? ""

    const setUri = uri
    const body = {
        "sid": session.sid,
        "request": request,
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
    const response = await fetchData(setUri, body)
    return response
}


const LoadContentsAPI = async (uri, request, session, table, pageNumber, type, cond,order) =>{
    /**
     * LEVEL 1
     * Take refresh/ammend requests from INIT, SCROLL, SEARCH 
     */
    var response    = [],
        condition   = [{ "id": "%" }],
        orderBy     = "id"
    
    if(cond!==""){
        condition = cond
    }
    if(type==="ASYNC") {
        response = await FireQuery(uri, request, session, table, ["*"], pageNumber, 50, condition, "OR", orderBy, order)
    }
    else if (type==="INIT"){
        response = await FireQuery(uri, request, session, table, ["*"], 1, 50, condition, "OR", orderBy, order)
    }
    else if (type==="SEARCH"){
        response = await FireQuery(uri, request, session, table, ["*"], 1, 50, condition, "OR", orderBy, order)
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

export{FireQuery,LoadContentsAPI}

const BodyApiCall = () =>{


}

export default BodyApiCall