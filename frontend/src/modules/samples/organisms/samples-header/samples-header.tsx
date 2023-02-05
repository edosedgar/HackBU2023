import React, { FC } from "react";
import "./samples-header.scss";
import { Button, Tooltip, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useLogout } from "@/modules/auth/hooks";

const SamplesHeader: FC = () => {
  const { logout } = useLogout();

  return (
    <div className="samples-header">
      <Typography.Text>Gallery</Typography.Text>
      <Tooltip title="Log out" placement="bottom">
        <Button icon={<LogoutOutlined />} danger onClick={logout} />
      </Tooltip>
    </div>
  );
};

export { SamplesHeader };
