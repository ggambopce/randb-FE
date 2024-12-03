import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api`;

export const getUserInfo = async (token) => {
  const res = await axios.post(`${prefix}/userinfo`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
}

