/**
* @module vue-mdc-adapterdialog 0.17.0
* @exports VueMDCDialog
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCDialog = factory());
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

    var CustomButton = {
      name: 'custom-button',
      functional: true,
      props: {
        link: Object
      },
      render: function render(h, context) {
        var element = void 0;
        var data = _extends({}, context.data);

        if (context.props.link && context.parent.$router) {
          // router-link case
          element = context.parent.$root.$options.components['router-link'];
          data.props = _extends({ tag: context.props.tag }, context.props.link);
          data.attrs.role = 'button';
          if (data.on.click) {
            data.nativeOn = { click: data.on.click };
          }
        } else if (data.attrs && data.attrs.href) {
          // href case
          element = 'a';
          data.attrs.role = 'button';
        } else {
          // button fallback
          element = 'button';
        }

        return h(element, data, context.children);
      }
    };

    var CustomButtonMixin = {
      props: {
        href: String,
        disabled: Boolean,
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
        CustomButton: CustomButton
      }
    };

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
      ROOT: 'mdc-dialog',
      OPEN: 'mdc-dialog--open',
      ANIMATING: 'mdc-dialog--animating',
      BACKDROP: 'mdc-dialog__backdrop',
      SCROLL_LOCK: 'mdc-dialog-scroll-lock',
      ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
      CANCEL_BTN: 'mdc-dialog__footer__button--cancel'
    };

    var strings = {
      OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
      DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
      ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
      ACCEPT_EVENT: 'MDCDialog:accept',
      CANCEL_EVENT: 'MDCDialog:cancel'
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

    var MDCDialogFoundation = function (_MDCFoundation) {
      inherits(MDCDialogFoundation, _MDCFoundation);
      createClass(MDCDialogFoundation, null, [{
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
            addBodyClass: function addBodyClass() /* className: string */{},
            removeBodyClass: function removeBodyClass() /* className: string */{},
            eventTargetHasClass: function eventTargetHasClass() {
              return (/* target: EventTarget, className: string */ /* boolean */false
              );
            },
            registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
            registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
            registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
            deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
            registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
            deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
            notifyAccept: function notifyAccept() {},
            notifyCancel: function notifyCancel() {},
            trapFocusOnSurface: function trapFocusOnSurface() {},
            untrapFocusOnSurface: function untrapFocusOnSurface() {},
            isDialog: function isDialog() {
              return (/* el: Element */ /* boolean */false
              );
            }
          };
        }
      }]);

      function MDCDialogFoundation(adapter) {
        classCallCheck(this, MDCDialogFoundation);

        var _this = possibleConstructorReturn(this, (MDCDialogFoundation.__proto__ || Object.getPrototypeOf(MDCDialogFoundation)).call(this, _extends(MDCDialogFoundation.defaultAdapter, adapter)));

        _this.isOpen_ = false;
        _this.componentClickHandler_ = function (evt) {
          if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses.BACKDROP)) {
            _this.cancel(true);
          }
        };
        _this.dialogClickHandler_ = function (evt) {
          return _this.handleDialogClick_(evt);
        };
        _this.documentKeydownHandler_ = function (evt) {
          if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
            _this.cancel(true);
          }
        };
        _this.transitionEndHandler_ = function (evt) {
          return _this.handleTransitionEnd_(evt);
        };
        return _this;
      }

      createClass(MDCDialogFoundation, [{
        key: 'destroy',
        value: function destroy() {
          // Ensure that dialog is cleaned up when destroyed
          if (this.isOpen_) {
            this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
            this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
            this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
            this.adapter_.untrapFocusOnSurface();
            this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
            this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
            this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
            this.enableScroll_();
          }
        }
      }, {
        key: 'open',
        value: function open() {
          this.isOpen_ = true;
          this.disableScroll_();
          this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
          this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
          this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
        }
      }, {
        key: 'close',
        value: function close() {
          this.isOpen_ = false;
          this.enableScroll_();
          this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
          this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
          this.adapter_.untrapFocusOnSurface();
          this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
        }
      }, {
        key: 'isOpen',
        value: function isOpen() {
          return this.isOpen_;
        }
      }, {
        key: 'accept',
        value: function accept(shouldNotify) {
          if (shouldNotify) {
            this.adapter_.notifyAccept();
          }

          this.close();
        }
      }, {
        key: 'cancel',
        value: function cancel(shouldNotify) {
          if (shouldNotify) {
            this.adapter_.notifyCancel();
          }

          this.close();
        }
      }, {
        key: 'handleDialogClick_',
        value: function handleDialogClick_(evt) {
          var target = evt.target;

          if (this.adapter_.eventTargetHasClass(target, cssClasses.ACCEPT_BTN)) {
            this.accept(true);
          } else if (this.adapter_.eventTargetHasClass(target, cssClasses.CANCEL_BTN)) {
            this.cancel(true);
          }
        }
      }, {
        key: 'handleTransitionEnd_',
        value: function handleTransitionEnd_(evt) {
          if (this.adapter_.isDialog(evt.target)) {
            this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
            this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
            if (this.isOpen_) {
              this.adapter_.trapFocusOnSurface();
            }      }    }
      }, {
        key: 'disableScroll_',
        value: function disableScroll_() {
          this.adapter_.addBodyClass(cssClasses.SCROLL_LOCK);
        }
      }, {
        key: 'enableScroll_',
        value: function enableScroll_() {
          this.adapter_.removeBodyClass(cssClasses.SCROLL_LOCK);
        }
      }]);
      return MDCDialogFoundation;
    }(MDCFoundation);

    var tabbable = function (el, options) {
      options = options || {};

      var elementDocument = el.ownerDocument || el;
      var basicTabbables = [];
      var orderedTabbables = [];

      // A node is "available" if
      // - it's computed style
      var isUnavailable = createIsUnavailable(elementDocument);

      var candidateSelectors = ['input', 'select', 'a[href]', 'textarea', 'button', '[tabindex]'];

      var candidates = el.querySelectorAll(candidateSelectors.join(','));

      if (options.includeContainer) {
        var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

        if (candidateSelectors.some(function (candidateSelector) {
          return matches.call(el, candidateSelector);
        })) {
          candidates = Array.prototype.slice.apply(candidates);
          candidates.unshift(el);
        }
      }

      var candidate, candidateIndexAttr, candidateIndex;
      for (var i = 0, l = candidates.length; i < l; i++) {
        candidate = candidates[i];
        candidateIndexAttr = parseInt(candidate.getAttribute('tabindex'), 10);
        candidateIndex = isNaN(candidateIndexAttr) ? candidate.tabIndex : candidateIndexAttr;

        if (candidateIndex < 0 || candidate.tagName === 'INPUT' && candidate.type === 'hidden' || candidate.disabled || isUnavailable(candidate, elementDocument)) {
          continue;
        }

        if (candidateIndex === 0) {
          basicTabbables.push(candidate);
        } else {
          orderedTabbables.push({
            index: i,
            tabIndex: candidateIndex,
            node: candidate
          });
        }
      }

      var tabbableNodes = orderedTabbables.sort(function (a, b) {
        return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
      }).map(function (a) {
        return a.node;
      });

      Array.prototype.push.apply(tabbableNodes, basicTabbables);

      return tabbableNodes;
    };

    function createIsUnavailable(elementDocument) {
      // Node cache must be refreshed on every check, in case
      // the content of the element has changed
      var isOffCache = [];

      // "off" means `display: none;`, as opposed to "hidden",
      // which means `visibility: hidden;`. getComputedStyle
      // accurately reflects visiblity in context but not
      // "off" state, so we need to recursively check parents.

      function isOff(node, nodeComputedStyle) {
        if (node === elementDocument.documentElement) return false;

        // Find the cached node (Array.prototype.find not available in IE9)
        for (var i = 0, length = isOffCache.length; i < length; i++) {
          if (isOffCache[i][0] === node) return isOffCache[i][1];
        }

        nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

        var result = false;

        if (nodeComputedStyle.display === 'none') {
          result = true;
        } else if (node.parentNode) {
          result = isOff(node.parentNode);
        }

        isOffCache.push([node, result]);

        return result;
      }

      return function isUnavailable(node) {
        if (node === elementDocument.documentElement) return false;

        var computedStyle = elementDocument.defaultView.getComputedStyle(node);

        if (isOff(node, computedStyle)) return true;

        return computedStyle.visibility === 'hidden';
      };
    }

    var listeningFocusTrap = null;

    function focusTrap(element, userOptions) {
      var tabbableNodes = [];
      var firstTabbableNode = null;
      var lastTabbableNode = null;
      var nodeFocusedBeforeActivation = null;
      var active = false;
      var paused = false;
      var tabEvent = null;

      var container = typeof element === 'string' ? document.querySelector(element) : element;

      var config = userOptions || {};
      config.returnFocusOnDeactivate = userOptions && userOptions.returnFocusOnDeactivate !== undefined ? userOptions.returnFocusOnDeactivate : true;
      config.escapeDeactivates = userOptions && userOptions.escapeDeactivates !== undefined ? userOptions.escapeDeactivates : true;

      var trap = {
        activate: activate,
        deactivate: deactivate,
        pause: pause,
        unpause: unpause
      };

      return trap;

      function activate(activateOptions) {
        if (active) return;

        var defaultedActivateOptions = {
          onActivate: activateOptions && activateOptions.onActivate !== undefined ? activateOptions.onActivate : config.onActivate
        };

        active = true;
        paused = false;
        nodeFocusedBeforeActivation = document.activeElement;

        if (defaultedActivateOptions.onActivate) {
          defaultedActivateOptions.onActivate();
        }

        addListeners();
        return trap;
      }

      function deactivate(deactivateOptions) {
        if (!active) return;

        var defaultedDeactivateOptions = {
          returnFocus: deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate,
          onDeactivate: deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate
        };

        removeListeners();

        if (defaultedDeactivateOptions.onDeactivate) {
          defaultedDeactivateOptions.onDeactivate();
        }

        if (defaultedDeactivateOptions.returnFocus) {
          setTimeout(function () {
            tryFocus(nodeFocusedBeforeActivation);
          }, 0);
        }

        active = false;
        paused = false;
        return this;
      }

      function pause() {
        if (paused || !active) return;
        paused = true;
        removeListeners();
      }

      function unpause() {
        if (!paused || !active) return;
        paused = false;
        addListeners();
      }

      function addListeners() {
        if (!active) return;

        // There can be only one listening focus trap at a time
        if (listeningFocusTrap) {
          listeningFocusTrap.pause();
        }
        listeningFocusTrap = trap;

        updateTabbableNodes();
        // Ensure that the focused element doesn't capture the event that caused the focus trap activation
        setTimeout(function () {
          tryFocus(firstFocusNode());
        }, 0);
        document.addEventListener('focus', checkFocus, true);
        document.addEventListener('click', checkClick, true);
        document.addEventListener('mousedown', checkPointerDown, true);
        document.addEventListener('touchstart', checkPointerDown, true);
        document.addEventListener('keydown', checkKey, true);

        return trap;
      }

      function removeListeners() {
        if (!active || listeningFocusTrap !== trap) return;

        document.removeEventListener('focus', checkFocus, true);
        document.removeEventListener('click', checkClick, true);
        document.removeEventListener('mousedown', checkPointerDown, true);
        document.removeEventListener('touchstart', checkPointerDown, true);
        document.removeEventListener('keydown', checkKey, true);

        listeningFocusTrap = null;

        return trap;
      }

      function getNodeForOption(optionName) {
        var optionValue = config[optionName];
        var node = optionValue;
        if (!optionValue) {
          return null;
        }
        if (typeof optionValue === 'string') {
          node = document.querySelector(optionValue);
          if (!node) {
            throw new Error('`' + optionName + '` refers to no known node');
          }
        }
        if (typeof optionValue === 'function') {
          node = optionValue();
          if (!node) {
            throw new Error('`' + optionName + '` did not return a node');
          }
        }
        return node;
      }

      function firstFocusNode() {
        var node;
        if (getNodeForOption('initialFocus') !== null) {
          node = getNodeForOption('initialFocus');
        } else if (container.contains(document.activeElement)) {
          node = document.activeElement;
        } else {
          node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
        }

        if (!node) {
          throw new Error('You can\'t have a focus-trap without at least one focusable element');
        }

        return node;
      }

      // This needs to be done on mousedown and touchstart instead of click
      // so that it precedes the focus event
      function checkPointerDown(e) {
        if (config.clickOutsideDeactivates && !container.contains(e.target)) {
          deactivate({ returnFocus: false });
        }
      }

      function checkClick(e) {
        if (config.clickOutsideDeactivates) return;
        if (container.contains(e.target)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
      }

      function checkFocus(e) {
        if (container.contains(e.target)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        // Checking for a blur method here resolves a Firefox issue (#15)
        if (typeof e.target.blur === 'function') e.target.blur();

        if (tabEvent) {
          readjustFocus(tabEvent);
        }
      }

      function checkKey(e) {
        if (e.key === 'Tab' || e.keyCode === 9) {
          handleTab(e);
        }

        if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
          deactivate();
        }
      }

      function handleTab(e) {
        updateTabbableNodes();

        if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
          return tabEvent = e;
        }

        e.preventDefault();
        var currentFocusIndex = tabbableNodes.indexOf(e.target);

        if (e.shiftKey) {
          if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
            return tryFocus(lastTabbableNode);
          }
          return tryFocus(tabbableNodes[currentFocusIndex - 1]);
        }

        if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

        tryFocus(tabbableNodes[currentFocusIndex + 1]);
      }

      function updateTabbableNodes() {
        tabbableNodes = tabbable(container);
        firstTabbableNode = tabbableNodes[0];
        lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
      }

      function readjustFocus(e) {
        if (e.shiftKey) return tryFocus(lastTabbableNode);

        tryFocus(firstTabbableNode);
      }
    }

    function isEscapeEvent(e) {
      return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
    }

    function tryFocus(node) {
      if (!node || !node.focus) return;
      if (node === document.activeElement) return;

      node.focus();
      if (node.tagName.toLowerCase() === 'input') {
        node.select();
      }
    }

    var focusTrap_1 = focusTrap;

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

    function createFocusTrapInstance(surfaceEl, acceptButtonEl) {
      var focusTrapFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : focusTrap_1;

      return focusTrapFactory(surfaceEl, {
        initialFocus: acceptButtonEl,
        clickOutsideDeactivates: true
      });
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

    var mdcButtonBase = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-button', _vm._g({ ref: "root", class: _vm.classes, style: _vm.styles, attrs: { "href": _vm.href, "link": _vm.link, "disabled": _vm.disabled } }, _vm.listeners), [_vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-button-base',
      mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
      data: function data() {
        return {
          classes: {},
          styles: {}
        };
      }
    };

    var mdcButton = {
      name: 'mdc-button',
      extends: mdcButtonBase,
      props: {
        raised: Boolean,
        unelevated: Boolean,
        outlined: Boolean,
        dense: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-button': true,
            'mdc-button--raised': this.raised,
            'mdc-button--unelevated': this.unelevated,
            'mdc-button--outlined': this.outlined,
            'mdc-button--dense': this.dense
          }
        };
      },

      watch: {
        raised: function raised() {
          this.$set(this.classes, 'mdc-button--raised', this.raised);
        },
        unelevated: function unelevated() {
          this.$set(this.classes, 'mdc-button--unelevated', this.unelevated);
        },
        outlined: function outlined() {
          this.$set(this.classes, 'mdc-button--outlined', this.outlined);
        },
        dense: function dense() {
          this.$set(this.classes, 'mdc-button--dense', this.dense);
        }
      }
    };

    var mdcDialog = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { ref: "root", staticClass: "mdc-dialog", class: _vm.classes, style: _vm.styles, attrs: { "aria-labelledby": 'label' + _vm.vma_uid_, "aria-describedby": 'desc' + _vm.vma_uid_, "role": "alertdialog" } }, [_c('div', { ref: "surface", staticClass: "mdc-dialog__surface", class: _vm.surfaceClasses }, [_vm.title ? _c('header', { staticClass: "mdc-dialog__header" }, [_c('h2', { staticClass: "mdc-dialog__header__title", attrs: { "id": 'label' + _vm.vma_uid_ } }, [_vm._v(" " + _vm._s(_vm.title) + " ")])]) : _vm._e(), _vm._v(" "), _c('section', { staticClass: "mdc-dialog__body", class: _vm.bodyClasses, attrs: { "id": 'desc' + _vm.vma_uid_ } }, [_vm._t("default")], 2), _vm._v(" "), _vm.accept || _vm.cancel ? _c('footer', { staticClass: "mdc-dialog__footer" }, [_vm.cancel ? _c('mdcButton', { ref: "cancel", staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--cancel", class: { 'mdc-dialog__action': _vm.accent }, on: { "click": _vm.onCancel } }, [_vm._v(_vm._s(_vm.cancel))]) : _vm._e(), _vm._v(" "), _c('mdcButton', { ref: "accept", staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--accept", class: { 'mdc-dialog__action': _vm.accent }, attrs: { "disabled": _vm.acceptDisabled }, on: { "click": _vm.onAccept } }, [_vm._v(_vm._s(_vm.accept))])], 1) : _vm._e()]), _vm._v(" "), _c('div', { staticClass: "mdc-dialog__backdrop" })]);
      }, staticRenderFns: [],
      name: 'mdc-dialog',
      components: {
        mdcButton: mdcButton
      },
      mixins: [VMAUniqueIdMixin],
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        title: { type: String },
        accept: { type: String, default: 'Ok' },
        acceptDisabled: Boolean,
        cancel: { type: String },
        accent: Boolean,
        scrollable: Boolean,
        open: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-theme--dark': this.dark
          },
          styles: {},
          surfaceClasses: {},
          bodyClasses: {
            'mdc-dialog__body--scrollable': this.scrollable
          }
        };
      },

      watch: { open: 'onOpen_' },
      mounted: function mounted() {
        var _this = this;

        if (this.accept) {
          this.focusTrap = createFocusTrapInstance(this.$refs.surface, this.$refs.accept);
        }

        this.foundation = new MDCDialogFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          addBodyClass: function addBodyClass(className) {
            return document.body.classList.add(className);
          },
          removeBodyClass: function removeBodyClass(className) {
            return document.body.classList.remove(className);
          },
          eventTargetHasClass: function eventTargetHasClass(target, className) {
            return target.classList.contains(className);
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            return _this.$refs.root.addEventListener(evt, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            return _this.$refs.root.removeEventListener(evt, handler);
          },
          registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /*evt, handler*/{
            // VMA_HACK: handle button clicks ourselves
            // this.$refs.surface.addEventListener(evt, handler)
          },
          deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /*evt, handler*/{
            // VMA_HACK: handle button clicks ourselves
            // this.$refs.surface.removeEventListener(evt, handler)
          },
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
            return document.addEventListener('keydown', handler);
          },
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
            return document.removeEventListener('keydown', handler);
          },
          registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
            return _this.$refs.surface.addEventListener('transitionend', handler);
          },
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
            return _this.$refs.surface.removeEventListener('transitionend', handler);
          },
          notifyAccept: function notifyAccept() {
            _this.$emit('change', false);
            _this.$emit('accept');
          },
          notifyCancel: function notifyCancel() {
            _this.$emit('change', false);
            _this.$emit('cancel');
          },
          trapFocusOnSurface: function trapFocusOnSurface() {
            return _this.focusTrap && _this.focusTrap.activate();
          },
          untrapFocusOnSurface: function untrapFocusOnSurface() {
            return _this.focusTrap && _this.focusTrap.deactivate();
          },
          isDialog: function isDialog(el) {
            return _this.$refs.surface === el;
          }
        });

        this.foundation.init();
        this.open && this.foundation.open();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
      },

      methods: {
        onOpen_: function onOpen_(value) {
          if (value) {
            this.foundation.open();
          } else {
            this.foundation.close();
          }
        },
        onCancel: function onCancel() {
          var _this2 = this;

          if (this.$listeners['validateCancel']) {
            this.$emit('validateCancel', {
              cancel: function cancel() {
                var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                // if notify = false, the dialog will close
                // but the notifyAccept method will not be called
                // so we need to notify listeners the open state
                // is changing.
                if (!notify) {
                  _this2.$emit('change', false);
                }
                _this2.foundation.cancel(notify);
              }
            });
          } else {
            this.foundation.cancel(true);
          }
        },
        onAccept: function onAccept() {
          var _this3 = this;

          if (this.$listeners['validate']) {
            this.$emit('validate', {
              accept: function accept() {
                var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                // if notify = false, the dialog will close
                // but the notifyAccept method will not be called
                // so we need to notify listeners the open state
                // is changing.
                if (!notify) {
                  _this3.$emit('change', false);
                }
                _this3.foundation.accept(notify);
              }
            });
          } else {
            this.foundation.accept(true);
          }
        },
        show: function show() {
          this.foundation.open();
        },
        close: function close() {
          this.foundation.close();
        }
      }
    };

    var plugin = BasePlugin({
      mdcDialog: mdcDialog
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tYnV0dG9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWV2ZW50LW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy90YWJiYWJsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9mb2N1cy10cmFwL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL21kYy1idXR0b24tYmFzZS52dWUiLCIuLi8uLi9jb21wb25lbnRzL2J1dHRvbi9tZGMtYnV0dG9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZGlhbG9nL21kYy1kaWFsb2cudnVlIiwiLi4vLi4vY29tcG9uZW50cy9kaWFsb2cvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2RpYWxvZy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogdm0gPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfVxufVxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUJ1dHRvbiA9IHtcbiAgbmFtZTogJ2N1c3RvbS1idXR0b24nLFxuICBmdW5jdGlvbmFsOiB0cnVlLFxuICBwcm9wczoge1xuICAgIGxpbms6IE9iamVjdFxuICB9LFxuICByZW5kZXIoaCwgY29udGV4dCkge1xuICAgIGxldCBlbGVtZW50XG4gICAgbGV0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LmRhdGEpXG5cbiAgICBpZiAoY29udGV4dC5wcm9wcy5saW5rICYmIGNvbnRleHQucGFyZW50LiRyb3V0ZXIpIHtcbiAgICAgIC8vIHJvdXRlci1saW5rIGNhc2VcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnBhcmVudC4kcm9vdC4kb3B0aW9ucy5jb21wb25lbnRzWydyb3V0ZXItbGluayddXG4gICAgICBkYXRhLnByb3BzID0gT2JqZWN0LmFzc2lnbih7IHRhZzogY29udGV4dC5wcm9wcy50YWcgfSwgY29udGV4dC5wcm9wcy5saW5rKVxuICAgICAgZGF0YS5hdHRycy5yb2xlID0gJ2J1dHRvbidcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XG4gICAgICAgIGRhdGEubmF0aXZlT24gPSB7IGNsaWNrOiBkYXRhLm9uLmNsaWNrIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy5ocmVmKSB7XG4gICAgICAvLyBocmVmIGNhc2VcbiAgICAgIGVsZW1lbnQgPSAnYSdcbiAgICAgIGRhdGEuYXR0cnMucm9sZSA9ICdidXR0b24nXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGJ1dHRvbiBmYWxsYmFja1xuICAgICAgZWxlbWVudCA9ICdidXR0b24nXG4gICAgfVxuXG4gICAgcmV0dXJuIGgoZWxlbWVudCwgZGF0YSwgY29udGV4dC5jaGlsZHJlbilcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tQnV0dG9uTWl4aW4gPSB7XG4gIHByb3BzOiB7XG4gICAgaHJlZjogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIHRvOiBbU3RyaW5nLCBPYmplY3RdLFxuICAgIGV4YWN0OiBCb29sZWFuLFxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICByZXBsYWNlOiBCb29sZWFuLFxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgZXhhY3RBY3RpdmVDbGFzczogU3RyaW5nXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbGluaygpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMudG8gJiYge1xuICAgICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICAgIGV4YWN0OiB0aGlzLmV4YWN0LFxuICAgICAgICAgIGFwcGVuZDogdGhpcy5hcHBlbmQsXG4gICAgICAgICAgcmVwbGFjZTogdGhpcy5yZXBsYWNlLFxuICAgICAgICAgIGFjdGl2ZUNsYXNzOiB0aGlzLmFjdGl2ZUNsYXNzLFxuICAgICAgICAgIGV4YWN0QWN0aXZlQ2xhc3M6IHRoaXMuZXhhY3RBY3RpdmVDbGFzc1xuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQ3VzdG9tQnV0dG9uXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEV2ZW50TWl4aW4gPSB7XG4gIHByb3BzOiB7XG4gICAgZXZlbnQ6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXlcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGRpc3BhdGNoRXZlbnQoZXZ0KSB7XG4gICAgICBldnQgJiYgdGhpcy4kZW1pdChldnQudHlwZSwgZXZ0KVxuICAgICAgaWYgKHRoaXMuZXZlbnQpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZXZlbnRUYXJnZXQgfHwgdGhpcy4kcm9vdFxuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZXZlbnRBcmdzIHx8IFtdXG4gICAgICAgIHRhcmdldC4kZW1pdCh0aGlzLmV2ZW50LCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBsaXN0ZW5lcnMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIGNsaWNrOiBlID0+IHRoaXMuZGlzcGF0Y2hFdmVudChlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiY29uc3Qgc2NvcGUgPVxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXG5cbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xuICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCB7TURDRm91bmRhdGlvbiwgTURDQ29tcG9uZW50fTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWRpYWxvZycsXG4gIE9QRU46ICdtZGMtZGlhbG9nLS1vcGVuJyxcbiAgQU5JTUFUSU5HOiAnbWRjLWRpYWxvZy0tYW5pbWF0aW5nJyxcbiAgQkFDS0RST1A6ICdtZGMtZGlhbG9nX19iYWNrZHJvcCcsXG4gIFNDUk9MTF9MT0NLOiAnbWRjLWRpYWxvZy1zY3JvbGwtbG9jaycsXG4gIEFDQ0VQVF9CVE46ICdtZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbi0tYWNjZXB0JyxcbiAgQ0FOQ0VMX0JUTjogJ21kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uLS1jYW5jZWwnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIE9QRU5fRElBTE9HX1NFTEVDVE9SOiAnLm1kYy1kaWFsb2ctLW9wZW4nLFxuICBESUFMT0dfU1VSRkFDRV9TRUxFQ1RPUjogJy5tZGMtZGlhbG9nX19zdXJmYWNlJyxcbiAgQUNDRVBUX1NFTEVDVE9SOiAnLm1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uLS1hY2NlcHQnLFxuICBBQ0NFUFRfRVZFTlQ6ICdNRENEaWFsb2c6YWNjZXB0JyxcbiAgQ0FOQ0VMX0VWRU5UOiAnTURDRGlhbG9nOmNhbmNlbCcsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURDRGlhbG9nRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgYWRkQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZXZlbnRUYXJnZXRIYXNDbGFzczogKC8qIHRhcmdldDogRXZlbnRUYXJnZXQsIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIG5vdGlmeUFjY2VwdDogKCkgPT4ge30sXG4gICAgICBub3RpZnlDYW5jZWw6ICgpID0+IHt9LFxuICAgICAgdHJhcEZvY3VzT25TdXJmYWNlOiAoKSA9PiB7fSxcbiAgICAgIHVudHJhcEZvY3VzT25TdXJmYWNlOiAoKSA9PiB7fSxcbiAgICAgIGlzRGlhbG9nOiAoLyogZWw6IEVsZW1lbnQgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgICB0aGlzLmlzT3Blbl8gPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBvbmVudENsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5ldmVudFRhcmdldEhhc0NsYXNzKGV2dC50YXJnZXQsIGNzc0NsYXNzZXMuQkFDS0RST1ApKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5kaWFsb2dDbGlja0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVEaWFsb2dDbGlja18oZXZ0KTtcbiAgICB0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC5rZXkgJiYgZXZ0LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZ0LmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCk7XG4gIH07XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBFbnN1cmUgdGhhdCBkaWFsb2cgaXMgY2xlYW5lZCB1cCB3aGVuIGRlc3Ryb3llZFxuICAgIGlmICh0aGlzLmlzT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5kaWFsb2dDbGlja0hhbmRsZXJfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIodGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udW50cmFwRm9jdXNPblN1cmZhY2UoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElORyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgICAgIHRoaXMuZW5hYmxlU2Nyb2xsXygpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgICB0aGlzLmRpc2FibGVTY3JvbGxfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIodGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5kaWFsb2dDbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgdGhpcy5lbmFibGVTY3JvbGxfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmRpYWxvZ0NsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIodGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy51bnRyYXBGb2N1c09uU3VyZmFjZSgpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcih0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENEaWFsb2dGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW5fO1xuICB9XG5cbiAgYWNjZXB0KHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5QWNjZXB0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgY2FuY2VsKHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2FuY2VsKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaGFuZGxlRGlhbG9nQ2xpY2tfKGV2dCkge1xuICAgIGNvbnN0IHt0YXJnZXR9ID0gZXZ0O1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmV2ZW50VGFyZ2V0SGFzQ2xhc3ModGFyZ2V0LCBjc3NDbGFzc2VzLkFDQ0VQVF9CVE4pKSB7XG4gICAgICB0aGlzLmFjY2VwdCh0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcyh0YXJnZXQsIGNzc0NsYXNzZXMuQ0FOQ0VMX0JUTikpIHtcbiAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzRGlhbG9nKGV2dC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcih0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgICAgaWYgKHRoaXMuaXNPcGVuXykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnRyYXBGb2N1c09uU3VyZmFjZSgpO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xuXG4gIGRpc2FibGVTY3JvbGxfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQm9keUNsYXNzKGNzc0NsYXNzZXMuU0NST0xMX0xPQ0spO1xuICB9XG5cbiAgZW5hYmxlU2Nyb2xsXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUJvZHlDbGFzcyhjc3NDbGFzc2VzLlNDUk9MTF9MT0NLKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgZWxlbWVudERvY3VtZW50ID0gZWwub3duZXJEb2N1bWVudCB8fCBlbDtcbiAgdmFyIGJhc2ljVGFiYmFibGVzID0gW107XG4gIHZhciBvcmRlcmVkVGFiYmFibGVzID0gW107XG5cbiAgLy8gQSBub2RlIGlzIFwiYXZhaWxhYmxlXCIgaWZcbiAgLy8gLSBpdCdzIGNvbXB1dGVkIHN0eWxlXG4gIHZhciBpc1VuYXZhaWxhYmxlID0gY3JlYXRlSXNVbmF2YWlsYWJsZShlbGVtZW50RG9jdW1lbnQpO1xuXG4gIHZhciBjYW5kaWRhdGVTZWxlY3RvcnMgPSBbXG4gICAgJ2lucHV0JyxcbiAgICAnc2VsZWN0JyxcbiAgICAnYVtocmVmXScsXG4gICAgJ3RleHRhcmVhJyxcbiAgICAnYnV0dG9uJyxcbiAgICAnW3RhYmluZGV4XScsXG4gIF07XG5cbiAgdmFyIGNhbmRpZGF0ZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGNhbmRpZGF0ZVNlbGVjdG9ycy5qb2luKCcsJykpO1xuXG4gIGlmIChvcHRpb25zLmluY2x1ZGVDb250YWluZXIpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXG4gICAgaWYgKFxuICAgICAgY2FuZGlkYXRlU2VsZWN0b3JzLnNvbWUoZnVuY3Rpb24oY2FuZGlkYXRlU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMuY2FsbChlbCwgY2FuZGlkYXRlU2VsZWN0b3IpO1xuICAgICAgfSlcbiAgICApIHtcbiAgICAgIGNhbmRpZGF0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoY2FuZGlkYXRlcyk7XG4gICAgICBjYW5kaWRhdGVzLnVuc2hpZnQoZWwpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjYW5kaWRhdGUsIGNhbmRpZGF0ZUluZGV4QXR0ciwgY2FuZGlkYXRlSW5kZXg7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gY2FuZGlkYXRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjYW5kaWRhdGUgPSBjYW5kaWRhdGVzW2ldO1xuICAgIGNhbmRpZGF0ZUluZGV4QXR0ciA9IHBhcnNlSW50KGNhbmRpZGF0ZS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JyksIDEwKVxuICAgIGNhbmRpZGF0ZUluZGV4ID0gaXNOYU4oY2FuZGlkYXRlSW5kZXhBdHRyKSA/IGNhbmRpZGF0ZS50YWJJbmRleCA6IGNhbmRpZGF0ZUluZGV4QXR0cjtcblxuICAgIGlmIChcbiAgICAgIGNhbmRpZGF0ZUluZGV4IDwgMFxuICAgICAgfHwgKGNhbmRpZGF0ZS50YWdOYW1lID09PSAnSU5QVVQnICYmIGNhbmRpZGF0ZS50eXBlID09PSAnaGlkZGVuJylcbiAgICAgIHx8IGNhbmRpZGF0ZS5kaXNhYmxlZFxuICAgICAgfHwgaXNVbmF2YWlsYWJsZShjYW5kaWRhdGUsIGVsZW1lbnREb2N1bWVudClcbiAgICApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjYW5kaWRhdGVJbmRleCA9PT0gMCkge1xuICAgICAgYmFzaWNUYWJiYWJsZXMucHVzaChjYW5kaWRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmRlcmVkVGFiYmFibGVzLnB1c2goe1xuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgdGFiSW5kZXg6IGNhbmRpZGF0ZUluZGV4LFxuICAgICAgICBub2RlOiBjYW5kaWRhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB2YXIgdGFiYmFibGVOb2RlcyA9IG9yZGVyZWRUYWJiYWJsZXNcbiAgICAuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYS50YWJJbmRleCA9PT0gYi50YWJJbmRleCA/IGEuaW5kZXggLSBiLmluZGV4IDogYS50YWJJbmRleCAtIGIudGFiSW5kZXg7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKGEpIHtcbiAgICAgIHJldHVybiBhLm5vZGVcbiAgICB9KTtcblxuICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0YWJiYWJsZU5vZGVzLCBiYXNpY1RhYmJhYmxlcyk7XG5cbiAgcmV0dXJuIHRhYmJhYmxlTm9kZXM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlzVW5hdmFpbGFibGUoZWxlbWVudERvY3VtZW50KSB7XG4gIC8vIE5vZGUgY2FjaGUgbXVzdCBiZSByZWZyZXNoZWQgb24gZXZlcnkgY2hlY2ssIGluIGNhc2VcbiAgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGVsZW1lbnQgaGFzIGNoYW5nZWRcbiAgdmFyIGlzT2ZmQ2FjaGUgPSBbXTtcblxuICAvLyBcIm9mZlwiIG1lYW5zIGBkaXNwbGF5OiBub25lO2AsIGFzIG9wcG9zZWQgdG8gXCJoaWRkZW5cIixcbiAgLy8gd2hpY2ggbWVhbnMgYHZpc2liaWxpdHk6IGhpZGRlbjtgLiBnZXRDb21wdXRlZFN0eWxlXG4gIC8vIGFjY3VyYXRlbHkgcmVmbGVjdHMgdmlzaWJsaXR5IGluIGNvbnRleHQgYnV0IG5vdFxuICAvLyBcIm9mZlwiIHN0YXRlLCBzbyB3ZSBuZWVkIHRvIHJlY3Vyc2l2ZWx5IGNoZWNrIHBhcmVudHMuXG5cbiAgZnVuY3Rpb24gaXNPZmYobm9kZSwgbm9kZUNvbXB1dGVkU3R5bGUpIHtcbiAgICBpZiAobm9kZSA9PT0gZWxlbWVudERvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gRmluZCB0aGUgY2FjaGVkIG5vZGUgKEFycmF5LnByb3RvdHlwZS5maW5kIG5vdCBhdmFpbGFibGUgaW4gSUU5KVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBpc09mZkNhY2hlLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNPZmZDYWNoZVtpXVswXSA9PT0gbm9kZSkgcmV0dXJuIGlzT2ZmQ2FjaGVbaV1bMV07XG4gICAgfVxuXG4gICAgbm9kZUNvbXB1dGVkU3R5bGUgPSBub2RlQ29tcHV0ZWRTdHlsZSB8fCBlbGVtZW50RG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcblxuICAgIGlmIChub2RlQ29tcHV0ZWRTdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIHJlc3VsdCA9IGlzT2ZmKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgfVxuXG4gICAgaXNPZmZDYWNoZS5wdXNoKFtub2RlLCByZXN1bHRdKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gaXNVbmF2YWlsYWJsZShub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IGVsZW1lbnREb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBjb21wdXRlZFN0eWxlID0gZWxlbWVudERvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cbiAgICBpZiAoaXNPZmYobm9kZSwgY29tcHV0ZWRTdHlsZSkpIHJldHVybiB0cnVlO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkU3R5bGUudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbic7XG4gIH1cbn1cbiIsInZhciB0YWJiYWJsZSA9IHJlcXVpcmUoJ3RhYmJhYmxlJyk7XG5cbnZhciBsaXN0ZW5pbmdGb2N1c1RyYXAgPSBudWxsO1xuXG5mdW5jdGlvbiBmb2N1c1RyYXAoZWxlbWVudCwgdXNlck9wdGlvbnMpIHtcbiAgdmFyIHRhYmJhYmxlTm9kZXMgPSBbXTtcbiAgdmFyIGZpcnN0VGFiYmFibGVOb2RlID0gbnVsbDtcbiAgdmFyIGxhc3RUYWJiYWJsZU5vZGUgPSBudWxsO1xuICB2YXIgbm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uID0gbnVsbDtcbiAgdmFyIGFjdGl2ZSA9IGZhbHNlO1xuICB2YXIgcGF1c2VkID0gZmFsc2U7XG4gIHZhciB0YWJFdmVudCA9IG51bGw7XG5cbiAgdmFyIGNvbnRhaW5lciA9ICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpXG4gICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpXG4gICAgOiBlbGVtZW50O1xuXG4gIHZhciBjb25maWcgPSB1c2VyT3B0aW9ucyB8fCB7fTtcbiAgY29uZmlnLnJldHVybkZvY3VzT25EZWFjdGl2YXRlID0gKHVzZXJPcHRpb25zICYmIHVzZXJPcHRpb25zLnJldHVybkZvY3VzT25EZWFjdGl2YXRlICE9PSB1bmRlZmluZWQpXG4gICAgPyB1c2VyT3B0aW9ucy5yZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZVxuICAgIDogdHJ1ZTtcbiAgY29uZmlnLmVzY2FwZURlYWN0aXZhdGVzID0gKHVzZXJPcHRpb25zICYmIHVzZXJPcHRpb25zLmVzY2FwZURlYWN0aXZhdGVzICE9PSB1bmRlZmluZWQpXG4gICAgPyB1c2VyT3B0aW9ucy5lc2NhcGVEZWFjdGl2YXRlc1xuICAgIDogdHJ1ZTtcblxuICB2YXIgdHJhcCA9IHtcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGUsXG4gICAgZGVhY3RpdmF0ZTogZGVhY3RpdmF0ZSxcbiAgICBwYXVzZTogcGF1c2UsXG4gICAgdW5wYXVzZTogdW5wYXVzZSxcbiAgfTtcblxuICByZXR1cm4gdHJhcDtcblxuICBmdW5jdGlvbiBhY3RpdmF0ZShhY3RpdmF0ZU9wdGlvbnMpIHtcbiAgICBpZiAoYWN0aXZlKSByZXR1cm47XG5cbiAgICB2YXIgZGVmYXVsdGVkQWN0aXZhdGVPcHRpb25zID0ge1xuICAgICAgb25BY3RpdmF0ZTogKGFjdGl2YXRlT3B0aW9ucyAmJiBhY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICA/IGFjdGl2YXRlT3B0aW9ucy5vbkFjdGl2YXRlXG4gICAgICAgIDogY29uZmlnLm9uQWN0aXZhdGUsXG4gICAgfTtcblxuICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgbm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgIGlmIChkZWZhdWx0ZWRBY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZSkge1xuICAgICAgZGVmYXVsdGVkQWN0aXZhdGVPcHRpb25zLm9uQWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBhZGRMaXN0ZW5lcnMoKTtcbiAgICByZXR1cm4gdHJhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYWN0aXZhdGUoZGVhY3RpdmF0ZU9wdGlvbnMpIHtcbiAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgdmFyIGRlZmF1bHRlZERlYWN0aXZhdGVPcHRpb25zID0ge1xuICAgICAgcmV0dXJuRm9jdXM6IChkZWFjdGl2YXRlT3B0aW9ucyAmJiBkZWFjdGl2YXRlT3B0aW9ucy5yZXR1cm5Gb2N1cyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICA/IGRlYWN0aXZhdGVPcHRpb25zLnJldHVybkZvY3VzXG4gICAgICAgIDogY29uZmlnLnJldHVybkZvY3VzT25EZWFjdGl2YXRlLFxuICAgICAgb25EZWFjdGl2YXRlOiAoZGVhY3RpdmF0ZU9wdGlvbnMgJiYgZGVhY3RpdmF0ZU9wdGlvbnMub25EZWFjdGl2YXRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgID8gZGVhY3RpdmF0ZU9wdGlvbnMub25EZWFjdGl2YXRlXG4gICAgICAgIDogY29uZmlnLm9uRGVhY3RpdmF0ZSxcbiAgICB9O1xuXG4gICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG5cbiAgICBpZiAoZGVmYXVsdGVkRGVhY3RpdmF0ZU9wdGlvbnMub25EZWFjdGl2YXRlKSB7XG4gICAgICBkZWZhdWx0ZWREZWFjdGl2YXRlT3B0aW9ucy5vbkRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoZGVmYXVsdGVkRGVhY3RpdmF0ZU9wdGlvbnMucmV0dXJuRm9jdXMpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnlGb2N1cyhub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24pO1xuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgYWN0aXZlID0gZmFsc2U7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBpZiAocGF1c2VkIHx8ICFhY3RpdmUpIHJldHVybjtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5wYXVzZSgpIHtcbiAgICBpZiAoIXBhdXNlZCB8fCAhYWN0aXZlKSByZXR1cm47XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFhY3RpdmUpIHJldHVybjtcblxuICAgIC8vIFRoZXJlIGNhbiBiZSBvbmx5IG9uZSBsaXN0ZW5pbmcgZm9jdXMgdHJhcCBhdCBhIHRpbWVcbiAgICBpZiAobGlzdGVuaW5nRm9jdXNUcmFwKSB7XG4gICAgICBsaXN0ZW5pbmdGb2N1c1RyYXAucGF1c2UoKTtcbiAgICB9XG4gICAgbGlzdGVuaW5nRm9jdXNUcmFwID0gdHJhcDtcblxuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgZm9jdXNlZCBlbGVtZW50IGRvZXNuJ3QgY2FwdHVyZSB0aGUgZXZlbnQgdGhhdCBjYXVzZWQgdGhlIGZvY3VzIHRyYXAgYWN0aXZhdGlvblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5Rm9jdXMoZmlyc3RGb2N1c05vZGUoKSk7XG4gICAgfSwgMCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBjaGVja0ZvY3VzLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ2xpY2ssIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBjaGVja1BvaW50ZXJEb3duLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2hlY2tLZXksIHRydWUpO1xuXG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFhY3RpdmUgfHwgbGlzdGVuaW5nRm9jdXNUcmFwICE9PSB0cmFwKSByZXR1cm47XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIGNoZWNrRm9jdXMsIHRydWUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGljaywgdHJ1ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjaGVja0tleSwgdHJ1ZSk7XG5cbiAgICBsaXN0ZW5pbmdGb2N1c1RyYXAgPSBudWxsO1xuXG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXROb2RlRm9yT3B0aW9uKG9wdGlvbk5hbWUpIHtcbiAgICB2YXIgb3B0aW9uVmFsdWUgPSBjb25maWdbb3B0aW9uTmFtZV07XG4gICAgdmFyIG5vZGUgPSBvcHRpb25WYWx1ZTtcbiAgICBpZiAoIW9wdGlvblZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvblZhbHVlKTtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2AnICsgb3B0aW9uTmFtZSArICdgIHJlZmVycyB0byBubyBrbm93biBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9uVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5vZGUgPSBvcHRpb25WYWx1ZSgpO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYCcgKyBvcHRpb25OYW1lICsgJ2AgZGlkIG5vdCByZXR1cm4gYSBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyc3RGb2N1c05vZGUoKSB7XG4gICAgdmFyIG5vZGU7XG4gICAgaWYgKGdldE5vZGVGb3JPcHRpb24oJ2luaXRpYWxGb2N1cycpICE9PSBudWxsKSB7XG4gICAgICBub2RlID0gZ2V0Tm9kZUZvck9wdGlvbignaW5pdGlhbEZvY3VzJyk7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgIG5vZGUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gdGFiYmFibGVOb2Rlc1swXSB8fCBnZXROb2RlRm9yT3B0aW9uKCdmYWxsYmFja0ZvY3VzJyk7XG4gICAgfVxuXG4gICAgaWYgKCFub2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5cXCd0IGhhdmUgYSBmb2N1cy10cmFwIHdpdGhvdXQgYXQgbGVhc3Qgb25lIGZvY3VzYWJsZSBlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgb24gbW91c2Vkb3duIGFuZCB0b3VjaHN0YXJ0IGluc3RlYWQgb2YgY2xpY2tcbiAgLy8gc28gdGhhdCBpdCBwcmVjZWRlcyB0aGUgZm9jdXMgZXZlbnRcbiAgZnVuY3Rpb24gY2hlY2tQb2ludGVyRG93bihlKSB7XG4gICAgaWYgKGNvbmZpZy5jbGlja091dHNpZGVEZWFjdGl2YXRlcyAmJiAhY29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgZGVhY3RpdmF0ZSh7IHJldHVybkZvY3VzOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0NsaWNrKGUpIHtcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzKSByZXR1cm47XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRm9jdXMoZSkge1xuICAgIGlmIChjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSByZXR1cm47XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgLy8gQ2hlY2tpbmcgZm9yIGEgYmx1ciBtZXRob2QgaGVyZSByZXNvbHZlcyBhIEZpcmVmb3ggaXNzdWUgKCMxNSlcbiAgICBpZiAodHlwZW9mIGUudGFyZ2V0LmJsdXIgPT09ICdmdW5jdGlvbicpIGUudGFyZ2V0LmJsdXIoKTtcblxuICAgIGlmICh0YWJFdmVudCkge1xuICAgICAgcmVhZGp1c3RGb2N1cyh0YWJFdmVudCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tLZXkoZSkge1xuICAgIGlmIChlLmtleSA9PT0gJ1RhYicgfHwgZS5rZXlDb2RlID09PSA5KSB7XG4gICAgICBoYW5kbGVUYWIoZSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5lc2NhcGVEZWFjdGl2YXRlcyAhPT0gZmFsc2UgJiYgaXNFc2NhcGVFdmVudChlKSkge1xuICAgICAgZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRhYihlKSB7XG4gICAgdXBkYXRlVGFiYmFibGVOb2RlcygpO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSAmJiBOdW1iZXIoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKSA8IDApIHtcbiAgICAgIHJldHVybiB0YWJFdmVudCA9IGU7XG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBjdXJyZW50Rm9jdXNJbmRleCA9IHRhYmJhYmxlTm9kZXMuaW5kZXhPZihlLnRhcmdldCk7XG5cbiAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBmaXJzdFRhYmJhYmxlTm9kZSB8fCB0YWJiYWJsZU5vZGVzLmluZGV4T2YoZS50YXJnZXQpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ5Rm9jdXMobGFzdFRhYmJhYmxlTm9kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ5Rm9jdXModGFiYmFibGVOb2Rlc1tjdXJyZW50Rm9jdXNJbmRleCAtIDFdKTtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQgPT09IGxhc3RUYWJiYWJsZU5vZGUpIHJldHVybiB0cnlGb2N1cyhmaXJzdFRhYmJhYmxlTm9kZSk7XG5cbiAgICB0cnlGb2N1cyh0YWJiYWJsZU5vZGVzW2N1cnJlbnRGb2N1c0luZGV4ICsgMV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVGFiYmFibGVOb2RlcygpIHtcbiAgICB0YWJiYWJsZU5vZGVzID0gdGFiYmFibGUoY29udGFpbmVyKTtcbiAgICBmaXJzdFRhYmJhYmxlTm9kZSA9IHRhYmJhYmxlTm9kZXNbMF07XG4gICAgbGFzdFRhYmJhYmxlTm9kZSA9IHRhYmJhYmxlTm9kZXNbdGFiYmFibGVOb2Rlcy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRqdXN0Rm9jdXMoZSkge1xuICAgIGlmIChlLnNoaWZ0S2V5KSByZXR1cm4gdHJ5Rm9jdXMobGFzdFRhYmJhYmxlTm9kZSk7XG5cbiAgICB0cnlGb2N1cyhmaXJzdFRhYmJhYmxlTm9kZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFc2NhcGVFdmVudChlKSB7XG4gIHJldHVybiBlLmtleSA9PT0gJ0VzY2FwZScgfHwgZS5rZXkgPT09ICdFc2MnIHx8IGUua2V5Q29kZSA9PT0gMjc7XG59XG5cbmZ1bmN0aW9uIHRyeUZvY3VzKG5vZGUpIHtcbiAgaWYgKCFub2RlIHx8ICFub2RlLmZvY3VzKSByZXR1cm47XG4gIGlmIChub2RlID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAgcmV0dXJuO1xuXG4gIG5vZGUuZm9jdXMoKTtcbiAgaWYgKG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgbm9kZS5zZWxlY3QoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvY3VzVHJhcDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBjcmVhdGVGb2N1c1RyYXAgZnJvbSAnZm9jdXMtdHJhcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZShzdXJmYWNlRWwsIGFjY2VwdEJ1dHRvbkVsLCBmb2N1c1RyYXBGYWN0b3J5ID0gY3JlYXRlRm9jdXNUcmFwKSB7XG4gIHJldHVybiBmb2N1c1RyYXBGYWN0b3J5KHN1cmZhY2VFbCwge1xuICAgIGluaXRpYWxGb2N1czogYWNjZXB0QnV0dG9uRWwsXG4gICAgY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXM6IHRydWUsXG4gIH0pO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgIC8vIFVuYm91bmRlZCByaXBwbGVzIG5lZWQgbGF5b3V0IGxvZ2ljIGFwcGxpZWQgaW1tZWRpYXRlbHkgdG8gc2V0IGNvb3JkaW5hdGVzIGZvciBib3RoIHNoYWRlIGFuZCByaXBwbGVcbiAgICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge1xuICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyxcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxuICBhcHBseVBhc3NpdmVcbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IE1BVENIRVMoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIChcbiAgICAgIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gICAgKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3Iodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGN1c3RvbS1idXR0b24gXG4gICAgcmVmPVwicm9vdFwiXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIFxuICAgIDpzdHlsZT1cInN0eWxlc1wiXG4gICAgOmhyZWY9XCJocmVmXCIgXG4gICAgOmxpbms9XCJsaW5rXCIgXG4gICAgOmRpc2FibGVkPVwiZGlzYWJsZWRcIlxuICAgIHYtb249XCJsaXN0ZW5lcnNcIj5cbiAgICA8c2xvdCAvPlxuICA8L2N1c3RvbS1idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgRGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21CdXR0b25NaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgeyBSaXBwbGVNaXhpbiB9IGZyb20gJy4uL3JpcHBsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWJ1dHRvbi1iYXNlJyxcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21CdXR0b25NaXhpbiwgUmlwcGxlTWl4aW5dLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHNjcmlwdD5cbmltcG9ydCBtZGNCdXR0b25CYXNlIGZyb20gJy4vbWRjLWJ1dHRvbi1iYXNlLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWJ1dHRvbicsXG4gIGV4dGVuZHM6IG1kY0J1dHRvbkJhc2UsXG4gIHByb3BzOiB7XG4gICAgcmFpc2VkOiBCb29sZWFuLFxuICAgIHVuZWxldmF0ZWQ6IEJvb2xlYW4sXG4gICAgb3V0bGluZWQ6IEJvb2xlYW4sXG4gICAgZGVuc2U6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICdtZGMtYnV0dG9uLS1yYWlzZWQnOiB0aGlzLnJhaXNlZCxcbiAgICAgICAgJ21kYy1idXR0b24tLXVuZWxldmF0ZWQnOiB0aGlzLnVuZWxldmF0ZWQsXG4gICAgICAgICdtZGMtYnV0dG9uLS1vdXRsaW5lZCc6IHRoaXMub3V0bGluZWQsXG4gICAgICAgICdtZGMtYnV0dG9uLS1kZW5zZSc6IHRoaXMuZGVuc2VcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgcmFpc2VkKCkge1xuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1idXR0b24tLXJhaXNlZCcsIHRoaXMucmFpc2VkKVxuICAgIH0sXG4gICAgdW5lbGV2YXRlZCgpIHtcbiAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtYnV0dG9uLS11bmVsZXZhdGVkJywgdGhpcy51bmVsZXZhdGVkKVxuICAgIH0sXG4gICAgb3V0bGluZWQoKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tb3V0bGluZWQnLCB0aGlzLm91dGxpbmVkKVxuICAgIH0sXG4gICAgZGVuc2UoKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tZGVuc2UnLCB0aGlzLmRlbnNlKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxhc2lkZVxuICAgIHJlZj1cInJvb3RcIlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIlxuICAgIDpzdHlsZT1cInN0eWxlc1wiXG4gICAgOmFyaWEtbGFiZWxsZWRieT1cIidsYWJlbCcgKyB2bWFfdWlkX1wiXG4gICAgOmFyaWEtZGVzY3JpYmVkYnk9XCInZGVzYycgKyB2bWFfdWlkX1wiXG4gICAgY2xhc3M9XCJtZGMtZGlhbG9nXCJcbiAgICByb2xlPVwiYWxlcnRkaWFsb2dcIlxuICA+XG4gICAgPGRpdlxuICAgICAgcmVmPVwic3VyZmFjZVwiXG4gICAgICA6Y2xhc3M9XCJzdXJmYWNlQ2xhc3Nlc1wiXG4gICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX3N1cmZhY2VcIj5cbiAgICAgIDxoZWFkZXJcbiAgICAgICAgdi1pZj1cInRpdGxlXCJcbiAgICAgICAgY2xhc3M9XCJtZGMtZGlhbG9nX19oZWFkZXJcIj5cbiAgICAgICAgPGgyXG4gICAgICAgICAgOmlkPVwiJ2xhYmVsJyArIHZtYV91aWRfXCJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2hlYWRlcl9fdGl0bGVcIj5cbiAgICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgICA8L2gyPlxuICAgICAgPC9oZWFkZXI+XG4gICAgICA8c2VjdGlvblxuICAgICAgICA6aWQ9XCInZGVzYycgKyB2bWFfdWlkX1wiXG4gICAgICAgIDpjbGFzcz1cImJvZHlDbGFzc2VzXCJcbiAgICAgICAgY2xhc3M9XCJtZGMtZGlhbG9nX19ib2R5XCI+XG4gICAgICAgIDxzbG90IC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8Zm9vdGVyXG4gICAgICAgIHYtaWY9XCJhY2NlcHR8fGNhbmNlbFwiXG4gICAgICAgIGNsYXNzPVwibWRjLWRpYWxvZ19fZm9vdGVyXCI+XG4gICAgICAgIDxtZGNCdXR0b25cbiAgICAgICAgICB2LWlmPVwiY2FuY2VsXCJcbiAgICAgICAgICByZWY9XCJjYW5jZWxcIlxuICAgICAgICAgIDpjbGFzcz1cInsnbWRjLWRpYWxvZ19fYWN0aW9uJzphY2NlbnR9XCJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uIG1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uLS1jYW5jZWxcIlxuICAgICAgICAgIEBjbGljaz1cIm9uQ2FuY2VsXCJcbiAgICAgICAgPnt7IGNhbmNlbCB9fTwvbWRjQnV0dG9uPlxuICAgICAgICA8bWRjQnV0dG9uXG4gICAgICAgICAgcmVmPVwiYWNjZXB0XCJcbiAgICAgICAgICA6Y2xhc3M9XCJ7J21kYy1kaWFsb2dfX2FjdGlvbic6YWNjZW50fVwiXG4gICAgICAgICAgOmRpc2FibGVkPVwiYWNjZXB0RGlzYWJsZWRcIlxuICAgICAgICAgIGNsYXNzPVwibWRjLWRpYWxvZ19fZm9vdGVyX19idXR0b24gbWRjLWRpYWxvZ19fZm9vdGVyX19idXR0b24tLWFjY2VwdFwiXG4gICAgICAgICAgQGNsaWNrPVwib25BY2NlcHRcIlxuICAgICAgICA+e3sgYWNjZXB0IH19PC9tZGNCdXR0b24+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWRjLWRpYWxvZ19fYmFja2Ryb3BcIi8+XG4gIDwvYXNpZGU+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1EQ0RpYWxvZ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2RpYWxvZy9mb3VuZGF0aW9uJ1xuaW1wb3J0IHsgY3JlYXRlRm9jdXNUcmFwSW5zdGFuY2UgfSBmcm9tICdAbWF0ZXJpYWwvZGlhbG9nL3V0aWwnXG5pbXBvcnQgeyBtZGNCdXR0b24gfSBmcm9tICcuLi9idXR0b24nXG5pbXBvcnQgeyBWTUFVbmlxdWVJZE1peGluIH0gZnJvbSAnLi4vYmFzZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWRpYWxvZycsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBtZGNCdXR0b246IG1kY0J1dHRvblxuICB9LFxuICBtaXhpbnM6IFtWTUFVbmlxdWVJZE1peGluXSxcbiAgbW9kZWw6IHtcbiAgICBwcm9wOiAnb3BlbicsXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdGl0bGU6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgYWNjZXB0OiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJ09rJyB9LFxuICAgIGFjY2VwdERpc2FibGVkOiBCb29sZWFuLFxuICAgIGNhbmNlbDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICBhY2NlbnQ6IEJvb2xlYW4sXG4gICAgc2Nyb2xsYWJsZTogQm9vbGVhbixcbiAgICBvcGVuOiBCb29sZWFuXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy10aGVtZS0tZGFyayc6IHRoaXMuZGFya1xuICAgICAgfSxcbiAgICAgIHN0eWxlczoge30sXG4gICAgICBzdXJmYWNlQ2xhc3Nlczoge30sXG4gICAgICBib2R5Q2xhc3Nlczoge1xuICAgICAgICAnbWRjLWRpYWxvZ19fYm9keS0tc2Nyb2xsYWJsZSc6IHRoaXMuc2Nyb2xsYWJsZVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHsgb3BlbjogJ29uT3Blbl8nIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgaWYgKHRoaXMuYWNjZXB0KSB7XG4gICAgICB0aGlzLmZvY3VzVHJhcCA9IGNyZWF0ZUZvY3VzVHJhcEluc3RhbmNlKFxuICAgICAgICB0aGlzLiRyZWZzLnN1cmZhY2UsXG4gICAgICAgIHRoaXMuJHJlZnMuYWNjZXB0XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ0RpYWxvZ0ZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUpLFxuICAgICAgYWRkQm9keUNsYXNzOiBjbGFzc05hbWUgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgICByZW1vdmVCb2R5Q2xhc3M6IGNsYXNzTmFtZSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6ICh0YXJnZXQsIGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpLFxuICAgICAgcmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyOiAoLypldnQsIGhhbmRsZXIqLykgPT4ge1xuICAgICAgICAvLyBWTUFfSEFDSzogaGFuZGxlIGJ1dHRvbiBjbGlja3Mgb3Vyc2VsdmVzXG4gICAgICAgIC8vIHRoaXMuJHJlZnMuc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlcjogKC8qZXZ0LCBoYW5kbGVyKi8pID0+IHtcbiAgICAgICAgLy8gVk1BX0hBQ0s6IGhhbmRsZSBidXR0b24gY2xpY2tzIG91cnNlbHZlc1xuICAgICAgICAvLyB0aGlzLiRyZWZzLnN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiBoYW5kbGVyID0+XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5zdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICB0aGlzLiRyZWZzLnN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpLFxuICAgICAgbm90aWZ5QWNjZXB0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZhbHNlKVxuICAgICAgICB0aGlzLiRlbWl0KCdhY2NlcHQnKVxuICAgICAgfSxcbiAgICAgIG5vdGlmeUNhbmNlbDogKCkgPT4ge1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBmYWxzZSlcbiAgICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJylcbiAgICAgIH0sXG4gICAgICB0cmFwRm9jdXNPblN1cmZhY2U6ICgpID0+IHRoaXMuZm9jdXNUcmFwICYmIHRoaXMuZm9jdXNUcmFwLmFjdGl2YXRlKCksXG4gICAgICB1bnRyYXBGb2N1c09uU3VyZmFjZTogKCkgPT4gdGhpcy5mb2N1c1RyYXAgJiYgdGhpcy5mb2N1c1RyYXAuZGVhY3RpdmF0ZSgpLFxuICAgICAgaXNEaWFsb2c6IGVsID0+IHRoaXMuJHJlZnMuc3VyZmFjZSA9PT0gZWxcbiAgICB9KVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIHRoaXMub3BlbiAmJiB0aGlzLmZvdW5kYXRpb24ub3BlbigpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25PcGVuXyh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5vcGVuKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBvbkNhbmNlbCgpIHtcbiAgICAgIGlmICh0aGlzLiRsaXN0ZW5lcnNbJ3ZhbGlkYXRlQ2FuY2VsJ10pIHtcbiAgICAgICAgdGhpcy4kZW1pdCgndmFsaWRhdGVDYW5jZWwnLCB7XG4gICAgICAgICAgY2FuY2VsOiAobm90aWZ5ID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgbm90aWZ5ID0gZmFsc2UsIHRoZSBkaWFsb2cgd2lsbCBjbG9zZVxuICAgICAgICAgICAgLy8gYnV0IHRoZSBub3RpZnlBY2NlcHQgbWV0aG9kIHdpbGwgbm90IGJlIGNhbGxlZFxuICAgICAgICAgICAgLy8gc28gd2UgbmVlZCB0byBub3RpZnkgbGlzdGVuZXJzIHRoZSBvcGVuIHN0YXRlXG4gICAgICAgICAgICAvLyBpcyBjaGFuZ2luZy5cbiAgICAgICAgICAgIGlmICghbm90aWZ5KSB7XG4gICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLmNhbmNlbChub3RpZnkpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLmNhbmNlbCh0cnVlKVxuICAgICAgfVxuICAgIH0sXG4gICAgb25BY2NlcHQoKSB7XG4gICAgICBpZiAodGhpcy4kbGlzdGVuZXJzWyd2YWxpZGF0ZSddKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3ZhbGlkYXRlJywge1xuICAgICAgICAgIGFjY2VwdDogKG5vdGlmeSA9IHRydWUpID0+IHtcbiAgICAgICAgICAgIC8vIGlmIG5vdGlmeSA9IGZhbHNlLCB0aGUgZGlhbG9nIHdpbGwgY2xvc2VcbiAgICAgICAgICAgIC8vIGJ1dCB0aGUgbm90aWZ5QWNjZXB0IG1ldGhvZCB3aWxsIG5vdCBiZSBjYWxsZWRcbiAgICAgICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gbm90aWZ5IGxpc3RlbmVycyB0aGUgb3BlbiBzdGF0ZVxuICAgICAgICAgICAgLy8gaXMgY2hhbmdpbmcuXG4gICAgICAgICAgICBpZiAoIW5vdGlmeSkge1xuICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZm91bmRhdGlvbi5hY2NlcHQobm90aWZ5KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5hY2NlcHQodHJ1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3coKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24ub3BlbigpXG4gICAgfSxcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY0RpYWxvZyBmcm9tICcuL21kYy1kaWFsb2cudnVlJ1xuXG5leHBvcnQgeyBtZGNEaWFsb2cgfVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjRGlhbG9nXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiQ3VzdG9tQnV0dG9uIiwiZnVuY3Rpb25hbCIsInByb3BzIiwibGluayIsIk9iamVjdCIsInJlbmRlciIsImgiLCJjb250ZXh0IiwiZWxlbWVudCIsImRhdGEiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsInBhcmVudCIsIiRyb3V0ZXIiLCIkcm9vdCIsIiRvcHRpb25zIiwidGFnIiwiYXR0cnMiLCJyb2xlIiwib24iLCJjbGljayIsIm5hdGl2ZU9uIiwiaHJlZiIsImNoaWxkcmVuIiwiQ3VzdG9tQnV0dG9uTWl4aW4iLCJTdHJpbmciLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJ0byIsImV4YWN0IiwiYXBwZW5kIiwicmVwbGFjZSIsImFjdGl2ZUNsYXNzIiwiZXhhY3RBY3RpdmVDbGFzcyIsImNvbXB1dGVkIiwiRGlzcGF0Y2hFdmVudE1peGluIiwiZXZlbnQiLCJBcnJheSIsIm1ldGhvZHMiLCJkaXNwYXRjaEV2ZW50IiwiZXZ0IiwiJGVtaXQiLCJ0eXBlIiwidGFyZ2V0IiwiZXZlbnRUYXJnZXQiLCJhcmdzIiwiZXZlbnRBcmdzIiwibGlzdGVuZXJzIiwiJGxpc3RlbmVycyIsImUiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiVk1BVW5pcXVlSWRNaXhpbiIsImJlZm9yZUNyZWF0ZSIsInZtYV91aWRfIiwiX3VpZCIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDb21wb25lbnQiLCJyb290IiwiZm91bmRhdGlvbiIsInVuZGVmaW5lZCIsInJvb3RfIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0IiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJkZXN0cm95IiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJPUEVOIiwiQU5JTUFUSU5HIiwiQkFDS0RST1AiLCJTQ1JPTExfTE9DSyIsIkFDQ0VQVF9CVE4iLCJDQU5DRUxfQlROIiwic3RyaW5ncyIsIk9QRU5fRElBTE9HX1NFTEVDVE9SIiwiRElBTE9HX1NVUkZBQ0VfU0VMRUNUT1IiLCJBQ0NFUFRfU0VMRUNUT1IiLCJBQ0NFUFRfRVZFTlQiLCJDQU5DRUxfRVZFTlQiLCJNRENEaWFsb2dGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZEJvZHlDbGFzcyIsInJlbW92ZUJvZHlDbGFzcyIsImV2ZW50VGFyZ2V0SGFzQ2xhc3MiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyIiwicmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlciIsImRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlciIsIm5vdGlmeUFjY2VwdCIsIm5vdGlmeUNhbmNlbCIsInRyYXBGb2N1c09uU3VyZmFjZSIsInVudHJhcEZvY3VzT25TdXJmYWNlIiwiaXNEaWFsb2ciLCJkZWZhdWx0QWRhcHRlciIsImlzT3Blbl8iLCJjb21wb25lbnRDbGlja0hhbmRsZXJfIiwiY2FuY2VsIiwiZGlhbG9nQ2xpY2tIYW5kbGVyXyIsImhhbmRsZURpYWxvZ0NsaWNrXyIsImRvY3VtZW50S2V5ZG93bkhhbmRsZXJfIiwia2V5Q29kZSIsInRyYW5zaXRpb25FbmRIYW5kbGVyXyIsImhhbmRsZVRyYW5zaXRpb25FbmRfIiwiZW5hYmxlU2Nyb2xsXyIsImRpc2FibGVTY3JvbGxfIiwic2hvdWxkTm90aWZ5IiwiY2xvc2UiLCJhY2NlcHQiLCJtb2R1bGUiLCJlbCIsIm9wdGlvbnMiLCJlbGVtZW50RG9jdW1lbnQiLCJvd25lckRvY3VtZW50IiwiYmFzaWNUYWJiYWJsZXMiLCJvcmRlcmVkVGFiYmFibGVzIiwiaXNVbmF2YWlsYWJsZSIsImNyZWF0ZUlzVW5hdmFpbGFibGUiLCJjYW5kaWRhdGVTZWxlY3RvcnMiLCJjYW5kaWRhdGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImpvaW4iLCJpbmNsdWRlQ29udGFpbmVyIiwibWF0Y2hlcyIsIkVsZW1lbnQiLCJwcm90b3R5cGUiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsInNvbWUiLCJjYW5kaWRhdGVTZWxlY3RvciIsImNhbGwiLCJzbGljZSIsImFwcGx5IiwidW5zaGlmdCIsImNhbmRpZGF0ZSIsImNhbmRpZGF0ZUluZGV4QXR0ciIsImNhbmRpZGF0ZUluZGV4IiwiaSIsImwiLCJsZW5ndGgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImlzTmFOIiwidGFiSW5kZXgiLCJ0YWdOYW1lIiwicHVzaCIsInRhYmJhYmxlTm9kZXMiLCJzb3J0IiwiYSIsImIiLCJpbmRleCIsIm1hcCIsIm5vZGUiLCJpc09mZkNhY2hlIiwiaXNPZmYiLCJub2RlQ29tcHV0ZWRTdHlsZSIsImRvY3VtZW50RWxlbWVudCIsImRlZmF1bHRWaWV3IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInJlc3VsdCIsImRpc3BsYXkiLCJwYXJlbnROb2RlIiwiY29tcHV0ZWRTdHlsZSIsInZpc2liaWxpdHkiLCJsaXN0ZW5pbmdGb2N1c1RyYXAiLCJmb2N1c1RyYXAiLCJ1c2VyT3B0aW9ucyIsImZpcnN0VGFiYmFibGVOb2RlIiwibGFzdFRhYmJhYmxlTm9kZSIsIm5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbiIsImFjdGl2ZSIsInBhdXNlZCIsInRhYkV2ZW50IiwiY29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImNvbmZpZyIsInJldHVybkZvY3VzT25EZWFjdGl2YXRlIiwiZXNjYXBlRGVhY3RpdmF0ZXMiLCJ0cmFwIiwiYWN0aXZhdGUiLCJkZWFjdGl2YXRlIiwicGF1c2UiLCJ1bnBhdXNlIiwiYWN0aXZhdGVPcHRpb25zIiwiZGVmYXVsdGVkQWN0aXZhdGVPcHRpb25zIiwib25BY3RpdmF0ZSIsImFjdGl2ZUVsZW1lbnQiLCJkZWFjdGl2YXRlT3B0aW9ucyIsImRlZmF1bHRlZERlYWN0aXZhdGVPcHRpb25zIiwicmV0dXJuRm9jdXMiLCJvbkRlYWN0aXZhdGUiLCJhZGRMaXN0ZW5lcnMiLCJmaXJzdEZvY3VzTm9kZSIsImNoZWNrRm9jdXMiLCJjaGVja0NsaWNrIiwiY2hlY2tQb2ludGVyRG93biIsImNoZWNrS2V5IiwicmVtb3ZlTGlzdGVuZXJzIiwiZ2V0Tm9kZUZvck9wdGlvbiIsIm9wdGlvbk5hbWUiLCJvcHRpb25WYWx1ZSIsImNvbnRhaW5zIiwiY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImJsdXIiLCJpc0VzY2FwZUV2ZW50IiwiaGFuZGxlVGFiIiwiaGFzQXR0cmlidXRlIiwiTnVtYmVyIiwiY3VycmVudEZvY3VzSW5kZXgiLCJpbmRleE9mIiwic2hpZnRLZXkiLCJ0cnlGb2N1cyIsInVwZGF0ZVRhYmJhYmxlTm9kZXMiLCJ0YWJiYWJsZSIsInJlYWRqdXN0Rm9jdXMiLCJmb2N1cyIsInRvTG93ZXJDYXNlIiwic2VsZWN0IiwiY3JlYXRlRm9jdXNUcmFwSW5zdGFuY2UiLCJzdXJmYWNlRWwiLCJhY2NlcHRCdXR0b25FbCIsImZvY3VzVHJhcEZhY3RvcnkiLCJjcmVhdGVGb2N1c1RyYXAiLCJpbml0aWFsRm9jdXMiLCJNRENSaXBwbGVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidmFyTmFtZSIsInZhbHVlIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsImlzU3VwcG9ydGVkIiwicGFzc2l2ZSIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiZm9yRWFjaCIsImtleXMiLCJrIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsInNldFRpbWVvdXQiLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJtYXhEaW0iLCJtYXgiLCJnZXRCb3VuZGVkUmFkaXVzIiwiaHlwb3RlbnVzZSIsInNxcnQiLCJwb3ciLCJ1cGRhdGVMYXlvdXRDc3NWYXJzXyIsInJvdW5kIiwidW5ib3VuZGVkIiwiUmlwcGxlQmFzZSIsInJlZiIsIk1BVENIRVMiLCJfbWF0Y2hlcyIsIkhUTUxFbGVtZW50IiwiJGVsIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwic3R5bGVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIlJpcHBsZU1peGluIiwibW91bnRlZCIsInJpcHBsZSIsImJlZm9yZURlc3Ryb3kiLCJtaXhpbnMiLCJleHRlbmRzIiwibWRjQnV0dG9uQmFzZSIsInJhaXNlZCIsInVuZWxldmF0ZWQiLCJvdXRsaW5lZCIsImRlbnNlIiwid2F0Y2giLCJtZGNCdXR0b24iLCJtb2RlbCIsInByb3AiLCJ0aXRsZSIsImRlZmF1bHQiLCJhY2NlcHREaXNhYmxlZCIsImFjY2VudCIsInNjcm9sbGFibGUiLCJvcGVuIiwiZGFyayIsInN1cmZhY2VDbGFzc2VzIiwiYm9keUNsYXNzZXMiLCIkcmVmcyIsInN1cmZhY2UiLCJjbGFzc0xpc3QiLCJhZGQiLCJvbk9wZW5fIiwib25DYW5jZWwiLCJub3RpZnkiLCJvbkFjY2VwdCIsInNob3ciLCJtZGNEaWFsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtJQUMvQjtJQUNBLE1BQUlDLE9BQU8sSUFBWDtJQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtJQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDeEM7SUFDQUgsV0FBT0csT0FBT0QsR0FBZDtJQUNEO0lBQ0QsTUFBSUYsSUFBSixFQUFVO0lBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtJQUNEO0lBQ0Y7O0lD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
