/**
* @module vue-mdc-adapterripple 0.17.0
* @exports VueMDCRipple
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCRipple = factory());
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

  var CustomElement = {
    functional: true,
    render: function render(createElement, context) {
      return createElement(context.props.is || context.props.tag || 'div', context.data, context.children);
    }
  };

  var CustomElementMixin = {
    components: {
      CustomElement: CustomElement
    }
  };

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

  var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings = {
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
        return cssClasses;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
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

        var strings$$1 = MDCRippleFoundation.strings;

        Object.keys(strings$$1).forEach(function (k) {
          if (k.indexOf('VAR_') === 0) {
            _this8.adapter_.updateCssVariable(strings$$1[k], null);
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

  var RippleMixin = {
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },
    mounted: function mounted() {
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.ripple.destroy();
    }
  };

  var mdcRipple = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-element', { staticClass: "mdc-ripple", attrs: { "tag": _vm.tag, "classes": _vm.classes, "styles": _vm.styles } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-ripple',
    mixins: [CustomElementMixin, RippleMixin],
    props: {
      tag: String
    }
  };

  var plugin = BasePlugin({
    mdcRipple: mdcRipple
  });

  // import './styles.scss'

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1lbGVtZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS91bmlxdWVpZC1taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS52dWUiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiB2bSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudCA9IHtcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcbiAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcbiAgICAgIGNvbnRleHQucHJvcHMuaXMgfHwgY29udGV4dC5wcm9wcy50YWcgfHwgJ2RpdicsXG4gICAgICBjb250ZXh0LmRhdGEsXG4gICAgICBjb250ZXh0LmNoaWxkcmVuXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50TWl4aW4gPSB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21FbGVtZW50XG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImNvbnN0IHNjb3BlID1cbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xuXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcbiAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgIC8vIFVuYm91bmRlZCByaXBwbGVzIG5lZWQgbGF5b3V0IGxvZ2ljIGFwcGxpZWQgaW1tZWRpYXRlbHkgdG8gc2V0IGNvb3JkaW5hdGVzIGZvciBib3RoIHNoYWRlIGFuZCByaXBwbGVcbiAgICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge1xuICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyxcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxuICBhcHBseVBhc3NpdmVcbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IE1BVENIRVMoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIChcbiAgICAgIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gICAgKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3Iodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGN1c3RvbS1lbGVtZW50IFxuICAgIDp0YWc9XCJ0YWdcIiBcbiAgICA6Y2xhc3Nlcz1cImNsYXNzZXNcIlxuICAgIDpzdHlsZXM9XCJzdHlsZXNcIiBcbiAgICBjbGFzcz1cIm1kYy1yaXBwbGVcIj5cbiAgICA8c2xvdCAvPlxuICA8L2N1c3RvbS1lbGVtZW50PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IEN1c3RvbUVsZW1lbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgeyBSaXBwbGVNaXhpbiB9IGZyb20gJy4vbWRjLXJpcHBsZS1iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtcmlwcGxlJyxcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBSaXBwbGVNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgdGFnOiBTdHJpbmdcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNSaXBwbGUgZnJvbSAnLi9tZGMtcmlwcGxlLnZ1ZSdcblxuZXhwb3J0ICogZnJvbSAnLi9tZGMtcmlwcGxlLWJhc2UuanMnXG5cbmV4cG9ydCB7IG1kY1JpcHBsZSB9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNSaXBwbGVcbn0pXG4iLCIvLyBpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJDdXN0b21FbGVtZW50IiwiZnVuY3Rpb25hbCIsInJlbmRlciIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwicHJvcHMiLCJpcyIsInRhZyIsImRhdGEiLCJjaGlsZHJlbiIsIkN1c3RvbUVsZW1lbnRNaXhpbiIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDUmlwcGxlQWRhcHRlciIsImNsYXNzTmFtZSIsInRhcmdldCIsImV2dFR5cGUiLCJoYW5kbGVyIiwidmFyTmFtZSIsInZhbHVlIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsInN0cmluZ3MiLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwiZG9jdW1lbnQiLCJub2RlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwiZm9yY2VSZWZyZXNoIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJ1bmRlZmluZWQiLCJpc1N1cHBvcnRlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiZSIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwidHlwZSIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIkFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsImFjdGl2YXRlZFRhcmdldHMiLCJNRENSaXBwbGVGb3VuZGF0aW9uIiwiYnJvd3NlclN1cHBvcnRzQ3NzVmFycyIsImlzVW5ib3VuZGVkIiwiaXNTdXJmYWNlQWN0aXZlIiwiaXNTdXJmYWNlRGlzYWJsZWQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiZm9yRWFjaCIsIk9iamVjdCIsImtleXMiLCJrIiwiaW5kZXhPZiIsImFjdGl2YXRpb25TdGF0ZSIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJoYXNBY3RpdmF0ZWRDaGlsZCIsImxlbmd0aCIsInNvbWUiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsImtleUNvZGUiLCJldmVudCIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsInNldFRpbWVvdXQiLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJtYXhEaW0iLCJtYXgiLCJnZXRCb3VuZGVkUmFkaXVzIiwiaHlwb3RlbnVzZSIsInNxcnQiLCJwb3ciLCJ1cGRhdGVMYXlvdXRDc3NWYXJzXyIsInJvdW5kIiwidW5ib3VuZGVkIiwiUmlwcGxlQmFzZSIsInJlZiIsIk1BVENIRVMiLCJfbWF0Y2hlcyIsIkhUTUxFbGVtZW50IiwicHJvdG90eXBlIiwib3B0aW9ucyIsIiRlbCIsImRpc2FibGVkIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwiY29udGFpbnMiLCJldnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIlJpcHBsZU1peGluIiwibW91bnRlZCIsInJpcHBsZSIsImluaXQiLCJiZWZvcmVEZXN0cm95IiwiZGVzdHJveSIsIm1peGlucyIsIlN0cmluZyIsIm1kY1JpcHBsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0VBQy9CO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0VBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUN4QztFQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0VBQ0Q7RUFDRCxNQUFJ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
