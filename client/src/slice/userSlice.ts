import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RowType } from "../containers/interface";
import { RootState } from "../store";
import data from "../data/users.json";

type TInitialState = { userData?: Omit<RowType, "edit">[] };

const initialState: TInitialState = { userData: data };

const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<TInitialState>) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, clearUserData } = userData.actions;

export default userData.reducer;

export const users = (state: RootState) => state.users.userData;
// export const allUserData = (state: RootState) => state.users;
