import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Banners() {

  const navigateToAddBanner = useNavigate();
  return (
    <div className="banners w-100 p-2">
      <Button
        className="w-100"
        style={{ backgroundColor: "var(--primary-color)" }}
        onClick={() => navigateToAddBanner("/add-banner")}
      >
        {" "}
        Add Banner
      </Button>
    </div>
  );
}
