import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.ts';
import { userApi } from './api/userApi.ts';

const store = configureStore({
    reducer: {
        user: userSlice,
        [userApi.reducerPath]: userApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})

export default store;