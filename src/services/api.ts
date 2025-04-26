import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
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

// --- Types ---

export interface Account {
  id: number;
  name: string;
  currency_id: number;
  balance: number;
  is_primary_payment_method: boolean;
}

export type AccountEditableKey =
  | 'name'
  | 'balance'
  | 'is_primary_payment_method';

export interface Record {
  id: number;
  date: Dayjs;
  description: string;
  account_id: number | null;
  amount: number;
}

export type RecordEditableKey =
  | 'date'
  | 'description'
  | 'account_id'
  | 'amount';

export interface Settings {
  primary_currency: number;
}

export type SettingsEditableKey = 'primary_currency';

export interface NetWorth {
  currency_id: number;
  amount: number;
}

// --- Accounts ---

export const createAccount = (
  name: string,
  currencyId: number,
  balance: number,
  isPrimaryPaymentMethod: boolean
) =>
  api.post('/accounts', {
    name,
    currencyId,
    balance,
    isPrimaryPaymentMethod,
  });

export const getAccounts = (): Promise<Account[]> =>
  api.get('/accounts').then((x) => x.data);

export const updateAccount = (
  id: number,
  column: AccountEditableKey,
  value: Account[AccountEditableKey]
): Promise<Account> =>
  api.patch(`accounts/${id}`, {
    column,
    value,
  });

export const deleteAccount = (id: number) => api.delete(`/accounts/${id}`);

// --- Records ---

export const createRecord = (
  date: dayjs.Dayjs,
  description: string,
  accountId: null | number,
  amount: number
) =>
  api.post('/records', {
    date,
    description,
    accountId,
    amount,
  });

export const getRecords = async (
  from: string | null | undefined,
  to: string | null | undefined
): Promise<Record[]> => {
  const records = (await api
    .get(
      `/records
			${from || to ? '?' : ''}
			${from ? 'from=' + from : ''}
			${from && to ? '&' : ''}
			${to ? 'to=' + to : ''}`
    )
    .then((x) => x.data)) as {
    id: number;
    date: string;
    description: string;
    account_id: number | null;
    amount: number;
  }[];

  const mapped: Record[] = records.map((record) => ({
    ...record,
    date: dayjs(record.date.substring(0, 10)),
  }));

  return mapped;
};

export const updateRecord = (
  id: number,
  column: RecordEditableKey,
  value: Record[RecordEditableKey]
) =>
  api.patch(`records/${id}`, {
    column,
    value,
  });

export const deleteRecord = (id: number) => api.delete(`/records/${id}`);

// --- Settings ---

export const getSettings = () => api.get(`/settings`).then((x) => x.data);

export const updateSettings = (
  column: SettingsEditableKey,
  value: Settings[SettingsEditableKey]
): Promise<Settings> =>
  api.patch('/settings', {
    column,
    value,
  });

// --- Statistics ---

export const getNetWorth = () =>
  api.get('/statistics/netWorth').then((x) => x.data);

export default api;
