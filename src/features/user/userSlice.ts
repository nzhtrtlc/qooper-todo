import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'utils/types/user';

const initialState: UserState = {
  displayName: '',
  isAnonymous: undefined,
  uid: undefined
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state: UserState, action: PayloadAction<firebase.default.User | null>) => {
      state.displayName = action.payload?.displayName;
      state.isAnonymous = action.payload?.isAnonymous;
      state.uid = action.payload?.uid;
    },
    resetUser: (state: UserState) => {
      state.displayName = '';
      state.isAnonymous = initialState.isAnonymous;
      state.uid = initialState.uid;
    }
  }
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;