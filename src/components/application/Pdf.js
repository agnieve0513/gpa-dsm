import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { blobToBase64 } from "../../helpers";
import { useContainerDimensions, useWindowDimensions } from "../../hooks";
import "./Pdf.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function DisplayPDF({ data, wrapper }) {
  const [fileURL, setFileURL] = useState("");
  const [numPages, setNumPages] = useState(null);
  const { width, height } = useContainerDimensions(wrapper);
  const dimension = useWindowDimensions();
  const temp = dimension.width <= 990 ? 15 : 40;
  const per = (dimension.width / 100) * temp;
  console.log("WIDTH: ", width);
  console.log("DIMENSION WIDTH: ", dimension.width);

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
                // width={width ==0 ? dimension.width >= 2240 ? 1200 : dimension.width - per * 0.50 : width * 0.50 || undefined}
                width={
                  width == 0
                    ? dimension.width - per * 0.9
                    : width * 0.9 || undefined
                }
                scale={dimension.width < 768 ? 3.0 : 1.0}
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
