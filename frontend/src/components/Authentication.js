import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Authentication = () => {
  return (
    <Tabs
      defaultActiveKey="login"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="login" title="Login">
        <LoginForm />
      </Tab>
      <Tab eventKey="signUp" title="Signup">
        <SignUpForm />
      </Tab>
    </Tabs>
  );
};

export default Authentication;
