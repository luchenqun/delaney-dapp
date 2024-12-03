import instance from './axios';

export const createUser = (data: { address: string; parent_ref: string }) => {
  return instance.post('create-user', data);
};

export const getUserInfo = (data: { address: string }) => {
  return instance.get('user', { params: data });
};

export const getMudPrice = () => {
  return instance.get('mud-price');
};

export const getRewardUserStat = (data: { address: string }) => {
  return instance.get('reward-user-stat', { params: data });
};

export const getClaimUserStat = (data: { address: string }) => {
  return instance.get('claim-user-stat', { params: data });
};

export const getDelegateUserStat = (data: { address: string }) => {
  return instance.get('delegate-user-stat', { params: data });
};

export const getDynamicRewardUserStat = (data: { address: string }) => {
  return instance.get('dynamic-reward-user-stat', { params: data });
};

export const getStaticRewardUserStat = (data: { address: string }) => {
  return instance.get('static-reward-user-stat', { params: data });
};

export const getLatestClaim = (data: { address: string }) => {
  return instance.get('latest-claim', { params: data });
};

export const getStaticRewards = (data: { address: string; page: number; page_size: number }) => {
  return instance.get('static-rewards', { params: data });
};

export const getDynamicRewards = (data: { address: string; page: number; page_size: number }) => {
  return instance.get('dynamic-rewards', { params: data });
};

export const getUsers = (data: any) => {
  return instance.get('users', { params: data });
};
