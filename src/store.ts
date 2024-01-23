import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.ts';

const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export default store;