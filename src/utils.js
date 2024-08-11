// src/utils.js
export const isLoggedIn = () => {
    return !!localStorage.getItem('jwtToken');
};

export const getJwtToken = () => {
    return localStorage.getItem('jwtToken');
};

export const loginUser = (token) => {
    localStorage.setItem('jwtToken', token);
};

export const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
};

export const getUsername = () => {
    // Assuming you store the username in local storage, alternatively decode from JWT
    return localStorage.getItem('username');
};
