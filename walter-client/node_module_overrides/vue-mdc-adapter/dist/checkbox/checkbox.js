/**
* @module vue-mdc-adaptercheckbox 0.17.0
* @exports VueMDCCheckbox
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCCheckbox = factory());
}(this, (function () { 'use strict';

  var supportsPassive_ = void 0;

  /**
   * Determine whether the current browser supports passive event listeners, and if so, use them.
   * @param {!Window=} globalObj
   * @param {boolean=} forceRefresh
   * @return {boolean|{passive: boolean}}
   */
  function applyPassive() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_ === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, {
          get passive() {
            isSupported = { passive: true };
          }
        });
      } catch (e) {
        //empty
      }

      supportsPassive_ = isSupported;
    }

    return supportsPassive_;
  }

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

  var DispatchFocusMixin = {
    data: function data() {
      return { hasFocus: false };
    },

    methods: {
      onMouseDown: function onMouseDown() {
        this._active = true;
      },
      onMouseUp: function onMouseUp() {
        this._active = false;
      },
      onFocusEvent: function onFocusEvent() {
        var _this = this;

        // dispatch async to let time to other focus event to propagate
        setTimeout(function () {
          return _this.dispatchFocusEvent();
        }, 0);
      },
      onBlurEvent: function onBlurEvent() {
        var _this2 = this;

        // dispatch async to let time to other focus event to propagate
        // also filtur blur if mousedown
        this._active || setTimeout(function () {
          return _this2.dispatchFocusEvent();
        }, 0);
      },
      dispatchFocusEvent: function dispatchFocusEvent() {
        var hasFocus = this.$el === document.activeElement || this.$el.contains(document.activeElement);
        if (hasFocus != this.hasFocus) {
          this.$emit(hasFocus ? 'focus' : 'blur');
          this.hasFocus = hasFocus;
        }
      }
    },
    mounted: function mounted() {
      this.$el.addEventListener('focusin', this.onFocusEvent);
      this.$el.addEventListener('focusout', this.onBlurEvent);
      this.$el.addEventListener('mousedown', this.onMouseDown);
      this.$el.addEventListener('mouseup', this.onMouseUp);
    },
    beforeDestroy: function beforeDestroy() {
      this.$el.removeEventListener('focusin', this.onFocusEvent);
      this.$el.removeEventListener('focusout', this.onBlurEvent);
      this.$el.removeEventListener('mousedown', this.onMouseDown);
      this.$el.removeEventListener('mouseup', this.onMouseUp);
    }
  };

  var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

  var VMAUniqueIdMixin = {
    beforeCreate: function beforeCreate() {
      this.vma_uid_ = scope + this._uid;
    }
  };

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
   * @extends MDCComponent<!MDCRippleFoundation>
   */

  var MDCRipple = function (_MDCComponent) {
    inherits(MDCRipple, _MDCComponent);

    /** @param {...?} args */
    function MDCRipple() {
      var _ref;

      classCallCheck(this, MDCRipple);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /** @type {boolean} */
      var _this = possibleConstructorReturn(this, (_ref = MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).call.apply(_ref, [this].concat(args)));

      _this.disabled = false;

      /** @private {boolean} */
      _this.unbounded_;
      return _this;
    }

    /**
     * @param {!Element} root
     * @param {{isUnbounded: (boolean|undefined)}=} options
     * @return {!MDCRipple}
     */


    createClass(MDCRipple, [{
      key: 'setUnbounded_',


      /**
       * Closure Compiler throws an access control error when directly accessing a
       * protected or private property inside a getter/setter, like unbounded above.
       * By accessing the protected property inside a method, we solve that problem.
       * That's why this function exists.
       * @private
       */
      value: function setUnbounded_() {
        this.foundation_.setUnbounded(this.unbounded_);
      }
    }, {
      key: 'activate',
      value: function activate() {
        this.foundation_.activate();
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.foundation_.deactivate();
      }
    }, {
      key: 'layout',
      value: function layout() {
        this.foundation_.layout();
      }

      /** @return {!MDCRippleFoundation} */

    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        return new MDCRippleFoundation(MDCRipple.createAdapter(this));
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
      }
    }, {
      key: 'unbounded',


      /** @return {boolean} */
      get: function get$$1() {
        return this.unbounded_;
      }

      /** @param {boolean} unbounded */
      ,
      set: function set$$1(unbounded) {
        this.unbounded_ = Boolean(unbounded);
        this.setUnbounded_();
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$isUnbounded = _ref2.isUnbounded,
            isUnbounded = _ref2$isUnbounded === undefined ? undefined : _ref2$isUnbounded;

        var ripple = new MDCRipple(root);
        // Only override unbounded behavior if option is explicitly specified
        if (isUnbounded !== undefined) {
          ripple.unbounded = /** @type {boolean} */isUnbounded;
        }
        return ripple;
      }

      /**
       * @param {!RippleCapableSurface} instance
       * @return {!MDCRippleAdapter}
       */

    }, {
      key: 'createAdapter',
      value: function createAdapter(instance) {
        var MATCHES = getMatchesProperty(HTMLElement.prototype);

        return {
          browserSupportsCssVars: function browserSupportsCssVars() {
            return supportsCssVariables(window);
          },
          isUnbounded: function isUnbounded() {
            return instance.unbounded;
          },
          isSurfaceActive: function isSurfaceActive() {
            return instance.root_[MATCHES](':active');
          },
          isSurfaceDisabled: function isSurfaceDisabled() {
            return instance.disabled;
          },
          addClass: function addClass(className) {
            return instance.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return instance.root_.classList.remove(className);
          },
          containsEventTarget: function containsEventTarget(target) {
            return instance.root_.contains(target);
          },
          registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
            return instance.root_.addEventListener(evtType, handler, applyPassive$1());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
            return instance.root_.removeEventListener(evtType, handler, applyPassive$1());
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
            return instance.root_.style.setProperty(varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return instance.root_.getBoundingClientRect();
          },
          getWindowPageOffset: function getWindowPageOffset() {
            return { x: window.pageXOffset, y: window.pageYOffset };
          }
        };
      }
    }]);
    return MDCRipple;
  }(MDCComponent);

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
   * @record
   */

  var MDCSelectionControl = function () {
    function MDCSelectionControl() {
      classCallCheck(this, MDCSelectionControl);
    }

    createClass(MDCSelectionControl, [{
      key: 'ripple',

      /** @return {?MDCRipple} */
      get: function get$$1() {}
    }]);
    return MDCSelectionControl;
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
   * Adapter for MDC Checkbox. Provides an interface for managing
   * - classes
   * - dom
   * - event handlers
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

  var MDCCheckboxAdapter = function () {
    function MDCCheckboxAdapter() {
      classCallCheck(this, MDCCheckboxAdapter);
    }

    createClass(MDCCheckboxAdapter, [{
      key: 'addClass',

      /** @param {string} className */
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: 'removeClass',
      value: function removeClass(className) {}

      /**
       * Sets an attribute with a given value on the input element.
       * @param {string} attr
       * @param {string} value
       */

    }, {
      key: 'setNativeControlAttr',
      value: function setNativeControlAttr(attr, value) {}

      /**
       * Removes an attribute from the input element.
       * @param {string} attr
       */

    }, {
      key: 'removeNativeControlAttr',
      value: function removeNativeControlAttr(attr) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'registerAnimationEndHandler',
      value: function registerAnimationEndHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'deregisterAnimationEndHandler',
      value: function deregisterAnimationEndHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'registerChangeHandler',
      value: function registerChangeHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'deregisterChangeHandler',
      value: function deregisterChangeHandler(handler) {}

      /** @return {!MDCSelectionControlState} */

    }, {
      key: 'getNativeControl',
      value: function getNativeControl() {}
    }, {
      key: 'forceLayout',
      value: function forceLayout() {}

      /** @return {boolean} */

    }, {
      key: 'isAttachedToDOM',
      value: function isAttachedToDOM() {}
    }]);
    return MDCCheckboxAdapter;
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

  /** @const {string} */
  var ROOT = 'mdc-checkbox';

  /** @enum {string} */
  var cssClasses$1 = {
    UPGRADED: 'mdc-checkbox--upgraded',
    CHECKED: 'mdc-checkbox--checked',
    INDETERMINATE: 'mdc-checkbox--indeterminate',
    DISABLED: 'mdc-checkbox--disabled',
    ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
    ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
    ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
    ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
    ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
    ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked'
  };

  /** @enum {string} */
  var strings$1 = {
    NATIVE_CONTROL_SELECTOR: '.' + ROOT + '__native-control',
    TRANSITION_STATE_INIT: 'init',
    TRANSITION_STATE_CHECKED: 'checked',
    TRANSITION_STATE_UNCHECKED: 'unchecked',
    TRANSITION_STATE_INDETERMINATE: 'indeterminate',
    ARIA_CHECKED_ATTR: 'aria-checked',
    ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed'
  };

  /** @enum {number} */
  var numbers$1 = {
    ANIM_END_LATCH_MS: 250
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

  /** @const {!Array<string>} */
  var CB_PROTO_PROPS = ['checked', 'indeterminate'];

  /**
   * @extends {MDCFoundation<!MDCCheckboxAdapter>}
   */

  var MDCCheckboxFoundation = function (_MDCFoundation) {
    inherits(MDCCheckboxFoundation, _MDCFoundation);
    createClass(MDCCheckboxFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses$1;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$1;
      }

      /** @return enum {numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$1;
      }

      /** @return {!MDCCheckboxAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCCheckboxAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            setNativeControlAttr: function setNativeControlAttr() /* attr: string, value: string */{},
            removeNativeControlAttr: function removeNativeControlAttr() /* attr: string */{},
            registerAnimationEndHandler: function registerAnimationEndHandler() /* handler: EventListener */{},
            deregisterAnimationEndHandler: function deregisterAnimationEndHandler() /* handler: EventListener */{},
            registerChangeHandler: function registerChangeHandler() /* handler: EventListener */{},
            deregisterChangeHandler: function deregisterChangeHandler() /* handler: EventListener */{},
            getNativeControl: function getNativeControl() /* !MDCSelectionControlState */{},
            forceLayout: function forceLayout() {},
            isAttachedToDOM: function isAttachedToDOM() /* boolean */{}
          }
        );
      }
    }]);

    function MDCCheckboxFoundation(adapter) {
      classCallCheck(this, MDCCheckboxFoundation);

      /** @private {string} */
      var _this = possibleConstructorReturn(this, (MDCCheckboxFoundation.__proto__ || Object.getPrototypeOf(MDCCheckboxFoundation)).call(this, _extends(MDCCheckboxFoundation.defaultAdapter, adapter)));

      _this.currentCheckState_ = strings$1.TRANSITION_STATE_INIT;

      /** @private {string} */
      _this.currentAnimationClass_ = '';

      /** @private {number} */
      _this.animEndLatchTimer_ = 0;

      _this.animEndHandler_ = /** @private {!EventListener} */function () {
        return _this.handleAnimationEnd();
      };

      _this.changeHandler_ = /** @private {!EventListener} */function () {
        return _this.handleChange();
      };
      return _this;
    }

    createClass(MDCCheckboxFoundation, [{
      key: 'init',
      value: function init() {
        this.currentCheckState_ = this.determineCheckState_(this.getNativeControl_());
        this.updateAriaChecked_();
        this.adapter_.addClass(cssClasses$1.UPGRADED);
        this.adapter_.registerChangeHandler(this.changeHandler_);
        this.installPropertyChangeHooks_();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterChangeHandler(this.changeHandler_);
        this.uninstallPropertyChangeHooks_();
      }

      /** @return {boolean} */

    }, {
      key: 'isChecked',
      value: function isChecked() {
        return this.getNativeControl_().checked;
      }

      /** @param {boolean} checked */

    }, {
      key: 'setChecked',
      value: function setChecked(checked) {
        this.getNativeControl_().checked = checked;
      }

      /** @return {boolean} */

    }, {
      key: 'isIndeterminate',
      value: function isIndeterminate() {
        return this.getNativeControl_().indeterminate;
      }

      /** @param {boolean} indeterminate */

    }, {
      key: 'setIndeterminate',
      value: function setIndeterminate(indeterminate) {
        this.getNativeControl_().indeterminate = indeterminate;
      }

      /** @return {boolean} */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.getNativeControl_().disabled;
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.getNativeControl_().disabled = disabled;
        if (disabled) {
          this.adapter_.addClass(cssClasses$1.DISABLED);
        } else {
          this.adapter_.removeClass(cssClasses$1.DISABLED);
        }
      }

      /** @return {?string} */

    }, {
      key: 'getValue',
      value: function getValue() {
        return this.getNativeControl_().value;
      }

      /** @param {?string} value */

    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.getNativeControl_().value = value;
      }

      /**
       * Handles the animationend event for the checkbox
       */

    }, {
      key: 'handleAnimationEnd',
      value: function handleAnimationEnd() {
        var _this2 = this;

        clearTimeout(this.animEndLatchTimer_);
        this.animEndLatchTimer_ = setTimeout(function () {
          _this2.adapter_.removeClass(_this2.currentAnimationClass_);
          _this2.adapter_.deregisterAnimationEndHandler(_this2.animEndHandler_);
        }, numbers$1.ANIM_END_LATCH_MS);
      }

      /**
       * Handles the change event for the checkbox
       */

    }, {
      key: 'handleChange',
      value: function handleChange() {
        this.transitionCheckState_();
      }

      /** @private */

    }, {
      key: 'installPropertyChangeHooks_',
      value: function installPropertyChangeHooks_() {
        var _this3 = this;

        var nativeCb = this.getNativeControl_();
        var cbProto = Object.getPrototypeOf(nativeCb);

        CB_PROTO_PROPS.forEach(function (controlState) {
          var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
          // We have to check for this descriptor, since some browsers (Safari) don't support its return.
          // See: https://bugs.webkit.org/show_bug.cgi?id=49739
          if (validDescriptor(desc)) {
            var nativeCbDesc = /** @type {!ObjectPropertyDescriptor} */{
              get: desc.get,
              set: function set$$1(state) {
                desc.set.call(nativeCb, state);
                _this3.transitionCheckState_();
              },
              configurable: desc.configurable,
              enumerable: desc.enumerable
            };
            Object.defineProperty(nativeCb, controlState, nativeCbDesc);
          }
        });
      }

      /** @private */

    }, {
      key: 'uninstallPropertyChangeHooks_',
      value: function uninstallPropertyChangeHooks_() {
        var nativeCb = this.getNativeControl_();
        var cbProto = Object.getPrototypeOf(nativeCb);

        CB_PROTO_PROPS.forEach(function (controlState) {
          var desc = /** @type {!ObjectPropertyDescriptor} */Object.getOwnPropertyDescriptor(cbProto, controlState);
          if (validDescriptor(desc)) {
            Object.defineProperty(nativeCb, controlState, desc);
          }
        });
      }

      /** @private */

    }, {
      key: 'transitionCheckState_',
      value: function transitionCheckState_() {
        var nativeCb = this.adapter_.getNativeControl();
        if (!nativeCb) {
          return;
        }
        var oldState = this.currentCheckState_;
        var newState = this.determineCheckState_(nativeCb);
        if (oldState === newState) {
          return;
        }

        this.updateAriaChecked_();

        // Check to ensure that there isn't a previously existing animation class, in case for example
        // the user interacted with the checkbox before the animation was finished.
        if (this.currentAnimationClass_.length > 0) {
          clearTimeout(this.animEndLatchTimer_);
          this.adapter_.forceLayout();
          this.adapter_.removeClass(this.currentAnimationClass_);
        }

        this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
        this.currentCheckState_ = newState;

        // Check for parentNode so that animations are only run when the element is attached
        // to the DOM.
        if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
          this.adapter_.addClass(this.currentAnimationClass_);
          this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
        }
      }

      /**
       * @param {!MDCSelectionControlState} nativeCb
       * @return {string}
       * @private
       */

    }, {
      key: 'determineCheckState_',
      value: function determineCheckState_(nativeCb) {
        var TRANSITION_STATE_INDETERMINATE = strings$1.TRANSITION_STATE_INDETERMINATE,
            TRANSITION_STATE_CHECKED = strings$1.TRANSITION_STATE_CHECKED,
            TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;


        if (nativeCb.indeterminate) {
          return TRANSITION_STATE_INDETERMINATE;
        }
        return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
      }

      /**
       * @param {string} oldState
       * @param {string} newState
       * @return {string}
       */

    }, {
      key: 'getTransitionAnimationClass_',
      value: function getTransitionAnimationClass_(oldState, newState) {
        var TRANSITION_STATE_INIT = strings$1.TRANSITION_STATE_INIT,
            TRANSITION_STATE_CHECKED = strings$1.TRANSITION_STATE_CHECKED,
            TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;
        var _MDCCheckboxFoundatio = MDCCheckboxFoundation.cssClasses,
            ANIM_UNCHECKED_CHECKED = _MDCCheckboxFoundatio.ANIM_UNCHECKED_CHECKED,
            ANIM_UNCHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_UNCHECKED_INDETERMINATE,
            ANIM_CHECKED_UNCHECKED = _MDCCheckboxFoundatio.ANIM_CHECKED_UNCHECKED,
            ANIM_CHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_CHECKED_INDETERMINATE,
            ANIM_INDETERMINATE_CHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_CHECKED,
            ANIM_INDETERMINATE_UNCHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_UNCHECKED;


        switch (oldState) {
          case TRANSITION_STATE_INIT:
            if (newState === TRANSITION_STATE_UNCHECKED) {
              return '';
            }
          // fallthrough
          case TRANSITION_STATE_UNCHECKED:
            return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
          case TRANSITION_STATE_CHECKED:
            return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
          // TRANSITION_STATE_INDETERMINATE
          default:
            return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
        }
      }
    }, {
      key: 'updateAriaChecked_',
      value: function updateAriaChecked_() {
        // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
        if (this.isIndeterminate()) {
          this.adapter_.setNativeControlAttr(strings$1.ARIA_CHECKED_ATTR, strings$1.ARIA_CHECKED_INDETERMINATE_VALUE);
        } else {
          this.adapter_.removeNativeControlAttr(strings$1.ARIA_CHECKED_ATTR);
        }
      }

      /**
       * @return {!MDCSelectionControlState}
       * @private
       */

    }, {
      key: 'getNativeControl_',
      value: function getNativeControl_() {
        return this.adapter_.getNativeControl() || {
          checked: false,
          indeterminate: false,
          disabled: false,
          value: null
        };
      }
    }]);
    return MDCCheckboxFoundation;
  }(MDCFoundation);

  /**
   * @param {ObjectPropertyDescriptor|undefined} inputPropDesc
   * @return {boolean}
   */


  function validDescriptor(inputPropDesc) {
    return !!inputPropDesc && typeof inputPropDesc.set === 'function';
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
   * Adapter for MDC Form Field. Provides an interface for managing
   * - event handlers
   * - ripple activation
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
  var MDCFormFieldAdapter = function () {
    function MDCFormFieldAdapter() {
      classCallCheck(this, MDCFormFieldAdapter);
    }

    createClass(MDCFormFieldAdapter, [{
      key: "registerInteractionHandler",

      /**
       * @param {string} type
       * @param {!EventListener} handler
       */
      value: function registerInteractionHandler(type, handler) {}

      /**
       * @param {string} type
       * @param {!EventListener} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}
    }, {
      key: "activateInputRipple",
      value: function activateInputRipple() {}
    }, {
      key: "deactivateInputRipple",
      value: function deactivateInputRipple() {}
    }]);
    return MDCFormFieldAdapter;
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

  /** @enum {string} */
  var cssClasses$2 = {
    ROOT: 'mdc-form-field'
  };

  /** @enum {string} */
  var strings$2 = {
    LABEL_SELECTOR: '.mdc-form-field > label'
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
   * @extends {MDCFoundation<!MDCFormFieldAdapter>}
   */

  var MDCFormFieldFoundation = function (_MDCFoundation) {
    inherits(MDCFormFieldFoundation, _MDCFoundation);
    createClass(MDCFormFieldFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses$2;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$2;
      }

      /** @return {!MDCFormFieldAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          activateInputRipple: function activateInputRipple() {},
          deactivateInputRipple: function deactivateInputRipple() {}
        };
      }
    }]);

    function MDCFormFieldFoundation(adapter) {
      classCallCheck(this, MDCFormFieldFoundation);

      /** @private {!EventListener} */
      var _this = possibleConstructorReturn(this, (MDCFormFieldFoundation.__proto__ || Object.getPrototypeOf(MDCFormFieldFoundation)).call(this, _extends(MDCFormFieldFoundation.defaultAdapter, adapter)));

      _this.clickHandler_ = /** @type {!EventListener} */function () {
        return _this.handleClick_();
      };
      return _this;
    }

    createClass(MDCFormFieldFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      }

      /** @private */

    }, {
      key: 'handleClick_',
      value: function handleClick_() {
        var _this2 = this;

        this.adapter_.activateInputRipple();
        requestAnimationFrame(function () {
          return _this2.adapter_.deactivateInputRipple();
        });
      }
    }]);
    return MDCFormFieldFoundation;
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

  /** @const {Object<string, !VendorPropertyMapType>} */
  var eventTypeMap = {
    'animationstart': {
      noPrefix: 'animationstart',
      webkitPrefix: 'webkitAnimationStart',
      styleProperty: 'animation'
    },
    'animationend': {
      noPrefix: 'animationend',
      webkitPrefix: 'webkitAnimationEnd',
      styleProperty: 'animation'
    },
    'animationiteration': {
      noPrefix: 'animationiteration',
      webkitPrefix: 'webkitAnimationIteration',
      styleProperty: 'animation'
    },
    'transitionend': {
      noPrefix: 'transitionend',
      webkitPrefix: 'webkitTransitionEnd',
      styleProperty: 'transition'
    }
  };

  /** @const {Object<string, !VendorPropertyMapType>} */
  var cssPropertyMap = {
    'animation': {
      noPrefix: 'animation',
      webkitPrefix: '-webkit-animation'
    },
    'transform': {
      noPrefix: 'transform',
      webkitPrefix: '-webkit-transform'
    },
    'transition': {
      noPrefix: 'transition',
      webkitPrefix: '-webkit-transition'
    }
  };

  /**
   * @param {!Object} windowObj
   * @return {boolean}
   */
  function hasProperShape(windowObj) {
    return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
  }

  /**
   * @param {string} eventType
   * @return {boolean}
   */
  function eventFoundInMaps(eventType) {
    return eventType in eventTypeMap || eventType in cssPropertyMap;
  }

  /**
   * @param {string} eventType
   * @param {!Object<string, !VendorPropertyMapType>} map
   * @param {!Element} el
   * @return {string}
   */
  function getJavaScriptEventName(eventType, map, el) {
    return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  /**
   * Helper function to determine browser prefix for CSS3 animation events
   * and property names.
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getAnimationName(windowObj, eventType) {
    if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
      return eventType;
    }

    var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
    var el = windowObj['document']['createElement']('div');
    var eventName = '';

    if (map === eventTypeMap) {
      eventName = getJavaScriptEventName(eventType, map, el);
    } else {
      eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    }

    return eventName;
  }

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectEventName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

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

  var mdcCheckbox = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-checkbox-wrapper", class: _vm.formFieldClasses }, [_c('div', { ref: "root", staticClass: "mdc-checkbox", class: _vm.classes, style: _vm.styles }, [_c('input', { ref: "control", staticClass: "mdc-checkbox__native-control", attrs: { "id": _vm.vma_uid_, "name": _vm.name, "type": "checkbox" }, domProps: { "value": _vm.value }, on: { "change": _vm.onChange } }), _vm._v(" "), _c('div', { staticClass: "mdc-checkbox__background" }, [_c('svg', { staticClass: "mdc-checkbox__checkmark", attrs: { "viewBox": "0 0 24 24" } }, [_c('path', { staticClass: "mdc-checkbox__checkmark-path", attrs: { "fill": "none", "stroke": "white", "d": "M1.73,12.91 8.1,19.28 22.79,4.59" } })]), _vm._v(" "), _c('div', { staticClass: "mdc-checkbox__mixedmark" })])]), _vm._v(" "), _c('label', { ref: "label", attrs: { "for": _vm.vma_uid_ } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-checkbox',
    mixins: [DispatchFocusMixin, VMAUniqueIdMixin],
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: [Boolean, Array],
      indeterminate: Boolean,
      disabled: Boolean,
      label: String,
      'align-end': Boolean,
      value: {
        type: [String, Number],
        default: function _default() {
          return 'on';
        }
      },
      name: String
    },
    data: function data() {
      return {
        styles: {},
        classes: {}
      };
    },

    computed: {
      hasLabel: function hasLabel() {
        return this.label || this.$slots.default;
      },
      formFieldClasses: function formFieldClasses() {
        return {
          'mdc-form-field': this.hasLabel,
          'mdc-form-field--align-end': this.hasLabel && this.alignEnd
        };
      }
    },
    watch: {
      checked: 'setChecked',
      disabled: function disabled(value) {
        this.foundation.setDisabled(value);
      },
      indeterminate: function indeterminate(value) {
        this.foundation.setIndeterminate(value);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCCheckboxFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        setNativeControlAttr: function setNativeControlAttr(attr, value) {
          _this.$refs.control.setAttribute(attr, value);
        },
        removeNativeControlAttr: function removeNativeControlAttr(attr) {
          _this.$refs.control.removeAttribute(attr);
        },
        registerAnimationEndHandler: function registerAnimationEndHandler(handler) {
          return _this.$refs.root.addEventListener(getCorrectEventName(window, 'animationend'), handler);
        },
        deregisterAnimationEndHandler: function deregisterAnimationEndHandler(handler) {
          return _this.$refs.root.removeEventListener(getCorrectEventName(window, 'animationend'), handler);
        },
        registerChangeHandler: function registerChangeHandler(handler) {
          return _this.$refs.control.addEventListener('change', handler);
        },
        deregisterChangeHandler: function deregisterChangeHandler(handler) {
          return _this.$refs.control.removeEventListener('change', handler);
        },
        getNativeControl: function getNativeControl() {
          return _this.$refs.control;
        },
        forceLayout: function forceLayout() {
          return _this.$refs.root.offsetWidth;
        },
        isAttachedToDOM: function isAttachedToDOM() {
          return Boolean(_this.$el.parentNode);
        }
      });

      this.ripple = new RippleBase(this, {
        isUnbounded: function isUnbounded() {
          return true;
        },
        isSurfaceActive: function isSurfaceActive() {
          return RippleBase.isSurfaceActive(_this.$refs.control);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          _this.$refs.control.addEventListener(evt, handler, applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          _this.$refs.control.removeEventListener(evt, handler, applyPassive());
        },
        computeBoundingRect: function computeBoundingRect() {
          return _this.$refs.root.getBoundingClientRect();
        }
      });

      this.formField = new MDCFormFieldFoundation({
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          _this.$refs.label.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          _this.$refs.label.removeEventListener(type, handler);
        },
        activateInputRipple: function activateInputRipple() {
          _this.ripple && _this.ripple.activate();
        },
        deactivateInputRipple: function deactivateInputRipple() {
          _this.ripple && _this.ripple.deactivate();
        }
      });

      this.foundation.init();
      this.ripple.init();
      this.formField.init();
      this.setChecked(this.checked);
      this.foundation.setDisabled(this.disabled);
      this.foundation.setIndeterminate(this.indeterminate);
    },
    beforeDestroy: function beforeDestroy() {
      this.formField.destroy();
      this.ripple.destroy();
      this.foundation.destroy();
    },

    methods: {
      setChecked: function setChecked(checked) {
        this.foundation.setChecked(Array.isArray(checked) ? checked.indexOf(this.value) > -1 : checked);
      },
      onChange: function onChange() {
        this.$emit('update:indeterminate', this.foundation.isIndeterminate());
        var isChecked = this.foundation.isChecked();

        if (Array.isArray(this.checked)) {
          var idx = this.checked.indexOf(this.value);
          if (isChecked) {
            idx < 0 && this.$emit('change', this.checked.concat(this.value));
          } else {
            idx > -1 && this.$emit('change', this.checked.slice(0, idx).concat(this.checked.slice(idx + 1)));
          }
        } else {
          this.$emit('change', isChecked);
        }
      }
    }
  };

  var plugin = BasePlugin({
    mdcCheckbox: mdcCheckbox
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hcHBseS1wYXNzaXZlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZm9jdXMtbWl4aW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbnRyb2wvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoZWNrYm94L2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoZWNrYm94L2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvY2hlY2tib3gvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZm9ybS1maWVsZC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9mb3JtLWZpZWxkL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZm9ybS1maWVsZC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9hbmltYXRpb24vaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9jb21wb25lbnRzL2NoZWNrYm94L21kYy1jaGVja2JveC52dWUiLCIuLi8uLi9jb21wb25lbnRzL2NoZWNrYm94L2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9jaGVja2JveC9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc3VwcG9ydHNQYXNzaXZlX1xuXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlXG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge1xuICAgICAgICBnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgICBpc1N1cHBvcnRlZCA9IHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy9lbXB0eVxuICAgIH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZFxuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV9cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiB2bSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9XG59XG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hGb2N1c01peGluID0ge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7IGhhc0ZvY3VzOiBmYWxzZSB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbk1vdXNlRG93bigpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWVcbiAgICB9LFxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlXG4gICAgfSxcbiAgICBvbkZvY3VzRXZlbnQoKSB7XG4gICAgICAvLyBkaXNwYXRjaCBhc3luYyB0byBsZXQgdGltZSB0byBvdGhlciBmb2N1cyBldmVudCB0byBwcm9wYWdhdGVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwgMClcbiAgICB9LFxuICAgIG9uQmx1ckV2ZW50KCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICAvLyBhbHNvIGZpbHR1ciBibHVyIGlmIG1vdXNlZG93blxuICAgICAgdGhpcy5fYWN0aXZlIHx8IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwgMClcbiAgICB9LFxuICAgIGRpc3BhdGNoRm9jdXNFdmVudCgpIHtcbiAgICAgIGxldCBoYXNGb2N1cyA9XG4gICAgICAgIHRoaXMuJGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8XG4gICAgICAgIHRoaXMuJGVsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpXG4gICAgICBpZiAoaGFzRm9jdXMgIT0gdGhpcy5oYXNGb2N1cykge1xuICAgICAgICB0aGlzLiRlbWl0KGhhc0ZvY3VzID8gJ2ZvY3VzJyA6ICdibHVyJylcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGhhc0ZvY3VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNFdmVudClcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25CbHVyRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bilcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfVxufVxuIiwiY29uc3Qgc2NvcGUgPVxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXG5cbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xuICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgbGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCA9IHdpbmRvd09iai5DU1MgJiYgdHlwZW9mIHdpbmRvd09iai5DU1Muc3VwcG9ydHMgPT09ICdmdW5jdGlvbic7XG4gIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzID0gd2luZG93T2JqLkNTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcbiAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU0NjY5XG4gIC8vIFNlZTogUkVBRE1FIHNlY3Rpb24gb24gU2FmYXJpXG4gIGNvbnN0IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyA9IChcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnY29sb3InLCAnIzAwMDAwMDAwJylcbiAgKTtcblxuICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghZm9yY2VSZWZyZXNoKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBwYWdlT2Zmc2V0XG4gKiBAcGFyYW0geyFDbGllbnRSZWN0fSBjbGllbnRSZWN0XG4gKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGRlYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZm9jdXM6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgYmx1cjogKHN0cmluZ3x1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJJbmZvVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVGb2N1cygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlQmx1cigpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG5cbiAgICAvKiogQHByaXZhdGUge3tsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0V2ZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc1N1cHBvcnRlZF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFBY3RpdmF0aW9uU3RhdGVUeXBlfVxuICAgKi9cbiAgZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiBmYWxzZSxcbiAgICAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogZmFsc2UsXG4gICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXG4gICAgICBhY3RpdmF0aW9uRXZlbnQ6IG51bGwsXG4gICAgICBpc1Byb2dyYW1tYXRpYzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2YXRpb25UaW1lcl8pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcbiAgICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgfVxuXG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSAmJiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleUNvZGUgPT09IDMyKSkge1xuICAgICAgICAvLyBJZiBzcGFjZSB3YXMgcHJlc3NlZCwgdHJ5IGFnYWluIHdpdGhpbiBhbiByQUYgY2FsbCB0byBkZXRlY3QgOmFjdGl2ZSwgYmVjYXVzZSBkaWZmZXJlbnQgVUFzIHJlcG9ydFxuICAgICAgICAvLyBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgICAvLyBXZSB0cnkgZmlyc3Qgb3V0c2lkZSByQUYgdG8gc3VwcG9ydCBFZGdlLCB3aGljaCBkb2VzIG5vdCBleGhpYml0IHRoaXMgcHJvYmxlbSwgYnV0IHdpbGwgY3Jhc2ggaWYgYSBDU1NcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgc2V0IHdpdGhpbiBhIHJBRiBjYWxsYmFjayBmb3IgYSBzdWJtaXQgYnV0dG9uIGludGVyYWN0aW9uICgjMjI0MSkuXG4gICAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpIHtcbiAgICByZXR1cm4gKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oZSkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIGNvbnN0IGV2dE9iamVjdCA9IG51bGw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhldnRPYmplY3QsIHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyhlLCB7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEU7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50JztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEBleHRlbmRzIE1EQ0NvbXBvbmVudDwhTURDUmlwcGxlRm91bmRhdGlvbj5cbiAqL1xuY2xhc3MgTURDUmlwcGxlIGV4dGVuZHMgTURDQ29tcG9uZW50IHtcbiAgLyoqIEBwYXJhbSB7Li4uP30gYXJncyAqL1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMudW5ib3VuZGVkXztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7e2lzVW5ib3VuZGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpfT19IG9wdGlvbnNcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZX1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290LCB7aXNVbmJvdW5kZWQgPSB1bmRlZmluZWR9ID0ge30pIHtcbiAgICBjb25zdCByaXBwbGUgPSBuZXcgTURDUmlwcGxlKHJvb3QpO1xuICAgIC8vIE9ubHkgb3ZlcnJpZGUgdW5ib3VuZGVkIGJlaGF2aW9yIGlmIG9wdGlvbiBpcyBleHBsaWNpdGx5IHNwZWNpZmllZFxuICAgIGlmIChpc1VuYm91bmRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByaXBwbGUudW5ib3VuZGVkID0gLyoqIEB0eXBlIHtib29sZWFufSAqLyAoaXNVbmJvdW5kZWQpO1xuICAgIH1cbiAgICByZXR1cm4gcmlwcGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IVJpcHBsZUNhcGFibGVTdXJmYWNlfSBpbnN0YW5jZVxuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVBZGFwdGVyKGluc3RhbmNlKSB7XG4gICAgY29uc3QgTUFUQ0hFUyA9IHV0aWwuZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gdXRpbC5zdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpLFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IGluc3RhbmNlLnVuYm91bmRlZCxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gaW5zdGFuY2Uucm9vdF9bTUFUQ0hFU10oJzphY3RpdmUnKSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiBpbnN0YW5jZS5kaXNhYmxlZCxcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiBpbnN0YW5jZS5yb290Xy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gaW5zdGFuY2Uucm9vdF8uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKHRhcmdldCkgPT4gaW5zdGFuY2Uucm9vdF8uY29udGFpbnModGFyZ2V0KSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgaW5zdGFuY2Uucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBpbnN0YW5jZS5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IGluc3RhbmNlLnJvb3RfLnN0eWxlLnNldFByb3BlcnR5KHZhck5hbWUsIHZhbHVlKSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IGluc3RhbmNlLnJvb3RfLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gKHt4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldH0pLFxuICAgIH07XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgZ2V0IHVuYm91bmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy51bmJvdW5kZWRfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldCB1bmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgdGhpcy51bmJvdW5kZWRfID0gQm9vbGVhbih1bmJvdW5kZWQpO1xuICAgIHRoaXMuc2V0VW5ib3VuZGVkXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3N1cmUgQ29tcGlsZXIgdGhyb3dzIGFuIGFjY2VzcyBjb250cm9sIGVycm9yIHdoZW4gZGlyZWN0bHkgYWNjZXNzaW5nIGFcbiAgICogcHJvdGVjdGVkIG9yIHByaXZhdGUgcHJvcGVydHkgaW5zaWRlIGEgZ2V0dGVyL3NldHRlciwgbGlrZSB1bmJvdW5kZWQgYWJvdmUuXG4gICAqIEJ5IGFjY2Vzc2luZyB0aGUgcHJvdGVjdGVkIHByb3BlcnR5IGluc2lkZSBhIG1ldGhvZCwgd2Ugc29sdmUgdGhhdCBwcm9ibGVtLlxuICAgKiBUaGF0J3Mgd2h5IHRoaXMgZnVuY3Rpb24gZXhpc3RzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0VW5ib3VuZGVkXygpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFVuYm91bmRlZCh0aGlzLnVuYm91bmRlZF8pO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5hY3RpdmF0ZSgpO1xuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmxheW91dCgpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFNRENSaXBwbGVGb3VuZGF0aW9ufSAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE1EQ1JpcHBsZUZvdW5kYXRpb24oTURDUmlwcGxlLmNyZWF0ZUFkYXB0ZXIodGhpcykpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIHRoaXMudW5ib3VuZGVkID0gJ21kY1JpcHBsZUlzVW5ib3VuZGVkJyBpbiB0aGlzLnJvb3RfLmRhdGFzZXQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgTWF0ZXJpYWwgRGVzaWduIHNwZWMgZm9yIG1vcmUgZGV0YWlscyBvbiB3aGVuIHRvIHVzZSByaXBwbGVzLlxuICogaHR0cHM6Ly9tYXRlcmlhbC5pby9ndWlkZWxpbmVzL21vdGlvbi9jaG9yZW9ncmFwaHkuaHRtbCNjaG9yZW9ncmFwaHktY3JlYXRpb25cbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgUmlwcGxlQ2FwYWJsZVN1cmZhY2Uge31cblxuLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLnJvb3RfO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgYmxlZWRzIG91dCBvZiB0aGUgYm91bmRzIG9mIHRoZSBlbGVtZW50LlxuICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUudW5ib3VuZGVkO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgaXMgYXR0YWNoZWQgdG8gYSBkaXNhYmxlZCBjb21wb25lbnQuXG4gKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS5kaXNhYmxlZDtcblxuZXhwb3J0IHtNRENSaXBwbGUsIE1EQ1JpcHBsZUZvdW5kYXRpb24sIFJpcHBsZUNhcGFibGVTdXJmYWNlLCB1dGlsfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtNRENSaXBwbGV9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvaW5kZXgnO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGNoZWNrZWQ6IGJvb2xlYW4sXG4gKiAgIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4sXG4gKiAgIGRpc2FibGVkOiBib29sZWFuLFxuICogICB2YWx1ZTogP3N0cmluZ1xuICogfX1cbiAqL1xubGV0IE1EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZTtcblxuLyoqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1NlbGVjdGlvbkNvbnRyb2wge1xuICAvKiogQHJldHVybiB7P01EQ1JpcHBsZX0gKi9cbiAgZ2V0IHJpcHBsZSgpIHt9XG59XG5cbmV4cG9ydCB7TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlLCBNRENTZWxlY3Rpb25Db250cm9sfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtNRENTZWxlY3Rpb25Db250cm9sU3RhdGV9IGZyb20gJ0BtYXRlcmlhbC9zZWxlY3Rpb24tY29udHJvbC9pbmRleCc7XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBDaGVja2JveC4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBldmVudCBoYW5kbGVyc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDQ2hlY2tib3hBZGFwdGVyIHtcbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyBhbiBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIHZhbHVlIG9uIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldE5hdGl2ZUNvbnRyb2xBdHRyKGF0dHIsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGF0dHJpYnV0ZSBmcm9tIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKi9cbiAgcmVtb3ZlTmF0aXZlQ29udHJvbEF0dHIoYXR0cikge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRMaXN0ZW5lcn0gaGFuZGxlciAqL1xuICByZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRMaXN0ZW5lcn0gaGFuZGxlciAqL1xuICBkZXJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudExpc3RlbmVyfSBoYW5kbGVyICovXG4gIHJlZ2lzdGVyQ2hhbmdlSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudExpc3RlbmVyfSBoYW5kbGVyICovXG4gIGRlcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFNRENTZWxlY3Rpb25Db250cm9sU3RhdGV9ICovXG4gIGdldE5hdGl2ZUNvbnRyb2woKSB7fVxuXG4gIGZvcmNlTGF5b3V0KCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNBdHRhY2hlZFRvRE9NKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ2hlY2tib3hBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAY29uc3Qge3N0cmluZ30gKi9cbmNvbnN0IFJPT1QgPSAnbWRjLWNoZWNrYm94JztcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBVUEdSQURFRDogJ21kYy1jaGVja2JveC0tdXBncmFkZWQnLFxuICBDSEVDS0VEOiAnbWRjLWNoZWNrYm94LS1jaGVja2VkJyxcbiAgSU5ERVRFUk1JTkFURTogJ21kYy1jaGVja2JveC0taW5kZXRlcm1pbmF0ZScsXG4gIERJU0FCTEVEOiAnbWRjLWNoZWNrYm94LS1kaXNhYmxlZCcsXG4gIEFOSU1fVU5DSEVDS0VEX0NIRUNLRUQ6ICdtZGMtY2hlY2tib3gtLWFuaW0tdW5jaGVja2VkLWNoZWNrZWQnLFxuICBBTklNX1VOQ0hFQ0tFRF9JTkRFVEVSTUlOQVRFOiAnbWRjLWNoZWNrYm94LS1hbmltLXVuY2hlY2tlZC1pbmRldGVybWluYXRlJyxcbiAgQU5JTV9DSEVDS0VEX1VOQ0hFQ0tFRDogJ21kYy1jaGVja2JveC0tYW5pbS1jaGVja2VkLXVuY2hlY2tlZCcsXG4gIEFOSU1fQ0hFQ0tFRF9JTkRFVEVSTUlOQVRFOiAnbWRjLWNoZWNrYm94LS1hbmltLWNoZWNrZWQtaW5kZXRlcm1pbmF0ZScsXG4gIEFOSU1fSU5ERVRFUk1JTkFURV9DSEVDS0VEOiAnbWRjLWNoZWNrYm94LS1hbmltLWluZGV0ZXJtaW5hdGUtY2hlY2tlZCcsXG4gIEFOSU1fSU5ERVRFUk1JTkFURV9VTkNIRUNLRUQ6ICdtZGMtY2hlY2tib3gtLWFuaW0taW5kZXRlcm1pbmF0ZS11bmNoZWNrZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUjogYC4ke1JPT1R9X19uYXRpdmUtY29udHJvbGAsXG4gIFRSQU5TSVRJT05fU1RBVEVfSU5JVDogJ2luaXQnLFxuICBUUkFOU0lUSU9OX1NUQVRFX0NIRUNLRUQ6ICdjaGVja2VkJyxcbiAgVFJBTlNJVElPTl9TVEFURV9VTkNIRUNLRUQ6ICd1bmNoZWNrZWQnLFxuICBUUkFOU0lUSU9OX1NUQVRFX0lOREVURVJNSU5BVEU6ICdpbmRldGVybWluYXRlJyxcbiAgQVJJQV9DSEVDS0VEX0FUVFI6ICdhcmlhLWNoZWNrZWQnLFxuICBBUklBX0NIRUNLRURfSU5ERVRFUk1JTkFURV9WQUxVRTogJ21peGVkJyxcbn07XG5cbi8qKiBAZW51bSB7bnVtYmVyfSAqL1xuY29uc3QgbnVtYmVycyA9IHtcbiAgQU5JTV9FTkRfTEFUQ0hfTVM6IDI1MCxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtNRENTZWxlY3Rpb25Db250cm9sU3RhdGV9IGZyb20gJ0BtYXRlcmlhbC9zZWxlY3Rpb24tY29udHJvbC9pbmRleCc7XG5pbXBvcnQgTURDQ2hlY2tib3hBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqIEBjb25zdCB7IUFycmF5PHN0cmluZz59ICovXG5jb25zdCBDQl9QUk9UT19QUk9QUyA9IFsnY2hlY2tlZCcsICdpbmRldGVybWluYXRlJ107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0NoZWNrYm94QWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ0NoZWNrYm94Rm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ0NoZWNrYm94QWRhcHRlcn0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDQ2hlY2tib3hBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE5hdGl2ZUNvbnRyb2xBdHRyOiAoLyogYXR0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZU5hdGl2ZUNvbnRyb2xBdHRyOiAoLyogYXR0cjogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyQ2hhbmdlSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckNoYW5nZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGdldE5hdGl2ZUNvbnRyb2w6ICgpID0+IC8qICFNRENTZWxlY3Rpb25Db250cm9sU3RhdGUgKi8ge30sXG4gICAgICBmb3JjZUxheW91dDogKCkgPT4ge30sXG4gICAgICBpc0F0dGFjaGVkVG9ET006ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENDaGVja2JveEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMuY3VycmVudENoZWNrU3RhdGVfID0gc3RyaW5ncy5UUkFOU0lUSU9OX1NUQVRFX0lOSVQ7XG5cbiAgICAvKiogQHByaXZhdGUge3N0cmluZ30gKi9cbiAgICB0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzc18gPSAnJztcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYW5pbUVuZExhdGNoVGltZXJfID0gMDtcblxuICAgIHRoaXMuYW5pbUVuZEhhbmRsZXJfID0gLyoqIEBwcml2YXRlIHshRXZlbnRMaXN0ZW5lcn0gKi8gKFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVBbmltYXRpb25FbmQoKSk7XG5cbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJfID0gLyoqIEBwcml2YXRlIHshRXZlbnRMaXN0ZW5lcn0gKi8gKFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVDaGFuZ2UoKSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY3VycmVudENoZWNrU3RhdGVfID0gdGhpcy5kZXRlcm1pbmVDaGVja1N0YXRlXyh0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkpO1xuICAgIHRoaXMudXBkYXRlQXJpYUNoZWNrZWRfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLlVQR1JBREVEKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQ2hhbmdlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXJfKTtcbiAgICB0aGlzLmluc3RhbGxQcm9wZXJ0eUNoYW5nZUhvb2tzXygpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcl8pO1xuICAgIHRoaXMudW5pbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18oKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0NoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKS5jaGVja2VkO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCAqL1xuICBzZXRDaGVja2VkKGNoZWNrZWQpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNJbmRldGVybWluYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkuaW5kZXRlcm1pbmF0ZTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGluZGV0ZXJtaW5hdGUgKi9cbiAgc2V0SW5kZXRlcm1pbmF0ZShpbmRldGVybWluYXRlKSB7XG4gICAgdGhpcy5nZXROYXRpdmVDb250cm9sXygpLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKS5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkICovXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5nZXROYXRpdmVDb250cm9sXygpLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRElTQUJMRUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRElTQUJMRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHs/c3RyaW5nfSAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVDb250cm9sXygpLnZhbHVlO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7P3N0cmluZ30gdmFsdWUgKi9cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBhbmltYXRpb25lbmQgZXZlbnQgZm9yIHRoZSBjaGVja2JveFxuICAgKi9cbiAgaGFuZGxlQW5pbWF0aW9uRW5kKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1FbmRMYXRjaFRpbWVyXyk7XG4gICAgdGhpcy5hbmltRW5kTGF0Y2hUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3ModGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXIodGhpcy5hbmltRW5kSGFuZGxlcl8pO1xuICAgIH0sIG51bWJlcnMuQU5JTV9FTkRfTEFUQ0hfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGNoYW5nZSBldmVudCBmb3IgdGhlIGNoZWNrYm94XG4gICAqL1xuICBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgdGhpcy50cmFuc2l0aW9uQ2hlY2tTdGF0ZV8oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBpbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18oKSB7XG4gICAgY29uc3QgbmF0aXZlQ2IgPSB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCk7XG4gICAgY29uc3QgY2JQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihuYXRpdmVDYik7XG5cbiAgICBDQl9QUk9UT19QUk9QUy5mb3JFYWNoKChjb250cm9sU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNiUHJvdG8sIGNvbnRyb2xTdGF0ZSk7XG4gICAgICAvLyBXZSBoYXZlIHRvIGNoZWNrIGZvciB0aGlzIGRlc2NyaXB0b3IsIHNpbmNlIHNvbWUgYnJvd3NlcnMgKFNhZmFyaSkgZG9uJ3Qgc3VwcG9ydCBpdHMgcmV0dXJuLlxuICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDk3MzlcbiAgICAgIGlmICh2YWxpZERlc2NyaXB0b3IoZGVzYykpIHtcbiAgICAgICAgY29uc3QgbmF0aXZlQ2JEZXNjID0gLyoqIEB0eXBlIHshT2JqZWN0UHJvcGVydHlEZXNjcmlwdG9yfSAqLyAoe1xuICAgICAgICAgIGdldDogZGVzYy5nZXQsXG4gICAgICAgICAgc2V0OiAoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGRlc2Muc2V0LmNhbGwobmF0aXZlQ2IsIHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNoZWNrU3RhdGVfKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGRlc2MuY29uZmlndXJhYmxlLFxuICAgICAgICAgIGVudW1lcmFibGU6IGRlc2MuZW51bWVyYWJsZSxcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXRpdmVDYiwgY29udHJvbFN0YXRlLCBuYXRpdmVDYkRlc2MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVuaW5zdGFsbFByb3BlcnR5Q2hhbmdlSG9va3NfKCkge1xuICAgIGNvbnN0IG5hdGl2ZUNiID0gdGhpcy5nZXROYXRpdmVDb250cm9sXygpO1xuICAgIGNvbnN0IGNiUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmF0aXZlQ2IpO1xuXG4gICAgQ0JfUFJPVE9fUFJPUFMuZm9yRWFjaCgoY29udHJvbFN0YXRlKSA9PiB7XG4gICAgICBjb25zdCBkZXNjID0gLyoqIEB0eXBlIHshT2JqZWN0UHJvcGVydHlEZXNjcmlwdG9yfSAqLyAoXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY2JQcm90bywgY29udHJvbFN0YXRlKSk7XG4gICAgICBpZiAodmFsaWREZXNjcmlwdG9yKGRlc2MpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXRpdmVDYiwgY29udHJvbFN0YXRlLCBkZXNjKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB0cmFuc2l0aW9uQ2hlY2tTdGF0ZV8oKSB7XG4gICAgY29uc3QgbmF0aXZlQ2IgPSB0aGlzLmFkYXB0ZXJfLmdldE5hdGl2ZUNvbnRyb2woKTtcbiAgICBpZiAoIW5hdGl2ZUNiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZV87XG4gICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmRldGVybWluZUNoZWNrU3RhdGVfKG5hdGl2ZUNiKTtcbiAgICBpZiAob2xkU3RhdGUgPT09IG5ld1N0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBcmlhQ2hlY2tlZF8oKTtcblxuICAgIC8vIENoZWNrIHRvIGVuc3VyZSB0aGF0IHRoZXJlIGlzbid0IGEgcHJldmlvdXNseSBleGlzdGluZyBhbmltYXRpb24gY2xhc3MsIGluIGNhc2UgZm9yIGV4YW1wbGVcbiAgICAvLyB0aGUgdXNlciBpbnRlcmFjdGVkIHdpdGggdGhlIGNoZWNrYm94IGJlZm9yZSB0aGUgYW5pbWF0aW9uIHdhcyBmaW5pc2hlZC5cbiAgICBpZiAodGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfLmxlbmd0aCA+IDApIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1FbmRMYXRjaFRpbWVyXyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvcmNlTGF5b3V0KCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKHRoaXMuY3VycmVudEFuaW1hdGlvbkNsYXNzXyk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfID0gdGhpcy5nZXRUcmFuc2l0aW9uQW5pbWF0aW9uQ2xhc3NfKG9sZFN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZV8gPSBuZXdTdGF0ZTtcblxuICAgIC8vIENoZWNrIGZvciBwYXJlbnROb2RlIHNvIHRoYXQgYW5pbWF0aW9ucyBhcmUgb25seSBydW4gd2hlbiB0aGUgZWxlbWVudCBpcyBhdHRhY2hlZFxuICAgIC8vIHRvIHRoZSBET00uXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNBdHRhY2hlZFRvRE9NKCkgJiYgdGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3ModGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyKHRoaXMuYW5pbUVuZEhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDU2VsZWN0aW9uQ29udHJvbFN0YXRlfSBuYXRpdmVDYlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZXRlcm1pbmVDaGVja1N0YXRlXyhuYXRpdmVDYikge1xuICAgIGNvbnN0IHtcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfSU5ERVRFUk1JTkFURSxcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRCxcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VELFxuICAgIH0gPSBzdHJpbmdzO1xuXG4gICAgaWYgKG5hdGl2ZUNiLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgIHJldHVybiBUUkFOU0lUSU9OX1NUQVRFX0lOREVURVJNSU5BVEU7XG4gICAgfVxuICAgIHJldHVybiBuYXRpdmVDYi5jaGVja2VkID8gVFJBTlNJVElPTl9TVEFURV9DSEVDS0VEIDogVFJBTlNJVElPTl9TVEFURV9VTkNIRUNLRUQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9sZFN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdTdGF0ZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRUcmFuc2l0aW9uQW5pbWF0aW9uQ2xhc3NfKG9sZFN0YXRlLCBuZXdTdGF0ZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfSU5JVCxcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRCxcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VELFxuICAgIH0gPSBzdHJpbmdzO1xuXG4gICAgY29uc3Qge1xuICAgICAgQU5JTV9VTkNIRUNLRURfQ0hFQ0tFRCxcbiAgICAgIEFOSU1fVU5DSEVDS0VEX0lOREVURVJNSU5BVEUsXG4gICAgICBBTklNX0NIRUNLRURfVU5DSEVDS0VELFxuICAgICAgQU5JTV9DSEVDS0VEX0lOREVURVJNSU5BVEUsXG4gICAgICBBTklNX0lOREVURVJNSU5BVEVfQ0hFQ0tFRCxcbiAgICAgIEFOSU1fSU5ERVRFUk1JTkFURV9VTkNIRUNLRUQsXG4gICAgfSA9IE1EQ0NoZWNrYm94Rm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuXG4gICAgc3dpdGNoIChvbGRTdGF0ZSkge1xuICAgIGNhc2UgVFJBTlNJVElPTl9TVEFURV9JTklUOlxuICAgICAgaWYgKG5ld1N0YXRlID09PSBUUkFOU0lUSU9OX1NUQVRFX1VOQ0hFQ0tFRCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgLy8gZmFsbHRocm91Z2hcbiAgICBjYXNlIFRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VEOlxuICAgICAgcmV0dXJuIG5ld1N0YXRlID09PSBUUkFOU0lUSU9OX1NUQVRFX0NIRUNLRUQgPyBBTklNX1VOQ0hFQ0tFRF9DSEVDS0VEIDogQU5JTV9VTkNIRUNLRURfSU5ERVRFUk1JTkFURTtcbiAgICBjYXNlIFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRDpcbiAgICAgIHJldHVybiBuZXdTdGF0ZSA9PT0gVFJBTlNJVElPTl9TVEFURV9VTkNIRUNLRUQgPyBBTklNX0NIRUNLRURfVU5DSEVDS0VEIDogQU5JTV9DSEVDS0VEX0lOREVURVJNSU5BVEU7XG4gICAgLy8gVFJBTlNJVElPTl9TVEFURV9JTkRFVEVSTUlOQVRFXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBuZXdTdGF0ZSA9PT0gVFJBTlNJVElPTl9TVEFURV9DSEVDS0VEID9cbiAgICAgICAgQU5JTV9JTkRFVEVSTUlOQVRFX0NIRUNLRUQgOiBBTklNX0lOREVURVJNSU5BVEVfVU5DSEVDS0VEO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFyaWFDaGVja2VkXygpIHtcbiAgICAvLyBFbnN1cmUgYXJpYS1jaGVja2VkIGlzIHNldCB0byBtaXhlZCBpZiBjaGVja2JveCBpcyBpbiBpbmRldGVybWluYXRlIHN0YXRlLlxuICAgIGlmICh0aGlzLmlzSW5kZXRlcm1pbmF0ZSgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldE5hdGl2ZUNvbnRyb2xBdHRyKFxuICAgICAgICBzdHJpbmdzLkFSSUFfQ0hFQ0tFRF9BVFRSLCBzdHJpbmdzLkFSSUFfQ0hFQ0tFRF9JTkRFVEVSTUlOQVRFX1ZBTFVFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVOYXRpdmVDb250cm9sQXR0cihzdHJpbmdzLkFSSUFfQ0hFQ0tFRF9BVFRSKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IU1EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE5hdGl2ZUNvbnRyb2xfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmdldE5hdGl2ZUNvbnRyb2woKSB8fCB7XG4gICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0UHJvcGVydHlEZXNjcmlwdG9yfHVuZGVmaW5lZH0gaW5wdXRQcm9wRGVzY1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gdmFsaWREZXNjcmlwdG9yKGlucHV0UHJvcERlc2MpIHtcbiAgcmV0dXJuICEhaW5wdXRQcm9wRGVzYyAmJiB0eXBlb2YgaW5wdXRQcm9wRGVzYy5zZXQgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NoZWNrYm94Rm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgRm9ybSBGaWVsZC4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBldmVudCBoYW5kbGVyc1xuICogLSByaXBwbGUgYWN0aXZhdGlvblxuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDRm9ybUZpZWxkQWRhcHRlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0geyFFdmVudExpc3RlbmVyfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0geyFFdmVudExpc3RlbmVyfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgYWN0aXZhdGVJbnB1dFJpcHBsZSgpIHt9XG5cbiAgZGVhY3RpdmF0ZUlucHV0UmlwcGxlKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm9ybUZpZWxkQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtZm9ybS1maWVsZCcsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIExBQkVMX1NFTEVDVE9SOiAnLm1kYy1mb3JtLWZpZWxkID4gbGFiZWwnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENGb3JtRmllbGRBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDRm9ybUZpZWxkQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFNRENGb3JtRmllbGRBZGFwdGVyfSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGFjdGl2YXRlSW5wdXRSaXBwbGU6ICgpID0+IHt9LFxuICAgICAgZGVhY3RpdmF0ZUlucHV0UmlwcGxlOiAoKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDRm9ybUZpZWxkRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRXZlbnRMaXN0ZW5lcn0gKi9cbiAgICB0aGlzLmNsaWNrSGFuZGxlcl8gPSAvKiogQHR5cGUgeyFFdmVudExpc3RlbmVyfSAqLyAoXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZUNsaWNrXygpKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBoYW5kbGVDbGlja18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hY3RpdmF0ZUlucHV0UmlwcGxlKCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYWRhcHRlcl8uZGVhY3RpdmF0ZUlucHV0UmlwcGxlKCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0Zvcm1GaWVsZEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBub1ByZWZpeDogc3RyaW5nLFxuICogICB3ZWJraXRQcmVmaXg6IHN0cmluZyxcbiAqICAgc3R5bGVQcm9wZXJ0eTogc3RyaW5nXG4gKiB9fVxuICovXG5sZXQgVmVuZG9yUHJvcGVydHlNYXBUeXBlO1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGV2ZW50VHlwZU1hcCA9IHtcbiAgJ2FuaW1hdGlvbnN0YXJ0Jzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uc3RhcnQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0JyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbml0ZXJhdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAndHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGNzc1Byb3BlcnR5TWFwID0ge1xuICAnYW5pbWF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LWFuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2Zvcm0nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2Zvcm0nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB7XG4gIHJldHVybiAod2luZG93T2JqWydkb2N1bWVudCddICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddID09PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkge1xuICByZXR1cm4gKGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgfHwgZXZlbnRUeXBlIGluIGNzc1Byb3BlcnR5TWFwKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gbWFwXG4gKiBAcGFyYW0geyFFbGVtZW50fSBlbFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCkge1xuICByZXR1cm4gbWFwW2V2ZW50VHlwZV0uc3R5bGVQcm9wZXJ0eSBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgYnJvd3NlciBwcmVmaXggZm9yIENTUzMgYW5pbWF0aW9uIGV2ZW50c1xuICogYW5kIHByb3BlcnR5IG5hbWVzLlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICBpZiAoIWhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikgfHwgIWV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSkge1xuICAgIHJldHVybiBldmVudFR5cGU7XG4gIH1cblxuICBjb25zdCBtYXAgPSAvKiogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi8gKFxuICAgIGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgPyBldmVudFR5cGVNYXAgOiBjc3NQcm9wZXJ0eU1hcFxuICApO1xuICBjb25zdCBlbCA9IHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddKCdkaXYnKTtcbiAgbGV0IGV2ZW50TmFtZSA9ICcnO1xuXG4gIGlmIChtYXAgPT09IGV2ZW50VHlwZU1hcCkge1xuICAgIGV2ZW50TmFtZSA9IGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudE5hbWUgPSBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TmFtZTtcbn1cblxuLy8gUHVibGljIGZ1bmN0aW9ucyB0byBhY2Nlc3MgZ2V0QW5pbWF0aW9uTmFtZSgpIGZvciBKYXZhU2NyaXB0IGV2ZW50cyBvciBDU1Ncbi8vIHByb3BlcnR5IG5hbWVzLlxuXG5jb25zdCB0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMgPSBbJ3RyYW5zZm9ybScsICdXZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnTVNUcmFuc2Zvcm0nXTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0UHJvcGVydHlOYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuZXhwb3J0IHt0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMsIGdldENvcnJlY3RFdmVudE5hbWUsIGdldENvcnJlY3RQcm9wZXJ0eU5hbWV9O1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xuaW1wb3J0IHtcbiAgc3VwcG9ydHNDc3NWYXJpYWJsZXMsXG4gIGdldE1hdGNoZXNQcm9wZXJ0eSxcbiAgYXBwbHlQYXNzaXZlXG59IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcblxuZXhwb3J0IGNsYXNzIFJpcHBsZUJhc2UgZXh0ZW5kcyBNRENSaXBwbGVGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBNQVRDSEVTKCkge1xuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xuICAgIHJldHVybiAoXG4gICAgICBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XG4gICAgICAoUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxuICAgIClcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cmZhY2VBY3RpdmUocmVmKSB7XG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZtLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB7XG4gICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbFtSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uZGlzYWJsZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udGFpbnNFdmVudFRhcmdldDogdGFyZ2V0ID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxuICAgICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgIGV2dFR5cGUsXG4gICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IHg6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0IH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIClcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXZcbiAgICA6Y2xhc3M9XCJmb3JtRmllbGRDbGFzc2VzXCJcbiAgICBjbGFzcz1cIm1kYy1jaGVja2JveC13cmFwcGVyXCI+XG4gICAgPGRpdlxuICAgICAgcmVmPVwicm9vdFwiXG4gICAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcbiAgICAgIDpzdHlsZT1cInN0eWxlc1wiXG4gICAgICBjbGFzcz1cIm1kYy1jaGVja2JveFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj1cImNvbnRyb2xcIlxuICAgICAgICA6aWQ9XCJ2bWFfdWlkX1wiXG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgY2xhc3M9XCJtZGMtY2hlY2tib3hfX25hdGl2ZS1jb250cm9sXCJcbiAgICAgICAgQGNoYW5nZT1cIm9uQ2hhbmdlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWRjLWNoZWNrYm94X19iYWNrZ3JvdW5kXCI+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICBjbGFzcz1cIm1kYy1jaGVja2JveF9fY2hlY2ttYXJrXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGNsYXNzPVwibWRjLWNoZWNrYm94X19jaGVja21hcmstcGF0aFwiXG4gICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICBzdHJva2U9XCJ3aGl0ZVwiXG4gICAgICAgICAgICBkPVwiTTEuNzMsMTIuOTEgOC4xLDE5LjI4IDIyLjc5LDQuNTlcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWRjLWNoZWNrYm94X19taXhlZG1hcmtcIi8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8bGFiZWxcbiAgICAgIHJlZj1cImxhYmVsXCJcbiAgICAgIDpmb3I9XCJ2bWFfdWlkX1wiXG4gICAgPjxzbG90Pnt7IGxhYmVsIH19PC9zbG90PjwvbGFiZWw+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbi8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xuaW1wb3J0IE1EQ0NoZWNrYm94Rm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvY2hlY2tib3gvZm91bmRhdGlvbidcbmltcG9ydCBNRENGb3JtRmllbGRGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9mb3JtLWZpZWxkL2ZvdW5kYXRpb24nXG5pbXBvcnQgeyBnZXRDb3JyZWN0RXZlbnROYW1lIH0gZnJvbSAnQG1hdGVyaWFsL2FuaW1hdGlvbidcbmltcG9ydCB7IERpc3BhdGNoRm9jdXNNaXhpbiwgVk1BVW5pcXVlSWRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgeyBSaXBwbGVCYXNlIH0gZnJvbSAnLi4vcmlwcGxlJ1xuaW1wb3J0IHsgYXBwbHlQYXNzaXZlIH0gZnJvbSAnLi4vYmFzZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWNoZWNrYm94JyxcbiAgbWl4aW5zOiBbRGlzcGF0Y2hGb2N1c01peGluLCBWTUFVbmlxdWVJZE1peGluXSxcbiAgbW9kZWw6IHtcbiAgICBwcm9wOiAnY2hlY2tlZCcsXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgY2hlY2tlZDogW0Jvb2xlYW4sIEFycmF5XSxcbiAgICBpbmRldGVybWluYXRlOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgJ2FsaWduLWVuZCc6IEJvb2xlYW4sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gJ29uJ1xuICAgICAgfVxuICAgIH0sXG4gICAgbmFtZTogU3RyaW5nXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0eWxlczoge30sXG4gICAgICBjbGFzc2VzOiB7fVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBoYXNMYWJlbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmxhYmVsIHx8IHRoaXMuJHNsb3RzLmRlZmF1bHRcbiAgICB9LFxuICAgIGZvcm1GaWVsZENsYXNzZXMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnbWRjLWZvcm0tZmllbGQnOiB0aGlzLmhhc0xhYmVsLFxuICAgICAgICAnbWRjLWZvcm0tZmllbGQtLWFsaWduLWVuZCc6IHRoaXMuaGFzTGFiZWwgJiYgdGhpcy5hbGlnbkVuZFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBjaGVja2VkOiAnc2V0Q2hlY2tlZCcsXG4gICAgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh2YWx1ZSlcbiAgICB9LFxuICAgIGluZGV0ZXJtaW5hdGUodmFsdWUpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRJbmRldGVybWluYXRlKHZhbHVlKVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDQ2hlY2tib3hGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcbiAgICAgIHNldE5hdGl2ZUNvbnRyb2xBdHRyOiAoYXR0ciwgdmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5jb250cm9sLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVOYXRpdmVDb250cm9sQXR0cjogYXR0ciA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuY29udHJvbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cilcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5yb290LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3csICdhbmltYXRpb25lbmQnKSxcbiAgICAgICAgICBoYW5kbGVyXG4gICAgICAgICksXG4gICAgICBkZXJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvdywgJ2FuaW1hdGlvbmVuZCcpLFxuICAgICAgICAgIGhhbmRsZXJcbiAgICAgICAgKSxcbiAgICAgIHJlZ2lzdGVyQ2hhbmdlSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICB0aGlzLiRyZWZzLmNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyQ2hhbmdlSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICB0aGlzLiRyZWZzLmNvbnRyb2wucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlciksXG4gICAgICBnZXROYXRpdmVDb250cm9sOiAoKSA9PiB0aGlzLiRyZWZzLmNvbnRyb2wsXG4gICAgICBmb3JjZUxheW91dDogKCkgPT4gdGhpcy4kcmVmcy5yb290Lm9mZnNldFdpZHRoLFxuICAgICAgaXNBdHRhY2hlZFRvRE9NOiAoKSA9PiBCb29sZWFuKHRoaXMuJGVsLnBhcmVudE5vZGUpXG4gICAgfSlcblxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcywge1xuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHRydWUsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IFJpcHBsZUJhc2UuaXNTdXJmYWNlQWN0aXZlKHRoaXMuJHJlZnMuY29udHJvbCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5jb250cm9sLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgIH0sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLnJvb3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5mb3JtRmllbGQgPSBuZXcgTURDRm9ybUZpZWxkRm91bmRhdGlvbih7XG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5sYWJlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5sYWJlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgYWN0aXZhdGVJbnB1dFJpcHBsZTogKCkgPT4ge1xuICAgICAgICB0aGlzLnJpcHBsZSAmJiB0aGlzLnJpcHBsZS5hY3RpdmF0ZSgpXG4gICAgICB9LFxuICAgICAgZGVhY3RpdmF0ZUlucHV0UmlwcGxlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucmlwcGxlICYmIHRoaXMucmlwcGxlLmRlYWN0aXZhdGUoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gICAgdGhpcy5mb3JtRmllbGQuaW5pdCgpXG4gICAgdGhpcy5zZXRDaGVja2VkKHRoaXMuY2hlY2tlZClcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZClcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0SW5kZXRlcm1pbmF0ZSh0aGlzLmluZGV0ZXJtaW5hdGUpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5mb3JtRmllbGQuZGVzdHJveSgpXG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2V0Q2hlY2tlZChjaGVja2VkKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0Q2hlY2tlZChcbiAgICAgICAgQXJyYXkuaXNBcnJheShjaGVja2VkKSA/IGNoZWNrZWQuaW5kZXhPZih0aGlzLnZhbHVlKSA+IC0xIDogY2hlY2tlZFxuICAgICAgKVxuICAgIH0sXG5cbiAgICBvbkNoYW5nZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTppbmRldGVybWluYXRlJywgdGhpcy5mb3VuZGF0aW9uLmlzSW5kZXRlcm1pbmF0ZSgpKVxuICAgICAgY29uc3QgaXNDaGVja2VkID0gdGhpcy5mb3VuZGF0aW9uLmlzQ2hlY2tlZCgpXG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY2hlY2tlZCkpIHtcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGVja2VkLmluZGV4T2YodGhpcy52YWx1ZSlcbiAgICAgICAgaWYgKGlzQ2hlY2tlZCkge1xuICAgICAgICAgIGlkeCA8IDAgJiYgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5jaGVja2VkLmNvbmNhdCh0aGlzLnZhbHVlKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZHggPiAtMSAmJlxuICAgICAgICAgICAgdGhpcy4kZW1pdChcbiAgICAgICAgICAgICAgJ2NoYW5nZScsXG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tlZC5zbGljZSgwLCBpZHgpLmNvbmNhdCh0aGlzLmNoZWNrZWQuc2xpY2UoaWR4ICsgMSkpXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGlzQ2hlY2tlZClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjQ2hlY2tib3ggZnJvbSAnLi9tZGMtY2hlY2tib3gudnVlJ1xuXG5leHBvcnQgeyBtZGNDaGVja2JveCB9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNDaGVja2JveFxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsic3VwcG9ydHNQYXNzaXZlXyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsIndpbmRvdyIsImZvcmNlUmVmcmVzaCIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsImUiLCJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiRGlzcGF0Y2hGb2N1c01peGluIiwiZGF0YSIsImhhc0ZvY3VzIiwibWV0aG9kcyIsIm9uTW91c2VEb3duIiwiX2FjdGl2ZSIsIm9uTW91c2VVcCIsIm9uRm9jdXNFdmVudCIsInNldFRpbWVvdXQiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIiRlbCIsImFjdGl2ZUVsZW1lbnQiLCJjb250YWlucyIsIiRlbWl0IiwibW91bnRlZCIsImJlZm9yZURlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIlZNQVVuaXF1ZUlkTWl4aW4iLCJiZWZvcmVDcmVhdGUiLCJ2bWFfdWlkXyIsIl91aWQiLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDQ29tcG9uZW50Iiwicm9vdCIsImZvdW5kYXRpb24iLCJyb290XyIsImFyZ3MiLCJpbml0aWFsaXplIiwiZm91bmRhdGlvbl8iLCJnZXREZWZhdWx0Rm91bmRhdGlvbiIsImluaXQiLCJpbml0aWFsU3luY1dpdGhET00iLCJFcnJvciIsImRlc3Ryb3kiLCJldnRUeXBlIiwiaGFuZGxlciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJldnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJNRENSaXBwbGVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidGFyZ2V0IiwidmFyTmFtZSIsInZhbHVlIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsInN0cmluZ3MiLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNvbXB1dGVkU3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJyZW1vdmUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiQ1NTIiwic3VwcG9ydHMiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJ0eXBlIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJjb21wdXRlQm91bmRpbmdSZWN0IiwiZ2V0V2luZG93UGFnZU9mZnNldCIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiZGVmYXVsdEFkYXB0ZXIiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXMiLCJibHVySGFuZGxlcl8iLCJoYW5kbGVCbHVyIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibGF5b3V0SW50ZXJuYWxfIiwiY2xlYXJUaW1lb3V0IiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwibGVuZ3RoIiwic29tZSIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInB1c2giLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwia2V5Q29kZSIsImV2ZW50IiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIk1EQ1JpcHBsZSIsImRpc2FibGVkIiwidW5ib3VuZGVkXyIsInNldFVuYm91bmRlZCIsImFjdGl2YXRlIiwiZGVhY3RpdmF0ZSIsImNyZWF0ZUFkYXB0ZXIiLCJkYXRhc2V0IiwiQm9vbGVhbiIsInNldFVuYm91bmRlZF8iLCJyaXBwbGUiLCJpbnN0YW5jZSIsIk1BVENIRVMiLCJ1dGlsIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIk1EQ1NlbGVjdGlvbkNvbnRyb2wiLCJNRENDaGVja2JveEFkYXB0ZXIiLCJhdHRyIiwiVVBHUkFERUQiLCJDSEVDS0VEIiwiSU5ERVRFUk1JTkFURSIsIkRJU0FCTEVEIiwiQU5JTV9VTkNIRUNLRURfQ0hFQ0tFRCIsIkFOSU1fVU5DSEVDS0VEX0lOREVURVJNSU5BVEUiLCJBTklNX0NIRUNLRURfVU5DSEVDS0VEIiwiQU5JTV9DSEVDS0VEX0lOREVURVJNSU5BVEUiLCJBTklNX0lOREVURVJNSU5BVEVfQ0hFQ0tFRCIsIkFOSU1fSU5ERVRFUk1JTkFURV9VTkNIRUNLRUQiLCJOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUiIsIlRSQU5TSVRJT05fU1RBVEVfSU5JVCIsIlRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRCIsIlRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VEIiwiVFJBTlNJVElPTl9TVEFURV9JTkRFVEVSTUlOQVRFIiwiQVJJQV9DSEVDS0VEX0FUVFIiLCJBUklBX0NIRUNLRURfSU5ERVRFUk1JTkFURV9WQUxVRSIsIkFOSU1fRU5EX0xBVENIX01TIiwiQ0JfUFJPVE9fUFJPUFMiLCJNRENDaGVja2JveEZvdW5kYXRpb24iLCJzZXROYXRpdmVDb250cm9sQXR0ciIsInJlbW92ZU5hdGl2ZUNvbnRyb2xBdHRyIiwicmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyIiwiZGVyZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXIiLCJyZWdpc3RlckNoYW5nZUhhbmRsZXIiLCJkZXJlZ2lzdGVyQ2hhbmdlSGFuZGxlciIsImdldE5hdGl2ZUNvbnRyb2wiLCJmb3JjZUxheW91dCIsImlzQXR0YWNoZWRUb0RPTSIsImN1cnJlbnRDaGVja1N0YXRlXyIsImN1cnJlbnRBbmltYXRpb25DbGFzc18iLCJhbmltRW5kTGF0Y2hUaW1lcl8iLCJhbmltRW5kSGFuZGxlcl8iLCJoYW5kbGVBbmltYXRpb25FbmQiLCJjaGFuZ2VIYW5kbGVyXyIsImhhbmRsZUNoYW5nZSIsImRldGVybWluZUNoZWNrU3RhdGVfIiwiZ2V0TmF0aXZlQ29udHJvbF8iLCJ1cGRhdGVBcmlhQ2hlY2tlZF8iLCJpbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18iLCJ1bmluc3RhbGxQcm9wZXJ0eUNoYW5nZUhvb2tzXyIsImNoZWNrZWQiLCJpbmRldGVybWluYXRlIiwidHJhbnNpdGlvbkNoZWNrU3RhdGVfIiwibmF0aXZlQ2IiLCJjYlByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJjb250cm9sU3RhdGUiLCJkZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidmFsaWREZXNjcmlwdG9yIiwibmF0aXZlQ2JEZXNjIiwiZ2V0Iiwic2V0IiwiY2FsbCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIm9sZFN0YXRlIiwibmV3U3RhdGUiLCJnZXRUcmFuc2l0aW9uQW5pbWF0aW9uQ2xhc3NfIiwiaXNJbmRldGVybWluYXRlIiwiaW5wdXRQcm9wRGVzYyIsIk1EQ0Zvcm1GaWVsZEFkYXB0ZXIiLCJMQUJFTF9TRUxFQ1RPUiIsIk1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24iLCJhY3RpdmF0ZUlucHV0UmlwcGxlIiwiZGVhY3RpdmF0ZUlucHV0UmlwcGxlIiwiY2xpY2tIYW5kbGVyXyIsImhhbmRsZUNsaWNrXyIsImV2ZW50VHlwZU1hcCIsIm5vUHJlZml4Iiwid2Via2l0UHJlZml4Iiwic3R5bGVQcm9wZXJ0eSIsImNzc1Byb3BlcnR5TWFwIiwiaGFzUHJvcGVyU2hhcGUiLCJldmVudEZvdW5kSW5NYXBzIiwiZXZlbnRUeXBlIiwiZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZSIsIm1hcCIsImVsIiwiZ2V0QW5pbWF0aW9uTmFtZSIsImV2ZW50TmFtZSIsImdldENvcnJlY3RFdmVudE5hbWUiLCJSaXBwbGVCYXNlIiwicmVmIiwiX21hdGNoZXMiLCJvcHRpb25zIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwic3R5bGVzIiwicmVuZGVyIiwibWl4aW5zIiwibW9kZWwiLCJwcm9wIiwicHJvcHMiLCJBcnJheSIsImxhYmVsIiwiU3RyaW5nIiwiTnVtYmVyIiwiZGVmYXVsdCIsImNvbXB1dGVkIiwiaGFzTGFiZWwiLCIkc2xvdHMiLCJmb3JtRmllbGRDbGFzc2VzIiwiYWxpZ25FbmQiLCJ3YXRjaCIsInNldERpc2FibGVkIiwic2V0SW5kZXRlcm1pbmF0ZSIsIiRyZWZzIiwiY29udHJvbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm9mZnNldFdpZHRoIiwicGFyZW50Tm9kZSIsImZvcm1GaWVsZCIsInNldENoZWNrZWQiLCJpc0FycmF5Iiwib25DaGFuZ2UiLCJpc0NoZWNrZWQiLCJpZHgiLCJjb25jYXQiLCJzbGljZSIsIm1kY0NoZWNrYm94Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBSUEseUJBQUo7O0VBRUE7Ozs7OztBQU1BLEVBQU8sU0FB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
