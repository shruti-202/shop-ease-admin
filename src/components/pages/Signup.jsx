import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import apiConnection from "../../apiConnection";
import Notify from "../common/Notify";
import { apiEndpoints, httpMethods } from "../../constant/API_ENUM";

export default function Signup() {

  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showNotify, setShowNotify] = useState(false);
  const [notifyData, setNotifyData] = useState({
    type: "",
    message: "",
  });

  const setFormData = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const data = await apiConnection(
        apiEndpoints.REGISTER_USER_ENDPOINT,
        httpMethods.POST,
        signUpFormData
      );
      if (data.status === 201 || 200) {
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
    <div className="signUp w-25 p-5 border border-dark m-5">
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            onChange={(e) => setFormData(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            onChange={(e) => setFormData(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phone"
            type="number"
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
          style={{ backgroundColor: "var(--primary-color)" }}
          variant="primary"
          type="submit"
          onClick={(e) => registerUser(e)}
        >
          Signup
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
