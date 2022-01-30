import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function CustomerHeader() {
  return (
    <header className="px-0">
      <Navbar
        bg="info"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="p-3"
      >
        <Container>
          <Link to={`/`}>
            <img
              src="/icon.png"
              width="200"
              height="55"
              className="d-inline-block align-top"
              alt="Energy Sense Rebate Program"
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <h2 className="text-light">Energy Sense Rebate Program</h2>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default CustomerHeader;
