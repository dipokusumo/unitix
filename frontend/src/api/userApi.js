import axiosInstance from "./axiosInstance";

const register = async (name, email, password, confirmPassword) => {
  const { data } = await axiosInstance.post(
    "/user/register",
    { name, email, password, confirmPassword },
    {
      requiresAuth: false,
    }
  );
  return data;
};

const login = async (email, password) => {
  const { data } = await axiosInstance.post(
    "/user/login",
    { email, password },
    {
      requiresAuth: false,
    }
  );
  localStorage.setItem("token", data.data.token);
  sessionStorage.setItem("token", data.data.token);
  localStorage.setItem("user", JSON.stringify(data.data.user));
  return data;
};

const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post(
    "/user/forgot-password",
    { email },
    {
      requiresAuth: false,
    }
  );
  return data;
};

const editProfile = async (formData) => {
  const { data } = await axiosInstance.post("/user/edit-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    requiresAuth: true,
  });
  return data;
};

const changePassword = async (oldPassword, newPassword, confirmNewPassword) => {
  const { data } = await axiosInstance.post(
    "/user/change-password",
    { oldPassword, newPassword, confirmNewPassword },
    {
      requiresAuth: true,
    }
  );
  return data;
};

const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/admin/get-all-user", {
    requiresAuth: true,
  });
  return data.data;
};

const getAdminBoxInfo = async () => {
  const { data } = await axiosInstance.get("/admin/box-info", {
    requiresAuth: true,
  });
  return data.data;
};

const getUserBoxInfo = async () => {
  const { data } = await axiosInstance.get("/user/box-info", {
    requiresAuth: true,
  });
  return data.data;
};

const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(`/admin/delete-user/${id}`, {
    requiresAuth: true,
  });
  return data;
};

export const userApi = {
  register,
  login,
  forgotPassword,
  editProfile,
  changePassword,
  getAllUsers,
  getAdminBoxInfo,
  getUserBoxInfo,
  deleteUser,
};
