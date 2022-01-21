import dayjs from "dayjs";
import React, {
  createRef,
  CSSProperties,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IAppointment } from "../types/dataTypes";

interface MouseOverBubbleProps {
  appointment?: IAppointment;
  width?: string;
  height?: string;
  px: number;
  py: number;
}

const MouseOverBubble = ({
  appointment,
  width = "400px",
  height = "auto",
  px,
  py,
}: MouseOverBubbleProps) => {
  const ref = createRef<HTMLDivElement>();

  const style: CSSProperties = {
    left: px,
    top: py,
    width: width,
    height: height,
  };
  if (appointment) {
    return (
      <div ref={ref} className="MouseOverBubble" style={style}>
        <h4>{appointment.type}</h4>
        <p>
          {dayjs(appointment.serviceStart).format("MMMM DD,YYYY").toString() +
            " - " +
            dayjs(appointment.serviceStart).format("MMMM DD,YYYY").toString()}
        </p>
        <p>{appointment.description}</p>
      </div>
    );
  } else {
    return <div className="MouseOverBubble" style={style}></div>;
  }
};

export default MouseOverBubble;
