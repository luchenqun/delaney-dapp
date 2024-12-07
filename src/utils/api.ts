import instance from './axios';
import instanceNoToast from './axiosNoToast';

export const createUser = (data: { address: string; parent_ref: string }) => {
  return instanceNoToast.post('create-user', data);
};

export const getUser = (data: { address: string }) => {
  return instance.get('user', { params: data });
};

export const getUserNoToast = (data: { address: string }) => {
  if (!localStorage.getItem(data.address + 'sign')) {
    return Promise.reject();
  }
  return instanceNoToast.get('user', { params: data });
};

export const getMudPrice = () => {
  return instance.get('mud-price');
};

type RewardIds = {
  dynamic_ids: number[];
  static_ids: number[];
};

export const clearClaim = (data: { address: string }) => {
  return instance.post('clear-claim', data);
};

export const signClaim = (data: { address: string; usdt: number; min_mud: number; reward_ids: RewardIds }) => {
  return instance.post('sign-claim', data);
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

export const getStaticRewards = (data: { filters: any; page: number; page_size: number; sort_field: string; sort_order: string }) => {
  return instance.get('static-rewards', { params: data });
};

export const getDynamicRewards = (data: { filters: any; page: number; page_size: number; sort_field: string; sort_order: string }) => {
  return instance.get('dynamic-rewards', { params: data });
};

export const getUsers = (data: any) => {
  return instance.get('users', { params: data });
};

export const getDelegates = (data: any) => {
  return instance.get('delegates', { params: data });
};

export const getConfig = () => {
  return instance.get('configs');
};

export const getMessages = (data: any) => {
  return instance.get('messages', { params: data });
};

export const getHasUnreadMessage = (data: { address: string }) => {
  return instance.get('has-unread-message', { params: data });
};

export const getClaims = (data: any) => {
  return instance.get('claims', { params: data });
};

export const setMessageRead = (data: { address: string }) => {
  return instance.post('set-message-all-read', data);
};
