/**
* @module vue-mdc-adapterradio 0.17.0
* @exports VueMDCRadio
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCRadio = factory());
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
   * Adapter for MDC Radio. Provides an interface for managing
   * - classes
   * - dom
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

  var MDCRadioAdapter = function () {
    function MDCRadioAdapter() {
      classCallCheck(this, MDCRadioAdapter);
    }

    createClass(MDCRadioAdapter, [{
      key: 'addClass',

      /** @param {string} className */
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: 'removeClass',
      value: function removeClass(className) {}

      /** @return {!MDCSelectionControlState} */

    }, {
      key: 'getNativeControl',
      value: function getNativeControl() {}
    }]);
    return MDCRadioAdapter;
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
  var strings$1 = {
    NATIVE_CONTROL_SELECTOR: '.mdc-radio__native-control'
  };

  /** @enum {string} */
  var cssClasses$1 = {
    ROOT: 'mdc-radio',
    DISABLED: 'mdc-radio--disabled'
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
   * @extends {MDCFoundation<!MDCRadioAdapter>}
   */

  var MDCRadioFoundation = function (_MDCFoundation) {
    inherits(MDCRadioFoundation, _MDCFoundation);

    function MDCRadioFoundation() {
      classCallCheck(this, MDCRadioFoundation);
      return possibleConstructorReturn(this, (MDCRadioFoundation.__proto__ || Object.getPrototypeOf(MDCRadioFoundation)).apply(this, arguments));
    }

    createClass(MDCRadioFoundation, [{
      key: 'isChecked',


      /** @return {boolean} */
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
      key: 'isDisabled',
      value: function isDisabled() {
        return this.getNativeControl_().disabled;
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        var DISABLED = MDCRadioFoundation.cssClasses.DISABLED;

        this.getNativeControl_().disabled = disabled;
        if (disabled) {
          this.adapter_.addClass(DISABLED);
        } else {
          this.adapter_.removeClass(DISABLED);
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
       * @return {!MDCSelectionControlState}
       * @private
       */

    }, {
      key: 'getNativeControl_',
      value: function getNativeControl_() {
        return this.adapter_.getNativeControl() || {
          checked: false,
          disabled: false,
          value: null
        };
      }
    }], [{
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

      /** @return {!MDCRadioAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCRadioAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            getNativeControl: function getNativeControl() /* !MDCSelectionControlState */{}
          }
        );
      }
    }]);
    return MDCRadioFoundation;
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

  var mdcRadio = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-radio-wrapper", class: _vm.formFieldClasses }, [_c('div', { ref: "root", staticClass: "mdc-radio", class: _vm.classes, style: _vm.styles }, [_c('input', { ref: "control", staticClass: "mdc-radio__native-control", attrs: { "id": _vm.vma_uid_, "name": _vm.name, "type": "radio" }, on: { "change": _vm.sync } }), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('label', { ref: "label", attrs: { "for": _vm.vma_uid_ } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)]);
    }, staticRenderFns: [function () {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-radio__background" }, [_c('div', { staticClass: "mdc-radio__outer-circle" }), _vm._v(" "), _c('div', { staticClass: "mdc-radio__inner-circle" })]);
    }],
    name: 'mdc-radio',
    mixins: [DispatchFocusMixin, VMAUniqueIdMixin],
    model: {
      prop: 'picked',
      event: 'change'
    },
    props: {
      name: { type: String, required: true },
      value: String,
      picked: String,
      checked: Boolean,
      label: String,
      'align-end': Boolean,
      disabled: Boolean
    },
    data: function data() {
      return {
        classes: {},
        styles: {},
        formFieldClasses: {
          'mdc-form-field': this.label,
          'mdc-form-field--align-end': this.label && this.alignEnd
        }
      };
    },

    watch: {
      checked: 'setChecked',
      disabled: function disabled(value) {
        this.foundation.setDisabled(value);
      }
    },
    mounted: function mounted() {
      var _this = this;

      // add foundation
      this.foundation = new MDCRadioFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        getNativeControl: function getNativeControl() {
          return _this.$refs.control;
        }
      });

      // add ripple
      this.ripple = new RippleBase(this, {
        isUnbounded: function isUnbounded() {
          return true;
        },
        isSurfaceActive: function isSurfaceActive() {
          return false;
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

      this.foundation.setValue(this.value ? this.value : this.label);
      this.foundation.setDisabled(this.disabled);
      this.foundation.setChecked(this.checked || this.picked == this.foundation.getValue());

      // refresh model
      this.checked && this.sync();
    },
    beforeDestroy: function beforeDestroy() {
      this.formField.destroy();
      this.ripple.destroy();
      this.foundation.destroy();
    },

    methods: {
      setChecked: function setChecked(checked) {
        this.foundation.setChecked(checked);
      },
      isChecked: function isChecked() {
        return this.foundation.isChecked();
      },
      sync: function sync() {
        this.$emit('change', this.foundation.getValue());
      }
    }
  };

  var plugin = BasePlugin({
    mdcRadio: mdcRadio
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hcHBseS1wYXNzaXZlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZm9jdXMtbWl4aW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbnRyb2wvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JhZGlvL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JhZGlvL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmFkaW8vZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZm9ybS1maWVsZC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9mb3JtLWZpZWxkL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZm9ybS1maWVsZC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yYWRpby9tZGMtcmFkaW8udnVlIiwiLi4vLi4vY29tcG9uZW50cy9yYWRpby9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmFkaW8vZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHN1cHBvcnRzUGFzc2l2ZV9cblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZVxuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtcbiAgICAgICAgZ2V0IHBhc3NpdmUoKSB7XG4gICAgICAgICAgaXNTdXBwb3J0ZWQgPSB7IHBhc3NpdmU6IHRydWUgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vZW1wdHlcbiAgICB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWRcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogdm0gPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfVxufVxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRm9jdXNNaXhpbiA9IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4geyBoYXNGb2N1czogZmFsc2UgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZVxuICAgIH0sXG4gICAgb25Gb2N1c0V2ZW50KCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksIDApXG4gICAgfSxcbiAgICBvbkJsdXJFdmVudCgpIHtcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxuICAgICAgLy8gYWxzbyBmaWx0dXIgYmx1ciBpZiBtb3VzZWRvd25cbiAgICAgIHRoaXMuX2FjdGl2ZSB8fCBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksIDApXG4gICAgfSxcbiAgICBkaXNwYXRjaEZvY3VzRXZlbnQoKSB7XG4gICAgICBsZXQgaGFzRm9jdXMgPVxuICAgICAgICB0aGlzLiRlbCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fFxuICAgICAgICB0aGlzLiRlbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KVxuICAgICAgaWYgKGhhc0ZvY3VzICE9IHRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy4kZW1pdChoYXNGb2N1cyA/ICdmb2N1cycgOiAnYmx1cicpXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBoYXNGb2N1c1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25CbHVyRXZlbnQpXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bilcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXG4gIH1cbn1cbiIsImNvbnN0IHNjb3BlID1cbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xuXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcbiAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxuICAgICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmF0aW9uVGltZXJfKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG4gICAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIH1cblxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gbnVsbDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9XG4gICAgICBlICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgJiYgKGUua2V5ID09PSAnICcgfHwgZS5rZXlDb2RlID09PSAzMikpIHtcbiAgICAgICAgLy8gSWYgc3BhY2Ugd2FzIHByZXNzZWQsIHRyeSBhZ2FpbiB3aXRoaW4gYW4gckFGIGNhbGwgdG8gZGV0ZWN0IDphY3RpdmUsIGJlY2F1c2UgZGlmZmVyZW50IFVBcyByZXBvcnRcbiAgICAgICAgLy8gYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpbiBldmVudCBoYW5kbGluZyBjb2RlOlxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgICAgLy8gV2UgdHJ5IGZpcnN0IG91dHNpZGUgckFGIHRvIHN1cHBvcnQgRWRnZSwgd2hpY2ggZG9lcyBub3QgZXhoaWJpdCB0aGlzIHByb2JsZW0sIGJ1dCB3aWxsIGNyYXNoIGlmIGEgQ1NTXG4gICAgICAgIC8vIHZhcmlhYmxlIGlzIHNldCB3aXRoaW4gYSByQUYgY2FsbGJhY2sgZm9yIGEgc3VibWl0IGJ1dHRvbiBpbnRlcmFjdGlvbiAoIzIyNDEpLlxuICAgICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgICAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKSB7XG4gICAgcmV0dXJuIChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhbmltYXRlQWN0aXZhdGlvbl8oKSB7XG4gICAgY29uc3Qge1ZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OLCBGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7REVBQ1RJVkFUSU9OX1RJTUVPVVRfTVN9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzO1xuXG4gICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1cygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAZXh0ZW5kcyBNRENDb21wb25lbnQ8IU1EQ1JpcHBsZUZvdW5kYXRpb24+XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZSBleHRlbmRzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKiBAcGFyYW0gey4uLj99IGFyZ3MgKi9cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnVuYm91bmRlZF87XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge3tpc1VuYm91bmRlZDogKGJvb2xlYW58dW5kZWZpbmVkKX09fSBvcHRpb25zXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGV9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCwge2lzVW5ib3VuZGVkID0gdW5kZWZpbmVkfSA9IHt9KSB7XG4gICAgY29uc3QgcmlwcGxlID0gbmV3IE1EQ1JpcHBsZShyb290KTtcbiAgICAvLyBPbmx5IG92ZXJyaWRlIHVuYm91bmRlZCBiZWhhdmlvciBpZiBvcHRpb24gaXMgZXhwbGljaXRseSBzcGVjaWZpZWRcbiAgICBpZiAoaXNVbmJvdW5kZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmlwcGxlLnVuYm91bmRlZCA9IC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gKGlzVW5ib3VuZGVkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJpcHBsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFSaXBwbGVDYXBhYmxlU3VyZmFjZX0gaW5zdGFuY2VcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQWRhcHRlcihpbnN0YW5jZSkge1xuICAgIGNvbnN0IE1BVENIRVMgPSB1dGlsLmdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHV0aWwuc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiBpbnN0YW5jZS51bmJvdW5kZWQsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IGluc3RhbmNlLnJvb3RfW01BVENIRVNdKCc6YWN0aXZlJyksXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gaW5zdGFuY2UuZGlzYWJsZWQsXG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gaW5zdGFuY2Uucm9vdF8uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IGluc3RhbmNlLnJvb3RfLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGluc3RhbmNlLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgaW5zdGFuY2Uucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiBpbnN0YW5jZS5yb290Xy5zdHlsZS5zZXRQcm9wZXJ0eSh2YXJOYW1lLCB2YWx1ZSksXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiBpbnN0YW5jZS5yb290Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+ICh7eDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXR9KSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCB1bmJvdW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudW5ib3VuZGVkXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXQgdW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIHRoaXMudW5ib3VuZGVkXyA9IEJvb2xlYW4odW5ib3VuZGVkKTtcbiAgICB0aGlzLnNldFVuYm91bmRlZF8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zdXJlIENvbXBpbGVyIHRocm93cyBhbiBhY2Nlc3MgY29udHJvbCBlcnJvciB3aGVuIGRpcmVjdGx5IGFjY2Vzc2luZyBhXG4gICAqIHByb3RlY3RlZCBvciBwcml2YXRlIHByb3BlcnR5IGluc2lkZSBhIGdldHRlci9zZXR0ZXIsIGxpa2UgdW5ib3VuZGVkIGFib3ZlLlxuICAgKiBCeSBhY2Nlc3NpbmcgdGhlIHByb3RlY3RlZCBwcm9wZXJ0eSBpbnNpZGUgYSBtZXRob2QsIHdlIHNvbHZlIHRoYXQgcHJvYmxlbS5cbiAgICogVGhhdCdzIHdoeSB0aGlzIGZ1bmN0aW9uIGV4aXN0cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldFVuYm91bmRlZF8oKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRVbmJvdW5kZWQodGhpcy51bmJvdW5kZWRfKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uYWN0aXZhdGUoKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5sYXlvdXQoKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDUmlwcGxlRm91bmRhdGlvbn0gKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENSaXBwbGVGb3VuZGF0aW9uKE1EQ1JpcHBsZS5jcmVhdGVBZGFwdGVyKHRoaXMpKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICB0aGlzLnVuYm91bmRlZCA9ICdtZGNSaXBwbGVJc1VuYm91bmRlZCcgaW4gdGhpcy5yb290Xy5kYXRhc2V0O1xuICB9XG59XG5cbi8qKlxuICogU2VlIE1hdGVyaWFsIERlc2lnbiBzcGVjIGZvciBtb3JlIGRldGFpbHMgb24gd2hlbiB0byB1c2UgcmlwcGxlcy5cbiAqIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZ3VpZGVsaW5lcy9tb3Rpb24vY2hvcmVvZ3JhcGh5Lmh0bWwjY2hvcmVvZ3JhcGh5LWNyZWF0aW9uXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIFJpcHBsZUNhcGFibGVTdXJmYWNlIHt9XG5cbi8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS5yb290XztcblxuLyoqXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIGJsZWVkcyBvdXQgb2YgdGhlIGJvdW5kcyBvZiB0aGUgZWxlbWVudC5cbiAqIEB0eXBlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLnVuYm91bmRlZDtcblxuLyoqXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIGlzIGF0dGFjaGVkIHRvIGEgZGlzYWJsZWQgY29tcG9uZW50LlxuICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUuZGlzYWJsZWQ7XG5cbmV4cG9ydCB7TURDUmlwcGxlLCBNRENSaXBwbGVGb3VuZGF0aW9uLCBSaXBwbGVDYXBhYmxlU3VyZmFjZSwgdXRpbH07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDUmlwcGxlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2luZGV4Jztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBjaGVja2VkOiBib29sZWFuLFxuICogICBpbmRldGVybWluYXRlOiBib29sZWFuLFxuICogICBkaXNhYmxlZDogYm9vbGVhbixcbiAqICAgdmFsdWU6ID9zdHJpbmdcbiAqIH19XG4gKi9cbmxldCBNRENTZWxlY3Rpb25Db250cm9sU3RhdGU7XG5cbi8qKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENTZWxlY3Rpb25Db250cm9sIHtcbiAgLyoqIEByZXR1cm4gez9NRENSaXBwbGV9ICovXG4gIGdldCByaXBwbGUoKSB7fVxufVxuXG5leHBvcnQge01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZSwgTURDU2VsZWN0aW9uQ29udHJvbH07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlfSBmcm9tICdAbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbnRyb2wvaW5kZXgnO1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmFkaW8uIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JhZGlvQWRhcHRlciB7XG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFNRENTZWxlY3Rpb25Db250cm9sU3RhdGV9ICovXG4gIGdldE5hdGl2ZUNvbnRyb2woKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSYWRpb0FkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUjogJy5tZGMtcmFkaW9fX25hdGl2ZS1jb250cm9sJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy1yYWRpbycsXG4gIERJU0FCTEVEOiAnbWRjLXJhZGlvLS1kaXNhYmxlZCcsXG59O1xuXG5leHBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlfSBmcm9tICdAbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbnRyb2wvaW5kZXgnO1xuaW1wb3J0IE1EQ1JhZGlvQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JhZGlvQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JhZGlvRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ1JhZGlvQWRhcHRlcn0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDUmFkaW9BZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGdldE5hdGl2ZUNvbnRyb2w6ICgpID0+IC8qICFNRENTZWxlY3Rpb25Db250cm9sU3RhdGUgKi8ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNDaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkuY2hlY2tlZDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgKi9cbiAgc2V0Q2hlY2tlZChjaGVja2VkKSB7XG4gICAgdGhpcy5nZXROYXRpdmVDb250cm9sXygpLmNoZWNrZWQgPSBjaGVja2VkO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKS5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkICovXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgY29uc3Qge0RJU0FCTEVEfSA9IE1EQ1JhZGlvRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKS5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhESVNBQkxFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRElTQUJMRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHs/c3RyaW5nfSAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVDb250cm9sXygpLnZhbHVlO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7P3N0cmluZ30gdmFsdWUgKi9cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshTURDU2VsZWN0aW9uQ29udHJvbFN0YXRlfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TmF0aXZlQ29udHJvbF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0TmF0aXZlQ29udHJvbCgpIHx8IHtcbiAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSYWRpb0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIEZvcm0gRmllbGQuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gcmlwcGxlIGFjdGl2YXRpb25cbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ0Zvcm1GaWVsZEFkYXB0ZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHshRXZlbnRMaXN0ZW5lcn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHshRXZlbnRMaXN0ZW5lcn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIGFjdGl2YXRlSW5wdXRSaXBwbGUoKSB7fVxuXG4gIGRlYWN0aXZhdGVJbnB1dFJpcHBsZSgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0Zvcm1GaWVsZEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWZvcm0tZmllbGQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBMQUJFTF9TRUxFQ1RPUjogJy5tZGMtZm9ybS1maWVsZCA+IGxhYmVsJyxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDRm9ybUZpZWxkQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0Zvcm1GaWVsZEFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENGb3JtRmllbGRGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDRm9ybUZpZWxkQWRhcHRlcn0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBhY3RpdmF0ZUlucHV0UmlwcGxlOiAoKSA9PiB7fSxcbiAgICAgIGRlYWN0aXZhdGVJbnB1dFJpcHBsZTogKCkgPT4ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUV2ZW50TGlzdGVuZXJ9ICovXG4gICAgdGhpcy5jbGlja0hhbmRsZXJfID0gLyoqIEB0eXBlIHshRXZlbnRMaXN0ZW5lcn0gKi8gKFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVDbGlja18oKSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyXyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgaGFuZGxlQ2xpY2tfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWN0aXZhdGVJbnB1dFJpcHBsZSgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkYXB0ZXJfLmRlYWN0aXZhdGVJbnB1dFJpcHBsZSgpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3JtRmllbGRGb3VuZGF0aW9uO1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xuaW1wb3J0IHtcbiAgc3VwcG9ydHNDc3NWYXJpYWJsZXMsXG4gIGdldE1hdGNoZXNQcm9wZXJ0eSxcbiAgYXBwbHlQYXNzaXZlXG59IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcblxuZXhwb3J0IGNsYXNzIFJpcHBsZUJhc2UgZXh0ZW5kcyBNRENSaXBwbGVGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBNQVRDSEVTKCkge1xuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xuICAgIHJldHVybiAoXG4gICAgICBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XG4gICAgICAoUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxuICAgIClcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cmZhY2VBY3RpdmUocmVmKSB7XG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZtLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB7XG4gICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbFtSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uZGlzYWJsZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udGFpbnNFdmVudFRhcmdldDogdGFyZ2V0ID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxuICAgICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgIGV2dFR5cGUsXG4gICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IHg6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0IH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIClcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXZcbiAgICA6Y2xhc3M9XCJmb3JtRmllbGRDbGFzc2VzXCJcbiAgICBjbGFzcz1cIm1kYy1yYWRpby13cmFwcGVyXCI+XG4gICAgPGRpdlxuICAgICAgcmVmPVwicm9vdFwiXG4gICAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcbiAgICAgIDpzdHlsZT1cInN0eWxlc1wiXG4gICAgICBjbGFzcz1cIm1kYy1yYWRpb1wiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj1cImNvbnRyb2xcIlxuICAgICAgICA6aWQ9XCJ2bWFfdWlkX1wiXG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgIGNsYXNzPVwibWRjLXJhZGlvX19uYXRpdmUtY29udHJvbFwiXG4gICAgICAgIEBjaGFuZ2U9XCJzeW5jXCI+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJtZGMtcmFkaW9fX2JhY2tncm91bmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kYy1yYWRpb19fb3V0ZXItY2lyY2xlXCIvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWRjLXJhZGlvX19pbm5lci1jaXJjbGVcIi8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8bGFiZWxcbiAgICAgIHJlZj1cImxhYmVsXCJcbiAgICAgIDpmb3I9XCJ2bWFfdWlkX1wiPjxzbG90Pnt7IGxhYmVsIH19PC9zbG90PjwvbGFiZWw+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENSYWRpb0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JhZGlvL2ZvdW5kYXRpb24nXG5pbXBvcnQgTURDRm9ybUZpZWxkRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZm9ybS1maWVsZC9mb3VuZGF0aW9uJ1xuaW1wb3J0IHsgRGlzcGF0Y2hGb2N1c01peGluLCBWTUFVbmlxdWVJZE1peGluIH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCB7IFJpcHBsZUJhc2UgfSBmcm9tICcuLi9yaXBwbGUnXG5pbXBvcnQgeyBhcHBseVBhc3NpdmUgfSBmcm9tICcuLi9iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtcmFkaW8nLFxuICBtaXhpbnM6IFtEaXNwYXRjaEZvY3VzTWl4aW4sIFZNQVVuaXF1ZUlkTWl4aW5dLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICdwaWNrZWQnLFxuICAgIGV2ZW50OiAnY2hhbmdlJ1xuICB9LFxuICBwcm9wczoge1xuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgIHZhbHVlOiBTdHJpbmcsXG4gICAgcGlja2VkOiBTdHJpbmcsXG4gICAgY2hlY2tlZDogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgICdhbGlnbi1lbmQnOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fSxcbiAgICAgIGZvcm1GaWVsZENsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1mb3JtLWZpZWxkJzogdGhpcy5sYWJlbCxcbiAgICAgICAgJ21kYy1mb3JtLWZpZWxkLS1hbGlnbi1lbmQnOiB0aGlzLmxhYmVsICYmIHRoaXMuYWxpZ25FbmRcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY2hlY2tlZDogJ3NldENoZWNrZWQnLFxuICAgIGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodmFsdWUpXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIC8vIGFkZCBmb3VuZGF0aW9uXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1JhZGlvRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXG4gICAgICBnZXROYXRpdmVDb250cm9sOiAoKSA9PiB0aGlzLiRyZWZzLmNvbnRyb2xcbiAgICB9KVxuXG4gICAgLy8gYWRkIHJpcHBsZVxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcywge1xuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHRydWUsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IGZhbHNlLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5jb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuY29udHJvbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICB9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5yb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMuZm9ybUZpZWxkID0gbmV3IE1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24oe1xuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMubGFiZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMubGFiZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGFjdGl2YXRlSW5wdXRSaXBwbGU6ICgpID0+IHtcbiAgICAgICAgdGhpcy5yaXBwbGUgJiYgdGhpcy5yaXBwbGUuYWN0aXZhdGUoKVxuICAgICAgfSxcbiAgICAgIGRlYWN0aXZhdGVJbnB1dFJpcHBsZTogKCkgPT4ge1xuICAgICAgICB0aGlzLnJpcHBsZSAmJiB0aGlzLnJpcHBsZS5kZWFjdGl2YXRlKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICAgIHRoaXMuZm9ybUZpZWxkLmluaXQoKVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlIDogdGhpcy5sYWJlbClcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZClcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0Q2hlY2tlZChcbiAgICAgIHRoaXMuY2hlY2tlZCB8fCB0aGlzLnBpY2tlZCA9PSB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKVxuICAgIClcblxuICAgIC8vIHJlZnJlc2ggbW9kZWxcbiAgICB0aGlzLmNoZWNrZWQgJiYgdGhpcy5zeW5jKClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLmZvcm1GaWVsZC5kZXN0cm95KClcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBzZXRDaGVja2VkKGNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldENoZWNrZWQoY2hlY2tlZClcbiAgICB9LFxuICAgIGlzQ2hlY2tlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb24uaXNDaGVja2VkKClcbiAgICB9LFxuICAgIHN5bmMoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSlcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjUmFkaW8gZnJvbSAnLi9tZGMtcmFkaW8udnVlJ1xuXG5leHBvcnQgeyBtZGNSYWRpbyB9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNSYWRpb1xufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsic3VwcG9ydHNQYXNzaXZlXyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsIndpbmRvdyIsImZvcmNlUmVmcmVzaCIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsImUiLCJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiRGlzcGF0Y2hGb2N1c01peGluIiwiZGF0YSIsImhhc0ZvY3VzIiwibWV0aG9kcyIsIm9uTW91c2VEb3duIiwiX2FjdGl2ZSIsIm9uTW91c2VVcCIsIm9uRm9jdXNFdmVudCIsInNldFRpbWVvdXQiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIiRlbCIsImFjdGl2ZUVsZW1lbnQiLCJjb250YWlucyIsIiRlbWl0IiwibW91bnRlZCIsImJlZm9yZURlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIlZNQVVuaXF1ZUlkTWl4aW4iLCJiZWZvcmVDcmVhdGUiLCJ2bWFfdWlkXyIsIl91aWQiLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDQ29tcG9uZW50Iiwicm9vdCIsImZvdW5kYXRpb24iLCJyb290XyIsImFyZ3MiLCJpbml0aWFsaXplIiwiZm91bmRhdGlvbl8iLCJnZXREZWZhdWx0Rm91bmRhdGlvbiIsImluaXQiLCJpbml0aWFsU3luY1dpdGhET00iLCJFcnJvciIsImRlc3Ryb3kiLCJldnRUeXBlIiwiaGFuZGxlciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJldnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJNRENSaXBwbGVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidGFyZ2V0IiwidmFyTmFtZSIsInZhbHVlIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsInN0cmluZ3MiLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNvbXB1dGVkU3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJyZW1vdmUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiQ1NTIiwic3VwcG9ydHMiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJ0eXBlIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJjb21wdXRlQm91bmRpbmdSZWN0IiwiZ2V0V2luZG93UGFnZU9mZnNldCIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiZGVmYXVsdEFkYXB0ZXIiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXMiLCJibHVySGFuZGxlcl8iLCJoYW5kbGVCbHVyIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibGF5b3V0SW50ZXJuYWxfIiwiY2xlYXJUaW1lb3V0IiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwibGVuZ3RoIiwic29tZSIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInB1c2giLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwia2V5Q29kZSIsImV2ZW50IiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIk1EQ1JpcHBsZSIsImRpc2FibGVkIiwidW5ib3VuZGVkXyIsInNldFVuYm91bmRlZCIsImFjdGl2YXRlIiwiZGVhY3RpdmF0ZSIsImNyZWF0ZUFkYXB0ZXIiLCJkYXRhc2V0IiwiQm9vbGVhbiIsInNldFVuYm91bmRlZF8iLCJyaXBwbGUiLCJpbnN0YW5jZSIsIk1BVENIRVMiLCJ1dGlsIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIk1EQ1NlbGVjdGlvbkNvbnRyb2wiLCJNRENSYWRpb0FkYXB0ZXIiLCJOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUiIsIkRJU0FCTEVEIiwiTURDUmFkaW9Gb3VuZGF0aW9uIiwiZ2V0TmF0aXZlQ29udHJvbF8iLCJjaGVja2VkIiwiZ2V0TmF0aXZlQ29udHJvbCIsIk1EQ0Zvcm1GaWVsZEFkYXB0ZXIiLCJMQUJFTF9TRUxFQ1RPUiIsIk1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24iLCJhY3RpdmF0ZUlucHV0UmlwcGxlIiwiZGVhY3RpdmF0ZUlucHV0UmlwcGxlIiwiY2xpY2tIYW5kbGVyXyIsImhhbmRsZUNsaWNrXyIsIlJpcHBsZUJhc2UiLCJyZWYiLCJfbWF0Y2hlcyIsIm9wdGlvbnMiLCIkc2V0IiwiY2xhc3NlcyIsIiRkZWxldGUiLCJzdHlsZXMiLCJyZW5kZXIiLCJtaXhpbnMiLCJtb2RlbCIsInByb3AiLCJwcm9wcyIsIlN0cmluZyIsInJlcXVpcmVkIiwicGlja2VkIiwibGFiZWwiLCJmb3JtRmllbGRDbGFzc2VzIiwiYWxpZ25FbmQiLCJ3YXRjaCIsInNldERpc2FibGVkIiwiJHJlZnMiLCJjb250cm9sIiwiZm9ybUZpZWxkIiwic2V0VmFsdWUiLCJzZXRDaGVja2VkIiwiZ2V0VmFsdWUiLCJzeW5jIiwiaXNDaGVja2VkIiwibWRjUmFkaW8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFJQSx5QkFBSjs7RUFFQTs7Ozs7O0FBTUEsRUFBTyxTQUFTQyxZQUFULEdBQWdFO0VBQUEsTUFBMUNDLFNBQTBDLHVFQUE5QkMsTUFBOEI7RUFBQSxNQUF0QkMsWUFBc0IsdUVBQVAsS0FBTzs7RUFDckUsTUFBSUoscUJBQXFCSyxTQUFyQixJQUFrQ0QsWUFBdEMsRUFBb0Q7RUFDbEQsUUFBSUUsY0FBYyxLQUFsQjtFQUNBLFFBQUk7RUFDRkosZ0JBQVVLLFFBQVYsQ0FBbUJDLGdCQUFuQixDQUFvQyxNQUFwQyxFQUE0QyxJQUE1QyxFQUFrRDtFQUNoRCxZQUFJQyxPQUFKLEdBQWM7RUFDWkgsd0JBQWMsRUFBRUcsU0FBUyxJQUFYLEVBQWQ7RUFDRDtFQUgrQyxPQUFsRDtFQUtELEtBTkQsQ0FN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
