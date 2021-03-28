import { API } from "../../config";

export const saveChat = (token, chat) => {
    return fetch(`${API}/chat`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(chat)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const upload = (token, formData) => {
    return fetch(`${API}/chat/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const getChats = (token, userId) => {
    return fetch(`${API}/chat/${userId}`, {
        method: "GET",
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

export const getUsers = (token, name='') => {
    let queryString = ''
    if(name) {
        queryString = `?name=${name}`
    }
    return fetch(`${API}/chat/users${queryString}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json().then(users => {
                if(users.length) {
                    return users
                }
                return []
            });
        })
        .catch(err => console.log(err));
};