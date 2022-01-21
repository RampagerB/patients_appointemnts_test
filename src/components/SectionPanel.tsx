import React from "react";
import { updateBubble } from "../actions/appAction";
import { useAppDispatch } from "../hooks/hooks";
import { IAppointment } from "../types/dataTypes";
import DoneItem from "./DoneItem";
import PendingItem from "./PendingItem";
import ReviewItem from "./ReviewItem";

interface SectionPanelProps {
  appointments: Array<IAppointment>;
  title: string;
}

const SectionPanel = ({ appointments = [], title = "" }: SectionPanelProps) => {
  const dispatch = useAppDispatch();
  const onItemMouseMove = (
    show: boolean,
    pos: { x: number; y: number },
    a?: IAppointment
  ) => {
    dispatch(updateBubble(show, pos, a));
  };

  const renderItems = () => {
    switch (title) {
      case "Task":
        return appointments
          .filter((a) => a.status === "PENDING")
          .map((a) => (
            <PendingItem
              appointment={a}
              key={"PENDING" + a.id}
              onItemMouseMove={onItemMouseMove}
            />
          ));
      case "Review":
        return appointments
          .filter((a) => a.status === "NEED_REVIEW")
          .map((a) => (
            <ReviewItem
              appointment={a}
              key={"NEED_REVIEW" + a.id}
              onItemMouseMove={onItemMouseMove}
            />
          ));
      case "Done":
        return appointments
          .filter((a) => a.status === "COMPLETED")
          .map((a) => (
            <DoneItem
              appointment={a}
              key={"COMPLETED" + a.id}
              onItemMouseMove={onItemMouseMove}
            />
          ));
    }
  };

  return (
    <div className="SectionPanel" key={title}>
      <div className="SectionHeader">
        <h4>{title}</h4>
      </div>
      {renderItems()}
    </div>
  );
};

export default SectionPanel;
