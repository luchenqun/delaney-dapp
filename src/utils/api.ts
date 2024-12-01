import instance from "./axios";

export const createUser = (data: { address: string; parent_ref: string }) => {
  return instance.post("create-user", data);
};

export const getUserInfo = (data: { address: string }) => {
  return instance.get("user", { params: data });
};

export const getMudPrice = () => {
  return instance.get("mud-price");
};

export const getRewardUser = (data: { address: string }) => {
  return instance.get("reward-user-stat", { params: data });
};

export const getClaimUser = (data: { address: string }) => {
  return instance.get("claim-user-stat", { params: data });
};

export const getDelegateUser = (data: { address: string }) => {
  return instance.get("delegate-user-stat", { params: data });
};

export const getDynamicRewardUser = (data: { address: string }) => {
  return instance.get("dynamic-reward-user-stat", { params: data });
};

export const getStaticRewardUser = (data: { address: string }) => {
  return instance.get("static-reward-user-stat", { params: data });
};

export const getLatestClaim = (data: { address: string }) => {
  return instance.get("latest-claim", { params: data });
};

export const getStaticRewards = (data: { address: string }) => {
  return instance.get("static-rewards", { params: data });
};

export const getDynamicRewards = (data: { address: string }) => {
  return instance.get("dynamic-rewards", { params: data });
};
