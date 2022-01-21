import React, { CSSProperties, MouseEventHandler } from "react";
import { IAppointment } from "../types/dataTypes";
import dayjs from "dayjs";
import { debounce } from "ts-debounce";

interface DoneItemProps {
  appointment: IAppointment;
  onItemMouseMove: Function;
}

const DoneItem = ({ appointment, onItemMouseMove }: DoneItemProps) => {
  const typeTagStyle: CSSProperties = {
    backgroundColor:
      appointment.type === "TYPE_A"
        ? "green"
        : appointment.type === "TYPE_B"
        ? "blue"
        : "orange",
  };
  return (
    <div
      className="PendingItem"
      key={appointment.id}
      onMouseOver={(event) =>
        debounce(
          onItemMouseMove(
            true,
            {
              x:
                event.clientX > window.document.body.clientWidth / 2
                  ? event.clientX - 420
                  : event.clientX,
              y:
                event.clientY > window.document.body.clientHeight / 2
                  ? event.clientY - 400
                  : event.clientY,
            },
            appointment
          ),
          200,
          { isImmediate: true }
        )
      }
      // onMouseMove={(event) =>
      //   onItemMouseMove(true, { x: event.clientX, y: event.clientY })
      // }
      onMouseLeave={(event) =>
        onItemMouseMove(false, { x: event.clientX, y: event.clientY })
      }
    >
      <div className="PendingItemTitle">
        <h5>
          {appointment.patient.account.firstName +
            " " +
            appointment.patient.account.lastName}
        </h5>
        <div className="typeTag" style={typeTagStyle}>
          {appointment.type}
        </div>
      </div>
      <div className="DoneItemPerson">
        <div className="SignedbyWrap">
          <p>SIGNED BY</p>
          <div className="Signedby">
            <img
              alt={`SIGNED BY ${appointment.signee.account.firstName} ${appointment.signee.account.lastName}`}
              src="/logo192.png"
            />
            <span>
              {appointment.signee.account.firstName +
                " " +
                appointment.signee.account.lastName}
            </span>
          </div>
        </div>
        <div className="SignedbyWrap">
          <p>ATTESTED BY</p>
          <div className="Signedby">
            <img
              alt={`ATTESTED BY ${appointment.signee.account.firstName} ${appointment.signee.account.lastName}`}
              src="/logo192.png"
            />
            <span>
              {appointment.supervisor?.account.firstName +
                " " +
                appointment.supervisor?.account.lastName}
            </span>
          </div>
        </div>
      </div>
      <p>SERVICE DATE</p>
      <span>
        {dayjs(appointment.serviceStart).format("MMMM DD,YYYY").toString() +
          " - " +
          dayjs(appointment.serviceEnd).format("MMMM DD,YYYY").toString()}
      </span>
    </div>
  );
};

export default DoneItem;
