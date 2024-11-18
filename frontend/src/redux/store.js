import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studentReducer from './slices/studentSlice';
import pairingReducer from './slices/pairingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    pairings: pairingReducer,
  },
});

export default store;
