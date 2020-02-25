/**
* @module vue-mdc-adapterselect 0.17.0
* @exports VueMDCSelect
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCSelect = factory());
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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
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
   * @template F
   */

  var MDCComponent = function () {
    createClass(MDCComponent, null, [{
      key: 'attachTo',

      /**
       * @param {!Element} root
       * @return {!MDCComponent}
       */
      value: function attachTo(root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new MDCFoundation());
      }

      /**
       * @param {!Element} root
       * @param {F=} foundation
       * @param {...?} args
       */

    }]);

    function MDCComponent(root) {
      var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      classCallCheck(this, MDCComponent);

      /** @protected {!Element} */
      this.root_ = root;

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      this.initialize.apply(this, args);
      // Note that we initialize foundation here and not within the constructor's default param so that
      // this.root_ is defined and can be used within the foundation class.
      /** @protected {!F} */
      this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
      this.foundation_.init();
      this.initialSyncWithDOM();
    }

    createClass(MDCComponent, [{
      key: 'initialize',
      value: function initialize() /* ...args */{}
      // Subclasses can override this to do any additional setup work that would be considered part of a
      // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
      // initialized. Any additional arguments besides root and foundation will be passed in here.


      /**
       * @return {!F} foundation
       */

    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
      }

      /**
       * Wrapper method to add an event listener to the component's root element. This is most useful when
       * listening for custom events.
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: 'listen',
      value: function listen(evtType, handler) {
        this.root_.addEventListener(evtType, handler);
      }

      /**
       * Wrapper method to remove an event listener to the component's root element. This is most useful when
       * unlistening for custom events.
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: 'unlisten',
      value: function unlisten(evtType, handler) {
        this.root_.removeEventListener(evtType, handler);
      }

      /**
       * Fires a cross-browser-compatible custom event from the component root of the given type,
       * with the given data.
       * @param {string} evtType
       * @param {!Object} evtData
       * @param {boolean=} shouldBubble
       */

    }, {
      key: 'emit',
      value: function emit(evtType, evtData) {
        var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var evt = void 0;
        if (typeof CustomEvent === 'function') {
          evt = new CustomEvent(evtType, {
            detail: evtData,
            bubbles: shouldBubble
          });
        } else {
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }

        this.root_.dispatchEvent(evt);
      }
    }]);
    return MDCComponent;
  }();

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
  var cssClasses = {
    BOX: 'mdc-select--box',
    DISABLED: 'mdc-select--disabled',
    ROOT: 'mdc-select',
    OUTLINED: 'mdc-select--outlined'
  };

  var strings = {
    CHANGE_EVENT: 'MDCSelect:change',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
    LABEL_SELECTOR: '.mdc-floating-label',
    NATIVE_CONTROL_SELECTOR: '.mdc-select__native-control',
    OUTLINE_SELECTOR: '.mdc-notched-outline'
  };

  /** @enum {number} */
  var numbers = {
    LABEL_SCALE: 0.75
  };

  /**
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

  var MDCSelectFoundation = function (_MDCFoundation) {
    inherits(MDCSelectFoundation, _MDCFoundation);
    createClass(MDCSelectFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses;
      }
    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
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
          hasClass: function hasClass() {
            return (/* className: string */false
            );
          },
          floatLabel: function floatLabel() /* value: boolean */{},
          activateBottomLine: function activateBottomLine() {},
          deactivateBottomLine: function deactivateBottomLine() {},
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          getSelectedIndex: function getSelectedIndex() {
            return (/* number */-1
            );
          },
          setSelectedIndex: function setSelectedIndex() /* index: number */{},
          setDisabled: function setDisabled() /* disabled: boolean */{},
          getValue: function getValue() {
            return (/* string */''
            );
          },
          setValue: function setValue() /* value: string */{},
          isRtl: function isRtl() {
            return false;
          },
          hasLabel: function hasLabel() {},
          getLabelWidth: function getLabelWidth() {},
          hasOutline: function hasOutline() {},
          notchOutline: function notchOutline() {},
          closeOutline: function closeOutline() {}
        };
      }
    }]);

    function MDCSelectFoundation(adapter) {
      classCallCheck(this, MDCSelectFoundation);

      var _this = possibleConstructorReturn(this, (MDCSelectFoundation.__proto__ || Object.getPrototypeOf(MDCSelectFoundation)).call(this, _extends(MDCSelectFoundation.defaultAdapter, adapter)));

      _this.focusHandler_ = function (evt) {
        return _this.handleFocus_(evt);
      };
      _this.blurHandler_ = function (evt) {
        return _this.handleBlur_(evt);
      };
      _this.selectionHandler_ = function (evt) {
        return _this.handleSelect_(evt);
      };
      return _this;
    }

    createClass(MDCSelectFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
        this.adapter_.registerInteractionHandler('change', this.selectionHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        this.adapter_.deregisterInteractionHandler('change', this.selectionHandler_);
      }
    }, {
      key: 'setSelectedIndex',
      value: function setSelectedIndex(index) {
        this.adapter_.setSelectedIndex(index);
        this.floatLabelWithValue_();
      }
    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.adapter_.setValue(value);
        this.setSelectedIndex(this.adapter_.getSelectedIndex());
      }
    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        var DISABLED = MDCSelectFoundation.cssClasses.DISABLED;

        this.adapter_.setDisabled(disabled);
        if (disabled) {
          this.adapter_.addClass(DISABLED);
        } else {
          this.adapter_.removeClass(DISABLED);
        }
      }
    }, {
      key: 'floatLabelWithValue_',
      value: function floatLabelWithValue_() {
        var optionHasValue = this.adapter_.getValue().length > 0;
        this.adapter_.floatLabel(optionHasValue);
        this.notchOutline(optionHasValue);
      }
    }, {
      key: 'handleFocus_',
      value: function handleFocus_() {
        this.adapter_.floatLabel(true);
        this.notchOutline(true);
        this.adapter_.activateBottomLine();
      }
    }, {
      key: 'handleBlur_',
      value: function handleBlur_() {
        this.floatLabelWithValue_();
        this.adapter_.deactivateBottomLine();
      }
    }, {
      key: 'handleSelect_',
      value: function handleSelect_() {
        this.setSelectedIndex(this.adapter_.getSelectedIndex());
      }

      /**
       * Opens/closes the notched outline.
       * @param {boolean} openNotch
       */

    }, {
      key: 'notchOutline',
      value: function notchOutline(openNotch) {
        if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
          return;
        }

        if (openNotch) {
          var labelScale = numbers.LABEL_SCALE;
          var labelWidth = this.adapter_.getLabelWidth() * labelScale;
          var isRtl = this.adapter_.isRtl();
          this.adapter_.notchOutline(labelWidth, isRtl);
        } else {
          this.adapter_.closeOutline();
        }
      }
    }]);
    return MDCSelectFoundation;
  }(MDCFoundation);

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

  var numbers$1 = {
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
        return numbers$1;
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
          }, numbers$1.FG_DEACTIVATION_MS);
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
   * Adapter for MDC Floating Label.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the floating label into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCFloatingLabelAdapter = function () {
    function MDCFloatingLabelAdapter() {
      classCallCheck(this, MDCFloatingLabelAdapter);
    }

    createClass(MDCFloatingLabelAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the label element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the label element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns the width of the label element.
       * @return {number}
       */

    }, {
      key: "getWidth",
      value: function getWidth() {}

      /**
       * Registers an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}
    }]);
    return MDCFloatingLabelAdapter;
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
  var cssClasses$2 = {
    LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
    LABEL_SHAKE: 'mdc-floating-label--shake'
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
   * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
   * @final
   */

  var MDCFloatingLabelFoundation = function (_MDCFoundation) {
    inherits(MDCFloatingLabelFoundation, _MDCFoundation);
    createClass(MDCFloatingLabelFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$2;
      }

      /**
       * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCFloatingLabelAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCFloatingLabelAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            getWidth: function getWidth() {},
            registerInteractionHandler: function registerInteractionHandler() {},
            deregisterInteractionHandler: function deregisterInteractionHandler() {}
          }
        );
      }

      /**
       * @param {!MDCFloatingLabelAdapter} adapter
       */

    }]);

    function MDCFloatingLabelFoundation(adapter) {
      classCallCheck(this, MDCFloatingLabelFoundation);

      /** @private {function(!Event): undefined} */
      var _this = possibleConstructorReturn(this, (MDCFloatingLabelFoundation.__proto__ || Object.getPrototypeOf(MDCFloatingLabelFoundation)).call(this, _extends(MDCFloatingLabelFoundation.defaultAdapter, adapter)));

      _this.shakeAnimationEndHandler_ = function () {
        return _this.handleShakeAnimationEnd_();
      };
      return _this;
    }

    createClass(MDCFloatingLabelFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
      }

      /**
       * Returns the width of the label element.
       * @return {number}
       */

    }, {
      key: 'getWidth',
      value: function getWidth() {
        return this.adapter_.getWidth();
      }

      /**
       * Styles the label to produce the label shake for errors.
       * @param {boolean} shouldShake adds shake class if true,
       * otherwise removes shake class.
       */

    }, {
      key: 'shake',
      value: function shake(shouldShake) {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

        if (shouldShake) {
          this.adapter_.addClass(LABEL_SHAKE);
        } else {
          this.adapter_.removeClass(LABEL_SHAKE);
        }
      }

      /**
       * Styles the label to float or dock.
       * @param {boolean} shouldFloat adds float class if true, otherwise remove
       * float and shake class to dock label.
       */

    }, {
      key: 'float',
      value: function float(shouldFloat) {
        var _MDCFloatingLabelFoun = MDCFloatingLabelFoundation.cssClasses,
            LABEL_FLOAT_ABOVE = _MDCFloatingLabelFoun.LABEL_FLOAT_ABOVE,
            LABEL_SHAKE = _MDCFloatingLabelFoun.LABEL_SHAKE;

        if (shouldFloat) {
          this.adapter_.addClass(LABEL_FLOAT_ABOVE);
        } else {
          this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
          this.adapter_.removeClass(LABEL_SHAKE);
        }
      }

      /**
       * Handles an interaction event on the root element.
       */

    }, {
      key: 'handleShakeAnimationEnd_',
      value: function handleShakeAnimationEnd_() {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

        this.adapter_.removeClass(LABEL_SHAKE);
      }
    }]);
    return MDCFloatingLabelFoundation;
  }(MDCFoundation);

  var SelectLabel = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('label', { staticClass: "mdc-floating-label", class: _vm.labelClasses }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-select-label',
    data: function data() {
      return {
        labelClasses: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCFloatingLabelFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.labelClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.labelClasses, className);
        },
        getWidth: function getWidth() {
          return _this.$el.offsetWidth;
        },
        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
          _this.$el.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
          _this.$el.removeEventListener(evtType, handler);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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
   * Adapter for MDC TextField Line Ripple.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the line ripple into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCLineRippleAdapter = function () {
    function MDCLineRippleAdapter() {
      classCallCheck(this, MDCLineRippleAdapter);
    }

    createClass(MDCLineRippleAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the line ripple element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the line ripple element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /**
       * Sets the style property with propertyName to value on the root element.
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setStyle",
      value: function setStyle(propertyName, value) {}

      /**
       * Registers an event listener on the line ripple element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerEventHandler",
      value: function registerEventHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the line ripple element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterEventHandler",
      value: function deregisterEventHandler(evtType, handler) {}
    }]);
    return MDCLineRippleAdapter;
  }();

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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
  var cssClasses$3 = {
    LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
    LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
  };

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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
   * @extends {MDCFoundation<!MDCLineRippleAdapter>}
   * @final
   */

  var MDCLineRippleFoundation = function (_MDCFoundation) {
    inherits(MDCLineRippleFoundation, _MDCFoundation);
    createClass(MDCLineRippleFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$3;
      }

      /**
       * {@see MDCLineRippleAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCLineRippleAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCLineRippleAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {},
            setStyle: function setStyle() {},
            registerEventHandler: function registerEventHandler() {},
            deregisterEventHandler: function deregisterEventHandler() {}
          }
        );
      }

      /**
       * @param {!MDCLineRippleAdapter=} adapter
       */

    }]);

    function MDCLineRippleFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCLineRippleAdapter} */{};
      classCallCheck(this, MDCLineRippleFoundation);

      /** @private {function(!Event): undefined} */
      var _this = possibleConstructorReturn(this, (MDCLineRippleFoundation.__proto__ || Object.getPrototypeOf(MDCLineRippleFoundation)).call(this, _extends(MDCLineRippleFoundation.defaultAdapter, adapter)));

      _this.transitionEndHandler_ = function (evt) {
        return _this.handleTransitionEnd(evt);
      };
      return _this;
    }

    createClass(MDCLineRippleFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
      }

      /**
       * Activates the line ripple
       */

    }, {
      key: 'activate',
      value: function activate() {
        this.adapter_.removeClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
        this.adapter_.addClass(cssClasses$3.LINE_RIPPLE_ACTIVE);
      }

      /**
       * Sets the center of the ripple animation to the given X coordinate.
       * @param {number} xCoordinate
       */

    }, {
      key: 'setRippleCenter',
      value: function setRippleCenter(xCoordinate) {
        this.adapter_.setStyle('transform-origin', xCoordinate + 'px center');
      }

      /**
       * Deactivates the line ripple
       */

    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.adapter_.addClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
      }

      /**
       * Handles a transition end event
       * @param {!Event} evt
       */

    }, {
      key: 'handleTransitionEnd',
      value: function handleTransitionEnd(evt) {
        // Wait for the line ripple to be either transparent or opaque
        // before emitting the animation end event
        var isDeactivating = this.adapter_.hasClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);

        if (evt.propertyName === 'opacity') {
          if (isDeactivating) {
            this.adapter_.removeClass(cssClasses$3.LINE_RIPPLE_ACTIVE);
            this.adapter_.removeClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
          }
        }
      }
    }]);
    return MDCLineRippleFoundation;
  }(MDCFoundation);

  var SelectLineRiple = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-line-ripple", class: _vm.lineClasses, style: _vm.lineStyles });
    }, staticRenderFns: [],
    name: 'mdc-select-line-ripple',
    data: function data() {
      return {
        lineClasses: {},
        lineStyles: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCLineRippleFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.lineClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.lineClasses, className);
        },
        hasClass: function hasClass(className) {
          _this.$el.classList.contains(className);
        },
        setStyle: function setStyle(name, value) {
          _this.$set(_this.lineStyles, name, value);
        },
        registerEventHandler: function registerEventHandler(evtType, handler) {
          _this.$el.addEventListener(evtType, handler);
        },
        deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
          _this.$el.removeEventListener(evtType, handler);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

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
   * Adapter for MDC Notched Outline.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Notched Outline into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCNotchedOutlineAdapter = function () {
    function MDCNotchedOutlineAdapter() {
      classCallCheck(this, MDCNotchedOutlineAdapter);
    }

    createClass(MDCNotchedOutlineAdapter, [{
      key: "getWidth",

      /**
       * Returns the width of the root element.
       * @return {number}
       */
      value: function getWidth() {}

      /**
       * Returns the height of the root element.
       * @return {number}
       */

    }, {
      key: "getHeight",
      value: function getHeight() {}

      /**
       * Adds a class to the root element.
       * @param {string} className
       */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /**
       * Removes a class from the root element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Sets the "d" attribute of the outline element's SVG path.
       * @param {string} value
       */

    }, {
      key: "setOutlinePathAttr",
      value: function setOutlinePathAttr(value) {}

      /**
       * Returns the idle outline element's computed style value of the given css property `propertyName`.
       * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
       * @param {string} propertyName
       * @return {string}
       */

    }, {
      key: "getIdleOutlineStyleValue",
      value: function getIdleOutlineStyleValue(propertyName) {}
    }]);
    return MDCNotchedOutlineAdapter;
  }();

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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
  var strings$2 = {
    PATH_SELECTOR: '.mdc-notched-outline__path',
    IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle'
  };

  /** @enum {string} */
  var cssClasses$4 = {
    OUTLINE_NOTCHED: 'mdc-notched-outline--notched'
  };

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

  /**
   * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
   * @final
   */

  var MDCNotchedOutlineFoundation = function (_MDCFoundation) {
    inherits(MDCNotchedOutlineFoundation, _MDCFoundation);
    createClass(MDCNotchedOutlineFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings$2;
      }

      /** @return enum {string} */

    }, {
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$4;
      }

      /**
       * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCNotchedOutlineAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCNotchedOutlineAdapter} */{
            getWidth: function getWidth() {},
            getHeight: function getHeight() {},
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            setOutlinePathAttr: function setOutlinePathAttr() {},
            getIdleOutlineStyleValue: function getIdleOutlineStyleValue() {}
          }
        );
      }

      /**
       * @param {!MDCNotchedOutlineAdapter} adapter
       */

    }]);

    function MDCNotchedOutlineFoundation(adapter) {
      classCallCheck(this, MDCNotchedOutlineFoundation);
      return possibleConstructorReturn(this, (MDCNotchedOutlineFoundation.__proto__ || Object.getPrototypeOf(MDCNotchedOutlineFoundation)).call(this, _extends(MDCNotchedOutlineFoundation.defaultAdapter, adapter)));
    }

    /**
     * Adds the outline notched selector and updates the notch width
     * calculated based off of notchWidth and isRtl.
     * @param {number} notchWidth
     * @param {boolean=} isRtl
     */


    createClass(MDCNotchedOutlineFoundation, [{
      key: 'notch',
      value: function notch(notchWidth) {
        var isRtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

        this.adapter_.addClass(OUTLINE_NOTCHED);
        this.updateSvgPath_(notchWidth, isRtl);
      }

      /**
       * Removes notched outline selector to close the notch in the outline.
       */

    }, {
      key: 'closeNotch',
      value: function closeNotch() {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

        this.adapter_.removeClass(OUTLINE_NOTCHED);
      }

      /**
       * Updates the SVG path of the focus outline element based on the notchWidth
       * and the RTL context.
       * @param {number} notchWidth
       * @param {boolean=} isRtl
       * @private
       */

    }, {
      key: 'updateSvgPath_',
      value: function updateSvgPath_(notchWidth, isRtl) {
        // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
        var radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
        var radius = parseFloat(radiusStyleValue);
        var width = this.adapter_.getWidth();
        var height = this.adapter_.getHeight();
        var cornerWidth = radius + 1.2;
        var leadingStrokeLength = Math.abs(11 - cornerWidth);
        var paddedNotchWidth = notchWidth + 8;

        // The right, bottom, and left sides of the outline follow the same SVG path.
        var pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

        var path = void 0;
        if (!isRtl) {
          path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
        } else {
          path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength);
        }

        this.adapter_.setOutlinePathAttr(path);
      }
    }]);
    return MDCNotchedOutlineFoundation;
  }(MDCFoundation);

  var SelectNotchedOutline = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('div', { ref: "outlined", staticClass: "mdc-notched-outline", class: _vm.outlinedClasses }, [_c('svg', [_c('path', { ref: "outlinedPath", staticClass: "mdc-notched-outline__path" })])]), _vm._v(" "), _c('div', { ref: "outlinedIdle", staticClass: "mdc-notched-outline__idle" })]);
    }, staticRenderFns: [],
    name: 'mdc-select-notched-outline',
    data: function data() {
      return {
        outlinedClasses: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCNotchedOutlineFoundation({
        getWidth: function getWidth() {
          return _this.$refs.outlined.offsetWidth;
        },
        getHeight: function getHeight() {
          return _this.$refs.outlined.offsetHeight;
        },
        addClass: function addClass(className) {
          _this.$set(_this.outlinedClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.outlinedClasses, className);
        },
        setOutlinePathAttr: function setOutlinePathAttr(value) {
          var path = _this.$refs.outlinedPath;
          path.setAttribute('d', value);
        },
        getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
          return window.getComputedStyle(_this.$refs.outlinedIdle).getPropertyValue(propertyName);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

  var mdcSelect = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-select", class: _vm.rootClasses, style: _vm.styles, attrs: { "id": _vm.id } }, [_c('select', _vm._g(_vm._b({ ref: "native_control", staticClass: "mdc-select__native-control" }, 'select', _vm.$attrs, false), _vm.listeners), [!!_vm.label ? _c('option', { staticClass: "mdc-option", attrs: { "value": "", "disabled": "disabled", "selected": "selected" } }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2), _vm._v(" "), _vm.label ? _c('select-label', { ref: "label" }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), !_vm.outlined ? _c('select-line-riple', { ref: "line" }) : _vm._e(), _vm._v(" "), _vm.outlined ? _c('select-notched-outline', { ref: "outline" }) : _vm._e()], 1);
    }, staticRenderFns: [],
    name: 'mdc-select',
    components: {
      SelectLabel: SelectLabel,
      SelectLineRiple: SelectLineRiple,
      SelectNotchedOutline: SelectNotchedOutline
    },
    inheritAttrs: false,
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: String,
      disabled: Boolean,
      label: String,
      box: Boolean,
      outlined: Boolean,
      id: { type: String }
    },
    data: function data() {
      return {
        styles: {},
        classes: {}
      };
    },

    computed: {
      rootClasses: function rootClasses() {
        return _extends({
          'mdc-select--box': this.box,
          'mdc-select--outlined': this.outlined
        }, this.classes);
      },
      listeners: function listeners() {
        var _this = this;

        return _extends({}, this.$listeners, {
          change: function change(event) {
            return _this.$emit('change', event.target.value);
          }
        });
      }
    },
    watch: {
      disabled: function disabled(value) {
        this.foundation && this.foundation.setDisabled(value);
      },

      value: 'refreshIndex'
    },
    mounted: function mounted() {
      var _this2 = this;

      this.foundation = new MDCSelectFoundation({
        addClass: function addClass(className) {
          return _this2.$set(_this2.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this2.$delete(_this2.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this2.$el.classList.contains(className);
        },
        activateBottomLine: function activateBottomLine() {
          if (_this2.$refs.line) {
            _this2.$refs.line.foundation.activate();
          }
        },
        deactivateBottomLine: function deactivateBottomLine() {
          if (_this2.$refs.line) {
            _this2.$refs.line.foundation.deactivate();
          }
        },
        setDisabled: function setDisabled(disabled) {
          return _this2.$refs.native_control.disabled = disabled;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.$refs.native_control.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.$refs.native_control.removeEventListener(type, handler);
        },
        getSelectedIndex: function getSelectedIndex() {
          return _this2.$refs.native_control.selectedIndex;
        },
        setSelectedIndex: function setSelectedIndex(index$$1) {
          return _this2.$refs.native_control.selectedIndex = index$$1;
        },
        getValue: function getValue() {
          return _this2.$refs.native_control.value;
        },
        setValue: function setValue(value) {
          return _this2.$refs.native_control.value = value;
        },
        isRtl: function isRtl() {
          return window.getComputedStyle(_this2.$el).getPropertyValue('direction') === 'rtl';
        },
        notchOutline: function notchOutline(labelWidth, isRtl) {
          if (_this2.$refs.outline) {
            _this2.$refs.outline.foundation.notch(labelWidth, isRtl);
          }
        },
        closeOutline: function closeOutline() {
          if (_this2.$refs.outline) {
            _this2.$refs.outline.foundation.closeNotch();
          }
        },
        hasOutline: function hasOutline() {
          return !!_this2.$refs.outline;
        },
        floatLabel: function floatLabel(value) {
          if (_this2.$refs.label) {
            _this2.$refs.label.foundation.float(value);
          }
        },
        hasLabel: function hasLabel() {
          return !!_this2.$refs.label;
        },
        getLabelWidth: function getLabelWidth() {
          if (_this2.$refs.label) {
            return _this2.$refs.label.foundation.getWidth();
          }
        }
      });

      this.foundation.init();

      this.foundation.setDisabled(this.disabled);

      // initial sync with DOM
      this.refreshIndex();
      this.slotObserver = new MutationObserver(function () {
        return _this2.refreshIndex();
      });
      this.slotObserver.observe(this.$refs.native_control, {
        childList: true,
        subtree: true
      });

      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.slotObserver.disconnect();

      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();

      this.ripple && this.ripple.destroy();
    },

    methods: {
      refreshIndex: function refreshIndex() {
        var _this3 = this;

        var options = [].concat(toConsumableArray(this.$refs.native_control.querySelectorAll('option')));

        var idx = options.findIndex(function (_ref) {
          var value = _ref.value;

          return _this3.value === value;
        });

        if (this.$refs.native_control.selectedIndex !== idx) {
          this.foundation.setSelectedIndex(idx);
        }
      }
    }
  };

  var plugin = BasePlugin({
    mdcSelect: mdcSelect
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS91bmlxdWVpZC1taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0L2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Zsb2F0aW5nLWxhYmVsL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Zsb2F0aW5nLWxhYmVsL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L21kYy1zZWxlY3QtbGFiZWwudnVlIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lLXJpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lLXJpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9tZGMtc2VsZWN0LWxpbmUtcmlwcGxlLnZ1ZSIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvbWRjLXNlbGVjdC1ub3RjaGVkLW91dGxpbmUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvbWRjLXNlbGVjdC52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiB2bSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9XG59XG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJjb25zdCBzY29wZSA9XG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcblxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XG4gIGJlZm9yZUNyZWF0ZSgpIHtcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IHtNRENGb3VuZGF0aW9uLCBNRENDb21wb25lbnR9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEJPWDogJ21kYy1zZWxlY3QtLWJveCcsXG4gIERJU0FCTEVEOiAnbWRjLXNlbGVjdC0tZGlzYWJsZWQnLFxuICBST09UOiAnbWRjLXNlbGVjdCcsXG4gIE9VVExJTkVEOiAnbWRjLXNlbGVjdC0tb3V0bGluZWQnLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgQ0hBTkdFX0VWRU5UOiAnTURDU2VsZWN0OmNoYW5nZScsXG4gIExJTkVfUklQUExFX1NFTEVDVE9SOiAnLm1kYy1saW5lLXJpcHBsZScsXG4gIExBQkVMX1NFTEVDVE9SOiAnLm1kYy1mbG9hdGluZy1sYWJlbCcsXG4gIE5BVElWRV9DT05UUk9MX1NFTEVDVE9SOiAnLm1kYy1zZWxlY3RfX25hdGl2ZS1jb250cm9sJyxcbiAgT1VUTElORV9TRUxFQ1RPUjogJy5tZGMtbm90Y2hlZC1vdXRsaW5lJyxcbn07XG5cbi8qKiBAZW51bSB7bnVtYmVyfSAqL1xuY29uc3QgbnVtYmVycyA9IHtcbiAgTEFCRUxfU0NBTEU6IDAuNzUsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURDU2VsZWN0Rm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaGFzQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4gZmFsc2UsXG4gICAgICBmbG9hdExhYmVsOiAoLyogdmFsdWU6IGJvb2xlYW4gKi8pID0+IHt9LFxuICAgICAgYWN0aXZhdGVCb3R0b21MaW5lOiAoKSA9PiB7fSxcbiAgICAgIGRlYWN0aXZhdGVCb3R0b21MaW5lOiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0U2VsZWN0ZWRJbmRleDogKCkgPT4gLyogbnVtYmVyICovIC0xLFxuICAgICAgc2V0U2VsZWN0ZWRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IHt9LFxuICAgICAgc2V0RGlzYWJsZWQ6ICgvKiBkaXNhYmxlZDogYm9vbGVhbiAqLykgPT4ge30sXG4gICAgICBnZXRWYWx1ZTogKCkgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgc2V0VmFsdWU6ICgvKiB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGlzUnRsOiAoKSA9PiBmYWxzZSxcbiAgICAgIGhhc0xhYmVsOiAoKSA9PiB7fSxcbiAgICAgIGdldExhYmVsV2lkdGg6ICgpID0+IHt9LFxuICAgICAgaGFzT3V0bGluZTogKCkgPT4ge30sXG4gICAgICBub3RjaE91dGxpbmU6ICgpID0+IHt9LFxuICAgICAgY2xvc2VPdXRsaW5lOiAoKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU2VsZWN0Rm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVGb2N1c18oZXZ0KTtcbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlQmx1cl8oZXZ0KTtcbiAgICB0aGlzLnNlbGVjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVTZWxlY3RfKGV2dCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NoYW5nZScsIHRoaXMuc2VsZWN0aW9uSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjaGFuZ2UnLCB0aGlzLnNlbGVjdGlvbkhhbmRsZXJfKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFNlbGVjdGVkSW5kZXgoaW5kZXgpO1xuICAgIHRoaXMuZmxvYXRMYWJlbFdpdGhWYWx1ZV8oKTtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5zZXRTZWxlY3RlZEluZGV4KHRoaXMuYWRhcHRlcl8uZ2V0U2VsZWN0ZWRJbmRleCgpKTtcbiAgfVxuXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgY29uc3Qge0RJU0FCTEVEfSA9IE1EQ1NlbGVjdEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnNldERpc2FibGVkKGRpc2FibGVkKTtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRElTQUJMRUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKERJU0FCTEVEKTtcbiAgICB9XG4gIH1cblxuICBmbG9hdExhYmVsV2l0aFZhbHVlXygpIHtcbiAgICBjb25zdCBvcHRpb25IYXNWYWx1ZSA9IHRoaXMuYWRhcHRlcl8uZ2V0VmFsdWUoKS5sZW5ndGggPiAwO1xuICAgIHRoaXMuYWRhcHRlcl8uZmxvYXRMYWJlbChvcHRpb25IYXNWYWx1ZSk7XG4gICAgdGhpcy5ub3RjaE91dGxpbmUob3B0aW9uSGFzVmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlRm9jdXNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZmxvYXRMYWJlbCh0cnVlKTtcbiAgICB0aGlzLm5vdGNoT3V0bGluZSh0cnVlKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFjdGl2YXRlQm90dG9tTGluZSgpO1xuICB9XG5cbiAgaGFuZGxlQmx1cl8oKSB7XG4gICAgdGhpcy5mbG9hdExhYmVsV2l0aFZhbHVlXygpO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVhY3RpdmF0ZUJvdHRvbUxpbmUoKTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdF8oKSB7XG4gICAgdGhpcy5zZXRTZWxlY3RlZEluZGV4KHRoaXMuYWRhcHRlcl8uZ2V0U2VsZWN0ZWRJbmRleCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucy9jbG9zZXMgdGhlIG5vdGNoZWQgb3V0bGluZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcGVuTm90Y2hcbiAgICovXG4gIG5vdGNoT3V0bGluZShvcGVuTm90Y2gpIHtcbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzT3V0bGluZSgpIHx8ICF0aGlzLmFkYXB0ZXJfLmhhc0xhYmVsKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob3Blbk5vdGNoKSB7XG4gICAgICBjb25zdCBsYWJlbFNjYWxlID0gbnVtYmVycy5MQUJFTF9TQ0FMRTtcbiAgICAgIGNvbnN0IGxhYmVsV2lkdGggPSB0aGlzLmFkYXB0ZXJfLmdldExhYmVsV2lkdGgoKSAqIGxhYmVsU2NhbGU7XG4gICAgICBjb25zdCBpc1J0bCA9IHRoaXMuYWRhcHRlcl8uaXNSdGwoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90Y2hPdXRsaW5lKGxhYmVsV2lkdGgsIGlzUnRsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5jbG9zZU91dGxpbmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgbGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCA9IHdpbmRvd09iai5DU1MgJiYgdHlwZW9mIHdpbmRvd09iai5DU1Muc3VwcG9ydHMgPT09ICdmdW5jdGlvbic7XG4gIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzID0gd2luZG93T2JqLkNTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcbiAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU0NjY5XG4gIC8vIFNlZTogUkVBRE1FIHNlY3Rpb24gb24gU2FmYXJpXG4gIGNvbnN0IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyA9IChcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnY29sb3InLCAnIzAwMDAwMDAwJylcbiAgKTtcblxuICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghZm9yY2VSZWZyZXNoKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBwYWdlT2Zmc2V0XG4gKiBAcGFyYW0geyFDbGllbnRSZWN0fSBjbGllbnRSZWN0XG4gKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGRlYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZm9jdXM6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgYmx1cjogKHN0cmluZ3x1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJJbmZvVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVGb2N1cygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlQmx1cigpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG5cbiAgICAvKiogQHByaXZhdGUge3tsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0V2ZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc1N1cHBvcnRlZF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFBY3RpdmF0aW9uU3RhdGVUeXBlfVxuICAgKi9cbiAgZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiBmYWxzZSxcbiAgICAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogZmFsc2UsXG4gICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXG4gICAgICBhY3RpdmF0aW9uRXZlbnQ6IG51bGwsXG4gICAgICBpc1Byb2dyYW1tYXRpYzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2YXRpb25UaW1lcl8pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcbiAgICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgfVxuXG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSAmJiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleUNvZGUgPT09IDMyKSkge1xuICAgICAgICAvLyBJZiBzcGFjZSB3YXMgcHJlc3NlZCwgdHJ5IGFnYWluIHdpdGhpbiBhbiByQUYgY2FsbCB0byBkZXRlY3QgOmFjdGl2ZSwgYmVjYXVzZSBkaWZmZXJlbnQgVUFzIHJlcG9ydFxuICAgICAgICAvLyBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgICAvLyBXZSB0cnkgZmlyc3Qgb3V0c2lkZSByQUYgdG8gc3VwcG9ydCBFZGdlLCB3aGljaCBkb2VzIG5vdCBleGhpYml0IHRoaXMgcHJvYmxlbSwgYnV0IHdpbGwgY3Jhc2ggaWYgYSBDU1NcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgc2V0IHdpdGhpbiBhIHJBRiBjYWxsYmFjayBmb3IgYSBzdWJtaXQgYnV0dG9uIGludGVyYWN0aW9uICgjMjI0MSkuXG4gICAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpIHtcbiAgICByZXR1cm4gKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oZSkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIGNvbnN0IGV2dE9iamVjdCA9IG51bGw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhldnRPYmplY3QsIHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyhlLCB7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEU7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xuaW1wb3J0IHtcbiAgc3VwcG9ydHNDc3NWYXJpYWJsZXMsXG4gIGdldE1hdGNoZXNQcm9wZXJ0eSxcbiAgYXBwbHlQYXNzaXZlXG59IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcblxuZXhwb3J0IGNsYXNzIFJpcHBsZUJhc2UgZXh0ZW5kcyBNRENSaXBwbGVGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBNQVRDSEVTKCkge1xuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xuICAgIHJldHVybiAoXG4gICAgICBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XG4gICAgICAoUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxuICAgIClcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cmZhY2VBY3RpdmUocmVmKSB7XG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZtLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB7XG4gICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbFtSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uZGlzYWJsZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udGFpbnNFdmVudFRhcmdldDogdGFyZ2V0ID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxuICAgICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgIGV2dFR5cGUsXG4gICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IHg6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0IH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIClcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIEZsb2F0aW5nIExhYmVsLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIGZsb2F0aW5nIGxhYmVsIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENGbG9hdGluZ0xhYmVsQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFdpZHRoKCkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGbG9hdGluZ0xhYmVsQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExBQkVMX0ZMT0FUX0FCT1ZFOiAnbWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZScsXG4gIExBQkVMX1NIQUtFOiAnbWRjLWZsb2F0aW5nLWxhYmVsLS1zaGFrZScsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBnZXRXaWR0aDogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlU2hha2VBbmltYXRpb25FbmRfKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYW5pbWF0aW9uZW5kJywgdGhpcy5zaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgbGFiZWwgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0V2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0V2lkdGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGxhYmVsIHRvIHByb2R1Y2UgdGhlIGxhYmVsIHNoYWtlIGZvciBlcnJvcnMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkU2hha2UgYWRkcyBzaGFrZSBjbGFzcyBpZiB0cnVlLFxuICAgKiBvdGhlcndpc2UgcmVtb3ZlcyBzaGFrZSBjbGFzcy5cbiAgICovXG4gIHNoYWtlKHNob3VsZFNoYWtlKSB7XG4gICAgY29uc3Qge0xBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHNob3VsZFNoYWtlKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKExBQkVMX1NIQUtFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgbGFiZWwgdG8gZmxvYXQgb3IgZG9jay5cbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRGbG9hdCBhZGRzIGZsb2F0IGNsYXNzIGlmIHRydWUsIG90aGVyd2lzZSByZW1vdmVcbiAgICogZmxvYXQgYW5kIHNoYWtlIGNsYXNzIHRvIGRvY2sgbGFiZWwuXG4gICAqL1xuICBmbG9hdChzaG91bGRGbG9hdCkge1xuICAgIGNvbnN0IHtMQUJFTF9GTE9BVF9BQk9WRSwgTEFCRUxfU0hBS0V9ID0gTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoc2hvdWxkRmxvYXQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTEFCRUxfRkxPQVRfQUJPVkUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGludGVyYWN0aW9uIGV2ZW50IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqL1xuICBoYW5kbGVTaGFrZUFuaW1hdGlvbkVuZF8oKSB7XG4gICAgY29uc3Qge0xBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb247XG4iLCI8dGVtcGxhdGU+XG4gIDxsYWJlbFxuICAgIDpjbGFzcz1cImxhYmVsQ2xhc3Nlc1wiXG4gICAgY2xhc3M9XCJtZGMtZmxvYXRpbmctbGFiZWxcIj5cbiAgICA8c2xvdCAvPlxuICA8L2xhYmVsPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvZm91bmRhdGlvbidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXNlbGVjdC1sYWJlbCcsXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsQ2xhc3Nlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5sYWJlbENsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMubGFiZWxDbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICB9LFxuICAgICAgZ2V0V2lkdGg6ICgpID0+IHRoaXMuJGVsLm9mZnNldFdpZHRoLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgbGV0IGZvdW5kYXRpb24gPSB0aGlzLmZvdW5kYXRpb25cbiAgICB0aGlzLmZvdW5kYXRpb24gPSBudWxsXG4gICAgZm91bmRhdGlvbi5kZXN0cm95KClcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHRGaWVsZCBMaW5lIFJpcHBsZS5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBsaW5lIHJpcHBsZSBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDTGluZVJpcHBsZUFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgc3R5bGUgcHJvcGVydHkgd2l0aCBwcm9wZXJ0eU5hbWUgdG8gdmFsdWUgb24gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldFN0eWxlKHByb3BlcnR5TmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbGluZSByaXBwbGUgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENMaW5lUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExJTkVfUklQUExFX0FDVElWRTogJ21kYy1saW5lLXJpcHBsZS0tYWN0aXZlJyxcbiAgTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HOiAnbWRjLWxpbmUtcmlwcGxlLS1kZWFjdGl2YXRpbmcnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENMaW5lUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDTGluZVJpcHBsZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0xpbmVSaXBwbGVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTGluZVJpcHBsZUFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICBzZXRTdHlsZTogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENMaW5lUmlwcGxlQWRhcHRlcj19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSAvKiogQHR5cGUgeyFNRENMaW5lUmlwcGxlQWRhcHRlcn0gKi8gKHt9KSkge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDTGluZVJpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJFdmVudEhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckV2ZW50SGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlXG4gICAqL1xuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfQUNUSVZFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjZW50ZXIgb2YgdGhlIHJpcHBsZSBhbmltYXRpb24gdG8gdGhlIGdpdmVuIFggY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHhDb29yZGluYXRlXG4gICAqL1xuICBzZXRSaXBwbGVDZW50ZXIoeENvb3JkaW5hdGUpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKCd0cmFuc2Zvcm0tb3JpZ2luJywgYCR7eENvb3JkaW5hdGV9cHggY2VudGVyYCk7XG4gIH1cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlXG4gICAqL1xuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSB0cmFuc2l0aW9uIGVuZCBldmVudFxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCkge1xuICAgIC8vIFdhaXQgZm9yIHRoZSBsaW5lIHJpcHBsZSB0byBiZSBlaXRoZXIgdHJhbnNwYXJlbnQgb3Igb3BhcXVlXG4gICAgLy8gYmVmb3JlIGVtaXR0aW5nIHRoZSBhbmltYXRpb24gZW5kIGV2ZW50XG4gICAgY29uc3QgaXNEZWFjdGl2YXRpbmcgPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcblxuICAgIGlmIChldnQucHJvcGVydHlOYW1lID09PSAnb3BhY2l0eScpIHtcbiAgICAgIGlmIChpc0RlYWN0aXZhdGluZykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfQUNUSVZFKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uO1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2XG4gICAgOmNsYXNzPVwibGluZUNsYXNzZXNcIlxuICAgIDpzdHlsZT1cImxpbmVTdHlsZXNcIlxuICAgIGNsYXNzPVwibWRjLWxpbmUtcmlwcGxlXCIvPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENMaW5lUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbGluZS1yaXBwbGUvZm91bmRhdGlvbidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXNlbGVjdC1saW5lLXJpcHBsZScsXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbmVDbGFzc2VzOiB7fSxcbiAgICAgIGxpbmVTdHlsZXM6IHt9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENMaW5lUmlwcGxlRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMubGluZUNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMubGluZUNsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBzZXRTdHlsZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmxpbmVTdHlsZXMsIG5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIGxldCBmb3VuZGF0aW9uID0gdGhpcy5mb3VuZGF0aW9uXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbnVsbFxuICAgIGZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBOb3RjaGVkIE91dGxpbmUuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgTm90Y2hlZCBPdXRsaW5lIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0V2lkdGgoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0SGVpZ2h0KCkge31cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBcImRcIiBhdHRyaWJ1dGUgb2YgdGhlIG91dGxpbmUgZWxlbWVudCdzIFNWRyBwYXRoLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldE91dGxpbmVQYXRoQXR0cih2YWx1ZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWRsZSBvdXRsaW5lIGVsZW1lbnQncyBjb21wdXRlZCBzdHlsZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gY3NzIHByb3BlcnR5IGBwcm9wZXJ0eU5hbWVgLlxuICAgKiBXZSBhY2hpZXZlIHRoaXMgdmlhIGBnZXRDb21wdXRlZFN0eWxlKC4uLikuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpYC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUocHJvcGVydHlOYW1lKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBQQVRIX1NFTEVDVE9SOiAnLm1kYy1ub3RjaGVkLW91dGxpbmVfX3BhdGgnLFxuICBJRExFX09VVExJTkVfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZV9faWRsZScsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIE9VVExJTkVfTk9UQ0hFRDogJ21kYy1ub3RjaGVkLW91dGxpbmUtLW5vdGNoZWQnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9ICovICh7XG4gICAgICBnZXRXaWR0aDogKCkgPT4ge30sXG4gICAgICBnZXRIZWlnaHQ6ICgpID0+IHt9LFxuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgc2V0T3V0bGluZVBhdGhBdHRyOiAoKSA9PiB7fSxcbiAgICAgIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZTogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBvdXRsaW5lIG5vdGNoZWQgc2VsZWN0b3IgYW5kIHVwZGF0ZXMgdGhlIG5vdGNoIHdpZHRoXG4gICAqIGNhbGN1bGF0ZWQgYmFzZWQgb2ZmIG9mIG5vdGNoV2lkdGggYW5kIGlzUnRsLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90Y2hXaWR0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpc1J0bFxuICAgKi9cbiAgbm90Y2gobm90Y2hXaWR0aCwgaXNSdGwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHtPVVRMSU5FX05PVENIRUR9ID0gTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhPVVRMSU5FX05PVENIRUQpO1xuICAgIHRoaXMudXBkYXRlU3ZnUGF0aF8obm90Y2hXaWR0aCwgaXNSdGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgbm90Y2hlZCBvdXRsaW5lIHNlbGVjdG9yIHRvIGNsb3NlIHRoZSBub3RjaCBpbiB0aGUgb3V0bGluZS5cbiAgICovXG4gIGNsb3NlTm90Y2goKSB7XG4gICAgY29uc3Qge09VVExJTkVfTk9UQ0hFRH0gPSBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE9VVExJTkVfTk9UQ0hFRCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgU1ZHIHBhdGggb2YgdGhlIGZvY3VzIG91dGxpbmUgZWxlbWVudCBiYXNlZCBvbiB0aGUgbm90Y2hXaWR0aFxuICAgKiBhbmQgdGhlIFJUTCBjb250ZXh0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90Y2hXaWR0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpc1J0bFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdXBkYXRlU3ZnUGF0aF8obm90Y2hXaWR0aCwgaXNSdGwpIHtcbiAgICAvLyBGYWxsIGJhY2sgdG8gcmVhZGluZyBhIHNwZWNpZmljIGNvcm5lcidzIHN0eWxlIGJlY2F1c2UgRmlyZWZveCBkb2Vzbid0IHJlcG9ydCB0aGUgc3R5bGUgb24gYm9yZGVyLXJhZGl1cy5cbiAgICBjb25zdCByYWRpdXNTdHlsZVZhbHVlID0gdGhpcy5hZGFwdGVyXy5nZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUoJ2JvcmRlci1yYWRpdXMnKSB8fFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSgnYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cycpO1xuICAgIGNvbnN0IHJhZGl1cyA9IHBhcnNlRmxvYXQocmFkaXVzU3R5bGVWYWx1ZSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmFkYXB0ZXJfLmdldFdpZHRoKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5hZGFwdGVyXy5nZXRIZWlnaHQoKTtcbiAgICBjb25zdCBjb3JuZXJXaWR0aCA9IHJhZGl1cyArIDEuMjtcbiAgICBjb25zdCBsZWFkaW5nU3Ryb2tlTGVuZ3RoID0gTWF0aC5hYnMoMTEgLSBjb3JuZXJXaWR0aCk7XG4gICAgY29uc3QgcGFkZGVkTm90Y2hXaWR0aCA9IG5vdGNoV2lkdGggKyA4O1xuXG4gICAgLy8gVGhlIHJpZ2h0LCBib3R0b20sIGFuZCBsZWZ0IHNpZGVzIG9mIHRoZSBvdXRsaW5lIGZvbGxvdyB0aGUgc2FtZSBTVkcgcGF0aC5cbiAgICBjb25zdCBwYXRoTWlkZGxlID0gJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgcmFkaXVzICsgJywnICsgcmFkaXVzXG4gICAgICArICd2JyArIChoZWlnaHQgLSAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgLXJhZGl1cyArICcsJyArIHJhZGl1c1xuICAgICAgKyAnaCcgKyAoLXdpZHRoICsgKDIgKiBjb3JuZXJXaWR0aCkpXG4gICAgICArICdhJyArIHJhZGl1cyArICcsJyArIHJhZGl1cyArICcgMCAwIDEgJyArIC1yYWRpdXMgKyAnLCcgKyAtcmFkaXVzXG4gICAgICArICd2JyArICgtaGVpZ2h0ICsgKDIgKiBjb3JuZXJXaWR0aCkpXG4gICAgICArICdhJyArIHJhZGl1cyArICcsJyArIHJhZGl1cyArICcgMCAwIDEgJyArIHJhZGl1cyArICcsJyArIC1yYWRpdXM7XG5cbiAgICBsZXQgcGF0aDtcbiAgICBpZiAoIWlzUnRsKSB7XG4gICAgICBwYXRoID0gJ00nICsgKGNvcm5lcldpZHRoICsgbGVhZGluZ1N0cm9rZUxlbmd0aCArIHBhZGRlZE5vdGNoV2lkdGgpICsgJywnICsgMVxuICAgICAgICArICdoJyArICh3aWR0aCAtICgyICogY29ybmVyV2lkdGgpIC0gcGFkZGVkTm90Y2hXaWR0aCAtIGxlYWRpbmdTdHJva2VMZW5ndGgpXG4gICAgICAgICsgcGF0aE1pZGRsZVxuICAgICAgICArICdoJyArIGxlYWRpbmdTdHJva2VMZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhdGggPSAnTScgKyAod2lkdGggLSBjb3JuZXJXaWR0aCAtIGxlYWRpbmdTdHJva2VMZW5ndGgpICsgJywnICsgMVxuICAgICAgICArICdoJyArIGxlYWRpbmdTdHJva2VMZW5ndGhcbiAgICAgICAgKyBwYXRoTWlkZGxlXG4gICAgICAgICsgJ2gnICsgKHdpZHRoIC0gKDIgKiBjb3JuZXJXaWR0aCkgLSBwYWRkZWROb3RjaFdpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5zZXRPdXRsaW5lUGF0aEF0dHIocGF0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uO1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxkaXZcbiAgICAgIHJlZj1cIm91dGxpbmVkXCJcbiAgICAgIDpjbGFzcz1cIm91dGxpbmVkQ2xhc3Nlc1wiXG4gICAgICBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVcIj5cbiAgICAgIDxzdmc+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgcmVmPVwib3V0bGluZWRQYXRoXCJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX3BhdGhcIi8+XG4gICAgICA8L3N2Zz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICByZWY9XCJvdXRsaW5lZElkbGVcIlxuICAgICAgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX19pZGxlXCIvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDbm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1zZWxlY3Qtbm90Y2hlZC1vdXRsaW5lJyxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3V0bGluZWRDbGFzc2VzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDbm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uRm91bmRhdGlvbih7XG4gICAgICBnZXRXaWR0aDogKCkgPT4gdGhpcy4kcmVmcy5vdXRsaW5lZC5vZmZzZXRXaWR0aCxcbiAgICAgIGdldEhlaWdodDogKCkgPT4gdGhpcy4kcmVmcy5vdXRsaW5lZC5vZmZzZXRIZWlnaHQsXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMub3V0bGluZWRDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLm91dGxpbmVkQ2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIHNldE91dGxpbmVQYXRoQXR0cjogdmFsdWUgPT4ge1xuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy4kcmVmcy5vdXRsaW5lZFBhdGhcbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBnZXRJZGxlT3V0bGluZVN0eWxlVmFsdWU6IHByb3BlcnR5TmFtZSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3dcbiAgICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLiRyZWZzLm91dGxpbmVkSWRsZSlcbiAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgbGV0IGZvdW5kYXRpb24gPSB0aGlzLmZvdW5kYXRpb25cbiAgICB0aGlzLmZvdW5kYXRpb24gPSBudWxsXG4gICAgZm91bmRhdGlvbi5kZXN0cm95KClcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXZcbiAgICA6aWQ9XCJpZFwiXG4gICAgOmNsYXNzPVwicm9vdENsYXNzZXNcIlxuICAgIDpzdHlsZT1cInN0eWxlc1wiXG4gICAgY2xhc3M9XCJtZGMtc2VsZWN0XCI+XG4gICAgPHNlbGVjdFxuICAgICAgcmVmPVwibmF0aXZlX2NvbnRyb2xcIlxuICAgICAgdi1iaW5kPVwiJGF0dHJzXCJcbiAgICAgIGNsYXNzPVwibWRjLXNlbGVjdF9fbmF0aXZlLWNvbnRyb2xcIlxuICAgICAgdi1vbj1cImxpc3RlbmVyc1wiPlxuICAgICAgPG9wdGlvblxuICAgICAgICB2LWlmPVwiISFsYWJlbFwiXG4gICAgICAgIGNsYXNzPVwibWRjLW9wdGlvblwiXG4gICAgICAgIHZhbHVlPVwiXCJcbiAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgc2VsZWN0ZWQvPlxuICAgICAgPHNsb3QvPlxuICAgIDwvc2VsZWN0PlxuICAgIDwhLS0gbGFiZWwgLS0+XG4gICAgPHNlbGVjdC1sYWJlbFxuICAgICAgdi1pZj1cImxhYmVsXCJcbiAgICAgIHJlZj1cImxhYmVsXCI+e3sgbGFiZWwgfX08L3NlbGVjdC1sYWJlbD5cbiAgICA8IS0tIGxpbmUgcmlwcGxlIC0tPlxuICAgIDxzZWxlY3QtbGluZS1yaXBsZVxuICAgICAgdi1pZj1cIiFvdXRsaW5lZFwiXG4gICAgICByZWY9XCJsaW5lXCIvPlxuICAgIDwhLS0gb3V0bGluZSAtLT5cbiAgICA8c2VsZWN0LW5vdGNoZWQtb3V0bGluZVxuICAgICAgdi1pZj1cIm91dGxpbmVkXCJcbiAgICAgIHJlZj1cIm91dGxpbmVcIlxuICAgIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENTZWxlY3RGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9zZWxlY3QvZm91bmRhdGlvbidcbmltcG9ydCB7IFJpcHBsZUJhc2UgfSBmcm9tICcuLi9yaXBwbGUnXG5cbmltcG9ydCBTZWxlY3RMYWJlbCBmcm9tICcuL21kYy1zZWxlY3QtbGFiZWwudnVlJ1xuaW1wb3J0IFNlbGVjdExpbmVSaXBsZSBmcm9tICcuL21kYy1zZWxlY3QtbGluZS1yaXBwbGUudnVlJ1xuaW1wb3J0IFNlbGVjdE5vdGNoZWRPdXRsaW5lIGZyb20gJy4vbWRjLXNlbGVjdC1ub3RjaGVkLW91dGxpbmUudnVlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtc2VsZWN0JyxcbiAgY29tcG9uZW50czoge1xuICAgIFNlbGVjdExhYmVsLFxuICAgIFNlbGVjdExpbmVSaXBsZSxcbiAgICBTZWxlY3ROb3RjaGVkT3V0bGluZVxuICB9LFxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICd2YWx1ZScsXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGJveDogQm9vbGVhbixcbiAgICBvdXRsaW5lZDogQm9vbGVhbixcbiAgICBpZDogeyB0eXBlOiBTdHJpbmcgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdHlsZXM6IHt9LFxuICAgICAgY2xhc3Nlczoge31cbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgcm9vdENsYXNzZXMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnbWRjLXNlbGVjdC0tYm94JzogdGhpcy5ib3gsXG4gICAgICAgICdtZGMtc2VsZWN0LS1vdXRsaW5lZCc6IHRoaXMub3V0bGluZWQsXG4gICAgICAgIC4uLnRoaXMuY2xhc3Nlc1xuICAgICAgfVxuICAgIH0sXG4gICAgbGlzdGVuZXJzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICBjaGFuZ2U6IGV2ZW50ID0+IHRoaXMuJGVtaXQoJ2NoYW5nZScsIGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodmFsdWUpXG4gICAgfSxcbiAgICB2YWx1ZTogJ3JlZnJlc2hJbmRleCdcbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDU2VsZWN0Rm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgYWN0aXZhdGVCb3R0b21MaW5lOiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLiRyZWZzLmxpbmUpIHtcbiAgICAgICAgICB0aGlzLiRyZWZzLmxpbmUuZm91bmRhdGlvbi5hY3RpdmF0ZSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWFjdGl2YXRlQm90dG9tTGluZTogKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy4kcmVmcy5saW5lKSB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5saW5lLmZvdW5kYXRpb24uZGVhY3RpdmF0ZSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXREaXNhYmxlZDogZGlzYWJsZWQgPT4gKHRoaXMuJHJlZnMubmF0aXZlX2NvbnRyb2wuZGlzYWJsZWQgPSBkaXNhYmxlZCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJHJlZnMubmF0aXZlX2NvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLm5hdGl2ZV9jb250cm9sLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXG4gICAgICBnZXRTZWxlY3RlZEluZGV4OiAoKSA9PiB0aGlzLiRyZWZzLm5hdGl2ZV9jb250cm9sLnNlbGVjdGVkSW5kZXgsXG4gICAgICBzZXRTZWxlY3RlZEluZGV4OiBpbmRleCA9PlxuICAgICAgICAodGhpcy4kcmVmcy5uYXRpdmVfY29udHJvbC5zZWxlY3RlZEluZGV4ID0gaW5kZXgpLFxuICAgICAgZ2V0VmFsdWU6ICgpID0+IHRoaXMuJHJlZnMubmF0aXZlX2NvbnRyb2wudmFsdWUsXG4gICAgICBzZXRWYWx1ZTogdmFsdWUgPT4gKHRoaXMuJHJlZnMubmF0aXZlX2NvbnRyb2wudmFsdWUgPSB2YWx1ZSksXG4gICAgICBpc1J0bDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuJGVsKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXJlY3Rpb24nKSA9PT1cbiAgICAgICAgICAncnRsJ1xuICAgICAgICApXG4gICAgICB9LFxuICAgICAgbm90Y2hPdXRsaW5lOiAobGFiZWxXaWR0aCwgaXNSdGwpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuJHJlZnMub3V0bGluZSkge1xuICAgICAgICAgIHRoaXMuJHJlZnMub3V0bGluZS5mb3VuZGF0aW9uLm5vdGNoKGxhYmVsV2lkdGgsIGlzUnRsKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xvc2VPdXRsaW5lOiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLiRyZWZzLm91dGxpbmUpIHtcbiAgICAgICAgICB0aGlzLiRyZWZzLm91dGxpbmUuZm91bmRhdGlvbi5jbG9zZU5vdGNoKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc091dGxpbmU6ICgpID0+ICEhdGhpcy4kcmVmcy5vdXRsaW5lLFxuICAgICAgZmxvYXRMYWJlbDogdmFsdWUgPT4ge1xuICAgICAgICBpZiAodGhpcy4kcmVmcy5sYWJlbCkge1xuICAgICAgICAgIHRoaXMuJHJlZnMubGFiZWwuZm91bmRhdGlvbi5mbG9hdCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc0xhYmVsOiAoKSA9PiAhIXRoaXMuJHJlZnMubGFiZWwsXG4gICAgICBnZXRMYWJlbFdpZHRoOiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLiRyZWZzLmxhYmVsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMubGFiZWwuZm91bmRhdGlvbi5nZXRXaWR0aCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpXG5cbiAgICAvLyBpbml0aWFsIHN5bmMgd2l0aCBET01cbiAgICB0aGlzLnJlZnJlc2hJbmRleCgpXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB0aGlzLnJlZnJlc2hJbmRleCgpKVxuICAgIHRoaXMuc2xvdE9ic2VydmVyLm9ic2VydmUodGhpcy4kcmVmcy5uYXRpdmVfY29udHJvbCwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZVxuICAgIH0pXG5cbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG5cbiAgICBsZXQgZm91bmRhdGlvbiA9IHRoaXMuZm91bmRhdGlvblxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG51bGxcbiAgICBmb3VuZGF0aW9uLmRlc3Ryb3koKVxuXG4gICAgdGhpcy5yaXBwbGUgJiYgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICByZWZyZXNoSW5kZXgoKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gWy4uLnRoaXMuJHJlZnMubmF0aXZlX2NvbnRyb2wucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJyldXG5cbiAgICAgIGNvbnN0IGlkeCA9IG9wdGlvbnMuZmluZEluZGV4KCh7IHZhbHVlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IHZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAodGhpcy4kcmVmcy5uYXRpdmVfY29udHJvbC5zZWxlY3RlZEluZGV4ICE9PSBpZHgpIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFNlbGVjdGVkSW5kZXgoaWR4KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNTZWxlY3QgZnJvbSAnLi9tZGMtc2VsZWN0LnZ1ZSdcblxuZXhwb3J0IHsgbWRjU2VsZWN0IH1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY1NlbGVjdFxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDQ29tcG9uZW50Iiwicm9vdCIsImZvdW5kYXRpb24iLCJ1bmRlZmluZWQiLCJyb290XyIsImFyZ3MiLCJpbml0aWFsaXplIiwiZm91bmRhdGlvbl8iLCJnZXREZWZhdWx0Rm91bmRhdGlvbiIsImluaXQiLCJpbml0aWFsU3luY1dpdGhET00iLCJFcnJvciIsImRlc3Ryb3kiLCJldnRUeXBlIiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiYnViYmxlcyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiY3NzQ2xhc3NlcyIsIkJPWCIsIkRJU0FCTEVEIiwiUk9PVCIsIk9VVExJTkVEIiwic3RyaW5ncyIsIkNIQU5HRV9FVkVOVCIsIkxJTkVfUklQUExFX1NFTEVDVE9SIiwiTEFCRUxfU0VMRUNUT1IiLCJOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUiIsIk9VVExJTkVfU0VMRUNUT1IiLCJudW1iZXJzIiwiTEFCRUxfU0NBTEUiLCJNRENTZWxlY3RGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiZmxvYXRMYWJlbCIsImFjdGl2YXRlQm90dG9tTGluZSIsImRlYWN0aXZhdGVCb3R0b21MaW5lIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZ2V0U2VsZWN0ZWRJbmRleCIsInNldFNlbGVjdGVkSW5kZXgiLCJzZXREaXNhYmxlZCIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJpc1J0bCIsImhhc0xhYmVsIiwiZ2V0TGFiZWxXaWR0aCIsImhhc091dGxpbmUiLCJub3RjaE91dGxpbmUiLCJjbG9zZU91dGxpbmUiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzXyIsImJsdXJIYW5kbGVyXyIsImhhbmRsZUJsdXJfIiwic2VsZWN0aW9uSGFuZGxlcl8iLCJoYW5kbGVTZWxlY3RfIiwiaW5kZXgiLCJmbG9hdExhYmVsV2l0aFZhbHVlXyIsInZhbHVlIiwiZGlzYWJsZWQiLCJvcHRpb25IYXNWYWx1ZSIsImxlbmd0aCIsIm9wZW5Ob3RjaCIsImxhYmVsU2NhbGUiLCJsYWJlbFdpZHRoIiwiTURDUmlwcGxlQWRhcHRlciIsImNsYXNzTmFtZSIsInRhcmdldCIsInZhck5hbWUiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsIlZBUl9MRUZUIiwiVkFSX1RPUCIsIlZBUl9GR19TSVpFIiwiVkFSX0ZHX1NDQUxFIiwiVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCIsIlZBUl9GR19UUkFOU0xBVEVfRU5EIiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJzdXBwb3J0c1Bhc3NpdmVfIiwiZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1ZyIsIndpbmRvd09iaiIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwiZm9yY2VSZWZyZXNoIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJpc1N1cHBvcnRlZCIsInBhc3NpdmUiLCJlIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJ0eXBlIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiaGFuZGxlRm9jdXMiLCJoYW5kbGVCbHVyIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibGF5b3V0SW50ZXJuYWxfIiwiY2xlYXJUaW1lb3V0IiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwic29tZSIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInB1c2giLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwia2V5Q29kZSIsImV2ZW50IiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwic2V0VGltZW91dCIsImFjdGl2YXRpb25IYXNFbmRlZCIsInN0YXRlIiwiZXZ0T2JqZWN0IiwiYW5pbWF0ZURlYWN0aXZhdGlvbl8iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIm1heERpbSIsIm1heCIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJGVsIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwiY29udGFpbnMiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXIiLCJMQUJFTF9GTE9BVF9BQk9WRSIsIkxBQkVMX1NIQUtFIiwiTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24iLCJnZXRXaWR0aCIsInNoYWtlQW5pbWF0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVTaGFrZUFuaW1hdGlvbkVuZF8iLCJzaG91bGRTaGFrZSIsInNob3VsZEZsb2F0IiwicmVuZGVyIiwiZGF0YSIsImxhYmVsQ2xhc3NlcyIsIm1vdW50ZWQiLCJvZmZzZXRXaWR0aCIsImJlZm9yZURlc3Ryb3kiLCJNRENMaW5lUmlwcGxlQWRhcHRlciIsInByb3BlcnR5TmFtZSIsIkxJTkVfUklQUExFX0FDVElWRSIsIkxJTkVfUklQUExFX0RFQUNUSVZBVElORyIsIk1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIiwic2V0U3R5bGUiLCJyZWdpc3RlckV2ZW50SGFuZGxlciIsImRlcmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJ0cmFuc2l0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVUcmFuc2l0aW9uRW5kIiwieENvb3JkaW5hdGUiLCJpc0RlYWN0aXZhdGluZyIsImxpbmVDbGFzc2VzIiwibGluZVN0eWxlcyIsImNsYXNzTGlzdCIsIk1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlciIsIlBBVEhfU0VMRUNUT1IiLCJJRExFX09VVExJTkVfU0VMRUNUT1IiLCJPVVRMSU5FX05PVENIRUQiLCJNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24iLCJnZXRIZWlnaHQiLCJzZXRPdXRsaW5lUGF0aEF0dHIiLCJnZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUiLCJub3RjaFdpZHRoIiwidXBkYXRlU3ZnUGF0aF8iLCJyYWRpdXNTdHlsZVZhbHVlIiwicmFkaXVzIiwicGFyc2VGbG9hdCIsImNvcm5lcldpZHRoIiwibGVhZGluZ1N0cm9rZUxlbmd0aCIsImFicyIsInBhZGRlZE5vdGNoV2lkdGgiLCJwYXRoTWlkZGxlIiwicGF0aCIsIm91dGxpbmVkQ2xhc3NlcyIsIk1EQ25vdGNoZWRPdXRsaW5lRm91bmRhdGlvbkZvdW5kYXRpb24iLCIkcmVmcyIsIm91dGxpbmVkIiwib2Zmc2V0SGVpZ2h0Iiwib3V0bGluZWRQYXRoIiwic2V0QXR0cmlidXRlIiwib3V0bGluZWRJZGxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsIlNlbGVjdExhYmVsIiwiU2VsZWN0TGluZVJpcGxlIiwiU2VsZWN0Tm90Y2hlZE91dGxpbmUiLCJpbmhlcml0QXR0cnMiLCJtb2RlbCIsInByb3AiLCJwcm9wcyIsIlN0cmluZyIsIkJvb2xlYW4iLCJsYWJlbCIsImJveCIsImlkIiwiY29tcHV0ZWQiLCJyb290Q2xhc3NlcyIsImxpc3RlbmVycyIsIiRsaXN0ZW5lcnMiLCJjaGFuZ2UiLCIkZW1pdCIsIndhdGNoIiwibGluZSIsImFjdGl2YXRlIiwiZGVhY3RpdmF0ZSIsIm5hdGl2ZV9jb250cm9sIiwic2VsZWN0ZWRJbmRleCIsIm91dGxpbmUiLCJub3RjaCIsImNsb3NlTm90Y2giLCJmbG9hdCIsInJlZnJlc2hJbmRleCIsInNsb3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsInJpcHBsZSIsImRpc2Nvbm5lY3QiLCJtZXRob2RzIiwicXVlcnlTZWxlY3RvckFsbCIsImlkeCIsImZpbmRJbmRleCIsIm1kY1NlbGVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0VBQy9CO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0VBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUN4QztFQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0VBQ0Q7RUFDRCxNQUFJRixJQUFKLEVBQVU7RUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0VBQ0Q7RUFDRjs7RUNaTSxTQUFTTSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztFQUNyQyxTQUFPO0VBQ0xDLGFBQVMsUUFESjtFQUVMQyxhQUFTLHFCQUFNO0VBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCSCxVQUFoQixFQUE0QjtFQUMxQixZQUFJSSxZQUFZSixXQUFXRyxHQUFYLENBQWhCO0VBQ0FFLFdBQUdELFNBQUgsQ0FBYUEsVUFBVUUsSUFBdkIsRUFBNkJGLFNBQTdCO0VBQ0Q7RUFDRixLQVBJO0VBUUxKO0VBUkssR0FBUDtFQVVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQ1hEOztFQ0FBLElBQU1PLFFBQ0pDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkYsS0FBS0MsS0FBTCxDQUFXLFVBQVgsQ0FBM0IsRUFBbURFLFFBQW5ELEtBQWdFLEdBRGxFOztFQ0FBOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCQTs7O01BR01DOzs7O0VBQ0o7NkJBQ3dCO0VBQ3RCO0VBQ0E7RUFDQSxhQUFPLEVBQVA7RUFDRDs7RUFFRDs7Ozs2QkFDcUI7RUFDbkI7RUFDQTtFQUNBLGFBQU8sRUFBUDtFQUNEOztFQUVEOzs7OzZCQUNxQjtFQUNuQjtFQUNBO0VBQ0EsYUFBTyxFQUFQO0VBQ0Q7O0VBRUQ7Ozs7NkJBQzRCO0VBQzFCO0VBQ0E7RUFDQTtFQUNBLGFBQU8sRUFBUDtFQUNEOztFQUVEOzs7Ozs7RUFHQSwyQkFBMEI7RUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7RUFBQTs7RUFDeEI7RUFDQSxTQUFLQyxRQUFMLEdBQWdCRCxPQUFoQjtFQUNEOzs7OzZCQUVNO0VBQ0w7RUFDRDs7O2dDQUVTO0VBQ1I7RUFDRDs7Ozs7RUNoRUg7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUJBOzs7O01BR01FOzs7O0VBQ0o7Ozs7K0JBSWdCQyxNQUFNO0VBQ3BCO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsYUFBTyxJQUFJRCxZQUFKLENBQWlCQyxJQUFqQixFQUF1QixJQUFJSixhQUFKLEVBQXZCLENBQVA7RUFDRDs7RUFFRDs7Ozs7Ozs7RUFLQSx3QkFBWUksSUFBWixFQUFtRDtFQUFBLFFBQWpDQyxVQUFpQyx1RUFBcEJDLFNBQW9CO0VBQUE7O0VBQ2pEO0VBQ0EsU0FBS0MsS0FBTCxHQUFhSCxJQUFiOztFQUZpRCxzQ0FBTkksSUFBTTtFQUFOQSxVQUFNO0VBQUE7O0VBR2pELFNBQUtDLFVBQUwsYUFBbUJELElBQW5CO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU0FBS0UsV0FBTCxHQUFtQkwsZUFBZUMsU0FBZixHQUEyQixLQUFLSyxvQkFBTCxFQUEzQixHQUF5RE4sVUFBNUU7RUFDQSxTQUFLSyxXQUFMLENBQWlCRSxJQUFqQjtFQUNBLFNBQUtDLGtCQUFMO0VBQ0Q7Ozs7Z0RBRXlCO0VBQ3hCO0VBQ0E7RUFDQTs7O0VBR0Y7Ozs7Ozs2Q0FHdUI7RUFDckI7RUFDQTtFQUNBLFlBQU0sSUFBSUMsS0FBSixDQUFVLG1GQUNkLGtCQURJLENBQU47RUFFRDs7OzJDQUVvQjtFQUNuQjtFQUNBO0VBQ0E7RUFDQTtFQUNEOzs7Z0NBRVM7RUFDUjtFQUNBO0VBQ0EsV0FBS0osV0FBTCxDQUFpQkssT0FBakI7RUFDRDs7RUFFRDs7Ozs7Ozs7OzZCQU1PQyxTQUFTQyxTQUFTO0VBQ3ZCLFdBQUtWLEtBQUwsQ0FBV1csZ0JBQVgsQ0FBNEJGLE9BQTVCLEVBQXFDQyxPQUFyQztFQUNEOztFQUVEOzs7Ozs7Ozs7K0JBTVNELFNBQVNDLFNBQVM7RUFDekIsV0FBS1YsS0FBTCxDQUFXWSxtQkFBWCxDQUErQkgsT0FBL0IsRUFBd0NDLE9BQXhDO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7MkJBT0tELFNBQVNJLFNBQStCO0VBQUEsVUFBdEJDLFlBQXNCLHVFQUFQLEtBQU87O0VBQzNDLFVBQUlDLFlBQUo7RUFDQSxVQUFJLE9BQU9DLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7RUFDckNELGNBQU0sSUFBSUMsV0FBSixDQUFnQlAsT0FBaEIsRUFBeUI7RUFDN0JRLGtCQUFRSixPQURxQjtFQUU3QkssbUJBQVNKO0VBRm9CLFNBQXpCLENBQU47RUFJRCxPQUxELE1BS087RUFDTEMsY0FBTUksU0FBU0MsV0FBVCxDQUFxQixhQUFyQixDQUFOO0VBQ0FMLFlBQUlNLGVBQUosQ0FBb0JaLE9BQXBCLEVBQTZCSyxZQUE3QixFQUEyQyxLQUEzQyxFQUFrREQsT0FBbEQ7RUFDRDs7RUFFRCxXQUFLYixLQUFMLENBQVdzQixhQUFYLENBQXlCUCxHQUF6QjtFQUNEOzs7OztFQ3pISDs7Ozs7Ozs7Ozs7Ozs7Ozs7RUNBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUEsSUFBTVEsYUFBYTtFQUNqQkMsT0FBSyxpQkFEWTtFQUVqQkMsWUFBVSxzQkFGTztFQUdqQkMsUUFBTSxZQUhXO0VBSWpCQyxZQUFVO0VBSk8sQ0FBbkI7O0VBT0EsSUFBTUMsVUFBVTtFQUNkQyxnQkFBYyxrQkFEQTtFQUVkQyx3QkFBc0Isa0JBRlI7RUFHZEMsa0JBQWdCLHFCQUhGO0VBSWRDLDJCQUF5Qiw2QkFKWDtFQUtkQyxvQkFBa0I7RUFMSixDQUFoQjs7RUFRQTtFQUNBLElBQU1DLFVBQVU7RUFDZEMsZUFBYTtFQURDLENBQWhCOztFQy9CQTs7Ozs7Ozs7Ozs7Ozs7OztNQW1CcUJDOzs7OzZCQUNLO0VBQ3RCLGFBQU9iLFVBQVA7RUFDRDs7OzZCQUVvQjtFQUNuQixhQUFPVyxPQUFQO0VBQ0Q7Ozs2QkFFb0I7RUFDbkIsYUFBT04sT0FBUDtFQUNEOzs7NkJBRTJCO0VBQzFCLGFBQU87RUFDTFMsa0JBQVUsMkNBQTZCLEVBRGxDO0VBRUxDLHFCQUFhLDhDQUE2QixFQUZyQztFQUdMQyxrQkFBVTtFQUFBLHlDQUE2QjtFQUE3QjtFQUFBLFNBSEw7RUFJTEMsb0JBQVksMENBQTBCLEVBSmpDO0VBS0xDLDRCQUFvQiw4QkFBTSxFQUxyQjtFQU1MQyw4QkFBc0IsZ0NBQU0sRUFOdkI7RUFPTEMsb0NBQTRCLGdGQUFnRCxFQVB2RTtFQVFMQyxzQ0FBOEIsa0ZBQWdELEVBUnpFO0VBU0xDLDBCQUFrQjtFQUFBLDhCQUFtQixDQUFDO0VBQXBCO0VBQUEsU0FUYjtFQVVMQywwQkFBa0IsK0NBQXlCLEVBVnRDO0VBV0xDLHFCQUFhLDhDQUE2QixFQVhyQztFQVlMQyxrQkFBVTtFQUFBLDhCQUFtQjtFQUFuQjtFQUFBLFNBWkw7RUFhTEMsa0JBQVUsdUNBQXlCLEVBYjlCO0VBY0xDLGVBQU87RUFBQSxpQkFBTSxLQUFOO0VBQUEsU0FkRjtFQWVMQyxrQkFBVSxvQkFBTSxFQWZYO0VBZ0JMQyx1QkFBZSx5QkFBTSxFQWhCaEI7RUFpQkxDLG9CQUFZLHNCQUFNLEVBakJiO0VBa0JMQyxzQkFBYyx3QkFBTSxFQWxCZjtFQW1CTEMsc0JBQWMsd0JBQU07RUFuQmYsT0FBUDtFQXFCRDs7O0VBRUQsK0JBQVk3RCxPQUFaLEVBQXFCO0VBQUE7O0VBQUEseUlBQ2I4RCxTQUFjcEIsb0JBQW9CcUIsY0FBbEMsRUFBa0QvRCxPQUFsRCxDQURhOztFQUduQixVQUFLZ0UsYUFBTCxHQUFxQixVQUFDM0MsR0FBRDtFQUFBLGFBQVMsTUFBSzRDLFlBQUwsQ0FBa0I1QyxHQUFsQixDQUFUO0VBQUEsS0FBckI7RUFDQSxVQUFLNkMsWUFBTCxHQUFvQixVQUFDN0MsR0FBRDtFQUFBLGFBQVMsTUFBSzhDLFdBQUwsQ0FBaUI5QyxHQUFqQixDQUFUO0VBQUEsS0FBcEI7RUFDQSxVQUFLK0MsaUJBQUwsR0FBeUIsVUFBQy9DLEdBQUQ7RUFBQSxhQUFTLE1BQUtnRCxhQUFMLENBQW1CaEQsR0FBbkIsQ0FBVDtFQUFBLEtBQXpCO0VBTG1CO0VBTXBCOzs7OzZCQUVNO0VBQ0wsV0FBS3BCLFFBQUwsQ0FBY2dELDBCQUFkLENBQXlDLE9BQXpDLEVBQWtELEtBQUtlLGFBQXZEO0VBQ0EsV0FBSy9ELFFBQUwsQ0FBY2dELDBCQUFkLENBQXlDLE1BQXpDLEVBQWlELEtBQUtpQixZQUF0RDtFQUNBLFdBQUtqRSxRQUFMLENBQWNnRCwwQkFBZCxDQUF5QyxRQUF6QyxFQUFtRCxLQUFLbUIsaUJBQXhEO0VBQ0Q7OztnQ0FFUztFQUNSLFdBQUtuRSxRQUFMLENBQWNpRCw0QkFBZCxDQUEyQyxPQUEzQyxFQUFvRCxLQUFLYyxhQUF6RDtFQUNBLFdBQUsvRCxRQUFMLENBQWNpRCw0QkFBZCxDQUEyQyxNQUEzQyxFQUFtRCxLQUFLZ0IsWUFBeEQ7RUFDQSxXQUFLakUsUUFBTCxDQUFjaUQsNEJBQWQsQ0FBMkMsUUFBM0MsRUFBcUQsS0FBS2tCLGlCQUExRDtFQUNEOzs7dUNBRWdCRSxPQUFPO0VBQ3RCLFdBQUtyRSxRQUFMLENBQWNtRCxnQkFBZCxDQUErQmtCLEtBQS9CO0VBQ0EsV0FBS0Msb0JBQUw7RUFDRDs7OytCQUVRQyxPQUFPO0VBQ2QsV0FBS3ZFLFFBQUwsQ0FBY3NELFFBQWQsQ0FBdUJpQixLQUF2QjtFQUNBLFdBQUtwQixnQkFBTCxDQUFzQixLQUFLbkQsUUFBTCxDQUFja0QsZ0JBQWQsRUFBdEI7RUFDRDs7O2tDQUVXc0IsVUFBVTtFQUFBLFVBQ2IxQyxRQURhLEdBQ0RXLG9CQUFvQmIsVUFEbkIsQ0FDYkUsUUFEYTs7RUFFcEIsV0FBSzlCLFFBQUwsQ0FBY29ELFdBQWQsQ0FBMEJvQixRQUExQjtFQUNBLFVBQUlBLFFBQUosRUFBYztFQUNaLGFBQUt4RSxRQUFMLENBQWMwQyxRQUFkLENBQXVCWixRQUF2QjtFQUNELE9BRkQsTUFFTztFQUNMLGFBQUs5QixRQUFMLENBQWMyQyxXQUFkLENBQTBCYixRQUExQjtFQUNEO0VBQ0Y7Ozs2Q0FFc0I7RUFDckIsVUFBTTJDLGlCQUFpQixLQUFLekUsUUFBTCxDQUFjcUQsUUFBZCxHQUF5QnFCLE1BQXpCLEdBQWtDLENBQXpEO0VBQ0EsV0FBSzFFLFFBQUwsQ0FBYzZDLFVBQWQsQ0FBeUI0QixjQUF6QjtFQUNBLFdBQUtkLFlBQUwsQ0FBa0JjLGNBQWxCO0VBQ0Q7OztxQ0FFYztFQUNiLFdBQUt6RSxRQUFMLENBQWM2QyxVQUFkLENBQXlCLElBQXpCO0VBQ0EsV0FBS2MsWUFBTCxDQUFrQixJQUFsQjtFQUNBLFdBQUszRCxRQUFMLENBQWM4QyxrQkFBZDtFQUNEOzs7b0NBRWE7RUFDWixXQUFLd0Isb0JBQUw7RUFDQSxXQUFLdEUsUUFBTCxDQUFjK0Msb0JBQWQ7RUFDRDs7O3NDQUVlO0VBQ2QsV0FBS0ksZ0JBQUwsQ0FBc0IsS0FBS25ELFFBQUwsQ0FBY2tELGdCQUFkLEVBQXRCO0VBQ0Q7O0VBRUQ7Ozs7Ozs7bUNBSWF5QixXQUFXO0VBQ3RCLFVBQUksQ0FBQyxLQUFLM0UsUUFBTCxDQUFjMEQsVUFBZCxFQUFELElBQStCLENBQUMsS0FBSzFELFFBQUwsQ0FBY3dELFFBQWQsRUFBcEMsRUFBOEQ7RUFDNUQ7RUFDRDs7RUFFRCxVQUFJbUIsU0FBSixFQUFlO0VBQ2IsWUFBTUMsYUFBYXJDLFFBQVFDLFdBQTNCO0VBQ0EsWUFBTXFDLGFBQWEsS0FBSzdFLFFBQUwsQ0FBY3lELGFBQWQsS0FBZ0NtQixVQUFuRDtFQUNBLFlBQU1yQixRQUFRLEtBQUt2RCxRQUFMLENBQWN1RCxLQUFkLEVBQWQ7RUFDQSxhQUFLdkQsUUFBTCxDQUFjMkQsWUFBZCxDQUEyQmtCLFVBQTNCLEVBQXVDdEIsS0FBdkM7RUFDRCxPQUxELE1BS087RUFDTCxhQUFLdkQsUUFBTCxDQUFjNEQsWUFBZDtFQUNEO0VBQ0Y7OztJQW5IOEM5RDs7RUNuQmpEOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCQTs7RUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BcUJNZ0Y7Ozs7Ozs7O0VBQ0o7K0NBQ3lCOztFQUV6Qjs7OztvQ0FDYzs7RUFFZDs7Ozt3Q0FDa0I7O0VBRWxCOzs7OzBDQUNvQjs7RUFFcEI7Ozs7K0JBQ1NDLFdBQVc7O0VBRXBCOzs7O2tDQUNZQSxXQUFXOztFQUV2Qjs7OzswQ0FDb0JDLFFBQVE7O0VBRTVCOzs7Ozs7O2lEQUkyQmxFLFNBQVNDLFNBQVM7O0VBRTdDOzs7Ozs7O21EQUk2QkQsU0FBU0MsU0FBUzs7RUFFL0M7Ozs7Ozs7eURBSW1DRCxTQUFTQyxTQUFTOztFQUVyRDs7Ozs7OzsyREFJcUNELFNBQVNDLFNBQVM7O0VBRXZEOzs7Ozs7NENBR3NCQSxTQUFTOztFQUUvQjs7Ozs7OzhDQUd3QkEsU0FBUzs7RUFFakM7Ozs7Ozs7d0NBSWtCa0UsU0FBU1YsT0FBTzs7RUFFbEM7Ozs7NENBQ3NCOztFQUV0Qjs7Ozs0Q0FDc0I7Ozs7O0VDMUd4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpQkEsSUFBTTNDLGVBQWE7RUFDakI7RUFDQTtFQUNBO0VBQ0FHLFFBQU0scUJBSlc7RUFLakJtRCxhQUFXLGdDQUxNO0VBTWpCQyxjQUFZLHlDQU5LO0VBT2pCQyxpQkFBZSw0Q0FQRTtFQVFqQkMsbUJBQWlCO0VBUkEsQ0FBbkI7O0VBV0EsSUFBTXBELFlBQVU7RUFDZHFELFlBQVUsbUJBREk7RUFFZEMsV0FBUyxrQkFGSztFQUdkQyxlQUFhLHNCQUhDO0VBSWRDLGdCQUFjLHVCQUpBO0VBS2RDLDBCQUF3QixpQ0FMVjtFQU1kQyx3QkFBc0I7RUFOUixDQUFoQjs7RUFTQSxJQUFNcEQsWUFBVTtFQUNkcUQsV0FBUyxFQURLO0VBRWRDLHdCQUFzQixHQUZSO0VBR2RDLDJCQUF5QixHQUhYO0VBSWRDLHNCQUFvQixHQUpOO0VBS2RDLGdCQUFjLEdBTEE7RUFBQSxDQUFoQjs7RUNyQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaUJBOzs7O0VBSUEsSUFBSUMsOEJBQUo7O0VBRUE7Ozs7RUFJQSxJQUFJQywyQkFBSjs7RUFFQTs7OztFQUlBLFNBQVNDLHNCQUFULENBQWdDQyxTQUFoQyxFQUEyQztFQUN6QztFQUNBO0VBQ0EsTUFBTTVFLFdBQVc0RSxVQUFVNUUsUUFBM0I7RUFDQSxNQUFNNkUsT0FBTzdFLFNBQVM4RSxhQUFULENBQXVCLEtBQXZCLENBQWI7RUFDQUQsT0FBS3RCLFNBQUwsR0FBaUIsdUNBQWpCO0VBQ0F2RCxXQUFTK0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCSCxJQUExQjs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLE1BQU1JLGdCQUFnQkwsVUFBVU0sZ0JBQVYsQ0FBMkJMLElBQTNCLENBQXRCO0VBQ0EsTUFBTU0sa0JBQWtCRixrQkFBa0IsSUFBbEIsSUFBMEJBLGNBQWNHLGNBQWQsS0FBaUMsT0FBbkY7RUFDQVAsT0FBS1EsTUFBTDtFQUNBLFNBQU9GLGVBQVA7RUFDRDs7RUFFRDs7Ozs7O0VBTUEsU0FBU0csb0JBQVQsQ0FBOEJWLFNBQTlCLEVBQStEO0VBQUEsTUFBdEJXLFlBQXNCLHVFQUFQLEtBQU87O0VBQzdELE1BQUlELHVCQUF1QmIscUJBQTNCO0VBQ0EsTUFBSSxPQUFPQSxxQkFBUCxLQUFpQyxTQUFqQyxJQUE4QyxDQUFDYyxZQUFuRCxFQUFpRTtFQUMvRCxXQUFPRCxvQkFBUDtFQUNEOztFQUVELE1BQU1FLDBCQUEwQlosVUFBVWEsR0FBVixJQUFpQixPQUFPYixVQUFVYSxHQUFWLENBQWNDLFFBQXJCLEtBQWtDLFVBQW5GO0VBQ0EsTUFBSSxDQUFDRix1QkFBTCxFQUE4QjtFQUM1QjtFQUNEOztFQUVELE1BQU1HLDRCQUE0QmYsVUFBVWEsR0FBVixDQUFjQyxRQUFkLENBQXVCLFlBQXZCLEVBQXFDLEtBQXJDLENBQWxDO0VBQ0E7RUFDQTtFQUNBLE1BQU1FLG9DQUNKaEIsVUFBVWEsR0FBVixDQUFjQyxRQUFkLENBQXVCLG1CQUF2QixLQUNBZCxVQUFVYSxHQUFWLENBQWNDLFFBQWQsQ0FBdUIsT0FBdkIsRUFBZ0MsV0FBaEMsQ0FGRjs7RUFLQSxNQUFJQyw2QkFBNkJDLGlDQUFqQyxFQUFvRTtFQUNsRU4sMkJBQXVCLENBQUNYLHVCQUF1QkMsU0FBdkIsQ0FBeEI7RUFDRCxHQUZELE1BRU87RUFDTFUsMkJBQXVCLEtBQXZCO0VBQ0Q7O0VBRUQsTUFBSSxDQUFDQyxZQUFMLEVBQW1CO0VBQ2pCZCw0QkFBd0JhLG9CQUF4QjtFQUNEO0VBQ0QsU0FBT0Esb0JBQVA7RUFDRDs7RUFFRDtFQUNBOzs7Ozs7RUFNQSxTQUFTTyxjQUFULEdBQWdFO0VBQUEsTUFBMUNDLFNBQTBDLHVFQUE5QnpJLE1BQThCO0VBQUEsTUFBdEJrSSxZQUFzQix1RUFBUCxLQUFPOztFQUM5RCxNQUFJYix1QkFBcUI5RixTQUFyQixJQUFrQzJHLFlBQXRDLEVBQW9EO0VBQ2xELFFBQUlRLGNBQWMsS0FBbEI7RUFDQSxRQUFJO0VBQ0ZELGdCQUFVOUYsUUFBVixDQUFtQlIsZ0JBQW5CLENBQW9DLE1BQXBDLEVBQTRDLElBQTVDLEVBQWtELEVBQUMsSUFBSXdHLE9BQUosR0FBYztFQUMvREQsd0JBQWMsSUFBZDtFQUNELFNBRmlELEVBQWxEO0VBR0QsS0FKRCxDQUlFLE9BQU9FLENBQVAsRUFBVTs7RUFFWnZCLHlCQUFtQnFCLFdBQW5CO0VBQ0Q7O0VBRUQsU0FBT3JCLHFCQUFtQixFQUFDc0IsU0FBUyxJQUFWLEVBQW5CLEdBQXFDLEtBQTVDO0VBQ0Q7O0VBRUQ7Ozs7RUFJQSxTQUFTRSxrQkFBVCxDQUE0QkMsb0JBQTVCLEVBQWtEO0VBQ2hELFNBQU8sQ0FDTCx1QkFESyxFQUNvQixtQkFEcEIsRUFDeUMsU0FEekMsRUFFTEMsTUFGSyxDQUVFLFVBQUNDLENBQUQ7RUFBQSxXQUFPQSxLQUFLRixvQkFBWjtFQUFBLEdBRkYsRUFFb0NHLEdBRnBDLEVBQVA7RUFHRDs7RUFFRDs7Ozs7O0VBTUEsU0FBU0Msd0JBQVQsQ0FBa0NDLEVBQWxDLEVBQXNDQyxVQUF0QyxFQUFrREMsVUFBbEQsRUFBOEQ7RUFBQSxNQUNyREMsQ0FEcUQsR0FDN0NGLFVBRDZDLENBQ3JERSxDQURxRDtFQUFBLE1BQ2xEQyxDQURrRCxHQUM3Q0gsVUFENkMsQ0FDbERHLENBRGtEOztFQUU1RCxNQUFNQyxZQUFZRixJQUFJRCxXQUFXSSxJQUFqQztFQUNBLE1BQU1DLFlBQVlILElBQUlGLFdBQVdNLEdBQWpDOztFQUVBLE1BQUlDLG9CQUFKO0VBQ0EsTUFBSUMsb0JBQUo7RUFDQTtFQUNBLE1BQUlWLEdBQUdXLElBQUgsS0FBWSxZQUFoQixFQUE4QjtFQUM1QkYsa0JBQWNULEdBQUdZLGNBQUgsQ0FBa0IsQ0FBbEIsRUFBcUJDLEtBQXJCLEdBQTZCUixTQUEzQztFQUNBSyxrQkFBY1YsR0FBR1ksY0FBSCxDQUFrQixDQUFsQixFQUFxQkUsS0FBckIsR0FBNkJQLFNBQTNDO0VBQ0QsR0FIRCxNQUdPO0VBQ0xFLGtCQUFjVCxHQUFHYSxLQUFILEdBQVdSLFNBQXpCO0VBQ0FLLGtCQUFjVixHQUFHYyxLQUFILEdBQVdQLFNBQXpCO0VBQ0Q7O0VBRUQsU0FBTyxFQUFDSixHQUFHTSxXQUFKLEVBQWlCTCxHQUFHTSxXQUFwQixFQUFQO0VBQ0Q7O0VDL0lEOzs7Ozs7Ozs7Ozs7Ozs7OztFQThEQTtFQUNBLElBQU1LLHlCQUF5QixDQUFDLFlBQUQsRUFBZSxhQUFmLEVBQThCLFdBQTlCLEVBQTJDLFNBQTNDLENBQS9COztFQUVBO0VBQ0EsSUFBTUMsbUNBQW1DLENBQUMsVUFBRCxFQUFhLFdBQWIsRUFBMEIsU0FBMUIsQ0FBekM7O0VBRUE7RUFDQTtFQUNBLElBQUlDLG1CQUFtQixFQUF2Qjs7RUFFQTs7OztNQUdNQzs7Ozs2QkFDb0I7RUFDdEIsYUFBT3RILFlBQVA7RUFDRDs7OzZCQUVvQjtFQUNuQixhQUFPSyxTQUFQO0VBQ0Q7Ozs2QkFFb0I7RUFDbkIsYUFBT00sU0FBUDtFQUNEOzs7NkJBRTJCO0VBQzFCLGFBQU87RUFDTDRHLGdDQUF3Qix3REFBNkIsRUFEaEQ7RUFFTEMscUJBQWEsb0NBQW9CLEVBRjVCO0VBR0xDLHlCQUFpQix3Q0FBb0IsRUFIaEM7RUFJTEMsMkJBQW1CLDBDQUFvQixFQUpsQztFQUtMNUcsa0JBQVUsMkNBQTZCLEVBTGxDO0VBTUxDLHFCQUFhLDhDQUE2QixFQU5yQztFQU9MNEcsNkJBQXFCLHlEQUFnQyxFQVBoRDtFQVFMdkcsb0NBQTRCLG1GQUFtRCxFQVIxRTtFQVNMQyxzQ0FBOEIscUZBQW1ELEVBVDVFO0VBVUx1Ryw0Q0FBb0MsMkZBQW1ELEVBVmxGO0VBV0xDLDhDQUFzQyw2RkFBbUQsRUFYcEY7RUFZTEMsK0JBQXVCLDZEQUFrQyxFQVpwRDtFQWFMQyxpQ0FBeUIsK0RBQWtDLEVBYnREO0VBY0xDLDJCQUFtQixpRUFBMEMsRUFkeEQ7RUFlTEMsNkJBQXFCLCtDQUF1QixFQWZ2QztFQWdCTEMsNkJBQXFCLDJEQUFtQztFQWhCbkQsT0FBUDtFQWtCRDs7O0VBRUQsK0JBQVkvSixPQUFaLEVBQXFCO0VBQUE7O0VBR25CO0VBSG1CLHlJQUNiOEQsU0FBY3FGLG9CQUFvQnBGLGNBQWxDLEVBQWtEL0QsT0FBbEQsQ0FEYTs7RUFJbkIsVUFBS2dLLFlBQUwsR0FBb0IsQ0FBcEI7O0VBRUE7RUFDQSxVQUFLQyxNQUFMLDZCQUEwQyxFQUFDQyxPQUFPLENBQVIsRUFBV0MsUUFBUSxDQUFuQixFQUExQzs7RUFFQTtFQUNBLFVBQUtDLGdCQUFMLEdBQXdCLE1BQUtDLHVCQUFMLEVBQXhCOztFQUVBO0VBQ0EsVUFBS0MsWUFBTCxHQUFvQixDQUFwQjs7RUFFQTtFQUNBLFVBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7O0VBRUE7RUFDQSxVQUFLQyxnQkFBTCxHQUF3QixVQUFDOUMsQ0FBRDtFQUFBLGFBQU8sTUFBSytDLFNBQUwsQ0FBZS9DLENBQWYsQ0FBUDtFQUFBLEtBQXhCOztFQUVBO0VBQ0EsVUFBS2dELGtCQUFMLEdBQTBCLFVBQUNoRCxDQUFEO0VBQUEsYUFBTyxNQUFLaUQsV0FBTCxDQUFpQmpELENBQWpCLENBQVA7RUFBQSxLQUExQjs7RUFFQTtFQUNBLFVBQUsxRCxhQUFMLEdBQXFCO0VBQUEsYUFBTSxNQUFLNEcsV0FBTCxFQUFOO0VBQUEsS0FBckI7O0VBRUE7RUFDQSxVQUFLMUcsWUFBTCxHQUFvQjtFQUFBLGFBQU0sTUFBSzJHLFVBQUwsRUFBTjtFQUFBLEtBQXBCOztFQUVBO0VBQ0EsVUFBS0MsY0FBTCxHQUFzQjtFQUFBLGFBQU0sTUFBS0MsTUFBTCxFQUFOO0VBQUEsS0FBdEI7O0VBRUE7RUFDQSxVQUFLQyxnQkFBTCxHQUF3QjtFQUN0QnpDLFlBQU0sQ0FEZ0I7RUFFdEJFLFdBQUs7RUFGaUIsS0FBeEI7O0VBS0E7RUFDQSxVQUFLd0MsUUFBTCxHQUFnQixDQUFoQjs7RUFFQTtFQUNBLFVBQUtDLGdCQUFMLEdBQXdCLENBQXhCOztFQUVBO0VBQ0EsVUFBS0MsMkJBQUwsR0FBbUMsQ0FBbkM7O0VBRUE7RUFDQSxVQUFLQyw0QkFBTCxHQUFvQyxLQUFwQzs7RUFFQTtFQUNBLFVBQUtDLHdCQUFMLEdBQWdDLFlBQU07RUFDcEMsWUFBS0QsNEJBQUwsR0FBb0MsSUFBcEM7RUFDQSxZQUFLRSw4QkFBTDtFQUNELEtBSEQ7O0VBS0E7RUFDQSxVQUFLQyx3QkFBTCxHQUFnQyxJQUFoQztFQTFEbUI7RUEyRHBCOztFQUVEOzs7Ozs7Ozs7Ozs7cUNBUWU7RUFDYixhQUFPLEtBQUt0TCxRQUFMLENBQWNtSixzQkFBZCxFQUFQO0VBQ0Q7O0VBRUQ7Ozs7OztnREFHMEI7RUFDeEIsYUFBTztFQUNMb0MscUJBQWEsS0FEUjtFQUVMQyw4QkFBc0IsS0FGakI7RUFHTEMsK0JBQXVCLEtBSGxCO0VBSUxDLDhCQUFzQixLQUpqQjtFQUtMQyx5QkFBaUIsSUFMWjtFQU1MQyx3QkFBZ0I7RUFOWCxPQUFQO0VBUUQ7Ozs2QkFFTTtFQUFBOztFQUNMLFVBQUksQ0FBQyxLQUFLQyxZQUFMLEVBQUwsRUFBMEI7RUFDeEI7RUFDRDtFQUNELFdBQUtDLHFCQUFMOztFQUpLLGtDQU1xQjVDLG9CQUFvQnRILFVBTnpDO0VBQUEsVUFNRUcsSUFORix5QkFNRUEsSUFORjtFQUFBLFVBTVFtRCxTQU5SLHlCQU1RQSxTQU5SOztFQU9MNkcsNEJBQXNCLFlBQU07RUFDMUIsZUFBSy9MLFFBQUwsQ0FBYzBDLFFBQWQsQ0FBdUJYLElBQXZCO0VBQ0EsWUFBSSxPQUFLL0IsUUFBTCxDQUFjb0osV0FBZCxFQUFKLEVBQWlDO0VBQy9CLGlCQUFLcEosUUFBTCxDQUFjMEMsUUFBZCxDQUF1QndDLFNBQXZCO0VBQ0E7RUFDQSxpQkFBSzhHLGVBQUw7RUFDRDtFQUNGLE9BUEQ7RUFRRDs7O2dDQUVTO0VBQUE7O0VBQ1IsVUFBSSxDQUFDLEtBQUtILFlBQUwsRUFBTCxFQUEwQjtFQUN4QjtFQUNEOztFQUVELFVBQUksS0FBS1osZ0JBQVQsRUFBMkI7RUFDekJnQixxQkFBYSxLQUFLaEIsZ0JBQWxCO0VBQ0EsYUFBS0EsZ0JBQUwsR0FBd0IsQ0FBeEI7RUFGeUIsWUFHbEI3RixhQUhrQixHQUdEOEQsb0JBQW9CdEgsVUFIbkIsQ0FHbEJ3RCxhQUhrQjs7RUFJekIsYUFBS3BGLFFBQUwsQ0FBYzJDLFdBQWQsQ0FBMEJ5QyxhQUExQjtFQUNEOztFQUVELFdBQUs4Ryx1QkFBTDtFQUNBLFdBQUtDLCtCQUFMOztFQWJRLG1DQWVrQmpELG9CQUFvQnRILFVBZnRDO0VBQUEsVUFlREcsSUFmQywwQkFlREEsSUFmQztFQUFBLFVBZUttRCxTQWZMLDBCQWVLQSxTQWZMOztFQWdCUjZHLDRCQUFzQixZQUFNO0VBQzFCLGVBQUsvTCxRQUFMLENBQWMyQyxXQUFkLENBQTBCWixJQUExQjtFQUNBLGVBQUsvQixRQUFMLENBQWMyQyxXQUFkLENBQTBCdUMsU0FBMUI7RUFDQSxlQUFLa0gsY0FBTDtFQUNELE9BSkQ7RUFLRDs7RUFFRDs7Ozs4Q0FDd0I7RUFBQTs7RUFDdEJyRCw2QkFBdUJzRCxPQUF2QixDQUErQixVQUFDMUQsSUFBRCxFQUFVO0VBQ3ZDLGVBQUszSSxRQUFMLENBQWNnRCwwQkFBZCxDQUF5QzJGLElBQXpDLEVBQStDLE9BQUs0QixnQkFBcEQ7RUFDRCxPQUZEO0VBR0EsV0FBS3ZLLFFBQUwsQ0FBY2dELDBCQUFkLENBQXlDLE9BQXpDLEVBQWtELEtBQUtlLGFBQXZEO0VBQ0EsV0FBSy9ELFFBQUwsQ0FBY2dELDBCQUFkLENBQXlDLE1BQXpDLEVBQWlELEtBQUtpQixZQUF0RDs7RUFFQSxVQUFJLEtBQUtqRSxRQUFMLENBQWNvSixXQUFkLEVBQUosRUFBaUM7RUFDL0IsYUFBS3BKLFFBQUwsQ0FBYzBKLHFCQUFkLENBQW9DLEtBQUttQixjQUF6QztFQUNEO0VBQ0Y7O0VBRUQ7Ozs7Ozs7b0RBSThCcEQsR0FBRztFQUFBOztFQUMvQixVQUFJQSxFQUFFa0IsSUFBRixLQUFXLFNBQWYsRUFBMEI7RUFDeEIsYUFBSzNJLFFBQUwsQ0FBY2dELDBCQUFkLENBQXlDLE9BQXpDLEVBQWtELEtBQUt5SCxrQkFBdkQ7RUFDRCxPQUZELE1BRU87RUFDTHpCLHlDQUFpQ3FELE9BQWpDLENBQXlDLFVBQUMxRCxJQUFELEVBQVU7RUFDakQsaUJBQUszSSxRQUFMLENBQWN3SixrQ0FBZCxDQUFpRGIsSUFBakQsRUFBdUQsT0FBSzhCLGtCQUE1RDtFQUNELFNBRkQ7RUFHRDtFQUNGOztFQUVEOzs7O2dEQUMwQjtFQUFBOztFQUN4QjFCLDZCQUF1QnNELE9BQXZCLENBQStCLFVBQUMxRCxJQUFELEVBQVU7RUFDdkMsZUFBSzNJLFFBQUwsQ0FBY2lELDRCQUFkLENBQTJDMEYsSUFBM0MsRUFBaUQsT0FBSzRCLGdCQUF0RDtFQUNELE9BRkQ7RUFHQSxXQUFLdkssUUFBTCxDQUFjaUQsNEJBQWQsQ0FBMkMsT0FBM0MsRUFBb0QsS0FBS2MsYUFBekQ7RUFDQSxXQUFLL0QsUUFBTCxDQUFjaUQsNEJBQWQsQ0FBMkMsTUFBM0MsRUFBbUQsS0FBS2dCLFlBQXhEOztFQUVBLFVBQUksS0FBS2pFLFFBQUwsQ0FBY29KLFdBQWQsRUFBSixFQUFpQztFQUMvQixhQUFLcEosUUFBTCxDQUFjMkosdUJBQWQsQ0FBc0MsS0FBS2tCLGNBQTNDO0VBQ0Q7RUFDRjs7RUFFRDs7Ozt3REFDa0M7RUFBQTs7RUFDaEMsV0FBSzdLLFFBQUwsQ0FBY2lELDRCQUFkLENBQTJDLE9BQTNDLEVBQW9ELEtBQUt3SCxrQkFBekQ7RUFDQXpCLHVDQUFpQ3FELE9BQWpDLENBQXlDLFVBQUMxRCxJQUFELEVBQVU7RUFDakQsZUFBSzNJLFFBQUwsQ0FBY3lKLG9DQUFkLENBQW1EZCxJQUFuRCxFQUF5RCxPQUFLOEIsa0JBQTlEO0VBQ0QsT0FGRDtFQUdEOztFQUVEOzs7O3VDQUNpQjtFQUFBOztFQUFBLFVBQ1J4SSxPQURRLEdBQ0dpSCxtQkFESCxDQUNSakgsT0FEUTs7RUFFZnFLLGFBQU9DLElBQVAsQ0FBWXRLLE9BQVosRUFBcUJvSyxPQUFyQixDQUE2QixVQUFDRyxDQUFELEVBQU87RUFDbEMsWUFBSUEsRUFBRUMsT0FBRixDQUFVLE1BQVYsTUFBc0IsQ0FBMUIsRUFBNkI7RUFDM0IsaUJBQUt6TSxRQUFMLENBQWM0SixpQkFBZCxDQUFnQzNILFFBQVF1SyxDQUFSLENBQWhDLEVBQTRDLElBQTVDO0VBQ0Q7RUFDRixPQUpEO0VBS0Q7O0VBRUQ7Ozs7Ozs7Z0NBSVUvRSxHQUFHO0VBQUE7O0VBQ1gsVUFBSSxLQUFLekgsUUFBTCxDQUFjc0osaUJBQWQsRUFBSixFQUF1QztFQUNyQztFQUNEOztFQUVELFVBQU1vRCxrQkFBa0IsS0FBS3ZDLGdCQUE3QjtFQUNBLFVBQUl1QyxnQkFBZ0JuQixXQUFwQixFQUFpQztFQUMvQjtFQUNEOztFQUVEO0VBQ0EsVUFBTW9CLDBCQUEwQixLQUFLckIsd0JBQXJDO0VBQ0EsVUFBTXNCLG9CQUFvQkQsMkJBQTJCbEYsQ0FBM0IsSUFBZ0NrRix3QkFBd0JoRSxJQUF4QixLQUFpQ2xCLEVBQUVrQixJQUE3RjtFQUNBLFVBQUlpRSxpQkFBSixFQUF1QjtFQUNyQjtFQUNEOztFQUVERixzQkFBZ0JuQixXQUFoQixHQUE4QixJQUE5QjtFQUNBbUIsc0JBQWdCZCxjQUFoQixHQUFpQ25FLE1BQU0sSUFBdkM7RUFDQWlGLHNCQUFnQmYsZUFBaEIsR0FBa0NsRSxDQUFsQztFQUNBaUYsc0JBQWdCakIscUJBQWhCLEdBQXdDaUIsZ0JBQWdCZCxjQUFoQixHQUFpQyxLQUFqQyxHQUN0Q25FLEVBQUVrQixJQUFGLEtBQVcsV0FBWCxJQUEwQmxCLEVBQUVrQixJQUFGLEtBQVcsWUFBckMsSUFBcURsQixFQUFFa0IsSUFBRixLQUFXLGFBRGxFOztFQUlBLFVBQU1rRSxvQkFDSnBGLEtBQUt3QixpQkFBaUJ2RSxNQUFqQixHQUEwQixDQUEvQixJQUFvQ3VFLGlCQUFpQjZELElBQWpCLENBQXNCLFVBQUM5SCxNQUFEO0VBQUEsZUFBWSxPQUFLaEYsUUFBTCxDQUFjdUosbUJBQWQsQ0FBa0N2RSxNQUFsQyxDQUFaO0VBQUEsT0FBdEIsQ0FEdEM7RUFFQSxVQUFJNkgsaUJBQUosRUFBdUI7RUFDckI7RUFDQSxhQUFLRSxxQkFBTDtFQUNBO0VBQ0Q7O0VBRUQsVUFBSXRGLENBQUosRUFBTztFQUNMd0IseUJBQWlCK0QsSUFBakIsNkJBQW1EdkYsRUFBRXpDLE1BQXJEO0VBQ0EsYUFBS2lJLDZCQUFMLENBQW1DeEYsQ0FBbkM7RUFDRDs7RUFFRGlGLHNCQUFnQmhCLG9CQUFoQixHQUF1QyxLQUFLd0IsdUJBQUwsQ0FBNkJ6RixDQUE3QixDQUF2QztFQUNBLFVBQUlpRixnQkFBZ0JoQixvQkFBcEIsRUFBMEM7RUFDeEMsYUFBS3lCLGtCQUFMO0VBQ0Q7O0VBRURwQiw0QkFBc0IsWUFBTTtFQUMxQjtFQUNBOUMsMkJBQW1CLEVBQW5COztFQUVBLFlBQUksQ0FBQ3lELGdCQUFnQmhCLG9CQUFqQixLQUEwQ2pFLEVBQUVwSSxHQUFGLEtBQVUsR0FBVixJQUFpQm9JLEVBQUUyRixPQUFGLEtBQWMsRUFBekUsQ0FBSixFQUFrRjtFQUNoRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQVYsMEJBQWdCaEIsb0JBQWhCLEdBQXVDLE9BQUt3Qix1QkFBTCxDQUE2QnpGLENBQTdCLENBQXZDO0VBQ0EsY0FBSWlGLGdCQUFnQmhCLG9CQUFwQixFQUEwQztFQUN4QyxtQkFBS3lCLGtCQUFMO0VBQ0Q7RUFDRjs7RUFFRCxZQUFJLENBQUNULGdCQUFnQmhCLG9CQUFyQixFQUEyQztFQUN6QztFQUNBLGlCQUFLdkIsZ0JBQUwsR0FBd0IsT0FBS0MsdUJBQUwsRUFBeEI7RUFDRDtFQUNGLE9BckJEO0VBc0JEOztFQUVEOzs7Ozs7OzhDQUl3QjNDLEdBQUc7RUFDekIsYUFBUUEsS0FBS0EsRUFBRWtCLElBQUYsS0FBVyxTQUFqQixHQUE4QixLQUFLM0ksUUFBTCxDQUFjcUosZUFBZCxFQUE5QixHQUFnRSxJQUF2RTtFQUNEOztFQUVEOzs7Ozs7aUNBR3VCO0VBQUEsVUFBZGdFLEtBQWMsdUVBQU4sSUFBTTs7RUFDckIsV0FBSzdDLFNBQUwsQ0FBZTZDLEtBQWY7RUFDRDs7RUFFRDs7OzsyQ0FDcUI7RUFBQTs7RUFBQSxtQ0FDb0NuRSxvQkFBb0JqSCxPQUR4RDtFQUFBLFVBQ1p5RCxzQkFEWSwwQkFDWkEsc0JBRFk7RUFBQSxVQUNZQyxvQkFEWiwwQkFDWUEsb0JBRFo7RUFBQSxtQ0FFc0J1RCxvQkFBb0J0SCxVQUYxQztFQUFBLFVBRVp5RCxlQUZZLDBCQUVaQSxlQUZZO0VBQUEsVUFFS0QsYUFGTCwwQkFFS0EsYUFGTDtFQUFBLFVBR1pVLHVCQUhZLEdBR2VvRCxvQkFBb0IzRyxPQUhuQyxDQUdadUQsdUJBSFk7OztFQUtuQixXQUFLa0csZUFBTDs7RUFFQSxVQUFJc0IsaUJBQWlCLEVBQXJCO0VBQ0EsVUFBSUMsZUFBZSxFQUFuQjs7RUFFQSxVQUFJLENBQUMsS0FBS3ZOLFFBQUwsQ0FBY29KLFdBQWQsRUFBTCxFQUFrQztFQUFBLG9DQUNELEtBQUtvRSw0QkFBTCxFQURDO0VBQUEsWUFDekJDLFVBRHlCLHlCQUN6QkEsVUFEeUI7RUFBQSxZQUNiQyxRQURhLHlCQUNiQSxRQURhOztFQUVoQ0oseUJBQW9CRyxXQUFXdEYsQ0FBL0IsWUFBdUNzRixXQUFXckYsQ0FBbEQ7RUFDQW1GLHVCQUFrQkcsU0FBU3ZGLENBQTNCLFlBQW1DdUYsU0FBU3RGLENBQTVDO0VBQ0Q7O0VBRUQsV0FBS3BJLFFBQUwsQ0FBYzRKLGlCQUFkLENBQWdDbEUsc0JBQWhDLEVBQXdENEgsY0FBeEQ7RUFDQSxXQUFLdE4sUUFBTCxDQUFjNEosaUJBQWQsQ0FBZ0NqRSxvQkFBaEMsRUFBc0Q0SCxZQUF0RDtFQUNBO0VBQ0F0QixtQkFBYSxLQUFLaEIsZ0JBQWxCO0VBQ0FnQixtQkFBYSxLQUFLZiwyQkFBbEI7RUFDQSxXQUFLeUMsMkJBQUw7RUFDQSxXQUFLM04sUUFBTCxDQUFjMkMsV0FBZCxDQUEwQjBDLGVBQTFCOztFQUVBO0VBQ0EsV0FBS3JGLFFBQUwsQ0FBYzZKLG1CQUFkO0VBQ0EsV0FBSzdKLFFBQUwsQ0FBYzBDLFFBQWQsQ0FBdUIwQyxhQUF2QjtFQUNBLFdBQUs2RixnQkFBTCxHQUF3QjJDLFdBQVc7RUFBQSxlQUFNLFFBQUt4Qyx3QkFBTCxFQUFOO0VBQUEsT0FBWCxFQUFrRHRGLHVCQUFsRCxDQUF4QjtFQUNEOztFQUVEOzs7Ozs7O3FEQUkrQjtFQUFBLDhCQUNvQixLQUFLcUUsZ0JBRHpCO0VBQUEsVUFDdEJ3QixlQURzQixxQkFDdEJBLGVBRHNCO0VBQUEsVUFDTEYscUJBREsscUJBQ0xBLHFCQURLOzs7RUFHN0IsVUFBSWdDLG1CQUFKO0VBQ0EsVUFBSWhDLHFCQUFKLEVBQTJCO0VBQ3pCZ0MscUJBQWExRjtFQUNYLDZCQUF1QjRELGVBRFosRUFFWCxLQUFLM0wsUUFBTCxDQUFjOEosbUJBQWQsRUFGVyxFQUUwQixLQUFLOUosUUFBTCxDQUFjNkosbUJBQWQsRUFGMUIsQ0FBYjtFQUlELE9BTEQsTUFLTztFQUNMNEQscUJBQWE7RUFDWHRGLGFBQUcsS0FBSzZCLE1BQUwsQ0FBWUMsS0FBWixHQUFvQixDQURaO0VBRVg3QixhQUFHLEtBQUs0QixNQUFMLENBQVlFLE1BQVosR0FBcUI7RUFGYixTQUFiO0VBSUQ7RUFDRDtFQUNBdUQsbUJBQWE7RUFDWHRGLFdBQUdzRixXQUFXdEYsQ0FBWCxHQUFnQixLQUFLa0MsWUFBTCxHQUFvQixDQUQ1QjtFQUVYakMsV0FBR3FGLFdBQVdyRixDQUFYLEdBQWdCLEtBQUtpQyxZQUFMLEdBQW9CO0VBRjVCLE9BQWI7O0VBS0EsVUFBTXFELFdBQVc7RUFDZnZGLFdBQUksS0FBSzZCLE1BQUwsQ0FBWUMsS0FBWixHQUFvQixDQUFyQixHQUEyQixLQUFLSSxZQUFMLEdBQW9CLENBRG5DO0VBRWZqQyxXQUFJLEtBQUs0QixNQUFMLENBQVlFLE1BQVosR0FBcUIsQ0FBdEIsR0FBNEIsS0FBS0csWUFBTCxHQUFvQjtFQUZwQyxPQUFqQjs7RUFLQSxhQUFPLEVBQUNvRCxzQkFBRCxFQUFhQyxrQkFBYixFQUFQO0VBQ0Q7O0VBRUQ7Ozs7dURBQ2lDO0VBQUE7O0VBQy9CO0VBQ0E7RUFGK0IsVUFHeEJySSxlQUh3QixHQUdMNkQsb0JBQW9CdEgsVUFIZixDQUd4QnlELGVBSHdCO0VBQUEsK0JBSWEsS0FBSzhFLGdCQUpsQjtFQUFBLFVBSXhCcUIsb0JBSndCLHNCQUl4QkEsb0JBSndCO0VBQUEsVUFJRkQsV0FKRSxzQkFJRkEsV0FKRTs7RUFLL0IsVUFBTXNDLHFCQUFxQnJDLHdCQUF3QixDQUFDRCxXQUFwRDs7RUFFQSxVQUFJc0Msc0JBQXNCLEtBQUsxQyw0QkFBL0IsRUFBNkQ7RUFDM0QsYUFBS3dDLDJCQUFMO0VBQ0EsYUFBSzNOLFFBQUwsQ0FBYzBDLFFBQWQsQ0FBdUIyQyxlQUF2QjtFQUNBLGFBQUs2RiwyQkFBTCxHQUFtQzBDLFdBQVcsWUFBTTtFQUNsRCxrQkFBSzVOLFFBQUwsQ0FBYzJDLFdBQWQsQ0FBMEIwQyxlQUExQjtFQUNELFNBRmtDLEVBRWhDOUMsVUFBUXdELGtCQUZ3QixDQUFuQztFQUdEO0VBQ0Y7O0VBRUQ7Ozs7b0RBQzhCO0VBQUEsVUFDckJYLGFBRHFCLEdBQ0o4RCxvQkFBb0J0SCxVQURoQixDQUNyQndELGFBRHFCOztFQUU1QixXQUFLcEYsUUFBTCxDQUFjMkMsV0FBZCxDQUEwQnlDLGFBQTFCO0VBQ0EsV0FBSytGLDRCQUFMLEdBQW9DLEtBQXBDO0VBQ0EsV0FBS25MLFFBQUwsQ0FBYzZKLG1CQUFkO0VBQ0Q7Ozs4Q0FFdUI7RUFBQTs7RUFDdEIsV0FBS3lCLHdCQUFMLEdBQWdDLEtBQUtuQixnQkFBTCxDQUFzQndCLGVBQXREO0VBQ0EsV0FBS3hCLGdCQUFMLEdBQXdCLEtBQUtDLHVCQUFMLEVBQXhCO0VBQ0E7RUFDQTtFQUNBd0QsaUJBQVc7RUFBQSxlQUFNLFFBQUt0Qyx3QkFBTCxHQUFnQyxJQUF0QztFQUFBLE9BQVgsRUFBdURwQyxvQkFBb0IzRyxPQUFwQixDQUE0QnlELFlBQW5GO0VBQ0Q7O0VBRUQ7Ozs7Ozs7a0NBSVl5QixHQUFHO0VBQUE7O0VBQ2IsVUFBTWlGLGtCQUFrQixLQUFLdkMsZ0JBQTdCO0VBQ0E7RUFDQSxVQUFJLENBQUN1QyxnQkFBZ0JuQixXQUFyQixFQUFrQztFQUNoQztFQUNEOztFQUVELFVBQU11QywyQ0FBNkNqSyxTQUFjLEVBQWQsRUFBa0I2SSxlQUFsQixDQUFuRDs7RUFFQSxVQUFJQSxnQkFBZ0JkLGNBQXBCLEVBQW9DO0VBQ2xDLFlBQU1tQyxZQUFZLElBQWxCO0VBQ0FoQyw4QkFBc0I7RUFBQSxpQkFBTSxRQUFLaUMsb0JBQUwsQ0FBMEJELFNBQTFCLEVBQXFDRCxLQUFyQyxDQUFOO0VBQUEsU0FBdEI7RUFDQSxhQUFLZixxQkFBTDtFQUNELE9BSkQsTUFJTztFQUNMLGFBQUtaLCtCQUFMO0VBQ0FKLDhCQUFzQixZQUFNO0VBQzFCLGtCQUFLNUIsZ0JBQUwsQ0FBc0JxQixvQkFBdEIsR0FBNkMsSUFBN0M7RUFDQSxrQkFBS3dDLG9CQUFMLENBQTBCdkcsQ0FBMUIsRUFBNkJxRyxLQUE3QjtFQUNBLGtCQUFLZixxQkFBTDtFQUNELFNBSkQ7RUFLRDtFQUNGOztFQUVEOzs7Ozs7bUNBR3lCO0VBQUEsVUFBZE0sS0FBYyx1RUFBTixJQUFNOztFQUN2QixXQUFLM0MsV0FBTCxDQUFpQjJDLEtBQWpCO0VBQ0Q7O0VBRUQ7Ozs7Ozs7OzJDQUtxQjVGLFNBQWtEO0VBQUEsVUFBOUNnRSxxQkFBOEMsUUFBOUNBLHFCQUE4QztFQUFBLFVBQXZCQyxvQkFBdUIsUUFBdkJBLG9CQUF1Qjs7RUFDckUsVUFBSUQseUJBQXlCQyxvQkFBN0IsRUFBbUQ7RUFDakQsYUFBS0wsOEJBQUw7RUFDRDtFQUNGOzs7K0JBRVE7RUFBQTs7RUFDUCxVQUFJLEtBQUt0QixZQUFULEVBQXVCO0VBQ3JCa0UsNkJBQXFCLEtBQUtsRSxZQUExQjtFQUNEO0VBQ0QsV0FBS0EsWUFBTCxHQUFvQmdDLHNCQUFzQixZQUFNO0VBQzlDLGdCQUFLQyxlQUFMO0VBQ0EsZ0JBQUtqQyxZQUFMLEdBQW9CLENBQXBCO0VBQ0QsT0FIbUIsQ0FBcEI7RUFJRDs7RUFFRDs7Ozt3Q0FDa0I7RUFBQTs7RUFDaEIsV0FBS0MsTUFBTCxHQUFjLEtBQUtoSyxRQUFMLENBQWM2SixtQkFBZCxFQUFkO0VBQ0EsVUFBTXFFLFNBQVN4TyxLQUFLeU8sR0FBTCxDQUFTLEtBQUtuRSxNQUFMLENBQVlFLE1BQXJCLEVBQTZCLEtBQUtGLE1BQUwsQ0FBWUMsS0FBekMsQ0FBZjs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxVQUFNbUUsbUJBQW1CLFNBQW5CQSxnQkFBbUIsR0FBTTtFQUM3QixZQUFNQyxhQUFhM08sS0FBSzRPLElBQUwsQ0FBVTVPLEtBQUs2TyxHQUFMLENBQVMsUUFBS3ZFLE1BQUwsQ0FBWUMsS0FBckIsRUFBNEIsQ0FBNUIsSUFBaUN2SyxLQUFLNk8sR0FBTCxDQUFTLFFBQUt2RSxNQUFMLENBQVlFLE1BQXJCLEVBQTZCLENBQTdCLENBQTNDLENBQW5CO0VBQ0EsZUFBT21FLGFBQWFuRixvQkFBb0IzRyxPQUFwQixDQUE0QnFELE9BQWhEO0VBQ0QsT0FIRDs7RUFLQSxXQUFLMEUsVUFBTCxHQUFrQixLQUFLdEssUUFBTCxDQUFjb0osV0FBZCxLQUE4QjhFLE1BQTlCLEdBQXVDRSxrQkFBekQ7O0VBRUE7RUFDQSxXQUFLL0QsWUFBTCxHQUFvQjZELFNBQVNoRixvQkFBb0IzRyxPQUFwQixDQUE0QnNELG9CQUF6RDtFQUNBLFdBQUttRixRQUFMLEdBQWdCLEtBQUtWLFVBQUwsR0FBa0IsS0FBS0QsWUFBdkM7O0VBRUEsV0FBS21FLG9CQUFMO0VBQ0Q7O0VBRUQ7Ozs7NkNBQ3VCO0VBQUEsbUNBR2pCdEYsb0JBQW9CakgsT0FISDtFQUFBLFVBRW5CdUQsV0FGbUIsMEJBRW5CQSxXQUZtQjtFQUFBLFVBRU5GLFFBRk0sMEJBRU5BLFFBRk07RUFBQSxVQUVJQyxPQUZKLDBCQUVJQSxPQUZKO0VBQUEsVUFFYUUsWUFGYiwwQkFFYUEsWUFGYjs7O0VBS3JCLFdBQUt6RixRQUFMLENBQWM0SixpQkFBZCxDQUFnQ3BFLFdBQWhDLEVBQWdELEtBQUs2RSxZQUFyRDtFQUNBLFdBQUtySyxRQUFMLENBQWM0SixpQkFBZCxDQUFnQ25FLFlBQWhDLEVBQThDLEtBQUt1RixRQUFuRDs7RUFFQSxVQUFJLEtBQUtoTCxRQUFMLENBQWNvSixXQUFkLEVBQUosRUFBaUM7RUFDL0IsYUFBSzJCLGdCQUFMLEdBQXdCO0VBQ3RCekMsZ0JBQU01SSxLQUFLK08sS0FBTCxDQUFZLEtBQUt6RSxNQUFMLENBQVlDLEtBQVosR0FBb0IsQ0FBckIsR0FBMkIsS0FBS0ksWUFBTCxHQUFvQixDQUExRCxDQURnQjtFQUV0QjdCLGVBQUs5SSxLQUFLK08sS0FBTCxDQUFZLEtBQUt6RSxNQUFMLENBQVlFLE1BQVosR0FBcUIsQ0FBdEIsR0FBNEIsS0FBS0csWUFBTCxHQUFvQixDQUEzRDtFQUZpQixTQUF4Qjs7RUFLQSxhQUFLckssUUFBTCxDQUFjNEosaUJBQWQsQ0FBZ0N0RSxRQUFoQyxFQUE2QyxLQUFLeUYsZ0JBQUwsQ0FBc0J6QyxJQUFuRTtFQUNBLGFBQUt0SSxRQUFMLENBQWM0SixpQkFBZCxDQUFnQ3JFLE9BQWhDLEVBQTRDLEtBQUt3RixnQkFBTCxDQUFzQnZDLEdBQWxFO0VBQ0Q7RUFDRjs7RUFFRDs7OzttQ0FDYWtHLFdBQVc7RUFBQSxVQUNmeEosU0FEZSxHQUNGZ0Usb0JBQW9CdEgsVUFEbEIsQ0FDZnNELFNBRGU7O0VBRXRCLFVBQUl3SixTQUFKLEVBQWU7RUFDYixhQUFLMU8sUUFBTCxDQUFjMEMsUUFBZCxDQUF1QndDLFNBQXZCO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsYUFBS2xGLFFBQUwsQ0FBYzJDLFdBQWQsQ0FBMEJ1QyxTQUExQjtFQUNEO0VBQ0Y7OztvQ0FFYTtFQUFBOztFQUNaNkcsNEJBQXNCO0VBQUEsZUFDcEIsUUFBSy9MLFFBQUwsQ0FBYzBDLFFBQWQsQ0FBdUJ3RyxvQkFBb0J0SCxVQUFwQixDQUErQnVELFVBQXRELENBRG9CO0VBQUEsT0FBdEI7RUFFRDs7O21DQUVZO0VBQUE7O0VBQ1g0Ryw0QkFBc0I7RUFBQSxlQUNwQixRQUFLL0wsUUFBTCxDQUFjMkMsV0FBZCxDQUEwQnVHLG9CQUFvQnRILFVBQXBCLENBQStCdUQsVUFBekQsQ0FEb0I7RUFBQSxPQUF0QjtFQUVEOzs7SUF2Z0IrQnJGOztNQ3BFckI2TyxVQUFiO0VBQUE7RUFBQTtFQUFBO0VBQUEsb0NBU3lCQyxHQVR6QixFQVM4QjtFQUMxQixhQUFPQSxJQUFJRCxXQUFXRSxPQUFmLEVBQXdCLFNBQXhCLENBQVA7RUFDRDtFQVhIO0VBQUE7RUFBQSwyQkFDdUI7RUFDbkI7RUFDQSxhQUNFRixXQUFXRyxRQUFYLEtBQ0NILFdBQVdHLFFBQVgsR0FBc0JwSCxtQkFBbUJxSCxZQUFZQyxTQUEvQixDQUR2QixDQURGO0VBSUQ7RUFQSDs7RUFhRSxzQkFBWXpQLEVBQVosRUFBZ0IwUCxPQUFoQixFQUF5QjtFQUFBO0VBQUEsa0hBRXJCcEwsU0FDRTtFQUNFc0YsOEJBQXdCLGtDQUFNO0VBQzVCLGVBQU9yQyxxQkFBcUJqSSxNQUFyQixDQUFQO0VBQ0QsT0FISDtFQUlFdUssbUJBQWEsdUJBQU07RUFDakIsZUFBTyxLQUFQO0VBQ0QsT0FOSDtFQU9FQyx1QkFBaUIsMkJBQU07RUFDckIsZUFBTzlKLEdBQUcyUCxHQUFILENBQU9QLFdBQVdFLE9BQWxCLEVBQTJCLFNBQTNCLENBQVA7RUFDRCxPQVRIO0VBVUV2Rix5QkFBbUIsNkJBQU07RUFDdkIsZUFBTy9KLEdBQUdpRixRQUFWO0VBQ0QsT0FaSDtFQWFFOUIsY0FiRixvQkFhV3FDLFNBYlgsRUFhc0I7RUFDbEJ4RixXQUFHNFAsSUFBSCxDQUFRNVAsR0FBRzZQLE9BQVgsRUFBb0JySyxTQUFwQixFQUErQixJQUEvQjtFQUNELE9BZkg7RUFnQkVwQyxpQkFoQkYsdUJBZ0Jjb0MsU0FoQmQsRUFnQnlCO0VBQ3JCeEYsV0FBRzhQLE9BQUgsQ0FBVzlQLEdBQUc2UCxPQUFkLEVBQXVCckssU0FBdkI7RUFDRCxPQWxCSDs7RUFtQkV3RSwyQkFBcUI7RUFBQSxlQUFVaEssR0FBRzJQLEdBQUgsQ0FBT0ksUUFBUCxDQUFnQnRLLE1BQWhCLENBQVY7RUFBQSxPQW5CdkI7RUFvQkVoQyxrQ0FBNEIsb0NBQUM1QixHQUFELEVBQU1MLE9BQU4sRUFBa0I7RUFDNUN4QixXQUFHMlAsR0FBSCxDQUFPbE8sZ0JBQVAsQ0FBd0JJLEdBQXhCLEVBQTZCTCxPQUE3QixFQUFzQ3NHLGdCQUF0QztFQUNELE9BdEJIO0VBdUJFcEUsb0NBQThCLHNDQUFDN0IsR0FBRCxFQUFNTCxPQUFOLEVBQWtCO0VBQzlDeEIsV0FBRzJQLEdBQUgsQ0FBT2pPLG1CQUFQLENBQTJCRyxHQUEzQixFQUFnQ0wsT0FBaEMsRUFBeUNzRyxnQkFBekM7RUFDRCxPQXpCSDtFQTBCRW1DLDBDQUFvQyw0Q0FBQzFJLE9BQUQsRUFBVUMsT0FBVjtFQUFBLGVBQ2xDUyxTQUFTK04sZUFBVCxDQUF5QnZPLGdCQUF6QixDQUNFRixPQURGLEVBRUVDLE9BRkYsRUFHRXNHLGdCQUhGLENBRGtDO0VBQUEsT0ExQnRDO0VBZ0NFb0MsNENBQXNDLDhDQUFDM0ksT0FBRCxFQUFVQyxPQUFWO0VBQUEsZUFDcENTLFNBQVMrTixlQUFULENBQXlCdE8sbUJBQXpCLENBQ0VILE9BREYsRUFFRUMsT0FGRixFQUdFc0csZ0JBSEYsQ0FEb0M7RUFBQSxPQWhDeEM7RUFzQ0VxQyw2QkFBdUIsd0NBQVc7RUFDaEMsZUFBTzdLLE9BQU9tQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ0QsT0FBbEMsQ0FBUDtFQUNELE9BeENIO0VBeUNFNEksK0JBQXlCLDBDQUFXO0VBQ2xDLGVBQU85SyxPQUFPb0MsbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUNGLE9BQXJDLENBQVA7RUFDRCxPQTNDSDtFQTRDRTZJLHlCQUFtQiwyQkFBQzNFLE9BQUQsRUFBVVYsS0FBVixFQUFvQjtFQUNyQ2hGLFdBQUc0UCxJQUFILENBQVE1UCxHQUFHaVEsTUFBWCxFQUFtQnZLLE9BQW5CLEVBQTRCVixLQUE1QjtFQUNELE9BOUNIO0VBK0NFc0YsMkJBQXFCLCtCQUFNO0VBQ3pCLGVBQU90SyxHQUFHMlAsR0FBSCxDQUFPTyxxQkFBUCxFQUFQO0VBQ0QsT0FqREg7RUFrREUzRiwyQkFBcUIsK0JBQU07RUFDekIsZUFBTyxFQUFFM0IsR0FBR3RKLE9BQU82USxXQUFaLEVBQXlCdEgsR0FBR3ZKLE9BQU84USxXQUFuQyxFQUFQO0VBQ0Q7RUFwREgsS0FERixFQXVERVYsT0F2REYsQ0FGcUI7RUE0RHhCOztFQXpFSDtFQUFBLEVBQWdDL0YsbUJBQWhDOztFQ1BBOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCQTs7RUFFQTs7Ozs7Ozs7OztNQVVNMEc7Ozs7Ozs7O0VBQ0o7Ozs7K0JBSVM3SyxXQUFXOztFQUVwQjs7Ozs7OztrQ0FJWUEsV0FBVzs7RUFFdkI7Ozs7Ozs7aUNBSVc7O0VBRVg7Ozs7Ozs7O2lEQUsyQmpFLFNBQVNDLFNBQVM7O0VBRTdDOzs7Ozs7OzttREFLNkJELFNBQVNDLFNBQVM7Ozs7O0VDNURqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpQkE7RUFDQSxJQUFNYSxlQUFhO0VBQ2pCaU8scUJBQW1CLGlDQURGO0VBRWpCQyxlQUFhO0VBRkksQ0FBbkI7O0VDbEJBOzs7Ozs7Ozs7Ozs7Ozs7OztFQXFCQTs7Ozs7TUFJTUM7Ozs7O0VBQ0o7NkJBQ3dCO0VBQ3RCLGFBQU9uTyxZQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7OzZCQUs0QjtFQUMxQixxREFBZ0Q7RUFDOUNjLG9CQUFVLG9CQUFNLEVBRDhCO0VBRTlDQyx1QkFBYSx1QkFBTSxFQUYyQjtFQUc5Q3FOLG9CQUFVLG9CQUFNLEVBSDhCO0VBSTlDaE4sc0NBQTRCLHNDQUFNLEVBSlk7RUFLOUNDLHdDQUE4Qix3Q0FBTTtFQUxVO0VBQWhEO0VBT0Q7O0VBRUQ7Ozs7OztFQUdBLHNDQUFZbEQsT0FBWixFQUFxQjtFQUFBOztFQUduQjtFQUhtQix1SkFDYjhELFNBQWNrTSwyQkFBMkJqTSxjQUF6QyxFQUF5RC9ELE9BQXpELENBRGE7O0VBSW5CLFVBQUtrUSx5QkFBTCxHQUFpQztFQUFBLGFBQU0sTUFBS0Msd0JBQUwsRUFBTjtFQUFBLEtBQWpDO0VBSm1CO0VBS3BCOzs7OzZCQUVNO0VBQ0wsV0FBS2xRLFFBQUwsQ0FBY2dELDBCQUFkLENBQXlDLGNBQXpDLEVBQXlELEtBQUtpTix5QkFBOUQ7RUFDRDs7O2dDQUVTO0VBQ1IsV0FBS2pRLFFBQUwsQ0FBY2lELDRCQUFkLENBQTJDLGNBQTNDLEVBQTJELEtBQUtnTix5QkFBaEU7RUFDRDs7RUFFRDs7Ozs7OztpQ0FJVztFQUNULGFBQU8sS0FBS2pRLFFBQUwsQ0FBY2dRLFFBQWQsRUFBUDtFQUNEOztFQUVEOzs7Ozs7Ozs0QkFLTUcsYUFBYTtFQUFBLFVBQ1ZMLFdBRFUsR0FDS0MsMkJBQTJCbk8sVUFEaEMsQ0FDVmtPLFdBRFU7O0VBRWpCLFVBQUlLLFdBQUosRUFBaUI7RUFDZixhQUFLblEsUUFBTCxDQUFjMEMsUUFBZCxDQUF1Qm9OLFdBQXZCO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsYUFBSzlQLFFBQUwsQ0FBYzJDLFdBQWQsQ0FBMEJtTixXQUExQjtFQUNEO0VBQ0Y7O0VBRUQ7Ozs7Ozs7OzRCQUtNTSxhQUFhO0VBQUEsa0NBQ3dCTCwyQkFBMkJuTyxVQURuRDtFQUFBLFVBQ1ZpTyxpQkFEVSx5QkFDVkEsaUJBRFU7RUFBQSxVQUNTQyxXQURULHlCQUNTQSxXQURUOztFQUVqQixVQUFJTSxXQUFKLEVBQWlCO0VBQ2YsYUFBS3BRLFFBQUwsQ0FBYzBDLFFBQWQsQ0FBdUJtTixpQkFBdkI7RUFDRCxPQUZELE1BRU87RUFDTCxhQUFLN1AsUUFBTCxDQUFjMkMsV0FBZCxDQUEwQmtOLGlCQUExQjtFQUNBLGFBQUs3UCxRQUFMLENBQWMyQyxXQUFkLENBQTBCbU4sV0FBMUI7RUFDRDtFQUNGOztFQUVEOzs7Ozs7aURBRzJCO0VBQUEsVUFDbEJBLFdBRGtCLEdBQ0hDLDJCQUEyQm5PLFVBRHhCLENBQ2xCa08sV0FEa0I7O0VBRXpCLFdBQUs5UCxRQUFMLENBQWMyQyxXQUFkLENBQTBCbU4sV0FBMUI7RUFDRDs7O0lBbEZzQ2hROztBQ2R6QyxvQkFBZSxFQUFDdVE7O0tBQUQscUJBQUE7RUFDYjdRLFFBQU0sa0JBRE87RUFFYjhRLE1BRmEsa0JBRU47RUFDTCxXQUFPO0VBQ0xDLG9CQUFjO0VBRFQsS0FBUDtFQUdELEdBTlk7RUFPYkMsU0FQYSxxQkFPSDtFQUFBOztFQUNSLFNBQUtyUSxVQUFMLEdBQWtCLElBQUk0UCwwQkFBSixDQUErQjtFQUMvQ3JOLGdCQUFVLDZCQUFhO0VBQ3JCLGNBQUt5TSxJQUFMLENBQVUsTUFBS29CLFlBQWYsRUFBNkJ4TCxTQUE3QixFQUF3QyxJQUF4QztFQUNELE9BSDhDO0VBSS9DcEMsbUJBQWEsZ0NBQWE7RUFDeEIsY0FBSzBNLE9BQUwsQ0FBYSxNQUFLa0IsWUFBbEIsRUFBZ0N4TCxTQUFoQztFQUNELE9BTjhDO0VBTy9DaUwsZ0JBQVU7RUFBQSxlQUFNLE1BQUtkLEdBQUwsQ0FBU3VCLFdBQWY7RUFBQSxPQVBxQztFQVEvQ3pOLGtDQUE0QixvQ0FBQ2xDLE9BQUQsRUFBVUMsT0FBVixFQUFzQjtFQUNoRCxjQUFLbU8sR0FBTCxDQUFTbE8sZ0JBQVQsQ0FBMEJGLE9BQTFCLEVBQW1DQyxPQUFuQztFQUNELE9BVjhDO0VBVy9Da0Msb0NBQThCLHNDQUFDbkMsT0FBRCxFQUFVQyxPQUFWLEVBQXNCO0VBQ2xELGNBQUttTyxHQUFMLENBQVNqTyxtQkFBVCxDQUE2QkgsT0FBN0IsRUFBc0NDLE9BQXRDO0VBQ0Q7RUFiOEMsS0FBL0IsQ0FBbEI7RUFlQSxTQUFLWixVQUFMLENBQWdCTyxJQUFoQjtFQUNELEdBeEJZO0VBeUJiZ1EsZUF6QmEsMkJBeUJHO0VBQ2QsUUFBSXZRLGFBQWEsS0FBS0EsVUFBdEI7RUFDQSxTQUFLQSxVQUFMLEdBQWtCLElBQWxCO0VBQ0FBLGVBQVdVLE9BQVg7RUFDRDtFQTdCWSxDQUFmOztFQ1hBOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCQTs7RUFFQTs7Ozs7Ozs7OztNQVVNOFA7Ozs7Ozs7O0VBQ0o7Ozs7K0JBSVM1TCxXQUFXOztFQUVwQjs7Ozs7OztrQ0FJWUEsV0FBVzs7RUFFdkI7Ozs7Ozs7K0JBSVNBLFdBQVc7O0VBRXBCOzs7Ozs7OzsrQkFLUzZMLGNBQWNyTSxPQUFPOztFQUU5Qjs7Ozs7Ozs7MkNBS3FCekQsU0FBU0MsU0FBUzs7RUFFdkM7Ozs7Ozs7OzZDQUt1QkQsU0FBU0MsU0FBUzs7Ozs7RUNuRTNDOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCQTtFQUNBLElBQU1hLGVBQWE7RUFDakJpUCxzQkFBb0IseUJBREg7RUFFakJDLDRCQUEwQjtFQUZULENBQW5COztFQ2xCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzQkE7Ozs7O01BSU1DOzs7OztFQUNKOzZCQUN3QjtFQUN0QixhQUFPblAsWUFBUDtFQUNEOztFQUVEOzs7Ozs7Ozs2QkFLNEI7RUFDMUIsa0RBQTZDO0VBQzNDYyxvQkFBVSxvQkFBTSxFQUQyQjtFQUUzQ0MsdUJBQWEsdUJBQU0sRUFGd0I7RUFHM0NDLG9CQUFVLG9CQUFNLEVBSDJCO0VBSTNDb08sb0JBQVUsb0JBQU0sRUFKMkI7RUFLM0NDLGdDQUFzQixnQ0FBTSxFQUxlO0VBTTNDQyxrQ0FBd0Isa0NBQU07RUFOYTtFQUE3QztFQVFEOztFQUVEOzs7Ozs7RUFHQSxxQ0FBaUU7RUFBQSxRQUFyRG5SLE9BQXFELDJHQUFMLEVBQUs7RUFBQTs7RUFHL0Q7RUFIK0QsaUpBQ3pEOEQsU0FBY2tOLHdCQUF3QmpOLGNBQXRDLEVBQXNEL0QsT0FBdEQsQ0FEeUQ7O0VBSS9ELFVBQUtvUixxQkFBTCxHQUE2QixVQUFDL1AsR0FBRDtFQUFBLGFBQVMsTUFBS2dRLG1CQUFMLENBQXlCaFEsR0FBekIsQ0FBVDtFQUFBLEtBQTdCO0VBSitEO0VBS2hFOzs7OzZCQUVNO0VBQ0wsV0FBS3BCLFFBQUwsQ0FBY2lSLG9CQUFkLENBQW1DLGVBQW5DLEVBQW9ELEtBQUtFLHFCQUF6RDtFQUNEOzs7Z0NBRVM7RUFDUixXQUFLblIsUUFBTCxDQUFja1Isc0JBQWQsQ0FBcUMsZUFBckMsRUFBc0QsS0FBS0MscUJBQTNEO0VBQ0Q7O0VBRUQ7Ozs7OztpQ0FHVztFQUNULFdBQUtuUixRQUFMLENBQWMyQyxXQUFkLENBQTBCZixhQUFXa1Asd0JBQXJDO0VBQ0EsV0FBSzlRLFFBQUwsQ0FBYzBDLFFBQWQsQ0FBdUJkLGFBQVdpUCxrQkFBbEM7RUFDRDs7RUFFRDs7Ozs7OztzQ0FJZ0JRLGFBQWE7RUFDM0IsV0FBS3JSLFFBQUwsQ0FBY2dSLFFBQWQsQ0FBdUIsa0JBQXZCLEVBQThDSyxXQUE5QztFQUNEOztFQUVEOzs7Ozs7bUNBR2E7RUFDWCxXQUFLclIsUUFBTCxDQUFjMEMsUUFBZCxDQUF1QmQsYUFBV2tQLHdCQUFsQztFQUNEOztFQUVEOzs7Ozs7OzBDQUlvQjFQLEtBQUs7RUFDdkI7RUFDQTtFQUNBLFVBQU1rUSxpQkFBaUIsS0FBS3RSLFFBQUwsQ0FBYzRDLFFBQWQsQ0FBdUJoQixhQUFXa1Asd0JBQWxDLENBQXZCOztFQUVBLFVBQUkxUCxJQUFJd1AsWUFBSixLQUFxQixTQUF6QixFQUFvQztFQUNsQyxZQUFJVSxjQUFKLEVBQW9CO0VBQ2xCLGVBQUt0UixRQUFMLENBQWMyQyxXQUFkLENBQTBCZixhQUFXaVAsa0JBQXJDO0VBQ0EsZUFBSzdRLFFBQUwsQ0FBYzJDLFdBQWQsQ0FBMEJmLGFBQVdrUCx3QkFBckM7RUFDRDtFQUNGO0VBQ0Y7OztJQTlFbUNoUjs7QUNoQnRDLHdCQUFlLEVBQUN1UTs7S0FBRCxxQkFBQTtFQUNiN1EsUUFBTSx3QkFETztFQUViOFEsTUFGYSxrQkFFTjtFQUNMLFdBQU87RUFDTGlCLG1CQUFhLEVBRFI7RUFFTEMsa0JBQVk7RUFGUCxLQUFQO0VBSUQsR0FQWTtFQVFiaEIsU0FSYSxxQkFRSDtFQUFBOztFQUNSLFNBQUtyUSxVQUFMLEdBQWtCLElBQUk0USx1QkFBSixDQUE0QjtFQUM1Q3JPLGdCQUFVLDZCQUFhO0VBQ3JCLGNBQUt5TSxJQUFMLENBQVUsTUFBS29DLFdBQWYsRUFBNEJ4TSxTQUE1QixFQUF1QyxJQUF2QztFQUNELE9BSDJDO0VBSTVDcEMsbUJBQWEsZ0NBQWE7RUFDeEIsY0FBSzBNLE9BQUwsQ0FBYSxNQUFLa0MsV0FBbEIsRUFBK0J4TSxTQUEvQjtFQUNELE9BTjJDO0VBTzVDbkMsZ0JBQVUsNkJBQWE7RUFDckIsY0FBS3NNLEdBQUwsQ0FBU3VDLFNBQVQsQ0FBbUJuQyxRQUFuQixDQUE0QnZLLFNBQTVCO0VBQ0QsT0FUMkM7RUFVNUNpTSxnQkFBVSxrQkFBQ3hSLElBQUQsRUFBTytFLEtBQVAsRUFBaUI7RUFDekIsY0FBSzRLLElBQUwsQ0FBVSxNQUFLcUMsVUFBZixFQUEyQmhTLElBQTNCLEVBQWlDK0UsS0FBakM7RUFDRCxPQVoyQztFQWE1QzBNLDRCQUFzQiw4QkFBQ25RLE9BQUQsRUFBVUMsT0FBVixFQUFzQjtFQUMxQyxjQUFLbU8sR0FBTCxDQUFTbE8sZ0JBQVQsQ0FBMEJGLE9BQTFCLEVBQW1DQyxPQUFuQztFQUNELE9BZjJDO0VBZ0I1Q21RLDhCQUF3QixnQ0FBQ3BRLE9BQUQsRUFBVUMsT0FBVixFQUFzQjtFQUM1QyxjQUFLbU8sR0FBTCxDQUFTak8sbUJBQVQsQ0FBNkJILE9BQTdCLEVBQXNDQyxPQUF0QztFQUNEO0VBbEIyQyxLQUE1QixDQUFsQjtFQW9CQSxTQUFLWixVQUFMLENBQWdCTyxJQUFoQjtFQUNELEdBOUJZO0VBK0JiZ1EsZUEvQmEsMkJBK0JHO0VBQ2QsUUFBSXZRLGFBQWEsS0FBS0EsVUFBdEI7RUFDQSxTQUFLQSxVQUFMLEdBQWtCLElBQWxCO0VBQ0FBLGVBQVdVLE9BQVg7RUFDRDtFQW5DWSxDQUFmOztFQ1ZBOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCQTs7RUFFQTs7Ozs7Ozs7OztNQVVNNlE7Ozs7Ozs7O0VBQ0o7Ozs7aUNBSVc7O0VBRVg7Ozs7Ozs7a0NBSVk7O0VBRVo7Ozs7Ozs7K0JBSVMzTSxXQUFXOztFQUVwQjs7Ozs7OztrQ0FJWUEsV0FBVzs7RUFFdkI7Ozs7Ozs7eUNBSW1CUixPQUFPOztFQUUxQjs7Ozs7Ozs7OytDQU15QnFNLGNBQWM7Ozs7O0VDbEV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpQkE7RUFDQSxJQUFNM08sWUFBVTtFQUNkMFAsaUJBQWUsNEJBREQ7RUFFZEMseUJBQXVCO0VBRlQsQ0FBaEI7O0VBS0E7RUFDQSxJQUFNaFEsZUFBYTtFQUNqQmlRLG1CQUFpQjtFQURBLENBQW5COztFQ3hCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFxQkE7Ozs7O01BSU1DOzs7OztFQUNKOzZCQUNxQjtFQUNuQixhQUFPN1AsU0FBUDtFQUNEOztFQUVEOzs7OzZCQUN3QjtFQUN0QixhQUFPTCxZQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7OzZCQUs0QjtFQUMxQixzREFBaUQ7RUFDL0NvTyxvQkFBVSxvQkFBTSxFQUQrQjtFQUUvQytCLHFCQUFXLHFCQUFNLEVBRjhCO0VBRy9DclAsb0JBQVUsb0JBQU0sRUFIK0I7RUFJL0NDLHVCQUFhLHVCQUFNLEVBSjRCO0VBSy9DcVAsOEJBQW9CLDhCQUFNLEVBTHFCO0VBTS9DQyxvQ0FBMEIsb0NBQU07RUFOZTtFQUFqRDtFQVFEOztFQUVEOzs7Ozs7RUFHQSx1Q0FBWWxTLE9BQVosRUFBcUI7RUFBQTtFQUFBLG9KQUNiOEQsU0FBY2lPLDRCQUE0QmhPLGNBQTFDLEVBQTBEL0QsT0FBMUQsQ0FEYTtFQUVwQjs7RUFFRDs7Ozs7Ozs7Ozs0QkFNTW1TLFlBQTJCO0VBQUEsVUFBZjNPLEtBQWUsdUVBQVAsS0FBTztFQUFBLFVBQ3hCc08sZUFEd0IsR0FDTEMsNEJBQTRCbFEsVUFEdkIsQ0FDeEJpUSxlQUR3Qjs7RUFFL0IsV0FBSzdSLFFBQUwsQ0FBYzBDLFFBQWQsQ0FBdUJtUCxlQUF2QjtFQUNBLFdBQUtNLGNBQUwsQ0FBb0JELFVBQXBCLEVBQWdDM08sS0FBaEM7RUFDRDs7RUFFRDs7Ozs7O21DQUdhO0VBQUEsVUFDSnNPLGVBREksR0FDZUMsNEJBQTRCbFEsVUFEM0MsQ0FDSmlRLGVBREk7O0VBRVgsV0FBSzdSLFFBQUwsQ0FBYzJDLFdBQWQsQ0FBMEJrUCxlQUExQjtFQUNEOztFQUVEOzs7Ozs7Ozs7O3FDQU9lSyxZQUFZM08sT0FBTztFQUNoQztFQUNBLFVBQU02TyxtQkFBbUIsS0FBS3BTLFFBQUwsQ0FBY2lTLHdCQUFkLENBQXVDLGVBQXZDLEtBQ3JCLEtBQUtqUyxRQUFMLENBQWNpUyx3QkFBZCxDQUF1Qyx3QkFBdkMsQ0FESjtFQUVBLFVBQU1JLFNBQVNDLFdBQVdGLGdCQUFYLENBQWY7RUFDQSxVQUFNbkksUUFBUSxLQUFLakssUUFBTCxDQUFjZ1EsUUFBZCxFQUFkO0VBQ0EsVUFBTTlGLFNBQVMsS0FBS2xLLFFBQUwsQ0FBYytSLFNBQWQsRUFBZjtFQUNBLFVBQU1RLGNBQWNGLFNBQVMsR0FBN0I7RUFDQSxVQUFNRyxzQkFBc0I5UyxLQUFLK1MsR0FBTCxDQUFTLEtBQUtGLFdBQWQsQ0FBNUI7RUFDQSxVQUFNRyxtQkFBbUJSLGFBQWEsQ0FBdEM7O0VBRUE7RUFDQSxVQUFNUyxhQUFhLE1BQU1OLE1BQU4sR0FBZSxHQUFmLEdBQXFCQSxNQUFyQixHQUE4QixTQUE5QixHQUEwQ0EsTUFBMUMsR0FBbUQsR0FBbkQsR0FBeURBLE1BQXpELEdBQ2YsR0FEZSxJQUNSbkksU0FBVSxJQUFJcUksV0FETixJQUVmLEdBRmUsR0FFVEYsTUFGUyxHQUVBLEdBRkEsR0FFTUEsTUFGTixHQUVlLFNBRmYsR0FFMkIsQ0FBQ0EsTUFGNUIsR0FFcUMsR0FGckMsR0FFMkNBLE1BRjNDLEdBR2YsR0FIZSxJQUdSLENBQUNwSSxLQUFELEdBQVUsSUFBSXNJLFdBSE4sSUFJZixHQUplLEdBSVRGLE1BSlMsR0FJQSxHQUpBLEdBSU1BLE1BSk4sR0FJZSxTQUpmLEdBSTJCLENBQUNBLE1BSjVCLEdBSXFDLEdBSnJDLEdBSTJDLENBQUNBLE1BSjVDLEdBS2YsR0FMZSxJQUtSLENBQUNuSSxNQUFELEdBQVcsSUFBSXFJLFdBTFAsSUFNZixHQU5lLEdBTVRGLE1BTlMsR0FNQSxHQU5BLEdBTU1BLE1BTk4sR0FNZSxTQU5mLEdBTTJCQSxNQU4zQixHQU1vQyxHQU5wQyxHQU0wQyxDQUFDQSxNQU45RDs7RUFRQSxVQUFJTyxhQUFKO0VBQ0EsVUFBSSxDQUFDclAsS0FBTCxFQUFZO0VBQ1ZxUCxlQUFPLE9BQU9MLGNBQWNDLG1CQUFkLEdBQW9DRSxnQkFBM0MsSUFBK0QsR0FBL0QsR0FBcUUsQ0FBckUsR0FDSCxHQURHLElBQ0l6SSxRQUFTLElBQUlzSSxXQUFiLEdBQTRCRyxnQkFBNUIsR0FBK0NGLG1CQURuRCxJQUVIRyxVQUZHLEdBR0gsR0FIRyxHQUdHSCxtQkFIVjtFQUlELE9BTEQsTUFLTztFQUNMSSxlQUFPLE9BQU8zSSxRQUFRc0ksV0FBUixHQUFzQkMsbUJBQTdCLElBQW9ELEdBQXBELEdBQTBELENBQTFELEdBQ0gsR0FERyxHQUNHQSxtQkFESCxHQUVIRyxVQUZHLEdBR0gsR0FIRyxJQUdJMUksUUFBUyxJQUFJc0ksV0FBYixHQUE0QkcsZ0JBQTVCLEdBQStDRixtQkFIbkQsQ0FBUDtFQUlEOztFQUVELFdBQUt4UyxRQUFMLENBQWNnUyxrQkFBZCxDQUFpQ1ksSUFBakM7RUFDRDs7O0lBL0Z1QzlTOztBQ0oxQyw2QkFBZSxFQUFDdVE7O0tBQUQscUJBQUE7RUFDYjdRLFFBQU0sNEJBRE87RUFFYjhRLE1BRmEsa0JBRU47RUFDTCxXQUFPO0VBQ0x1Qyx1QkFBaUI7RUFEWixLQUFQO0VBR0QsR0FOWTtFQU9ickMsU0FQYSxxQkFPSDtFQUFBOztFQUNSLFNBQUtyUSxVQUFMLEdBQWtCLElBQUkyUywyQkFBSixDQUEwQztFQUMxRDlDLGdCQUFVO0VBQUEsZUFBTSxNQUFLK0MsS0FBTCxDQUFXQyxRQUFYLENBQW9CdkMsV0FBMUI7RUFBQSxPQURnRDtFQUUxRHNCLGlCQUFXO0VBQUEsZUFBTSxNQUFLZ0IsS0FBTCxDQUFXQyxRQUFYLENBQW9CQyxZQUExQjtFQUFBLE9BRitDO0VBRzFEdlEsZ0JBQVUsNkJBQWE7RUFDckIsY0FBS3lNLElBQUwsQ0FBVSxNQUFLMEQsZUFBZixFQUFnQzlOLFNBQWhDLEVBQTJDLElBQTNDO0VBQ0QsT0FMeUQ7RUFNMURwQyxtQkFBYSxnQ0FBYTtFQUN4QixjQUFLME0sT0FBTCxDQUFhLE1BQUt3RCxlQUFsQixFQUFtQzlOLFNBQW5DO0VBQ0QsT0FSeUQ7RUFTMURpTiwwQkFBb0IsbUNBQVM7RUFDM0IsWUFBTVksT0FBTyxNQUFLRyxLQUFMLENBQVdHLFlBQXhCO0VBQ0FOLGFBQUtPLFlBQUwsQ0FBa0IsR0FBbEIsRUFBdUI1TyxLQUF2QjtFQUNELE9BWnlEO0VBYTFEME4sZ0NBQTBCLGdEQUFnQjtFQUN4QyxlQUFPcFQsT0FDSjZILGdCQURJLENBQ2EsTUFBS3FNLEtBQUwsQ0FBV0ssWUFEeEIsRUFFSkMsZ0JBRkksQ0FFYXpDLFlBRmIsQ0FBUDtFQUdEO0VBakJ5RCxLQUExQyxDQUFsQjtFQW1CQSxTQUFLelEsVUFBTCxDQUFnQk8sSUFBaEI7RUFDRCxHQTVCWTtFQTZCYmdRLGVBN0JhLDJCQTZCRztFQUNkLFFBQUl2USxhQUFhLEtBQUtBLFVBQXRCO0VBQ0EsU0FBS0EsVUFBTCxHQUFrQixJQUFsQjtFQUNBQSxlQUFXVSxPQUFYO0VBQ0Q7RUFqQ1ksQ0FBZjs7QUNzQkEsa0JBQWUsRUFBQ3dQOztLQUFELHFCQUFBO0VBQ2I3USxRQUFNLFlBRE87RUFFYk4sY0FBWTtFQUNWb1UsNEJBRFU7RUFFVkMsb0NBRlU7RUFHVkM7RUFIVSxHQUZDO0VBT2JDLGdCQUFjLEtBUEQ7RUFRYkMsU0FBTztFQUNMQyxVQUFNLE9BREQ7RUFFTHRHLFdBQU87RUFGRixHQVJNO0VBWWJ1RyxTQUFPO0VBQ0xyUCxXQUFPc1AsTUFERjtFQUVMclAsY0FBVXNQLE9BRkw7RUFHTEMsV0FBT0YsTUFIRjtFQUlMRyxTQUFLRixPQUpBO0VBS0xkLGNBQVVjLE9BTEw7RUFNTEcsUUFBSSxFQUFFdEwsTUFBTWtMLE1BQVI7RUFOQyxHQVpNO0VBb0JidkQsTUFwQmEsa0JBb0JOO0VBQ0wsV0FBTztFQUNMZCxjQUFRLEVBREg7RUFFTEosZUFBUztFQUZKLEtBQVA7RUFJRCxHQXpCWTs7RUEwQmI4RSxZQUFVO0VBQ1JDLGVBRFEseUJBQ007RUFDWjtFQUNFLDJCQUFtQixLQUFLSCxHQUQxQjtFQUVFLGdDQUF3QixLQUFLaEI7RUFGL0IsU0FHSyxLQUFLNUQsT0FIVjtFQUtELEtBUE87RUFRUmdGLGFBUlEsdUJBUUk7RUFBQTs7RUFDViwwQkFDSyxLQUFLQyxVQURWO0VBRUVDLGdCQUFRO0VBQUEsaUJBQVMsTUFBS0MsS0FBTCxDQUFXLFFBQVgsRUFBcUJsSCxNQUFNckksTUFBTixDQUFhVCxLQUFsQyxDQUFUO0VBQUE7RUFGVjtFQUlEO0VBYk8sR0ExQkc7RUF5Q2JpUSxTQUFPO0VBQ0xoUSxZQURLLG9CQUNJRCxLQURKLEVBQ1c7RUFDZCxXQUFLcEUsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCaUQsV0FBaEIsQ0FBNEJtQixLQUE1QixDQUFuQjtFQUNELEtBSEk7O0VBSUxBLFdBQU87RUFKRixHQXpDTTtFQStDYmlNLFNBL0NhLHFCQStDSDtFQUFBOztFQUNSLFNBQUtyUSxVQUFMLEdBQWtCLElBQUlzQyxtQkFBSixDQUF3QjtFQUN4Q0MsZ0JBQVU7RUFBQSxlQUFhLE9BQUt5TSxJQUFMLENBQVUsT0FBS0MsT0FBZixFQUF3QnJLLFNBQXhCLEVBQW1DLElBQW5DLENBQWI7RUFBQSxPQUQ4QjtFQUV4Q3BDLG1CQUFhO0VBQUEsZUFBYSxPQUFLME0sT0FBTCxDQUFhLE9BQUtELE9BQWxCLEVBQTJCckssU0FBM0IsQ0FBYjtFQUFBLE9BRjJCO0VBR3hDbkMsZ0JBQVU7RUFBQSxlQUFhLE9BQUtzTSxHQUFMLENBQVN1QyxTQUFULENBQW1CbkMsUUFBbkIsQ0FBNEJ2SyxTQUE1QixDQUFiO0VBQUEsT0FIOEI7RUFJeENqQywwQkFBb0IsOEJBQU07RUFDeEIsWUFBSSxPQUFLaVEsS0FBTCxDQUFXMEIsSUFBZixFQUFxQjtFQUNuQixpQkFBSzFCLEtBQUwsQ0FBVzBCLElBQVgsQ0FBZ0J0VSxVQUFoQixDQUEyQnVVLFFBQTNCO0VBQ0Q7RUFDRixPQVJ1QztFQVN4QzNSLDRCQUFzQixnQ0FBTTtFQUMxQixZQUFJLE9BQUtnUSxLQUFMLENBQVcwQixJQUFmLEVBQXFCO0VBQ25CLGlCQUFLMUIsS0FBTCxDQUFXMEIsSUFBWCxDQUFnQnRVLFVBQWhCLENBQTJCd1UsVUFBM0I7RUFDRDtFQUNGLE9BYnVDO0VBY3hDdlIsbUJBQWE7RUFBQSxlQUFhLE9BQUsyUCxLQUFMLENBQVc2QixjQUFYLENBQTBCcFEsUUFBMUIsR0FBcUNBLFFBQWxEO0VBQUEsT0FkMkI7RUFleEN4QixrQ0FBNEIsb0NBQUMyRixJQUFELEVBQU81SCxPQUFQO0VBQUEsZUFDMUIsT0FBS2dTLEtBQUwsQ0FBVzZCLGNBQVgsQ0FBMEI1VCxnQkFBMUIsQ0FBMkMySCxJQUEzQyxFQUFpRDVILE9BQWpELENBRDBCO0VBQUEsT0FmWTtFQWlCeENrQyxvQ0FBOEIsc0NBQUMwRixJQUFELEVBQU81SCxPQUFQO0VBQUEsZUFDNUIsT0FBS2dTLEtBQUwsQ0FBVzZCLGNBQVgsQ0FBMEIzVCxtQkFBMUIsQ0FBOEMwSCxJQUE5QyxFQUFvRDVILE9BQXBELENBRDRCO0VBQUEsT0FqQlU7RUFtQnhDbUMsd0JBQWtCO0VBQUEsZUFBTSxPQUFLNlAsS0FBTCxDQUFXNkIsY0FBWCxDQUEwQkMsYUFBaEM7RUFBQSxPQW5Cc0I7RUFvQnhDMVIsd0JBQWtCO0VBQUEsZUFDZixPQUFLNFAsS0FBTCxDQUFXNkIsY0FBWCxDQUEwQkMsYUFBMUIsR0FBMEN4USxRQUQzQjtFQUFBLE9BcEJzQjtFQXNCeENoQixnQkFBVTtFQUFBLGVBQU0sT0FBSzBQLEtBQUwsQ0FBVzZCLGNBQVgsQ0FBMEJyUSxLQUFoQztFQUFBLE9BdEI4QjtFQXVCeENqQixnQkFBVTtFQUFBLGVBQVUsT0FBS3lQLEtBQUwsQ0FBVzZCLGNBQVgsQ0FBMEJyUSxLQUExQixHQUFrQ0EsS0FBNUM7RUFBQSxPQXZCOEI7RUF3QnhDaEIsYUFBTyxpQkFBTTtFQUNYLGVBQ0UxRSxPQUFPNkgsZ0JBQVAsQ0FBd0IsT0FBS3dJLEdBQTdCLEVBQWtDbUUsZ0JBQWxDLENBQW1ELFdBQW5ELE1BQ0EsS0FGRjtFQUlELE9BN0J1QztFQThCeEMxUCxvQkFBYyxzQkFBQ2tCLFVBQUQsRUFBYXRCLEtBQWIsRUFBdUI7RUFDbkMsWUFBSSxPQUFLd1AsS0FBTCxDQUFXK0IsT0FBZixFQUF3QjtFQUN0QixpQkFBSy9CLEtBQUwsQ0FBVytCLE9BQVgsQ0FBbUIzVSxVQUFuQixDQUE4QjRVLEtBQTlCLENBQW9DbFEsVUFBcEMsRUFBZ0R0QixLQUFoRDtFQUNEO0VBQ0YsT0FsQ3VDO0VBbUN4Q0ssb0JBQWMsd0JBQU07RUFDbEIsWUFBSSxPQUFLbVAsS0FBTCxDQUFXK0IsT0FBZixFQUF3QjtFQUN0QixpQkFBSy9CLEtBQUwsQ0FBVytCLE9BQVgsQ0FBbUIzVSxVQUFuQixDQUE4QjZVLFVBQTlCO0VBQ0Q7RUFDRixPQXZDdUM7RUF3Q3hDdFIsa0JBQVk7RUFBQSxlQUFNLENBQUMsQ0FBQyxPQUFLcVAsS0FBTCxDQUFXK0IsT0FBbkI7RUFBQSxPQXhDNEI7RUF5Q3hDalMsa0JBQVksMkJBQVM7RUFDbkIsWUFBSSxPQUFLa1EsS0FBTCxDQUFXZ0IsS0FBZixFQUFzQjtFQUNwQixpQkFBS2hCLEtBQUwsQ0FBV2dCLEtBQVgsQ0FBaUI1VCxVQUFqQixDQUE0QjhVLEtBQTVCLENBQWtDMVEsS0FBbEM7RUFDRDtFQUNGLE9BN0N1QztFQThDeENmLGdCQUFVO0VBQUEsZUFBTSxDQUFDLENBQUMsT0FBS3VQLEtBQUwsQ0FBV2dCLEtBQW5CO0VBQUEsT0E5QzhCO0VBK0N4Q3RRLHFCQUFlLHlCQUFNO0VBQ25CLFlBQUksT0FBS3NQLEtBQUwsQ0FBV2dCLEtBQWYsRUFBc0I7RUFDcEIsaUJBQU8sT0FBS2hCLEtBQUwsQ0FBV2dCLEtBQVgsQ0FBaUI1VCxVQUFqQixDQUE0QjZQLFFBQTVCLEVBQVA7RUFDRDtFQUNGO0VBbkR1QyxLQUF4QixDQUFsQjs7RUFzREEsU0FBSzdQLFVBQUwsQ0FBZ0JPLElBQWhCOztFQUVBLFNBQUtQLFVBQUwsQ0FBZ0JpRCxXQUFoQixDQUE0QixLQUFLb0IsUUFBakM7O0VBRUE7RUFDQSxTQUFLMFEsWUFBTDtFQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBSUMsZ0JBQUosQ0FBcUI7RUFBQSxhQUFNLE9BQUtGLFlBQUwsRUFBTjtFQUFBLEtBQXJCLENBQXBCO0VBQ0EsU0FBS0MsWUFBTCxDQUFrQkUsT0FBbEIsQ0FBMEIsS0FBS3RDLEtBQUwsQ0FBVzZCLGNBQXJDLEVBQXFEO0VBQ25EVSxpQkFBVyxJQUR3QztFQUVuREMsZUFBUztFQUYwQyxLQUFyRDs7RUFLQSxTQUFLQyxNQUFMLEdBQWMsSUFBSTdHLFVBQUosQ0FBZSxJQUFmLENBQWQ7RUFDQSxTQUFLNkcsTUFBTCxDQUFZOVUsSUFBWjtFQUNELEdBcEhZO0VBcUhiZ1EsZUFySGEsMkJBcUhHO0VBQ2QsU0FBS3lFLFlBQUwsQ0FBa0JNLFVBQWxCOztFQUVBLFFBQUl0VixhQUFhLEtBQUtBLFVBQXRCO0VBQ0EsU0FBS0EsVUFBTCxHQUFrQixJQUFsQjtFQUNBQSxlQUFXVSxPQUFYOztFQUVBLFNBQUsyVSxNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZM1UsT0FBWixFQUFmO0VBQ0QsR0E3SFk7O0VBOEhiNlUsV0FBUztFQUNQUixnQkFETywwQkFDUTtFQUFBOztFQUNiLFVBQU1qRyxzQ0FBYyxLQUFLOEQsS0FBTCxDQUFXNkIsY0FBWCxDQUEwQmUsZ0JBQTFCLENBQTJDLFFBQTNDLENBQWQsRUFBTjs7RUFFQSxVQUFNQyxNQUFNM0csUUFBUTRHLFNBQVIsQ0FBa0IsZ0JBQWU7RUFBQSxZQUFadFIsS0FBWSxRQUFaQSxLQUFZOztFQUMzQyxlQUFPLE9BQUtBLEtBQUwsS0FBZUEsS0FBdEI7RUFDRCxPQUZXLENBQVo7O0VBSUEsVUFBSSxLQUFLd08sS0FBTCxDQUFXNkIsY0FBWCxDQUEwQkMsYUFBMUIsS0FBNENlLEdBQWhELEVBQXFEO0VBQ25ELGFBQUt6VixVQUFMLENBQWdCZ0QsZ0JBQWhCLENBQWlDeVMsR0FBakM7RUFDRDtFQUNGO0VBWE07RUE5SEksQ0FBZjs7QUN0Q0EsZUFBZTNXLFdBQVc7RUFDeEI2VztFQUR3QixDQUFYLENBQWY7O0VDQUFwWCxTQUFTQyxNQUFUOzs7Ozs7OzsifQ==
