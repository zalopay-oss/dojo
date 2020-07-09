import React, { useEffect } from "react";
import { Button, Checkbox, Form, Icon, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { hideMessage } from "appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import UserService from "../services/UserService";

const FormItem = Form.Item;

const SignIn = (props) => {
  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage, authUser } = useSelector(
    ({ auth }) => auth
  );
  const history = useHistory();

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    let username = localStorage.getItem("username");
    let role = localStorage.getItem("role");
    let token = localStorage.getItem("token");
    if (username && role && token) {
      history.push("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        UserService.login(values.domain, values.password, (res) => {
          if (res.code === 200) {
            let { data } = res;
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);
            localStorage.setItem("token", data.token);
            history.push("/main/question/interview");
          }
        });
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg"></div>
            <div className="gx-app-logo-wid" style={{ textAlign: "center" }}>
              <h1>
                <IntlMessages id="app.userAuth.signIn" />
              </h1>
            </div>
            <div className="gx-app-logo"></div>
          </div>
          <div className="gx-app-login-content">
            <Form
              onSubmit={handleSubmit}
              className="gx-signin-form gx-form-row0"
            >
              <FormItem>
                {getFieldDecorator("domain", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your domain!",
                    },
                  ],
                })(<Input placeholder="Domain" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your PIN + OTP!" },
                  ],
                })(<Input type="password" placeholder="PIN + OTP" />)}
              </FormItem>
              <br />
              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>
              </FormItem>
            </Form>
          </div>

          {loader ? (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          ) : null}
          {showMessage ? message.error(alertMessage.toString()) : null}
        </div>
      </div>
    </div>
  );
};

const WrappedNormalLoginForm = Form.create()(SignIn);

export default WrappedNormalLoginForm;
