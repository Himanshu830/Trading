// import { isAuthenticated } from '../../auth/api';
import { API } from '../../../config';

export const getUser = userId => {
    return fetch(`${API}/users/${userId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();  
        })
        .catch(err => console.log(err));
};

export const listUsers = (token) => {
    // let { token } = isAuthenticated()
    return fetch(`${API}/users`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
