import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertSlice from "./features/alertSlice";
import  userSlice  from "./features/userSlice";

const reducersCombined=combineReducers({
  alerts: alertSlice.reducer,
  user: userSlice.reducer
})
export default configureStore({
  reducer: reducersCombined
});