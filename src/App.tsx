import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import "./App.css";
import LeftPanel from "./components/LeftPanel";
import { LOADING_APPOINTMENTS } from "./types/actionTypes";
import { loadAppointments } from "./actions/appAction";
import SectionPanel from "./components/SectionPanel";
import dayjs from "dayjs";
import MouseOverBubble from "./components/MouseOverBubble";

function App() {
  const loading = useAppSelector((state) => state.loading);
  const appointments = useAppSelector((state) => state.appointments);
  const filterName = useAppSelector((state) => state.filterName);
  const filterType = useAppSelector((state) => state.filterType);
  const filterDate = useAppSelector((state) => state.filterDate);
  const filterPatient = useAppSelector((state) => state.filterPatient);
  const showBubble = useAppSelector((state) => state.showBubble);
  const bubblePos = useAppSelector((state) => state.bubblePos);
  const curAppointment = useAppSelector((state) => state.curAppointment);

  const fAppointments = useAppSelector((state) => {
    if (!appointments) return [];
    const reg = new RegExp(`${filterName}`, "i");
    return state.appointments
      .filter((a) => filterType === "" || a.type === filterType)
      .filter((a) => {
        return (
          filterName === "" ||
          (
            a.patient.account.firstName +
            " " +
            a.patient.account.lastName
          ).search(reg) !== -1
        );
      })
      .filter(
        (a) =>
          filterDate === "" ||
          dayjs(a.serviceStart).isSame(filterDate, "month") ||
          dayjs(a.serviceEnd).isSame(filterDate, "month")
      )
      .filter(
        (a) =>
          filterPatient === "" ||
          a.patient.account.firstName + " " + a.patient.account.lastName ===
            filterPatient
      );
  });

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadAppointments());
  }, [dispatch]);

  return (
    <div className="App">
      <LeftPanel appointments={appointments} />
      <div className="Content">
        <SectionPanel appointments={fAppointments} title="Task" />
        <SectionPanel appointments={fAppointments} title="Review" />
        <SectionPanel appointments={fAppointments} title="Done" />
      </div>
      {showBubble ? (
        <MouseOverBubble
          appointment={curAppointment}
          px={bubblePos.x}
          py={bubblePos.y}
        />
      ) : null}
    </div>
  );
}

export default App;
