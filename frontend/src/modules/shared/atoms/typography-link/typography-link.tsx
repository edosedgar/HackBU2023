import React, { FC } from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/es/typography/Link";
import { To, Path, createPath, useNavigate } from "react-router-dom";

const TypographyLink: FC<
  Omit<LinkProps, "href"> & { to: To; preventNavigation?: boolean }
> = ({ ...linkProps }) => {
  const { children, to, preventNavigation, ...restLinkProps } = linkProps;

  const navigate = useNavigate();

  return (
    <Typography.Link
      href={
        (to as Partial<Path>).pathname
          ? createPath(to as Partial<Path>)
          : (to as string)
      }
      {...restLinkProps}
      onClick={(e) => {
        e.preventDefault();
        if (restLinkProps.onClick) restLinkProps.onClick(e);
        if (!preventNavigation) navigate(to);
      }}
    >
      {children}
    </Typography.Link>
  );
};

export { TypographyLink };
