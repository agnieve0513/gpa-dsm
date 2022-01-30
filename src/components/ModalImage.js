import React, { useState, useEffect } from "react";
import { Modal, Image } from "react-bootstrap";

const ModalImage = (props) => {
  const { description, image_sample, _id } = props?.data;
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
          style={{ width: "auto" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            {description}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-center no-border" rounded>
          {_id == "3" ? (
            <p>
              The Link is provided for the W-9 Form. Click this{" "}
              <a target="_blank" href="https://www.irs.gov/pub/irs-pdf/fw9.pdf">
                link
              </a>{" "}
              to download
            </p>
          ) : image_sample ? (
            <Image
              style={{ maxWidth: "1000px", width: "100%", height: "auto" }}
              alt={description}
              src={image_sample}
              rounded
            />
          ) : (
            <p>
              The Link is provided for the W-9 Form. Click this{" "}
              <a target="_blank" href="https://www.irs.gov/pub/irs-pdf/fw9.pdf">
                link
              </a>{" "}
              to download
            </p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalImage;
