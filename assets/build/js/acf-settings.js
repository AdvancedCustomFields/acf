/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/SettingsApp.tsx"
/*!*****************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/SettingsApp.tsx ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mountSettingsApp: () => (/* binding */ mountSettingsApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "react-dom/client");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_SettingsPage_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SettingsPage.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPage.tsx");
/* harmony import */ var _components_CustomTabPage_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/CustomTabPage.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/CustomTabPage.tsx");
/* harmony import */ var _settingsTabRegistry_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settingsTabRegistry.ts */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/settingsTabRegistry.ts");
/* harmony import */ var _wpengine_bds_react_fonts_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wpengine/bds-react/fonts.css */ "./node_modules/@wpengine/bds-react/dist/fonts/fonts.css");
/* harmony import */ var _wpengine_bds_react_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wpengine/bds-react/styles.css */ "./node_modules/@wpengine/bds-react/dist/tokens/index.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);






// Base Design System fonts, tokens and type styles. Component CSS is imported by each component.



/**
 * A built-in tab that renders its own page. PRO passes its License and Updates pages, so the free bundle doesn't
 * include them. Each page types its own config, so it's passed through untyped.
 */

const SettingsApp = ({
  initialConfig,
  tabPages
}) => {
  const [config, setConfig] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialConfig);
  const configRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(config);
  const isSwitchingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  // Incremented on every tab switch so a slow response for an earlier switch can't overwrite a later one.
  const switchRequestRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const noticesRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  const hasUnsavedChangesRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const onUnsavedChangesChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(hasUnsavedChanges => {
    hasUnsavedChangesRef.current = hasUnsavedChanges;
  }, []);

  // Returns true if there are no unsaved changes, or the user confirms discarding them.
  const confirmDiscardChanges = () => {
    if (!hasUnsavedChangesRef.current) {
      return true;
    }
    const strings = configRef.current.strings;
    // A native confirm matches the browser's own beforeunload prompt for a full page load.
    // eslint-disable-next-line no-alert
    if (!window.confirm(strings?.unsavedChanges ?? '')) {
      return false;
    }
    // Clear the flag so the beforeunload guard doesn't prompt again if we fall back to a full page load.
    hasUnsavedChangesRef.current = false;
    return true;
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleBeforeUnload = e => {
      if (hasUnsavedChangesRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // WP core prints admin notices above our app (no h1/h2 exists for core's own JS to reposition them after). Detach them once so we can re-insert them above the page content instead.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const notices = document.querySelectorAll('#wpbody-content > div.notice, #wpbody-content > div.updated, #wpbody-content > div.error, #wpbody-content > .update-nag');
    noticesRef.current = Array.from(notices);
    noticesRef.current.forEach(notice => notice.remove());
  }, []);

  // Each tab mounts a fresh layout, so move the detached notices into its notices slot every time.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const slot = document.querySelector('#acf-settings-app [data-acf-settings-notices]');
    if (!slot) {
      return;
    }
    noticesRef.current.forEach(notice => {
      if (notice.parentNode !== slot) {
        slot.appendChild(notice);
      }
    });
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    configRef.current = config;
  }, [config]);

  // The server renders the loaded tab's label at the start of the title, so swap it for the active tab's after an in-page switch.
  const titleLabelRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(config.tabs.find(t => t.key === config.activeTab)?.label ?? '');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const label = config.tabs.find(t => t.key === config.activeTab)?.label;
    if (!label || label === titleLabelRef.current) {
      return;
    }
    if (titleLabelRef.current && document.title.startsWith(titleLabelRef.current)) {
      document.title = label + document.title.slice(titleLabelRef.current.length);
      titleLabelRef.current = label;
    }
  }, [config.activeTab, config.tabs]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handlePopState = async () => {
      const currentConfig = configRef.current;
      const currentParams = new URLSearchParams(window.location.search);
      const targetPage = currentParams.get('page') ?? '';
      // Match on the page slug in each tab's URL so the slug format is only defined in PHP.
      const targetTab = currentConfig.tabs.find(t => new URL(t.url, window.location.href).searchParams.get('page') === targetPage);
      if (!targetTab) {
        return;
      }

      // Navigating back to the rendered tab (e.g. Back then Forward mid-switch) must still cancel a pending switch.
      if (targetTab.key === currentConfig.activeTab) {
        ++switchRequestRef.current;
        return;
      }

      // The browser has already changed the URL, so put it back if the user stays.
      if (!confirmDiscardChanges()) {
        const currentTab = currentConfig.tabs.find(t => t.key === currentConfig.activeTab);
        if (currentTab) {
          window.history.pushState({
            acfTab: currentTab.key
          }, '', currentTab.url);
        }
        return;
      }
      isSwitchingRef.current = true;
      const requestId = ++switchRequestRef.current;
      try {
        const res = await fetch(currentConfig.ajaxUrl, {
          method: 'POST',
          body: new URLSearchParams({
            action: 'acf_settings_tab_data',
            nonce: currentConfig.nonce,
            tab: targetTab.key
          })
        });
        const json = await res.json();
        if (requestId !== switchRequestRef.current) {
          return;
        }
        if (json.success && json.data) {
          setConfig(prev => ({
            ...prev,
            ...json.data,
            activeTab: targetTab.key
          }));
          window.scrollTo(0, 0);
          return;
        }
      } catch {
        if (requestId !== switchRequestRef.current) {
          return;
        }
        // fall through to reload
      } finally {
        isSwitchingRef.current = false;
      }
      window.location.reload();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const onTabSwitch = async tabKey => {
    if (!confirmDiscardChanges()) {
      return;
    }
    const requestId = ++switchRequestRef.current;
    try {
      const res = await fetch(config.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'acf_settings_tab_data',
          nonce: config.nonce,
          tab: tabKey
        })
      });
      const json = await res.json();
      // A later tab switch has started, so let that one win.
      if (requestId !== switchRequestRef.current) {
        return;
      }
      if (json.success && json.data) {
        setConfig(prev => ({
          ...prev,
          ...json.data,
          activeTab: tabKey
        }));
        const targetTab = config.tabs.find(t => t.key === tabKey);
        if (targetTab) {
          window.history.pushState({
            acfTab: tabKey
          }, '', targetTab.url);
        }
        window.scrollTo(0, 0);
        return;
      }
    } catch {
      if (requestId !== switchRequestRef.current) {
        return;
      }
      // fall through to page navigation
    }
    const targetTab = config.tabs.find(t => t.key === tabKey);
    if (targetTab) {
      window.location.href = targetTab.url;
    }
  };
  const onTabCountChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((tabKey, count) => {
    setConfig(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab => tab.key === tabKey ? {
        ...tab,
        count
      } : tab)
    }));
  }, []);

  // Re-render when a tab script registers, in case it loads after the app has mounted.
  const [, onTabRegistered] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(count => count + 1, 0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => (0,_settingsTabRegistry_ts__WEBPACK_IMPORTED_MODULE_4__.subscribe)(onTabRegistered), []);
  const shared = {
    onTabSwitch
  };

  // Tabs registered with acf.settingsPage.registerTab() render their own UI inside ACF's layout.
  const customTab = (0,_settingsTabRegistry_ts__WEBPACK_IMPORTED_MODULE_4__.getTab)(config.activeTab);
  if (customTab) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_CustomTabPage_tsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      tab: customTab,
      config: config,
      ...shared
    }, config.activeTab);
  }

  // Own properties only, so a tab keyed e.g. "constructor" doesn't pick up Object.prototype members.
  const TabPage = Object.prototype.hasOwnProperty.call(tabPages, config.activeTab) ? tabPages[config.activeTab] : undefined;
  if (TabPage) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(TabPage, {
      config: config,
      onTabCountChange: onTabCountChange,
      ...shared
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_SettingsPage_tsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    config: config,
    onUnsavedChangesChange: onUnsavedChangesChange,
    ...shared
  }, config.activeTab);
};

/**
 * Renders the settings app into #acf-settings-app once the page has loaded.
 *
 * @param tabPages Built-in tabs that render their own page, keyed by tab.
 */
function mountSettingsApp(tabPages = {}) {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('acf-settings-app');
    if (container) {
      (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(SettingsApp, {
        initialConfig: acfSettingsPage,
        tabPages: tabPages
      }));
    }
  });
}

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/CustomTabPage.tsx"
/*!******************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/CustomTabPage.tsx ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SettingsPageLayout_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingsPageLayout.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPageLayout.tsx");
/* harmony import */ var _SettingsTabBar_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SettingsTabBar.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsTabBar.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Renders a tab registered with acf.settingsPage.registerTab() inside ACF's page layout and tab bar.
 *
 * @param root0             Props.
 * @param root0.tab         The registered tab definition.
 * @param root0.config      The settings page config for this tab.
 * @param root0.onTabSwitch Called when another tab is selected.
 */
const CustomTabPage = ({
  tab,
  config,
  onTabSwitch
}) => {
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  // Read the latest config when mounting without remounting on every config change.
  const configRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(config);
  configRef.current = config;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    try {
      tab.mount(container, configRef.current);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return () => {
      try {
        tab.unmount?.(container);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      container.replaceChildren();
    };
  }, [tab]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_SettingsPageLayout_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: config.strings.settings,
    tabs: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_SettingsTabBar_tsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      activeTab: config.activeTab,
      tabs: config.tabs,
      ariaLabel: config.strings.settingsTabs,
      onTabSwitch: onTabSwitch
    }),
    strings: config.strings,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      ref: containerRef,
      "data-acf-settings-tab": config.activeTab
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomTabPage);

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/ProBadge.tsx"
/*!*************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/ProBadge.tsx ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


/**
 * ACF's "PRO" pill, as drawn in the ACF Settings – Base Figma file. An ACF brand asset, not a BDS component.
 * @param root0
 * @param root0.label
 */

const ProBadge = ({
  label
}) => {
  const gradientId = `acf-pro-badge-${(0,react__WEBPACK_IMPORTED_MODULE_0__.useId)()}`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    role: "img",
    "aria-label": label,
    width: "38",
    height: "22",
    viewBox: "0 0 38 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
      width: "38",
      height: "22",
      rx: "11",
      fill: `url(#${gradientId})`
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "white",
      d: "M26.1674 15.2412C25.4341 15.2412 24.7776 15.073 24.1977 14.7367C23.6179 14.4003 23.1596 13.9161 22.8229 13.2841C22.49 12.6521 22.3235 11.8926 22.3235 11.0055C22.3235 10.1148 22.49 9.35343 22.8229 8.72141C23.1596 8.0857 23.6179 7.59967 24.1977 7.26334C24.7776 6.927 25.4341 6.75883 26.1674 6.75883C26.8969 6.75883 27.5497 6.927 28.1258 7.26334C28.7056 7.59967 29.162 8.0857 29.495 8.72141C29.8317 9.35343 30 10.1148 30 11.0055C30 11.8926 29.8317 12.654 29.495 13.2897C29.162 13.9217 28.7056 14.4059 28.1258 14.7422C27.5497 15.0748 26.8969 15.2412 26.1674 15.2412ZM26.1674 13.9161C26.62 13.9161 27.0203 13.8053 27.3682 13.5835C27.7199 13.3581 27.9948 13.0291 28.1931 12.5967C28.3914 12.1605 28.4905 11.6302 28.4905 11.0055C28.4905 10.3735 28.3914 9.8413 28.1931 9.40887C27.9948 8.97274 27.7199 8.6438 27.3682 8.42204C27.0203 8.19658 26.62 8.08385 26.1674 8.08385C25.711 8.08385 25.3069 8.19658 24.9553 8.42204C24.6036 8.64749 24.3268 8.97828 24.1248 9.41441C23.9265 9.84685 23.8274 10.3772 23.8274 11.0055C23.8274 11.6302 23.9265 12.1587 24.1248 12.5911C24.3268 13.0236 24.6036 13.3525 24.9553 13.578C25.3069 13.8034 25.711 13.9161 26.1674 13.9161Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "white",
      d: "M15.5205 15.1303C15.3833 15.1303 15.272 15.019 15.272 14.8817V7.11824C15.272 6.98098 15.3833 6.8697 15.5205 6.8697H18.3976C19.0373 6.8697 19.576 6.98058 20.0137 7.20235C20.4514 7.42411 20.7825 7.73457 21.0069 8.13374C21.2314 8.52921 21.3436 8.98936 21.3436 9.5142C21.3436 10.039 21.2295 10.4955 21.0013 10.8836C20.7768 11.2716 20.4439 11.571 20.0025 11.7817C19.9501 11.8067 19.8963 11.8302 19.8411 11.8522L21.4485 14.7616C21.54 14.9272 21.4202 15.1303 21.231 15.1303H20.1224C20.0312 15.1303 19.9473 15.0803 19.9039 15.0002L18.3307 12.0977H16.7702V14.8817C16.7702 15.019 16.659 15.1303 16.5217 15.1303H15.5205ZM18.1787 10.8725H16.7702V8.36009C16.7702 8.22283 16.8815 8.11156 17.0188 8.11156H18.1675C18.5491 8.11156 18.8596 8.167 19.099 8.27788C19.3422 8.38876 19.5217 8.54954 19.6377 8.76021C19.7537 8.96719 19.8117 9.21852 19.8117 9.5142C19.8117 9.80249 19.7537 10.0483 19.6377 10.2516C19.5217 10.4548 19.344 10.6101 19.1046 10.7172C18.8652 10.8207 18.5566 10.8725 18.1787 10.8725Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "white",
      d: "M8 14.8817C8 15.019 8.11127 15.1303 8.24853 15.1303H9.24974C9.38699 15.1303 9.49827 15.019 9.49827 14.8817V12.3361H11.1031C11.7466 12.3361 12.289 12.2178 12.7305 11.9813C13.1719 11.7447 13.5049 11.4213 13.7293 11.0111C13.9575 10.6008 14.0716 10.1314 14.0716 9.6029C14.0716 9.07807 13.9594 8.61052 13.7349 8.20027C13.5105 7.78631 13.1794 7.46107 12.7417 7.22452C12.304 6.98798 11.7653 6.8697 11.1256 6.8697H8.24853C8.11127 6.8697 8 6.98098 8 7.11824V14.8817ZM9.49827 11.1164H10.9067C11.2846 11.1164 11.5932 11.0517 11.8326 10.9224C12.0758 10.793 12.2535 10.6138 12.3657 10.3846C12.4817 10.1555 12.5397 9.89489 12.5397 9.6029C12.5397 9.31092 12.4817 9.0522 12.3657 8.82674C12.2535 8.60128 12.0758 8.42572 11.8326 8.30006C11.5895 8.17439 11.2771 8.11156 10.8955 8.11156H9.7468C9.60954 8.11156 9.49827 8.22283 9.49827 8.36009V11.1164Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("defs", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("radialGradient", {
        id: gradientId,
        cx: "0",
        cy: "0",
        r: "1",
        gradientUnits: "userSpaceOnUse",
        gradientTransform: "matrix(-38.0996 -21.8356 37.9004 -22.1644 38.0996 21.8356)",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("stop", {
          stopColor: "#0ECAD4"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("stop", {
          offset: "1",
          stopColor: "#7A45E5"
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProBadge);

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsField.tsx"
/*!******************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsField.tsx ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/base/Badge/Badge.js");
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/base/Switch/Switch.js");
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/base/Link/Link.js");
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/base/SelectInput/SelectInput.js");
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/base/TextInput/TextInput.js");
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/base/Tooltip/Tooltip.js");
/* harmony import */ var _wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wpengine/bds-wordpress-react */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionRow/SectionRow.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/code-xml.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/flask-conical.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/lock.mjs");
/* harmony import */ var _ProBadge_tsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ProBadge.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/ProBadge.tsx");
/* harmony import */ var _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SettingsField.module.css */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsField.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__);






/**
 * Wraps a badge in a tooltip. The focusable span is the trigger, so keyboard users can reach the tooltip too.
 * @param root0
 * @param root0.text
 * @param root0.children
 */
const WithTooltip = ({
  text,
  children
}) => {
  if (!text) {
    return children;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_5__.Tooltip, {
    content: text,
    arrow: "bottom-center",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
      className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].tooltipTrigger,
      tabIndex: 0,
      children: children
    })
  });
};
const ManagedBadge = ({
  strings
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(WithTooltip, {
  text: strings.managedViaCodeTooltip,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__.Badge, {
    size: "md",
    color: "gray",
    radius: "pill",
    iconLeading: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {}),
    children: strings.managedViaCode
  })
});
const ProFieldBadge = ({
  field,
  strings
}) => {
  const badge = field.proExpired ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__.Badge, {
    size: "md",
    color: "orange",
    radius: "pill",
    iconLeading: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {}),
    children: strings.licenseExpired
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_ProBadge_tsx__WEBPACK_IMPORTED_MODULE_11__["default"], {
    label: strings.pro
  });
  const label = field.proExpired ? strings.licenseExpired : strings.pro;
  const content = field.proUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("a", {
    className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].proLink,
    href: field.proUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": `${label} (${strings.opensInNewTab})`,
    children: badge
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
    className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].badgeWrap,
    children: badge
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(WithTooltip, {
    text: field.proTooltip,
    children: content
  });
};
const ExperimentalBadge = ({
  strings
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__.Badge, {
  size: "md",
  color: "blue",
  radius: "pill",
  iconLeading: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {}),
  children: strings.experimental
});
const Badges = ({
  field,
  strings
}) => {
  if (!field.pro && !field.managed) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
    className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].badges,
    children: [field.pro && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(ProFieldBadge, {
      field: field,
      strings: strings
    }), field.managed && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(ManagedBadge, {
      strings: strings
    })]
  });
};

// The Experimental pill sits next to the label in the row's label column.
const getLabel = (field, strings) => {
  if (!field.experimental) {
    return field.label;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
    className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].label,
    children: [field.label, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(ExperimentalBadge, {
      strings: strings
    })]
  });
};
const LearnMoreLink = ({
  url,
  label,
  strings
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
  className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].learnMore,
  href: url,
  target: "_blank",
  rel: "noopener noreferrer",
  "aria-label": `${strings.learnMoreAbout.replace('%s', label)} (${strings.opensInNewTab})`,
  iconTrailing: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {}),
  children: strings.learnMore
});

// Select and text rows show the description and link under the control.
const getHint = (field, strings) => {
  if (!field.description && !field.learnMoreUrl) {
    return undefined;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: [field.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
      className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].hintText,
      children: field.description
    }), field.learnMoreUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(LearnMoreLink, {
      url: field.learnMoreUrl,
      label: field.label,
      strings: strings
    })]
  });
};

/**
 * Renders one settings field from the `acf/settings_page/general/{section}/fields` filter as a Section row.
 * Field types map to BDS controls here, so extensions keep using the same PHP field shape.
 * @param root0
 * @param root0.field
 * @param root0.value
 * @param root0.strings
 * @param root0.onToggle
 * @param root0.onChange
 */
const SettingsField = ({
  field,
  value,
  strings,
  onToggle,
  onChange
}) => {
  const inputId = `acf-setting-${field.key}`;
  const labelId = `${inputId}-label`;
  const disabled = Boolean(field.managed || field.proLocked || field.disabled);
  const label = getLabel(field, strings);
  switch (field.type) {
    case 'toggle':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_6__.SectionRow, {
        label: label,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
          className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].setting,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].control,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_1__.Switch, {
              id: inputId,
              name: field.key,
              size: "md",
              className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].switch,
              label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
                className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].switchLabel,
                children: field.description || field.label
              }),
              checked: Boolean(value),
              disabled: disabled,
              onChange: event => onToggle(field.key, event.target.checked)
            }), field.learnMoreUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(LearnMoreLink, {
              url: field.learnMoreUrl,
              label: field.label,
              strings: strings
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Badges, {
            field: field,
            strings: strings
          })]
        })
      });
    case 'select':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_6__.SectionRow, {
        label: label,
        labelId: labelId,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
          className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].setting,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
            className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].select,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_3__.SelectInput, {
              id: inputId,
              name: field.key,
              "aria-labelledby": labelId,
              items: (field.options ?? []).map(option => ({
                value: option.value,
                label: option.label,
                disabled: option.disabled
              })),
              value: value === null || value === undefined ? null : String(value),
              onValueChange: next => {
                if (next !== null) {
                  onChange(field.key, next);
                }
              },
              disabled: disabled,
              hint: getHint(field, strings)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Badges, {
            field: field,
            strings: strings
          })]
        })
      });
    case 'text':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_6__.SectionRow, {
        label: label,
        htmlFor: inputId,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
          className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].setting,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
            className: _SettingsField_module_css__WEBPACK_IMPORTED_MODULE_12__["default"].text,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_4__.TextInput, {
              id: inputId,
              name: field.key,
              value: value === null || value === undefined ? '' : String(value),
              onChange: event => onChange(field.key, event.target.value),
              disabled: disabled,
              hint: getHint(field, strings)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Badges, {
            field: field,
            strings: strings
          })]
        })
      });
    default:
      return null;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsField);

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPage.tsx"
/*!*****************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPage.tsx ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wpengine/bds-wordpress-react */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Section/Section.js");
/* harmony import */ var _SettingsPageLayout_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SettingsPageLayout.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPageLayout.tsx");
/* harmony import */ var _SettingsTabBar_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingsTabBar.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsTabBar.tsx");
/* harmony import */ var _SettingsField_tsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SettingsField.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsField.tsx");
/* harmony import */ var _toaster_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toaster.ts */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/toaster.ts");
/* harmony import */ var _SettingsPage_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SettingsPage.module.css */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPage.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








function getInitialSettings(sections) {
  const settings = {};
  for (const section of sections) {
    for (const field of section.fields) {
      settings[field.key] = field.value ?? null;
    }
  }
  return settings;
}

/**
 * Reads a toggle value the way wp_validate_boolean() does, which is how the page reads toggle values on load.
 * A sanitize callback other than wp_validate_boolean() can return e.g. "0", which Boolean() would treat as true.
 * @param value The value from the server.
 */
function toBoolean(value) {
  if (typeof value === 'string') {
    return value !== '' && value !== '0' && value.toLowerCase() !== 'false';
  }
  return Boolean(value);
}
const SettingsPage = ({
  config,
  onTabSwitch,
  onUnsavedChangesChange
}) => {
  const {
    strings,
    tabData,
    activeTab,
    tabs,
    ajaxUrl,
    action,
    nonce
  } = config ?? {
    strings: {},
    tabData: {
      sections: []
    },
    activeTab: '',
    tabs: [],
    ajaxUrl: '',
    action: '',
    nonce: ''
  };
  const sections = Array.isArray(tabData?.sections) ? tabData.sections : [];
  const [acfSettings, setAcfSettings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => getInitialSettings(sections));
  const [isSaving, setIsSaving] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const savedSettings = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(getInitialSettings(sections));
  // Toggles auto-save, so only non-toggle fields count as unsaved changes for the Save button.
  const hasUnsavedChanges = sections.some(section => section.fields.filter(field => field.type !== 'toggle').some(field => JSON.stringify(acfSettings[field.key]) !== JSON.stringify(savedSettings.current[field.key])));
  const hasSections = sections.length > 0;
  const formId = hasSections ? 'acf-settings-form' : undefined;

  // The app owns navigation, so report unsaved changes up for it to guard tab switches and page unloads.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    onUnsavedChangesChange?.(hasUnsavedChanges);
  }, [hasUnsavedChanges, onUnsavedChangesChange]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => () => onUnsavedChangesChange?.(false), [onUnsavedChangesChange]);
  const saveToggle = async (key, checked) => {
    const response = await fetch(ajaxUrl, {
      method: 'POST',
      body: new URLSearchParams({
        action,
        nonce,
        tab: activeTab,
        acfSettings: JSON.stringify({
          [key]: checked
        })
      })
    }).catch(() => {
      _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster.create({
        type: 'negative',
        title: strings.saveErrorMessage
      });
      throw new Error(strings.saveErrorMessage);
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.success) {
      const errorMessage = typeof payload?.data === 'string' ? payload.data : strings.saveErrorMessage;
      _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster.create({
        type: 'negative',
        title: errorMessage
      });
      throw new Error(errorMessage);
    }

    // ACF's save handler sends back the value it reads after saving. Show that rather than the click: a sanitize
    // callback, or a filter on the underlying option, can leave the setting different from what was asked for.
    // A tab's own 'ajax_callback' may not send it back, so then keep the click, as the save succeeded.
    const data = payload.data;
    const confirmed = Boolean(data?.settings) && Object.prototype.hasOwnProperty.call(data?.settings, key);
    const saved = confirmed ? toBoolean(data?.settings?.[key]) : checked;
    savedSettings.current = {
      ...savedSettings.current,
      [key]: saved
    };
    setAcfSettings(prev => ({
      ...prev,
      [key]: saved
    }));
    if (saved !== checked) {
      _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster.create({
        type: 'negative',
        title: strings.settingsNotSaved ? strings.settingsNotSaved.replace('%s', key) : strings.saveErrorMessage
      });
      return;
    }
    _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster.create({
      type: 'positive',
      title: strings.saveSuccessMessage
    });
  };
  const handleSubmit = event => {
    event.preventDefault();

    // Only send fields the user has changed and can edit. Sending disabled or managed fields could overwrite their
    // stored values, and toggles are saved as soon as they're switched.
    const changedSettings = {};
    for (const section of sections) {
      for (const field of section.fields) {
        if (field.type === 'toggle' || field.disabled || field.managed || field.proLocked) {
          continue;
        }
        if (JSON.stringify(acfSettings[field.key]) !== JSON.stringify(savedSettings.current[field.key])) {
          changedSettings[field.key] = acfSettings[field.key];
        }
      }
    }
    if (Object.keys(changedSettings).length === 0) {
      return;
    }
    setIsSaving(true);
    fetch(ajaxUrl, {
      method: 'POST',
      body: new URLSearchParams({
        action,
        nonce,
        tab: activeTab,
        acfSettings: JSON.stringify(changedSettings)
      })
    }).then(async response => {
      const payload = await response.json();
      if (response.ok && payload?.success) {
        const data = payload.data;

        // Only settings the server confirmed are saved. Anything skipped, or edited while the request was
        // pending, stays unsaved, and a newer edit isn't overwritten by the older saved value.
        const confirmed = data?.settings ?? {};
        savedSettings.current = {
          ...savedSettings.current,
          ...confirmed
        };
        setAcfSettings(prev => {
          const next = {
            ...prev
          };
          for (const [key, value] of Object.entries(confirmed)) {
            if (JSON.stringify(prev[key]) === JSON.stringify(changedSettings[key])) {
              next[key] = value;
            }
          }
          return next;
        });

        // Some settings may have been skipped or failed to save while others saved. They stay unsaved, so say which.
        const notSaved = [...(data?.skipped ?? []), ...(data?.failed ?? [])];
        if (notSaved.length > 0) {
          _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster.create({
            type: 'negative',
            title: strings.settingsNotSaved ? strings.settingsNotSaved.replace('%s', notSaved.join(', ')) : strings.saveErrorMessage
          });
          return;
        }
        _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster.create({
          type: 'positive',
          title: strings.saveSuccessMessage
        });
        return;
      }
      const errorMessage = typeof payload?.data === 'string' ? payload.data : strings.saveErrorMessage;
      _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster.create({
        type: 'negative',
        title: errorMessage
      });
    }).catch(() => {
      _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster.create({
        type: 'negative',
        title: strings.saveErrorMessage
      });
    }).finally(() => {
      setIsSaving(false);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_SettingsPageLayout_tsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: strings.settings,
    tabs: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_SettingsTabBar_tsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      activeTab: activeTab,
      tabs: tabs,
      ariaLabel: strings.settingsTabs,
      onTabSwitch: onTabSwitch
    }),
    formId: formId,
    isSaving: isSaving,
    hasUnsavedChanges: hasUnsavedChanges,
    strings: strings,
    children: hasSections && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("form", {
      id: formId,
      className: _SettingsPage_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].form,
      onSubmit: handleSubmit,
      children: sections.map(section => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_1__.Section, {
        title: section.title,
        iconLeading: null,
        padding: "none",
        children: section.fields.map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_SettingsField_tsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
          field: field,
          value: acfSettings[field.key],
          strings: strings,
          onToggle: (key, checked) => {
            // saveToggle shows its own error toast; the switch stays in its saved state.
            saveToggle(key, checked).catch(() => {});
          },
          onChange: (key, value) => setAcfSettings(prev => ({
            ...prev,
            [key]: value
          }))
        }, field.key))
      }, section.title))
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsPage);

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPageLayout.tsx"
/*!***********************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPageLayout.tsx ***!
  \***********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/base/Button/Button.js");
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/engineering/Toaster/Toaster.js");
/* harmony import */ var _wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wpengine/bds-wordpress-react */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Page/Page.js");
/* harmony import */ var _wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wpengine/bds-wordpress-react */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageContent/PageContent.js");
/* harmony import */ var _wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wpengine/bds-wordpress-react */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageHeader/PageHeader.js");
/* harmony import */ var _toaster_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toaster.ts */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/toaster.ts");
/* harmony import */ var _SettingsPageLayout_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SettingsPageLayout.module.css */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPageLayout.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);





const SettingsPageLayout = ({
  title,
  tabs,
  formId,
  isSaving,
  hasUnsavedChanges,
  strings,
  children
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_2__.Page, {
    className: _SettingsPageLayout_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].page,
    headerComponent: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: _SettingsPageLayout_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].stickyHeader,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_4__.PageHeader, {
        title: title,
        actions: formId ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__.Button, {
          form: formId,
          nativeType: "submit",
          variant: "primary",
          size: "md",
          loading: isSaving,
          disabled: !hasUnsavedChanges,
          loadingAriaLabel: strings.saving,
          children: strings.save
        }) : undefined,
        navigation: tabs
      })
    }),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_3__.PageContent, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_3__.PageContent.Main, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: _SettingsPageLayout_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].notices,
          "data-acf-settings-notices": ""
        }), children]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_1__.Toaster, {
      toaster: _toaster_ts__WEBPACK_IMPORTED_MODULE_5__.toaster
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsPageLayout);

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsTabBar.tsx"
/*!*******************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsTabBar.tsx ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/base/Tabs/Tabs.js");
/* harmony import */ var _wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wpengine/bds-wordpress-react */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/TabbedNavigation/TabbedNavigation.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const SettingsTabBar = ({
  activeTab,
  tabs,
  ariaLabel,
  onTabSwitch
}) => {
  const handleClick = (event, tab) => {
    // Let modified clicks (new tab/window) behave as normal links.
    if (!onTabSwitch || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    if (tab.key !== activeTab) {
      onTabSwitch(tab.key);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wpengine_bds_wordpress_react__WEBPACK_IMPORTED_MODULE_1__.TabbedNavigation, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__.TabNav, {
      "aria-label": ariaLabel,
      appearance: "line",
      children: tabs.map(tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__.TabLink, {
        href: tab.url,
        current: tab.key === activeTab
        // TabLink renders the count in its own Badge.
        ,
        badge: tab.count ? tab.count : undefined,
        onClick: event => handleClick(event, tab),
        children: tab.label
      }, tab.key))
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsTabBar);

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/toaster.ts"
/*!***********************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/toaster.ts ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toaster: () => (/* binding */ toaster)
/* harmony export */ });
/* harmony import */ var _wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wpengine/bds-react */ "./node_modules/@wpengine/bds-react/dist/engineering/Toaster/Toaster.js");


// One toaster for the whole settings app, rendered once by SettingsPageLayout.
const toaster = (0,_wpengine_bds_react__WEBPACK_IMPORTED_MODULE_0__.createBdsToaster)({
  placement: 'bottom-end'
});

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/settingsTabRegistry.ts"
/*!************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/settingsTabRegistry.ts ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTab: () => (/* binding */ getTab),
/* harmony export */   registerTab: () => (/* binding */ registerTab),
/* harmony export */   subscribe: () => (/* binding */ subscribe)
/* harmony export */ });
/**
 * Registry for settings tabs that render their own UI inside the settings page.
 *
 * A tab registered with a 'js' URL in the 'acf/settings_page/tabs' filter has that script loaded after
 * ACF's settings app. The script calls acf.settingsPage.registerTab() with mount and unmount callbacks,
 * and ACF calls them when the tab is shown or hidden, keeping its own page header and tab bar.
 */

const tabs = new Map();
const listeners = new Set();
function registerTab(key, definition) {
  if (typeof definition?.mount !== 'function') {
    // eslint-disable-next-line no-console
    console.error(`acf.settingsPage.registerTab: the "${key}" tab needs a mount() function.`);
    return;
  }
  tabs.set(key, definition);
  listeners.forEach(listener => listener());
}
function getTab(key) {
  return tabs.get(key);
}

/**
 * Calls the listener whenever a tab is registered. Returns a function that unsubscribes.
 *
 * @param listener Called after each registration.
 */
function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Expose the registry as acf.settingsPage.registerTab() for tab scripts. ACF's own acf.js (which assigns
// window.acf) loads in the header, so extend the object rather than replacing it.
const win = window;
win.acf = win.acf || {};
win.acf.settingsPage = {
  registerTab
};

/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Badge/Badge.css"
/*!***************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Badge/Badge.css ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Button/Button.css"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Button/Button.css ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/ButtonGroup/ButtonGroup.css"
/*!***************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/ButtonGroup/ButtonGroup.css ***!
  \***************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Checkbox/Checkbox.css"
/*!*********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Checkbox/Checkbox.css ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/DropdownItem/DropdownItem.css"
/*!*****************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/DropdownItem/DropdownItem.css ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/HintText/HintText.css"
/*!*********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/HintText/HintText.css ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/InteractiveIcon/InteractiveIcon.css"
/*!***********************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/InteractiveIcon/InteractiveIcon.css ***!
  \***********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Label/Label.css"
/*!***************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Label/Label.css ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Link/Link.css"
/*!*************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Link/Link.css ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/SelectInput/SelectInput.css"
/*!***************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/SelectInput/SelectInput.css ***!
  \***************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Separator/Separator.css"
/*!***********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Separator/Separator.css ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Switch/Switch.css"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Switch/Switch.css ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Tabs/Tabs.css"
/*!*************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Tabs/Tabs.css ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/TextInput/TextInput.css"
/*!***********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/TextInput/TextInput.css ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Toast/Toast.css"
/*!***************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Toast/Toast.css ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/Tooltip/Tooltip.css"
/*!*******************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/Tooltip/Tooltip.css ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/base/menu/menu.css"
/*!*************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/base/menu/menu.css ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/assets/engineering/Toaster/Toaster.css"
/*!**************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/assets/engineering/Toaster/Toaster.css ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/fonts/fonts.css"
/*!***************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/fonts/fonts.css ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/tokens/index.css"
/*!****************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/tokens/index.css ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/Page/Page.css"
/*!****************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/Page/Page.css ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/PageContent/PageContent.css"
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/PageContent/PageContent.css ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/PageHeader/PageHeader.css"
/*!****************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/PageHeader/PageHeader.css ***!
  \****************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/Section/Section.css"
/*!**********************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/Section/Section.css ***!
  \**********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/SectionHeader/SectionHeader.css"
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/SectionHeader/SectionHeader.css ***!
  \**********************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/SectionRow/SectionRow.css"
/*!****************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/SectionRow/SectionRow.css ***!
  \****************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/TabbedNavigation/TabbedNavigation.css"
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/TabbedNavigation/TabbedNavigation.css ***!
  \****************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsField.module.css"
/*!*************************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsField.module.css ***!
  \*************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"switch":"switch--FUNIT","switchLabel":"switchLabel--pEW42","label":"label--uwLUg","setting":"setting--b1XQm","control":"control--lh3zZ","learnMore":"learnMore--SDhAs","hintText":"hintText--AWfpg","select":"select--XOTj8","text":"text--IKP_H","badges":"badges--cJk7t","badgeWrap":"badgeWrap--JY19r","tooltipTrigger":"tooltipTrigger--J38cM","proLink":"proLink--udMCT"});

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPage.module.css"
/*!************************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPage.module.css ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"form":"form--THoPv"});

/***/ },

/***/ "./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPageLayout.module.css"
/*!******************************************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/components/SettingsPageLayout.module.css ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"page":"page--ytZbF","stickyHeader":"stickyHeader--bbfgv","notices":"notices--MUHN4"});

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = React;

/***/ },

/***/ "react-dom/client"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = ReactDOM;

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = ReactJSXRuntime;

/***/ },

/***/ "./node_modules/@ark-ui/react/dist/_virtual/_rolldown/runtime.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/_virtual/_rolldown/runtime.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __exportAll: () => (/* binding */ __exportAll)
/* harmony export */ });
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-content.js"
/*!***************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-content.js ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleContent: () => (/* binding */ CollapsibleContent)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _collapsible_gate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapsible-gate.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-gate.js");
/* harmony import */ var _use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-collapsible-context.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";






//#region src/components/collapsible/collapsible-content.tsx
var CollapsibleContent = (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((props, ref) => {
	const collapsible = (0,_use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_2__.useCollapsibleContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(collapsible.getContentProps(), collapsible.hideMode === "activity" ? { hidden: false } : {}, props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_collapsible_gate_js__WEBPACK_IMPORTED_MODULE_1__.CollapsibleGate, {
		collapsible,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
			...mergedProps,
			ref
		})
	});
});
CollapsibleContent.displayName = "CollapsibleContent";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-context.js"
/*!***************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-context.js ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleContext: () => (/* binding */ CollapsibleContext)
/* harmony export */ });
/* harmony import */ var _use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-collapsible-context.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js");
"use client";

//#region src/components/collapsible/collapsible-context.tsx
var CollapsibleContext = (props) => props.children((0,_use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_0__.useCollapsibleContext)());
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-gate.js"
/*!************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-gate.js ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleGate: () => (/* binding */ CollapsibleGate)
/* harmony export */ });
/* harmony import */ var _utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/react-activity.js */ "./node_modules/@ark-ui/react/dist/utils/react-activity.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";


//#region src/components/collapsible/collapsible-gate.tsx
var CollapsibleGate = (props) => {
	const { collapsible, children } = props;
	if (collapsible.isUnmounted) return null;
	if (collapsible.hideMode === "activity" && _utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__.Activity) return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__.Activity, {
		mode: collapsible.visible ? "visible" : "hidden",
		children
	});
	return children;
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-indicator.js"
/*!*****************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-indicator.js ***!
  \*****************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleIndicator: () => (/* binding */ CollapsibleIndicator)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-collapsible-context.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/collapsible/collapsible-indicator.tsx
var CollapsibleIndicator = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const collapsible = (0,_use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_1__.useCollapsibleContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(collapsible.getIndicatorProps(), props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
		...mergedProps,
		ref
	});
});
CollapsibleIndicator.displayName = "CollapsibleIndicator";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-root-provider.js"
/*!*********************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-root-provider.js ***!
  \*********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleRootProvider: () => (/* binding */ CollapsibleRootProvider)
/* harmony export */ });
/* harmony import */ var _utils_create_split_props_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-split-props.js */ "./node_modules/@ark-ui/react/dist/utils/create-split-props.js");
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-collapsible-context.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";






//#region src/components/collapsible/collapsible-root-provider.tsx
var splitRootProviderProps = (0,_utils_create_split_props_js__WEBPACK_IMPORTED_MODULE_0__.createSplitProps)();
var CollapsibleRootProvider = (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((props, ref) => {
	const [{ value: collapsible }, localProps] = splitRootProviderProps(props, ["value"]);
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(collapsible.getRootProps(), localProps);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_2__.CollapsibleProvider, {
		value: collapsible,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_1__.ark.div, {
			...mergedProps,
			ref
		})
	});
});
CollapsibleRootProvider.displayName = "CollapsibleRootProvider";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-root.js"
/*!************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-root.js ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleRoot: () => (/* binding */ CollapsibleRoot)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-collapsible-context.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js");
/* harmony import */ var _split_collapsible_props_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./split-collapsible-props.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/split-collapsible-props.js");
/* harmony import */ var _use_collapsible_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-collapsible.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";







//#region src/components/collapsible/collapsible-root.tsx
var CollapsibleRoot = (0,react__WEBPACK_IMPORTED_MODULE_4__.forwardRef)((props, ref) => {
	const [useCollapsibleProps, localProps] = (0,_split_collapsible_props_js__WEBPACK_IMPORTED_MODULE_2__.splitCollapsibleProps)(props);
	const collapsible = (0,_use_collapsible_js__WEBPACK_IMPORTED_MODULE_3__.useCollapsible)(useCollapsibleProps);
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_5__.mergeProps)(collapsible.getRootProps(), localProps);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_1__.CollapsibleProvider, {
		value: collapsible,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
			...mergedProps,
			ref
		})
	});
});
CollapsibleRoot.displayName = "CollapsibleRoot";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-trigger.js"
/*!***************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-trigger.js ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleTrigger: () => (/* binding */ CollapsibleTrigger)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-collapsible-context.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/collapsible/collapsible-trigger.tsx
var CollapsibleTrigger = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const collapsible = (0,_use_collapsible_context_js__WEBPACK_IMPORTED_MODULE_1__.useCollapsibleContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(collapsible.getTriggerProps(), props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.button, {
		...mergedProps,
		ref
	});
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/collapsible.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Content: () => (/* reexport safe */ _collapsible_content_js__WEBPACK_IMPORTED_MODULE_1__.CollapsibleContent),
/* harmony export */   Context: () => (/* reexport safe */ _collapsible_context_js__WEBPACK_IMPORTED_MODULE_2__.CollapsibleContext),
/* harmony export */   Indicator: () => (/* reexport safe */ _collapsible_indicator_js__WEBPACK_IMPORTED_MODULE_3__.CollapsibleIndicator),
/* harmony export */   Root: () => (/* reexport safe */ _collapsible_root_js__WEBPACK_IMPORTED_MODULE_4__.CollapsibleRoot),
/* harmony export */   RootProvider: () => (/* reexport safe */ _collapsible_root_provider_js__WEBPACK_IMPORTED_MODULE_5__.CollapsibleRootProvider),
/* harmony export */   Trigger: () => (/* reexport safe */ _collapsible_trigger_js__WEBPACK_IMPORTED_MODULE_6__.CollapsibleTrigger),
/* harmony export */   collapsible_exports: () => (/* binding */ collapsible_exports)
/* harmony export */ });
/* harmony import */ var _virtual_rolldown_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_virtual/_rolldown/runtime.js */ "./node_modules/@ark-ui/react/dist/_virtual/_rolldown/runtime.js");
/* harmony import */ var _collapsible_content_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapsible-content.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-content.js");
/* harmony import */ var _collapsible_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collapsible-context.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-context.js");
/* harmony import */ var _collapsible_indicator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collapsible-indicator.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-indicator.js");
/* harmony import */ var _collapsible_root_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./collapsible-root.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-root.js");
/* harmony import */ var _collapsible_root_provider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./collapsible-root-provider.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-root-provider.js");
/* harmony import */ var _collapsible_trigger_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./collapsible-trigger.js */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible-trigger.js");







//#region src/components/collapsible/collapsible.ts
var collapsible_exports = /* @__PURE__ */ (0,_virtual_rolldown_runtime_js__WEBPACK_IMPORTED_MODULE_0__.__exportAll)({
	Content: () => _collapsible_content_js__WEBPACK_IMPORTED_MODULE_1__.CollapsibleContent,
	Context: () => _collapsible_context_js__WEBPACK_IMPORTED_MODULE_2__.CollapsibleContext,
	Indicator: () => _collapsible_indicator_js__WEBPACK_IMPORTED_MODULE_3__.CollapsibleIndicator,
	Root: () => _collapsible_root_js__WEBPACK_IMPORTED_MODULE_4__.CollapsibleRoot,
	RootProvider: () => _collapsible_root_provider_js__WEBPACK_IMPORTED_MODULE_5__.CollapsibleRootProvider,
	Trigger: () => _collapsible_trigger_js__WEBPACK_IMPORTED_MODULE_6__.CollapsibleTrigger
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/split-collapsible-props.js"
/*!*******************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/split-collapsible-props.js ***!
  \*******************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   splitCollapsibleProps: () => (/* binding */ splitCollapsibleProps)
/* harmony export */ });
/* harmony import */ var _utils_create_split_props_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-split-props.js */ "./node_modules/@ark-ui/react/dist/utils/create-split-props.js");
"use client";

//#region src/components/collapsible/split-collapsible-props.ts
var splitCollapsibleProps = (props) => (0,_utils_create_split_props_js__WEBPACK_IMPORTED_MODULE_0__.createSplitProps)()(props, [
	"collapsedHeight",
	"collapsedWidth",
	"defaultOpen",
	"disabled",
	"hideMode",
	"id",
	"ids",
	"lazyMount",
	"onExitComplete",
	"onOpenChange",
	"open",
	"unmountOnExit"
]);
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js"
/*!*******************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js ***!
  \*******************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleProvider: () => (/* binding */ CollapsibleProvider),
/* harmony export */   useCollapsibleContext: () => (/* binding */ useCollapsibleContext)
/* harmony export */ });
/* harmony import */ var _utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-context.js */ "./node_modules/@ark-ui/react/dist/utils/create-context.js");
"use client";

//#region src/components/collapsible/use-collapsible-context.ts
var [CollapsibleProvider, useCollapsibleContext] = (0,_utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__.createContext)({
	name: "CollapsibleContext",
	hookName: "useCollapsibleContext",
	providerName: "<CollapsibleProvider />"
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible.js"
/*!***********************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible.js ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCollapsible: () => (/* binding */ useCollapsible)
/* harmony export */ });
/* harmony import */ var _utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/react-activity.js */ "./node_modules/@ark-ui/react/dist/utils/react-activity.js");
/* harmony import */ var _providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/environment/use-environment-context.js */ "./node_modules/@ark-ui/react/dist/providers/environment/use-environment-context.js");
/* harmony import */ var _providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../providers/locale/use-locale-context.js */ "./node_modules/@ark-ui/react/dist/providers/locale/use-locale-context.js");
/* harmony import */ var _zag_js_collapsible__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/collapsible */ "./node_modules/@zag-js/collapsible/dist/collapsible.connect.mjs");
/* harmony import */ var _zag_js_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/collapsible */ "./node_modules/@zag-js/collapsible/dist/collapsible.machine.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/machine.mjs");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/normalize-props.mjs");
"use client";






//#region src/components/collapsible/use-collapsible.ts
var useCollapsible = (props = {}) => {
	const { lazyMount, unmountOnExit, hideMode = "display-none", ...collapsibleProps } = props;
	const id = (0,react__WEBPACK_IMPORTED_MODULE_5__.useId)();
	const wasVisible = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(false);
	const { dir } = (0,_providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_2__.useLocaleContext)();
	const { getRootNode } = (0,_providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_1__.useEnvironmentContext)();
	const machineProps = {
		id,
		dir,
		getRootNode,
		...collapsibleProps
	};
	const service = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_6__.useMachine)(_zag_js_collapsible__WEBPACK_IMPORTED_MODULE_4__.machine, machineProps);
	const api = _zag_js_collapsible__WEBPACK_IMPORTED_MODULE_3__.connect(service, _zag_js_react__WEBPACK_IMPORTED_MODULE_7__.normalizeProps);
	if (api.visible) wasVisible.current = true;
	const isUnmounted = !api.visible && !wasVisible.current && lazyMount || unmountOnExit && !api.visible && wasVisible.current;
	const resolvedHideMode = hideMode === "activity" && _utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__.supportsActivity ? "activity" : "display-none";
	return {
		...api,
		isUnmounted,
		hideMode: resolvedHideMode
	};
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/collection/list-collection.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/collection/list-collection.js ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createListCollection: () => (/* binding */ createListCollection)
/* harmony export */ });
/* harmony import */ var _zag_js_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/collection */ "./node_modules/@zag-js/collection/dist/list-collection.mjs");
"use client";

//#region src/components/collection/list-collection.ts
var createListCollection = (options) => new _zag_js_collection__WEBPACK_IMPORTED_MODULE_0__.ListCollection(options);
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/factory.js"
/*!***************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/factory.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ark: () => (/* binding */ ark),
/* harmony export */   jsxFactory: () => (/* binding */ jsxFactory)
/* harmony export */ });
/* harmony import */ var _utils_compose_refs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/compose-refs.js */ "./node_modules/@ark-ui/react/dist/utils/compose-refs.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/merge-props.mjs");



//#region src/components/factory.ts
function getRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
function isLazyElement(children) {
	return typeof children === "object" && children !== null && "$$typeof" in children && children.$$typeof === REACT_LAZY_TYPE;
}
function getAsChild(children) {
	if ((0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(children)) return children;
	if (isLazyElement(children)) return react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(children).find(react__WEBPACK_IMPORTED_MODULE_1__.isValidElement);
}
var withAsChild = (Component) => {
	const Comp = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, ref) => {
		const { asChild, children, ...restProps } = props;
		const onlyChild = asChild ? getAsChild(children) : void 0;
		const childRef = onlyChild ? getRef(onlyChild) : void 0;
		const composedRef = (0,_utils_compose_refs_js__WEBPACK_IMPORTED_MODULE_0__.useComposedRefs)(ref, childRef);
		if (!asChild) return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Component, {
			...restProps,
			ref
		}, children);
		if (!onlyChild) return null;
		return (0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(onlyChild, {
			...(0,_zag_js_core__WEBPACK_IMPORTED_MODULE_2__.mergeProps)(restProps, onlyChild.props),
			ref: ref ? composedRef : childRef
		});
	}));
	Comp.displayName = Component.displayName || Component.name;
	return Comp;
};
var jsxFactory = () => {
	const cache = /* @__PURE__ */ new Map();
	return new Proxy(withAsChild, {
		apply(_target, _thisArg, argArray) {
			return withAsChild(argArray[0]);
		},
		get(_, element) {
			const asElement = element;
			if (!cache.has(asElement)) cache.set(asElement, withAsChild(asElement));
			return cache.get(asElement);
		}
	});
};
var ark = jsxFactory();
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/field/use-field-context.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/field/use-field-context.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldProvider: () => (/* binding */ FieldProvider),
/* harmony export */   useFieldContext: () => (/* binding */ useFieldContext)
/* harmony export */ });
/* harmony import */ var _utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-context.js */ "./node_modules/@ark-ui/react/dist/utils/create-context.js");
"use client";

//#region src/components/field/use-field-context.ts
var [FieldProvider, useFieldContext] = (0,_utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__.createContext)({
	name: "FieldContext",
	hookName: "useFieldContext",
	providerName: "<FieldProvider />",
	strict: false
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/portal/portal.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/portal/portal.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Portal: () => (/* binding */ Portal)
/* harmony export */ });
/* harmony import */ var _providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../providers/environment/use-environment-context.js */ "./node_modules/@ark-ui/react/dist/providers/environment/use-environment-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "react-dom/client");
"use client";





//#region src/components/portal/portal.tsx
var Portal = (props) => {
	const { children, disabled } = props;
	const [container, setContainer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.container?.current);
	const isServer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore)(subscribe, () => false, () => true);
	const { getRootNode } = (0,_providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_0__.useEnvironmentContext)();
	(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
		setContainer(() => props.container?.current);
	}, [props.container]);
	if (isServer || disabled) return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, { children });
	const mountNode = container ?? getPortalNode(getRootNode);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, { children: react__WEBPACK_IMPORTED_MODULE_1__.Children.map(children, (child) => (0,react_dom__WEBPACK_IMPORTED_MODULE_4__.createPortal)(child, mountNode)) });
};
var getPortalNode = (cb) => {
	const node = cb?.();
	const rootNode = node.getRootNode();
	if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.isShadowRoot)(rootNode)) return rootNode;
	return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.getDocument)(node).body;
};
var subscribe = () => () => {};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/presence/presence-gate.js"
/*!******************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/presence/presence-gate.js ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PresenceGate: () => (/* binding */ PresenceGate)
/* harmony export */ });
/* harmony import */ var _utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/react-activity.js */ "./node_modules/@ark-ui/react/dist/utils/react-activity.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";


//#region src/components/presence/presence-gate.tsx
var PresenceGate = (props) => {
	const { presence, children } = props;
	if (presence.unmounted) return null;
	if (presence.hideMode === "activity" && _utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__.Activity) return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__.Activity, {
		mode: presence.present ? "visible" : "hidden",
		children
	});
	return children;
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/presence/split-presence-props.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/presence/split-presence-props.js ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   splitPresenceProps: () => (/* binding */ splitPresenceProps)
/* harmony export */ });
/* harmony import */ var _utils_create_split_props_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-split-props.js */ "./node_modules/@ark-ui/react/dist/utils/create-split-props.js");
"use client";

//#region src/components/presence/split-presence-props.ts
var splitPresenceProps = (props) => (0,_utils_create_split_props_js__WEBPACK_IMPORTED_MODULE_0__.createSplitProps)()(props, [
	"hideMode",
	"immediate",
	"lazyMount",
	"onEnterComplete",
	"onExitComplete",
	"present",
	"skipAnimationOnMount",
	"unmountOnExit"
]);
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/presence/use-presence-context.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/presence/use-presence-context.js ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PresenceProvider: () => (/* binding */ PresenceProvider),
/* harmony export */   usePresenceContext: () => (/* binding */ usePresenceContext)
/* harmony export */ });
/* harmony import */ var _utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-context.js */ "./node_modules/@ark-ui/react/dist/utils/create-context.js");
"use client";

//#region src/components/presence/use-presence-context.ts
var [PresenceProvider, usePresenceContext] = (0,_utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__.createContext)({
	name: "PresenceContext",
	hookName: "usePresenceContext",
	providerName: "<PresenceProvider />"
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/presence/use-presence.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/presence/use-presence.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePresence: () => (/* binding */ usePresence)
/* harmony export */ });
/* harmony import */ var _utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/react-activity.js */ "./node_modules/@ark-ui/react/dist/utils/react-activity.js");
/* harmony import */ var _utils_use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/use-event.js */ "./node_modules/@ark-ui/react/dist/utils/use-event.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/machine.mjs");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/normalize-props.mjs");
/* harmony import */ var _zag_js_presence__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/presence */ "./node_modules/@zag-js/presence/dist/presence.connect.mjs");
/* harmony import */ var _zag_js_presence__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/presence */ "./node_modules/@zag-js/presence/dist/presence.machine.mjs");
"use client";





//#region src/components/presence/use-presence.ts
var usePresence = (props = {}) => {
	const { lazyMount, unmountOnExit, hideMode = "display-none", present, skipAnimationOnMount = false, ...rest } = props;
	const wasEverPresent = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(false);
	const machineProps = {
		...rest,
		present,
		onEnterComplete: (0,_utils_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(props.onEnterComplete),
		onExitComplete: (0,_utils_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(props.onExitComplete)
	};
	const service = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.useMachine)(_zag_js_presence__WEBPACK_IMPORTED_MODULE_6__.machine, machineProps);
	const api = _zag_js_presence__WEBPACK_IMPORTED_MODULE_5__.connect(service, _zag_js_react__WEBPACK_IMPORTED_MODULE_4__.normalizeProps);
	if (api.present) wasEverPresent.current = true;
	const unmounted = !api.present && !wasEverPresent.current && lazyMount || unmountOnExit && !api.present && wasEverPresent.current;
	const resolvedHideMode = hideMode === "activity" && _utils_react_activity_js__WEBPACK_IMPORTED_MODULE_0__.supportsActivity ? "activity" : "display-none";
	const getPresenceProps = () => ({
		"data-state": api.skip && skipAnimationOnMount ? void 0 : present ? "open" : "closed",
		hidden: resolvedHideMode === "activity" ? false : !api.present
	});
	return {
		ref: api.setNode,
		getPresenceProps,
		present: api.present,
		unmounted,
		hideMode: resolvedHideMode
	};
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/select/use-select.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/select/use-select.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSelect: () => (/* binding */ useSelect)
/* harmony export */ });
/* harmony import */ var _providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../providers/environment/use-environment-context.js */ "./node_modules/@ark-ui/react/dist/providers/environment/use-environment-context.js");
/* harmony import */ var _providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/locale/use-locale-context.js */ "./node_modules/@ark-ui/react/dist/providers/locale/use-locale-context.js");
/* harmony import */ var _field_use_field_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../field/use-field-context.js */ "./node_modules/@ark-ui/react/dist/components/field/use-field-context.js");
/* harmony import */ var _zag_js_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/select */ "./node_modules/@zag-js/select/dist/select.connect.mjs");
/* harmony import */ var _zag_js_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/select */ "./node_modules/@zag-js/select/dist/select.machine.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/machine.mjs");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/normalize-props.mjs");
"use client";






//#region src/components/select/use-select.ts
var useSelect = (props) => {
	const id = (0,react__WEBPACK_IMPORTED_MODULE_5__.useId)();
	const { dir } = (0,_providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_1__.useLocaleContext)();
	const { getRootNode } = (0,_providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_0__.useEnvironmentContext)();
	const field = (0,_field_use_field_context_js__WEBPACK_IMPORTED_MODULE_2__.useFieldContext)();
	const machineProps = {
		id,
		ids: {
			label: field?.ids.label,
			hiddenSelect: field?.ids.control
		},
		disabled: field?.disabled,
		readOnly: field?.readOnly,
		invalid: field?.invalid,
		required: field?.required,
		dir,
		getRootNode,
		...props
	};
	const service = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_6__.useMachine)(_zag_js_select__WEBPACK_IMPORTED_MODULE_4__.machine, machineProps);
	return _zag_js_select__WEBPACK_IMPORTED_MODULE_3__.connect(service, _zag_js_react__WEBPACK_IMPORTED_MODULE_7__.normalizeProps);
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tabs/use-tabs.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tabs/use-tabs.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTabs: () => (/* binding */ useTabs)
/* harmony export */ });
/* harmony import */ var _providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../providers/environment/use-environment-context.js */ "./node_modules/@ark-ui/react/dist/providers/environment/use-environment-context.js");
/* harmony import */ var _providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/locale/use-locale-context.js */ "./node_modules/@ark-ui/react/dist/providers/locale/use-locale-context.js");
/* harmony import */ var _zag_js_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/tabs */ "./node_modules/@zag-js/tabs/dist/tabs.connect.mjs");
/* harmony import */ var _zag_js_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/tabs */ "./node_modules/@zag-js/tabs/dist/tabs.machine.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/machine.mjs");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/normalize-props.mjs");
"use client";





//#region src/components/tabs/use-tabs.ts
var useTabs = (props) => {
	const id = (0,react__WEBPACK_IMPORTED_MODULE_4__.useId)();
	const { getRootNode } = (0,_providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_0__.useEnvironmentContext)();
	const { dir } = (0,_providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_1__.useLocaleContext)();
	const machineProps = {
		id,
		dir,
		getRootNode,
		...props
	};
	const service = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_5__.useMachine)(_zag_js_tabs__WEBPACK_IMPORTED_MODULE_3__.machine, machineProps);
	return _zag_js_tabs__WEBPACK_IMPORTED_MODULE_2__.connect(service, _zag_js_react__WEBPACK_IMPORTED_MODULE_6__.normalizeProps);
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/create-toaster.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/create-toaster.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createToaster: () => (/* binding */ createToaster)
/* harmony export */ });
/* harmony import */ var _zag_js_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/toast */ "./node_modules/@zag-js/toast/dist/toast.store.mjs");
"use client";

//#region src/components/toast/create-toaster.tsx
var createToaster = (props) => {
	return _zag_js_toast__WEBPACK_IMPORTED_MODULE_0__.createToastStore(props);
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/toast-action-trigger.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/toast-action-trigger.js ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastActionTrigger: () => (/* binding */ ToastActionTrigger)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-toast-context.js */ "./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/toast/toast-action-trigger.tsx
var ToastActionTrigger = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const toast = (0,_use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__.useToastContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(toast.getActionTriggerProps(), props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.button, {
		...mergedProps,
		ref
	});
});
ToastActionTrigger.displayName = "ToastActionTrigger";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/toast-close-trigger.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/toast-close-trigger.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastCloseTrigger: () => (/* binding */ ToastCloseTrigger)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-toast-context.js */ "./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/toast/toast-close-trigger.tsx
var ToastCloseTrigger = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const toast = (0,_use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__.useToastContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(toast.getCloseTriggerProps(), props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.button, {
		...mergedProps,
		ref
	});
});
ToastCloseTrigger.displayName = "ToastCloseTrigger";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/toast-context.js"
/*!***************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/toast-context.js ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastContext: () => (/* binding */ ToastContext)
/* harmony export */ });
/* harmony import */ var _use_toast_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-toast-context.js */ "./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js");
"use client";

//#region src/components/toast/toast-context.tsx
var ToastContext = (props) => props.children((0,_use_toast_context_js__WEBPACK_IMPORTED_MODULE_0__.useToastContext)());
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/toast-description.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/toast-description.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastDescription: () => (/* binding */ ToastDescription)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-toast-context.js */ "./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/toast/toast-description.tsx
var ToastDescription = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const toast = (0,_use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__.useToastContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(toast.getDescriptionProps(), props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
		...mergedProps,
		ref
	});
});
ToastDescription.displayName = "ToastDescription";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/toast-root.js"
/*!************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/toast-root.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastRoot: () => (/* binding */ ToastRoot)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-toast-context.js */ "./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/toast/toast-root.tsx
var ToastRoot = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const { asChild, children, ...localProps } = props;
	const toast = (0,_use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__.useToastContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(toast.getRootProps(), localProps);
	const withGhosts = (content) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, { children: [
		/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", { ...toast.getGhostBeforeProps() }),
		content,
		/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", { ...toast.getGhostAfterProps() })
	] });
	const asChildContent = () => {
		if (!(0,react__WEBPACK_IMPORTED_MODULE_2__.isValidElement)(children)) return children;
		return (0,react__WEBPACK_IMPORTED_MODULE_2__.cloneElement)(children, void 0, withGhosts(children.props.children));
	};
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
		...mergedProps,
		asChild,
		ref,
		children: asChild ? asChildContent() : withGhosts(children)
	});
});
ToastRoot.displayName = "ToastRoot";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/toast-title.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/toast-title.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastTitle: () => (/* binding */ ToastTitle)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-toast-context.js */ "./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/toast/toast-title.tsx
var ToastTitle = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const toast = (0,_use_toast_context_js__WEBPACK_IMPORTED_MODULE_1__.useToastContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(toast.getTitleProps(), props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
		...mergedProps,
		ref
	});
});
ToastTitle.displayName = "ToastTitle";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/toast.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/toast.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionTrigger: () => (/* reexport safe */ _toast_action_trigger_js__WEBPACK_IMPORTED_MODULE_1__.ToastActionTrigger),
/* harmony export */   CloseTrigger: () => (/* reexport safe */ _toast_close_trigger_js__WEBPACK_IMPORTED_MODULE_2__.ToastCloseTrigger),
/* harmony export */   Context: () => (/* reexport safe */ _toast_context_js__WEBPACK_IMPORTED_MODULE_3__.ToastContext),
/* harmony export */   Description: () => (/* reexport safe */ _toast_description_js__WEBPACK_IMPORTED_MODULE_4__.ToastDescription),
/* harmony export */   Root: () => (/* reexport safe */ _toast_root_js__WEBPACK_IMPORTED_MODULE_5__.ToastRoot),
/* harmony export */   Title: () => (/* reexport safe */ _toast_title_js__WEBPACK_IMPORTED_MODULE_6__.ToastTitle),
/* harmony export */   toast_exports: () => (/* binding */ toast_exports)
/* harmony export */ });
/* harmony import */ var _virtual_rolldown_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_virtual/_rolldown/runtime.js */ "./node_modules/@ark-ui/react/dist/_virtual/_rolldown/runtime.js");
/* harmony import */ var _toast_action_trigger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toast-action-trigger.js */ "./node_modules/@ark-ui/react/dist/components/toast/toast-action-trigger.js");
/* harmony import */ var _toast_close_trigger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toast-close-trigger.js */ "./node_modules/@ark-ui/react/dist/components/toast/toast-close-trigger.js");
/* harmony import */ var _toast_context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toast-context.js */ "./node_modules/@ark-ui/react/dist/components/toast/toast-context.js");
/* harmony import */ var _toast_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toast-description.js */ "./node_modules/@ark-ui/react/dist/components/toast/toast-description.js");
/* harmony import */ var _toast_root_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toast-root.js */ "./node_modules/@ark-ui/react/dist/components/toast/toast-root.js");
/* harmony import */ var _toast_title_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toast-title.js */ "./node_modules/@ark-ui/react/dist/components/toast/toast-title.js");







//#region src/components/toast/toast.ts
var toast_exports = /* @__PURE__ */ (0,_virtual_rolldown_runtime_js__WEBPACK_IMPORTED_MODULE_0__.__exportAll)({
	ActionTrigger: () => _toast_action_trigger_js__WEBPACK_IMPORTED_MODULE_1__.ToastActionTrigger,
	CloseTrigger: () => _toast_close_trigger_js__WEBPACK_IMPORTED_MODULE_2__.ToastCloseTrigger,
	Context: () => _toast_context_js__WEBPACK_IMPORTED_MODULE_3__.ToastContext,
	Description: () => _toast_description_js__WEBPACK_IMPORTED_MODULE_4__.ToastDescription,
	Root: () => _toast_root_js__WEBPACK_IMPORTED_MODULE_5__.ToastRoot,
	Title: () => _toast_title_js__WEBPACK_IMPORTED_MODULE_6__.ToastTitle
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/toaster.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/toaster.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toaster: () => (/* binding */ Toaster)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/environment/use-environment-context.js */ "./node_modules/@ark-ui/react/dist/providers/environment/use-environment-context.js");
/* harmony import */ var _providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../providers/locale/use-locale-context.js */ "./node_modules/@ark-ui/react/dist/providers/locale/use-locale-context.js");
/* harmony import */ var _use_toast_context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-toast-context.js */ "./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js");
/* harmony import */ var _zag_js_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/toast */ "./node_modules/@zag-js/toast/dist/index.mjs");
/* harmony import */ var _zag_js_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/toast */ "./node_modules/@zag-js/toast/dist/toast.connect.mjs");
/* harmony import */ var _zag_js_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/toast */ "./node_modules/@zag-js/toast/dist/toast.machine.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/machine.mjs");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/normalize-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";








//#region src/components/toast/toaster.tsx
var Toaster = (0,react__WEBPACK_IMPORTED_MODULE_7__.forwardRef)((props, ref) => {
	const { toaster, children, label, dir, getRootNode, ...localProps } = props;
	const locale = (0,_providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_2__.useLocaleContext)();
	const env = (0,_providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_1__.useEnvironmentContext)();
	const service = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_9__.useMachine)(_zag_js_toast__WEBPACK_IMPORTED_MODULE_4__.group.machine, {
		store: toaster,
		id: (0,react__WEBPACK_IMPORTED_MODULE_7__.useId)(),
		dir: dir ?? locale?.dir,
		getRootNode: getRootNode ?? env?.getRootNode
	});
	const api = _zag_js_toast__WEBPACK_IMPORTED_MODULE_4__.group.connect(service, _zag_js_react__WEBPACK_IMPORTED_MODULE_10__.normalizeProps);
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_8__.mergeProps)(api.getGroupProps({ label }), localProps);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
		...mergedProps,
		ref,
		children: api.getToasts().map((toast, index) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(ToastActor, {
			value: toast,
			parent: service,
			index,
			children: (ctx) => children(ctx)
		}, toast.id))
	});
});
Toaster.displayName = "Toaster";
var ToastActor = (props) => {
	const env = (0,_providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_1__.useEnvironmentContext)();
	const localProps = {
		...props.value,
		parent: props.parent,
		index: props.index,
		getRootNode: env.getRootNode
	};
	const service = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_9__.useMachine)(_zag_js_toast__WEBPACK_IMPORTED_MODULE_6__.machine, { ...localProps });
	const api = _zag_js_toast__WEBPACK_IMPORTED_MODULE_5__.connect(service, _zag_js_react__WEBPACK_IMPORTED_MODULE_10__.normalizeProps);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_use_toast_context_js__WEBPACK_IMPORTED_MODULE_3__.ToastProvider, {
		value: api,
		children: props.children(props.value)
	});
};
ToastActor.displayName = "ToastActor";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/toast/use-toast-context.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastProvider: () => (/* binding */ ToastProvider),
/* harmony export */   useToastContext: () => (/* binding */ useToastContext)
/* harmony export */ });
/* harmony import */ var _utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-context.js */ "./node_modules/@ark-ui/react/dist/utils/create-context.js");
"use client";

//#region src/components/toast/use-toast-context.ts
var [ToastProvider, useToastContext] = (0,_utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__.createContext)({
	name: "ToastContext",
	hookName: "useToastContext",
	providerName: "<ToastProvider />"
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-arrow-tip.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-arrow-tip.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipArrowTip: () => (/* binding */ TooltipArrowTip)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/tooltip/tooltip-arrow-tip.tsx
var TooltipArrowTip = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const tooltip = (0,_use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_1__.useTooltipContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(tooltip.getArrowTipProps(), props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
		...mergedProps,
		ref
	});
});
TooltipArrowTip.displayName = "TooltipArrowTip";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-arrow.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-arrow.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipArrow: () => (/* binding */ TooltipArrow)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";





//#region src/components/tooltip/tooltip-arrow.tsx
var TooltipArrow = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
	const tooltip = (0,_use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_1__.useTooltipContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(tooltip.getArrowProps(), props);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
		...mergedProps,
		ref
	});
});
TooltipArrow.displayName = "TooltipArrow";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-content.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-content.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipContent: () => (/* binding */ TooltipContent)
/* harmony export */ });
/* harmony import */ var _utils_compose_refs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/compose-refs.js */ "./node_modules/@ark-ui/react/dist/utils/compose-refs.js");
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _presence_presence_gate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presence/presence-gate.js */ "./node_modules/@ark-ui/react/dist/components/presence/presence-gate.js");
/* harmony import */ var _presence_use_presence_context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presence/use-presence-context.js */ "./node_modules/@ark-ui/react/dist/components/presence/use-presence-context.js");
/* harmony import */ var _use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";








//#region src/components/tooltip/tooltip-content.tsx
var TooltipContent = (0,react__WEBPACK_IMPORTED_MODULE_5__.forwardRef)((props, ref) => {
	const tooltip = (0,_use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_4__.useTooltipContext)();
	const presence = (0,_presence_use_presence_context_js__WEBPACK_IMPORTED_MODULE_3__.usePresenceContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_6__.mergeProps)(tooltip.getContentProps(), presence.getPresenceProps(), props);
	const composedRefs = (0,_utils_compose_refs_js__WEBPACK_IMPORTED_MODULE_0__.useComposedRefs)(presence.ref, ref);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_presence_presence_gate_js__WEBPACK_IMPORTED_MODULE_2__.PresenceGate, {
		presence,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_1__.ark.div, {
			...mergedProps,
			ref: composedRefs
		})
	});
});
TooltipContent.displayName = "TooltipContent";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-context.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-context.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipContext: () => (/* binding */ TooltipContext)
/* harmony export */ });
/* harmony import */ var _use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js");
"use client";

//#region src/components/tooltip/tooltip-context.tsx
var TooltipContext = (props) => props.children((0,_use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_0__.useTooltipContext)());
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-positioner.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-positioner.js ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipPositioner: () => (/* binding */ TooltipPositioner)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _presence_use_presence_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../presence/use-presence-context.js */ "./node_modules/@ark-ui/react/dist/components/presence/use-presence-context.js");
/* harmony import */ var _use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";






//#region src/components/tooltip/tooltip-positioner.tsx
var TooltipPositioner = (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((props, ref) => {
	const tooltip = (0,_use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_2__.useTooltipContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(tooltip.getPositionerProps(), props);
	if ((0,_presence_use_presence_context_js__WEBPACK_IMPORTED_MODULE_1__.usePresenceContext)().unmounted) return null;
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_0__.ark.div, {
		...mergedProps,
		ref
	});
});
TooltipPositioner.displayName = "TooltipPositioner";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-root-provider.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-root-provider.js ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipRootProvider: () => (/* binding */ TooltipRootProvider)
/* harmony export */ });
/* harmony import */ var _presence_split_presence_props_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../presence/split-presence-props.js */ "./node_modules/@ark-ui/react/dist/components/presence/split-presence-props.js");
/* harmony import */ var _presence_use_presence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../presence/use-presence.js */ "./node_modules/@ark-ui/react/dist/components/presence/use-presence.js");
/* harmony import */ var _presence_use_presence_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presence/use-presence-context.js */ "./node_modules/@ark-ui/react/dist/components/presence/use-presence-context.js");
/* harmony import */ var _use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";






//#region src/components/tooltip/tooltip-root-provider.tsx
var TooltipRootProvider = (props) => {
	const [presenceProps, { value: tooltip, children }] = (0,_presence_split_presence_props_js__WEBPACK_IMPORTED_MODULE_0__.splitPresenceProps)(props);
	const presence = (0,_presence_use_presence_js__WEBPACK_IMPORTED_MODULE_1__.usePresence)((0,_zag_js_react__WEBPACK_IMPORTED_MODULE_4__.mergeProps)({ present: tooltip.open }, presenceProps));
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_3__.TooltipProvider, {
		value: tooltip,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_presence_use_presence_context_js__WEBPACK_IMPORTED_MODULE_2__.PresenceProvider, {
			value: presence,
			children
		})
	});
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-root.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-root.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipRoot: () => (/* binding */ TooltipRoot)
/* harmony export */ });
/* harmony import */ var _presence_split_presence_props_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../presence/split-presence-props.js */ "./node_modules/@ark-ui/react/dist/components/presence/split-presence-props.js");
/* harmony import */ var _presence_use_presence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../presence/use-presence.js */ "./node_modules/@ark-ui/react/dist/components/presence/use-presence.js");
/* harmony import */ var _presence_use_presence_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presence/use-presence-context.js */ "./node_modules/@ark-ui/react/dist/components/presence/use-presence-context.js");
/* harmony import */ var _use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js");
/* harmony import */ var _use_tooltip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-tooltip.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip.js");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";







//#region src/components/tooltip/tooltip-root.tsx
var TooltipRoot = (props) => {
	const [presenceProps, { children, ...localProps }] = (0,_presence_split_presence_props_js__WEBPACK_IMPORTED_MODULE_0__.splitPresenceProps)(props);
	const tooltip = (0,_use_tooltip_js__WEBPACK_IMPORTED_MODULE_4__.useTooltip)(localProps);
	const presence = (0,_presence_use_presence_js__WEBPACK_IMPORTED_MODULE_1__.usePresence)((0,_zag_js_react__WEBPACK_IMPORTED_MODULE_5__.mergeProps)({ present: tooltip.open }, presenceProps));
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_3__.TooltipProvider, {
		value: tooltip,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_presence_use_presence_context_js__WEBPACK_IMPORTED_MODULE_2__.PresenceProvider, {
			value: presence,
			children
		})
	});
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-trigger.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-trigger.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipTrigger: () => (/* binding */ TooltipTrigger)
/* harmony export */ });
/* harmony import */ var _utils_create_split_props_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-split-props.js */ "./node_modules/@ark-ui/react/dist/utils/create-split-props.js");
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factory.js */ "./node_modules/@ark-ui/react/dist/components/factory.js");
/* harmony import */ var _use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/core/dist/merge-props.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";






//#region src/components/tooltip/tooltip-trigger.tsx
var splitTriggerProps = (0,_utils_create_split_props_js__WEBPACK_IMPORTED_MODULE_0__.createSplitProps)();
var TooltipTrigger = (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((props, ref) => {
	const [triggerProps, localProps] = splitTriggerProps(props, ["value"]);
	const tooltip = (0,_use_tooltip_context_js__WEBPACK_IMPORTED_MODULE_2__.useTooltipContext)();
	const mergedProps = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(tooltip.getTriggerProps(triggerProps), localProps);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_factory_js__WEBPACK_IMPORTED_MODULE_1__.ark.button, {
		...mergedProps,
		ref
	});
});
TooltipTrigger.displayName = "TooltipTrigger";
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/tooltip.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arrow: () => (/* reexport safe */ _tooltip_arrow_js__WEBPACK_IMPORTED_MODULE_1__.TooltipArrow),
/* harmony export */   ArrowTip: () => (/* reexport safe */ _tooltip_arrow_tip_js__WEBPACK_IMPORTED_MODULE_2__.TooltipArrowTip),
/* harmony export */   Content: () => (/* reexport safe */ _tooltip_content_js__WEBPACK_IMPORTED_MODULE_3__.TooltipContent),
/* harmony export */   Context: () => (/* reexport safe */ _tooltip_context_js__WEBPACK_IMPORTED_MODULE_4__.TooltipContext),
/* harmony export */   Positioner: () => (/* reexport safe */ _tooltip_positioner_js__WEBPACK_IMPORTED_MODULE_5__.TooltipPositioner),
/* harmony export */   Root: () => (/* reexport safe */ _tooltip_root_js__WEBPACK_IMPORTED_MODULE_6__.TooltipRoot),
/* harmony export */   RootProvider: () => (/* reexport safe */ _tooltip_root_provider_js__WEBPACK_IMPORTED_MODULE_7__.TooltipRootProvider),
/* harmony export */   Trigger: () => (/* reexport safe */ _tooltip_trigger_js__WEBPACK_IMPORTED_MODULE_8__.TooltipTrigger),
/* harmony export */   tooltip_exports: () => (/* binding */ tooltip_exports)
/* harmony export */ });
/* harmony import */ var _virtual_rolldown_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_virtual/_rolldown/runtime.js */ "./node_modules/@ark-ui/react/dist/_virtual/_rolldown/runtime.js");
/* harmony import */ var _tooltip_arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tooltip-arrow.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-arrow.js");
/* harmony import */ var _tooltip_arrow_tip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip-arrow-tip.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-arrow-tip.js");
/* harmony import */ var _tooltip_content_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tooltip-content.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-content.js");
/* harmony import */ var _tooltip_context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tooltip-context.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-context.js");
/* harmony import */ var _tooltip_positioner_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tooltip-positioner.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-positioner.js");
/* harmony import */ var _tooltip_root_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tooltip-root.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-root.js");
/* harmony import */ var _tooltip_root_provider_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tooltip-root-provider.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-root-provider.js");
/* harmony import */ var _tooltip_trigger_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tooltip-trigger.js */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip-trigger.js");









//#region src/components/tooltip/tooltip.ts
var tooltip_exports = /* @__PURE__ */ (0,_virtual_rolldown_runtime_js__WEBPACK_IMPORTED_MODULE_0__.__exportAll)({
	Arrow: () => _tooltip_arrow_js__WEBPACK_IMPORTED_MODULE_1__.TooltipArrow,
	ArrowTip: () => _tooltip_arrow_tip_js__WEBPACK_IMPORTED_MODULE_2__.TooltipArrowTip,
	Content: () => _tooltip_content_js__WEBPACK_IMPORTED_MODULE_3__.TooltipContent,
	Context: () => _tooltip_context_js__WEBPACK_IMPORTED_MODULE_4__.TooltipContext,
	Positioner: () => _tooltip_positioner_js__WEBPACK_IMPORTED_MODULE_5__.TooltipPositioner,
	Root: () => _tooltip_root_js__WEBPACK_IMPORTED_MODULE_6__.TooltipRoot,
	RootProvider: () => _tooltip_root_provider_js__WEBPACK_IMPORTED_MODULE_7__.TooltipRootProvider,
	Trigger: () => _tooltip_trigger_js__WEBPACK_IMPORTED_MODULE_8__.TooltipTrigger
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js"
/*!***********************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip-context.js ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipProvider: () => (/* binding */ TooltipProvider),
/* harmony export */   useTooltipContext: () => (/* binding */ useTooltipContext)
/* harmony export */ });
/* harmony import */ var _utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-context.js */ "./node_modules/@ark-ui/react/dist/utils/create-context.js");
"use client";

//#region src/components/tooltip/use-tooltip-context.ts
var [TooltipProvider, useTooltipContext] = (0,_utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__.createContext)({
	name: "TooltipContext",
	hookName: "useTooltipContext",
	providerName: "<TooltipProvider />"
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip.js"
/*!***************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/components/tooltip/use-tooltip.js ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTooltip: () => (/* binding */ useTooltip)
/* harmony export */ });
/* harmony import */ var _providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../providers/environment/use-environment-context.js */ "./node_modules/@ark-ui/react/dist/providers/environment/use-environment-context.js");
/* harmony import */ var _providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/locale/use-locale-context.js */ "./node_modules/@ark-ui/react/dist/providers/locale/use-locale-context.js");
/* harmony import */ var _zag_js_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/tooltip */ "./node_modules/@zag-js/tooltip/dist/tooltip.connect.mjs");
/* harmony import */ var _zag_js_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/tooltip */ "./node_modules/@zag-js/tooltip/dist/tooltip.machine.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/machine.mjs");
/* harmony import */ var _zag_js_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/react */ "./node_modules/@zag-js/react/dist/normalize-props.mjs");
"use client";





//#region src/components/tooltip/use-tooltip.ts
var useTooltip = (props) => {
	const id = (0,react__WEBPACK_IMPORTED_MODULE_4__.useId)();
	const { getRootNode } = (0,_providers_environment_use_environment_context_js__WEBPACK_IMPORTED_MODULE_0__.useEnvironmentContext)();
	const { dir } = (0,_providers_locale_use_locale_context_js__WEBPACK_IMPORTED_MODULE_1__.useLocaleContext)();
	const machineProps = {
		id,
		dir,
		getRootNode,
		...props
	};
	const service = (0,_zag_js_react__WEBPACK_IMPORTED_MODULE_5__.useMachine)(_zag_js_tooltip__WEBPACK_IMPORTED_MODULE_3__.machine, machineProps);
	return _zag_js_tooltip__WEBPACK_IMPORTED_MODULE_2__.connect(service, _zag_js_react__WEBPACK_IMPORTED_MODULE_6__.normalizeProps);
};
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/providers/environment/use-environment-context.js"
/*!******************************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/providers/environment/use-environment-context.js ***!
  \******************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnvironmentContextProvider: () => (/* binding */ EnvironmentContextProvider),
/* harmony export */   useEnvironmentContext: () => (/* binding */ useEnvironmentContext)
/* harmony export */ });
/* harmony import */ var _utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-context.js */ "./node_modules/@ark-ui/react/dist/utils/create-context.js");
"use client";

//#region src/providers/environment/use-environment-context.ts
var [EnvironmentContextProvider, useEnvironmentContext] = (0,_utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__.createContext)({
	name: "EnvironmentContext",
	hookName: "useEnvironmentContext",
	providerName: "<EnvironmentProvider />",
	strict: false,
	defaultValue: {
		getRootNode: () => document,
		getDocument: () => document,
		getWindow: () => window
	}
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/providers/locale/use-locale-context.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/providers/locale/use-locale-context.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocaleContextProvider: () => (/* binding */ LocaleContextProvider),
/* harmony export */   useLocaleContext: () => (/* binding */ useLocaleContext)
/* harmony export */ });
/* harmony import */ var _utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/create-context.js */ "./node_modules/@ark-ui/react/dist/utils/create-context.js");
"use client";

//#region src/providers/locale/use-locale-context.ts
var [LocaleContextProvider, useLocaleContext] = (0,_utils_create_context_js__WEBPACK_IMPORTED_MODULE_0__.createContext)({
	name: "LocaleContext",
	hookName: "useLocaleContext",
	providerName: "<LocaleProvider />",
	strict: false,
	defaultValue: {
		dir: "ltr",
		locale: "en-US"
	}
});
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/utils/compose-refs.js"
/*!***************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/utils/compose-refs.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composeRefs: () => (/* binding */ composeRefs),
/* harmony export */   useComposedRefs: () => (/* binding */ useComposedRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

//#region src/utils/compose-refs.ts
function composeRefs(...refs) {
	return (node) => {
		const cleanUps = [];
		let hasCustomCleanUp = false;
		for (const ref of refs) if (typeof ref === "function") {
			const cb = ref(node);
			if (typeof cb === "function") {
				hasCustomCleanUp = true;
				cleanUps.push(cb);
			} else cleanUps.push(() => ref(null));
		} else if (ref) {
			ref.current = node;
			cleanUps.push(() => {
				ref.current = null;
			});
		}
		if (hasCustomCleanUp) return () => {
			for (const cleanUp of cleanUps) cleanUp();
		};
	};
}
function useComposedRefs(...refs) {
	return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(composeRefs(...refs), refs);
}
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/utils/create-context.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/utils/create-context.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContext: () => (/* binding */ createContext$1)
/* harmony export */ });
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/guard.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");


//#region src/utils/create-context.ts
function getErrorMessage(hook, provider) {
	return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}
function createContext$1(options = {}) {
	const { name, strict = true, hookName = "useContext", providerName = "Provider", errorMessage, defaultValue } = options;
	const Context = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(defaultValue);
	Context.displayName = name;
	function useContext$1() {
		const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Context);
		if (!context && strict) {
			const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName));
			error.name = "ContextError";
			if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.hasProp)(Error, "captureStackTrace") && (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.isFunction)(Error.captureStackTrace)) Error.captureStackTrace(error, useContext$1);
			throw error;
		}
		return context;
	}
	return [
		Context.Provider,
		useContext$1,
		Context
	];
}
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/utils/create-split-props.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/utils/create-split-props.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSplitProps: () => (/* binding */ createSplitProps)
/* harmony export */ });
//#region src/utils/create-split-props.ts
var createSplitProps = () => (props, keys) => keys.reduce((previousValue, currentValue) => {
	const [target, source] = previousValue;
	const key = currentValue;
	if (source[key] !== void 0) target[key] = source[key];
	delete source[key];
	return [target, source];
}, [{}, { ...props }]);
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/utils/react-activity.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/utils/react-activity.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Activity: () => (/* binding */ Activity),
/* harmony export */   getActivity: () => (/* binding */ getActivity),
/* harmony export */   supportsActivity: () => (/* binding */ supportsActivity)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

//#region src/utils/react-activity.ts
var getActivity = (react) => Reflect.get(react, "Activity");
var Activity = getActivity(/*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2))));
var supportsActivity = Activity !== void 0;
//#endregion



/***/ },

/***/ "./node_modules/@ark-ui/react/dist/utils/use-event.js"
/*!************************************************************!*\
  !*** ./node_modules/@ark-ui/react/dist/utils/use-event.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useEvent: () => (/* binding */ useEvent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

//#region src/utils/use-event.ts
/**
* Returns a memoized callback that will flushSync the callback if sync is true
*/
function useEvent(callback, opts = {}) {
	const { sync = false } = opts;
	const callbackRef = useLatestRef(callback);
	return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((...args) => {
		if (sync) return queueMicrotask(() => callbackRef.current?.(...args));
		return callbackRef.current?.(...args);
	}, [sync, callbackRef]);
}
function useLatestRef(value) {
	const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
	ref.current = value;
	return ref;
}
//#endregion



/***/ },

/***/ "./node_modules/@floating-ui/core/dist/floating-ui.core.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/@floating-ui/core/dist/floating-ui.core.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrow: () => (/* binding */ arrow),
/* harmony export */   autoPlacement: () => (/* binding */ autoPlacement),
/* harmony export */   computePosition: () => (/* binding */ computePosition),
/* harmony export */   detectOverflow: () => (/* binding */ detectOverflow),
/* harmony export */   flip: () => (/* binding */ flip),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   inline: () => (/* binding */ inline),
/* harmony export */   limitShift: () => (/* binding */ limitShift),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   rectToClientRect: () => (/* reexport safe */ _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect),
/* harmony export */   shift: () => (/* binding */ shift),
/* harmony export */   size: () => (/* binding */ size)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/utils */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs");



function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement);
  const alignmentAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentAxis)(placement);
  const alignLength = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAxisLength)(alignmentAxis);
  const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement);
  if (alignment) {
    coords[alignmentAxis] += commonAlign * (alignment === 'end' ? 1 : -1) * (rtl && isVertical ? -1 : 1);
  }
  return coords;
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
  const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) && (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  };
  const elementClientRect = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

// Maximum number of resets that can occur before bailing to avoid infinite reset loops.
const MAX_RESET_COUNT = 50;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const platformWithDetectOverflow = platform.detectOverflow ? platform : {
    ...platform,
    detectOverflow
  };
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
    const coords = {
      x,
      y
    };
    const axis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentAxis)(placement);
    const length = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAxisLength)(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(minPadding, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) != null && center !== offset && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) === alignment), ...allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) !== alignment)] : allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) === alignment || (autoAlignment ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAlignmentPlacement)(placement) !== placement : false);
    }
    return true;
  });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const placements$1 = alignment !== undefined || allowedPlacements === _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }

      // Make `computeCoords` start from the right place.
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const alignmentSides = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentSides)(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
      const currentOverflows = [overflow[(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];

      // There are more placements to check.
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map(d => {
        const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(d.placement);
        return [d.placement, alignment && crossAxis ?
        // Check along the mainAxis and main crossAxis side.
        d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
        // Check only the mainAxis.
        d.overflows[0], d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
      // Aligned placements should not check their opposite crossAxis
      // side.
      (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(d[0]) ? 2 : 3).every(v => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
      const initialSideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(initialPlacement);
      const isBasePlacement = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositePlacement)(initialPlacement)] : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getExpandedPlacements)(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxisPlacements)(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentSides)(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow ||
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every(d => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects,
        platform
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

function getBoundingRect(rects) {
  const minX = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...rects.map(rect => rect.left));
  const minY = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...rects.map(rect => rect.top));
  const maxX = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...rects.map(rect => rect.right));
  const maxY = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = state;
      // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.
      const {
        padding = 2,
        x,
        y
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);

      // No rects (e.g. a hidden or detached reference, or a collapsed range) —
      // keep the existing reference rect rather than resetting to an invalid
      // one with non-finite values.
      if (!nativeClientRects.length) {
        return {};
      }
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getBoundingRect(nativeClientRects));
      const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
      function getBoundingClientRect() {
        // There are two rects and they are disjoined.
        if (clientRects.length === 2 && (clientRects[0].left > clientRects[1].right || clientRects[1].left > clientRects[0].right) && x != null && y != null) {
          // Find the first rect in which the point is fully inside.
          return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }

        // There are 2 or more connected rects.
        if (clientRects.length >= 2) {
          if ((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)({
              x: left,
              y: top,
              width: right - left,
              height: bottom - top
            });
          }
          const isLeftSide = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === 'left';
          const maxRight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...clientRects.map(rect => rect.right));
          const minLeft = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)({
            x: minLeft,
            y: top,
            width: maxRight - minLeft,
            height: bottom - top
          });
        }
        return fallback;
      }
      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

const originSides = /*#__PURE__*/new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
  const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement);
  const isVertical = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const crossAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement);
      const mainAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxis)(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const clampCoord = (axis, coord) => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(coord + overflow[axis === 'y' ? 'top' : 'left'], coord, coord - overflow[axis === 'y' ? 'bottom' : 'right']);
      if (checkMainAxis) {
        mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
      }
      if (checkCrossAxis) {
        crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      var _rawOffset$mainAxis, _rawOffset$crossAxis;
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement);
      const mainAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxis)(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
        crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = originSides.has((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

// Method syntax keeps callback parameters bivariant, but expressing the
// explicit `| undefined` required by `exactOptionalPropertyTypes` needs
// property syntax, which is contravariant under `strictFunctionTypes`.
// Extracting the function from a method position restores that bivariance so
// consumers can still assign callbacks with narrower parameter types.

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
      const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement);
      const isYAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(width - overflow[widthSide], maximumClippingWidth);
      const shiftData = state.middlewareData.shift;
      const noShift = !shiftData;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (shiftData != null && shiftData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if (shiftData != null && shiftData.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        if (isYAxis) {
          availableWidth = width - 2 * (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.left, overflow.right);
        } else {
          availableHeight = height - 2 * (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.top, overflow.bottom);
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};




/***/ },

/***/ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrow: () => (/* binding */ arrow),
/* harmony export */   autoPlacement: () => (/* binding */ autoPlacement),
/* harmony export */   autoUpdate: () => (/* binding */ autoUpdate),
/* harmony export */   computePosition: () => (/* binding */ computePosition),
/* harmony export */   detectOverflow: () => (/* binding */ detectOverflow),
/* harmony export */   flip: () => (/* binding */ flip),
/* harmony export */   getOverflowAncestors: () => (/* reexport safe */ _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   inline: () => (/* binding */ inline),
/* harmony export */   limitShift: () => (/* binding */ limitShift),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   platform: () => (/* binding */ platform),
/* harmony export */   shift: () => (/* binding */ shift),
/* harmony export */   size: () => (/* binding */ size)
/* harmony export */ });
/* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/core */ "./node_modules/@floating-ui/core/dist/floating-ui.core.mjs");
/* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @floating-ui/utils */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs");
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");





function getCssDimensions(element) {
  const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.round)(width) !== offsetWidth || (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.round)(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(domElement)) {
    return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.round)(rect.width) : rect.width) / width;
  let y = ($ ? (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.round)(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/(0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
function getVisualOffsets(element) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isWebKit)() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  return !!floatingOffsetParent && isFixed && floatingOffsetParent === (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element);
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  if (includeScale) {
    if (offsetParent) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement && offsetParent) {
    const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(domElement);
    const offsetWin = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(offsetParent) ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getFrameElement)(currentWin);
    while (currentIFrame && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(currentIFrame);
      currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getFrameElement)(currentWin);
    }
  }
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.rectToClientRect)({
    width,
    height,
    x,
    y
  });
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeScroll)(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(offsetParent);
  const topLayer = elements ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTopLayer)(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  const offsets = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent);
  if (isOffsetParentAnElement || !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeName)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isOverflowElement)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeScroll)(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}

function getClientRects(element) {
  return element.getClientRects ? Array.from(element.getClientRects()) : [];
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(html) {
  const scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeScroll)(html);
  const body = html.ownerDocument.body;
  const width = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(html);
  const y = -scroll.scrollTop;
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(body).direction === 'rtl') {
    x += (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Safety check: ensure the scrollbar space is reasonable in case this
// calculation is affected by unusual styles.
// Most scrollbars leave 15-18px of space.
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
  if (rootBoundary === void 0) {
    rootBoundary = 'viewport';
  }
  const isLayoutViewport = rootBoundary === 'layoutViewport';
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element);
  const html = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    // Client coordinates are relative to the layout viewport, except in
    // WebKit with an `absolute` strategy, where they are relative to the
    // visual viewport.
    const layoutRelativeClientCoords = !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isWebKit)() || strategy === 'fixed';
    if (isLayoutViewport) {
      if (!layoutRelativeClientCoords) {
        x = -visualViewport.offsetLeft;
        y = -visualViewport.offsetTop;
      }
    } else {
      width = visualViewport.width;
      height = visualViewport.height;
      if (layoutRelativeClientCoords) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  // `scrollbar-gutter: stable` on the <html> reserves gutter space that shrinks
  // the visual width but isn't reflected in `html.clientWidth`, so subtract it.
  // Only the inline-end (right) gutter can hold the scrollbar; `both-edges` also
  // reserves an empty inline-start gutter that clips nothing, so exclude just
  // the one scrollbar-side gutter — halve the measured (two-gutter) total. A
  // left-side scrollbar (`windowScrollbarX > 0`) is already handled by
  // `getHTMLOffset`/`visualViewport.width`; skip it here.
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === 'CSS1Compat' ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    const gutter = getComputedStyle(html).scrollbarGutter === 'stable both-edges' ? reservedWidth / 2 : reservedWidth;
    if (gutter <= SCROLLBAR_MAX) {
      width -= gutter;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = getScale(element);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport' || clippingAncestor === 'layoutViewport') {
    rect = getViewportRect(element, strategy, clippingAncestor);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element));
  } else if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.rectToClientRect)(rect);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors)(element, [], false).filter(el => (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(el) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeName)(el) !== 'body');
  let lastKeptComputedStyle = null;
  const elementIsFixed = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element).position === 'fixed';
  let currentNode = elementIsFixed ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(currentNode) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isLastTraversableNode)(currentNode)) {
    const computedStyle = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(currentNode);
    const currentNodeIsContaining = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isContainingBlock)(currentNode);
    // Position of the containing block chain below the current node. A fixed
    // element whose containing block hasn't been found yet is a fixed chain.
    const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? 'fixed' : '';

    // A non-containing ancestor does not clip the element when the chain
    // below it escapes it: a fixed chain escapes all ancestors up to the
    // next containing block, an absolute chain escapes static ancestors.
    const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === 'fixed' || lastPosition === 'absolute' && computedStyle.position === 'static');
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // The kept node carries the chain position for the next iteration.
      lastKeptComputedStyle = computedStyle;
    }
    currentNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTopLayer)(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(rect.top, top);
    right = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.min)(rect.right, right);
    bottom = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.min)(rect.bottom, bottom);
    left = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent);
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  if (isOffsetParentAnElement || !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeName)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isOverflowElement)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeScroll)(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  if (!isOffsetParentAnElement && documentElement) {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element);
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTopLayer)(element)) {
    return win;
  }
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element)) {
    let svgOffsetParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(element);
    while (svgOffsetParent && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isLastTraversableNode)(svgOffsetParent)) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTableElement)(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isLastTraversableNode)(offsetParent) && isStaticPositioned(offsetParent) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isContainingBlock)(offsetParent)) {
    return win;
  }
  return offsetParent || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getContainingBlock)(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement,
  isRTL
};

function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove, ancestorResize) {
  let io = null;
  let timeoutId;
  const root = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.floor)(top);
    const insetRight = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.floor)(root.clientWidth - (left + width));
    const insetBottom = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.floor)(root.clientHeight - (top + height));
    const insetLeft = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.floor)(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(0, (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.min)(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;

      // The entry is a snapshot, so the reference may have moved since the
      // intersection was computed (under performance constraints, or between
      // consecutive frames of a multi-frame layout shift). The reported ratio
      // and the observed area are stale in that case and cannot be trusted to
      // detect subsequent movement, so refresh regardless of the ratio.
      if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        return refresh();
      }
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped in place, the ratio is 0. Throttle
          // the refresh to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element);
  // The window is a resize ancestor, so when `ancestorResize` is enabled its
  // listener already runs the update on resize. Here we only need to rebuild
  // the `IntersectionObserver` for the new root size, skipping a redundant
  // update. When `ancestorResize` is disabled, this becomes the sole update.
  const handleResize = () => refresh(ancestorResize);
  win.addEventListener('resize', handleResize);
  refresh(true);
  return () => {
    win.removeEventListener('resize', handleResize);
    cleanup();
  };
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors)(referenceEl) : []), ...(floating ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors)(floating) : [])] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update);
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
const detectOverflow = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.detectOverflow;

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.offset;

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.autoPlacement;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.shift;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.flip;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.size;

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.hide;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.arrow;

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.inline;

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.limitShift;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = options != null ? options : {};
  const platformWithCache = {
    ...platform,
    ...mergedOptions.platform,
    _c: cache
  };
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.computePosition)(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};




/***/ },

/***/ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle),
/* harmony export */   getContainingBlock: () => (/* binding */ getContainingBlock),
/* harmony export */   getDocumentElement: () => (/* binding */ getDocumentElement),
/* harmony export */   getFrameElement: () => (/* binding */ getFrameElement),
/* harmony export */   getNearestOverflowAncestor: () => (/* binding */ getNearestOverflowAncestor),
/* harmony export */   getNodeName: () => (/* binding */ getNodeName),
/* harmony export */   getNodeScroll: () => (/* binding */ getNodeScroll),
/* harmony export */   getOverflowAncestors: () => (/* binding */ getOverflowAncestors),
/* harmony export */   getParentNode: () => (/* binding */ getParentNode),
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   isContainingBlock: () => (/* binding */ isContainingBlock),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),
/* harmony export */   isLastTraversableNode: () => (/* binding */ isLastTraversableNode),
/* harmony export */   isNode: () => (/* binding */ isNode),
/* harmony export */   isOverflowElement: () => (/* binding */ isOverflowElement),
/* harmony export */   isShadowRoot: () => (/* binding */ isShadowRoot),
/* harmony export */   isTableElement: () => (/* binding */ isTableElement),
/* harmony export */   isTopLayer: () => (/* binding */ isTopLayer),
/* harmony export */   isWebKit: () => (/* binding */ isWebKit)
/* harmony export */ });
function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== 'inline' && display !== 'contents';
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(':popover-open')) {
      return true;
    }
  } catch (_e) {
    // no-op
  }
  try {
    return element.matches(':modal');
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = value => !!value && value !== 'none';
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || '') || containRe.test(css.contain || '');
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none');
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return (node.ownerDocument || node).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}




/***/ },

/***/ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alignments: () => (/* binding */ alignments),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   createCoords: () => (/* binding */ createCoords),
/* harmony export */   evaluate: () => (/* binding */ evaluate),
/* harmony export */   expandPaddingObject: () => (/* binding */ expandPaddingObject),
/* harmony export */   floor: () => (/* binding */ floor),
/* harmony export */   getAlignment: () => (/* binding */ getAlignment),
/* harmony export */   getAlignmentAxis: () => (/* binding */ getAlignmentAxis),
/* harmony export */   getAlignmentSides: () => (/* binding */ getAlignmentSides),
/* harmony export */   getAxisLength: () => (/* binding */ getAxisLength),
/* harmony export */   getExpandedPlacements: () => (/* binding */ getExpandedPlacements),
/* harmony export */   getOppositeAlignmentPlacement: () => (/* binding */ getOppositeAlignmentPlacement),
/* harmony export */   getOppositeAxis: () => (/* binding */ getOppositeAxis),
/* harmony export */   getOppositeAxisPlacements: () => (/* binding */ getOppositeAxisPlacements),
/* harmony export */   getOppositePlacement: () => (/* binding */ getOppositePlacement),
/* harmony export */   getPaddingObject: () => (/* binding */ getPaddingObject),
/* harmony export */   getSide: () => (/* binding */ getSide),
/* harmony export */   getSideAxis: () => (/* binding */ getSideAxis),
/* harmony export */   max: () => (/* binding */ max),
/* harmony export */   min: () => (/* binding */ min),
/* harmony export */   placements: () => (/* binding */ placements),
/* harmony export */   rectToClientRect: () => (/* binding */ rectToClientRect),
/* harmony export */   round: () => (/* binding */ round),
/* harmony export */   sides: () => (/* binding */ sides)
/* harmony export */ });
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const sides = ['top', 'right', 'bottom', 'left'];
const alignments = ['start', 'end'];
const placements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === 't' || firstChar === 'b' ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes('start') ? placement.replace('start', 'end') : placement.replace('end', 'start');
}
const lrPlacement = ['left', 'right'];
const rlPlacement = ['right', 'left'];
const tbPlacement = ['top', 'bottom'];
const btPlacement = ['bottom', 'top'];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  var _padding$top, _padding$right, _padding$bottom, _padding$left;
  return {
    top: (_padding$top = padding.top) != null ? _padding$top : 0,
    right: (_padding$right = padding.right) != null ? _padding$right : 0,
    bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
    left: (_padding$left = padding.left) != null ? _padding$left : 0
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}




/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Badge/Badge.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Badge/Badge.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BADGE_COLORS: () => (/* binding */ a),
/* harmony export */   BADGE_RADII: () => (/* binding */ o),
/* harmony export */   BADGE_SIZES: () => (/* binding */ i),
/* harmony export */   Badge: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Badge.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Badge/Badge.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");



//#region src/base/Badge/Badge.tsx
var i = ["sm", "md"], a = [
	"gray",
	"blue",
	"green",
	"orange",
	"red",
	"transparent"
], o = ["rounded", "pill"], s = {
	sm: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].sizeSm,
	md: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].sizeMd
}, c = {
	gray: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].colorGray,
	blue: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].colorBlue,
	green: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].colorGreen,
	orange: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].colorOrange,
	red: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].colorRed,
	transparent: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].colorTransparent
};
function l({ size: i = "md", color: a = "gray", radius: o = "rounded", stroke: l = !0, statusLeading: u, iconLeading: d, iconTrailing: f, avatar: p, children: m, className: h, ...g }) {
	let _ = l || a === "transparent";
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
		...g,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].badge, s[i], c[a], o === "pill" && _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].radiusPill, _ && _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].stroke, h),
		children: [
			u ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
				className: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].statusLeading,
				children: u
			}) : null,
			p ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
				className: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].avatar,
				children: p
			}) : null,
			d ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
				className: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].icon,
				"aria-hidden": "true",
				children: d
			}) : null,
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
				className: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].label,
				children: m
			}),
			f ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
				className: _Badge_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].icon,
				"aria-hidden": "true",
				children: f
			}) : null
		]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Badge/Badge.module.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Badge/Badge.module.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avatar: () => (/* binding */ a),
/* harmony export */   badge: () => (/* binding */ e),
/* harmony export */   colorBlue: () => (/* binding */ u),
/* harmony export */   colorGray: () => (/* binding */ l),
/* harmony export */   colorGreen: () => (/* binding */ d),
/* harmony export */   colorOrange: () => (/* binding */ f),
/* harmony export */   colorRed: () => (/* binding */ p),
/* harmony export */   colorTransparent: () => (/* binding */ m),
/* harmony export */   "default": () => (/* binding */ h),
/* harmony export */   icon: () => (/* binding */ i),
/* harmony export */   label: () => (/* binding */ r),
/* harmony export */   radiusPill: () => (/* binding */ n),
/* harmony export */   sizeMd: () => (/* binding */ s),
/* harmony export */   sizeSm: () => (/* binding */ c),
/* harmony export */   statusLeading: () => (/* binding */ o),
/* harmony export */   stroke: () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _assets_base_Badge_Badge_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Badge/Badge.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Badge/Badge.css");
//#region src/base/Badge/Badge.module.css
var e = "_badge_1bfgy_13", t = "_stroke_1bfgy_26", n = "_radiusPill_1bfgy_30", r = "_label_1bfgy_34", i = "_icon_1bfgy_38", a = "_avatar_1bfgy_51", o = "_statusLeading_1bfgy_61", s = "_sizeMd_1bfgy_74", c = "_sizeSm_1bfgy_94", l = "_colorGray_1bfgy_114", u = "_colorBlue_1bfgy_122", d = "_colorGreen_1bfgy_130", f = "_colorOrange_1bfgy_138", p = "_colorRed_1bfgy_146", m = "_colorTransparent_1bfgy_158", h = {
	badge: e,
	stroke: t,
	radiusPill: n,
	label: r,
	icon: i,
	avatar: a,
	statusLeading: o,
	sizeMd: s,
	sizeSm: c,
	colorGray: l,
	colorBlue: u,
	colorGreen: d,
	colorOrange: f,
	colorRed: p,
	colorTransparent: m
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Button/Button.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Button/Button.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUTTON_SIZES: () => (/* binding */ u),
/* harmony export */   BUTTON_TYPES: () => (/* binding */ l),
/* harmony export */   Button: () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var _router_RouterProvider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../router/RouterProvider.js */ "./node_modules/@wpengine/bds-react/dist/base/router/RouterProvider.js");
/* harmony import */ var _Button_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Button/Button.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/loader-circle.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");






//#region src/base/Button/Button.tsx
var l = [
	"primary",
	"secondary",
	"outline",
	"ghost",
	"negative"
], u = [
	"xs",
	"sm",
	"md",
	"lg"
];
function d(e, t, n) {
	if (e != null && e !== "") return e;
	if (t != null && t !== "") return t;
	if (typeof n == "string" || typeof n == "number") return String(n);
}
var f = (0,react__WEBPACK_IMPORTED_MODULE_4__.forwardRef)(function({ href: n, inert: r, className: i, ariaLabel: a, loading: o, onClick: c, target: l, rel: u, children: d, ...f }, p) {
	let m = (0,_router_RouterProvider_js__WEBPACK_IMPORTED_MODULE_0__.useRouterLink)(n, c), h = (0,_router_RouterProvider_js__WEBPACK_IMPORTED_MODULE_0__.linkRel)(l, u), g = {
		...f,
		className: i,
		...l == null ? {} : { target: l },
		...h == null ? {} : { rel: h },
		...o ? { "aria-busy": !0 } : {},
		...a == null ? {} : { "aria-label": a }
	};
	return r ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
		...g,
		ref: p,
		"aria-disabled": "true",
		tabIndex: -1,
		children: d
	}) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
		...g,
		ref: p,
		href: m.href ?? n,
		onClick: m.onClick,
		children: d
	});
});
function p(e, t) {
	let { variant: a = "primary", size: l = "md", iconLeading: u, iconTrailing: p, children: m, className: h, loading: g = !1, loadingAriaLabel: _, disabled: v, "aria-label": y } = e, b = g ? d(_, y, m) : y, x = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].button, _Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"][l], _Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"][a], g && _Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].loading, h), S = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, { children: [g ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].icon, _Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].spinner),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {})
	}) : null, /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].content, g && _Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].contentHidden),
		children: [
			u ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
				className: _Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
				"aria-hidden": "true",
				children: u
			}) : null,
			m == null ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
				className: _Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].label,
				children: m
			}),
			p ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
				className: _Button_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
				"aria-hidden": "true",
				children: p
			}) : null
		]
	})] });
	if (e.href !== void 0) {
		let { variant: n, size: r, iconLeading: i, iconTrailing: a, children: o, className: c, loading: l, loadingAriaLabel: u, disabled: d, "aria-label": p, nativeType: m, ...h } = e;
		return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(f, {
			...h,
			ref: t,
			inert: !!(v || g),
			className: x,
			ariaLabel: b,
			loading: g,
			children: S
		});
	}
	let { variant: C, size: w, iconLeading: T, iconTrailing: E, children: D, className: O, loading: k, loadingAriaLabel: A, disabled: j, "aria-label": M, nativeType: N = "button", onClick: P, href: F, ...I } = e, L = (e) => {
		g ? e.preventDefault() : P?.(e);
	};
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
		...I,
		ref: t,
		type: N,
		disabled: !!(v || g),
		onClick: L,
		className: x,
		...g ? { "aria-busy": !0 } : {},
		...b == null ? {} : { "aria-label": b },
		children: S
	});
}
var m = (0,react__WEBPACK_IMPORTED_MODULE_4__.forwardRef)(function(e, t) {
	return p(e, t);
});
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Button/Button.module.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Button/Button.module.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   button: () => (/* binding */ e),
/* harmony export */   content: () => (/* binding */ n),
/* harmony export */   contentHidden: () => (/* binding */ r),
/* harmony export */   "default": () => (/* binding */ g),
/* harmony export */   ghost: () => (/* binding */ c),
/* harmony export */   icon: () => (/* binding */ a),
/* harmony export */   label: () => (/* binding */ i),
/* harmony export */   lg: () => (/* binding */ f),
/* harmony export */   loading: () => (/* binding */ t),
/* harmony export */   md: () => (/* binding */ d),
/* harmony export */   negative: () => (/* binding */ h),
/* harmony export */   outline: () => (/* binding */ s),
/* harmony export */   primary: () => (/* binding */ p),
/* harmony export */   secondary: () => (/* binding */ m),
/* harmony export */   sm: () => (/* binding */ u),
/* harmony export */   spinner: () => (/* binding */ o),
/* harmony export */   xs: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _assets_base_Button_Button_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Button/Button.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Button/Button.css");
//#region src/base/Button/Button.module.css
var e = "_button_1v2it_10", t = "_loading_1v2it_60", n = "_content_1v2it_64", r = "_contentHidden_1v2it_74", i = "_label_1v2it_74", a = "_icon_1v2it_75", o = "_spinner_1v2it_80", s = "_outline_1v2it_88", c = "_ghost_1v2it_89", l = "_xs_1v2it_137", u = "_sm_1v2it_153", d = "_md_1v2it_169", f = "_lg_1v2it_185", p = "_primary_1v2it_209", m = "_secondary_1v2it_225", h = "_negative_1v2it_288", g = {
	button: e,
	loading: t,
	content: n,
	contentHidden: r,
	label: i,
	icon: a,
	spinner: o,
	outline: s,
	ghost: c,
	"bds-button-spin": "_bds-button-spin_1v2it_1",
	xs: l,
	sm: u,
	md: d,
	lg: f,
	primary: p,
	secondary: m,
	negative: h
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/ButtonGroup/ButtonGroup.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/ButtonGroup/ButtonGroup.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUTTON_GROUP_ORIENTATIONS: () => (/* binding */ i),
/* harmony export */   ButtonGroup: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var _ButtonGroup_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ButtonGroup.module.js */ "./node_modules/@wpengine/bds-react/dist/base/ButtonGroup/ButtonGroup.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");




//#region src/base/ButtonGroup/ButtonGroup.tsx
var i = ["horizontal", "vertical"], a = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function({ children: n, orientation: i = "horizontal", className: a, ...o }, s) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
		...o,
		ref: s,
		role: "group",
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_ButtonGroup_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].group, _ButtonGroup_module_js__WEBPACK_IMPORTED_MODULE_0__["default"][i], a),
		children: n
	});
});
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/ButtonGroup/ButtonGroup.module.js"
/*!**************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/ButtonGroup/ButtonGroup.module.js ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ r),
/* harmony export */   group: () => (/* binding */ e),
/* harmony export */   horizontal: () => (/* binding */ t),
/* harmony export */   vertical: () => (/* binding */ n)
/* harmony export */ });
/* harmony import */ var _assets_base_ButtonGroup_ButtonGroup_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/ButtonGroup/ButtonGroup.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/ButtonGroup/ButtonGroup.css");
//#region src/base/ButtonGroup/ButtonGroup.module.css
var e = "_group_ta3le_14", t = "_horizontal_ta3le_21", n = "_vertical_ta3le_25", r = {
	group: e,
	horizontal: t,
	vertical: n
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Checkbox/Checkbox.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Checkbox/Checkbox.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Checkbox: () => (/* binding */ c),
/* harmony export */   CheckboxGroup: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Checkbox.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Checkbox/Checkbox.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");




//#region src/base/Checkbox/Checkbox.tsx
var c = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function({ label: n, subLabel: c, hint: l, indeterminate: u = !1, wrapperClassName: d, className: f, id: p, ...m }, h) {
	let g = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null), _ = (0,react__WEBPACK_IMPORTED_MODULE_2__.useId)(), v = p ?? _, y = `${v}-hint`;
	(0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
		g.current && (g.current.indeterminate = u);
	}, [u]);
	let b = (e) => {
		g.current = e, typeof h == "function" ? h(e) : h && (h.current = e);
	}, x = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
		...m,
		ref: b,
		id: v,
		type: "checkbox",
		"aria-describedby": [l ? y : null, m["aria-describedby"]].filter(Boolean).join(" ") || void 0,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].checkbox, f)
	});
	return n ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].wrapper, d),
		children: [x, /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
			className: _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].labelText,
			htmlFor: v,
			children: [c ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
				className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].title, _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].titleGroup),
				children: [
					n,
					" ",
					/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
						className: _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].subLabel,
						children: c
					})
				]
			}) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
				className: _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].title,
				children: n
			}), l ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
				className: _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].hint,
				id: y,
				children: l
			}) : null]
		})]
	}) : x;
});
function l({ label: n, hint: r, "aria-label": i, "aria-labelledby": a, children: c, className: l }) {
	let u = {};
	return !n && a ? u = { "aria-labelledby": a } : !n && i && (u = { "aria-label": i }), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("fieldset", {
		...u,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].group, l),
		children: [
			n ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("legend", {
				className: _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].groupLabel,
				children: n
			}) : null,
			r ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
				className: _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].groupHint,
				children: r
			}) : null,
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
				className: _Checkbox_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].groupItems,
				children: c
			})
		]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Checkbox/Checkbox.module.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Checkbox/Checkbox.module.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkbox: () => (/* binding */ e),
/* harmony export */   "default": () => (/* binding */ d),
/* harmony export */   group: () => (/* binding */ s),
/* harmony export */   groupHint: () => (/* binding */ l),
/* harmony export */   groupItems: () => (/* binding */ u),
/* harmony export */   groupLabel: () => (/* binding */ c),
/* harmony export */   hint: () => (/* binding */ o),
/* harmony export */   labelText: () => (/* binding */ n),
/* harmony export */   subLabel: () => (/* binding */ a),
/* harmony export */   title: () => (/* binding */ r),
/* harmony export */   titleGroup: () => (/* binding */ i),
/* harmony export */   wrapper: () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _assets_base_Checkbox_Checkbox_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Checkbox/Checkbox.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Checkbox/Checkbox.css");
//#region src/base/Checkbox/Checkbox.module.css
var e = "_checkbox_g1o08_18", t = "_wrapper_g1o08_131 _wrapper_t1jxf_15", n = "_labelText_g1o08_135 _labelText_t1jxf_21", r = "_title_g1o08_139 _title_t1jxf_28", i = "_titleGroup_g1o08_143", a = "_subLabel_g1o08_151", o = "_hint_g1o08_155 _hint_t1jxf_37", s = "_group_g1o08_159 _group_t1jxf_55", c = "_groupLabel_g1o08_163 _groupLabel_t1jxf_64", l = "_groupHint_g1o08_167 _groupHint_t1jxf_75", u = "_groupItems_g1o08_171 _groupItems_t1jxf_88", d = {
	checkbox: e,
	wrapper: t,
	labelText: n,
	title: r,
	titleGroup: i,
	subLabel: a,
	hint: o,
	group: s,
	groupLabel: c,
	groupHint: l,
	groupItems: u
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/DropdownItem/DropdownItem.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/DropdownItem/DropdownItem.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DROPDOWN_ITEM_TYPES: () => (/* binding */ l),
/* harmony export */   DropdownItem: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var _Checkbox_Checkbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Checkbox/Checkbox.js */ "./node_modules/@wpengine/bds-react/dist/base/Checkbox/Checkbox.js");
/* harmony import */ var _Separator_Separator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Separator/Separator.js */ "./node_modules/@wpengine/bds-react/dist/base/Separator/Separator.js");
/* harmony import */ var _Switch_Switch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Switch/Switch.js */ "./node_modules/@wpengine/bds-react/dist/base/Switch/Switch.js");
/* harmony import */ var _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropdownItem.module.js */ "./node_modules/@wpengine/bds-react/dist/base/DropdownItem/DropdownItem.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/check.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");








//#region src/base/DropdownItem/DropdownItem.tsx
var l = [
	"basic",
	"checkbox",
	"switch",
	"user",
	"divider",
	"group-title"
];
function u({ shown: e }) {
	return e ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
		className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].check,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {})
	}) : null;
}
function d({ type: t, checked: i }) {
	return t === "checkbox" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
		className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].control,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Checkbox_Checkbox_js__WEBPACK_IMPORTED_MODULE_0__.Checkbox, {
			checked: i,
			readOnly: !0,
			tabIndex: -1
		})
	}) : t === "switch" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
		className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].control,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Switch_Switch_js__WEBPACK_IMPORTED_MODULE_2__.Switch, {
			checked: i,
			readOnly: !0,
			tabIndex: -1
		})
	}) : null;
}
var f = (0,react__WEBPACK_IMPORTED_MODULE_6__.forwardRef)(function({ type: e = "basic", children: n, icon: a, highlighted: o = !1, check: l = !1, checked: f = !1, disabled: p = !1, avatar: m, description: h, className: g, ..._ }, v) {
	if (e === "divider") return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
		..._,
		ref: v,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(_DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].divider, g),
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Separator_Separator_js__WEBPACK_IMPORTED_MODULE_1__.Separator, { appearance: "subtle" })
	});
	if (e === "group-title") return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
		..._,
		ref: v,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(_DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].groupTitle, g),
		children: n
	});
	let y = p ? { "data-disabled": "" } : {}, b = (0,clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(_DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].item, e === "user" && _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].user, o && _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].selected, g);
	return e === "user" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
		..._,
		ref: v,
		className: b,
		...y,
		children: [
			m,
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
				className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].userDetails,
				children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
					className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].userName,
					children: n
				}), h ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
					className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].userDescription,
					children: h
				}) : null]
			}),
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(u, { shown: o || l })
		]
	}) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
		..._,
		ref: v,
		className: b,
		...y,
		children: [
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
				className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].wrapper,
				children: [a ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
					className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].icon,
					"aria-hidden": "true",
					children: a
				}) : null, /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
					className: _DropdownItem_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].label,
					children: n
				})]
			}),
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(d, {
				type: e,
				checked: f
			}),
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(u, { shown: o || l })
		]
	});
});
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/DropdownItem/DropdownItem.module.js"
/*!****************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/DropdownItem/DropdownItem.module.js ***!
  \****************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   check: () => (/* binding */ a),
/* harmony export */   control: () => (/* binding */ o),
/* harmony export */   "default": () => (/* binding */ p),
/* harmony export */   divider: () => (/* binding */ d),
/* harmony export */   groupTitle: () => (/* binding */ f),
/* harmony export */   icon: () => (/* binding */ n),
/* harmony export */   item: () => (/* binding */ e),
/* harmony export */   label: () => (/* binding */ i),
/* harmony export */   selected: () => (/* binding */ t),
/* harmony export */   user: () => (/* binding */ s),
/* harmony export */   userDescription: () => (/* binding */ u),
/* harmony export */   userDetails: () => (/* binding */ c),
/* harmony export */   userName: () => (/* binding */ l),
/* harmony export */   wrapper: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var _assets_base_DropdownItem_DropdownItem_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/DropdownItem/DropdownItem.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/DropdownItem/DropdownItem.css");
//#region src/base/DropdownItem/DropdownItem.module.css
var e = "_item_owg1x_17", t = "_selected_owg1x_60", n = "_icon_owg1x_71", r = "_wrapper_owg1x_77", i = "_label_owg1x_101", a = "_check_owg1x_115", o = "_control_owg1x_135", s = "_user_owg1x_146", c = "_userDetails_owg1x_150", l = "_userName_owg1x_159", u = "_userDescription_owg1x_170", d = "_divider_owg1x_186", f = "_groupTitle_owg1x_190", p = {
	item: e,
	selected: t,
	icon: n,
	wrapper: r,
	label: i,
	check: a,
	control: o,
	user: s,
	userDetails: c,
	userName: l,
	userDescription: u,
	divider: d,
	groupTitle: f
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/HintText/HintText.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/HintText/HintText.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HINT_TEXT_SIZES: () => (/* binding */ r),
/* harmony export */   HintText: () => (/* binding */ i)
/* harmony export */ });
/* harmony import */ var _HintText_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HintText.module.js */ "./node_modules/@wpengine/bds-react/dist/base/HintText/HintText.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");



//#region src/base/HintText/HintText.tsx
var r = ["sm", "md"];
function i({ children: r, size: i = "md", className: a, ...o }) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
		...o,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_HintText_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].hint, _HintText_module_js__WEBPACK_IMPORTED_MODULE_0__["default"][i], a),
		children: r
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/HintText/HintText.module.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/HintText/HintText.module.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ r),
/* harmony export */   hint: () => (/* binding */ e),
/* harmony export */   md: () => (/* binding */ n),
/* harmony export */   sm: () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _assets_base_HintText_HintText_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/HintText/HintText.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/HintText/HintText.css");
//#region src/base/HintText/HintText.module.css
var e = "_hint_noggb_3", t = "_sm_noggb_8", n = "_md_noggb_16", r = {
	hint: e,
	sm: t,
	md: n
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/InteractiveIcon/InteractiveIcon.js"
/*!***************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/InteractiveIcon/InteractiveIcon.js ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INTERACTIVE_ICON_SIZES: () => (/* binding */ s),
/* harmony export */   INTERACTIVE_ICON_TYPES: () => (/* binding */ o),
/* harmony export */   InteractiveIcon: () => (/* binding */ c)
/* harmony export */ });
/* harmony import */ var _InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InteractiveIcon.module.js */ "./node_modules/@wpengine/bds-react/dist/base/InteractiveIcon/InteractiveIcon.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/loader-circle.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");





//#region src/base/InteractiveIcon/InteractiveIcon.tsx
var o = ["secondary", "accent"], s = [
	"sm",
	"md",
	"lg"
], c = (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function({ icon: r, label: o, variant: s = "secondary", size: c = "md", loading: l = !1, loadingAriaLabel: u, nativeType: d = "button", className: f, disabled: p, onClick: m, ...h }, g) {
	let _ = l && u != null && u !== "" ? u : o;
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
		...h,
		ref: g,
		type: d,
		disabled: !!(p || l),
		onClick: m,
		"aria-label": _,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].button, _InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__["default"][c], s === "accent" && _InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].accent, l && _InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].loading, f),
		...l ? { "aria-busy": !0 } : {},
		children: [l ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
			className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].icon, _InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].spinner),
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {})
		}) : null, /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
			className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].icon, l && _InteractiveIcon_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].iconHidden),
			"aria-hidden": "true",
			children: r
		})]
	});
});
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/InteractiveIcon/InteractiveIcon.module.js"
/*!**********************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/InteractiveIcon/InteractiveIcon.module.js ***!
  \**********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accent: () => (/* binding */ n),
/* harmony export */   button: () => (/* binding */ e),
/* harmony export */   "default": () => (/* binding */ l),
/* harmony export */   icon: () => (/* binding */ a),
/* harmony export */   iconHidden: () => (/* binding */ r),
/* harmony export */   lg: () => (/* binding */ c),
/* harmony export */   loading: () => (/* binding */ t),
/* harmony export */   md: () => (/* binding */ s),
/* harmony export */   sm: () => (/* binding */ o),
/* harmony export */   spinner: () => (/* binding */ i)
/* harmony export */ });
/* harmony import */ var _assets_base_InteractiveIcon_InteractiveIcon_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/InteractiveIcon/InteractiveIcon.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/InteractiveIcon/InteractiveIcon.css");
//#region src/base/InteractiveIcon/InteractiveIcon.module.css
var e = "_button_28ple_8", t = "_loading_28ple_35", n = "_accent_28ple_40", r = "_iconHidden_28ple_54", i = "_spinner_28ple_59", a = "_icon_28ple_54", o = "_sm_28ple_95", s = "_md_28ple_100", c = "_lg_28ple_105", l = {
	button: e,
	loading: t,
	accent: n,
	iconHidden: r,
	spinner: i,
	"bds-interactive-icon-spin": "_bds-interactive-icon-spin_28ple_1",
	icon: a,
	sm: o,
	md: s,
	lg: c
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Label/Label.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Label/Label.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Label: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var _Label_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Label.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Label/Label.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");



//#region src/base/Label/Label.tsx
function a({ children: a, required: o = !1, subLabel: s, icon: c, className: l, ...u }) {
	let d = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, { children: [
		a,
		o ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
			className: _Label_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].required,
			"aria-hidden": "true",
			children: "*"
		}) : null,
		s ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
			className: _Label_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].subLabel,
			children: s
		}) : null
	] });
	return c ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Label_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].label, l),
		children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
			...u,
			className: _Label_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].group,
			children: d
		}), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
			className: _Label_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].icon,
			children: c
		})]
	}) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
		...u,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Label_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].label, l),
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
			className: _Label_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].group,
			children: d
		})
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Label/Label.module.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Label/Label.module.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ a),
/* harmony export */   group: () => (/* binding */ t),
/* harmony export */   icon: () => (/* binding */ i),
/* harmony export */   label: () => (/* binding */ e),
/* harmony export */   required: () => (/* binding */ n),
/* harmony export */   subLabel: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var _assets_base_Label_Label_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Label/Label.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Label/Label.css");
//#region src/base/Label/Label.module.css
var e = "_label_1caar_9", t = "_group_1caar_21", n = "_required_1caar_27", r = "_subLabel_1caar_31", i = "_icon_1caar_35", a = {
	label: e,
	group: t,
	required: n,
	subLabel: r,
	icon: i
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Link/Link.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Link/Link.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LINK_SIZES: () => (/* binding */ o),
/* harmony export */   Link: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var _router_RouterProvider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../router/RouterProvider.js */ "./node_modules/@wpengine/bds-react/dist/base/router/RouterProvider.js");
/* harmony import */ var _Link_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Link.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Link/Link.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");





//#region src/base/Link/Link.tsx
var o = [
	"sm",
	"md",
	"lg"
], s = (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function({ children: r, size: o = "md", iconLeading: s, iconTrailing: c, disabled: l = !1, href: u, className: d, onClick: f, ...p }, m) {
	let h = (0,_router_RouterProvider_js__WEBPACK_IMPORTED_MODULE_0__.useRouterLink)(l ? void 0 : u, f), g = !l && u !== void 0 ? {
		href: h.href ?? u,
		onClick: h.onClick
	} : {
		...f ? { onClick: f } : {},
		...l ? {
			"aria-disabled": !0,
			tabIndex: -1
		} : {}
	};
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
		...p,
		...g,
		ref: m,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Link_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].link, _Link_module_js__WEBPACK_IMPORTED_MODULE_1__["default"][o], l && _Link_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].disabled, d),
		children: [
			s ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
				className: _Link_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
				"aria-hidden": "true",
				children: s
			}) : null,
			r,
			c ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
				className: _Link_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
				"aria-hidden": "true",
				children: c
			}) : null
		]
	});
});
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Link/Link.module.js"
/*!************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Link/Link.module.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ o),
/* harmony export */   disabled: () => (/* binding */ a),
/* harmony export */   icon: () => (/* binding */ t),
/* harmony export */   lg: () => (/* binding */ i),
/* harmony export */   link: () => (/* binding */ e),
/* harmony export */   md: () => (/* binding */ r),
/* harmony export */   sm: () => (/* binding */ n)
/* harmony export */ });
/* harmony import */ var _assets_base_Link_Link_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Link/Link.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Link/Link.css");
//#region src/base/Link/Link.module.css
var e = "_link_12i3n_13", t = "_icon_12i3n_54", n = "_sm_12i3n_71", r = "_md_12i3n_82", i = "_lg_12i3n_93", a = "_disabled_12i3n_109", o = {
	link: e,
	icon: t,
	sm: n,
	md: r,
	lg: i,
	disabled: a
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/SelectInput/SelectInput.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/SelectInput/SelectInput.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SELECT_INPUT_SIZES: () => (/* binding */ b),
/* harmony export */   SelectInput: () => (/* binding */ D)
/* harmony export */ });
/* harmony import */ var _HintText_HintText_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../HintText/HintText.js */ "./node_modules/@wpengine/bds-react/dist/base/HintText/HintText.js");
/* harmony import */ var _Label_Label_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Label/Label.js */ "./node_modules/@wpengine/bds-react/dist/base/Label/Label.js");
/* harmony import */ var _DropdownItem_DropdownItem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DropdownItem/DropdownItem.js */ "./node_modules/@wpengine/bds-react/dist/base/DropdownItem/DropdownItem.js");
/* harmony import */ var _menu_useInputModality_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../menu/useInputModality.js */ "./node_modules/@wpengine/bds-react/dist/base/menu/useInputModality.js");
/* harmony import */ var _menu_MenuSearch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../menu/MenuSearch.js */ "./node_modules/@wpengine/bds-react/dist/base/menu/MenuSearch.js");
/* harmony import */ var _theme_usePortaledBdsTheme_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../theme/usePortaledBdsTheme.js */ "./node_modules/@wpengine/bds-react/dist/base/theme/usePortaledBdsTheme.js");
/* harmony import */ var _menu_collection_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../menu/collection.js */ "./node_modules/@wpengine/bds-react/dist/base/menu/collection.js");
/* harmony import */ var _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SelectInput.module.js */ "./node_modules/@wpengine/bds-react/dist/base/SelectInput/SelectInput.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-down.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _ark_ui_react_portal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ark-ui/react/portal */ "./node_modules/@ark-ui/react/dist/components/portal/portal.js");
/* harmony import */ var _ark_ui_react_collection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ark-ui/react/collection */ "./node_modules/@ark-ui/react/dist/components/collection/list-collection.js");
/* harmony import */ var _ark_ui_react_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ark-ui/react/select */ "./node_modules/@ark-ui/react/dist/components/select/use-select.js");















//#region src/base/SelectInput/SelectInput.tsx
var b = [
	"sm",
	"md",
	"lg"
];
function x({ rootId: e, triggerId: t, items: n, searchable: r, disabled: i, invalid: a, required: o, name: s, open: l, value: u, defaultValue: d, onValueChange: f, onOpenChange: m }) {
	let h = {
		id: e,
		collection: (0,react__WEBPACK_IMPORTED_MODULE_10__.useMemo)(() => (0,_ark_ui_react_collection__WEBPACK_IMPORTED_MODULE_13__.createListCollection)({
			items: n,
			itemToValue: (e) => e.value,
			itemToString: (e) => e.label,
			isItemDisabled: (e) => e.disabled === !0
		}), [n]),
		composite: !r,
		scrollToIndexFn: _menu_collection_js__WEBPACK_IMPORTED_MODULE_6__.scrollRowIntoList,
		disabled: i,
		invalid: a,
		required: o
	};
	return t !== void 0 && (h.ids = { trigger: t }), s !== void 0 && (h.name = s), l !== void 0 && (h.open = l), u !== void 0 && (h.value = u === null ? [] : [u]), d !== void 0 && (h.defaultValue = [d]), f && (h.onValueChange = (e) => f(e.value[0] ?? null)), m && (h.onOpenChange = (e) => m(e.open)), (0,_ark_ui_react_select__WEBPACK_IMPORTED_MODULE_14__.useSelect)(h);
}
function S(e, t, n) {
	return e ? {} : n ? { "aria-labelledby": n } : t ? {
		"aria-label": t,
		"aria-labelledby": void 0
	} : {};
}
var C = /* @__PURE__ */ new Set([
	" ",
	"Home",
	"End"
]);
function w(e, t) {
	e.nativeEvent.isComposing || C.has(e.key) ? e.stopPropagation() : e.key === "Enter" && !t && (e.preventDefault(), e.stopPropagation());
}
function T({ api: e, search: t }) {
	let n = e.getListProps()["aria-activedescendant"];
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_menu_MenuSearch_js__WEBPACK_IMPORTED_MODULE_4__.MenuSearch, {
		value: t.query,
		onValueChange: t.onQueryChange,
		placeholder: t.placeholder,
		label: t.label,
		clearable: t.clearable,
		clearLabel: t.clearLabel,
		initialFocus: !0,
		inputProps: {
			role: "combobox",
			"aria-expanded": !0,
			"aria-controls": t.listId,
			"aria-autocomplete": "list",
			"aria-activedescendant": n,
			autoComplete: "off",
			onKeyDown: (t) => w(t, e.highlightedValue !== null)
		}
	});
}
function ee(e) {
	return `No results for ‘${e}’`;
}
function E({ api: e, items: t, theme: a, nameProps: o, search: s }) {
	let c = (0,_menu_useInputModality_js__WEBPACK_IMPORTED_MODULE_3__.useInputModality)(), u = s !== null && t.length === 0, d = s ? s.query.trim() : "", f = null;
	return s && u && d && (f = typeof s.emptyMessage == "function" ? s.emptyMessage(d) : s.emptyMessage), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ark_ui_react_portal__WEBPACK_IMPORTED_MODULE_12__.Portal, { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
		"data-bds-theme": a,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
			...e.getPositionerProps(),
			className: _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].positioner,
			children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
				...e.getContentProps(),
				...o,
				[_menu_useInputModality_js__WEBPACK_IMPORTED_MODULE_3__.INPUT_MODALITY_ATTR]: c,
				className: _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].popover,
				children: [
					s ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(T, {
						api: e,
						search: s
					}) : null,
					/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
						...e.getListProps(),
						...s ? {
							id: s.listId,
							...s.listName
						} : {},
						hidden: u,
						className: _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].list,
						children: t.map((t) => {
							let r = e.getItemState({ item: t });
							return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_DropdownItem_DropdownItem_js__WEBPACK_IMPORTED_MODULE_2__.DropdownItem, {
								...e.getItemProps({ item: t }),
								icon: t.icon,
								highlighted: r.selected,
								disabled: r.disabled,
								children: t.label
							}, t.value);
						})
					}),
					s ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("output", {
						className: f ? _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].empty : _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].status,
						children: f
					}) : null
				]
			})
		})
	}) });
}
function D({ items: n, label: r, "aria-label": i, "aria-labelledby": a, subLabel: c, labelIcon: _, hint: v, placeholder: y = "Select an option", size: b = "md", invalid: C = !1, disabled: w = !1, required: T = !1, iconLeading: D, value: O, defaultValue: k, onValueChange: A, open: j, onOpenChange: M, searchable: N = !1, searchPlaceholder: P = "Search...", searchLabel: F = "Search", searchClearable: I = !1, searchClearLabel: L = "Clear search", emptyMessage: R = ee, name: z, id: B, className: V }) {
	let H = (0,react__WEBPACK_IMPORTED_MODULE_10__.useId)(), U = B ?? H, W = `${U}-hint`, [G, K] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(""), q = (0,react__WEBPACK_IMPORTED_MODULE_10__.useMemo)(() => N ? (0,_menu_collection_js__WEBPACK_IMPORTED_MODULE_6__.filterByLabel)(n, G) : n, [
		n,
		G,
		N
	]), J = x({
		rootId: U,
		triggerId: B,
		items: q,
		searchable: N,
		disabled: w,
		invalid: C,
		required: T,
		name: z,
		open: j,
		value: O,
		defaultValue: k,
		onValueChange: A,
		onOpenChange: M
	}), [Y, X] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(J.open);
	J.open !== Y && (X(J.open), K(""));
	let te = (e) => {
		K(e);
		let t = (0,_menu_collection_js__WEBPACK_IMPORTED_MODULE_6__.filterByLabel)(n, e).find((e) => e.disabled !== !0);
		t ? J.setHighlightValue(t.value) : J.clearHighlightValue();
	}, Z = S(r, i, a), ne = N ? {
		query: G,
		listName: r ? { "aria-labelledby": J.getLabelProps().id ?? "" } : Z,
		onQueryChange: te,
		placeholder: P,
		label: F,
		clearable: I,
		clearLabel: L,
		emptyMessage: R,
		listId: `${U}-search-list`
	} : null, Q = J.value[0], $ = Q === void 0 ? void 0 : n.find((e) => e.value === Q), { hostRef: re, theme: ie } = (0,_theme_usePortaledBdsTheme_js__WEBPACK_IMPORTED_MODULE_5__.usePortaledBdsTheme)(J.open);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
		ref: re,
		...J.getRootProps(),
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_8__["default"])(_SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].field, _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"][b], C && _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].invalid, V),
		children: [
			r ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Label_Label_js__WEBPACK_IMPORTED_MODULE_1__.Label, {
				...J.getLabelProps(),
				required: T,
				subLabel: c,
				icon: _,
				children: r
			}) : null,
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("button", {
				...J.getTriggerProps(),
				type: "button",
				className: _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].container,
				...Z,
				...N ? { "aria-haspopup": "dialog" } : {},
				...v ? { "aria-describedby": W } : {},
				children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("span", {
					className: _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].inputContainer,
					children: [
						D ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
							className: _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].icon,
							"aria-hidden": "true",
							children: D
						}) : null,
						/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
							...J.getValueTextProps(),
							className: (0,clsx__WEBPACK_IMPORTED_MODULE_8__["default"])(_SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].value, !$ && _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].placeholder),
							children: $ ? $.label : y
						}),
						/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
							...J.getIndicatorProps(),
							className: _SelectInput_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].indicator,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {})
						})
					]
				})
			}),
			J.open ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(E, {
				api: J,
				items: q,
				theme: ie,
				nameProps: Z,
				search: ne
			}) : null,
			z ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("select", {
				...J.getHiddenSelectProps(),
				children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("option", { value: "" }), n.map((e) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("option", {
					value: e.value,
					children: e.label
				}, e.value))]
			}) : null,
			v ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_HintText_HintText_js__WEBPACK_IMPORTED_MODULE_0__.HintText, {
				id: W,
				size: "sm",
				children: v
			}) : null
		]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/SelectInput/SelectInput.module.js"
/*!**************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/SelectInput/SelectInput.module.js ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   container: () => (/* binding */ a),
/* harmony export */   "default": () => (/* binding */ g),
/* harmony export */   empty: () => (/* binding */ d),
/* harmony export */   field: () => (/* binding */ e),
/* harmony export */   icon: () => (/* binding */ s),
/* harmony export */   indicator: () => (/* binding */ h),
/* harmony export */   inputContainer: () => (/* binding */ o),
/* harmony export */   invalid: () => (/* binding */ i),
/* harmony export */   lg: () => (/* binding */ r),
/* harmony export */   list: () => (/* binding */ u),
/* harmony export */   md: () => (/* binding */ n),
/* harmony export */   placeholder: () => (/* binding */ m),
/* harmony export */   popover: () => (/* binding */ l),
/* harmony export */   positioner: () => (/* binding */ c),
/* harmony export */   sm: () => (/* binding */ t),
/* harmony export */   status: () => (/* binding */ f),
/* harmony export */   value: () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var _assets_base_SelectInput_SelectInput_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/SelectInput/SelectInput.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/SelectInput/SelectInput.css");
//#region src/base/SelectInput/SelectInput.module.css
var e = "_field_199le_16 _field_175b2_16", t = "_sm_199le_20 _sm_175b2_120", n = "_md_199le_24 _md_175b2_129", r = "_lg_199le_28 _lg_175b2_138", i = "_invalid_199le_32 _invalid_175b2_151", a = "_container_199le_36 _container_175b2_22", o = "_inputContainer_199le_45 _inputContainer_175b2_41", s = "_icon_199le_49 _icon_175b2_94", c = "_positioner_199le_53 _positioner_16yb6_26 _fieldWidth_16yb6_133", l = "_popover_199le_57 _popover_16yb6_29", u = "_list_199le_61 _list_16yb6_63 _boundedList_16yb6_118", d = "_empty_199le_72 _empty_16yb6_146", f = "_status_199le_77", p = "_value_199le_82", m = "_placeholder_199le_91", h = "_indicator_199le_95", g = {
	field: e,
	sm: t,
	md: n,
	lg: r,
	invalid: i,
	container: a,
	inputContainer: o,
	icon: s,
	positioner: c,
	popover: l,
	list: u,
	empty: d,
	status: f,
	value: p,
	placeholder: m,
	indicator: h
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Separator/Separator.js"
/*!***************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Separator/Separator.js ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SEPARATOR_STYLES: () => (/* binding */ i),
/* harmony export */   SEPARATOR_TYPES: () => (/* binding */ a),
/* harmony export */   Separator: () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var _Separator_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Separator.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Separator/Separator.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");



//#region src/base/Separator/Separator.tsx
var i = [
	"default",
	"subtle",
	"accent"
], a = [
	"default",
	"label-center",
	"label-left",
	"filled"
];
function o({ appearance: i = "default", type: a = "default", children: o, className: s, ...c }) {
	let l = _Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"][i];
	if (a === "filled") return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
		...c,
		role: "separator",
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].filled, l, s),
		children: o
	});
	if (o == null || o === !1) return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("hr", {
		...c,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].separator, _Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].line, l, s)
	});
	let u = a === "label-center", d = a === "label-left";
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
		...c,
		role: "separator",
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].separator, l, s),
		children: [
			d ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", { className: _Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].line }),
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
				className: u || d ? _Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].label : _Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].slot,
				children: o
			}),
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", { className: _Separator_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].line })
		]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Separator/Separator.module.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Separator/Separator.module.js ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accent: () => (/* binding */ r),
/* harmony export */   "default": () => (/* binding */ s),
/* harmony export */   filled: () => (/* binding */ a),
/* harmony export */   label: () => (/* binding */ i),
/* harmony export */   line: () => (/* binding */ t),
/* harmony export */   separator: () => (/* binding */ e),
/* harmony export */   slot: () => (/* binding */ o),
/* harmony export */   subtle: () => (/* binding */ n)
/* harmony export */ });
/* harmony import */ var _assets_base_Separator_Separator_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Separator/Separator.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Separator/Separator.css");
//#region src/base/Separator/Separator.module.css
var e = "_separator_n09vt_10", t = "_line_n09vt_20", n = "_subtle_n09vt_37", r = "_accent_n09vt_43", i = "_label_n09vt_53", a = "_filled_n09vt_67", o = "_slot_n09vt_81", s = {
	separator: e,
	line: t,
	default: "_default_n09vt_31",
	subtle: n,
	accent: r,
	label: i,
	filled: a,
	slot: o
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Switch/Switch.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Switch/Switch.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SWITCH_SIZES: () => (/* binding */ o),
/* harmony export */   Switch: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var _Switch_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Switch.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Switch/Switch.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");




//#region src/base/Switch/Switch.tsx
var o = [
	"sm",
	"md",
	"lg"
], s = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function({ label: n, hint: o, size: s = "md", wrapperClassName: c, className: l, id: u, ...d }, f) {
	let p = (0,react__WEBPACK_IMPORTED_MODULE_2__.useId)(), m = u ?? p, h = `${m}-hint`, g = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
		...d,
		ref: f,
		id: m,
		type: "checkbox",
		role: "switch",
		"aria-describedby": [o ? h : null, d["aria-describedby"]].filter(Boolean).join(" ") || void 0,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Switch_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].switch, _Switch_module_js__WEBPACK_IMPORTED_MODULE_0__["default"][s], l)
	});
	return n ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Switch_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].wrapper, c),
		children: [g, /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
			className: _Switch_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].labelText,
			htmlFor: m,
			children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
				className: _Switch_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].title,
				children: n
			}), o ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
				className: _Switch_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].hint,
				id: h,
				children: o
			}) : null]
		})]
	}) : g;
});
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Switch/Switch.module.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Switch/Switch.module.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ l),
/* harmony export */   group: () => (/* binding */ s),
/* harmony export */   groupLabel: () => (/* binding */ c),
/* harmony export */   hint: () => (/* binding */ o),
/* harmony export */   labelText: () => (/* binding */ i),
/* harmony export */   lg: () => (/* binding */ n),
/* harmony export */   md: () => (/* binding */ t),
/* harmony export */   sm: () => (/* binding */ e),
/* harmony export */   title: () => (/* binding */ a),
/* harmony export */   wrapper: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var _assets_base_Switch_Switch_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Switch/Switch.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Switch/Switch.css");
//#region src/base/Switch/Switch.module.css
var e = "_sm_xnyjz_100", t = "_md_xnyjz_10", n = "_lg_xnyjz_122", r = "_wrapper_xnyjz_137 _wrapper_t1jxf_15", i = "_labelText_xnyjz_141 _labelText_t1jxf_21", a = "_title_xnyjz_145 _title_t1jxf_28", o = "_hint_xnyjz_149 _hint_t1jxf_37", s = "_group_xnyjz_153 _group_t1jxf_55", c = "_groupLabel_xnyjz_157 _groupLabel_t1jxf_64", l = {
	switch: "_switch_xnyjz_19",
	sm: e,
	md: t,
	lg: n,
	wrapper: r,
	labelText: i,
	title: a,
	hint: o,
	group: s,
	groupLabel: c
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Tabs/Tabs.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Tabs/Tabs.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HORIZONTAL_TAB_STYLES: () => (/* binding */ d),
/* harmony export */   Tab: () => (/* binding */ x),
/* harmony export */   TabLink: () => (/* binding */ w),
/* harmony export */   TabList: () => (/* binding */ y),
/* harmony export */   TabNav: () => (/* binding */ C),
/* harmony export */   TabPanel: () => (/* binding */ S),
/* harmony export */   Tabs: () => (/* binding */ v),
/* harmony export */   VERTICAL_TAB_STYLES: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var _Badge_Badge_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Badge/Badge.js */ "./node_modules/@wpengine/bds-react/dist/base/Badge/Badge.js");
/* harmony import */ var _Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tabs.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Tabs/Tabs.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _ark_ui_react_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ark-ui/react/tabs */ "./node_modules/@ark-ui/react/dist/components/tabs/use-tabs.js");






//#region src/base/Tabs/Tabs.tsx
var d = [
	"line",
	"button",
	"accent"
], f = ["button", "accent"];
function p(e, t) {
	return {
		"data-part": "list",
		"data-orientation": e,
		"data-appearance": t
	};
}
var m = (0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)(null), h = (0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)(null);
function g(e) {
	let t = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(m);
	if (!t) throw Error(`<${e}> must be rendered inside <Tabs>.`);
	return t;
}
function _(e) {
	return g(e).api;
}
function v({ children: e, value: r, defaultValue: i, onValueChange: a, activationMode: s, orientation: l = "horizontal", appearance: d = l === "vertical" ? "button" : "line", className: f, ...p }) {
	let h = (0,_ark_ui_react_tabs__WEBPACK_IMPORTED_MODULE_5__.useTabs)({
		value: r,
		defaultValue: i,
		orientation: l,
		activationMode: s,
		onValueChange: a ? (e) => a(e.value) : void 0
	}), g = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => ({
		api: h,
		appearance: d,
		orientation: l
	}), [
		h,
		d,
		l
	]);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(m.Provider, {
		value: g,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
			...p,
			...h.getRootProps(),
			className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].root, _Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"][l], f),
			children: e
		})
	});
}
function y({ children: e, className: r, "aria-label": i, ...a }) {
	let { api: o, appearance: s, orientation: l } = g("TabList");
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
		...a,
		...o.getListProps(),
		...i === void 0 ? {} : { "aria-label": i },
		...p(l, s),
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].list, r),
		children: e
	});
}
function b({ appearance: n, icon: r, badge: i, children: a }) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, { children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
		className: _Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].content,
		children: [r ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
			"aria-hidden": "true",
			className: _Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
			children: r
		}) : null, /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
			className: _Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].label,
			children: a
		})]
	}), i == null ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, { children: [" ", /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Badge_Badge_js__WEBPACK_IMPORTED_MODULE_0__.Badge, {
		size: "sm",
		radius: "pill",
		stroke: !0,
		color: n === "accent" ? "gray" : "blue",
		children: i
	})] })] });
}
function x({ value: e, children: r, icon: i, badge: a, disabled: o, className: s, ...l }) {
	let { api: u, appearance: d } = g("Tab"), f = {
		value: e,
		...o === void 0 ? {} : { disabled: o }
	};
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
		type: "button",
		...l,
		...u.getTriggerProps(f),
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].tab, s),
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(b, {
			appearance: d,
			icon: i,
			badge: a,
			children: r
		})
	});
}
function S({ value: e, children: r, className: i, ...a }) {
	let o = _("TabPanel");
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
		...a,
		...o.getContentProps({ value: e }),
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].panel, i),
		children: r
	});
}
function C({ children: e, orientation: r = "horizontal", appearance: i = r === "vertical" ? "button" : "line", className: a, ...o }) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(h.Provider, {
		value: i,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("nav", {
			...o,
			className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].root, _Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"][r], a),
			children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("ul", {
				...p(r, i),
				className: _Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].list,
				children: e
			})
		})
	});
}
var w = (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function({ children: e, current: r = !1, icon: i, badge: o, className: s, ...l }, u) {
	let d = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(h);
	if (!d) throw Error("<TabLink> must be rendered inside <TabNav>.");
	let f = r ? {
		"aria-current": "page",
		"data-selected": ""
	} : {};
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
		className: _Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].item,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
			...l,
			...f,
			ref: u,
			className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tabs_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].tab, s),
			children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(b, {
				appearance: d,
				icon: i,
				badge: o,
				children: e
			})
		})
	});
});
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Tabs/Tabs.module.js"
/*!************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Tabs/Tabs.module.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   content: () => (/* binding */ o),
/* harmony export */   "default": () => (/* binding */ u),
/* harmony export */   horizontal: () => (/* binding */ t),
/* harmony export */   icon: () => (/* binding */ s),
/* harmony export */   item: () => (/* binding */ i),
/* harmony export */   label: () => (/* binding */ c),
/* harmony export */   list: () => (/* binding */ r),
/* harmony export */   panel: () => (/* binding */ l),
/* harmony export */   root: () => (/* binding */ e),
/* harmony export */   tab: () => (/* binding */ a),
/* harmony export */   vertical: () => (/* binding */ n)
/* harmony export */ });
/* harmony import */ var _assets_base_Tabs_Tabs_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Tabs/Tabs.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Tabs/Tabs.css");
//#region src/base/Tabs/Tabs.module.css
var e = "_root_1opws_12", t = "_horizontal_1opws_16", n = "_vertical_1opws_20", r = "_list_1opws_24", i = "_item_1opws_48", a = "_tab_1opws_60", o = "_content_1opws_127", s = "_icon_1opws_133", c = "_label_1opws_150", l = "_panel_1opws_286", u = {
	root: e,
	horizontal: t,
	vertical: n,
	list: r,
	item: i,
	tab: a,
	content: o,
	icon: s,
	label: c,
	panel: l
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/TextInput/TextInput.js"
/*!***************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/TextInput/TextInput.js ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TEXT_INPUT_SIZES: () => (/* binding */ c),
/* harmony export */   TextInput: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _HintText_HintText_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../HintText/HintText.js */ "./node_modules/@wpengine/bds-react/dist/base/HintText/HintText.js");
/* harmony import */ var _Label_Label_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Label/Label.js */ "./node_modules/@wpengine/bds-react/dist/base/Label/Label.js");
/* harmony import */ var _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextInput.module.js */ "./node_modules/@wpengine/bds-react/dist/base/TextInput/TextInput.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");






//#region src/base/TextInput/TextInput.tsx
var c = [
	"sm",
	"md",
	"lg"
], l = (0,react__WEBPACK_IMPORTED_MODULE_4__.forwardRef)(function({ label: i, subLabel: c, labelIcon: l, hint: u, size: d = "md", invalid: f = !1, prefix: p, suffix: m, iconLeading: h, iconTrailing: g, fieldClassName: _, className: v, id: y, required: b, "aria-describedby": x, ...S }, C) {
	let w = (0,react__WEBPACK_IMPORTED_MODULE_4__.useId)(), T = y ?? w, E = `${T}-hint`, D = [u ? E : null, x].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(_TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].field, _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"][d], f && _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].invalid, _),
		children: [
			i ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Label_Label_js__WEBPACK_IMPORTED_MODULE_1__.Label, {
				htmlFor: T,
				required: b ?? !1,
				subLabel: c,
				icon: l,
				children: i
			}) : null,
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
				className: _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].container,
				children: [
					p ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
						className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(_TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].affix, _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].prefix),
						children: p
					}) : null,
					/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
						className: _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].inputContainer,
						children: [
							h ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
								className: _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].icon,
								"aria-hidden": "true",
								children: h
							}) : null,
							/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
								...S,
								ref: C,
								id: T,
								required: b,
								"aria-invalid": f || void 0,
								"aria-describedby": D,
								className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(_TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].input, v)
							}),
							g ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
								className: _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].icon,
								"aria-hidden": "true",
								children: g
							}) : null
						]
					}),
					m ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
						className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(_TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].affix, _TextInput_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].suffix),
						children: m
					}) : null
				]
			}),
			u ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_HintText_HintText_js__WEBPACK_IMPORTED_MODULE_0__.HintText, {
				id: E,
				size: "sm",
				children: u
			}) : null
		]
	});
});
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/TextInput/TextInput.module.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/TextInput/TextInput.module.js ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   affix: () => (/* binding */ l),
/* harmony export */   container: () => (/* binding */ a),
/* harmony export */   "default": () => (/* binding */ f),
/* harmony export */   field: () => (/* binding */ e),
/* harmony export */   icon: () => (/* binding */ c),
/* harmony export */   input: () => (/* binding */ s),
/* harmony export */   inputContainer: () => (/* binding */ o),
/* harmony export */   invalid: () => (/* binding */ i),
/* harmony export */   lg: () => (/* binding */ r),
/* harmony export */   md: () => (/* binding */ n),
/* harmony export */   prefix: () => (/* binding */ u),
/* harmony export */   sm: () => (/* binding */ t),
/* harmony export */   suffix: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var _assets_base_TextInput_TextInput_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/TextInput/TextInput.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/TextInput/TextInput.css");
//#region src/base/TextInput/TextInput.module.css
var e = "_field_etinw_9 _field_175b2_16", t = "_sm_etinw_13 _sm_175b2_120", n = "_md_etinw_17 _md_175b2_129", r = "_lg_etinw_21 _lg_175b2_138", i = "_invalid_etinw_25 _invalid_175b2_151", a = "_container_etinw_29 _container_175b2_22", o = "_inputContainer_etinw_33 _inputContainer_175b2_41", s = "_input_etinw_33 _control_175b2_50", c = "_icon_etinw_41 _icon_175b2_94", l = "_affix_etinw_51", u = "_prefix_etinw_66", d = "_suffix_etinw_71", f = {
	field: e,
	sm: t,
	md: n,
	lg: r,
	invalid: i,
	container: a,
	inputContainer: o,
	input: s,
	icon: c,
	affix: l,
	prefix: u,
	suffix: d
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Toast/Toast.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Toast/Toast.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TOAST_TYPES: () => (/* binding */ u),
/* harmony export */   Toast: () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var _InteractiveIcon_InteractiveIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../InteractiveIcon/InteractiveIcon.js */ "./node_modules/@wpengine/bds-react/dist/base/InteractiveIcon/InteractiveIcon.js");
/* harmony import */ var _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toast.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Toast/Toast.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-x.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/sparkles.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");





//#region src/base/Toast/Toast.tsx
var u = [
	"info",
	"neutral",
	"negative",
	"positive",
	"warning"
], d = {
	info: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {}),
	neutral: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {}),
	negative: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
	positive: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {}),
	warning: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {})
}, f = {
	info: "status",
	neutral: "status",
	negative: "alert",
	positive: "status",
	warning: "status"
};
function p({ type: r = "info", title: i, children: a, showIcon: o = !0, actions: u, onDismiss: p, dismissLabel: m = "Dismiss", className: h, ...g }) {
	let _ = !a && !u;
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
		role: f[r],
		...g,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].toast, _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"][r], _ && _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].titleOnly, h),
		children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
			className: _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].content,
			children: [o ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
				className: _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].iconBox,
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
					className: _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
					children: d[r]
				})
			}) : null, /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
				className: _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].body,
				children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
					className: _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].copy,
					children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
						className: _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].title,
						children: i
					}), a ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
						className: _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].message,
						children: a
					}) : null]
				}), u]
			})]
		}), p ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_InteractiveIcon_InteractiveIcon_js__WEBPACK_IMPORTED_MODULE_0__.InteractiveIcon, {
			icon: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {}),
			label: m,
			size: "sm",
			onClick: p,
			className: _Toast_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].close
		}) : null]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Toast/Toast.module.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Toast/Toast.module.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   body: () => (/* binding */ i),
/* harmony export */   close: () => (/* binding */ l),
/* harmony export */   content: () => (/* binding */ t),
/* harmony export */   copy: () => (/* binding */ a),
/* harmony export */   "default": () => (/* binding */ h),
/* harmony export */   icon: () => (/* binding */ r),
/* harmony export */   iconBox: () => (/* binding */ n),
/* harmony export */   info: () => (/* binding */ u),
/* harmony export */   message: () => (/* binding */ s),
/* harmony export */   negative: () => (/* binding */ f),
/* harmony export */   neutral: () => (/* binding */ d),
/* harmony export */   positive: () => (/* binding */ p),
/* harmony export */   title: () => (/* binding */ o),
/* harmony export */   titleOnly: () => (/* binding */ c),
/* harmony export */   toast: () => (/* binding */ e),
/* harmony export */   warning: () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var _assets_base_Toast_Toast_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Toast/Toast.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Toast/Toast.css");
//#region src/base/Toast/Toast.module.css
var e = "_toast_zziwk_18", t = "_content_zziwk_30", n = "_iconBox_zziwk_42", r = "_icon_zziwk_42", i = "_body_zziwk_74", a = "_copy_zziwk_83", o = "_title_zziwk_90", s = "_message_zziwk_99", c = "_titleOnly_zziwk_113", l = "_close_zziwk_120", u = "_info_zziwk_128", d = "_neutral_zziwk_136", f = "_negative_zziwk_142", p = "_positive_zziwk_148", m = "_warning_zziwk_154", h = {
	toast: e,
	content: t,
	iconBox: n,
	icon: r,
	body: i,
	copy: a,
	title: o,
	message: s,
	titleOnly: c,
	close: l,
	info: u,
	neutral: d,
	negative: f,
	positive: p,
	warning: m
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Tooltip/Tooltip.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Tooltip/Tooltip.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TOOLTIP_APPEARANCES: () => (/* binding */ s),
/* harmony export */   TOOLTIP_ARROWS: () => (/* binding */ o),
/* harmony export */   TOOLTIP_PLACEMENTS: () => (/* binding */ c),
/* harmony export */   Tooltip: () => (/* binding */ u)
/* harmony export */ });
/* harmony import */ var _Tooltip_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tooltip.module.js */ "./node_modules/@wpengine/bds-react/dist/base/Tooltip/Tooltip.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _ark_ui_react_portal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ark-ui/react/portal */ "./node_modules/@ark-ui/react/dist/components/portal/portal.js");
/* harmony import */ var _ark_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ark-ui/react/tooltip */ "./node_modules/@ark-ui/react/dist/components/tooltip/tooltip.js");





//#region src/base/Tooltip/Tooltip.tsx
var o = [
	"none",
	"bottom-left",
	"bottom-center",
	"bottom-right",
	"top-left",
	"top-center",
	"top-right",
	"left",
	"right"
], s = ["default", "subtle"], c = [
	"top",
	"top-start",
	"top-end",
	"bottom",
	"bottom-start",
	"bottom-end",
	"left",
	"right"
], l = {
	none: "top",
	"bottom-left": "top-start",
	"bottom-center": "top",
	"bottom-right": "top-end",
	"top-left": "bottom-start",
	"top-center": "bottom",
	"top-right": "bottom-end",
	left: "right",
	right: "left"
};
function u({ content: o, children: s, arrow: c = "none", placement: u, appearance: d = "default", openDelay: f, closeDelay: p, className: m }) {
	let h = c === "none" && u ? u : l[c];
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_ark_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__.tooltip_exports.Root, {
		positioning: { placement: h },
		...f === void 0 ? {} : { openDelay: f },
		...p === void 0 ? {} : { closeDelay: p },
		children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ark_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__.tooltip_exports.Trigger, {
			asChild: !0,
			children: s
		}), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ark_ui_react_portal__WEBPACK_IMPORTED_MODULE_3__.Portal, { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ark_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__.tooltip_exports.Positioner, {
			className: _Tooltip_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].positioner,
			"data-bds-tooltip-positioner": "",
			children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_ark_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__.tooltip_exports.Content, {
				className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Tooltip_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].content, _Tooltip_module_js__WEBPACK_IMPORTED_MODULE_0__["default"][d], m),
				children: [c === "none" ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ark_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__.tooltip_exports.Arrow, {
					className: _Tooltip_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].arrow,
					children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ark_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__.tooltip_exports.ArrowTip, { className: _Tooltip_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].arrowTip })
				}), o]
			})
		}) })]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/Tooltip/Tooltip.module.js"
/*!******************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/Tooltip/Tooltip.module.js ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrowTip: () => (/* binding */ n),
/* harmony export */   content: () => (/* binding */ t),
/* harmony export */   "default": () => (/* binding */ i),
/* harmony export */   positioner: () => (/* binding */ e),
/* harmony export */   subtle: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var _assets_base_Tooltip_Tooltip_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/Tooltip/Tooltip.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/Tooltip/Tooltip.css");
//#region src/base/Tooltip/Tooltip.module.css
var e = "_positioner_1i3tc_15", t = "_content_1i3tc_25", n = "_arrowTip_1i3tc_107", r = "_subtle_1i3tc_121", i = {
	positioner: e,
	content: t,
	arrowTip: n,
	default: "_default_1i3tc_116",
	subtle: r
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/menu/MenuSearch.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/menu/MenuSearch.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MenuSearch: () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var _menu_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.module.js */ "./node_modules/@wpengine/bds-react/dist/base/menu/menu.module.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/search.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");




//#region src/base/menu/MenuSearch.tsx
function o({ value: o, onValueChange: s, placeholder: c, label: l, clearable: u, clearLabel: d, initialFocus: f = !1, inputProps: p }) {
	let m = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null), h = o === void 0 ? {} : { value: o }, g = f ? { "data-autofocus": "" } : {}, _ = (e) => {
		(e.key === "Enter" || e.key === " ") && e.stopPropagation();
	};
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
		className: _menu_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].search,
		children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
			className: _menu_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].searchWrapper,
			children: [
				/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
					className: _menu_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].searchIcon,
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {})
				}),
				/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
					...p,
					ref: m,
					type: "text",
					className: _menu_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].searchInput,
					placeholder: c,
					"aria-label": l,
					...g,
					...h,
					onChange: (e) => s?.(e.target.value)
				}),
				u ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
					type: "button",
					className: _menu_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].searchClear,
					"aria-label": d,
					onKeyDown: _,
					onClick: () => {
						s?.(""), m.current?.focus();
					},
					children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], { "aria-hidden": "true" })
				}) : null
			]
		})
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/menu/collection.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/menu/collection.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterByLabel: () => (/* binding */ e),
/* harmony export */   scrollRowIntoList: () => (/* binding */ t)
/* harmony export */ });
//#region src/base/menu/collection.ts
function e(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n)) : e;
}
function t({ getElement: e }) {
	let t = e();
	typeof t?.scrollIntoView == "function" && t.scrollIntoView({ block: "nearest" });
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/menu/menu.module.js"
/*!************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/menu/menu.module.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   boundedList: () => (/* binding */ r),
/* harmony export */   "default": () => (/* binding */ d),
/* harmony export */   empty: () => (/* binding */ a),
/* harmony export */   fieldWidth: () => (/* binding */ i),
/* harmony export */   list: () => (/* binding */ n),
/* harmony export */   popover: () => (/* binding */ t),
/* harmony export */   positioner: () => (/* binding */ e),
/* harmony export */   search: () => (/* binding */ o),
/* harmony export */   searchClear: () => (/* binding */ u),
/* harmony export */   searchIcon: () => (/* binding */ c),
/* harmony export */   searchInput: () => (/* binding */ l),
/* harmony export */   searchWrapper: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var _assets_base_menu_menu_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/base/menu/menu.css */ "./node_modules/@wpengine/bds-react/dist/assets/base/menu/menu.css");
//#region src/base/menu/menu.module.css
var e = "_positioner_16yb6_26", t = "_popover_16yb6_29", n = "_list_16yb6_63", r = "_boundedList_16yb6_118", i = "_fieldWidth_16yb6_133", a = "_empty_16yb6_146", o = "_search_16yb6_165", s = "_searchWrapper_16yb6_174", c = "_searchIcon_16yb6_188", l = "_searchInput_16yb6_211", u = "_searchClear_16yb6_267", d = {
	positioner: e,
	popover: t,
	list: n,
	boundedList: r,
	fieldWidth: i,
	empty: a,
	search: o,
	searchWrapper: s,
	searchIcon: c,
	searchInput: l,
	searchClear: u
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/menu/useInputModality.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/menu/useInputModality.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INPUT_MODALITY_ATTR: () => (/* binding */ t),
/* harmony export */   currentInputModality: () => (/* binding */ p),
/* harmony export */   useInputModality: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

//#region src/base/menu/useInputModality.ts
var t = "data-bds-nav", n = "pointer", r = /* @__PURE__ */ new Set();
function i(e) {
	if (e !== n) {
		n = e;
		for (let e of r) e();
	}
}
var a = /* @__PURE__ */ new Set([
	"Tab",
	"ArrowUp",
	"ArrowDown",
	"PageUp",
	"PageDown"
]);
function o(e) {
	return e instanceof HTMLElement ? e.isContentEditable || e instanceof HTMLTextAreaElement ? !0 : e instanceof HTMLInputElement && ![
		"checkbox",
		"radio",
		"button",
		"submit",
		"reset"
	].includes(e.type) : !1;
}
function s(e) {
	e.metaKey || e.altKey || e.ctrlKey || (!o(e.target) || a.has(e.key)) && i("keyboard");
}
function c() {
	i("pointer");
}
function l() {
	return (0,react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore)(u, d, f);
}
function u(e) {
	return r.size === 0 && (document.addEventListener("keydown", s, !0), document.addEventListener("pointerdown", c, !0), document.addEventListener("pointermove", c, !0)), r.add(e), () => {
		r.delete(e), r.size === 0 && (document.removeEventListener("keydown", s, !0), document.removeEventListener("pointerdown", c, !0), document.removeEventListener("pointermove", c, !0));
	};
}
function d() {
	return n;
}
function f() {
	return "pointer";
}
function p() {
	return n;
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/router/RouterProvider.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/router/RouterProvider.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RouterProvider: () => (/* binding */ o),
/* harmony export */   isAppPath: () => (/* binding */ c),
/* harmony export */   isRouterNavigableClick: () => (/* binding */ s),
/* harmony export */   linkRel: () => (/* binding */ l),
/* harmony export */   useRouterLink: () => (/* binding */ u)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");


//#region src/base/router/RouterProvider.tsx
var i = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
function a(e) {
	return e;
}
function o({ navigate: e, resolveHref: t = a, children: o }) {
	let s = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
		navigate: e,
		resolveHref: t
	}), [e, t]);
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(i.Provider, {
		value: s,
		children: o
	});
}
function s(e) {
	if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return !1;
	let t = e.currentTarget, n = t.getAttribute("target");
	if (n != null && n !== "" && n !== "_self" || t.hasAttribute("download") || !t.hasAttribute("href")) return !1;
	try {
		return new URL(t.href).origin === globalThis.location.origin;
	} catch {
		return !1;
	}
}
function c(e) {
	return e.startsWith("/") && !e.startsWith("//");
}
function l(e, t) {
	return t ?? (e === "_blank" ? "noopener noreferrer" : void 0);
}
function u(e, n) {
	let r = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(i), a = r != null && e !== void 0 && c(e) ? {
		router: r,
		href: e
	} : null;
	return {
		href: a ? a.router.resolveHref(a.href) : e,
		onClick: (e) => {
			n?.(e), a != null && s(e) && (e.preventDefault(), a.router.navigate(a.href));
		}
	};
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/base/theme/usePortaledBdsTheme.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/base/theme/usePortaledBdsTheme.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePortaledBdsTheme: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

//#region src/base/theme/usePortaledBdsTheme.ts
function r(r, i) {
	let a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null), [o, s] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(void 0);
	return (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
		let e = () => {
			let e = a.current?.closest("[data-bds-theme]"), t = e instanceof HTMLElement && e.dataset.bdsTheme || void 0;
			s((e) => e === t ? e : t);
		};
		if (e(), !r) return;
		let t = a.current?.closest("[data-bds-theme]");
		if (!(t instanceof HTMLElement)) return;
		let n = new MutationObserver(e);
		return n.observe(t, {
			attributes: !0,
			attributeFilter: ["data-bds-theme"]
		}), () => n.disconnect();
	}, [r]), {
		hostRef: a,
		theme: i ?? o
	};
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/engineering/Toaster/Toaster.js"
/*!******************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/engineering/Toaster/Toaster.js ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TOASTER_TYPES: () => (/* binding */ s),
/* harmony export */   Toaster: () => (/* binding */ p),
/* harmony export */   createBdsToaster: () => (/* binding */ m),
/* harmony export */   createToaster: () => (/* reexport safe */ _ark_ui_react_toast__WEBPACK_IMPORTED_MODULE_3__.createToaster)
/* harmony export */ });
/* harmony import */ var _base_Toast_Toast_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/Toast/Toast.js */ "./node_modules/@wpengine/bds-react/dist/base/Toast/Toast.js");
/* harmony import */ var _Toaster_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toaster.module.js */ "./node_modules/@wpengine/bds-react/dist/engineering/Toaster/Toaster.module.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _ark_ui_react_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ark-ui/react/toast */ "./node_modules/@ark-ui/react/dist/components/toast/create-toaster.js");
/* harmony import */ var _ark_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ark-ui/react/toast */ "./node_modules/@ark-ui/react/dist/components/toast/toaster.js");
/* harmony import */ var _ark_ui_react_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ark-ui/react/toast */ "./node_modules/@ark-ui/react/dist/components/toast/toast.js");




//#region src/engineering/Toaster/Toaster.tsx
var s = [
	"neutral",
	"info",
	"positive",
	"warning",
	"negative"
], c = {
	neutral: "info",
	info: "info",
	positive: "success",
	warning: "warning",
	negative: "error"
}, l = {
	info: "info",
	success: "positive",
	warning: "warning",
	error: "negative"
};
function u(e) {
	switch (e) {
		case "positive": return "positive";
		case "warning": return "warning";
		case "negative": return "negative";
		case "neutral": return "neutral";
		default: return "info";
	}
}
function d(e) {
	let t = e.meta;
	if (t?.bdsType) return u(t.bdsType);
	let n = e.type;
	return n ? l[n] ?? "info" : "info";
}
function f(e) {
	return typeof e == "string" ? e : "";
}
function p({ toaster: a }) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ark_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Toaster, {
		toaster: a,
		className: _Toaster_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].toaster,
		children: (i) => {
			let o = i.closable === !1 ? {} : { onDismiss: () => a.dismiss(i.id) };
			return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ark_ui_react_toast__WEBPACK_IMPORTED_MODULE_5__.toast_exports.Root, {
				className: _Toaster_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].toast,
				children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_base_Toast_Toast_js__WEBPACK_IMPORTED_MODULE_0__.Toast, {
					type: d(i),
					title: f(i.title),
					...o,
					children: i.description
				})
			}, i.id);
		}
	});
}
function m(e = {}) {
	let t = (0,_ark_ui_react_toast__WEBPACK_IMPORTED_MODULE_3__.createToaster)({
		placement: "bottom-end",
		duration: 5e3,
		overlap: !0,
		gap: 16,
		...e
	}), n = t.create.bind(t);
	return Object.assign(t, { create: (e) => {
		let t = e.type ?? "info", r = e.duration ?? (t === "negative" ? 999999999 : void 0);
		return n({
			title: e.title,
			description: e.description,
			type: c[t],
			meta: { bdsType: t },
			closable: e.closable ?? !0,
			...r === void 0 ? {} : { duration: r }
		});
	} });
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-react/dist/engineering/Toaster/Toaster.module.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-react/dist/engineering/Toaster/Toaster.module.js ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ n),
/* harmony export */   toast: () => (/* binding */ t),
/* harmony export */   toaster: () => (/* binding */ e)
/* harmony export */ });
/* harmony import */ var _assets_engineering_Toaster_Toaster_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/engineering/Toaster/Toaster.css */ "./node_modules/@wpengine/bds-react/dist/assets/engineering/Toaster/Toaster.css");
//#region src/engineering/Toaster/Toaster.module.css
var e = "_toaster_1d8k3_4", t = "_toast_1d8k3_4", n = {
	toaster: e,
	toast: t
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Page/Page.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Page/Page.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Page: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var _Page_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page.module.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Page/Page.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");



//#region src/wordpress/Page/Page.tsx
function r({ headerComponent: r, tabs: i, children: a, className: o, ...s }) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_Page_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].page, o),
		...s,
		children: [
			r,
			i,
			i ? null : a
		]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Page/Page.module.js"
/*!***************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Page/Page.module.js ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ t),
/* harmony export */   page: () => (/* binding */ e)
/* harmony export */ });
/* harmony import */ var _assets_wordpress_Page_Page_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/wordpress/Page/Page.css */ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/Page/Page.css");
//#region src/wordpress/Page/Page.module.css
var e = "_page_fiehy_8", t = { page: e };
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageContent/PageContent.js"
/*!**********************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageContent/PageContent.js ***!
  \**********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PAGE_SHELL_GAP: () => (/* reexport safe */ _layoutShell_layoutShell_js__WEBPACK_IMPORTED_MODULE_1__.PAGE_SHELL_GAP),
/* harmony export */   PAGE_SHELL_PADDING: () => (/* reexport safe */ _layoutShell_layoutShell_js__WEBPACK_IMPORTED_MODULE_1__.PAGE_SHELL_PADDING),
/* harmony export */   PageContent: () => (/* binding */ s),
/* harmony export */   PageContentMain: () => (/* binding */ a),
/* harmony export */   PageContentSidebar: () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var _PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageContent.module.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageContent/PageContent.module.js");
/* harmony import */ var _layoutShell_layoutShell_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layoutShell/layoutShell.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/layoutShell/layoutShell.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");




//#region src/wordpress/PageContent/PageContent.tsx
function a({ children: t, className: n, gap: a = "default", ...o }) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].main, a === "none" && _PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].mainGapNone, n),
		...o,
		children: t
	});
}
function o({ children: t, className: n, gap: a = "default", ...o }) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].sidebar, a === "none" && _PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].sidebarGapNone, n),
		...o,
		children: t
	});
}
var s = (({ children: t, className: n, padding: a = "default", paddingTop: o = "default", ...s }) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
	className: _PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].container,
	children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].content, a === "none" && _PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].contentPaddingNone, o === "none" && _PageContent_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].contentPaddingTopNone, n),
		...s,
		children: t
	})
}));
s.Main = a, s.Sidebar = o;
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageContent/PageContent.module.js"
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageContent/PageContent.module.js ***!
  \*****************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   container: () => (/* binding */ e),
/* harmony export */   content: () => (/* binding */ t),
/* harmony export */   contentPaddingNone: () => (/* binding */ r),
/* harmony export */   contentPaddingTopNone: () => (/* binding */ n),
/* harmony export */   "default": () => (/* binding */ c),
/* harmony export */   main: () => (/* binding */ i),
/* harmony export */   mainGapNone: () => (/* binding */ a),
/* harmony export */   sidebar: () => (/* binding */ o),
/* harmony export */   sidebarGapNone: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var _assets_wordpress_PageContent_PageContent_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/wordpress/PageContent/PageContent.css */ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/PageContent/PageContent.css");
//#region src/wordpress/PageContent/PageContent.module.css
var e = "_container_13umx_5", t = "_content_13umx_12", n = "_contentPaddingTopNone_13umx_27", r = "_contentPaddingNone_13umx_31", i = "_main_13umx_52", a = "_mainGapNone_13umx_61", o = "_sidebar_13umx_65", s = "_sidebarGapNone_13umx_77", c = {
	container: e,
	content: t,
	contentPaddingTopNone: n,
	contentPaddingNone: r,
	main: i,
	mainGapNone: a,
	sidebar: o,
	sidebarGapNone: s
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageHeader/PageHeader.js"
/*!********************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageHeader/PageHeader.js ***!
  \********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PAGE_HEADER_HEADING_LEVELS: () => (/* binding */ o),
/* harmony export */   PageHeader: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var _PageHeader_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageHeader.module.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageHeader/PageHeader.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _wpengine_bds_react_base_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wpengine/bds-react/base/ButtonGroup */ "./node_modules/@wpengine/bds-react/dist/base/ButtonGroup/ButtonGroup.js");





//#region src/wordpress/PageHeader/PageHeader.tsx
var o = [
	1,
	2,
	3
];
function s({ title: o, actions: s, badge: c, navigation: l, headingLevel: u = 1, className: d, ...f }) {
	let p = l != null && l !== !1;
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("header", {
		...f,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_PageHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].header, d),
		children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
			className: _PageHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].content,
			children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
				className: _PageHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].titleContainer,
				children: [(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(`h${u}`, { className: _PageHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].title }, o), c ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
					className: _PageHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].badge,
					children: c
				}) : null]
			}), s ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wpengine_bds_react_base_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, {
				className: _PageHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].actions,
				children: s
			}) : null]
		}), p ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
			className: _PageHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].navigation,
			children: l
		}) : null]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageHeader/PageHeader.module.js"
/*!***************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/PageHeader/PageHeader.module.js ***!
  \***************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actions: () => (/* binding */ a),
/* harmony export */   badge: () => (/* binding */ o),
/* harmony export */   content: () => (/* binding */ t),
/* harmony export */   "default": () => (/* binding */ s),
/* harmony export */   header: () => (/* binding */ e),
/* harmony export */   navigation: () => (/* binding */ n),
/* harmony export */   title: () => (/* binding */ i),
/* harmony export */   titleContainer: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var _assets_wordpress_PageHeader_PageHeader_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/wordpress/PageHeader/PageHeader.css */ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/PageHeader/PageHeader.css");
//#region src/wordpress/PageHeader/PageHeader.module.css
var e = "_header_xuikp_13", t = "_content_xuikp_25", n = "_navigation_xuikp_48", r = "_titleContainer_xuikp_60", i = "_title_xuikp_60", a = "_actions_xuikp_78", o = "_badge_xuikp_82", s = {
	header: e,
	content: t,
	navigation: n,
	titleContainer: r,
	title: i,
	actions: a,
	badge: o
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Section/Section.js"
/*!**************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Section/Section.js ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SECTION_PADDINGS: () => (/* binding */ o),
/* harmony export */   Section: () => (/* binding */ c)
/* harmony export */ });
/* harmony import */ var _SectionHeader_SectionHeader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SectionHeader/SectionHeader.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionHeader/SectionHeader.js");
/* harmony import */ var _Section_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Section.module.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Section/Section.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _ark_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ark-ui/react/collapsible */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible.js");





//#region src/wordpress/Section/Section.tsx
var o = [
	"none",
	"lg",
	"md"
], s = {
	none: _Section_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].contentNone,
	lg: _Section_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].contentLg,
	md: _Section_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].contentMd
};
function c({ children: o, padding: c = "none", header: l, title: u, iconLeading: d, infoTip: f, action: p, collapsible: m = !1, defaultOpen: h = !0, open: g, onOpenChange: _, className: v, ...y }) {
	let b = l !== !1 && (l != null || u != null || d != null || f != null || p != null || m), x = l === !1 ? null : l ?? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_SectionHeader_SectionHeader_js__WEBPACK_IMPORTED_MODULE_0__.SectionHeader, {
		title: u,
		iconLeading: d,
		infoTip: f,
		action: p,
		collapsible: m
	}), S = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Section_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].content, s[c]),
		children: o
	}), C = m ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ark_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_4__.collapsible_exports.Content, { children: S }) : S, w = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("section", {
		...y,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(_Section_module_js__WEBPACK_IMPORTED_MODULE_1__["default"].section, v),
		children: [b ? x : null, C]
	});
	return m ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ark_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_4__.collapsible_exports.Root, {
		defaultOpen: g === void 0 ? h : void 0,
		open: g,
		onOpenChange: (e) => _?.(e.open),
		children: w
	}) : w;
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Section/Section.module.js"
/*!*********************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/Section/Section.module.js ***!
  \*********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   content: () => (/* binding */ t),
/* harmony export */   contentLg: () => (/* binding */ n),
/* harmony export */   contentMd: () => (/* binding */ r),
/* harmony export */   contentNone: () => (/* binding */ i),
/* harmony export */   "default": () => (/* binding */ a),
/* harmony export */   section: () => (/* binding */ e)
/* harmony export */ });
/* harmony import */ var _assets_wordpress_Section_Section_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/wordpress/Section/Section.css */ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/Section/Section.css");
//#region src/wordpress/Section/Section.module.css
var e = "_section_snylt_5", t = "_content_snylt_25", n = "_contentLg_snylt_52", r = "_contentMd_snylt_57", i = "_contentNone_snylt_65", a = {
	section: e,
	content: t,
	contentLg: n,
	contentMd: r,
	contentNone: i
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionHeader/SectionHeader.js"
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionHeader/SectionHeader.js ***!
  \**************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SectionHeader: () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SectionHeader.module.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionHeader/SectionHeader.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-up.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/info.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/puzzle.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _wpengine_bds_react_base_InteractiveIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wpengine/bds-react/base/InteractiveIcon */ "./node_modules/@wpengine/bds-react/dist/base/InteractiveIcon/InteractiveIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _ark_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ark-ui/react/collapsible */ "./node_modules/@ark-ui/react/dist/components/collapsible/use-collapsible-context.js");
/* harmony import */ var _ark_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ark-ui/react/collapsible */ "./node_modules/@ark-ui/react/dist/components/collapsible/collapsible.js");
/* harmony import */ var _wpengine_bds_react_base_Tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wpengine/bds-react/base/Tooltip */ "./node_modules/@wpengine/bds-react/dist/base/Tooltip/Tooltip.js");








//#region src/wordpress/SectionHeader/SectionHeader.tsx
function f({ children: t }) {
	let n = (0,_ark_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_8__.useCollapsibleContext)();
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
		htmlFor: n.getTriggerProps().id,
		className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].titleLabel,
		children: t
	});
}
function p({ title: u, secondaryText: p, iconLeading: m = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], { "aria-hidden": !0 }), infoTip: h, action: g, collapsible: _ = !1, toggleLabel: v, className: y, ...b }) {
	let x = v ?? (typeof u == "string" && u !== "" ? u : "Toggle section"), S = _ ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(f, { children: u }) : u;
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
		...b,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].header, _ && _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].collapsible, y),
		children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
			className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].main,
			children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
				className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].inner,
				children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
					className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].titleStack,
					children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
						className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].titleGroup,
						children: [m ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
							className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].icon,
							"aria-hidden": "true",
							children: m
						}) : null, u != null && u !== "" ? (0,react__WEBPACK_IMPORTED_MODULE_5__.createElement)("h2", { className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].title }, S) : null]
					}), p != null && p !== "" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
						className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].secondaryText,
						children: p
					}) : null]
				}), h ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wpengine_bds_react_base_Tooltip__WEBPACK_IMPORTED_MODULE_10__.Tooltip, {
					content: h,
					arrow: "bottom-center",
					children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wpengine_bds_react_base_InteractiveIcon__WEBPACK_IMPORTED_MODULE_6__.InteractiveIcon, {
						icon: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {}),
						label: "More information",
						size: "sm"
					})
				}) : null]
			}), g ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
				className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].action,
				children: g
			}) : null]
		}), _ ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_ark_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_9__.collapsible_exports.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
				type: "button",
				className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].toggle,
				"aria-label": x,
				children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
					className: _SectionHeader_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].toggleIcon,
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {})
				})
			})
		}) : null]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionHeader/SectionHeader.module.js"
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionHeader/SectionHeader.module.js ***!
  \*********************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   action: () => (/* binding */ c),
/* harmony export */   collapsible: () => (/* binding */ d),
/* harmony export */   "default": () => (/* binding */ p),
/* harmony export */   header: () => (/* binding */ e),
/* harmony export */   icon: () => (/* binding */ a),
/* harmony export */   inner: () => (/* binding */ n),
/* harmony export */   main: () => (/* binding */ t),
/* harmony export */   secondaryText: () => (/* binding */ s),
/* harmony export */   title: () => (/* binding */ o),
/* harmony export */   titleGroup: () => (/* binding */ i),
/* harmony export */   titleLabel: () => (/* binding */ l),
/* harmony export */   titleStack: () => (/* binding */ r),
/* harmony export */   toggle: () => (/* binding */ u),
/* harmony export */   toggleIcon: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var _assets_wordpress_SectionHeader_SectionHeader_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/wordpress/SectionHeader/SectionHeader.css */ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/SectionHeader/SectionHeader.css");
//#region src/wordpress/SectionHeader/SectionHeader.module.css
var e = "_header_vxehr_5", t = "_main_vxehr_15", n = "_inner_vxehr_26", r = "_titleStack_vxehr_34", i = "_titleGroup_vxehr_42", a = "_icon_vxehr_50", o = "_title_vxehr_34", s = "_secondaryText_vxehr_76", c = "_action_vxehr_85", l = "_titleLabel_vxehr_93", u = "_toggle_vxehr_102", d = "_collapsible_vxehr_128", f = "_toggleIcon_vxehr_132", p = {
	header: e,
	main: t,
	inner: n,
	titleStack: r,
	titleGroup: i,
	icon: a,
	title: o,
	secondaryText: s,
	action: c,
	titleLabel: l,
	toggle: u,
	collapsible: d,
	toggleIcon: f
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionRow/SectionRow.js"
/*!********************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionRow/SectionRow.js ***!
  \********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SectionRow: () => (/* binding */ s),
/* harmony export */   SectionRowContentArea: () => (/* binding */ o),
/* harmony export */   SectionRowLabel: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var _SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SectionRow.module.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionRow/SectionRow.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");



//#region src/wordpress/SectionRow/SectionRow.tsx
function a({ label: a, supportingText: o, required: s = !1, requiredLabel: c = "required", htmlFor: l, labelId: u, supportingTextId: d, className: f, children: p, ...m }) {
	let h = l ? "label" : "span";
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
		...m,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].label, f),
		children: [
			/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(h, {
				id: u,
				htmlFor: l,
				className: _SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].labelRow,
				children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
					className: _SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].labelText,
					children: a
				}), s ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, { children: [" ", /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
					className: _SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].required,
					children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
						"aria-hidden": "true",
						children: "*"
					}), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
						className: _SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].visuallyHidden,
						children: `(${c})`
					})]
				})] }) : null]
			}),
			o ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
				id: d,
				className: _SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].supportingText,
				children: o
			}) : null,
			p
		]
	});
}
function o({ children: n, className: i, ...a }) {
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
		...a,
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].contentArea, i),
		children: n
	});
}
var s = (({ children: s, label: c, supportingText: l, required: u, requiredLabel: d, htmlFor: f, labelId: p, supportingTextId: m, className: h, ...g }) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
	...g,
	className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_SectionRow_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].row, h),
	children: c === void 0 ? s : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, { children: [/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(a, {
		label: c,
		supportingText: l,
		required: u,
		requiredLabel: d,
		htmlFor: f,
		labelId: p,
		supportingTextId: m
	}), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(o, { children: s })] })
}));
s.Label = a, s.ContentArea = o;
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionRow/SectionRow.module.js"
/*!***************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/SectionRow/SectionRow.module.js ***!
  \***************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentArea: () => (/* binding */ s),
/* harmony export */   "default": () => (/* binding */ c),
/* harmony export */   label: () => (/* binding */ t),
/* harmony export */   labelRow: () => (/* binding */ n),
/* harmony export */   labelText: () => (/* binding */ r),
/* harmony export */   required: () => (/* binding */ i),
/* harmony export */   row: () => (/* binding */ e),
/* harmony export */   supportingText: () => (/* binding */ o),
/* harmony export */   visuallyHidden: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var _assets_wordpress_SectionRow_SectionRow_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/wordpress/SectionRow/SectionRow.css */ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/SectionRow/SectionRow.css");
//#region src/wordpress/SectionRow/SectionRow.module.css
var e = "_row_16kb4_12", t = "_label_16kb4_41", n = "_labelRow_16kb4_58", r = "_labelText_16kb4_64 label-md-regular", i = "_required_16kb4_70 label-md-medium", a = "_visuallyHidden_16kb4_76", o = "_supportingText_16kb4_85 body-xs-regular", s = "_contentArea_16kb4_99", c = {
	row: e,
	label: t,
	labelRow: n,
	labelText: r,
	required: i,
	visuallyHidden: a,
	supportingText: o,
	contentArea: s
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/TabbedNavigation/TabbedNavigation.js"
/*!********************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/TabbedNavigation/TabbedNavigation.js ***!
  \********************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TABBED_NAVIGATION_ATTRIBUTE: () => (/* binding */ i),
/* harmony export */   TabbedNavigation: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var _TabbedNavigation_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabbedNavigation.module.js */ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/TabbedNavigation/TabbedNavigation.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");



//#region src/wordpress/TabbedNavigation/TabbedNavigation.tsx
var i = "data-bds-tabbed-navigation";
function a({ children: a, secondaryContent: o, className: s, ...c }) {
	let l = o != null && o !== !1;
	return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
		...c,
		[i]: "",
		className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(_TabbedNavigation_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].bar, s),
		children: [a, l ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
			className: _TabbedNavigation_module_js__WEBPACK_IMPORTED_MODULE_0__["default"].secondary,
			children: o
		}) : null]
	});
}
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/TabbedNavigation/TabbedNavigation.module.js"
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/TabbedNavigation/TabbedNavigation.module.js ***!
  \***************************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bar: () => (/* binding */ e),
/* harmony export */   "default": () => (/* binding */ n),
/* harmony export */   secondary: () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _assets_wordpress_TabbedNavigation_TabbedNavigation_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/wordpress/TabbedNavigation/TabbedNavigation.css */ "./node_modules/@wpengine/bds-wordpress-react/dist/assets/wordpress/TabbedNavigation/TabbedNavigation.css");
//#region src/wordpress/TabbedNavigation/TabbedNavigation.module.css
var e = "_bar_rdfmv_10", t = "_secondary_rdfmv_57", n = {
	bar: e,
	secondary: t
};
//#endregion



/***/ },

/***/ "./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/layoutShell/layoutShell.js"
/*!**********************************************************************************************!*\
  !*** ./node_modules/@wpengine/bds-wordpress-react/dist/wordpress/layoutShell/layoutShell.js ***!
  \**********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PAGE_SHELL_GAP: () => (/* binding */ t),
/* harmony export */   PAGE_SHELL_PADDING: () => (/* binding */ e)
/* harmony export */ });
//#region src/wordpress/layoutShell/layoutShell.ts
var e = ["default", "none"], t = ["default", "none"];
//#endregion



/***/ },

/***/ "./node_modules/@zag-js/anatomy/dist/create-anatomy.mjs"
/*!**************************************************************!*\
  !*** ./node_modules/@zag-js/anatomy/dist/create-anatomy.mjs ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAnatomy: () => (/* binding */ createAnatomy)
/* harmony export */ });
// src/create-anatomy.ts
var createAnatomy = (name, parts = []) => ({
  parts: (...values) => {
    if (isEmpty(parts)) {
      return createAnatomy(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy(name, [...parts, ...values]),
  omit: (...values) => createAnatomy(name, parts.filter((part) => !values.includes(part))),
  rename: (newName) => createAnatomy(newName, parts),
  keys: () => parts,
  build: () => [...new Set(parts)].reduce(
    (prev, part) => Object.assign(prev, {
      [part]: {
        selector: [
          `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
          `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`
        ].join(", "),
        attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) }
      }
    }),
    {}
  )
});
var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty = (v) => v.length === 0;



/***/ },

/***/ "./node_modules/@zag-js/collapsible/dist/collapsible.anatomy.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@zag-js/collapsible/dist/collapsible.anatomy.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   anatomy: () => (/* binding */ anatomy),
/* harmony export */   parts: () => (/* binding */ parts)
/* harmony export */ });
/* harmony import */ var _zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/anatomy */ "./node_modules/@zag-js/anatomy/dist/create-anatomy.mjs");
// src/collapsible.anatomy.ts

var anatomy = (0,_zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__.createAnatomy)("collapsible").parts("root", "trigger", "content", "indicator");
var parts = anatomy.build();



/***/ },

/***/ "./node_modules/@zag-js/collapsible/dist/collapsible.connect.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@zag-js/collapsible/dist/collapsible.connect.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connect: () => (/* binding */ connect)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");
/* harmony import */ var _collapsible_anatomy_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapsible.anatomy.mjs */ "./node_modules/@zag-js/collapsible/dist/collapsible.anatomy.mjs");
/* harmony import */ var _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collapsible.dom.mjs */ "./node_modules/@zag-js/collapsible/dist/collapsible.dom.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/number.mjs");
// src/collapsible.connect.ts




function connect(service, normalize) {
  const { state, send, context, scope, prop } = service;
  const visible = state.matches("open") || state.matches("closing");
  const open = state.matches("open");
  const closed = state.matches("closed");
  const { width, height } = context.get("size");
  const disabled = !!prop("disabled");
  const collapsedHeight = prop("collapsedHeight");
  const collapsedWidth = prop("collapsedWidth");
  const hasCollapsedHeight = collapsedHeight != null;
  const hasCollapsedWidth = collapsedWidth != null;
  const hasCollapsedSize = hasCollapsedHeight || hasCollapsedWidth;
  const skip = !context.get("initial") && open;
  return {
    disabled,
    visible,
    open,
    measureSize() {
      send({ type: "size.measure" });
    },
    setOpen(nextOpen) {
      send({ type: nextOpen ? "open" : "close", replaces: "open" });
    },
    getRootProps() {
      return normalize.element({
        ..._collapsible_anatomy_mjs__WEBPACK_IMPORTED_MODULE_1__.parts.root.attrs,
        "data-state": open ? "open" : "closed",
        dir: prop("dir"),
        id: _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_2__.getRootId(scope)
      });
    },
    getContentProps() {
      return normalize.element({
        ..._collapsible_anatomy_mjs__WEBPACK_IMPORTED_MODULE_1__.parts.content.attrs,
        id: _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_2__.getContentId(scope),
        "data-collapsible": "",
        "data-state": skip ? void 0 : open ? "open" : "closed",
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(disabled),
        "data-has-collapsed-size": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(hasCollapsedSize),
        hidden: !visible && !hasCollapsedSize,
        dir: prop("dir"),
        style: {
          "--height": (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.toPx)(height),
          "--width": (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.toPx)(width),
          "--collapsed-height": (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.toPx)(collapsedHeight),
          "--collapsed-width": (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.toPx)(collapsedWidth),
          ...closed && hasCollapsedHeight && {
            overflow: "hidden",
            minHeight: (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.toPx)(collapsedHeight),
            maxHeight: (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.toPx)(collapsedHeight)
          },
          ...closed && hasCollapsedWidth && {
            overflow: "hidden",
            minWidth: (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.toPx)(collapsedWidth),
            maxWidth: (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.toPx)(collapsedWidth)
          }
        }
      });
    },
    getTriggerProps() {
      return normalize.element({
        ..._collapsible_anatomy_mjs__WEBPACK_IMPORTED_MODULE_1__.parts.trigger.attrs,
        id: _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_2__.getTriggerId(scope),
        dir: prop("dir"),
        type: "button",
        "data-state": open ? "open" : "closed",
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(disabled),
        "aria-controls": _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_2__.getContentId(scope),
        "aria-expanded": visible || false,
        onClick(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          send({ type: open ? "close" : "open" });
        }
      });
    },
    getIndicatorProps() {
      return normalize.element({
        ..._collapsible_anatomy_mjs__WEBPACK_IMPORTED_MODULE_1__.parts.indicator.attrs,
        dir: prop("dir"),
        "data-state": open ? "open" : "closed",
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(disabled)
      });
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/collapsible/dist/collapsible.dom.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/@zag-js/collapsible/dist/collapsible.dom.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getContentEl: () => (/* binding */ getContentEl),
/* harmony export */   getContentId: () => (/* binding */ getContentId),
/* harmony export */   getRootEl: () => (/* binding */ getRootEl),
/* harmony export */   getRootId: () => (/* binding */ getRootId),
/* harmony export */   getTriggerEl: () => (/* binding */ getTriggerEl),
/* harmony export */   getTriggerId: () => (/* binding */ getTriggerId)
/* harmony export */ });
// src/collapsible.dom.ts
var getRootId = (ctx) => ctx.ids?.root ?? `collapsible:${ctx.id}`;
var getContentId = (ctx) => ctx.ids?.content ?? `collapsible:${ctx.id}:content`;
var getTriggerId = (ctx) => ctx.ids?.trigger ?? `collapsible:${ctx.id}:trigger`;
var getRootEl = (ctx) => ctx.getById(getRootId(ctx));
var getContentEl = (ctx) => ctx.getById(getContentId(ctx));
var getTriggerEl = (ctx) => ctx.getById(getTriggerId(ctx));



/***/ },

/***/ "./node_modules/@zag-js/collapsible/dist/collapsible.machine.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@zag-js/collapsible/dist/collapsible.machine.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   machine: () => (/* binding */ machine)
/* harmony export */ });
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/create-machine.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/computed-style.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/mutation-observer.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/set.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/tabbable.mjs");
/* harmony import */ var _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./collapsible.dom.mjs */ "./node_modules/@zag-js/collapsible/dist/collapsible.dom.mjs");
// src/collapsible.machine.ts



var machine = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createMachine)({
  initialState({ prop }) {
    const open = prop("open") || prop("defaultOpen");
    return open ? "open" : "closed";
  },
  context({ bindable }) {
    return {
      size: bindable(() => ({
        defaultValue: { height: 0, width: 0 },
        sync: true
      })),
      initial: bindable(() => ({
        defaultValue: false
      }))
    };
  },
  refs() {
    return {
      cleanup: void 0,
      stylesRef: void 0
    };
  },
  watch({ track, prop, action }) {
    track([() => prop("open")], () => {
      action(["setInitial", "computeSize", "toggleVisibility"]);
    });
  },
  exit: ["cleanupNode"],
  states: {
    closed: {
      effects: ["trackTabbableElements"],
      on: {
        "controlled.open": {
          target: "open"
        },
        open: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setInitial", "computeSize", "invokeOnOpen"]
          }
        ]
      }
    },
    closing: {
      effects: ["trackExitAnimation"],
      on: {
        "controlled.close": {
          target: "closed"
        },
        "controlled.open": {
          target: "open"
        },
        open: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setInitial", "invokeOnOpen"]
          }
        ],
        close: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnExitComplete"]
          },
          {
            target: "closed",
            actions: ["setInitial", "computeSize", "invokeOnExitComplete"]
          }
        ],
        "animation.end": {
          target: "closed",
          actions: ["invokeOnExitComplete", "clearInitial"]
        }
      }
    },
    open: {
      effects: ["trackEnterAnimation"],
      on: {
        "controlled.close": {
          target: "closing"
        },
        close: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closing",
            actions: ["setInitial", "computeSize", "invokeOnClose"]
          }
        ],
        "size.measure": {
          actions: ["measureSize"]
        },
        "animation.end": {
          actions: ["clearInitial"]
        }
      }
    }
  },
  implementations: {
    guards: {
      isOpenControlled: ({ prop }) => prop("open") != void 0
    },
    effects: {
      trackEnterAnimation: ({ send, scope }) => {
        let cleanup;
        const rafCleanup = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.raf)(() => {
          const contentEl = _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getContentEl(scope);
          if (!contentEl) return;
          const animationName = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(contentEl).animationName;
          const hasNoAnimation = !animationName || animationName === "none";
          if (hasNoAnimation) {
            send({ type: "animation.end" });
            return;
          }
          const onEnd = (event) => {
            const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.getEventTarget)(event);
            if (target === contentEl) {
              send({ type: "animation.end" });
            }
          };
          contentEl.addEventListener("animationend", onEnd);
          cleanup = () => {
            contentEl.removeEventListener("animationend", onEnd);
          };
        });
        return () => {
          rafCleanup();
          cleanup?.();
        };
      },
      trackExitAnimation: ({ send, scope }) => {
        let cleanup;
        const rafCleanup = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.raf)(() => {
          const contentEl = _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getContentEl(scope);
          if (!contentEl) return;
          const animationName = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(contentEl).animationName;
          const hasNoAnimation = !animationName || animationName === "none";
          if (hasNoAnimation) {
            send({ type: "animation.end" });
            return;
          }
          const onEnd = (event) => {
            const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.getEventTarget)(event);
            if (target === contentEl) {
              send({ type: "animation.end" });
            }
          };
          contentEl.addEventListener("animationend", onEnd);
          const restoreStyles = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.setStyle)(contentEl, {
            animationFillMode: "forwards"
          });
          cleanup = () => {
            contentEl.removeEventListener("animationend", onEnd);
            (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.nextTick)(() => restoreStyles());
          };
        });
        return () => {
          rafCleanup();
          cleanup?.();
        };
      },
      trackTabbableElements: ({ scope, prop }) => {
        if (!prop("collapsedHeight") && !prop("collapsedWidth")) return;
        const contentEl = _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getContentEl(scope);
        if (!contentEl) return;
        const applyInertToTabbables = () => {
          const tabbables = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__.getTabbables)(contentEl);
          const restoreAttrs = tabbables.map((tabbable) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.setAttribute)(tabbable, "inert", ""));
          return () => {
            restoreAttrs.forEach((attr) => attr());
          };
        };
        let restoreInert = applyInertToTabbables();
        const observerCleanup = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.observeChildren)(contentEl, {
          callback() {
            restoreInert();
            restoreInert = applyInertToTabbables();
          }
        });
        return () => {
          restoreInert();
          observerCleanup();
        };
      }
    },
    actions: {
      setInitial: ({ context, flush }) => {
        flush(() => {
          context.set("initial", true);
        });
      },
      clearInitial: ({ context }) => {
        context.set("initial", false);
      },
      cleanupNode: ({ refs }) => {
        refs.get("cleanup")?.();
        refs.set("stylesRef", null);
      },
      measureSize: ({ context, scope }) => {
        const contentEl = _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getContentEl(scope);
        if (!contentEl) return;
        const { height, width } = contentEl.getBoundingClientRect();
        context.set("size", { height, width });
      },
      computeSize: ({ refs, scope, context }) => {
        refs.get("cleanup")?.();
        const rafCleanup = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.raf)(() => {
          const contentEl = _collapsible_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getContentEl(scope);
          if (!contentEl) return;
          const hidden = contentEl.hidden;
          contentEl.style.animationName = "none";
          contentEl.style.animationDuration = "0s";
          contentEl.hidden = false;
          const rect = contentEl.getBoundingClientRect();
          context.set("size", { height: rect.height, width: rect.width });
          if (context.get("initial")) {
            contentEl.style.animationName = "";
            contentEl.style.animationDuration = "";
          }
          contentEl.hidden = hidden;
        });
        refs.set("cleanup", rafCleanup);
      },
      invokeOnOpen: ({ prop }) => {
        prop("onOpenChange")?.({ open: true });
      },
      invokeOnClose: ({ prop }) => {
        prop("onOpenChange")?.({ open: false });
      },
      invokeOnExitComplete: ({ prop }) => {
        prop("onExitComplete")?.();
      },
      toggleVisibility: ({ prop, send }) => {
        send({ type: prop("open") ? "controlled.open" : "controlled.close" });
      }
    }
  }
});



/***/ },

/***/ "./node_modules/@zag-js/collection/dist/chunk-QZ7TP4HQ.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@zag-js/collection/dist/chunk-QZ7TP4HQ.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __publicField: () => (/* binding */ __publicField)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);




/***/ },

/***/ "./node_modules/@zag-js/collection/dist/list-collection.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/@zag-js/collection/dist/list-collection.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListCollection: () => (/* binding */ ListCollection),
/* harmony export */   isListCollection: () => (/* binding */ isListCollection)
/* harmony export */ });
/* harmony import */ var _chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-QZ7TP4HQ.mjs */ "./node_modules/@zag-js/collection/dist/chunk-QZ7TP4HQ.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/equal.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/guard.mjs");


// src/list-collection.ts

var fallback = {
  itemToValue(item) {
    if (typeof item === "string") return item;
    if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.isObject)(item) && (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.hasProp)(item, "value")) return item.value;
    return "";
  },
  itemToString(item) {
    if (typeof item === "string") return item;
    if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.isObject)(item) && (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.hasProp)(item, "label")) return item.label;
    return fallback.itemToValue(item);
  },
  isItemDisabled(item) {
    if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.isObject)(item) && (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.hasProp)(item, "disabled")) return !!item.disabled;
    return false;
  }
};
var ListCollection = class _ListCollection {
  constructor(options) {
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "options", options);
    /**
     * The items in the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "items");
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "indexMap", null);
    /**
     * Copy the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "copy", (items) => {
      return new _ListCollection({ ...this.options, items: items ?? [...this.items] });
    });
    /**
     * Check if the collection is equal to another collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "isEqual", (other) => {
      return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_1__.isEqual)(this.items, other.items);
    });
    /**
     * Function to update the collection items
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "setItems", (items) => {
      return this.copy(items);
    });
    /**
     * Returns all the values in the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "getValues", (items = this.items) => {
      const values = [];
      for (const item of items) {
        const value = this.getItemValue(item);
        if (value != null) values.push(value);
      }
      return values;
    });
    /**
     * Get the item based on its value
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "find", (value) => {
      if (value == null) return null;
      const index = this.indexOf(value);
      return index !== -1 ? this.at(index) : null;
    });
    /**
     * Get the items based on its values
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "findMany", (values) => {
      const result = [];
      for (const value of values) {
        const item = this.find(value);
        if (item != null) result.push(item);
      }
      return result;
    });
    /**
     * Get the item based on its index
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "at", (index) => {
      if (!this.options.groupBy && !this.options.groupSort) {
        return this.items[index] ?? null;
      }
      let idx = 0;
      const groups = this.group();
      for (const [, items] of groups) {
        for (const item of items) {
          if (idx === index) return item;
          idx++;
        }
      }
      return null;
    });
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "sortFn", (valueA, valueB) => {
      const indexA = this.indexOf(valueA);
      const indexB = this.indexOf(valueB);
      return (indexA ?? 0) - (indexB ?? 0);
    });
    /**
     * Sort the values based on their index
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "sort", (values) => {
      return [...values].sort(this.sortFn.bind(this));
    });
    /**
     * Convert an item to a value
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "getItemValue", (item) => {
      if (item == null) return null;
      return this.options.itemToValue?.(item) ?? fallback.itemToValue(item);
    });
    /**
     * Whether an item is disabled
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "getItemDisabled", (item) => {
      if (item == null) return false;
      return this.options.isItemDisabled?.(item) ?? fallback.isItemDisabled(item);
    });
    /**
     * Convert an item to a string
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "stringifyItem", (item) => {
      if (item == null) return null;
      return this.options.itemToString?.(item) ?? fallback.itemToString(item);
    });
    /**
     * Convert a value to a string
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "stringify", (value) => {
      if (value == null) return null;
      return this.stringifyItem(this.find(value));
    });
    /**
     * Convert an array of items to a string
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "stringifyItems", (items, separator = ", ") => {
      const strs = [];
      for (const item of items) {
        const str = this.stringifyItem(item);
        if (str != null) strs.push(str);
      }
      return strs.join(separator);
    });
    /**
     * Convert an array of items to a string
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "stringifyMany", (value, separator) => {
      return this.stringifyItems(this.findMany(value), separator);
    });
    /**
     * Whether the collection has a value
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "has", (value) => {
      return this.indexOf(value) !== -1;
    });
    /**
     * Whether the collection has an item
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "hasItem", (item) => {
      if (item == null) return false;
      return this.has(this.getItemValue(item));
    });
    /**
     * Group items by the groupBy function provided in options
     * Returns an array of [groupKey, items] tuples
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "group", () => {
      const { groupBy, groupSort } = this.options;
      if (!groupBy) return [["", [...this.items]]];
      const groups = /* @__PURE__ */ new Map();
      this.items.forEach((item, index) => {
        const groupKey = groupBy(item, index);
        if (!groups.has(groupKey)) {
          groups.set(groupKey, []);
        }
        groups.get(groupKey).push(item);
      });
      let entries = Array.from(groups.entries());
      if (groupSort) {
        entries.sort(([a], [b]) => {
          if (typeof groupSort === "function") return groupSort(a, b);
          if (Array.isArray(groupSort)) {
            const indexA = groupSort.indexOf(a);
            const indexB = groupSort.indexOf(b);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          }
          if (groupSort === "asc") return a.localeCompare(b);
          if (groupSort === "desc") return b.localeCompare(a);
          return 0;
        });
      }
      return entries;
    });
    /**
     * Returns the next value in the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "getNextValue", (value, step = 1, clamp = false) => {
      let index = this.indexOf(value);
      if (index === -1) return null;
      index = clamp ? Math.min(index + step, this.size - 1) : index + step;
      while (index <= this.size && this.getItemDisabled(this.at(index))) index++;
      return this.getItemValue(this.at(index));
    });
    /**
     * Returns the previous value in the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "getPreviousValue", (value, step = 1, clamp = false) => {
      let index = this.indexOf(value);
      if (index === -1) return null;
      index = clamp ? Math.max(index - step, 0) : index - step;
      while (index >= 0 && this.getItemDisabled(this.at(index))) index--;
      return this.getItemValue(this.at(index));
    });
    /**
     * Get the index of an item based on its key
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "indexOf", (value) => {
      if (value == null) return -1;
      if (!this.options.groupBy && !this.options.groupSort) {
        return this.items.findIndex((item) => this.getItemValue(item) === value);
      }
      if (!this.indexMap) {
        this.indexMap = /* @__PURE__ */ new Map();
        let idx = 0;
        const groups = this.group();
        for (const [, items] of groups) {
          for (const item of items) {
            const itemValue = this.getItemValue(item);
            if (itemValue != null) {
              this.indexMap.set(itemValue, idx);
            }
            idx++;
          }
        }
      }
      return this.indexMap.get(value) ?? -1;
    });
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "getByText", (text, current) => {
      const currentIndex = current != null ? this.indexOf(current) : -1;
      const isSingleKey = text.length === 1;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[(currentIndex + i + 1) % this.items.length];
        if (isSingleKey && this.getItemValue(item) === current) continue;
        if (this.getItemDisabled(item)) continue;
        if (match(this.stringifyItem(item), text)) return item;
      }
      return void 0;
    });
    /**
     * Search for a value based on a query
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "search", (queryString, options) => {
      const { state, currentValue, timeout = 350 } = options;
      const search = state.keysSoFar + queryString;
      const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
      const query = isRepeated ? search[0] : search;
      const item = this.getByText(query, currentValue);
      const value = this.getItemValue(item);
      function cleanup() {
        clearTimeout(state.timer);
        state.timer = -1;
      }
      function update(value2) {
        state.keysSoFar = value2;
        cleanup();
        if (value2 !== "") {
          state.timer = +setTimeout(() => {
            update("");
            cleanup();
          }, timeout);
        }
      }
      update(search);
      return value;
    });
    /**
     * Update an item in the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "update", (value, item) => {
      let index = this.indexOf(value);
      if (index === -1) return this;
      return this.copy([...this.items.slice(0, index), item, ...this.items.slice(index + 1)]);
    });
    /**
     * Update an item in the collection if it exists, otherwise append it
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "upsert", (value, item, mode = "append") => {
      let index = this.indexOf(value);
      if (index === -1) {
        const fn = mode === "append" ? this.append : this.prepend;
        return fn(item);
      }
      return this.copy([...this.items.slice(0, index), item, ...this.items.slice(index + 1)]);
    });
    /**
     * Insert items at a specific index
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "insert", (index, ...items) => {
      return this.copy(insert(this.items, index, ...items));
    });
    /**
     * Insert items before a specific value
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "insertBefore", (value, ...items) => {
      let toIndex = this.indexOf(value);
      if (toIndex === -1) {
        if (this.items.length === 0) toIndex = 0;
        else return this;
      }
      return this.copy(insert(this.items, toIndex, ...items));
    });
    /**
     * Insert items after a specific value
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "insertAfter", (value, ...items) => {
      let toIndex = this.indexOf(value);
      if (toIndex === -1) {
        if (this.items.length === 0) toIndex = 0;
        else return this;
      }
      return this.copy(insert(this.items, toIndex + 1, ...items));
    });
    /**
     * Prepend items to the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "prepend", (...items) => {
      return this.copy(insert(this.items, 0, ...items));
    });
    /**
     * Append items to the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "append", (...items) => {
      return this.copy(insert(this.items, this.items.length, ...items));
    });
    /**
     * Filter the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "filter", (fn) => {
      const filteredItems = this.items.filter((item, index) => fn(this.stringifyItem(item), index, item));
      return this.copy(filteredItems);
    });
    /**
     * Remove items from the collection
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "remove", (...itemsOrValues) => {
      const values = itemsOrValues.map(
        (itemOrValue) => typeof itemOrValue === "string" ? itemOrValue : this.getItemValue(itemOrValue)
      );
      return this.copy(
        this.items.filter((item) => {
          const value = this.getItemValue(item);
          if (value == null) return false;
          return !values.includes(value);
        })
      );
    });
    /**
     * Move an item to a specific index
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "move", (value, toIndex) => {
      const fromIndex = this.indexOf(value);
      if (fromIndex === -1) return this;
      return this.copy(move(this.items, [fromIndex], toIndex));
    });
    /**
     * Move items before a specific value
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "moveBefore", (value, ...values) => {
      let toIndex = this.items.findIndex((item) => this.getItemValue(item) === value);
      if (toIndex === -1) return this;
      let indices = values.map((value2) => this.items.findIndex((item) => this.getItemValue(item) === value2)).sort((a, b) => a - b);
      return this.copy(move(this.items, indices, toIndex));
    });
    /**
     * Move items after a specific value
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "moveAfter", (value, ...values) => {
      let toIndex = this.items.findIndex((item) => this.getItemValue(item) === value);
      if (toIndex === -1) return this;
      let indices = values.map((value2) => this.items.findIndex((item) => this.getItemValue(item) === value2)).sort((a, b) => a - b);
      return this.copy(move(this.items, indices, toIndex + 1));
    });
    /**
     * Reorder items
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "reorder", (fromIndex, toIndex) => {
      return this.copy(move(this.items, [fromIndex], toIndex));
    });
    /**
     * Compare two values
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "compareValue", (a, b) => {
      const indexA = this.indexOf(a);
      const indexB = this.indexOf(b);
      if (indexA < indexB) return -1;
      if (indexA > indexB) return 1;
      return 0;
    });
    /**
     * Get the range of values between two values
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "range", (from, to) => {
      let keys = [];
      let key = from;
      while (key != null) {
        let item = this.find(key);
        if (item) keys.push(key);
        if (key === to) return keys;
        key = this.getNextValue(key);
      }
      return [];
    });
    /**
     * Get the range of values between two values
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "getValueRange", (from, to) => {
      if (from && to) {
        if (this.compareValue(from, to) <= 0) {
          return this.range(from, to);
        }
        return this.range(to, from);
      }
      return [];
    });
    /**
     * Convert the collection to a string
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "toString", () => {
      let result = "";
      for (const item of this.items) {
        const value = this.getItemValue(item);
        const label = this.stringifyItem(item);
        const disabled = this.getItemDisabled(item);
        const itemString = [value, label, disabled].filter(Boolean).join(":");
        result += itemString + ",";
      }
      return result;
    });
    /**
     * Convert the collection to a JSON object
     */
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "toJSON", () => {
      return {
        size: this.size,
        first: this.firstValue,
        last: this.lastValue
      };
    });
    this.items = [...options.items];
  }
  /**
   * Returns the number of items in the collection
   */
  get size() {
    return this.items.length;
  }
  /**
   * Returns the first value in the collection
   */
  get firstValue() {
    let index = 0;
    while (this.getItemDisabled(this.at(index))) index++;
    return this.getItemValue(this.at(index));
  }
  /**
   * Returns the last value in the collection
   */
  get lastValue() {
    let index = this.size - 1;
    while (this.getItemDisabled(this.at(index))) index--;
    return this.getItemValue(this.at(index));
  }
  *[Symbol.iterator]() {
    yield* this.items;
  }
};
var match = (label, query) => {
  return !!label?.toLowerCase().startsWith(query.toLowerCase());
};
function isListCollection(v) {
  return v instanceof ListCollection;
}
function insert(items, index, ...values) {
  return [...items.slice(0, index), ...values, ...items.slice(index)];
}
function move(items, indices, toIndex) {
  indices = [...indices].sort((a, b) => a - b);
  const itemsToMove = indices.map((i) => items[i]);
  for (let i = indices.length - 1; i >= 0; i--) {
    items = [...items.slice(0, indices[i]), ...items.slice(indices[i] + 1)];
  }
  toIndex = Math.max(0, toIndex - indices.filter((i) => i < toIndex).length);
  return [...items.slice(0, toIndex), ...itemsToMove, ...items.slice(toIndex)];
}



/***/ },

/***/ "./node_modules/@zag-js/collection/dist/selection-map.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@zag-js/collection/dist/selection-map.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSelectedItemMap: () => (/* binding */ createSelectedItemMap),
/* harmony export */   deriveSelectionState: () => (/* binding */ deriveSelectionState),
/* harmony export */   resolveSelectedItems: () => (/* binding */ resolveSelectedItems),
/* harmony export */   updateSelectedItemMap: () => (/* binding */ updateSelectedItemMap)
/* harmony export */ });


// src/selection-map.ts
function resolveSelectedItems({
  values,
  collection,
  selectedItemMap
}) {
  const result = [];
  for (const value of values) {
    const item = collection.find(value) ?? selectedItemMap.get(value);
    if (item != null) result.push(item);
  }
  return result;
}
function updateSelectedItemMap({
  selectedItemMap,
  values,
  selectedItems,
  collection
}) {
  const nextMap = new Map(selectedItemMap);
  for (const item of selectedItems) {
    const value = collection.getItemValue(item);
    if (value != null) nextMap.set(value, item);
  }
  const allowedValues = new Set(values);
  for (const value of nextMap.keys()) {
    if (!allowedValues.has(value)) nextMap.delete(value);
  }
  return nextMap;
}
function deriveSelectionState({
  values,
  collection,
  selectedItemMap
}) {
  const selectedItems = resolveSelectedItems({ values, collection, selectedItemMap });
  const nextSelectedItemMap = updateSelectedItemMap({
    selectedItemMap,
    values,
    selectedItems,
    collection
  });
  return { selectedItems, nextSelectedItemMap };
}
function createSelectedItemMap({
  selectedItems,
  collection
}) {
  return updateSelectedItemMap({
    selectedItemMap: /* @__PURE__ */ new Map(),
    values: selectedItems.map((item) => collection.getItemValue(item)).filter(Boolean),
    selectedItems,
    collection
  });
}



/***/ },

/***/ "./node_modules/@zag-js/core/dist/create-machine.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@zag-js/core/dist/create-machine.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGuards: () => (/* binding */ createGuards),
/* harmony export */   createMachine: () => (/* binding */ createMachine),
/* harmony export */   setup: () => (/* binding */ setup)
/* harmony export */ });
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.mjs */ "./node_modules/@zag-js/core/dist/state.mjs");
// src/create-machine.ts

function createGuards() {
  return {
    and: (...guards) => {
      return function andGuard(params) {
        return guards.every((str) => params.guard(str));
      };
    },
    or: (...guards) => {
      return function orGuard(params) {
        return guards.some((str) => params.guard(str));
      };
    },
    not: (guard) => {
      return function notGuard(params) {
        return !params.guard(guard);
      };
    }
  };
}
function createMachine(config) {
  (0,_state_mjs__WEBPACK_IMPORTED_MODULE_0__.ensureStateIndex)(config);
  return config;
}
function setup() {
  return {
    guards: createGuards(),
    createMachine: (config) => {
      return createMachine(config);
    },
    choose: (transitions) => {
      return function chooseFn({ choose }) {
        return choose(transitions)?.actions;
      };
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/core/dist/merge-props.mjs"
/*!********************************************************!*\
  !*** ./node_modules/@zag-js/core/dist/merge-props.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeProps: () => (/* binding */ mergeProps)
/* harmony export */ });
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/guard.mjs");
// src/merge-props.ts

var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
var ownedBy = (...args) => Array.from(
  new Set(
    clsx(...args).split(/\s+/).filter(Boolean)
  )
).join(" ");
var CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([\s\S]*)/;
var serialize = (style) => {
  const res = {};
  const add = (declaration) => {
    const match = CSS_REGEX.exec(declaration);
    if (match) res[match[1]] = match[2];
  };
  let start = 0;
  let depth = 0;
  let quote = "";
  let comment = false;
  for (let i = 0; i < style.length; i++) {
    const char = style[i];
    if (comment) {
      if (char === "*" && style[i + 1] === "/") {
        comment = false;
        i++;
      }
    } else if (quote) {
      if (char === "\\") i++;
      if (char === quote) quote = "";
    } else if (char === "\\") {
      i++;
    } else if (char === "/" && style[i + 1] === "*") {
      comment = true;
      i++;
    } else if (char === '"' || char === "'") quote = char;
    else if (char === "(") depth++;
    else if (char === ")" && depth) depth--;
    else if (char === ";" && !depth) {
      add(style.slice(start, i));
      start = i + 1;
    }
  }
  add(style.slice(start));
  return res;
};
var css = (a, b) => {
  if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_1__.isString)(a)) {
    if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_1__.isString)(b)) return `${a};${b}`;
    a = serialize(a);
  } else if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_1__.isString)(b)) {
    b = serialize(b);
  }
  return Object.assign({}, a ?? {}, b ?? {});
};
function mergeProps(...args) {
  let result = {};
  for (let props of args) {
    if (!props) continue;
    for (let key in result) {
      if (key.startsWith("on") && typeof result[key] === "function" && typeof props[key] === "function") {
        result[key] = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.callAll)(props[key], result[key]);
        continue;
      }
      if (key === "className" || key === "class") {
        result[key] = clsx(result[key], props[key]);
        continue;
      }
      if (key === "style") {
        result[key] = css(result[key], props[key]);
        continue;
      }
      if (key === "data-ownedby") {
        result[key] = ownedBy(result[key], props[key]);
        continue;
      }
      result[key] = props[key] !== void 0 ? props[key] : result[key];
    }
    for (let key in props) {
      if (result[key] === void 0) {
        result[key] = props[key];
      }
    }
    const symbols = Object.getOwnPropertySymbols(props);
    for (let symbol of symbols) {
      result[symbol] = props[symbol];
    }
  }
  return result;
}



/***/ },

/***/ "./node_modules/@zag-js/core/dist/replace-tracker.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@zag-js/core/dist/replace-tracker.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createReplaceTracker: () => (/* binding */ createReplaceTracker)
/* harmony export */ });
// src/replace-tracker.ts
function createReplaceTracker() {
  const newest = /* @__PURE__ */ new Map();
  return {
    claim(key) {
      const token = Symbol(key);
      newest.set(key, token);
      return token;
    },
    isReplaced(key, token) {
      return newest.get(key) !== token;
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/core/dist/scope.mjs"
/*!**************************************************!*\
  !*** ./node_modules/@zag-js/core/dist/scope.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createScope: () => (/* binding */ createScope)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
// src/scope.ts

function createScope(props) {
  const getRootNode = () => props.getRootNode?.() ?? document;
  const getDoc = () => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getDocument)(getRootNode());
  const getWin = () => getDoc().defaultView ?? window;
  const getActiveElementFn = () => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(getRootNode());
  const getById = (id) => getRootNode().getElementById(id);
  return {
    ...props,
    getRootNode,
    getDoc,
    getWin,
    getActiveElement: getActiveElementFn,
    isActiveElement: _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.isActiveElement,
    getById
  };
}



/***/ },

/***/ "./node_modules/@zag-js/core/dist/state.mjs"
/*!**************************************************!*\
  !*** ./node_modules/@zag-js/core/dist/state.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensureStateIndex: () => (/* binding */ ensureStateIndex),
/* harmony export */   findTransition: () => (/* binding */ findTransition),
/* harmony export */   getExitEnterStates: () => (/* binding */ getExitEnterStates),
/* harmony export */   getStateChain: () => (/* binding */ getStateChain),
/* harmony export */   getStateDefinition: () => (/* binding */ getStateDefinition),
/* harmony export */   hasTag: () => (/* binding */ hasTag),
/* harmony export */   matchesState: () => (/* binding */ matchesState),
/* harmony export */   resolveStateValue: () => (/* binding */ resolveStateValue)
/* harmony export */ });
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/warning.mjs");
// src/state.ts

var STATE_DELIMITER = ".";
var ABSOLUTE_PREFIX = "#";
var stateIndexCache = /* @__PURE__ */ new WeakMap();
var stateIdIndexCache = /* @__PURE__ */ new WeakMap();
function joinStatePath(parts) {
  return parts.join(STATE_DELIMITER);
}
function isAbsoluteStatePath(value) {
  return value.includes(STATE_DELIMITER);
}
function isExplicitAbsoluteStatePath(value) {
  return value.startsWith(ABSOLUTE_PREFIX);
}
function isChildTarget(value) {
  return value.startsWith(STATE_DELIMITER);
}
function stripAbsolutePrefix(value) {
  return isExplicitAbsoluteStatePath(value) ? value.slice(ABSOLUTE_PREFIX.length) : value;
}
function appendStatePath(base, segment) {
  return base ? `${base}${STATE_DELIMITER}${segment}` : segment;
}
function buildStateIndex(machine) {
  const index = /* @__PURE__ */ new Map();
  const idIndex = /* @__PURE__ */ new Map();
  const visit = (basePath, state) => {
    index.set(basePath, state);
    const stateId = state.id;
    if (stateId) {
      if (idIndex.has(stateId)) {
        (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.invariant)(`[zag-js] Duplicate state id: "${stateId}"`);
      }
      idIndex.set(stateId, basePath);
    }
    const childStates = state.states;
    if (!childStates) return;
    (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.ensure)(state.initial, () => `[zag-js] Compound state "${basePath}" has child states but no "initial" property`);
    if (!(state.initial in childStates)) {
      (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.invariant)(
        `[zag-js] Compound state "${basePath}" has initial "${String(state.initial)}" which is not a child state`
      );
    }
    for (const [childKey, childState] of Object.entries(childStates)) {
      if (!childState) continue;
      const childPath = appendStatePath(basePath, childKey);
      visit(childPath, childState);
    }
  };
  for (const [topKey, topState] of Object.entries(machine.states)) {
    if (!topState) continue;
    visit(topKey, topState);
  }
  return { index, idIndex };
}
function ensureStateIndex(machine) {
  const cached = stateIndexCache.get(machine);
  if (cached) return cached;
  const { index, idIndex } = buildStateIndex(machine);
  stateIndexCache.set(machine, index);
  stateIdIndexCache.set(machine, idIndex);
  return index;
}
function getStatePathById(machine, stateId) {
  ensureStateIndex(machine);
  return stateIdIndexCache.get(machine)?.get(stateId);
}
function toSegments(value) {
  if (!value) return [];
  return String(value).split(STATE_DELIMITER).filter(Boolean);
}
function getStateChain(machine, state) {
  if (!state) return [];
  const stateIndex = ensureStateIndex(machine);
  const segments = toSegments(state);
  const chain = [];
  const statePath = [];
  for (const segment of segments) {
    statePath.push(segment);
    const path = joinStatePath(statePath);
    const current = stateIndex.get(path);
    if (!current) break;
    chain.push({ path, state: current });
  }
  return chain;
}
function resolveAbsoluteStateValue(machine, value) {
  const stateIndex = ensureStateIndex(machine);
  const segments = toSegments(value);
  if (!segments.length) return value;
  const resolved = [];
  for (const segment of segments) {
    resolved.push(segment);
    const path = joinStatePath(resolved);
    if (!stateIndex.has(path)) return value;
  }
  let resolvedPath = joinStatePath(resolved);
  let current = stateIndex.get(resolvedPath);
  while (current?.initial) {
    const nextPath = `${resolvedPath}${STATE_DELIMITER}${current.initial}`;
    const nextState = stateIndex.get(nextPath);
    if (!nextState) break;
    resolvedPath = nextPath;
    current = nextState;
  }
  return resolvedPath;
}
function hasStatePath(machine, value) {
  const stateIndex = ensureStateIndex(machine);
  return stateIndex.has(value);
}
function resolveStateValue(machine, value, source) {
  const stateValue = String(value);
  if (isExplicitAbsoluteStatePath(stateValue)) {
    const stateId = stripAbsolutePrefix(stateValue);
    const statePath = getStatePathById(machine, stateId);
    (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.ensure)(statePath, () => `[zag-js] Unknown state id: "${stateId}"`);
    return resolveAbsoluteStateValue(machine, statePath);
  }
  if (isChildTarget(stateValue) && source) {
    const childPath = appendStatePath(source, stateValue.slice(1));
    return resolveAbsoluteStateValue(machine, childPath);
  }
  if (!isAbsoluteStatePath(stateValue) && source) {
    const sourceSegments = toSegments(source);
    for (let index = sourceSegments.length - 1; index >= 1; index--) {
      const base = sourceSegments.slice(0, index).join(STATE_DELIMITER);
      const candidate = appendStatePath(base, stateValue);
      if (hasStatePath(machine, candidate)) return resolveAbsoluteStateValue(machine, candidate);
    }
    if (hasStatePath(machine, stateValue)) return resolveAbsoluteStateValue(machine, stateValue);
  }
  return resolveAbsoluteStateValue(machine, stateValue);
}
function getStateDefinition(machine, state) {
  const chain = getStateChain(machine, state);
  return chain[chain.length - 1]?.state;
}
function findTransition(machine, state, eventType) {
  const chain = getStateChain(machine, state);
  for (let index = chain.length - 1; index >= 0; index--) {
    const transitionMap = chain[index]?.state.on;
    const transition = transitionMap?.[eventType];
    if (transition) return { transitions: transition, source: chain[index]?.path };
  }
  const rootTransitionMap = machine.on;
  return { transitions: rootTransitionMap?.[eventType], source: void 0 };
}
function getExitEnterStates(machine, prevState, nextState, reenter) {
  const prevChain = prevState ? getStateChain(machine, prevState) : [];
  const nextChain = getStateChain(machine, nextState);
  let commonIndex = 0;
  while (commonIndex < prevChain.length && commonIndex < nextChain.length && prevChain[commonIndex]?.path === nextChain[commonIndex]?.path) {
    commonIndex += 1;
  }
  let exiting = prevChain.slice(commonIndex).reverse();
  let entering = nextChain.slice(commonIndex);
  const sameLeaf = prevChain[prevChain.length - 1]?.path === nextChain[nextChain.length - 1]?.path;
  if (reenter && sameLeaf) {
    exiting = prevChain.slice().reverse();
    entering = nextChain;
  }
  return { exiting, entering };
}
function matchesState(current, value) {
  if (!current) return false;
  return current === value || current.startsWith(`${value}${STATE_DELIMITER}`);
}
function hasTag(machine, state, tag) {
  return getStateChain(machine, state).some((item) => item.state.tags?.includes(tag));
}



/***/ },

/***/ "./node_modules/@zag-js/core/dist/types.mjs"
/*!**************************************************!*\
  !*** ./node_modules/@zag-js/core/dist/types.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INIT_STATE: () => (/* binding */ INIT_STATE),
/* harmony export */   MachineStatus: () => (/* binding */ MachineStatus)
/* harmony export */ });
// src/types.ts
var MachineStatus = /* @__PURE__ */ ((MachineStatus2) => {
  MachineStatus2["NotStarted"] = "Not Started";
  MachineStatus2["Started"] = "Started";
  MachineStatus2["Stopped"] = "Stopped";
  return MachineStatus2;
})(MachineStatus || {});
var INIT_STATE = "__init__";



/***/ },

/***/ "./node_modules/@zag-js/dismissable/dist/dismissable-layer.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/@zag-js/dismissable/dist/dismissable-layer.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackDismissableBranch: () => (/* binding */ trackDismissableBranch),
/* harmony export */   trackDismissableElement: () => (/* binding */ trackDismissableElement)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/when-node.mjs");
/* harmony import */ var _zag_js_interact_outside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/interact-outside */ "./node_modules/@zag-js/interact-outside/dist/index.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/warning.mjs");
/* harmony import */ var _escape_keydown_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./escape-keydown.mjs */ "./node_modules/@zag-js/dismissable/dist/escape-keydown.mjs");
/* harmony import */ var _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layer-stack.mjs */ "./node_modules/@zag-js/dismissable/dist/layer-stack.mjs");
/* harmony import */ var _pointer_event_outside_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pointer-event-outside.mjs */ "./node_modules/@zag-js/dismissable/dist/pointer-event-outside.mjs");
// src/dismissable-layer.ts






function trackDismissableElementImpl(node, options) {
  const {
    onDismiss,
    onRequestDismiss,
    pointerBlocking,
    exclude: excludeContainers,
    debug,
    type = "dialog",
    layerStyleTargets
  } = options;
  const layer = {
    dismiss: onDismiss,
    node,
    type,
    pointerBlocking,
    requestDismiss: onRequestDismiss,
    styleTargets: layerStyleTargets
  };
  _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.add(layer);
  (0,_pointer_event_outside_mjs__WEBPACK_IMPORTED_MODULE_7__.assignPointerEventToLayers)();
  function onPointerDownOutside(event) {
    const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(event.detail.originalEvent);
    if (_layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.isBelowPointerBlockingLayer(node) || _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.isInBranch(target)) return;
    options.onPointerDownOutside?.(event);
    options.onInteractOutside?.(event);
    if (event.defaultPrevented) return;
    if (debug) {
      console.log("onPointerDownOutside:", event.detail.originalEvent);
    }
    onDismiss?.(event);
  }
  function onFocusOutside(event) {
    const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(event.detail.originalEvent);
    if (_layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.isInBranch(target)) return;
    options.onFocusOutside?.(event);
    options.onInteractOutside?.(event);
    if (event.defaultPrevented) return;
    if (debug) {
      console.log("onFocusOutside:", event.detail.originalEvent);
    }
    onDismiss?.(event);
  }
  function onEscapeKeyDown(event) {
    if (!_layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.isTopMost(node)) return;
    options.onEscapeKeyDown?.(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss(event);
    }
  }
  function exclude(target) {
    const containers = typeof excludeContainers === "function" ? excludeContainers() : excludeContainers;
    const _containers = Array.isArray(containers) ? containers : [containers];
    const persistentElements = options.persistentElements?.map((fn) => fn()).filter(_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement);
    if (persistentElements) _containers.push(...persistentElements);
    return _containers.some((node2) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.contains)(node2, target)) || _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.isInNestedLayer(node, target);
  }
  const cleanups = [
    pointerBlocking ? (0,_pointer_event_outside_mjs__WEBPACK_IMPORTED_MODULE_7__.disablePointerEventsOutside)(node, options.persistentElements) : void 0,
    (0,_escape_keydown_mjs__WEBPACK_IMPORTED_MODULE_5__.trackEscapeKeydown)(node, onEscapeKeyDown),
    (0,_zag_js_interact_outside__WEBPACK_IMPORTED_MODULE_3__.trackInteractOutside)(node, { exclude, onFocusOutside, onPointerDownOutside, defer: options.defer })
  ];
  return () => {
    _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.remove(node);
    (0,_pointer_event_outside_mjs__WEBPACK_IMPORTED_MODULE_7__.assignPointerEventToLayers)();
    (0,_pointer_event_outside_mjs__WEBPACK_IMPORTED_MODULE_7__.clearPointerEvent)(node);
    cleanups.forEach((fn) => fn?.());
  };
}
function trackDismissableElement(nodeOrFn, options) {
  const { warnOnMissingNode = true } = options;
  return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.whenNode)(nodeOrFn, (node) => trackDismissableElementImpl(node, options), {
    defer: options.defer,
    getRootNode: options.getRootNode,
    onMissing: warnOnMissingNode ? () => (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.warn)("[@zag-js/dismissable] node is `null` or `undefined`") : void 0
  });
}
function trackDismissableBranch(nodeOrFn, options = {}) {
  return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.whenNode)(
    nodeOrFn,
    (node) => {
      _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.addBranch(node);
      return () => {
        _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_6__.layerStack.removeBranch(node);
      };
    },
    {
      defer: options.defer,
      getRootNode: options.getRootNode,
      onMissing: () => (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.warn)("[@zag-js/dismissable] branch node is `null` or `undefined`")
    }
  );
}



/***/ },

/***/ "./node_modules/@zag-js/dismissable/dist/escape-keydown.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/@zag-js/dismissable/dist/escape-keydown.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackEscapeKeydown: () => (/* binding */ trackEscapeKeydown)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
// src/escape-keydown.ts

function trackEscapeKeydown(node, fn) {
  const handleKeyDown = (event) => {
    if (event.key !== "Escape") return;
    if (event.isComposing) return;
    fn?.(event);
  };
  return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.addDomEvent)((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getDocument)(node), "keydown", handleKeyDown, { capture: true });
}



/***/ },

/***/ "./node_modules/@zag-js/dismissable/dist/layer-stack.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@zag-js/dismissable/dist/layer-stack.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   layerStack: () => (/* binding */ layerStack)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/computed-style.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
// src/layer-stack.ts

var LAYER_REQUEST_DISMISS_EVENT = "layer:request-dismiss";
var layerStack = {
  layers: [],
  branches: [],
  recentlyRemoved: /* @__PURE__ */ new Set(),
  count() {
    return this.layers.length;
  },
  pointerBlockingLayers() {
    return this.layers.filter((layer) => layer.pointerBlocking);
  },
  topMostPointerBlockingLayer() {
    return [...this.pointerBlockingLayers()].slice(-1)[0];
  },
  hasPointerBlockingLayer() {
    return this.pointerBlockingLayers().length > 0;
  },
  isBelowPointerBlockingLayer(node) {
    const index = this.indexOf(node);
    const highestBlockingIndex = this.topMostPointerBlockingLayer() ? this.indexOf(this.topMostPointerBlockingLayer()?.node) : -1;
    return index < highestBlockingIndex;
  },
  isTopMost(node) {
    const layer = this.layers[this.count() - 1];
    return layer?.node === node;
  },
  getNestedLayers(node) {
    return Array.from(this.layers).slice(this.indexOf(node) + 1);
  },
  getLayersByType(type) {
    return this.layers.filter((layer) => layer.type === type);
  },
  getNestedLayersByType(node, type) {
    const index = this.indexOf(node);
    if (index === -1) return [];
    return this.layers.slice(index + 1).filter((layer) => layer.type === type);
  },
  getParentLayerOfType(node, type) {
    const index = this.indexOf(node);
    if (index <= 0) return void 0;
    return this.layers.slice(0, index).reverse().find((layer) => layer.type === type);
  },
  countNestedLayersOfType(node, type) {
    return this.getNestedLayersByType(node, type).length;
  },
  isInNestedLayer(node, target) {
    const inNested = this.getNestedLayers(node).some((layer) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.contains)(layer.node, target));
    if (inNested) return true;
    if (this.recentlyRemoved.size > 0) return true;
    return false;
  },
  isInBranch(target) {
    return Array.from(this.branches).some((branch) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.contains)(branch, target));
  },
  add(layer) {
    const existingIndex = this.indexOf(layer.node);
    if (existingIndex !== -1) {
      this.layers.splice(existingIndex, 1);
    }
    this.layers.push(layer);
    this.syncLayers();
  },
  addBranch(node) {
    this.branches.push(node);
  },
  remove(node) {
    const index = this.indexOf(node);
    if (index < 0) return;
    const layer = this.layers[index];
    layer.styleTargets?.forEach((getTarget) => {
      const target = getTarget();
      if (target) {
        clearLayerStyleMirror(target);
      }
    });
    this.recentlyRemoved.add(node);
    (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.nextTick)(() => this.recentlyRemoved.delete(node));
    if (index < this.count() - 1) {
      const _layers = this.getNestedLayers(node);
      _layers.forEach((layer2) => layerStack.dismiss(layer2.node, node));
    }
    this.layers.splice(index, 1);
    this.syncLayers();
  },
  removeBranch(node) {
    const index = this.branches.indexOf(node);
    if (index >= 0) this.branches.splice(index, 1);
  },
  syncLayers() {
    this.layers.forEach((layer, index) => {
      applyLayerStackMetadata(layer, index, layer.node);
      layer.styleTargets?.forEach((getTarget) => {
        const target = getTarget();
        if (!target || target === layer.node) return;
        applyLayerStackMetadata(layer, index, target);
        const { zIndex } = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(layer.node);
        target.style.setProperty("--z-index", zIndex);
      });
    });
  },
  indexOf(node) {
    return this.layers.findIndex((layer) => layer.node === node);
  },
  dismiss(node, parent) {
    const index = this.indexOf(node);
    if (index === -1) return;
    const layer = this.layers[index];
    addListenerOnce(node, LAYER_REQUEST_DISMISS_EVENT, (event) => {
      layer.requestDismiss?.(event);
      if (!event.defaultPrevented) {
        layer?.dismiss();
      }
    });
    fireCustomEvent(node, LAYER_REQUEST_DISMISS_EVENT, {
      originalLayer: node,
      targetLayer: parent,
      originalIndex: index,
      targetIndex: parent ? this.indexOf(parent) : -1
    });
    this.syncLayers();
  },
  clear() {
    this.remove(this.layers[0].node);
  }
};
function applyLayerStackMetadata(layer, index, el) {
  el.style.setProperty("--layer-index", `${index}`);
  el.removeAttribute("data-nested");
  el.removeAttribute("data-has-nested");
  const parentOfSameType = layerStack.getParentLayerOfType(layer.node, layer.type);
  if (parentOfSameType) {
    el.setAttribute("data-nested", layer.type);
  }
  const nestedCount = layerStack.countNestedLayersOfType(layer.node, layer.type);
  if (nestedCount > 0) {
    el.setAttribute("data-has-nested", layer.type);
  }
  el.style.setProperty("--nested-layer-count", `${nestedCount}`);
}
function clearLayerStyleMirror(el) {
  el.style.removeProperty("--layer-index");
  el.style.removeProperty("--nested-layer-count");
  el.removeAttribute("data-nested");
  el.removeAttribute("data-has-nested");
}
function fireCustomEvent(el, type, detail) {
  const win = el.ownerDocument.defaultView || window;
  const event = new win.CustomEvent(type, { cancelable: true, bubbles: true, detail });
  return el.dispatchEvent(event);
}
function addListenerOnce(el, type, callback) {
  el.addEventListener(type, callback, { once: true });
}



/***/ },

/***/ "./node_modules/@zag-js/dismissable/dist/pointer-event-outside.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/@zag-js/dismissable/dist/pointer-event-outside.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assignPointerEventToLayers: () => (/* binding */ assignPointerEventToLayers),
/* harmony export */   clearPointerEvent: () => (/* binding */ clearPointerEvent),
/* harmony export */   disablePointerEventsOutside: () => (/* binding */ disablePointerEventsOutside)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/set.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/wait-for.mjs");
/* harmony import */ var _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layer-stack.mjs */ "./node_modules/@zag-js/dismissable/dist/layer-stack.mjs");
// src/pointer-event-outside.ts


var originalBodyPointerEvents = /* @__PURE__ */ new WeakMap();
var layerObservers = /* @__PURE__ */ new WeakMap();
function getDesiredPointerEvents(node) {
  return _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_3__.layerStack.isBelowPointerBlockingLayer(node) ? "none" : "auto";
}
function applyPointerEvents(node) {
  const desired = getDesiredPointerEvents(node);
  if (node.style.pointerEvents !== desired) {
    node.style.pointerEvents = desired;
  }
}
function ensurePointerEventsObserver(node) {
  if (layerObservers.has(node)) return;
  const win = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getWindow)(node);
  if (typeof win.MutationObserver === "undefined") return;
  const observer = new win.MutationObserver(() => {
    if (!layerObservers.has(node)) return;
    applyPointerEvents(node);
  });
  observer.observe(node, { attributes: true, attributeFilter: ["style"] });
  layerObservers.set(node, observer);
}
function assignPointerEventToLayers() {
  _layer_stack_mjs__WEBPACK_IMPORTED_MODULE_3__.layerStack.layers.forEach(({ node }) => {
    applyPointerEvents(node);
    ensurePointerEventsObserver(node);
  });
}
function clearPointerEvent(node) {
  const observer = layerObservers.get(node);
  if (observer) {
    observer.disconnect();
    layerObservers.delete(node);
  }
  node.style.pointerEvents = "";
}
function disablePointerEventsOutside(node, persistentElements) {
  const doc = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getDocument)(node);
  const cleanups = [];
  if (_layer_stack_mjs__WEBPACK_IMPORTED_MODULE_3__.layerStack.hasPointerBlockingLayer() && !doc.body.hasAttribute("data-inert")) {
    originalBodyPointerEvents.set(doc.body, doc.body.style.pointerEvents);
    queueMicrotask(() => {
      const body = doc.body;
      if (!body) return;
      body.style.pointerEvents = "none";
      body.setAttribute("data-inert", "");
    });
  }
  persistentElements?.forEach((el) => {
    const [promise, abort] = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.waitForElement)(
      () => {
        const node2 = el();
        return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(node2) ? node2 : null;
      },
      { timeout: 1e3 }
    );
    promise.then((el2) => cleanups.push((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.setStyle)(el2, { pointerEvents: "auto" })));
    cleanups.push(abort);
  });
  return () => {
    if (_layer_stack_mjs__WEBPACK_IMPORTED_MODULE_3__.layerStack.hasPointerBlockingLayer()) return;
    queueMicrotask(() => {
      const body = doc.body;
      if (!body) return;
      const original = originalBodyPointerEvents.get(body);
      if (original !== void 0) {
        body.style.pointerEvents = original;
        originalBodyPointerEvents.delete(body);
      }
      body.removeAttribute("data-inert");
      if (body.style.length === 0) body.removeAttribute("style");
    });
    cleanups.forEach((fn) => fn());
  };
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/chunk-QZ7TP4HQ.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/chunk-QZ7TP4HQ.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __publicField: () => (/* binding */ __publicField)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);




/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/computed-style.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/computed-style.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");


// src/computed-style.ts

var styleCache = /* @__PURE__ */ new WeakMap();
function getComputedStyle(el) {
  if (!styleCache.has(el)) {
    styleCache.set(el, (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(el).getComputedStyle(el));
  }
  return styleCache.get(el);
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/controller.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/controller.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findControlledElements: () => (/* binding */ findControlledElements),
/* harmony export */   getControlledElements: () => (/* binding */ getControlledElements),
/* harmony export */   hasControllerElements: () => (/* binding */ hasControllerElements),
/* harmony export */   isControlledByExpandedController: () => (/* binding */ isControlledByExpandedController),
/* harmony export */   isControlledElement: () => (/* binding */ isControlledElement),
/* harmony export */   isControllerElement: () => (/* binding */ isControllerElement),
/* harmony export */   isInteractiveContainerElement: () => (/* binding */ isInteractiveContainerElement)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");


// src/controller.ts

var INTERACTIVE_CONTAINER_ROLE = /* @__PURE__ */ new Set(["menu", "listbox", "dialog", "grid", "tree", "region", "application"]);
var isInteractiveContainerRole = (role) => INTERACTIVE_CONTAINER_ROLE.has(role);
var getAriaControls = (element) => element.getAttribute("aria-controls")?.split(" ") || [];
function isControlledElement(container, element) {
  const visitedIds = /* @__PURE__ */ new Set();
  const rootNode = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getRootNode)(container);
  const checkElement = (searchRoot) => {
    const controllingElements = searchRoot.querySelectorAll("[aria-controls]");
    for (const controller of controllingElements) {
      if (controller.getAttribute("aria-expanded") !== "true") continue;
      const controlledIds = getAriaControls(controller);
      for (const id of controlledIds) {
        if (!id || visitedIds.has(id)) continue;
        visitedIds.add(id);
        const controlledElement = rootNode.getElementById(id);
        if (controlledElement) {
          const role = controlledElement.getAttribute("role");
          const modal = controlledElement.getAttribute("aria-modal") === "true";
          if (role && isInteractiveContainerRole(role) && !modal) {
            if (controlledElement === element || controlledElement.contains(element)) {
              return true;
            }
            if (checkElement(controlledElement)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  return checkElement(container);
}
function findControlledElements(searchRoot, callback) {
  const rootNode = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getRootNode)(searchRoot);
  const visitedIds = /* @__PURE__ */ new Set();
  const findRecursive = (root) => {
    const controllingElements = root.querySelectorAll("[aria-controls]");
    for (const controller of controllingElements) {
      if (controller.getAttribute("aria-expanded") !== "true") continue;
      const controlledIds = getAriaControls(controller);
      for (const id of controlledIds) {
        if (!id || visitedIds.has(id)) continue;
        visitedIds.add(id);
        const controlledElement = rootNode.getElementById(id);
        if (controlledElement) {
          const role = controlledElement.getAttribute("role");
          const modal = controlledElement.getAttribute("aria-modal") === "true";
          if (role && INTERACTIVE_CONTAINER_ROLE.has(role) && !modal) {
            callback(controlledElement);
            findRecursive(controlledElement);
          }
        }
      }
    }
  };
  findRecursive(searchRoot);
}
function getControlledElements(container) {
  const controlledElements = /* @__PURE__ */ new Set();
  findControlledElements(container, (controlledElement) => {
    if (!container.contains(controlledElement)) {
      controlledElements.add(controlledElement);
    }
  });
  return Array.from(controlledElements);
}
function isInteractiveContainerElement(element) {
  const role = element.getAttribute("role");
  return Boolean(role && INTERACTIVE_CONTAINER_ROLE.has(role));
}
function isControllerElement(element) {
  return element.hasAttribute("aria-controls") && element.getAttribute("aria-expanded") === "true";
}
function hasControllerElements(element) {
  if (isControllerElement(element)) return true;
  return Boolean(element.querySelector?.('[aria-controls][aria-expanded="true"]'));
}
function isControlledByExpandedController(element) {
  if (!element.id) return false;
  const rootNode = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getRootNode)(element);
  const escapedId = CSS.escape(element.id);
  const selector = `[aria-controls~="${escapedId}"][aria-expanded="true"], [aria-controls="${escapedId}"][aria-expanded="true"]`;
  const controller = rootNode.querySelector(selector);
  return Boolean(controller && isInteractiveContainerElement(element));
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/event.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/event.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDomEvent: () => (/* binding */ addDomEvent),
/* harmony export */   getBeforeInputValue: () => (/* binding */ getBeforeInputValue),
/* harmony export */   getEventKey: () => (/* binding */ getEventKey),
/* harmony export */   getEventPoint: () => (/* binding */ getEventPoint),
/* harmony export */   getEventStep: () => (/* binding */ getEventStep),
/* harmony export */   getEventStepValue: () => (/* binding */ getEventStepValue),
/* harmony export */   getEventTarget: () => (/* binding */ getEventTarget),
/* harmony export */   getNativeEvent: () => (/* binding */ getNativeEvent),
/* harmony export */   isComposingEvent: () => (/* binding */ isComposingEvent),
/* harmony export */   isContextMenuEvent: () => (/* binding */ isContextMenuEvent),
/* harmony export */   isCtrlOrMetaKey: () => (/* binding */ isCtrlOrMetaKey),
/* harmony export */   isDownloadingEvent: () => (/* binding */ isDownloadingEvent),
/* harmony export */   isKeyboardClick: () => (/* binding */ isKeyboardClick),
/* harmony export */   isLeftClick: () => (/* binding */ isLeftClick),
/* harmony export */   isModifierKey: () => (/* binding */ isModifierKey),
/* harmony export */   isOpeningInNewTab: () => (/* binding */ isOpeningInNewTab),
/* harmony export */   isPrintableKey: () => (/* binding */ isPrintableKey),
/* harmony export */   isSelfTarget: () => (/* binding */ isSelfTarget),
/* harmony export */   isTouchEvent: () => (/* binding */ isTouchEvent),
/* harmony export */   isVirtualClick: () => (/* binding */ isVirtualClick),
/* harmony export */   isVirtualPointerEvent: () => (/* binding */ isVirtualPointerEvent)
/* harmony export */ });
/* harmony import */ var _platform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform.mjs */ "./node_modules/@zag-js/dom-query/dist/platform.mjs");


// src/event.ts

function getBeforeInputValue(event) {
  const { selectionStart, selectionEnd, value } = event.currentTarget;
  const data = event.data;
  return value.slice(0, selectionStart) + (data ?? "") + value.slice(selectionEnd);
}
function getComposedPath(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget(event) {
  const composedPath = getComposedPath(event);
  return composedPath?.[0] ?? event.target;
}
function isOpeningInNewTab(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const validElement = element.matches("a[href], button[type='submit'], input[type='submit']");
  if (!validElement) return false;
  const isMiddleClick = event.button === 1;
  const isModKeyClick = isCtrlOrMetaKey(event);
  return isMiddleClick || isModKeyClick;
}
function isDownloadingEvent(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const localName = element.localName;
  if (!event.altKey) return false;
  if (localName === "a") return true;
  if (localName === "button" && element.type === "submit") return true;
  if (localName === "input" && element.type === "submit") return true;
  return false;
}
function isComposingEvent(event) {
  return getNativeEvent(event).isComposing || event.keyCode === 229;
}
function isKeyboardClick(e) {
  return e.detail === 0 || e.clientX === 0 && e.clientY === 0;
}
function isCtrlOrMetaKey(e) {
  if ((0,_platform_mjs__WEBPACK_IMPORTED_MODULE_0__.isMac)()) return e.metaKey;
  return e.ctrlKey;
}
function isPrintableKey(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function isVirtualPointerEvent(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse";
}
function isVirtualClick(e) {
  if (e.pointerType === "" && e.isTrusted) return true;
  if ((0,_platform_mjs__WEBPACK_IMPORTED_MODULE_0__.isAndroid)() && e.pointerType) {
    return e.type === "click" && e.buttons === 1;
  }
  return e.detail === 0 && !e.pointerType;
}
var isLeftClick = (e) => e.button === 0;
var isContextMenuEvent = (e) => {
  return e.button === 2 || (0,_platform_mjs__WEBPACK_IMPORTED_MODULE_0__.isMac)() && e.ctrlKey && e.button === 0;
};
var isModifierKey = (e) => e.ctrlKey || e.altKey || e.metaKey;
var isTouchEvent = (event) => "touches" in event && event.touches.length > 0;
var keyMap = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
};
var rtlKeyMap = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function getEventKey(event, options = {}) {
  const { dir = "ltr", orientation = "horizontal" } = options;
  let key = event.key;
  key = keyMap[key] ?? key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap) key = rtlKeyMap[key];
  return key;
}
function getNativeEvent(event) {
  return event.nativeEvent ?? event;
}
var pageKeys = /* @__PURE__ */ new Set(["PageUp", "PageDown"]);
var arrowKeys = /* @__PURE__ */ new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
function getEventStep(event) {
  const isPageKey = pageKeys.has(event.key);
  const isSkipKey = isPageKey || event.shiftKey && arrowKeys.has(event.key);
  return isSkipKey ? 10 : 1;
}
function getEventStepValue(event, options) {
  const { step, largeStep, smallStep } = options;
  const isArrowKey = arrowKeys.has(event.key);
  if (smallStep != null && event.altKey && isArrowKey) {
    return smallStep;
  }
  const isLargeStep = pageKeys.has(event.key) || event.shiftKey && isArrowKey;
  return isLargeStep ? largeStep : step;
}
function getEventPoint(event, type = "client") {
  const point = isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
  return { x: point[`${type}X`], y: point[`${type}Y`] };
}
var addDomEvent = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};
var isSelfTarget = (event) => {
  const composedPath = getComposedPath(event);
  const target = composedPath?.[0] ?? event.target;
  return event.currentTarget === target;
};



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/form.mjs"
/*!******************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/form.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dispatchInputCheckedEvent: () => (/* binding */ dispatchInputCheckedEvent),
/* harmony export */   dispatchInputValueEvent: () => (/* binding */ dispatchInputValueEvent),
/* harmony export */   isInternalChangeEvent: () => (/* binding */ isInternalChangeEvent),
/* harmony export */   markAsInternalChangeEvent: () => (/* binding */ markAsInternalChangeEvent),
/* harmony export */   setElementChecked: () => (/* binding */ setElementChecked),
/* harmony export */   setElementValue: () => (/* binding */ setElementValue),
/* harmony export */   trackFormControl: () => (/* binding */ trackFormControl)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");


// src/form.ts

function getDescriptor(el, options) {
  const { type = "HTMLInputElement", property = "value" } = options;
  const proto = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(el)[type].prototype;
  return Object.getOwnPropertyDescriptor(proto, property) ?? {};
}
function getElementType(el) {
  if (el.localName === "input") return "HTMLInputElement";
  if (el.localName === "textarea") return "HTMLTextAreaElement";
  if (el.localName === "select") return "HTMLSelectElement";
}
function setElementValue(el, value, property = "value") {
  if (!el) return;
  const type = getElementType(el);
  if (type) {
    const descriptor = getDescriptor(el, { type, property });
    descriptor.set?.call(el, value);
  }
  el.setAttribute(property, value);
}
function setElementChecked(el, checked) {
  if (!el) return;
  const descriptor = getDescriptor(el, { type: "HTMLInputElement", property: "checked" });
  descriptor.set?.call(el, checked);
  if (checked) el.setAttribute("checked", "");
  else el.removeAttribute("checked");
}
function dispatchInputValueEvent(el, options) {
  const { value, bubbles = true } = options;
  if (!el) return;
  const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(el);
  if (!(el instanceof win.HTMLInputElement)) return;
  setElementValue(el, `${value}`);
  const event = new win.Event("input", { bubbles });
  el.dispatchEvent(markAsInternalChangeEvent(event));
}
function dispatchInputCheckedEvent(el, options) {
  const { checked, bubbles = true } = options;
  if (!el) return;
  const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(el);
  if (!(el instanceof win.HTMLInputElement)) return;
  setElementChecked(el, checked);
  const event = new win.Event("click", { bubbles });
  el.dispatchEvent(markAsInternalChangeEvent(event));
}
function isFormElement(el) {
  return el.matches("textarea, input, select, button");
}
function trackFormReset(el, callback) {
  if (!el) return;
  const form = isFormElement(el) ? el.form : el.closest("form");
  const onReset = (e) => {
    if (e.defaultPrevented) return;
    callback();
  };
  form?.addEventListener("reset", onReset, { passive: true });
  return () => form?.removeEventListener("reset", onReset);
}
function trackFieldsetDisabled(el, callback) {
  const fieldset = el?.closest("fieldset");
  if (!fieldset) return;
  callback(fieldset.disabled);
  const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(fieldset);
  const obs = new win.MutationObserver(() => callback(fieldset.disabled));
  obs.observe(fieldset, {
    attributes: true,
    attributeFilter: ["disabled"]
  });
  return () => obs.disconnect();
}
function trackFormControl(el, options) {
  if (!el) return;
  const { onFieldsetDisabledChange, onFormReset } = options;
  const cleanups = [trackFormReset(el, onFormReset), trackFieldsetDisabled(el, onFieldsetDisabledChange)];
  return () => cleanups.forEach((cleanup) => cleanup?.());
}
var INTERNAL_CHANGE_EVENT = /* @__PURE__ */ Symbol.for("zag.changeEvent");
function isInternalChangeEvent(e) {
  return Object.prototype.hasOwnProperty.call(e, INTERNAL_CHANGE_EVENT);
}
function markAsInternalChangeEvent(event) {
  if (isInternalChangeEvent(event)) return event;
  Object.defineProperty(event, INTERNAL_CHANGE_EVENT, { value: true });
  return event;
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/initial-focus.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/initial-focus.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getInitialFocus: () => (/* binding */ getInitialFocus),
/* harmony export */   isValidTabEvent: () => (/* binding */ isValidTabEvent)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _tabbable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabbable.mjs */ "./node_modules/@zag-js/dom-query/dist/tabbable.mjs");


// src/initial-focus.ts


function getInitialFocus(options) {
  const { root, getInitialEl, filter, enabled = true } = options;
  if (!enabled) return false;
  let node = typeof getInitialEl === "function" ? getInitialEl() : getInitialEl;
  if (node === false) return false;
  node || (node = root?.matches("[data-autofocus],[autofocus]") ? root : root?.querySelector("[data-autofocus],[autofocus]"));
  if (!node) {
    const tabbables = (0,_tabbable_mjs__WEBPACK_IMPORTED_MODULE_1__.getTabbables)(root).filter((el) => filter ? filter(el) : true);
    node = tabbables.find((el) => !el.hasAttribute("data-no-autofocus"));
  }
  return node || root || void 0;
}
function isValidTabEvent(event) {
  const container = event.currentTarget;
  if (!container) return false;
  const [firstTabbable, lastTabbable] = (0,_tabbable_mjs__WEBPACK_IMPORTED_MODULE_1__.getTabbableEdges)(container);
  if ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isActiveElement)(firstTabbable) && event.shiftKey) return false;
  if ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isActiveElement)(lastTabbable) && !event.shiftKey) return false;
  if (!firstTabbable && !lastTabbable) return false;
  return true;
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/mutation-observer.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/mutation-observer.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSharedMutationObserver: () => (/* binding */ createSharedMutationObserver),
/* harmony export */   observeAttributes: () => (/* binding */ observeAttributes),
/* harmony export */   observeChildren: () => (/* binding */ observeChildren)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _raf_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raf.mjs */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared.mjs */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");


// src/mutation-observer.ts



var targets = /* @__PURE__ */ new WeakMap();
function normalizeOptions(options) {
  const config = {
    childList: !!options.childList,
    subtree: !!options.subtree,
    // An old-value option or filter implies observation, like the native defaults
    attributes: options.attributes ?? (options.attributeOldValue !== void 0 || options.attributeFilter !== void 0),
    characterData: options.characterData ?? options.characterDataOldValue !== void 0,
    attributeOldValue: !!options.attributeOldValue,
    characterDataOldValue: !!options.characterDataOldValue
  };
  if (options.attributeFilter !== void 0) config.attributeFilter = [...new Set(options.attributeFilter)].sort();
  return config;
}
function createSharedMutationObserver(options) {
  const config = normalizeOptions(options);
  const key = JSON.stringify(config);
  return {
    observe(target, listener) {
      const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(target);
      if (typeof win.MutationObserver !== "function") return _shared_mjs__WEBPACK_IMPORTED_MODULE_2__.noop;
      const configurations = targets.get(target) ?? /* @__PURE__ */ new Map();
      let entry = configurations.get(key);
      if (!entry) {
        const listeners = /* @__PURE__ */ new Set();
        const observer = new win.MutationObserver((records) => {
          for (const callback2 of [...listeners]) {
            if (!listeners.has(callback2)) continue;
            try {
              callback2(records);
            } catch (error) {
              win.queueMicrotask(() => {
                throw error;
              });
            }
          }
        });
        observer.observe(target, config);
        entry = { observer, listeners };
        configurations.set(key, entry);
        targets.set(target, configurations);
      }
      const callback = (records) => listener(records);
      entry.listeners.add(callback);
      return () => {
        if (!entry.listeners.delete(callback) || entry.listeners.size > 0) return;
        entry.observer.disconnect();
        configurations.delete(key);
        if (configurations.size === 0) targets.delete(target);
      };
    }
  };
}
function observeAttributesImpl(node, options) {
  if (!node) return;
  const { attributes, callback: fn } = options;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes" && change.attributeName && attributes.includes(change.attributeName)) {
        fn(change);
      }
    }
  });
  obs.observe(node, { attributes: true, attributeFilter: attributes });
  return () => obs.disconnect();
}
function observeAttributes(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? _raf_mjs__WEBPACK_IMPORTED_MODULE_1__.raf : (v) => v();
  const cleanups = [];
  cleanups.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups.push(observeAttributesImpl(node, options));
    })
  );
  return () => {
    cleanups.forEach((fn) => fn?.());
  };
}
function observeChildrenImpl(node, options) {
  const { callback: fn } = options;
  if (!node) return;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver(fn);
  obs.observe(node, { childList: true, subtree: true });
  return () => obs.disconnect();
}
function observeChildren(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? _raf_mjs__WEBPACK_IMPORTED_MODULE_1__.raf : (v) => v();
  const cleanups = [];
  cleanups.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups.push(observeChildrenImpl(node, options));
    })
  );
  return () => {
    cleanups.forEach((fn) => fn?.());
  };
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/node.mjs"
/*!******************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/node.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   getActiveElement: () => (/* binding */ getActiveElement),
/* harmony export */   getAncestorElements: () => (/* binding */ getAncestorElements),
/* harmony export */   getDocument: () => (/* binding */ getDocument),
/* harmony export */   getDocumentElement: () => (/* binding */ getDocumentElement),
/* harmony export */   getNodeName: () => (/* binding */ getNodeName),
/* harmony export */   getParentElement: () => (/* binding */ getParentElement),
/* harmony export */   getParentNode: () => (/* binding */ getParentNode),
/* harmony export */   getRootNode: () => (/* binding */ getRootNode),
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   isActiveElement: () => (/* binding */ isActiveElement),
/* harmony export */   isAnchorElement: () => (/* binding */ isAnchorElement),
/* harmony export */   isDocument: () => (/* binding */ isDocument),
/* harmony export */   isEditableElement: () => (/* binding */ isEditableElement),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isElementVisible: () => (/* binding */ isElementVisible),
/* harmony export */   isFocusOutside: () => (/* binding */ isFocusOutside),
/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),
/* harmony export */   isInputElement: () => (/* binding */ isInputElement),
/* harmony export */   isNode: () => (/* binding */ isNode),
/* harmony export */   isRootElement: () => (/* binding */ isRootElement),
/* harmony export */   isShadowRoot: () => (/* binding */ isShadowRoot),
/* harmony export */   isVisualViewport: () => (/* binding */ isVisualViewport),
/* harmony export */   isWindow: () => (/* binding */ isWindow)
/* harmony export */ });
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared.mjs */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");


// src/node.ts

var ELEMENT_NODE = 1;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
var isElement = (el) => (0,_shared_mjs__WEBPACK_IMPORTED_MODULE_0__.isObject)(el) && el.nodeType === ELEMENT_NODE && typeof el.nodeName === "string";
var isHTMLElement = (el) => (0,_shared_mjs__WEBPACK_IMPORTED_MODULE_0__.isObject)(el) && el.nodeType === ELEMENT_NODE && typeof el.nodeName === "string";
var isDocument = (el) => (0,_shared_mjs__WEBPACK_IMPORTED_MODULE_0__.isObject)(el) && el.nodeType === DOCUMENT_NODE;
var isWindow = (el) => (0,_shared_mjs__WEBPACK_IMPORTED_MODULE_0__.isObject)(el) && el === el.window;
var isVisualViewport = (el) => (0,_shared_mjs__WEBPACK_IMPORTED_MODULE_0__.isObject)(el) && el.constructor.name === "VisualViewport";
var getNodeName = (node) => {
  if (isHTMLElement(node)) return node.localName || "";
  return "#document";
};
function isRootElement(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
var isNode = (el) => (0,_shared_mjs__WEBPACK_IMPORTED_MODULE_0__.isObject)(el) && el.nodeType !== void 0;
var isShadowRoot = (el) => isNode(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in el;
var isInputElement = (el) => isHTMLElement(el) && el.localName === "input";
var isAnchorElement = (el) => !!el?.matches("a[href]");
var isElementVisible = (el) => {
  if (!isHTMLElement(el)) return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
};
function isActiveElement(element) {
  if (!element) return false;
  const rootNode = element.getRootNode();
  return getActiveElement(rootNode) === element;
}
var TEXTAREA_SELECT_REGEX = /(textarea|select)/;
function isEditableElement(el) {
  if (el == null || !isHTMLElement(el)) return false;
  try {
    return isInputElement(el) && el.selectionStart != null || TEXTAREA_SELECT_REGEX.test(el.localName) || el.isContentEditable || el.getAttribute("contenteditable") === "true" || el.getAttribute("contenteditable") === "";
  } catch {
    return false;
  }
}
function getParentElement(node) {
  const parentNode = node.parentNode;
  if (isShadowRoot(parentNode)) return parentNode.host;
  return parentNode;
}
function getAncestorElements(node) {
  const ancestors = [];
  while (node) {
    ancestors.push(node);
    node = getParentElement(node);
  }
  return ancestors;
}
function contains(parent, child) {
  if (!parent || !child) return false;
  if (!isHTMLElement(parent) || !isNode(child)) return false;
  if (isHTMLElement(child) && parent === child) return true;
  if (parent.contains(child)) return true;
  const rootNode = child.getRootNode?.();
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) return true;
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getDocument(el) {
  if (isDocument(el)) return el;
  if (isWindow(el)) return el.document;
  return el?.ownerDocument ?? document;
}
function getDocumentElement(el) {
  return getDocument(el).documentElement;
}
function getWindow(el) {
  if (isShadowRoot(el)) return getWindow(el.host);
  if (isDocument(el)) return el.defaultView ?? window;
  if (isHTMLElement(el)) return el.ownerDocument?.defaultView ?? window;
  return window;
}
function getActiveElement(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (!el || el === activeElement) break;
    else activeElement = el;
  }
  return activeElement;
}
function isFocusOutside(activeEl, containers) {
  if (!activeEl || activeEl === getDocument(activeEl).body) return false;
  return !containers.some((container) => contains(container, activeEl));
}
function getParentNode(node) {
  if (getNodeName(node) === "html") return node;
  const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getRootNode(node) {
  let result;
  try {
    result = node.getRootNode({ composed: true });
    if (isDocument(result) || isShadowRoot(result)) return result;
  } catch {
  }
  return node.ownerDocument ?? document;
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/overflow.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/overflow.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNearestOverflowAncestor: () => (/* binding */ getNearestOverflowAncestor),
/* harmony export */   getOverflowAncestors: () => (/* binding */ getOverflowAncestors),
/* harmony export */   getScrollParent: () => (/* binding */ getScrollParent),
/* harmony export */   isInView: () => (/* binding */ isInView),
/* harmony export */   isOverflowElement: () => (/* binding */ isOverflowElement),
/* harmony export */   isScrollable: () => (/* binding */ isScrollable)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");


// src/overflow.ts

function getNearestOverflowAncestor(el) {
  const parentNode = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getParentNode)(el);
  if ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isRootElement)(parentNode)) return (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getDocument)(parentNode).body;
  if ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(parentNode) && isOverflowElement(parentNode)) return parentNode;
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(el, list = []) {
  const scrollableAncestor = getNearestOverflowAncestor(el);
  const isBody = scrollableAncestor === el.ownerDocument.body;
  const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, []));
}
var getElementRect = (el) => {
  if ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(el)) return el.getBoundingClientRect();
  if ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isVisualViewport)(el)) return { top: 0, left: 0, bottom: el.height, right: el.width };
  return { top: 0, left: 0, bottom: el.innerHeight, right: el.innerWidth };
};
function isInView(el, ancestor) {
  if (!(0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(el)) return true;
  const ancestorRect = getElementRect(ancestor);
  const elRect = el.getBoundingClientRect();
  return elRect.top >= ancestorRect.top && elRect.left >= ancestorRect.left && elRect.bottom <= ancestorRect.bottom && elRect.right <= ancestorRect.right;
}
var OVERFLOW_RE = /auto|scroll|overlay|hidden|clip/;
var nonOverflowValues = /* @__PURE__ */ new Set(["inline", "contents"]);
function isOverflowElement(el) {
  const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(el);
  const { overflow, overflowX, overflowY, display } = win.getComputedStyle(el);
  return OVERFLOW_RE.test(overflow + overflowY + overflowX) && !nonOverflowValues.has(display);
}
var SCROLL_RE = /auto|scroll|overlay|hidden/;
function isScrollable(el, options = {}) {
  const { axis } = options;
  const { overflowX, overflowY } = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(el).getComputedStyle(el);
  const x = axis !== "y" && SCROLL_RE.test(overflowX) && el.scrollWidth > el.clientWidth;
  const y = axis !== "x" && SCROLL_RE.test(overflowY) && el.scrollHeight > el.clientHeight;
  return x || y;
}
function getScrollParent(el, options = {}) {
  const { stop } = options;
  let node = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getParentNode)(el);
  while ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(node) && !(0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isRootElement)(node)) {
    if (stop?.(node)) return null;
    if (isScrollable(node, options)) return node;
    node = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getParentNode)(node);
  }
  return null;
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/platform.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/platform.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPlatform: () => (/* binding */ getPlatform),
/* harmony export */   getUserAgent: () => (/* binding */ getUserAgent),
/* harmony export */   isAndroid: () => (/* binding */ isAndroid),
/* harmony export */   isApple: () => (/* binding */ isApple),
/* harmony export */   isChrome: () => (/* binding */ isChrome),
/* harmony export */   isDom: () => (/* binding */ isDom),
/* harmony export */   isFirefox: () => (/* binding */ isFirefox),
/* harmony export */   isIPad: () => (/* binding */ isIPad),
/* harmony export */   isIPhone: () => (/* binding */ isIPhone),
/* harmony export */   isIos: () => (/* binding */ isIos),
/* harmony export */   isLinux: () => (/* binding */ isLinux),
/* harmony export */   isMac: () => (/* binding */ isMac),
/* harmony export */   isSafari: () => (/* binding */ isSafari),
/* harmony export */   isTouchDevice: () => (/* binding */ isTouchDevice),
/* harmony export */   isWebKit: () => (/* binding */ isWebKit)
/* harmony export */ });


// src/platform.ts
var isDom = () => typeof document !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
function getUserAgent() {
  const ua2 = navigator.userAgentData;
  if (ua2 && Array.isArray(ua2.brands)) {
    return ua2.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ");
  }
  return navigator.userAgent;
}
var pt = (v) => isDom() && v.test(getPlatform());
var ua = (v) => isDom() && v.test(getUserAgent());
var vn = (v) => isDom() && v.test(navigator.vendor);
var IPHONE_REGEX = /^iPhone/i;
var IPAD_REGEX = /^iPad/i;
var MAC_REGEX = /^Mac/i;
var APPLE_VENDOR_REGEX = /apple/i;
var FIREFOX_REGEX = /Firefox/i;
var CHROME_REGEX = /Chrome/i;
var WEBKIT_REGEX = /AppleWebKit/i;
var ANDROID_REGEX = /Android/i;
var LINUX_PLATFORM_REGEX = /^(Linux|CrOS|Chrome ?OS|Chromium ?OS)/i;
var isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
var isIPhone = () => pt(IPHONE_REGEX);
var isIPad = () => pt(IPAD_REGEX) || isMac() && navigator.maxTouchPoints > 1;
var isIos = () => isIPhone() || isIPad();
var isApple = () => isMac() || isIos();
var isMac = () => pt(MAC_REGEX);
var isSafari = () => isApple() && vn(APPLE_VENDOR_REGEX);
var isFirefox = () => ua(FIREFOX_REGEX);
var isChrome = () => ua(CHROME_REGEX);
var isWebKit = () => ua(WEBKIT_REGEX) && !isChrome();
var isAndroid = () => ua(ANDROID_REGEX);
var isLinux = () => pt(LINUX_PLATFORM_REGEX) && !isAndroid();



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/query.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/query.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultItemToId: () => (/* binding */ defaultItemToId),
/* harmony export */   indexOfId: () => (/* binding */ indexOfId),
/* harmony export */   itemById: () => (/* binding */ itemById),
/* harmony export */   nextById: () => (/* binding */ nextById),
/* harmony export */   prevById: () => (/* binding */ prevById),
/* harmony export */   query: () => (/* binding */ query),
/* harmony export */   queryAll: () => (/* binding */ queryAll)
/* harmony export */ });


// src/query.ts
function queryAll(root, selector) {
  return Array.from(root?.querySelectorAll(selector) ?? []);
}
function query(root, selector) {
  return root?.querySelector(selector) ?? null;
}
var defaultItemToId = (v) => v.id;
function itemById(v, id, itemToId = defaultItemToId) {
  return v.find((item) => itemToId(item) === id);
}
function indexOfId(v, id, itemToId = defaultItemToId) {
  const item = itemById(v, id, itemToId);
  return item ? v.indexOf(item) : -1;
}
function nextById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
  return v[idx];
}
function prevById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  if (idx === -1) return loop ? v[v.length - 1] : null;
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
  return v[idx];
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/raf.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/raf.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationFrame: () => (/* binding */ AnimationFrame),
/* harmony export */   nextTick: () => (/* binding */ nextTick),
/* harmony export */   queueBeforeEvent: () => (/* binding */ queueBeforeEvent),
/* harmony export */   raf: () => (/* binding */ raf)
/* harmony export */ });
/* harmony import */ var _chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-QZ7TP4HQ.mjs */ "./node_modules/@zag-js/dom-query/dist/chunk-QZ7TP4HQ.mjs");


// src/raf.ts
var AnimationFrame = class _AnimationFrame {
  constructor() {
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "id", null);
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "fn_cleanup");
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "cleanup", () => {
      this.cancel();
    });
  }
  static create() {
    return new _AnimationFrame();
  }
  request(fn) {
    this.cancel();
    this.id = globalThis.requestAnimationFrame(() => {
      this.id = null;
      this.fn_cleanup = fn?.();
    });
  }
  cancel() {
    if (this.id !== null) {
      globalThis.cancelAnimationFrame(this.id);
      this.id = null;
    }
    this.fn_cleanup?.();
    this.fn_cleanup = void 0;
  }
  isActive() {
    return this.id !== null;
  }
};
function raf(fn) {
  const frame = AnimationFrame.create();
  frame.request(fn);
  return frame.cleanup;
}
function nextTick(fn) {
  const set = /* @__PURE__ */ new Set();
  function raf2(fn2) {
    const id = globalThis.requestAnimationFrame(fn2);
    set.add(() => globalThis.cancelAnimationFrame(id));
  }
  raf2(() => raf2(fn));
  return function cleanup() {
    set.forEach((fn2) => fn2());
  };
}
function queueBeforeEvent(el, type, cb) {
  const cancelTimer = raf(() => {
    el.removeEventListener(type, exec, true);
    cb();
  });
  const exec = () => {
    cancelTimer();
    cb();
  };
  el.addEventListener(type, exec, { once: true, capture: true });
  return cancelTimer;
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/resize-observer.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/resize-observer.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resizeObserverBorderBox: () => (/* binding */ resizeObserverBorderBox),
/* harmony export */   resizeObserverContentBox: () => (/* binding */ resizeObserverContentBox),
/* harmony export */   resizeObserverDevicePixelContentBox: () => (/* binding */ resizeObserverDevicePixelContentBox)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.mjs */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");


// src/resize-observer.ts


function createSharedResizeObserver(options) {
  const listeners = /* @__PURE__ */ new WeakMap();
  let observer;
  const entries = /* @__PURE__ */ new WeakMap();
  const getObserver = (win) => {
    if (observer) return observer;
    observer = new win.ResizeObserver((observedEntries) => {
      for (const entry of observedEntries) {
        entries.set(entry.target, entry);
        const elementListeners = listeners.get(entry.target);
        if (elementListeners) {
          for (const listener of elementListeners) {
            listener(entry);
          }
        }
      }
    });
    return observer;
  };
  const observe = (element, listener) => {
    const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(element);
    if (typeof win.ResizeObserver !== "function") return _shared_mjs__WEBPACK_IMPORTED_MODULE_1__.noop;
    let elementListeners = listeners.get(element) || /* @__PURE__ */ new Set();
    elementListeners.add(listener);
    listeners.set(element, elementListeners);
    getObserver(win).observe(element, options);
    return () => {
      const elementListeners2 = listeners.get(element);
      if (!elementListeners2) return;
      elementListeners2.delete(listener);
      if (elementListeners2.size === 0) {
        listeners.delete(element);
        getObserver(win).unobserve(element);
      }
    };
  };
  const unobserve = (element) => {
    listeners.delete(element);
    observer?.unobserve(element);
  };
  return {
    observe,
    unobserve
  };
}
var resizeObserverContentBox = /* @__PURE__ */ createSharedResizeObserver({
  box: "content-box"
});
var resizeObserverBorderBox = /* @__PURE__ */ createSharedResizeObserver({
  box: "border-box"
});
var resizeObserverDevicePixelContentBox = /* @__PURE__ */ createSharedResizeObserver({
  box: "device-pixel-content-box"
});



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/scroll.mjs"
/*!********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/scroll.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNearestScrollOffset: () => (/* binding */ getNearestScrollOffset),
/* harmony export */   getScrollPosition: () => (/* binding */ getScrollPosition),
/* harmony export */   getScrollTopToElement: () => (/* binding */ getScrollTopToElement),
/* harmony export */   scrollIntoView: () => (/* binding */ scrollIntoView),
/* harmony export */   scrollToElement: () => (/* binding */ scrollToElement),
/* harmony export */   scrollToNearest: () => (/* binding */ scrollToNearest),
/* harmony export */   trackScrollEnd: () => (/* binding */ trackScrollEnd)
/* harmony export */ });
/* harmony import */ var _computed_style_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computed-style.mjs */ "./node_modules/@zag-js/dom-query/dist/computed-style.mjs");
/* harmony import */ var _event_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event.mjs */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _overflow_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overflow.mjs */ "./node_modules/@zag-js/dom-query/dist/overflow.mjs");
/* harmony import */ var _timeout_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timeout.mjs */ "./node_modules/@zag-js/dom-query/dist/timeout.mjs");


// src/scroll.ts





function scrollIntoView(el, options) {
  const { rootEl, ...scrollOptions } = options || {};
  if (!el || !rootEl) return;
  if (!(0,_overflow_mjs__WEBPACK_IMPORTED_MODULE_3__.isScrollable)(rootEl)) return;
  el.scrollIntoView(scrollOptions);
}
function getScrollTopToElement(el, rootEl) {
  const elTop = el.getBoundingClientRect().top;
  let distance = elTop;
  if (rootEl !== rootEl.ownerDocument.scrollingElement) {
    const rootRect = rootEl.getBoundingClientRect();
    const scale = rootEl.offsetHeight ? rootRect.height / rootEl.offsetHeight : 1;
    distance = (elTop - rootRect.top) / scale - rootEl.clientTop;
  }
  const padding = getLength((0,_computed_style_mjs__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(rootEl).scrollPaddingTop, rootEl.clientHeight);
  const margin = getNumericStyle((0,_computed_style_mjs__WEBPACK_IMPORTED_MODULE_0__.getComputedStyle)(el).scrollMarginTop);
  const maxScroll = rootEl.scrollHeight - rootEl.clientHeight;
  return Math.min(Math.max(rootEl.scrollTop + distance - padding - margin, 0), maxScroll);
}
function scrollToElement(el, options) {
  const { rootEl, behavior } = options || {};
  if (!el || !rootEl || !rootEl.contains(el)) return false;
  rootEl.scrollTo({ top: getScrollTopToElement(el, rootEl), ...behavior && { behavior } });
  return true;
}
function getNearestScrollOffset(el, options) {
  const { rootEl } = options || {};
  if (!el || !rootEl || !rootEl.contains(el)) return null;
  const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_2__.getWindow)(rootEl);
  const rootRect = rootEl.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const rootStyle = win.getComputedStyle(rootEl);
  const elStyle = win.getComputedStyle(el);
  const scaleX = rootEl.offsetWidth ? rootRect.width / rootEl.offsetWidth : 1;
  const scaleY = rootEl.offsetHeight ? rootRect.height / rootEl.offsetHeight : 1;
  const { clientTop, clientLeft, clientWidth, clientHeight } = rootEl;
  const deltaY = alignNearest(
    clientTop + getLength(rootStyle.scrollPaddingTop, clientHeight),
    clientTop + clientHeight - getLength(rootStyle.scrollPaddingBottom, clientHeight),
    (elRect.top - rootRect.top) / scaleY - getNumericStyle(elStyle.scrollMarginTop),
    (elRect.bottom - rootRect.top) / scaleY + getNumericStyle(elStyle.scrollMarginBottom)
  );
  const deltaX = alignNearest(
    clientLeft + getLength(rootStyle.scrollPaddingLeft, clientWidth),
    clientLeft + clientWidth - getLength(rootStyle.scrollPaddingRight, clientWidth),
    (elRect.left - rootRect.left) / scaleX - getNumericStyle(elStyle.scrollMarginLeft),
    (elRect.right - rootRect.left) / scaleX + getNumericStyle(elStyle.scrollMarginRight)
  );
  if (deltaX === 0 && deltaY === 0) return null;
  return { top: rootEl.scrollTop + deltaY, left: rootEl.scrollLeft + deltaX };
}
function scrollToNearest(el, options) {
  const { rootEl } = options || {};
  const offset = getNearestScrollOffset(el, { rootEl });
  if (!rootEl || !offset) return false;
  let behavior = options?.behavior;
  if (behavior === "smooth" && prefersReducedMotion(rootEl)) behavior = "instant";
  rootEl.scrollTo({ ...offset, ...behavior && { behavior } });
  return true;
}
function alignNearest(viewStart, viewEnd, start, end) {
  if (start < viewStart && end > viewEnd) return 0;
  const isLarger = end - start > viewEnd - viewStart;
  if (start < viewStart) return isLarger ? end - viewEnd : start - viewStart;
  if (end > viewEnd) return isLarger ? start - viewStart : end - viewEnd;
  return 0;
}
var prefersReducedMotion = (el) => !!(0,_node_mjs__WEBPACK_IMPORTED_MODULE_2__.getWindow)(el).matchMedia?.("(prefers-reduced-motion: reduce)").matches;
var getNumericStyle = (value) => {
  const numericValue = Number.parseFloat(value);
  return Number.isNaN(numericValue) ? 0 : numericValue;
};
var getLength = (value, basis) => {
  const numericValue = getNumericStyle(value);
  return value.trim().endsWith("%") ? numericValue * basis / 100 : numericValue;
};
function getScrollPosition(element) {
  if ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element)) {
    return { scrollLeft: element.scrollLeft, scrollTop: element.scrollTop };
  }
  return { scrollLeft: element.scrollX, scrollTop: element.scrollY };
}
function trackScrollEnd(target, fn, options = {}) {
  const { delay = 150, immediate = false, capture = false, timeout = _timeout_mjs__WEBPACK_IMPORTED_MODULE_4__.Timeout.create() } = options;
  const restart = () => timeout.start(delay, fn);
  if (immediate) restart();
  const cleanup = (0,_event_mjs__WEBPACK_IMPORTED_MODULE_1__.addDomEvent)(target, "scroll", restart, { capture, passive: true });
  return () => {
    cleanup();
    timeout.clear();
  };
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/searchable.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/searchable.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getByText: () => (/* binding */ getByText)
/* harmony export */ });
/* harmony import */ var _query_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query.mjs */ "./node_modules/@zag-js/dom-query/dist/query.mjs");
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.mjs */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");


// src/searchable.ts


var collator;
var getCollator = () => collator ?? (collator = new Intl.Collator(void 0, { usage: "search", sensitivity: "base" }));
var normalize = (str) => str.normalize("NFC").trim();
var getValueText = (el) => {
  return normalize(el.dataset?.valuetext ?? el.textContent ?? "");
};
var match = (valueText, query) => {
  const text = query.normalize("NFC");
  return getCollator().compare(valueText.slice(0, text.length), text) === 0;
};
function getByText(v, text, currentId, itemToId = _query_mjs__WEBPACK_IMPORTED_MODULE_0__.defaultItemToId) {
  const index = currentId ? (0,_query_mjs__WEBPACK_IMPORTED_MODULE_0__.indexOfId)(v, currentId, itemToId) : -1;
  let items = currentId ? (0,_shared_mjs__WEBPACK_IMPORTED_MODULE_1__.wrap)(v, index) : v;
  const isSingleKey = text.length === 1;
  if (isSingleKey) {
    items = items.filter((item) => itemToId(item) !== currentId);
  }
  return items.find((item) => match(getValueText(item), text));
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/set.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/set.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setAttribute: () => (/* binding */ setAttribute),
/* harmony export */   setProperty: () => (/* binding */ setProperty),
/* harmony export */   setStyle: () => (/* binding */ setStyle),
/* harmony export */   setStyleProperty: () => (/* binding */ setStyleProperty)
/* harmony export */ });
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared.mjs */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");


// src/set.ts

function setAttribute(el, attr, v) {
  const prev = el.getAttribute(attr);
  const exists = prev != null;
  if (prev === v) return _shared_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
  el.setAttribute(attr, v);
  return () => {
    if (!exists) {
      el.removeAttribute(attr);
    } else {
      el.setAttribute(attr, prev);
    }
  };
}
function setProperty(el, prop, v) {
  const exists = prop in el;
  const prev = el[prop];
  if (prev === v) return _shared_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
  el[prop] = v;
  return () => {
    if (!exists) {
      delete el[prop];
    } else {
      el[prop] = prev;
    }
  };
}
function setStyle(el, style) {
  if (!el) return _shared_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
  const prev = Object.keys(style).reduce((acc, key) => {
    acc[key] = el.style.getPropertyValue(key);
    return acc;
  }, {});
  if (isEqual(prev, style)) return _shared_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
  Object.assign(el.style, style);
  return () => {
    Object.assign(el.style, prev);
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  };
}
function setStyleProperty(el, prop, value) {
  if (!el) return _shared_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
  const prev = el.style.getPropertyValue(prop);
  if (prev === value) return _shared_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
  el.style.setProperty(prop, value);
  return () => {
    el.style.setProperty(prop, prev);
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  };
}
function isEqual(a, b) {
  return Object.keys(a).every((key) => a[key] === b[key]);
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/shared.mjs"
/*!********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/shared.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_Z_INDEX: () => (/* binding */ MAX_Z_INDEX),
/* harmony export */   ariaAttr: () => (/* binding */ ariaAttr),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   dataAttr: () => (/* binding */ dataAttr),
/* harmony export */   getByOwnerId: () => (/* binding */ getByOwnerId),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isOwnedBy: () => (/* binding */ isOwnedBy),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   sanitize: () => (/* binding */ sanitize),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });


// src/shared.ts
var clamp = (value) => Math.max(0, Math.min(1, value));
var wrap = (v, idx) => {
  return v.map((_, index) => v[(Math.max(idx, 0) + index) % v.length]);
};
var pipe = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);
var noop = () => void 0;
var isObject = (v) => typeof v === "object" && v !== null;
var MAX_Z_INDEX = 2147483647;
var dataAttr = (guard) => guard ? "" : void 0;
var ariaAttr = (guard) => guard ? "true" : void 0;
var BACKSLASH_RE = /\\/g;
var DOUBLE_QUOTE_RE = /"/g;
var cssesc = (value) => globalThis.CSS?.escape?.(value) ?? value.replace(BACKSLASH_RE, "\\\\").replace(DOUBLE_QUOTE_RE, '\\"');
var getByOwnerId = (id) => `[data-ownedby~="${cssesc(String(id))}"]`;
var isOwnedBy = (el, id) => !!el?.matches(getByOwnerId(id));
var sanitize = (str) => str.split("").map((char) => {
  const code = char.charCodeAt(0);
  if (code > 0 && code < 128) return char;
  if (code >= 128 && code <= 255) return `/x${code.toString(16)}`.replace("/", "\\");
  return "";
}).join("").trim();



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/tabbable.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/tabbable.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFirstFocusable: () => (/* binding */ getFirstFocusable),
/* harmony export */   getFirstTabbable: () => (/* binding */ getFirstTabbable),
/* harmony export */   getFocusables: () => (/* binding */ getFocusables),
/* harmony export */   getLastTabbable: () => (/* binding */ getLastTabbable),
/* harmony export */   getNextTabbable: () => (/* binding */ getNextTabbable),
/* harmony export */   getTabIndex: () => (/* binding */ getTabIndex),
/* harmony export */   getTabbableEdges: () => (/* binding */ getTabbableEdges),
/* harmony export */   getTabbables: () => (/* binding */ getTabbables),
/* harmony export */   isFocusable: () => (/* binding */ isFocusable),
/* harmony export */   isTabbable: () => (/* binding */ isTabbable)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");


// src/tabbable.ts

var isFrame = (el) => (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(el) && el.tagName === "IFRAME";
var NATURALLY_TABBABLE_REGEX = /^(audio|video|details)$/;
function parseTabIndex(el) {
  const attr = el.getAttribute("tabindex");
  if (!attr) return NaN;
  return parseInt(attr, 10);
}
var hasTabIndex = (el) => !Number.isNaN(parseTabIndex(el));
var hasNegativeTabIndex = (el) => parseTabIndex(el) < 0;
function isRadioInput(element) {
  return (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputElement)(element) && element.type === "radio";
}
function isTabbableRadio(element) {
  if (!isRadioInput(element) || !element.name) return true;
  if (element.checked) return true;
  const selector = `input[type="radio"][name="${CSS.escape(element.name)}"]`;
  const scope = element.form ?? element.ownerDocument;
  const group = Array.from(scope.querySelectorAll(selector)).filter(
    (radio) => radio.form === element.form && isFocusable(radio)
  );
  const checked = group.find((radio) => radio.checked);
  if (checked) return checked === element;
  return group[0] === element;
}
function getShadowRootForNode(element, getShadowRoot) {
  if (!getShadowRoot) return null;
  if (getShadowRoot === true) {
    return element.shadowRoot || null;
  }
  const result = getShadowRoot(element);
  return (result === true ? element.shadowRoot : result) || null;
}
function collectElementsWithShadowDOM(elements, getShadowRoot, filterFn) {
  const allElements = [...elements];
  const toProcess = [...elements];
  const processed = /* @__PURE__ */ new Set();
  const positionMap = /* @__PURE__ */ new Map();
  elements.forEach((el, i) => positionMap.set(el, i));
  let processIndex = 0;
  while (processIndex < toProcess.length) {
    const element = toProcess[processIndex++];
    if (!element || processed.has(element)) continue;
    processed.add(element);
    const shadowRoot = getShadowRootForNode(element, getShadowRoot);
    if (shadowRoot) {
      const shadowElements = Array.from(shadowRoot.querySelectorAll(focusableSelector)).filter(filterFn);
      const hostIndex = positionMap.get(element);
      if (hostIndex !== void 0) {
        const insertPosition = hostIndex + 1;
        allElements.splice(insertPosition, 0, ...shadowElements);
        shadowElements.forEach((el, i) => {
          positionMap.set(el, insertPosition + i);
        });
        for (let i = insertPosition + shadowElements.length; i < allElements.length; i++) {
          positionMap.set(allElements[i], i);
        }
      } else {
        const insertPosition = allElements.length;
        allElements.push(...shadowElements);
        shadowElements.forEach((el, i) => {
          positionMap.set(el, insertPosition + i);
        });
      }
      toProcess.push(...shadowElements);
    }
  }
  return allElements;
}
var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
var getFocusables = (container, options = {}) => {
  if (!container) return [];
  const { includeContainer = false, getShadowRoot } = options;
  const elements = Array.from(container.querySelectorAll(focusableSelector));
  const include = includeContainer == true || includeContainer == "if-empty" && elements.length === 0;
  if (include && (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(container) && isFocusable(container)) {
    elements.unshift(container);
  }
  const focusableElements = [];
  for (const element of elements) {
    if (!isFocusable(element)) continue;
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      focusableElements.push(...getFocusables(frameBody, { getShadowRoot }));
      continue;
    }
    focusableElements.push(element);
  }
  if (getShadowRoot) {
    return collectElementsWithShadowDOM(focusableElements, getShadowRoot, isFocusable);
  }
  return focusableElements;
};
function isFocusable(element) {
  if (!(0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || element.closest("[inert]")) return false;
  return element.matches(focusableSelector) && (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isElementVisible)(element);
}
function getFirstFocusable(container, options = {}) {
  const [first] = getFocusables(container, options);
  return first || null;
}
function getTabbables(container, options = {}) {
  if (!container) return [];
  const { includeContainer, getShadowRoot } = options;
  const elements = Array.from(container.querySelectorAll(focusableSelector));
  if (includeContainer && isTabbable(container)) {
    elements.unshift(container);
  }
  const tabbableElements = [];
  for (const element of elements) {
    if (!isTabbable(element)) continue;
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      tabbableElements.push(...getTabbables(frameBody, { getShadowRoot }));
      continue;
    }
    tabbableElements.push(element);
  }
  if (getShadowRoot) {
    const allElements = collectElementsWithShadowDOM(tabbableElements, getShadowRoot, isTabbable);
    if (!allElements.length && includeContainer) {
      return elements;
    }
    return allElements;
  }
  if (!tabbableElements.length && includeContainer) {
    return elements;
  }
  return tabbableElements;
}
function isTabbable(el) {
  if ((0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(el) && el.tabIndex > 0) return true;
  if (!isFocusable(el) || hasNegativeTabIndex(el)) return false;
  return isTabbableRadio(el);
}
function getFirstTabbable(container, options = {}) {
  const [first] = getTabbables(container, options);
  return first || null;
}
function getLastTabbable(container, options = {}) {
  const elements = getTabbables(container, options);
  return elements[elements.length - 1] || null;
}
function getTabbableEdges(container, options = {}) {
  const elements = getTabbables(container, options);
  const first = elements[0] || null;
  const last = elements[elements.length - 1] || null;
  return [first, last];
}
function getNextTabbable(container, options = {}) {
  const { current, getShadowRoot } = options;
  const tabbables = getTabbables(container, { getShadowRoot });
  const doc = container?.ownerDocument || document;
  const currentElement = current ?? (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(doc);
  if (!currentElement) return null;
  const index = tabbables.indexOf(currentElement);
  return tabbables[index + 1] || null;
}
function getTabIndex(node) {
  if (node.tabIndex < 0) {
    if ((NATURALLY_TABBABLE_REGEX.test(node.localName) || (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.isEditableElement)(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/timeout.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/timeout.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Timeout: () => (/* binding */ Timeout)
/* harmony export */ });
/* harmony import */ var _chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-QZ7TP4HQ.mjs */ "./node_modules/@zag-js/dom-query/dist/chunk-QZ7TP4HQ.mjs");


// src/timeout.ts
var EMPTY = 0;
var Timeout = class _Timeout {
  constructor() {
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "id", EMPTY);
    (0,_chunk_QZ7TP4HQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "clear", () => {
      if (this.id === EMPTY) return;
      clearTimeout(this.id);
      this.id = EMPTY;
    });
  }
  static create() {
    return new _Timeout();
  }
  /** Runs `fn` after `delay`, clearing any pending call */
  start(delay, fn) {
    this.clear();
    this.id = setTimeout(() => {
      this.id = EMPTY;
      fn();
    }, delay);
  }
  isStarted() {
    return this.id !== EMPTY;
  }
};



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/typeahead.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/typeahead.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getByTypeahead: () => (/* binding */ getByTypeahead)
/* harmony export */ });
/* harmony import */ var _searchable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./searchable.mjs */ "./node_modules/@zag-js/dom-query/dist/searchable.mjs");


// src/typeahead.ts

function getByTypeaheadImpl(baseItems, options) {
  const { state, activeId, key, timeout = 350, itemToId } = options;
  const search = state.keysSoFar + key;
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const query = isRepeated ? search[0] : search;
  let items = baseItems.slice();
  const next = (0,_searchable_mjs__WEBPACK_IMPORTED_MODULE_0__.getByText)(items, query, activeId, itemToId);
  function cleanup() {
    clearTimeout(state.timer);
    state.timer = -1;
  }
  function update(value) {
    state.keysSoFar = value;
    cleanup();
    if (value !== "") {
      state.timer = +setTimeout(() => {
        update("");
        cleanup();
      }, timeout);
    }
  }
  update(search);
  return next;
}
var getByTypeahead = /* @__PURE__ */ Object.assign(getByTypeaheadImpl, {
  defaultOptions: { keysSoFar: "", timer: -1 },
  isValidEvent: isValidTypeaheadEvent
});
function isValidTypeaheadEvent(event) {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/visually-hidden.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/visually-hidden.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setVisuallyHidden: () => (/* binding */ setVisuallyHidden),
/* harmony export */   visuallyHiddenStyle: () => (/* binding */ visuallyHiddenStyle)
/* harmony export */ });


// src/visually-hidden.ts
var visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  wordWrap: "normal"
};
function setVisuallyHidden(el) {
  Object.assign(el.style, visuallyHiddenStyle);
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/wait-for.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/wait-for.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   waitForElement: () => (/* binding */ waitForElement),
/* harmony export */   waitForEvent: () => (/* binding */ waitForEvent),
/* harmony export */   waitForPromise: () => (/* binding */ waitForPromise)
/* harmony export */ });
/* harmony import */ var _node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.mjs */ "./node_modules/@zag-js/dom-query/dist/node.mjs");


// src/wait-for.ts

function waitForPromise(promise, controller, timeout) {
  const { signal } = controller;
  const wrappedPromise = new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Timeout of ${timeout}ms exceeded`));
    }, timeout);
    signal.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      reject(new DOMException("Promise aborted", "AbortError"));
    });
    promise.then((result) => {
      if (!signal.aborted) {
        clearTimeout(timeoutId);
        resolve(result);
      }
    }).catch((error) => {
      if (!signal.aborted) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  });
  const abort = () => controller.abort();
  return [wrappedPromise, abort];
}
function waitForElement(target, options) {
  const { timeout, rootNode } = options;
  const win = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getWindow)(rootNode);
  const doc = (0,_node_mjs__WEBPACK_IMPORTED_MODULE_0__.getDocument)(rootNode);
  const controller = new win.AbortController();
  let observer;
  const result = waitForPromise(
    new Promise((resolve) => {
      const el = target();
      if (el) {
        resolve(el);
        return;
      }
      observer = new win.MutationObserver(() => {
        const el2 = target();
        if (el2 && el2.isConnected) {
          observer?.disconnect();
          resolve(el2);
        }
      });
      observer.observe(doc.body, {
        childList: true,
        subtree: true
      });
    }),
    controller,
    timeout
  );
  const disconnect = () => observer?.disconnect();
  result[0].then(disconnect, disconnect);
  return result;
}
function waitForEvent(target, event, options) {
  let cleanup;
  const { predicate, ...listenerOptions } = options ?? {};
  const promise = new Promise((resolve) => {
    const element = target?.();
    if (!element) {
      return;
    }
    const handler = (e) => {
      if (!predicate || predicate(element)) {
        resolve(e);
        cleanup?.();
      }
    };
    element.addEventListener(event, handler, listenerOptions);
    cleanup = () => element.removeEventListener(event, handler, listenerOptions);
  });
  return [promise, () => cleanup?.()];
}



/***/ },

/***/ "./node_modules/@zag-js/dom-query/dist/when-node.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@zag-js/dom-query/dist/when-node.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   whenNode: () => (/* binding */ whenNode)
/* harmony export */ });
/* harmony import */ var _mutation_observer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mutation-observer.mjs */ "./node_modules/@zag-js/dom-query/dist/mutation-observer.mjs");
/* harmony import */ var _raf_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raf.mjs */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared.mjs */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");


// src/when-node.ts



var childListObserver = /* @__PURE__ */ (0,_mutation_observer_mjs__WEBPACK_IMPORTED_MODULE_0__.createSharedMutationObserver)({ childList: true, subtree: true });
function whenNode(nodeOrFn, fn, options = {}) {
  const { defer, onMissing, getRootNode } = options;
  const getNode = () => typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
  const cleanups = [];
  const setup = (node) => {
    if (!node) return onMissing?.();
    cleanups.push(fn(node));
  };
  if (!defer) {
    setup(getNode());
  } else {
    let cancelled = false;
    cleanups.push(() => {
      cancelled = true;
    });
    queueMicrotask(() => {
      if (cancelled) return;
      const committed = getNode();
      if (committed) {
        setup(committed);
        return;
      }
      let settled = false;
      const settle = (node) => {
        if (cancelled || settled) return;
        settled = true;
        stopObserving();
        cancelFrame();
        setup(node);
      };
      const rootNode = getRootNode?.();
      const stopObserving = rootNode ? childListObserver.observe(rootNode, () => {
        const node = getNode();
        if (node) settle(node);
      }) : _shared_mjs__WEBPACK_IMPORTED_MODULE_2__.noop;
      const cancelFrame = (0,_raf_mjs__WEBPACK_IMPORTED_MODULE_1__.raf)(() => settle(getNode()));
      cleanups.push(stopObserving, cancelFrame);
    });
  }
  return () => {
    cleanups.forEach((fn2) => fn2?.());
  };
}



/***/ },

/***/ "./node_modules/@zag-js/focus-visible/dist/index.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@zag-js/focus-visible/dist/index.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getInteractionModality: () => (/* binding */ getInteractionModality),
/* harmony export */   ignoreFocusEvent: () => (/* binding */ ignoreFocusEvent),
/* harmony export */   isFocusVisible: () => (/* binding */ isFocusVisible),
/* harmony export */   listenerMap: () => (/* binding */ listenerMap),
/* harmony export */   setInteractionModality: () => (/* binding */ setInteractionModality),
/* harmony export */   trackFocusVisible: () => (/* binding */ trackFocusVisible),
/* harmony export */   trackInteractionModality: () => (/* binding */ trackInteractionModality)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/platform.mjs");
// src/index.ts

function isValidKey(e) {
  return !(e.metaKey || !(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.isMac)() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
var nonTextInputTypes = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
var interactiveContentSelector = [
  "a[href]",
  "audio[controls]",
  "button",
  "details",
  "embed",
  "iframe",
  "img[controls]",
  "img[usemap]",
  "input",
  "select",
  "textarea",
  "video[controls]"
].join(",");
function isKeyboardFocusEvent(isTextInput, modality, e) {
  const eventTarget = e ? (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(e) : null;
  const doc = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getDocument)(eventTarget);
  const win = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getWindow)(eventTarget);
  const activeElement = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getActiveElement)(doc);
  isTextInput = isTextInput || activeElement instanceof win.HTMLInputElement && !nonTextInputTypes.has(activeElement?.type) || activeElement instanceof win.HTMLTextAreaElement || activeElement instanceof win.HTMLElement && activeElement.isContentEditable;
  return !(isTextInput && modality === "keyboard" && e instanceof win.KeyboardEvent && !Reflect.has(FOCUS_VISIBLE_INPUT_KEYS, e.key));
}
var currentModality = null;
var changeHandlers = /* @__PURE__ */ new Set();
var listenerMap = /* @__PURE__ */ new Map();
var hasEventBeforeFocus = false;
var pendingLabelControl = null;
var hasBlurredWindowRecently = false;
var lastPointerPosition = null;
var ignoreFocusEvent = false;
var FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: true,
  Escape: true
};
function triggerChangeHandlers(modality, e) {
  for (let handler of changeHandlers) {
    handler(modality, e);
  }
}
function handleKeyboardEvent(e) {
  pendingLabelControl = null;
  hasEventBeforeFocus = true;
  if (isValidKey(e)) {
    currentModality = "keyboard";
    triggerChangeHandlers("keyboard", e);
  }
}
function handlePointerEvent(e) {
  const isMove = e.type === "pointermove" || e.type === "mousemove";
  if (isMove && e.isTrusted && lastPointerPosition?.x === e.clientX && lastPointerPosition?.y === e.clientY) return;
  lastPointerPosition = { x: e.clientX, y: e.clientY };
  currentModality = "pointer";
  if (e.type === "mousedown" || e.type === "pointerdown") {
    pendingLabelControl = null;
    hasEventBeforeFocus = true;
    triggerChangeHandlers("pointer", e);
  }
}
function handleClickEvent(e) {
  if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.isVirtualClick)(e)) {
    pendingLabelControl = null;
    hasEventBeforeFocus = true;
    currentModality = "virtual";
    return;
  }
  pendingLabelControl = null;
  const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(e);
  const label = target?.closest("label");
  const control = label?.control;
  if (!label || !control || control.matches(":disabled")) return;
  const interactive = target?.closest(interactiveContentSelector);
  if (interactive && label.contains(interactive) && interactive !== control) return;
  if (control !== (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getActiveElement)(label.ownerDocument)) pendingLabelControl = control;
}
function handleFocusEvent(e) {
  const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(e);
  const isLabelActivationFocus = target === pendingLabelControl;
  if (target === (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getWindow)(target) || target === (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getDocument)(target) || ignoreFocusEvent || !e.isTrusted) {
    return;
  }
  if (!hasEventBeforeFocus && !isLabelActivationFocus && !hasBlurredWindowRecently) {
    currentModality = "virtual";
    triggerChangeHandlers("virtual", e);
  }
  hasEventBeforeFocus = false;
  pendingLabelControl = null;
  hasBlurredWindowRecently = false;
}
function handleWindowBlur() {
  if (ignoreFocusEvent) return;
  hasEventBeforeFocus = false;
  pendingLabelControl = null;
  hasBlurredWindowRecently = true;
}
function readPrototypeFocus(proto) {
  try {
    return proto.focus;
  } catch {
    return void 0;
  }
}
function patchFocusMethod(win) {
  const proto = win.HTMLElement.prototype;
  try {
    let patchedFocus2 = function() {
      hasEventBeforeFocus = true;
      const focus = nativeFocus ?? getFocus.call(this);
      focus.apply(this, arguments);
    };
    var patchedFocus = patchedFocus2;
    const nativeFocus = readPrototypeFocus(proto);
    const descriptor = nativeFocus ? void 0 : Object.getOwnPropertyDescriptor(proto, "focus");
    const getFocus = descriptor?.get;
    if (!nativeFocus && !getFocus) return { focus: void 0 };
    Object.defineProperty(win.HTMLElement.prototype, "focus", {
      configurable: true,
      writable: true,
      value: patchedFocus2
    });
    return { focus: nativeFocus, descriptor };
  } catch {
    return { focus: void 0 };
  }
}
function setupGlobalFocusEvents(root) {
  if (typeof window === "undefined" || listenerMap.get((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getWindow)(root))) {
    return;
  }
  const win = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getWindow)(root);
  const doc = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getDocument)(root);
  const focusData = patchFocusMethod(win);
  doc.addEventListener("keydown", handleKeyboardEvent, true);
  doc.addEventListener("keyup", handleKeyboardEvent, true);
  doc.addEventListener("click", handleClickEvent, true);
  win.addEventListener("focus", handleFocusEvent, true);
  win.addEventListener("blur", handleWindowBlur, false);
  if (typeof win.PointerEvent !== "undefined") {
    doc.addEventListener("pointerdown", handlePointerEvent, true);
    doc.addEventListener("pointermove", handlePointerEvent, true);
    doc.addEventListener("pointerup", handlePointerEvent, true);
  } else {
    doc.addEventListener("mousedown", handlePointerEvent, true);
    doc.addEventListener("mousemove", handlePointerEvent, true);
    doc.addEventListener("mouseup", handlePointerEvent, true);
  }
  win.addEventListener(
    "beforeunload",
    () => {
      tearDownWindowFocusTracking(root);
    },
    { once: true }
  );
  listenerMap.set(win, focusData);
}
var tearDownWindowFocusTracking = (root, loadListener) => {
  const win = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getWindow)(root);
  const doc = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getDocument)(root);
  if (loadListener) {
    doc.removeEventListener("DOMContentLoaded", loadListener);
  }
  const listenerData = listenerMap.get(win);
  if (!listenerData) {
    return;
  }
  if (listenerData.focus || listenerData.descriptor) {
    try {
      Object.defineProperty(
        win.HTMLElement.prototype,
        "focus",
        listenerData.descriptor ?? { configurable: true, writable: true, value: listenerData.focus }
      );
    } catch {
    }
  }
  doc.removeEventListener("keydown", handleKeyboardEvent, true);
  doc.removeEventListener("keyup", handleKeyboardEvent, true);
  doc.removeEventListener("click", handleClickEvent, true);
  win.removeEventListener("focus", handleFocusEvent, true);
  win.removeEventListener("blur", handleWindowBlur, false);
  if (typeof win.PointerEvent !== "undefined") {
    doc.removeEventListener("pointerdown", handlePointerEvent, true);
    doc.removeEventListener("pointermove", handlePointerEvent, true);
    doc.removeEventListener("pointerup", handlePointerEvent, true);
  } else {
    doc.removeEventListener("mousedown", handlePointerEvent, true);
    doc.removeEventListener("mousemove", handlePointerEvent, true);
    doc.removeEventListener("mouseup", handlePointerEvent, true);
  }
  listenerMap.delete(win);
};
function getInteractionModality() {
  return currentModality;
}
function setInteractionModality(modality) {
  currentModality = modality;
  triggerChangeHandlers(modality, null);
}
function trackInteractionModality(props) {
  const { onChange, root } = props;
  setupGlobalFocusEvents(root);
  onChange({ modality: currentModality });
  const handler = () => onChange({ modality: currentModality });
  changeHandlers.add(handler);
  return () => {
    changeHandlers.delete(handler);
  };
}
function isFocusVisible() {
  return currentModality === "keyboard" || currentModality === "virtual";
}
function trackFocusVisible(props = {}) {
  const { isTextInput, autoFocus, onChange, root } = props;
  setupGlobalFocusEvents(root);
  onChange?.({ isFocusVisible: autoFocus || isFocusVisible(), modality: currentModality });
  const handler = (modality, e) => {
    if (!isKeyboardFocusEvent(!!isTextInput, modality, e)) return;
    onChange?.({ isFocusVisible: isFocusVisible(), modality });
  };
  changeHandlers.add(handler);
  return () => {
    changeHandlers.delete(handler);
  };
}



/***/ },

/***/ "./node_modules/@zag-js/interact-outside/dist/frame-utils.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/@zag-js/interact-outside/dist/frame-utils.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getParentWindow: () => (/* binding */ getParentWindow),
/* harmony export */   getWindowFrames: () => (/* binding */ getWindowFrames)
/* harmony export */ });
// src/frame-utils.ts
function getWindowFrames(win) {
  const frames = {
    each(cb) {
      for (let i = 0; i < win.frames?.length; i += 1) {
        const frame = win.frames[i];
        if (frame) cb(frame);
      }
    },
    addEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.addEventListener(event, listener, options);
        } catch {
        }
      });
      return () => {
        try {
          frames.removeEventListener(event, listener, options);
        } catch {
        }
      };
    },
    removeEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.removeEventListener(event, listener, options);
        } catch {
        }
      });
    }
  };
  return frames;
}
function getParentWindow(win) {
  const parent = win.frameElement != null ? win.parent : null;
  return {
    addEventListener: (event, listener, options) => {
      try {
        parent?.addEventListener(event, listener, options);
      } catch {
      }
      return () => {
        try {
          parent?.removeEventListener(event, listener, options);
        } catch {
        }
      };
    },
    removeEventListener: (event, listener, options) => {
      try {
        parent?.removeEventListener(event, listener, options);
      } catch {
      }
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/interact-outside/dist/index.mjs"
/*!**************************************************************!*\
  !*** ./node_modules/@zag-js/interact-outside/dist/index.mjs ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackInteractOutside: () => (/* binding */ trackInteractOutside)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/platform.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/controller.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/overflow.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/tabbable.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
/* harmony import */ var _frame_utils_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./frame-utils.mjs */ "./node_modules/@zag-js/interact-outside/dist/frame-utils.mjs");
// src/index.ts




var POINTER_OUTSIDE_EVENT = "pointerdown.outside";
var FOCUS_OUTSIDE_EVENT = "focus.outside";
function isComposedPathFocusable(composedPath) {
  for (const node of composedPath) {
    if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__.isFocusable)(node)) return true;
  }
  return false;
}
var isPointerEvent = (event) => "clientY" in event;
function isEventPointWithin(node, event) {
  if (!isPointerEvent(event) || !node) return false;
  const rect = node.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;
  return rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
}
function isPointInRect(rect, point) {
  return rect.y <= point.y && point.y <= rect.y + rect.height && rect.x <= point.x && point.x <= rect.x + rect.width;
}
function isEventWithinScrollbar(event, ancestor) {
  if (!ancestor || !isPointerEvent(event)) return false;
  const isScrollableY = ancestor.scrollHeight > ancestor.clientHeight;
  const onScrollbarY = isScrollableY && event.clientX > ancestor.offsetLeft + ancestor.clientWidth;
  const isScrollableX = ancestor.scrollWidth > ancestor.clientWidth;
  const onScrollbarX = isScrollableX && event.clientY > ancestor.offsetTop + ancestor.clientHeight;
  const rect = {
    x: ancestor.offsetLeft,
    y: ancestor.offsetTop,
    width: ancestor.clientWidth + (isScrollableY ? 16 : 0),
    height: ancestor.clientHeight + (isScrollableX ? 16 : 0)
  };
  const point = {
    x: event.clientX,
    y: event.clientY
  };
  if (!isPointInRect(rect, point)) return false;
  return onScrollbarY || onScrollbarX;
}
function trackInteractOutsideImpl(node, options) {
  const {
    exclude,
    onFocusOutside,
    onPointerDownOutside,
    onInteractOutside,
    defer,
    followControlledElements = true
  } = options;
  if (!node) return;
  const doc = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getDocument)(node);
  const win = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getWindow)(node);
  const frames = (0,_frame_utils_mjs__WEBPACK_IMPORTED_MODULE_8__.getWindowFrames)(win);
  const parentWin = (0,_frame_utils_mjs__WEBPACK_IMPORTED_MODULE_8__.getParentWindow)(win);
  function isEventOutside(event, target) {
    if (!(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(target)) return false;
    if (!target.isConnected) return false;
    if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.contains)(node, target)) return false;
    if (isEventPointWithin(node, event)) return false;
    if (followControlledElements && (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.isControlledElement)(node, target)) return false;
    const triggerEl = doc.querySelector(`[aria-controls="${node.id}"]`);
    if (triggerEl) {
      const triggerAncestor = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.getNearestOverflowAncestor)(triggerEl);
      if (isEventWithinScrollbar(event, triggerAncestor)) return false;
    }
    const nodeAncestor = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.getNearestOverflowAncestor)(node);
    if (isEventWithinScrollbar(event, nodeAncestor)) return false;
    return !exclude?.(target);
  }
  const pointerdownCleanups = /* @__PURE__ */ new Set();
  const isInShadowRoot = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(node?.getRootNode());
  let isPointerDown = false;
  function onPointerDown(event) {
    isPointerDown = true;
    const onPointerUp = () => {
      isPointerDown = false;
    };
    doc.addEventListener("pointerup", onPointerUp, { once: true });
    win.addEventListener("pointerup", onPointerUp, { once: true });
    function handler(clickEvent) {
      const func = defer && !(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.isTouchDevice)() ? _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.raf : (v) => v();
      const evt = clickEvent ?? event;
      const composedPath = evt?.composedPath?.() ?? [evt?.target];
      func(() => {
        const target = isInShadowRoot ? composedPath[0] : (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(event);
        if (!node || !isEventOutside(event, target)) return;
        if (onPointerDownOutside || onInteractOutside) {
          const handler2 = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_7__.callAll)(onPointerDownOutside, onInteractOutside);
          node.addEventListener(POINTER_OUTSIDE_EVENT, handler2, { once: true });
        }
        fireCustomEvent(node, POINTER_OUTSIDE_EVENT, {
          bubbles: false,
          cancelable: true,
          detail: {
            originalEvent: evt,
            contextmenu: (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.isContextMenuEvent)(evt),
            focusable: isComposedPathFocusable(composedPath),
            target
          }
        });
      });
    }
    if (event.pointerType === "touch") {
      pointerdownCleanups.forEach((fn) => fn());
      pointerdownCleanups.add((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.addDomEvent)(doc, "click", handler, { once: true }));
      pointerdownCleanups.add(parentWin.addEventListener("click", handler, { once: true }));
      pointerdownCleanups.add(frames.addEventListener("click", handler, { once: true }));
    } else {
      handler();
    }
  }
  const cleanups = /* @__PURE__ */ new Set();
  const timer = setTimeout(() => {
    cleanups.add((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.addDomEvent)(doc, "pointerdown", onPointerDown, true));
    cleanups.add(parentWin.addEventListener("pointerdown", onPointerDown, true));
    cleanups.add(frames.addEventListener("pointerdown", onPointerDown, true));
  }, 0);
  const focusFrame = _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.AnimationFrame.create();
  function onFocusin(event) {
    if (isPointerDown) return;
    const func = defer ? (fn) => focusFrame.request(fn) : (fn) => fn();
    func(() => {
      const composedPath = event?.composedPath?.() ?? [event?.target];
      const target = isInShadowRoot ? composedPath[0] : (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(event);
      if (!node || !isEventOutside(event, target)) return;
      if (onFocusOutside || onInteractOutside) {
        const handler = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_7__.callAll)(onFocusOutside, onInteractOutside);
        node.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
      }
      fireCustomEvent(node, FOCUS_OUTSIDE_EVENT, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: event,
          contextmenu: false,
          focusable: (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__.isFocusable)(target),
          target
        }
      });
    });
  }
  if (!(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.isTouchDevice)()) {
    cleanups.add((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.addDomEvent)(doc, "focusin", onFocusin, true));
    cleanups.add(parentWin.addEventListener("focusin", onFocusin, true));
    cleanups.add(frames.addEventListener("focusin", onFocusin, true));
  }
  return () => {
    clearTimeout(timer);
    focusFrame.cancel();
    pointerdownCleanups.forEach((fn) => fn());
    cleanups.forEach((fn) => fn());
  };
}
function trackInteractOutside(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.raf : (v) => v();
  const cleanups = [];
  cleanups.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups.push(trackInteractOutsideImpl(node, options));
    })
  );
  return () => {
    cleanups.forEach((fn) => fn?.());
  };
}
function fireCustomEvent(el, type, init) {
  const win = el.ownerDocument.defaultView || window;
  const event = new win.CustomEvent(type, init);
  return el.dispatchEvent(event);
}



/***/ },

/***/ "./node_modules/@zag-js/popper/dist/get-anchor.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/popper/dist/get-anchor.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDOMRect: () => (/* binding */ createDOMRect),
/* harmony export */   getAnchorElement: () => (/* binding */ getAnchorElement)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
// src/get-anchor.ts

function createDOMRect(x = 0, y = 0, width = 0, height = 0) {
  if (typeof DOMRect === "function") {
    return new DOMRect(x, y, width, height);
  }
  const rect = {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x
  };
  return { ...rect, toJSON: () => rect };
}
function getDOMRect(anchorRect) {
  if (!anchorRect) return createDOMRect();
  const { x, y, width, height } = anchorRect;
  return createDOMRect(x, y, width, height);
}
function getAnchorElement(anchorElement, getAnchorRect) {
  return {
    contextElement: (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(anchorElement) ? anchorElement : anchorElement?.contextElement,
    getBoundingClientRect: () => {
      const anchor = anchorElement;
      const anchorRect = getAnchorRect?.(anchor);
      if (anchorRect || !anchor) {
        return getDOMRect(anchorRect);
      }
      return anchor.getBoundingClientRect();
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/popper/dist/get-placement.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@zag-js/popper/dist/get-placement.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPlacement: () => (/* binding */ getPlacement)
/* harmony export */ });
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/computed-style.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/guard.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/object.mjs");
/* harmony import */ var _get_anchor_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./get-anchor.mjs */ "./node_modules/@zag-js/popper/dist/get-anchor.mjs");
/* harmony import */ var _middleware_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./middleware.mjs */ "./node_modules/@zag-js/popper/dist/middleware.mjs");
/* harmony import */ var _placement_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./placement.mjs */ "./node_modules/@zag-js/popper/dist/placement.mjs");
// src/get-placement.ts






var defaultOptions = {
  strategy: "absolute",
  placement: "bottom",
  listeners: true,
  restoreStyles: false,
  applyStyles: true,
  gutter: 8,
  flip: true,
  slide: true,
  overlap: false,
  sameWidth: false,
  fitViewport: false,
  overflowPadding: 8,
  arrowPadding: 4
};
function roundByDpr(win, value) {
  const dpr = win.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}
function isApproximatelyEqual(a, b) {
  return a != null && Math.abs(a - b) < 0.5;
}
function resolveBoundaryOption(boundary) {
  if (typeof boundary === "function") return boundary();
  if (boundary === "clipping-ancestors") return "clippingAncestors";
  return boundary;
}
function getArrowMiddleware(arrowElement, doc, opts) {
  const element = arrowElement || doc.createElement("div");
  return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.arrow)({ element, padding: opts.arrowPadding });
}
function getOffsetMiddleware(arrowElement, opts) {
  if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_5__.isNull)(opts.offset ?? opts.gutter)) return;
  return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.offset)(({ placement }) => {
    const arrowOffset = (arrowElement?.clientHeight || 0) / 2;
    const gutter = opts.offset?.mainAxis ?? opts.gutter;
    const mainAxis = typeof gutter === "number" ? gutter + arrowOffset : gutter ?? arrowOffset;
    const { hasAlign } = (0,_placement_mjs__WEBPACK_IMPORTED_MODULE_9__.getPlacementDetails)(placement);
    const shift2 = !hasAlign ? opts.shift : void 0;
    const crossAxis = opts.offset?.crossAxis ?? shift2;
    return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_6__.compact)({
      crossAxis,
      mainAxis,
      alignmentAxis: opts.shift
    });
  });
}
function getFlipMiddleware(opts) {
  if (!opts.flip) return;
  return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.flip)(() => {
    const boundary = resolveBoundaryOption(opts.boundary);
    return {
      ...boundary ? { boundary } : void 0,
      padding: opts.overflowPadding,
      fallbackPlacements: opts.flip === true ? void 0 : opts.flip
    };
  });
}
function getShiftMiddleware(opts) {
  if (!opts.slide && !opts.overlap) return;
  return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.shift)(() => {
    const boundary = resolveBoundaryOption(opts.boundary);
    return {
      ...boundary ? { boundary } : void 0,
      mainAxis: opts.slide,
      crossAxis: opts.overlap,
      padding: opts.overflowPadding,
      limiter: (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.limitShift)()
    };
  });
}
function getSizeMiddleware(opts) {
  if (opts.sizeMiddleware === false && !opts.sameWidth && !opts.fitViewport) return;
  let lastReferenceWidth;
  let lastReferenceHeight;
  let lastAvailableWidth;
  let lastAvailableHeight;
  return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.size)(() => {
    const boundary = resolveBoundaryOption(opts.boundary);
    return {
      padding: opts.overflowPadding,
      ...boundary ? { boundary } : void 0,
      apply({ elements, rects, availableHeight, availableWidth }) {
        const floating = elements.floating;
        const referenceWidth = Math.round(rects.reference.width);
        const referenceHeight = Math.round(rects.reference.height);
        availableWidth = Math.floor(availableWidth);
        availableHeight = Math.floor(availableHeight);
        if (!isApproximatelyEqual(lastReferenceWidth, referenceWidth)) {
          floating.style.setProperty("--reference-width", `${referenceWidth}px`);
          lastReferenceWidth = referenceWidth;
        }
        if (!isApproximatelyEqual(lastReferenceHeight, referenceHeight)) {
          floating.style.setProperty("--reference-height", `${referenceHeight}px`);
          lastReferenceHeight = referenceHeight;
        }
        if (!isApproximatelyEqual(lastAvailableWidth, availableWidth)) {
          floating.style.setProperty("--available-width", `${availableWidth}px`);
          lastAvailableWidth = availableWidth;
        }
        if (!isApproximatelyEqual(lastAvailableHeight, availableHeight)) {
          floating.style.setProperty("--available-height", `${availableHeight}px`);
          lastAvailableHeight = availableHeight;
        }
      }
    };
  });
}
function hideWhenDetachedMiddleware(opts) {
  if (!opts.hideWhenDetached) return;
  return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.hide)(() => ({
    strategy: "referenceHidden",
    boundary: resolveBoundaryOption(opts.boundary) ?? "clippingAncestors"
  }));
}
function getAutoUpdateOptions(opts) {
  if (!opts) return {};
  if (opts === true) {
    return { ancestorResize: true, ancestorScroll: true, elementResize: true, layoutShift: true };
  }
  return opts;
}
var floatingStyleProps = [
  "transform",
  "visibility",
  "pointer-events",
  "--x",
  "--y",
  "--z-index",
  "z-index",
  "--reference-width",
  "--reference-height",
  "--available-width",
  "--available-height",
  "--transform-origin"
];
var arrowStyleProps = ["top", "right", "bottom", "left"];
var managedZIndex = /* @__PURE__ */ new WeakSet();
function syncZIndex(floating, content) {
  const inlineZIndex = floating.style.getPropertyValue("z-index");
  const isManaged = managedZIndex.has(floating);
  const ownsZIndex = isManaged && inlineZIndex === "var(--z-index)";
  if (isManaged && !ownsZIndex) {
    managedZIndex.delete(floating);
  }
  const zIndex = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(content).zIndex;
  if (zIndex === "auto") {
    if (ownsZIndex) {
      floating.style.removeProperty("z-index");
      managedZIndex.delete(floating);
    }
    return;
  }
  if (inlineZIndex && !ownsZIndex) return;
  floating.style.setProperty("--z-index", zIndex);
  floating.style.setProperty("z-index", "var(--z-index)");
  managedZIndex.add(floating);
}
function createStyleCleanup(el, props) {
  if (!el) return _zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.noop;
  const prev = new Map(props.map((prop) => [prop, el.style.getPropertyValue(prop)]));
  return () => {
    prev.forEach((value, prop) => {
      if (value) el.style.setProperty(prop, value);
      else el.style.removeProperty(prop);
    });
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  };
}
function anchorIdentity(anchor) {
  if (anchor == null) return null;
  if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(anchor)) return anchor;
  if (typeof anchor === "object" && anchor && "contextElement" in anchor && anchor.contextElement) {
    return anchor.contextElement;
  }
  return anchor;
}
function getPlacementImpl(referenceOrVirtual, floatingOrVirtual, opts = {}) {
  const resolveFloating = () => {
    const raw = typeof floatingOrVirtual === "function" ? floatingOrVirtual() : floatingOrVirtual;
    return raw ?? null;
  };
  const resolveAnchor = () => {
    const raw = typeof referenceOrVirtual === "function" ? referenceOrVirtual() : referenceOrVirtual;
    return opts.getAnchorElement?.() ?? raw;
  };
  const resolveReference = () => {
    const anchor = resolveAnchor();
    if (!anchor && !opts.getAnchorRect) return null;
    return (0,_get_anchor_mjs__WEBPACK_IMPORTED_MODULE_7__.getAnchorElement)(anchor, opts.getAnchorRect);
  };
  const options = Object.assign({}, defaultOptions, opts);
  let middleware = [];
  let cachedMiddlewareFloating = null;
  let restoreFloatingStyles;
  let restoreArrowStyles;
  function rebuildMiddlewareForFloating(floating) {
    restoreFloatingStyles?.();
    restoreArrowStyles?.();
    cachedMiddlewareFloating = floating;
    if (options.restoreStyles) {
      const restoreStyles = createStyleCleanup(floating, floatingStyleProps);
      restoreFloatingStyles = () => {
        restoreStyles();
        managedZIndex.delete(floating);
      };
    } else {
      restoreFloatingStyles = void 0;
    }
    const arrowEl = floating.querySelector("[data-part=arrow]");
    restoreArrowStyles = options.restoreStyles ? createStyleCleanup(arrowEl, arrowStyleProps) : void 0;
    middleware = [
      getOffsetMiddleware(arrowEl, options),
      getFlipMiddleware(options),
      getShiftMiddleware(options),
      getArrowMiddleware(arrowEl, floating.ownerDocument, options),
      (0,_middleware_mjs__WEBPACK_IMPORTED_MODULE_8__.shiftArrowMiddleware)(arrowEl),
      (0,_middleware_mjs__WEBPACK_IMPORTED_MODULE_8__.createTransformOriginMiddleware)(
        { gutter: options.gutter, offset: options.offset, overlap: options.overlap },
        arrowEl
      ),
      getSizeMiddleware(options),
      hideWhenDetachedMiddleware(options),
      _middleware_mjs__WEBPACK_IMPORTED_MODULE_8__.rectMiddleware
    ];
  }
  const { placement, strategy, onComplete, onPositioned } = options;
  let lastX;
  let lastY;
  let zIndexComputed = false;
  let lastAnchorForObserve = void 0;
  let lastFloatingForObserve = void 0;
  let cancelAutoUpdate = _zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.noop;
  const autoUpdateOptions = getAutoUpdateOptions(options.listeners);
  function syncAutoUpdateObservers() {
    if (!options.listeners) return;
    const anchor = resolveAnchor();
    const reference = resolveReference();
    const floating = resolveFloating();
    if (!reference || !floating) return;
    const anchorChanged = anchorIdentity(anchor) !== anchorIdentity(lastAnchorForObserve);
    const floatingChanged = floating !== lastFloatingForObserve;
    if (anchorChanged || floatingChanged) {
      cancelAutoUpdate();
      lastAnchorForObserve = anchor;
      lastFloatingForObserve = floating;
      cancelAutoUpdate = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.autoUpdate)(reference, floating, runUpdate, autoUpdateOptions);
    }
  }
  async function updatePosition() {
    syncAutoUpdateObservers();
    const floating = resolveFloating();
    if (!floating) return;
    if (floating !== cachedMiddlewareFloating) {
      rebuildMiddlewareForFloating(floating);
      zIndexComputed = false;
    }
    const reference = resolveReference();
    if (!reference) return;
    const pos = await (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.computePosition)(reference, floating, {
      placement,
      middleware,
      strategy
    });
    const win = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.getWindow)(floating);
    const x = roundByDpr(win, pos.x);
    const y = roundByDpr(win, pos.y);
    onComplete?.({ ...pos, x, y });
    if (options.applyStyles === false) return;
    if (!isApproximatelyEqual(lastX, x)) {
      floating.style.setProperty("--x", `${x}px`);
      lastX = x;
    }
    if (!isApproximatelyEqual(lastY, y)) {
      floating.style.setProperty("--y", `${y}px`);
      lastY = y;
    }
    if (options.hideWhenDetached) {
      const isHidden = pos.middlewareData.hide?.referenceHidden;
      if (isHidden) {
        floating.style.setProperty("visibility", "hidden");
        floating.style.setProperty("pointer-events", "none");
      } else {
        floating.style.removeProperty("visibility");
        floating.style.removeProperty("pointer-events");
      }
    }
    if (!zIndexComputed) {
      const contentEl = floating.firstElementChild;
      if (contentEl) {
        syncZIndex(floating, contentEl);
        zIndexComputed = true;
      }
    }
  }
  async function runUpdate() {
    if (opts.updatePosition) {
      await opts.updatePosition({ updatePosition, floatingElement: resolveFloating() });
      onPositioned?.({ placed: true });
    } else {
      await updatePosition();
    }
  }
  runUpdate();
  return () => {
    cancelAutoUpdate();
    restoreArrowStyles?.();
    restoreFloatingStyles?.();
    onPositioned?.({ placed: false });
  };
}
function getPlacement(referenceOrFn, floatingOrFn, opts = {}) {
  const { defer, ...options } = opts;
  const func = defer ? _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.raf : (v) => v();
  const cleanups = [];
  cleanups.push(
    func(() => {
      cleanups.push(getPlacementImpl(referenceOrFn, floatingOrFn, options));
    })
  );
  return () => {
    cleanups.forEach((fn) => fn?.());
  };
}



/***/ },

/***/ "./node_modules/@zag-js/popper/dist/get-styles.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/popper/dist/get-styles.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPlacementStyles: () => (/* binding */ getPlacementStyles)
/* harmony export */ });
/* harmony import */ var _middleware_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./middleware.mjs */ "./node_modules/@zag-js/popper/dist/middleware.mjs");
// src/get-styles.ts

var ARROW_FLOATING_STYLE = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function getPlacementStyles(options = {}) {
  const { placement, sameWidth, fitViewport, strategy = "absolute", applyStyles = true } = options;
  return {
    arrow: {
      position: "absolute",
      width: _middleware_mjs__WEBPACK_IMPORTED_MODULE_0__.cssVars.arrowSize.reference,
      height: _middleware_mjs__WEBPACK_IMPORTED_MODULE_0__.cssVars.arrowSize.reference,
      [_middleware_mjs__WEBPACK_IMPORTED_MODULE_0__.cssVars.arrowSizeHalf.variable]: `calc(${_middleware_mjs__WEBPACK_IMPORTED_MODULE_0__.cssVars.arrowSize.reference} / 2)`,
      [_middleware_mjs__WEBPACK_IMPORTED_MODULE_0__.cssVars.arrowOffset.variable]: `calc(${_middleware_mjs__WEBPACK_IMPORTED_MODULE_0__.cssVars.arrowSizeHalf.reference} * -1)`
    },
    arrowTip: {
      // @ts-expect-error - Fix this
      transform: placement ? ARROW_FLOATING_STYLE[placement.split("-")[0]] : void 0,
      background: _middleware_mjs__WEBPACK_IMPORTED_MODULE_0__.cssVars.arrowBg.reference,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "inherit"
    },
    floating: {
      position: strategy,
      isolation: "isolate",
      minWidth: sameWidth ? void 0 : "max-content",
      width: sameWidth ? "var(--reference-width)" : void 0,
      maxWidth: fitViewport ? "var(--available-width)" : void 0,
      maxHeight: fitViewport ? "var(--available-height)" : void 0,
      pointerEvents: !placement ? "none" : void 0,
      top: "0px",
      left: "0px",
      // move off-screen until placement and position are computed
      transform: placement ? "translate3d(var(--x, 0), var(--y, -100vh), 0)" : "translate3d(0, -100vh, 0)",
      zIndex: applyStyles === false ? "var(--z-index)" : void 0
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/popper/dist/middleware.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/popper/dist/middleware.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTransformOriginMiddleware: () => (/* binding */ createTransformOriginMiddleware),
/* harmony export */   cssVars: () => (/* binding */ cssVars),
/* harmony export */   rectMiddleware: () => (/* binding */ rectMiddleware),
/* harmony export */   shiftArrowMiddleware: () => (/* binding */ shiftArrowMiddleware)
/* harmony export */ });
// src/middleware.ts
var toVar = (value) => ({ variable: value, reference: `var(${value})` });
var cssVars = {
  arrowSize: toVar("--arrow-size"),
  arrowSizeHalf: toVar("--arrow-size-half"),
  arrowBg: toVar("--arrow-background"),
  transformOrigin: toVar("--transform-origin"),
  arrowOffset: toVar("--arrow-offset")
};
var getSideAxis = (side) => side === "top" || side === "bottom" ? "y" : "x";
function createTransformOriginMiddleware(opts, arrowEl) {
  return {
    name: "transformOrigin",
    fn(state) {
      const { elements, middlewareData, placement, rects, y } = state;
      const side = placement.split("-")[0];
      const axis = getSideAxis(side);
      const arrowX = middlewareData.arrow?.x || 0;
      const arrowY = middlewareData.arrow?.y || 0;
      const arrowWidth = arrowEl?.clientWidth || 0;
      const arrowHeight = arrowEl?.clientHeight || 0;
      const transformX = arrowX + arrowWidth / 2;
      const transformY = arrowY + arrowHeight / 2;
      const shiftY = Math.abs(middlewareData.shift?.y || 0);
      const halfAnchorHeight = rects.reference.height / 2;
      const arrowOffset = arrowHeight / 2;
      const gutter = opts.offset?.mainAxis ?? opts.gutter;
      const sideOffsetValue = typeof gutter === "number" ? gutter + arrowOffset : gutter ?? arrowOffset;
      const isOverlappingAnchor = shiftY > sideOffsetValue;
      const adjacentTransformOrigin = {
        top: `${transformX}px calc(100% + ${sideOffsetValue}px)`,
        bottom: `${transformX}px ${-sideOffsetValue}px`,
        left: `calc(100% + ${sideOffsetValue}px) ${transformY}px`,
        right: `${-sideOffsetValue}px ${transformY}px`
      }[side];
      const overlapTransformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`;
      const useOverlap = Boolean(opts.overlap) && axis === "y" && isOverlappingAnchor;
      elements.floating.style.setProperty(
        cssVars.transformOrigin.variable,
        useOverlap ? overlapTransformOrigin : adjacentTransformOrigin
      );
      return {
        data: {
          transformOrigin: useOverlap ? overlapTransformOrigin : adjacentTransformOrigin
        }
      };
    }
  };
}
var rectMiddleware = {
  name: "rects",
  fn({ rects }) {
    return {
      data: rects
    };
  }
};
var shiftArrowMiddleware = (arrowEl) => {
  if (!arrowEl) return;
  return {
    name: "shiftArrow",
    fn({ placement, middlewareData }) {
      if (!middlewareData.arrow) return {};
      const { x, y } = middlewareData.arrow;
      const dir = placement.split("-")[0];
      Object.assign(arrowEl.style, {
        left: x != null ? `${x}px` : "",
        top: y != null ? `${y}px` : "",
        [dir]: `calc(100% + ${cssVars.arrowOffset.reference})`
      });
      return {};
    }
  };
};



/***/ },

/***/ "./node_modules/@zag-js/popper/dist/placement.mjs"
/*!********************************************************!*\
  !*** ./node_modules/@zag-js/popper/dist/placement.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPlacementDetails: () => (/* binding */ getPlacementDetails),
/* harmony export */   getPlacementSide: () => (/* binding */ getPlacementSide),
/* harmony export */   isValidPlacement: () => (/* binding */ isValidPlacement)
/* harmony export */ });
// src/placement.ts
function isValidPlacement(v) {
  return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(v);
}
function getPlacementDetails(placement) {
  const [side, align] = placement.split("-");
  return { side, align, hasAlign: align != null };
}
function getPlacementSide(placement) {
  return placement.split("-")[0];
}



/***/ },

/***/ "./node_modules/@zag-js/presence/dist/presence.connect.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@zag-js/presence/dist/presence.connect.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connect: () => (/* binding */ connect)
/* harmony export */ });
// src/presence.connect.ts
function connect(service, _normalize) {
  const { state, send, context } = service;
  const present = state.matches("mounted", "unmountSuspended");
  return {
    skip: !context.get("initial"),
    present,
    setNode(node) {
      if (!node) return;
      send({ type: "NODE.SET", node });
    },
    unmount() {
      send({ type: "UNMOUNT" });
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/presence/dist/presence.machine.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@zag-js/presence/dist/presence.machine.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   machine: () => (/* binding */ machine)
/* harmony export */ });
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/create-machine.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/computed-style.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/set.mjs");
// src/presence.machine.ts


var machine = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createMachine)({
  props({ props }) {
    return { ...props, present: !!props.present };
  },
  initialState({ prop }) {
    return prop("present") ? "mounted" : "unmounted";
  },
  refs() {
    return {
      node: null,
      styles: null
    };
  },
  context({ bindable }) {
    return {
      unmountAnimationName: bindable(() => ({ defaultValue: null })),
      prevAnimationName: bindable(() => ({ defaultValue: null })),
      present: bindable(() => ({ defaultValue: false })),
      initial: bindable(() => ({
        sync: true,
        defaultValue: false
      }))
    };
  },
  exit: ["cleanupNode"],
  watch({ track, prop, send }) {
    track([() => prop("present")], () => {
      send({ type: "PRESENCE.CHANGED" });
    });
  },
  on: {
    "NODE.SET": {
      actions: ["setupNode"]
    },
    "PRESENCE.CHANGED": {
      actions: ["setInitial", "syncPresence"]
    }
  },
  states: {
    mounted: {
      effects: ["trackEnterAnimation"],
      on: {
        UNMOUNT: {
          target: "unmounted",
          actions: ["clearPrevAnimationName", "invokeOnExitComplete"]
        },
        "UNMOUNT.SUSPEND": {
          target: "unmountSuspended"
        }
      }
    },
    unmountSuspended: {
      effects: ["trackExitAnimation"],
      on: {
        MOUNT: {
          target: "mounted",
          actions: ["setPrevAnimationName"]
        },
        UNMOUNT: {
          target: "unmounted",
          actions: ["clearPrevAnimationName", "invokeOnExitComplete"]
        }
      }
    },
    unmounted: {
      on: {
        MOUNT: {
          target: "mounted",
          actions: ["setPrevAnimationName"]
        }
      }
    }
  },
  implementations: {
    actions: {
      setInitial: ({ context }) => {
        if (context.get("initial")) return;
        queueMicrotask(() => {
          context.set("initial", true);
        });
      },
      invokeOnExitComplete: ({ prop, refs }) => {
        prop("onExitComplete")?.();
        const node = refs.get("node");
        if (!node) return;
        const win = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.getWindow)(node);
        const event = new win.CustomEvent("exitcomplete", { bubbles: false });
        node.dispatchEvent(event);
      },
      setupNode: ({ refs, event }) => {
        if (refs.get("node") === event.node) return;
        refs.set("node", event.node);
        refs.set("styles", (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(event.node));
      },
      cleanupNode: ({ refs }) => {
        refs.set("node", null);
        refs.set("styles", null);
      },
      syncPresence: ({ context, refs, send, prop }) => {
        const presentProp = prop("present");
        if (presentProp) {
          return send({ type: "MOUNT", src: "presence.changed" });
        }
        const node = refs.get("node");
        if (!presentProp && node?.ownerDocument.visibilityState === "hidden") {
          return send({ type: "UNMOUNT", src: "visibilitychange" });
        }
        (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.raf)(() => {
          if (prop("present")) return;
          const animationName = getAnimationName(refs.get("styles"));
          context.set("unmountAnimationName", animationName);
          if (animationName === "none" || animationName === context.get("prevAnimationName") || refs.get("styles")?.display === "none" || refs.get("styles")?.animationDuration === "0s" || !hasRunningAnimation(refs.get("node"), animationName)) {
            send({ type: "UNMOUNT", src: "presence.changed" });
          } else {
            send({ type: "UNMOUNT.SUSPEND" });
          }
        });
      },
      setPrevAnimationName: ({ context, refs }) => {
        (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.raf)(() => {
          context.set("prevAnimationName", getAnimationName(refs.get("styles")));
        });
      },
      clearPrevAnimationName: ({ context }) => {
        context.set("prevAnimationName", null);
      }
    },
    effects: {
      trackEnterAnimation: ({ context, refs, prop }) => {
        if (!prop("onEnterComplete") || !context.get("initial")) return;
        let cancel;
        const track = () => {
          cancel = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.raf)(() => {
            const node = refs.get("node");
            if (!node || !node.isConnected) {
              track();
              return;
            }
            const styles = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getComputedStyle)(node);
            const animationName = getAnimationName(styles);
            if (animationName === "none" || styles.display === "none" || styles.animationDuration === "0s") {
              prop("onEnterComplete")?.();
              return;
            }
            const onEnd = (event) => {
              const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.getEventTarget)(event);
              if (target !== node || !prop("present")) return;
              node.removeEventListener("animationend", onEnd);
              prop("onEnterComplete")?.();
            };
            node.addEventListener("animationend", onEnd);
            return () => {
              node.removeEventListener("animationend", onEnd);
            };
          });
        };
        track();
        return () => cancel?.();
      },
      trackExitAnimation: ({ context, refs, send, prop }) => {
        const node = refs.get("node");
        if (!node) return;
        const onStart = (event) => {
          const target = event.composedPath?.()?.[0] ?? event.target;
          if (target === node) {
            context.set("prevAnimationName", getAnimationName(refs.get("styles")));
          }
        };
        const onEnd = (event) => {
          const animationName = getAnimationName(refs.get("styles"));
          const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.getEventTarget)(event);
          if (target === node && animationName === context.get("unmountAnimationName") && !prop("present")) {
            send({ type: "UNMOUNT", src: "animationend" });
          }
        };
        const onCancel = (event) => {
          const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.getEventTarget)(event);
          if (target === node && !prop("present")) {
            send({ type: "UNMOUNT", src: "animationcancel" });
          }
        };
        node.addEventListener("animationstart", onStart);
        node.addEventListener("animationcancel", onCancel);
        node.addEventListener("animationend", onEnd);
        const cleanupStyles = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.setStyle)(node, { animationFillMode: "forwards" });
        return () => {
          node.removeEventListener("animationstart", onStart);
          node.removeEventListener("animationcancel", onCancel);
          node.removeEventListener("animationend", onEnd);
          (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.nextTick)(() => cleanupStyles());
        };
      }
    }
  }
});
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function hasRunningAnimation(node, animationName) {
  if (!node || typeof node.getAnimations !== "function") return true;
  const names = animationName.split(",").map((name) => name.trim());
  return node.getAnimations().some((animation) => {
    const name = animation.animationName;
    return animation.playState === "running" && (name == null || names.includes(name));
  });
}



/***/ },

/***/ "./node_modules/@zag-js/react/dist/bindable.mjs"
/*!******************************************************!*\
  !*** ./node_modules/@zag-js/react/dist/bindable.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useBindable: () => (/* binding */ useBindable)
/* harmony export */ });
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/guard.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom/client");
/* harmony import */ var _use_layout_effect_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-layout-effect.mjs */ "./node_modules/@zag-js/react/dist/use-layout-effect.mjs");
"use client";

// src/bindable.ts




function useBindable(props) {
  const initial = props().value ?? props().defaultValue;
  const eq = props().isEqual ?? Object.is;
  const [initialValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initial);
  const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initialValue);
  const controlled = props().value !== void 0;
  const valueRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(value);
  valueRef.current = controlled ? props().value : value;
  const prevValue = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(valueRef.current);
  (0,_use_layout_effect_mjs__WEBPACK_IMPORTED_MODULE_4__.useSafeLayoutEffect)(() => {
    prevValue.current = valueRef.current;
  }, [value, props().value]);
  const setFn = (value2) => {
    const prev = prevValue.current;
    const next = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value2) ? value2(prev) : value2;
    if (props().debug) {
      console.log(`[bindable > ${props().debug}] setValue`, { next, prev });
    }
    if (!controlled) setValue(next);
    if (!eq(next, prev)) {
      props().onChange?.(next, prev);
    }
  };
  function get() {
    return controlled ? props().value : value;
  }
  return {
    initial: initialValue,
    ref: valueRef,
    get,
    set(value2) {
      const exec = props().sync ? react_dom__WEBPACK_IMPORTED_MODULE_3__.flushSync : _zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.identity;
      exec(() => setFn(value2));
    },
    invoke(nextValue, prevValue2) {
      props().onChange?.(nextValue, prevValue2);
    },
    hash(value2) {
      return props().hash?.(value2) ?? String(value2);
    }
  };
}
useBindable.cleanup = (fn) => {
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => fn, []);
};
useBindable.ref = (defaultValue) => {
  const value = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(defaultValue);
  return {
    get: () => value.current,
    set: (next) => {
      value.current = next;
    }
  };
};



/***/ },

/***/ "./node_modules/@zag-js/react/dist/machine.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/@zag-js/react/dist/machine.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMachine: () => (/* binding */ useMachine)
/* harmony export */ });
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/replace-tracker.mjs");
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/state.mjs");
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/types.mjs");
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/scope.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/array.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/guard.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/object.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/warning.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-dom */ "react-dom/client");
/* harmony import */ var _bindable_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bindable.mjs */ "./node_modules/@zag-js/react/dist/bindable.mjs");
/* harmony import */ var _refs_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./refs.mjs */ "./node_modules/@zag-js/react/dist/refs.mjs");
/* harmony import */ var _stable_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./stable.mjs */ "./node_modules/@zag-js/react/dist/stable.mjs");
/* harmony import */ var _track_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./track.mjs */ "./node_modules/@zag-js/react/dist/track.mjs");
/* harmony import */ var _use_layout_effect_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./use-layout-effect.mjs */ "./node_modules/@zag-js/react/dist/use-layout-effect.mjs");
"use client";

// src/machine.ts









function useMachine(machine, userProps = {}) {
  const scope = (0,react__WEBPACK_IMPORTED_MODULE_9__.useMemo)(() => {
    const { id, ids, getRootNode } = userProps;
    return (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_3__.createScope)({ id, ids, getRootNode });
  }, [userProps]);
  const debug = (...args) => {
    if (machine.debug) console.log(...args);
  };
  const props = machine.props?.({ props: (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_7__.compact)(userProps), scope }) ?? userProps;
  const prop = useProp(props);
  const context = machine.context?.({
    prop,
    bindable: _bindable_mjs__WEBPACK_IMPORTED_MODULE_11__.useBindable,
    scope,
    flush,
    getContext() {
      return ctx;
    },
    getComputed() {
      return computed;
    },
    getRefs() {
      return refs;
    },
    getEvent() {
      return getEvent();
    }
  });
  const contextRef = useLiveRef(context);
  const ctx = (0,_stable_mjs__WEBPACK_IMPORTED_MODULE_13__.useConst)(() => ({
    get(key) {
      return contextRef.current?.[key].ref.current;
    },
    set(key, value) {
      contextRef.current?.[key].set(value);
    },
    initial(key) {
      return contextRef.current?.[key].initial;
    },
    hash(key) {
      const current = contextRef.current?.[key].get();
      return contextRef.current?.[key].hash(current);
    }
  }));
  const effects = (0,react__WEBPACK_IMPORTED_MODULE_9__.useRef)(/* @__PURE__ */ new Map());
  const transitionRef = (0,react__WEBPACK_IMPORTED_MODULE_9__.useRef)(null);
  const previousEventRef = (0,react__WEBPACK_IMPORTED_MODULE_9__.useRef)(null);
  const eventRef = (0,react__WEBPACK_IMPORTED_MODULE_9__.useRef)({ type: "" });
  const getEvent = () => ({
    ...eventRef.current,
    current() {
      return eventRef.current;
    },
    previous() {
      return previousEventRef.current;
    }
  });
  const getState = () => ({
    ...state,
    matches(...values) {
      return values.some((value) => (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_1__.matchesState)(state.ref.current, value));
    },
    hasTag(tag) {
      return (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_1__.hasTag)(machine, state.ref.current, tag);
    }
  });
  const refs = (0,_refs_mjs__WEBPACK_IMPORTED_MODULE_12__.useRefs)(machine.refs?.({ prop, context: ctx }) ?? {});
  const transition = (0,_stable_mjs__WEBPACK_IMPORTED_MODULE_13__.useStableFn)((event) => {
    if (statusRef.current !== _zag_js_core__WEBPACK_IMPORTED_MODULE_2__.MachineStatus.Started) return;
    previousEventRef.current = eventRef.current;
    eventRef.current = event;
    const currentState = getCurrentState();
    const { transitions, source } = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_1__.findTransition)(machine, currentState, event.type);
    const selectedTransition = choose(transitions);
    if (!selectedTransition) return;
    transitionRef.current = selectedTransition;
    const target = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_1__.resolveStateValue)(machine, selectedTransition.target ?? currentState, source);
    debug("transition", event.type, selectedTransition.target || currentState, `(${selectedTransition.actions})`);
    const changed = target !== currentState;
    if (changed) {
      (0,react_dom__WEBPACK_IMPORTED_MODULE_10__.flushSync)(() => state.set(target));
    } else if (selectedTransition.reenter) {
      state.invoke(currentState, currentState);
    } else {
      action(selectedTransition.actions ?? []);
    }
  });
  const replaceTracker = (0,_stable_mjs__WEBPACK_IMPORTED_MODULE_13__.useConst)(_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createReplaceTracker);
  const send = (0,_stable_mjs__WEBPACK_IMPORTED_MODULE_13__.useStableFn)((event) => {
    const key = event.replaces;
    const token = key ? replaceTracker.claim(key) : void 0;
    queueMicrotask(() => {
      if (key && token && replaceTracker.isReplaced(key, token)) return;
      transition(event);
    });
  });
  const computed = (0,_stable_mjs__WEBPACK_IMPORTED_MODULE_13__.useStableFn)((key) => {
    (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_8__.ensure)(machine.computed, () => `[zag-js] No computed object found on machine`);
    const fn = machine.computed[key];
    return fn({
      context: ctx,
      event: getEvent(),
      prop,
      refs,
      scope,
      computed
    });
  });
  const getParams = () => ({
    state: getState(),
    context: ctx,
    event: getEvent(),
    prop,
    send,
    action,
    guard,
    track: _track_mjs__WEBPACK_IMPORTED_MODULE_14__.useTrack,
    refs,
    computed,
    flush,
    scope,
    choose
  });
  const action = (keys) => {
    const strs = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_6__.isFunction)(keys) ? keys(getParams()) : keys;
    if (!strs) return;
    const fns = strs.map((s) => {
      const fn = machine.implementations?.actions?.[s];
      if (!fn) (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_8__.warn)(`[zag-js] No implementation found for action "${JSON.stringify(s)}"`);
      return fn;
    });
    for (const fn of fns) {
      fn?.(getParams());
    }
  };
  const guard = (str) => {
    if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_6__.isFunction)(str)) return str(getParams());
    const fn = machine.implementations?.guards?.[str];
    if (!fn) (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_8__.warn)(`[zag-js] No implementation found for guard "${JSON.stringify(str)}"`);
    return fn?.(getParams());
  };
  const effect = (keys) => {
    const strs = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_6__.isFunction)(keys) ? keys(getParams()) : keys;
    if (!strs) return;
    const fns = strs.map((s) => {
      const fn = machine.implementations?.effects?.[s];
      if (!fn) (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_8__.warn)(`[zag-js] No implementation found for effect "${JSON.stringify(s)}"`);
      return fn;
    });
    const cleanups = [];
    for (const fn of fns) {
      const cleanup = fn?.(getParams());
      if (cleanup) cleanups.push(cleanup);
    }
    return () => cleanups.forEach((fn) => fn?.());
  };
  const choose = (transitions) => {
    return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.toArray)(transitions).find((t) => {
      let result = !t.guard;
      if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_6__.isString)(t.guard)) result = !!guard(t.guard);
      else if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_6__.isFunction)(t.guard)) result = t.guard(getParams());
      return result;
    });
  };
  const state = (0,_bindable_mjs__WEBPACK_IMPORTED_MODULE_11__.useBindable)(() => ({
    defaultValue: (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_1__.resolveStateValue)(machine, machine.initialState({ prop })),
    onChange(nextState, prevState) {
      const { exiting, entering } = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_1__.getExitEnterStates)(machine, prevState, nextState, transitionRef.current?.reenter);
      exiting.forEach((item) => {
        const exitEffects = effects.current.get(item.path);
        exitEffects?.();
        effects.current.delete(item.path);
      });
      exiting.forEach((item) => {
        action(item.state?.exit);
      });
      action(transitionRef.current?.actions);
      entering.forEach((item) => {
        const cleanup = effect(item.state?.effects);
        if (cleanup) {
          const existing = effects.current.get(item.path);
          effects.current.set(item.path, existing ? (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_5__.callAll)(existing, cleanup) : cleanup);
        }
      });
      if (prevState === _zag_js_core__WEBPACK_IMPORTED_MODULE_2__.INIT_STATE) {
        action(machine.entry);
        const cleanup = effect(machine.effects);
        if (cleanup) {
          const existing = effects.current.get(_zag_js_core__WEBPACK_IMPORTED_MODULE_2__.INIT_STATE);
          effects.current.set(_zag_js_core__WEBPACK_IMPORTED_MODULE_2__.INIT_STATE, existing ? (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_5__.callAll)(existing, cleanup) : cleanup);
        }
      }
      entering.forEach((item) => {
        action(item.state?.entry);
      });
    }
  }));
  const hydratedStateRef = (0,react__WEBPACK_IMPORTED_MODULE_9__.useRef)(void 0);
  const statusRef = (0,react__WEBPACK_IMPORTED_MODULE_9__.useRef)(_zag_js_core__WEBPACK_IMPORTED_MODULE_2__.MachineStatus.NotStarted);
  const getStatus = (0,_stable_mjs__WEBPACK_IMPORTED_MODULE_13__.useStableFn)(() => statusRef.current);
  (0,_use_layout_effect_mjs__WEBPACK_IMPORTED_MODULE_15__.useSafeLayoutEffect)(() => {
    queueMicrotask(() => {
      const started = statusRef.current === _zag_js_core__WEBPACK_IMPORTED_MODULE_2__.MachineStatus.Started;
      statusRef.current = _zag_js_core__WEBPACK_IMPORTED_MODULE_2__.MachineStatus.Started;
      debug(started ? "rehydrating..." : "initializing...");
      const initialState = hydratedStateRef.current ?? state.initial;
      state.invoke(initialState, started ? state.get() : _zag_js_core__WEBPACK_IMPORTED_MODULE_2__.INIT_STATE);
    });
    const fns = effects.current;
    return () => {
      const currentState = getCurrentState();
      debug("unmounting...");
      hydratedStateRef.current = currentState;
      statusRef.current = _zag_js_core__WEBPACK_IMPORTED_MODULE_2__.MachineStatus.Stopped;
      fns.forEach((fn) => fn?.());
      effects.current = /* @__PURE__ */ new Map();
      transitionRef.current = null;
      queueMicrotask(() => {
        action(machine.exit);
        statusRef.current = _zag_js_core__WEBPACK_IMPORTED_MODULE_2__.MachineStatus.Stopped;
      });
    };
  }, []);
  const getCurrentState = () => {
    if ("ref" in state) return state.ref.current;
    return state.get();
  };
  machine.watch?.(getParams());
  return {
    state: getState(),
    send,
    context: ctx,
    prop,
    scope,
    refs,
    computed,
    event: getEvent(),
    getStatus
  };
}
function useLiveRef(value) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_9__.useRef)(value);
  ref.current = value;
  return ref;
}
function useProp(value) {
  const ref = useLiveRef(value);
  return (0,_stable_mjs__WEBPACK_IMPORTED_MODULE_13__.useStableFn)(function get(key) {
    return ref.current[key];
  });
}
function flush(fn) {
  queueMicrotask(() => {
    (0,react_dom__WEBPACK_IMPORTED_MODULE_10__.flushSync)(() => fn());
  });
}



/***/ },

/***/ "./node_modules/@zag-js/react/dist/normalize-props.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/@zag-js/react/dist/normalize-props.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeProps: () => (/* binding */ normalizeProps)
/* harmony export */ });
/* harmony import */ var _zag_js_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/types */ "./node_modules/@zag-js/types/dist/prop-types.mjs");
// src/normalize-props.ts

var normalizeProps = (0,_zag_js_types__WEBPACK_IMPORTED_MODULE_0__.createNormalizer)((v) => v);



/***/ },

/***/ "./node_modules/@zag-js/react/dist/refs.mjs"
/*!**************************************************!*\
  !*** ./node_modules/@zag-js/react/dist/refs.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRefs: () => (/* binding */ useRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _stable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stable.mjs */ "./node_modules/@zag-js/react/dist/stable.mjs");
"use client";

// src/refs.ts


function useRefs(refs) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(refs);
  return (0,_stable_mjs__WEBPACK_IMPORTED_MODULE_1__.useConst)(() => ({
    get(key) {
      return ref.current[key];
    },
    set(key, value) {
      ref.current[key] = value;
    }
  }));
}



/***/ },

/***/ "./node_modules/@zag-js/react/dist/stable.mjs"
/*!****************************************************!*\
  !*** ./node_modules/@zag-js/react/dist/stable.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useConst: () => (/* binding */ useConst),
/* harmony export */   useStableFn: () => (/* binding */ useStableFn)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

// src/stable.ts

function useConst(factory) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);
  if (ref.current === void 0) {
    ref.current = factory();
  }
  return ref.current;
}
function useStableFn(fn) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(fn);
  ref.current = fn;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return ((...args) => ref.current(...args));
  }, []);
}



/***/ },

/***/ "./node_modules/@zag-js/react/dist/track.mjs"
/*!***************************************************!*\
  !*** ./node_modules/@zag-js/react/dist/track.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTrack: () => (/* binding */ useTrack)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

// src/track.ts

var useTrack = (deps, effect) => {
  const values = (deps ?? []).map((d) => typeof d === "function" ? d() : d);
  const previous = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const prev = previous.current;
    previous.current = values;
    if (prev === null) return;
    const changed = prev.length !== values.length || values.some((value, index) => !Object.is(value, prev[index]));
    if (changed) return effect();
  }, values);
};



/***/ },

/***/ "./node_modules/@zag-js/react/dist/use-layout-effect.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@zag-js/react/dist/use-layout-effect.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSafeLayoutEffect: () => (/* binding */ useSafeLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

// src/use-layout-effect.ts

var useSafeLayoutEffect = typeof globalThis.document !== "undefined" ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;



/***/ },

/***/ "./node_modules/@zag-js/select/dist/select.anatomy.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/@zag-js/select/dist/select.anatomy.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   anatomy: () => (/* binding */ anatomy),
/* harmony export */   parts: () => (/* binding */ parts)
/* harmony export */ });
/* harmony import */ var _zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/anatomy */ "./node_modules/@zag-js/anatomy/dist/create-anatomy.mjs");
// src/select.anatomy.ts

var anatomy = (0,_zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__.createAnatomy)("select").parts(
  "label",
  "positioner",
  "trigger",
  "indicator",
  "clearTrigger",
  "item",
  "itemText",
  "itemIndicator",
  "itemGroup",
  "itemGroupLabel",
  "list",
  "content",
  "root",
  "control",
  "valueText"
);
var parts = anatomy.build();



/***/ },

/***/ "./node_modules/@zag-js/select/dist/select.collection.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@zag-js/select/dist/select.collection.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collection: () => (/* binding */ collection)
/* harmony export */ });
/* harmony import */ var _zag_js_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/collection */ "./node_modules/@zag-js/collection/dist/list-collection.mjs");
// src/select.collection.ts

var collection = (options) => {
  return new _zag_js_collection__WEBPACK_IMPORTED_MODULE_0__.ListCollection(options);
};
collection.empty = () => {
  return new _zag_js_collection__WEBPACK_IMPORTED_MODULE_0__.ListCollection({ items: [] });
};



/***/ },

/***/ "./node_modules/@zag-js/select/dist/select.connect.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/@zag-js/select/dist/select.connect.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connect: () => (/* binding */ connect)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/form.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/initial-focus.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/typeahead.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/visually-hidden.mjs");
/* harmony import */ var _zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @zag-js/focus-visible */ "./node_modules/@zag-js/focus-visible/dist/index.mjs");
/* harmony import */ var _zag_js_popper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @zag-js/popper */ "./node_modules/@zag-js/popper/dist/get-styles.mjs");
/* harmony import */ var _zag_js_popper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @zag-js/popper */ "./node_modules/@zag-js/popper/dist/placement.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/object.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/warning.mjs");
/* harmony import */ var _select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./select.anatomy.mjs */ "./node_modules/@zag-js/select/dist/select.anatomy.mjs");
/* harmony import */ var _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./select.dom.mjs */ "./node_modules/@zag-js/select/dist/select.dom.mjs");
// src/select.connect.ts






var defaultTranslations = {
  clearTriggerLabel: "Clear value"
};
function connect(service, normalize) {
  const { context, prop, scope, state, computed, send } = service;
  const translations = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_10__.mergeWithDefault)(defaultTranslations, prop("translations"));
  const disabled = prop("disabled") || context.get("fieldsetDisabled");
  const invalid = !!prop("invalid");
  const required = !!prop("required");
  const readOnly = !!prop("readOnly");
  const composite = prop("composite");
  const collection = prop("collection");
  const open = state.hasTag("open");
  const focused = state.matches("focused");
  const highlightedValue = context.get("highlightedValue");
  const highlightedItem = context.get("highlightedItem");
  const selectedItems = computed("selectedItems");
  const currentPlacement = context.get("currentPlacement");
  const currentPlacementSide = currentPlacement ? (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_9__.getPlacementSide)(currentPlacement) : void 0;
  const isTypingAhead = computed("isTypingAhead");
  const interactive = computed("isInteractive");
  const ariaActiveDescendant = highlightedValue ? _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getItemId(scope, highlightedValue) : void 0;
  function getItemState(props) {
    const _disabled = collection.getItemDisabled(props.item);
    const value = collection.getItemValue(props.item);
    (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_11__.ensure)(value, () => `[zag-js] No value found for item ${JSON.stringify(props.item)}`);
    return {
      value,
      disabled: Boolean(disabled || _disabled),
      highlighted: highlightedValue === value,
      selected: context.get("value").includes(value)
    };
  }
  const popperStyles = (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_8__.getPlacementStyles)({
    ...prop("positioning"),
    placement: currentPlacement
  });
  return {
    open,
    focused,
    empty: context.get("value").length === 0,
    highlightedItem,
    highlightedValue,
    selectedItems,
    hasSelectedItems: computed("hasSelectedItems"),
    value: context.get("value"),
    valueAsString: computed("valueAsString"),
    collection,
    multiple: !!prop("multiple"),
    disabled: !!disabled,
    reposition(options = {}) {
      send({ type: "POSITIONING.SET", options });
    },
    focus() {
      _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getTriggerEl(scope)?.focus({ preventScroll: true });
    },
    setOpen(nextOpen) {
      send({ type: nextOpen ? "OPEN" : "CLOSE", replaces: "open" });
    },
    selectValue(value) {
      send({ type: "ITEM.SELECT", value });
    },
    setValue(value) {
      send({ type: "VALUE.SET", value });
    },
    selectAll() {
      send({ type: "VALUE.SET", value: collection.getValues() });
    },
    setHighlightValue(value) {
      send({ type: "HIGHLIGHTED_VALUE.SET", value });
    },
    clearHighlightValue() {
      send({ type: "HIGHLIGHTED_VALUE.CLEAR" });
    },
    clearValue(value) {
      if (value) {
        send({ type: "ITEM.CLEAR", value });
      } else {
        send({ type: "VALUE.CLEAR" });
      }
    },
    getItemState,
    getRootProps() {
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.root.attrs,
        dir: prop("dir"),
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getRootId(scope),
        "data-invalid": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(invalid),
        "data-readonly": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(readOnly)
      });
    },
    getLabelProps() {
      return normalize.label({
        dir: prop("dir"),
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getLabelId(scope),
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.label.attrs,
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(disabled),
        "data-invalid": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(invalid),
        "data-readonly": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(readOnly),
        "data-required": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(required),
        htmlFor: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getHiddenSelectId(scope),
        onClick(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getTriggerEl(scope)?.focus({ preventScroll: true });
        }
      });
    },
    getControlProps() {
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.control.attrs,
        dir: prop("dir"),
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getControlId(scope),
        "data-state": open ? "open" : "closed",
        "data-focus": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(focused),
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(disabled),
        "data-invalid": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(invalid)
      });
    },
    getValueTextProps() {
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.valueText.attrs,
        dir: prop("dir"),
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(disabled),
        "data-invalid": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(invalid),
        "data-focus": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(focused)
      });
    },
    getTriggerProps() {
      return normalize.button({
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getTriggerId(scope),
        disabled,
        dir: prop("dir"),
        type: "button",
        role: "combobox",
        "aria-controls": _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getContentId(scope),
        "aria-expanded": open,
        "aria-haspopup": "listbox",
        "data-state": open ? "open" : "closed",
        "aria-invalid": invalid,
        "aria-required": required,
        "aria-labelledby": _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getLabelId(scope),
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.trigger.attrs,
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(disabled),
        "data-invalid": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(invalid),
        "data-readonly": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(readOnly),
        "data-placement": currentPlacement,
        "data-side": currentPlacementSide,
        "data-placeholder-shown": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(!computed("hasSelectedItems")),
        onClick(event) {
          if (!interactive) return;
          if (event.defaultPrevented) return;
          send({ type: "TRIGGER.CLICK" });
        },
        onFocus() {
          send({ type: "TRIGGER.FOCUS" });
        },
        onBlur() {
          send({ type: "TRIGGER.BLUR" });
        },
        onKeyDown(event) {
          if (event.defaultPrevented) return;
          if (!interactive) return;
          const keyMap = {
            ArrowUp() {
              send({ type: "TRIGGER.ARROW_UP" });
            },
            ArrowDown(event2) {
              send({ type: event2.altKey ? "OPEN" : "TRIGGER.ARROW_DOWN" });
            },
            ArrowLeft() {
              send({ type: "TRIGGER.ARROW_LEFT" });
            },
            ArrowRight() {
              send({ type: "TRIGGER.ARROW_RIGHT" });
            },
            Home() {
              send({ type: "TRIGGER.HOME" });
            },
            End() {
              send({ type: "TRIGGER.END" });
            },
            Enter() {
              send({ type: "TRIGGER.ENTER" });
            },
            Space(event2) {
              if (isTypingAhead) {
                send({ type: "TRIGGER.TYPEAHEAD", key: event2.key });
              } else {
                send({ type: "TRIGGER.ENTER" });
              }
            }
          };
          const exec = keyMap[(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventKey)(event, {
            dir: prop("dir"),
            orientation: "vertical"
          })];
          if (exec) {
            exec(event);
            event.preventDefault();
            return;
          }
          if (_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.getByTypeahead.isValidEvent(event)) {
            send({ type: "TRIGGER.TYPEAHEAD", key: event.key });
            event.preventDefault();
          }
        }
      });
    },
    getIndicatorProps() {
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.indicator.attrs,
        dir: prop("dir"),
        "aria-hidden": true,
        "data-state": open ? "open" : "closed",
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(disabled),
        "data-invalid": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(invalid),
        "data-readonly": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(readOnly)
      });
    },
    getItemProps(props) {
      const itemState = getItemState(props);
      return normalize.element({
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getItemId(scope, itemState.value),
        role: "option",
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.item.attrs,
        dir: prop("dir"),
        "data-value": itemState.value,
        "aria-selected": itemState.selected,
        "data-state": itemState.selected ? "checked" : "unchecked",
        "data-highlighted": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(itemState.highlighted),
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(itemState.disabled),
        "aria-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.ariaAttr)(itemState.disabled),
        onPointerMove(event) {
          if (itemState.disabled || event.pointerType !== "mouse") return;
          if ((0,_zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_7__.getInteractionModality)() !== "pointer") return;
          if (itemState.value === highlightedValue) return;
          send({ type: "ITEM.POINTER_MOVE", value: itemState.value });
        },
        onClick(event) {
          if (event.defaultPrevented) return;
          if (itemState.disabled) return;
          send({ type: "ITEM.CLICK", src: "pointerup", value: itemState.value });
        },
        onPointerLeave(event) {
          if (itemState.disabled) return;
          if (props.persistFocus) return;
          if (event.pointerType !== "mouse") return;
          if ((0,_zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_7__.getInteractionModality)() !== "pointer") return;
          send({ type: "ITEM.POINTER_LEAVE" });
        }
      });
    },
    getItemTextProps(props) {
      const itemState = getItemState(props);
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.itemText.attrs,
        "data-state": itemState.selected ? "checked" : "unchecked",
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(itemState.disabled),
        "data-highlighted": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(itemState.highlighted)
      });
    },
    getItemIndicatorProps(props) {
      const itemState = getItemState(props);
      return normalize.element({
        "aria-hidden": true,
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.itemIndicator.attrs,
        "data-state": itemState.selected ? "checked" : "unchecked",
        hidden: !itemState.selected
      });
    },
    getItemGroupLabelProps(props) {
      const { htmlFor } = props;
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.itemGroupLabel.attrs,
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getItemGroupLabelId(scope, htmlFor),
        dir: prop("dir"),
        role: "presentation"
      });
    },
    getItemGroupProps(props) {
      const { id } = props;
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.itemGroup.attrs,
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(disabled),
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getItemGroupId(scope, id),
        "aria-labelledby": _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getItemGroupLabelId(scope, id),
        role: "group",
        dir: prop("dir")
      });
    },
    getClearTriggerProps() {
      return normalize.button({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.clearTrigger.attrs,
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getClearTriggerId(scope),
        type: "button",
        "aria-label": translations.clearTriggerLabel,
        "data-invalid": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.dataAttr)(invalid),
        disabled,
        hidden: !computed("hasSelectedItems"),
        dir: prop("dir"),
        onClick(event) {
          if (event.defaultPrevented) return;
          send({ type: "CLEAR.CLICK" });
        }
      });
    },
    getHiddenSelectProps() {
      const value = context.get("value");
      const defaultValue = prop("multiple") ? value : value?.[0];
      const handleChange = (e) => {
        const evt = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getNativeEvent)(e);
        if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isInternalChangeEvent)(evt)) return;
        send({ type: "VALUE.SET", value: getSelectedValues(e.currentTarget) });
      };
      return normalize.select({
        name: prop("name"),
        form: prop("form"),
        disabled,
        multiple: prop("multiple"),
        required: prop("required"),
        "aria-hidden": true,
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getHiddenSelectId(scope),
        defaultValue,
        style: _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__.visuallyHiddenStyle,
        tabIndex: -1,
        autoComplete: prop("autoComplete"),
        onChange: handleChange,
        onInput: handleChange,
        // Some browser extensions will focus the hidden select.
        // Let's forward the focus to the trigger.
        onFocus() {
          _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getTriggerEl(scope)?.focus({ preventScroll: true });
        },
        "aria-labelledby": _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getLabelId(scope)
      });
    },
    getPositionerProps() {
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.positioner.attrs,
        dir: prop("dir"),
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getPositionerId(scope),
        style: popperStyles.floating
      });
    },
    getContentProps() {
      return normalize.element({
        hidden: !open,
        dir: prop("dir"),
        id: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getContentId(scope),
        role: composite ? "listbox" : "dialog",
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.content.attrs,
        "data-state": open ? "open" : "closed",
        "data-placement": currentPlacement,
        "data-side": currentPlacementSide,
        "data-activedescendant": ariaActiveDescendant,
        "aria-activedescendant": composite ? ariaActiveDescendant : void 0,
        "aria-multiselectable": prop("multiple") && composite ? true : void 0,
        "aria-labelledby": _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getLabelId(scope),
        tabIndex: 0,
        onKeyDown(event) {
          if (!interactive) return;
          if (!(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.contains)(event.currentTarget, (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(event))) return;
          if (event.key === "Tab") {
            const valid = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.isValidTabEvent)(event);
            if (!valid) {
              event.preventDefault();
              return;
            }
          }
          const keyMap = {
            ArrowUp() {
              send({ type: "CONTENT.ARROW_UP" });
            },
            ArrowDown() {
              send({ type: "CONTENT.ARROW_DOWN" });
            },
            Home() {
              send({ type: "CONTENT.HOME" });
            },
            End() {
              send({ type: "CONTENT.END" });
            },
            Enter() {
              send({ type: "ITEM.CLICK", src: "keydown.enter" });
            },
            Space(event2) {
              if (isTypingAhead) {
                send({ type: "CONTENT.TYPEAHEAD", key: event2.key });
              } else {
                keyMap.Enter?.(event2);
              }
            }
          };
          const exec = keyMap[(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventKey)(event)];
          if (exec) {
            exec(event);
            event.preventDefault();
            return;
          }
          const target = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(event);
          if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.isEditableElement)(target)) {
            return;
          }
          if (_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.getByTypeahead.isValidEvent(event)) {
            send({ type: "CONTENT.TYPEAHEAD", key: event.key });
            event.preventDefault();
          }
        }
      });
    },
    getListProps() {
      return normalize.element({
        ..._select_anatomy_mjs__WEBPACK_IMPORTED_MODULE_12__.parts.list.attrs,
        tabIndex: 0,
        role: !composite ? "listbox" : void 0,
        "aria-labelledby": _select_dom_mjs__WEBPACK_IMPORTED_MODULE_13__.getTriggerId(scope),
        "aria-activedescendant": !composite ? ariaActiveDescendant : void 0,
        "aria-multiselectable": !composite && prop("multiple") ? true : void 0
      });
    }
  };
}
var getSelectedValues = (el) => {
  return el.multiple ? Array.from(el.selectedOptions, (o) => o.value) : el.value ? [el.value] : [];
};



/***/ },

/***/ "./node_modules/@zag-js/select/dist/select.dom.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/select/dist/select.dom.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClearTriggerEl: () => (/* binding */ getClearTriggerEl),
/* harmony export */   getClearTriggerId: () => (/* binding */ getClearTriggerId),
/* harmony export */   getContentEl: () => (/* binding */ getContentEl),
/* harmony export */   getContentId: () => (/* binding */ getContentId),
/* harmony export */   getControlEl: () => (/* binding */ getControlEl),
/* harmony export */   getControlId: () => (/* binding */ getControlId),
/* harmony export */   getHiddenSelectEl: () => (/* binding */ getHiddenSelectEl),
/* harmony export */   getHiddenSelectId: () => (/* binding */ getHiddenSelectId),
/* harmony export */   getItemEl: () => (/* binding */ getItemEl),
/* harmony export */   getItemGroupId: () => (/* binding */ getItemGroupId),
/* harmony export */   getItemGroupLabelId: () => (/* binding */ getItemGroupLabelId),
/* harmony export */   getItemId: () => (/* binding */ getItemId),
/* harmony export */   getLabelId: () => (/* binding */ getLabelId),
/* harmony export */   getPositionerEl: () => (/* binding */ getPositionerEl),
/* harmony export */   getPositionerId: () => (/* binding */ getPositionerId),
/* harmony export */   getRootId: () => (/* binding */ getRootId),
/* harmony export */   getTriggerEl: () => (/* binding */ getTriggerEl),
/* harmony export */   getTriggerId: () => (/* binding */ getTriggerId)
/* harmony export */ });
// src/select.dom.ts
var getRootId = (ctx) => ctx.ids?.root ?? `select:${ctx.id}`;
var getContentId = (ctx) => ctx.ids?.content ?? `select:${ctx.id}:content`;
var getTriggerId = (ctx) => ctx.ids?.trigger ?? `select:${ctx.id}:trigger`;
var getClearTriggerId = (ctx) => ctx.ids?.clearTrigger ?? `select:${ctx.id}:clear-trigger`;
var getLabelId = (ctx) => ctx.ids?.label ?? `select:${ctx.id}:label`;
var getControlId = (ctx) => ctx.ids?.control ?? `select:${ctx.id}:control`;
var getItemId = (ctx, id) => ctx.ids?.item?.(id) ?? `select:${ctx.id}:option:${id}`;
var getHiddenSelectId = (ctx) => ctx.ids?.hiddenSelect ?? `select:${ctx.id}:select`;
var getPositionerId = (ctx) => ctx.ids?.positioner ?? `select:${ctx.id}:positioner`;
var getItemGroupId = (ctx, id) => ctx.ids?.itemGroup?.(id) ?? `select:${ctx.id}:optgroup:${id}`;
var getItemGroupLabelId = (ctx, id) => ctx.ids?.itemGroupLabel?.(id) ?? `select:${ctx.id}:optgroup-label:${id}`;
var getHiddenSelectEl = (ctx) => ctx.getById(getHiddenSelectId(ctx));
var getContentEl = (ctx) => ctx.getById(getContentId(ctx));
var getControlEl = (ctx) => ctx.getById(getControlId(ctx));
var getTriggerEl = (ctx) => ctx.getById(getTriggerId(ctx));
var getClearTriggerEl = (ctx) => ctx.getById(getClearTriggerId(ctx));
var getPositionerEl = (ctx) => ctx.getById(getPositionerId(ctx));
var getItemEl = (ctx, id) => {
  if (id == null) return null;
  return ctx.getById(getItemId(ctx, id));
};



/***/ },

/***/ "./node_modules/@zag-js/select/dist/select.machine.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/@zag-js/select/dist/select.machine.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   machine: () => (/* binding */ machine)
/* harmony export */ });
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/create-machine.mjs");
/* harmony import */ var _zag_js_dismissable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dismissable */ "./node_modules/@zag-js/dismissable/dist/dismissable-layer.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/form.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/initial-focus.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/mutation-observer.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/scroll.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/typeahead.mjs");
/* harmony import */ var _zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @zag-js/focus-visible */ "./node_modules/@zag-js/focus-visible/dist/index.mjs");
/* harmony import */ var _zag_js_popper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @zag-js/popper */ "./node_modules/@zag-js/popper/dist/get-placement.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/array.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/equal.mjs");
/* harmony import */ var _zag_js_collection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @zag-js/collection */ "./node_modules/@zag-js/collection/dist/selection-map.mjs");
/* harmony import */ var _select_collection_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./select.collection.mjs */ "./node_modules/@zag-js/select/dist/select.collection.mjs");
/* harmony import */ var _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./select.dom.mjs */ "./node_modules/@zag-js/select/dist/select.dom.mjs");
// src/select.machine.ts









var { and, not, or } = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createGuards)();
var machine = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createMachine)({
  props({ props }) {
    return {
      loopFocus: false,
      closeOnSelect: !props.multiple,
      composite: true,
      defaultValue: [],
      ...props,
      collection: props.collection ?? _select_collection_mjs__WEBPACK_IMPORTED_MODULE_13__.collection.empty(),
      positioning: {
        placement: "bottom-start",
        gutter: 8,
        ...props.positioning
      }
    };
  },
  context({ prop, bindable, getContext }) {
    const initialValue = prop("value") ?? prop("defaultValue") ?? [];
    const initialSelectedItems = prop("collection").findMany(initialValue);
    return {
      value: bindable(() => ({
        defaultValue: prop("defaultValue"),
        value: prop("value"),
        isEqual: _zag_js_utils__WEBPACK_IMPORTED_MODULE_11__.isEqual,
        onChange(value) {
          const context = getContext();
          const collection2 = prop("collection");
          const selectedItemMap = context.get("selectedItemMap");
          const proposed = (0,_zag_js_collection__WEBPACK_IMPORTED_MODULE_12__.deriveSelectionState)({
            values: value,
            collection: collection2,
            selectedItemMap
          });
          const effectiveValue = prop("value") ?? value;
          const effective = effectiveValue === value ? proposed : (0,_zag_js_collection__WEBPACK_IMPORTED_MODULE_12__.deriveSelectionState)({
            values: effectiveValue,
            collection: collection2,
            selectedItemMap: proposed.nextSelectedItemMap
          });
          context.set("selectedItemMap", effective.nextSelectedItemMap);
          return prop("onValueChange")?.({ value, items: proposed.selectedItems });
        }
      })),
      highlightedValue: bindable(() => ({
        defaultValue: prop("defaultHighlightedValue") || null,
        value: prop("highlightedValue"),
        onChange(value) {
          prop("onHighlightChange")?.({
            highlightedValue: value,
            highlightedItem: prop("collection").find(value),
            highlightedIndex: prop("collection").indexOf(value)
          });
        }
      })),
      currentPlacement: bindable(() => ({
        defaultValue: void 0
      })),
      fieldsetDisabled: bindable(() => ({
        defaultValue: false
      })),
      highlightedItem: bindable(() => ({
        defaultValue: null
      })),
      selectedItemMap: bindable(() => {
        return {
          defaultValue: (0,_zag_js_collection__WEBPACK_IMPORTED_MODULE_12__.createSelectedItemMap)({
            selectedItems: initialSelectedItems,
            collection: prop("collection")
          })
        };
      })
    };
  },
  refs() {
    return {
      typeahead: { ..._zag_js_dom_query__WEBPACK_IMPORTED_MODULE_7__.getByTypeahead.defaultOptions }
    };
  },
  computed: {
    hasSelectedItems: ({ context }) => context.get("value").length > 0,
    isTypingAhead: ({ refs }) => refs.get("typeahead").keysSoFar !== "",
    isDisabled: ({ prop, context }) => !!prop("disabled") || !!context.get("fieldsetDisabled"),
    isInteractive: ({ prop }) => !(prop("disabled") || prop("readOnly")),
    selectedItems: ({ context, prop }) => (0,_zag_js_collection__WEBPACK_IMPORTED_MODULE_12__.resolveSelectedItems)({
      values: context.get("value"),
      collection: prop("collection"),
      selectedItemMap: context.get("selectedItemMap")
    }),
    valueAsString: ({ computed, prop }) => prop("collection").stringifyItems(computed("selectedItems"))
  },
  initialState({ prop }) {
    const open = prop("open") || prop("defaultOpen");
    return open ? "open" : "idle";
  },
  entry: ["syncSelectElement"],
  watch({ context, prop, track, action }) {
    track([() => context.get("value").toString()], () => {
      action(["syncSelectedItems", "syncSelectElement", "dispatchChangeEvent"]);
    });
    track([() => prop("open")], () => {
      action(["toggleVisibility"]);
    });
    track([() => context.get("highlightedValue")], () => {
      action(["syncHighlightedItem"]);
    });
    track([() => prop("collection").toString()], () => {
      action(["syncCollection"]);
    });
  },
  on: {
    "HIGHLIGHTED_VALUE.SET": {
      actions: ["setHighlightedItem"]
    },
    "HIGHLIGHTED_VALUE.CLEAR": {
      actions: ["clearHighlightedItem"]
    },
    "ITEM.SELECT": {
      actions: ["selectItem"]
    },
    "ITEM.CLEAR": {
      actions: ["clearItem"]
    },
    "VALUE.SET": {
      actions: ["setSelectedItems"]
    },
    "VALUE.CLEAR": {
      actions: ["clearSelectedItems"]
    },
    "CLEAR.CLICK": {
      actions: ["clearSelectedItems", "focusTriggerEl"]
    }
  },
  effects: ["trackFormControlState"],
  states: {
    idle: {
      tags: ["closed"],
      on: {
        "CONTROLLED.OPEN": [
          {
            guard: "isTriggerClickEvent",
            target: "open",
            actions: ["setInitialFocus", "highlightFirstSelectedItem"]
          },
          {
            target: "open",
            actions: ["setInitialFocus"]
          }
        ],
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["invokeOnOpen", "setInitialFocus", "highlightFirstSelectedItem"]
          }
        ],
        "TRIGGER.FOCUS": {
          target: "focused"
        },
        OPEN: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setInitialFocus", "invokeOnOpen"]
          }
        ]
      }
    },
    focused: {
      tags: ["closed"],
      on: {
        "CONTROLLED.OPEN": [
          {
            guard: "isTriggerClickEvent",
            target: "open",
            actions: ["setInitialFocus", "highlightFirstSelectedItem"]
          },
          {
            guard: "isTriggerArrowUpEvent",
            target: "open",
            actions: ["setInitialFocus", "highlightComputedLastItem"]
          },
          {
            guard: or("isTriggerArrowDownEvent", "isTriggerEnterEvent"),
            target: "open",
            actions: ["setInitialFocus", "highlightComputedFirstItem"]
          },
          {
            target: "open",
            actions: ["setInitialFocus"]
          }
        ],
        OPEN: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setInitialFocus", "invokeOnOpen"]
          }
        ],
        "TRIGGER.BLUR": {
          target: "idle"
        },
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setInitialFocus", "invokeOnOpen", "highlightFirstSelectedItem"]
          }
        ],
        "TRIGGER.ENTER": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setInitialFocus", "invokeOnOpen", "highlightComputedFirstItem"]
          }
        ],
        "TRIGGER.ARROW_UP": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setInitialFocus", "invokeOnOpen", "highlightComputedLastItem"]
          }
        ],
        "TRIGGER.ARROW_DOWN": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setInitialFocus", "invokeOnOpen", "highlightComputedFirstItem"]
          }
        ],
        "TRIGGER.ARROW_LEFT": [
          {
            guard: and(not("multiple"), "hasSelectedItems"),
            actions: ["selectPreviousItem"]
          },
          {
            guard: not("multiple"),
            actions: ["selectLastItem"]
          }
        ],
        "TRIGGER.ARROW_RIGHT": [
          {
            guard: and(not("multiple"), "hasSelectedItems"),
            actions: ["selectNextItem"]
          },
          {
            guard: not("multiple"),
            actions: ["selectFirstItem"]
          }
        ],
        "TRIGGER.HOME": {
          guard: not("multiple"),
          actions: ["selectFirstItem"]
        },
        "TRIGGER.END": {
          guard: not("multiple"),
          actions: ["selectLastItem"]
        },
        "TRIGGER.TYPEAHEAD": {
          guard: not("multiple"),
          actions: ["selectMatchingItem"]
        }
      }
    },
    open: {
      tags: ["open"],
      exit: ["scrollContentToTop"],
      effects: ["trackDismissableElement", "trackFocusVisible", "computePlacement", "scrollToHighlightedItem"],
      on: {
        "CONTROLLED.CLOSE": [
          {
            guard: "restoreFocus",
            target: "focused",
            actions: ["focusTriggerEl", "clearHighlightedItem"]
          },
          {
            target: "idle",
            actions: ["clearHighlightedItem"]
          }
        ],
        CLOSE: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            guard: "restoreFocus",
            target: "focused",
            actions: ["invokeOnClose", "focusTriggerEl", "clearHighlightedItem"]
          },
          {
            target: "idle",
            actions: ["invokeOnClose", "clearHighlightedItem"]
          }
        ],
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["invokeOnClose", "clearHighlightedItem"]
          }
        ],
        "ITEM.CLICK": [
          {
            guard: and("closeOnSelect", "isOpenControlled"),
            actions: ["selectHighlightedItem", "invokeOnClose"]
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: ["selectHighlightedItem", "invokeOnClose", "focusTriggerEl", "clearHighlightedItem"]
          },
          {
            actions: ["selectHighlightedItem"]
          }
        ],
        "CONTENT.HOME": {
          actions: ["highlightFirstItem"]
        },
        "CONTENT.END": {
          actions: ["highlightLastItem"]
        },
        "CONTENT.ARROW_DOWN": [
          {
            guard: and("hasHighlightedItem", "loop", "isLastItemHighlighted"),
            actions: ["highlightFirstItem"]
          },
          {
            guard: "hasHighlightedItem",
            actions: ["highlightNextItem"]
          },
          {
            actions: ["highlightFirstItem"]
          }
        ],
        "CONTENT.ARROW_UP": [
          {
            guard: and("hasHighlightedItem", "loop", "isFirstItemHighlighted"),
            actions: ["highlightLastItem"]
          },
          {
            guard: "hasHighlightedItem",
            actions: ["highlightPreviousItem"]
          },
          {
            actions: ["highlightLastItem"]
          }
        ],
        "CONTENT.TYPEAHEAD": {
          actions: ["highlightMatchingItem"]
        },
        "ITEM.POINTER_MOVE": {
          actions: ["highlightItem"]
        },
        "ITEM.POINTER_LEAVE": {
          actions: ["clearHighlightedItem"]
        },
        "POSITIONING.SET": {
          actions: ["reposition"]
        }
      }
    }
  },
  implementations: {
    guards: {
      loop: ({ prop }) => !!prop("loopFocus"),
      multiple: ({ prop }) => !!prop("multiple"),
      hasSelectedItems: ({ computed }) => !!computed("hasSelectedItems"),
      hasHighlightedItem: ({ context }) => context.get("highlightedValue") != null,
      isFirstItemHighlighted: ({ context, prop }) => context.get("highlightedValue") === prop("collection").firstValue,
      isLastItemHighlighted: ({ context, prop }) => context.get("highlightedValue") === prop("collection").lastValue,
      closeOnSelect: ({ prop, event }) => !!(event.closeOnSelect ?? prop("closeOnSelect")),
      restoreFocus: ({ event }) => restoreFocusFn(event),
      // guard assertions (for controlled mode)
      isOpenControlled: ({ prop }) => prop("open") !== void 0,
      isTriggerClickEvent: ({ event }) => event.previousEvent?.type === "TRIGGER.CLICK",
      isTriggerEnterEvent: ({ event }) => event.previousEvent?.type === "TRIGGER.ENTER",
      isTriggerArrowUpEvent: ({ event }) => event.previousEvent?.type === "TRIGGER.ARROW_UP",
      isTriggerArrowDownEvent: ({ event }) => event.previousEvent?.type === "TRIGGER.ARROW_DOWN"
    },
    effects: {
      trackFocusVisible({ scope }) {
        return (0,_zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_8__.trackFocusVisible)({ root: scope.getRootNode?.() });
      },
      trackFormControlState({ context, scope }) {
        return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.trackFormControl)(_select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getHiddenSelectEl(scope), {
          onFieldsetDisabledChange(disabled) {
            context.set("fieldsetDisabled", disabled);
          },
          onFormReset() {
            const value = context.initial("value");
            context.set("value", value);
          }
        });
      },
      trackDismissableElement({ scope, send, prop }) {
        const contentEl = () => _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getContentEl(scope);
        let restoreFocus = true;
        return (0,_zag_js_dismissable__WEBPACK_IMPORTED_MODULE_1__.trackDismissableElement)(contentEl, {
          type: "listbox",
          defer: true,
          getRootNode: scope.getRootNode,
          layerStyleTargets: [() => _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getPositionerEl(scope)],
          exclude: [_select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getTriggerEl(scope), _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getClearTriggerEl(scope)],
          onFocusOutside: prop("onFocusOutside"),
          onPointerDownOutside: prop("onPointerDownOutside"),
          onInteractOutside(event) {
            prop("onInteractOutside")?.(event);
            restoreFocus = !(event.detail.focusable || event.detail.contextmenu);
          },
          onDismiss(event) {
            send({ type: "CLOSE", src: "interact-outside", restoreFocus, focusVisible: event?.type === "keydown" });
          }
        });
      },
      computePlacement({ context, prop, scope }) {
        const positioning = prop("positioning");
        context.set("currentPlacement", positioning.placement);
        const triggerEl = () => _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getTriggerEl(scope);
        const positionerEl = () => _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getPositionerEl(scope);
        return (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_9__.getPlacement)(triggerEl, positionerEl, {
          defer: true,
          ...positioning,
          onComplete(data) {
            context.set("currentPlacement", data.placement);
          }
        });
      },
      scrollToHighlightedItem({ context, prop, scope }) {
        const exec = (immediate) => {
          const highlightedValue = context.get("highlightedValue");
          if (highlightedValue == null) return;
          const modality = (0,_zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_8__.getInteractionModality)();
          if (modality === "pointer") return;
          const contentEl2 = _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getContentEl(scope);
          const scrollToIndexFn = prop("scrollToIndexFn");
          if (scrollToIndexFn) {
            const highlightedIndex = prop("collection").indexOf(highlightedValue);
            scrollToIndexFn?.({
              index: highlightedIndex,
              immediate,
              getElement: () => _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getItemEl(scope, highlightedValue)
            });
            return;
          }
          const itemEl = _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getItemEl(scope, highlightedValue);
          (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_6__.scrollIntoView)(itemEl, { rootEl: contentEl2, block: "nearest" });
        };
        const rafCleanup = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.raf)(() => {
          (0,_zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_8__.setInteractionModality)("virtual");
          exec(true);
        });
        const contentEl = () => _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getContentEl(scope);
        const observerCleanup = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.observeAttributes)(contentEl, {
          defer: true,
          attributes: ["data-activedescendant"],
          callback() {
            exec(false);
          }
        });
        return () => {
          rafCleanup();
          observerCleanup();
        };
      }
    },
    actions: {
      reposition({ context, prop, scope, event }) {
        const positionerEl = () => _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getPositionerEl(scope);
        (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_9__.getPlacement)(_select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getTriggerEl(scope), positionerEl, {
          ...prop("positioning"),
          ...event.options,
          defer: true,
          listeners: false,
          onComplete(data) {
            context.set("currentPlacement", data.placement);
          }
        });
      },
      toggleVisibility({ send, prop, event }) {
        send({ type: prop("open") ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE", previousEvent: event });
      },
      highlightPreviousItem({ context, prop }) {
        const highlightedValue = context.get("highlightedValue");
        if (highlightedValue == null) return;
        const value = prop("collection").getPreviousValue(highlightedValue, 1, prop("loopFocus"));
        if (value == null) return;
        context.set("highlightedValue", value);
      },
      highlightNextItem({ context, prop }) {
        const highlightedValue = context.get("highlightedValue");
        if (highlightedValue == null) return;
        const value = prop("collection").getNextValue(highlightedValue, 1, prop("loopFocus"));
        if (value == null) return;
        context.set("highlightedValue", value);
      },
      highlightFirstItem({ context, prop }) {
        const value = prop("collection").firstValue;
        context.set("highlightedValue", value);
      },
      highlightLastItem({ context, prop }) {
        const value = prop("collection").lastValue;
        context.set("highlightedValue", value);
      },
      setInitialFocus({ scope }) {
        (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.raf)(() => {
          const element = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.getInitialFocus)({
            root: _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getContentEl(scope)
          });
          if (!element) return;
          element.focus({ preventScroll: true });
        });
      },
      focusTriggerEl({ event, scope }) {
        if (!restoreFocusFn(event)) return;
        const focusOptions = getReturnFocusOptions(event);
        (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_5__.raf)(() => {
          const element = _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getTriggerEl(scope);
          element?.focus(focusOptions);
        });
      },
      selectHighlightedItem({ context, prop, event }) {
        let value = event.value ?? context.get("highlightedValue");
        if (value == null || !prop("collection").has(value)) return;
        prop("onSelect")?.({ value });
        const nullable = prop("deselectable") && !prop("multiple") && context.get("value").includes(value);
        value = nullable ? null : value;
        context.set("value", (prev) => {
          if (value == null) return [];
          if (prop("multiple")) return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_10__.addOrRemove)(prev, value);
          return [value];
        });
      },
      highlightComputedFirstItem({ context, prop, computed }) {
        const collection2 = prop("collection");
        const value = computed("hasSelectedItems") ? collection2.sort(context.get("value"))[0] : collection2.firstValue;
        context.set("highlightedValue", value);
      },
      highlightComputedLastItem({ context, prop, computed }) {
        const collection2 = prop("collection");
        const value = computed("hasSelectedItems") ? collection2.sort(context.get("value"))[0] : collection2.lastValue;
        context.set("highlightedValue", value);
      },
      highlightFirstSelectedItem({ context, prop, computed }) {
        if (!computed("hasSelectedItems")) return;
        const value = prop("collection").sort(context.get("value"))[0];
        context.set("highlightedValue", value);
      },
      highlightItem({ context, event }) {
        context.set("highlightedValue", event.value);
      },
      highlightMatchingItem({ context, prop, event, refs }) {
        const value = prop("collection").search(event.key, {
          state: refs.get("typeahead"),
          currentValue: context.get("highlightedValue")
        });
        if (value == null) return;
        context.set("highlightedValue", value);
      },
      setHighlightedItem({ context, event }) {
        context.set("highlightedValue", event.value);
      },
      clearHighlightedItem({ context }) {
        context.set("highlightedValue", null);
      },
      selectItem({ context, prop, event }) {
        prop("onSelect")?.({ value: event.value });
        const nullable = prop("deselectable") && !prop("multiple") && context.get("value").includes(event.value);
        const value = nullable ? null : event.value;
        context.set("value", (prev) => {
          if (value == null) return [];
          if (prop("multiple")) return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_10__.addOrRemove)(prev, value);
          return [value];
        });
      },
      clearItem({ context, event }) {
        context.set("value", (prev) => prev.filter((v) => v !== event.value));
      },
      setSelectedItems({ context, event }) {
        context.set("value", event.value);
      },
      clearSelectedItems({ context }) {
        context.set("value", []);
      },
      selectPreviousItem({ context, prop }) {
        const [firstItem] = context.get("value");
        const value = prop("collection").getPreviousValue(firstItem);
        if (value) context.set("value", [value]);
      },
      selectNextItem({ context, prop }) {
        const [firstItem] = context.get("value");
        const value = prop("collection").getNextValue(firstItem);
        if (value) context.set("value", [value]);
      },
      selectFirstItem({ context, prop }) {
        const value = prop("collection").firstValue;
        if (value) context.set("value", [value]);
      },
      selectLastItem({ context, prop }) {
        const value = prop("collection").lastValue;
        if (value) context.set("value", [value]);
      },
      selectMatchingItem({ context, prop, event, refs }) {
        const value = prop("collection").search(event.key, {
          state: refs.get("typeahead"),
          currentValue: context.get("value")[0]
        });
        if (value == null) return;
        context.set("value", [value]);
      },
      scrollContentToTop({ prop, scope }) {
        if (prop("scrollToIndexFn")) {
          const firstValue = prop("collection").firstValue;
          prop("scrollToIndexFn")?.({
            index: 0,
            immediate: true,
            getElement: () => _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getItemEl(scope, firstValue)
          });
        } else {
          _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getContentEl(scope)?.scrollTo(0, 0);
        }
      },
      invokeOnOpen({ prop, context }) {
        prop("onOpenChange")?.({ open: true, value: context.get("value") });
      },
      invokeOnClose({ prop, context }) {
        prop("onOpenChange")?.({ open: false, value: context.get("value") });
      },
      syncSelectElement({ context, prop, scope }) {
        const selectEl = _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getHiddenSelectEl(scope);
        if (!selectEl) return;
        if (context.get("value").length === 0 && !prop("multiple")) {
          selectEl.selectedIndex = -1;
          return;
        }
        for (const option of selectEl.options) {
          option.selected = context.get("value").includes(option.value);
        }
      },
      syncCollection({ context, prop }) {
        const collection2 = prop("collection");
        const highlightedItem = collection2.find(context.get("highlightedValue"));
        if (highlightedItem) context.set("highlightedItem", highlightedItem);
        const next = (0,_zag_js_collection__WEBPACK_IMPORTED_MODULE_12__.deriveSelectionState)({
          values: context.get("value"),
          collection: collection2,
          selectedItemMap: context.get("selectedItemMap")
        });
        context.set("selectedItemMap", next.nextSelectedItemMap);
      },
      syncSelectedItems({ context, prop }) {
        const next = (0,_zag_js_collection__WEBPACK_IMPORTED_MODULE_12__.deriveSelectionState)({
          values: context.get("value"),
          collection: prop("collection"),
          selectedItemMap: context.get("selectedItemMap")
        });
        context.set("selectedItemMap", next.nextSelectedItemMap);
      },
      syncHighlightedItem({ context, prop }) {
        const collection2 = prop("collection");
        const highlightedValue = context.get("highlightedValue");
        const highlightedItem = highlightedValue ? collection2.find(highlightedValue) : null;
        context.set("highlightedItem", highlightedItem);
      },
      dispatchChangeEvent({ scope }) {
        queueMicrotask(() => {
          const node = _select_dom_mjs__WEBPACK_IMPORTED_MODULE_14__.getHiddenSelectEl(scope);
          if (!node) return;
          const win = scope.getWin();
          const evt = new win.Event("change", { bubbles: true, composed: true });
          node.dispatchEvent((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.markAsInternalChangeEvent)(evt));
        });
      }
    }
  }
});
function restoreFocusFn(event) {
  const v = event.restoreFocus ?? event.previousEvent?.restoreFocus;
  return v == null || !!v;
}
function getReturnFocusOptions(event) {
  const focusVisible = event.focusVisible ?? event.previousEvent?.focusVisible;
  return focusVisible ? { preventScroll: true, focusVisible: true } : { preventScroll: true };
}



/***/ },

/***/ "./node_modules/@zag-js/tabs/dist/tabs.anatomy.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/tabs/dist/tabs.anatomy.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   anatomy: () => (/* binding */ anatomy),
/* harmony export */   parts: () => (/* binding */ parts)
/* harmony export */ });
/* harmony import */ var _zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/anatomy */ "./node_modules/@zag-js/anatomy/dist/create-anatomy.mjs");
// src/tabs.anatomy.ts

var anatomy = (0,_zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__.createAnatomy)("tabs").parts("root", "list", "trigger", "content", "indicator");
var parts = anatomy.build();



/***/ },

/***/ "./node_modules/@zag-js/tabs/dist/tabs.connect.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/tabs/dist/tabs.connect.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connect: () => (/* binding */ connect)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/platform.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/number.mjs");
/* harmony import */ var _tabs_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs.anatomy.mjs */ "./node_modules/@zag-js/tabs/dist/tabs.anatomy.mjs");
/* harmony import */ var _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs.dom.mjs */ "./node_modules/@zag-js/tabs/dist/tabs.dom.mjs");
// src/tabs.connect.ts




function connect(service, normalize) {
  const { state, send, context, prop, scope } = service;
  const translations = prop("translations");
  const focused = state.matches("focused");
  const isVertical = prop("orientation") === "vertical";
  const isHorizontal = prop("orientation") === "horizontal";
  const composite = prop("composite");
  function sendKeyboardEvent(type, key) {
    send({ type, key, src: "keyboard" });
  }
  function getTriggerState(props) {
    return {
      selected: context.get("value") === props.value,
      focused: context.get("focusedValue") === props.value,
      disabled: !!props.disabled
    };
  }
  return {
    value: context.get("value"),
    focusedValue: context.get("focusedValue"),
    setValue(value) {
      send({ type: "SET_VALUE", value });
    },
    clearValue() {
      send({ type: "CLEAR_VALUE" });
    },
    setIndicatorRect(value) {
      const id = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getTriggerId(scope, value);
      send({ type: "SET_INDICATOR_RECT", id });
    },
    syncTabIndex() {
      send({ type: "SYNC_TAB_INDEX" });
    },
    selectNext(fromValue) {
      send({ type: "TAB_FOCUS", value: fromValue, src: "selectNext" });
      send({ type: "ARROW_NEXT", src: "selectNext" });
    },
    selectPrev(fromValue) {
      send({ type: "TAB_FOCUS", value: fromValue, src: "selectPrev" });
      send({ type: "ARROW_PREV", src: "selectPrev" });
    },
    focus() {
      const value = context.get("value");
      if (!value) return;
      _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getTriggerEl(scope, value)?.focus();
    },
    getRootProps() {
      return normalize.element({
        ..._tabs_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.root.attrs,
        id: _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getRootId(scope),
        "data-orientation": prop("orientation"),
        "data-focus": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.dataAttr)(focused),
        dir: prop("dir")
      });
    },
    getListProps() {
      return normalize.element({
        ..._tabs_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.list.attrs,
        id: _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getListId(scope),
        role: "tablist",
        dir: prop("dir"),
        "data-focus": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.dataAttr)(focused),
        "aria-orientation": prop("orientation"),
        "data-orientation": prop("orientation"),
        "aria-label": translations?.listLabel,
        onKeyDown(event) {
          if (event.defaultPrevented) return;
          if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.isComposingEvent)(event)) return;
          if (!(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.contains)(event.currentTarget, (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(event))) return;
          const keyMap = {
            ArrowDown() {
              if (isHorizontal) return;
              sendKeyboardEvent("ARROW_NEXT", "ArrowDown");
            },
            ArrowUp() {
              if (isHorizontal) return;
              sendKeyboardEvent("ARROW_PREV", "ArrowUp");
            },
            ArrowLeft() {
              if (isVertical) return;
              sendKeyboardEvent("ARROW_PREV", "ArrowLeft");
            },
            ArrowRight() {
              if (isVertical) return;
              sendKeyboardEvent("ARROW_NEXT", "ArrowRight");
            },
            Home() {
              sendKeyboardEvent("HOME");
            },
            End() {
              sendKeyboardEvent("END");
            }
          };
          let key = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventKey)(event, {
            dir: prop("dir"),
            orientation: prop("orientation")
          });
          const exec = keyMap[key];
          if (exec) {
            event.preventDefault();
            exec(event);
            return;
          }
        }
      });
    },
    getTriggerState,
    getTriggerProps(props) {
      const { value, disabled } = props;
      const triggerState = getTriggerState(props);
      return normalize.button({
        ..._tabs_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.trigger.attrs,
        role: "tab",
        type: "button",
        disabled,
        dir: prop("dir"),
        "data-orientation": prop("orientation"),
        "data-disabled": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.dataAttr)(disabled),
        "aria-disabled": disabled,
        "data-value": value,
        "aria-selected": triggerState.selected,
        "data-selected": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.dataAttr)(triggerState.selected),
        "data-focus": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.dataAttr)(triggerState.focused),
        "aria-controls": triggerState.selected ? _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getContentId(scope, value) : void 0,
        "data-ownedby": _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getListId(scope),
        "data-ssr": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.dataAttr)(context.get("ssr")),
        id: _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getTriggerId(scope, value),
        tabIndex: triggerState.selected && composite ? 0 : -1,
        onFocus() {
          send({ type: "TAB_FOCUS", value });
        },
        onBlur(event) {
          const target = event.relatedTarget;
          if (target?.getAttribute("role") !== "tab") {
            send({ type: "TAB_BLUR" });
          }
        },
        onClick(event) {
          if (event.defaultPrevented) return;
          if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.isOpeningInNewTab)(event)) return;
          if (disabled) return;
          if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.isSafari)()) {
            event.currentTarget.focus();
          }
          const node = event.currentTarget;
          const shouldNavigate = prop("navigate") != null && (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isAnchorElement)(node);
          if (shouldNavigate) event.preventDefault();
          send({ type: "TAB_CLICK", value });
        }
      });
    },
    getContentProps(props) {
      const { value } = props;
      const selected = context.get("value") === value;
      return normalize.element({
        ..._tabs_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.content.attrs,
        dir: prop("dir"),
        id: _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getContentId(scope, value),
        tabIndex: composite ? 0 : -1,
        "aria-labelledby": _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getTriggerId(scope, value),
        role: "tabpanel",
        "data-ownedby": _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getListId(scope),
        "data-selected": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.dataAttr)(selected),
        "data-orientation": prop("orientation"),
        hidden: !selected
      });
    },
    getIndicatorProps() {
      const rect = context.get("indicatorRect");
      const animateIndicator = context.get("animateIndicator");
      return normalize.element({
        id: _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getIndicatorId(scope),
        ..._tabs_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.indicator.attrs,
        dir: prop("dir"),
        "data-orientation": prop("orientation"),
        hidden: isRectEmpty(rect),
        onTransitionEnd(event) {
          if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getEventTarget)(event) !== event.currentTarget) return;
          send({ type: "INDICATOR_TRANSITION_END" });
        },
        style: {
          "--transition-property": "left, right, top, bottom, width, height",
          "--left": (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.toPx)(rect?.x),
          "--top": (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.toPx)(rect?.y),
          "--width": (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.toPx)(rect?.width),
          "--height": (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.toPx)(rect?.height),
          position: "absolute",
          willChange: animateIndicator ? "var(--transition-property)" : "auto",
          transitionProperty: animateIndicator ? "var(--transition-property)" : "none",
          transitionDuration: animateIndicator ? "var(--transition-duration, 150ms)" : "0ms",
          transitionTimingFunction: "var(--transition-timing-function)",
          [isHorizontal ? "left" : "top"]: isHorizontal ? "var(--left)" : "var(--top)"
        }
      });
    }
  };
}
var isRectEmpty = (rect) => rect == null || rect.width === 0 && rect.height === 0 && rect.x === 0 && rect.y === 0;



/***/ },

/***/ "./node_modules/@zag-js/tabs/dist/tabs.dom.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/@zag-js/tabs/dist/tabs.dom.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getContentEl: () => (/* binding */ getContentEl),
/* harmony export */   getContentId: () => (/* binding */ getContentId),
/* harmony export */   getElements: () => (/* binding */ getElements),
/* harmony export */   getFirstTriggerEl: () => (/* binding */ getFirstTriggerEl),
/* harmony export */   getIndicatorEl: () => (/* binding */ getIndicatorEl),
/* harmony export */   getIndicatorId: () => (/* binding */ getIndicatorId),
/* harmony export */   getLastTriggerEl: () => (/* binding */ getLastTriggerEl),
/* harmony export */   getListEl: () => (/* binding */ getListEl),
/* harmony export */   getListId: () => (/* binding */ getListId),
/* harmony export */   getNextTriggerEl: () => (/* binding */ getNextTriggerEl),
/* harmony export */   getOffsetRect: () => (/* binding */ getOffsetRect),
/* harmony export */   getPrevTriggerEl: () => (/* binding */ getPrevTriggerEl),
/* harmony export */   getRectByValue: () => (/* binding */ getRectByValue),
/* harmony export */   getRootId: () => (/* binding */ getRootId),
/* harmony export */   getTriggerEl: () => (/* binding */ getTriggerEl),
/* harmony export */   getTriggerId: () => (/* binding */ getTriggerId)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/query.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/array.mjs");
// src/tabs.dom.ts


var getRootId = (ctx) => ctx.ids?.root ?? `tabs:${ctx.id}`;
var getListId = (ctx) => ctx.ids?.list ?? `tabs:${ctx.id}:list`;
var getContentId = (ctx, value) => ctx.ids?.content?.(value) ?? `tabs:${ctx.id}:content-${value}`;
var getTriggerId = (ctx, value) => ctx.ids?.trigger?.(value) ?? `tabs:${ctx.id}:trigger-${value}`;
var getIndicatorId = (ctx) => ctx.ids?.indicator ?? `tabs:${ctx.id}:indicator`;
var getListEl = (ctx) => ctx.getById(getListId(ctx));
var getContentEl = (ctx, value) => ctx.getById(getContentId(ctx, value));
var getTriggerEl = (ctx, value) => value != null ? ctx.getById(getTriggerId(ctx, value)) : null;
var getIndicatorEl = (ctx) => ctx.getById(getIndicatorId(ctx));
var getElements = (ctx) => {
  const selector = `[role=tab]${(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getByOwnerId)(getListId(ctx))}:not([disabled])`;
  return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.queryAll)(getListEl(ctx), selector);
};
var getFirstTriggerEl = (ctx) => (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.first)(getElements(ctx));
var getLastTriggerEl = (ctx) => (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.last)(getElements(ctx));
var getNextTriggerEl = (ctx, opts) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.nextById)(getElements(ctx), getTriggerId(ctx, opts.value), opts.loopFocus);
var getPrevTriggerEl = (ctx, opts) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.prevById)(getElements(ctx), getTriggerId(ctx, opts.value), opts.loopFocus);
var getOffsetRect = (el) => ({
  x: el?.offsetLeft ?? 0,
  y: el?.offsetTop ?? 0,
  width: el?.offsetWidth ?? 0,
  height: el?.offsetHeight ?? 0
});
var getRectByValue = (ctx, value) => {
  const tab = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.itemById)(getElements(ctx), getTriggerId(ctx, value));
  return getOffsetRect(tab);
};



/***/ },

/***/ "./node_modules/@zag-js/tabs/dist/tabs.machine.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/tabs/dist/tabs.machine.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   machine: () => (/* binding */ machine)
/* harmony export */ });
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/create-machine.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/resize-observer.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/tabbable.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/equal.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
/* harmony import */ var _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tabs.dom.mjs */ "./node_modules/@zag-js/tabs/dist/tabs.dom.mjs");
// src/tabs.machine.ts




var { createMachine } = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.setup)();
var machine = createMachine({
  props({ props }) {
    return {
      dir: "ltr",
      orientation: "horizontal",
      activationMode: "automatic",
      loopFocus: true,
      composite: true,
      defaultValue: null,
      ...props
    };
  },
  initialState() {
    return "idle";
  },
  context({ prop, bindable }) {
    return {
      value: bindable(() => ({
        defaultValue: prop("defaultValue"),
        value: prop("value"),
        onChange(value) {
          prop("onValueChange")?.({ value });
        }
      })),
      focusedValue: bindable(() => ({
        defaultValue: prop("value") || prop("defaultValue"),
        sync: true,
        onChange(value) {
          prop("onFocusChange")?.({ focusedValue: value });
        }
      })),
      ssr: bindable(() => ({ defaultValue: true })),
      indicatorRect: bindable(() => ({
        defaultValue: null
      })),
      animateIndicator: bindable(() => ({
        defaultValue: false
      }))
    };
  },
  refs() {
    return {
      indicatorCleanup: null,
      prevValue: null,
      focusFrame: _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.AnimationFrame.create()
    };
  },
  watch({ context, prop, track, action }) {
    track([() => context.get("value")], () => {
      action(["syncIndicatorAnimation", "syncIndicatorRect", "syncTabIndex"]);
    });
    track([() => prop("dir"), () => prop("orientation")], () => {
      action(["syncIndicatorRect"]);
    });
  },
  on: {
    SET_VALUE: {
      actions: ["setValue"]
    },
    CLEAR_VALUE: {
      actions: ["clearValue"]
    },
    SET_INDICATOR_RECT: {
      actions: ["setIndicatorRect"]
    },
    SYNC_TAB_INDEX: {
      actions: ["syncTabIndex"]
    },
    INDICATOR_TRANSITION_END: {
      actions: ["clearIndicatorAnimation"]
    }
  },
  entry: ["syncPrevValue", "syncIndicatorRect", "syncTabIndex", "syncSsr"],
  exit: ["cleanupObserver", "cancelFocusFrame"],
  states: {
    idle: {
      on: {
        TAB_FOCUS: {
          target: "focused",
          actions: ["setFocusedValue"]
        },
        TAB_CLICK: {
          target: "focused",
          actions: ["setFocusedValue", "setValue", "requestNavigation"]
        }
      }
    },
    focused: {
      exit: ["cancelFocusFrame"],
      on: {
        TAB_CLICK: {
          actions: ["setFocusedValue", "setValue", "requestNavigation"]
        },
        ARROW_PREV: [
          {
            guard: "selectOnFocus",
            actions: ["focusPrevTab", "selectFocusedTab"]
          },
          {
            actions: ["focusPrevTab"]
          }
        ],
        ARROW_NEXT: [
          {
            guard: "selectOnFocus",
            actions: ["focusNextTab", "selectFocusedTab"]
          },
          {
            actions: ["focusNextTab"]
          }
        ],
        HOME: [
          {
            guard: "selectOnFocus",
            actions: ["focusFirstTab", "selectFocusedTab"]
          },
          {
            actions: ["focusFirstTab"]
          }
        ],
        END: [
          {
            guard: "selectOnFocus",
            actions: ["focusLastTab", "selectFocusedTab"]
          },
          {
            actions: ["focusLastTab"]
          }
        ],
        TAB_FOCUS: {
          actions: ["setFocusedValue"]
        },
        TAB_BLUR: {
          target: "idle",
          actions: ["clearFocusedValue"]
        }
      }
    }
  },
  implementations: {
    guards: {
      selectOnFocus: ({ prop }) => prop("activationMode") === "automatic"
    },
    actions: {
      selectFocusedTab({ context, prop, event, scope }) {
        (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.raf)(() => {
          const focusedValue = context.get("focusedValue");
          if (!focusedValue) return;
          const nullable = prop("deselectable") && context.get("value") === focusedValue;
          const value = nullable ? null : focusedValue;
          if (context.get("value") === value) return;
          if (event.src === "keyboard") {
            const triggerEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getTriggerEl(scope, focusedValue);
            if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isAnchorElement)(triggerEl) && prop("navigate") !== null) {
              triggerEl.click();
              return;
            }
          }
          context.set("value", value);
        });
      },
      setFocusedValue({ context, event, flush }) {
        if (event.value == null) return;
        flush(() => {
          context.set("focusedValue", event.value);
        });
      },
      clearFocusedValue({ context }) {
        context.set("focusedValue", null);
      },
      setValue({ context, event, prop }) {
        const nullable = prop("deselectable") && context.get("value") === context.get("focusedValue");
        context.set("value", nullable ? null : event.value);
      },
      clearValue({ context }) {
        context.set("value", null);
      },
      focusFirstTab({ scope, refs }) {
        refs.get("focusFrame").request(() => {
          _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getFirstTriggerEl(scope)?.focus();
        });
      },
      focusLastTab({ scope, refs }) {
        refs.get("focusFrame").request(() => {
          _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getLastTriggerEl(scope)?.focus();
        });
      },
      focusNextTab({ context, prop, scope, event, refs }) {
        const focusedValue = event.value ?? context.get("focusedValue");
        if (!focusedValue) return;
        const triggerEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getNextTriggerEl(scope, {
          value: focusedValue,
          loopFocus: prop("loopFocus")
        });
        refs.get("focusFrame").request(() => {
          if (prop("composite")) {
            triggerEl?.focus();
          } else if (triggerEl?.dataset.value != null) {
            context.set("focusedValue", triggerEl.dataset.value);
          }
        });
      },
      focusPrevTab({ context, prop, scope, event, refs }) {
        const focusedValue = event.value ?? context.get("focusedValue");
        if (!focusedValue) return;
        const triggerEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getPrevTriggerEl(scope, {
          value: focusedValue,
          loopFocus: prop("loopFocus")
        });
        refs.get("focusFrame").request(() => {
          if (prop("composite")) {
            triggerEl?.focus();
          } else if (triggerEl?.dataset.value != null) {
            context.set("focusedValue", triggerEl.dataset.value);
          }
        });
      },
      syncTabIndex({ context, scope }) {
        (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.raf)(() => {
          const value = context.get("value");
          if (!value) return;
          const contentEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getContentEl(scope, value);
          if (!contentEl) return;
          const focusables = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.getFocusables)(contentEl);
          if (focusables.length > 0) {
            contentEl.removeAttribute("tabindex");
          } else {
            contentEl.setAttribute("tabindex", "0");
          }
        });
      },
      cancelFocusFrame({ refs }) {
        refs.get("focusFrame").cancel();
      },
      cleanupObserver({ refs }) {
        const cleanup = refs.get("indicatorCleanup");
        if (cleanup) cleanup();
      },
      setIndicatorRect({ context, event, scope }) {
        const value = event.id ?? context.get("value");
        const indicatorEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getIndicatorEl(scope);
        if (!indicatorEl) return;
        if (!value) return;
        const triggerEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getTriggerEl(scope, value);
        if (!triggerEl) return;
        context.set("indicatorRect", _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getRectByValue(scope, value));
      },
      syncSsr({ context }) {
        context.set("ssr", false);
      },
      syncPrevValue({ context, refs }) {
        refs.set("prevValue", context.get("value"));
      },
      syncIndicatorAnimation({ context, refs }) {
        const prevValue = refs.get("prevValue");
        const nextValue = context.get("value");
        const animate = prevValue != null && nextValue != null && prevValue !== nextValue;
        context.set("animateIndicator", animate);
        refs.set("prevValue", nextValue);
      },
      clearIndicatorAnimation({ context }) {
        context.set("animateIndicator", false);
      },
      syncIndicatorRect({ context, refs, scope }) {
        const cleanup = refs.get("indicatorCleanup");
        if (cleanup) cleanup();
        const indicatorEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getIndicatorEl(scope);
        if (!indicatorEl) return;
        const exec = () => {
          const triggerEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getTriggerEl(scope, context.get("value"));
          if (!triggerEl) return;
          const rect = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getOffsetRect(triggerEl);
          context.set("indicatorRect", (prev) => (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_5__.isEqual)(prev, rect) ? prev : rect);
        };
        exec();
        const triggerEls = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getElements(scope);
        const listEl = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getListEl(scope);
        const indicatorCleanup = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_6__.callAll)(
          ...triggerEls.map((el) => _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.resizeObserverBorderBox.observe(el, exec)),
          ...listEl ? [_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.resizeObserverBorderBox.observe(listEl, exec)] : []
        );
        refs.set("indicatorCleanup", indicatorCleanup);
      },
      requestNavigation({ event, prop, scope }) {
        const navigate = prop("navigate");
        if (!navigate || event.value == null) return;
        const node = _tabs_dom_mjs__WEBPACK_IMPORTED_MODULE_7__.getTriggerEl(scope, event.value);
        if (!(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isAnchorElement)(node)) return;
        navigate({ value: event.value, node, href: node.href });
      }
    }
  }
});



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/index.mjs"
/*!***************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/index.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   anatomy: () => (/* reexport safe */ _toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_2__.anatomy),
/* harmony export */   connect: () => (/* reexport safe */ _toast_connect_mjs__WEBPACK_IMPORTED_MODULE_3__.connect),
/* harmony export */   createStore: () => (/* reexport safe */ _toast_store_mjs__WEBPACK_IMPORTED_MODULE_5__.createToastStore),
/* harmony export */   group: () => (/* binding */ group),
/* harmony export */   machine: () => (/* reexport safe */ _toast_machine_mjs__WEBPACK_IMPORTED_MODULE_4__.machine)
/* harmony export */ });
/* harmony import */ var _toast_group_connect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toast-group.connect.mjs */ "./node_modules/@zag-js/toast/dist/toast-group.connect.mjs");
/* harmony import */ var _toast_group_machine_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toast-group.machine.mjs */ "./node_modules/@zag-js/toast/dist/toast-group.machine.mjs");
/* harmony import */ var _toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toast.anatomy.mjs */ "./node_modules/@zag-js/toast/dist/toast.anatomy.mjs");
/* harmony import */ var _toast_connect_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toast.connect.mjs */ "./node_modules/@zag-js/toast/dist/toast.connect.mjs");
/* harmony import */ var _toast_machine_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toast.machine.mjs */ "./node_modules/@zag-js/toast/dist/toast.machine.mjs");
/* harmony import */ var _toast_store_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toast.store.mjs */ "./node_modules/@zag-js/toast/dist/toast.store.mjs");
// src/index.ts






var group = {
  connect: _toast_group_connect_mjs__WEBPACK_IMPORTED_MODULE_0__.groupConnect,
  machine: _toast_group_machine_mjs__WEBPACK_IMPORTED_MODULE_1__.groupMachine
};



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/toast-group.connect.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/toast-group.connect.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   groupConnect: () => (/* binding */ groupConnect)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toast.anatomy.mjs */ "./node_modules/@zag-js/toast/dist/toast.anatomy.mjs");
/* harmony import */ var _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toast.dom.mjs */ "./node_modules/@zag-js/toast/dist/toast.dom.mjs");
/* harmony import */ var _toast_utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toast.utils.mjs */ "./node_modules/@zag-js/toast/dist/toast.utils.mjs");
// src/toast-group.connect.ts




function groupConnect(service, normalize) {
  const { context, prop, send, refs, computed } = service;
  return {
    getCount() {
      return context.get("toasts").length;
    },
    getToasts() {
      return context.get("toasts");
    },
    getGroupProps(options = {}) {
      const { label = "Notifications" } = options;
      const { hotkey } = prop("store").attrs;
      const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
      const placement = computed("placement");
      const [side, align = "center"] = placement.split("-");
      return normalize.element({
        ..._toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_1__.parts.group.attrs,
        dir: prop("dir"),
        tabIndex: -1,
        role: "region",
        "aria-label": `${label}, ${placement} (${hotkeyLabel})`,
        id: _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_2__.getRegionId(placement),
        "data-placement": placement,
        "data-side": side,
        "data-align": align,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        style: (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getGroupPlacementStyle)(service, placement),
        onMouseEnter() {
          if (refs.get("ignoreMouseTimer").isActive()) return;
          send({ type: "REGION.POINTER_ENTER", placement });
        },
        onMouseMove() {
          if (refs.get("ignoreMouseTimer").isActive()) return;
          send({ type: "REGION.POINTER_ENTER", placement });
        },
        onMouseLeave() {
          if (refs.get("ignoreMouseTimer").isActive()) return;
          send({ type: "REGION.POINTER_LEAVE", placement });
        },
        onFocus(event) {
          send({ type: "REGION.FOCUS", target: event.relatedTarget });
        },
        onBlur(event) {
          if (refs.get("isFocusWithin") && !(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.contains)(event.currentTarget, event.relatedTarget)) {
            queueMicrotask(() => send({ type: "REGION.BLUR" }));
          }
        }
      });
    },
    subscribe(fn) {
      const store = prop("store");
      return store.subscribe(() => fn(context.get("toasts")));
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/toast-group.machine.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/toast-group.machine.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   groupMachine: () => (/* binding */ groupMachine)
/* harmony export */ });
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/create-machine.mjs");
/* harmony import */ var _zag_js_dismissable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dismissable */ "./node_modules/@zag-js/dismissable/dist/dismissable-layer.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
/* harmony import */ var _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toast.dom.mjs */ "./node_modules/@zag-js/toast/dist/toast.dom.mjs");
// src/toast-group.machine.ts





var { guards, createMachine } = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.setup)();
var { and } = guards;
var groupMachine = createMachine({
  props({ props }) {
    return {
      dir: "ltr",
      id: (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_5__.uuid)(),
      ...props,
      store: props.store
    };
  },
  initialState({ prop }) {
    return prop("store").attrs.overlap ? "overlap" : "stack";
  },
  refs() {
    return {
      lastFocusedEl: null,
      isFocusWithin: false,
      isPointerWithin: false,
      ignoreMouseTimer: _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_4__.AnimationFrame.create(),
      dismissableCleanup: void 0
    };
  },
  context({ bindable }) {
    return {
      toasts: bindable(() => ({
        defaultValue: [],
        sync: true,
        hash: (toasts) => toasts.map((t) => t.id).join(",")
      })),
      heights: bindable(() => ({
        defaultValue: [],
        sync: true
      }))
    };
  },
  computed: {
    count: ({ context }) => context.get("toasts").length,
    overlap: ({ prop }) => prop("store").attrs.overlap,
    placement: ({ prop }) => prop("store").attrs.placement
  },
  effects: ["subscribeToStore", "subscribeToLayout", "trackDocumentVisibility", "trackHotKeyPress"],
  watch({ track, context, action }) {
    track([() => context.hash("toasts")], () => {
      queueMicrotask(() => {
        action(["collapsedIfEmpty", "setDismissableBranch", "resetInteractionIfEmpty"]);
      });
    });
  },
  exit: ["clearDismissableBranch", "clearLastFocusedEl", "clearMouseEventTimer"],
  on: {
    PAUSE_ALL: {
      actions: ["pauseToasts"]
    },
    RESUME_ALL: {
      actions: ["resumeToasts"]
    },
    "DOC.HOTKEY": {
      actions: ["focusRegionEl"]
    },
    "REGION.BLUR": [
      {
        guard: and("isOverlapping", "isPointerOut"),
        target: "overlap",
        actions: ["resumeToasts", "restoreFocusIfPointerOut"]
      },
      {
        guard: "isPointerOut",
        target: "stack",
        actions: ["resumeToasts", "restoreFocusIfPointerOut"]
      },
      {
        actions: ["clearFocusWithin"]
      }
    ],
    "TOAST.DISMISS": {
      actions: ["moveFocusOnDismiss"]
    },
    "TOAST.REMOVE": {
      actions: ["removeToast", "removeHeight", "ignoreMouseEventsTemporarily"]
    },
    "TOAST.PAUSE": {
      actions: ["pauseToasts"]
    }
  },
  states: {
    stack: {
      on: {
        "REGION.POINTER_LEAVE": [
          {
            guard: "isOverlapping",
            target: "overlap",
            actions: ["clearPointerWithin", "resumeToasts"]
          },
          {
            actions: ["clearPointerWithin", "resumeToasts"]
          }
        ],
        "REGION.OVERLAP": {
          target: "overlap"
        },
        "REGION.FOCUS": {
          actions: ["setLastFocusedEl", "pauseToasts"]
        },
        "REGION.POINTER_ENTER": {
          actions: ["setPointerWithin", "pauseToasts"]
        }
      }
    },
    overlap: {
      on: {
        "REGION.STACK": {
          target: "stack"
        },
        "REGION.POINTER_ENTER": {
          target: "stack",
          actions: ["setPointerWithin", "pauseToasts"]
        },
        "REGION.POINTER_LEAVE": {
          actions: ["clearPointerWithin", "resumeToasts"]
        },
        "REGION.FOCUS": {
          target: "stack",
          actions: ["setLastFocusedEl", "pauseToasts"]
        }
      }
    }
  },
  implementations: {
    guards: {
      isOverlapping: ({ computed }) => computed("overlap"),
      isPointerOut: ({ refs }) => !refs.get("isPointerWithin")
    },
    effects: {
      subscribeToStore({ context, prop }) {
        const store = prop("store");
        context.set("toasts", store.getVisibleToasts());
        return store.subscribe((toast) => {
          if (toast.dismiss) {
            context.set("toasts", (prev) => prev.filter((t) => t.id !== toast.id));
            return;
          }
          context.set("toasts", (prev) => {
            const index = prev.findIndex((t) => t.id === toast.id);
            if (index !== -1) {
              return [...prev.slice(0, index), { ...prev[index], ...toast }, ...prev.slice(index + 1)];
            }
            return [toast, ...prev];
          });
        });
      },
      subscribeToLayout({ prop, send }) {
        return prop("store").subscribeLayout((stacked) => {
          send({ type: stacked ? "REGION.STACK" : "REGION.OVERLAP" });
        });
      },
      trackHotKeyPress({ prop, send }) {
        const handleKeyDown = (event) => {
          const { hotkey } = prop("store").attrs;
          const isHotkeyPressed = hotkey.every((key) => event[key] || event.code === key);
          if (!isHotkeyPressed) return;
          send({ type: "DOC.HOTKEY" });
        };
        return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.addDomEvent)(document, "keydown", handleKeyDown, { capture: true });
      },
      trackDocumentVisibility({ prop, send, scope }) {
        const { pauseOnPageIdle } = prop("store").attrs;
        if (!pauseOnPageIdle) return;
        const doc = scope.getDoc();
        if (doc.visibilityState === "hidden") send({ type: "PAUSE_ALL" });
        return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.addDomEvent)(doc, "visibilitychange", () => {
          const isHidden = doc.visibilityState === "hidden";
          send({ type: isHidden ? "PAUSE_ALL" : "RESUME_ALL" });
        });
      }
    },
    actions: {
      setDismissableBranch({ refs, context, computed, scope }) {
        const toasts = context.get("toasts");
        const placement = computed("placement");
        const hasToasts = toasts.length > 0;
        if (!hasToasts) {
          refs.get("dismissableCleanup")?.();
          refs.set("dismissableCleanup", void 0);
          return;
        }
        if (hasToasts && refs.get("dismissableCleanup")) {
          return;
        }
        const groupEl = () => _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getRegionEl(scope, placement);
        const cleanup = (0,_zag_js_dismissable__WEBPACK_IMPORTED_MODULE_1__.trackDismissableBranch)(groupEl, { defer: true, getRootNode: scope.getRootNode });
        refs.set("dismissableCleanup", cleanup);
      },
      clearDismissableBranch({ refs }) {
        refs.get("dismissableCleanup")?.();
        refs.set("dismissableCleanup", void 0);
      },
      focusRegionEl({ scope, computed }) {
        queueMicrotask(() => {
          _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getRegionEl(scope, computed("placement"))?.focus();
        });
      },
      pauseToasts({ prop }) {
        prop("store").pause();
      },
      resumeToasts({ prop, refs, scope, event }) {
        if (event.type === "REGION.BLUR") refs.set("isFocusWithin", false);
        const idle = prop("store").attrs.pauseOnPageIdle && scope.getDoc().visibilityState === "hidden";
        if (idle || refs.get("isPointerWithin") || refs.get("isFocusWithin")) return;
        prop("store").resume();
      },
      removeToast({ prop, event }) {
        prop("store").remove(event.id);
      },
      removeHeight({ event, context }) {
        if (event?.id == null) return;
        queueMicrotask(() => {
          context.set("heights", (heights) => heights.filter((height) => height.id !== event.id));
        });
      },
      collapsedIfEmpty({ send, computed }) {
        if (!computed("overlap") || computed("count") > 1) return;
        send({ type: "REGION.OVERLAP" });
      },
      setLastFocusedEl({ refs, event }) {
        if (refs.get("isFocusWithin")) return;
        refs.set("isFocusWithin", true);
        refs.set("lastFocusedEl", event.target ?? null);
      },
      moveFocusOnDismiss({ refs, scope, computed, event }) {
        if (event.focusVisible) {
          const toastEls = _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getToastEls(scope, computed("placement"));
          const index = toastEls.findIndex((el) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.contains)(el, scope.getActiveElement()));
          const nextEl = findOpenToast(toastEls, index + 1, 1) ?? findOpenToast(toastEls, index - 1, -1);
          if (nextEl) {
            nextEl.focus({ preventScroll: true });
            return;
          }
        }
        const lastFocusedEl = refs.get("lastFocusedEl");
        if (event.focusVisible && lastFocusedEl) {
          lastFocusedEl.focus({ preventScroll: true });
        } else {
          scope.getActiveElement()?.blur();
        }
      },
      resetInteractionIfEmpty({ refs, prop, scope, computed }) {
        if (computed("count") > 0) return;
        refs.set("isFocusWithin", false);
        refs.set("isPointerWithin", false);
        refs.set("lastFocusedEl", null);
        const idle = prop("store").attrs.pauseOnPageIdle && scope.getDoc().visibilityState === "hidden";
        if (!idle) prop("store").resume();
      },
      restoreFocusIfPointerOut({ refs }) {
        if (!refs.get("lastFocusedEl") || refs.get("isPointerWithin")) return;
        refs.get("lastFocusedEl")?.focus({ preventScroll: true });
        refs.set("lastFocusedEl", null);
        refs.set("isFocusWithin", false);
      },
      setPointerWithin({ refs }) {
        refs.set("isPointerWithin", true);
      },
      clearPointerWithin({ refs }) {
        refs.set("isPointerWithin", false);
        if (refs.get("lastFocusedEl") && !refs.get("isFocusWithin")) {
          refs.get("lastFocusedEl")?.focus({ preventScroll: true });
          refs.set("lastFocusedEl", null);
        }
      },
      clearFocusWithin({ refs }) {
        refs.set("isFocusWithin", false);
      },
      clearLastFocusedEl({ refs }) {
        if (!refs.get("lastFocusedEl")) return;
        refs.get("lastFocusedEl")?.focus({ preventScroll: true });
        refs.set("lastFocusedEl", null);
        refs.set("isFocusWithin", false);
      },
      ignoreMouseEventsTemporarily({ refs, scope, computed, send }) {
        refs.get("ignoreMouseTimer").request(() => {
          return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.addDomEvent)(
            scope.getDoc(),
            "pointermove",
            (event) => {
              if (!refs.get("isPointerWithin")) return;
              const regionEl = _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getRegionEl(scope, computed("placement"));
              if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.contains)(regionEl, (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.getEventTarget)(event))) return;
              send({ type: "REGION.POINTER_LEAVE", placement: computed("placement") });
            },
            { once: true }
          );
        });
      },
      clearMouseEventTimer({ refs }) {
        refs.get("ignoreMouseTimer").cancel();
      }
    }
  }
});
function findOpenToast(toastEls, from, step) {
  for (let i = from; i >= 0 && i < toastEls.length; i += step) {
    if (toastEls[i].dataset.state === "open") return toastEls[i];
  }
  return null;
}



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/toast.anatomy.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/toast.anatomy.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   anatomy: () => (/* binding */ anatomy),
/* harmony export */   parts: () => (/* binding */ parts)
/* harmony export */ });
/* harmony import */ var _zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/anatomy */ "./node_modules/@zag-js/anatomy/dist/create-anatomy.mjs");
// src/toast.anatomy.ts

var anatomy = (0,_zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__.createAnatomy)("toast").parts(
  "group",
  "root",
  "title",
  "description",
  "actionTrigger",
  "closeTrigger"
);
var parts = anatomy.build();



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/toast.connect.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/toast.connect.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connect: () => (/* binding */ connect)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/object.mjs");
/* harmony import */ var _toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toast.anatomy.mjs */ "./node_modules/@zag-js/toast/dist/toast.anatomy.mjs");
/* harmony import */ var _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toast.dom.mjs */ "./node_modules/@zag-js/toast/dist/toast.dom.mjs");
/* harmony import */ var _toast_utils_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toast.utils.mjs */ "./node_modules/@zag-js/toast/dist/toast.utils.mjs");
// src/toast.connect.ts





var defaultTranslations = {
  closeTriggerLabel: "Dismiss notification"
};
function connect(service, normalize) {
  const { state, send, prop, scope, context, computed } = service;
  const translations = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_1__.mergeWithDefault)(defaultTranslations, prop("translations"));
  const visible = state.hasTag("visible");
  const paused = state.hasTag("paused");
  const mounted = context.get("mounted");
  const rendered = context.get("rendered");
  const frontmost = computed("frontmost");
  const placement = prop("parent").computed("placement");
  const type = prop("type");
  const stacked = prop("parent").state.matches("stack");
  const title = prop("title");
  const description = prop("description");
  const action = prop("action");
  const [side, align = "center"] = placement.split("-");
  return {
    type,
    title,
    description,
    placement,
    visible,
    paused,
    closable: !!prop("closable"),
    pause() {
      prop("parent").prop("store").pause(prop("id"));
    },
    resume() {
      prop("parent").prop("store").resume(prop("id"));
    },
    dismiss() {
      send({ type: "DISMISS", src: "programmatic" });
    },
    getRootProps() {
      return normalize.element({
        ..._toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_2__.parts.root.attrs,
        dir: prop("dir"),
        id: _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.getRootId(scope),
        "data-state": visible ? "open" : "closed",
        "data-type": type,
        "data-placement": placement,
        "data-align": align,
        "data-side": side,
        "data-mounted": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(mounted),
        "data-paused": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(paused),
        "data-first": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(frontmost),
        "data-sibling": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(!frontmost),
        "data-stack": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(stacked),
        "data-overlap": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.dataAttr)(!stacked),
        role: "status",
        "aria-atomic": "true",
        "aria-describedby": description && rendered.description ? _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.getDescriptionId(scope) : void 0,
        "aria-labelledby": title && rendered.title ? _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.getTitleId(scope) : void 0,
        tabIndex: 0,
        style: (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.getPlacementStyle)(service, visible),
        onKeyDown(event) {
          if (event.defaultPrevented) return;
          if (event.key == "Escape") {
            send({ type: "DISMISS", src: "keyboard" });
            event.preventDefault();
          }
        }
      });
    },
    /* Leave a ghost div to avoid setting hover to false when transitioning out */
    getGhostBeforeProps() {
      return normalize.element({
        "data-ghost": "before",
        style: (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.getGhostBeforeStyle)(service, visible)
      });
    },
    /* Needed to avoid setting hover to false when in between toasts */
    getGhostAfterProps() {
      return normalize.element({
        "data-ghost": "after",
        style: (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.getGhostAfterStyle)()
      });
    },
    getTitleProps() {
      return normalize.element({
        ..._toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_2__.parts.title.attrs,
        id: _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.getTitleId(scope)
      });
    },
    getDescriptionProps() {
      return normalize.element({
        ..._toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_2__.parts.description.attrs,
        id: _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.getDescriptionId(scope)
      });
    },
    getActionTriggerProps() {
      return normalize.button({
        ..._toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_2__.parts.actionTrigger.attrs,
        type: "button",
        onClick(event) {
          if (event.defaultPrevented) return;
          action?.onClick?.();
          send({ type: "DISMISS", src: "user" });
        }
      });
    },
    getCloseTriggerProps() {
      return normalize.button({
        id: _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.getCloseTriggerId(scope),
        ..._toast_anatomy_mjs__WEBPACK_IMPORTED_MODULE_2__.parts.closeTrigger.attrs,
        type: "button",
        "aria-label": translations?.closeTriggerLabel,
        onClick(event) {
          if (event.defaultPrevented) return;
          send({ type: "DISMISS", src: "user" });
        }
      });
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/toast.dom.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/toast.dom.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCloseTriggerId: () => (/* binding */ getCloseTriggerId),
/* harmony export */   getDescriptionEl: () => (/* binding */ getDescriptionEl),
/* harmony export */   getDescriptionId: () => (/* binding */ getDescriptionId),
/* harmony export */   getRegionEl: () => (/* binding */ getRegionEl),
/* harmony export */   getRegionId: () => (/* binding */ getRegionId),
/* harmony export */   getRootEl: () => (/* binding */ getRootEl),
/* harmony export */   getRootId: () => (/* binding */ getRootId),
/* harmony export */   getTitleEl: () => (/* binding */ getTitleEl),
/* harmony export */   getTitleId: () => (/* binding */ getTitleId),
/* harmony export */   getToastEls: () => (/* binding */ getToastEls),
/* harmony export */   observeContent: () => (/* binding */ observeContent)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/query.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/resize-observer.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
// src/toast.dom.ts


var getRegionId = (placement) => `toast-group:${placement}`;
var getRegionEl = (ctx, placement) => ctx.getById(`toast-group:${placement}`);
var getToastEls = (ctx, placement) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.queryAll)(getRegionEl(ctx, placement), "[data-scope=toast][data-part=root]");
var getRootId = (ctx) => `toast:${ctx.id}`;
var getRootEl = (ctx) => ctx.getById(getRootId(ctx));
var getTitleId = (ctx) => `toast:${ctx.id}:title`;
var getDescriptionId = (ctx) => `toast:${ctx.id}:description`;
var getTitleEl = (ctx) => ctx.getById(getTitleId(ctx));
var getDescriptionEl = (ctx) => ctx.getById(getDescriptionId(ctx));
var getCloseTriggerId = (ctx) => `toast${ctx.id}:close`;
function observeContent(rootEl, options) {
  const { filter = () => true, onChange, onMutate } = options;
  const win = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.getWindow)(rootEl);
  const frame = _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.AnimationFrame.create();
  const notify = () => frame.request(onChange);
  let stopObservingChildren;
  const observeChildren = () => {
    stopObservingChildren?.();
    const children = Array.from(rootEl.children).filter(filter);
    stopObservingChildren = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.callAll)(...children.map((child) => _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_3__.resizeObserverBorderBox.observe(child, notify)));
  };
  observeChildren();
  const mutationObserver = new win.MutationObserver(() => {
    frame.cancel();
    onChange();
    onMutate?.();
    observeChildren();
  });
  mutationObserver.observe(rootEl, { childList: true, subtree: true, characterData: true });
  return () => {
    mutationObserver.disconnect();
    stopObservingChildren?.();
    frame.cancel();
  };
}



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/toast.machine.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/toast.machine.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   machine: () => (/* binding */ machine)
/* harmony export */ });
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/create-machine.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/node.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/raf.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/timers.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/warning.mjs");
/* harmony import */ var _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toast.dom.mjs */ "./node_modules/@zag-js/toast/dist/toast.dom.mjs");
/* harmony import */ var _toast_utils_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toast.utils.mjs */ "./node_modules/@zag-js/toast/dist/toast.utils.mjs");
// src/toast.machine.ts





var { not, and } = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createGuards)();
var machine = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createMachine)({
  props({ props }) {
    (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_4__.ensureProps)(props, ["id", "type", "parent", "removeDelay"], "toast");
    return {
      closable: true,
      ...props,
      duration: (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_6__.getToastDuration)(props.duration, props.type)
    };
  },
  initialState({ prop }) {
    if (prop("message") === "DISMISS") return "dismissing";
    const persist = prop("type") === "loading" || prop("duration") === Infinity || prop("paused");
    return persist ? "visible:persist" : "visible";
  },
  context({ prop, bindable }) {
    return {
      remainingTime: bindable(() => ({
        defaultValue: (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_6__.getToastDuration)(prop("duration"), prop("type"))
      })),
      createdAt: bindable(() => ({
        defaultValue: Date.now()
      })),
      mounted: bindable(() => ({
        defaultValue: false
      })),
      initialHeight: bindable(() => ({
        defaultValue: 0
      })),
      rendered: bindable(() => ({
        defaultValue: { title: true, description: true }
      }))
    };
  },
  refs() {
    return {
      closeTimerStartTime: Date.now(),
      lastCloseStartTimerStartTime: 0
    };
  },
  computed: {
    zIndex: ({ prop }) => {
      const toasts = prop("parent").context.get("toasts");
      const index = toasts.findIndex((toast) => toast.id === prop("id"));
      return toasts.length - index;
    },
    height: ({ prop }) => {
      const heights = prop("parent").context.get("heights");
      const height = heights.find((height2) => height2.id === prop("id"));
      return height?.height ?? 0;
    },
    heightIndex: ({ prop }) => {
      const heights = prop("parent").context.get("heights");
      return heights.findIndex((height) => height.id === prop("id"));
    },
    frontmost: ({ prop }) => prop("index") === 0,
    heightBefore: ({ prop }) => {
      const heights = prop("parent").context.get("heights");
      const heightIndex = heights.findIndex((height) => height.id === prop("id"));
      return heights.reduce((prev, curr, reducerIndex) => {
        if (reducerIndex >= heightIndex) return prev;
        return prev + curr.height;
      }, 0);
    },
    shouldPersist: ({ prop }) => prop("type") === "loading" || prop("duration") === Infinity
  },
  watch({ track, prop, send }) {
    track([() => prop("message")], () => {
      const message = prop("message");
      if (message) send({ type: message, src: "programmatic" });
    });
    track([() => prop("paused")], () => {
      send({ type: prop("paused") ? "PAUSE" : "RESUME" });
    });
    track([() => prop("type"), () => prop("duration")], () => {
      send({ type: "UPDATE" });
    });
  },
  on: {
    UPDATE: [
      {
        guard: and("isVisible", "shouldPause"),
        target: "visible:persist",
        actions: ["resetCloseTimer"]
      },
      {
        guard: "isVisible",
        target: "visible:updating",
        actions: ["resetCloseTimer"]
      }
    ],
    MEASURE: {
      actions: ["measureHeight"]
    }
  },
  entry: ["setMounted", "measureHeight", "invokeOnVisible"],
  effects: ["trackContent"],
  states: {
    "visible:updating": {
      tags: ["visible", "updating"],
      effects: ["waitForNextTick"],
      on: {
        DISMISS: {
          target: "dismissing"
        },
        PAUSE: {
          target: "visible:persist"
        },
        SHOW: {
          target: "visible"
        }
      }
    },
    "visible:persist": {
      tags: ["visible", "paused"],
      on: {
        RESUME: {
          guard: not("shouldPause"),
          target: "visible",
          actions: ["setCloseTimer"]
        },
        DISMISS: {
          target: "dismissing"
        }
      }
    },
    visible: {
      tags: ["visible"],
      effects: ["waitForDuration"],
      on: {
        DISMISS: {
          target: "dismissing"
        },
        PAUSE: {
          target: "visible:persist",
          actions: ["syncRemainingTime"]
        }
      }
    },
    dismissing: {
      entry: ["notifyParentOfDismiss", "invokeOnDismiss"],
      effects: ["waitForRemoveDelay"],
      on: {
        REMOVE: {
          target: "unmounted",
          actions: ["notifyParentToRemove"]
        }
      }
    },
    unmounted: {
      entry: ["invokeOnUnmount"]
    }
  },
  implementations: {
    effects: {
      waitForRemoveDelay({ prop, send }) {
        return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.setRafTimeout)(() => {
          send({ type: "REMOVE", src: "timer" });
        }, prop("removeDelay"));
      },
      waitForDuration({ send, context, computed }) {
        if (computed("shouldPersist")) return;
        return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.setRafTimeout)(() => {
          send({ type: "DISMISS", src: "timer" });
        }, context.get("remainingTime"));
      },
      waitForNextTick({ send }) {
        return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.setRafTimeout)(() => {
          send({ type: "SHOW", src: "timer" });
        }, 0);
      },
      trackContent({ scope, prop, context, state }) {
        return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.raf)(() => {
          const rootEl = _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_5__.getRootEl(scope);
          if (!rootEl) return;
          const syncHeight = () => {
            if (!state.hasTag("visible") || !rootEl.isConnected) return;
            const height = measureLayoutHeight(rootEl);
            (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_6__.setHeight)(prop("parent"), { id: prop("id"), height });
          };
          const syncRenderedElements = () => {
            context.set("rendered", {
              title: !!_toast_dom_mjs__WEBPACK_IMPORTED_MODULE_5__.getTitleEl(scope),
              description: !!_toast_dom_mjs__WEBPACK_IMPORTED_MODULE_5__.getDescriptionEl(scope)
            });
          };
          syncRenderedElements();
          return _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_5__.observeContent(rootEl, {
            filter: (el) => !el.hasAttribute("data-ghost"),
            onChange: syncHeight,
            onMutate: syncRenderedElements
          });
        });
      }
    },
    guards: {
      isVisible: ({ state }) => state.hasTag("visible"),
      shouldPause: ({ computed, prop }) => computed("shouldPersist") || !!prop("paused")
    },
    actions: {
      setMounted({ context }) {
        (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.raf)(() => {
          context.set("mounted", true);
        });
      },
      measureHeight({ scope, prop, context }) {
        queueMicrotask(() => {
          const rootEl = _toast_dom_mjs__WEBPACK_IMPORTED_MODULE_5__.getRootEl(scope);
          if (!rootEl) return;
          const height = measureLayoutHeight(rootEl);
          context.set("initialHeight", height);
          const item = { id: prop("id"), height };
          (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_6__.setHeight)(prop("parent"), item);
        });
      },
      setCloseTimer({ refs }) {
        refs.set("closeTimerStartTime", Date.now());
      },
      resetCloseTimer({ context, refs, prop }) {
        refs.set("closeTimerStartTime", Date.now());
        context.set("remainingTime", (0,_toast_utils_mjs__WEBPACK_IMPORTED_MODULE_6__.getToastDuration)(prop("duration"), prop("type")));
      },
      syncRemainingTime({ context, refs }) {
        context.set("remainingTime", (prev) => {
          const closeTimerStartTime = refs.get("closeTimerStartTime");
          const elapsedTime = Date.now() - closeTimerStartTime;
          refs.set("lastCloseStartTimerStartTime", Date.now());
          return prev - elapsedTime;
        });
      },
      notifyParentToRemove({ prop }) {
        const parent = prop("parent");
        parent.send({ type: "TOAST.REMOVE", id: prop("id") });
      },
      notifyParentOfDismiss({ prop, scope }) {
        const activeEl = scope.getActiveElement();
        if (!(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.contains)(_toast_dom_mjs__WEBPACK_IMPORTED_MODULE_5__.getRootEl(scope), activeEl)) return;
        const focusVisible = !!activeEl?.matches(":focus-visible");
        prop("parent").send({ type: "TOAST.DISMISS", focusVisible });
      },
      invokeOnDismiss({ prop, event }) {
        prop("parent").prop("store").dismiss(prop("id"));
        prop("onStatusChange")?.({ status: "dismissing", src: event.src });
      },
      invokeOnUnmount({ prop }) {
        prop("onStatusChange")?.({ status: "unmounted" });
      },
      invokeOnVisible({ prop }) {
        prop("onStatusChange")?.({ status: "visible" });
      }
    }
  }
});
function measureLayoutHeight(el) {
  const prevHeight = el.style.height;
  el.style.height = "auto";
  const height = el.offsetHeight;
  el.style.height = prevHeight;
  return height;
}



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/toast.store.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/toast.store.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createToastStore: () => (/* binding */ createToastStore)
/* harmony export */ });
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/functions.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/guard.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/object.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/warning.mjs");
// src/toast.store.ts

var withDefaults = (options, defaults) => {
  return { ...defaults, ...(0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.compact)(options) };
};
var priorities = {
  error: [1, 2],
  warning: [3, 6],
  loading: [4, 5],
  success: [5, 7],
  info: [6, 8]
};
var DEFAULT_TYPE = "info";
var getPriorityForType = (type, hasAction) => {
  const key = type ?? DEFAULT_TYPE;
  const [actionable, nonActionable] = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_1__.hasProp)(priorities, key) ? priorities[key] : priorities[DEFAULT_TYPE];
  return hasAction ? actionable : nonActionable;
};
var sortToastsByPriority = (toastArray) => {
  return toastArray.sort((a, b) => {
    const priorityA = a.priority ?? getPriorityForType(a.type, !!a.action);
    const priorityB = b.priority ?? getPriorityForType(b.type, !!b.action);
    return priorityA - priorityB;
  });
};
function createToastStore(props = {}) {
  const attrs = withDefaults(props, {
    placement: "bottom",
    overlap: false,
    max: 24,
    gap: 16,
    offsets: "1rem",
    hotkey: ["altKey", "KeyT"],
    removeDelay: 200,
    pauseOnPageIdle: true
  });
  let subscribers = [];
  let toasts = [];
  let dismissedToasts = /* @__PURE__ */ new Set();
  let toastQueue = [];
  const closingToasts = /* @__PURE__ */ new Set();
  const promiseTokens = /* @__PURE__ */ new Map();
  let paused = false;
  const layoutSubscribers = /* @__PURE__ */ new Set();
  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    let active = true;
    return () => {
      if (!active) return;
      active = false;
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) subscribers.splice(index, 1);
    };
  };
  const notifications = [];
  let publishing = false;
  const publish = (...data) => {
    notifications.push(...data);
    if (publishing) return data;
    publishing = true;
    try {
      while (notifications.length) {
        const next = notifications.shift();
        subscribers.slice().forEach((subscriber) => subscriber(next));
      }
    } finally {
      publishing = false;
      notifications.length = 0;
    }
    return data;
  };
  const addToast = (data) => {
    if (toasts.length >= attrs.max) {
      toastQueue.push(data);
      return;
    }
    toasts.unshift(data);
    publish(data);
  };
  const processQueue = () => {
    toastQueue = sortToastsByPriority(toastQueue);
    while (toastQueue.length > 0 && toasts.length < attrs.max) {
      const nextToast = toastQueue.shift();
      if (nextToast) {
        const toast = { ...nextToast, paused: paused || nextToast.paused };
        toasts.unshift(toast);
        publish(toast);
      }
    }
  };
  const create = (data) => {
    const id = data.id ?? `toast:${(0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)()}`;
    const exists = toasts.find((toast) => toast.id === id) ?? toastQueue.find((toast) => toast.id === id);
    if (closingToasts.has(id)) return id;
    if ((0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_1__.hasProp)(data, "promise") && data.promise !== exists?.promise) promiseTokens.delete(id);
    dismissedToasts.delete(id);
    if (exists) {
      const next = { ...exists, ...data, id };
      if (toasts.some((toast) => toast.id === id)) {
        toasts = toasts.map((toast) => toast.id === id ? next : toast);
        publish(next);
      } else {
        toastQueue = toastQueue.map((toast) => toast.id === id ? next : toast);
      }
    } else {
      const newToast = {
        id,
        duration: attrs.duration,
        removeDelay: attrs.removeDelay,
        type: DEFAULT_TYPE,
        ...data,
        gap: attrs.gap,
        paused
      };
      const priority = newToast.priority ?? getPriorityForType(newToast.type, !!newToast.action);
      addToast({ ...newToast, priority });
    }
    return id;
  };
  const remove = (id) => {
    const removed = id == null ? [...toasts, ...toastQueue] : [...toasts, ...toastQueue].filter((toast) => toast.id === id);
    const visible = id == null ? toasts : toasts.filter((toast) => toast.id === id);
    removed.forEach((toast) => {
      dismissedToasts.add(toast.id);
      closingToasts.delete(toast.id);
      promiseTokens.delete(toast.id);
    });
    if (id != null) dismissedToasts.add(id);
    toasts = id == null ? [] : toasts.filter((toast) => toast.id !== id);
    toastQueue = id == null ? [] : toastQueue.filter((toast) => toast.id !== id);
    if (id != null && !visible.length) publish({ id, dismiss: true });
    publish(...visible.map((toast) => ({ id: toast.id, dismiss: true })));
    processQueue();
    return id;
  };
  const error = (data) => {
    return create({ ...data, type: "error" });
  };
  const success = (data) => {
    return create({ ...data, type: "success" });
  };
  const info = (data) => {
    return create({ ...data, type: "info" });
  };
  const warning = (data) => {
    return create({ ...data, type: "warning" });
  };
  const loading = (data) => {
    return create({ ...data, type: "loading" });
  };
  const getVisibleToasts = () => {
    return toasts.filter((toast) => !dismissedToasts.has(toast.id));
  };
  const getCount = () => {
    return toasts.length;
  };
  const promise = (promise2, options, shared = {}) => {
    if (!options || !options.loading) {
      (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_3__.warn)("[zag-js > toast] toaster.promise() requires at least a 'loading' option to be specified");
      return;
    }
    const id = create({
      ...shared,
      ...options.loading,
      promise: promise2,
      type: "loading"
    });
    const token = /* @__PURE__ */ Symbol();
    const current = toasts.find((toast) => toast.id === id) ?? toastQueue.find((toast) => toast.id === id);
    if (current?.promise === promise2 && !closingToasts.has(id)) promiseTokens.set(id, token);
    const isCurrent = () => promiseTokens.get(id) === token && !closingToasts.has(id);
    let removable = true;
    let result;
    const prom = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.runIfFn)(promise2).then(async (response) => {
      result = ["resolve", response];
      if (isHttpResponse(response) && !response.ok) {
        removable = false;
        const errorOptions = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.runIfFn)(options.error, `HTTP Error! status: ${response.status}`);
        if (isCurrent()) create({ ...shared, ...errorOptions, id, type: "error" });
      } else if (options.success !== void 0) {
        removable = false;
        const successOptions = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.runIfFn)(options.success, response);
        if (isCurrent()) create({ ...shared, ...successOptions, id, type: successOptions.type ?? "success" });
      }
    }).catch(async (error2) => {
      result = ["reject", error2];
      if (options.error !== void 0) {
        removable = false;
        const errorOptions = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.runIfFn)(options.error, error2);
        if (isCurrent()) create({ ...shared, ...errorOptions, id, type: "error" });
      }
    }).finally(() => {
      if (removable && isCurrent()) {
        remove(id);
      }
      if (promiseTokens.get(id) === token) promiseTokens.delete(id);
      options.finally?.();
    });
    const unwrap = () => new Promise(
      (resolve, reject) => prom.then(() => result[0] === "reject" ? reject(result[1]) : resolve(result[1])).catch(reject)
    );
    return { id, unwrap };
  };
  const update = (id, data) => {
    if (closingToasts.has(id)) return id;
    if (typeof data !== "function") return create({ ...data, id });
    const current = toasts.find((toast) => toast.id === id) ?? toastQueue.find((toast) => toast.id === id);
    if (!current) return id;
    const next = { ...data({ ...current }), id };
    if (closingToasts.has(id)) return id;
    if (toasts.some((toast) => toast.id === id)) return create(next);
    if (!toastQueue.some((toast) => toast.id === id)) return id;
    return create(next);
  };
  const changeToasts = (data, id) => {
    const changed = [];
    toasts = toasts.map((toast) => {
      if (id != null && toast.id !== id || closingToasts.has(toast.id)) return toast;
      const next = { ...toast, ...data };
      changed.push(next);
      return next;
    });
    toastQueue = toastQueue.map((toast) => id == null || toast.id === id ? { ...toast, ...data } : toast);
    publish(...changed);
  };
  const pause = (id) => {
    if (id == null) paused = true;
    changeToasts({ paused: true }, id);
  };
  const resume = (id) => {
    if (id == null) paused = false;
    changeToasts({ paused: false }, id);
  };
  const dismiss = (id) => {
    const queued = toastQueue.filter((toast) => id == null || toast.id === id);
    toastQueue = toastQueue.filter((toast) => id != null && toast.id !== id);
    queued.forEach((toast) => {
      dismissedToasts.add(toast.id);
      promiseTokens.delete(toast.id);
    });
    const changed = toasts.filter((toast) => (id == null || toast.id === id) && !closingToasts.has(toast.id));
    changed.forEach((toast) => closingToasts.add(toast.id));
    toasts = toasts.map((toast) => closingToasts.has(toast.id) ? { ...toast, message: "DISMISS" } : toast);
    publish(...changed.map((toast) => ({ ...toast, message: "DISMISS" })));
  };
  const isVisible = (id) => {
    return !dismissedToasts.has(id) && !!toasts.find((toast) => toast.id === id);
  };
  const isDismissed = (id) => {
    return dismissedToasts.has(id);
  };
  const subscribeLayout = (subscriber) => {
    layoutSubscribers.add(subscriber);
    return () => {
      layoutSubscribers.delete(subscriber);
    };
  };
  const expand = () => layoutSubscribers.forEach((subscriber) => subscriber(true));
  const collapse = () => layoutSubscribers.forEach((subscriber) => subscriber(false));
  return {
    attrs,
    subscribe,
    create,
    update,
    remove,
    dismiss,
    error,
    success,
    info,
    warning,
    loading,
    getVisibleToasts,
    getCount,
    promise,
    pause,
    resume,
    isVisible,
    isDismissed,
    expand,
    collapse,
    subscribeLayout
  };
}
var isHttpResponse = (data) => {
  return data && typeof data === "object" && "ok" in data && typeof data.ok === "boolean" && "status" in data && typeof data.status === "number";
};



/***/ },

/***/ "./node_modules/@zag-js/toast/dist/toast.utils.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@zag-js/toast/dist/toast.utils.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultTimeouts: () => (/* binding */ defaultTimeouts),
/* harmony export */   getGhostAfterStyle: () => (/* binding */ getGhostAfterStyle),
/* harmony export */   getGhostBeforeStyle: () => (/* binding */ getGhostBeforeStyle),
/* harmony export */   getGroupPlacementStyle: () => (/* binding */ getGroupPlacementStyle),
/* harmony export */   getPlacementStyle: () => (/* binding */ getPlacementStyle),
/* harmony export */   getToastDuration: () => (/* binding */ getToastDuration),
/* harmony export */   setHeight: () => (/* binding */ setHeight)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");
// src/toast.utils.ts

var defaultTimeouts = {
  info: 5e3,
  error: 5e3,
  success: 2e3,
  loading: Infinity,
  warning: 5e3,
  DEFAULT: 5e3
};
function getToastDuration(duration, type) {
  return duration ?? defaultTimeouts[type] ?? defaultTimeouts.DEFAULT;
}
var getOffsets = (offsets) => typeof offsets === "string" ? { left: offsets, right: offsets, bottom: offsets, top: offsets } : offsets;
function getGroupPlacementStyle(service, placement) {
  const { prop, computed, context } = service;
  const { offsets, gap } = prop("store").attrs;
  const heights = context.get("heights");
  const computedOffset = getOffsets(offsets);
  const rtl = prop("dir") === "rtl";
  const computedPlacement = placement.replace("-start", rtl ? "-right" : "-left").replace("-end", rtl ? "-left" : "-right");
  const isRighty = computedPlacement.includes("right");
  const isLefty = computedPlacement.includes("left");
  const styles = {
    position: "fixed",
    pointerEvents: computed("count") > 0 ? void 0 : "none",
    display: "flex",
    flexDirection: "column",
    "--gap": `${gap}px`,
    "--first-height": `${heights[0]?.height || 0}px`,
    "--viewport-offset-left": computedOffset.left,
    "--viewport-offset-right": computedOffset.right,
    "--viewport-offset-top": computedOffset.top,
    "--viewport-offset-bottom": computedOffset.bottom,
    zIndex: _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.MAX_Z_INDEX
  };
  let alignItems = "center";
  if (isRighty) alignItems = "flex-end";
  if (isLefty) alignItems = "flex-start";
  styles.alignItems = alignItems;
  if (computedPlacement.includes("top")) {
    const offset = computedOffset.top;
    styles.top = `max(env(safe-area-inset-top, 0px), ${offset})`;
  }
  if (computedPlacement.includes("bottom")) {
    const offset = computedOffset.bottom;
    styles.bottom = `max(env(safe-area-inset-bottom, 0px), ${offset})`;
  }
  if (!computedPlacement.includes("left")) {
    const offset = computedOffset.right;
    styles.insetInlineEnd = `calc(env(safe-area-inset-right, 0px) + ${offset})`;
  }
  if (!computedPlacement.includes("right")) {
    const offset = computedOffset.left;
    styles.insetInlineStart = `calc(env(safe-area-inset-left, 0px) + ${offset})`;
  }
  return styles;
}
function getPlacementStyle(service, visible) {
  const { prop, context, computed } = service;
  const parent = prop("parent");
  const placement = parent.computed("placement");
  const { gap } = parent.prop("store").attrs;
  const [side] = placement.split("-");
  const mounted = context.get("mounted");
  const remainingTime = context.get("remainingTime");
  const height = computed("height");
  const frontmost = computed("frontmost");
  const sibling = !frontmost;
  const stacked = prop("parent").state.matches("stack");
  const overlap = !stacked;
  const type = prop("type");
  const duration = type === "loading" ? Number.MAX_SAFE_INTEGER : remainingTime;
  const offset = computed("heightIndex") * gap + computed("heightBefore");
  const styles = {
    position: "absolute",
    pointerEvents: "auto",
    "--opacity": "0",
    "--remove-delay": `${prop("removeDelay")}ms`,
    "--duration": `${duration}ms`,
    "--initial-height": `${height}px`,
    "--offset": `${offset}px`,
    "--index": prop("index"),
    "--z-index": computed("zIndex"),
    "--lift-amount": "calc(var(--lift) * var(--gap))",
    "--y": "100%",
    "--x": "0"
  };
  const assign = (overrides) => Object.assign(styles, overrides);
  if (side === "top") {
    assign({
      top: "0",
      "--sign": "-1",
      "--y": "-100%",
      "--lift": "1"
    });
  } else if (side === "bottom") {
    assign({
      bottom: "0",
      "--sign": "1",
      "--y": "100%",
      "--lift": "-1"
    });
  }
  if (mounted) {
    assign({
      "--y": "0",
      "--opacity": "1"
    });
    if (stacked) {
      assign({
        "--y": "calc(var(--lift) * var(--offset))",
        "--height": "var(--initial-height)"
      });
    }
  }
  if (!visible) {
    assign({
      "--opacity": "0",
      pointerEvents: "none"
    });
  }
  if (sibling && overlap) {
    assign({
      "--base-scale": "var(--index) * 0.05 + 1",
      "--y": "calc(var(--lift-amount) * var(--index))",
      "--scale": "calc(-1 * var(--base-scale))",
      "--height": "var(--first-height)"
    });
    if (!visible) {
      assign({
        "--y": "calc(var(--sign) * 40%)"
      });
    }
  }
  if (sibling && stacked && !visible) {
    assign({
      "--y": "calc(var(--lift) * var(--offset) + var(--lift) * -100%)"
    });
  }
  if (frontmost && !visible) {
    assign({
      "--y": "calc(var(--lift) * -100%)"
    });
  }
  return styles;
}
function getGhostBeforeStyle(service, visible) {
  const { computed } = service;
  const styles = {
    position: "absolute",
    inset: "0",
    scale: "1 2",
    pointerEvents: visible ? "none" : "auto"
  };
  const assign = (overrides) => Object.assign(styles, overrides);
  if (computed("frontmost") && !visible) {
    assign({
      height: "calc(var(--initial-height) + 80%)"
    });
  }
  return styles;
}
function getGhostAfterStyle() {
  return {
    position: "absolute",
    left: "0",
    height: "calc(var(--gap) + 2px)",
    bottom: "100%",
    width: "100%"
  };
}
function setHeight(parent, item) {
  const { id, height } = item;
  parent.context.set("heights", (prev) => {
    const existing = prev.find((i) => i.id === id);
    if (existing) {
      if (existing.height === height) return prev;
      return prev.map((i) => i.id === id ? { ...i, height } : i);
    }
    const toasts = parent.context.get("toasts");
    const rank = (id2) => toasts.findIndex((t) => t.id === id2);
    const index = rank(id);
    let insertAt = prev.findIndex((i) => {
      const r = rank(i.id);
      return r === -1 || r > index;
    });
    if (insertAt === -1) insertAt = prev.length;
    return [...prev.slice(0, insertAt), { id, height }, ...prev.slice(insertAt)];
  });
}



/***/ },

/***/ "./node_modules/@zag-js/tooltip/dist/tooltip.anatomy.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@zag-js/tooltip/dist/tooltip.anatomy.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   anatomy: () => (/* binding */ anatomy),
/* harmony export */   parts: () => (/* binding */ parts)
/* harmony export */ });
/* harmony import */ var _zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/anatomy */ "./node_modules/@zag-js/anatomy/dist/create-anatomy.mjs");
// src/tooltip.anatomy.ts

var anatomy = (0,_zag_js_anatomy__WEBPACK_IMPORTED_MODULE_0__.createAnatomy)("tooltip").parts("trigger", "arrow", "arrowTip", "positioner", "content");
var parts = anatomy.build();



/***/ },

/***/ "./node_modules/@zag-js/tooltip/dist/tooltip.connect.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@zag-js/tooltip/dist/tooltip.connect.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connect: () => (/* binding */ connect)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");
/* harmony import */ var _zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/focus-visible */ "./node_modules/@zag-js/focus-visible/dist/index.mjs");
/* harmony import */ var _zag_js_popper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/popper */ "./node_modules/@zag-js/popper/dist/get-styles.mjs");
/* harmony import */ var _zag_js_popper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/popper */ "./node_modules/@zag-js/popper/dist/placement.mjs");
/* harmony import */ var _tooltip_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tooltip.anatomy.mjs */ "./node_modules/@zag-js/tooltip/dist/tooltip.anatomy.mjs");
/* harmony import */ var _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tooltip.dom.mjs */ "./node_modules/@zag-js/tooltip/dist/tooltip.dom.mjs");
/* harmony import */ var _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tooltip.store.mjs */ "./node_modules/@zag-js/tooltip/dist/tooltip.store.mjs");
// src/tooltip.connect.ts






function connect(service, normalize) {
  const { state, context, send, scope, prop, event: _event } = service;
  const id = prop("id");
  const open = state.matches("open", "closing");
  const triggerValue = context.get("triggerValue");
  const currentPlacement = context.get("currentPlacement");
  const currentPlacementSide = currentPlacement ? (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_4__.getPlacementSide)(currentPlacement) : void 0;
  const contentId = _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getContentId(scope);
  const disabled = prop("disabled");
  const popperStyles = (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_3__.getPlacementStyles)({
    ...prop("positioning"),
    placement: currentPlacement
  });
  return {
    open,
    setOpen(nextOpen) {
      send({ type: nextOpen ? "open" : "close", replaces: "open" });
    },
    triggerValue,
    setTriggerValue(value) {
      send({ type: "triggerValue.set", value: value ?? void 0 });
    },
    reposition(options = {}) {
      send({ type: "positioning.set", options });
    },
    getTriggerProps(props = {}) {
      const { value } = props;
      const current = value == null ? false : triggerValue === value;
      const triggerId = _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getTriggerId(scope, value);
      return normalize.button({
        ..._tooltip_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.trigger.attrs,
        id: triggerId,
        "data-ownedby": scope.id,
        "data-value": value,
        "data-current": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.dataAttr)(current),
        dir: prop("dir"),
        "data-expanded": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.dataAttr)(open),
        "data-state": open ? "open" : "closed",
        "aria-describedby": open ? contentId : void 0,
        onClick(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (!prop("closeOnClick")) return;
          const shouldSwitch = open && value != null && !current;
          send({ type: shouldSwitch ? "triggerValue.set" : "close", src: "trigger.click", value, triggerId });
        },
        onFocus(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (!(0,_zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_2__.isFocusVisible)()) return;
          const shouldSwitch = open && value != null && !current;
          send({ type: shouldSwitch ? "triggerValue.set" : "open", src: "trigger.focus", value, triggerId });
        },
        onBlur(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (id !== _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("id")) return;
          const activeEl = event.relatedTarget ?? scope.getDoc().activeElement;
          const focusedAnotherTrigger = activeEl?.closest((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getByOwnerId)(scope.id)) != null;
          if (!focusedAnotherTrigger) {
            send({ type: "close", src: "trigger.blur", value, triggerId });
          }
        },
        onPointerDown(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (!(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.isLeftClick)(event)) return;
          if (!prop("closeOnPointerDown")) return;
          if (id === _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("id")) {
            send({ type: "close", src: "trigger.pointerdown", value, triggerId });
          }
        },
        onPointerMove(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (event.pointerType === "touch") return;
          const shouldSwitch = open && value != null && !current;
          send({ type: shouldSwitch ? "triggerValue.set" : "pointer.move", value, triggerId });
        },
        onPointerOver(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (event.pointerType === "touch") return;
          send({ type: "pointer.move", value, triggerId });
        },
        onPointerLeave() {
          send({ type: "pointer.leave" });
        },
        onPointerCancel() {
          send({ type: "pointer.leave" });
        }
      });
    },
    getArrowProps() {
      return normalize.element({
        id: _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getArrowId(scope),
        ..._tooltip_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.arrow.attrs,
        dir: prop("dir"),
        style: popperStyles.arrow
      });
    },
    getArrowTipProps() {
      return normalize.element({
        ..._tooltip_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.arrowTip.attrs,
        dir: prop("dir"),
        style: popperStyles.arrowTip
      });
    },
    getPositionerProps() {
      return normalize.element({
        id: _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getPositionerId(scope),
        ..._tooltip_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.positioner.attrs,
        dir: prop("dir"),
        style: popperStyles.floating
      });
    },
    getContentProps() {
      const isCurrentTooltip = _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("id") === id;
      const isPrevTooltip = _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("prevId") === id;
      const instant = _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("instant") && (open && isCurrentTooltip || isPrevTooltip);
      return normalize.element({
        ..._tooltip_anatomy_mjs__WEBPACK_IMPORTED_MODULE_5__.parts.content.attrs,
        dir: prop("dir"),
        hidden: !open,
        "data-state": open ? "open" : "closed",
        "data-instant": (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.dataAttr)(instant),
        role: "tooltip",
        id: contentId,
        "aria-label": prop("aria-label"),
        "data-placement": currentPlacement,
        "data-side": currentPlacementSide,
        onPointerEnter() {
          send({ type: "content.pointer.move" });
        },
        onPointerLeave() {
          send({ type: "content.pointer.leave" });
        },
        style: {
          pointerEvents: prop("interactive") ? "auto" : "none"
        }
      });
    }
  };
}



/***/ },

/***/ "./node_modules/@zag-js/tooltip/dist/tooltip.dom.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@zag-js/tooltip/dist/tooltip.dom.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getActiveTriggerEl: () => (/* binding */ getActiveTriggerEl),
/* harmony export */   getArrowEl: () => (/* binding */ getArrowEl),
/* harmony export */   getArrowId: () => (/* binding */ getArrowId),
/* harmony export */   getContentEl: () => (/* binding */ getContentEl),
/* harmony export */   getContentId: () => (/* binding */ getContentId),
/* harmony export */   getPositionerEl: () => (/* binding */ getPositionerEl),
/* harmony export */   getPositionerId: () => (/* binding */ getPositionerId),
/* harmony export */   getTriggerEl: () => (/* binding */ getTriggerEl),
/* harmony export */   getTriggerEls: () => (/* binding */ getTriggerEls),
/* harmony export */   getTriggerId: () => (/* binding */ getTriggerId)
/* harmony export */ });
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/query.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/shared.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/guard.mjs");
// src/tooltip.dom.ts


var getTriggerId = (scope, value) => {
  const customId = scope.ids?.trigger;
  if (customId != null) return (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_2__.isFunction)(customId) ? customId(value) : customId;
  return value ? `tooltip:${scope.id}:trigger:${value}` : `tooltip:${scope.id}:trigger`;
};
var getContentId = (scope) => scope.ids?.content ?? `tooltip:${scope.id}:content`;
var getArrowId = (scope) => scope.ids?.arrow ?? `tooltip:${scope.id}:arrow`;
var getPositionerId = (scope) => scope.ids?.positioner ?? `tooltip:${scope.id}:popper`;
var getTriggerEl = (scope) => scope.getById(getTriggerId(scope));
var getContentEl = (scope) => scope.getById(getContentId(scope));
var getPositionerEl = (scope) => scope.getById(getPositionerId(scope));
var getArrowEl = (scope) => scope.getById(getArrowId(scope));
var getTriggerEls = (scope) => (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_0__.queryAll)(scope.getRootNode(), `[data-scope="tooltip"][data-part="trigger"]${(0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.getByOwnerId)(scope.id)}`);
var getActiveTriggerEl = (scope, value) => {
  if (value == null) {
    return getTriggerEl(scope) ?? getTriggerEls(scope)[0];
  }
  return scope.getById(getTriggerId(scope, value));
};



/***/ },

/***/ "./node_modules/@zag-js/tooltip/dist/tooltip.machine.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@zag-js/tooltip/dist/tooltip.machine.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   machine: () => (/* binding */ machine)
/* harmony export */ });
/* harmony import */ var _zag_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/core */ "./node_modules/@zag-js/core/dist/create-machine.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/event.mjs");
/* harmony import */ var _zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zag-js/dom-query */ "./node_modules/@zag-js/dom-query/dist/overflow.mjs");
/* harmony import */ var _zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zag-js/focus-visible */ "./node_modules/@zag-js/focus-visible/dist/index.mjs");
/* harmony import */ var _zag_js_popper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zag-js/popper */ "./node_modules/@zag-js/popper/dist/get-placement.mjs");
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/warning.mjs");
/* harmony import */ var _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tooltip.dom.mjs */ "./node_modules/@zag-js/tooltip/dist/tooltip.dom.mjs");
/* harmony import */ var _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tooltip.store.mjs */ "./node_modules/@zag-js/tooltip/dist/tooltip.store.mjs");
// src/tooltip.machine.ts







var { and, not } = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createGuards)();
var machine = (0,_zag_js_core__WEBPACK_IMPORTED_MODULE_0__.createMachine)({
  initialState: ({ prop }) => {
    const open = prop("open") || prop("defaultOpen");
    return open ? "open" : "closed";
  },
  props({ props }) {
    (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_5__.ensureProps)(props, ["id"]);
    const closeOnClick = props.closeOnClick ?? true;
    const closeOnPointerDown = props.closeOnPointerDown ?? closeOnClick;
    return {
      openDelay: 400,
      closeDelay: 150,
      closeOnEscape: true,
      interactive: false,
      closeOnScroll: true,
      disabled: false,
      ...props,
      closeOnPointerDown,
      closeOnClick,
      positioning: {
        placement: "bottom",
        ...props.positioning
      }
    };
  },
  effects: ["trackFocusVisible", "trackStore"],
  exit: ["clearGlobalId"],
  context: ({ bindable, prop, scope }) => ({
    currentPlacement: bindable(() => ({ defaultValue: void 0 })),
    hasPointerMoveOpened: bindable(() => ({ defaultValue: null })),
    triggerValue: bindable(() => ({
      defaultValue: prop("defaultTriggerValue") ?? null,
      value: prop("triggerValue"),
      onChange(value) {
        const onTriggerValueChange = prop("onTriggerValueChange");
        if (!onTriggerValueChange) return;
        const triggerElement = _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getActiveTriggerEl(scope, value);
        onTriggerValueChange({ value, triggerElement });
      }
    }))
  }),
  watch({ track, action, prop }) {
    track([() => prop("disabled")], () => {
      action(["closeIfDisabled"]);
    });
    track([() => prop("open")], () => {
      action(["toggleVisibility"]);
    });
    track([() => prop("triggerValue")], () => {
      action(["repositionImmediate"]);
    });
  },
  on: {
    "triggerValue.set": {
      actions: ["setTriggerValue", "repositionImmediate"]
    }
  },
  states: {
    closed: {
      entry: ["clearGlobalId"],
      on: {
        "controlled.open": {
          target: "open"
        },
        open: [
          {
            guard: "isOpenControlled",
            actions: ["setTriggerValue", "invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setTriggerValue", "invokeOnOpen"]
          }
        ],
        "pointer.leave": {
          actions: ["clearPointerMoveOpened"]
        },
        "pointer.move": [
          {
            guard: and("noVisibleTooltip", not("hasPointerMoveOpened")),
            target: "opening",
            actions: ["setTriggerValue"]
          },
          {
            guard: not("hasPointerMoveOpened"),
            target: "open",
            actions: ["setPointerMoveOpened", "invokeOnOpen", "setTriggerValue"]
          }
        ]
      }
    },
    opening: {
      effects: ["trackScroll", "trackPointerlockChange", "waitForOpenDelay"],
      on: {
        "after.openDelay": [
          {
            guard: "isOpenControlled",
            actions: ["setPointerMoveOpened", "invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setPointerMoveOpened", "invokeOnOpen"]
          }
        ],
        "controlled.open": {
          target: "open"
        },
        "controlled.close": {
          target: "closed"
        },
        open: [
          {
            guard: "isOpenControlled",
            actions: ["setTriggerValue", "invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setTriggerValue", "invokeOnOpen"]
          }
        ],
        "pointer.leave": [
          {
            guard: "isDisabled",
            actions: ["clearPointerMoveOpened"]
          },
          {
            guard: "isOpenControlled",
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["clearPointerMoveOpened", "invokeOnClose", "toggleVisibility"]
          },
          {
            target: "closed",
            actions: ["clearPointerMoveOpened", "invokeOnClose"]
          }
        ],
        close: [
          {
            guard: "isOpenControlled",
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["invokeOnClose", "toggleVisibility"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ]
      }
    },
    open: {
      effects: ["trackEscapeKey", "trackScroll", "trackPointerlockChange", "trackPositioning"],
      entry: ["setGlobalId"],
      on: {
        "controlled.close": {
          target: "closed"
        },
        close: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "pointer.leave": [
          {
            // A controlled tooltip can stay open while disabled
            guard: "isDisabled",
            actions: ["clearPointerMoveOpened"]
          },
          {
            guard: "isVisible",
            target: "closing",
            actions: ["clearPointerMoveOpened"]
          },
          // == group ==
          {
            guard: "isOpenControlled",
            actions: ["clearPointerMoveOpened", "invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["clearPointerMoveOpened", "invokeOnClose"]
          }
        ],
        "content.pointer.leave": {
          guard: "isInteractive",
          target: "closing"
        },
        "positioning.set": {
          actions: ["reposition"]
        },
        "triggerValue.set": {
          // Transition to closing (which cleans up trackPositioning) then immediately back to open
          // This re-creates the positioning effect with the new trigger
          target: "closing",
          actions: ["setTriggerValue", "immediateReopen"]
        }
      }
    },
    closing: {
      effects: ["trackPositioning", "waitForCloseDelay"],
      on: {
        "after.closeDelay": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "controlled.close": {
          target: "closed"
        },
        "controlled.open": {
          target: "open"
        },
        close: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "pointer.move": [
          {
            guard: "isOpenControlled",
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["setPointerMoveOpened", "setTriggerValue", "invokeOnOpen", "toggleVisibility"]
          },
          {
            target: "open",
            actions: ["setPointerMoveOpened", "setTriggerValue", "invokeOnOpen"]
          }
        ],
        "triggerValue.set": {
          target: "open",
          actions: ["setTriggerValue", "repositionImmediate"]
        },
        reopen: {
          target: "open"
        },
        "content.pointer.move": {
          guard: "isInteractive",
          target: "open"
        },
        "positioning.set": {
          actions: ["reposition"]
        }
      }
    }
  },
  implementations: {
    guards: {
      noVisibleTooltip: () => _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("id") === null,
      isVisible: ({ prop }) => prop("id") === _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("id"),
      isInteractive: ({ prop }) => !!prop("interactive"),
      hasPointerMoveOpened: ({ context }) => !!context.get("hasPointerMoveOpened"),
      isOpenControlled: ({ prop }) => prop("open") !== void 0,
      isDisabled: ({ prop }) => !!prop("disabled")
    },
    actions: {
      setGlobalId: ({ prop }) => {
        const prevId = _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("id");
        const isInstant = prevId !== null && prevId !== prop("id");
        _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.update({ id: prop("id"), prevId: isInstant ? prevId : null, instant: isInstant });
      },
      clearGlobalId: ({ prop }) => {
        if (prop("id") === _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("id")) {
          _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.update({ id: null, prevId: null, instant: false });
        }
      },
      invokeOnOpen: ({ prop }) => {
        prop("onOpenChange")?.({ open: true });
      },
      invokeOnClose: ({ prop }) => {
        prop("onOpenChange")?.({ open: false });
      },
      closeIfDisabled: ({ prop, send }) => {
        if (!prop("disabled")) return;
        send({ type: "close", src: "disabled.change" });
      },
      reposition: ({ context, event, prop, scope }) => {
        if (event.type !== "positioning.set") return;
        const getPositionerEl2 = () => _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getPositionerEl(scope);
        const getTriggerEl = () => _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getActiveTriggerEl(scope, context.get("triggerValue"));
        (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_4__.getPlacement)(getTriggerEl, getPositionerEl2, {
          ...prop("positioning"),
          ...event.options,
          listeners: false,
          onComplete(data) {
            context.set("currentPlacement", data.placement);
          }
        });
      },
      repositionImmediate: ({ context, event, prop, scope }) => {
        const triggerValue = event.value ?? context.get("triggerValue");
        const getPositionerEl2 = () => _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getPositionerEl(scope);
        const getTriggerEl = () => _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getActiveTriggerEl(scope, triggerValue);
        return (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_4__.getPlacement)(getTriggerEl, getPositionerEl2, {
          ...prop("positioning"),
          onComplete(data) {
            context.set("currentPlacement", data.placement);
          }
        });
      },
      toggleVisibility: ({ prop, event, send }) => {
        queueMicrotask(() => {
          send({
            type: prop("open") ? "controlled.open" : "controlled.close",
            previousEvent: event
          });
        });
      },
      setPointerMoveOpened: ({ context, event }) => {
        const triggerId = event.triggerId ?? event.previousEvent?.triggerId;
        context.set("hasPointerMoveOpened", triggerId ?? null);
      },
      clearPointerMoveOpened: ({ context }) => {
        context.set("hasPointerMoveOpened", null);
      },
      setTriggerValue: ({ context, event }) => {
        if (event.value === void 0) return;
        context.set("triggerValue", event.value);
      },
      immediateReopen: ({ send }) => {
        queueMicrotask(() => {
          send({ type: "reopen" });
        });
      }
    },
    effects: {
      trackFocusVisible: ({ scope }) => {
        return (0,_zag_js_focus_visible__WEBPACK_IMPORTED_MODULE_3__.trackFocusVisible)({ root: scope.getRootNode?.() });
      },
      trackPositioning: ({ context, prop, scope }) => {
        if (!context.get("currentPlacement")) {
          context.set("currentPlacement", prop("positioning").placement);
        }
        const getPositionerEl2 = () => _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getPositionerEl(scope);
        const getTriggerEl = () => _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getActiveTriggerEl(scope, context.get("triggerValue"));
        return (0,_zag_js_popper__WEBPACK_IMPORTED_MODULE_4__.getPlacement)(getTriggerEl, getPositionerEl2, {
          ...prop("positioning"),
          defer: true,
          onComplete(data) {
            context.set("currentPlacement", data.placement);
          }
        });
      },
      trackPointerlockChange: ({ send, scope }) => {
        const doc = scope.getDoc();
        const onChange = () => send({ type: "close", src: "pointerlock:change" });
        return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.addDomEvent)(doc, "pointerlockchange", onChange, false);
      },
      trackScroll: ({ send, prop, scope, context }) => {
        if (!prop("closeOnScroll")) return;
        const triggerValue = context.get("triggerValue");
        const triggerEl = _tooltip_dom_mjs__WEBPACK_IMPORTED_MODULE_6__.getActiveTriggerEl(scope, triggerValue);
        if (!triggerEl) return;
        const overflowParents = (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors)(triggerEl);
        const cleanups = overflowParents.map((overflowParent) => {
          const onScroll = () => {
            send({ type: "close", src: "scroll" });
          };
          return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.addDomEvent)(overflowParent, "scroll", onScroll, {
            passive: true,
            capture: true
          });
        });
        return () => {
          cleanups.forEach((fn) => fn?.());
        };
      },
      trackStore: ({ prop, send }) => {
        let cleanup;
        let cancelled = false;
        queueMicrotask(() => {
          if (cancelled) return;
          cleanup = _tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.subscribe(() => {
            if (_tooltip_store_mjs__WEBPACK_IMPORTED_MODULE_7__.store.get("id") !== prop("id")) {
              send({ type: "close", src: "id.change" });
            }
          });
        });
        return () => {
          cancelled = true;
          cleanup?.();
        };
      },
      trackEscapeKey: ({ send, prop }) => {
        if (!prop("closeOnEscape")) return;
        const onKeyDown = (event) => {
          if ((0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.isComposingEvent)(event)) return;
          if (event.key !== "Escape") return;
          event.stopPropagation();
          send({ type: "close", src: "keydown.escape" });
        };
        return (0,_zag_js_dom_query__WEBPACK_IMPORTED_MODULE_1__.addDomEvent)(document, "keydown", onKeyDown, true);
      },
      waitForOpenDelay: ({ send, prop, event }) => {
        const id = setTimeout(() => {
          send({ type: "after.openDelay", previousEvent: event });
        }, prop("openDelay"));
        return () => clearTimeout(id);
      },
      waitForCloseDelay: ({ send, prop, event }) => {
        const id = setTimeout(() => {
          send({ type: "after.closeDelay", previousEvent: event });
        }, prop("closeDelay"));
        return () => clearTimeout(id);
      }
    }
  }
});



/***/ },

/***/ "./node_modules/@zag-js/tooltip/dist/tooltip.store.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/@zag-js/tooltip/dist/tooltip.store.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   store: () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _zag_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zag-js/utils */ "./node_modules/@zag-js/utils/dist/store.mjs");
// src/tooltip.store.ts

var store = (0,_zag_js_utils__WEBPACK_IMPORTED_MODULE_0__.createStore)({
  id: null,
  prevId: null,
  instant: false
});



/***/ },

/***/ "./node_modules/@zag-js/types/dist/prop-types.mjs"
/*!********************************************************!*\
  !*** ./node_modules/@zag-js/types/dist/prop-types.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNormalizer: () => (/* binding */ createNormalizer)
/* harmony export */ });
// src/prop-types.ts
function createNormalizer(fn) {
  return new Proxy({}, {
    get(_target, key) {
      if (key === "style")
        return (props) => {
          return fn({ style: props }).style;
        };
      return fn;
    }
  });
}



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/array.mjs"
/*!***************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/array.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   addOrRemove: () => (/* binding */ addOrRemove),
/* harmony export */   chunk: () => (/* binding */ chunk),
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   diff: () => (/* binding */ diff),
/* harmony export */   first: () => (/* binding */ first),
/* harmony export */   flatArray: () => (/* binding */ flatArray),
/* harmony export */   fromLength: () => (/* binding */ fromLength),
/* harmony export */   has: () => (/* binding */ has),
/* harmony export */   insertAt: () => (/* binding */ insertAt),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   last: () => (/* binding */ last),
/* harmony export */   next: () => (/* binding */ next),
/* harmony export */   nextIndex: () => (/* binding */ nextIndex),
/* harmony export */   partition: () => (/* binding */ partition),
/* harmony export */   prev: () => (/* binding */ prev),
/* harmony export */   prevIndex: () => (/* binding */ prevIndex),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   removeAt: () => (/* binding */ removeAt),
/* harmony export */   toArray: () => (/* binding */ toArray),
/* harmony export */   uniq: () => (/* binding */ uniq)
/* harmony export */ });


// src/array.ts
function toArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}
var fromLength = (length) => Array.from(Array(length).keys());
var first = (v) => v[0];
var last = (v) => v[v.length - 1];
var isEmpty = (v) => v.length === 0;
var has = (v, t) => v.indexOf(t) !== -1;
var add = (v, ...items) => v.concat(items);
var remove = (v, ...items) => v.filter((t) => !items.includes(t));
var removeAt = (v, i) => v.filter((_, idx) => idx !== i);
var insertAt = (v, i, ...items) => [...v.slice(0, i), ...items, ...v.slice(i)];
var uniq = (v) => Array.from(new Set(v));
var diff = (a, b) => {
  const set = new Set(b);
  return a.filter((t) => !set.has(t));
};
var addOrRemove = (v, item) => has(v, item) ? remove(v, item) : add(v, item);
function clear(v) {
  while (v.length > 0) v.pop();
  return v;
}
function nextIndex(v, idx, opts = {}) {
  const { step = 1, loop = true } = opts;
  const next2 = idx + step;
  const len = v.length;
  const last2 = len - 1;
  if (idx === -1) return step > 0 ? 0 : last2;
  if (next2 < 0) return loop ? last2 : 0;
  if (next2 >= len) return loop ? 0 : idx > len ? len : idx;
  return next2;
}
function next(v, idx, opts = {}) {
  return v[nextIndex(v, idx, opts)];
}
function prevIndex(v, idx, opts = {}) {
  const { step = 1, loop = true } = opts;
  return nextIndex(v, idx, { step: -step, loop });
}
function prev(v, index, opts = {}) {
  return v[prevIndex(v, index, opts)];
}
function chunk(v, size) {
  return v.reduce((rows, value, index) => {
    if (index % size === 0) rows.push([value]);
    else last(rows)?.push(value);
    return rows;
  }, []);
}
function flatArray(arr) {
  return arr.reduce((flat, item) => {
    if (Array.isArray(item)) {
      return flat.concat(flatArray(item));
    }
    return flat.concat(item);
  }, []);
}
function partition(arr, fn) {
  return arr.reduce(
    ([pass, fail], value) => {
      if (fn(value)) pass.push(value);
      else fail.push(value);
      return [pass, fail];
    },
    [[], []]
  );
}



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/chunk-MXGZDBDQ.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/chunk-MXGZDBDQ.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __privateAdd: () => (/* binding */ __privateAdd),
/* harmony export */   __privateGet: () => (/* binding */ __privateGet),
/* harmony export */   __publicField: () => (/* binding */ __publicField)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);




/***/ },

/***/ "./node_modules/@zag-js/utils/dist/equal.mjs"
/*!***************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/equal.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEqual: () => (/* binding */ isEqual)
/* harmony export */ });


// src/equal.ts
var isArrayLike = (value) => value?.constructor.name === "Array";
var isArrayEqual = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!isEqual(a[i], b[i])) return false;
  }
  return true;
};
var isEqual = (a, b) => {
  if (Object.is(a, b)) return true;
  if (a == null && b != null || a != null && b == null) return false;
  if (typeof a?.isEqual === "function" && typeof b?.isEqual === "function") {
    return a.isEqual(b);
  }
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }
  if (isArrayLike(a) && isArrayLike(b)) {
    return isArrayEqual(Array.from(a), Array.from(b));
  }
  if (!(typeof a === "object") || !(typeof b === "object")) return false;
  const keys = Object.keys(b ?? /* @__PURE__ */ Object.create(null));
  const length = keys.length;
  if (Object.keys(a).length !== length) return false;
  for (let i = 0; i < length; i++) {
    const hasKey = Reflect.has(a, keys[i]);
    if (!hasKey) return false;
  }
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (!isEqual(a[key], b[key])) return false;
  }
  return true;
};



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/functions.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/functions.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callAll: () => (/* binding */ callAll),
/* harmony export */   cast: () => (/* binding */ cast),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   identity: () => (/* binding */ identity),
/* harmony export */   match: () => (/* binding */ match),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   runIfFn: () => (/* binding */ runIfFn),
/* harmony export */   throttle: () => (/* binding */ throttle),
/* harmony export */   tryCatch: () => (/* binding */ tryCatch),
/* harmony export */   uuid: () => (/* binding */ uuid)
/* harmony export */ });
/* harmony import */ var _guard_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guard.mjs */ "./node_modules/@zag-js/utils/dist/guard.mjs");


// src/functions.ts

var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast = (v) => v;
var identity = (v) => v();
var noop = () => {
};
var callAll = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};
var uuid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
function match(key, record, ...args) {
  if (key in record) {
    const fn = record[key];
    return (0,_guard_mjs__WEBPACK_IMPORTED_MODULE_0__.isFunction)(fn) ? fn(...args) : fn;
  }
  const error = new Error(`No matching key: ${JSON.stringify(key)} in ${JSON.stringify(Object.keys(record))}`);
  Error.captureStackTrace?.(error, match);
  throw error;
}
var tryCatch = (fn, fallback) => {
  try {
    return fn();
  } catch (error) {
    if (error instanceof Error) {
      Error.captureStackTrace?.(error, tryCatch);
    }
    return fallback?.();
  }
};
function throttle(fn, wait = 0) {
  let lastCall = 0;
  let timeout = null;
  return ((...args) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    if (timeSinceLastCall >= wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      fn(...args);
      lastCall = now;
    } else if (!timeout) {
      timeout = setTimeout(() => {
        fn(...args);
        lastCall = Date.now();
        timeout = null;
      }, wait - timeSinceLastCall);
    }
  });
}
function debounce(fn, wait = 0) {
  let timeout = null;
  return ((...args) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  });
}
var toChar = (code) => String.fromCharCode(code + (code > 25 ? 39 : 97));
function toName(code) {
  let name = "";
  let x;
  for (x = Math.abs(code); x > 52; x = x / 52 | 0) name = toChar(x % 52) + name;
  return toChar(x % 52) + name;
}
function toPhash(h, x) {
  let i = x.length;
  while (i) h = h * 33 ^ x.charCodeAt(--i);
  return h;
}
var hash = (value) => toName(toPhash(5381, value) >>> 0);



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/guard.mjs"
/*!***************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/guard.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasProp: () => (/* binding */ hasProp),
/* harmony export */   isArray: () => (/* binding */ isArray),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isDev: () => (/* binding */ isDev),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isNull: () => (/* binding */ isNull),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isObjectLike: () => (/* binding */ isObjectLike),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isString: () => (/* binding */ isString)
/* harmony export */ });


// src/guard.ts
var isDev = () => "development" !== "production";
var isArray = (v) => Array.isArray(v);
var isBoolean = (v) => v === true || v === false;
var isObjectLike = (v) => v != null && typeof v === "object";
var isObject = (v) => isObjectLike(v) && !isArray(v);
var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
var isString = (v) => typeof v === "string";
var isFunction = (v) => typeof v === "function";
var isNull = (v) => v == null;
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var baseGetTag = (v) => Object.prototype.toString.call(v);
var fnToString = Function.prototype.toString;
var objectCtorString = fnToString.call(Object);
var isPlainObject = (v) => {
  if (!isObjectLike(v) || baseGetTag(v) != "[object Object]" || isFrameworkElement(v)) return false;
  const proto = Object.getPrototypeOf(v);
  if (proto === null) return true;
  const Ctor = hasProp(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString.call(Ctor) == objectCtorString;
};
var isReactElement = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isFrameworkElement = (x) => isReactElement(x) || isVueElement(x);



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/number.mjs"
/*!****************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/number.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clampPercent: () => (/* binding */ clampPercent),
/* harmony export */   clampValue: () => (/* binding */ clampValue),
/* harmony export */   decrementValue: () => (/* binding */ decrementValue),
/* harmony export */   getClosestValue: () => (/* binding */ getClosestValue),
/* harmony export */   getClosestValueIndex: () => (/* binding */ getClosestValueIndex),
/* harmony export */   getMaxValueAtIndex: () => (/* binding */ getMaxValueAtIndex),
/* harmony export */   getMinValueAtIndex: () => (/* binding */ getMinValueAtIndex),
/* harmony export */   getNextStepValue: () => (/* binding */ getNextStepValue),
/* harmony export */   getPercentValue: () => (/* binding */ getPercentValue),
/* harmony export */   getPreviousStepValue: () => (/* binding */ getPreviousStepValue),
/* harmony export */   getValuePercent: () => (/* binding */ getValuePercent),
/* harmony export */   getValueRanges: () => (/* binding */ getValueRanges),
/* harmony export */   getValueSetterAtIndex: () => (/* binding */ getValueSetterAtIndex),
/* harmony export */   getValueTransformer: () => (/* binding */ getValueTransformer),
/* harmony export */   incrementValue: () => (/* binding */ incrementValue),
/* harmony export */   isNaN: () => (/* binding */ isNaN),
/* harmony export */   isValueAtMax: () => (/* binding */ isValueAtMax),
/* harmony export */   isValueAtMin: () => (/* binding */ isValueAtMin),
/* harmony export */   isValueWithinRange: () => (/* binding */ isValueWithinRange),
/* harmony export */   mod: () => (/* binding */ mod),
/* harmony export */   nan: () => (/* binding */ nan),
/* harmony export */   roundToDpr: () => (/* binding */ roundToDpr),
/* harmony export */   roundToStepPrecision: () => (/* binding */ roundToStepPrecision),
/* harmony export */   roundValue: () => (/* binding */ roundValue),
/* harmony export */   setValueAtIndex: () => (/* binding */ setValueAtIndex),
/* harmony export */   snapValueToStep: () => (/* binding */ snapValueToStep),
/* harmony export */   toFixedNumber: () => (/* binding */ toFixedNumber),
/* harmony export */   toPx: () => (/* binding */ toPx),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });


// src/number.ts
var { floor, abs, round, min, max, pow, sign } = Math;
var isNaN = (v) => Number.isNaN(v);
var nan = (v) => isNaN(v) ? 0 : v;
var mod = (v, m) => (v % m + m) % m;
var wrap = (v, vmax) => (v % vmax + vmax) % vmax;
var getMinValueAtIndex = (i, v, vmin) => i === 0 ? vmin : v[i - 1];
var getMaxValueAtIndex = (i, v, vmax) => i === v.length - 1 ? vmax : v[i + 1];
var isValueAtMax = (v, vmax) => nan(v) >= vmax;
var isValueAtMin = (v, vmin) => nan(v) <= vmin;
var isValueWithinRange = (v, vmin, vmax) => {
  const value = nan(v);
  const minCheck = vmin == null || value >= vmin;
  const maxCheck = vmax == null || value <= vmax;
  return minCheck && maxCheck;
};
var roundValue = (v, vmin, step) => round((nan(v) - vmin) / step) * step + vmin;
var clampValue = (v, vmin, vmax) => min(max(nan(v), vmin), vmax);
var clampPercent = (v) => clampValue(v, 0, 1);
var getValuePercent = (v, vmin, vmax) => (nan(v) - vmin) / (vmax - vmin);
var getPercentValue = (p, vmin, vmax, step) => clampValue(roundValue(p * (vmax - vmin) + vmin, vmin, step), vmin, vmax);
var roundToStepPrecision = (v, step) => {
  let rv = v;
  let ss = step.toString();
  let pi = ss.indexOf(".");
  let p = pi >= 0 ? ss.length - pi : 0;
  if (p > 0) {
    let pw = pow(10, p);
    rv = round(rv * pw) / pw;
  }
  return rv;
};
var roundToDpr = (v, dpr) => typeof dpr === "number" ? floor(v * dpr + 0.5) / dpr : round(v);
var snapValueToStep = (v, vmin, vmax, step) => {
  const min2 = vmin != null ? Number(vmin) : 0;
  const max2 = Number(vmax);
  const remainder = (v - min2) % step;
  let snapped = abs(remainder) * 2 >= step ? v + sign(remainder) * (step - abs(remainder)) : v - remainder;
  snapped = roundToStepPrecision(snapped, step);
  if (!isNaN(min2) && snapped < min2) {
    snapped = min2;
  } else if (!isNaN(max2) && snapped > max2) {
    const stepsInRange = floor((max2 - min2) / step);
    const largestValidStep = min2 + stepsInRange * step;
    snapped = stepsInRange <= 0 || largestValidStep < min2 ? max2 : largestValidStep;
  }
  return roundToStepPrecision(snapped, step);
};
var setValueAtIndex = (vs, i, v) => {
  if (vs[i] === v) return vs;
  return [...vs.slice(0, i), v, ...vs.slice(i + 1)];
};
function getValueSetterAtIndex(index, ctx) {
  const minValueAtIndex = getMinValueAtIndex(index, ctx.values, ctx.min);
  const maxValueAtIndex = getMaxValueAtIndex(index, ctx.values, ctx.max);
  let nextValues = ctx.values.slice();
  return function setValue(value) {
    let nextValue = snapValueToStep(value, minValueAtIndex, maxValueAtIndex, ctx.step);
    nextValues = setValueAtIndex(nextValues, index, value);
    nextValues[index] = nextValue;
    return nextValues;
  };
}
function getNextStepValue(index, ctx) {
  const nextValue = ctx.values[index] + ctx.step;
  return getValueSetterAtIndex(index, ctx)(nextValue);
}
function getPreviousStepValue(index, ctx) {
  const nextValue = ctx.values[index] - ctx.step;
  return getValueSetterAtIndex(index, ctx)(nextValue);
}
var getClosestValueIndex = (vs, t) => {
  let i = vs.findIndex((v) => t - v < 0);
  if (i === 0) return i;
  if (i === -1) return vs.length - 1;
  let vLeft = vs[i - 1];
  let vRight = vs[i];
  if (abs(vLeft - t) < abs(vRight - t)) return i - 1;
  return i;
};
var getClosestValue = (vs, t) => vs[getClosestValueIndex(vs, t)];
var getValueRanges = (vs, vmin, vmax, gap) => vs.map((v, i) => ({
  min: i === 0 ? vmin : vs[i - 1] + gap,
  max: i === vs.length - 1 ? vmax : vs[i + 1] - gap,
  value: v
}));
var getValueTransformer = (va, vb) => {
  const [a, b] = va;
  const [c, d] = vb;
  return (v) => a === b || c === d ? c : c + (d - c) / (b - a) * (v - a);
};
var toFixedNumber = (v, d = 0, b = 10) => {
  const pow2 = Math.pow(b, d);
  return round(v * pow2) / pow2;
};
var countDecimals = (value) => {
  if (!Number.isFinite(value)) return 0;
  let e = 1, p = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p += 1;
  }
  return p;
};
var decimalOp = (a, op, b) => {
  let result = op === "+" ? a + b : a - b;
  if (a % 1 !== 0 || b % 1 !== 0) {
    const multiplier = 10 ** Math.max(countDecimals(a), countDecimals(b));
    a = Math.round(a * multiplier);
    b = Math.round(b * multiplier);
    result = op === "+" ? a + b : a - b;
    result /= multiplier;
  }
  return result;
};
var incrementValue = (v, s) => decimalOp(nan(v), "+", s);
var decrementValue = (v, s) => decimalOp(nan(v), "-", s);
var toPx = (v) => typeof v === "number" ? `${v}px` : v;



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/object.mjs"
/*!****************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/object.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compact: () => (/* binding */ compact),
/* harmony export */   createSplitProps: () => (/* binding */ createSplitProps),
/* harmony export */   json: () => (/* binding */ json),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   mergeWithDefault: () => (/* binding */ mergeWithDefault),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   splitProps: () => (/* binding */ splitProps)
/* harmony export */ });
/* harmony import */ var _guard_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guard.mjs */ "./node_modules/@zag-js/utils/dist/guard.mjs");


// src/object.ts

function compact(obj) {
  if (!(0,_guard_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(obj) || obj === void 0) return obj;
  const keys2 = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys2) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact(value);
    }
  }
  return filtered;
}
var json = (v) => JSON.parse(JSON.stringify(v));
var keys = (obj) => Object.keys(obj);
function pick(obj, keys2) {
  const filtered = {};
  for (const key of keys2) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = value;
    }
  }
  return filtered;
}
function splitProps(props, keys2) {
  const rest = {};
  const result = {};
  const keySet = new Set(keys2);
  const ownKeys = Reflect.ownKeys(props);
  for (const key of ownKeys) {
    if (keySet.has(key)) {
      result[key] = props[key];
    } else {
      rest[key] = props[key];
    }
  }
  return [result, rest];
}
var createSplitProps = (keys2) => {
  return function split(props) {
    return splitProps(props, keys2);
  };
};
function omit(obj, keys2) {
  return createSplitProps(keys2)(obj)[1];
}
function mergeWithDefault(defaults, overrides) {
  if (!overrides) return defaults;
  const result = { ...defaults };
  const source = overrides;
  for (const key in source) {
    const value = source[key];
    if (value !== void 0) result[key] = value;
  }
  return result;
}



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/store.mjs"
/*!***************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/store.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStore: () => (/* binding */ createStore)
/* harmony export */ });


// src/store.ts
function createStore(initialState, compare = Object.is) {
  let state = { ...initialState };
  const listeners = /* @__PURE__ */ new Set();
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const publish = () => {
    listeners.forEach((listener) => listener());
  };
  const get = (key) => {
    return state[key];
  };
  const set = (key, value) => {
    if (!compare(state[key], value)) {
      state[key] = value;
      publish();
    }
  };
  const update = (updates) => {
    let hasChanges = false;
    for (const key in updates) {
      const value = updates[key];
      if (value !== void 0 && !compare(state[key], value)) {
        state[key] = value;
        hasChanges = true;
      }
    }
    if (hasChanges) {
      publish();
    }
  };
  const snapshot = () => ({ ...state });
  return {
    subscribe,
    get,
    set,
    update,
    snapshot
  };
}



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/timers.mjs"
/*!****************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/timers.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Timer: () => (/* binding */ Timer),
/* harmony export */   setRafInterval: () => (/* binding */ setRafInterval),
/* harmony export */   setRafTimeout: () => (/* binding */ setRafTimeout)
/* harmony export */ });
/* harmony import */ var _chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-MXGZDBDQ.mjs */ "./node_modules/@zag-js/utils/dist/chunk-MXGZDBDQ.mjs");


// src/timers.ts
var currentTime = () => performance.now();
var _tick;
var Timer = class {
  constructor(onTick) {
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "onTick", onTick);
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "frameId", null);
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "pausedAtMs", null);
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "context");
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "cancelFrame", () => {
      if (this.frameId === null) return;
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    });
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "setStartMs", (startMs) => {
      this.context.startMs = startMs;
    });
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "start", () => {
      if (this.frameId !== null) return;
      const now = currentTime();
      if (this.pausedAtMs !== null) {
        this.context.startMs += now - this.pausedAtMs;
        this.pausedAtMs = null;
      } else {
        this.context.startMs = now;
      }
      this.frameId = requestAnimationFrame((0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__privateGet)(this, _tick));
    });
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "pause", () => {
      if (this.frameId === null) return;
      this.cancelFrame();
      this.pausedAtMs = currentTime();
    });
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "stop", () => {
      if (this.frameId === null) return;
      this.cancelFrame();
      this.pausedAtMs = null;
    });
    (0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__privateAdd)(this, _tick, (now) => {
      this.context.now = now;
      this.context.deltaMs = now - this.context.startMs;
      const shouldContinue = this.onTick(this.context);
      if (shouldContinue === false) {
        this.stop();
        return;
      }
      this.frameId = requestAnimationFrame((0,_chunk_MXGZDBDQ_mjs__WEBPACK_IMPORTED_MODULE_0__.__privateGet)(this, _tick));
    });
    this.context = { now: 0, startMs: currentTime(), deltaMs: 0 };
  }
  get elapsedMs() {
    if (this.pausedAtMs !== null) {
      return this.pausedAtMs - this.context.startMs;
    }
    return currentTime() - this.context.startMs;
  }
};
_tick = new WeakMap();
function setRafInterval(fn, intervalMs) {
  const timer = new Timer(({ now, deltaMs }) => {
    if (deltaMs >= intervalMs) {
      const startMs = intervalMs > 0 ? now - deltaMs % intervalMs : now;
      timer.setStartMs(startMs);
      fn({ startMs, deltaMs });
    }
  });
  timer.start();
  return () => timer.stop();
}
function setRafTimeout(fn, delayMs) {
  const timer = new Timer(({ deltaMs }) => {
    if (deltaMs >= delayMs) {
      fn();
      return false;
    }
  });
  timer.start();
  return () => timer.stop();
}



/***/ },

/***/ "./node_modules/@zag-js/utils/dist/warning.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/@zag-js/utils/dist/warning.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensure: () => (/* binding */ ensure),
/* harmony export */   ensureProps: () => (/* binding */ ensureProps),
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   warn: () => (/* binding */ warn)
/* harmony export */ });


// src/warning.ts
function warn(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && "development" !== "production") {
    console.warn(m);
  }
}
function invariant(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && "development" !== "production") {
    throw new Error(m);
  }
}
function ensure(c, m) {
  if (c == null) throw new Error(m());
}
function ensureProps(props, keys, scope) {
  let missingKeys = [];
  for (const key of keys) {
    if (props[key] == null) missingKeys.push(key);
  }
  if (missingKeys.length > 0)
    throw new Error(`[zag-js${scope ? ` > ${scope}` : ""}] missing required props: ${missingKeys.join(", ")}`);
}



/***/ },

/***/ "./node_modules/clsx/dist/clsx.mjs"
/*!*****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.mjs ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ },

/***/ "./node_modules/lucide-react/dist/esm/Icon.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/Icon.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _shared_src_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/src/utils/mergeClasses.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs");
/* harmony import */ var _shared_src_build_buildLucideIconForReact_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/build/buildLucideIconForReact.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs");
/* harmony import */ var _shared_src_utils_hasA11yProp_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/src/utils/hasA11yProp.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs");
/* harmony import */ var _context_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context.mjs */ "./node_modules/lucide-react/dist/esm/context.mjs");

"use client";
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */







const Icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
  ({
    color,
    size,
    width,
    height,
    strokeWidth,
    absoluteStrokeWidth,
    nonScalingStroke,
    className = "",
    children,
    iconNode = [],
    icon = {
      node: iconNode,
      aliases: [],
      size: 24
    },
    ...rest
  }, ref) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      nonScalingStroke: contextNonScalingStroke = false,
      color: contextColor = "currentColor",
      className: contextClass = ""
    } = (0,_context_mjs__WEBPACK_IMPORTED_MODULE_4__.useLucideContext)() ?? {};
    const hasAccessibleProp = Boolean(children) || (0,_shared_src_utils_hasA11yProp_mjs__WEBPACK_IMPORTED_MODULE_3__.hasA11yProp)(rest);
    const [name, svgAttributes, builtIconNode = []] = (0,_shared_src_build_buildLucideIconForReact_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])(icon, {
      color: color ?? contextColor,
      width: width ?? size ?? contextSize,
      height: height ?? size ?? contextSize,
      strokeWidth: strokeWidth ?? contextStrokeWidth,
      absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
      nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
      className: (0,_shared_src_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__.mergeClasses)(contextClass, className),
      hasA11yProp: hasAccessibleProp,
      attributes: rest
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
      name,
      {
        ref,
        ...svgAttributes
      },
      [
        ...builtIconNode.map(([tag, attrs]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);


//# sourceMappingURL=Icon.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/context.mjs"
/*!********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/context.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LucideProvider: () => (/* binding */ LucideProvider),
/* harmony export */   useLucideContext: () => (/* binding */ useLucideContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

"use client";
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const LucideContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
function LucideProvider({
  children,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  nonScalingStroke,
  className
}) {
  const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(
    () => ({
      size,
      color,
      strokeWidth,
      absoluteStrokeWidth,
      nonScalingStroke,
      className
    }),
    [size, color, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className]
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(LucideContext.Provider, { value }, children);
}
const useLucideContext = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(LucideContext);


//# sourceMappingURL=context.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/createLucideIcon.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createLucideIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _shared_src_utils_toLucideIconData_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/src/utils/toLucideIconData.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs");
/* harmony import */ var _shared_src_utils_toPascalCase_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils/toPascalCase.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs");
/* harmony import */ var _Icon_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Icon.mjs */ "./node_modules/lucide-react/dist/esm/Icon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */






function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
  const iconData = typeof iconDataOrName === "string" ? (0,_shared_src_utils_toLucideIconData_mjs__WEBPACK_IMPORTED_MODULE_1__.toLucideIconData)(iconDataOrName, iconNode, aliases) : iconDataOrName;
  const Component = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
    ({ className, ...props }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_mjs__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ref,
      icon: iconData,
      className,
      ...props
    })
  );
  if (iconData.name) {
    Component.displayName = (0,_shared_src_utils_toPascalCase_mjs__WEBPACK_IMPORTED_MODULE_2__.toPascalCase)(iconData.name);
  }
  return Component;
}


//# sourceMappingURL=createLucideIcon.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ ArrowUpRight)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "arrow-up-right",
  size: 24,
  node: [
    ["path", { d: "M7 7h10v10", key: "1tivn9" }],
    ["path", { d: "M7 17 17 7", key: "1vkiza" }]
  ]
};
__iconData.node;
const ArrowUpRight = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=arrow-up-right.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/check.mjs"
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/check.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ Check)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
__iconData.node;
const Check = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=check.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-down.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-down.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ ChevronDown)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
__iconData.node;
const ChevronDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=chevron-down.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-up.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-up.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ ChevronUp)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "chevron-up",
  size: 24,
  node: [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]
};
__iconData.node;
const ChevronUp = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=chevron-up.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/circle-check.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/circle-check.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ CircleCheck)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "circle-check",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m16 9-5.5 5.5L8 12", key: "xofnsj" }]
  ],
  aliases: ["check-circle-2"]
};
__iconData.node;
const CircleCheck = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=circle-check.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/circle-x.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/circle-x.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ CircleX)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "circle-x",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }]
  ],
  aliases: ["x-circle"]
};
__iconData.node;
const CircleX = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=circle-x.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/code-xml.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/code-xml.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ CodeXml)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "code-xml",
  size: 24,
  node: [
    ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
    ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
    ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
  ],
  aliases: ["code-2"]
};
__iconData.node;
const CodeXml = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=code-xml.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/flask-conical.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/flask-conical.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ FlaskConical)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "flask-conical",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
        key: "18mbvz"
      }
    ],
    ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
    ["path", { d: "M8.5 2h7", key: "csnxdl" }]
  ]
};
__iconData.node;
const FlaskConical = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=flask-conical.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/info.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/info.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ Info)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "info",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]
};
__iconData.node;
const Info = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=info.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/loader-circle.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/loader-circle.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ LoaderCircle)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
__iconData.node;
const LoaderCircle = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=loader-circle.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/lock.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/lock.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ Lock)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "lock",
  size: 24,
  node: [
    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
  ]
};
__iconData.node;
const Lock = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=lock.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/puzzle.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/puzzle.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ Puzzle)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "puzzle",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
        key: "w46dr5"
      }
    ]
  ]
};
__iconData.node;
const Puzzle = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=puzzle.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/search.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/search.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ Search)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
__iconData.node;
const Search = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=search.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/sparkles.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/sparkles.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ Sparkles)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "sparkles",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr"
      }
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
  ],
  aliases: ["stars"]
};
__iconData.node;
const Sparkles = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=sparkles.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ TriangleAlert)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "triangle-alert",
  size: 24,
  node: [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
      }
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ],
  aliases: ["alert-triangle"]
};
__iconData.node;
const TriangleAlert = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=triangle-alert.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/x.mjs"
/*!********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/x.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconData: () => (/* binding */ __iconData),
/* harmony export */   "default": () => (/* binding */ X)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.mjs */ "./node_modules/lucide-react/dist/esm/createLucideIcon.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconData = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
__iconData.node;
const X = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(__iconData);


//# sourceMappingURL=x.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs"
/*!*****************************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs ***!
  \*****************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildLucideIconForReact)
/* harmony export */ });
/* harmony import */ var _buildLucideIconNode_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildLucideIconNode.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



function buildLucideIconForReact(icon, params = {}) {
  return (0,_buildLucideIconNode_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(icon, {
    ...params,
    attributeNames: {
      ...params.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}


//# sourceMappingURL=buildLucideIconForReact.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs"
/*!*************************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildLucideIconNode)
/* harmony export */ });
/* harmony import */ var _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultAttributes.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs");
/* harmony import */ var _utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/mergeClasses.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




function isDefined(value) {
  return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
  const attributeNames = params.attributeNames ?? {};
  const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
  const viewBoxWidth = icon.size ?? icon.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]["width"];
  const viewBoxHeight = icon.size ?? icon.height ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]["height"];
  const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
  const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
  const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
  const className = params.includeDefaultClasses === false ? (0,_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__.mergeClasses)(...classNamesFromClassName) : (0,_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__.mergeClasses)("lucide", ...iconClassNames, ...classNamesFromClassName);
  const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]["stroke-width"]) * Number(icon.size ?? icon.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]["width"]) / Number(params.size ?? params.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]["width"]) : params.strokeWidth ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]["stroke-width"];
  const attributes = {
    ...Object.entries(_defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]).reduce((attrs, [attrName, value]) => {
      attrs[getAttributeName(attrName)] = value;
      return attrs;
    }, {}),
    ..."color" in params && params.color && {
      [getAttributeName("stroke")]: params.color
    },
    ..."size" in params && isDefined(params.size) && {
      [getAttributeName("width")]: params.size,
      [getAttributeName("height")]: params.size
    },
    ..."width" in params && isDefined(params.width) && {
      [getAttributeName("width")]: params.width
    },
    ..."height" in params && isDefined(params.height) && {
      [getAttributeName("height")]: params.height
    },
    [getAttributeName("stroke-width")]: calculatedStrokeWidth,
    ...className && {
      [getAttributeName("class")]: className
    },
    [getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    ...params.hasA11yProp === false ? {
      [getAttributeName("aria-hidden")]: "true"
    } : {},
    ..."attributes" in params && params.attributes
  };
  return [
    "svg",
    attributes,
    icon.node.map((child) => {
      const [name, attrs, children] = child;
      const nextAttrs = params.nonScalingStroke ? { [getAttributeName("vector-effect")]: "non-scaling-stroke", ...attrs } : attrs;
      return children ? [name, nextAttrs, children] : [name, nextAttrs];
    })
  ];
}


//# sourceMappingURL=buildLucideIconNode.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};


//# sourceMappingURL=defaultAttributes.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasA11yProp: () => (/* binding */ hasA11yProp)
/* harmony export */ });
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};


//# sourceMappingURL=hasA11yProp.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeClasses: () => (/* binding */ mergeClasses)
/* harmony export */ });
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();


//# sourceMappingURL=mergeClasses.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase)
/* harmony export */ });
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toCamelCase = (string) => {
  let out = "";
  let upperNext = false;
  for (const ch of string) {
    if (ch === "-" || ch === "_" || ch <= " ") {
      upperNext = out.length > 0;
      continue;
    }
    if (out.length === 0) {
      out += ch.toLowerCase();
    } else {
      out += upperNext ? ch.toUpperCase() : ch;
    }
    upperNext = false;
  }
  return out;
};


//# sourceMappingURL=toCamelCase.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase)
/* harmony export */ });
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();


//# sourceMappingURL=toKebabCase.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs"
/*!**********************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toLucideIconData: () => (/* binding */ toLucideIconData)
/* harmony export */ });
/* harmony import */ var _toKebabCase_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toKebabCase.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



function toLucideIconData(iconName, iconNode, aliases = []) {
  if (iconNode == null) {
    throw new Error("[lucide]: iconNode is required when icon name is used");
  }
  return {
    name: (0,_toKebabCase_mjs__WEBPACK_IMPORTED_MODULE_0__.toKebabCase)(iconName),
    size: 24,
    node: iconNode,
    ...aliases.length > 0 ? { aliases } : {}
  };
}


//# sourceMappingURL=toLucideIconData.mjs.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toPascalCase: () => (/* binding */ toPascalCase)
/* harmony export */ });
/* harmony import */ var _toCamelCase_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toCamelCase.mjs */ "./node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs");
/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const toPascalCase = (string) => {
  const camelCase = (0,_toCamelCase_mjs__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};


//# sourceMappingURL=toPascalCase.mjs.map


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************************************************************!*\
  !*** ./src/advanced-custom-fields-pro/src/Settings_Page/js/_acf-settings.tsx ***!
  \*******************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SettingsApp_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingsApp.tsx */ "./src/advanced-custom-fields-pro/src/Settings_Page/js/SettingsApp.tsx");
/**
 * Free settings page entry. PRO loads _acf-pro-settings.tsx instead, which adds the License and Updates tabs.
 */

(0,_SettingsApp_tsx__WEBPACK_IMPORTED_MODULE_0__.mountSettingsApp)();
})();

/******/ })()
;
//# sourceMappingURL=acf-settings.js.map