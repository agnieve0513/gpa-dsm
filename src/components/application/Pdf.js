import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { blobToBase64 } from "../../helpers";
import "./Pdf.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function DisplayPDF({ data, wrapper }) {
  const [fileURL, setFileURL] = useState("");
  const [numPages, setNumPages] = useState(null);
  console.log(wrapper.current?.getBoundingClientRect().width);
  useEffect(() => {
    const decode = async () => {
      const pdfBlob = new Blob([data], {
        type: "application/pdf",
      });

      if (data) {
        setFileURL(await blobToBase64(pdfBlob));
      }
    };
    decode();
  }, [data]);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <>
      {data ? (
        <Document
          className="document-pdf"
          file={fileURL}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div style={{ marginBottom: 10 }}>
              <Page
                width={
                  wrapper.current?.getBoundingClientRect().width * 0.89 ||
                  undefined
                }
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            </div>
          ))}
        </Document>
      ) : null}
    </>
  );
}

export default DisplayPDF;
