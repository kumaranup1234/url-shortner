import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import urlSlice from './slices/urlSlice';
import uiSlice from './slices/uiSlice';
import dashboardSlice from './slices/dashboardSlice';
import analyticsSlice from './slices/analyticsSlice';
import onelinkSlice from './slices/onelinkSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    urls: urlSlice,
    ui: uiSlice,
    dashboard: dashboardSlice,
    analytics: analyticsSlice,
    onelink: onelinkSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;