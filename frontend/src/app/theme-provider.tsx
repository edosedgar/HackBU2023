import React, { FC, PropsWithChildren } from "react";
import { ConfigProvider } from "antd";
import { CssVariablesProvider } from "./css-variables-provider";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider>
      <CssVariablesProvider>{children}</CssVariablesProvider>
    </ConfigProvider>
  );
};

export { ThemeProvider };
