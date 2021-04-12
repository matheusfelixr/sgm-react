import { CONFIG } from '../config/api';



export function importFile(file) {
    var token = localStorage.getItem('token');
    const config = {
        method: 'POST',
        body: file,
        headers: {
            "Content-Type": "multipart/form-data",
            "accept": "application/json",

            "Authorization": "Bearer " + token
        }
    };

    return fetch(`${CONFIG.apiUrl}import-mailing-file/import-file/file?${file}`, config).then(response => {
        return response.json();
    })

}