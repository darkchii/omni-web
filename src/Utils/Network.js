import axios from "axios";
import config from "../config.json";

export async function GetServerDetails(ip, port = 22126) {
    const { data } = await axios.get(`https://mtasa-api.com/server/?ip=${ip}&asePort=${port}`);
    return data;
}

export function GetAPI() {
    if (config.LOCAL_MODE) {
        return config.API_LOCAL;
    } else {
        return config.API;
    }
}

export async function GetMapList() {
    var maps = [];
    try {
        const { data } = await axios.get(`http://${GetAPI()}/maps/select`);
        maps = data.data;
    } catch (e) {
        return console.warn(e);
    }
    return maps;
}

export async function GetMapDetails(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post(`http://${GetAPI()}/maps/inspect`, formData);
        return data;
    } catch (e) {
        console.warn(e);
    }
    return null;
}

export async function SubmitMap(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post(`http://${GetAPI()}/maps/upload`, formData);
        return data;
    } catch (e) {
        console.warn(e);
    }
    return null;
}

export async function GetUser(id) {
    try {
        const { data } = await axios.get(`http://${GetAPI()}/users/get/${id}`);
        return data;
    } catch (e) {
        console.warn(e);
    }
    return null;
}

export async function RegisterUser(username, password) {
    try {
        const { data } = await axios.post(`http://${GetAPI()}/users/register`, {
            username: username,
            password: btoa(password)
        });
        return data;
    } catch (e) {
        console.warn(e);
    }
    return null;
}

export async function LoginUser(username, password) {
    if (await IsUserLoggedIn()) {
        return null; //don't allow login if we are already logged in
    }
    try {
        const { data } = await axios.post(`http://${GetAPI()}/users/login`, {
            username: username,
            password: btoa(password)
        });
        return data;
    } catch (e) {
        console.warn(e);
    }
    return null;
}

export async function LogoutUser() {
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('auth_user_id');

    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user_id');

    try {
        await axios.post(`http://${GetAPI()}/users/logout`, {
            token: btoa(token),
            user_id: user_id
        });
    } catch (e) {
        console.warn(e);
    }

    return true;
}

export function GetLoginID() {
    return localStorage.getItem('auth_user_id');
}

export async function IsUserLoggedInUnsafe() {
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
            const { data } = await axios.post(`http://${GetAPI()}/users/validate_token`, {
                token: btoa(token),
                user_id: user_id
            });
            if (data.status === 'success') {
                // console.log(data);
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

export function GetUserAvatar(id) {
    return `http://${GetAPI()}/users/avatar/${id}`;
}

export async function UpdateUserProfile(auth, account, profileData) {
    if (await !IsUserLoggedIn()) {
        return {
            status: 'error',
            message: 'Authentication error. Please login'
        }
    }

    let results = [];
    try {
        const formData = new FormData();
        formData.append('avatar', profileData.avatar);

        const { data } = await axios.post(`http://${GetAPI()}/users/update/${account.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': btoa(auth.token),
                'user_id': auth.user_id
            }
        });
        results = data;
    } catch (e) {
        console.log(e.message);
    }

    return results;
}