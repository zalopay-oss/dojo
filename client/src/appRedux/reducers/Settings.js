import {
  SWITCH_LANGUAGE,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH,
} from "constants/ActionTypes";
import {
  LAYOUT_TYPE,
  LAYOUT_TYPE_FULL,
  NAV_STYLE,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  NAV_STYLE_DRAWER,
  THEME_COLOR,
  THEME_TYPE,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";

const initialSettings = {
  navCollapsed: true,
  navStyle: NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  layoutType: LAYOUT_TYPE_FULL,
  themeType: THEME_TYPE_LITE,
  themeColor: THEME_COLOR,

  pathname: "/",
  width: window.innerWidth,
  isDirectionRTL: false,
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "us",
  },
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      return {
        ...state,
        pathname: action.payload.location.pathname,
        navCollapsed: false,
      };
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.navCollapsed,
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case THEME_TYPE:
      return {
        ...state,
        themeType: action.themeType,
      };
    case THEME_COLOR:
      console.log("yes", action.themeColor);
      return {
        ...state,
        themeColor: action.themeColor,
      };

    case NAV_STYLE:
      return {
        ...state,
        navStyle: action.navStyle,
      };
    case LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.layoutType,
      };

    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};

export default settings;
