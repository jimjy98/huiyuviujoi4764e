import { configureStore, createSlice } from '@reduxjs/toolkit';

const ownerSlice = createSlice({
    name: 'ownerName',
    initialState: '',
    reducers: {
        setOwnerName: (state, action) => action.payload
    }
});

export const { setOwnerName } = ownerSlice.actions;

const store = configureStore({
    reducer: {
        ownerName: ownerSlice.reducer
    }
});

export default store;
