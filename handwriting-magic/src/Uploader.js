import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, Alert, Image, Spinner } from "react-bootstrap";
import { Formik } from "formik";

function Uploader() {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleSubmit = async () => {
    console.log("submitting");
    setLoading(true);
    await delay(2000);
    setTimeout("", 3000);
    setResult("TODO");
    setLoading(false);
  };

  return (
    <div
      style={{
        marginLeft: "20px",
        marginTop: "25vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
          color: "#6d02fa",
        }}
      >
        Upload Your Handwriting
      </h1>
      <Row style={{ marginTop: "10px" }}>
        <Col md="8">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
              name="logo"
            />
          </Form.Group>
        </Col>
        <Col md="2">
          <Button
            style={{
              backgroundColor: "#6d02fa",
              border: "none",
            }}
            onClick={handleSubmit}
          >
            Go
          </Button>
        </Col>

        <Col md="2">{loading && <Spinner animation="border" />}</Col>
      </Row>
      {error !== "" && <Alert variant={"danger"}>{error}</Alert>}
      <Image src={file} rounded style={{ width: "200px" }} />
      {result && (
        <h4
          style={{
            color: "#a561ff",
          }}
        >
          Result: {result}
        </h4>
      )}
    </div>
  );
}

export default Uploader;
