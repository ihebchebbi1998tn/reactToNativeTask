import { format } from 'date-fns';

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatTime = (date: string) => {
  return format(new Date(date), 'hh:mm a');
};