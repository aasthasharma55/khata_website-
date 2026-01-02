import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const registerUser = (data) => api.post(`/user/register/`, data);
export const loginUser = (data) => api.post(`/user/login/`, data);
export const getProfile = () => api.get(`/user/profile/`);
export const sendResetEmail = (email) =>
  api.post(`/reset-email-password/`, { email });
export const resetPassword = (uid, token, passwords) =>
  api.post(`/reset-password/${uid}/${token}/`, passwords);

export const getCustomers = () => api.get(`/user/customers/`);

export const getCustomerDetail = (id) => api.get(`/user/customers/${id}/`);
export const addCustomer = (data) => api.post(`/user/customers/`, data);
export const updateCustomer = (id, data) => api.put(`/user/customers/${id}/`, data);
export const deleteCustomer = (id) => api.delete(`/user/customers/${id}/`);


export const getTransactions = (customerId) =>
  api.get(`/user/customers/${customerId}/transactions/`);
export const addTransaction = (customerId, data) =>
  api.post(`/user/customers/${customerId}/transactions/`, data);

export const updateTransaction = (id, data) =>
  api.put(`/user/customers/transactions/${id}/`, data);

export const deleteTransaction = (id) =>
  api.delete(`/user/customers/transactions/${id}/`);


export const searchYouTube = (data) => api.post(`/user/youtube-search/`, data);
