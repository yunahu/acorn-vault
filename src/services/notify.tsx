import { notification, NotificationArgsProps } from 'antd';
import { ComponentProps, createContext } from 'react';

type NotificationContextType = (args: NotificationArgsProps) => void;

export const NotificationContext = createContext<NotificationContextType>(
  () => undefined
);

export const NotificationProvider = ({ children }: ComponentProps<'div'>) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (props: NotificationArgsProps) => api.open(props);

  return (
    <NotificationContext.Provider value={notify}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
