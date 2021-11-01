import axios from "axios";

const api = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
      Authorization: `${token}`,
    },
  });
};
export default api;
