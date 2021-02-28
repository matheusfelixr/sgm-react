import {CONFIG} from '../config/api';


export function getReansonMailing(){

   var token= localStorage.getItem('token');

    const config = { method: 'GET',
                   headers :{"Content-Type": "application/json", 
                   "Authorization": "Bearer "+ token}
                };

    return fetch(`${CONFIG.apiUrl}mailing-status/find-all-reason-mailing`, config).then(response => {
        return response.json();
    })
}

export function getStatusByReasonMailing(reasonMailing){
    console.log(reasonMailing)
    var token= localStorage.getItem('token');
 
     const config = { method: 'GET',
                    headers :{"Content-Type": "application/json", 
                    "Authorization": "Bearer "+ token}
                 };
 
     return fetch(`${CONFIG.apiUrl}mailing-status/get-by-reason-mailing/${reasonMailing}`, config).then(response => {
         return response.json();
     })
 }