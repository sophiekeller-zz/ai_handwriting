import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, Alert, Image, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { Gem } from "react-bootstrap-icons";

function Uploader() {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [numberRight, setNumberRight] = useState("");
  const [feedback, setFeedback] = useState("");
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetch("/get_statistics")
      .then((response) => response.json())
      .then((data) => {
        if (data["error"]) {
          console.log(data["error"]);
        } else {
          setStatistics(data);
        }
      });
  }, []);

  const handleSubmit = async () => {
    console.log("submitting");
    setLoading(true);
    process_photo();
  };

  const process_photo = () => {
    let imageData = new FormData();
    imageData.append("image", file);
    fetch("/process_photo", {
      method: "POST",
      body: imageData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["error"]) {
          console.log(data["error"]);
        } else {
          setResult(data);
          setLoading(false);
        }
      });
  };

  const submitCount = () => {
    if (isNaN(numberRight) || numberRight === "") {
      setFeedback("please enter a number");
    } else {
      let count = result.word_prediction.length;
      let proportionRight = numberRight / count;

      const newInfo = {
        total_data: statistics.total_data + 1,
        probabilities_sum: statistics.probabilities_sum + proportionRight,
      };
      setStatistics(newInfo);
      fetch("/update_statistics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newValue: proportionRight }),
      })
        .then((response) => response.json())
        .then((data) => {
          setFeedback("thanks for your feedback");
        });
    }
  };

  return (
    <div
      style={{
        marginLeft: "20px",
        display: "flex",
        flexDirection: "column",
        paddingTop: "25vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
          color: "white",
          fontSize: "50px",
        }}
      >
        Handwriting Magic
      </h1>
      <Gem size={60} />
      <h5
        style={{
          marginBottom: "10px",
          marginTop: "20px",
          color: "white",
        }}
      >
        Try it out!
      </h5>
      <Row style={{ marginTop: "10px" }}>
        <Col md="8">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              onChange={(e) => {
                setFileUrl(URL.createObjectURL(e.target.files[0]));
                setFile(e.target.files[0]);
              }}
              type="file"
              name="logo"
            />
          </Form.Group>
        </Col>
        <Col md="3">
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

        <Col md="1">{loading && <Spinner animation="border" />}</Col>
      </Row>
      {error !== "" && <Alert variant={"danger"}>{error}</Alert>}
      <Image src={fileUrl} rounded style={{ width: "200px" }} />
      {result && (
        <div>
          <h4
            style={{
              color: "white",
            }}
          >
            Result: {result.word_prediction}
          </h4>
          <h4
            style={{
              color: "white",
            }}
          >
            Probability of Correctness: {result.probability}
          </h4>
        </div>
      )}
      <h5
        style={{
          marginBottom: "10px",
          marginTop: "20px",
          color: "white",
        }}
      >
        How many letters did we get right?
      </h5>
      <Row>
        <Col md="9">
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => {
                setNumberRight(e.target.value);
              }}
              type="text"
            />
          </Form.Group>
        </Col>
        <Col md="3">
          <Button
            style={{
              backgroundColor: "#6d02fa",
              border: "none",
            }}
            onClick={submitCount}
          >
            Submit
          </Button>
        </Col>
        {feedback && <div>{feedback}</div>}
      </Row>
    </div>
  );
}

export default Uploader;
