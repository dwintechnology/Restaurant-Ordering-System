import axios from 'axios'
import firebase from 'firebase'
import constants from '../constants'

export function postOrder(order) {
    console.log(order);
    return (
        axios({
            method: 'post',
            url: `${constants.api.url}/orders`,
            data: JSON.stringify(order),
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
