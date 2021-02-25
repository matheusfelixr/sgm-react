import {CONFIG} from '../config/api';


export function authenticate(login){
    const myHeaders = new Headers({
        "Content-Type": "application/json"
      });
    
    const config = { method: 'POST',
                   body : JSON.stringify(login) ,
                   headers : myHeaders
                };

    return fetch(`${CONFIG.apiUrl}security/authenticate`, config).then(response => {
        return response.json();
    })

}

export function resetPassword(resetPasswordJson){
    const myHeaders = new Headers({
        "Content-Type": "application/json"
      });
    
    const config = { method: 'POST',
                   body : JSON.stringify(resetPasswordJson) ,
                   headers : myHeaders
                };

    return fetch(`${CONFIG.apiUrl}security/reset-password`, config).then(response => {
        return response.json();
    })

}