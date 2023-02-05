import React, { FC, PropsWithChildren, ReactNode } from "react";
import { Card } from "antd";
import "./card-layout.scss";

type CardLayoutProps = {
  title?: string;
  topContent?: ReactNode;
};

const CardLayout: FC<PropsWithChildren<CardLayoutProps>> = ({
  title,
  children,
  topContent,
}) => {
  return (
    <div className="card-layout gradient-bg">
      {topContent ? (
        <div className="card-layout__top-content">{topContent}</div>
      ) : null}
      <Card title={title} bordered={false}>
        {children}
      </Card>
    </div>
  );
};

export { CardLayout };
