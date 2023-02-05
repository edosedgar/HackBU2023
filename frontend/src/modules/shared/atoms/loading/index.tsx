import React, { FC } from "react";
import ReactLoading from "react-loading";
import "./index.scss";
import { useToken } from "antd/es/theme/internal";

type LoadingProps = {
  block?: boolean;
  size?: number;
};

const Loading: FC<LoadingProps> = ({ block = false, size = 100 }) => {
  const [, token] = useToken();

  return (
    <div
      className={`shared-loading ${
        block ? "shared-loading--block" : ""
      }`.trim()}
    >
      <ReactLoading
        type="bars"
        color={token.colorPrimary}
        height={size}
        width={size}
      />
    </div>
  );
};

export { Loading };
