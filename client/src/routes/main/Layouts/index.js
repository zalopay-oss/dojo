import React from "react";
import { Col, Row } from "antd";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
} from "../../../constants/ThemeSetting";
import { connect } from "react-redux";
import { onNavStyleChange } from "../../../appRedux/actions/Setting";

const Layouts = ({ navStyle, onNavStyleChange }) => {
  return (
    <Row className="gx-layouts-view">
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_FIXED)}
          className={`gx-pointer ${navStyle === NAV_STYLE_FIXED && "active"}`}
        >
          <img
            src={require("assets/images/layouts/fixed-layout.png")}
            alt="fixed"
          />
        </span>
      </Col>
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_MINI_SIDEBAR)}
          className={`gx-pointer ${
            navStyle === NAV_STYLE_MINI_SIDEBAR && "active"
          }`}
        >
          <img
            src={require("assets/images/layouts/minimal-with-header.png")}
            alt="mini sidebar"
          />
        </span>
      </Col>
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_DRAWER)}
          className={`gx-pointer ${navStyle === NAV_STYLE_DRAWER && "active"}`}
        >
          <img
            src={require("assets/images/layouts/hidden-drawer.png")}
            alt="drawer nav"
          />
        </span>
      </Col>
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
          className={`gx-pointer ${
            navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && "active"
          }`}
        >
          <img
            src={require("assets/images/layouts/no-header-mini-sidebar.png")}
            alt="no hader mini sidebar"
          />
        </span>
      </Col>
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR)}
          className={`gx-pointer ${
            navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR && "active"
          }`}
        >
          <img
            src={require("assets/images/layouts/default-no-header.png")}
            alt="vertical no header"
          />
        </span>
      </Col>
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_DEFAULT_HORIZONTAL)}
          className={`gx-pointer ${
            navStyle === NAV_STYLE_DEFAULT_HORIZONTAL && "active"
          }`}
        >
          <img
            src={require("assets/images/layouts/dark-menu.png")}
            alt="default horizontal"
          />
        </span>
      </Col>
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_DARK_HORIZONTAL)}
          className={`gx-pointer ${
            navStyle === NAV_STYLE_DARK_HORIZONTAL && "active"
          }`}
        >
          <img
            src={require("assets/images/layouts/detail-menu.png")}
            alt="dark horizontal"
          />
        </span>
      </Col>
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_INSIDE_HEADER_HORIZONTAL)}
          className={`gx-pointer ${
            navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL && "active"
          }`}
        >
          <img
            src={require("assets/images/layouts/menu-with-header.png")}
            alt="inside header horizontal"
          />
        </span>
      </Col>
      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_BELOW_HEADER)}
          className={`gx-pointer ${
            navStyle === NAV_STYLE_BELOW_HEADER && "active"
          }`}
        >
          <img
            src={require("assets/images/layouts/bottom-menu.png")}
            alt="below header"
          />
        </span>
      </Col>

      <Col xl={6} lg={8} md={12} sm={12} xs={12}>
        <span
          onClick={() => onNavStyleChange(NAV_STYLE_ABOVE_HEADER)}
          className={`gx-pointer ${
            navStyle === NAV_STYLE_ABOVE_HEADER && "active"
          }`}
        >
          <img
            src={require("assets/images/layouts/top-menu.png")}
            alt="top to header"
          />
        </span>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ settings }) => {
  const { navStyle } = settings;
  return { navStyle };
};
export default connect(mapStateToProps, { onNavStyleChange })(Layouts);
