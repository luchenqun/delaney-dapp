import instance from "./axios";

export const createUser = (data: {
  address: string;
  parent_ref: string;
}) => {
  return instance.post("create-user", data);
};

export const getUserInfo = (data: {
  address: string;
}) => {
  return instance.get("user", { params: data });
};

export const getMudPrice = () => {
  return instance.get("mud-price");
};

