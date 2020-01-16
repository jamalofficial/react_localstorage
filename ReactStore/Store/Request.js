import axios from 'axios';
const Request =  {
    setDefaults( defaults = {}) {
        axios.defaults.baseURL = defaults.baseURL;
    },
    make(type = 'GET', apiAddress = null, params = null, body = null, headers = null){
        if (apiAddress) {
            return axios({
                method: type,
                url: apiAddress,
                params: params,
                data: body,
                headers: headers
            })
            .then(response => {
                return new Promise(function (resolve, reject) {
                resolve(response)
                })
            })
            .catch(error => {
                console.log('In Catch: ', error);
                // if (event.srcElement.status === 401) {
                //     if(this.resetUserData){
                //         window.location.href = '/'
                //     }
                // } else {
                //     return new Promise(function (resolve, reject) {
                //         reject(error)
                //     })
                // }
            })
        } else {
            return new Promise(function (resolve, reject) {
                let error = new Error()
                error.response = {
                data: { error: true, message: 'server request Failed.' }
                }
                resolve({ error: true, message: 'server request Failed.' })
                reject(error)
            })
        }
    }
}

export default Request;