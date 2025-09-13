import { NotifyProps } from 'src/hooks/useNotify';

export const NOT_IMPLEMENTED: NotifyProps = {
  message: 'Under Development',
  description: 'This feature is not available yet.',
};

export const PRIMARY_CURRENCY_UPDATED: NotifyProps = {
  notificationType: 'success',
  message: 'Your primary currency has been successfully updated.',
};

export const UNKNOWN_ERROR: NotifyProps = {
  notificationType: 'error',
  message: 'An unknown error has occurred.',
};

export const USER_DELETED: NotifyProps = {
  notificationType: 'success',
  message: 'Your account has been successfully deleted.',
  description: 'We hope to see you again in the future!',
};

export const NAME_UPDATED: NotifyProps = {
  notificationType: 'success',
  message: 'User name has been successfully updated.',
};
