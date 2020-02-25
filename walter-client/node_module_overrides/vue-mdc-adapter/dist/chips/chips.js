/**
* @module vue-mdc-adapterchips 0.17.0
* @exports VueMDCChips
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCChips = factory());
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
     * Adapter for MDC Chip.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Chip into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCChipAdapter = function () {
      function MDCChipAdapter() {
        classCallCheck(this, MDCChipAdapter);
      }

      createClass(MDCChipAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the root element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the root element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * Returns true if the root element contains the given class.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "hasClass",
        value: function hasClass(className) {}

        /**
         * Adds a class to the leading icon element.
         * @param {string} className
         */

      }, {
        key: "addClassToLeadingIcon",
        value: function addClassToLeadingIcon(className) {}

        /**
         * Removes a class from the leading icon element.
         * @param {string} className
         */

      }, {
        key: "removeClassFromLeadingIcon",
        value: function removeClassFromLeadingIcon(className) {}

        /**
         * Returns true if target has className, false otherwise.
         * @param {!EventTarget} target
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "eventTargetHasClass",
        value: function eventTargetHasClass(target, className) {}

        /**
         * Registers an event listener on the root element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerEventHandler",
        value: function registerEventHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the root element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterEventHandler",
        value: function deregisterEventHandler(evtType, handler) {}

        /**
         * Registers an event listener on the trailing icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerTrailingIconInteractionHandler",
        value: function registerTrailingIconInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the trailing icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterTrailingIconInteractionHandler",
        value: function deregisterTrailingIconInteractionHandler(evtType, handler) {}

        /**
         * Emits a custom "MDCChip:interaction" event denoting the chip has been
         * interacted with (typically on click or keydown).
         */

      }, {
        key: "notifyInteraction",
        value: function notifyInteraction() {}

        /**
         * Emits a custom "MDCChip:trailingIconInteraction" event denoting the trailing icon has been
         * interacted with (typically on click or keydown).
         */

      }, {
        key: "notifyTrailingIconInteraction",
        value: function notifyTrailingIconInteraction() {}

        /**
         * Emits a custom event "MDCChip:removal" denoting the chip will be removed.
         */

      }, {
        key: "notifyRemoval",
        value: function notifyRemoval() {}

        /**
         * Returns the computed property value of the given style property on the root element.
         * @param {string} propertyName
         * @return {string}
         */

      }, {
        key: "getComputedStyleValue",
        value: function getComputedStyleValue(propertyName) {}

        /**
         * Sets the property value of the given style property on the root element.
         * @param {string} propertyName
         * @param {string} value
         */

      }, {
        key: "setStyleProperty",
        value: function setStyleProperty(propertyName, value) {}
      }]);
      return MDCChipAdapter;
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
    var strings = {
      ENTRY_ANIMATION_NAME: 'mdc-chip-entry',
      INTERACTION_EVENT: 'MDCChip:interaction',
      TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
      REMOVAL_EVENT: 'MDCChip:removal',
      CHECKMARK_SELECTOR: '.mdc-chip__checkmark',
      LEADING_ICON_SELECTOR: '.mdc-chip__icon--leading',
      TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing'
    };

    /** @enum {string} */
    var cssClasses = {
      CHECKMARK: 'mdc-chip__checkmark',
      CHIP_EXIT: 'mdc-chip--exit',
      HIDDEN_LEADING_ICON: 'mdc-chip__icon--leading-hidden',
      LEADING_ICON: 'mdc-chip__icon--leading',
      TRAILING_ICON: 'mdc-chip__icon--trailing',
      SELECTED: 'mdc-chip--selected'
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
     * @extends {MDCFoundation<!MDCChipAdapter>}
     * @final
     */

    var MDCChipFoundation = function (_MDCFoundation) {
      inherits(MDCChipFoundation, _MDCFoundation);
      createClass(MDCChipFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings;
        }

        /** @return enum {string} */

      }, {
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses;
        }

        /**
         * {@see MDCChipAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCChipAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCChipAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              addClassToLeadingIcon: function addClassToLeadingIcon() {},
              removeClassFromLeadingIcon: function removeClassFromLeadingIcon() {},
              eventTargetHasClass: function eventTargetHasClass() {},
              registerEventHandler: function registerEventHandler() {},
              deregisterEventHandler: function deregisterEventHandler() {},
              registerTrailingIconInteractionHandler: function registerTrailingIconInteractionHandler() {},
              deregisterTrailingIconInteractionHandler: function deregisterTrailingIconInteractionHandler() {},
              notifyInteraction: function notifyInteraction() {},
              notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {},
              notifyRemoval: function notifyRemoval() {},
              getComputedStyleValue: function getComputedStyleValue() {},
              setStyleProperty: function setStyleProperty() {}
            }
          );
        }

        /**
         * @param {!MDCChipAdapter} adapter
         */

      }]);

      function MDCChipFoundation(adapter) {
        classCallCheck(this, MDCChipFoundation);

        /**
         * Whether a trailing icon click should immediately trigger exit/removal of the chip.
         * @private {boolean}
         * */
        var _this = possibleConstructorReturn(this, (MDCChipFoundation.__proto__ || Object.getPrototypeOf(MDCChipFoundation)).call(this, _extends(MDCChipFoundation.defaultAdapter, adapter)));

        _this.shouldRemoveOnTrailingIconClick_ = true;
        /** @private {function(!Event): undefined} */
        _this.interactionHandler_ = function (evt) {
          return _this.handleInteraction(evt);
        };
        /** @private {function(!Event): undefined} */
        _this.transitionEndHandler_ = function (evt) {
          return _this.handleTransitionEnd(evt);
        };
        /** @private {function(!Event): undefined} */
        _this.trailingIconInteractionHandler_ = function (evt) {
          return _this.handleTrailingIconInteraction(evt);
        };
        return _this;
      }

      createClass(MDCChipFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerEventHandler(evtType, _this2.interactionHandler_);
          });
          this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
          ['click', 'keydown', 'touchstart', 'pointerdown', 'mousedown'].forEach(function (evtType) {
            _this2.adapter_.registerTrailingIconInteractionHandler(evtType, _this2.trailingIconInteractionHandler_);
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterEventHandler(evtType, _this3.interactionHandler_);
          });
          this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
          ['click', 'keydown', 'touchstart', 'pointerdown', 'mousedown'].forEach(function (evtType) {
            _this3.adapter_.deregisterTrailingIconInteractionHandler(evtType, _this3.trailingIconInteractionHandler_);
          });
        }

        /**
         * @return {boolean}
         */

      }, {
        key: 'isSelected',
        value: function isSelected() {
          return this.adapter_.hasClass(cssClasses.SELECTED);
        }

        /**
         * @param {boolean} selected
         */

      }, {
        key: 'setSelected',
        value: function setSelected(selected) {
          if (selected) {
            this.adapter_.addClass(cssClasses.SELECTED);
          } else {
            this.adapter_.removeClass(cssClasses.SELECTED);
          }
        }

        /**
         * @return {boolean}
         */

      }, {
        key: 'getShouldRemoveOnTrailingIconClick',
        value: function getShouldRemoveOnTrailingIconClick() {
          return this.shouldRemoveOnTrailingIconClick_;
        }

        /**
         * @param {boolean} shouldRemove
         */

      }, {
        key: 'setShouldRemoveOnTrailingIconClick',
        value: function setShouldRemoveOnTrailingIconClick(shouldRemove) {
          this.shouldRemoveOnTrailingIconClick_ = shouldRemove;
        }

        /**
         * Begins the exit animation which leads to removal of the chip.
         */

      }, {
        key: 'beginExit',
        value: function beginExit() {
          this.adapter_.addClass(cssClasses.CHIP_EXIT);
        }

        /**
         * Handles an interaction event on the root element.
         * @param {!Event} evt
         */

      }, {
        key: 'handleInteraction',
        value: function handleInteraction(evt) {
          if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
            this.adapter_.notifyInteraction();
          }
        }

        /**
         * Handles a transition end event on the root element.
         * @param {!Event} evt
         */

      }, {
        key: 'handleTransitionEnd',
        value: function handleTransitionEnd(evt) {
          var _this4 = this;

          // Handle transition end event on the chip when it is about to be removed.
          if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.CHIP_EXIT)) {
            if (evt.propertyName === 'width') {
              this.adapter_.notifyRemoval();
            } else if (evt.propertyName === 'opacity') {
              // See: https://css-tricks.com/using-css-transitions-auto-dimensions/#article-header-id-5
              var chipWidth = this.adapter_.getComputedStyleValue('width');

              // On the next frame (once we get the computed width), explicitly set the chip's width
              // to its current pixel width, so we aren't transitioning out of 'auto'.
              requestAnimationFrame(function () {
                _this4.adapter_.setStyleProperty('width', chipWidth);

                // To mitigate jitter, start transitioning padding and margin before width.
                _this4.adapter_.setStyleProperty('padding', '0');
                _this4.adapter_.setStyleProperty('margin', '0');

                // On the next frame (once width is explicitly set), transition width to 0.
                requestAnimationFrame(function () {
                  _this4.adapter_.setStyleProperty('width', '0');
                });
              });
            }
            return;
          }

          // Handle a transition end event on the leading icon or checkmark, since the transition end event bubbles.
          if (evt.propertyName !== 'opacity') {
            return;
          }
          if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.LEADING_ICON) && this.adapter_.hasClass(cssClasses.SELECTED)) {
            this.adapter_.addClassToLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
          } else if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.CHECKMARK) && !this.adapter_.hasClass(cssClasses.SELECTED)) {
            this.adapter_.removeClassFromLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
          }
        }

        /**
         * Handles an interaction event on the trailing icon element. This is used to
         * prevent the ripple from activating on interaction with the trailing icon.
         * @param {!Event} evt
         */

      }, {
        key: 'handleTrailingIconInteraction',
        value: function handleTrailingIconInteraction(evt) {
          evt.stopPropagation();
          if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
            this.adapter_.notifyTrailingIconInteraction();
            if (this.shouldRemoveOnTrailingIconClick_) {
              this.beginExit();
            }
          }
        }
      }]);
      return MDCChipFoundation;
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

    var mdcChip = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', _vm._g({ class: _vm.classes, style: _vm.styles, attrs: { "tabindex": "0" } }, _vm.$listeners), [_vm.haveleadingIcon ? _c('i', { ref: "leadingIcon", staticClass: "mdc-chip__icon mdc-chip__icon--leading", class: _vm.leadingClasses }, [_vm._v(_vm._s(_vm.leadingIcon))]) : _vm._e(), _vm._v(" "), _vm.isFilter ? _c('div', { staticClass: "mdc-chip__checkmark" }, [_c('svg', { staticClass: "mdc-chip__checkmark-svg", attrs: { "viewBox": "-2 -3 30 30" } }, [_c('path', { staticClass: "mdc-chip__checkmark-path", attrs: { "fill": "none", "stroke": "black", "d": "M1.73,12.91 8.1,19.28 22.79,4.59" } })])]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "mdc-chip__text" }, [_vm._t("default")], 2), _vm._v(" "), _vm.havetrailingIcon ? _c('i', { ref: "trailingIcon", staticClass: "mdc-chip__icon mdc-chip__icon--trailing", class: _vm.trailingClasses, attrs: { "tabindex": "0", "role": "button" } }, [_vm._v(_vm._s(_vm.trailingIcon))]) : _vm._e()]);
      }, staticRenderFns: [],
      name: 'mdc-chip',
      mixins: [CustomLinkMixin],
      props: {
        leadingIcon: [String],
        trailingIcon: [String],
        leadingIconClasses: [Object],
        trailingIconClasses: [Object]
      },
      inject: ['mdcChipSet'],
      data: function data() {
        return {
          classes: {
            'mdc-chip': true
          },
          styles: {}
        };
      },

      computed: {
        isFilter: function isFilter() {
          return this.mdcChipSet && this.mdcChipSet.filter;
        },
        haveleadingIcon: function haveleadingIcon() {
          return !!this.leadingIcon || this.leadingIconClasses;
        },
        havetrailingIcon: function havetrailingIcon() {
          return !!this.trailingIcon || this.trailingIconClasses;
        },
        leadingClasses: function leadingClasses() {
          return _extends({}, {
            'material-icons': !!this.leadingIcon
          }, this.leadingIconClasses);
        },
        trailingClasses: function trailingClasses() {
          return _extends({}, {
            'material-icons': !!this.trailingIcon
          }, this.trailingIconClasses);
        }
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCChipFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          hasClass: function hasClass(className) {
            return _this.$el.classList.contains(className);
          },
          addClassToLeadingIcon: function addClassToLeadingIcon(className) {
            if (_this.haveleadingIcon) {
              _this.$refs.leadingIcon.classList.add(className);
            }
          },
          removeClassFromLeadingIcon: function removeClassFromLeadingIcon(className) {
            if (_this.haveleadingIcon) {
              _this.$refs.leadingIcon.classList.remove(className);
            }
          },
          eventTargetHasClass: function eventTargetHasClass(target, className) {
            return target.classList.contains(className);
          },
          registerEventHandler: function registerEventHandler(evtType, handler) {
            return _this.$el.addEventListener(evtType, handler);
          },
          deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
            return _this.$el.removeEventListener(evtType, handler);
          },
          notifyInteraction: function notifyInteraction() {
            emitCustomEvent(_this.$el, MDCChipFoundation.strings.INTERACTION_EVENT, {
              chip: _this
            }, true);
          },
          notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
            emitCustomEvent(_this.$el, MDCChipFoundation.strings.TRAILING_ICON_INTERACTION_EVENT, {
              chip: _this
            }, true);
          },

          registerTrailingIconInteractionHandler: function registerTrailingIconInteractionHandler(evtType, handler) {
            if (_this.$refs.trailingIcon) {
              _this.$refs.trailingIcon.addEventListener(evtType, handler, applyPassive());
            }
          },
          deregisterTrailingIconInteractionHandler: function deregisterTrailingIconInteractionHandler(evtType, handler) {
            if (_this.$refs.trailingIcon) {
              _this.$refs.trailingIcon.removeEventListener(evtType, handler, applyPassive());
            }
          },
          notifyRemoval: function notifyRemoval() {
            emitCustomEvent(_this.$el, MDCChipFoundation.strings.REMOVAL_EVENT, { chip: _this }, true);
          },
          getComputedStyleValue: function getComputedStyleValue(propertyName) {
            return window.getComputedStyle(_this.$el).getPropertyValue(propertyName);
          },
          setStyleProperty: function setStyleProperty(property, value) {
            return _this.$set(_this.styles, property, value);
          }
        });

        this.foundation.init();

        this.ripple = new RippleBase(this);
        this.ripple.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.ripple.destroy();
        this.foundation.destroy();
      },

      methods: {
        toggleSelected: function toggleSelected() {
          this.foundation.toggleSelected();
        },
        isSelected: function isSelected() {
          return this.foundation.isSelected();
        }
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
     * Adapter for MDC Chip Set.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Chip Set into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */

    var MDCChipSetAdapter = function () {
      function MDCChipSetAdapter() {
        classCallCheck(this, MDCChipSetAdapter);
      }

      createClass(MDCChipSetAdapter, [{
        key: 'hasClass',

        /**
         * Returns true if the root element contains the given class name.
         * @param {string} className
         * @return {boolean}
         */
        value: function hasClass(className) {}

        /**
         * Registers an event handler on the root element for a given event.
         * @param {string} evtType
         * @param {function(!MDCChipInteractionEventType): undefined} handler
         */

      }, {
        key: 'registerInteractionHandler',
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event handler on the root element for a given event.
         * @param {string} evtType
         * @param {function(!MDCChipInteractionEventType): undefined} handler
         */

      }, {
        key: 'deregisterInteractionHandler',
        value: function deregisterInteractionHandler(evtType, handler) {}

        /**
         * Removes the chip object from the chip set.
         * @param {!Object} chip
         */

      }, {
        key: 'removeChip',
        value: function removeChip(chip) {}
      }]);
      return MDCChipSetAdapter;
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
    var strings$2 = {
      CHIP_SELECTOR: '.mdc-chip'
    };

    /** @enum {string} */
    var cssClasses$2 = {
      CHOICE: 'mdc-chip-set--choice',
      FILTER: 'mdc-chip-set--filter'
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
     * @extends {MDCFoundation<!MDCChipSetAdapter>}
     * @final
     */

    var MDCChipSetFoundation = function (_MDCFoundation) {
      inherits(MDCChipSetFoundation, _MDCFoundation);
      createClass(MDCChipSetFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings$2;
        }

        /** @return enum {string} */

      }, {
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses$2;
        }

        /**
         * {@see MDCChipSetAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCChipSetAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCChipSetAdapter} */{
              hasClass: function hasClass() {},
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {},
              removeChip: function removeChip() {}
            }
          );
        }

        /**
         * @param {!MDCChipSetAdapter} adapter
         */

      }]);

      function MDCChipSetFoundation(adapter) {
        classCallCheck(this, MDCChipSetFoundation);

        /**
         * The selected chips in the set. Only used for choice chip set or filter chip set.
         * @private {!Array<!MDCChipFoundation>}
         */
        var _this = possibleConstructorReturn(this, (MDCChipSetFoundation.__proto__ || Object.getPrototypeOf(MDCChipSetFoundation)).call(this, _extends(MDCChipSetFoundation.defaultAdapter, adapter)));

        _this.selectedChips_ = [];

        /** @private {function(!MDCChipInteractionEventType): undefined} */
        _this.chipInteractionHandler_ = function (evt) {
          return _this.handleChipInteraction_(evt);
        };
        /** @private {function(!MDCChipInteractionEventType): undefined} */
        _this.chipRemovalHandler_ = function (evt) {
          return _this.handleChipRemoval_(evt);
        };
        return _this;
      }

      createClass(MDCChipSetFoundation, [{
        key: 'init',
        value: function init() {
          this.adapter_.registerInteractionHandler(MDCChipFoundation.strings.INTERACTION_EVENT, this.chipInteractionHandler_);
          this.adapter_.registerInteractionHandler(MDCChipFoundation.strings.REMOVAL_EVENT, this.chipRemovalHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterInteractionHandler(MDCChipFoundation.strings.INTERACTION_EVENT, this.chipInteractionHandler_);
          this.adapter_.deregisterInteractionHandler(MDCChipFoundation.strings.REMOVAL_EVENT, this.chipRemovalHandler_);
        }

        /**
         * Selects the given chip. Deselects all other chips if the chip set is of the choice variant.
         * @param {!MDCChipFoundation} chipFoundation
         */

      }, {
        key: 'select',
        value: function select(chipFoundation) {
          if (this.adapter_.hasClass(cssClasses$2.CHOICE)) {
            this.deselectAll_();
          }
          chipFoundation.setSelected(true);
          this.selectedChips_.push(chipFoundation);
        }

        /**
         * Deselects the given chip.
         * @param {!MDCChipFoundation} chipFoundation
         */

      }, {
        key: 'deselect',
        value: function deselect(chipFoundation) {
          var index = this.selectedChips_.indexOf(chipFoundation);
          if (index >= 0) {
            this.selectedChips_.splice(index, 1);
          }
          chipFoundation.setSelected(false);
        }

        /** Deselects all selected chips. */

      }, {
        key: 'deselectAll_',
        value: function deselectAll_() {
          this.selectedChips_.forEach(function (chipFoundation) {
            chipFoundation.setSelected(false);
          });
          this.selectedChips_.length = 0;
        }

        /**
         * Handles a chip interaction event
         * @param {!MDCChipInteractionEventType} evt
         * @private
         */

      }, {
        key: 'handleChipInteraction_',
        value: function handleChipInteraction_(evt) {
          var chipFoundation = evt.detail.chip.foundation;
          if (this.adapter_.hasClass(cssClasses$2.CHOICE) || this.adapter_.hasClass(cssClasses$2.FILTER)) {
            if (chipFoundation.isSelected()) {
              this.deselect(chipFoundation);
            } else {
              this.select(chipFoundation);
            }
          }
        }

        /**
         * Handles the event when a chip is removed.
         * @param {!MDCChipInteractionEventType} evt
         * @private
         */

      }, {
        key: 'handleChipRemoval_',
        value: function handleChipRemoval_(evt) {
          var chip = evt.detail.chip;

          this.deselect(chip.foundation);
          this.adapter_.removeChip(chip);
        }
      }]);
      return MDCChipSetFoundation;
    }(MDCFoundation);

    var mdcChipSet = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', _vm._g({ class: _vm.classes }, _vm.$listeners), [_vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-chip-set',
      props: {
        choice: [Boolean],
        filter: [Boolean],
        input: [Boolean]
      },
      provide: function provide() {
        return { mdcChipSet: this };
      },
      data: function data() {
        return {
          classes: {
            'mdc-chip-set': true,
            'mdc-chip-set--choice': this.choice,
            'mdc-chip-set--filter': this.filter,
            'mdc-chip-set--input': this.input
          }
        };
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCChipSetFoundation({
          hasClass: function hasClass(className) {
            return _this.$el.classList.contains(className);
          },
          registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
            _this.$el.addEventListener(evtType, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
            _this.$el.removeEventListener(evtType, handler);
          },
          removeChip: function removeChip(chip) {
            // TODO: may need refactoring
            _this.$nextTick(function () {
              return chip.$destroy();
            });
          }
        });

        this.foundation.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
      },

      methods: {}
    };

    var plugin = BasePlugin({
      mdcChip: mdcChip,
      mdcChipSet: mdcChipSet
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hcHBseS1wYXNzaXZlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tbGluay5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvY2hpcHMvY2hpcC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9jaGlwcy9jaGlwL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvY2hpcHMvY2hpcC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9jaGlwcy9tZGMtY2hpcC52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAtc2V0L2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAtc2V0L2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvY2hpcHMvY2hpcC1zZXQvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvY2hpcHMvbWRjLWNoaXAtc2V0LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2hpcHMvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2NoaXBzL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBzdXBwb3J0c1Bhc3NpdmVfXG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2VcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7XG4gICAgICAgIGdldCBwYXNzaXZlKCkge1xuICAgICAgICAgIGlzU3VwcG9ydGVkID0geyBwYXNzaXZlOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvL2VtcHR5XG4gICAgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkXG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlX1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6IHZtID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBDdXN0b21MaW5rID0ge1xuICBuYW1lOiAnY3VzdG9tLWxpbmsnLFxuICBmdW5jdGlvbmFsOiB0cnVlLFxuICBwcm9wczoge1xuICAgIHRhZzogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdhJyB9LFxuICAgIGxpbms6IE9iamVjdFxuICB9LFxuICByZW5kZXIoaCwgY29udGV4dCkge1xuICAgIGxldCBlbGVtZW50XG4gICAgbGV0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LmRhdGEpXG5cbiAgICBpZiAoY29udGV4dC5wcm9wcy5saW5rICYmIGNvbnRleHQucGFyZW50LiRyb3V0ZXIpIHtcbiAgICAgIC8vIHJvdXRlci1saW5rIGNhc2VcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnBhcmVudC4kcm9vdC4kb3B0aW9ucy5jb21wb25lbnRzWydyb3V0ZXItbGluayddXG4gICAgICBkYXRhLnByb3BzID0gT2JqZWN0LmFzc2lnbih7IHRhZzogY29udGV4dC5wcm9wcy50YWcgfSwgY29udGV4dC5wcm9wcy5saW5rKVxuICAgICAgaWYgKGRhdGEub24uY2xpY2spIHtcbiAgICAgICAgZGF0YS5uYXRpdmVPbiA9IHsgY2xpY2s6IGRhdGEub24uY2xpY2sgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbGVtZW50IGZhbGxiYWNrXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wcm9wcy50YWdcbiAgICB9XG5cbiAgICByZXR1cm4gaChlbGVtZW50LCBkYXRhLCBjb250ZXh0LmNoaWxkcmVuKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21MaW5rTWl4aW4gPSB7XG4gIHByb3BzOiB7XG4gICAgdG86IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgZXhhY3Q6IEJvb2xlYW4sXG4gICAgYXBwZW5kOiBCb29sZWFuLFxuICAgIHJlcGxhY2U6IEJvb2xlYW4sXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBsaW5rKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy50byAmJiB7XG4gICAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgICAgZXhhY3Q6IHRoaXMuZXhhY3QsXG4gICAgICAgICAgYXBwZW5kOiB0aGlzLmFwcGVuZCxcbiAgICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2UsXG4gICAgICAgICAgYWN0aXZlQ2xhc3M6IHRoaXMuYWN0aXZlQ2xhc3MsXG4gICAgICAgICAgZXhhY3RBY3RpdmVDbGFzczogdGhpcy5leGFjdEFjdGl2ZUNsYXNzXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21MaW5rXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImNvbnN0IHNjb3BlID1cbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xuXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcbiAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBDaGlwLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIENoaXAgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ0NoaXBBZGFwdGVyIHtcbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByb290IGVsZW1lbnQgY29udGFpbnMgdGhlIGdpdmVuIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgbGVhZGluZyBpY29uIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzVG9MZWFkaW5nSWNvbihjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsZWFkaW5nIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3NGcm9tTGVhZGluZ0ljb24oY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGFyZ2V0IGhhcyBjbGFzc05hbWUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBldmVudFRhcmdldEhhc0NsYXNzKHRhcmdldCwgY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIHJvb3QgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgdHJhaWxpbmcgaWNvbiBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJUcmFpbGluZ0ljb25JbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIHRyYWlsaW5nIGljb24gZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJUcmFpbGluZ0ljb25JbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gXCJNRENDaGlwOmludGVyYWN0aW9uXCIgZXZlbnQgZGVub3RpbmcgdGhlIGNoaXAgaGFzIGJlZW5cbiAgICogaW50ZXJhY3RlZCB3aXRoICh0eXBpY2FsbHkgb24gY2xpY2sgb3Iga2V5ZG93bikuXG4gICAqL1xuICBub3RpZnlJbnRlcmFjdGlvbigpIHt9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgY3VzdG9tIFwiTURDQ2hpcDp0cmFpbGluZ0ljb25JbnRlcmFjdGlvblwiIGV2ZW50IGRlbm90aW5nIHRoZSB0cmFpbGluZyBpY29uIGhhcyBiZWVuXG4gICAqIGludGVyYWN0ZWQgd2l0aCAodHlwaWNhbGx5IG9uIGNsaWNrIG9yIGtleWRvd24pLlxuICAgKi9cbiAgbm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb24oKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBldmVudCBcIk1EQ0NoaXA6cmVtb3ZhbFwiIGRlbm90aW5nIHRoZSBjaGlwIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICovXG4gIG5vdGlmeVJlbW92YWwoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb21wdXRlZCBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gc3R5bGUgcHJvcGVydHkgb24gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRDb21wdXRlZFN0eWxlVmFsdWUocHJvcGVydHlOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gc3R5bGUgcHJvcGVydHkgb24gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldFN0eWxlUHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ2hpcEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBFTlRSWV9BTklNQVRJT05fTkFNRTogJ21kYy1jaGlwLWVudHJ5JyxcbiAgSU5URVJBQ1RJT05fRVZFTlQ6ICdNRENDaGlwOmludGVyYWN0aW9uJyxcbiAgVFJBSUxJTkdfSUNPTl9JTlRFUkFDVElPTl9FVkVOVDogJ01EQ0NoaXA6dHJhaWxpbmdJY29uSW50ZXJhY3Rpb24nLFxuICBSRU1PVkFMX0VWRU5UOiAnTURDQ2hpcDpyZW1vdmFsJyxcbiAgQ0hFQ0tNQVJLX1NFTEVDVE9SOiAnLm1kYy1jaGlwX19jaGVja21hcmsnLFxuICBMRUFESU5HX0lDT05fU0VMRUNUT1I6ICcubWRjLWNoaXBfX2ljb24tLWxlYWRpbmcnLFxuICBUUkFJTElOR19JQ09OX1NFTEVDVE9SOiAnLm1kYy1jaGlwX19pY29uLS10cmFpbGluZycsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIENIRUNLTUFSSzogJ21kYy1jaGlwX19jaGVja21hcmsnLFxuICBDSElQX0VYSVQ6ICdtZGMtY2hpcC0tZXhpdCcsXG4gIEhJRERFTl9MRUFESU5HX0lDT046ICdtZGMtY2hpcF9faWNvbi0tbGVhZGluZy1oaWRkZW4nLFxuICBMRUFESU5HX0lDT046ICdtZGMtY2hpcF9faWNvbi0tbGVhZGluZycsXG4gIFRSQUlMSU5HX0lDT046ICdtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmcnLFxuICBTRUxFQ1RFRDogJ21kYy1jaGlwLS1zZWxlY3RlZCcsXG59O1xuXG5leHBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NoaXBBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENDaGlwQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDQ2hpcEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENDaGlwQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENDaGlwQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ0NoaXBBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgaGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uOiAoKSA9PiB7fSxcbiAgICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUludGVyYWN0aW9uOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeVJlbW92YWw6ICgpID0+IHt9LFxuICAgICAgZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlOiAoKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlUHJvcGVydHk6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ0NoaXBBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENDaGlwRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBhIHRyYWlsaW5nIGljb24gY2xpY2sgc2hvdWxkIGltbWVkaWF0ZWx5IHRyaWdnZXIgZXhpdC9yZW1vdmFsIG9mIHRoZSBjaGlwLlxuICAgICAqIEBwcml2YXRlIHtib29sZWFufVxuICAgICAqICovXG4gICAgdGhpcy5zaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrXyA9IHRydWU7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVJbnRlcmFjdGlvbihldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50cmFpbGluZ0ljb25JbnRlcmFjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUcmFpbGluZ0ljb25JbnRlcmFjdGlvbihldnQpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBbJ2NsaWNrJywgJ2tleWRvd24nXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckV2ZW50SGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICBbJ2NsaWNrJywgJ2tleWRvd24nLCAndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMudHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIFsnY2xpY2snLCAna2V5ZG93biddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckV2ZW50SGFuZGxlcihldnRUeXBlLCB0aGlzLmludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckV2ZW50SGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICBbJ2NsaWNrJywgJ2tleWRvd24nLCAndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUcmFpbGluZ0ljb25JbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy50cmFpbGluZ0ljb25JbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLlNFTEVDVEVEKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXG4gICAqL1xuICBzZXRTZWxlY3RlZChzZWxlY3RlZCkge1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLlNFTEVDVEVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLlNFTEVDVEVEKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGdldFNob3VsZFJlbW92ZU9uVHJhaWxpbmdJY29uQ2xpY2soKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGlja187XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRSZW1vdmVcbiAgICovXG4gIHNldFNob3VsZFJlbW92ZU9uVHJhaWxpbmdJY29uQ2xpY2soc2hvdWxkUmVtb3ZlKSB7XG4gICAgdGhpcy5zaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrXyA9IHNob3VsZFJlbW92ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCZWdpbnMgdGhlIGV4aXQgYW5pbWF0aW9uIHdoaWNoIGxlYWRzIHRvIHJlbW92YWwgb2YgdGhlIGNoaXAuXG4gICAqL1xuICBiZWdpbkV4aXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkNISVBfRVhJVCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBpbnRlcmFjdGlvbiBldmVudCBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVJbnRlcmFjdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdjbGljaycgfHwgZXZ0LmtleSA9PT0gJ0VudGVyJyB8fCBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SW50ZXJhY3Rpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHRyYW5zaXRpb24gZW5kIGV2ZW50IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KSB7XG4gICAgLy8gSGFuZGxlIHRyYW5zaXRpb24gZW5kIGV2ZW50IG9uIHRoZSBjaGlwIHdoZW4gaXQgaXMgYWJvdXQgdG8gYmUgcmVtb3ZlZC5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5ldmVudFRhcmdldEhhc0NsYXNzKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZXZ0LnRhcmdldCksIGNzc0NsYXNzZXMuQ0hJUF9FWElUKSkge1xuICAgICAgaWYgKGV2dC5wcm9wZXJ0eU5hbWUgPT09ICd3aWR0aCcpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlSZW1vdmFsKCk7XG4gICAgICB9IGVsc2UgaWYgKGV2dC5wcm9wZXJ0eU5hbWUgPT09ICdvcGFjaXR5Jykge1xuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vdXNpbmctY3NzLXRyYW5zaXRpb25zLWF1dG8tZGltZW5zaW9ucy8jYXJ0aWNsZS1oZWFkZXItaWQtNVxuICAgICAgICBjb25zdCBjaGlwV2lkdGggPSB0aGlzLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZSgnd2lkdGgnKTtcblxuICAgICAgICAvLyBPbiB0aGUgbmV4dCBmcmFtZSAob25jZSB3ZSBnZXQgdGhlIGNvbXB1dGVkIHdpZHRoKSwgZXhwbGljaXRseSBzZXQgdGhlIGNoaXAncyB3aWR0aFxuICAgICAgICAvLyB0byBpdHMgY3VycmVudCBwaXhlbCB3aWR0aCwgc28gd2UgYXJlbid0IHRyYW5zaXRpb25pbmcgb3V0IG9mICdhdXRvJy5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlUHJvcGVydHkoJ3dpZHRoJywgY2hpcFdpZHRoKTtcblxuICAgICAgICAgIC8vIFRvIG1pdGlnYXRlIGppdHRlciwgc3RhcnQgdHJhbnNpdGlvbmluZyBwYWRkaW5nIGFuZCBtYXJnaW4gYmVmb3JlIHdpZHRoLlxuICAgICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVQcm9wZXJ0eSgncGFkZGluZycsICcwJyk7XG4gICAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZVByb3BlcnR5KCdtYXJnaW4nLCAnMCcpO1xuXG4gICAgICAgICAgLy8gT24gdGhlIG5leHQgZnJhbWUgKG9uY2Ugd2lkdGggaXMgZXhwbGljaXRseSBzZXQpLCB0cmFuc2l0aW9uIHdpZHRoIHRvIDAuXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVQcm9wZXJ0eSgnd2lkdGgnLCAnMCcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYSB0cmFuc2l0aW9uIGVuZCBldmVudCBvbiB0aGUgbGVhZGluZyBpY29uIG9yIGNoZWNrbWFyaywgc2luY2UgdGhlIHRyYW5zaXRpb24gZW5kIGV2ZW50IGJ1YmJsZXMuXG4gICAgaWYgKGV2dC5wcm9wZXJ0eU5hbWUgIT09ICdvcGFjaXR5Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5ldmVudFRhcmdldEhhc0NsYXNzKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZXZ0LnRhcmdldCksIGNzc0NsYXNzZXMuTEVBRElOR19JQ09OKSAmJlxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuU0VMRUNURUQpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzVG9MZWFkaW5nSWNvbihjc3NDbGFzc2VzLkhJRERFTl9MRUFESU5HX0lDT04pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hZGFwdGVyXy5ldmVudFRhcmdldEhhc0NsYXNzKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZXZ0LnRhcmdldCksIGNzc0NsYXNzZXMuQ0hFQ0tNQVJLKSAmJlxuICAgICAgICAgICAgICAgIXRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5TRUxFQ1RFRCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3NGcm9tTGVhZGluZ0ljb24oY3NzQ2xhc3Nlcy5ISURERU5fTEVBRElOR19JQ09OKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBpbnRlcmFjdGlvbiBldmVudCBvbiB0aGUgdHJhaWxpbmcgaWNvbiBlbGVtZW50LiBUaGlzIGlzIHVzZWQgdG9cbiAgICogcHJldmVudCB0aGUgcmlwcGxlIGZyb20gYWN0aXZhdGluZyBvbiBpbnRlcmFjdGlvbiB3aXRoIHRoZSB0cmFpbGluZyBpY29uLlxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVUcmFpbGluZ0ljb25JbnRlcmFjdGlvbihldnQpIHtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKGV2dC50eXBlID09PSAnY2xpY2snIHx8IGV2dC5rZXkgPT09ICdFbnRlcicgfHwgZXZ0LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uKCk7XG4gICAgICBpZiAodGhpcy5zaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrXykge1xuICAgICAgICB0aGlzLmJlZ2luRXhpdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGRldGFpbDoge1xuICogICAgIGNoaXA6IHtmb3VuZGF0aW9uOiAhTURDQ2hpcEZvdW5kYXRpb259LFxuICogICB9LFxuICogICBidWJibGVzOiBib29sZWFuLFxuICogfX1cbiAqL1xubGV0IE1EQ0NoaXBJbnRlcmFjdGlvbkV2ZW50VHlwZTtcblxuZXhwb3J0IHtNRENDaGlwRm91bmRhdGlvbiwgTURDQ2hpcEludGVyYWN0aW9uRXZlbnRUeXBlfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgbGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCA9IHdpbmRvd09iai5DU1MgJiYgdHlwZW9mIHdpbmRvd09iai5DU1Muc3VwcG9ydHMgPT09ICdmdW5jdGlvbic7XG4gIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzID0gd2luZG93T2JqLkNTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcbiAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU0NjY5XG4gIC8vIFNlZTogUkVBRE1FIHNlY3Rpb24gb24gU2FmYXJpXG4gIGNvbnN0IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyA9IChcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnY29sb3InLCAnIzAwMDAwMDAwJylcbiAgKTtcblxuICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghZm9yY2VSZWZyZXNoKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBwYWdlT2Zmc2V0XG4gKiBAcGFyYW0geyFDbGllbnRSZWN0fSBjbGllbnRSZWN0XG4gKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGRlYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZm9jdXM6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgYmx1cjogKHN0cmluZ3x1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJJbmZvVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVGb2N1cygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlQmx1cigpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG5cbiAgICAvKiogQHByaXZhdGUge3tsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0V2ZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc1N1cHBvcnRlZF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFBY3RpdmF0aW9uU3RhdGVUeXBlfVxuICAgKi9cbiAgZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiBmYWxzZSxcbiAgICAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogZmFsc2UsXG4gICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXG4gICAgICBhY3RpdmF0aW9uRXZlbnQ6IG51bGwsXG4gICAgICBpc1Byb2dyYW1tYXRpYzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2YXRpb25UaW1lcl8pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcbiAgICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgfVxuXG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSAmJiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleUNvZGUgPT09IDMyKSkge1xuICAgICAgICAvLyBJZiBzcGFjZSB3YXMgcHJlc3NlZCwgdHJ5IGFnYWluIHdpdGhpbiBhbiByQUYgY2FsbCB0byBkZXRlY3QgOmFjdGl2ZSwgYmVjYXVzZSBkaWZmZXJlbnQgVUFzIHJlcG9ydFxuICAgICAgICAvLyBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgICAvLyBXZSB0cnkgZmlyc3Qgb3V0c2lkZSByQUYgdG8gc3VwcG9ydCBFZGdlLCB3aGljaCBkb2VzIG5vdCBleGhpYml0IHRoaXMgcHJvYmxlbSwgYnV0IHdpbGwgY3Jhc2ggaWYgYSBDU1NcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgc2V0IHdpdGhpbiBhIHJBRiBjYWxsYmFjayBmb3IgYSBzdWJtaXQgYnV0dG9uIGludGVyYWN0aW9uICgjMjI0MSkuXG4gICAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpIHtcbiAgICByZXR1cm4gKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oZSkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIGNvbnN0IGV2dE9iamVjdCA9IG51bGw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhldnRPYmplY3QsIHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyhlLCB7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEU7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xuaW1wb3J0IHtcbiAgc3VwcG9ydHNDc3NWYXJpYWJsZXMsXG4gIGdldE1hdGNoZXNQcm9wZXJ0eSxcbiAgYXBwbHlQYXNzaXZlXG59IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcblxuZXhwb3J0IGNsYXNzIFJpcHBsZUJhc2UgZXh0ZW5kcyBNRENSaXBwbGVGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBNQVRDSEVTKCkge1xuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xuICAgIHJldHVybiAoXG4gICAgICBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XG4gICAgICAoUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxuICAgIClcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cmZhY2VBY3RpdmUocmVmKSB7XG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZtLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB7XG4gICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbFtSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uZGlzYWJsZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udGFpbnNFdmVudFRhcmdldDogdGFyZ2V0ID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxuICAgICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgIGV2dFR5cGUsXG4gICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IHg6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0IH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIClcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXZcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgdi1vbj1cIiRsaXN0ZW5lcnNcIj5cbiAgICA8aVxuICAgICAgdi1pZj1cImhhdmVsZWFkaW5nSWNvblwiXG4gICAgICByZWY9XCJsZWFkaW5nSWNvblwiXG4gICAgICA6Y2xhc3M9XCJsZWFkaW5nQ2xhc3Nlc1wiXG4gICAgICBjbGFzcz1cIm1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS1sZWFkaW5nXCJcbiAgICA+e3sgbGVhZGluZ0ljb24gfX08L2k+XG4gICAgPGRpdlxuICAgICAgdi1pZj1cImlzRmlsdGVyXCJcbiAgICAgIGNsYXNzPVwibWRjLWNoaXBfX2NoZWNrbWFya1wiPlxuICAgICAgPHN2Z1xuICAgICAgICBjbGFzcz1cIm1kYy1jaGlwX19jaGVja21hcmstc3ZnXCJcbiAgICAgICAgdmlld0JveD1cIi0yIC0zIDMwIDMwXCI+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgY2xhc3M9XCJtZGMtY2hpcF9fY2hlY2ttYXJrLXBhdGhcIlxuICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICBzdHJva2U9XCJibGFja1wiXG4gICAgICAgICAgZD1cIk0xLjczLDEyLjkxIDguMSwxOS4yOCAyMi43OSw0LjU5XCIvPlxuICAgICAgPC9zdmc+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1jaGlwX190ZXh0XCI+XG4gICAgICA8c2xvdC8+XG4gICAgPC9kaXY+XG4gICAgPGlcbiAgICAgIHYtaWY9XCJoYXZldHJhaWxpbmdJY29uXCJcbiAgICAgIHJlZj1cInRyYWlsaW5nSWNvblwiXG4gICAgICA6Y2xhc3M9XCJ0cmFpbGluZ0NsYXNzZXNcIlxuICAgICAgY2xhc3M9XCJtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmdcIlxuICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgID57eyB0cmFpbGluZ0ljb24gfX08L2k+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbmFwcGx5UGFzc2l2ZVxuPHNjcmlwdD5cbmltcG9ydCB7IE1EQ0NoaXBGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzL2NoaXAvZm91bmRhdGlvbidcbmltcG9ydCB7IEN1c3RvbUxpbmtNaXhpbiwgZW1pdEN1c3RvbUV2ZW50LCBhcHBseVBhc3NpdmUgfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHsgUmlwcGxlQmFzZSB9IGZyb20gJy4uL3JpcHBsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWNoaXAnLFxuICBtaXhpbnM6IFtDdXN0b21MaW5rTWl4aW5dLFxuICBwcm9wczoge1xuICAgIGxlYWRpbmdJY29uOiBbU3RyaW5nXSxcbiAgICB0cmFpbGluZ0ljb246IFtTdHJpbmddLFxuICAgIGxlYWRpbmdJY29uQ2xhc3NlczogW09iamVjdF0sXG4gICAgdHJhaWxpbmdJY29uQ2xhc3NlczogW09iamVjdF1cbiAgfSxcbiAgaW5qZWN0OiBbJ21kY0NoaXBTZXQnXSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWNoaXAnOiB0cnVlXG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBpc0ZpbHRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLm1kY0NoaXBTZXQgJiYgdGhpcy5tZGNDaGlwU2V0LmZpbHRlclxuICAgIH0sXG4gICAgaGF2ZWxlYWRpbmdJY29uKCkge1xuICAgICAgcmV0dXJuICEhdGhpcy5sZWFkaW5nSWNvbiB8fCB0aGlzLmxlYWRpbmdJY29uQ2xhc3Nlc1xuICAgIH0sXG4gICAgaGF2ZXRyYWlsaW5nSWNvbigpIHtcbiAgICAgIHJldHVybiAhIXRoaXMudHJhaWxpbmdJY29uIHx8IHRoaXMudHJhaWxpbmdJY29uQ2xhc3Nlc1xuICAgIH0sXG4gICAgbGVhZGluZ0NsYXNzZXMoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIHtcbiAgICAgICAgICAnbWF0ZXJpYWwtaWNvbnMnOiAhIXRoaXMubGVhZGluZ0ljb25cbiAgICAgICAgfSxcbiAgICAgICAgdGhpcy5sZWFkaW5nSWNvbkNsYXNzZXNcbiAgICAgIClcbiAgICB9LFxuICAgIHRyYWlsaW5nQ2xhc3NlcygpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAge1xuICAgICAgICAgICdtYXRlcmlhbC1pY29ucyc6ICEhdGhpcy50cmFpbGluZ0ljb25cbiAgICAgICAgfSxcbiAgICAgICAgdGhpcy50cmFpbGluZ0ljb25DbGFzc2VzXG4gICAgICApXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENDaGlwRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICBpZiAodGhpcy5oYXZlbGVhZGluZ0ljb24pIHtcbiAgICAgICAgICB0aGlzLiRyZWZzLmxlYWRpbmdJY29uLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3NGcm9tTGVhZGluZ0ljb246IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmhhdmVsZWFkaW5nSWNvbikge1xuICAgICAgICAgIHRoaXMuJHJlZnMubGVhZGluZ0ljb24uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBldmVudFRhcmdldEhhc0NsYXNzOiAodGFyZ2V0LCBjbGFzc05hbWUpID0+XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgICAgbm90aWZ5SW50ZXJhY3Rpb246ICgpID0+IHtcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KFxuICAgICAgICAgIHRoaXMuJGVsLFxuICAgICAgICAgIE1EQ0NoaXBGb3VuZGF0aW9uLnN0cmluZ3MuSU5URVJBQ1RJT05fRVZFTlQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2hpcDogdGhpc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICB9LFxuICAgICAgbm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb246ICgpID0+IHtcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KFxuICAgICAgICAgIHRoaXMuJGVsLFxuICAgICAgICAgIE1EQ0NoaXBGb3VuZGF0aW9uLnN0cmluZ3MuVFJBSUxJTkdfSUNPTl9JTlRFUkFDVElPTl9FVkVOVCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjaGlwOiB0aGlzXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICAgIH0sXG5cbiAgICAgIHJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICBpZiAodGhpcy4kcmVmcy50cmFpbGluZ0ljb24pIHtcbiAgICAgICAgICB0aGlzLiRyZWZzLnRyYWlsaW5nSWNvbi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFpbGluZ0ljb25JbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLiRyZWZzLnRyYWlsaW5nSWNvbikge1xuICAgICAgICAgIHRoaXMuJHJlZnMudHJhaWxpbmdJY29uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbm90aWZ5UmVtb3ZhbDogKCkgPT4ge1xuICAgICAgICBlbWl0Q3VzdG9tRXZlbnQoXG4gICAgICAgICAgdGhpcy4kZWwsXG4gICAgICAgICAgTURDQ2hpcEZvdW5kYXRpb24uc3RyaW5ncy5SRU1PVkFMX0VWRU5ULFxuICAgICAgICAgIHsgY2hpcDogdGhpcyB9LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIGdldENvbXB1dGVkU3R5bGVWYWx1ZTogcHJvcGVydHlOYW1lID0+XG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuJGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSksXG4gICAgICBzZXRTdHlsZVByb3BlcnR5OiAocHJvcGVydHksIHZhbHVlKSA9PlxuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsIHByb3BlcnR5LCB2YWx1ZSlcbiAgICB9KVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuXG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHRvZ2dsZVNlbGVjdGVkKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnRvZ2dsZVNlbGVjdGVkKClcbiAgICB9LFxuICAgIGlzU2VsZWN0ZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLmlzU2VsZWN0ZWQoKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQge01EQ0NoaXBJbnRlcmFjdGlvbkV2ZW50VHlwZX0gZnJvbSAnLi4vY2hpcC9mb3VuZGF0aW9uJztcblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIENoaXAgU2V0LlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIENoaXAgU2V0IGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENDaGlwU2V0QWRhcHRlciB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MgbmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFNRENDaGlwSW50ZXJhY3Rpb25FdmVudFR5cGUpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIHJvb3QgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighTURDQ2hpcEludGVyYWN0aW9uRXZlbnRUeXBlKTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNoaXAgb2JqZWN0IGZyb20gdGhlIGNoaXAgc2V0LlxuICAgKiBAcGFyYW0geyFPYmplY3R9IGNoaXBcbiAgICovXG4gIHJlbW92ZUNoaXAoY2hpcCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ2hpcFNldEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBDSElQX1NFTEVDVE9SOiAnLm1kYy1jaGlwJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgQ0hPSUNFOiAnbWRjLWNoaXAtc2V0LS1jaG9pY2UnLFxuICBGSUxURVI6ICdtZGMtY2hpcC1zZXQtLWZpbHRlcicsXG59O1xuXG5leHBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NoaXBTZXRBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCB7TURDQ2hpcEZvdW5kYXRpb24sIE1EQ0NoaXBJbnRlcmFjdGlvbkV2ZW50VHlwZX0gZnJvbSAnLi4vY2hpcC9mb3VuZGF0aW9uJztcbmltcG9ydCB7c3RyaW5ncywgY3NzQ2xhc3Nlc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENDaGlwU2V0QWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDQ2hpcFNldEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENDaGlwU2V0QWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENDaGlwU2V0QWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ0NoaXBTZXRBZGFwdGVyfSAqLyAoe1xuICAgICAgaGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZW1vdmVDaGlwOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENDaGlwU2V0QWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDQ2hpcFNldEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3RlZCBjaGlwcyBpbiB0aGUgc2V0LiBPbmx5IHVzZWQgZm9yIGNob2ljZSBjaGlwIHNldCBvciBmaWx0ZXIgY2hpcCBzZXQuXG4gICAgICogQHByaXZhdGUgeyFBcnJheTwhTURDQ2hpcEZvdW5kYXRpb24+fVxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0ZWRDaGlwc18gPSBbXTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIU1EQ0NoaXBJbnRlcmFjdGlvbkV2ZW50VHlwZSk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmNoaXBJbnRlcmFjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVDaGlwSW50ZXJhY3Rpb25fKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighTURDQ2hpcEludGVyYWN0aW9uRXZlbnRUeXBlKTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuY2hpcFJlbW92YWxIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlQ2hpcFJlbW92YWxfKGV2dCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoXG4gICAgICBNRENDaGlwRm91bmRhdGlvbi5zdHJpbmdzLklOVEVSQUNUSU9OX0VWRU5ULCB0aGlzLmNoaXBJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKFxuICAgICAgTURDQ2hpcEZvdW5kYXRpb24uc3RyaW5ncy5SRU1PVkFMX0VWRU5ULCB0aGlzLmNoaXBSZW1vdmFsSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoXG4gICAgICBNRENDaGlwRm91bmRhdGlvbi5zdHJpbmdzLklOVEVSQUNUSU9OX0VWRU5ULCB0aGlzLmNoaXBJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoXG4gICAgICBNRENDaGlwRm91bmRhdGlvbi5zdHJpbmdzLlJFTU9WQUxfRVZFTlQsIHRoaXMuY2hpcFJlbW92YWxIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgZ2l2ZW4gY2hpcC4gRGVzZWxlY3RzIGFsbCBvdGhlciBjaGlwcyBpZiB0aGUgY2hpcCBzZXQgaXMgb2YgdGhlIGNob2ljZSB2YXJpYW50LlxuICAgKiBAcGFyYW0geyFNRENDaGlwRm91bmRhdGlvbn0gY2hpcEZvdW5kYXRpb25cbiAgICovXG4gIHNlbGVjdChjaGlwRm91bmRhdGlvbikge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuQ0hPSUNFKSkge1xuICAgICAgdGhpcy5kZXNlbGVjdEFsbF8oKTtcbiAgICB9XG4gICAgY2hpcEZvdW5kYXRpb24uc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgdGhpcy5zZWxlY3RlZENoaXBzXy5wdXNoKGNoaXBGb3VuZGF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgdGhlIGdpdmVuIGNoaXAuXG4gICAqIEBwYXJhbSB7IU1EQ0NoaXBGb3VuZGF0aW9ufSBjaGlwRm91bmRhdGlvblxuICAgKi9cbiAgZGVzZWxlY3QoY2hpcEZvdW5kYXRpb24pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRDaGlwc18uaW5kZXhPZihjaGlwRm91bmRhdGlvbik7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDaGlwc18uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgY2hpcEZvdW5kYXRpb24uc2V0U2VsZWN0ZWQoZmFsc2UpO1xuICB9XG5cbiAgLyoqIERlc2VsZWN0cyBhbGwgc2VsZWN0ZWQgY2hpcHMuICovXG4gIGRlc2VsZWN0QWxsXygpIHtcbiAgICB0aGlzLnNlbGVjdGVkQ2hpcHNfLmZvckVhY2goKGNoaXBGb3VuZGF0aW9uKSA9PiB7XG4gICAgICBjaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZChmYWxzZSk7XG4gICAgfSk7XG4gICAgdGhpcy5zZWxlY3RlZENoaXBzXy5sZW5ndGggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBjaGlwIGludGVyYWN0aW9uIGV2ZW50XG4gICAqIEBwYXJhbSB7IU1EQ0NoaXBJbnRlcmFjdGlvbkV2ZW50VHlwZX0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVDaGlwSW50ZXJhY3Rpb25fKGV2dCkge1xuICAgIGNvbnN0IGNoaXBGb3VuZGF0aW9uID0gZXZ0LmRldGFpbC5jaGlwLmZvdW5kYXRpb247XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5DSE9JQ0UpIHx8IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5GSUxURVIpKSB7XG4gICAgICBpZiAoY2hpcEZvdW5kYXRpb24uaXNTZWxlY3RlZCgpKSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3QoY2hpcEZvdW5kYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3QoY2hpcEZvdW5kYXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBldmVudCB3aGVuIGEgY2hpcCBpcyByZW1vdmVkLlxuICAgKiBAcGFyYW0geyFNRENDaGlwSW50ZXJhY3Rpb25FdmVudFR5cGV9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlQ2hpcFJlbW92YWxfKGV2dCkge1xuICAgIGNvbnN0IHtjaGlwfSA9IGV2dC5kZXRhaWw7XG4gICAgdGhpcy5kZXNlbGVjdChjaGlwLmZvdW5kYXRpb24pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2hpcChjaGlwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDaGlwU2V0Rm91bmRhdGlvbjtcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIlxuICAgIHYtb249XCIkbGlzdGVuZXJzXCI+XG4gICAgPHNsb3QvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDQ2hpcFNldEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2NoaXBzL2NoaXAtc2V0L2ZvdW5kYXRpb24nXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtY2hpcC1zZXQnLFxuICBwcm9wczoge1xuICAgIGNob2ljZTogW0Jvb2xlYW5dLFxuICAgIGZpbHRlcjogW0Jvb2xlYW5dLFxuICAgIGlucHV0OiBbQm9vbGVhbl1cbiAgfSxcbiAgcHJvdmlkZSgpIHtcbiAgICByZXR1cm4geyBtZGNDaGlwU2V0OiB0aGlzIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWNoaXAtc2V0JzogdHJ1ZSxcbiAgICAgICAgJ21kYy1jaGlwLXNldC0tY2hvaWNlJzogdGhpcy5jaG9pY2UsXG4gICAgICAgICdtZGMtY2hpcC1zZXQtLWZpbHRlcic6IHRoaXMuZmlsdGVyLFxuICAgICAgICAnbWRjLWNoaXAtc2V0LS1pbnB1dCc6IHRoaXMuaW5wdXRcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBTZXRGb3VuZGF0aW9uKHtcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICByZW1vdmVDaGlwOiBjaGlwID0+IHtcbiAgICAgICAgLy8gVE9ETzogbWF5IG5lZWQgcmVmYWN0b3JpbmdcbiAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4gY2hpcC4kZGVzdHJveSgpKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxuICB9LFxuICBtZXRob2RzOiB7fVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNDaGlwIGZyb20gJy4vbWRjLWNoaXAudnVlJ1xuaW1wb3J0IG1kY0NoaXBTZXQgZnJvbSAnLi9tZGMtY2hpcC1zZXQudnVlJ1xuXG5leHBvcnQgeyBtZGNDaGlwLCBtZGNDaGlwU2V0IH1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY0NoaXAsXG4gIG1kY0NoaXBTZXRcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbInN1cHBvcnRzUGFzc2l2ZV8iLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJ3aW5kb3ciLCJmb3JjZVJlZnJlc2giLCJ1bmRlZmluZWQiLCJpc1N1cHBvcnRlZCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJlIiwiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsIkN1c3RvbUxpbmsiLCJmdW5jdGlvbmFsIiwicHJvcHMiLCJ0YWciLCJ0eXBlIiwiU3RyaW5nIiwiZGVmYXVsdCIsImxpbmsiLCJPYmplY3QiLCJyZW5kZXIiLCJoIiwiY29udGV4dCIsImVsZW1lbnQiLCJkYXRhIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJwYXJlbnQiLCIkcm91dGVyIiwiJHJvb3QiLCIkb3B0aW9ucyIsIm9uIiwiY2xpY2siLCJuYXRpdmVPbiIsImNoaWxkcmVuIiwiQ3VzdG9tTGlua01peGluIiwidG8iLCJleGFjdCIsIkJvb2xlYW4iLCJhcHBlbmQiLCJyZXBsYWNlIiwiYWN0aXZlQ2xhc3MiLCJleGFjdEFjdGl2ZUNsYXNzIiwiY29tcHV0ZWQiLCJlbWl0Q3VzdG9tRXZlbnQiLCJlbCIsImV2dFR5cGUiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50Iiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDaGlwQWRhcHRlciIsImNsYXNzTmFtZSIsInRhcmdldCIsImhhbmRsZXIiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsInN0cmluZ3MiLCJFTlRSWV9BTklNQVRJT05fTkFNRSIsIklOVEVSQUNUSU9OX0VWRU5UIiwiVFJBSUxJTkdfSUNPTl9JTlRFUkFDVElPTl9FVkVOVCIsIlJFTU9WQUxfRVZFTlQiLCJDSEVDS01BUktfU0VMRUNUT1IiLCJMRUFESU5HX0lDT05fU0VMRUNUT1IiLCJUUkFJTElOR19JQ09OX1NFTEVDVE9SIiwiY3NzQ2xhc3NlcyIsIkNIRUNLTUFSSyIsIkNISVBfRVhJVCIsIkhJRERFTl9MRUFESU5HX0lDT04iLCJMRUFESU5HX0lDT04iLCJUUkFJTElOR19JQ09OIiwiU0VMRUNURUQiLCJNRENDaGlwRm91bmRhdGlvbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsImFkZENsYXNzVG9MZWFkaW5nSWNvbiIsInJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uIiwiZXZlbnRUYXJnZXRIYXNDbGFzcyIsInJlZ2lzdGVyRXZlbnRIYW5kbGVyIiwiZGVyZWdpc3RlckV2ZW50SGFuZGxlciIsInJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlciIsIm5vdGlmeUludGVyYWN0aW9uIiwibm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb24iLCJub3RpZnlSZW1vdmFsIiwiZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlIiwic2V0U3R5bGVQcm9wZXJ0eSIsImRlZmF1bHRBZGFwdGVyIiwic2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGlja18iLCJpbnRlcmFjdGlvbkhhbmRsZXJfIiwiaGFuZGxlSW50ZXJhY3Rpb24iLCJ0cmFuc2l0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVUcmFuc2l0aW9uRW5kIiwidHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyXyIsImhhbmRsZVRyYWlsaW5nSWNvbkludGVyYWN0aW9uIiwiZm9yRWFjaCIsInNlbGVjdGVkIiwic2hvdWxkUmVtb3ZlIiwia2V5Q29kZSIsImNoaXBXaWR0aCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInN0b3BQcm9wYWdhdGlvbiIsImJlZ2luRXhpdCIsIk1EQ1JpcHBsZUFkYXB0ZXIiLCJ2YXJOYW1lIiwiUk9PVCIsIlVOQk9VTkRFRCIsIkJHX0ZPQ1VTRUQiLCJGR19BQ1RJVkFUSU9OIiwiRkdfREVBQ1RJVkFUSU9OIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJudW1iZXJzIiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwibGVuZ3RoIiwic29tZSIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInB1c2giLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwiZXZlbnQiLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJzZXRUaW1lb3V0IiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCIkZWwiLCJkaXNhYmxlZCIsIiRzZXQiLCJjbGFzc2VzIiwiJGRlbGV0ZSIsImNvbnRhaW5zIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJtaXhpbnMiLCJsZWFkaW5nSWNvbiIsInRyYWlsaW5nSWNvbiIsImxlYWRpbmdJY29uQ2xhc3NlcyIsInRyYWlsaW5nSWNvbkNsYXNzZXMiLCJpbmplY3QiLCJpc0ZpbHRlciIsIm1kY0NoaXBTZXQiLCJoYXZlbGVhZGluZ0ljb24iLCJoYXZldHJhaWxpbmdJY29uIiwibGVhZGluZ0NsYXNzZXMiLCJ0cmFpbGluZ0NsYXNzZXMiLCJtb3VudGVkIiwiZm91bmRhdGlvbiIsImNsYXNzTGlzdCIsIiRyZWZzIiwiYWRkIiwiY2hpcCIsImdldFByb3BlcnR5VmFsdWUiLCJwcm9wZXJ0eSIsImluaXQiLCJyaXBwbGUiLCJiZWZvcmVEZXN0cm95IiwiZGVzdHJveSIsIm1ldGhvZHMiLCJ0b2dnbGVTZWxlY3RlZCIsImlzU2VsZWN0ZWQiLCJNRENDaGlwU2V0QWRhcHRlciIsIkNISVBfU0VMRUNUT1IiLCJDSE9JQ0UiLCJGSUxURVIiLCJNRENDaGlwU2V0Rm91bmRhdGlvbiIsInJlbW92ZUNoaXAiLCJzZWxlY3RlZENoaXBzXyIsImNoaXBJbnRlcmFjdGlvbkhhbmRsZXJfIiwiaGFuZGxlQ2hpcEludGVyYWN0aW9uXyIsImNoaXBSZW1vdmFsSGFuZGxlcl8iLCJoYW5kbGVDaGlwUmVtb3ZhbF8iLCJjaGlwRm91bmRhdGlvbiIsImRlc2VsZWN0QWxsXyIsInNldFNlbGVjdGVkIiwiaW5kZXgiLCJzcGxpY2UiLCJkZXNlbGVjdCIsInNlbGVjdCIsImNob2ljZSIsImlucHV0IiwicHJvdmlkZSIsIiRuZXh0VGljayIsIiRkZXN0cm95IiwibWRjQ2hpcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLElBQUlBLHlCQUFKOztJQUVBOzs7Ozs7QUFNQSxJQUFPLFNBQVNDLFlBQVQsR0FBZ0U7SUFBQSxNQUExQ0MsU0FBMEMsdUVBQTlCQyxNQUE4QjtJQUFBLE1BQXRCQyxZQUFzQix1RUFBUCxLQUFPOztJQUNyRSxNQUFJSixxQkFBcUJLLFNBQXJCLElBQWtDRCxZQUF0QyxFQUFvRDtJQUNsRCxRQUFJRSxjQUFjLEtBQWxCO0lBQ0EsUUFBSTtJQUNGSixnQkFBVUssUUFBVixDQUFtQkMsZ0JBQW5CLENBQW9DLE1BQXBDLEVBQTRDLElBQTVDLEVBQWtEO0lBQ2hELFlBQUlDLE9BQUosR0FBYztJQUNaSCx3QkFBYyxF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
