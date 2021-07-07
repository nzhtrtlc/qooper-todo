import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  displayName: string | null;
  isAnonymous: boolean;
  uid: string | null;
}

const initialState: UserState = {
  displayName: 'Anonymous User',
  isAnonymous: true,
  uid: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state: UserState, action: PayloadAction<UserState>) => {
      const { displayName, isAnonymous, uid } = action.payload;
      state.displayName = displayName;
      state.isAnonymous = isAnonymous;
      state.uid = uid;
    },
    resetUser: (state: UserState) => {
      state = initialState;
    }
  }
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;