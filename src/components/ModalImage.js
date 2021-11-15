import React, { useState, useEffect } from "react";
import { Modal, Image } from "react-bootstrap";

const ModalImage = (props) => {
  const { description, image_sample } = props?.data;
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className="bg-info text-light no-border"
          closeButton
          closeVariant="white"
          style={{ width: "30vw" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            {description}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ width: "30vw" }}
          className="bg-secondary text-center no-border"
          rounded
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            alt={description}
            src={image_sample}
            rounded
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalImage;
