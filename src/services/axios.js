import axios from "axios"

const BASE_URL = "https://6962e9172d146d9f58d251ee.mockapi.io/api/v1";

// Add Jobs (Admin => Post)
export const addJob = async (job) => {
    const res = await axios.post(`${BASE_URL}/Jobs`, job);
    return res.data
}

//get 
export const getJobs = async () => {
    const res = await axios.get(`${BASE_URL}/Jobs`);
    return res.data

}

//get by id for details
export const getJobById = async (id) => {
    const res = await axios.get (`${BASE_URL}/Jobs/${id}`)
    return res.data;
}

//put 
export const updateJob = async (id , job) => {
    const res = await axios.put(`${BASE_URL}/Jobs/${id}`, job);
    return res.data;
}


//delete 
export const deleteJob = async (id) => {
    const res = await axios.delete(`${BASE_URL}/Jobs/${id}`);
    return res.data;
}