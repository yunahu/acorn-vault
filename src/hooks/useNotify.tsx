import { notification, NotificationArgsProps } from 'antd';
import { AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
import { ComponentProps, createContext, useContext } from 'react';
import { UNKNOWN_ERROR } from 'src/constants/messages';

interface Issue {
  code: string;
  message: string;
  path: string[];
}

interface ZodError extends Error {
  issues: Partial<Issue>[];
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotifyProps extends NotificationArgsProps {
  notificationType?: NotificationType;
}

type Notify = (notifyProps: NotifyProps) => void;

type NotifyError = (error: unknown) => void;

interface NotificationContextType {
  notify: Notify;
  notifyError: NotifyError;
}

const NotificationContext = createContext<NotificationContextType>({
  notify: () => undefined,
  notifyError: () => undefined,
});

export const NotificationProvider = ({ children }: ComponentProps<'div'>) => {
  const [api, contextHolder] = notification.useNotification();

  const notify: Notify = ({ notificationType, ...rest }) => {
    if (notificationType) api[notificationType](rest);
    else api.open(rest);
  };

  const notifyError: NotifyError = (err) => {
    if (err instanceof FirebaseError) {
      notify({
        notificationType: 'error',
        message: err.code,
        description: err.message,
      });
      return;
    }

    if (err instanceof AxiosError) {
      const data = err.response?.data;

      if ('name' in data && data.name === 'ZodError') {
        (data as ZodError).issues.forEach((issue) => {
          notify({ message: issue.message, notificationType: 'error' });
        });
        return;
      }

      notify({
        notificationType: 'error',
        message: JSON.stringify(err.response?.data),
      });
      return;
    }

    notify(UNKNOWN_ERROR);
  };

  return (
    <NotificationContext.Provider value={{ notify, notifyError }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

const useNotify = () => useContext(NotificationContext);

export default useNotify;
