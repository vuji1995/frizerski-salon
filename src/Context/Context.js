import { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const openModal = () => {
    setModalOpened((oldState) => !oldState);
  };

  return (
    <Context.Provider value={{ modalOpened, setModalOpened }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
