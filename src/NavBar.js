import React, { useState } from "react";

import { Form, Button, Nav, Navbar } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar
      variant="dark"
      expand="lg"
      style={{
        backgroundImage: "linear-gradient(#a561ff, #6d02fa)",
        paddingLeft: "40px",
        paddingRight: "40px",
        color: "white",
      }}
    >
      <Navbar.Brand href="#home">Handwriting Magic</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
