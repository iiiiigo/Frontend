import React, { useState } from "react";
import { Link } from "react-router-dom";
import menu_bar from "./icon/menubar_hamburger.png";
import close_bar from "./icon/menubar_close.png";
import logo from "./icon/igo.JPG";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

import "./component.css";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleClickMenu = () => {
    const x =
      document.getElementById("menu-img") ||
      document.getElementById("close-img");
    const y =
      document.getElementById("open-button") ||
      document.getElementById("close-button");
    if (x.src === menu_bar) {
      x.src = close_bar;
      x.id = "close-img";
      y.id = "close-button";
    } else {
      x.src = menu_bar;
      x.id = "menu-img";
      y.id = "open-button";
    }
  };
  return (
    <span>
      <Navbar color="" light expand="md">
        <NavbarBrand tag={Link} to="/">
          Posture Correcting Web App
          <img src={logo} alt="menubar" id="menu-img" width="100" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/forwardNeck">
                내 자세 진단하기
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/videoList">
                동영상 카테고리
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>

      {/* <button type="button" id="open-button" onClick={handleClickMenu}>
        <img src={menu_bar} alt="menubar" id="menu-img" />
      </button>
      <div id="link-div">
        <Link to={{ pathname: "/" }} id="link">
          <div id="naver_logo">
            <strong>다람쥐 컴퍼니</strong>
          </div>
         
        </Link>
      </div>
      <ul id="menu-bar">
        <li>
          <Link to={{ pathname: "/" }}>직원 리스트</Link>
        </li>
        <li>
          <Link to={{ pathname: "/create" }}>신규 등록하기</Link>
        </li>
      </ul> */}
      <body>{children}</body>
      <footer>
        <p>Copyright © Igo Corp. All Rights Reserved.</p>
        <p> Team I go </p>
        <p>
          Address : 서울특별시 동작구 상도동 상도로 369 숭실대학교 정보과학관
        </p>
      </footer>
    </span>
  );
}
