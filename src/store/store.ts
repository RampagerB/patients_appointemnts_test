import { createStore, applyMiddleware } from "redux";
import { appReducer } from "../reducers/appReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { IAppointment } from "../types/dataTypes";

interface AppState {
  appointments: Array<IAppointment>;
  loading: boolean;
  filterType: string;
  filterName: string;
  filterDate: string;
  filterPatient: string;
  showBubble: boolean;
  bubblePos: { x: number; y: number };
  curAppointment?: IAppointment;
}

export const initialState: AppState = {
  appointments: [],
  loading: false,
  filterType: "",
  filterName: "",
  filterDate: "",
  filterPatient: "",
  showBubble: false,
  bubblePos: { x: 0, y: 0 },
};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(appReducer, composedEnhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
