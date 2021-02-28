import { CONFIG } from '../config/api';


export function nextMailing() {

    var token = localStorage.getItem('token');

    const config = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }

    };

    return fetch(`${CONFIG.apiUrl}mailing/get-next-mailing`, config).then(response => {
        return response.json();
    })
}

export function saveAttendance(saveAttendanceJson) {
    var token = localStorage.getItem('token');
    const config = {
        method: 'POST',
        body: JSON.stringify(saveAttendanceJson),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    };

    return fetch(`${CONFIG.apiUrl}mailing/save-attendance`, config).then(response => {
        return response.json();
    })

}