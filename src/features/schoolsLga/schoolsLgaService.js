import axios from "axios";

const API_URL = "https://api.eksexams.com/api";

const getAllSchools = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/lga-schools`, config);

  if (response.data) {
    localStorage.setItem("lgaSchools", JSON.stringify(response.data));
  }

  return response.data;
};

const getAllRawSchools = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/schools`, config);

  if (response.data) {
    localStorage.setItem("rawSchools", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  getAllSchools,
  getAllRawSchools,
};

export default authService;
