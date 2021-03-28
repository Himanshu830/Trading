import { API } from "../../config";

export const getCompany = (token) => {
    return fetch(`${API}/company`, {
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

export const updateCompany = async (company, token) => {
    return fetch(`${API}/company`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: company
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch(err => {
            return { error: 'Somethin went wrong.'}
        })


    // axios.patch(`${API}/company`, company, {
    //     headers: {
    //         Accept: "application/json",
    //         // "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    // .then((response) => {
    //     console.log(response);
    //     return response;
    // })
    // .catch((error) => {
    //     console.log(error)
    //     return error
    // });
};
