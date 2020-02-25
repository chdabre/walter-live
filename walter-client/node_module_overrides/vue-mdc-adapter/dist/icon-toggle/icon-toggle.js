/**
* @module vue-mdc-adaptericon-toggle 0.17.0
* @exports VueMDCIconToggle
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCIconToggle = factory());
}(this, (function () { 'use strict';

    function autoInit(plugin) {
      // Auto-install
      var _Vue = null;
      if (typeof window !== 'undefined') {
        _Vue = window.Vue;
      } else if (typeof global !== 'undefined') {
        /*global global*/
        _Vue = global.Vue;
      }
      if (_Vue) {
        _Vue.use(plugin);
      }
    }

    function BasePlugin(components) {
      return {
        version: '0.17.0',
        install: function install(vm) {
          for (var key in components) {
            var component = components[key];
            vm.component(component.name, component);
          }
        },
        components: components
      };
    }

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    /* global CustomEvent */

    var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @template A
     */
    var MDCFoundation = function () {
      createClass(MDCFoundation, null, [{
        key: "cssClasses",

        /** @return enum{cssClasses} */
        get: function get$$1() {
          // Classes extending MDCFoundation should implement this method to return an object which exports every
          // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
          return {};
        }

        /** @return enum{strings} */

      }, {
        key: "strings",
        get: function get$$1() {
          // Classes extending MDCFoundation should implement this method to return an object which exports all
          // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
          return {};
        }

        /** @return enum{numbers} */

      }, {
        key: "numbers",
        get: function get$$1() {
          // Classes extending MDCFoundation should implement this method to return an object which exports all
          // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
          return {};
        }

        /** @return {!Object} */

      }, {
        key: "defaultAdapter",
        get: function get$$1() {
          // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
          // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
          // validation.
          return {};
        }

        /**
         * @param {A=} adapter
         */

      }]);

      function MDCFoundation() {
        var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, MDCFoundation);

        /** @protected {!A} */
        this.adapter_ = adapter;
      }

      createClass(MDCFoundation, [{
        key: "init",
        value: function init() {
          // Subclasses should override this method to perform initialization routines (registering events, etc.)
        }
      }, {
        key: "destroy",
        value: function destroy() {
          // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
        }
      }]);
      return MDCFoundation;
    }();

    /**
     * @license
     * Copyright 2017 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /* eslint no-unused-vars: [2, {"args": "none"}] */

    /**
     * Adapter for MDC Icon Toggle. Provides an interface for managing
     * - classes
     * - dom
     * - inner text
     * - event handlers
     * - event dispatch
     *
     * Additionally, provides type information for the adapter to the Closure
     * compiler.
     *
     * Implement this adapter for your framework of choice to delegate updates to
     * the component in your framework of choice. See architecture documentation
     * for more details.
     * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
     *
     * @record
     */

    var MDCIconToggleAdapter = function () {
      function MDCIconToggleAdapter() {
        classCallCheck(this, MDCIconToggleAdapter);
      }

      createClass(MDCIconToggleAdapter, [{
        key: "addClass",

        /** @param {string} className */
        value: function addClass(className) {}

        /** @param {string} className */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * @param {string} type
         * @param {!EventListener} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(type, handler) {}

        /**
         * @param {string} type
         * @param {!EventListener} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(type, handler) {}

        /** @param {string} text */

      }, {
        key: "setText",
        value: function setText(text) {}

        /** @return {number} */

      }, {
        key: "getTabIndex",
        value: function getTabIndex() {}

        /** @param {number} tabIndex */

      }, {
        key: "setTabIndex",
        value: function setTabIndex(tabIndex) {}

        /**
         * @param {string} name
         * @return {string}
         */

      }, {
        key: "getAttr",
        value: function getAttr(name) {}

        /**
         * @param {string} name
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(name, value) {}

        /** @param {string} name */

      }, {
        key: "rmAttr",
        value: function rmAttr(name) {}

        /** @param {!IconToggleEvent} evtData */

      }, {
        key: "notifyChange",
        value: function notifyChange(evtData) {}
      }]);
      return MDCIconToggleAdapter;
    }();

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /** @enum {string} */
    var cssClasses = {
      ROOT: 'mdc-icon-toggle',
      DISABLED: 'mdc-icon-toggle--disabled'
    };

    /** @enum {string} */
    var strings = {
      DATA_TOGGLE_ON: 'data-toggle-on',
      DATA_TOGGLE_OFF: 'data-toggle-off',
      ARIA_PRESSED: 'aria-pressed',
      ARIA_DISABLED: 'aria-disabled',
      ARIA_LABEL: 'aria-label',
      CHANGE_EVENT: 'MDCIconToggle:change'
    };

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @extends {MDCFoundation<!MDCIconToggleAdapter>}
     */

    var MDCIconToggleFoundation = function (_MDCFoundation) {
      inherits(MDCIconToggleFoundation, _MDCFoundation);
      createClass(MDCIconToggleFoundation, null, [{
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings;
        }
      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return {
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
            setText: function setText() /* text: string */{},
            getTabIndex: function getTabIndex() {
              return (/* number */0
              );
            },
            setTabIndex: function setTabIndex() /* tabIndex: number */{},
            getAttr: function getAttr() {
              return (/* name: string */ /* string */''
              );
            },
            setAttr: function setAttr() /* name: string, value: string */{},
            rmAttr: function rmAttr() /* name: string */{},
            notifyChange: function notifyChange() /* evtData: IconToggleEvent */{}
          };
        }
      }]);

      function MDCIconToggleFoundation(adapter) {
        classCallCheck(this, MDCIconToggleFoundation);

        /** @private {boolean} */
        var _this = possibleConstructorReturn(this, (MDCIconToggleFoundation.__proto__ || Object.getPrototypeOf(MDCIconToggleFoundation)).call(this, _extends(MDCIconToggleFoundation.defaultAdapter, adapter)));

        _this.on_ = false;

        /** @private {boolean} */
        _this.disabled_ = false;

        /** @private {number} */
        _this.savedTabIndex_ = -1;

        /** @private {?IconToggleState} */
        _this.toggleOnData_ = null;

        /** @private {?IconToggleState} */
        _this.toggleOffData_ = null;

        _this.clickHandler_ = /** @private {!EventListener} */function () {
          return _this.toggleFromEvt_();
        };

        /** @private {boolean} */
        _this.isHandlingKeydown_ = false;

        _this.keydownHandler_ = /** @private {!EventListener} */function ( /** @type {!KeyboardKey} */evt) {
          if (isSpace(evt)) {
            _this.isHandlingKeydown_ = true;
            return evt.preventDefault();
          }
        };

        _this.keyupHandler_ = /** @private {!EventListener} */function ( /** @type {!KeyboardKey} */evt) {
          if (isSpace(evt)) {
            _this.isHandlingKeydown_ = false;
            _this.toggleFromEvt_();
          }
        };
        return _this;
      }

      createClass(MDCIconToggleFoundation, [{
        key: 'init',
        value: function init() {
          this.refreshToggleData();
          this.savedTabIndex_ = this.adapter_.getTabIndex();
          this.adapter_.registerInteractionHandler('click', this.clickHandler_);
          this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
          this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
        }
      }, {
        key: 'refreshToggleData',
        value: function refreshToggleData() {
          var _MDCIconToggleFoundat = MDCIconToggleFoundation.strings,
              DATA_TOGGLE_ON = _MDCIconToggleFoundat.DATA_TOGGLE_ON,
              DATA_TOGGLE_OFF = _MDCIconToggleFoundat.DATA_TOGGLE_OFF;

          this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
          this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
          this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
          this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
        }

        /** @private */

      }, {
        key: 'toggleFromEvt_',
        value: function toggleFromEvt_() {
          this.toggle();
          var isOn = this.on_;

          this.adapter_.notifyChange( /** @type {!IconToggleEvent} */{ isOn: isOn });
        }

        /** @return {boolean} */

      }, {
        key: 'isOn',
        value: function isOn() {
          return this.on_;
        }

        /** @param {boolean=} isOn */

      }, {
        key: 'toggle',
        value: function toggle() {
          var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.on_;

          this.on_ = isOn;

          var _MDCIconToggleFoundat2 = MDCIconToggleFoundation.strings,
              ARIA_LABEL = _MDCIconToggleFoundat2.ARIA_LABEL,
              ARIA_PRESSED = _MDCIconToggleFoundat2.ARIA_PRESSED;


          if (this.on_) {
            this.adapter_.setAttr(ARIA_PRESSED, 'true');
          } else {
            this.adapter_.setAttr(ARIA_PRESSED, 'false');
          }

          var _ref = this.on_ ? this.toggleOffData_ : this.toggleOnData_,
              classToRemove = _ref.cssClass;

          if (classToRemove) {
            this.adapter_.removeClass(classToRemove);
          }

          var _ref2 = this.on_ ? this.toggleOnData_ : this.toggleOffData_,
              content = _ref2.content,
              label = _ref2.label,
              cssClass = _ref2.cssClass;

          if (cssClass) {
            this.adapter_.addClass(cssClass);
          }
          if (content) {
            this.adapter_.setText(content);
          }
          if (label) {
            this.adapter_.setAttr(ARIA_LABEL, label);
          }
        }

        /**
         * @param {string} dataAttr
         * @return {!IconToggleState}
         */

      }, {
        key: 'parseJsonDataAttr_',
        value: function parseJsonDataAttr_(dataAttr) {
          var val = this.adapter_.getAttr(dataAttr);
          if (!val) {
            return {};
          }
          return (/** @type {!IconToggleState} */JSON.parse(val)
          );
        }

        /** @return {boolean} */

      }, {
        key: 'isDisabled',
        value: function isDisabled() {
          return this.disabled_;
        }

        /** @param {boolean} isDisabled */

      }, {
        key: 'setDisabled',
        value: function setDisabled(isDisabled) {
          this.disabled_ = isDisabled;

          var DISABLED = MDCIconToggleFoundation.cssClasses.DISABLED;
          var ARIA_DISABLED = MDCIconToggleFoundation.strings.ARIA_DISABLED;


          if (this.disabled_) {
            this.savedTabIndex_ = this.adapter_.getTabIndex();
            this.adapter_.setTabIndex(-1);
            this.adapter_.setAttr(ARIA_DISABLED, 'true');
            this.adapter_.addClass(DISABLED);
          } else {
            this.adapter_.setTabIndex(this.savedTabIndex_);
            this.adapter_.rmAttr(ARIA_DISABLED);
            this.adapter_.removeClass(DISABLED);
          }
        }

        /** @return {boolean} */

      }, {
        key: 'isKeyboardActivated',
        value: function isKeyboardActivated() {
          return this.isHandlingKeydown_;
        }
      }]);
      return MDCIconToggleFoundation;
    }(MDCFoundation);

    /**
     * @param {!KeyboardKey} keyboardKey
     * @return {boolean}
     */
    function isSpace(keyboardKey) {
      return keyboardKey.key === 'Space' || keyboardKey.keyCode === 32;
    }

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /* eslint no-unused-vars: [2, {"args": "none"}] */

    /**
     * Adapter for MDC Ripple. Provides an interface for managing
     * - classes
     * - dom
     * - CSS variables
     * - position
     * - dimensions
     * - scroll position
     * - event handlers
     * - unbounded, active and disabled states
     *
     * Additionally, provides type information for the adapter to the Closure
     * compiler.
     *
     * Implement this adapter for your framework of choice to delegate updates to
     * the component in your framework of choice. See architecture documentation
     * for more details.
     * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
     *
     * @record
     */
    var MDCRippleAdapter = function () {
      function MDCRippleAdapter() {
        classCallCheck(this, MDCRippleAdapter);
      }

      createClass(MDCRippleAdapter, [{
        key: "browserSupportsCssVars",

        /** @return {boolean} */
        value: function browserSupportsCssVars() {}

        /** @return {boolean} */

      }, {
        key: "isUnbounded",
        value: function isUnbounded() {}

        /** @return {boolean} */

      }, {
        key: "isSurfaceActive",
        value: function isSurfaceActive() {}

        /** @return {boolean} */

      }, {
        key: "isSurfaceDisabled",
        value: function isSurfaceDisabled() {}

        /** @param {string} className */

      }, {
        key: "addClass",
        value: function addClass(className) {}

        /** @param {string} className */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /** @param {!EventTarget} target */

      }, {
        key: "containsEventTarget",
        value: function containsEventTarget(target) {}

        /**
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(evtType, handler) {}

        /**
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: "registerDocumentInteractionHandler",
        value: function registerDocumentInteractionHandler(evtType, handler) {}

        /**
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: "deregisterDocumentInteractionHandler",
        value: function deregisterDocumentInteractionHandler(evtType, handler) {}

        /**
         * @param {!Function} handler
         */

      }, {
        key: "registerResizeHandler",
        value: function registerResizeHandler(handler) {}

        /**
         * @param {!Function} handler
         */

      }, {
        key: "deregisterResizeHandler",
        value: function deregisterResizeHandler(handler) {}

        /**
         * @param {string} varName
         * @param {?number|string} value
         */

      }, {
        key: "updateCssVariable",
        value: function updateCssVariable(varName, value) {}

        /** @return {!ClientRect} */

      }, {
        key: "computeBoundingRect",
        value: function computeBoundingRect() {}

        /** @return {{x: number, y: number}} */

      }, {
        key: "getWindowPageOffset",
        value: function getWindowPageOffset() {}
      }]);
      return MDCRippleAdapter;
    }();

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var cssClasses$1 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings$1 = {
      VAR_LEFT: '--mdc-ripple-left',
      VAR_TOP: '--mdc-ripple-top',
      VAR_FG_SIZE: '--mdc-ripple-fg-size',
      VAR_FG_SCALE: '--mdc-ripple-fg-scale',
      VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
      VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
    };

    var numbers = {
      PADDING: 10,
      INITIAL_ORIGIN_SCALE: 0.6,
      DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
      FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
      TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
    };

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
     * @private {boolean|undefined}
     */
    var supportsCssVariables_ = void 0;

    /**
     * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
     * @private {boolean|undefined}
     */
    var supportsPassive_$1 = void 0;

    /**
     * @param {!Window} windowObj
     * @return {boolean}
     */
    function detectEdgePseudoVarBug(windowObj) {
      // Detect versions of Edge with buggy var() support
      // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
      var document = windowObj.document;
      var node = document.createElement('div');
      node.className = 'mdc-ripple-surface--test-edge-var-bug';
      document.body.appendChild(node);

      // The bug exists if ::before style ends up propagating to the parent element.
      // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
      // but Firefox is known to support CSS custom properties correctly.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      var computedStyle = windowObj.getComputedStyle(node);
      var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
      node.remove();
      return hasPseudoVarBug;
    }

    /**
     * @param {!Window} windowObj
     * @param {boolean=} forceRefresh
     * @return {boolean|undefined}
     */

    function supportsCssVariables(windowObj) {
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var supportsCssVariables = supportsCssVariables_;
      if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
        return supportsCssVariables;
      }

      var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
      if (!supportsFunctionPresent) {
        return;
      }

      var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
      // See: https://bugs.webkit.org/show_bug.cgi?id=154669
      // See: README section on Safari
      var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

      if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
        supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
      } else {
        supportsCssVariables = false;
      }

      if (!forceRefresh) {
        supportsCssVariables_ = supportsCssVariables;
      }
      return supportsCssVariables;
    }

    //
    /**
     * Determine whether the current browser supports passive event listeners, and if so, use them.
     * @param {!Window=} globalObj
     * @param {boolean=} forceRefresh
     * @return {boolean|{passive: boolean}}
     */
    function applyPassive$1() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (supportsPassive_$1 === undefined || forceRefresh) {
        var isSupported = false;
        try {
          globalObj.document.addEventListener('test', null, { get passive() {
              isSupported = true;
            } });
        } catch (e) {}

        supportsPassive_$1 = isSupported;
      }

      return supportsPassive_$1 ? { passive: true } : false;
    }

    /**
     * @param {!Object} HTMLElementPrototype
     * @return {!Array<string>}
     */
    function getMatchesProperty(HTMLElementPrototype) {
      return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
        return p in HTMLElementPrototype;
      }).pop();
    }

    /**
     * @param {!Event} ev
     * @param {{x: number, y: number}} pageOffset
     * @param {!ClientRect} clientRect
     * @return {{x: number, y: number}}
     */
    function getNormalizedEventCoords(ev, pageOffset, clientRect) {
      var x = pageOffset.x,
          y = pageOffset.y;

      var documentX = x + clientRect.left;
      var documentY = y + clientRect.top;

      var normalizedX = void 0;
      var normalizedY = void 0;
      // Determine touch point relative to the ripple container.
      if (ev.type === 'touchstart') {
        normalizedX = ev.changedTouches[0].pageX - documentX;
        normalizedY = ev.changedTouches[0].pageY - documentY;
      } else {
        normalizedX = ev.pageX - documentX;
        normalizedY = ev.pageY - documentY;
      }

      return { x: normalizedX, y: normalizedY };
    }

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    // Activation events registered on the root element of each instance for activation
    var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

    // Deactivation events registered on documentElement when a pointer-related down event occurs
    var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

    // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
    /** @type {!Array<!EventTarget>} */
    var activatedTargets = [];

    /**
     * @extends {MDCFoundation<!MDCRippleAdapter>}
     */

    var MDCRippleFoundation = function (_MDCFoundation) {
      inherits(MDCRippleFoundation, _MDCFoundation);
      createClass(MDCRippleFoundation, null, [{
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses$1;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$1;
        }
      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers;
        }
      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return {
            browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
            isUnbounded: function isUnbounded() /* boolean */{},
            isSurfaceActive: function isSurfaceActive() /* boolean */{},
            isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
            registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
            registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
            deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
            registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
            deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
            updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
            computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
            getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
          };
        }
      }]);

      function MDCRippleFoundation(adapter) {
        classCallCheck(this, MDCRippleFoundation);

        /** @private {number} */
        var _this = possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

        _this.layoutFrame_ = 0;

        /** @private {!ClientRect} */
        _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

        /** @private {!ActivationStateType} */
        _this.activationState_ = _this.defaultActivationState_();

        /** @private {number} */
        _this.initialSize_ = 0;

        /** @private {number} */
        _this.maxRadius_ = 0;

        /** @private {function(!Event)} */
        _this.activateHandler_ = function (e) {
          return _this.activate_(e);
        };

        /** @private {function(!Event)} */
        _this.deactivateHandler_ = function (e) {
          return _this.deactivate_(e);
        };

        /** @private {function(?Event=)} */
        _this.focusHandler_ = function () {
          return _this.handleFocus();
        };

        /** @private {function(?Event=)} */
        _this.blurHandler_ = function () {
          return _this.handleBlur();
        };

        /** @private {!Function} */
        _this.resizeHandler_ = function () {
          return _this.layout();
        };

        /** @private {{left: number, top:number}} */
        _this.unboundedCoords_ = {
          left: 0,
          top: 0
        };

        /** @private {number} */
        _this.fgScale_ = 0;

        /** @private {number} */
        _this.activationTimer_ = 0;

        /** @private {number} */
        _this.fgDeactivationRemovalTimer_ = 0;

        /** @private {boolean} */
        _this.activationAnimationHasEnded_ = false;

        /** @private {!Function} */
        _this.activationTimerCallback_ = function () {
          _this.activationAnimationHasEnded_ = true;
          _this.runDeactivationUXLogicIfReady_();
        };

        /** @private {?Event} */
        _this.previousActivationEvent_ = null;
        return _this;
      }

      /**
       * We compute this property so that we are not querying information about the client
       * until the point in time where the foundation requests it. This prevents scenarios where
       * client-side feature-detection may happen too early, such as when components are rendered on the server
       * and then initialized at mount time on the client.
       * @return {boolean}
       * @private
       */


      createClass(MDCRippleFoundation, [{
        key: 'isSupported_',
        value: function isSupported_() {
          return this.adapter_.browserSupportsCssVars();
        }

        /**
         * @return {!ActivationStateType}
         */

      }, {
        key: 'defaultActivationState_',
        value: function defaultActivationState_() {
          return {
            isActivated: false,
            hasDeactivationUXRun: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false,
            activationEvent: null,
            isProgrammatic: false
          };
        }
      }, {
        key: 'init',
        value: function init() {
          var _this2 = this;

          if (!this.isSupported_()) {
            return;
          }
          this.registerRootHandlers_();

          var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
              ROOT = _MDCRippleFoundation$.ROOT,
              UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

          requestAnimationFrame(function () {
            _this2.adapter_.addClass(ROOT);
            if (_this2.adapter_.isUnbounded()) {
              _this2.adapter_.addClass(UNBOUNDED);
              // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
              _this2.layoutInternal_();
            }
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          if (!this.isSupported_()) {
            return;
          }

          if (this.activationTimer_) {
            clearTimeout(this.activationTimer_);
            this.activationTimer_ = 0;
            var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

            this.adapter_.removeClass(FG_ACTIVATION);
          }

          this.deregisterRootHandlers_();
          this.deregisterDeactivationHandlers_();

          var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
              ROOT = _MDCRippleFoundation$2.ROOT,
              UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

          requestAnimationFrame(function () {
            _this3.adapter_.removeClass(ROOT);
            _this3.adapter_.removeClass(UNBOUNDED);
            _this3.removeCssVars_();
          });
        }

        /** @private */

      }, {
        key: 'registerRootHandlers_',
        value: function registerRootHandlers_() {
          var _this4 = this;

          ACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
          });
          this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
          this.adapter_.registerInteractionHandler('blur', this.blurHandler_);

          if (this.adapter_.isUnbounded()) {
            this.adapter_.registerResizeHandler(this.resizeHandler_);
          }
        }

        /**
         * @param {!Event} e
         * @private
         */

      }, {
        key: 'registerDeactivationHandlers_',
        value: function registerDeactivationHandlers_(e) {
          var _this5 = this;

          if (e.type === 'keydown') {
            this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
          } else {
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
              _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
            });
          }
        }

        /** @private */

      }, {
        key: 'deregisterRootHandlers_',
        value: function deregisterRootHandlers_() {
          var _this6 = this;

          ACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
          });
          this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
          this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

          if (this.adapter_.isUnbounded()) {
            this.adapter_.deregisterResizeHandler(this.resizeHandler_);
          }
        }

        /** @private */

      }, {
        key: 'deregisterDeactivationHandlers_',
        value: function deregisterDeactivationHandlers_() {
          var _this7 = this;

          this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
          });
        }

        /** @private */

      }, {
        key: 'removeCssVars_',
        value: function removeCssVars_() {
          var _this8 = this;

          var strings = MDCRippleFoundation.strings;

          Object.keys(strings).forEach(function (k) {
            if (k.indexOf('VAR_') === 0) {
              _this8.adapter_.updateCssVariable(strings[k], null);
            }
          });
        }

        /**
         * @param {?Event} e
         * @private
         */

      }, {
        key: 'activate_',
        value: function activate_(e) {
          var _this9 = this;

          if (this.adapter_.isSurfaceDisabled()) {
            return;
          }

          var activationState = this.activationState_;
          if (activationState.isActivated) {
            return;
          }

          // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
          var previousActivationEvent = this.previousActivationEvent_;
          var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
          if (isSameInteraction) {
            return;
          }

          activationState.isActivated = true;
          activationState.isProgrammatic = e === null;
          activationState.activationEvent = e;
          activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

          var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
            return _this9.adapter_.containsEventTarget(target);
          });
          if (hasActivatedChild) {
            // Immediately reset activation state, while preserving logic that prevents touch follow-on events
            this.resetActivationState_();
            return;
          }

          if (e) {
            activatedTargets.push( /** @type {!EventTarget} */e.target);
            this.registerDeactivationHandlers_(e);
          }

          activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
          if (activationState.wasElementMadeActive) {
            this.animateActivation_();
          }

          requestAnimationFrame(function () {
            // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
            activatedTargets = [];

            if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
              // If space was pressed, try again within an rAF call to detect :active, because different UAs report
              // active states inconsistently when they're called within event handling code:
              // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
              // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
              // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
              // variable is set within a rAF callback for a submit button interaction (#2241).
              activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);
              if (activationState.wasElementMadeActive) {
                _this9.animateActivation_();
              }
            }

            if (!activationState.wasElementMadeActive) {
              // Reset activation state immediately if element was not made active.
              _this9.activationState_ = _this9.defaultActivationState_();
            }
          });
        }

        /**
         * @param {?Event} e
         * @private
         */

      }, {
        key: 'checkElementMadeActive_',
        value: function checkElementMadeActive_(e) {
          return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
        }

        /**
         * @param {?Event=} event Optional event containing position information.
         */

      }, {
        key: 'activate',
        value: function activate() {
          var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          this.activate_(event);
        }

        /** @private */

      }, {
        key: 'animateActivation_',
        value: function animateActivation_() {
          var _this10 = this;

          var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
              VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
              VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
          var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
              FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
              FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
          var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


          this.layoutInternal_();

          var translateStart = '';
          var translateEnd = '';

          if (!this.adapter_.isUnbounded()) {
            var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
                startPoint = _getFgTranslationCoor.startPoint,
                endPoint = _getFgTranslationCoor.endPoint;

            translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
            translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
          }

          this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
          this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
          // Cancel any ongoing activation/deactivation animations
          clearTimeout(this.activationTimer_);
          clearTimeout(this.fgDeactivationRemovalTimer_);
          this.rmBoundedActivationClasses_();
          this.adapter_.removeClass(FG_DEACTIVATION);

          // Force layout in order to re-trigger the animation.
          this.adapter_.computeBoundingRect();
          this.adapter_.addClass(FG_ACTIVATION);
          this.activationTimer_ = setTimeout(function () {
            return _this10.activationTimerCallback_();
          }, DEACTIVATION_TIMEOUT_MS);
        }

        /**
         * @private
         * @return {{startPoint: PointType, endPoint: PointType}}
         */

      }, {
        key: 'getFgTranslationCoordinates_',
        value: function getFgTranslationCoordinates_() {
          var _activationState_ = this.activationState_,
              activationEvent = _activationState_.activationEvent,
              wasActivatedByPointer = _activationState_.wasActivatedByPointer;


          var startPoint = void 0;
          if (wasActivatedByPointer) {
            startPoint = getNormalizedEventCoords(
            /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
          } else {
            startPoint = {
              x: this.frame_.width / 2,
              y: this.frame_.height / 2
            };
          }
          // Center the element around the start point.
          startPoint = {
            x: startPoint.x - this.initialSize_ / 2,
            y: startPoint.y - this.initialSize_ / 2
          };

          var endPoint = {
            x: this.frame_.width / 2 - this.initialSize_ / 2,
            y: this.frame_.height / 2 - this.initialSize_ / 2
          };

          return { startPoint: startPoint, endPoint: endPoint };
        }

        /** @private */

      }, {
        key: 'runDeactivationUXLogicIfReady_',
        value: function runDeactivationUXLogicIfReady_() {
          var _this11 = this;

          // This method is called both when a pointing device is released, and when the activation animation ends.
          // The deactivation animation should only run after both of those occur.
          var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
          var _activationState_2 = this.activationState_,
              hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
              isActivated = _activationState_2.isActivated;

          var activationHasEnded = hasDeactivationUXRun || !isActivated;

          if (activationHasEnded && this.activationAnimationHasEnded_) {
            this.rmBoundedActivationClasses_();
            this.adapter_.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer_ = setTimeout(function () {
              _this11.adapter_.removeClass(FG_DEACTIVATION);
            }, numbers.FG_DEACTIVATION_MS);
          }
        }

        /** @private */

      }, {
        key: 'rmBoundedActivationClasses_',
        value: function rmBoundedActivationClasses_() {
          var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

          this.adapter_.removeClass(FG_ACTIVATION);
          this.activationAnimationHasEnded_ = false;
          this.adapter_.computeBoundingRect();
        }
      }, {
        key: 'resetActivationState_',
        value: function resetActivationState_() {
          var _this12 = this;

          this.previousActivationEvent_ = this.activationState_.activationEvent;
          this.activationState_ = this.defaultActivationState_();
          // Touch devices may fire additional events for the same interaction within a short time.
          // Store the previous event until it's safe to assume that subsequent events are for new interactions.
          setTimeout(function () {
            return _this12.previousActivationEvent_ = null;
          }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
        }

        /**
         * @param {?Event} e
         * @private
         */

      }, {
        key: 'deactivate_',
        value: function deactivate_(e) {
          var _this13 = this;

          var activationState = this.activationState_;
          // This can happen in scenarios such as when you have a keyup event that blurs the element.
          if (!activationState.isActivated) {
            return;
          }

          var state = /** @type {!ActivationStateType} */_extends({}, activationState);

          if (activationState.isProgrammatic) {
            var evtObject = null;
            requestAnimationFrame(function () {
              return _this13.animateDeactivation_(evtObject, state);
            });
            this.resetActivationState_();
          } else {
            this.deregisterDeactivationHandlers_();
            requestAnimationFrame(function () {
              _this13.activationState_.hasDeactivationUXRun = true;
              _this13.animateDeactivation_(e, state);
              _this13.resetActivationState_();
            });
          }
        }

        /**
         * @param {?Event=} event Optional event containing position information.
         */

      }, {
        key: 'deactivate',
        value: function deactivate() {
          var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          this.deactivate_(event);
        }

        /**
         * @param {Event} e
         * @param {!ActivationStateType} options
         * @private
         */

      }, {
        key: 'animateDeactivation_',
        value: function animateDeactivation_(e, _ref) {
          var wasActivatedByPointer = _ref.wasActivatedByPointer,
              wasElementMadeActive = _ref.wasElementMadeActive;

          if (wasActivatedByPointer || wasElementMadeActive) {
            this.runDeactivationUXLogicIfReady_();
          }
        }
      }, {
        key: 'layout',
        value: function layout() {
          var _this14 = this;

          if (this.layoutFrame_) {
            cancelAnimationFrame(this.layoutFrame_);
          }
          this.layoutFrame_ = requestAnimationFrame(function () {
            _this14.layoutInternal_();
            _this14.layoutFrame_ = 0;
          });
        }

        /** @private */

      }, {
        key: 'layoutInternal_',
        value: function layoutInternal_() {
          var _this15 = this;

          this.frame_ = this.adapter_.computeBoundingRect();
          var maxDim = Math.max(this.frame_.height, this.frame_.width);

          // Surface diameter is treated differently for unbounded vs. bounded ripples.
          // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
          // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
          // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
          // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
          // `overflow: hidden`.
          var getBoundedRadius = function getBoundedRadius() {
            var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
            return hypotenuse + MDCRippleFoundation.numbers.PADDING;
          };

          this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

          // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
          this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
          this.fgScale_ = this.maxRadius_ / this.initialSize_;

          this.updateLayoutCssVars_();
        }

        /** @private */

      }, {
        key: 'updateLayoutCssVars_',
        value: function updateLayoutCssVars_() {
          var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
              VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
              VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
              VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
              VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


          this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
          this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

          if (this.adapter_.isUnbounded()) {
            this.unboundedCoords_ = {
              left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
              top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
            };

            this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
            this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
          }
        }

        /** @param {boolean} unbounded */

      }, {
        key: 'setUnbounded',
        value: function setUnbounded(unbounded) {
          var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

          if (unbounded) {
            this.adapter_.addClass(UNBOUNDED);
          } else {
            this.adapter_.removeClass(UNBOUNDED);
          }
        }
      }, {
        key: 'handleFocus',
        value: function handleFocus() {
          var _this16 = this;

          requestAnimationFrame(function () {
            return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
          });
        }
      }, {
        key: 'handleBlur',
        value: function handleBlur() {
          var _this17 = this;

          requestAnimationFrame(function () {
            return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
          });
        }
      }]);
      return MDCRippleFoundation;
    }(MDCFoundation);

    var RippleBase = function (_MDCRippleFoundation) {
      inherits(RippleBase, _MDCRippleFoundation);
      createClass(RippleBase, null, [{
        key: 'isSurfaceActive',
        value: function isSurfaceActive(ref) {
          return ref[RippleBase.MATCHES](':active');
        }
      }, {
        key: 'MATCHES',
        get: function get$$1() {
          /* global HTMLElement */
          return RippleBase._matches || (RippleBase._matches = getMatchesProperty(HTMLElement.prototype));
        }
      }]);

      function RippleBase(vm, options) {
        classCallCheck(this, RippleBase);
        return possibleConstructorReturn(this, (RippleBase.__proto__ || Object.getPrototypeOf(RippleBase)).call(this, _extends({
          browserSupportsCssVars: function browserSupportsCssVars() {
            return supportsCssVariables(window);
          },
          isUnbounded: function isUnbounded() {
            return false;
          },
          isSurfaceActive: function isSurfaceActive() {
            return vm.$el[RippleBase.MATCHES](':active');
          },
          isSurfaceDisabled: function isSurfaceDisabled() {
            return vm.disabled;
          },
          addClass: function addClass(className) {
            vm.$set(vm.classes, className, true);
          },
          removeClass: function removeClass(className) {
            vm.$delete(vm.classes, className);
          },

          containsEventTarget: function containsEventTarget(target) {
            return vm.$el.contains(target);
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            vm.$el.addEventListener(evt, handler, applyPassive$1());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            vm.$el.removeEventListener(evt, handler, applyPassive$1());
          },
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.addEventListener(evtType, handler, applyPassive$1());
          },
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.removeEventListener(evtType, handler, applyPassive$1());
          },
          registerResizeHandler: function registerResizeHandler(handler) {
            return window.addEventListener('resize', handler);
          },
          deregisterResizeHandler: function deregisterResizeHandler(handler) {
            return window.removeEventListener('resize', handler);
          },
          updateCssVariable: function updateCssVariable(varName, value) {
            vm.$set(vm.styles, varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return vm.$el.getBoundingClientRect();
          },
          getWindowPageOffset: function getWindowPageOffset() {
            return { x: window.pageXOffset, y: window.pageYOffset };
          }
        }, options)));
      }

      return RippleBase;
    }(MDCRippleFoundation);

    var mdcIConToggle = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { staticClass: "mdc-icon-toggle", class: _vm.classes, style: _vm.styles, attrs: { "tabindex": _vm.tabIndex, "data-toggle-on": _vm.toggleOnData, "data-toggle-off": _vm.toggleOffData, "role": "button", "aria-pressed": "false" } }, [_c('i', { class: _vm.iconClasses, attrs: { "aria-hidden": "true" } }, [_vm._v(_vm._s(_vm.text))])]);
      }, staticRenderFns: [],
      name: 'mdc-icon-toggle',
      props: {
        toggleOn: [String, Object],
        toggleOff: [String, Object],
        value: Boolean,
        disabled: Boolean,
        accent: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-icon-toggle--accent': this.accent
          },
          styles: {},
          iconClasses: {},
          tabIndex: 0,
          text: ''
        };
      },

      computed: {
        toggleOnData: function toggleOnData() {
          var toggle = this.toggleOn;
          return toggle && JSON.stringify(typeof toggle === 'string' ? {
            content: toggle,
            cssClass: 'material-icons'
          } : {
            content: toggle.icon || toggle.content,
            label: toggle.label,
            cssClass: toggle.icon ? 'material-icons' : toggle.cssClass
          });
        },
        toggleOffData: function toggleOffData() {
          var toggle = this.toggleOff;
          return toggle && JSON.stringify(typeof toggle === 'string' ? {
            content: toggle,
            cssClass: 'material-icons'
          } : {
            content: toggle.icon || toggle.content,
            label: toggle.label,
            cssClass: toggle.icon ? 'material-icons' : toggle.cssClass
          });
        }
      },
      watch: {
        value: function value(_value) {
          this.foundation && this.foundation.toggle(_value);
        },
        disabled: function disabled(_disabled) {
          this.foundation && this.foundation.setDisabled(_disabled);
        },
        toggleOnData: function toggleOnData() {
          this.foundation && this.foundation.refreshToggleData();
        },
        toggleOffData: function toggleOffData() {
          this.foundation && this.foundation.refreshToggleData();
        },
        accent: function accent(value) {
          this.$set(this.classes, 'mdc-icon-toggle--secondary', value);
        }
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCIconToggleFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.iconClasses, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.iconClasses, className);
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            return _this.$el.addEventListener(evt, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            return _this.$el.removeEventListener(evt, handler);
          },
          setText: function setText(text) {
            _this.text = text;
          },
          getTabIndex: function getTabIndex() {
            return _this.tabIndex;
          },
          setTabIndex: function setTabIndex(tabIndex) {
            _this.tabIndex = tabIndex;
          },
          getAttr: function getAttr(name, value) {
            return _this.$el.getAttribute(name, value);
          },
          setAttr: function setAttr(name, value) {
            _this.$el.setAttribute(name, value);
          },
          rmAttr: function rmAttr(name) {
            _this.$el.removeAttribute(name);
          },
          notifyChange: function notifyChange(evtData) {
            _this.$emit('input', evtData.isOn);
          }
        });
        this.foundation.init();
        this.foundation.toggle(this.value);
        this.foundation.setDisabled(this.disabled);

        this.ripple = new RippleBase(this, {
          isUnbounded: function isUnbounded() {
            return true;
          },
          isSurfaceActive: function isSurfaceActive() {
            return _this.foundation.isKeyboardActivated();
          }
        });
        this.ripple.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
        this.ripple.destroy();
      }
    };

    var plugin = BasePlugin({
      mdcIConToggle: mdcIConToggle
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi10b2dnbGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2ljb24tdG9nZ2xlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2ljb24tdG9nZ2xlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvaWNvbi10b2dnbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvaWNvbi10b2dnbGUvbWRjLWljb24tdG9nZ2xlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvaWNvbi10b2dnbGUvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2ljb24tdG9nZ2xlL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiB2bSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9XG59XG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJjb25zdCBzY29wZSA9XG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcblxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XG4gIGJlZm9yZUNyZWF0ZSgpIHtcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgSWNvbiBUb2dnbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gaW5uZXIgdGV4dFxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSBldmVudCBkaXNwYXRjaFxuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuXG5jbGFzcyBNRENJY29uVG9nZ2xlQWRhcHRlciB7XG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7IUV2ZW50TGlzdGVuZXJ9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7IUV2ZW50TGlzdGVuZXJ9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IHRleHQgKi9cbiAgc2V0VGV4dCh0ZXh0KSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldFRhYkluZGV4KCkge31cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IHRhYkluZGV4ICovXG4gIHNldFRhYkluZGV4KHRhYkluZGV4KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRBdHRyKG5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cihuYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IG5hbWUgKi9cbiAgcm1BdHRyKG5hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUljb25Ub2dnbGVFdmVudH0gZXZ0RGF0YSAqL1xuICBub3RpZnlDaGFuZ2UoZXZ0RGF0YSkge31cbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc09uOiBib29sZWFuLFxuICogfX1cbiAqL1xubGV0IEljb25Ub2dnbGVFdmVudDtcblxuZXhwb3J0IHtNRENJY29uVG9nZ2xlQWRhcHRlciwgSWNvblRvZ2dsZUV2ZW50fTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtaWNvbi10b2dnbGUnLFxuICBESVNBQkxFRDogJ21kYy1pY29uLXRvZ2dsZS0tZGlzYWJsZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBEQVRBX1RPR0dMRV9PTjogJ2RhdGEtdG9nZ2xlLW9uJyxcbiAgREFUQV9UT0dHTEVfT0ZGOiAnZGF0YS10b2dnbGUtb2ZmJyxcbiAgQVJJQV9QUkVTU0VEOiAnYXJpYS1wcmVzc2VkJyxcbiAgQVJJQV9ESVNBQkxFRDogJ2FyaWEtZGlzYWJsZWQnLFxuICBBUklBX0xBQkVMOiAnYXJpYS1sYWJlbCcsXG4gIENIQU5HRV9FVkVOVDogJ01EQ0ljb25Ub2dnbGU6Y2hhbmdlJyxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtNRENJY29uVG9nZ2xlQWRhcHRlciwgSWNvblRvZ2dsZUV2ZW50fSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0ljb25Ub2dnbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDSWNvblRvZ2dsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgc2V0VGV4dDogKC8qIHRleHQ6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBnZXRUYWJJbmRleDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBzZXRUYWJJbmRleDogKC8qIHRhYkluZGV4OiBudW1iZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0QXR0cjogKC8qIG5hbWU6IHN0cmluZyAqLykgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgc2V0QXR0cjogKC8qIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBybUF0dHI6ICgvKiBuYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoLyogZXZ0RGF0YTogSWNvblRvZ2dsZUV2ZW50ICovKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDSWNvblRvZ2dsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLm9uXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLnNhdmVkVGFiSW5kZXhfID0gLTE7XG5cbiAgICAvKiogQHByaXZhdGUgez9JY29uVG9nZ2xlU3RhdGV9ICovXG4gICAgdGhpcy50b2dnbGVPbkRhdGFfID0gbnVsbDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0ljb25Ub2dnbGVTdGF0ZX0gKi9cbiAgICB0aGlzLnRvZ2dsZU9mZkRhdGFfID0gbnVsbDtcblxuICAgIHRoaXMuY2xpY2tIYW5kbGVyXyA9IC8qKiBAcHJpdmF0ZSB7IUV2ZW50TGlzdGVuZXJ9ICovIChcbiAgICAgICgpID0+IHRoaXMudG9nZ2xlRnJvbUV2dF8oKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc0hhbmRsaW5nS2V5ZG93bl8gPSBmYWxzZTtcblxuICAgIHRoaXMua2V5ZG93bkhhbmRsZXJfID0gLyoqIEBwcml2YXRlIHshRXZlbnRMaXN0ZW5lcn0gKi8gKCgvKiogQHR5cGUgeyFLZXlib2FyZEtleX0gKi8gZXZ0KSA9PiB7XG4gICAgICBpZiAoaXNTcGFjZShldnQpKSB7XG4gICAgICAgIHRoaXMuaXNIYW5kbGluZ0tleWRvd25fID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5rZXl1cEhhbmRsZXJfID0gLyoqIEBwcml2YXRlIHshRXZlbnRMaXN0ZW5lcn0gKi8gKCgvKiogQHR5cGUgeyFLZXlib2FyZEtleX0gKi8gZXZ0KSA9PiB7XG4gICAgICBpZiAoaXNTcGFjZShldnQpKSB7XG4gICAgICAgIHRoaXMuaXNIYW5kbGluZ0tleWRvd25fID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9nZ2xlRnJvbUV2dF8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5yZWZyZXNoVG9nZ2xlRGF0YSgpO1xuICAgIHRoaXMuc2F2ZWRUYWJJbmRleF8gPSB0aGlzLmFkYXB0ZXJfLmdldFRhYkluZGV4KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmtleXVwSGFuZGxlcl8pO1xuICB9XG5cbiAgcmVmcmVzaFRvZ2dsZURhdGEoKSB7XG4gICAgY29uc3Qge0RBVEFfVE9HR0xFX09OLCBEQVRBX1RPR0dMRV9PRkZ9ID0gTURDSWNvblRvZ2dsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICB0aGlzLnRvZ2dsZU9uRGF0YV8gPSB0aGlzLnBhcnNlSnNvbkRhdGFBdHRyXyhEQVRBX1RPR0dMRV9PTik7XG4gICAgdGhpcy50b2dnbGVPZmZEYXRhXyA9IHRoaXMucGFyc2VKc29uRGF0YUF0dHJfKERBVEFfVE9HR0xFX09GRik7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5rZXl1cEhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB0b2dnbGVGcm9tRXZ0XygpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIGNvbnN0IHtvbl86IGlzT259ID0gdGhpcztcbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSgvKiogQHR5cGUgeyFJY29uVG9nZ2xlRXZlbnR9ICovICh7aXNPbn0pKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc09uKCkge1xuICAgIHJldHVybiB0aGlzLm9uXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW49fSBpc09uICovXG4gIHRvZ2dsZShpc09uID0gIXRoaXMub25fKSB7XG4gICAgdGhpcy5vbl8gPSBpc09uO1xuXG4gICAgY29uc3Qge0FSSUFfTEFCRUwsIEFSSUFfUFJFU1NFRH0gPSBNRENJY29uVG9nZ2xlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgaWYgKHRoaXMub25fKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoQVJJQV9QUkVTU0VELCAndHJ1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoQVJJQV9QUkVTU0VELCAnZmFsc2UnKTtcbiAgICB9XG5cbiAgICBjb25zdCB7Y3NzQ2xhc3M6IGNsYXNzVG9SZW1vdmV9ID1cbiAgICAgICAgdGhpcy5vbl8gPyB0aGlzLnRvZ2dsZU9mZkRhdGFfIDogdGhpcy50b2dnbGVPbkRhdGFfO1xuXG4gICAgaWYgKGNsYXNzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY2xhc3NUb1JlbW92ZSk7XG4gICAgfVxuXG4gICAgY29uc3Qge2NvbnRlbnQsIGxhYmVsLCBjc3NDbGFzc30gPSB0aGlzLm9uXyA/IHRoaXMudG9nZ2xlT25EYXRhXyA6IHRoaXMudG9nZ2xlT2ZmRGF0YV87XG5cbiAgICBpZiAoY3NzQ2xhc3MpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3MpO1xuICAgIH1cbiAgICBpZiAoY29udGVudCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUZXh0KGNvbnRlbnQpO1xuICAgIH1cbiAgICBpZiAobGFiZWwpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cihBUklBX0xBQkVMLCBsYWJlbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhQXR0clxuICAgKiBAcmV0dXJuIHshSWNvblRvZ2dsZVN0YXRlfVxuICAgKi9cbiAgcGFyc2VKc29uRGF0YUF0dHJfKGRhdGFBdHRyKSB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5hZGFwdGVyXy5nZXRBdHRyKGRhdGFBdHRyKTtcbiAgICBpZiAoIXZhbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gLyoqIEB0eXBlIHshSWNvblRvZ2dsZVN0YXRlfSAqLyAoSlNPTi5wYXJzZSh2YWwpKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGlzYWJsZWQgKi9cbiAgc2V0RGlzYWJsZWQoaXNEaXNhYmxlZCkge1xuICAgIHRoaXMuZGlzYWJsZWRfID0gaXNEaXNhYmxlZDtcblxuICAgIGNvbnN0IHtESVNBQkxFRH0gPSBNRENJY29uVG9nZ2xlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtBUklBX0RJU0FCTEVEfSA9IE1EQ0ljb25Ub2dnbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgIHRoaXMuc2F2ZWRUYWJJbmRleF8gPSB0aGlzLmFkYXB0ZXJfLmdldFRhYkluZGV4KCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFRhYkluZGV4KC0xKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cihBUklBX0RJU0FCTEVELCAndHJ1ZScpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhESVNBQkxFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0VGFiSW5kZXgodGhpcy5zYXZlZFRhYkluZGV4Xyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJtQXR0cihBUklBX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRElTQUJMRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0tleWJvYXJkQWN0aXZhdGVkKCkge1xuICAgIHJldHVybiB0aGlzLmlzSGFuZGxpbmdLZXlkb3duXztcbiAgfVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGtleTogc3RyaW5nLFxuICogICBrZXlDb2RlOiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBLZXlib2FyZEtleTtcblxuLyoqXG4gKiBAcGFyYW0geyFLZXlib2FyZEtleX0ga2V5Ym9hcmRLZXlcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BhY2Uoa2V5Ym9hcmRLZXkpIHtcbiAgcmV0dXJuIGtleWJvYXJkS2V5LmtleSA9PT0gJ1NwYWNlJyB8fCBrZXlib2FyZEtleS5rZXlDb2RlID09PSAzMjtcbn1cblxuXG4vKiogQHJlY29yZCAqL1xuY2xhc3MgSWNvblRvZ2dsZVN0YXRlIHt9XG5cbi8qKlxuICogVGhlIGFyaWEtbGFiZWwgdmFsdWUgb2YgdGhlIGljb24gdG9nZ2xlLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgaXMgbm8gYXJpYS1sYWJlbC5cbiAqIEBleHBvcnQge3N0cmluZ3x1bmRlZmluZWR9XG4gKi9cbkljb25Ub2dnbGVTdGF0ZS5wcm90b3R5cGUubGFiZWw7XG5cbi8qKlxuICogVGhlIHRleHQgZm9yIHRoZSBpY29uIHRvZ2dsZSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vIHRleHQuXG4gKiBAZXhwb3J0IHtzdHJpbmd8dW5kZWZpbmVkfVxuICovXG5JY29uVG9nZ2xlU3RhdGUucHJvdG90eXBlLmNvbnRlbnQ7XG5cbi8qKlxuICogVGhlIENTUyBjbGFzcyB0byBhZGQgdG8gdGhlIGljb24gdG9nZ2xlLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgaXMgbm8gQ1NTIGNsYXNzLlxuICogQGV4cG9ydCB7c3RyaW5nfHVuZGVmaW5lZH1cbiAqL1xuSWNvblRvZ2dsZVN0YXRlLnByb3RvdHlwZS5jc3NDbGFzcztcblxuZXhwb3J0IGRlZmF1bHQgTURDSWNvblRvZ2dsZUZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxuICAgICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmF0aW9uVGltZXJfKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG4gICAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIH1cblxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gbnVsbDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9XG4gICAgICBlICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgJiYgKGUua2V5ID09PSAnICcgfHwgZS5rZXlDb2RlID09PSAzMikpIHtcbiAgICAgICAgLy8gSWYgc3BhY2Ugd2FzIHByZXNzZWQsIHRyeSBhZ2FpbiB3aXRoaW4gYW4gckFGIGNhbGwgdG8gZGV0ZWN0IDphY3RpdmUsIGJlY2F1c2UgZGlmZmVyZW50IFVBcyByZXBvcnRcbiAgICAgICAgLy8gYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpbiBldmVudCBoYW5kbGluZyBjb2RlOlxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgICAgLy8gV2UgdHJ5IGZpcnN0IG91dHNpZGUgckFGIHRvIHN1cHBvcnQgRWRnZSwgd2hpY2ggZG9lcyBub3QgZXhoaWJpdCB0aGlzIHByb2JsZW0sIGJ1dCB3aWxsIGNyYXNoIGlmIGEgQ1NTXG4gICAgICAgIC8vIHZhcmlhYmxlIGlzIHNldCB3aXRoaW4gYSByQUYgY2FsbGJhY2sgZm9yIGEgc3VibWl0IGJ1dHRvbiBpbnRlcmFjdGlvbiAoIzIyNDEpLlxuICAgICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgICAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKSB7XG4gICAgcmV0dXJuIChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhbmltYXRlQWN0aXZhdGlvbl8oKSB7XG4gICAgY29uc3Qge1ZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OLCBGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7REVBQ1RJVkFUSU9OX1RJTUVPVVRfTVN9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzO1xuXG4gICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1cygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsImltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcydcbmltcG9ydCB7XG4gIHN1cHBvcnRzQ3NzVmFyaWFibGVzLFxuICBnZXRNYXRjaGVzUHJvcGVydHksXG4gIGFwcGx5UGFzc2l2ZVxufSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgTUFUQ0hFUygpIHtcbiAgICAvKiBnbG9iYWwgSFRNTEVsZW1lbnQgKi9cbiAgICByZXR1cm4gKFxuICAgICAgUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxuICAgICAgKFJpcHBsZUJhc2UuX21hdGNoZXMgPSBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKSlcbiAgICApXG4gIH1cblxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlKHJlZikge1xuICAgIHJldHVybiByZWZbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih2bSwgb3B0aW9ucykge1xuICAgIHN1cGVyKFxuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAge1xuICAgICAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc1VuYm91bmRlZDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHZtLiRzZXQodm0uY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kZGVsZXRlKHZtLmNsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6IHRhcmdldCA9PiB2bS4kZWwuY29udGFpbnModGFyZ2V0KSxcbiAgICAgICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgIGV2dFR5cGUsXG4gICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLnN0eWxlcywgdmFyTmFtZSwgdmFsdWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyB4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldCB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zXG4gICAgICApXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSaXBwbGVNaXhpbiA9IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcbiAgfVxufVxuIiwiPHRlbXBsYXRlPlxuICA8c3BhbiBcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXG4gICAgOnN0eWxlPVwic3R5bGVzXCIgXG4gICAgOnRhYmluZGV4PVwidGFiSW5kZXhcIlxuICAgIDpkYXRhLXRvZ2dsZS1vbj1cInRvZ2dsZU9uRGF0YVwiIFxuICAgIDpkYXRhLXRvZ2dsZS1vZmY9XCJ0b2dnbGVPZmZEYXRhXCJcbiAgICBjbGFzcz1cIm1kYy1pY29uLXRvZ2dsZVwiXG4gICAgcm9sZT1cImJ1dHRvblwiXG4gICAgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIj5cbiAgICA8aSBcbiAgICAgIDpjbGFzcz1cImljb25DbGFzc2VzXCIgXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIj57eyB0ZXh0IH19PC9pPlxuICA8L3NwYW4+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1EQ0ljb25Ub2dnbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9pY29uLXRvZ2dsZS9mb3VuZGF0aW9uJ1xuaW1wb3J0IHsgUmlwcGxlQmFzZSB9IGZyb20gJy4uL3JpcHBsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWljb24tdG9nZ2xlJyxcbiAgcHJvcHM6IHtcbiAgICB0b2dnbGVPbjogW1N0cmluZywgT2JqZWN0XSxcbiAgICB0b2dnbGVPZmY6IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgdmFsdWU6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgYWNjZW50OiBCb29sZWFuXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1pY29uLXRvZ2dsZS0tYWNjZW50JzogdGhpcy5hY2NlbnRcbiAgICAgIH0sXG4gICAgICBzdHlsZXM6IHt9LFxuICAgICAgaWNvbkNsYXNzZXM6IHt9LFxuICAgICAgdGFiSW5kZXg6IDAsXG4gICAgICB0ZXh0OiAnJ1xuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB0b2dnbGVPbkRhdGEoKSB7XG4gICAgICBsZXQgdG9nZ2xlID0gdGhpcy50b2dnbGVPblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgdG9nZ2xlICYmXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgIHR5cGVvZiB0b2dnbGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0b2dnbGUsXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICdtYXRlcmlhbC1pY29ucydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogdG9nZ2xlLmljb24gfHwgdG9nZ2xlLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHRvZ2dsZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBjc3NDbGFzczogdG9nZ2xlLmljb24gPyAnbWF0ZXJpYWwtaWNvbnMnIDogdG9nZ2xlLmNzc0NsYXNzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKVxuICAgIH0sXG4gICAgdG9nZ2xlT2ZmRGF0YSgpIHtcbiAgICAgIGxldCB0b2dnbGUgPSB0aGlzLnRvZ2dsZU9mZlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgdG9nZ2xlICYmXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgIHR5cGVvZiB0b2dnbGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0b2dnbGUsXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICdtYXRlcmlhbC1pY29ucydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogdG9nZ2xlLmljb24gfHwgdG9nZ2xlLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHRvZ2dsZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBjc3NDbGFzczogdG9nZ2xlLmljb24gPyAnbWF0ZXJpYWwtaWNvbnMnIDogdG9nZ2xlLmNzc0NsYXNzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZSh2YWx1ZSkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi50b2dnbGUodmFsdWUpXG4gICAgfSxcbiAgICBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZChkaXNhYmxlZClcbiAgICB9LFxuICAgIHRvZ2dsZU9uRGF0YSgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24ucmVmcmVzaFRvZ2dsZURhdGEoKVxuICAgIH0sXG4gICAgdG9nZ2xlT2ZmRGF0YSgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24ucmVmcmVzaFRvZ2dsZURhdGEoKVxuICAgIH0sXG4gICAgYWNjZW50KHZhbHVlKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWljb24tdG9nZ2xlLS1zZWNvbmRhcnknLCB2YWx1ZSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ0ljb25Ub2dnbGVGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kc2V0KHRoaXMuaWNvbkNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmljb25DbGFzc2VzLCBjbGFzc05hbWUpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKSxcbiAgICAgIHNldFRleHQ6IHRleHQgPT4ge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0XG4gICAgICB9LFxuICAgICAgZ2V0VGFiSW5kZXg6ICgpID0+IHRoaXMudGFiSW5kZXgsXG4gICAgICBzZXRUYWJJbmRleDogdGFiSW5kZXggPT4ge1xuICAgICAgICB0aGlzLnRhYkluZGV4ID0gdGFiSW5kZXhcbiAgICAgIH0sXG4gICAgICBnZXRBdHRyOiAobmFtZSwgdmFsdWUpID0+IHRoaXMuJGVsLmdldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSksXG4gICAgICBzZXRBdHRyOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy4kZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIHJtQXR0cjogbmFtZSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxuICAgICAgfSxcbiAgICAgIG5vdGlmeUNoYW5nZTogZXZ0RGF0YSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZXZ0RGF0YS5pc09uKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIHRoaXMuZm91bmRhdGlvbi50b2dnbGUodGhpcy52YWx1ZSlcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZClcblxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcywge1xuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHRydWUsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHRoaXMuZm91bmRhdGlvbi5pc0tleWJvYXJkQWN0aXZhdGVkKClcbiAgICB9KVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNJQ29uVG9nZ2xlIGZyb20gJy4vbWRjLWljb24tdG9nZ2xlLnZ1ZSdcblxuZXhwb3J0IHsgbWRjSUNvblRvZ2dsZSB9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNJQ29uVG9nZ2xlXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENJY29uVG9nZ2xlQWRhcHRlciIsImNsYXNzTmFtZSIsInR5cGUiLCJoYW5kbGVyIiwidGV4dCIsInRhYkluZGV4IiwidmFsdWUiLCJldnREYXRhIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJESVNBQkxFRCIsInN0cmluZ3MiLCJEQVRBX1RPR0dMRV9PTiIsIkRBVEFfVE9HR0xFX09GRiIsIkFSSUFfUFJFU1NFRCIsIkFSSUFfRElTQUJMRUQiLCJBUklBX0xBQkVMIiwiQ0hBTkdFX0VWRU5UIiwiTURDSWNvblRvZ2dsZUZvdW5kYXRpb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwic2V0VGV4dCIsImdldFRhYkluZGV4Iiwic2V0VGFiSW5kZXgiLCJnZXRBdHRyIiwic2V0QXR0ciIsInJtQXR0ciIsIm5vdGlmeUNoYW5nZSIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiZGVmYXVsdEFkYXB0ZXIiLCJvbl8iLCJkaXNhYmxlZF8iLCJzYXZlZFRhYkluZGV4XyIsInRvZ2dsZU9uRGF0YV8iLCJ0b2dnbGVPZmZEYXRhXyIsImNsaWNrSGFuZGxlcl8iLCJ0b2dnbGVGcm9tRXZ0XyIsImlzSGFuZGxpbmdLZXlkb3duXyIsImtleWRvd25IYW5kbGVyXyIsImV2dCIsImlzU3BhY2UiLCJwcmV2ZW50RGVmYXVsdCIsImtleXVwSGFuZGxlcl8iLCJyZWZyZXNoVG9nZ2xlRGF0YSIsInBhcnNlSnNvbkRhdGFBdHRyXyIsInRvZ2dsZSIsImlzT24iLCJjbGFzc1RvUmVtb3ZlIiwiY3NzQ2xhc3MiLCJjb250ZW50IiwibGFiZWwiLCJkYXRhQXR0ciIsInZhbCIsIkpTT04iLCJwYXJzZSIsImlzRGlzYWJsZWQiLCJrZXlib2FyZEtleSIsImtleUNvZGUiLCJNRENSaXBwbGVBZGFwdGVyIiwidGFyZ2V0IiwiZXZ0VHlwZSIsInZhck5hbWUiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsIlZBUl9MRUZUIiwiVkFSX1RPUCIsIlZBUl9GR19TSVpFIiwiVkFSX0ZHX1NDQUxFIiwiVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCIsIlZBUl9GR19UUkFOU0xBVEVfRU5EIiwibnVtYmVycyIsIlBBRERJTkciLCJJTklUSUFMX09SSUdJTl9TQ0FMRSIsIkRFQUNUSVZBVElPTl9USU1FT1VUX01TIiwiRkdfREVBQ1RJVkFUSU9OX01TIiwiVEFQX0RFTEFZX01TIiwic3VwcG9ydHNDc3NWYXJpYWJsZXNfIiwic3VwcG9ydHNQYXNzaXZlXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJkb2N1bWVudCIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwiZm9yY2VSZWZyZXNoIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJ1bmRlZmluZWQiLCJpc1N1cHBvcnRlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiZSIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiZm9yRWFjaCIsIk9iamVjdCIsImtleXMiLCJrIiwiaW5kZXhPZiIsImFjdGl2YXRpb25TdGF0ZSIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJoYXNBY3RpdmF0ZWRDaGlsZCIsImxlbmd0aCIsInNvbWUiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsImV2ZW50IiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwic2V0VGltZW91dCIsImFjdGl2YXRpb25IYXNFbmRlZCIsInN0YXRlIiwiZXZ0T2JqZWN0IiwiYW5pbWF0ZURlYWN0aXZhdGlvbl8iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIm1heERpbSIsIm1heCIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJGVsIiwiZGlzYWJsZWQiLCIkc2V0IiwiY2xhc3NlcyIsIiRkZWxldGUiLCJjb250YWlucyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwicmVuZGVyIiwicHJvcHMiLCJ0b2dnbGVPbiIsIlN0cmluZyIsInRvZ2dsZU9mZiIsIkJvb2xlYW4iLCJhY2NlbnQiLCJkYXRhIiwiaWNvbkNsYXNzZXMiLCJjb21wdXRlZCIsInRvZ2dsZU9uRGF0YSIsInN0cmluZ2lmeSIsImljb24iLCJ0b2dnbGVPZmZEYXRhIiwid2F0Y2giLCJmb3VuZGF0aW9uIiwic2V0RGlzYWJsZWQiLCJtb3VudGVkIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiJGVtaXQiLCJpbml0IiwicmlwcGxlIiwiaXNLZXlib2FyZEFjdGl2YXRlZCIsImJlZm9yZURlc3Ryb3kiLCJkZXN0cm95IiwibWRjSUNvblRvZ2dsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0lBQy9CO0lBQ0EsTUFBSUMsT0FBTyxJQUFYO0lBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0lBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUN4QztJQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0lBQ0Q7SUFDRCxNQUFJRixJQUFKLEVBQVU7SUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0lBQ0Q7SUFDRjs7SUNaTSxTQUFTTSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztJQUNyQyxTQUFPO0lBQ0xDLGFBQVMsUUFESjtJQUVMQyxhQUFTLHFCQUFNO0lBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCSCxVQUFoQixFQUE0QjtJQUMxQixZQUFJSSxZQUFZSixXQUFXRyxHQUFYLENBQWhCO0lBQ0FFLFdBQUdELFNBQUgsQ0FBYUEsVUFBVUUsSUFBdkIsRUFBNkJGLFNBQTdCO0lBQ0Q7SUFDRixLQVBJO0lBUUxKO0lBUkssR0FBUDtJQVVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDWEQ7O0lDQUEsSUFBTU8sUUFDSkMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCRixLQUFLQyxLQUFMLENBQVcsVUFBWCxDQUEzQixFQUFtREUsUUFBbkQsS0FBZ0UsR0FEbEU7O0lDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUJBOzs7UUFHTUM7Ozs7SUFDSjsrQkFDd0I7SUFDdEI7SUFDQTtJQUNBLGFBQU8s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
