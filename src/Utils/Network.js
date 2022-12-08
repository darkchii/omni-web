import axios from "axios";
import config from "../config.json";

export async function GetServerDetails(ip, port = 22126) {
    const { data } = await axios.get(`https://mtasa-api.com/server/?ip=${ip}&asePort=${port}`);
    return data;
}

export function GetMapsAPI() {
    if (config.LOCAL_MODE) {
        return config.MAPS_API_LOCAL;
    } else {
        return config.MAPS_API;
    }
}

export function GetUserAPI() {
    if (config.LOCAL_MODE) {
        return config.USER_API_LOCAL;
    } else {
        return config.USER_API;
    }
}

export async function GetMapList() {
    var maps = [];
    try {
        const { data } = await axios.get(`http://${GetMapsAPI()}/maps/`);
        maps = data.data;
    } catch (e) {
        return null;
    }
    return maps;
}

export async function GetMapDetails(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post(`http://${GetMapsAPI()}/inspect`, formData);
        return data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function SubmitMap(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post(`http://${GetMapsAPI()}/upload`, formData);
        return data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function RegisterUser(username, password) {
    try {
        const { data } = await axios.post(`http://${GetUserAPI()}/users/register`, {
            username: username,
            password: btoa(password)
        });
        return data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function LoginUser(username, password) {
    if (await IsUserLoggedIn()) {
        return null; //don't allow login if we are already logged in
    }
    console.log('logging in');
    try {
        const { data } = await axios.post(`http://${GetUserAPI()}/users/login`, {
            username: username,
            password: btoa(password)
        });
        return data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function IsUserLoggedInUnsafe(){
    //simply checks the localstorage, for stuff like avatars etc
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('auth_user_id');

    if (token && user_id) {
        return true;
    }
    return false;
}

//validate the token and user id
export async function IsUserLoggedIn() {
    //check if we are locally logged in already and somehow ended up on the login page
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('auth_user_id');

    if (token && user_id) {
        try {
            const { data } = await axios.post(`http://${GetUserAPI()}/users/validate_token`, {
                token: btoa(token),
                user_id: user_id
            });
            if (data.status === 'success') {
                console.log(data);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
}