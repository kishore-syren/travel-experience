import { createSlice } from '@reduxjs/toolkit';

interface InitialState{
    name : string;
    pic : string;
}
const initialState : InitialState = {
    name : '',
    pic : ''
} 

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        getUser(state, action){
            console.log(action.payload);
            state.name = action.payload.data;
            state.pic = action.payload.pic;
        }

    }
})

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
