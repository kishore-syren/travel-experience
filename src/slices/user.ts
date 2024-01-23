import { createSlice } from '@reduxjs/toolkit';

interface InitialState{
    name : string;
}
const initialState : InitialState = {
    name : ''
} 

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        getUser(state, action){
            console.log(action.payload);
            state.name = action.payload;
        }

    }
})

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
