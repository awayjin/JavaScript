import { get } from '../service/http';

export const fetchUserInfoAPI = () => {
  return get('/getUserInfo').then(res => res.data)
}