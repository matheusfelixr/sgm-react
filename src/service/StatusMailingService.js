import {CONFIG} from '../config/api';


export function getReansonMailing(){

   var token= localStorage.getItem('token');

    const config = { method: 'GET',
                   headers :{"Content-Type": "application/json", 
                   "Authorization": "Bearer "+ token}
                };

    return fetch(`${CONFIG.apiUrl}mailling-status/find-all-reason-mailling`, config).then(response => {
        return response.json();
    })
}

export function getStatusByReasonMailing(reasonMailling){
    console.log(reasonMailling)
    var token= localStorage.getItem('token');
 
     const config = { method: 'GET',
                    headers :{"Content-Type": "application/json", 
                    "Authorization": "Bearer "+ token}
                 };
 
     return fetch(`${CONFIG.apiUrl}mailling-status/get-by-reason-mailling/${reasonMailling}`, config).then(response => {
         return response.json();
     })
 }