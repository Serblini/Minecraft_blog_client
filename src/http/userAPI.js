import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, name, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    name,
    password,

    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, name, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    name,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
