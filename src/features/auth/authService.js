import axios from "axios";

const API_URL = "https://eksgexams.purplebeetech.com/api";

const logout = async () => {
  localStorage.removeItem("SchoolAdminUser");
  localStorage.removeItem("students");
  localStorage.removeItem("school_broadsheet");
  localStorage.removeItem("school-status");
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/school-admin/login`, userData);

  if (response.data) {
    localStorage.setItem("SchoolAdminUser", JSON.stringify(response.data));
  }
  return response.data;
};

const registerAdmin = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/user`, userData, config);

  console.log(response.data);

  return response.data;
};

const updateAdmin = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/user/${userData.id}`,
    userData,
    config
  );

  console.log(response.data);

  return response.data;
};

const getRegStatus = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/status`, config);

  if (response.data) {
    localStorage.setItem("school-status", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  logout,
  login,
  registerAdmin,
  getRegStatus,
  updateAdmin,
};

export default authService;
