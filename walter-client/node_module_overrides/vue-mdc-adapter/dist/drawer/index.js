/**
* @module vue-mdc-adapterdrawer 0.17.0
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import { RippleBase } from '../ripple';

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

var index = BasePlugin({
  mdcDrawer: mdcDrawer,
  mdcDrawerLayout: mdcDrawerLayout,
  mdcDrawerHeader: mdcDrawerHeader,
  mdcDrawerList: mdcDrawerList,
  mdcDrawerItem: mdcDrawerItem,
  mdcDrawerDivider: mdcDrawerDivider
});

export default index;
export { mdcDrawer, mdcDrawerLayout, mdcDrawerHeader, mdcDrawerList, mdcDrawerItem, mdcDrawerDivider };
//# sourceMappingURL=index.js.map
