import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import apiConnection from "../../apiConnection";
import Notify from "../common/Notify";
import { apiEndpoints, httpMethods } from "../../constant/API_ENUM";

export default function AddBanner() {
  const [bannerData, setBannerData] = useState({
    name: "",
    bannerImageLink: "",
    productLink: "",
  });

  const [bannerImage, setBannerImage] = useState();

  const uploadBannerImageReference = useRef();

  const [showNotify, setShowNotify] = useState(false);
  const [notifyData, setNotifyData] = useState({
    type: "",
    message: "",
  });

  const setFormData = (e) => {
    setBannerData({ ...bannerData, [e.target.name]: e.target.value });
  };

  const uploadFileImage = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const removeBannerImage = () => {
    setBannerImage();
  };

  const handleUploadBannerClick = () => {
    uploadBannerImageReference.current.click();
  };

  const bannerImageUpload = async () => {
    const data = await apiConnection(apiEndpoints.UPLOAD_FILE_ENDPOINT, httpMethods.POST, { banner: bannerImage },
      {"Content-Type": "multipart/form-data"});
    if (data.status === 201 || 200) {
      return {status:true, data: data.data.data};
    } else {
      return {status:false};
    }
  };

  const addBanner = async (e) => {
    try {
      e.preventDefault();
      const bannerImageUploadData = await bannerImageUpload();
      if (!bannerImageUploadData) {
        setShowNotify(true);
        setNotifyData({
          ...notifyData,
          message: "Error:Banner Image Upload failed",
          type: "danger",
        });
        return;
      }

      const data = await apiConnection(apiEndpoints.ADD_BANNER_ENDPOINT, httpMethods.POST,{...bannerData, bannerImageLink:bannerImageUploadData.data});
      if (data.status === 201) {
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
          message: data.data.message,
          type: "danger",
        });
      }
      reset();
    } catch {
      setShowNotify(true);
      setNotifyData({
        ...notifyData,
        message: "Error:Please reload your application",
        type: "danger",
      });
    }
  };
  
  const reset = () => {
    setBannerData({
      name:"",
      bannerImageLink:"",
      productLink:""
    })
    setBannerImage();
  }
  return (
    <div
      className="addBanner w-25 p-4 m-5u mt-5 ms-5 mb-5"
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
    >
      <Form>
        <div className="text-center mb-3">
          <Form.Label as="h5">ADD BANNER</Form.Label>
        </div>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Banner Name</Form.Label>
          <Form.Control
           value={bannerData.name}
            name="name"
            type="text"
            onChange={(e) => setFormData(e)}
          />
        </Form.Group>

        {bannerImage && (
          <div className="position-relative">
            <img
              className="img-fluid"
              src={bannerImage ? URL.createObjectURL(bannerImage) : ""}
              alt=""
            ></img>
            <div
              onClick={removeBannerImage}
              className="position-absolute top-0 end-0 bg-danger text-light px-1"
              style={{ cursor: "pointer" }}
            >
              &#10005;
            </div>
          </div>
        )}

        <Form.Group controlId="formFile" className="mb-3">
          <Button
            style={{
              backgroundColor: "transparent",
              border: "2px solid var(--primary-color)",
              color: "var(--dark-purple)",
            }}
            className={bannerImage && "d-none"}
            onClick={handleUploadBannerClick}
          >
            Upload Banner Image
          </Button>
          <Form.Control
            ref={uploadBannerImageReference}
            className="d-none"
            name="banner"
            type="file"
            onChange={(e) => uploadFileImage(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductLink">
          <Form.Label>Product Link</Form.Label>
          <Form.Control
            value={bannerData.productLink}
            name="productLink"
            type="text"
            onChange={(e) => setFormData(e)}
          />
        </Form.Group>

        <Button
          style={{
            width: "150px",
            backgroundColor: "var(--primary-color)",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
          type="submit"
          onClick={(e) => addBanner(e)}
        >
          ADD BANNER
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
