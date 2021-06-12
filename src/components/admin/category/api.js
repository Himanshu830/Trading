import { API } from '../../../config';

export const getParentCategory = (token) => {
    return fetch(`${API}/category?parent=null`, {
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


export const getCategory = (token, search='') => {
    search = (search) ? `?name=${search}` : '';
    return fetch(`${API}/category${search}`, {
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

export const getCategoryById = async (categoryId, token) => {
    return fetch(`${API}/category/${categoryId}`, {
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

export const createCategory = (category, token) => {
    return fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return { error: 'Something went wrong.' }
        })
}

export const updateCategory = (categoryId, category, token) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return { error: 'Something went wrong.' }
        })
}

export const deleteCategory = (categoryId, token) => {
    return fetch(`${API}/category/${categoryId}`, {
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
