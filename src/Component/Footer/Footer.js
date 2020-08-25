import React from "react";
import { Container, Row, Col } from "reactstrap";

import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <Container className="main-footer">
          <Row>
            <Col className="footer-infor">
              <a href="/contact-us">Contact Us</a>
            </Col>
            <Col className="footer-infor">
              <a href="/contact-us">About Us</a>
            </Col>
            <Col className="footer-infor">
              <a href="/contact-us">Stores</a>
            </Col>
            <Col className="footer-infor">
              <a href="/contact-us">Policy</a>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
