import { API } from '../../config';

export const getCategories = (token, parent = null) => {
    return fetch(`${API}/category?parent=${parent}`, {
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
        .catch(err => {
            return { error: 'Something went wrong' }
        });
}

export const getOrderById = async (orderId, token) => {
    return fetch(`${API}/order/${orderId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getOrdersByUser = async (token, title) => {
    title = (title) ? `?title=${title}` : ''
    return fetch(`${API}/order${title}`, {
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
}

export const createOrder = (order, token) => {
    return fetch(`${API}/order`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return { error: 'Something went wrong.' }
        })
}

export const updateOrder = (orderId, order, token) => {
    return fetch(`${API}/order/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return { error: 'Something went wrong.' }
        })
}

export const deleteOrder = (orderId, token) => {
    return fetch(`${API}/order/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return { error: 'Something went wrong.' }
        })
}

//==========END================

