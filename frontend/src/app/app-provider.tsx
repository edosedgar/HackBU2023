import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type TAppContext = {
  appWrapperClasses: string[];
  setAppWrapperClasses: (
    appWrapperClasses: TAppContext["appWrapperClasses"]
  ) => void;
};

const AppContext = createContext<TAppContext>({} as TAppContext);

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [appWrapperClasses, setAppWrapperClasses] = useState<
    TAppContext["appWrapperClasses"]
  >([]);

  return (
    <div className={`app-wrapper ${appWrapperClasses.join(" ")}`.trim()}>
      <AppContext.Provider value={{ appWrapperClasses, setAppWrapperClasses }}>
        {children}
      </AppContext.Provider>
    </div>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
