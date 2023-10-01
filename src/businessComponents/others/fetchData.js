/*
        ----- Important Notice -----
        This code is the intellectual property of Laxab Digital Solutions Pvt Ltd (Regd company in India,
        hereafter referred as 'company'). If you are not an employee this company, you are not authorized 
        to copy, save, or transmit this code in any form or medium without prior written permission from 
        the company.

        For more information, please visit company's website: www.laxab.com/intellectualproperty

        ----->> API CALLs <<-----

        Version 1.0 : 09 Jun 2023, Created      ***Current version***
*/



const fetchData = async (uri, body, cookie) => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    if(cookie!=="")
        myHeaders.append("sid", cookie);

    var url = 'http://localhost:1111/'+uri;
    //var url = 'https://api.78e.laxab.com/'+uri;

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