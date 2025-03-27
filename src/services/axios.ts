import axios from 'axios';
import { auth } from 'src/services/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const idToken = await auth.currentUser?.getIdToken(true);
    if (idToken) config.headers.Authorization = `Bearer ${idToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAccounts = async () => api.get('/accounts').then((x) => x.data);

export const createAccount = async (
  name: string,
  currencyId: number,
  balance: string,
  isPrimaryPaymentMethod: boolean
) =>
  api.post('/accounts', {
    name,
    currency_id: currencyId,
    balance,
    is_primary_payment_method: isPrimaryPaymentMethod,
  });

export const updateAccount = async (
  accountId: number,
  column: string,
  value: string
) =>
  api.patch(`accounts/${accountId}`, {
    column,
    value,
  });

export const deleteAccount = async (accountId: number) =>
  api.delete(`/accounts/${accountId}`);

export default api;
