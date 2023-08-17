

const ValidRes = async (data) =>{

    alert(data.status)
    if(data.status==="success")
        return data
    else
        alert("Error")

}

export default ValidRes