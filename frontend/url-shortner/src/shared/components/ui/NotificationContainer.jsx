import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../../store/slices/uiSlice';
import { toast } from 'sonner';

/**
 * This component acts as a bridge between Redux UI notifications and react-hot-toast.
 * It does not render any UI itself.
 */
const NotificationContainer = () => {
  const notifications = useSelector(state => state.ui.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach((notification) => {
      const { id, type, message, title } = notification;

      // Combine title and message if both exist
      const toastMessage = title ? (
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm font-normal opacity-90">{message}</p>
        </div>
      ) : message;

      // Trigger the appropriate toast
      switch (type) {
        case 'success':
          toast.success(toastMessage, { id }); // Use ID to prevent duplicates if needed
          break;
        case 'error':
          toast.error(toastMessage, { id });
          break;
        case 'warning':
          toast(toastMessage, {
            id,
            icon: '⚠️',
            style: {
              border: '1px solid #d97706', // amber-600
              color: '#fff',
              background: '#1f2937'
            }
          });
          break;
        case 'info':
        default:
          toast(toastMessage, {
            id,
            icon: 'ℹ️',
          });
          break;
      }

      // Remove from Redux immediately as Toast handles the duration/display
      // We don't want it to persist in Redux store unnecessarily
      dispatch(removeNotification(id));
    });
  }, [notifications, dispatch]);

  return null; // No UI rendered
};

export default NotificationContainer;