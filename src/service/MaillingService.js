import {CONFIG} from '../config/api';


export function nextMailling(){

   var token= localStorage.getItem('token');

    const config = { method: 'GET',
                   headers :{"Content-Type": "application/json", 
                   "Authorization": "Bearer "+ token}

                };

    return fetch(`${CONFIG.apiUrl}mailling/get-next-mailling`, config).then(response => {
        return response.json();
    })

}