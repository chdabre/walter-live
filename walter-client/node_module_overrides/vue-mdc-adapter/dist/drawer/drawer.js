/**
* @module vue-mdc-adapterdrawer 0.17.0
* @exports VueMDCDrawer
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCDrawer = factory());
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

    var get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
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

    var mdcPermanentDrawer = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "mdc-permanent-drawer mdc-drawer--permanent mdc-typography" }, [_c('nav', { staticClass: "mdc-drawer__content" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
      }, staticRenderFns: [],
      name: 'mdc-permanent-drawer',
      props: {
        'toolbar-spacer': Boolean
      }
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

    var FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

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

    var MDCSlidableDrawerFoundation = function (_MDCFoundation) {
      inherits(MDCSlidableDrawerFoundation, _MDCFoundation);
      createClass(MDCSlidableDrawerFoundation, null, [{
        key: 'defaultAdapter',
        get: function get$$1() {
          return {
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            hasClass: function hasClass() /* className: string */{},
            hasNecessaryDom: function hasNecessaryDom() {
              return (/* boolean */false
              );
            },
            registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
            registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
            registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
            deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
            registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
            deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
            setTranslateX: function setTranslateX() /* value: number | null */{},
            getFocusableElements: function getFocusableElements() /* NodeList */{},
            saveElementTabState: function saveElementTabState() /* el: Element */{},
            restoreElementTabState: function restoreElementTabState() /* el: Element */{},
            makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
            notifyOpen: function notifyOpen() {},
            notifyClose: function notifyClose() {},
            isRtl: function isRtl() {
              return (/* boolean */false
              );
            },
            getDrawerWidth: function getDrawerWidth() {
              return (/* number */0
              );
            }
          };
        }
      }]);

      function MDCSlidableDrawerFoundation(adapter, rootCssClass, animatingCssClass, openCssClass) {
        classCallCheck(this, MDCSlidableDrawerFoundation);

        var _this = possibleConstructorReturn(this, (MDCSlidableDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCSlidableDrawerFoundation)).call(this, _extends(MDCSlidableDrawerFoundation.defaultAdapter, adapter)));

        _this.rootCssClass_ = rootCssClass;
        _this.animatingCssClass_ = animatingCssClass;
        _this.openCssClass_ = openCssClass;

        _this.transitionEndHandler_ = function (evt) {
          return _this.handleTransitionEnd_(evt);
        };

        _this.inert_ = false;

        _this.componentTouchStartHandler_ = function (evt) {
          return _this.handleTouchStart_(evt);
        };
        _this.componentTouchMoveHandler_ = function (evt) {
          return _this.handleTouchMove_(evt);
        };
        _this.componentTouchEndHandler_ = function (evt) {
          return _this.handleTouchEnd_(evt);
        };
        _this.documentKeydownHandler_ = function (evt) {
          if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
            _this.close();
          }
        };
        return _this;
      }

      createClass(MDCSlidableDrawerFoundation, [{
        key: 'init',
        value: function init() {
          var ROOT = this.rootCssClass_;
          var OPEN = this.openCssClass_;

          if (!this.adapter_.hasClass(ROOT)) {
            throw new Error(ROOT + ' class required in root element.');
          }

          if (!this.adapter_.hasNecessaryDom()) {
            throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
          }

          if (this.adapter_.hasClass(OPEN)) {
            this.isOpen_ = true;
          } else {
            this.detabinate_();
            this.isOpen_ = false;
          }

          this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
          this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
          this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
          this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
          this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
          // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
          this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
        }
      }, {
        key: 'open',
        value: function open() {
          this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
          this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.addClass(this.animatingCssClass_);
          this.adapter_.addClass(this.openCssClass_);
          this.retabinate_();
          // Debounce multiple calls
          if (!this.isOpen_) {
            this.adapter_.notifyOpen();
          }
          this.isOpen_ = true;
        }
      }, {
        key: 'close',
        value: function close() {
          this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
          this.adapter_.addClass(this.animatingCssClass_);
          this.adapter_.removeClass(this.openCssClass_);
          this.detabinate_();
          // Debounce multiple calls
          if (this.isOpen_) {
            this.adapter_.notifyClose();
          }
          this.isOpen_ = false;
        }
      }, {
        key: 'isOpen',
        value: function isOpen() {
          return this.isOpen_;
        }

        /**
         *  Render all children of the drawer inert when it's closed.
         */

      }, {
        key: 'detabinate_',
        value: function detabinate_() {
          if (this.inert_) {
            return;
          }

          var elements = this.adapter_.getFocusableElements();
          if (elements) {
            for (var i = 0; i < elements.length; i++) {
              this.adapter_.saveElementTabState(elements[i]);
              this.adapter_.makeElementUntabbable(elements[i]);
            }
          }

          this.inert_ = true;
        }

        /**
         *  Make all children of the drawer tabbable again when it's open.
         */

      }, {
        key: 'retabinate_',
        value: function retabinate_() {
          if (!this.inert_) {
            return;
          }

          var elements = this.adapter_.getFocusableElements();
          if (elements) {
            for (var i = 0; i < elements.length; i++) {
              this.adapter_.restoreElementTabState(elements[i]);
            }
          }

          this.inert_ = false;
        }
      }, {
        key: 'handleTouchStart_',
        value: function handleTouchStart_(evt) {
          if (!this.adapter_.hasClass(this.openCssClass_)) {
            return;
          }
          if (evt.pointerType && evt.pointerType !== 'touch') {
            return;
          }

          this.direction_ = this.adapter_.isRtl() ? -1 : 1;
          this.drawerWidth_ = this.adapter_.getDrawerWidth();
          this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
          this.currentX_ = this.startX_;

          this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
        }
      }, {
        key: 'handleTouchMove_',
        value: function handleTouchMove_(evt) {
          if (evt.pointerType && evt.pointerType !== 'touch') {
            return;
          }

          this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
        }
      }, {
        key: 'handleTouchEnd_',
        value: function handleTouchEnd_(evt) {
          if (evt.pointerType && evt.pointerType !== 'touch') {
            return;
          }

          this.prepareForTouchEnd_();

          // Did the user close the drawer by more than 50%?
          if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
            this.close();
          } else {
            // Triggering an open here means we'll get a nice animation back to the fully open state.
            this.open();
          }
        }
      }, {
        key: 'prepareForTouchEnd_',
        value: function prepareForTouchEnd_() {
          cancelAnimationFrame(this.updateRaf_);
          this.adapter_.setTranslateX(null);
        }
      }, {
        key: 'updateDrawer_',
        value: function updateDrawer_() {
          this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
          this.adapter_.setTranslateX(this.newPosition_);
        }
      }, {
        key: 'isRootTransitioningEventTarget_',
        value: function isRootTransitioningEventTarget_() {
          // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
          // if the event target is the root event target currently transitioning.
          return false;
        }
      }, {
        key: 'handleTransitionEnd_',
        value: function handleTransitionEnd_(evt) {
          if (this.isRootTransitioningEventTarget_(evt.target)) {
            this.adapter_.removeClass(this.animatingCssClass_);
            this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
          }
        }
      }, {
        key: 'newPosition_',
        get: function get$$1() {
          var newPos = null;

          if (this.direction_ === 1) {
            newPos = Math.min(0, this.currentX_ - this.startX_);
          } else {
            newPos = Math.max(0, this.currentX_ - this.startX_);
          }

          return newPos;
        }
      }]);
      return MDCSlidableDrawerFoundation;
    }(MDCFoundation);

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
      ROOT: 'mdc-drawer--persistent',
      OPEN: 'mdc-drawer--open',
      ANIMATING: 'mdc-drawer--animating'
    };

    var strings = {
      DRAWER_SELECTOR: '.mdc-drawer--persistent .mdc-drawer__drawer',
      FOCUSABLE_ELEMENTS: FOCUSABLE_ELEMENTS,
      OPEN_EVENT: 'MDCPersistentDrawer:open',
      CLOSE_EVENT: 'MDCPersistentDrawer:close'
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

    var MDCPersistentDrawerFoundation = function (_MDCSlidableDrawerFou) {
      inherits(MDCPersistentDrawerFoundation, _MDCSlidableDrawerFou);
      createClass(MDCPersistentDrawerFoundation, null, [{
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
          return _extends(MDCSlidableDrawerFoundation.defaultAdapter, {
            isDrawer: function isDrawer() {
              return false;
            }
          });
        }
      }]);

      function MDCPersistentDrawerFoundation(adapter) {
        classCallCheck(this, MDCPersistentDrawerFoundation);
        return possibleConstructorReturn(this, (MDCPersistentDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCPersistentDrawerFoundation)).call(this, _extends(MDCPersistentDrawerFoundation.defaultAdapter, adapter), MDCPersistentDrawerFoundation.cssClasses.ROOT, MDCPersistentDrawerFoundation.cssClasses.ANIMATING, MDCPersistentDrawerFoundation.cssClasses.OPEN));
      }

      createClass(MDCPersistentDrawerFoundation, [{
        key: 'isRootTransitioningEventTarget_',
        value: function isRootTransitioningEventTarget_(el) {
          return this.adapter_.isDrawer(el);
        }
      }]);
      return MDCPersistentDrawerFoundation;
    }(MDCSlidableDrawerFoundation);

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

    var TAB_DATA = 'data-mdc-tabindex';
    var TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

    var storedTransformPropertyName_ = void 0;
    var supportsPassive_$1 = void 0;

    // Remap touch events to pointer events, if the browser doesn't support touch events.
    function remapEvent(eventName) {
      var globalObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

      if (!('ontouchstart' in globalObj.document)) {
        switch (eventName) {
          case 'touchstart':
            return 'pointerdown';
          case 'touchmove':
            return 'pointermove';
          case 'touchend':
            return 'pointerup';
          default:
            return eventName;
        }
      }

      return eventName;
    }

    // Choose the correct transform property to use on the current browser.
    function getTransformPropertyName() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (storedTransformPropertyName_ === undefined || forceRefresh) {
        var el = globalObj.document.createElement('div');
        var transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
        storedTransformPropertyName_ = transformPropertyName;
      }

      return storedTransformPropertyName_;
    }

    // Determine whether the current browser supports CSS properties.
    function supportsCssCustomProperties() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

      if ('CSS' in globalObj) {
        return globalObj.CSS.supports('(--color: red)');
      }
      return false;
    }

    // Determine whether the current browser supports passive event listeners, and if so, use them.
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

    // Save the tab state for an element.
    function saveElementTabState(el) {
      if (el.hasAttribute('tabindex')) {
        el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
      }
      el.setAttribute(TAB_DATA_HANDLED, true);
    }

    // Restore the tab state for an element, if it was saved.
    function restoreElementTabState(el) {
      // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
      if (el.hasAttribute(TAB_DATA_HANDLED)) {
        if (el.hasAttribute(TAB_DATA)) {
          el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
          el.removeAttribute(TAB_DATA);
        } else {
          el.removeAttribute('tabindex');
        }
        el.removeAttribute(TAB_DATA_HANDLED);
      }
    }

    var mdcPersistentDrawer = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { staticClass: "mdc-persistent-drawer mdc-drawer--persistent mdc-typography", class: _vm.classes }, [_c('nav', { ref: "drawer", staticClass: "mdc-drawer__drawer" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
      }, staticRenderFns: [],
      name: 'mdc-persistent-drawer',
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        'toolbar-spacer': Boolean,
        open: Boolean
      },
      data: function data() {
        return {
          classes: {}
        };
      },

      watch: {
        open: '_refresh'
      },
      mounted: function mounted() {
        var _this = this;

        var FOCUSABLE_ELEMENTS = MDCPersistentDrawerFoundation.strings.FOCUSABLE_ELEMENTS;


        this.foundation = new MDCPersistentDrawerFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.classes, className);
          },
          hasClass: function hasClass(className) {
            return _this.$el.classList.contains(className);
          },
          hasNecessaryDom: function hasNecessaryDom() {
            return !!_this.$refs.drawer;
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            _this.$el.addEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            _this.$el.removeEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
            _this.$refs.drawer.addEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
            _this.$refs.drawer.removeEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
            _this.$refs.drawer.addEventListener('transitionend', handler);
          },
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
            _this.$refs.drawer.removeEventListener('transitionend', handler);
          },
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
            document.addEventListener('keydown', handler);
          },
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
            document.removeEventListener('keydown', handler);
          },
          getDrawerWidth: function getDrawerWidth() {
            return _this.$refs.drawer.offsetWidth;
          },
          setTranslateX: function setTranslateX(value) {
            _this.$refs.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
          },
          getFocusableElements: function getFocusableElements() {
            return _this.$refs.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
          },
          saveElementTabState: function saveElementTabState$$1(el) {
            saveElementTabState(el);
          },
          restoreElementTabState: function restoreElementTabState$$1(el) {
            restoreElementTabState(el);
          },
          makeElementUntabbable: function makeElementUntabbable(el) {
            el.setAttribute('tabindex', -1);
          },
          notifyOpen: function notifyOpen() {
            _this.$emit('change', true);
            _this.$emit('open');
          },
          notifyClose: function notifyClose() {
            _this.$emit('change', false);
            _this.$emit('close');
          },
          isRtl: function isRtl() {
            /* global getComputedStyle */
            return getComputedStyle(_this.$el).getPropertyValue('direction') === 'rtl';
          },
          isDrawer: function isDrawer(el) {
            return el === _this.$refs.drawer;
          }
        });
        this.foundation && this.foundation.init();
        this._refresh();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation && this.foundation.destroy();
        this.foundation = null;
      },

      methods: {
        _refresh: function _refresh() {
          if (this.open) {
            this.foundation && this.foundation.open();
          } else {
            this.foundation && this.foundation.close();
          }
        }
      }
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

    var cssClasses$1 = {
      ROOT: 'mdc-drawer--temporary',
      OPEN: 'mdc-drawer--open',
      ANIMATING: 'mdc-drawer--animating',
      SCROLL_LOCK: 'mdc-drawer-scroll-lock'
    };

    var strings$1 = {
      DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
      OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
      FOCUSABLE_ELEMENTS: FOCUSABLE_ELEMENTS,
      OPEN_EVENT: 'MDCTemporaryDrawer:open',
      CLOSE_EVENT: 'MDCTemporaryDrawer:close'
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

    var MDCTemporaryDrawerFoundation = function (_MDCSlidableDrawerFou) {
      inherits(MDCTemporaryDrawerFoundation, _MDCSlidableDrawerFou);
      createClass(MDCTemporaryDrawerFoundation, null, [{
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
        key: 'defaultAdapter',
        get: function get$$1() {
          return _extends(MDCSlidableDrawerFoundation.defaultAdapter, {
            addBodyClass: function addBodyClass() /* className: string */{},
            removeBodyClass: function removeBodyClass() /* className: string */{},
            isDrawer: function isDrawer() {
              return false;
            },
            updateCssVariable: function updateCssVariable() /* value: string */{},
            eventTargetHasClass: function eventTargetHasClass() {
              return (/* target: EventTarget, className: string */ /* boolean */false
              );
            }
          });
        }
      }]);

      function MDCTemporaryDrawerFoundation(adapter) {
        classCallCheck(this, MDCTemporaryDrawerFoundation);

        var _this = possibleConstructorReturn(this, (MDCTemporaryDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation)).call(this, _extends(MDCTemporaryDrawerFoundation.defaultAdapter, adapter), MDCTemporaryDrawerFoundation.cssClasses.ROOT, MDCTemporaryDrawerFoundation.cssClasses.ANIMATING, MDCTemporaryDrawerFoundation.cssClasses.OPEN));

        _this.componentClickHandler_ = function (evt) {
          if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses$1.ROOT)) {
            _this.close(true);
          }
        };
        return _this;
      }

      createClass(MDCTemporaryDrawerFoundation, [{
        key: 'init',
        value: function init() {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'init', this).call(this);

          // Make browser aware of custom property being used in this element.
          // Workaround for certain types of hard-to-reproduce heisenbugs.
          this.adapter_.updateCssVariable(0);
          this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'destroy', this).call(this);

          this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
          this.enableScroll_();
        }
      }, {
        key: 'open',
        value: function open() {
          this.disableScroll_();
          // Make sure custom property values are cleared before starting.
          this.adapter_.updateCssVariable('');

          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'open', this).call(this);
        }
      }, {
        key: 'close',
        value: function close() {
          // Make sure custom property values are cleared before making any changes.
          this.adapter_.updateCssVariable('');

          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'close', this).call(this);
        }
      }, {
        key: 'prepareForTouchEnd_',
        value: function prepareForTouchEnd_() {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'prepareForTouchEnd_', this).call(this);

          this.adapter_.updateCssVariable('');
        }
      }, {
        key: 'updateDrawer_',
        value: function updateDrawer_() {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'updateDrawer_', this).call(this);

          var newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
          this.adapter_.updateCssVariable(newOpacity);
        }
      }, {
        key: 'isRootTransitioningEventTarget_',
        value: function isRootTransitioningEventTarget_(el) {
          return this.adapter_.isDrawer(el);
        }
      }, {
        key: 'handleTransitionEnd_',
        value: function handleTransitionEnd_(evt) {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'handleTransitionEnd_', this).call(this, evt);
          if (!this.isOpen_) {
            this.enableScroll_();
          }
        }
      }, {
        key: 'disableScroll_',
        value: function disableScroll_() {
          this.adapter_.addBodyClass(cssClasses$1.SCROLL_LOCK);
        }
      }, {
        key: 'enableScroll_',
        value: function enableScroll_() {
          this.adapter_.removeBodyClass(cssClasses$1.SCROLL_LOCK);
        }
      }]);
      return MDCTemporaryDrawerFoundation;
    }(MDCSlidableDrawerFoundation);

    var mdcTemporaryDrawer = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { staticClass: "mdc-temporary-drawer mdc-drawer--temporary mdc-typography", class: _vm.classes }, [_c('nav', { ref: "drawer", staticClass: "mdc-drawer__drawer" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
      }, staticRenderFns: [],
      name: 'mdc-temporary-drawer',
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        open: Boolean,
        'toolbar-spacer': Boolean
      },
      data: function data() {
        return {
          classes: {}
        };
      },

      watch: {
        open: '_refresh'
      },
      mounted: function mounted() {
        var _this = this;

        var _MDCTemporaryDrawerFo = MDCTemporaryDrawerFoundation.strings,
            FOCUSABLE_ELEMENTS = _MDCTemporaryDrawerFo.FOCUSABLE_ELEMENTS,
            OPACITY_VAR_NAME = _MDCTemporaryDrawerFo.OPACITY_VAR_NAME;


        this.foundation = new MDCTemporaryDrawerFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.classes, className);
          },
          hasClass: function hasClass(className) {
            return _this.$el.classList.contains(className);
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
          hasNecessaryDom: function hasNecessaryDom() {
            return !!_this.$refs.drawer;
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            _this.$el.addEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            _this.$el.removeEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
            _this.$refs.drawer.addEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
            _this.$refs.drawer.removeEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
            _this.$refs.drawer.addEventListener('transitionend', handler);
          },
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
            _this.$refs.drawer.removeEventListener('transitionend', handler);
          },
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
            document.addEventListener('keydown', handler);
          },
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
            document.removeEventListener('keydown', handler);
          },
          getDrawerWidth: function getDrawerWidth() {
            return _this.$refs.drawer.offsetWidth;
          },
          setTranslateX: function setTranslateX(value) {
            _this.$refs.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
          },
          updateCssVariable: function updateCssVariable(value) {
            if (supportsCssCustomProperties()) {
              _this.$el.style.setProperty(OPACITY_VAR_NAME, value);
            }
          },
          getFocusableElements: function getFocusableElements() {
            return _this.$refs.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
          },
          saveElementTabState: function saveElementTabState$$1(el) {
            saveElementTabState(el);
          },
          restoreElementTabState: function restoreElementTabState$$1(el) {
            restoreElementTabState(el);
          },
          makeElementUntabbable: function makeElementUntabbable(el) {
            el.setAttribute('tabindex', -1);
          },
          notifyOpen: function notifyOpen() {
            _this.$emit('change', true);
            _this.$emit('open');
          },
          notifyClose: function notifyClose() {
            _this.$emit('change', false);
            _this.$emit('close');
          },
          isRtl: function isRtl() {
            /* global getComputedStyle */
            return getComputedStyle(_this.$el).getPropertyValue('direction') === 'rtl';
          },
          isDrawer: function isDrawer(el) {
            return el === _this.$refs.drawer;
          }
        });
        this.foundation && this.foundation.init();
        this._refresh();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation && this.foundation.destroy();
        this.foundation = null;
      },

      methods: {
        _refresh: function _refresh() {
          if (this.open) {
            this.foundation && this.foundation.open();
          } else {
            this.foundation && this.foundation.close();
          }
        }
      }
    };

    var media = new (function () {
      function _class() {
        classCallCheck(this, _class);
      }

      createClass(_class, [{
        key: 'small',
        get: function get$$1() {
          return this._small || (this._small = window.matchMedia('(max-width: 839px)'));
        }
      }, {
        key: 'large',
        get: function get$$1() {
          return this._large || (this._large = window.matchMedia('(min-width: 1200px)'));
        }
      }]);
      return _class;
    }())();

    var mdcDrawer = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.type, { ref: "drawer", tag: "component", staticClass: "mdc-drawer", attrs: { "toolbar-spacer": _vm.toolbarSpacer }, on: { "change": _vm.onChange, "open": function open($event) {
              _vm.$emit('open');
            }, "close": function close($event) {
              _vm.$emit('close');
            } }, model: { value: _vm.open_, callback: function callback($$v) {
              _vm.open_ = $$v;
            }, expression: "open_" } }, [_vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-drawer',
      components: {
        'mdc-permanent-drawer': mdcPermanentDrawer,
        'mdc-persistent-drawer': mdcPersistentDrawer,
        'mdc-temporary-drawer': mdcTemporaryDrawer
      },
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        open: Boolean,
        permanent: Boolean,
        persistent: Boolean,
        temporary: Boolean,
        drawerType: {
          type: String,
          validator: function validator(val) {
            return val in ['temporary', 'persistent', 'permanent'];
          }
        },
        toolbarSpacer: Boolean,
        toggleOn: String,
        toggleOnSource: { type: Object, required: false },
        openOn: String,
        openOnSource: { type: Object, required: false },
        closeOn: String,
        closeOnSource: { type: Object, required: false }
      },
      provide: function provide() {
        return { mdcDrawer: this };
      },
      data: function data() {
        return {
          small: false,
          large: false,
          open_: false
        };
      },

      computed: {
        type: function type() {
          if (this.permanent) {
            return 'mdc-permanent-drawer';
          } else if (this.persistent) {
            return 'mdc-persistent-drawer';
          } else if (this.temporary) {
            return 'mdc-temporary-drawer';
          } else {
            switch (this.drawerType) {
              case 'permanent':
                return 'mdc-permanent-drawer';
              case 'persistent':
                return 'mdc-persistent-drawer';
              case 'temporary':
                return 'mdc-temporary-drawer';
              default:
                return this.small ? 'mdc-temporary-drawer' : 'mdc-persistent-drawer';
            }
          }
        },
        isPermanent: function isPermanent() {
          return this.permanent || this.type === 'mdc-permanent-drawer';
        },
        isPersistent: function isPersistent() {
          return this.persistent || this.type === 'mdc-persistent-drawer';
        },
        isTemporary: function isTemporary() {
          return this.temporary || this.type === 'mdc-temporary-drawer';
        },
        isResponsive: function isResponsive() {
          return !(this.permanent || this.persistent || this.temporary || this.drawerType);
        }
      },
      watch: {
        open: 'onOpen_'
      },
      created: function created() {
        if (typeof window !== 'undefined' && window.matchMedia) {
          this.small = media.small.matches;
          this.large = media.large.matches;
        }
      },
      mounted: function mounted() {
        var _this = this;

        if (this.toggleOn) {
          this.toggleOnEventSource = this.toggleOnSource || this.$root;
          this.toggleOnEventSource.$on(this.toggleOn, this.toggle);
        }
        if (this.openOn) {
          this.openOnEventSource = this.openOnSource || this.$root;
          this.openOnEventSource.$on(this.openOn, this.show);
        }
        if (this.closeOn) {
          this.closeOnEventSource = this.closeOnSource || this.$root;
          this.closeOnEventSource.$on(this.closeOn, this.close);
        }
        media.small.addListener(this.refreshMedia);
        media.large.addListener(this.refreshMedia);
        this.$nextTick(function () {
          return _this.refreshMedia();
        });
      },
      beforeDestroy: function beforeDestroy() {
        media.small.removeListener(this.refreshMedia);
        media.large.removeListener(this.refreshMedia);

        if (this.toggleOnEventSource) {
          this.toggleOnEventSource.$off(this.toggleOn, this.toggle);
        }
        if (this.openOnEventSource) {
          this.openOnEventSource.$off(this.openOn, this.show);
        }
        if (this.closeOnEventSource) {
          this.closeOnEventSource.$off(this.closeOn, this.close);
        }
      },

      methods: {
        onOpen_: function onOpen_(value) {
          this.isPermanent || (this.open_ = value);
        },
        onChange: function onChange(event) {
          this.$emit('change', event);
          this.$root.$emit('vma:layout');
        },
        show: function show() {
          this.open_ = true;
        },
        close: function close() {
          this.isPermanent || (this.open_ = false);
        },
        toggle: function toggle() {
          this.isPermanent || (this.isOpen() ? this.close() : this.show());
        },
        isOpen: function isOpen() {
          return this.isPermanent || this.open_;
        },
        refreshMedia: function refreshMedia() {
          this.small = media.small.matches;
          this.large = media.large.matches;
          if (this.isResponsive) {
            if (this.large) {
              this.show();
            } else {
              this.close();
            }
          }
        }
      }
    };

    var mdcDrawerLayout = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-drawer-layout" }, [_vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-drawer-layout'
    };

    var mdcDrawerHeader = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.show ? _c('header', { staticClass: "mdc-drawer-header mdc-drawer__header" }, [_c('div', { staticClass: "mdc-drawer__header-content" }, [_vm._t("default")], 2)]) : _vm._e();
      }, staticRenderFns: [],
      name: 'mdc-drawer-header',
      props: {
        permanent: Boolean,
        persistent: Boolean,
        temporary: Boolean
      },
      inject: ['mdcDrawer'],
      computed: {
        show: function show() {
          if (this.temporary || this.persistent || this.permanent) {
            return this.temporary && this.mdcDrawer.isTemporary || this.persistent && this.mdcDrawer.isPersistent || this.permanent && this.mdcDrawer.isPermanent;
          } else {
            return true;
          }
        }
      }
    };

    var mdcDrawerList = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "mdc-drawer-list mdc-list", class: _vm.classes }, [_vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-drawer-list',
      props: {
        dense: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-list--dense': this.dense
          }
        };
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

    var cssClasses$2 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings$2 = {
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
    var supportsPassive_$2 = void 0;

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
    function applyPassive$2() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (supportsPassive_$2 === undefined || forceRefresh) {
        var isSupported = false;
        try {
          globalObj.document.addEventListener('test', null, { get passive() {
              isSupported = true;
            } });
        } catch (e) {}

        supportsPassive_$2 = isSupported;
      }

      return supportsPassive_$2 ? { passive: true } : false;
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
          return cssClasses$2;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$2;
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
            vm.$el.addEventListener(evt, handler, applyPassive$2());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            vm.$el.removeEventListener(evt, handler, applyPassive$2());
          },
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.addEventListener(evtType, handler, applyPassive$2());
          },
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.removeEventListener(evtType, handler, applyPassive$2());
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

    var mdcDrawerItem = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-link', _vm._g({ staticClass: "mdc-drawer-item mdc-list-item", class: [_vm.classes, _vm.itemClasses], style: _vm.styles, attrs: { "link": _vm.link } }, _vm.mylisteners), [_vm.hasStartDetail ? _c('span', { staticClass: "mdc-list-item__graphic" }, [_vm._t("start-detail", [_c('i', { staticClass: "material-icons", attrs: { "aria-hidden": "true" } }, [_vm._v(_vm._s(_vm.startIcon))])])], 2) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-drawer-item',
      inject: ['mdcDrawer'],
      mixins: [DispatchEventMixin, CustomLinkMixin],
      props: {
        startIcon: String,
        temporaryClose: {
          type: Boolean,
          default: true
        },
        activated: Boolean,
        exactActiveClass: {
          type: String,
          default: 'mdc-list-item--activated'
        }
      },
      data: function data() {
        return {
          classes: {},
          styles: {}
        };
      },

      computed: {
        mylisteners: function mylisteners() {
          var _this = this;

          return _extends({}, this.$listeners, {
            click: function click(e) {
              _this.mdcDrawer.isTemporary && _this.temporaryClose && _this.mdcDrawer.close();
              _this.dispatchEvent(e);
            }
          });
        },
        itemClasses: function itemClasses() {
          return {
            'mdc-list-item--activated': this.activated
          };
        },
        hasStartDetail: function hasStartDetail() {
          return this.startIcon || this.$slots['start-detail'];
        }
      },
      mounted: function mounted() {
        this.ripple = new RippleBase(this);
        this.ripple.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.ripple && this.ripple.destroy();
        this.ripple = null;
      }
    };

    var mdcDrawerDivider = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('hr', { staticClass: "mdc-list-divider" });
      }, staticRenderFns: [],
      name: 'mdc-drawer-divider'
    };

    var plugin = BasePlugin({
      mdcDrawer: mdcDrawer,
      mdcDrawerLayout: mdcDrawerLayout,
      mdcDrawerHeader: mdcDrawerHeader,
      mdcDrawerList: mdcDrawerList,
      mdcDrawerItem: mdcDrawerItem,
      mdcDrawerDivider: mdcDrawerDivider
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1saW5rLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1ldmVudC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS91bmlxdWVpZC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1wZXJtYW5lbnQtZHJhd2VyLnZ1ZSIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3NsaWRhYmxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3NsaWRhYmxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9zbGlkYWJsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3BlcnNpc3RlbnQvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvcGVyc2lzdGVudC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvdXRpbC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1wZXJzaXN0ZW50LWRyYXdlci52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci90ZW1wb3JhcnkvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvdGVtcG9yYXJ5L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtdGVtcG9yYXJ5LWRyYXdlci52dWUiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtZHJhd2VyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItbGF5b3V0LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItaGVhZGVyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItbGlzdC52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtZHJhd2VyLWl0ZW0udnVlIiwiLi4vLi4vY29tcG9uZW50cy9kcmF3ZXIvbWRjLWRyYXdlci1kaXZpZGVyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9kcmF3ZXIvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6IHZtID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBDdXN0b21MaW5rID0ge1xuICBuYW1lOiAnY3VzdG9tLWxpbmsnLFxuICBmdW5jdGlvbmFsOiB0cnVlLFxuICBwcm9wczoge1xuICAgIHRhZzogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdhJyB9LFxuICAgIGxpbms6IE9iamVjdFxuICB9LFxuICByZW5kZXIoaCwgY29udGV4dCkge1xuICAgIGxldCBlbGVtZW50XG4gICAgbGV0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LmRhdGEpXG5cbiAgICBpZiAoY29udGV4dC5wcm9wcy5saW5rICYmIGNvbnRleHQucGFyZW50LiRyb3V0ZXIpIHtcbiAgICAgIC8vIHJvdXRlci1saW5rIGNhc2VcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnBhcmVudC4kcm9vdC4kb3B0aW9ucy5jb21wb25lbnRzWydyb3V0ZXItbGluayddXG4gICAgICBkYXRhLnByb3BzID0gT2JqZWN0LmFzc2lnbih7IHRhZzogY29udGV4dC5wcm9wcy50YWcgfSwgY29udGV4dC5wcm9wcy5saW5rKVxuICAgICAgaWYgKGRhdGEub24uY2xpY2spIHtcbiAgICAgICAgZGF0YS5uYXRpdmVPbiA9IHsgY2xpY2s6IGRhdGEub24uY2xpY2sgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbGVtZW50IGZhbGxiYWNrXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wcm9wcy50YWdcbiAgICB9XG5cbiAgICByZXR1cm4gaChlbGVtZW50LCBkYXRhLCBjb250ZXh0LmNoaWxkcmVuKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21MaW5rTWl4aW4gPSB7XG4gIHByb3BzOiB7XG4gICAgdG86IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgZXhhY3Q6IEJvb2xlYW4sXG4gICAgYXBwZW5kOiBCb29sZWFuLFxuICAgIHJlcGxhY2U6IEJvb2xlYW4sXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBsaW5rKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy50byAmJiB7XG4gICAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgICAgZXhhY3Q6IHRoaXMuZXhhY3QsXG4gICAgICAgICAgYXBwZW5kOiB0aGlzLmFwcGVuZCxcbiAgICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2UsXG4gICAgICAgICAgYWN0aXZlQ2xhc3M6IHRoaXMuYWN0aXZlQ2xhc3MsXG4gICAgICAgICAgZXhhY3RBY3RpdmVDbGFzczogdGhpcy5leGFjdEFjdGl2ZUNsYXNzXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21MaW5rXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEV2ZW50TWl4aW4gPSB7XG4gIHByb3BzOiB7XG4gICAgZXZlbnQ6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXlcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGRpc3BhdGNoRXZlbnQoZXZ0KSB7XG4gICAgICBldnQgJiYgdGhpcy4kZW1pdChldnQudHlwZSwgZXZ0KVxuICAgICAgaWYgKHRoaXMuZXZlbnQpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZXZlbnRUYXJnZXQgfHwgdGhpcy4kcm9vdFxuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZXZlbnRBcmdzIHx8IFtdXG4gICAgICAgIHRhcmdldC4kZW1pdCh0aGlzLmV2ZW50LCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBsaXN0ZW5lcnMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIGNsaWNrOiBlID0+IHRoaXMuZGlzcGF0Y2hFdmVudChlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiY29uc3Qgc2NvcGUgPVxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXG5cbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xuICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPG5hdiBjbGFzcz1cIm1kYy1wZXJtYW5lbnQtZHJhd2VyIG1kYy1kcmF3ZXItLXBlcm1hbmVudCBtZGMtdHlwb2dyYXBoeVwiPlxuICAgIDxuYXYgY2xhc3M9XCJtZGMtZHJhd2VyX19jb250ZW50XCI+XG4gICAgICA8ZGl2IFxuICAgICAgICB2LWlmPVwidG9vbGJhclNwYWNlclwiIFxuICAgICAgICBjbGFzcz1cIm1kYy1kcmF3ZXJfX3Rvb2xiYXItc3BhY2VyXCIvPlxuICAgICAgPHNsb3QgLz5cbiAgICA8L25hdj5cbiAgPC9uYXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXBlcm1hbmVudC1kcmF3ZXInLFxuICBwcm9wczoge1xuICAgICd0b29sYmFyLXNwYWNlcic6IEJvb2xlYW5cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTID1cbiAgJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCAnICtcbiAgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4XSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IHtNRENGb3VuZGF0aW9uLCBNRENDb21wb25lbnR9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaGFzTmVjZXNzYXJ5RG9tOiAoKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBzZXRUcmFuc2xhdGVYOiAoLyogdmFsdWU6IG51bWJlciB8IG51bGwgKi8pID0+IHt9LFxuICAgICAgZ2V0Rm9jdXNhYmxlRWxlbWVudHM6ICgpID0+IC8qIE5vZGVMaXN0ICovIHt9LFxuICAgICAgc2F2ZUVsZW1lbnRUYWJTdGF0ZTogKC8qIGVsOiBFbGVtZW50ICovKSA9PiB7fSxcbiAgICAgIHJlc3RvcmVFbGVtZW50VGFiU3RhdGU6ICgvKiBlbDogRWxlbWVudCAqLykgPT4ge30sXG4gICAgICBtYWtlRWxlbWVudFVudGFiYmFibGU6ICgvKiBlbDogRWxlbWVudCAqLykgPT4ge30sXG4gICAgICBub3RpZnlPcGVuOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUNsb3NlOiAoKSA9PiB7fSxcbiAgICAgIGlzUnRsOiAoKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgZ2V0RHJhd2VyV2lkdGg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyLCByb290Q3NzQ2xhc3MsIGFuaW1hdGluZ0Nzc0NsYXNzLCBvcGVuQ3NzQ2xhc3MpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgdGhpcy5yb290Q3NzQ2xhc3NfID0gcm9vdENzc0NsYXNzO1xuICAgIHRoaXMuYW5pbWF0aW5nQ3NzQ2xhc3NfID0gYW5pbWF0aW5nQ3NzQ2xhc3M7XG4gICAgdGhpcy5vcGVuQ3NzQ2xhc3NfID0gb3BlbkNzc0NsYXNzO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCk7XG5cbiAgICB0aGlzLmluZXJ0XyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb21wb25lbnRUb3VjaFN0YXJ0SGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRvdWNoU3RhcnRfKGV2dCk7XG4gICAgdGhpcy5jb21wb25lbnRUb3VjaE1vdmVIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlVG91Y2hNb3ZlXyhldnQpO1xuICAgIHRoaXMuY29tcG9uZW50VG91Y2hFbmRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlVG91Y2hFbmRfKGV2dCk7XG4gICAgdGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHtcbiAgICAgIGlmIChldnQua2V5ICYmIGV2dC5rZXkgPT09ICdFc2NhcGUnIHx8IGV2dC5rZXlDb2RlID09PSAyNykge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgUk9PVCA9IHRoaXMucm9vdENzc0NsYXNzXztcbiAgICBjb25zdCBPUEVOID0gdGhpcy5vcGVuQ3NzQ2xhc3NfO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKFJPT1QpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Uk9PVH0gY2xhc3MgcmVxdWlyZWQgaW4gcm9vdCBlbGVtZW50LmApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNOZWNlc3NhcnlEb20oKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZXF1aXJlZCBET00gbm9kZXMgbWlzc2luZyBpbiAke1JPT1R9IGNvbXBvbmVudC5gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhPUEVOKSkge1xuICAgICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXRhYmluYXRlXygpO1xuICAgICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2hzdGFydCcsIHRoaXMuY29tcG9uZW50VG91Y2hTdGFydEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCd0b3VjaG1vdmUnLCB0aGlzLmNvbXBvbmVudFRvdWNoTW92ZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCd0b3VjaGVuZCcsIHRoaXMuY29tcG9uZW50VG91Y2hFbmRIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2hzdGFydCcsIHRoaXMuY29tcG9uZW50VG91Y2hTdGFydEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ3RvdWNobW92ZScsIHRoaXMuY29tcG9uZW50VG91Y2hNb3ZlSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2hlbmQnLCB0aGlzLmNvbXBvbmVudFRvdWNoRW5kSGFuZGxlcl8pO1xuICAgIC8vIERlcmVnaXN0ZXIgdGhlIGRvY3VtZW50IGtleWRvd24gaGFuZGxlciBqdXN0IGluIGNhc2UgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQgd2hpbGUgdGhlIG1lbnUgaXMgb3Blbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyKHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8pO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIodGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyKHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3ModGhpcy5hbmltYXRpbmdDc3NDbGFzc18pO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3ModGhpcy5vcGVuQ3NzQ2xhc3NfKTtcbiAgICB0aGlzLnJldGFiaW5hdGVfKCk7XG4gICAgLy8gRGVib3VuY2UgbXVsdGlwbGUgY2FsbHNcbiAgICBpZiAoIXRoaXMuaXNPcGVuXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlPcGVuKCk7XG4gICAgfVxuICAgIHRoaXMuaXNPcGVuXyA9IHRydWU7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyKHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcih0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyh0aGlzLmFuaW1hdGluZ0Nzc0NsYXNzXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyh0aGlzLm9wZW5Dc3NDbGFzc18pO1xuICAgIHRoaXMuZGV0YWJpbmF0ZV8oKTtcbiAgICAvLyBEZWJvdW5jZSBtdWx0aXBsZSBjYWxsc1xuICAgIGlmICh0aGlzLmlzT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2xvc2UoKTtcbiAgICB9XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuXztcbiAgfVxuXG4gIC8qKlxuICAgKiAgUmVuZGVyIGFsbCBjaGlsZHJlbiBvZiB0aGUgZHJhd2VyIGluZXJ0IHdoZW4gaXQncyBjbG9zZWQuXG4gICAqL1xuICBkZXRhYmluYXRlXygpIHtcbiAgICBpZiAodGhpcy5pbmVydF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNhYmxlRWxlbWVudHMoKTtcbiAgICBpZiAoZWxlbWVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zYXZlRWxlbWVudFRhYlN0YXRlKGVsZW1lbnRzW2ldKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5tYWtlRWxlbWVudFVudGFiYmFibGUoZWxlbWVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaW5lcnRfID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgTWFrZSBhbGwgY2hpbGRyZW4gb2YgdGhlIGRyYXdlciB0YWJiYWJsZSBhZ2FpbiB3aGVuIGl0J3Mgb3Blbi5cbiAgICovXG4gIHJldGFiaW5hdGVfKCkge1xuICAgIGlmICghdGhpcy5pbmVydF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNhYmxlRWxlbWVudHMoKTtcbiAgICBpZiAoZWxlbWVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZXN0b3JlRWxlbWVudFRhYlN0YXRlKGVsZW1lbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmluZXJ0XyA9IGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hTdGFydF8oZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKHRoaXMub3BlbkNzc0NsYXNzXykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2dC5wb2ludGVyVHlwZSAmJiBldnQucG9pbnRlclR5cGUgIT09ICd0b3VjaCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRpcmVjdGlvbl8gPSB0aGlzLmFkYXB0ZXJfLmlzUnRsKCkgPyAtMSA6IDE7XG4gICAgdGhpcy5kcmF3ZXJXaWR0aF8gPSB0aGlzLmFkYXB0ZXJfLmdldERyYXdlcldpZHRoKCk7XG4gICAgdGhpcy5zdGFydFhfID0gZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgICB0aGlzLmN1cnJlbnRYXyA9IHRoaXMuc3RhcnRYXztcblxuICAgIHRoaXMudXBkYXRlUmFmXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZURyYXdlcl8uYmluZCh0aGlzKSk7XG4gIH1cblxuICBoYW5kbGVUb3VjaE1vdmVfKGV2dCkge1xuICAgIGlmIChldnQucG9pbnRlclR5cGUgJiYgZXZ0LnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50WF8gPSBldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdLnBhZ2VYIDogZXZ0LnBhZ2VYO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hFbmRfKGV2dCkge1xuICAgIGlmIChldnQucG9pbnRlclR5cGUgJiYgZXZ0LnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcmVwYXJlRm9yVG91Y2hFbmRfKCk7XG5cbiAgICAvLyBEaWQgdGhlIHVzZXIgY2xvc2UgdGhlIGRyYXdlciBieSBtb3JlIHRoYW4gNTAlP1xuICAgIGlmIChNYXRoLmFicyh0aGlzLm5ld1Bvc2l0aW9uXyAvIHRoaXMuZHJhd2VyV2lkdGhfKSA+PSAwLjUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJpZ2dlcmluZyBhbiBvcGVuIGhlcmUgbWVhbnMgd2UnbGwgZ2V0IGEgbmljZSBhbmltYXRpb24gYmFjayB0byB0aGUgZnVsbHkgb3BlbiBzdGF0ZS5cbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIHByZXBhcmVGb3JUb3VjaEVuZF8oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVSYWZfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFRyYW5zbGF0ZVgobnVsbCk7XG4gIH1cblxuICB1cGRhdGVEcmF3ZXJfKCkge1xuICAgIHRoaXMudXBkYXRlUmFmXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZURyYXdlcl8uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRUcmFuc2xhdGVYKHRoaXMubmV3UG9zaXRpb25fKTtcbiAgfVxuXG4gIGdldCBuZXdQb3NpdGlvbl8oKSB7XG4gICAgbGV0IG5ld1BvcyA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5kaXJlY3Rpb25fID09PSAxKSB7XG4gICAgICBuZXdQb3MgPSBNYXRoLm1pbigwLCB0aGlzLmN1cnJlbnRYXyAtIHRoaXMuc3RhcnRYXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1BvcyA9IE1hdGgubWF4KDAsIHRoaXMuY3VycmVudFhfIC0gdGhpcy5zdGFydFhfKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3UG9zO1xuICB9XG5cbiAgaXNSb290VHJhbnNpdGlvbmluZ0V2ZW50VGFyZ2V0XygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gdHJ1ZSBvciBmYWxzZVxuICAgIC8vIGlmIHRoZSBldmVudCB0YXJnZXQgaXMgdGhlIHJvb3QgZXZlbnQgdGFyZ2V0IGN1cnJlbnRseSB0cmFuc2l0aW9uaW5nLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCkge1xuICAgIGlmICh0aGlzLmlzUm9vdFRyYW5zaXRpb25pbmdFdmVudFRhcmdldF8oZXZ0LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3ModGhpcy5hbmltYXRpbmdDc3NDbGFzc18pO1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIodGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCB7Rk9DVVNBQkxFX0VMRU1FTlRTfSBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQge01EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbn0gZnJvbSAnLi9mb3VuZGF0aW9uJztcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Rk9DVVNBQkxFX0VMRU1FTlRTfSBmcm9tICcuLi9zbGlkYWJsZS9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWRyYXdlci0tcGVyc2lzdGVudCcsXG4gIE9QRU46ICdtZGMtZHJhd2VyLS1vcGVuJyxcbiAgQU5JTUFUSU5HOiAnbWRjLWRyYXdlci0tYW5pbWF0aW5nJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBEUkFXRVJfU0VMRUNUT1I6ICcubWRjLWRyYXdlci0tcGVyc2lzdGVudCAubWRjLWRyYXdlcl9fZHJhd2VyJyxcbiAgRk9DVVNBQkxFX0VMRU1FTlRTLFxuICBPUEVOX0VWRU5UOiAnTURDUGVyc2lzdGVudERyYXdlcjpvcGVuJyxcbiAgQ0xPU0VfRVZFTlQ6ICdNRENQZXJzaXN0ZW50RHJhd2VyOmNsb3NlJyxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge01EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbn0gZnJvbSAnLi4vc2xpZGFibGUvaW5kZXgnO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ1BlcnNpc3RlbnREcmF3ZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIHtcbiAgICAgIGlzRHJhd2VyOiAoKSA9PiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpLFxuICAgICAgTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5ST09ULFxuICAgICAgTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcsXG4gICAgICBNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICB9XG5cbiAgaXNSb290VHJhbnNpdGlvbmluZ0V2ZW50VGFyZ2V0XyhlbCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmlzRHJhd2VyKGVsKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgVEFCX0RBVEEgPSAnZGF0YS1tZGMtdGFiaW5kZXgnO1xuY29uc3QgVEFCX0RBVEFfSEFORExFRCA9ICdkYXRhLW1kYy10YWJpbmRleC1oYW5kbGVkJztcblxubGV0IHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV87XG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLy8gUmVtYXAgdG91Y2ggZXZlbnRzIHRvIHBvaW50ZXIgZXZlbnRzLCBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgdG91Y2ggZXZlbnRzLlxuZXhwb3J0IGZ1bmN0aW9uIHJlbWFwRXZlbnQoZXZlbnROYW1lLCBnbG9iYWxPYmogPSB3aW5kb3cpIHtcbiAgaWYgKCEoJ29udG91Y2hzdGFydCcgaW4gZ2xvYmFsT2JqLmRvY3VtZW50KSkge1xuICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XG4gICAgY2FzZSAndG91Y2hzdGFydCc6XG4gICAgICByZXR1cm4gJ3BvaW50ZXJkb3duJztcbiAgICBjYXNlICd0b3VjaG1vdmUnOlxuICAgICAgcmV0dXJuICdwb2ludGVybW92ZSc7XG4gICAgY2FzZSAndG91Y2hlbmQnOlxuICAgICAgcmV0dXJuICdwb2ludGVydXAnO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZXZlbnROYW1lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBldmVudE5hbWU7XG59XG5cbi8vIENob29zZSB0aGUgY29ycmVjdCB0cmFuc2Zvcm0gcHJvcGVydHkgdG8gdXNlIG9uIHRoZSBjdXJyZW50IGJyb3dzZXIuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBjb25zdCBlbCA9IGdsb2JhbE9iai5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWUgPSAoJ3RyYW5zZm9ybScgaW4gZWwuc3R5bGUgPyAndHJhbnNmb3JtJyA6ICctd2Via2l0LXRyYW5zZm9ybScpO1xuICAgIHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPSB0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWU7XG4gIH1cblxuICByZXR1cm4gc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXztcbn1cblxuLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBDU1MgcHJvcGVydGllcy5cbmV4cG9ydCBmdW5jdGlvbiBzdXBwb3J0c0Nzc0N1c3RvbVByb3BlcnRpZXMoZ2xvYmFsT2JqID0gd2luZG93KSB7XG4gIGlmICgnQ1NTJyBpbiBnbG9iYWxPYmopIHtcbiAgICByZXR1cm4gZ2xvYmFsT2JqLkNTUy5zdXBwb3J0cygnKC0tY29sb3I6IHJlZCknKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8vIFNhdmUgdGhlIHRhYiBzdGF0ZSBmb3IgYW4gZWxlbWVudC5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlRWxlbWVudFRhYlN0YXRlKGVsKSB7XG4gIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoVEFCX0RBVEEsIGVsLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSk7XG4gIH1cbiAgZWwuc2V0QXR0cmlidXRlKFRBQl9EQVRBX0hBTkRMRUQsIHRydWUpO1xufVxuXG4vLyBSZXN0b3JlIHRoZSB0YWIgc3RhdGUgZm9yIGFuIGVsZW1lbnQsIGlmIGl0IHdhcyBzYXZlZC5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlRWxlbWVudFRhYlN0YXRlKGVsKSB7XG4gIC8vIE9ubHkgbW9kaWZ5IGVsZW1lbnRzIHdlJ3ZlIGFscmVhZHkgaGFuZGxlZCwgaW4gY2FzZSBhbnl0aGluZyB3YXMgZHluYW1pY2FsbHkgYWRkZWQgc2luY2Ugd2Ugc2F2ZWQgc3RhdGUuXG4gIGlmIChlbC5oYXNBdHRyaWJ1dGUoVEFCX0RBVEFfSEFORExFRCkpIHtcbiAgICBpZiAoZWwuaGFzQXR0cmlidXRlKFRBQl9EQVRBKSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIGVsLmdldEF0dHJpYnV0ZShUQUJfREFUQSkpO1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFRBQl9EQVRBKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgIH1cbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoVEFCX0RBVEFfSEFORExFRCk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGFzaWRlXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiXG4gICAgY2xhc3M9XCJtZGMtcGVyc2lzdGVudC1kcmF3ZXIgbWRjLWRyYXdlci0tcGVyc2lzdGVudCBtZGMtdHlwb2dyYXBoeVwiPlxuICAgIDxuYXZcbiAgICAgIHJlZj1cImRyYXdlclwiXG4gICAgICBjbGFzcz1cIm1kYy1kcmF3ZXJfX2RyYXdlclwiPlxuICAgICAgPGRpdlxuICAgICAgICB2LWlmPVwidG9vbGJhclNwYWNlclwiXG4gICAgICAgIGNsYXNzPVwibWRjLWRyYXdlcl9fdG9vbGJhci1zcGFjZXJcIi8+XG4gICAgICA8c2xvdCAvPlxuICAgIDwvbmF2PlxuICA8L2FzaWRlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZHJhd2VyL3BlcnNpc3RlbnQvZm91bmRhdGlvbidcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnQG1hdGVyaWFsL2RyYXdlci91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtcGVyc2lzdGVudC1kcmF3ZXInLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICdvcGVuJyxcbiAgICBldmVudDogJ2NoYW5nZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICAndG9vbGJhci1zcGFjZXInOiBCb29sZWFuLFxuICAgIG9wZW46IEJvb2xlYW5cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge31cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3BlbjogJ19yZWZyZXNoJ1xuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnN0IHsgRk9DVVNBQkxFX0VMRU1FTlRTIH0gPSBNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbi5zdHJpbmdzXG5cbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBoYXNOZWNlc3NhcnlEb206ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy4kcmVmcy5kcmF3ZXJcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHV0aWwucmVtYXBFdmVudChldnQpLFxuICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgdXRpbC5hcHBseVBhc3NpdmUoKVxuICAgICAgICApXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHV0aWwucmVtYXBFdmVudChldnQpLFxuICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgdXRpbC5hcHBseVBhc3NpdmUoKVxuICAgICAgICApXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB1dGlsLnJlbWFwRXZlbnQoZXZ0KSxcbiAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgIHV0aWwuYXBwbHlQYXNzaXZlKClcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB1dGlsLnJlbWFwRXZlbnQoZXZ0KSxcbiAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgIHV0aWwuYXBwbHlQYXNzaXZlKClcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGdldERyYXdlcldpZHRoOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmRyYXdlci5vZmZzZXRXaWR0aFxuICAgICAgfSxcbiAgICAgIHNldFRyYW5zbGF0ZVg6IHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgdXRpbC5nZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUoKSxcbiAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBgdHJhbnNsYXRlWCgke3ZhbHVlfXB4KWBcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIGdldEZvY3VzYWJsZUVsZW1lbnRzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmRyYXdlci5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UUylcbiAgICAgIH0sXG4gICAgICBzYXZlRWxlbWVudFRhYlN0YXRlOiBlbCA9PiB7XG4gICAgICAgIHV0aWwuc2F2ZUVsZW1lbnRUYWJTdGF0ZShlbClcbiAgICAgIH0sXG4gICAgICByZXN0b3JlRWxlbWVudFRhYlN0YXRlOiBlbCA9PiB7XG4gICAgICAgIHV0aWwucmVzdG9yZUVsZW1lbnRUYWJTdGF0ZShlbClcbiAgICAgIH0sXG4gICAgICBtYWtlRWxlbWVudFVudGFiYmFibGU6IGVsID0+IHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKVxuICAgICAgfSxcbiAgICAgIG5vdGlmeU9wZW46ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdHJ1ZSlcbiAgICAgICAgdGhpcy4kZW1pdCgnb3BlbicpXG4gICAgICB9LFxuICAgICAgbm90aWZ5Q2xvc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZmFsc2UpXG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJylcbiAgICAgIH0sXG4gICAgICBpc1J0bDogKCkgPT4ge1xuICAgICAgICAvKiBnbG9iYWwgZ2V0Q29tcHV0ZWRTdHlsZSAqL1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGdldENvbXB1dGVkU3R5bGUodGhpcy4kZWwpLmdldFByb3BlcnR5VmFsdWUoJ2RpcmVjdGlvbicpID09PSAncnRsJ1xuICAgICAgICApXG4gICAgICB9LFxuICAgICAgaXNEcmF3ZXI6IGVsID0+IHtcbiAgICAgICAgcmV0dXJuIGVsID09PSB0aGlzLiRyZWZzLmRyYXdlclxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5pbml0KClcbiAgICB0aGlzLl9yZWZyZXNoKClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG51bGxcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIF9yZWZyZXNoKCkge1xuICAgICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLm9wZW4oKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Rk9DVVNBQkxFX0VMRU1FTlRTfSBmcm9tICcuLi9zbGlkYWJsZS9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWRyYXdlci0tdGVtcG9yYXJ5JyxcbiAgT1BFTjogJ21kYy1kcmF3ZXItLW9wZW4nLFxuICBBTklNQVRJTkc6ICdtZGMtZHJhd2VyLS1hbmltYXRpbmcnLFxuICBTQ1JPTExfTE9DSzogJ21kYy1kcmF3ZXItc2Nyb2xsLWxvY2snLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIERSQVdFUl9TRUxFQ1RPUjogJy5tZGMtZHJhd2VyLS10ZW1wb3JhcnkgLm1kYy1kcmF3ZXJfX2RyYXdlcicsXG4gIE9QQUNJVFlfVkFSX05BTUU6ICctLW1kYy10ZW1wb3JhcnktZHJhd2VyLW9wYWNpdHknLFxuICBGT0NVU0FCTEVfRUxFTUVOVFMsXG4gIE9QRU5fRVZFTlQ6ICdNRENUZW1wb3JhcnlEcmF3ZXI6b3BlbicsXG4gIENMT1NFX0VWRU5UOiAnTURDVGVtcG9yYXJ5RHJhd2VyOmNsb3NlJyxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge01EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbn0gZnJvbSAnLi4vc2xpZGFibGUvaW5kZXgnO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24gZXh0ZW5kcyBNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE1EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwge1xuICAgICAgYWRkQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaXNEcmF3ZXI6ICgpID0+IGZhbHNlLFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6ICgvKiB0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oTURDVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlciksXG4gICAgICBNRENUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuUk9PVCxcbiAgICAgIE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcsXG4gICAgICBNRENUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuT1BFTik7XG5cbiAgICB0aGlzLmNvbXBvbmVudENsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5ldmVudFRhcmdldEhhc0NsYXNzKGV2dC50YXJnZXQsIGNzc0NsYXNzZXMuUk9PVCkpIHtcbiAgICAgICAgdGhpcy5jbG9zZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzdXBlci5pbml0KCk7XG5cbiAgICAvLyBNYWtlIGJyb3dzZXIgYXdhcmUgb2YgY3VzdG9tIHByb3BlcnR5IGJlaW5nIHVzZWQgaW4gdGhpcyBlbGVtZW50LlxuICAgIC8vIFdvcmthcm91bmQgZm9yIGNlcnRhaW4gdHlwZXMgb2YgaGFyZC10by1yZXByb2R1Y2UgaGVpc2VuYnVncy5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKDApO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5lbmFibGVTY3JvbGxfKCk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuZGlzYWJsZVNjcm9sbF8oKTtcbiAgICAvLyBNYWtlIHN1cmUgY3VzdG9tIHByb3BlcnR5IHZhbHVlcyBhcmUgY2xlYXJlZCBiZWZvcmUgc3RhcnRpbmcuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZSgnJyk7XG5cbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICAvLyBNYWtlIHN1cmUgY3VzdG9tIHByb3BlcnR5IHZhbHVlcyBhcmUgY2xlYXJlZCBiZWZvcmUgbWFraW5nIGFueSBjaGFuZ2VzLlxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoJycpO1xuXG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgfVxuXG4gIHByZXBhcmVGb3JUb3VjaEVuZF8oKSB7XG4gICAgc3VwZXIucHJlcGFyZUZvclRvdWNoRW5kXygpO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZSgnJyk7XG4gIH1cblxuICB1cGRhdGVEcmF3ZXJfKCkge1xuICAgIHN1cGVyLnVwZGF0ZURyYXdlcl8oKTtcblxuICAgIGNvbnN0IG5ld09wYWNpdHkgPSBNYXRoLm1heCgwLCAxICsgdGhpcy5kaXJlY3Rpb25fICogKHRoaXMubmV3UG9zaXRpb25fIC8gdGhpcy5kcmF3ZXJXaWR0aF8pKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKG5ld09wYWNpdHkpO1xuICB9XG5cbiAgaXNSb290VHJhbnNpdGlvbmluZ0V2ZW50VGFyZ2V0XyhlbCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmlzRHJhd2VyKGVsKTtcbiAgfVxuXG4gIGhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCkge1xuICAgIHN1cGVyLmhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCk7XG4gICAgaWYgKCF0aGlzLmlzT3Blbl8pIHtcbiAgICAgIHRoaXMuZW5hYmxlU2Nyb2xsXygpO1xuICAgIH1cbiAgfTtcblxuICBkaXNhYmxlU2Nyb2xsXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZEJvZHlDbGFzcyhjc3NDbGFzc2VzLlNDUk9MTF9MT0NLKTtcbiAgfVxuXG4gIGVuYWJsZVNjcm9sbF8oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVCb2R5Q2xhc3MoY3NzQ2xhc3Nlcy5TQ1JPTExfTE9DSyk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGFzaWRlXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiXG4gICAgY2xhc3M9XCJtZGMtdGVtcG9yYXJ5LWRyYXdlciBtZGMtZHJhd2VyLS10ZW1wb3JhcnkgbWRjLXR5cG9ncmFwaHlcIj5cbiAgICA8bmF2XG4gICAgICByZWY9XCJkcmF3ZXJcIlxuICAgICAgY2xhc3M9XCJtZGMtZHJhd2VyX19kcmF3ZXJcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cInRvb2xiYXJTcGFjZXJcIlxuICAgICAgICBjbGFzcz1cIm1kYy1kcmF3ZXJfX3Rvb2xiYXItc3BhY2VyXCIvPlxuICAgICAgPHNsb3QgLz5cbiAgICA8L25hdj5cbiAgPC9hc2lkZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZHJhd2VyL3RlbXBvcmFyeS9mb3VuZGF0aW9uJ1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICdAbWF0ZXJpYWwvZHJhd2VyL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10ZW1wb3JhcnktZHJhd2VyJyxcbiAgbW9kZWw6IHtcbiAgICBwcm9wOiAnb3BlbicsXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgb3BlbjogQm9vbGVhbixcbiAgICAndG9vbGJhci1zcGFjZXInOiBCb29sZWFuXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIG9wZW46ICdfcmVmcmVzaCdcbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBGT0NVU0FCTEVfRUxFTUVOVFMsXG4gICAgICBPUEFDSVRZX1ZBUl9OQU1FXG4gICAgfSA9IE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uc3RyaW5nc1xuXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBhZGRCb2R5Q2xhc3M6IGNsYXNzTmFtZSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUJvZHlDbGFzczogY2xhc3NOYW1lID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgICAgZXZlbnRUYXJnZXRIYXNDbGFzczogKHRhcmdldCwgY2xhc3NOYW1lKSA9PlxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgICBoYXNOZWNlc3NhcnlEb206ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy4kcmVmcy5kcmF3ZXJcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHV0aWwucmVtYXBFdmVudChldnQpLFxuICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgdXRpbC5hcHBseVBhc3NpdmUoKVxuICAgICAgICApXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHV0aWwucmVtYXBFdmVudChldnQpLFxuICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgdXRpbC5hcHBseVBhc3NpdmUoKVxuICAgICAgICApXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB1dGlsLnJlbWFwRXZlbnQoZXZ0KSxcbiAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgIHV0aWwuYXBwbHlQYXNzaXZlKClcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB1dGlsLnJlbWFwRXZlbnQoZXZ0KSxcbiAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgIHV0aWwuYXBwbHlQYXNzaXZlKClcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGdldERyYXdlcldpZHRoOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmRyYXdlci5vZmZzZXRXaWR0aFxuICAgICAgfSxcbiAgICAgIHNldFRyYW5zbGF0ZVg6IHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgdXRpbC5nZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUoKSxcbiAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBgdHJhbnNsYXRlWCgke3ZhbHVlfXB4KWBcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiB2YWx1ZSA9PiB7XG4gICAgICAgIGlmICh1dGlsLnN1cHBvcnRzQ3NzQ3VzdG9tUHJvcGVydGllcygpKSB7XG4gICAgICAgICAgdGhpcy4kZWwuc3R5bGUuc2V0UHJvcGVydHkoT1BBQ0lUWV9WQVJfTkFNRSwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRGb2N1c2FibGVFbGVtZW50czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5kcmF3ZXIucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFMpXG4gICAgICB9LFxuICAgICAgc2F2ZUVsZW1lbnRUYWJTdGF0ZTogZWwgPT4ge1xuICAgICAgICB1dGlsLnNhdmVFbGVtZW50VGFiU3RhdGUoZWwpXG4gICAgICB9LFxuICAgICAgcmVzdG9yZUVsZW1lbnRUYWJTdGF0ZTogZWwgPT4ge1xuICAgICAgICB1dGlsLnJlc3RvcmVFbGVtZW50VGFiU3RhdGUoZWwpXG4gICAgICB9LFxuICAgICAgbWFrZUVsZW1lbnRVbnRhYmJhYmxlOiBlbCA9PiB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSlcbiAgICAgIH0sXG4gICAgICBub3RpZnlPcGVuOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRydWUpXG4gICAgICAgIHRoaXMuJGVtaXQoJ29wZW4nKVxuICAgICAgfSxcbiAgICAgIG5vdGlmeUNsb3NlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZhbHNlKVxuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScpXG4gICAgICB9LFxuICAgICAgaXNSdGw6ICgpID0+IHtcbiAgICAgICAgLyogZ2xvYmFsIGdldENvbXB1dGVkU3R5bGUgKi9cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuJGVsKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXJlY3Rpb24nKSA9PT0gJ3J0bCdcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIGlzRHJhd2VyOiBlbCA9PiBlbCA9PT0gdGhpcy4kcmVmcy5kcmF3ZXJcbiAgICB9KVxuICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG4gICAgdGhpcy5fcmVmcmVzaCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBudWxsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBfcmVmcmVzaCgpIHtcbiAgICAgIGlmICh0aGlzLm9wZW4pIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5vcGVuKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uY2xvc2UoKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxjb21wb25lbnRcbiAgICByZWY9XCJkcmF3ZXJcIlxuICAgIDppcz1cInR5cGVcIlxuICAgIHYtbW9kZWw9XCJvcGVuX1wiXG4gICAgOnRvb2xiYXItc3BhY2VyPVwidG9vbGJhclNwYWNlclwiXG4gICAgY2xhc3M9XCJtZGMtZHJhd2VyXCJcbiAgICBAY2hhbmdlPVwib25DaGFuZ2VcIlxuICAgIEBvcGVuPVwiJGVtaXQoJ29wZW4nKVwiXG4gICAgQGNsb3NlPVwiJGVtaXQoJ2Nsb3NlJylcIiA+XG4gICAgPHNsb3QgLz5cbiAgPC9jb21wb25lbnQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IG1kY1Blcm1hbmVudERyYXdlciBmcm9tICcuL21kYy1wZXJtYW5lbnQtZHJhd2VyLnZ1ZSdcbmltcG9ydCBtZGNQZXJzaXN0ZW50RHJhd2VyIGZyb20gJy4vbWRjLXBlcnNpc3RlbnQtZHJhd2VyLnZ1ZSdcbmltcG9ydCBtZGNUZW1wb3JhcnlEcmF3ZXIgZnJvbSAnLi9tZGMtdGVtcG9yYXJ5LWRyYXdlci52dWUnXG5cbmNvbnN0IG1lZGlhID0gbmV3IGNsYXNzIHtcbiAgZ2V0IHNtYWxsKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLl9zbWFsbCB8fCAodGhpcy5fc21hbGwgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogODM5cHgpJykpXG4gICAgKVxuICB9XG5cbiAgZ2V0IGxhcmdlKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLl9sYXJnZSB8fCAodGhpcy5fbGFyZ2UgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogMTIwMHB4KScpKVxuICAgIClcbiAgfVxufSgpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1kcmF3ZXInLFxuICBjb21wb25lbnRzOiB7XG4gICAgJ21kYy1wZXJtYW5lbnQtZHJhd2VyJzogbWRjUGVybWFuZW50RHJhd2VyLFxuICAgICdtZGMtcGVyc2lzdGVudC1kcmF3ZXInOiBtZGNQZXJzaXN0ZW50RHJhd2VyLFxuICAgICdtZGMtdGVtcG9yYXJ5LWRyYXdlcic6IG1kY1RlbXBvcmFyeURyYXdlclxuICB9LFxuICBtb2RlbDoge1xuICAgIHByb3A6ICdvcGVuJyxcbiAgICBldmVudDogJ2NoYW5nZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBvcGVuOiBCb29sZWFuLFxuICAgIHBlcm1hbmVudDogQm9vbGVhbixcbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIHRlbXBvcmFyeTogQm9vbGVhbixcbiAgICBkcmF3ZXJUeXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbCA9PiB7XG4gICAgICAgIHJldHVybiB2YWwgaW4gWyd0ZW1wb3JhcnknLCAncGVyc2lzdGVudCcsICdwZXJtYW5lbnQnXVxuICAgICAgfVxuICAgIH0sXG4gICAgdG9vbGJhclNwYWNlcjogQm9vbGVhbixcbiAgICB0b2dnbGVPbjogU3RyaW5nLFxuICAgIHRvZ2dsZU9uU291cmNlOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gICAgb3Blbk9uOiBTdHJpbmcsXG4gICAgb3Blbk9uU291cmNlOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gICAgY2xvc2VPbjogU3RyaW5nLFxuICAgIGNsb3NlT25Tb3VyY2U6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2UgfVxuICB9LFxuICBwcm92aWRlKCkge1xuICAgIHJldHVybiB7IG1kY0RyYXdlcjogdGhpcyB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNtYWxsOiBmYWxzZSxcbiAgICAgIGxhcmdlOiBmYWxzZSxcbiAgICAgIG9wZW5fOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB0eXBlKCkge1xuICAgICAgaWYgKHRoaXMucGVybWFuZW50KSB7XG4gICAgICAgIHJldHVybiAnbWRjLXBlcm1hbmVudC1kcmF3ZXInXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGVyc2lzdGVudCkge1xuICAgICAgICByZXR1cm4gJ21kYy1wZXJzaXN0ZW50LWRyYXdlcidcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50ZW1wb3JhcnkpIHtcbiAgICAgICAgcmV0dXJuICdtZGMtdGVtcG9yYXJ5LWRyYXdlcidcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5kcmF3ZXJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAncGVybWFuZW50JzpcbiAgICAgICAgICAgIHJldHVybiAnbWRjLXBlcm1hbmVudC1kcmF3ZXInXG4gICAgICAgICAgY2FzZSAncGVyc2lzdGVudCc6XG4gICAgICAgICAgICByZXR1cm4gJ21kYy1wZXJzaXN0ZW50LWRyYXdlcidcbiAgICAgICAgICBjYXNlICd0ZW1wb3JhcnknOlxuICAgICAgICAgICAgcmV0dXJuICdtZGMtdGVtcG9yYXJ5LWRyYXdlcidcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc21hbGwgPyAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInIDogJ21kYy1wZXJzaXN0ZW50LWRyYXdlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgaXNQZXJtYW5lbnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wZXJtYW5lbnQgfHwgdGhpcy50eXBlID09PSAnbWRjLXBlcm1hbmVudC1kcmF3ZXInXG4gICAgfSxcbiAgICBpc1BlcnNpc3RlbnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wZXJzaXN0ZW50IHx8IHRoaXMudHlwZSA9PT0gJ21kYy1wZXJzaXN0ZW50LWRyYXdlcidcbiAgICB9LFxuICAgIGlzVGVtcG9yYXJ5KCkge1xuICAgICAgcmV0dXJuIHRoaXMudGVtcG9yYXJ5IHx8IHRoaXMudHlwZSA9PT0gJ21kYy10ZW1wb3JhcnktZHJhd2VyJ1xuICAgIH0sXG4gICAgaXNSZXNwb25zaXZlKCkge1xuICAgICAgcmV0dXJuICEoXG4gICAgICAgIHRoaXMucGVybWFuZW50IHx8XG4gICAgICAgIHRoaXMucGVyc2lzdGVudCB8fFxuICAgICAgICB0aGlzLnRlbXBvcmFyeSB8fFxuICAgICAgICB0aGlzLmRyYXdlclR5cGVcbiAgICAgIClcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3BlbjogJ29uT3Blbl8nXG4gIH0sXG4gIGNyZWF0ZWQoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5tYXRjaE1lZGlhKSB7XG4gICAgICB0aGlzLnNtYWxsID0gbWVkaWEuc21hbGwubWF0Y2hlc1xuICAgICAgdGhpcy5sYXJnZSA9IG1lZGlhLmxhcmdlLm1hdGNoZXNcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgaWYgKHRoaXMudG9nZ2xlT24pIHtcbiAgICAgIHRoaXMudG9nZ2xlT25FdmVudFNvdXJjZSA9IHRoaXMudG9nZ2xlT25Tb3VyY2UgfHwgdGhpcy4kcm9vdFxuICAgICAgdGhpcy50b2dnbGVPbkV2ZW50U291cmNlLiRvbih0aGlzLnRvZ2dsZU9uLCB0aGlzLnRvZ2dsZSlcbiAgICB9XG4gICAgaWYgKHRoaXMub3Blbk9uKSB7XG4gICAgICB0aGlzLm9wZW5PbkV2ZW50U291cmNlID0gdGhpcy5vcGVuT25Tb3VyY2UgfHwgdGhpcy4kcm9vdFxuICAgICAgdGhpcy5vcGVuT25FdmVudFNvdXJjZS4kb24odGhpcy5vcGVuT24sIHRoaXMuc2hvdylcbiAgICB9XG4gICAgaWYgKHRoaXMuY2xvc2VPbikge1xuICAgICAgdGhpcy5jbG9zZU9uRXZlbnRTb3VyY2UgPSB0aGlzLmNsb3NlT25Tb3VyY2UgfHwgdGhpcy4kcm9vdFxuICAgICAgdGhpcy5jbG9zZU9uRXZlbnRTb3VyY2UuJG9uKHRoaXMuY2xvc2VPbiwgdGhpcy5jbG9zZSlcbiAgICB9XG4gICAgbWVkaWEuc21hbGwuYWRkTGlzdGVuZXIodGhpcy5yZWZyZXNoTWVkaWEpXG4gICAgbWVkaWEubGFyZ2UuYWRkTGlzdGVuZXIodGhpcy5yZWZyZXNoTWVkaWEpXG4gICAgdGhpcy4kbmV4dFRpY2soKCkgPT4gdGhpcy5yZWZyZXNoTWVkaWEoKSlcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICBtZWRpYS5zbWFsbC5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlZnJlc2hNZWRpYSlcbiAgICBtZWRpYS5sYXJnZS5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlZnJlc2hNZWRpYSlcblxuICAgIGlmICh0aGlzLnRvZ2dsZU9uRXZlbnRTb3VyY2UpIHtcbiAgICAgIHRoaXMudG9nZ2xlT25FdmVudFNvdXJjZS4kb2ZmKHRoaXMudG9nZ2xlT24sIHRoaXMudG9nZ2xlKVxuICAgIH1cbiAgICBpZiAodGhpcy5vcGVuT25FdmVudFNvdXJjZSkge1xuICAgICAgdGhpcy5vcGVuT25FdmVudFNvdXJjZS4kb2ZmKHRoaXMub3Blbk9uLCB0aGlzLnNob3cpXG4gICAgfVxuICAgIGlmICh0aGlzLmNsb3NlT25FdmVudFNvdXJjZSkge1xuICAgICAgdGhpcy5jbG9zZU9uRXZlbnRTb3VyY2UuJG9mZih0aGlzLmNsb3NlT24sIHRoaXMuY2xvc2UpXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25PcGVuXyh2YWx1ZSkge1xuICAgICAgdGhpcy5pc1Blcm1hbmVudCB8fCAodGhpcy5vcGVuXyA9IHZhbHVlKVxuICAgIH0sXG4gICAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGV2ZW50KVxuICAgICAgdGhpcy4kcm9vdC4kZW1pdCgndm1hOmxheW91dCcpXG4gICAgfSxcbiAgICBzaG93KCkge1xuICAgICAgdGhpcy5vcGVuXyA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy5pc1Blcm1hbmVudCB8fCAodGhpcy5vcGVuXyA9IGZhbHNlKVxuICAgIH0sXG4gICAgdG9nZ2xlKCkge1xuICAgICAgdGhpcy5pc1Blcm1hbmVudCB8fCAodGhpcy5pc09wZW4oKSA/IHRoaXMuY2xvc2UoKSA6IHRoaXMuc2hvdygpKVxuICAgIH0sXG4gICAgaXNPcGVuKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNQZXJtYW5lbnQgfHwgdGhpcy5vcGVuX1xuICAgIH0sXG4gICAgcmVmcmVzaE1lZGlhKCkge1xuICAgICAgdGhpcy5zbWFsbCA9IG1lZGlhLnNtYWxsLm1hdGNoZXNcbiAgICAgIHRoaXMubGFyZ2UgPSBtZWRpYS5sYXJnZS5tYXRjaGVzXG4gICAgICBpZiAodGhpcy5pc1Jlc3BvbnNpdmUpIHtcbiAgICAgICAgaWYgKHRoaXMubGFyZ2UpIHtcbiAgICAgICAgICB0aGlzLnNob3coKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2UoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cIm1kYy1kcmF3ZXItbGF5b3V0XCI+XG4gICAgPHNsb3QgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWRyYXdlci1sYXlvdXQnXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGhlYWRlciBcbiAgICB2LWlmPVwic2hvd1wiIFxuICAgIGNsYXNzPVwibWRjLWRyYXdlci1oZWFkZXIgbWRjLWRyYXdlcl9faGVhZGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1kcmF3ZXJfX2hlYWRlci1jb250ZW50XCI+XG4gICAgICA8c2xvdCAvPlxuICAgIDwvZGl2PlxuICA8L2hlYWRlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtZHJhd2VyLWhlYWRlcicsXG4gIHByb3BzOiB7XG4gICAgcGVybWFuZW50OiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgdGVtcG9yYXJ5OiBCb29sZWFuXG4gIH0sXG4gIGluamVjdDogWydtZGNEcmF3ZXInXSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzaG93KCkge1xuICAgICAgaWYgKHRoaXMudGVtcG9yYXJ5IHx8IHRoaXMucGVyc2lzdGVudCB8fCB0aGlzLnBlcm1hbmVudCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICh0aGlzLnRlbXBvcmFyeSAmJiB0aGlzLm1kY0RyYXdlci5pc1RlbXBvcmFyeSkgfHxcbiAgICAgICAgICAodGhpcy5wZXJzaXN0ZW50ICYmIHRoaXMubWRjRHJhd2VyLmlzUGVyc2lzdGVudCkgfHxcbiAgICAgICAgICAodGhpcy5wZXJtYW5lbnQgJiYgdGhpcy5tZGNEcmF3ZXIuaXNQZXJtYW5lbnQpXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPG5hdiBcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXG4gICAgY2xhc3M9XCJtZGMtZHJhd2VyLWxpc3QgbWRjLWxpc3RcIj5cbiAgICA8c2xvdC8+XG4gIDwvbmF2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1kcmF3ZXItbGlzdCcsXG4gIHByb3BzOiB7XG4gICAgZGVuc2U6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWxpc3QtLWRlbnNlJzogdGhpcy5kZW5zZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxuICAgICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmF0aW9uVGltZXJfKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG4gICAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIH1cblxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gbnVsbDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9XG4gICAgICBlICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgJiYgKGUua2V5ID09PSAnICcgfHwgZS5rZXlDb2RlID09PSAzMikpIHtcbiAgICAgICAgLy8gSWYgc3BhY2Ugd2FzIHByZXNzZWQsIHRyeSBhZ2FpbiB3aXRoaW4gYW4gckFGIGNhbGwgdG8gZGV0ZWN0IDphY3RpdmUsIGJlY2F1c2UgZGlmZmVyZW50IFVBcyByZXBvcnRcbiAgICAgICAgLy8gYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpbiBldmVudCBoYW5kbGluZyBjb2RlOlxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgICAgLy8gV2UgdHJ5IGZpcnN0IG91dHNpZGUgckFGIHRvIHN1cHBvcnQgRWRnZSwgd2hpY2ggZG9lcyBub3QgZXhoaWJpdCB0aGlzIHByb2JsZW0sIGJ1dCB3aWxsIGNyYXNoIGlmIGEgQ1NTXG4gICAgICAgIC8vIHZhcmlhYmxlIGlzIHNldCB3aXRoaW4gYSByQUYgY2FsbGJhY2sgZm9yIGEgc3VibWl0IGJ1dHRvbiBpbnRlcmFjdGlvbiAoIzIyNDEpLlxuICAgICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgICAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKSB7XG4gICAgcmV0dXJuIChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhbmltYXRlQWN0aXZhdGlvbl8oKSB7XG4gICAgY29uc3Qge1ZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OLCBGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7REVBQ1RJVkFUSU9OX1RJTUVPVVRfTVN9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzO1xuXG4gICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1cygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsImltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcydcbmltcG9ydCB7XG4gIHN1cHBvcnRzQ3NzVmFyaWFibGVzLFxuICBnZXRNYXRjaGVzUHJvcGVydHksXG4gIGFwcGx5UGFzc2l2ZVxufSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgTUFUQ0hFUygpIHtcbiAgICAvKiBnbG9iYWwgSFRNTEVsZW1lbnQgKi9cbiAgICByZXR1cm4gKFxuICAgICAgUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxuICAgICAgKFJpcHBsZUJhc2UuX21hdGNoZXMgPSBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKSlcbiAgICApXG4gIH1cblxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlKHJlZikge1xuICAgIHJldHVybiByZWZbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih2bSwgb3B0aW9ucykge1xuICAgIHN1cGVyKFxuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAge1xuICAgICAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc1VuYm91bmRlZDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHZtLiRzZXQodm0uY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kZGVsZXRlKHZtLmNsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6IHRhcmdldCA9PiB2bS4kZWwuY29udGFpbnModGFyZ2V0KSxcbiAgICAgICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgIGV2dFR5cGUsXG4gICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLnN0eWxlcywgdmFyTmFtZSwgdmFsdWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyB4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldCB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zXG4gICAgICApXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSaXBwbGVNaXhpbiA9IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcbiAgfVxufVxuIiwiPHRlbXBsYXRlPlxuICA8Y3VzdG9tLWxpbmtcbiAgICA6bGluaz1cImxpbmtcIlxuICAgIDpjbGFzcz1cIltjbGFzc2VzLCBpdGVtQ2xhc3Nlc11cIlxuICAgIDpzdHlsZT1cInN0eWxlc1wiXG4gICAgY2xhc3M9XCJtZGMtZHJhd2VyLWl0ZW0gbWRjLWxpc3QtaXRlbVwiXG4gICAgdi1vbj1cIm15bGlzdGVuZXJzXCI+XG4gICAgPHNwYW5cbiAgICAgIHYtaWY9XCJoYXNTdGFydERldGFpbFwiXG4gICAgICBjbGFzcz1cIm1kYy1saXN0LWl0ZW1fX2dyYXBoaWNcIj5cbiAgICAgIDxzbG90IG5hbWU9XCJzdGFydC1kZXRhaWxcIj5cbiAgICAgICAgPGlcbiAgICAgICAgICBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCJcbiAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIj57eyBzdGFydEljb24gfX08L2k+XG4gICAgICA8L3Nsb3Q+XG4gICAgPC9zcGFuPlxuICAgIDxzbG90Lz5cbiAgPC9jdXN0b20tbGluaz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBEaXNwYXRjaEV2ZW50TWl4aW4sIEN1c3RvbUxpbmtNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgeyBSaXBwbGVCYXNlIH0gZnJvbSAnLi4vcmlwcGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtZHJhd2VyLWl0ZW0nLFxuICBpbmplY3Q6IFsnbWRjRHJhd2VyJ10sXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tTGlua01peGluXSxcbiAgcHJvcHM6IHtcbiAgICBzdGFydEljb246IFN0cmluZyxcbiAgICB0ZW1wb3JhcnlDbG9zZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGFjdGl2YXRlZDogQm9vbGVhbixcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbWRjLWxpc3QtaXRlbS0tYWN0aXZhdGVkJ1xuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIG15bGlzdGVuZXJzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgdGhpcy5tZGNEcmF3ZXIuaXNUZW1wb3JhcnkgJiZcbiAgICAgICAgICAgIHRoaXMudGVtcG9yYXJ5Q2xvc2UgJiZcbiAgICAgICAgICAgIHRoaXMubWRjRHJhd2VyLmNsb3NlKClcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbUNsYXNzZXMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnbWRjLWxpc3QtaXRlbS0tYWN0aXZhdGVkJzogdGhpcy5hY3RpdmF0ZWRcbiAgICAgIH1cbiAgICB9LFxuICAgIGhhc1N0YXJ0RGV0YWlsKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRJY29uIHx8IHRoaXMuJHNsb3RzWydzdGFydC1kZXRhaWwnXVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yaXBwbGUgJiYgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gICAgdGhpcy5yaXBwbGUgPSBudWxsXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8aHIgY2xhc3M9XCJtZGMtbGlzdC1kaXZpZGVyXCI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWRyYXdlci1kaXZpZGVyJ1xufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNEcmF3ZXIgZnJvbSAnLi9tZGMtZHJhd2VyLnZ1ZSdcbmltcG9ydCBtZGNEcmF3ZXJMYXlvdXQgZnJvbSAnLi9tZGMtZHJhd2VyLWxheW91dC52dWUnXG5pbXBvcnQgbWRjRHJhd2VySGVhZGVyIGZyb20gJy4vbWRjLWRyYXdlci1oZWFkZXIudnVlJ1xuaW1wb3J0IG1kY0RyYXdlckxpc3QgZnJvbSAnLi9tZGMtZHJhd2VyLWxpc3QudnVlJ1xuaW1wb3J0IG1kY0RyYXdlckl0ZW0gZnJvbSAnLi9tZGMtZHJhd2VyLWl0ZW0udnVlJ1xuaW1wb3J0IG1kY0RyYXdlckRpdmlkZXIgZnJvbSAnLi9tZGMtZHJhd2VyLWRpdmlkZXIudnVlJ1xuXG5leHBvcnQge1xuICBtZGNEcmF3ZXIsXG4gIG1kY0RyYXdlckxheW91dCxcbiAgbWRjRHJhd2VySGVhZGVyLFxuICBtZGNEcmF3ZXJMaXN0LFxuICBtZGNEcmF3ZXJJdGVtLFxuICBtZGNEcmF3ZXJEaXZpZGVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNEcmF3ZXIsXG4gIG1kY0RyYXdlckxheW91dCxcbiAgbWRjRHJhd2VySGVhZGVyLFxuICBtZGNEcmF3ZXJMaXN0LFxuICBtZGNEcmF3ZXJJdGVtLFxuICBtZGNEcmF3ZXJEaXZpZGVyXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiQ3VzdG9tTGluayIsImZ1bmN0aW9uYWwiLCJwcm9wcyIsInRhZyIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwibGluayIsIk9iamVjdCIsInJlbmRlciIsImgiLCJjb250ZXh0IiwiZWxlbWVudCIsImRhdGEiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsInBhcmVudCIsIiRyb3V0ZXIiLCIkcm9vdCIsIiRvcHRpb25zIiwib24iLCJjbGljayIsIm5hdGl2ZU9uIiwiY2hpbGRyZW4iLCJDdXN0b21MaW5rTWl4aW4iLCJ0byIsImV4YWN0IiwiQm9vbGVhbiIsImFwcGVuZCIsInJlcGxhY2UiLCJhY3RpdmVDbGFzcyIsImV4YWN0QWN0aXZlQ2xhc3MiLCJjb21wdXRlZCIsIkRpc3BhdGNoRXZlbnRNaXhpbiIsImV2ZW50IiwiQXJyYXkiLCJtZXRob2RzIiwiZGlzcGF0Y2hFdmVudCIsImV2dCIsIiRlbWl0IiwidGFyZ2V0IiwiZXZlbnRUYXJnZXQiLCJhcmdzIiwiZXZlbnRBcmdzIiwibGlzdGVuZXJzIiwiJGxpc3RlbmVycyIsImUiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiRk9DVVNBQkxFX0VMRU1FTlRTIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ0NvbXBvbmVudCIsInJvb3QiLCJmb3VuZGF0aW9uIiwidW5kZWZpbmVkIiwicm9vdF8iLCJpbml0aWFsaXplIiwiZm91bmRhdGlvbl8iLCJnZXREZWZhdWx0Rm91bmRhdGlvbiIsImluaXQiLCJpbml0aWFsU3luY1dpdGhET00iLCJFcnJvciIsImRlc3Ryb3kiLCJldnRUeXBlIiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiYnViYmxlcyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJoYXNOZWNlc3NhcnlEb20iLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwiZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwicmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIiLCJzZXRUcmFuc2xhdGVYIiwiZ2V0Rm9jdXNhYmxlRWxlbWVudHMiLCJzYXZlRWxlbWVudFRhYlN0YXRlIiwicmVzdG9yZUVsZW1lbnRUYWJTdGF0ZSIsIm1ha2VFbGVtZW50VW50YWJiYWJsZSIsIm5vdGlmeU9wZW4iLCJub3RpZnlDbG9zZSIsImlzUnRsIiwiZ2V0RHJhd2VyV2lkdGgiLCJyb290Q3NzQ2xhc3MiLCJhbmltYXRpbmdDc3NDbGFzcyIsIm9wZW5Dc3NDbGFzcyIsImRlZmF1bHRBZGFwdGVyIiwicm9vdENzc0NsYXNzXyIsImFuaW1hdGluZ0Nzc0NsYXNzXyIsIm9wZW5Dc3NDbGFzc18iLCJ0cmFuc2l0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVUcmFuc2l0aW9uRW5kXyIsImluZXJ0XyIsImNvbXBvbmVudFRvdWNoU3RhcnRIYW5kbGVyXyIsImhhbmRsZVRvdWNoU3RhcnRfIiwiY29tcG9uZW50VG91Y2hNb3ZlSGFuZGxlcl8iLCJoYW5kbGVUb3VjaE1vdmVfIiwiY29tcG9uZW50VG91Y2hFbmRIYW5kbGVyXyIsImhhbmRsZVRvdWNoRW5kXyIsImRvY3VtZW50S2V5ZG93bkhhbmRsZXJfIiwia2V5Q29kZSIsImNsb3NlIiwiUk9PVCIsIk9QRU4iLCJpc09wZW5fIiwiZGV0YWJpbmF0ZV8iLCJyZXRhYmluYXRlXyIsImVsZW1lbnRzIiwiaSIsImxlbmd0aCIsInBvaW50ZXJUeXBlIiwiZGlyZWN0aW9uXyIsImRyYXdlcldpZHRoXyIsInN0YXJ0WF8iLCJ0b3VjaGVzIiwicGFnZVgiLCJjdXJyZW50WF8iLCJ1cGRhdGVSYWZfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidXBkYXRlRHJhd2VyXyIsImJpbmQiLCJwcmVwYXJlRm9yVG91Y2hFbmRfIiwiYWJzIiwibmV3UG9zaXRpb25fIiwib3BlbiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaXNSb290VHJhbnNpdGlvbmluZ0V2ZW50VGFyZ2V0XyIsIm5ld1BvcyIsIm1pbiIsIm1heCIsImNzc0NsYXNzZXMiLCJBTklNQVRJTkciLCJzdHJpbmdzIiwiRFJBV0VSX1NFTEVDVE9SIiwiT1BFTl9FVkVOVCIsIkNMT1NFX0VWRU5UIiwiTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24iLCJpc0RyYXdlciIsImVsIiwiVEFCX0RBVEEiLCJUQUJfREFUQV9IQU5ETEVEIiwic3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJyZW1hcEV2ZW50IiwiZXZlbnROYW1lIiwiZ2xvYmFsT2JqIiwiZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lIiwiZm9yY2VSZWZyZXNoIiwiY3JlYXRlRWxlbWVudCIsInRyYW5zZm9ybVByb3BlcnR5TmFtZSIsInN0eWxlIiwic3VwcG9ydHNDc3NDdXN0b21Qcm9wZXJ0aWVzIiwiQ1NTIiwic3VwcG9ydHMiLCJhcHBseVBhc3NpdmUiLCJpc1N1cHBvcnRlZCIsInBhc3NpdmUiLCJoYXNBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2RlbCIsInByb3AiLCJjbGFzc2VzIiwid2F0Y2giLCJtb3VudGVkIiwiJHNldCIsImNsYXNzTmFtZSIsIiRkZWxldGUiLCIkZWwiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIiRyZWZzIiwiZHJhd2VyIiwidXRpbCIsIm9mZnNldFdpZHRoIiwic2V0UHJvcGVydHkiLCJ2YWx1ZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsIl9yZWZyZXNoIiwiYmVmb3JlRGVzdHJveSIsIlNDUk9MTF9MT0NLIiwiT1BBQ0lUWV9WQVJfTkFNRSIsIk1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24iLCJhZGRCb2R5Q2xhc3MiLCJyZW1vdmVCb2R5Q2xhc3MiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImV2ZW50VGFyZ2V0SGFzQ2xhc3MiLCJjb21wb25lbnRDbGlja0hhbmRsZXJfIiwiZW5hYmxlU2Nyb2xsXyIsImRpc2FibGVTY3JvbGxfIiwibmV3T3BhY2l0eSIsImJvZHkiLCJhZGQiLCJyZW1vdmUiLCJtZWRpYSIsIl9zbWFsbCIsIm1hdGNoTWVkaWEiLCJfbGFyZ2UiLCJtZGNQZXJtYW5lbnREcmF3ZXIiLCJtZGNQZXJzaXN0ZW50RHJhd2VyIiwibWRjVGVtcG9yYXJ5RHJhd2VyIiwicGVybWFuZW50IiwicGVyc2lzdGVudCIsInRlbXBvcmFyeSIsImRyYXdlclR5cGUiLCJ2YWxpZGF0b3IiLCJ2YWwiLCJ0b29sYmFyU3BhY2VyIiwidG9nZ2xlT24iLCJ0b2dnbGVPblNvdXJjZSIsInJlcXVpcmVkIiwib3Blbk9uIiwib3Blbk9uU291cmNlIiwiY2xvc2VPbiIsImNsb3NlT25Tb3VyY2UiLCJwcm92aWRlIiwibWRjRHJhd2VyIiwic21hbGwiLCJsYXJnZSIsIm9wZW5fIiwiaXNQZXJtYW5lbnQiLCJpc1BlcnNpc3RlbnQiLCJpc1RlbXBvcmFyeSIsImlzUmVzcG9uc2l2ZSIsImNyZWF0ZWQiLCJtYXRjaGVzIiwidG9nZ2xlT25FdmVudFNvdXJjZSIsIiRvbiIsInRvZ2dsZSIsIm9wZW5PbkV2ZW50U291cmNlIiwic2hvdyIsImNsb3NlT25FdmVudFNvdXJjZSIsImFkZExpc3RlbmVyIiwicmVmcmVzaE1lZGlhIiwiJG5leHRUaWNrIiwicmVtb3ZlTGlzdGVuZXIiLCIkb2ZmIiwib25PcGVuXyIsIm9uQ2hhbmdlIiwiaXNPcGVuIiwiaW5qZWN0IiwiZGVuc2UiLCJNRENSaXBwbGVBZGFwdGVyIiwidmFyTmFtZSIsIlVOQk9VTkRFRCIsIkJHX0ZPQ1VTRUQiLCJGR19BQ1RJVkFUSU9OIiwiRkdfREVBQ1RJVkFUSU9OIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJudW1iZXJzIiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwibm9kZSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsImZpbHRlciIsInAiLCJwb3AiLCJnZXROb3JtYWxpemVkRXZlbnRDb29yZHMiLCJldiIsInBhZ2VPZmZzZXQiLCJjbGllbnRSZWN0IiwieCIsInkiLCJkb2N1bWVudFgiLCJsZWZ0IiwiZG9jdW1lbnRZIiwidG9wIiwibm9ybWFsaXplZFgiLCJub3JtYWxpemVkWSIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiZm9yRWFjaCIsImtleXMiLCJrIiwiaW5kZXhPZiIsImFjdGl2YXRpb25TdGF0ZSIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJoYXNBY3RpdmF0ZWRDaGlsZCIsInNvbWUiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsInNldFRpbWVvdXQiLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwibWF4RGltIiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCJkaXNhYmxlZCIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJtaXhpbnMiLCJzdGFydEljb24iLCJ0ZW1wb3JhcnlDbG9zZSIsImFjdGl2YXRlZCIsIm15bGlzdGVuZXJzIiwiaXRlbUNsYXNzZXMiLCJoYXNTdGFydERldGFpbCIsIiRzbG90cyIsInJpcHBsZSIsIm1kY0RyYXdlckxheW91dCIsIm1kY0RyYXdlckhlYWRlciIsIm1kY0RyYXdlckxpc3QiLCJtZGNEcmF3ZXJJdGVtIiwibWRjRHJhd2VyRGl2aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0lBQy9CO0lBQ0EsTUFBSUMsT0FBTyxJQUFYO0lBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtC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
