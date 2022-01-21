import {
  LOADING_APPOINTMENTS,
  LOADED_APPOINTMENTS,
  FILTER_NAME,
  FILTER_TYPE,
  FILTER_DATE,
  UPDATE_BUBBLE,
  FILTER_PATIENTS,
} from "../types/actionTypes";
import axios from "axios";
import { AppDispatch } from "../store/store";
import { IAppointment } from "../types/dataTypes";

export const loadAppointments = () => (dispatch: AppDispatch) => {
  dispatch({ type: LOADING_APPOINTMENTS });
  axios({
    url: "/data/appointments.json",
    responseType: "json",
    headers: {
      Accept: "application/json; odata=verbose",
    },
  }).then((res) => {
    dispatch({
      type: LOADED_APPOINTMENTS,
      payload: { aps: res.data.data.allNotes.edges },
    });
  });
};

export function filterName(name: string) {
  return {
    type: FILTER_NAME,
    payload: name,
  };
}

export function filterDate(date: string) {
  return {
    type: FILTER_DATE,
    payload: date,
  };
}

export function filterPatients(patient: string) {
  return {
    type: FILTER_PATIENTS,
    payload: patient,
  };
}

export function filterType(t: string) {
  return {
    type: FILTER_TYPE,
    payload: t,
  };
}

export const updateBubble = (
  show: boolean,
  pos: { x: number; y: number },
  a?: IAppointment
) => ({
  type: UPDATE_BUBBLE,
  payload: { show, pos, a },
});
