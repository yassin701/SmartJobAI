import axios from "axios";

const BASE_URL =  import.meta.env.VITE_APP_API_BASE_URL;

/* =========================
   JOBS API
========================= */

// Add Job (Admin)
export const addJob = async (job) => {
  const res = await axios.post(`${BASE_URL}/Jobs`, job);
  return res.data;
};

// Get all Jobs
export const getJobs = async () => {
  const res = await axios.get(`${BASE_URL}/Jobs`);
  return res.data;
};

// Get Job by ID
export const getJobById = async (id) => {
  const res = await axios.get(`${BASE_URL}/Jobs/${id}`);
  return res.data;
};

// Update Job
export const updateJob = async (id, job) => {
  const res = await axios.put(`${BASE_URL}/Jobs/${id}`, job);
  return res.data;
};

// Delete Job
export const deleteJob = async (id) => {
  const res = await axios.delete(`${BASE_URL}/Jobs/${id}`);
  return res.data;
};

/* =========================
   CONDIDATURE API
========================= */

export const sendCondidature = async (data) => {
  const res = await axios.post(`${BASE_URL}/condidature`, {
    name: data.name,
    email: data.email,
    domain: data.domain,
    skills: data.skills,
    motivation: data.motivation,
    cvUrl: data.cv, // ✅ URL ONLY
  });

  return res.data;
};

// Get all Condidatures
export const getCondidatures = async () => {
  const res = await axios.get(`${BASE_URL}/condidature`);
  return res.data;
};
