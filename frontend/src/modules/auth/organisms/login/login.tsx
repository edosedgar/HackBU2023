import React, { FC } from "react";
import { CardLayout } from "@/modules/shared/molecules";
import { Form, Input, Space, Button } from "antd";
import { Passwords } from "@/modules/auth/molecules";
import { TypographyLink } from "@/modules/shared/atoms";
import { useLogin } from "@/modules/auth/hooks";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useLogin(() => {
    navigate("/");
  });

  return (
    <CardLayout
      title="Login"
      topContent={
        <span style={{ fontSize: "48px", color: "#ffffff", fontWeight: 600 }}>
          Welcome
        </span>
      }
    >
      <Form onFinish={login} disabled={isLoggingIn}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your username",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Passwords withConfirmation={false} />
        <Form.Item>
          <Space size={8}>
            <Button type="primary" htmlType="submit" loading={isLoggingIn}>
              Log in
            </Button>
            <TypographyLink style={{ fontSize: "12px" }} to="/auth/register">
              No registered yet?
            </TypographyLink>
          </Space>
        </Form.Item>
      </Form>
    </CardLayout>
  );
};

export { Login };
