import React from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import ability from "../../authorization/ability";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;

const SidebarContent = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  let { navStyle, themeType, pathname } = useSelector(
    ({ settings }) => settings
  );

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    // <Sider collapsible collapsed={collapsed} onCollapse={() => {setCollapsed(!collapsed)}}>
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            <MenuItemGroup
              key="main"
              className="gx-menu-group"
              title={<IntlMessages id="sidebar.main" />}
            >
              <SubMenu
                key="question"
                className={getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    {" "}
                    <i className="icon icon-map-km-layer" />
                    <span>
                      <IntlMessages id="sidebar.question" />
                    </span>
                  </span>
                }
              >
                <Menu.Item key="main/question/interview">
                  <Link to="/main/question/interview">
                    <i className="icon icon-testimonial" />
                    <span>
                      <IntlMessages id="sidebar.question.interview" />
                    </span>
                  </Link>
                </Menu.Item>

                {ability.can("view", "Import") && (
                  <Menu.Item key="main/question/import">
                    <Link to="/main/question/import">
                      <i className="icon icon-crypto" />
                      <span>
                        <IntlMessages id="sidebar.question.import" />
                      </span>
                    </Link>
                  </Menu.Item>
                )}
              </SubMenu>
              {ability.can("view", "User") && (
                <Menu.Item key="main/user">
                  <Link to="/main/user">
                    <i className="icon icon-user" />
                    <span>
                      <IntlMessages id="sidebar.user" />
                    </span>
                  </Link>
                </Menu.Item>
              )}
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
    // </Sider>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
