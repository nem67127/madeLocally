import { createContext, useState } from "react";

export const UpdateEventContext = createContext();

export const UpdateEventContextProvider = ({ children }) => {
  const [eventUpdate, setEventUpdate] = useState(false);

  return (
    <UpdateEventContext.Provider value={{ eventUpdate, setEventUpdate }}>
      {children}
    </UpdateEventContext.Provider>
  );
};
