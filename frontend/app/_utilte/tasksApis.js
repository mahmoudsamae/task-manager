import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("token");

const getAllTasks = () => {
  const token = getToken()
  return axiosClient.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
  

const createNewTask = (data) => {
  const token = getToken();
  return axiosClient.post("/tasks", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

const deleteTask = (taskID) => {
  const token = getToken();
  return axiosClient.delete(`/tasks/${taskID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

const updateTask = (taskID, data) => {
  const token = getToken();
  return axiosClient.put(`/tasks/${taskID}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

const deleteAllTasks = () => {
  const token = getToken();
  return axiosClient.delete("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default {
  getAllTasks,
  createNewTask,
  deleteTask,
  updateTask,
  deleteAllTasks,
};