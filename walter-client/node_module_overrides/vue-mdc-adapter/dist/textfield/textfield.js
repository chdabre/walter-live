/**
* @module vue-mdc-adaptertextfield 0.17.0
* @exports VueMDCTextfield
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCTextfield = factory());
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

    /* global CustomEvent */

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
     * Adapter for MDC Text Field Helper Text.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the TextField helper text into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCTextFieldHelperTextAdapter = function () {
      function MDCTextFieldHelperTextAdapter() {
        classCallCheck(this, MDCTextFieldHelperTextAdapter);
      }

      createClass(MDCTextFieldHelperTextAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the helper text element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the helper text element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * Returns whether or not the helper text element contains the given class.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "hasClass",
        value: function hasClass(className) {}

        /**
         * Sets an attribute with a given value on the helper text element.
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(attr, value) {}

        /**
         * Removes an attribute from the helper text element.
         * @param {string} attr
         */

      }, {
        key: "removeAttr",
        value: function removeAttr(attr) {}

        /**
         * Sets the text content for the helper text element.
         * @param {string} content
         */

      }, {
        key: "setContent",
        value: function setContent(content) {}
      }]);
      return MDCTextFieldHelperTextAdapter;
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
      ARIA_HIDDEN: 'aria-hidden',
      ROLE: 'role'
    };

    /** @enum {string} */
    var cssClasses = {
      HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
      HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
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
     * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
     * @final
     */

    var MDCTextFieldHelperTextFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldHelperTextFoundation, _MDCFoundation);
      createClass(MDCTextFieldHelperTextFoundation, null, [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses;
        }

        /** @return enum {string} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings;
        }

        /**
         * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldHelperTextAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldHelperTextAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              setAttr: function setAttr() {},
              removeAttr: function removeAttr() {},
              setContent: function setContent() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldHelperTextAdapter} adapter
         */

      }]);

      function MDCTextFieldHelperTextFoundation(adapter) {
        classCallCheck(this, MDCTextFieldHelperTextFoundation);
        return possibleConstructorReturn(this, (MDCTextFieldHelperTextFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldHelperTextFoundation)).call(this, _extends(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)));
      }

      /**
       * Sets the content of the helper text field.
       * @param {string} content
       */


      createClass(MDCTextFieldHelperTextFoundation, [{
        key: 'setContent',
        value: function setContent(content) {
          this.adapter_.setContent(content);
        }

        /** @param {boolean} isPersistent Sets the persistency of the helper text. */

      }, {
        key: 'setPersistent',
        value: function setPersistent(isPersistent) {
          if (isPersistent) {
            this.adapter_.addClass(cssClasses.HELPER_TEXT_PERSISTENT);
          } else {
            this.adapter_.removeClass(cssClasses.HELPER_TEXT_PERSISTENT);
          }
        }

        /**
         * @param {boolean} isValidation True to make the helper text act as an
         *   error validation message.
         */

      }, {
        key: 'setValidation',
        value: function setValidation(isValidation) {
          if (isValidation) {
            this.adapter_.addClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          } else {
            this.adapter_.removeClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          }
        }

        /** Makes the helper text visible to the screen reader. */

      }, {
        key: 'showToScreenReader',
        value: function showToScreenReader() {
          this.adapter_.removeAttr(strings.ARIA_HIDDEN);
        }

        /**
         * Sets the validity of the helper text based on the input validity.
         * @param {boolean} inputIsValid
         */

      }, {
        key: 'setValidity',
        value: function setValidity(inputIsValid) {
          var helperTextIsPersistent = this.adapter_.hasClass(cssClasses.HELPER_TEXT_PERSISTENT);
          var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

          if (validationMsgNeedsDisplay) {
            this.adapter_.setAttr(strings.ROLE, 'alert');
          } else {
            this.adapter_.removeAttr(strings.ROLE);
          }

          if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
            this.hide_();
          }
        }

        /**
         * Hides the help text from screen readers.
         * @private
         */

      }, {
        key: 'hide_',
        value: function hide_() {
          this.adapter_.setAttr(strings.ARIA_HIDDEN, 'true');
        }
      }]);
      return MDCTextFieldHelperTextFoundation;
    }(MDCFoundation);

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
     * Adapter for MDC Text Field Icon.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the text field icon into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCTextFieldIconAdapter = function () {
      function MDCTextFieldIconAdapter() {
        classCallCheck(this, MDCTextFieldIconAdapter);
      }

      createClass(MDCTextFieldIconAdapter, [{
        key: "getAttr",

        /**
         * Gets the value of an attribute on the icon element.
         * @param {string} attr
         * @return {string}
         */
        value: function getAttr(attr) {}

        /**
         * Sets an attribute on the icon element.
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(attr, value) {}

        /**
         * Removes an attribute from the icon element.
         * @param {string} attr
         */

      }, {
        key: "removeAttr",
        value: function removeAttr(attr) {}

        /**
         * Sets the text content of the icon element.
         * @param {string} content
         */

      }, {
        key: "setContent",
        value: function setContent(content) {}

        /**
         * Registers an event listener on the icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(evtType, handler) {}

        /**
         * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
         */

      }, {
        key: "notifyIconAction",
        value: function notifyIconAction() {}
      }]);
      return MDCTextFieldIconAdapter;
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
      ICON_EVENT: 'MDCTextField:icon',
      ICON_ROLE: 'button'
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
     * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
     * @final
     */

    var MDCTextFieldIconFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldIconFoundation, _MDCFoundation);
      createClass(MDCTextFieldIconFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings$1;
        }

        /**
         * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldIconAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldIconAdapter} */{
              getAttr: function getAttr() {},
              setAttr: function setAttr() {},
              removeAttr: function removeAttr() {},
              setContent: function setContent() {},
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {},
              notifyIconAction: function notifyIconAction() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldIconAdapter} adapter
         */

      }]);

      function MDCTextFieldIconFoundation(adapter) {
        classCallCheck(this, MDCTextFieldIconFoundation);

        /** @private {string?} */
        var _this = possibleConstructorReturn(this, (MDCTextFieldIconFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldIconFoundation)).call(this, _extends(MDCTextFieldIconFoundation.defaultAdapter, adapter)));

        _this.savedTabIndex_ = null;

        /** @private {function(!Event): undefined} */
        _this.interactionHandler_ = function (evt) {
          return _this.handleInteraction(evt);
        };
        return _this;
      }

      createClass(MDCTextFieldIconFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this.savedTabIndex_ = this.adapter_.getAttr('tabindex');

          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
          });
        }

        /** @param {boolean} disabled */

      }, {
        key: 'setDisabled',
        value: function setDisabled(disabled) {
          if (!this.savedTabIndex_) {
            return;
          }

          if (disabled) {
            this.adapter_.setAttr('tabindex', '-1');
            this.adapter_.removeAttr('role');
          } else {
            this.adapter_.setAttr('tabindex', this.savedTabIndex_);
            this.adapter_.setAttr('role', strings$1.ICON_ROLE);
          }
        }

        /** @param {string} label */

      }, {
        key: 'setAriaLabel',
        value: function setAriaLabel(label) {
          this.adapter_.setAttr('aria-label', label);
        }

        /** @param {string} content */

      }, {
        key: 'setContent',
        value: function setContent(content) {
          this.adapter_.setContent(content);
        }

        /**
         * Handles an interaction event
         * @param {!Event} evt
         */

      }, {
        key: 'handleInteraction',
        value: function handleInteraction(evt) {
          if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
            this.adapter_.notifyIconAction();
          }
        }
      }]);
      return MDCTextFieldIconFoundation;
    }(MDCFoundation);

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
     * Adapter for MDC Text Field.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Text Field into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */

    var MDCTextFieldAdapter = function () {
      function MDCTextFieldAdapter() {
        classCallCheck(this, MDCTextFieldAdapter);
      }

      createClass(MDCTextFieldAdapter, [{
        key: 'addClass',

        /**
         * Adds a class to the root Element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the root Element.
         * @param {string} className
         */

      }, {
        key: 'removeClass',
        value: function removeClass(className) {}

        /**
         * Returns true if the root element contains the given class name.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: 'hasClass',
        value: function hasClass(className) {}

        /**
         * Registers an event handler on the root element for a given event.
         * @param {string} type
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'registerTextFieldInteractionHandler',
        value: function registerTextFieldInteractionHandler(type, handler) {}

        /**
         * Deregisters an event handler on the root element for a given event.
         * @param {string} type
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'deregisterTextFieldInteractionHandler',
        value: function deregisterTextFieldInteractionHandler(type, handler) {}

        /**
         * Registers an event listener on the native input element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'registerInputInteractionHandler',
        value: function registerInputInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the native input element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'deregisterInputInteractionHandler',
        value: function deregisterInputInteractionHandler(evtType, handler) {}

        /**
         * Registers a validation attribute change listener on the input element.
         * Handler accepts list of attribute names.
         * @param {function(!Array<string>): undefined} handler
         * @return {!MutationObserver}
         */

      }, {
        key: 'registerValidationAttributeChangeHandler',
        value: function registerValidationAttributeChangeHandler(handler) {}

        /**
         * Disconnects a validation attribute observer on the input element.
         * @param {!MutationObserver} observer
         */

      }, {
        key: 'deregisterValidationAttributeChangeHandler',
        value: function deregisterValidationAttributeChangeHandler(observer) {}

        /**
         * Returns an object representing the native text input element, with a
         * similar API shape. The object returned should include the value, disabled
         * and badInput properties, as well as the checkValidity() function. We never
         * alter the value within our code, however we do update the disabled
         * property, so if you choose to duck-type the return value for this method
         * in your implementation it's important to keep this in mind. Also note that
         * this method can return null, which the foundation will handle gracefully.
         * @return {?Element|?NativeInputType}
         */

      }, {
        key: 'getNativeInput',
        value: function getNativeInput() {}

        /**
         * Returns true if the textfield is focused.
         * We achieve this via `document.activeElement === this.root_`.
         * @return {boolean}
         */

      }, {
        key: 'isFocused',
        value: function isFocused() {}

        /**
         * Returns true if the direction of the root element is set to RTL.
         * @return {boolean}
         */

      }, {
        key: 'isRtl',
        value: function isRtl() {}

        /**
         * Activates the line ripple.
         */

      }, {
        key: 'activateLineRipple',
        value: function activateLineRipple() {}

        /**
         * Deactivates the line ripple.
         */

      }, {
        key: 'deactivateLineRipple',
        value: function deactivateLineRipple() {}

        /**
         * Sets the transform origin of the line ripple.
         * @param {number} normalizedX
         */

      }, {
        key: 'setLineRippleTransformOrigin',
        value: function setLineRippleTransformOrigin(normalizedX) {}

        /**
         * Only implement if label exists.
         * Shakes label if shouldShake is true.
         * @param {boolean} shouldShake
         */

      }, {
        key: 'shakeLabel',
        value: function shakeLabel(shouldShake) {}

        /**
         * Only implement if label exists.
         * Floats the label above the input element if shouldFloat is true.
         * @param {boolean} shouldFloat
         */

      }, {
        key: 'floatLabel',
        value: function floatLabel(shouldFloat) {}

        /**
         * Returns true if label element exists, false if it doesn't.
         * @return {boolean}
         */

      }, {
        key: 'hasLabel',
        value: function hasLabel() {}

        /**
         * Only implement if label exists.
         * Returns width of label in pixels.
         * @return {number}
         */

      }, {
        key: 'getLabelWidth',
        value: function getLabelWidth() {}

        /**
         * Returns true if outline element exists, false if it doesn't.
         * @return {boolean}
         */

      }, {
        key: 'hasOutline',
        value: function hasOutline() {}

        /**
         * Only implement if outline element exists.
         * Updates SVG Path and outline element based on the
         * label element width and RTL context.
         * @param {number} labelWidth
         * @param {boolean=} isRtl
         */

      }, {
        key: 'notchOutline',
        value: function notchOutline(labelWidth, isRtl) {}

        /**
         * Only implement if outline element exists.
         * Closes notch in outline element.
         */

      }, {
        key: 'closeOutline',
        value: function closeOutline() {}
      }]);
      return MDCTextFieldAdapter;
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
      ARIA_CONTROLS: 'aria-controls',
      INPUT_SELECTOR: '.mdc-text-field__input',
      LABEL_SELECTOR: '.mdc-floating-label',
      ICON_SELECTOR: '.mdc-text-field__icon',
      OUTLINE_SELECTOR: '.mdc-notched-outline',
      LINE_RIPPLE_SELECTOR: '.mdc-line-ripple'
    };

    /** @enum {string} */
    var cssClasses$1 = {
      ROOT: 'mdc-text-field',
      UPGRADED: 'mdc-text-field--upgraded',
      DISABLED: 'mdc-text-field--disabled',
      DENSE: 'mdc-text-field--dense',
      FOCUSED: 'mdc-text-field--focused',
      INVALID: 'mdc-text-field--invalid',
      BOX: 'mdc-text-field--box',
      OUTLINED: 'mdc-text-field--outlined'
    };

    /** @enum {number} */
    var numbers = {
      LABEL_SCALE: 0.75,
      DENSE_LABEL_SCALE: 0.923
    };

    // whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
    // under section: `Validation-related attributes`
    var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];

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
     * @extends {MDCFoundation<!MDCTextFieldAdapter>}
     * @final
     */

    var MDCTextFieldFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldFoundation, _MDCFoundation);
      createClass(MDCTextFieldFoundation, [{
        key: 'shouldShake',


        /** @return {boolean} */
        get: function get$$1() {
          return !this.isValid() && !this.isFocused_;
        }

        /** @return {boolean} */

      }, {
        key: 'shouldFloat',
        get: function get$$1() {
          return this.isFocused_ || !!this.getValue() || this.isBadInput_();
        }

        /**
         * {@see MDCTextFieldAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldAdapter}
         */

      }], [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses$1;
        }

        /** @return enum {string} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$2;
        }

        /** @return enum {string} */

      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers;
        }
      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {},
              deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {},
              registerInputInteractionHandler: function registerInputInteractionHandler() {},
              deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {},
              registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler() {},
              deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler() {},
              getNativeInput: function getNativeInput() {},
              isFocused: function isFocused() {},
              isRtl: function isRtl() {},
              activateLineRipple: function activateLineRipple() {},
              deactivateLineRipple: function deactivateLineRipple() {},
              setLineRippleTransformOrigin: function setLineRippleTransformOrigin() {},
              shakeLabel: function shakeLabel() {},
              floatLabel: function floatLabel() {},
              hasLabel: function hasLabel() {},
              getLabelWidth: function getLabelWidth() {},
              hasOutline: function hasOutline() {},
              notchOutline: function notchOutline() {},
              closeOutline: function closeOutline() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldAdapter} adapter
         * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
         */

      }]);

      function MDCTextFieldFoundation(adapter) {
        var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /** @type {!FoundationMapType} */{};
        classCallCheck(this, MDCTextFieldFoundation);

        /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
        var _this = possibleConstructorReturn(this, (MDCTextFieldFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldFoundation)).call(this, _extends(MDCTextFieldFoundation.defaultAdapter, adapter)));

        _this.helperText_ = foundationMap.helperText;
        /** @type {!MDCTextFieldIconFoundation|undefined} */
        _this.icon_ = foundationMap.icon;

        /** @private {boolean} */
        _this.isFocused_ = false;
        /** @private {boolean} */
        _this.receivedUserInput_ = false;
        /** @private {boolean} */
        _this.useCustomValidityChecking_ = false;
        /** @private {boolean} */
        _this.isValid_ = true;
        /** @private {function(): undefined} */
        _this.inputFocusHandler_ = function () {
          return _this.activateFocus();
        };
        /** @private {function(): undefined} */
        _this.inputBlurHandler_ = function () {
          return _this.deactivateFocus();
        };
        /** @private {function(): undefined} */
        _this.inputInputHandler_ = function () {
          return _this.autoCompleteFocus();
        };
        /** @private {function(!Event): undefined} */
        _this.setPointerXOffset_ = function (evt) {
          return _this.setTransformOrigin(evt);
        };
        /** @private {function(!Event): undefined} */
        _this.textFieldInteractionHandler_ = function () {
          return _this.handleTextFieldInteraction();
        };
        /** @private {function(!Array): undefined} */
        _this.validationAttributeChangeHandler_ = function (attributesList) {
          return _this.handleValidationAttributeChange(attributesList);
        };

        /** @private {!MutationObserver} */
        _this.validationObserver_;
        return _this;
      }

      createClass(MDCTextFieldFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
          // Ensure label does not collide with any pre-filled value.
          if (this.adapter_.hasLabel() && (this.getValue() || this.isBadInput_())) {
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }

          if (this.adapter_.isFocused()) {
            this.inputFocusHandler_();
          }

          this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
          this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
          this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
          ['mousedown', 'touchstart'].forEach(function (evtType) {
            _this2.adapter_.registerInputInteractionHandler(evtType, _this2.setPointerXOffset_);
          });
          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerTextFieldInteractionHandler(evtType, _this2.textFieldInteractionHandler_);
          });
          this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
          this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
          this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
          this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
          ['mousedown', 'touchstart'].forEach(function (evtType) {
            _this3.adapter_.deregisterInputInteractionHandler(evtType, _this3.setPointerXOffset_);
          });
          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterTextFieldInteractionHandler(evtType, _this3.textFieldInteractionHandler_);
          });
          this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
        }

        /**
         * Handles user interactions with the Text Field.
         */

      }, {
        key: 'handleTextFieldInteraction',
        value: function handleTextFieldInteraction() {
          if (this.adapter_.getNativeInput().disabled) {
            return;
          }
          this.receivedUserInput_ = true;
        }

        /**
         * Handles validation attribute changes
         * @param {!Array<string>} attributesList
         */

      }, {
        key: 'handleValidationAttributeChange',
        value: function handleValidationAttributeChange(attributesList) {
          var _this4 = this;

          attributesList.some(function (attributeName) {
            if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
              _this4.styleValidity_(true);
              return true;
            }
          });
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
            var isDense = this.adapter_.hasClass(cssClasses$1.DENSE);
            var labelScale = isDense ? numbers.DENSE_LABEL_SCALE : numbers.LABEL_SCALE;
            var labelWidth = this.adapter_.getLabelWidth() * labelScale;
            var isRtl = this.adapter_.isRtl();
            this.adapter_.notchOutline(labelWidth, isRtl);
          } else {
            this.adapter_.closeOutline();
          }
        }

        /**
         * Activates the text field focus state.
         */

      }, {
        key: 'activateFocus',
        value: function activateFocus() {
          this.isFocused_ = true;
          this.styleFocused_(this.isFocused_);
          this.adapter_.activateLineRipple();
          this.notchOutline(this.shouldFloat);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
          }
          if (this.helperText_) {
            this.helperText_.showToScreenReader();
          }
        }

        /**
         * Sets the line ripple's transform origin, so that the line ripple activate
         * animation will animate out from the user's click location.
         * @param {!Event} evt
         */

      }, {
        key: 'setTransformOrigin',
        value: function setTransformOrigin(evt) {
          var targetClientRect = evt.target.getBoundingClientRect();
          var evtCoords = { x: evt.clientX, y: evt.clientY };
          var normalizedX = evtCoords.x - targetClientRect.left;
          this.adapter_.setLineRippleTransformOrigin(normalizedX);
        }

        /**
         * Activates the Text Field's focus state in cases when the input value
         * changes without user input (e.g. programatically).
         */

      }, {
        key: 'autoCompleteFocus',
        value: function autoCompleteFocus() {
          if (!this.receivedUserInput_) {
            this.activateFocus();
          }
        }

        /**
         * Deactivates the Text Field's focus state.
         */

      }, {
        key: 'deactivateFocus',
        value: function deactivateFocus() {
          this.isFocused_ = false;
          this.adapter_.deactivateLineRipple();
          var input = this.getNativeInput_();
          var shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
          var isValid = this.isValid();
          this.styleValidity_(isValid);
          this.styleFocused_(this.isFocused_);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }
          if (shouldRemoveLabelFloat) {
            this.receivedUserInput_ = false;
          }
        }

        /**
         * @return {string} The value of the input Element.
         */

      }, {
        key: 'getValue',
        value: function getValue() {
          return this.getNativeInput_().value;
        }

        /**
         * @param {string} value The value to set on the input Element.
         */

      }, {
        key: 'setValue',
        value: function setValue(value) {
          this.getNativeInput_().value = value;
          var isValid = this.isValid();
          this.styleValidity_(isValid);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }
        }

        /**
         * @return {boolean} If a custom validity is set, returns that value.
         *     Otherwise, returns the result of native validity checks.
         */

      }, {
        key: 'isValid',
        value: function isValid() {
          return this.useCustomValidityChecking_ ? this.isValid_ : this.isNativeInputValid_();
        }

        /**
         * @param {boolean} isValid Sets the validity state of the Text Field.
         */

      }, {
        key: 'setValid',
        value: function setValid(isValid) {
          this.useCustomValidityChecking_ = true;
          this.isValid_ = isValid;
          // Retrieve from the getter to ensure correct logic is applied.
          isValid = this.isValid();
          this.styleValidity_(isValid);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
          }
        }

        /**
         * @return {boolean} True if the Text Field is disabled.
         */

      }, {
        key: 'isDisabled',
        value: function isDisabled() {
          return this.getNativeInput_().disabled;
        }

        /**
         * @param {boolean} disabled Sets the text-field disabled or enabled.
         */

      }, {
        key: 'setDisabled',
        value: function setDisabled(disabled) {
          this.getNativeInput_().disabled = disabled;
          this.styleDisabled_(disabled);
        }

        /**
         * @param {string} content Sets the content of the helper text.
         */

      }, {
        key: 'setHelperTextContent',
        value: function setHelperTextContent(content) {
          if (this.helperText_) {
            this.helperText_.setContent(content);
          }
        }

        /**
         * Sets the aria label of the icon.
         * @param {string} label
         */

      }, {
        key: 'setIconAriaLabel',
        value: function setIconAriaLabel(label) {
          if (this.icon_) {
            this.icon_.setAriaLabel(label);
          }
        }

        /**
         * Sets the text content of the icon.
         * @param {string} content
         */

      }, {
        key: 'setIconContent',
        value: function setIconContent(content) {
          if (this.icon_) {
            this.icon_.setContent(content);
          }
        }

        /**
         * @return {boolean} True if the Text Field input fails in converting the
         *     user-supplied value.
         * @private
         */

      }, {
        key: 'isBadInput_',
        value: function isBadInput_() {
          return this.getNativeInput_().validity.badInput;
        }

        /**
         * @return {boolean} The result of native validity checking
         *     (ValidityState.valid).
         */

      }, {
        key: 'isNativeInputValid_',
        value: function isNativeInputValid_() {
          return this.getNativeInput_().validity.valid;
        }

        /**
         * Styles the component based on the validity state.
         * @param {boolean} isValid
         * @private
         */

      }, {
        key: 'styleValidity_',
        value: function styleValidity_(isValid) {
          var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

          if (isValid) {
            this.adapter_.removeClass(INVALID);
          } else {
            this.adapter_.addClass(INVALID);
          }
          if (this.helperText_) {
            this.helperText_.setValidity(isValid);
          }
        }

        /**
         * Styles the component based on the focused state.
         * @param {boolean} isFocused
         * @private
         */

      }, {
        key: 'styleFocused_',
        value: function styleFocused_(isFocused) {
          var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

          if (isFocused) {
            this.adapter_.addClass(FOCUSED);
          } else {
            this.adapter_.removeClass(FOCUSED);
          }
        }

        /**
         * Styles the component based on the disabled state.
         * @param {boolean} isDisabled
         * @private
         */

      }, {
        key: 'styleDisabled_',
        value: function styleDisabled_(isDisabled) {
          var _MDCTextFieldFoundati = MDCTextFieldFoundation.cssClasses,
              DISABLED = _MDCTextFieldFoundati.DISABLED,
              INVALID = _MDCTextFieldFoundati.INVALID;

          if (isDisabled) {
            this.adapter_.addClass(DISABLED);
            this.adapter_.removeClass(INVALID);
          } else {
            this.adapter_.removeClass(DISABLED);
          }
          if (this.icon_) {
            this.icon_.setDisabled(isDisabled);
          }
        }

        /**
         * @return {!Element|!NativeInputType} The native text input from the
         * host environment, or a dummy if none exists.
         * @private
         */

      }, {
        key: 'getNativeInput_',
        value: function getNativeInput_() {
          return this.adapter_.getNativeInput() ||
          /** @type {!NativeInputType} */{
            value: '',
            disabled: false,
            validity: {
              badInput: false,
              valid: true
            }
          };
        }
      }]);
      return MDCTextFieldFoundation;
    }(MDCFoundation);

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
    var cssClasses$2 = {
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
          return cssClasses$2;
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
          this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
          this.adapter_.addClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
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
          this.adapter_.addClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
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
          var isDeactivating = this.adapter_.hasClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);

          if (evt.propertyName === 'opacity') {
            if (isDeactivating) {
              this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
              this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
            }
          }
        }
      }]);
      return MDCLineRippleFoundation;
    }(MDCFoundation);

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
    var cssClasses$3 = {
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
          return cssClasses$3;
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
    var strings$3 = {
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
          return strings$3;
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

    var cssClasses$5 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings$4 = {
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
          return cssClasses$5;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$4;
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

    var mdcTextField = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-textfield-wrapper", style: { width: _vm.fullwidth ? '100%' : undefined }, attrs: { "id": _vm.id } }, [_c('div', { ref: "root", class: _vm.rootClasses }, [!!_vm.hasLeadingIcon ? _c('i', { ref: "icon", staticClass: "mdc-text-field__icon", class: _vm.hasLeadingIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("leading-icon", [_vm._v(_vm._s(_vm.hasLeadingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.multiline ? _c('textarea', _vm._g(_vm._b({ ref: "input", class: _vm.inputClasses, attrs: { "id": _vm.vma_uid_, "minlength": _vm.minlength, "maxlength": _vm.maxlength, "placeholder": _vm.inputPlaceHolder, "aria-label": _vm.inputPlaceHolder, "aria-controls": _vm.inputAriaControls, "rows": _vm.rows, "cols": _vm.cols }, on: { "input": function input($event) {
              _vm.updateValue($event.target.value);
            } } }, 'textarea', _vm.$attrs, false), _vm.$listeners)) : _c('input', _vm._g(_vm._b({ ref: "input", class: _vm.inputClasses, attrs: { "id": _vm.vma_uid_, "type": _vm.type, "minlength": _vm.minlength, "maxlength": _vm.maxlength, "placeholder": _vm.inputPlaceHolder, "aria-label": _vm.inputPlaceHolder, "aria-controls": _vm.inputAriaControls }, on: { "input": function input($event) {
              _vm.updateValue($event.target.value);
            } } }, 'input', _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _vm.hasLabel ? _c('label', { ref: "label", class: _vm.labelClassesUpgraded, attrs: { "for": _vm.vma_uid_ } }, [_vm._v(" " + _vm._s(_vm.label) + " ")]) : _vm._e(), _vm._v(" "), !!_vm.hasTrailingIcon ? _c('i', { ref: "icon", staticClass: "mdc-text-field__icon", class: _vm.hasTrailingIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("trailing-icon", [_vm._v(_vm._s(_vm.hasTrailingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c('div', { ref: "outline", staticClass: "mdc-notched-outline", class: _vm.outlineClasses }, [_c('svg', [_c('path', { staticClass: "mdc-notched-outline__path", attrs: { "d": _vm.outlinePathAttr } })])]) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c('div', { ref: "outlineIdle", staticClass: "mdc-notched-outline__idle" }) : _vm._e(), _vm._v(" "), _vm.hasLineRipple ? _c('div', { ref: "lineRipple", class: _vm.lineRippleClasses, style: _vm.lineRippleStyles }) : _vm._e()]), _vm._v(" "), _vm.helptext ? _c('p', { ref: "help", class: _vm.helpClasses, attrs: { "id": 'help-' + _vm.vma_uid_, "aria-hidden": "true" } }, [_vm._v(" " + _vm._s(_vm.helptext) + " ")]) : _vm._e()]);
      }, staticRenderFns: [],
      name: 'mdc-textfield',
      mixins: [CustomElementMixin, DispatchFocusMixin, VMAUniqueIdMixin],
      inheritAttrs: false,
      model: {
        prop: 'value',
        event: 'model'
      },
      props: {
        value: String,
        type: {
          type: String,
          default: 'text',
          validator: function validator(value) {
            return ['text', 'email', 'search', 'password', 'tel', 'url', 'number'].indexOf(value) !== -1;
          }
        },
        dense: Boolean,
        label: String,
        helptext: String,
        helptextPersistent: Boolean,
        helptextValidation: Boolean,
        box: Boolean,
        outline: Boolean,
        disabled: Boolean,
        required: Boolean,
        valid: { type: Boolean, default: undefined },
        fullwidth: Boolean,
        multiline: Boolean,
        leadingIcon: [String, Array, Object],
        trailingIcon: [String, Array, Object],
        size: { type: [Number, String], default: 20 },
        minlength: { type: [Number, String], default: undefined },
        maxlength: { type: [Number, String], default: undefined },
        rows: { type: [Number, String], default: 8 },
        cols: { type: [Number, String], default: 40 },
        id: { type: String }
      },
      data: function data() {
        return {
          text: this.value,
          rootClasses: {
            'mdc-textfield': true,
            'mdc-text-field': true,
            'mdc-text-field--upgraded': true,
            'mdc-text-field--disabled': this.disabled,
            'mdc-text-field--dense': this.dense,
            'mdc-text-field--fullwidth': this.fullwidth,
            'mdc-text-field--textarea': this.multiline,
            'mdc-text-field--box': !this.fullwidth && this.box,
            'mdc-text-field--outlined': !this.fullwidth && this.outline
          },
          inputClasses: {
            'mdc-text-field__input': true
          },
          labelClasses: {
            'mdc-floating-label': true
          },
          lineRippleClasses: {
            'mdc-line-ripple': true
          },
          lineRippleStyles: {},
          helpClasses: {
            'mdc-text-field-helper-text': true,
            'mdc-text-field-helper-text--persistent': this.helptextPersistent,
            'mdc-text-field-helper-text--validation-msg': this.helptextValidation
          },
          outlineClasses: {},
          outlinePathAttr: undefined
        };
      },
      computed: {
        inputPlaceHolder: function inputPlaceHolder() {
          return this.fullwidth ? this.label : undefined;
        },
        inputAriaControls: function inputAriaControls() {
          return this.help ? 'help-' + this.vma_uid_ : undefined;
        },
        hasLabel: function hasLabel() {
          return !this.fullwidth && this.label;
        },
        hasOutline: function hasOutline() {
          return !this.fullwidth && this.outline;
        },
        hasLineRipple: function hasLineRipple() {
          return !this.hasOutline && !this.multiline;
        },
        hasLeadingIcon: function hasLeadingIcon() {
          if ((this.leadingIcon || this.$slots['leading-icon']) && !(this.trailingIcon || this.$slots['trailing-icon'])) {
            return this.leadingIcon ? extractIconProp(this.leadingIcon) : {};
          }
          return false;
        },
        hasTrailingIcon: function hasTrailingIcon() {
          if (this.trailingIcon || this.$slots['trailing-icon']) {
            return this.trailingIcon ? extractIconProp(this.trailingIcon) : {};
          }
          return false;
        },
        labelClassesUpgraded: function labelClassesUpgraded() {
          return _extends(this.labelClasses, {
            'mdc-floating-label--float-above': this.value
          });
        }
      },
      watch: {
        disabled: function disabled() {
          this.foundation && this.foundation.setDisabled(this.disabled);
        },
        required: function required() {
          this.$refs.input && (this.$refs.input.required = this.required);
        },
        valid: function valid() {
          if (typeof this.valid !== 'undefined') {
            this.foundation && this.foundation.setValid(this.valid);
          }
        },
        dense: function dense() {
          this.$set(this.rootClasses, 'mdc-text-field--dense', this.dense);
        },
        helptextPersistent: function helptextPersistent() {
          this.helperTextFoundation && this.helperTextFoundation.setPersistent(this.helptextPersistent);
        },
        helptextValidation: function helptextValidation() {
          this.helperTextFoundation && this.helperTextFoundation.setValidation(this.helptextValidation);
        },
        value: function value(_value) {
          if (this.foundation) {
            if (_value !== this.foundation.getValue()) {
              this.foundation.setValue(_value);
            }
          }
        }
      },
      mounted: function mounted() {
        var _this = this;

        if (this.$refs.lineRipple) {
          this.lineRippleFoundation = new MDCLineRippleFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.lineRippleClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.lineRippleClasses, className);
            },
            hasClass: function hasClass(className) {
              _this.$refs.lineRipple.classList.contains(className);
            },
            setStyle: function setStyle(name, value) {
              _this.$set(_this.lineRippleStyles, name, value);
            },
            registerEventHandler: function registerEventHandler(evtType, handler) {
              _this.$refs.lineRipple.addEventListener(evtType, handler);
            },
            deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
              _this.$refs.lineRipple.removeEventListener(evtType, handler);
            }
          });
          this.lineRippleFoundation.init();
        }

        if (this.$refs.help) {
          this.helperTextFoundation = new MDCTextFieldHelperTextFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.helpClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.helpClasses, className);
            },
            hasClass: function hasClass(className) {
              return _this.$refs.help.classList.contains(className);
            },
            setAttr: function setAttr(name, value) {
              _this.$refs.help.setAttribute(name, value);
            },
            removeAttr: function removeAttr(name) {
              _this.$refs.help.removeAttribute(name);
            },
            setContent: function setContent() /*content*/{
              // help text get's updated from {{helptext}}
              // this.$refs.help.textContent = content;
            }
          });
          this.helperTextFoundation.init();
        }

        if (this.$refs.icon) {
          if (this.hasLeadingIcon) {
            this.$set(this.rootClasses, 'mdc-text-field--with-leading-icon', true);
          } else if (this.hasTrailingIcon) {
            this.$set(this.rootClasses, 'mdc-text-field--with-trailing-icon', true);
          }

          this.iconFoundation = new MDCTextFieldIconFoundation({
            setAttr: function setAttr(attr, value) {
              return _this.$refs.icon.setAttribute(attr, value);
            },
            getAttr: function getAttr(attr) {
              return _this.$refs.icon.getAttribute(attr);
            },
            removeAttr: function removeAttr(attr) {
              return _this.$refs.icon.removeAttribute(attr);
            },
            setContent: function setContent() /*content*/{
              // icon text get's updated from {{{{ hasTrailingIcon.content }}}}
              // this.$refs.icon.textContent = content;
            },
            registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
              _this.$refs.icon.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
              _this.$refs.icon.removeEventListener(evtType, handler);
            },
            notifyIconAction: function notifyIconAction() {
              return _this.$emit('icon-action');
            }
          });
          this.iconFoundation.init();
        }

        if (this.$refs.label) {
          this.labelFoundation = new MDCFloatingLabelFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.labelClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.labelClasses, className);
            },
            getWidth: function getWidth() {
              return _this.$refs.label.offsetWidth;
            },
            registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
              _this.$refs.label.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
              _this.$refs.label.removeEventListener(evtType, handler);
            }
          });
          this.labelFoundation.init();
        }

        if (this.$refs.outline) {
          this.outlineFoundation = new MDCNotchedOutlineFoundation({
            getWidth: function getWidth() {
              return _this.$refs.outline.offsetWidth;
            },
            getHeight: function getHeight() {
              return _this.$refs.outline.offsetHeight;
            },
            addClass: function addClass(className) {
              _this.$set(_this.outlineClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.outlineClasses, className);
            },
            setOutlinePathAttr: function setOutlinePathAttr(value) {
              _this.outlinePathAttr = value;
            },
            getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
              var idleOutlineElement = _this.$refs.outlineIdle;
              if (idleOutlineElement) {
                return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
              }
            }
          });
          this.outlineFoundation.init();
        }

        this.foundation = new MDCTextFieldFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.rootClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.rootClasses, className);
          },
          hasClass: function hasClass(className) {
            _this.$refs.root.classList.contains(className);
          },
          registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
            _this.$refs.root.addEventListener(evtType, handler);
          },
          deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
            _this.$refs.root.removeEventListener(evtType, handler);
          },
          isFocused: function isFocused() {
            return document.activeElement === _this.$refs.input;
          },
          isRtl: function isRtl() {
            return window.getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
          },
          deactivateLineRipple: function deactivateLineRipple() {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.deactivate();
            }
          },
          activateLineRipple: function activateLineRipple() {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.activate();
            }
          },
          setLineRippleTransformOrigin: function setLineRippleTransformOrigin(normalizedX) {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.setRippleCenter(normalizedX);
            }
          },
          registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
            _this.$refs.input.addEventListener(evtType, handler, applyPassive());
          },
          deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
            _this.$refs.input.removeEventListener(evtType, handler, applyPassive());
          },
          registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler(handler) {
            var getAttributesList = function getAttributesList(mutationsList) {
              return mutationsList.map(function (mutation) {
                return mutation.attributeName;
              });
            };
            var observer = new MutationObserver(function (mutationsList) {
              return handler(getAttributesList(mutationsList));
            });
            var targetNode = _this.$refs.input;
            var config = { attributes: true };
            observer.observe(targetNode, config);
            return observer;
          },
          deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler(observer) {
            observer.disconnect();
          },
          shakeLabel: function shakeLabel(shouldShake) {
            _this.labelFoundation.shake(shouldShake);
          },
          floatLabel: function floatLabel(shouldFloat) {
            _this.labelFoundation.float(shouldFloat);
          },
          hasLabel: function hasLabel() {
            return !!_this.$refs.label;
          },
          getLabelWidth: function getLabelWidth() {
            return _this.labelFoundation.getWidth();
          },
          getNativeInput: function getNativeInput() {
            return _this.$refs.input;
          },
          hasOutline: function hasOutline() {
            return !!_this.hasOutline;
          },
          notchOutline: function notchOutline(notchWidth, isRtl) {
            return _this.outlineFoundation.notch(notchWidth, isRtl);
          },
          closeOutline: function closeOutline() {
            return _this.outlineFoundation.closeNotch();
          }
        }, {
          helperText: this.helperTextFoundation,
          icon: this.iconFoundation
        });

        this.foundation.init();
        this.foundation.setValue(this.value);
        this.foundation.setDisabled(this.disabled);
        this.$refs.input && (this.$refs.input.required = this.required);
        if (typeof this.valid !== 'undefined') {
          this.foundation.setValid(this.valid);
        }

        if (this.textbox) {
          this.ripple = new RippleBase(this);
          this.ripple.init();
        }
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation && this.foundation.destroy();
        this.lineRippleFoundation && this.lineRippleFoundation.destroy();
        this.helperTextFoundation && this.helperTextFoundation.destroy();
        this.iconFoundation && this.iconFoundation.destroy();
        this.labelFoundation && this.labelFoundation.destroy();
        this.outlineFoundation && this.outlineFoundation.destroy();
        this.ripple && this.ripple.destroy();
      },

      methods: {
        updateValue: function updateValue(value) {
          this.$emit('model', value);
        },
        focus: function focus() {
          this.$refs.input && this.$refs.input.focus();
        },
        blur: function blur() {
          this.$refs.input && this.$refs.input.blur();
        }
      }
    };

    var plugin = BasePlugin({
      mdcTextField: mdcTextField
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXBwbHktcGFzc2l2ZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1pY29uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWZvY3VzLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaWNvbi9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGluZS1yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9ub3RjaGVkLW91dGxpbmUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9jb21wb25lbnRzL3RleHRmaWVsZC9tZGMtdGV4dGZpZWxkLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy90ZXh0ZmllbGQvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHN1cHBvcnRzUGFzc2l2ZV9cblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZVxuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtcbiAgICAgICAgZ2V0IHBhc3NpdmUoKSB7XG4gICAgICAgICAgaXNTdXBwb3J0ZWQgPSB7IHBhc3NpdmU6IHRydWUgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vZW1wdHlcbiAgICB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWRcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogdm0gPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUVsZW1lbnQgPSB7XG4gIGZ1bmN0aW9uYWw6IHRydWUsXG4gIHJlbmRlcihjcmVhdGVFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG4gICAgICBjb250ZXh0LnByb3BzLmlzIHx8IGNvbnRleHQucHJvcHMudGFnIHx8ICdkaXYnLFxuICAgICAgY29udGV4dC5kYXRhLFxuICAgICAgY29udGV4dC5jaGlsZHJlblxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudE1peGluID0ge1xuICBjb21wb25lbnRzOiB7XG4gICAgQ3VzdG9tRWxlbWVudFxuICB9XG59XG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZXh0cmFjdEljb25Qcm9wKGljb25Qcm9wKSB7XG4gIGlmICh0eXBlb2YgaWNvblByb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHsgJ21hdGVyaWFsLWljb25zJzogdHJ1ZSB9LFxuICAgICAgY29udGVudDogaWNvblByb3BcbiAgICB9XG4gIH0gZWxzZSBpZiAoaWNvblByb3AgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiBpY29uUHJvcC5yZWR1Y2UoXG4gICAgICAgIChyZXN1bHQsIHZhbHVlKSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBbdmFsdWVdOiB0cnVlIH0pLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgaWNvblByb3AgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IGljb25Qcm9wLmNsYXNzTmFtZVxuICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAucmVkdWNlKFxuICAgICAgICAgIChyZXN1bHQsIHZhbHVlKSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBbdmFsdWVdOiB0cnVlIH0pLFxuICAgICAgICAgIHt9XG4gICAgICAgICksXG4gICAgICBjb250ZW50OiBpY29uUHJvcC50ZXh0Q29udGVudFxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRm9jdXNNaXhpbiA9IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4geyBoYXNGb2N1czogZmFsc2UgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZVxuICAgIH0sXG4gICAgb25Gb2N1c0V2ZW50KCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksIDApXG4gICAgfSxcbiAgICBvbkJsdXJFdmVudCgpIHtcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxuICAgICAgLy8gYWxzbyBmaWx0dXIgYmx1ciBpZiBtb3VzZWRvd25cbiAgICAgIHRoaXMuX2FjdGl2ZSB8fCBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksIDApXG4gICAgfSxcbiAgICBkaXNwYXRjaEZvY3VzRXZlbnQoKSB7XG4gICAgICBsZXQgaGFzRm9jdXMgPVxuICAgICAgICB0aGlzLiRlbCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fFxuICAgICAgICB0aGlzLiRlbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KVxuICAgICAgaWYgKGhhc0ZvY3VzICE9IHRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy4kZW1pdChoYXNGb2N1cyA/ICdmb2N1cycgOiAnYmx1cicpXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBoYXNGb2N1c1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25CbHVyRXZlbnQpXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bilcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXG4gIH1cbn1cbiIsImNvbnN0IHNjb3BlID1cbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xuXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcbiAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBUZXh0IEZpZWxkIEhlbHBlciBUZXh0LlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFRleHRGaWVsZCBoZWxwZXIgdGV4dCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQgY29udGFpbnMgdGhlIGdpdmVuIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgYW4gYXR0cmlidXRlIHdpdGggYSBnaXZlbiB2YWx1ZSBvbiB0aGUgaGVscGVyIHRleHQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRBdHRyKGF0dHIsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGF0dHJpYnV0ZSBmcm9tIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKi9cbiAgcmVtb3ZlQXR0cihhdHRyKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0ZXh0IGNvbnRlbnQgZm9yIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICAgKi9cbiAgc2V0Q29udGVudChjb250ZW50KSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIEFSSUFfSElEREVOOiAnYXJpYS1oaWRkZW4nLFxuICBST0xFOiAncm9sZScsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEhFTFBFUl9URVhUX1BFUlNJU1RFTlQ6ICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tcGVyc2lzdGVudCcsXG4gIEhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHOiAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQtLXZhbGlkYXRpb24tbXNnJyxcbn07XG5cbmV4cG9ydCB7c3RyaW5ncywgY3NzQ2xhc3Nlc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICBzZXRBdHRyOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUF0dHI6ICgpID0+IHt9LFxuICAgICAgc2V0Q29udGVudDogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgaGVscGVyIHRleHQgZmllbGQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAqL1xuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldENvbnRlbnQoY29udGVudCk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBpc1BlcnNpc3RlbnQgU2V0cyB0aGUgcGVyc2lzdGVuY3kgb2YgdGhlIGhlbHBlciB0ZXh0LiAqL1xuICBzZXRQZXJzaXN0ZW50KGlzUGVyc2lzdGVudCkge1xuICAgIGlmIChpc1BlcnNpc3RlbnQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1BFUlNJU1RFTlQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzVmFsaWRhdGlvbiBUcnVlIHRvIG1ha2UgdGhlIGhlbHBlciB0ZXh0IGFjdCBhcyBhblxuICAgKiAgIGVycm9yIHZhbGlkYXRpb24gbWVzc2FnZS5cbiAgICovXG4gIHNldFZhbGlkYXRpb24oaXNWYWxpZGF0aW9uKSB7XG4gICAgaWYgKGlzVmFsaWRhdGlvbikge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWFrZXMgdGhlIGhlbHBlciB0ZXh0IHZpc2libGUgdG8gdGhlIHNjcmVlbiByZWFkZXIuICovXG4gIHNob3dUb1NjcmVlblJlYWRlcigpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHIoc3RyaW5ncy5BUklBX0hJRERFTik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsaWRpdHkgb2YgdGhlIGhlbHBlciB0ZXh0IGJhc2VkIG9uIHRoZSBpbnB1dCB2YWxpZGl0eS5cbiAgICogQHBhcmFtIHtib29sZWFufSBpbnB1dElzVmFsaWRcbiAgICovXG4gIHNldFZhbGlkaXR5KGlucHV0SXNWYWxpZCkge1xuICAgIGNvbnN0IGhlbHBlclRleHRJc1BlcnNpc3RlbnQgPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfUEVSU0lTVEVOVCk7XG4gICAgY29uc3QgaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRyk7XG4gICAgY29uc3QgdmFsaWRhdGlvbk1zZ05lZWRzRGlzcGxheSA9IGhlbHBlclRleHRJc1ZhbGlkYXRpb25Nc2cgJiYgIWlucHV0SXNWYWxpZDtcblxuICAgIGlmICh2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoc3RyaW5ncy5ST0xFLCAnYWxlcnQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVBdHRyKHN0cmluZ3MuUk9MRSk7XG4gICAgfVxuXG4gICAgaWYgKCFoZWxwZXJUZXh0SXNQZXJzaXN0ZW50ICYmICF2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5KSB7XG4gICAgICB0aGlzLmhpZGVfKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBoZWxwIHRleHQgZnJvbSBzY3JlZW4gcmVhZGVycy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhpZGVfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cihzdHJpbmdzLkFSSUFfSElEREVOLCAndHJ1ZScpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBUZXh0IEZpZWxkIEljb24uXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgdGV4dCBmaWVsZCBpY29uIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRJY29uQWRhcHRlciB7XG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiBhbiBhdHRyaWJ1dGUgb24gdGhlIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0QXR0cihhdHRyKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGFuIGF0dHJpYnV0ZSBvbiB0aGUgaWNvbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHIoYXR0ciwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gYXR0cmlidXRlIGZyb20gdGhlIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICovXG4gIHJlbW92ZUF0dHIoYXR0cikge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBpY29uIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAqL1xuICBzZXRDb250ZW50KGNvbnRlbnQpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgaWNvbiBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIGljb24gZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gZXZlbnQgXCJNRENUZXh0RmllbGQ6aWNvblwiIGRlbm90aW5nIGEgdXNlciBoYXMgY2xpY2tlZCB0aGUgaWNvbi5cbiAgICovXG4gIG5vdGlmeUljb25BY3Rpb24oKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRJY29uQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIElDT05fRVZFTlQ6ICdNRENUZXh0RmllbGQ6aWNvbicsXG4gIElDT05fUk9MRTogJ2J1dHRvbicsXG59O1xuXG5leHBvcnQge3N0cmluZ3N9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RleHRGaWVsZEljb25BZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge3N0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENUZXh0RmllbGRJY29uQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENUZXh0RmllbGRJY29uQWRhcHRlcn0gKi8gKHtcbiAgICAgIGdldEF0dHI6ICgpID0+IHt9LFxuICAgICAgc2V0QXR0cjogKCkgPT4ge30sXG4gICAgICByZW1vdmVBdHRyOiAoKSA9PiB7fSxcbiAgICAgIHNldENvbnRlbnQ6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBub3RpZnlJY29uQWN0aW9uOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUZXh0RmllbGRJY29uQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7c3RyaW5nP30gKi9cbiAgICB0aGlzLnNhdmVkVGFiSW5kZXhfID0gbnVsbDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlSW50ZXJhY3Rpb24oZXZ0KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zYXZlZFRhYkluZGV4XyA9IHRoaXMuYWRhcHRlcl8uZ2V0QXR0cigndGFiaW5kZXgnKTtcblxuICAgIFsnY2xpY2snLCAna2V5ZG93biddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCAqL1xuICBzZXREaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIGlmICghdGhpcy5zYXZlZFRhYkluZGV4Xykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVBdHRyKCdyb2xlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cigndGFiaW5kZXgnLCB0aGlzLnNhdmVkVGFiSW5kZXhfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cigncm9sZScsIHN0cmluZ3MuSUNPTl9ST0xFKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGxhYmVsICovXG4gIHNldEFyaWFMYWJlbChsYWJlbCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cignYXJpYS1sYWJlbCcsIGxhYmVsKTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAqL1xuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldENvbnRlbnQoY29udGVudCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBpbnRlcmFjdGlvbiBldmVudFxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVJbnRlcmFjdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdjbGljaycgfHwgZXZ0LmtleSA9PT0gJ0VudGVyJyB8fCBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SWNvbkFjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uIGZyb20gJy4vaGVscGVyLXRleHQvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24gZnJvbSAnLi9pY29uL2ZvdW5kYXRpb24nO1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB2YWx1ZTogc3RyaW5nLFxuICogICBkaXNhYmxlZDogYm9vbGVhbixcbiAqICAgYmFkSW5wdXQ6IGJvb2xlYW4sXG4gKiAgIHZhbGlkaXR5OiB7XG4gKiAgICAgYmFkSW5wdXQ6IGJvb2xlYW4sXG4gKiAgICAgdmFsaWQ6IGJvb2xlYW4sXG4gKiAgIH0sXG4gKiB9fVxuICovXG5sZXQgTmF0aXZlSW5wdXRUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGhlbHBlclRleHQ6ICghTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb258dW5kZWZpbmVkKSxcbiAqICAgaWNvbjogKCFNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbnx1bmRlZmluZWQpLFxuICogfX1cbiAqL1xubGV0IEZvdW5kYXRpb25NYXBUeXBlO1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBUZXh0IEZpZWxkLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFRleHQgRmllbGQgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSByb290IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgRWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MgbmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgdmFsaWRhdGlvbiBhdHRyaWJ1dGUgY2hhbmdlIGxpc3RlbmVyIG9uIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKiBIYW5kbGVyIGFjY2VwdHMgbGlzdCBvZiBhdHRyaWJ1dGUgbmFtZXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUFycmF5PHN0cmluZz4pOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICogQHJldHVybiB7IU11dGF0aW9uT2JzZXJ2ZXJ9XG4gICAqL1xuICByZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIGEgdmFsaWRhdGlvbiBhdHRyaWJ1dGUgb2JzZXJ2ZXIgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7IU11dGF0aW9uT2JzZXJ2ZXJ9IG9ic2VydmVyXG4gICAqL1xuICBkZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIob2JzZXJ2ZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmF0aXZlIHRleHQgaW5wdXQgZWxlbWVudCwgd2l0aCBhXG4gICAqIHNpbWlsYXIgQVBJIHNoYXBlLiBUaGUgb2JqZWN0IHJldHVybmVkIHNob3VsZCBpbmNsdWRlIHRoZSB2YWx1ZSwgZGlzYWJsZWRcbiAgICogYW5kIGJhZElucHV0IHByb3BlcnRpZXMsIGFzIHdlbGwgYXMgdGhlIGNoZWNrVmFsaWRpdHkoKSBmdW5jdGlvbi4gV2UgbmV2ZXJcbiAgICogYWx0ZXIgdGhlIHZhbHVlIHdpdGhpbiBvdXIgY29kZSwgaG93ZXZlciB3ZSBkbyB1cGRhdGUgdGhlIGRpc2FibGVkXG4gICAqIHByb3BlcnR5LCBzbyBpZiB5b3UgY2hvb3NlIHRvIGR1Y2stdHlwZSB0aGUgcmV0dXJuIHZhbHVlIGZvciB0aGlzIG1ldGhvZFxuICAgKiBpbiB5b3VyIGltcGxlbWVudGF0aW9uIGl0J3MgaW1wb3J0YW50IHRvIGtlZXAgdGhpcyBpbiBtaW5kLiBBbHNvIG5vdGUgdGhhdFxuICAgKiB0aGlzIG1ldGhvZCBjYW4gcmV0dXJuIG51bGwsIHdoaWNoIHRoZSBmb3VuZGF0aW9uIHdpbGwgaGFuZGxlIGdyYWNlZnVsbHkuXG4gICAqIEByZXR1cm4gez9FbGVtZW50fD9OYXRpdmVJbnB1dFR5cGV9XG4gICAqL1xuICBnZXROYXRpdmVJbnB1dCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGV4dGZpZWxkIGlzIGZvY3VzZWQuXG4gICAqIFdlIGFjaGlldmUgdGhpcyB2aWEgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMucm9vdF9gLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNGb2N1c2VkKCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHJvb3QgZWxlbWVudCBpcyBzZXQgdG8gUlRMLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNSdGwoKSB7fVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlLlxuICAgKi9cbiAgYWN0aXZhdGVMaW5lUmlwcGxlKCkge31cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlLlxuICAgKi9cbiAgZGVhY3RpdmF0ZUxpbmVSaXBwbGUoKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0cmFuc2Zvcm0gb3JpZ2luIG9mIHRoZSBsaW5lIHJpcHBsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vcm1hbGl6ZWRYXG4gICAqL1xuICBzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luKG5vcm1hbGl6ZWRYKSB7fVxuXG4gIC8qKlxuICAgKiBPbmx5IGltcGxlbWVudCBpZiBsYWJlbCBleGlzdHMuXG4gICAqIFNoYWtlcyBsYWJlbCBpZiBzaG91bGRTaGFrZSBpcyB0cnVlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFNoYWtlXG4gICAqL1xuICBzaGFrZUxhYmVsKHNob3VsZFNoYWtlKSB7fVxuXG4gIC8qKlxuICAgKiBPbmx5IGltcGxlbWVudCBpZiBsYWJlbCBleGlzdHMuXG4gICAqIEZsb2F0cyB0aGUgbGFiZWwgYWJvdmUgdGhlIGlucHV0IGVsZW1lbnQgaWYgc2hvdWxkRmxvYXQgaXMgdHJ1ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRGbG9hdFxuICAgKi9cbiAgZmxvYXRMYWJlbChzaG91bGRGbG9hdCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGxhYmVsIGVsZW1lbnQgZXhpc3RzLCBmYWxzZSBpZiBpdCBkb2Vzbid0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzTGFiZWwoKSB7fVxuXG4gIC8qKlxuICAgKiBPbmx5IGltcGxlbWVudCBpZiBsYWJlbCBleGlzdHMuXG4gICAqIFJldHVybnMgd2lkdGggb2YgbGFiZWwgaW4gcGl4ZWxzLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRMYWJlbFdpZHRoKCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIG91dGxpbmUgZWxlbWVudCBleGlzdHMsIGZhbHNlIGlmIGl0IGRvZXNuJ3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNPdXRsaW5lKCkge31cblxuICAvKipcbiAgICogT25seSBpbXBsZW1lbnQgaWYgb3V0bGluZSBlbGVtZW50IGV4aXN0cy5cbiAgICogVXBkYXRlcyBTVkcgUGF0aCBhbmQgb3V0bGluZSBlbGVtZW50IGJhc2VkIG9uIHRoZVxuICAgKiBsYWJlbCBlbGVtZW50IHdpZHRoIGFuZCBSVEwgY29udGV4dC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxhYmVsV2lkdGhcbiAgICogQHBhcmFtIHtib29sZWFuPX0gaXNSdGxcbiAgICovXG4gIG5vdGNoT3V0bGluZShsYWJlbFdpZHRoLCBpc1J0bCkge31cblxuICAvKipcbiAgICogT25seSBpbXBsZW1lbnQgaWYgb3V0bGluZSBlbGVtZW50IGV4aXN0cy5cbiAgICogQ2xvc2VzIG5vdGNoIGluIG91dGxpbmUgZWxlbWVudC5cbiAgICovXG4gIGNsb3NlT3V0bGluZSgpIHt9XG59XG5cbmV4cG9ydCB7TURDVGV4dEZpZWxkQWRhcHRlciwgTmF0aXZlSW5wdXRUeXBlLCBGb3VuZGF0aW9uTWFwVHlwZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBUklBX0NPTlRST0xTOiAnYXJpYS1jb250cm9scycsXG4gIElOUFVUX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19pbnB1dCcsXG4gIExBQkVMX1NFTEVDVE9SOiAnLm1kYy1mbG9hdGluZy1sYWJlbCcsXG4gIElDT05fU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2ljb24nLFxuICBPVVRMSU5FX1NFTEVDVE9SOiAnLm1kYy1ub3RjaGVkLW91dGxpbmUnLFxuICBMSU5FX1JJUFBMRV9TRUxFQ1RPUjogJy5tZGMtbGluZS1yaXBwbGUnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLXRleHQtZmllbGQnLFxuICBVUEdSQURFRDogJ21kYy10ZXh0LWZpZWxkLS11cGdyYWRlZCcsXG4gIERJU0FCTEVEOiAnbWRjLXRleHQtZmllbGQtLWRpc2FibGVkJyxcbiAgREVOU0U6ICdtZGMtdGV4dC1maWVsZC0tZGVuc2UnLFxuICBGT0NVU0VEOiAnbWRjLXRleHQtZmllbGQtLWZvY3VzZWQnLFxuICBJTlZBTElEOiAnbWRjLXRleHQtZmllbGQtLWludmFsaWQnLFxuICBCT1g6ICdtZGMtdGV4dC1maWVsZC0tYm94JyxcbiAgT1VUTElORUQ6ICdtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICBMQUJFTF9TQ0FMRTogMC43NSxcbiAgREVOU0VfTEFCRUxfU0NBTEU6IDAuOTIzLFxufTtcblxuLy8gd2hpdGVsaXN0IGJhc2VkIG9mZiBvZiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9IVE1ML0hUTUw1L0NvbnN0cmFpbnRfdmFsaWRhdGlvblxuLy8gdW5kZXIgc2VjdGlvbjogYFZhbGlkYXRpb24tcmVsYXRlZCBhdHRyaWJ1dGVzYFxuY29uc3QgVkFMSURBVElPTl9BVFRSX1dISVRFTElTVCA9IFtcbiAgJ3BhdHRlcm4nLCAnbWluJywgJ21heCcsICdyZXF1aXJlZCcsICdzdGVwJywgJ21pbmxlbmd0aCcsICdtYXhsZW5ndGgnLFxuXTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNUfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnLi9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbiBmcm9tICcuL2ljb24vZm91bmRhdGlvbic7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge01EQ1RleHRGaWVsZEFkYXB0ZXIsIE5hdGl2ZUlucHV0VHlwZSwgRm91bmRhdGlvbk1hcFR5cGV9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnMsIFZBTElEQVRJT05fQVRUUl9XSElURUxJU1R9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENUZXh0RmllbGRBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgc2hvdWxkU2hha2UoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzVmFsaWQoKSAmJiAhdGhpcy5pc0ZvY3VzZWRfO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBzaG91bGRGbG9hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0ZvY3VzZWRfIHx8ICEhdGhpcy5nZXRWYWx1ZSgpIHx8IHRoaXMuaXNCYWRJbnB1dF8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENUZXh0RmllbGRBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RleHRGaWVsZEFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENUZXh0RmllbGRBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgaGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBnZXROYXRpdmVJbnB1dDogKCkgPT4ge30sXG4gICAgICBpc0ZvY3VzZWQ6ICgpID0+IHt9LFxuICAgICAgaXNSdGw6ICgpID0+IHt9LFxuICAgICAgYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7fSxcbiAgICAgIGRlYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7fSxcbiAgICAgIHNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW46ICgpID0+IHt9LFxuICAgICAgc2hha2VMYWJlbDogKCkgPT4ge30sXG4gICAgICBmbG9hdExhYmVsOiAoKSA9PiB7fSxcbiAgICAgIGhhc0xhYmVsOiAoKSA9PiB7fSxcbiAgICAgIGdldExhYmVsV2lkdGg6ICgpID0+IHt9LFxuICAgICAgaGFzT3V0bGluZTogKCkgPT4ge30sXG4gICAgICBub3RjaE91dGxpbmU6ICgpID0+IHt9LFxuICAgICAgY2xvc2VPdXRsaW5lOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUZXh0RmllbGRBZGFwdGVyfSBhZGFwdGVyXG4gICAqIEBwYXJhbSB7IUZvdW5kYXRpb25NYXBUeXBlPX0gZm91bmRhdGlvbk1hcCBNYXAgZnJvbSBzdWJjb21wb25lbnQgbmFtZXMgdG8gdGhlaXIgc3ViZm91bmRhdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyLCBmb3VuZGF0aW9uTWFwID0gLyoqIEB0eXBlIHshRm91bmRhdGlvbk1hcFR5cGV9ICovICh7fSkpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9ufHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmhlbHBlclRleHRfID0gZm91bmRhdGlvbk1hcC5oZWxwZXJUZXh0O1xuICAgIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9ufHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmljb25fID0gZm91bmRhdGlvbk1hcC5pY29uO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuaXNGb2N1c2VkXyA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnJlY2VpdmVkVXNlcklucHV0XyA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnVzZUN1c3RvbVZhbGlkaXR5Q2hlY2tpbmdfID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuaXNWYWxpZF8gPSB0cnVlO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oKTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfID0gKCkgPT4gdGhpcy5hY3RpdmF0ZUZvY3VzKCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbigpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnB1dEJsdXJIYW5kbGVyXyA9ICgpID0+IHRoaXMuZGVhY3RpdmF0ZUZvY3VzKCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbigpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8gPSAoKSA9PiB0aGlzLmF1dG9Db21wbGV0ZUZvY3VzKCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5zZXRQb2ludGVyWE9mZnNldF8gPSAoZXZ0KSA9PiB0aGlzLnNldFRyYW5zZm9ybU9yaWdpbihldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMudGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlVGV4dEZpZWxkSW50ZXJhY3Rpb24oKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFBcnJheSk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyXyA9IChhdHRyaWJ1dGVzTGlzdCkgPT4gdGhpcy5oYW5kbGVWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlKGF0dHJpYnV0ZXNMaXN0KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IU11dGF0aW9uT2JzZXJ2ZXJ9ICovXG4gICAgdGhpcy52YWxpZGF0aW9uT2JzZXJ2ZXJfO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgLy8gRW5zdXJlIGxhYmVsIGRvZXMgbm90IGNvbGxpZGUgd2l0aCBhbnkgcHJlLWZpbGxlZCB2YWx1ZS5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpICYmICh0aGlzLmdldFZhbHVlKCkgfHwgdGhpcy5pc0JhZElucHV0XygpKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNGb2N1c2VkKCkpIHtcbiAgICAgIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2lucHV0JywgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8pO1xuICAgIFsnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5zZXRQb2ludGVyWE9mZnNldF8pO1xuICAgIH0pO1xuICAgIFsnY2xpY2snLCAna2V5ZG93biddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl8gPVxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIodGhpcy52YWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5pbnB1dEJsdXJIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2lucHV0JywgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8pO1xuICAgIFsnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLnNldFBvaW50ZXJYT2Zmc2V0Xyk7XG4gICAgfSk7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMudGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIodGhpcy52YWxpZGF0aW9uT2JzZXJ2ZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHVzZXIgaW50ZXJhY3Rpb25zIHdpdGggdGhlIFRleHQgRmllbGQuXG4gICAqL1xuICBoYW5kbGVUZXh0RmllbGRJbnRlcmFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5nZXROYXRpdmVJbnB1dCgpLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHZhbGlkYXRpb24gYXR0cmlidXRlIGNoYW5nZXNcbiAgICogQHBhcmFtIHshQXJyYXk8c3RyaW5nPn0gYXR0cmlidXRlc0xpc3RcbiAgICovXG4gIGhhbmRsZVZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2UoYXR0cmlidXRlc0xpc3QpIHtcbiAgICBhdHRyaWJ1dGVzTGlzdC5zb21lKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICBpZiAoVkFMSURBVElPTl9BVFRSX1dISVRFTElTVC5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID4gLTEpIHtcbiAgICAgICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyh0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMvY2xvc2VzIHRoZSBub3RjaGVkIG91dGxpbmUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3Blbk5vdGNoXG4gICAqL1xuICBub3RjaE91dGxpbmUob3Blbk5vdGNoKSB7XG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc091dGxpbmUoKSB8fCAhdGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG9wZW5Ob3RjaCkge1xuICAgICAgY29uc3QgaXNEZW5zZSA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5ERU5TRSk7XG4gICAgICBjb25zdCBsYWJlbFNjYWxlID0gaXNEZW5zZSA/IG51bWJlcnMuREVOU0VfTEFCRUxfU0NBTEUgOiBudW1iZXJzLkxBQkVMX1NDQUxFO1xuICAgICAgY29uc3QgbGFiZWxXaWR0aCA9IHRoaXMuYWRhcHRlcl8uZ2V0TGFiZWxXaWR0aCgpICogbGFiZWxTY2FsZTtcbiAgICAgIGNvbnN0IGlzUnRsID0gdGhpcy5hZGFwdGVyXy5pc1J0bCgpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RjaE91dGxpbmUobGFiZWxXaWR0aCwgaXNSdGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmNsb3NlT3V0bGluZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIHRleHQgZmllbGQgZm9jdXMgc3RhdGUuXG4gICAqL1xuICBhY3RpdmF0ZUZvY3VzKCkge1xuICAgIHRoaXMuaXNGb2N1c2VkXyA9IHRydWU7XG4gICAgdGhpcy5zdHlsZUZvY3VzZWRfKHRoaXMuaXNGb2N1c2VkXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hY3RpdmF0ZUxpbmVSaXBwbGUoKTtcbiAgICB0aGlzLm5vdGNoT3V0bGluZSh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZsb2F0TGFiZWwodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmhlbHBlclRleHRfKSB7XG4gICAgICB0aGlzLmhlbHBlclRleHRfLnNob3dUb1NjcmVlblJlYWRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsaW5lIHJpcHBsZSdzIHRyYW5zZm9ybSBvcmlnaW4sIHNvIHRoYXQgdGhlIGxpbmUgcmlwcGxlIGFjdGl2YXRlXG4gICAqIGFuaW1hdGlvbiB3aWxsIGFuaW1hdGUgb3V0IGZyb20gdGhlIHVzZXIncyBjbGljayBsb2NhdGlvbi5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgc2V0VHJhbnNmb3JtT3JpZ2luKGV2dCkge1xuICAgIGNvbnN0IHRhcmdldENsaWVudFJlY3QgPSBldnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGV2dENvb3JkcyA9IHt4OiBldnQuY2xpZW50WCwgeTogZXZ0LmNsaWVudFl9O1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRYID0gZXZ0Q29vcmRzLnggLSB0YXJnZXRDbGllbnRSZWN0LmxlZnQ7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luKG5vcm1hbGl6ZWRYKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIFRleHQgRmllbGQncyBmb2N1cyBzdGF0ZSBpbiBjYXNlcyB3aGVuIHRoZSBpbnB1dCB2YWx1ZVxuICAgKiBjaGFuZ2VzIHdpdGhvdXQgdXNlciBpbnB1dCAoZS5nLiBwcm9ncmFtYXRpY2FsbHkpLlxuICAgKi9cbiAgYXV0b0NvbXBsZXRlRm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLnJlY2VpdmVkVXNlcklucHV0Xykge1xuICAgICAgdGhpcy5hY3RpdmF0ZUZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZhdGVzIHRoZSBUZXh0IEZpZWxkJ3MgZm9jdXMgc3RhdGUuXG4gICAqL1xuICBkZWFjdGl2YXRlRm9jdXMoKSB7XG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5kZWFjdGl2YXRlTGluZVJpcHBsZSgpO1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXROYXRpdmVJbnB1dF8oKTtcbiAgICBjb25zdCBzaG91bGRSZW1vdmVMYWJlbEZsb2F0ID0gIWlucHV0LnZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXRfKCk7XG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZCgpO1xuICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCk7XG4gICAgdGhpcy5zdHlsZUZvY3VzZWRfKHRoaXMuaXNGb2N1c2VkXyk7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzTGFiZWwoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zaGFrZUxhYmVsKHRoaXMuc2hvdWxkU2hha2UpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuICAgIGlmIChzaG91bGRSZW1vdmVMYWJlbEZsb2F0KSB7XG4gICAgICB0aGlzLnJlY2VpdmVkVXNlcklucHV0XyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgRWxlbWVudC5cbiAgICovXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0IG9uIHRoZSBpbnB1dCBFbGVtZW50LlxuICAgKi9cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbHVlID0gdmFsdWU7XG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZCgpO1xuICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCk7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzTGFiZWwoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zaGFrZUxhYmVsKHRoaXMuc2hvdWxkU2hha2UpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IElmIGEgY3VzdG9tIHZhbGlkaXR5IGlzIHNldCwgcmV0dXJucyB0aGF0IHZhbHVlLlxuICAgKiAgICAgT3RoZXJ3aXNlLCByZXR1cm5zIHRoZSByZXN1bHQgb2YgbmF0aXZlIHZhbGlkaXR5IGNoZWNrcy5cbiAgICovXG4gIGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ19cbiAgICAgID8gdGhpcy5pc1ZhbGlkXyA6IHRoaXMuaXNOYXRpdmVJbnB1dFZhbGlkXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZCBTZXRzIHRoZSB2YWxpZGl0eSBzdGF0ZSBvZiB0aGUgVGV4dCBGaWVsZC5cbiAgICovXG4gIHNldFZhbGlkKGlzVmFsaWQpIHtcbiAgICB0aGlzLnVzZUN1c3RvbVZhbGlkaXR5Q2hlY2tpbmdfID0gdHJ1ZTtcbiAgICB0aGlzLmlzVmFsaWRfID0gaXNWYWxpZDtcbiAgICAvLyBSZXRyaWV2ZSBmcm9tIHRoZSBnZXR0ZXIgdG8gZW5zdXJlIGNvcnJlY3QgbG9naWMgaXMgYXBwbGllZC5cbiAgICBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkKCk7XG4gICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKTtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIFRleHQgRmllbGQgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBpc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLmRpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgU2V0cyB0aGUgdGV4dC1maWVsZCBkaXNhYmxlZCBvciBlbmFibGVkLlxuICAgKi9cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUlucHV0XygpLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy5zdHlsZURpc2FibGVkXyhkaXNhYmxlZCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgU2V0cyB0aGUgY29udGVudCBvZiB0aGUgaGVscGVyIHRleHQuXG4gICAqL1xuICBzZXRIZWxwZXJUZXh0Q29udGVudChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuaGVscGVyVGV4dF8pIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2V0Q29udGVudChjb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYXJpYSBsYWJlbCBvZiB0aGUgaWNvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG4gICAqL1xuICBzZXRJY29uQXJpYUxhYmVsKGxhYmVsKSB7XG4gICAgaWYgKHRoaXMuaWNvbl8pIHtcbiAgICAgIHRoaXMuaWNvbl8uc2V0QXJpYUxhYmVsKGxhYmVsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBpY29uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICAgKi9cbiAgc2V0SWNvbkNvbnRlbnQoY29udGVudCkge1xuICAgIGlmICh0aGlzLmljb25fKSB7XG4gICAgICB0aGlzLmljb25fLnNldENvbnRlbnQoY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIFRleHQgRmllbGQgaW5wdXQgZmFpbHMgaW4gY29udmVydGluZyB0aGVcbiAgICogICAgIHVzZXItc3VwcGxpZWQgdmFsdWUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0JhZElucHV0XygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS52YWxpZGl0eS5iYWRJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUaGUgcmVzdWx0IG9mIG5hdGl2ZSB2YWxpZGl0eSBjaGVja2luZ1xuICAgKiAgICAgKFZhbGlkaXR5U3RhdGUudmFsaWQpLlxuICAgKi9cbiAgaXNOYXRpdmVJbnB1dFZhbGlkXygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS52YWxpZGl0eS52YWxpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgdmFsaWRpdHkgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCkge1xuICAgIGNvbnN0IHtJTlZBTElEfSA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhJTlZBTElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhJTlZBTElEKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVscGVyVGV4dF8pIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2V0VmFsaWRpdHkoaXNWYWxpZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBmb2N1c2VkIHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRm9jdXNlZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGVGb2N1c2VkXyhpc0ZvY3VzZWQpIHtcbiAgICBjb25zdCB7Rk9DVVNFRH0gPSBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKGlzRm9jdXNlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGT0NVU0VEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGT0NVU0VEKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRpc2FibGVkIHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGlzYWJsZWRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0eWxlRGlzYWJsZWRfKGlzRGlzYWJsZWQpIHtcbiAgICBjb25zdCB7RElTQUJMRUQsIElOVkFMSUR9ID0gTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKERJU0FCTEVEKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoSU5WQUxJRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRElTQUJMRUQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pY29uXykge1xuICAgICAgdGhpcy5pY29uXy5zZXREaXNhYmxlZChpc0Rpc2FibGVkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUVsZW1lbnR8IU5hdGl2ZUlucHV0VHlwZX0gVGhlIG5hdGl2ZSB0ZXh0IGlucHV0IGZyb20gdGhlXG4gICAqIGhvc3QgZW52aXJvbm1lbnQsIG9yIGEgZHVtbXkgaWYgbm9uZSBleGlzdHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXROYXRpdmVJbnB1dF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0TmF0aXZlSW5wdXQoKSB8fFxuICAgIC8qKiBAdHlwZSB7IU5hdGl2ZUlucHV0VHlwZX0gKi8gKHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHZhbGlkaXR5OiB7XG4gICAgICAgIGJhZElucHV0OiBmYWxzZSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHRGaWVsZCBMaW5lIFJpcHBsZS5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBsaW5lIHJpcHBsZSBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDTGluZVJpcHBsZUFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgc3R5bGUgcHJvcGVydHkgd2l0aCBwcm9wZXJ0eU5hbWUgdG8gdmFsdWUgb24gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldFN0eWxlKHByb3BlcnR5TmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbGluZSByaXBwbGUgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENMaW5lUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExJTkVfUklQUExFX0FDVElWRTogJ21kYy1saW5lLXJpcHBsZS0tYWN0aXZlJyxcbiAgTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HOiAnbWRjLWxpbmUtcmlwcGxlLS1kZWFjdGl2YXRpbmcnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENMaW5lUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDTGluZVJpcHBsZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0xpbmVSaXBwbGVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTGluZVJpcHBsZUFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICBzZXRTdHlsZTogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENMaW5lUmlwcGxlQWRhcHRlcj19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSAvKiogQHR5cGUgeyFNRENMaW5lUmlwcGxlQWRhcHRlcn0gKi8gKHt9KSkge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDTGluZVJpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJFdmVudEhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckV2ZW50SGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlXG4gICAqL1xuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfQUNUSVZFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjZW50ZXIgb2YgdGhlIHJpcHBsZSBhbmltYXRpb24gdG8gdGhlIGdpdmVuIFggY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHhDb29yZGluYXRlXG4gICAqL1xuICBzZXRSaXBwbGVDZW50ZXIoeENvb3JkaW5hdGUpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKCd0cmFuc2Zvcm0tb3JpZ2luJywgYCR7eENvb3JkaW5hdGV9cHggY2VudGVyYCk7XG4gIH1cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlXG4gICAqL1xuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSB0cmFuc2l0aW9uIGVuZCBldmVudFxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCkge1xuICAgIC8vIFdhaXQgZm9yIHRoZSBsaW5lIHJpcHBsZSB0byBiZSBlaXRoZXIgdHJhbnNwYXJlbnQgb3Igb3BhcXVlXG4gICAgLy8gYmVmb3JlIGVtaXR0aW5nIHRoZSBhbmltYXRpb24gZW5kIGV2ZW50XG4gICAgY29uc3QgaXNEZWFjdGl2YXRpbmcgPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcblxuICAgIGlmIChldnQucHJvcGVydHlOYW1lID09PSAnb3BhY2l0eScpIHtcbiAgICAgIGlmIChpc0RlYWN0aXZhdGluZykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfQUNUSVZFKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBGbG9hdGluZyBMYWJlbC5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBmbG9hdGluZyBsYWJlbCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRXaWR0aCgpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIHJvb3QgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBMQUJFTF9GTE9BVF9BQk9WRTogJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnLFxuICBMQUJFTF9TSEFLRTogJ21kYy1mbG9hdGluZy1sYWJlbC0tc2hha2UnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENGbG9hdGluZ0xhYmVsQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgZ2V0V2lkdGg6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnNoYWtlQW5pbWF0aW9uRW5kSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZVNoYWtlQW5pbWF0aW9uRW5kXygpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdhbmltYXRpb25lbmQnLCB0aGlzLnNoYWtlQW5pbWF0aW9uRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmdldFdpZHRoKCk7XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBsYWJlbCB0byBwcm9kdWNlIHRoZSBsYWJlbCBzaGFrZSBmb3IgZXJyb3JzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFNoYWtlIGFkZHMgc2hha2UgY2xhc3MgaWYgdHJ1ZSxcbiAgICogb3RoZXJ3aXNlIHJlbW92ZXMgc2hha2UgY2xhc3MuXG4gICAqL1xuICBzaGFrZShzaG91bGRTaGFrZSkge1xuICAgIGNvbnN0IHtMQUJFTF9TSEFLRX0gPSBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmIChzaG91bGRTaGFrZSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGxhYmVsIHRvIGZsb2F0IG9yIGRvY2suXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkRmxvYXQgYWRkcyBmbG9hdCBjbGFzcyBpZiB0cnVlLCBvdGhlcndpc2UgcmVtb3ZlXG4gICAqIGZsb2F0IGFuZCBzaGFrZSBjbGFzcyB0byBkb2NrIGxhYmVsLlxuICAgKi9cbiAgZmxvYXQoc2hvdWxkRmxvYXQpIHtcbiAgICBjb25zdCB7TEFCRUxfRkxPQVRfQUJPVkUsIExBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHNob3VsZEZsb2F0KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9GTE9BVF9BQk9WRSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKExBQkVMX1NIQUtFKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBpbnRlcmFjdGlvbiBldmVudCBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKi9cbiAgaGFuZGxlU2hha2VBbmltYXRpb25FbmRfKCkge1xuICAgIGNvbnN0IHtMQUJFTF9TSEFLRX0gPSBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBOb3RjaGVkIE91dGxpbmUuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgTm90Y2hlZCBPdXRsaW5lIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0V2lkdGgoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0SGVpZ2h0KCkge31cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBcImRcIiBhdHRyaWJ1dGUgb2YgdGhlIG91dGxpbmUgZWxlbWVudCdzIFNWRyBwYXRoLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldE91dGxpbmVQYXRoQXR0cih2YWx1ZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWRsZSBvdXRsaW5lIGVsZW1lbnQncyBjb21wdXRlZCBzdHlsZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gY3NzIHByb3BlcnR5IGBwcm9wZXJ0eU5hbWVgLlxuICAgKiBXZSBhY2hpZXZlIHRoaXMgdmlhIGBnZXRDb21wdXRlZFN0eWxlKC4uLikuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpYC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUocHJvcGVydHlOYW1lKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBQQVRIX1NFTEVDVE9SOiAnLm1kYy1ub3RjaGVkLW91dGxpbmVfX3BhdGgnLFxuICBJRExFX09VVExJTkVfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZV9faWRsZScsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIE9VVExJTkVfTk9UQ0hFRDogJ21kYy1ub3RjaGVkLW91dGxpbmUtLW5vdGNoZWQnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9ICovICh7XG4gICAgICBnZXRXaWR0aDogKCkgPT4ge30sXG4gICAgICBnZXRIZWlnaHQ6ICgpID0+IHt9LFxuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgc2V0T3V0bGluZVBhdGhBdHRyOiAoKSA9PiB7fSxcbiAgICAgIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZTogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBvdXRsaW5lIG5vdGNoZWQgc2VsZWN0b3IgYW5kIHVwZGF0ZXMgdGhlIG5vdGNoIHdpZHRoXG4gICAqIGNhbGN1bGF0ZWQgYmFzZWQgb2ZmIG9mIG5vdGNoV2lkdGggYW5kIGlzUnRsLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90Y2hXaWR0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpc1J0bFxuICAgKi9cbiAgbm90Y2gobm90Y2hXaWR0aCwgaXNSdGwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHtPVVRMSU5FX05PVENIRUR9ID0gTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhPVVRMSU5FX05PVENIRUQpO1xuICAgIHRoaXMudXBkYXRlU3ZnUGF0aF8obm90Y2hXaWR0aCwgaXNSdGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgbm90Y2hlZCBvdXRsaW5lIHNlbGVjdG9yIHRvIGNsb3NlIHRoZSBub3RjaCBpbiB0aGUgb3V0bGluZS5cbiAgICovXG4gIGNsb3NlTm90Y2goKSB7XG4gICAgY29uc3Qge09VVExJTkVfTk9UQ0hFRH0gPSBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE9VVExJTkVfTk9UQ0hFRCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgU1ZHIHBhdGggb2YgdGhlIGZvY3VzIG91dGxpbmUgZWxlbWVudCBiYXNlZCBvbiB0aGUgbm90Y2hXaWR0aFxuICAgKiBhbmQgdGhlIFJUTCBjb250ZXh0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90Y2hXaWR0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpc1J0bFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdXBkYXRlU3ZnUGF0aF8obm90Y2hXaWR0aCwgaXNSdGwpIHtcbiAgICAvLyBGYWxsIGJhY2sgdG8gcmVhZGluZyBhIHNwZWNpZmljIGNvcm5lcidzIHN0eWxlIGJlY2F1c2UgRmlyZWZveCBkb2Vzbid0IHJlcG9ydCB0aGUgc3R5bGUgb24gYm9yZGVyLXJhZGl1cy5cbiAgICBjb25zdCByYWRpdXNTdHlsZVZhbHVlID0gdGhpcy5hZGFwdGVyXy5nZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUoJ2JvcmRlci1yYWRpdXMnKSB8fFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSgnYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cycpO1xuICAgIGNvbnN0IHJhZGl1cyA9IHBhcnNlRmxvYXQocmFkaXVzU3R5bGVWYWx1ZSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmFkYXB0ZXJfLmdldFdpZHRoKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5hZGFwdGVyXy5nZXRIZWlnaHQoKTtcbiAgICBjb25zdCBjb3JuZXJXaWR0aCA9IHJhZGl1cyArIDEuMjtcbiAgICBjb25zdCBsZWFkaW5nU3Ryb2tlTGVuZ3RoID0gTWF0aC5hYnMoMTEgLSBjb3JuZXJXaWR0aCk7XG4gICAgY29uc3QgcGFkZGVkTm90Y2hXaWR0aCA9IG5vdGNoV2lkdGggKyA4O1xuXG4gICAgLy8gVGhlIHJpZ2h0LCBib3R0b20sIGFuZCBsZWZ0IHNpZGVzIG9mIHRoZSBvdXRsaW5lIGZvbGxvdyB0aGUgc2FtZSBTVkcgcGF0aC5cbiAgICBjb25zdCBwYXRoTWlkZGxlID0gJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgcmFkaXVzICsgJywnICsgcmFkaXVzXG4gICAgICArICd2JyArIChoZWlnaHQgLSAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgLXJhZGl1cyArICcsJyArIHJhZGl1c1xuICAgICAgKyAnaCcgKyAoLXdpZHRoICsgKDIgKiBjb3JuZXJXaWR0aCkpXG4gICAgICArICdhJyArIHJhZGl1cyArICcsJyArIHJhZGl1cyArICcgMCAwIDEgJyArIC1yYWRpdXMgKyAnLCcgKyAtcmFkaXVzXG4gICAgICArICd2JyArICgtaGVpZ2h0ICsgKDIgKiBjb3JuZXJXaWR0aCkpXG4gICAgICArICdhJyArIHJhZGl1cyArICcsJyArIHJhZGl1cyArICcgMCAwIDEgJyArIHJhZGl1cyArICcsJyArIC1yYWRpdXM7XG5cbiAgICBsZXQgcGF0aDtcbiAgICBpZiAoIWlzUnRsKSB7XG4gICAgICBwYXRoID0gJ00nICsgKGNvcm5lcldpZHRoICsgbGVhZGluZ1N0cm9rZUxlbmd0aCArIHBhZGRlZE5vdGNoV2lkdGgpICsgJywnICsgMVxuICAgICAgICArICdoJyArICh3aWR0aCAtICgyICogY29ybmVyV2lkdGgpIC0gcGFkZGVkTm90Y2hXaWR0aCAtIGxlYWRpbmdTdHJva2VMZW5ndGgpXG4gICAgICAgICsgcGF0aE1pZGRsZVxuICAgICAgICArICdoJyArIGxlYWRpbmdTdHJva2VMZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhdGggPSAnTScgKyAod2lkdGggLSBjb3JuZXJXaWR0aCAtIGxlYWRpbmdTdHJva2VMZW5ndGgpICsgJywnICsgMVxuICAgICAgICArICdoJyArIGxlYWRpbmdTdHJva2VMZW5ndGhcbiAgICAgICAgKyBwYXRoTWlkZGxlXG4gICAgICAgICsgJ2gnICsgKHdpZHRoIC0gKDIgKiBjb3JuZXJXaWR0aCkgLSBwYWRkZWROb3RjaFdpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5zZXRPdXRsaW5lUGF0aEF0dHIocGF0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgIC8vIFVuYm91bmRlZCByaXBwbGVzIG5lZWQgbGF5b3V0IGxvZ2ljIGFwcGxpZWQgaW1tZWRpYXRlbHkgdG8gc2V0IGNvb3JkaW5hdGVzIGZvciBib3RoIHNoYWRlIGFuZCByaXBwbGVcbiAgICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge1xuICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyxcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxuICBhcHBseVBhc3NpdmVcbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IE1BVENIRVMoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIChcbiAgICAgIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gICAgKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3Iodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdlxuICAgIDpzdHlsZT1cInt3aWR0aDpmdWxsd2lkdGg/JzEwMCUnOnVuZGVmaW5lZH1cIlxuICAgIDppZD1cImlkXCJcbiAgICBjbGFzcz1cIm1kYy10ZXh0ZmllbGQtd3JhcHBlclwiPlxuXG4gICAgPGRpdlxuICAgICAgcmVmPVwicm9vdFwiXG4gICAgICA6Y2xhc3M9XCJyb290Q2xhc3Nlc1wiPlxuXG4gICAgICA8aVxuICAgICAgICB2LWlmPVwiISFoYXNMZWFkaW5nSWNvblwiXG4gICAgICAgIHJlZj1cImljb25cIlxuICAgICAgICA6Y2xhc3M9XCJoYXNMZWFkaW5nSWNvbi5jbGFzc2VzXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgY2xhc3M9XCJtZGMtdGV4dC1maWVsZF9faWNvblwiPlxuICAgICAgICA8c2xvdCBuYW1lPVwibGVhZGluZy1pY29uXCI+e3sgaGFzTGVhZGluZ0ljb24uY29udGVudCB9fTwvc2xvdD5cbiAgICAgIDwvaT5cblxuICAgICAgPCEtLSB3b3JrYXJyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3JvbGx1cC1wbHVnaW4tdnVlL2lzc3Vlcy8xNzQgLS0+XG4gICAgICA8IS0tIGVzbGludC1kaXNhYmxlIHZ1ZS9odG1sLXNlbGYtY2xvc2luZyAtLT5cbiAgICAgIDx0ZXh0YXJlYVxuICAgICAgICB2LWlmPVwibXVsdGlsaW5lXCJcbiAgICAgICAgcmVmPVwiaW5wdXRcIlxuICAgICAgICB2LWJpbmQ9XCIkYXR0cnNcIlxuICAgICAgICA6aWQ9XCJ2bWFfdWlkX1wiXG4gICAgICAgIDpjbGFzcz1cImlucHV0Q2xhc3Nlc1wiXG4gICAgICAgIDptaW5sZW5ndGg9XCJtaW5sZW5ndGhcIlxuICAgICAgICA6bWF4bGVuZ3RoPVwibWF4bGVuZ3RoXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwiaW5wdXRQbGFjZUhvbGRlclwiXG4gICAgICAgIDphcmlhLWxhYmVsPVwiaW5wdXRQbGFjZUhvbGRlclwiXG4gICAgICAgIDphcmlhLWNvbnRyb2xzPVwiaW5wdXRBcmlhQ29udHJvbHNcIlxuICAgICAgICA6cm93cz1cInJvd3NcIlxuICAgICAgICA6Y29scz1cImNvbHNcIlxuICAgICAgICB2LW9uPVwiJGxpc3RlbmVyc1wiXG4gICAgICAgIEBpbnB1dD1cInVwZGF0ZVZhbHVlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgID48L3RleHRhcmVhPlxuXG4gICAgICA8aW5wdXRcbiAgICAgICAgdi1lbHNlXG4gICAgICAgIHJlZj1cImlucHV0XCJcbiAgICAgICAgdi1iaW5kPVwiJGF0dHJzXCJcbiAgICAgICAgOmlkPVwidm1hX3VpZF9cIlxuICAgICAgICA6Y2xhc3M9XCJpbnB1dENsYXNzZXNcIlxuICAgICAgICA6dHlwZT1cInR5cGVcIlxuICAgICAgICA6bWlubGVuZ3RoPVwibWlubGVuZ3RoXCJcbiAgICAgICAgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cImlucHV0UGxhY2VIb2xkZXJcIlxuICAgICAgICA6YXJpYS1sYWJlbD1cImlucHV0UGxhY2VIb2xkZXJcIlxuICAgICAgICA6YXJpYS1jb250cm9scz1cImlucHV0QXJpYUNvbnRyb2xzXCJcbiAgICAgICAgdi1vbj1cIiRsaXN0ZW5lcnNcIlxuICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICA+XG5cbiAgICAgIDxsYWJlbFxuICAgICAgICB2LWlmPVwiaGFzTGFiZWxcIlxuICAgICAgICByZWY9XCJsYWJlbFwiXG4gICAgICAgIDpjbGFzcz1cImxhYmVsQ2xhc3Nlc1VwZ3JhZGVkXCJcbiAgICAgICAgOmZvcj1cInZtYV91aWRfXCI+XG4gICAgICAgIHt7IGxhYmVsIH19XG4gICAgICA8L2xhYmVsPlxuXG4gICAgICA8aVxuICAgICAgICB2LWlmPVwiISFoYXNUcmFpbGluZ0ljb25cIlxuICAgICAgICByZWY9XCJpY29uXCJcbiAgICAgICAgOmNsYXNzPVwiaGFzVHJhaWxpbmdJY29uLmNsYXNzZXNcIlxuICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICBjbGFzcz1cIm1kYy10ZXh0LWZpZWxkX19pY29uXCI+XG4gICAgICAgIDxzbG90IG5hbWU9XCJ0cmFpbGluZy1pY29uXCI+e3sgaGFzVHJhaWxpbmdJY29uLmNvbnRlbnQgfX08L3Nsb3Q+XG4gICAgICA8L2k+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cImhhc091dGxpbmVcIlxuICAgICAgICByZWY9XCJvdXRsaW5lXCJcbiAgICAgICAgOmNsYXNzPVwib3V0bGluZUNsYXNzZXNcIlxuICAgICAgICBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVcIj5cbiAgICAgICAgPHN2Zz5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgOmQ9XCJvdXRsaW5lUGF0aEF0dHJcIlxuICAgICAgICAgICAgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX19wYXRoXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cImhhc091dGxpbmVcIlxuICAgICAgICByZWY9XCJvdXRsaW5lSWRsZVwiXG4gICAgICAgIGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9faWRsZVwiLz5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cImhhc0xpbmVSaXBwbGVcIlxuICAgICAgICByZWY9XCJsaW5lUmlwcGxlXCJcbiAgICAgICAgOmNsYXNzPVwibGluZVJpcHBsZUNsYXNzZXNcIlxuICAgICAgICA6c3R5bGU9XCJsaW5lUmlwcGxlU3R5bGVzXCIvPlxuXG4gICAgPC9kaXY+XG5cbiAgICA8cFxuICAgICAgdi1pZj1cImhlbHB0ZXh0XCJcbiAgICAgIHJlZj1cImhlbHBcIlxuICAgICAgOmlkPVwiJ2hlbHAtJyt2bWFfdWlkX1wiXG4gICAgICA6Y2xhc3M9XCJoZWxwQ2xhc3Nlc1wiXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIHt7IGhlbHB0ZXh0IH19XG4gICAgPC9wPlxuXG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENUZXh0ZmllbGRGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQvZm91bmRhdGlvbidcbmltcG9ydCBNRENMaW5lUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbGluZS1yaXBwbGUvZm91bmRhdGlvbidcbmltcG9ydCBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGV4dGZpZWxkL2hlbHBlci10ZXh0L2ZvdW5kYXRpb24nXG5pbXBvcnQgTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3RleHRmaWVsZC9pY29uL2ZvdW5kYXRpb24nXG5pbXBvcnQgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Zsb2F0aW5nLWxhYmVsL2ZvdW5kYXRpb24nXG5pbXBvcnQgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9ub3RjaGVkLW91dGxpbmUvZm91bmRhdGlvbidcblxuaW1wb3J0IHtcbiAgZXh0cmFjdEljb25Qcm9wLFxuICBEaXNwYXRjaEZvY3VzTWl4aW4sXG4gIEN1c3RvbUVsZW1lbnRNaXhpbixcbiAgVk1BVW5pcXVlSWRNaXhpbixcbiAgYXBwbHlQYXNzaXZlXG59IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgeyBSaXBwbGVCYXNlIH0gZnJvbSAnLi4vcmlwcGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtdGV4dGZpZWxkJyxcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBEaXNwYXRjaEZvY3VzTWl4aW4sIFZNQVVuaXF1ZUlkTWl4aW5dLFxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICd2YWx1ZScsXG4gICAgZXZlbnQ6ICdtb2RlbCdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogU3RyaW5nLFxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0ZXh0JyxcbiAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBbXG4gICAgICAgICAgICAndGV4dCcsXG4gICAgICAgICAgICAnZW1haWwnLFxuICAgICAgICAgICAgJ3NlYXJjaCcsXG4gICAgICAgICAgICAncGFzc3dvcmQnLFxuICAgICAgICAgICAgJ3RlbCcsXG4gICAgICAgICAgICAndXJsJyxcbiAgICAgICAgICAgICdudW1iZXInXG4gICAgICAgICAgXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVuc2U6IEJvb2xlYW4sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBoZWxwdGV4dDogU3RyaW5nLFxuICAgIGhlbHB0ZXh0UGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBoZWxwdGV4dFZhbGlkYXRpb246IEJvb2xlYW4sXG4gICAgYm94OiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgcmVxdWlyZWQ6IEJvb2xlYW4sXG4gICAgdmFsaWQ6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogdW5kZWZpbmVkIH0sXG4gICAgZnVsbHdpZHRoOiBCb29sZWFuLFxuICAgIG11bHRpbGluZTogQm9vbGVhbixcbiAgICBsZWFkaW5nSWNvbjogW1N0cmluZywgQXJyYXksIE9iamVjdF0sXG4gICAgdHJhaWxpbmdJY29uOiBbU3RyaW5nLCBBcnJheSwgT2JqZWN0XSxcbiAgICBzaXplOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDIwIH0sXG4gICAgbWlubGVuZ3RoOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IHVuZGVmaW5lZCB9LFxuICAgIG1heGxlbmd0aDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiB1bmRlZmluZWQgfSxcbiAgICByb3dzOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDggfSxcbiAgICBjb2xzOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDQwIH0sXG4gICAgaWQ6IHsgdHlwZTogU3RyaW5nIH1cbiAgfSxcbiAgZGF0YTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHQ6IHRoaXMudmFsdWUsXG4gICAgICByb290Q2xhc3Nlczoge1xuICAgICAgICAnbWRjLXRleHRmaWVsZCc6IHRydWUsXG4gICAgICAgICdtZGMtdGV4dC1maWVsZCc6IHRydWUsXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tdXBncmFkZWQnOiB0cnVlLFxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkLS1kZW5zZSc6IHRoaXMuZGVuc2UsXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tZnVsbHdpZHRoJzogdGhpcy5mdWxsd2lkdGgsXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tdGV4dGFyZWEnOiB0aGlzLm11bHRpbGluZSxcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkLS1ib3gnOiAhdGhpcy5mdWxsd2lkdGggJiYgdGhpcy5ib3gsXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQnOiAhdGhpcy5mdWxsd2lkdGggJiYgdGhpcy5vdXRsaW5lXG4gICAgICB9LFxuICAgICAgaW5wdXRDbGFzc2VzOiB7XG4gICAgICAgICdtZGMtdGV4dC1maWVsZF9faW5wdXQnOiB0cnVlXG4gICAgICB9LFxuICAgICAgbGFiZWxDbGFzc2VzOiB7XG4gICAgICAgICdtZGMtZmxvYXRpbmctbGFiZWwnOiB0cnVlXG4gICAgICB9LFxuICAgICAgbGluZVJpcHBsZUNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1saW5lLXJpcHBsZSc6IHRydWVcbiAgICAgIH0sXG4gICAgICBsaW5lUmlwcGxlU3R5bGVzOiB7fSxcbiAgICAgIGhlbHBDbGFzc2VzOiB7XG4gICAgICAgICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dCc6IHRydWUsXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tcGVyc2lzdGVudCc6IHRoaXMuaGVscHRleHRQZXJzaXN0ZW50LFxuICAgICAgICAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQtLXZhbGlkYXRpb24tbXNnJzogdGhpcy5oZWxwdGV4dFZhbGlkYXRpb25cbiAgICAgIH0sXG4gICAgICBvdXRsaW5lQ2xhc3Nlczoge30sXG4gICAgICBvdXRsaW5lUGF0aEF0dHI6IHVuZGVmaW5lZFxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBpbnB1dFBsYWNlSG9sZGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZnVsbHdpZHRoID8gdGhpcy5sYWJlbCA6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgaW5wdXRBcmlhQ29udHJvbHMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oZWxwID8gJ2hlbHAtJyArIHRoaXMudm1hX3VpZF8gOiB1bmRlZmluZWRcbiAgICB9LFxuICAgIGhhc0xhYmVsKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmZ1bGx3aWR0aCAmJiB0aGlzLmxhYmVsXG4gICAgfSxcbiAgICBoYXNPdXRsaW5lKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmZ1bGx3aWR0aCAmJiB0aGlzLm91dGxpbmVcbiAgICB9LFxuICAgIGhhc0xpbmVSaXBwbGUoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuaGFzT3V0bGluZSAmJiAhdGhpcy5tdWx0aWxpbmVcbiAgICB9LFxuICAgIGhhc0xlYWRpbmdJY29uKCkge1xuICAgICAgaWYgKFxuICAgICAgICAodGhpcy5sZWFkaW5nSWNvbiB8fCB0aGlzLiRzbG90c1snbGVhZGluZy1pY29uJ10pICYmXG4gICAgICAgICEodGhpcy50cmFpbGluZ0ljb24gfHwgdGhpcy4kc2xvdHNbJ3RyYWlsaW5nLWljb24nXSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZWFkaW5nSWNvbiA/IGV4dHJhY3RJY29uUHJvcCh0aGlzLmxlYWRpbmdJY29uKSA6IHt9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICAgIGhhc1RyYWlsaW5nSWNvbigpIHtcbiAgICAgIGlmICh0aGlzLnRyYWlsaW5nSWNvbiB8fCB0aGlzLiRzbG90c1sndHJhaWxpbmctaWNvbiddKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWlsaW5nSWNvbiA/IGV4dHJhY3RJY29uUHJvcCh0aGlzLnRyYWlsaW5nSWNvbikgOiB7fVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICBsYWJlbENsYXNzZXNVcGdyYWRlZCgpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMubGFiZWxDbGFzc2VzLCB7XG4gICAgICAgICdtZGMtZmxvYXRpbmctbGFiZWwtLWZsb2F0LWFib3ZlJzogdGhpcy52YWx1ZVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgZGlzYWJsZWQoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpXG4gICAgfSxcbiAgICByZXF1aXJlZCgpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQgJiYgKHRoaXMuJHJlZnMuaW5wdXQucmVxdWlyZWQgPSB0aGlzLnJlcXVpcmVkKVxuICAgIH0sXG4gICAgdmFsaWQoKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMudmFsaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uc2V0VmFsaWQodGhpcy52YWxpZClcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlbnNlKCkge1xuICAgICAgdGhpcy4kc2V0KHRoaXMucm9vdENsYXNzZXMsICdtZGMtdGV4dC1maWVsZC0tZGVuc2UnLCB0aGlzLmRlbnNlKVxuICAgIH0sXG4gICAgaGVscHRleHRQZXJzaXN0ZW50KCkge1xuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiAmJlxuICAgICAgICB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uLnNldFBlcnNpc3RlbnQodGhpcy5oZWxwdGV4dFBlcnNpc3RlbnQpXG4gICAgfSxcbiAgICBoZWxwdGV4dFZhbGlkYXRpb24oKSB7XG4gICAgICB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uICYmXG4gICAgICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24uc2V0VmFsaWRhdGlvbih0aGlzLmhlbHB0ZXh0VmFsaWRhdGlvbilcbiAgICB9LFxuICAgIHZhbHVlKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5mb3VuZGF0aW9uKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsdWUodmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgaWYgKHRoaXMuJHJlZnMubGluZVJpcHBsZSkge1xuICAgICAgdGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbiA9IG5ldyBNRENMaW5lUmlwcGxlRm91bmRhdGlvbih7XG4gICAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmxpbmVSaXBwbGVDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmxpbmVSaXBwbGVDbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMubGluZVJpcHBsZS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICBzZXRTdHlsZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMubGluZVJpcHBsZVN0eWxlcywgbmFtZSwgdmFsdWUpXG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMubGluZVJpcHBsZS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5saW5lUmlwcGxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMubGluZVJpcHBsZUZvdW5kYXRpb24uaW5pdCgpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJHJlZnMuaGVscCkge1xuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiA9IG5ldyBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbih7XG4gICAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmhlbHBDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmhlbHBDbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmhlbHAuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0QXR0cjogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5oZWxwLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlQXR0cjogbmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5oZWxwLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxuICAgICAgICB9LFxuICAgICAgICBzZXRDb250ZW50OiAoLypjb250ZW50Ki8pID0+IHtcbiAgICAgICAgICAvLyBoZWxwIHRleHQgZ2V0J3MgdXBkYXRlZCBmcm9tIHt7aGVscHRleHR9fVxuICAgICAgICAgIC8vIHRoaXMuJHJlZnMuaGVscC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uLmluaXQoKVxuICAgIH1cblxuICAgIGlmICh0aGlzLiRyZWZzLmljb24pIHtcbiAgICAgIGlmICh0aGlzLmhhc0xlYWRpbmdJY29uKSB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnJvb3RDbGFzc2VzLCAnbWRjLXRleHQtZmllbGQtLXdpdGgtbGVhZGluZy1pY29uJywgdHJ1ZSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNUcmFpbGluZ0ljb24pIHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMucm9vdENsYXNzZXMsICdtZGMtdGV4dC1maWVsZC0td2l0aC10cmFpbGluZy1pY29uJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5pY29uRm91bmRhdGlvbiA9IG5ldyBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbih7XG4gICAgICAgIHNldEF0dHI6IChhdHRyLCB2YWx1ZSkgPT4gdGhpcy4kcmVmcy5pY29uLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSksXG4gICAgICAgIGdldEF0dHI6IGF0dHIgPT4gdGhpcy4kcmVmcy5pY29uLmdldEF0dHJpYnV0ZShhdHRyKSxcbiAgICAgICAgcmVtb3ZlQXR0cjogYXR0ciA9PiB0aGlzLiRyZWZzLmljb24ucmVtb3ZlQXR0cmlidXRlKGF0dHIpLFxuICAgICAgICBzZXRDb250ZW50OiAoLypjb250ZW50Ki8pID0+IHtcbiAgICAgICAgICAvLyBpY29uIHRleHQgZ2V0J3MgdXBkYXRlZCBmcm9tIHt7e3sgaGFzVHJhaWxpbmdJY29uLmNvbnRlbnQgfX19fVxuICAgICAgICAgIC8vIHRoaXMuJHJlZnMuaWNvbi50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMuaWNvbi5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5pY29uLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcbiAgICAgICAgfSxcbiAgICAgICAgbm90aWZ5SWNvbkFjdGlvbjogKCkgPT4gdGhpcy4kZW1pdCgnaWNvbi1hY3Rpb24nKVxuICAgICAgfSlcbiAgICAgIHRoaXMuaWNvbkZvdW5kYXRpb24uaW5pdCgpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJHJlZnMubGFiZWwpIHtcbiAgICAgIHRoaXMubGFiZWxGb3VuZGF0aW9uID0gbmV3IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uKHtcbiAgICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMubGFiZWxDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmxhYmVsQ2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICBnZXRXaWR0aDogKCkgPT4gdGhpcy4kcmVmcy5sYWJlbC5vZmZzZXRXaWR0aCxcbiAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5sYWJlbC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5sYWJlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbi5pbml0KClcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kcmVmcy5vdXRsaW5lKSB7XG4gICAgICB0aGlzLm91dGxpbmVGb3VuZGF0aW9uID0gbmV3IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbih7XG4gICAgICAgIGdldFdpZHRoOiAoKSA9PiB0aGlzLiRyZWZzLm91dGxpbmUub2Zmc2V0V2lkdGgsXG4gICAgICAgIGdldEhlaWdodDogKCkgPT4gdGhpcy4kcmVmcy5vdXRsaW5lLm9mZnNldEhlaWdodCxcbiAgICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMub3V0bGluZUNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMub3V0bGluZUNsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0T3V0bGluZVBhdGhBdHRyOiB2YWx1ZSA9PiB7XG4gICAgICAgICAgdGhpcy5vdXRsaW5lUGF0aEF0dHIgPSB2YWx1ZVxuICAgICAgICB9LFxuICAgICAgICBnZXRJZGxlT3V0bGluZVN0eWxlVmFsdWU6IHByb3BlcnR5TmFtZSA9PiB7XG4gICAgICAgICAgY29uc3QgaWRsZU91dGxpbmVFbGVtZW50ID0gdGhpcy4kcmVmcy5vdXRsaW5lSWRsZVxuICAgICAgICAgIGlmIChpZGxlT3V0bGluZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3dcbiAgICAgICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoaWRsZU91dGxpbmVFbGVtZW50KVxuICAgICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5vdXRsaW5lRm91bmRhdGlvbi5pbml0KClcbiAgICB9XG5cbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDVGV4dGZpZWxkRm91bmRhdGlvbihcbiAgICAgIHtcbiAgICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMucm9vdENsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMucm9vdENsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5yb290LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMucm9vdC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcbiAgICAgICAgfSxcbiAgICAgICAgaXNGb2N1c2VkOiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuJHJlZnMuaW5wdXRcbiAgICAgICAgfSxcbiAgICAgICAgaXNSdGw6ICgpID0+XG4gICAgICAgICAgd2luZG93XG4gICAgICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLiRyZWZzLnJvb3QpXG4gICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJykgPT09ICdydGwnLFxuICAgICAgICBkZWFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLmRlYWN0aXZhdGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubGluZVJpcHBsZUZvdW5kYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubGluZVJpcHBsZUZvdW5kYXRpb24uYWN0aXZhdGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbjogbm9ybWFsaXplZFggPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLnNldFJpcHBsZUNlbnRlcihub3JtYWxpemVkWClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgICBjb25zdCBnZXRBdHRyaWJ1dGVzTGlzdCA9IG11dGF0aW9uc0xpc3QgPT5cbiAgICAgICAgICAgIG11dGF0aW9uc0xpc3QubWFwKG11dGF0aW9uID0+IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnNMaXN0ID0+XG4gICAgICAgICAgICBoYW5kbGVyKGdldEF0dHJpYnV0ZXNMaXN0KG11dGF0aW9uc0xpc3QpKVxuICAgICAgICAgIClcbiAgICAgICAgICBjb25zdCB0YXJnZXROb2RlID0gdGhpcy4kcmVmcy5pbnB1dFxuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSB9XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBjb25maWcpXG4gICAgICAgICAgcmV0dXJuIG9ic2VydmVyXG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogb2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICB9LFxuICAgICAgICBzaGFrZUxhYmVsOiBzaG91bGRTaGFrZSA9PiB7XG4gICAgICAgICAgdGhpcy5sYWJlbEZvdW5kYXRpb24uc2hha2Uoc2hvdWxkU2hha2UpXG4gICAgICAgIH0sXG4gICAgICAgIGZsb2F0TGFiZWw6IHNob3VsZEZsb2F0ID0+IHtcbiAgICAgICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbi5mbG9hdChzaG91bGRGbG9hdClcbiAgICAgICAgfSxcbiAgICAgICAgaGFzTGFiZWw6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gISF0aGlzLiRyZWZzLmxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGdldExhYmVsV2lkdGg6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbEZvdW5kYXRpb24uZ2V0V2lkdGgoKVxuICAgICAgICB9LFxuICAgICAgICBnZXROYXRpdmVJbnB1dDogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmlucHV0XG4gICAgICAgIH0sXG4gICAgICAgIGhhc091dGxpbmU6ICgpID0+ICEhdGhpcy5oYXNPdXRsaW5lLFxuICAgICAgICBub3RjaE91dGxpbmU6IChub3RjaFdpZHRoLCBpc1J0bCkgPT5cbiAgICAgICAgICB0aGlzLm91dGxpbmVGb3VuZGF0aW9uLm5vdGNoKG5vdGNoV2lkdGgsIGlzUnRsKSxcbiAgICAgICAgY2xvc2VPdXRsaW5lOiAoKSA9PiB0aGlzLm91dGxpbmVGb3VuZGF0aW9uLmNsb3NlTm90Y2goKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaGVscGVyVGV4dDogdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbixcbiAgICAgICAgaWNvbjogdGhpcy5pY29uRm91bmRhdGlvblxuICAgICAgfVxuICAgIClcblxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsdWUodGhpcy52YWx1ZSlcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZClcbiAgICB0aGlzLiRyZWZzLmlucHV0ICYmICh0aGlzLiRyZWZzLmlucHV0LnJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZClcbiAgICBpZiAodHlwZW9mIHRoaXMudmFsaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsaWQodGhpcy52YWxpZClcbiAgICB9XG5cbiAgICBpZiAodGhpcy50ZXh0Ym94KSB7XG4gICAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgICB0aGlzLnJpcHBsZS5pbml0KClcbiAgICB9XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgICB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uICYmIHRoaXMubGluZVJpcHBsZUZvdW5kYXRpb24uZGVzdHJveSgpXG4gICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiAmJiB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uLmRlc3Ryb3koKVxuICAgIHRoaXMuaWNvbkZvdW5kYXRpb24gJiYgdGhpcy5pY29uRm91bmRhdGlvbi5kZXN0cm95KClcbiAgICB0aGlzLmxhYmVsRm91bmRhdGlvbiAmJiB0aGlzLmxhYmVsRm91bmRhdGlvbi5kZXN0cm95KClcbiAgICB0aGlzLm91dGxpbmVGb3VuZGF0aW9uICYmIHRoaXMub3V0bGluZUZvdW5kYXRpb24uZGVzdHJveSgpXG4gICAgdGhpcy5yaXBwbGUgJiYgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnbW9kZWwnLCB2YWx1ZSlcbiAgICB9LFxuICAgIGZvY3VzKCkge1xuICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJiB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIGJsdXIoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0ICYmIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1RleHRGaWVsZCBmcm9tICcuL21kYy10ZXh0ZmllbGQudnVlJ1xuXG5leHBvcnQgeyBtZGNUZXh0RmllbGQgfVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjVGV4dEZpZWxkXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJzdXBwb3J0c1Bhc3NpdmVfIiwiYXBwbHlQYXNzaXZlIiwiZ2xvYmFsT2JqIiwid2luZG93IiwiZm9yY2VSZWZyZXNoIiwidW5kZWZpbmVkIiwiaXNTdXBwb3J0ZWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiZSIsImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJDdXN0b21FbGVtZW50IiwiZnVuY3Rpb25hbCIsInJlbmRlciIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwicHJvcHMiLCJpcyIsInRhZyIsImRhdGEiLCJjaGlsZHJlbiIsIkN1c3RvbUVsZW1lbnRNaXhpbiIsImV4dHJhY3RJY29uUHJvcCIsImljb25Qcm9wIiwiY2xhc3NlcyIsImNvbnRlbnQiLCJBcnJheSIsInJlZHVjZSIsInJlc3VsdCIsInZhbHVlIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJjbGFzc05hbWUiLCJzcGxpdCIsInRleHRDb250ZW50IiwiRGlzcGF0Y2hGb2N1c01peGluIiwiaGFzRm9jdXMiLCJtZXRob2RzIiwib25Nb3VzZURvd24iLCJfYWN0aXZlIiwib25Nb3VzZVVwIiwib25Gb2N1c0V2ZW50Iiwic2V0VGltZW91dCIsImRpc3BhdGNoRm9jdXNFdmVudCIsIm9uQmx1ckV2ZW50IiwiJGVsIiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJtb3VudGVkIiwiYmVmb3JlRGVzdHJveSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiVk1BVW5pcXVlSWRNaXhpbiIsImJlZm9yZUNyZWF0ZSIsInZtYV91aWRfIiwiX3VpZCIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlciIsImF0dHIiLCJzdHJpbmdzIiwiQVJJQV9ISURERU4iLCJST0xFIiwiY3NzQ2xhc3NlcyIsIkhFTFBFUl9URVhUX1BFUlNJU1RFTlQiLCJIRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRyIsIk1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwic2V0QXR0ciIsInJlbW92ZUF0dHIiLCJzZXRDb250ZW50IiwiZGVmYXVsdEFkYXB0ZXIiLCJpc1BlcnNpc3RlbnQiLCJpc1ZhbGlkYXRpb24iLCJpbnB1dElzVmFsaWQiLCJoZWxwZXJUZXh0SXNQZXJzaXN0ZW50IiwiaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyIsInZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkiLCJoaWRlXyIsIk1EQ1RleHRGaWVsZEljb25BZGFwdGVyIiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJJQ09OX0VWRU5UIiwiSUNPTl9ST0xFIiwiTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24iLCJnZXRBdHRyIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwibm90aWZ5SWNvbkFjdGlvbiIsInNhdmVkVGFiSW5kZXhfIiwiaW50ZXJhY3Rpb25IYW5kbGVyXyIsImV2dCIsImhhbmRsZUludGVyYWN0aW9uIiwiZm9yRWFjaCIsImRpc2FibGVkIiwibGFiZWwiLCJ0eXBlIiwia2V5Q29kZSIsIk1EQ1RleHRGaWVsZEFkYXB0ZXIiLCJvYnNlcnZlciIsIm5vcm1hbGl6ZWRYIiwic2hvdWxkU2hha2UiLCJzaG91bGRGbG9hdCIsImxhYmVsV2lkdGgiLCJpc1J0bCIsIkFSSUFfQ09OVFJPTFMiLCJJTlBVVF9TRUxFQ1RPUiIsIkxBQkVMX1NFTEVDVE9SIiwiSUNPTl9TRUxFQ1RPUiIsIk9VVExJTkVfU0VMRUNUT1IiLCJMSU5FX1JJUFBMRV9TRUxFQ1RPUiIsIlJPT1QiLCJVUEdSQURFRCIsIkRJU0FCTEVEIiwiREVOU0UiLCJGT0NVU0VEIiwiSU5WQUxJRCIsIkJPWCIsIk9VVExJTkVEIiwibnVtYmVycyIsIkxBQkVMX1NDQUxFIiwiREVOU0VfTEFCRUxfU0NBTEUiLCJWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNUIiwiTURDVGV4dEZpZWxkRm91bmRhdGlvbiIsImlzVmFsaWQiLCJpc0ZvY3VzZWRfIiwiZ2V0VmFsdWUiLCJpc0JhZElucHV0XyIsInJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyIiwiZGVyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyIiwiZ2V0TmF0aXZlSW5wdXQiLCJpc0ZvY3VzZWQiLCJhY3RpdmF0ZUxpbmVSaXBwbGUiLCJkZWFjdGl2YXRlTGluZVJpcHBsZSIsInNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW4iLCJzaGFrZUxhYmVsIiwiZmxvYXRMYWJlbCIsImhhc0xhYmVsIiwiZ2V0TGFiZWxXaWR0aCIsImhhc091dGxpbmUiLCJub3RjaE91dGxpbmUiLCJjbG9zZU91dGxpbmUiLCJmb3VuZGF0aW9uTWFwIiwiaGVscGVyVGV4dF8iLCJoZWxwZXJUZXh0IiwiaWNvbl8iLCJpY29uIiwicmVjZWl2ZWRVc2VySW5wdXRfIiwidXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ18iLCJpc1ZhbGlkXyIsImlucHV0Rm9jdXNIYW5kbGVyXyIsImFjdGl2YXRlRm9jdXMiLCJpbnB1dEJsdXJIYW5kbGVyXyIsImRlYWN0aXZhdGVGb2N1cyIsImlucHV0SW5wdXRIYW5kbGVyXyIsImF1dG9Db21wbGV0ZUZvY3VzIiwic2V0UG9pbnRlclhPZmZzZXRfIiwic2V0VHJhbnNmb3JtT3JpZ2luIiwidGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyIsImhhbmRsZVRleHRGaWVsZEludGVyYWN0aW9uIiwidmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXJfIiwiYXR0cmlidXRlc0xpc3QiLCJoYW5kbGVWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlIiwidmFsaWRhdGlvbk9ic2VydmVyXyIsInNvbWUiLCJhdHRyaWJ1dGVOYW1lIiwiaW5kZXhPZiIsInN0eWxlVmFsaWRpdHlfIiwib3Blbk5vdGNoIiwiaXNEZW5zZSIsImxhYmVsU2NhbGUiLCJzdHlsZUZvY3VzZWRfIiwic2hvd1RvU2NyZWVuUmVhZGVyIiwidGFyZ2V0Q2xpZW50UmVjdCIsInRhcmdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImV2dENvb3JkcyIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJsZWZ0IiwiaW5wdXQiLCJnZXROYXRpdmVJbnB1dF8iLCJzaG91bGRSZW1vdmVMYWJlbEZsb2F0IiwiaXNOYXRpdmVJbnB1dFZhbGlkXyIsInN0eWxlRGlzYWJsZWRfIiwic2V0QXJpYUxhYmVsIiwidmFsaWRpdHkiLCJiYWRJbnB1dCIsInZhbGlkIiwic2V0VmFsaWRpdHkiLCJpc0Rpc2FibGVkIiwic2V0RGlzYWJsZWQiLCJNRENMaW5lUmlwcGxlQWRhcHRlciIsInByb3BlcnR5TmFtZSIsIkxJTkVfUklQUExFX0FDVElWRSIsIkxJTkVfUklQUExFX0RFQUNUSVZBVElORyIsIk1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIiwic2V0U3R5bGUiLCJyZWdpc3RlckV2ZW50SGFuZGxlciIsImRlcmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJ0cmFuc2l0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVUcmFuc2l0aW9uRW5kIiwieENvb3JkaW5hdGUiLCJpc0RlYWN0aXZhdGluZyIsIk1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyIiwiTEFCRUxfRkxPQVRfQUJPVkUiLCJMQUJFTF9TSEFLRSIsIk1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIiwiZ2V0V2lkdGgiLCJzaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfIiwiaGFuZGxlU2hha2VBbmltYXRpb25FbmRfIiwiTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyIiwiUEFUSF9TRUxFQ1RPUiIsIklETEVfT1VUTElORV9TRUxFQ1RPUiIsIk9VVExJTkVfTk9UQ0hFRCIsIk1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiIsImdldEhlaWdodCIsInNldE91dGxpbmVQYXRoQXR0ciIsImdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSIsIm5vdGNoV2lkdGgiLCJ1cGRhdGVTdmdQYXRoXyIsInJhZGl1c1N0eWxlVmFsdWUiLCJyYWRpdXMiLCJwYXJzZUZsb2F0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb3JuZXJXaWR0aCIsImxlYWRpbmdTdHJva2VMZW5ndGgiLCJhYnMiLCJwYWRkZWROb3RjaFdpZHRoIiwicGF0aE1pZGRsZSIsInBhdGgiLCJNRENSaXBwbGVBZGFwdGVyIiwidmFyTmFtZSIsIlVOQk9VTkRFRCIsIkJHX0ZPQ1VTRUQiLCJGR19BQ1RJVkFUSU9OIiwiRkdfREVBQ1RJVkFUSU9OIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsImZpbHRlciIsInAiLCJwb3AiLCJnZXROb3JtYWxpemVkRXZlbnRDb29yZHMiLCJldiIsInBhZ2VPZmZzZXQiLCJjbGllbnRSZWN0IiwiZG9jdW1lbnRYIiwiZG9jdW1lbnRZIiwidG9wIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJsZW5ndGgiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsImV2ZW50IiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCIkc2V0IiwiJGRlbGV0ZSIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJtaXhpbnMiLCJpbmhlcml0QXR0cnMiLCJtb2RlbCIsInByb3AiLCJTdHJpbmciLCJkZWZhdWx0IiwidmFsaWRhdG9yIiwiZGVuc2UiLCJCb29sZWFuIiwiaGVscHRleHQiLCJoZWxwdGV4dFBlcnNpc3RlbnQiLCJoZWxwdGV4dFZhbGlkYXRpb24iLCJib3giLCJvdXRsaW5lIiwicmVxdWlyZWQiLCJmdWxsd2lkdGgiLCJtdWx0aWxpbmUiLCJsZWFkaW5nSWNvbiIsInRyYWlsaW5nSWNvbiIsInNpemUiLCJOdW1iZXIiLCJtaW5sZW5ndGgiLCJtYXhsZW5ndGgiLCJyb3dzIiwiY29scyIsImlkIiwidGV4dCIsInJvb3RDbGFzc2VzIiwiaW5wdXRDbGFzc2VzIiwibGFiZWxDbGFzc2VzIiwibGluZVJpcHBsZUNsYXNzZXMiLCJsaW5lUmlwcGxlU3R5bGVzIiwiaGVscENsYXNzZXMiLCJvdXRsaW5lQ2xhc3NlcyIsIm91dGxpbmVQYXRoQXR0ciIsImNvbXB1dGVkIiwiaW5wdXRQbGFjZUhvbGRlciIsImlucHV0QXJpYUNvbnRyb2xzIiwiaGVscCIsImhhc0xpbmVSaXBwbGUiLCJoYXNMZWFkaW5nSWNvbiIsIiRzbG90cyIsImhhc1RyYWlsaW5nSWNvbiIsImxhYmVsQ2xhc3Nlc1VwZ3JhZGVkIiwid2F0Y2giLCJmb3VuZGF0aW9uIiwiJHJlZnMiLCJzZXRWYWxpZCIsImhlbHBlclRleHRGb3VuZGF0aW9uIiwic2V0UGVyc2lzdGVudCIsInNldFZhbGlkYXRpb24iLCJzZXRWYWx1ZSIsImxpbmVSaXBwbGUiLCJsaW5lUmlwcGxlRm91bmRhdGlvbiIsImNsYXNzTGlzdCIsImluaXQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpY29uRm91bmRhdGlvbiIsImdldEF0dHJpYnV0ZSIsImxhYmVsRm91bmRhdGlvbiIsIm9mZnNldFdpZHRoIiwib3V0bGluZUZvdW5kYXRpb24iLCJvZmZzZXRIZWlnaHQiLCJpZGxlT3V0bGluZUVsZW1lbnQiLCJvdXRsaW5lSWRsZSIsImdldFByb3BlcnR5VmFsdWUiLCJNRENUZXh0ZmllbGRGb3VuZGF0aW9uIiwicm9vdCIsImRlYWN0aXZhdGUiLCJhY3RpdmF0ZSIsInNldFJpcHBsZUNlbnRlciIsImdldEF0dHJpYnV0ZXNMaXN0IiwibXV0YXRpb25zTGlzdCIsIm1hcCIsIm11dGF0aW9uIiwiTXV0YXRpb25PYnNlcnZlciIsInRhcmdldE5vZGUiLCJjb25maWciLCJhdHRyaWJ1dGVzIiwib2JzZXJ2ZSIsImRpc2Nvbm5lY3QiLCJzaGFrZSIsImZsb2F0Iiwibm90Y2giLCJjbG9zZU5vdGNoIiwidGV4dGJveCIsInJpcHBsZSIsImRl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
