import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pairings: [],
};

const pairingSlice = createSlice({
  name: 'pairings',
  initialState,
  reducers: {
    setPairings(state, action) {
      state.pairings = action.payload;
    },
    addPairing(state, action) {
      state.pairings.push(action.payload);
    },
  },
});

export const { setPairings, addPairing } = pairingSlice.actions;
export default pairingSlice.reducer;
