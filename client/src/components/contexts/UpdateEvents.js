import { createContext, useState } from "react";
import { format } from "date-fns";

export const UpdateEventContext = createContext();

export const UpdateEventContextProvider = ({ children }) => {
  const [eventUpdate, setEventUpdate] = useState(false);
  const [event, setEvent] = useState(null);
  //formating dates
  const goodDate = event && event.startDate.replaceAll("-", "/");
  const evDate = new Date(goodDate);
  const goodEndDate = event && event.endDate.replaceAll("-", "/");
  const evEndDate = new Date(goodEndDate);
  const startDate = format(evDate, "MMMM dd, yyyy");
  const endDate = event && event.endDate && format(evEndDate, "MMMM dd, yyyy");

  return (
    <UpdateEventContext.Provider
      value={{
        event,
        setEvent,
        startDate,
        endDate,
        eventUpdate,
        setEventUpdate,
      }}
    >
      {children}
    </UpdateEventContext.Provider>
  );
};
