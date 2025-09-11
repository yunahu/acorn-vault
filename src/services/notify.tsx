import { notification, NotificationArgsProps } from 'antd';
import { ComponentProps, createContext } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type NotificationContextType = (
  props: NotificationArgsProps,
  type?: NotificationType
) => void;

export const NotificationContext = createContext<NotificationContextType>(
  () => undefined
);

export const NotificationProvider = ({ children }: ComponentProps<'div'>) => {
  const [api, contextHolder] = notification.useNotification();

  const notify: NotificationContextType = (props, notificationType) => {
    if (notificationType) api[notificationType](props);
    else api.open(props);
  };

  return (
    <NotificationContext.Provider value={notify}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
