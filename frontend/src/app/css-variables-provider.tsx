import React, { CSSProperties, FC, PropsWithChildren } from "react";
import { useToken } from "antd/es/theme/internal";

const CssVariablesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [, token] = useToken();

  return (
    <div
      style={
        {
          "--ant-color-primary": token.colorPrimary,
          "--ant-color-error": token.colorError,
        } as CSSProperties & Record<string, string | number>
      }
    >
      {children}
    </div>
  );
};

export { CssVariablesProvider };
