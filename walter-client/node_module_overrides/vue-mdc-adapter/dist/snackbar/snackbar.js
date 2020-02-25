/**
* @module vue-mdc-adaptersnackbar 0.17.0
* @exports VueMDCSnackbar
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCSnackbar = factory());
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
      ROOT: 'mdc-snackbar',
      TEXT: 'mdc-snackbar__text',
      ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
      ACTION_BUTTON: 'mdc-snackbar__action-button',
      ACTIVE: 'mdc-snackbar--active',
      MULTILINE: 'mdc-snackbar--multiline',
      ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom'
    };

    var strings = {
      TEXT_SELECTOR: '.mdc-snackbar__text',
      ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
      ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
      SHOW_EVENT: 'MDCSnackbar:show',
      HIDE_EVENT: 'MDCSnackbar:hide'
    };

    var numbers = {
      MESSAGE_TIMEOUT: 2750
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

    var MDCSnackbarFoundation = function (_MDCFoundation) {
      inherits(MDCSnackbarFoundation, _MDCFoundation);
      createClass(MDCSnackbarFoundation, [{
        key: 'active',
        get: function get$$1() {
          return this.active_;
        }
      }], [{
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
            setAriaHidden: function setAriaHidden() {},
            unsetAriaHidden: function unsetAriaHidden() {},
            setActionAriaHidden: function setActionAriaHidden() {},
            unsetActionAriaHidden: function unsetActionAriaHidden() {},
            setActionText: function setActionText() /* actionText: string */{},
            setMessageText: function setMessageText() /* message: string */{},
            setFocus: function setFocus() {},
            visibilityIsHidden: function visibilityIsHidden() {
              return (/* boolean */false
              );
            },
            registerCapturedBlurHandler: function registerCapturedBlurHandler() /* handler: EventListener */{},
            deregisterCapturedBlurHandler: function deregisterCapturedBlurHandler() /* handler: EventListener */{},
            registerVisibilityChangeHandler: function registerVisibilityChangeHandler() /* handler: EventListener */{},
            deregisterVisibilityChangeHandler: function deregisterVisibilityChangeHandler() /* handler: EventListener */{},
            registerCapturedInteractionHandler: function registerCapturedInteractionHandler() /* evtType: string, handler: EventListener */{},
            deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler() /* evtType: string, handler: EventListener */{},
            registerActionClickHandler: function registerActionClickHandler() /* handler: EventListener */{},
            deregisterActionClickHandler: function deregisterActionClickHandler() /* handler: EventListener */{},
            registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
            deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
            notifyShow: function notifyShow() {},
            notifyHide: function notifyHide() {}
          };
        }
      }]);

      function MDCSnackbarFoundation(adapter) {
        classCallCheck(this, MDCSnackbarFoundation);

        var _this = possibleConstructorReturn(this, (MDCSnackbarFoundation.__proto__ || Object.getPrototypeOf(MDCSnackbarFoundation)).call(this, _extends(MDCSnackbarFoundation.defaultAdapter, adapter)));

        _this.active_ = false;
        _this.actionWasClicked_ = false;
        _this.dismissOnAction_ = true;
        _this.firstFocus_ = true;
        _this.pointerDownRecognized_ = false;
        _this.snackbarHasFocus_ = false;
        _this.snackbarData_ = null;
        _this.queue_ = [];
        _this.actionClickHandler_ = function () {
          _this.actionWasClicked_ = true;
          _this.invokeAction_();
        };
        _this.visibilitychangeHandler_ = function () {
          clearTimeout(_this.timeoutId_);
          _this.snackbarHasFocus_ = true;

          if (!_this.adapter_.visibilityIsHidden()) {
            setTimeout(_this.cleanup_.bind(_this), _this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
          }
        };
        _this.interactionHandler_ = function (evt) {
          if (evt.type == 'touchstart' || evt.type == 'mousedown') {
            _this.pointerDownRecognized_ = true;
          }
          _this.handlePossibleTabKeyboardFocus_(evt);

          if (evt.type == 'focus') {
            _this.pointerDownRecognized_ = false;
          }
        };
        _this.blurHandler_ = function () {
          clearTimeout(_this.timeoutId_);
          _this.snackbarHasFocus_ = false;
          _this.timeoutId_ = setTimeout(_this.cleanup_.bind(_this), _this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
        };
        return _this;
      }

      createClass(MDCSnackbarFoundation, [{
        key: 'init',
        value: function init() {
          this.adapter_.registerActionClickHandler(this.actionClickHandler_);
          this.adapter_.setAriaHidden();
          this.adapter_.setActionAriaHidden();
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this2 = this;

          this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
          this.adapter_.deregisterCapturedBlurHandler(this.blurHandler_);
          this.adapter_.deregisterVisibilityChangeHandler(this.visibilitychangeHandler_);
          ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
            _this2.adapter_.deregisterCapturedInteractionHandler(evtType, _this2.interactionHandler_);
          });
        }
      }, {
        key: 'dismissesOnAction',
        value: function dismissesOnAction() {
          return this.dismissOnAction_;
        }
      }, {
        key: 'setDismissOnAction',
        value: function setDismissOnAction(dismissOnAction) {
          this.dismissOnAction_ = !!dismissOnAction;
        }
      }, {
        key: 'show',
        value: function show(data) {
          var _this3 = this;

          if (!data) {
            throw new Error('Please provide a data object with at least a message to display.');
          }
          if (!data.message) {
            throw new Error('Please provide a message to be displayed.');
          }
          if (data.actionHandler && !data.actionText) {
            throw new Error('Please provide action text with the handler.');
          }
          if (this.active) {
            this.queue_.push(data);
            return;
          }
          clearTimeout(this.timeoutId_);
          this.snackbarData_ = data;
          this.firstFocus_ = true;
          this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
          this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
          ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
            _this3.adapter_.registerCapturedInteractionHandler(evtType, _this3.interactionHandler_);
          });

          var ACTIVE = cssClasses.ACTIVE,
              MULTILINE = cssClasses.MULTILINE,
              ACTION_ON_BOTTOM = cssClasses.ACTION_ON_BOTTOM;


          this.adapter_.setMessageText(this.snackbarData_.message);

          if (this.snackbarData_.multiline) {
            this.adapter_.addClass(MULTILINE);
            if (this.snackbarData_.actionOnBottom) {
              this.adapter_.addClass(ACTION_ON_BOTTOM);
            }
          }

          if (this.snackbarData_.actionHandler) {
            this.adapter_.setActionText(this.snackbarData_.actionText);
            this.actionHandler_ = this.snackbarData_.actionHandler;
            this.setActionHidden_(false);
          } else {
            this.setActionHidden_(true);
            this.actionHandler_ = null;
            this.adapter_.setActionText(null);
          }

          this.active_ = true;
          this.adapter_.addClass(ACTIVE);
          this.adapter_.unsetAriaHidden();
          this.adapter_.notifyShow();

          this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
        }
      }, {
        key: 'handlePossibleTabKeyboardFocus_',
        value: function handlePossibleTabKeyboardFocus_() {
          var hijackFocus = this.firstFocus_ && !this.pointerDownRecognized_;

          if (hijackFocus) {
            this.setFocusOnAction_();
          }

          this.firstFocus_ = false;
        }
      }, {
        key: 'setFocusOnAction_',
        value: function setFocusOnAction_() {
          this.adapter_.setFocus();
          this.snackbarHasFocus_ = true;
          this.firstFocus_ = false;
        }
      }, {
        key: 'invokeAction_',
        value: function invokeAction_() {
          try {
            if (!this.actionHandler_) {
              return;
            }

            this.actionHandler_();
          } finally {
            if (this.dismissOnAction_) {
              this.cleanup_();
            }
          }
        }
      }, {
        key: 'cleanup_',
        value: function cleanup_() {
          var _this4 = this;

          var allowDismissal = !this.snackbarHasFocus_ || this.actionWasClicked_;

          if (allowDismissal) {
            var ACTIVE = cssClasses.ACTIVE,
                MULTILINE = cssClasses.MULTILINE,
                ACTION_ON_BOTTOM = cssClasses.ACTION_ON_BOTTOM;


            this.adapter_.removeClass(ACTIVE);

            var handler = function handler() {
              clearTimeout(_this4.timeoutId_);
              _this4.adapter_.deregisterTransitionEndHandler(handler);
              _this4.adapter_.removeClass(MULTILINE);
              _this4.adapter_.removeClass(ACTION_ON_BOTTOM);
              _this4.setActionHidden_(true);
              _this4.adapter_.setAriaHidden();
              _this4.active_ = false;
              _this4.snackbarHasFocus_ = false;
              _this4.adapter_.notifyHide();
              _this4.showNext_();
            };

            this.adapter_.registerTransitionEndHandler(handler);
          }
        }
      }, {
        key: 'showNext_',
        value: function showNext_() {
          if (!this.queue_.length) {
            return;
          }
          this.show(this.queue_.shift());
        }
      }, {
        key: 'setActionHidden_',
        value: function setActionHidden_(isHidden) {
          if (isHidden) {
            this.adapter_.setActionAriaHidden();
          } else {
            this.adapter_.unsetActionAriaHidden();
          }
        }
      }]);
      return MDCSnackbarFoundation;
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

    var mdcSnackbar = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticClass: "mdc-snackbar", class: _vm.classes, attrs: { "aria-hidden": _vm.hidden, "aria-live": "assertive", "aria-atomic": "true" } }, [_c('div', { staticClass: "mdc-snackbar__text" }, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _c('div', { staticClass: "mdc-snackbar__action-wrapper" }, [_c('button', { ref: "button", staticClass: "mdc-snackbar__action-button", attrs: { "aria-hidden": _vm.actionHidden, "type": "button" } }, [_vm._v(_vm._s(_vm.actionText))])])]);
      }, staticRenderFns: [],
      name: 'mdc-snackbar',
      model: {
        prop: 'snack',
        event: 'queued'
      },
      props: {
        'align-start': Boolean,
        snack: Object,
        event: String,
        'event-source': {
          type: Object,
          required: false,
          default: function _default() {
            return this.$root;
          }
        },
        'dismisses-on-action': {
          type: Boolean,
          default: true
        }
      },
      data: function data() {
        return {
          classes: {
            'mdc-snackbar--align-start': this.alignStart
          },
          message: '',
          actionText: '',
          hidden: false,
          actionHidden: false
        };
      },

      watch: {
        snack: 'onSnack'
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCSnackbarFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          setAriaHidden: function setAriaHidden() {
            return _this.hidden = true;
          },
          unsetAriaHidden: function unsetAriaHidden() {
            return _this.hidden = false;
          },
          setActionAriaHidden: function setActionAriaHidden() {
            return _this.actionHidden = true;
          },
          unsetActionAriaHidden: function unsetActionAriaHidden() {
            return _this.actionHidden = false;
          },
          setActionText: function setActionText(text) {
            _this.actionText = text;
          },
          setMessageText: function setMessageText(text) {
            _this.message = text;
          },
          setFocus: function setFocus() {
            return _this.$refs.button.focus();
          },
          visibilityIsHidden: function visibilityIsHidden() {
            return document.hidden;
          },
          registerCapturedBlurHandler: function registerCapturedBlurHandler(handler) {
            return _this.$refs.button.addEventListener('blur', handler, true);
          },
          deregisterCapturedBlurHandler: function deregisterCapturedBlurHandler(handler) {
            return _this.$refs.button.removeEventListener('blur', handler, true);
          },
          registerVisibilityChangeHandler: function registerVisibilityChangeHandler(handler) {
            return document.addEventListener('visibilitychange', handler);
          },
          deregisterVisibilityChangeHandler: function deregisterVisibilityChangeHandler(handler) {
            return document.removeEventListener('visibilitychange', handler);
          },
          registerCapturedInteractionHandler: function registerCapturedInteractionHandler(evt, handler) {
            return document.body.addEventListener(evt, handler, true);
          },
          deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler(evt, handler) {
            return document.body.removeEventListener(evt, handler, true);
          },
          registerActionClickHandler: function registerActionClickHandler(handler) {
            return _this.$refs.button.addEventListener('click', handler);
          },
          deregisterActionClickHandler: function deregisterActionClickHandler(handler) {
            return _this.$refs.button.removeEventListener('click', handler);
          },
          registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
            var root = _this.$refs.root;
            root && root.addEventListener(getCorrectEventName(window, 'transitionend'), handler);
          },
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
            var root = _this.$refs.root;
            root && root.removeEventListener(getCorrectEventName(window, 'transitionend'), handler);
          },
          notifyShow: function notifyShow() {
            return _this.$emit('show');
          },
          notifyHide: function notifyHide() {
            return _this.$emit('hide');
          }
        });
        this.foundation.init();

        // if event specified use it, else if no snack prop then use default.
        this.eventName = this.event || (this.snack === void 0 ? 'show-snackbar' : null);
        if (this.eventName) {
          this.eventSource.$on(this.eventName, this.show);
        }
        this.foundation.setDismissOnAction(this.dismissesOnAction);
      },
      beforeDestroy: function beforeDestroy() {
        if (this.eventSource) {
          this.eventSource.$off(this.eventName, this.show);
        }
        this.foundation.destroy();
      },

      methods: {
        onSnack: function onSnack(snack) {
          if (snack && snack.message) {
            this.foundation.show(snack);
            this.$emit('queued', snack);
          }
        },
        show: function show(data) {
          this.foundation.show(data);
        }
      }
    };

    var plugin = BasePlugin({
      mdcSnackbar: mdcSnackbar
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2tiYXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbmFja2Jhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NuYWNrYmFyL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc25hY2tiYXIvbWRjLXNuYWNrYmFyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvc25hY2tiYXIvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3NuYWNrYmFyL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiB2bSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9XG59XG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJjb25zdCBzY29wZSA9XG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcblxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XG4gIGJlZm9yZUNyZWF0ZSgpIHtcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IHtNRENGb3VuZGF0aW9uLCBNRENDb21wb25lbnR9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLXNuYWNrYmFyJyxcbiAgVEVYVDogJ21kYy1zbmFja2Jhcl9fdGV4dCcsXG4gIEFDVElPTl9XUkFQUEVSOiAnbWRjLXNuYWNrYmFyX19hY3Rpb24td3JhcHBlcicsXG4gIEFDVElPTl9CVVRUT046ICdtZGMtc25hY2tiYXJfX2FjdGlvbi1idXR0b24nLFxuICBBQ1RJVkU6ICdtZGMtc25hY2tiYXItLWFjdGl2ZScsXG4gIE1VTFRJTElORTogJ21kYy1zbmFja2Jhci0tbXVsdGlsaW5lJyxcbiAgQUNUSU9OX09OX0JPVFRPTTogJ21kYy1zbmFja2Jhci0tYWN0aW9uLW9uLWJvdHRvbScsXG59O1xuXG5leHBvcnQgY29uc3Qgc3RyaW5ncyA9IHtcbiAgVEVYVF9TRUxFQ1RPUjogJy5tZGMtc25hY2tiYXJfX3RleHQnLFxuICBBQ1RJT05fV1JBUFBFUl9TRUxFQ1RPUjogJy5tZGMtc25hY2tiYXJfX2FjdGlvbi13cmFwcGVyJyxcbiAgQUNUSU9OX0JVVFRPTl9TRUxFQ1RPUjogJy5tZGMtc25hY2tiYXJfX2FjdGlvbi1idXR0b24nLFxuICBTSE9XX0VWRU5UOiAnTURDU25hY2tiYXI6c2hvdycsXG4gIEhJREVfRVZFTlQ6ICdNRENTbmFja2JhcjpoaWRlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBudW1iZXJzID0ge1xuICBNRVNTQUdFX1RJTUVPVVQ6IDI3NTAsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURDU25hY2tiYXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBzZXRBcmlhSGlkZGVuOiAoKSA9PiB7fSxcbiAgICAgIHVuc2V0QXJpYUhpZGRlbjogKCkgPT4ge30sXG4gICAgICBzZXRBY3Rpb25BcmlhSGlkZGVuOiAoKSA9PiB7fSxcbiAgICAgIHVuc2V0QWN0aW9uQXJpYUhpZGRlbjogKCkgPT4ge30sXG4gICAgICBzZXRBY3Rpb25UZXh0OiAoLyogYWN0aW9uVGV4dDogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE1lc3NhZ2VUZXh0OiAoLyogbWVzc2FnZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldEZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIHZpc2liaWxpdHlJc0hpZGRlbjogKCkgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIHJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckNhcHR1cmVkQmx1ckhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJDYXB0dXJlZEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5U2hvdzogKCkgPT4ge30sXG4gICAgICBub3RpZnlIaWRlOiAoKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVfO1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU25hY2tiYXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmFjdGlvbldhc0NsaWNrZWRfID0gZmFsc2U7XG4gICAgdGhpcy5kaXNtaXNzT25BY3Rpb25fID0gdHJ1ZTtcbiAgICB0aGlzLmZpcnN0Rm9jdXNfID0gdHJ1ZTtcbiAgICB0aGlzLnBvaW50ZXJEb3duUmVjb2duaXplZF8gPSBmYWxzZTtcbiAgICB0aGlzLnNuYWNrYmFySGFzRm9jdXNfID0gZmFsc2U7XG4gICAgdGhpcy5zbmFja2JhckRhdGFfID0gbnVsbDtcbiAgICB0aGlzLnF1ZXVlXyA9IFtdO1xuICAgIHRoaXMuYWN0aW9uQ2xpY2tIYW5kbGVyXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aW9uV2FzQ2xpY2tlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5pbnZva2VBY3Rpb25fKCk7XG4gICAgfTtcbiAgICB0aGlzLnZpc2liaWxpdHljaGFuZ2VIYW5kbGVyXyA9ICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZF8pO1xuICAgICAgdGhpcy5zbmFja2Jhckhhc0ZvY3VzXyA9IHRydWU7XG5cbiAgICAgIGlmICghdGhpcy5hZGFwdGVyXy52aXNpYmlsaXR5SXNIaWRkZW4oKSkge1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY2xlYW51cF8uYmluZCh0aGlzKSwgdGhpcy5zbmFja2JhckRhdGFfLnRpbWVvdXQgfHwgbnVtYmVycy5NRVNTQUdFX1RJTUVPVVQpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC50eXBlID09ICd0b3VjaHN0YXJ0JyB8fCBldnQudHlwZSA9PSAnbW91c2Vkb3duJykge1xuICAgICAgICB0aGlzLnBvaW50ZXJEb3duUmVjb2duaXplZF8gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5oYW5kbGVQb3NzaWJsZVRhYktleWJvYXJkRm9jdXNfKGV2dCk7XG5cbiAgICAgIGlmIChldnQudHlwZSA9PSAnZm9jdXMnKSB7XG4gICAgICAgIHRoaXMucG9pbnRlckRvd25SZWNvZ25pemVkXyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SWRfKTtcbiAgICAgIHRoaXMuc25hY2tiYXJIYXNGb2N1c18gPSBmYWxzZTtcbiAgICAgIHRoaXMudGltZW91dElkXyA9IHNldFRpbWVvdXQodGhpcy5jbGVhbnVwXy5iaW5kKHRoaXMpLCB0aGlzLnNuYWNrYmFyRGF0YV8udGltZW91dCB8fCBudW1iZXJzLk1FU1NBR0VfVElNRU9VVCk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlcih0aGlzLmFjdGlvbkNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXJpYUhpZGRlbigpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QWN0aW9uQXJpYUhpZGRlbigpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXIodGhpcy5hY3Rpb25DbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyKHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlcih0aGlzLnZpc2liaWxpdHljaGFuZ2VIYW5kbGVyXyk7XG4gICAgWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93bicsICdmb2N1cyddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICBkaXNtaXNzZXNPbkFjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNtaXNzT25BY3Rpb25fO1xuICB9XG5cbiAgc2V0RGlzbWlzc09uQWN0aW9uKGRpc21pc3NPbkFjdGlvbikge1xuICAgIHRoaXMuZGlzbWlzc09uQWN0aW9uXyA9ICEhZGlzbWlzc09uQWN0aW9uO1xuICB9XG5cbiAgc2hvdyhkYXRhKSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdQbGVhc2UgcHJvdmlkZSBhIGRhdGEgb2JqZWN0IHdpdGggYXQgbGVhc3QgYSBtZXNzYWdlIHRvIGRpc3BsYXkuJyk7XG4gICAgfVxuICAgIGlmICghZGF0YS5tZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQuJyk7XG4gICAgfVxuICAgIGlmIChkYXRhLmFjdGlvbkhhbmRsZXIgJiYgIWRhdGEuYWN0aW9uVGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhY3Rpb24gdGV4dCB3aXRoIHRoZSBoYW5kbGVyLicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMucXVldWVfLnB1c2goZGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZF8pO1xuICAgIHRoaXMuc25hY2tiYXJEYXRhXyA9IGRhdGE7XG4gICAgdGhpcy5maXJzdEZvY3VzXyA9IHRydWU7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyKHRoaXMudmlzaWJpbGl0eWNoYW5nZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlcih0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93bicsICdmb2N1cyddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJDYXB0dXJlZEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLmludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuXG4gICAgY29uc3Qge0FDVElWRSwgTVVMVElMSU5FLCBBQ1RJT05fT05fQk9UVE9NfSA9IGNzc0NsYXNzZXM7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldE1lc3NhZ2VUZXh0KHRoaXMuc25hY2tiYXJEYXRhXy5tZXNzYWdlKTtcblxuICAgIGlmICh0aGlzLnNuYWNrYmFyRGF0YV8ubXVsdGlsaW5lKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1VTFRJTElORSk7XG4gICAgICBpZiAodGhpcy5zbmFja2JhckRhdGFfLmFjdGlvbk9uQm90dG9tKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoQUNUSU9OX09OX0JPVFRPTSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc25hY2tiYXJEYXRhXy5hY3Rpb25IYW5kbGVyKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEFjdGlvblRleHQodGhpcy5zbmFja2JhckRhdGFfLmFjdGlvblRleHQpO1xuICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyXyA9IHRoaXMuc25hY2tiYXJEYXRhXy5hY3Rpb25IYW5kbGVyO1xuICAgICAgdGhpcy5zZXRBY3Rpb25IaWRkZW5fKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRBY3Rpb25IaWRkZW5fKHRydWUpO1xuICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyXyA9IG51bGw7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEFjdGlvblRleHQobnVsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVfID0gdHJ1ZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEFDVElWRSk7XG4gICAgdGhpcy5hZGFwdGVyXy51bnNldEFyaWFIaWRkZW4oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeVNob3coKTtcblxuICAgIHRoaXMudGltZW91dElkXyA9IHNldFRpbWVvdXQodGhpcy5jbGVhbnVwXy5iaW5kKHRoaXMpLCB0aGlzLnNuYWNrYmFyRGF0YV8udGltZW91dCB8fCBudW1iZXJzLk1FU1NBR0VfVElNRU9VVCk7XG4gIH1cblxuICBoYW5kbGVQb3NzaWJsZVRhYktleWJvYXJkRm9jdXNfKCkge1xuICAgIGNvbnN0IGhpamFja0ZvY3VzID1cbiAgICAgIHRoaXMuZmlyc3RGb2N1c18gJiYgIXRoaXMucG9pbnRlckRvd25SZWNvZ25pemVkXztcblxuICAgIGlmIChoaWphY2tGb2N1cykge1xuICAgICAgdGhpcy5zZXRGb2N1c09uQWN0aW9uXygpO1xuICAgIH1cblxuICAgIHRoaXMuZmlyc3RGb2N1c18gPSBmYWxzZTtcbiAgfVxuXG4gIHNldEZvY3VzT25BY3Rpb25fKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0Rm9jdXMoKTtcbiAgICB0aGlzLnNuYWNrYmFySGFzRm9jdXNfID0gdHJ1ZTtcbiAgICB0aGlzLmZpcnN0Rm9jdXNfID0gZmFsc2U7XG4gIH1cblxuICBpbnZva2VBY3Rpb25fKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMuYWN0aW9uSGFuZGxlcl8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGlvbkhhbmRsZXJfKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICh0aGlzLmRpc21pc3NPbkFjdGlvbl8pIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwXygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsZWFudXBfKCkge1xuICAgIGNvbnN0IGFsbG93RGlzbWlzc2FsID0gIXRoaXMuc25hY2tiYXJIYXNGb2N1c18gfHwgdGhpcy5hY3Rpb25XYXNDbGlja2VkXztcblxuICAgIGlmIChhbGxvd0Rpc21pc3NhbCkge1xuICAgICAgY29uc3Qge0FDVElWRSwgTVVMVElMSU5FLCBBQ1RJT05fT05fQk9UVE9NfSA9IGNzc0NsYXNzZXM7XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoQUNUSVZFKTtcblxuICAgICAgY29uc3QgaGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkXyk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1VTFRJTElORSk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoQUNUSU9OX09OX0JPVFRPTSk7XG4gICAgICAgIHRoaXMuc2V0QWN0aW9uSGlkZGVuXyh0cnVlKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBcmlhSGlkZGVuKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlXyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNuYWNrYmFySGFzRm9jdXNfID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SGlkZSgpO1xuICAgICAgICB0aGlzLnNob3dOZXh0XygpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKGhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dOZXh0XygpIHtcbiAgICBpZiAoIXRoaXMucXVldWVfLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNob3codGhpcy5xdWV1ZV8uc2hpZnQoKSk7XG4gIH1cblxuICBzZXRBY3Rpb25IaWRkZW5fKGlzSGlkZGVuKSB7XG4gICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEFjdGlvbkFyaWFIaWRkZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy51bnNldEFjdGlvbkFyaWFIaWRkZW4oKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIG5vUHJlZml4OiBzdHJpbmcsXG4gKiAgIHdlYmtpdFByZWZpeDogc3RyaW5nLFxuICogICBzdHlsZVByb3BlcnR5OiBzdHJpbmdcbiAqIH19XG4gKi9cbmxldCBWZW5kb3JQcm9wZXJ0eU1hcFR5cGU7XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgZXZlbnRUeXBlTWFwID0ge1xuICAnYW5pbWF0aW9uc3RhcnQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25zdGFydCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uU3RhcnQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uaXRlcmF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25JdGVyYXRpb24nLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNpdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICd0cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgY3NzUHJvcGVydHlNYXAgPSB7XG4gICdhbmltYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zZm9ybSc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zZm9ybScsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2Zvcm0nLFxuICB9LFxuICAndHJhbnNpdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHtcbiAgcmV0dXJuICh3aW5kb3dPYmpbJ2RvY3VtZW50J10gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10gPT09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSB7XG4gIHJldHVybiAoZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCB8fCBldmVudFR5cGUgaW4gY3NzUHJvcGVydHlNYXApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSBtYXBcbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKSB7XG4gIHJldHVybiBtYXBbZXZlbnRUeXBlXS5zdHlsZVByb3BlcnR5IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGRldGVybWluZSBicm93c2VyIHByZWZpeCBmb3IgQ1NTMyBhbmltYXRpb24gZXZlbnRzXG4gKiBhbmQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIGlmICghaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB8fCAhZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpKSB7XG4gICAgcmV0dXJuIGV2ZW50VHlwZTtcbiAgfVxuXG4gIGNvbnN0IG1hcCA9IC8qKiBAdHlwZSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqLyAoXG4gICAgZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCA/IGV2ZW50VHlwZU1hcCA6IGNzc1Byb3BlcnR5TWFwXG4gICk7XG4gIGNvbnN0IGVsID0gd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10oJ2RpdicpO1xuICBsZXQgZXZlbnROYW1lID0gJyc7XG5cbiAgaWYgKG1hcCA9PT0gZXZlbnRUeXBlTWFwKSB7XG4gICAgZXZlbnROYW1lID0gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50TmFtZSA9IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG4gIH1cblxuICByZXR1cm4gZXZlbnROYW1lO1xufVxuXG4vLyBQdWJsaWMgZnVuY3Rpb25zIHRvIGFjY2VzcyBnZXRBbmltYXRpb25OYW1lKCkgZm9yIEphdmFTY3JpcHQgZXZlbnRzIG9yIENTU1xuLy8gcHJvcGVydHkgbmFtZXMuXG5cbmNvbnN0IHRyYW5zZm9ybVN0eWxlUHJvcGVydGllcyA9IFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdNU1RyYW5zZm9ybSddO1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RFdmVudE5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG5leHBvcnQge3RyYW5zZm9ybVN0eWxlUHJvcGVydGllcywgZ2V0Q29ycmVjdEV2ZW50TmFtZSwgZ2V0Q29ycmVjdFByb3BlcnR5TmFtZX07XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgXG4gICAgcmVmPVwicm9vdFwiIFxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiBcbiAgICA6YXJpYS1oaWRkZW49XCJoaWRkZW5cIiBcbiAgICBjbGFzcz1cIm1kYy1zbmFja2JhclwiIFxuICAgIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiIFxuICAgIGFyaWEtYXRvbWljPVwidHJ1ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtZGMtc25hY2tiYXJfX3RleHRcIj57eyBtZXNzYWdlIH19PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1zbmFja2Jhcl9fYWN0aW9uLXdyYXBwZXJcIj5cbiAgICAgIDxidXR0b24gXG4gICAgICAgIHJlZj1cImJ1dHRvblwiIFxuICAgICAgICA6YXJpYS1oaWRkZW49XCJhY3Rpb25IaWRkZW5cIiBcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxuICAgICAgICBjbGFzcz1cIm1kYy1zbmFja2Jhcl9fYWN0aW9uLWJ1dHRvblwiPnt7IGFjdGlvblRleHQgfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1EQ1NuYWNrYmFyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvc25hY2tiYXIvZm91bmRhdGlvbidcbmltcG9ydCB7IGdldENvcnJlY3RFdmVudE5hbWUgfSBmcm9tICdAbWF0ZXJpYWwvYW5pbWF0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtc25hY2tiYXInLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICdzbmFjaycsXG4gICAgZXZlbnQ6ICdxdWV1ZWQnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgJ2FsaWduLXN0YXJ0JzogQm9vbGVhbixcbiAgICBzbmFjazogT2JqZWN0LFxuICAgIGV2ZW50OiBTdHJpbmcsXG4gICAgJ2V2ZW50LXNvdXJjZSc6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyb290XG4gICAgICB9XG4gICAgfSxcbiAgICAnZGlzbWlzc2VzLW9uLWFjdGlvbic6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgICdtZGMtc25hY2tiYXItLWFsaWduLXN0YXJ0JzogdGhpcy5hbGlnblN0YXJ0XG4gICAgICB9LFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgICBhY3Rpb25UZXh0OiAnJyxcbiAgICAgIGhpZGRlbjogZmFsc2UsXG4gICAgICBhY3Rpb25IaWRkZW46IGZhbHNlXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHNuYWNrOiAnb25TbmFjaydcbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDU25hY2tiYXJGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcbiAgICAgIHNldEFyaWFIaWRkZW46ICgpID0+ICh0aGlzLmhpZGRlbiA9IHRydWUpLFxuICAgICAgdW5zZXRBcmlhSGlkZGVuOiAoKSA9PiAodGhpcy5oaWRkZW4gPSBmYWxzZSksXG4gICAgICBzZXRBY3Rpb25BcmlhSGlkZGVuOiAoKSA9PiAodGhpcy5hY3Rpb25IaWRkZW4gPSB0cnVlKSxcbiAgICAgIHVuc2V0QWN0aW9uQXJpYUhpZGRlbjogKCkgPT4gKHRoaXMuYWN0aW9uSGlkZGVuID0gZmFsc2UpLFxuICAgICAgc2V0QWN0aW9uVGV4dDogdGV4dCA9PiB7XG4gICAgICAgIHRoaXMuYWN0aW9uVGV4dCA9IHRleHRcbiAgICAgIH0sXG4gICAgICBzZXRNZXNzYWdlVGV4dDogdGV4dCA9PiB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRleHRcbiAgICAgIH0sXG4gICAgICBzZXRGb2N1czogKCkgPT4gdGhpcy4kcmVmcy5idXR0b24uZm9jdXMoKSxcbiAgICAgIHZpc2liaWxpdHlJc0hpZGRlbjogKCkgPT4gZG9jdW1lbnQuaGlkZGVuLFxuICAgICAgcmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIHRoaXMuJHJlZnMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoYW5kbGVyLCB0cnVlKSxcbiAgICAgIGRlcmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIHRoaXMuJHJlZnMuYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoYW5kbGVyLCB0cnVlKSxcbiAgICAgIHJlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUhhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlclZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBoYW5kbGVyKSxcbiAgICAgIHJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIHRydWUpLFxuICAgICAgZGVyZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCB0cnVlKSxcbiAgICAgIHJlZ2lzdGVyQWN0aW9uQ2xpY2tIYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIHRoaXMuJHJlZnMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyQWN0aW9uQ2xpY2tIYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIHRoaXMuJHJlZnMuYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICByZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuJHJlZnMucm9vdFxuICAgICAgICByb290ICYmXG4gICAgICAgICAgcm9vdC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3csICd0cmFuc2l0aW9uZW5kJyksXG4gICAgICAgICAgICBoYW5kbGVyXG4gICAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLiRyZWZzLnJvb3RcbiAgICAgICAgcm9vdCAmJlxuICAgICAgICAgIHJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGdldENvcnJlY3RFdmVudE5hbWUod2luZG93LCAndHJhbnNpdGlvbmVuZCcpLFxuICAgICAgICAgICAgaGFuZGxlclxuICAgICAgICAgIClcbiAgICAgIH0sXG4gICAgICBub3RpZnlTaG93OiAoKSA9PiB0aGlzLiRlbWl0KCdzaG93JyksXG4gICAgICBub3RpZnlIaWRlOiAoKSA9PiB0aGlzLiRlbWl0KCdoaWRlJylcbiAgICB9KVxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcblxuICAgIC8vIGlmIGV2ZW50IHNwZWNpZmllZCB1c2UgaXQsIGVsc2UgaWYgbm8gc25hY2sgcHJvcCB0aGVuIHVzZSBkZWZhdWx0LlxuICAgIHRoaXMuZXZlbnROYW1lID1cbiAgICAgIHRoaXMuZXZlbnQgfHwgKHRoaXMuc25hY2sgPT09IHZvaWQgMCA/ICdzaG93LXNuYWNrYmFyJyA6IG51bGwpXG4gICAgaWYgKHRoaXMuZXZlbnROYW1lKSB7XG4gICAgICB0aGlzLmV2ZW50U291cmNlLiRvbih0aGlzLmV2ZW50TmFtZSwgdGhpcy5zaG93KVxuICAgIH1cbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzbWlzc09uQWN0aW9uKHRoaXMuZGlzbWlzc2VzT25BY3Rpb24pXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZXZlbnRTb3VyY2UpIHtcbiAgICAgIHRoaXMuZXZlbnRTb3VyY2UuJG9mZih0aGlzLmV2ZW50TmFtZSwgdGhpcy5zaG93KVxuICAgIH1cbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvblNuYWNrKHNuYWNrKSB7XG4gICAgICBpZiAoc25hY2sgJiYgc25hY2subWVzc2FnZSkge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24uc2hvdyhzbmFjaylcbiAgICAgICAgdGhpcy4kZW1pdCgncXVldWVkJywgc25hY2spXG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93KGRhdGEpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zaG93KGRhdGEpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1NuYWNrYmFyIGZyb20gJy4vbWRjLXNuYWNrYmFyLnZ1ZSdcblxuZXhwb3J0IHsgbWRjU25hY2tiYXIgfVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjU25hY2tiYXJcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ0NvbXBvbmVudCIsInJvb3QiLCJmb3VuZGF0aW9uIiwidW5kZWZpbmVkIiwicm9vdF8iLCJhcmdzIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0IiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJkZXN0cm95IiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJldnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImNzc0NsYXNzZXMiLCJST09UIiwiVEVYVCIsIkFDVElPTl9XUkFQUEVSIiwiQUNUSU9OX0JVVFRPTiIsIkFDVElWRSIsIk1VTFRJTElORSIsIkFDVElPTl9PTl9CT1RUT00iLCJzdHJpbmdzIiwiVEVYVF9TRUxFQ1RPUiIsIkFDVElPTl9XUkFQUEVSX1NFTEVDVE9SIiwiQUNUSU9OX0JVVFRPTl9TRUxFQ1RPUiIsIlNIT1dfRVZFTlQiLCJISURFX0VWRU5UIiwibnVtYmVycyIsIk1FU1NBR0VfVElNRU9VVCIsIk1EQ1NuYWNrYmFyRm91bmRhdGlvbiIsImFjdGl2ZV8iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwic2V0QXJpYUhpZGRlbiIsInVuc2V0QXJpYUhpZGRlbiIsInNldEFjdGlvbkFyaWFIaWRkZW4iLCJ1bnNldEFjdGlvbkFyaWFIaWRkZW4iLCJzZXRBY3Rpb25UZXh0Iiwic2V0TWVzc2FnZVRleHQiLCJzZXRGb2N1cyIsInZpc2liaWxpdHlJc0hpZGRlbiIsInJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlciIsImRlcmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyIiwicmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlciIsImRlcmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlciIsInJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlciIsImRlcmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXIiLCJyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwiZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwibm90aWZ5U2hvdyIsIm5vdGlmeUhpZGUiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwiYWN0aW9uV2FzQ2xpY2tlZF8iLCJkaXNtaXNzT25BY3Rpb25fIiwiZmlyc3RGb2N1c18iLCJwb2ludGVyRG93blJlY29nbml6ZWRfIiwic25hY2tiYXJIYXNGb2N1c18iLCJzbmFja2JhckRhdGFfIiwicXVldWVfIiwiYWN0aW9uQ2xpY2tIYW5kbGVyXyIsImludm9rZUFjdGlvbl8iLCJ2aXNpYmlsaXR5Y2hhbmdlSGFuZGxlcl8iLCJjbGVhclRpbWVvdXQiLCJ0aW1lb3V0SWRfIiwic2V0VGltZW91dCIsImNsZWFudXBfIiwiYmluZCIsInRpbWVvdXQiLCJpbnRlcmFjdGlvbkhhbmRsZXJfIiwidHlwZSIsImhhbmRsZVBvc3NpYmxlVGFiS2V5Ym9hcmRGb2N1c18iLCJibHVySGFuZGxlcl8iLCJmb3JFYWNoIiwiZGlzbWlzc09uQWN0aW9uIiwiZGF0YSIsIm1lc3NhZ2UiLCJhY3Rpb25IYW5kbGVyIiwiYWN0aW9uVGV4dCIsImFjdGl2ZSIsInB1c2giLCJtdWx0aWxpbmUiLCJhY3Rpb25PbkJvdHRvbSIsImFjdGlvbkhhbmRsZXJfIiwic2V0QWN0aW9uSGlkZGVuXyIsImhpamFja0ZvY3VzIiwic2V0Rm9jdXNPbkFjdGlvbl8iLCJhbGxvd0Rpc21pc3NhbCIsInNob3dOZXh0XyIsImxlbmd0aCIsInNob3ciLCJzaGlmdCIsImlzSGlkZGVuIiwiZXZlbnRUeXBlTWFwIiwibm9QcmVmaXgiLCJ3ZWJraXRQcmVmaXgiLCJzdHlsZVByb3BlcnR5IiwiY3NzUHJvcGVydHlNYXAiLCJoYXNQcm9wZXJTaGFwZSIsIndpbmRvd09iaiIsImV2ZW50Rm91bmRJbk1hcHMiLCJldmVudFR5cGUiLCJnZXRKYXZhU2NyaXB0RXZlbnROYW1lIiwibWFwIiwiZWwiLCJzdHlsZSIsImdldEFuaW1hdGlvbk5hbWUiLCJldmVudE5hbWUiLCJnZXRDb3JyZWN0RXZlbnROYW1lIiwicmVuZGVyIiwibW9kZWwiLCJwcm9wIiwiZXZlbnQiLCJwcm9wcyIsIkJvb2xlYW4iLCJzbmFjayIsIk9iamVjdCIsIlN0cmluZyIsInJlcXVpcmVkIiwiZGVmYXVsdCIsIiRyb290IiwiY2xhc3NlcyIsImFsaWduU3RhcnQiLCJoaWRkZW4iLCJhY3Rpb25IaWRkZW4iLCJ3YXRjaCIsIm1vdW50ZWQiLCIkc2V0IiwiY2xhc3NOYW1lIiwiJGRlbGV0ZSIsInRleHQiLCIkcmVmcyIsImJ1dHRvbiIsImZvY3VzIiwiYm9keSIsIiRlbWl0IiwiZXZlbnRTb3VyY2UiLCIkb24iLCJzZXREaXNtaXNzT25BY3Rpb24iLCJkaXNtaXNzZXNPbkFjdGlvbiIsImJlZm9yZURlc3Ryb3kiLCIkb2ZmIiwibWV0aG9kcyIsIm9u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
