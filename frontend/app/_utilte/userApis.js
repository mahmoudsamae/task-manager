const { default: axiosClient } = require("./axiosClient");

const getUser = (data) => axiosClient.post("/auth/login", data);

const createUser = (user) => axiosClient.post("/auth/signup", user);

const updateUserProfil = (userID, user) => axiosClient.put(`/auth/update/${userID}`, user);

export default { getUser, createUser, updateUserProfil };