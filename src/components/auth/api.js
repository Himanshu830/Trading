import { API } from '../../config';

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const activateAccount = token => {
    return fetch(`${API}/activate/${token}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }          
    })
        .then(response => {
            console.log('account activation: ', response);
            return response.json();
        })
        .catch(err => console.log(err));
}

export const signin = user => {
    console.log(API);
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            return {status: 500, error: 'Something went wrong'};
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    let {token} = isAuthenticated()
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();

        return fetch(`${API}/signout`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }          
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const recoverPassword = (email) => {
    return fetch(`${API}/auth/recover`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
        .then(response => {
            console.log(response);

            return response.json();
        })
        .catch(err => console.log(err));
};

export const reset = (token) => {
    return fetch(`${API}/auth/reset/${token}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = async (token, password) => {
    return fetch(`${API}/auth/reset/${token}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};