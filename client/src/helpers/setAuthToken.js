import axios from 'axios';

//We are going to use these tokens to decode user info
const setAuthToken = token => {
    if(token) {
        // Apply to every req
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthToken;