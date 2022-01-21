import React from "react";
import { IAppointment } from "../types/dataTypes";
import "../App.css";
import { useAppDispatch } from "../hooks/hooks";
import {
  filterName,
  filterType,
  filterDate,
  filterPatients,
} from "../actions/appAction";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";

interface LeftPanelProps {
  appointments: Array<IAppointment>;
}

const LeftPanel = ({ appointments = [] }: LeftPanelProps) => {
  const dispatch = useAppDispatch();
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(filterName(value));
  };
  const onDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(filterDate(value));
  };
  const onPatientsSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(filterPatients(value));
  };
  const onTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (event.target as HTMLSelectElement).value;
    dispatch(filterType(value));
  };

  const renderDateOptions = () => {
    let dates = new Array<string>();
    appointments.forEach((a) => {
      dates.push(dayjs(a.serviceStart).format("MMMM YYYY").toString());
      dates.push(dayjs(a.serviceEnd).format("MMMM YYYY").toString());
    });
    let newDate = new Set<string>(dates.sort());
    dates = Array.from(newDate);
    return dates.map((d) => (
      <option key={d} value={d}>
        {d}
      </option>
    ));
  };

  const renderPatientsOptions = () => {
    let patients = new Array<string>();
    appointments.forEach((a) => {
      patients.push(
        a.patient.account.firstName + " " + a.patient.account.lastName
      );
    });
    let newArr = new Set<string>(patients.sort());
    patients = Array.from(newArr);
    return patients.map((d) => (
      <option key={d} value={d}>
        {d}
      </option>
    ));
  };
  return (
    <div className="LeftPanel">
      <div className="searchPanel">
        <div className="searchArea">
          <FaSearch color="#777777" />
          <input
            className="searchInput"
            onChange={onInputChange}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="selectPanel">
        <p>PERIOD</p>
        <select onChange={onDateSelect}>
          <option value="">All</option>
          {renderDateOptions()}
        </select>
      </div>
      <div className="selectPanel">
        <p>PATIENTS</p>
        <select onChange={onPatientsSelect}>
          <option value="">All</option>
          {renderPatientsOptions()}
        </select>
      </div>
      <div className="selectPanel">
        <p>TYPE OF APPOINTMENT</p>
        <select onChange={onTypeSelect}>
          <option value="">All</option>
          <option value="TYPE_A">Type A</option>
          <option value="TYPE_B">Type B</option>
          <option value="TYPE_C">Type C</option>
        </select>
      </div>
    </div>
  );
};

export default LeftPanel;
