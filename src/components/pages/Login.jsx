import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import apiConnection from "../../apiConnection";
import Notify from "../common/Notify";
import { apiEndpoints, httpMethods } from "../../constant/API_ENUM";
import { getCookie } from "../../utils/getCookie";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [showNotify, setShowNotify] = useState(false);
  const [notifyData, setNotifyData] = useState({
    type: "",
    message: "",
  });

  const setFormData = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const data = await apiConnection(
        apiEndpoints.LOGIN_ENDPOINT,
        httpMethods.POST,
        loginFormData
      );
      if (data.status === 200) {
        console.log(getCookie('token'))
        setShowNotify(true);
        setNotifyData({
          ...notifyData,
          message: data.data.message,
          type: "success",
        });
      } else {
        setShowNotify(true);
        setNotifyData({
          ...notifyData,
          message: "Error:Please reload your application",
          type: "danger",
        });
      }
    } catch {
      setShowNotify(true);
      setNotifyData({
        ...notifyData,
        message: "Error:Please reload your application",
        type: "danger",
      });
    }
  };

  return (
    <div className="login w-25 p-5 border border-dark m-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            onChange={(e) => setFormData(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={(e) => setFormData(e)}
          />
        </Form.Group>

        <Button style={{backgroundColor:"var(--primary-color)"}} variant="primary" type="submit" onClick={(e) => loginUser(e)}>
          Login
        </Button>
      </Form>
      <br></br>
      {showNotify && (
        <Notify
          message={notifyData.message}
          type={notifyData.type}
          setShowNotify={setShowNotify}
        />
      )}
    </div>
  );
}
