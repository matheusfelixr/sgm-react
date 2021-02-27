import {CONFIG} from '../config/api';


export function authenticate(login){
    const myHeaders = new Headers({
        "Content-Type": "application/json"
      });
    
    const config = { method: 'POST',
                   body : JSON.stringify(login) ,
                   headers :{"Content-Type": "application/json", 
                   "Authorization": "Bearer "}
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
                   headers :{"Content-Type": "application/json", 
                   "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzd2FnZ2VyIiwiZXhwIjozNDE0MjgzNTc5LCJpYXQiOjE2MTQyODM1OTd9.EHboBqOkIPPqFSCszn7-Iyesn_yZsgzcORcSJWQCXFknO5IfQBrF_mX4peFU-AMDVHiOW8yQHWKa4K5yuv23UA"}                };

    return fetch(`${CONFIG.apiUrl}security/reset-password`, config).then(response => {
        return response.json();
    })

}


export function newPassword(newPassword, token){

    const config = { method: 'POST',
                   body : JSON.stringify(newPassword) ,
                   headers :{"Content-Type": "application/json", 
                   "Authorization": "Bearer "+ token}
                };
        console.log(config)

    return fetch(`${CONFIG.apiUrl}security/password`, config).then(response => {
        return response.json();
    })

}