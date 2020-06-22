import React, { useEffect, useCallback } from "react";
import { Layout, Loading, CorrectPose } from "../components";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import "./page.css";
import move from "../components/icon/move.gif";

export default function ForwardNeck() {
  return (
    <Layout>
      <CorrectPose />
    </Layout>
  );
}
