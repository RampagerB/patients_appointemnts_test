import { initialState } from "../store/store";
import {
  FILTER_DATE,
  FILTER_TYPE,
  FILTER_NAME,
  LOADING_APPOINTMENTS,
  LOADED_APPOINTMENTS,
  UPDATE_BUBBLE,
  FILTER_PATIENTS,
} from "../types/actionTypes";

interface IAction {
  type?: string;
  payload?: any;
}

export const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOADING_APPOINTMENTS:
      return { ...state, loading: true };
    case LOADED_APPOINTMENTS:
      return { ...state, appointments: action.payload.aps, loading: false };
    case FILTER_NAME:
      return { ...state, filterName: action.payload };
    case FILTER_DATE:
      return { ...state, filterDate: action.payload };
    case FILTER_PATIENTS:
      return { ...state, filterPatient: action.payload };
    case FILTER_TYPE:
      return { ...state, filterType: action.payload };
    case UPDATE_BUBBLE:
      return {
        ...state,
        showBubble: action.payload.show,
        bubblePos: action.payload.pos,
        curAppointment: action.payload.a,
      };
    default:
      return state;
  }
};
