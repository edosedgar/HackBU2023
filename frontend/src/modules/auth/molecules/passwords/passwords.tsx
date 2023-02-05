import React, { CSSProperties, FC, useState } from "react";
import { Form, FormInstance, Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

type PasswordsProps = {
  withConfirmation?: boolean;
  passwordFormItemStyle?: CSSProperties;
  form?: FormInstance;
  firstItemName?: string;
  firstItemPlaceholder?: string;
};

const Passwords: FC<PasswordsProps> = ({
  withConfirmation = true,
  passwordFormItemStyle,
  form,
  firstItemName = "password",
  firstItemPlaceholder = "Password",
}) => {
  const [passwordsVisible, setPasswordsVisible] = useState(false);
  const togglePasswordsVisible = () => setPasswordsVisible(!passwordsVisible);

  const onInputPassword = async () => {
    if (withConfirmation) {
      if (form) {
        try {
          await form.validateFields(["confirm_password"]);
        } catch {}
      } else {
        console.warn(
          "WARNING: form was not provided (Passwords -> onInputPassword)"
        );
      }
    }
  };

  return (
    <>
      <Form.Item
        name={firstItemName}
        rules={[
          {
            min: 6,
            message: "Minimum length of the password is 6 characters",
          },
        ]}
        style={passwordFormItemStyle}
      >
        <Input
          placeholder={firstItemPlaceholder}
          type={passwordsVisible ? "text" : "password"}
          suffix={
            <div
              role="button"
              style={{ cursor: "pointer" }}
              onMouseDown={togglePasswordsVisible}
              tabIndex={-1}
            >
              {passwordsVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </div>
          }
          autoComplete="new-password"
          onInput={onInputPassword}
        />
      </Form.Item>
      {withConfirmation ? (
        <Form.Item
          name="confirm_password"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("password") !== value) {
                  return Promise.reject(new Error("Passwords must match!"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input
            placeholder="Confirm password"
            type={passwordsVisible ? "text" : "password"}
            autoComplete="new-password"
          />
        </Form.Item>
      ) : null}
    </>
  );
};

export { Passwords };
