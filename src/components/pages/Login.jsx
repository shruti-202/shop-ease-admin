import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import apiConnection from "../../apiConnection";
import Notify from "../common/Notify";
import { apiEndpoints, httpMethods } from "../../constant/API_ENUM";
import { getCookie } from "../../utils/getCookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const navigateToSignUp = useNavigate();

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
        console.log(getCookie("token"));
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
    <div
      className="login w-25 p-4 m-5 mx-auto mt-5"
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
    >
      <Form>
        <div className="text-center mb-3">
          <Form.Label as="h5">LOGIN</Form.Label>
        </div>
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

        <Button
          style={{
            backgroundColor: "var(--primary-color)",
            width: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            fontWeight: 600,
          }}
          type="submit"
          onClick={(e) => loginUser(e)}
        >
          LOGIN
        </Button>
      </Form>
      <div className="d-flex mt-3 align-items-center gap-2">
        <p className="mb-0 mr-2">Don't have an Account?</p>
        <Button
          style={{
            color: "var(--dark-purple)",
            height: "35px",
            backgroundColor: "transparent",
            border: "1px solid var(--dark-purple)",
            fontSize: "16px",
            fontWeight: 600,
          }}
          type="submit"
          className="d-flex align-items-center justify-content-center"
          onClick={() => navigateToSignUp("/signup")}
        >
          SIGN UP
        </Button>
      </div>
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
