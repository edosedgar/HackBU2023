import React, { FC, useState } from "react";
import { CardLayout } from "@/modules/shared/molecules";
import { Button, Form, Input, Space } from "antd";
import authApi, { RegisterData } from "@/modules/auth/api";
import { Passwords } from "@/modules/auth/molecules";
import { useMutation } from "react-query";
import { TypographyLink } from "@/modules/shared/atoms";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

type RegistrationFormData = RegisterData & {
  confirm_password: string;
};

const Registration: FC = () => {
  const [registrationForm] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const initialFormData = useState({
    username: "",
    name: "",
    middle_name: "",
    surname: "",
    password: "",
    confirm_password: "",
  });

  const { mutateAsync: registerAdmin, isLoading: isRegistering } = useMutation(
    ["auth-register"],
    authApi.register,
    {
      onSuccess: (res: any) => {
        localStorage.setItem("token", res.data.token);
      },
      onError: () => {
        enqueueSnackbar("There was an error while trying to register", {
          variant: "error",
        });
      },
    }
  );

  const handleRegister = async (data: RegistrationFormData) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { confirm_password, ...registerData } = data;
    try {
      await registerAdmin(registerData);
      navigate("/");
    } catch {}
  };

  const isLoading = isRegistering;

  return (
    <CardLayout
      title="Registration"
      topContent={
        <span style={{ fontSize: "48px", color: "#ffffff", fontWeight: 600 }}>
          Welcome
        </span>
      }
    >
      <Form
        form={registrationForm}
        initialValues={initialFormData}
        onFinish={handleRegister}
        disabled={isLoading}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              max: 7,
              message: "Maximum length of the username is 7 characters",
            },
            {
              required: true,
              message: "Please enter your username",
            },
          ]}
        >
          <Input placeholder="Username" autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
          ]}
        >
          <Input placeholder="First name" autoComplete="new-password" />
        </Form.Item>
        <Form.Item name="middle_name">
          <Input placeholder="Middle name" autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name="surname"
          rules={[
            {
              required: true,
              message: "Please enter your last name",
            },
          ]}
        >
          <Input placeholder="Last name" autoComplete="new-password" />
        </Form.Item>
        <Passwords form={registrationForm} />
        <Form.Item>
          <Space size={8}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              Register
            </Button>
            <TypographyLink style={{ fontSize: "12px" }} to="/auth/login">
              Already registered?
            </TypographyLink>
          </Space>
        </Form.Item>
      </Form>
    </CardLayout>
  );
};

export { Registration };
