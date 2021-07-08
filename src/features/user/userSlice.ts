import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  displayName: string | null | undefined;
  isAnonymous: boolean | undefined;
  uid: string | undefined;
}

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