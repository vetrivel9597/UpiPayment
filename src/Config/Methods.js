import axios from "axios"

const API = async (params) => {
    let response;
    await axios({
        method: params.method,
        url: params.url,
        headers: params.headers,
        data: params.data,
    }).then((result) => {
        response = result.data;
    }).catch((err) => {
        response = err.response.data
    })

    return response;
}

export default API