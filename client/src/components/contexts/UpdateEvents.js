import { createContext, useState } from "react";

export const UpdateEventContext = createContext();

export const UpdateEventContextProvider = ({ children }) => {
  const [eventUpdate, setEventUpdate] = useState(false);
  const [event, setEvent] = useState(null);

  return (
    <UpdateEventContext.Provider
      value={{
        event,
        setEvent,
        eventUpdate,
        setEventUpdate,
      }}
    >
      {children}
    </UpdateEventContext.Provider>
  );
};
