/**
* @module vue-mdc-adaptertabs 0.17.0
* @exports VueMDCTabs
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCTabs = factory());
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

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

  var CustomLink = {
    name: 'custom-link',
    functional: true,
    props: {
      tag: { type: String, default: 'a' },
      link: Object
    },
    render: function render(h, context) {
      var element = void 0;
      var data = _extends({}, context.data);

      if (context.props.link && context.parent.$router) {
        // router-link case
        element = context.parent.$root.$options.components['router-link'];
        data.props = _extends({ tag: context.props.tag }, context.props.link);
        if (data.on.click) {
          data.nativeOn = { click: data.on.click };
        }
      } else {
        // element fallback
        element = context.props.tag;
      }

      return h(element, data, context.children);
    }
  };

  var CustomLinkMixin = {
    props: {
      to: [String, Object],
      exact: Boolean,
      append: Boolean,
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String
    },
    computed: {
      link: function link() {
        return this.to && {
          to: this.to,
          exact: this.exact,
          append: this.append,
          replace: this.replace,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass
        };
      }
    },
    components: {
      CustomLink: CustomLink
    }
  };

  /* global CustomEvent */

  function emitCustomEvent(el, evtType, evtData) {
    var shouldBubble = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

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
    el.dispatchEvent(evt);
  }

  function extractIconProp(iconProp) {
    if (typeof iconProp === 'string') {
      return {
        classes: { 'material-icons': true },
        content: iconProp
      };
    } else if (iconProp instanceof Array) {
      return {
        classes: iconProp.reduce(function (result, value) {
          return _extends(result, defineProperty({}, value, true));
        }, {})
      };
    } else if ((typeof iconProp === 'undefined' ? 'undefined' : _typeof(iconProp)) === 'object') {
      return {
        classes: iconProp.className.split(' ').reduce(function (result, value) {
          return _extends(result, defineProperty({}, value, true));
        }, {}),
        content: iconProp.textContent
      };
    }
  }

  var DispatchEventMixin = {
    props: {
      event: String,
      'event-target': Object,
      'event-args': Array
    },
    methods: {
      dispatchEvent: function dispatchEvent(evt) {
        evt && this.$emit(evt.type, evt);
        if (this.event) {
          var target = this.eventTarget || this.$root;
          var args = this.eventArgs || [];
          target.$emit.apply(target, [this.event].concat(toConsumableArray(args)));
        }
      }
    },
    computed: {
      listeners: function listeners() {
        var _this = this;

        return _extends({}, this.$listeners, {
          click: function click(e) {
            return _this.dispatchEvent(e);
          }
        });
      }
    }
  };

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

  var cssClasses = {
    ACTIVE: 'mdc-tab--active'
  };

  var strings = {
    SELECTED_EVENT: 'MDCTab:selected'
  };

  /**
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

  var MDCTabFoundation = function (_MDCFoundation) {
    inherits(MDCTabFoundation, _MDCFoundation);
    createClass(MDCTabFoundation, null, [{
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
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          getOffsetLeft: function getOffsetLeft() {
            return (/* number */0
            );
          },
          notifySelected: function notifySelected() {}
        };
      }
    }]);

    function MDCTabFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, MDCTabFoundation);

      var _this = possibleConstructorReturn(this, (MDCTabFoundation.__proto__ || Object.getPrototypeOf(MDCTabFoundation)).call(this, _extends(MDCTabFoundation.defaultAdapter, adapter)));

      _this.computedWidth_ = 0;
      _this.computedLeft_ = 0;
      _this.isActive_ = false;
      _this.preventDefaultOnClick_ = false;

      _this.clickHandler_ = function (evt) {
        if (_this.preventDefaultOnClick_) {
          evt.preventDefault();
        }
        _this.adapter_.notifySelected();
      };

      _this.keydownHandler_ = function (evt) {
        if (evt.key && evt.key === 'Enter' || evt.keyCode === 13) {
          _this.adapter_.notifySelected();
        }
      };
      return _this;
    }

    createClass(MDCTabFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'getComputedWidth',
      value: function getComputedWidth() {
        return this.computedWidth_;
      }
    }, {
      key: 'getComputedLeft',
      value: function getComputedLeft() {
        return this.computedLeft_;
      }
    }, {
      key: 'isActive',
      value: function isActive() {
        return this.isActive_;
      }
    }, {
      key: 'setActive',
      value: function setActive(isActive) {
        this.isActive_ = isActive;
        if (this.isActive_) {
          this.adapter_.addClass(cssClasses.ACTIVE);
        } else {
          this.adapter_.removeClass(cssClasses.ACTIVE);
        }
      }
    }, {
      key: 'preventsDefaultOnClick',
      value: function preventsDefaultOnClick() {
        return this.preventDefaultOnClick_;
      }
    }, {
      key: 'setPreventDefaultOnClick',
      value: function setPreventDefaultOnClick(preventDefaultOnClick) {
        this.preventDefaultOnClick_ = preventDefaultOnClick;
      }
    }, {
      key: 'measureSelf',
      value: function measureSelf() {
        this.computedWidth_ = this.adapter_.getOffsetWidth();
        this.computedLeft_ = this.adapter_.getOffsetLeft();
      }
    }]);
    return MDCTabFoundation;
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

  var mdcTab = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-link', _vm._g({ staticClass: "mdc-tab", class: _vm.classes, style: _vm.styles, attrs: { "link": _vm.link } }, _vm.listeners), [!!_vm.hasIcon ? _c('i', { ref: "icon", staticClass: "mdc-tab__icon", class: _vm.hasIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("icon", [_vm._v(_vm._s(_vm.hasIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasText ? _c('span', { class: { 'mdc-tab__icon-text': !!_vm.hasIcon } }, [_vm._t("default")], 2) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-tab',
    mixins: [CustomLinkMixin, DispatchEventMixin],
    props: {
      active: Boolean,
      icon: [String, Array, Object]
    },
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },

    computed: {
      hasIcon: function hasIcon() {
        if (this.icon || this.$slots.icon) {
          return this.icon ? extractIconProp(this.icon) : {};
        }
        return false;
      },
      hasText: function hasText() {
        return !!this.$slots.default;
      }
    },
    watch: {
      active: function active(value) {
        if (value) {
          this.foundation.adapter_.notifySelected();
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCTabFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this.$el.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this.$el.removeEventListener(type, handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        getOffsetLeft: function getOffsetLeft() {
          return _this.$el.offsetLeft;
        },
        notifySelected: function notifySelected() {
          emitCustomEvent(_this.$el, MDCTabFoundation.strings.SELECTED_EVENT, { tab: _this }, true);
        }
      });
      this.foundation.init();
      this.setActive(this.active);
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
      this.ripple.destroy();
    },

    methods: {
      getComputedWidth: function getComputedWidth() {
        return this.foundation.getComputedWidth();
      },
      getComputedLeft: function getComputedLeft() {
        return this.foundation.getComputedLeft();
      },
      isActive: function isActive() {
        return this.foundation.isActive();
      },
      setActive: function setActive(isActive) {
        this.foundation.setActive(isActive);
      },
      isDefaultPreventedOnClick: function isDefaultPreventedOnClick() {
        return this.foundation.preventsDefaultOnClick();
      },
      setPreventDefaultOnClick: function setPreventDefaultOnClick(preventDefaultOnClick) {
        this.foundation.setPreventDefaultOnClick(preventDefaultOnClick);
      },
      measureSelf: function measureSelf() {
        this.foundation.measureSelf();
      }
    }
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
  function getCorrectPropertyName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

  /**
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

  var cssClasses$2 = {
    UPGRADED: 'mdc-tab-bar-upgraded'
  };

  var strings$2 = {
    TAB_SELECTOR: '.mdc-tab',
    INDICATOR_SELECTOR: '.mdc-tab-bar__indicator',
    CHANGE_EVENT: 'MDCTabBar:change'
  };

  /**
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

  var MDCTabBarFoundation = function (_MDCFoundation) {
    inherits(MDCTabBarFoundation, _MDCFoundation);
    createClass(MDCTabBarFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$2;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$2;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {},
          unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          setStyleForIndicator: function setStyleForIndicator() /* propertyName: string, value: string */{},
          getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
            return (/* number */0
            );
          },
          notifyChange: function notifyChange() /* evtData: {activeTabIndex: number} */{},
          getNumberOfTabs: function getNumberOfTabs() {
            return (/* number */0
            );
          },
          isTabActiveAtIndex: function isTabActiveAtIndex() {
            return (/* index: number */ /* boolean */false
            );
          },
          setTabActiveAtIndex: function setTabActiveAtIndex() /* index: number, isActive: true */{},
          isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex() {
            return (/* index: number */ /* boolean */false
            );
          },
          setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex() /* index: number, preventDefaultOnClick: boolean */{},
          measureTabAtIndex: function measureTabAtIndex() /* index: number */{},
          getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex() {
            return (/* index: number */ /* number */0
            );
          },
          getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex() {
            return (/* index: number */ /* number */0
            );
          }
        };
      }
    }]);

    function MDCTabBarFoundation(adapter) {
      classCallCheck(this, MDCTabBarFoundation);

      var _this = possibleConstructorReturn(this, (MDCTabBarFoundation.__proto__ || Object.getPrototypeOf(MDCTabBarFoundation)).call(this, _extends(MDCTabBarFoundation.defaultAdapter, adapter)));

      _this.isIndicatorShown_ = false;
      _this.computedWidth_ = 0;
      _this.computedLeft_ = 0;
      _this.activeTabIndex_ = 0;
      _this.layoutFrame_ = 0;
      _this.resizeHandler_ = function () {
        return _this.layout();
      };
      return _this;
    }

    createClass(MDCTabBarFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.addClass(cssClasses$2.UPGRADED);
        this.adapter_.bindOnMDCTabSelectedEvent();
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        var activeTabIndex = this.findActiveTabIndex_();
        if (activeTabIndex >= 0) {
          this.activeTabIndex_ = activeTabIndex;
        }
        this.layout();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.removeClass(cssClasses$2.UPGRADED);
        this.adapter_.unbindOnMDCTabSelectedEvent();
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this2 = this;

        this.forEachTabIndex_(function (index) {
          return _this2.adapter_.measureTabAtIndex(index);
        });
        this.computedWidth_ = this.adapter_.getOffsetWidth();
        this.layoutIndicator_();
      }
    }, {
      key: 'layoutIndicator_',
      value: function layoutIndicator_() {
        var isIndicatorFirstRender = !this.isIndicatorShown_;

        // Ensure that indicator appears in the right position immediately for correct first render.
        if (isIndicatorFirstRender) {
          this.adapter_.setStyleForIndicator('transition', 'none');
        }

        var translateAmtForActiveTabLeft = this.adapter_.getComputedLeftForTabAtIndex(this.activeTabIndex_);
        var scaleAmtForActiveTabWidth = this.adapter_.getComputedWidthForTabAtIndex(this.activeTabIndex_) / this.adapter_.getOffsetWidth();

        var transformValue = 'translateX(' + translateAmtForActiveTabLeft + 'px) scale(' + scaleAmtForActiveTabWidth + ', 1)';
        this.adapter_.setStyleForIndicator(getCorrectPropertyName(window, 'transform'), transformValue);

        if (isIndicatorFirstRender) {
          // Force layout so that transform styles to take effect.
          this.adapter_.getOffsetWidthForIndicator();
          this.adapter_.setStyleForIndicator('transition', '');
          this.adapter_.setStyleForIndicator('visibility', 'visible');
          this.isIndicatorShown_ = true;
        }
      }
    }, {
      key: 'findActiveTabIndex_',
      value: function findActiveTabIndex_() {
        var _this3 = this;

        var activeTabIndex = -1;
        this.forEachTabIndex_(function (index) {
          if (_this3.adapter_.isTabActiveAtIndex(index)) {
            activeTabIndex = index;
            return true;
          }
        });
        return activeTabIndex;
      }
    }, {
      key: 'forEachTabIndex_',
      value: function forEachTabIndex_(iterator) {
        var numTabs = this.adapter_.getNumberOfTabs();
        for (var index = 0; index < numTabs; index++) {
          var shouldBreak = iterator(index);
          if (shouldBreak) {
            break;
          }
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this4 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }

        this.layoutFrame_ = requestAnimationFrame(function () {
          _this4.layoutInternal_();
          _this4.layoutFrame_ = 0;
        });
      }
    }, {
      key: 'switchToTabAtIndex',
      value: function switchToTabAtIndex(index, shouldNotify) {
        var _this5 = this;

        if (index === this.activeTabIndex_) {
          return;
        }

        if (index < 0 || index >= this.adapter_.getNumberOfTabs()) {
          throw new Error('Out of bounds index specified for tab: ' + index);
        }

        var prevActiveTabIndex = this.activeTabIndex_;
        this.activeTabIndex_ = index;
        requestAnimationFrame(function () {
          if (prevActiveTabIndex >= 0) {
            _this5.adapter_.setTabActiveAtIndex(prevActiveTabIndex, false);
          }
          _this5.adapter_.setTabActiveAtIndex(_this5.activeTabIndex_, true);
          _this5.layoutIndicator_();
          if (shouldNotify) {
            _this5.adapter_.notifyChange({ activeTabIndex: _this5.activeTabIndex_ });
          }
        });
      }
    }, {
      key: 'getActiveTabIndex',
      value: function getActiveTabIndex() {
        return this.findActiveTabIndex_();
      }
    }]);
    return MDCTabBarFoundation;
  }(MDCFoundation);

  var mdcTabBar = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', _vm._g({ staticClass: "mdc-tab-bar", class: _vm.classes }, _vm.$listeners), [_vm._t("default"), _vm._v(" "), _c('span', { ref: "indicator", staticClass: "mdc-tab-bar__indicator", style: _vm.indicatorStyles })], 2);
    }, staticRenderFns: [],
    name: 'mdc-tab-bar',
    data: function data() {
      return {
        classes: {},
        indicatorStyles: {},
        tabs: []
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCTabBarFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {
          _this.$el.addEventListener(MDCTabFoundation.strings.SELECTED_EVENT, _this.onSelect);
        },
        unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {
          return _this.$el.removeEventListener(MDCTabFoundation.strings.SELECTED_EVENT, _this.onSelect);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        setStyleForIndicator: function setStyleForIndicator(propertyName, value) {
          return _this.$set(_this.indicatorStyles, propertyName, value);
        },
        getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
          return _this.$refs.indicator.offsetWidth;
        },
        notifyChange: function notifyChange(evtData) {
          _this.$emit('change', evtData.activeTabIndex);
        },
        getNumberOfTabs: function getNumberOfTabs() {
          return _this.tabs.length;
        },
        isTabActiveAtIndex: function isTabActiveAtIndex(index) {
          return _this.tabs[index].isActive();
        },
        setTabActiveAtIndex: function setTabActiveAtIndex(index, isActive) {
          // pgbr: 2018-04-07
          // since it is possible to change the number of tabs programatically
          // we need to detect the foundation deactivating a tab
          // that no longer exists but was previously active.
          if (!isActive && index >= _this.tabs.length) {
            return;
          }
          _this.tabs[index].setActive(isActive);
        },
        isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex(index) {
          return _this.tabs[index].isDefaultPreventedOnClick();
        },
        setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex(index, preventDefaultOnClick) {
          _this.tabs[index].setPreventDefaultOnClick(preventDefaultOnClick);
        },
        measureTabAtIndex: function measureTabAtIndex(index) {
          return _this.tabs[index].measureSelf();
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex(index) {
          return _this.tabs[index].getComputedWidth();
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex(index) {
          return _this.tabs[index].getComputedLeft();
        }
      });

      var resetTabs = function resetTabs() {
        var tabElements = [].slice.call(_this.$el.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR));
        _this.tabs = tabElements.map(function (el) {
          return el.__vue__;
        });

        var hasText = void 0,
            hasIcon = void 0;
        var tabs = _this.tabs;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tab = _step.value;

            if (tab.hasText) {
              hasText = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = tabs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _tab = _step2.value;

            if (_tab.hasIcon) {
              hasIcon = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (hasText && hasIcon) {
          _this.$set(_this.classes, 'mdc-tab-bar--icons-with-text', true);
        } else if (hasIcon) {
          _this.$set(_this.classes, 'mdc-tab-bar--icon-tab-bar', true);
        }

        if (_this.foundation) {
          var activeTabIndex = _this.foundation.getActiveTabIndex();
          if (activeTabIndex >= 0) {
            _this.foundation.switchToTabAtIndex(activeTabIndex, true);
          } else {
            _this.foundation.switchToTabAtIndex(0, true);
          }
          _this.foundation.layout();
        }
      };

      resetTabs();

      this.slotObserver = new MutationObserver(function () {
        return resetTabs();
      });
      this.slotObserver.observe(this.$el, { childList: true, subtree: true });

      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.slotObserver.disconnect();
      this.foundation.destroy();
    },

    methods: {
      onSelect: function onSelect(_ref) {
        var detail = _ref.detail;
        var tab = detail.tab;

        var index = this.tabs.indexOf(tab);
        if (index < 0) {
          throw new Error('mdc-tab-bar internal error: index not found');
        }
        this.foundation.switchToTabAtIndex(index, true);
      }
    }
  };

  var plugin = BasePlugin({
    mdcTab: mdcTab,
    mdcTabBar: mdcTabBar
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tbGluay5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWljb24uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZXZlbnQtbWl4aW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGFicy90YWIvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90YWJzL3RhYi9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy90YWJzL21kYy10YWIudnVlIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9hbmltYXRpb24vaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RhYnMvdGFiLWJhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RhYnMvdGFiLWJhci9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy90YWJzL21kYy10YWItYmFyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdGFicy9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdGFicy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogdm0gPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUxpbmsgPSB7XG4gIG5hbWU6ICdjdXN0b20tbGluaycsXG4gIGZ1bmN0aW9uYWw6IHRydWUsXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJ2EnIH0sXG4gICAgbGluazogT2JqZWN0XG4gIH0sXG4gIHJlbmRlcihoLCBjb250ZXh0KSB7XG4gICAgbGV0IGVsZW1lbnRcbiAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQuZGF0YSlcblxuICAgIGlmIChjb250ZXh0LnByb3BzLmxpbmsgJiYgY29udGV4dC5wYXJlbnQuJHJvdXRlcikge1xuICAgICAgLy8gcm91dGVyLWxpbmsgY2FzZVxuICAgICAgZWxlbWVudCA9IGNvbnRleHQucGFyZW50LiRyb290LiRvcHRpb25zLmNvbXBvbmVudHNbJ3JvdXRlci1saW5rJ11cbiAgICAgIGRhdGEucHJvcHMgPSBPYmplY3QuYXNzaWduKHsgdGFnOiBjb250ZXh0LnByb3BzLnRhZyB9LCBjb250ZXh0LnByb3BzLmxpbmspXG4gICAgICBpZiAoZGF0YS5vbi5jbGljaykge1xuICAgICAgICBkYXRhLm5hdGl2ZU9uID0geyBjbGljazogZGF0YS5vbi5jbGljayB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVsZW1lbnQgZmFsbGJhY2tcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnByb3BzLnRhZ1xuICAgIH1cblxuICAgIHJldHVybiBoKGVsZW1lbnQsIGRhdGEsIGNvbnRleHQuY2hpbGRyZW4pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEN1c3RvbUxpbmtNaXhpbiA9IHtcbiAgcHJvcHM6IHtcbiAgICB0bzogW1N0cmluZywgT2JqZWN0XSxcbiAgICBleGFjdDogQm9vbGVhbixcbiAgICBhcHBlbmQ6IEJvb2xlYW4sXG4gICAgcmVwbGFjZTogQm9vbGVhbixcbiAgICBhY3RpdmVDbGFzczogU3RyaW5nLFxuICAgIGV4YWN0QWN0aXZlQ2xhc3M6IFN0cmluZ1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGxpbmsoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLnRvICYmIHtcbiAgICAgICAgICB0bzogdGhpcy50byxcbiAgICAgICAgICBleGFjdDogdGhpcy5leGFjdCxcbiAgICAgICAgICBhcHBlbmQ6IHRoaXMuYXBwZW5kLFxuICAgICAgICAgIHJlcGxhY2U6IHRoaXMucmVwbGFjZSxcbiAgICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcbiAgICAgICAgICBleGFjdEFjdGl2ZUNsYXNzOiB0aGlzLmV4YWN0QWN0aXZlQ2xhc3NcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIEN1c3RvbUxpbmtcbiAgfVxufVxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RJY29uUHJvcChpY29uUHJvcCkge1xuICBpZiAodHlwZW9mIGljb25Qcm9wID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7ICdtYXRlcmlhbC1pY29ucyc6IHRydWUgfSxcbiAgICAgIGNvbnRlbnQ6IGljb25Qcm9wXG4gICAgfVxuICB9IGVsc2UgaWYgKGljb25Qcm9wIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3NlczogaWNvblByb3AucmVkdWNlKFxuICAgICAgICAocmVzdWx0LCB2YWx1ZSkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW3ZhbHVlXTogdHJ1ZSB9KSxcbiAgICAgICAge31cbiAgICAgIClcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGljb25Qcm9wID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiBpY29uUHJvcC5jbGFzc05hbWVcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLnJlZHVjZShcbiAgICAgICAgICAocmVzdWx0LCB2YWx1ZSkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW3ZhbHVlXTogdHJ1ZSB9KSxcbiAgICAgICAgICB7fVxuICAgICAgICApLFxuICAgICAgY29udGVudDogaWNvblByb3AudGV4dENvbnRlbnRcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEV2ZW50TWl4aW4gPSB7XG4gIHByb3BzOiB7XG4gICAgZXZlbnQ6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXlcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGRpc3BhdGNoRXZlbnQoZXZ0KSB7XG4gICAgICBldnQgJiYgdGhpcy4kZW1pdChldnQudHlwZSwgZXZ0KVxuICAgICAgaWYgKHRoaXMuZXZlbnQpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZXZlbnRUYXJnZXQgfHwgdGhpcy4kcm9vdFxuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZXZlbnRBcmdzIHx8IFtdXG4gICAgICAgIHRhcmdldC4kZW1pdCh0aGlzLmV2ZW50LCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBsaXN0ZW5lcnMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIGNsaWNrOiBlID0+IHRoaXMuZGlzcGF0Y2hFdmVudChlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiY29uc3Qgc2NvcGUgPVxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXG5cbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xuICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgQUNUSVZFOiAnbWRjLXRhYi0tYWN0aXZlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBTRUxFQ1RFRF9FVkVOVDogJ01EQ1RhYjpzZWxlY3RlZCcsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURDVGFiRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBnZXRPZmZzZXRXaWR0aDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBnZXRPZmZzZXRMZWZ0OiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIG5vdGlmeVNlbGVjdGVkOiAoKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENUYWJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICB0aGlzLmNvbXB1dGVkV2lkdGhfID0gMDtcbiAgICB0aGlzLmNvbXB1dGVkTGVmdF8gPSAwO1xuICAgIHRoaXMuaXNBY3RpdmVfID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdE9uQ2xpY2tfID0gZmFsc2U7XG5cbiAgICB0aGlzLmNsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAodGhpcy5wcmV2ZW50RGVmYXVsdE9uQ2xpY2tfKSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlTZWxlY3RlZCgpO1xuICAgIH07XG5cbiAgICB0aGlzLmtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHtcbiAgICAgIGlmIChldnQua2V5ICYmIGV2dC5rZXkgPT09ICdFbnRlcicgfHwgZXZ0LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5U2VsZWN0ZWQoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duSGFuZGxlcl8pO1xuICB9XG5cbiAgZ2V0Q29tcHV0ZWRXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wdXRlZFdpZHRoXztcbiAgfVxuXG4gIGdldENvbXB1dGVkTGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wdXRlZExlZnRfO1xuICB9XG5cbiAgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNBY3RpdmVfO1xuICB9XG5cbiAgc2V0QWN0aXZlKGlzQWN0aXZlKSB7XG4gICAgdGhpcy5pc0FjdGl2ZV8gPSBpc0FjdGl2ZTtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZV8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5BQ1RJVkUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuQUNUSVZFKTtcbiAgICB9XG4gIH1cblxuICBwcmV2ZW50c0RlZmF1bHRPbkNsaWNrKCkge1xuICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0T25DbGlja187XG4gIH1cblxuICBzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2socHJldmVudERlZmF1bHRPbkNsaWNrKSB7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdE9uQ2xpY2tfID0gcHJldmVudERlZmF1bHRPbkNsaWNrO1xuICB9XG5cbiAgbWVhc3VyZVNlbGYoKSB7XG4gICAgdGhpcy5jb21wdXRlZFdpZHRoXyA9IHRoaXMuYWRhcHRlcl8uZ2V0T2Zmc2V0V2lkdGgoKTtcbiAgICB0aGlzLmNvbXB1dGVkTGVmdF8gPSB0aGlzLmFkYXB0ZXJfLmdldE9mZnNldExlZnQoKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgIC8vIFVuYm91bmRlZCByaXBwbGVzIG5lZWQgbGF5b3V0IGxvZ2ljIGFwcGxpZWQgaW1tZWRpYXRlbHkgdG8gc2V0IGNvb3JkaW5hdGVzIGZvciBib3RoIHNoYWRlIGFuZCByaXBwbGVcbiAgICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge1xuICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyxcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxuICBhcHBseVBhc3NpdmVcbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IE1BVENIRVMoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIChcbiAgICAgIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gICAgKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3Iodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cclxuICA8Y3VzdG9tLWxpbmsgXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiXHJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIiBcbiAgICA6bGluaz1cImxpbmtcIlxyXG4gICAgY2xhc3M9XCJtZGMtdGFiXCJcclxuICAgIHYtb249XCJsaXN0ZW5lcnNcIj5cclxuXHJcbiAgICA8aSBcbiAgICAgIHYtaWY9XCIhIWhhc0ljb25cIiBcbiAgICAgIHJlZj1cImljb25cIlxyXG4gICAgICA6Y2xhc3M9XCJoYXNJY29uLmNsYXNzZXNcIlxyXG4gICAgICB0YWJpbmRleD1cIjBcIlxyXG4gICAgICBjbGFzcz1cIm1kYy10YWJfX2ljb25cIj5cclxuICAgICAgPHNsb3QgbmFtZT1cImljb25cIj57eyBoYXNJY29uLmNvbnRlbnQgfX08L3Nsb3Q+XHJcbiAgICA8L2k+XHJcblxyXG4gICAgPHNwYW4gXG4gICAgICB2LWlmPVwiaGFzVGV4dFwiIFxuICAgICAgOmNsYXNzPVwieydtZGMtdGFiX19pY29uLXRleHQnOiAhIWhhc0ljb259XCI+XHJcbiAgICAgIDxzbG90Lz5cclxuICAgIDwvc3Bhbj5cclxuXHJcbiAgPC9jdXN0b20tbGluaz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENUYWJGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90YWJzL3RhYi9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQge1xyXG4gIEN1c3RvbUxpbmtNaXhpbixcclxuICBEaXNwYXRjaEV2ZW50TWl4aW4sXHJcbiAgZW1pdEN1c3RvbUV2ZW50LFxyXG4gIGV4dHJhY3RJY29uUHJvcFxyXG59IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZUJhc2UgfSBmcm9tICcuLi9yaXBwbGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy10YWInLFxyXG4gIG1peGluczogW0N1c3RvbUxpbmtNaXhpbiwgRGlzcGF0Y2hFdmVudE1peGluXSxcclxuICBwcm9wczoge1xyXG4gICAgYWN0aXZlOiBCb29sZWFuLFxyXG4gICAgaWNvbjogW1N0cmluZywgQXJyYXksIE9iamVjdF1cclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgc3R5bGVzOiB7fVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGhhc0ljb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLmljb24gfHwgdGhpcy4kc2xvdHMuaWNvbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy5pY29uKSA6IHt9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgaGFzVGV4dCgpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy4kc2xvdHMuZGVmYXVsdFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIGFjdGl2ZSh2YWx1ZSkge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb24uYWRhcHRlcl8ubm90aWZ5U2VsZWN0ZWQoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1RhYkZvdW5kYXRpb24oe1xyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXHJcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcclxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIGdldE9mZnNldFdpZHRoOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLm9mZnNldFdpZHRoXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldE9mZnNldExlZnQ6ICgpID0+IHRoaXMuJGVsLm9mZnNldExlZnQsXHJcbiAgICAgIG5vdGlmeVNlbGVjdGVkOiAoKSA9PiB7XHJcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KFxyXG4gICAgICAgICAgdGhpcy4kZWwsXHJcbiAgICAgICAgICBNRENUYWJGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsXHJcbiAgICAgICAgICB7IHRhYjogdGhpcyB9LFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcclxuICAgIHRoaXMuc2V0QWN0aXZlKHRoaXMuYWN0aXZlKVxyXG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxyXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBnZXRDb21wdXRlZFdpZHRoKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLmdldENvbXB1dGVkV2lkdGgoKVxyXG4gICAgfSxcclxuICAgIGdldENvbXB1dGVkTGVmdCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbi5nZXRDb21wdXRlZExlZnQoKVxyXG4gICAgfSxcclxuICAgIGlzQWN0aXZlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLmlzQWN0aXZlKClcclxuICAgIH0sXHJcbiAgICBzZXRBY3RpdmUoaXNBY3RpdmUpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldEFjdGl2ZShpc0FjdGl2ZSlcclxuICAgIH0sXHJcbiAgICBpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLnByZXZlbnRzRGVmYXVsdE9uQ2xpY2soKVxyXG4gICAgfSxcclxuICAgIHNldFByZXZlbnREZWZhdWx0T25DbGljayhwcmV2ZW50RGVmYXVsdE9uQ2xpY2spIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFByZXZlbnREZWZhdWx0T25DbGljayhwcmV2ZW50RGVmYXVsdE9uQ2xpY2spXHJcbiAgICB9LFxyXG4gICAgbWVhc3VyZVNlbGYoKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5tZWFzdXJlU2VsZigpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBub1ByZWZpeDogc3RyaW5nLFxuICogICB3ZWJraXRQcmVmaXg6IHN0cmluZyxcbiAqICAgc3R5bGVQcm9wZXJ0eTogc3RyaW5nXG4gKiB9fVxuICovXG5sZXQgVmVuZG9yUHJvcGVydHlNYXBUeXBlO1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGV2ZW50VHlwZU1hcCA9IHtcbiAgJ2FuaW1hdGlvbnN0YXJ0Jzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uc3RhcnQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0JyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbml0ZXJhdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAndHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGNzc1Byb3BlcnR5TWFwID0ge1xuICAnYW5pbWF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LWFuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2Zvcm0nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2Zvcm0nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB7XG4gIHJldHVybiAod2luZG93T2JqWydkb2N1bWVudCddICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddID09PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkge1xuICByZXR1cm4gKGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgfHwgZXZlbnRUeXBlIGluIGNzc1Byb3BlcnR5TWFwKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gbWFwXG4gKiBAcGFyYW0geyFFbGVtZW50fSBlbFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCkge1xuICByZXR1cm4gbWFwW2V2ZW50VHlwZV0uc3R5bGVQcm9wZXJ0eSBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgYnJvd3NlciBwcmVmaXggZm9yIENTUzMgYW5pbWF0aW9uIGV2ZW50c1xuICogYW5kIHByb3BlcnR5IG5hbWVzLlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICBpZiAoIWhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikgfHwgIWV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSkge1xuICAgIHJldHVybiBldmVudFR5cGU7XG4gIH1cblxuICBjb25zdCBtYXAgPSAvKiogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi8gKFxuICAgIGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgPyBldmVudFR5cGVNYXAgOiBjc3NQcm9wZXJ0eU1hcFxuICApO1xuICBjb25zdCBlbCA9IHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddKCdkaXYnKTtcbiAgbGV0IGV2ZW50TmFtZSA9ICcnO1xuXG4gIGlmIChtYXAgPT09IGV2ZW50VHlwZU1hcCkge1xuICAgIGV2ZW50TmFtZSA9IGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudE5hbWUgPSBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TmFtZTtcbn1cblxuLy8gUHVibGljIGZ1bmN0aW9ucyB0byBhY2Nlc3MgZ2V0QW5pbWF0aW9uTmFtZSgpIGZvciBKYXZhU2NyaXB0IGV2ZW50cyBvciBDU1Ncbi8vIHByb3BlcnR5IG5hbWVzLlxuXG5jb25zdCB0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMgPSBbJ3RyYW5zZm9ybScsICdXZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnTVNUcmFuc2Zvcm0nXTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0UHJvcGVydHlOYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuZXhwb3J0IHt0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMsIGdldENvcnJlY3RFdmVudE5hbWUsIGdldENvcnJlY3RQcm9wZXJ0eU5hbWV9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFVQR1JBREVEOiAnbWRjLXRhYi1iYXItdXBncmFkZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIFRBQl9TRUxFQ1RPUjogJy5tZGMtdGFiJyxcbiAgSU5ESUNBVE9SX1NFTEVDVE9SOiAnLm1kYy10YWItYmFyX19pbmRpY2F0b3InLFxuICBDSEFOR0VfRVZFTlQ6ICdNRENUYWJCYXI6Y2hhbmdlJyxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7Z2V0Q29ycmVjdFByb3BlcnR5TmFtZX0gZnJvbSAnQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleCc7XG5cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENUYWJCYXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBiaW5kT25NRENUYWJTZWxlY3RlZEV2ZW50OiAoKSA9PiB7fSxcbiAgICAgIHVuYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudDogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBnZXRPZmZzZXRXaWR0aDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBzZXRTdHlsZUZvckluZGljYXRvcjogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGdldE9mZnNldFdpZHRoRm9ySW5kaWNhdG9yOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIG5vdGlmeUNoYW5nZTogKC8qIGV2dERhdGE6IHthY3RpdmVUYWJJbmRleDogbnVtYmVyfSAqLykgPT4ge30sXG4gICAgICBnZXROdW1iZXJPZlRhYnM6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgaXNUYWJBY3RpdmVBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIHNldFRhYkFjdGl2ZUF0SW5kZXg6ICgvKiBpbmRleDogbnVtYmVyLCBpc0FjdGl2ZTogdHJ1ZSAqLykgPT4ge30sXG4gICAgICBpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrRm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICBzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2tGb3JUYWJBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciwgcHJldmVudERlZmF1bHRPbkNsaWNrOiBib29sZWFuICovKSA9PiB7fSxcbiAgICAgIG1lYXN1cmVUYWJBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4ge30sXG4gICAgICBnZXRDb21wdXRlZFdpZHRoRm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0Q29tcHV0ZWRMZWZ0Rm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIG51bWJlciAqLyAwLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENUYWJCYXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICB0aGlzLmlzSW5kaWNhdG9yU2hvd25fID0gZmFsc2U7XG4gICAgdGhpcy5jb21wdXRlZFdpZHRoXyA9IDA7XG4gICAgdGhpcy5jb21wdXRlZExlZnRfID0gMDtcbiAgICB0aGlzLmFjdGl2ZVRhYkluZGV4XyA9IDA7XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuVVBHUkFERUQpO1xuICAgIHRoaXMuYWRhcHRlcl8uYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudCgpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIGNvbnN0IGFjdGl2ZVRhYkluZGV4ID0gdGhpcy5maW5kQWN0aXZlVGFiSW5kZXhfKCk7XG4gICAgaWYgKGFjdGl2ZVRhYkluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiSW5kZXhfID0gYWN0aXZlVGFiSW5kZXg7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0KCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgdGhpcy5hZGFwdGVyXy51bmJpbmRPbk1EQ1RhYlNlbGVjdGVkRXZlbnQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZm9yRWFjaFRhYkluZGV4XygoaW5kZXgpID0+IHRoaXMuYWRhcHRlcl8ubWVhc3VyZVRhYkF0SW5kZXgoaW5kZXgpKTtcbiAgICB0aGlzLmNvbXB1dGVkV2lkdGhfID0gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aCgpO1xuICAgIHRoaXMubGF5b3V0SW5kaWNhdG9yXygpO1xuICB9XG5cbiAgbGF5b3V0SW5kaWNhdG9yXygpIHtcbiAgICBjb25zdCBpc0luZGljYXRvckZpcnN0UmVuZGVyID0gIXRoaXMuaXNJbmRpY2F0b3JTaG93bl87XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpbmRpY2F0b3IgYXBwZWFycyBpbiB0aGUgcmlnaHQgcG9zaXRpb24gaW1tZWRpYXRlbHkgZm9yIGNvcnJlY3QgZmlyc3QgcmVuZGVyLlxuICAgIGlmIChpc0luZGljYXRvckZpcnN0UmVuZGVyKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9ySW5kaWNhdG9yKCd0cmFuc2l0aW9uJywgJ25vbmUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2xhdGVBbXRGb3JBY3RpdmVUYWJMZWZ0ID0gdGhpcy5hZGFwdGVyXy5nZXRDb21wdXRlZExlZnRGb3JUYWJBdEluZGV4KHRoaXMuYWN0aXZlVGFiSW5kZXhfKTtcbiAgICBjb25zdCBzY2FsZUFtdEZvckFjdGl2ZVRhYldpZHRoID1cbiAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0Q29tcHV0ZWRXaWR0aEZvclRhYkF0SW5kZXgodGhpcy5hY3RpdmVUYWJJbmRleF8pIC8gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aCgpO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtVmFsdWUgPSBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZUFtdEZvckFjdGl2ZVRhYkxlZnR9cHgpIHNjYWxlKCR7c2NhbGVBbXRGb3JBY3RpdmVUYWJXaWR0aH0sIDEpYDtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9ySW5kaWNhdG9yKGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93LCAndHJhbnNmb3JtJyksIHRyYW5zZm9ybVZhbHVlKTtcblxuICAgIGlmIChpc0luZGljYXRvckZpcnN0UmVuZGVyKSB7XG4gICAgICAvLyBGb3JjZSBsYXlvdXQgc28gdGhhdCB0cmFuc2Zvcm0gc3R5bGVzIHRvIHRha2UgZWZmZWN0LlxuICAgICAgdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aEZvckluZGljYXRvcigpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZUZvckluZGljYXRvcigndHJhbnNpdGlvbicsICcnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVGb3JJbmRpY2F0b3IoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgdGhpcy5pc0luZGljYXRvclNob3duXyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZmluZEFjdGl2ZVRhYkluZGV4XygpIHtcbiAgICBsZXQgYWN0aXZlVGFiSW5kZXggPSAtMTtcbiAgICB0aGlzLmZvckVhY2hUYWJJbmRleF8oKGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1RhYkFjdGl2ZUF0SW5kZXgoaW5kZXgpKSB7XG4gICAgICAgIGFjdGl2ZVRhYkluZGV4ID0gaW5kZXg7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBhY3RpdmVUYWJJbmRleDtcbiAgfVxuXG4gIGZvckVhY2hUYWJJbmRleF8oaXRlcmF0b3IpIHtcbiAgICBjb25zdCBudW1UYWJzID0gdGhpcy5hZGFwdGVyXy5nZXROdW1iZXJPZlRhYnMoKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbnVtVGFiczsgaW5kZXgrKykge1xuICAgICAgY29uc3Qgc2hvdWxkQnJlYWsgPSBpdGVyYXRvcihpbmRleCk7XG4gICAgICBpZiAoc2hvdWxkQnJlYWspIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cblxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICBzd2l0Y2hUb1RhYkF0SW5kZXgoaW5kZXgsIHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5hY3RpdmVUYWJJbmRleF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZUYWJzKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3V0IG9mIGJvdW5kcyBpbmRleCBzcGVjaWZpZWQgZm9yIHRhYjogJHtpbmRleH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2QWN0aXZlVGFiSW5kZXggPSB0aGlzLmFjdGl2ZVRhYkluZGV4XztcbiAgICB0aGlzLmFjdGl2ZVRhYkluZGV4XyA9IGluZGV4O1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAocHJldkFjdGl2ZVRhYkluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJBY3RpdmVBdEluZGV4KHByZXZBY3RpdmVUYWJJbmRleCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJBY3RpdmVBdEluZGV4KHRoaXMuYWN0aXZlVGFiSW5kZXhfLCB0cnVlKTtcbiAgICAgIHRoaXMubGF5b3V0SW5kaWNhdG9yXygpO1xuICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSh7YWN0aXZlVGFiSW5kZXg6IHRoaXMuYWN0aXZlVGFiSW5kZXhffSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRBY3RpdmVUYWJJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWN0aXZlVGFiSW5kZXhfKCk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPG5hdiBcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXG4gICAgY2xhc3M9XCJtZGMtdGFiLWJhclwiIFxuICAgIHYtb249XCIkbGlzdGVuZXJzXCI+XG4gICAgPHNsb3QvPlxuICAgIDxzcGFuIFxuICAgICAgcmVmPVwiaW5kaWNhdG9yXCIgXG4gICAgICA6c3R5bGU9XCJpbmRpY2F0b3JTdHlsZXNcIlxuICAgICAgY2xhc3M9XCJtZGMtdGFiLWJhcl9faW5kaWNhdG9yXCIvPlxuICA8L25hdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDVGFiQmFyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGFicy90YWItYmFyL2ZvdW5kYXRpb24nXG5pbXBvcnQgTURDVGFiRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGFicy90YWIvZm91bmRhdGlvbidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXRhYi1iYXInLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIGluZGljYXRvclN0eWxlczoge30sXG4gICAgICB0YWJzOiBbXVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDVGFiQmFyRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXG4gICAgICBiaW5kT25NRENUYWJTZWxlY3RlZEV2ZW50OiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgTURDVGFiRm91bmRhdGlvbi5zdHJpbmdzLlNFTEVDVEVEX0VWRU5ULFxuICAgICAgICAgIHRoaXMub25TZWxlY3RcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHVuYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudDogKCkgPT5cbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBNRENUYWJGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsXG4gICAgICAgICAgdGhpcy5vblNlbGVjdFxuICAgICAgICApLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIGdldE9mZnNldFdpZHRoOiAoKSA9PiB0aGlzLiRlbC5vZmZzZXRXaWR0aCxcbiAgICAgIHNldFN0eWxlRm9ySW5kaWNhdG9yOiAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT5cbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuaW5kaWNhdG9yU3R5bGVzLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKSxcbiAgICAgIGdldE9mZnNldFdpZHRoRm9ySW5kaWNhdG9yOiAoKSA9PiB0aGlzLiRyZWZzLmluZGljYXRvci5vZmZzZXRXaWR0aCxcbiAgICAgIG5vdGlmeUNoYW5nZTogZXZ0RGF0YSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGV2dERhdGEuYWN0aXZlVGFiSW5kZXgpXG4gICAgICB9LFxuICAgICAgZ2V0TnVtYmVyT2ZUYWJzOiAoKSA9PiB0aGlzLnRhYnMubGVuZ3RoLFxuICAgICAgaXNUYWJBY3RpdmVBdEluZGV4OiBpbmRleCA9PiB0aGlzLnRhYnNbaW5kZXhdLmlzQWN0aXZlKCksXG4gICAgICBzZXRUYWJBY3RpdmVBdEluZGV4OiAoaW5kZXgsIGlzQWN0aXZlKSA9PiB7XG4gICAgICAgIC8vIHBnYnI6IDIwMTgtMDQtMDdcbiAgICAgICAgLy8gc2luY2UgaXQgaXMgcG9zc2libGUgdG8gY2hhbmdlIHRoZSBudW1iZXIgb2YgdGFicyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgICAgLy8gd2UgbmVlZCB0byBkZXRlY3QgdGhlIGZvdW5kYXRpb24gZGVhY3RpdmF0aW5nIGEgdGFiXG4gICAgICAgIC8vIHRoYXQgbm8gbG9uZ2VyIGV4aXN0cyBidXQgd2FzIHByZXZpb3VzbHkgYWN0aXZlLlxuICAgICAgICBpZiAoIWlzQWN0aXZlICYmIGluZGV4ID49IHRoaXMudGFicy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhYnNbaW5kZXhdLnNldEFjdGl2ZShpc0FjdGl2ZSlcbiAgICAgIH0sXG4gICAgICBpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrRm9yVGFiQXRJbmRleDogaW5kZXggPT5cbiAgICAgICAgdGhpcy50YWJzW2luZGV4XS5pc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrKCksXG4gICAgICBzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2tGb3JUYWJBdEluZGV4OiAoaW5kZXgsIHByZXZlbnREZWZhdWx0T25DbGljaykgPT4ge1xuICAgICAgICB0aGlzLnRhYnNbaW5kZXhdLnNldFByZXZlbnREZWZhdWx0T25DbGljayhwcmV2ZW50RGVmYXVsdE9uQ2xpY2spXG4gICAgICB9LFxuICAgICAgbWVhc3VyZVRhYkF0SW5kZXg6IGluZGV4ID0+IHRoaXMudGFic1tpbmRleF0ubWVhc3VyZVNlbGYoKSxcbiAgICAgIGdldENvbXB1dGVkV2lkdGhGb3JUYWJBdEluZGV4OiBpbmRleCA9PlxuICAgICAgICB0aGlzLnRhYnNbaW5kZXhdLmdldENvbXB1dGVkV2lkdGgoKSxcbiAgICAgIGdldENvbXB1dGVkTGVmdEZvclRhYkF0SW5kZXg6IGluZGV4ID0+IHRoaXMudGFic1tpbmRleF0uZ2V0Q29tcHV0ZWRMZWZ0KClcbiAgICB9KVxuXG4gICAgY29uc3QgcmVzZXRUYWJzID0gKCkgPT4ge1xuICAgICAgY29uc3QgdGFiRWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKFxuICAgICAgICB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKE1EQ1RhYkJhckZvdW5kYXRpb24uc3RyaW5ncy5UQUJfU0VMRUNUT1IpXG4gICAgICApXG4gICAgICB0aGlzLnRhYnMgPSB0YWJFbGVtZW50cy5tYXAoZWwgPT4gZWwuX192dWVfXylcblxuICAgICAgbGV0IGhhc1RleHQsIGhhc0ljb25cbiAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnNcbiAgICAgIGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XG4gICAgICAgIGlmICh0YWIuaGFzVGV4dCkge1xuICAgICAgICAgIGhhc1RleHQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgdGFiIG9mIHRhYnMpIHtcbiAgICAgICAgaWYgKHRhYi5oYXNJY29uKSB7XG4gICAgICAgICAgaGFzSWNvbiA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNUZXh0ICYmIGhhc0ljb24pIHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy10YWItYmFyLS1pY29ucy13aXRoLXRleHQnLCB0cnVlKVxuICAgICAgfSBlbHNlIGlmIChoYXNJY29uKSB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtdGFiLWJhci0taWNvbi10YWItYmFyJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZm91bmRhdGlvbikge1xuICAgICAgICBjb25zdCBhY3RpdmVUYWJJbmRleCA9IHRoaXMuZm91bmRhdGlvbi5nZXRBY3RpdmVUYWJJbmRleCgpXG4gICAgICAgIGlmIChhY3RpdmVUYWJJbmRleCA+PSAwKSB7XG4gICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnN3aXRjaFRvVGFiQXRJbmRleChhY3RpdmVUYWJJbmRleCwgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmZvdW5kYXRpb24uc3dpdGNoVG9UYWJBdEluZGV4KDAsIHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLmxheW91dCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRUYWJzKClcblxuICAgIHRoaXMuc2xvdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gcmVzZXRUYWJzKCkpXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLiRlbCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSlcblxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLnNsb3RPYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvblNlbGVjdCh7IGRldGFpbCB9KSB7XG4gICAgICBjb25zdCB7IHRhYiB9ID0gZGV0YWlsXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMudGFicy5pbmRleE9mKHRhYilcbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZGMtdGFiLWJhciBpbnRlcm5hbCBlcnJvcjogaW5kZXggbm90IGZvdW5kJylcbiAgICAgIH1cbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zd2l0Y2hUb1RhYkF0SW5kZXgoaW5kZXgsIHRydWUpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1RhYiBmcm9tICcuL21kYy10YWIudnVlJ1xuaW1wb3J0IG1kY1RhYkJhciBmcm9tICcuL21kYy10YWItYmFyLnZ1ZSdcblxuZXhwb3J0IHsgbWRjVGFiLCBtZGNUYWJCYXIgfVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjVGFiLFxuICBtZGNUYWJCYXJcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJDdXN0b21MaW5rIiwiZnVuY3Rpb25hbCIsInByb3BzIiwidGFnIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJsaW5rIiwiT2JqZWN0IiwicmVuZGVyIiwiaCIsImNvbnRleHQiLCJlbGVtZW50IiwiZGF0YSIsImJhYmVsSGVscGVycy5leHRlbmRzIiwicGFyZW50IiwiJHJvdXRlciIsIiRyb290IiwiJG9wdGlvbnMiLCJvbiIsImNsaWNrIiwibmF0aXZlT24iLCJjaGlsZHJlbiIsIkN1c3RvbUxpbmtNaXhpbiIsInRvIiwiZXhhY3QiLCJCb29sZWFuIiwiYXBwZW5kIiwicmVwbGFjZSIsImFjdGl2ZUNsYXNzIiwiZXhhY3RBY3RpdmVDbGFzcyIsImNvbXB1dGVkIiwiZW1pdEN1c3RvbUV2ZW50IiwiZWwiLCJldnRUeXBlIiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiYnViYmxlcyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiZXh0cmFjdEljb25Qcm9wIiwiaWNvblByb3AiLCJjbGFzc2VzIiwiY29udGVudCIsIkFycmF5IiwicmVkdWNlIiwicmVzdWx0IiwidmFsdWUiLCJjbGFzc05hbWUiLCJzcGxpdCIsInRleHRDb250ZW50IiwiRGlzcGF0Y2hFdmVudE1peGluIiwiZXZlbnQiLCJtZXRob2RzIiwiJGVtaXQiLCJ0YXJnZXQiLCJldmVudFRhcmdldCIsImFyZ3MiLCJldmVudEFyZ3MiLCJsaXN0ZW5lcnMiLCIkbGlzdGVuZXJzIiwiZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiY3NzQ2xhc3NlcyIsIkFDVElWRSIsInN0cmluZ3MiLCJTRUxFQ1RFRF9FVkVOVCIsIk1EQ1RhYkZvdW5kYXRpb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZ2V0T2Zmc2V0V2lkdGgiLCJnZXRPZmZzZXRMZWZ0Iiwibm90aWZ5U2VsZWN0ZWQiLCJkZWZhdWx0QWRhcHRlciIsImNvbXB1dGVkV2lkdGhfIiwiY29tcHV0ZWRMZWZ0XyIsImlzQWN0aXZlXyIsInByZXZlbnREZWZhdWx0T25DbGlja18iLCJjbGlja0hhbmRsZXJfIiwicHJldmVudERlZmF1bHQiLCJrZXlkb3duSGFuZGxlcl8iLCJrZXlDb2RlIiwiaXNBY3RpdmUiLCJwcmV2ZW50RGVmYXVsdE9uQ2xpY2siLCJNRENSaXBwbGVBZGFwdGVyIiwiaGFuZGxlciIsInZhck5hbWUiLCJST09UIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsImZpbHRlciIsInAiLCJwb3AiLCJnZXROb3JtYWxpemVkRXZlbnRDb29yZHMiLCJldiIsInBhZ2VPZmZzZXQiLCJjbGllbnRSZWN0IiwieCIsInkiLCJkb2N1bWVudFgiLCJsZWZ0IiwiZG9jdW1lbnRZIiwidG9wIiwibm9ybWFsaXplZFgiLCJub3JtYWxpemVkWSIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIkFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsImFjdGl2YXRlZFRhcmdldHMiLCJNRENSaXBwbGVGb3VuZGF0aW9uIiwiYnJvd3NlclN1cHBvcnRzQ3NzVmFycyIsImlzVW5ib3VuZGVkIiwiaXNTdXJmYWNlQWN0aXZlIiwiaXNTdXJmYWNlRGlzYWJsZWQiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJjb21wdXRlQm91bmRpbmdSZWN0IiwiZ2V0V2luZG93UGFnZU9mZnNldCIsImxheW91dEZyYW1lXyIsImZyYW1lXyIsIndpZHRoIiwiaGVpZ2h0IiwiYWN0aXZhdGlvblN0YXRlXyIsImRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfIiwiaW5pdGlhbFNpemVfIiwibWF4UmFkaXVzXyIsImFjdGl2YXRlSGFuZGxlcl8iLCJhY3RpdmF0ZV8iLCJkZWFjdGl2YXRlSGFuZGxlcl8iLCJkZWFjdGl2YXRlXyIsImZvY3VzSGFuZGxlcl8iLCJoYW5kbGVGb2N1cyIsImJsdXJIYW5kbGVyXyIsImhhbmRsZUJsdXIiLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsInVuYm91bmRlZENvb3Jkc18iLCJmZ1NjYWxlXyIsImFjdGl2YXRpb25UaW1lcl8iLCJmZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8iLCJhY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfIiwiYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfIiwicnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfIiwiaXNBY3RpdmF0ZWQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsIndhc0FjdGl2YXRlZEJ5UG9pbnRlciIsIndhc0VsZW1lbnRNYWRlQWN0aXZlIiwiYWN0aXZhdGlvbkV2ZW50IiwiaXNQcm9ncmFtbWF0aWMiLCJpc1N1cHBvcnRlZF8iLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXlvdXRJbnRlcm5hbF8iLCJjbGVhclRpbWVvdXQiLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZW1vdmVDc3NWYXJzXyIsImZvckVhY2giLCJrZXlzIiwiayIsImluZGV4T2YiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJsZW5ndGgiLCJzb21lIiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwicHVzaCIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwiY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8iLCJhbmltYXRlQWN0aXZhdGlvbl8iLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJzZXRUaW1lb3V0IiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCIkZWwiLCJkaXNhYmxlZCIsIiRzZXQiLCIkZGVsZXRlIiwiY29udGFpbnMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIm1peGlucyIsImFjdGl2ZSIsImljb24iLCJoYXNJY29uIiwiJHNsb3RzIiwiaGFzVGV4dCIsIndhdGNoIiwiZm91bmRhdGlvbiIsIm1vdW50ZWQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldExlZnQiLCJ0YWIiLCJpbml0Iiwic2V0QWN0aXZlIiwicmlwcGxlIiwiYmVmb3JlRGVzdHJveSIsImRlc3Ryb3kiLCJnZXRDb21wdXRlZFdpZHRoIiwiZ2V0Q29tcHV0ZWRMZWZ0IiwiaXNEZWZhdWx0UHJldmVudGVkT25DbGljayIsInByZXZlbnRzRGVmYXVsdE9uQ2xpY2siLCJzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2siLCJtZWFzdXJlU2VsZiIsImV2ZW50VHlwZU1hcCIsIm5vUHJlZml4Iiwid2Via2l0UHJlZml4Iiwic3R5bGVQcm9wZXJ0eSIsImNzc1Byb3BlcnR5TWFwIiwiaGFzUHJvcGVyU2hhcGUiLCJldmVudEZvdW5kSW5NYXBzIiwiZXZlbnRUeXBlIiwiZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZSIsIm1hcCIsInN0eWxlIiwiZ2V0QW5pbWF0aW9uTmFtZSIsImV2ZW50TmFtZSIsImdldENvcnJlY3RQcm9wZXJ0eU5hbWUiLCJVUEdSQURFRCIsIlRBQl9TRUxFQ1RPUiIsIklORElDQVRPUl9TRUxFQ1RPUiIsIkNIQU5HRV9FVkVOVCIsIk1EQ1RhYkJhckZvdW5kYXRpb24iLCJiaW5kT25NRENUYWJTZWxlY3RlZEV2ZW50IiwidW5iaW5kT25NRENUYWJTZWxlY3RlZEV2ZW50Iiwic2V0U3R5bGVGb3JJbmRpY2F0b3IiLCJnZXRPZmZzZXRXaWR0aEZvckluZGljYXRvciIsIm5vdGlmeUNoYW5nZSIsImdldE51bWJlck9mVGFicyIsImlzVGFiQWN0aXZlQXRJbmRleCIsInNldFRhYkFjdGl2ZUF0SW5kZXgiLCJpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrRm9yVGFiQXRJbmRleCIsInNldFByZXZlbnREZWZhdWx0T25DbGlja0ZvclRhYkF0SW5kZXgiLCJtZWFzdXJlVGFiQXRJbmRleCIsImdldENvbXB1dGVkV2lkdGhGb3JUYWJBdEluZGV4IiwiZ2V0Q29tcHV0ZWRMZWZ0Rm9yVGFiQXRJbmRleCIsImlzSW5kaWNhdG9yU2hvd25fIiwiYWN0aXZlVGFiSW5kZXhfIiwiYWN0aXZlVGFiSW5kZXgiLCJmaW5kQWN0aXZlVGFiSW5kZXhfIiwiZm9yRWFjaFRhYkluZGV4XyIsImluZGV4IiwibGF5b3V0SW5kaWNhdG9yXyIsImlzSW5kaWNhdG9yRmlyc3RSZW5kZXIiLCJ0cmFuc2xhdGVBbXRGb3JBY3RpdmVUYWJMZWZ0Iiwic2NhbGVBbXRGb3JBY3RpdmVUYWJXaWR0aCIsInRyYW5zZm9ybVZhbHVlIiwiaXRlcmF0b3IiLCJudW1UYWJzIiwic2hvdWxkQnJlYWsiLCJzaG91bGROb3RpZnkiLCJFcnJvciIsInByZXZBY3RpdmVUYWJJbmRleCIsImluZGljYXRvclN0eWxlcyIsInRhYnMiLCJvblNlbGVjdCIsInByb3BlcnR5TmFtZSIsIiRyZWZzIiwiaW5kaWNhdG9yIiwicmVzZXRUYWJzIiwidGFiRWxlbWVudHMiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiX192dWVfXyIsImdldEFjdGl2ZVRhYkluZGV4Iiwic3dpdGNoVG9UYWJBdEluZGV4Iiwic2xvdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZGlzY29ubmVjdCIsIm1kY1RhYiIsIm1kY1RhYkJhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0VBQy9CO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0VBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUN4QztFQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0VBQ0Q7RUFDRCxNQUFJRixJQUFKLEVBQVU7RUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0VBQ0Q7RUFDRjs7RUNaTSxTQUFTTSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztFQUNyQyxTQUFPO0VBQ0xDLGFBQVMsUUFESjtFQUVMQyxhQUFTLHFCQUFNO0VBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCSCxVQUFoQixFQUE0QjtFQUMxQixZQUFJSSxZQUFZSixXQUFXRyxHQUFYLENBQWhCO0VBQ0FFLFdBQUdELFNBQUgsQ0FBYUEsVUFBVUUsSUFBdkIsRUFBNkJGLFNBQTdCO0VBQ0Q7RUFDRixLQVBJO0VBUUxKO0VBUkssR0FBUDtFQVVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQ1hNLElBQU1PLGFBQWE7RUFDeEJELFFBQU0sYUFEa0I7RUFFeEJFLGNBQVksSUFGWTtFQUd4QkMsU0FBTztFQUNMQyxTQUFLLEVBQUVDLE1BQU1DLE1BQVIsRUFBZ0JDLFNBQVMsR0FBekIsRUFEQTtFQUVMQyxVQUFNQztFQUZE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
