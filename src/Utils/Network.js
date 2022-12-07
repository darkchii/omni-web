import axios from "axios";

async function GetServerDetails(ip, port = 22126){
    const { data } = await axios.get(`https://mtasa-api.com/server/?ip=${ip}&asePort=${port}`);
    return data;
}
export default GetServerDetails;