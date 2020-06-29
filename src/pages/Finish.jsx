import React, { useEffect, useCallback } from "react";
import { Layout, Loading, CorrectPose, Posemodel } from "../components";
import { Container, Row, Col, Nav, NavItem, NavLink, Button } from "reactstrap";
import "./page.css";
import { Link } from "react-router-dom";
import final from "../components/icon/final.png";

export default function Finish() {
  return (
    <Layout>
      <Container>
        <br />
        <br />
        <br />
        <Row>
          <Col sm="12" md={{ size: 9, offset: 2 }}>
            <img src={final}></img>
            <br />
            <br />
          </Col>
          <Col sm="12" md={{ size: 9, offset: 3 }}>
            <h3> 거북목 교정 스트레칭 루틴을 완료하셨습니다! </h3>
            <br />
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="4"></Col>
          <Col xs="6" sm="2">
            <Button outline color="info" tag={Link} to="/forwardNeck">
              다시 하러가기
            </Button>
          </Col>
          <Col xs="6" sm="4">
            <Button outline color="danger" tag={Link} to="/">
              메인화면으로 돌아가기
            </Button>
          </Col>
        </Row>

        <br />
        <br />
        <br />
      </Container>
    </Layout>
  );
}
