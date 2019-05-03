import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:4242/users/register', {
            name : newUser.name,
            email : newUser.email,
            password : newUser.password,
            confPass : newUser.confPass
        })
        
}


export const login = user => {
    return axios
        .post('http://localhost:4242/users/login', {
            email : user.email,
            password : user.password
        })
        
}