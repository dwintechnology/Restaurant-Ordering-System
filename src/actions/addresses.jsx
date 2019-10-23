import axios from 'axios'
import constants from '../constants'
import firebase from 'firebase'

export function getAddresses() {
    return (
        axios.get(`${constants.api.url}/users/addresses`)
    )
}

export function addAddress(body) {
    return (
        axios({
            method: 'post',
            url: `${constants.api.url}/users/addresses`,
            data: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

        })
    )
}

export function delateAddress(addressId) {
    const _api = `${constants.api.url}/users/addresses/` + addressId
    return axios.delete(_api);
}

export function putAddress(body, id) {
    return (
        axios({
            method: 'put',
            url: `${constants.api.url}/users/addresses/${id}`,
            data: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

        })
    )
}


axios.interceptors.request.use(async function (config) {
    if (firebase.auth().currentUser) {
        let _idToken = await firebase.auth().currentUser.getIdToken(true)
        
        config.headers.Authorization = _idToken
    }
    return config;
});
