import axios from "axios";

const API_URL = "https://eksgexams.purplebeetech.com/api";

const getAllStudents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/sorted-school-students`, config);

  if (response.data) {
    localStorage.setItem("students", JSON.stringify(response.data));
  }

  return response.data;
};

const getAllStudentsSheet = async (token, schoolId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/school/${schoolId}/broadsheet`,
    config
  );

  if (response.data) {
    localStorage.setItem("school_broadsheet", JSON.stringify(response.data));
  }

  return response.data;
};

const getSingleStudents = async (token, studentId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/student/${studentId}`, config);

  return response.data;
};

const getAllSubjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/sorted-subjects`, config);

  if (response.data) {
    localStorage.setItem("eksg_subjects", JSON.stringify(response.data));
  }

  return response.data;
};

const registerStudent = async (token, studentData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/students`, studentData, config);

  console.log(response.data);
  return response.data;
};

const updateSingleStudents = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/student/${data?.studentId}`,
    data,
    config
  );

  return response.data;
};

const deleteSingleStudents = async (token, studentId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/student/${studentId}`,
    config
  );

  return response.data;
};

const getSubjectAnalysis = async (token, schoolId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/subjects/school-analysis/${schoolId}`,
    config
  );

  if (response.data) {
    localStorage.setItem("school_analysis", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  getAllStudents,
  getAllSubjects,
  registerStudent,
  getSingleStudents,
  updateSingleStudents,
  deleteSingleStudents,
  getAllStudentsSheet,
  getSubjectAnalysis,
};

export default authService;
