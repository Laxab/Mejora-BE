
const fetchData = async (uri, body, cookie) => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    if(cookie!=="")
        myHeaders.append("sid", cookie);

    var url = 'http://192.168.29.84:54899/'+uri;
    //var url = 'https://apwest.mejora.life:54899/'+uri;

    var raw = JSON.stringify(body);
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        fetch("", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            
        const response = await fetch(url, requestOptions);

        const data = await response.json();

        
        return data;
    } 
    catch (error) {
        return "error";
    }
};


export default fetchData;