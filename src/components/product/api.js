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

export const getProductById = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProductsByUser = async (token, name) => {
    name = (name) ? `?name=${name}` : ''
    return fetch(`${API}/product${name}`, {
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

export const createProduct = (product, token) => {
    return fetch(`${API}/product`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return { error: 'Something went wrong.' }
        })
}

export const updateProduct = (productId, product, token) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch(err => {
            console.log(err)
            return { error: 'Somethin went wrong.' }
        })
}

export const deleteProduct = (productId, token) => {
    return fetch(`${API}/product/${productId}`, {
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