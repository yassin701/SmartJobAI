import axios from "axios"

const BASE_URL = "https://6962e9172d146d9f58d251ee.mockapi.io/api/v1";

// Add Jobs (Admin => Post)

export const addJob = async (formDATA) => {
    const res = await axios.post(`${BASE_URL}/Jobs`, formDATA);
    return res.data
}

