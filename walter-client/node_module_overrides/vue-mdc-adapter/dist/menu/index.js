/**
* @module vue-mdc-adaptermenu 0.17.0
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

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
 * Adapter for MDC Menu. Provides an interface for managing
 * - classes
 * - dom
 * - focus
 * - position
 * - dimensions
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
var MDCMenuAdapter = function () {
  function MDCMenuAdapter() {
    classCallCheck(this, MDCMenuAdapter);
  }

  createClass(MDCMenuAdapter, [{
    key: "addClass",

    /** @param {string} className */
    value: function addClass(className) {}

    /** @param {string} className */

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

    /** @return {boolean} */

  }, {
    key: "hasNecessaryDom",
    value: function hasNecessaryDom() {}

    /**
     * @param {EventTarget} target
     * @param {string} attributeName
     * @return {string}
     */

  }, {
    key: "getAttributeForEventTarget",
    value: function getAttributeForEventTarget(target, attributeName) {}

    /** @return {{ width: number, height: number }} */

  }, {
    key: "getInnerDimensions",
    value: function getInnerDimensions() {}

    /** @return {boolean} */

  }, {
    key: "hasAnchor",
    value: function hasAnchor() {}

    /** @return {{width: number, height: number, top: number, right: number, bottom: number, left: number}} */

  }, {
    key: "getAnchorDimensions",
    value: function getAnchorDimensions() {}

    /** @return {{ width: number, height: number }} */

  }, {
    key: "getWindowDimensions",
    value: function getWindowDimensions() {}

    /** @return {number} */

  }, {
    key: "getNumberOfItems",
    value: function getNumberOfItems() {}

    /**
     * @param {string} type
     * @param {function(!Event)} handler
     */

  }, {
    key: "registerInteractionHandler",
    value: function registerInteractionHandler(type, handler) {}

    /**
     * @param {string} type
     * @param {function(!Event)} handler
     */

  }, {
    key: "deregisterInteractionHandler",
    value: function deregisterInteractionHandler(type, handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: "registerBodyClickHandler",
    value: function registerBodyClickHandler(handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: "deregisterBodyClickHandler",
    value: function deregisterBodyClickHandler(handler) {}

    /**
     * @param {EventTarget} target
     * @return {number}
     */

  }, {
    key: "getIndexForEventTarget",
    value: function getIndexForEventTarget(target) {}

    /** @param {{index: number}} evtData */

  }, {
    key: "notifySelected",
    value: function notifySelected(evtData) {}
  }, {
    key: "notifyCancel",
    value: function notifyCancel() {}
  }, {
    key: "saveFocus",
    value: function saveFocus() {}
  }, {
    key: "restoreFocus",
    value: function restoreFocus() {}

    /** @return {boolean} */

  }, {
    key: "isFocused",
    value: function isFocused() {}
  }, {
    key: "focus",
    value: function focus() {}

    /** @return {number} */

  }, {
    key: "getFocusedItemIndex",
    value: function getFocusedItemIndex() /* number */{}

    /** @param {number} index */

  }, {
    key: "focusItemAtIndex",
    value: function focusItemAtIndex(index) {}

    /** @return {boolean} */

  }, {
    key: "isRtl",
    value: function isRtl() {}

    /** @param {string} origin */

  }, {
    key: "setTransformOrigin",
    value: function setTransformOrigin(origin) {}

    /** @param {{
    *   top: (string|undefined),
    *   right: (string|undefined),
    *   bottom: (string|undefined),
    *   left: (string|undefined)
    * }} position */

  }, {
    key: "setPosition",
    value: function setPosition(position) {}

    /** @param {string} height */

  }, {
    key: "setMaxHeight",
    value: function setMaxHeight(height) {}

    /**
     * @param {number} index
     * @param {string} attr
     * @param {string} value
     */

  }, {
    key: "setAttrForOptionAtIndex",
    value: function setAttrForOptionAtIndex(index, attr, value) {}

    /**
     * @param {number} index
     * @param {string} attr
     */

  }, {
    key: "rmAttrForOptionAtIndex",
    value: function rmAttrForOptionAtIndex(index, attr) {}

    /**
     * @param {number} index
     * @param {string} className
     */

  }, {
    key: "addClassForOptionAtIndex",
    value: function addClassForOptionAtIndex(index, className) {}

    /**
     * @param {number} index
     * @param {string} className
     */

  }, {
    key: "rmClassForOptionAtIndex",
    value: function rmClassForOptionAtIndex(index, className) {}
  }]);
  return MDCMenuAdapter;
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
var cssClasses = {
  ROOT: 'mdc-menu',
  OPEN: 'mdc-menu--open',
  ANIMATING_OPEN: 'mdc-menu--animating-open',
  ANIMATING_CLOSED: 'mdc-menu--animating-closed',
  SELECTED_LIST_ITEM: 'mdc-list-item--selected'
};

/** @enum {string} */
var strings = {
  ITEMS_SELECTOR: '.mdc-menu__items',
  SELECTED_EVENT: 'MDCMenu:selected',
  CANCEL_EVENT: 'MDCMenu:cancel',
  ARIA_DISABLED_ATTR: 'aria-disabled'
};

/** @enum {number} */
var numbers = {
  // Amount of time to wait before triggering a selected event on the menu. Note that this time
  // will most likely be bumped up once interactive lists are supported to allow for the ripple to
  // animate before closing the menu
  SELECTED_TRIGGER_DELAY: 50,
  // Total duration of menu open animation.
  TRANSITION_OPEN_DURATION: 120,
  // Total duration of menu close animation.
  TRANSITION_CLOSE_DURATION: 75,
  // Margin left to the edge of the viewport when menu is at maximum possible height.
  MARGIN_TO_EDGE: 32,
  // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
  ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
  // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
  OFFSET_TO_MENU_HEIGHT_RATIO: 0.1
};

/**
 * Enum for bits in the {@see Corner) bitmap.
 * @enum {number}
 */
var CornerBit = {
  BOTTOM: 1,
  CENTER: 2,
  RIGHT: 4,
  FLIP_RTL: 8
};

/**
 * Enum for representing an element corner for positioning the menu.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 *
 * @enum {number}
 */
var Corner = {
  TOP_LEFT: 0,
  TOP_RIGHT: CornerBit.RIGHT,
  BOTTOM_LEFT: CornerBit.BOTTOM,
  BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
  TOP_START: CornerBit.FLIP_RTL,
  TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
  BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
  BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
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
 * @extends {MDCFoundation<!MDCMenuAdapter>}
 */

var MDCMenuFoundation = function (_MDCFoundation) {
  inherits(MDCMenuFoundation, _MDCFoundation);
  createClass(MDCMenuFoundation, null, [{
    key: 'cssClasses',

    /** @return enum{cssClasses} */
    get: function get$$1() {
      return cssClasses;
    }

    /** @return enum{strings} */

  }, {
    key: 'strings',
    get: function get$$1() {
      return strings;
    }

    /** @return enum{numbers} */

  }, {
    key: 'numbers',
    get: function get$$1() {
      return numbers;
    }

    /** @return enum{number} */

  }, {
    key: 'Corner',
    get: function get$$1() {
      return Corner;
    }

    /**
     * {@see MDCMenuAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCMenuAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCMenuAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {
            return false;
          },
          hasNecessaryDom: function hasNecessaryDom() {
            return false;
          },
          getAttributeForEventTarget: function getAttributeForEventTarget() {},
          getInnerDimensions: function getInnerDimensions() {
            return {};
          },
          hasAnchor: function hasAnchor() {
            return false;
          },
          getAnchorDimensions: function getAnchorDimensions() {
            return {};
          },
          getWindowDimensions: function getWindowDimensions() {
            return {};
          },
          getNumberOfItems: function getNumberOfItems() {
            return 0;
          },
          registerInteractionHandler: function registerInteractionHandler() {},
          deregisterInteractionHandler: function deregisterInteractionHandler() {},
          registerBodyClickHandler: function registerBodyClickHandler() {},
          deregisterBodyClickHandler: function deregisterBodyClickHandler() {},
          getIndexForEventTarget: function getIndexForEventTarget() {
            return 0;
          },
          notifySelected: function notifySelected() {},
          notifyCancel: function notifyCancel() {},
          saveFocus: function saveFocus() {},
          restoreFocus: function restoreFocus() {},
          isFocused: function isFocused() {
            return false;
          },
          focus: function focus() {},
          getFocusedItemIndex: function getFocusedItemIndex() {
            return -1;
          },
          focusItemAtIndex: function focusItemAtIndex() {},
          isRtl: function isRtl() {
            return false;
          },
          setTransformOrigin: function setTransformOrigin() {},
          setPosition: function setPosition() {},
          setMaxHeight: function setMaxHeight() {},
          setAttrForOptionAtIndex: function setAttrForOptionAtIndex() {},
          rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() {},
          addClassForOptionAtIndex: function addClassForOptionAtIndex() {},
          rmClassForOptionAtIndex: function rmClassForOptionAtIndex() {}
        }
      );
    }

    /** @param {!MDCMenuAdapter} adapter */

  }]);

  function MDCMenuFoundation(adapter) {
    classCallCheck(this, MDCMenuFoundation);

    /** @private {function(!Event)} */
    var _this = possibleConstructorReturn(this, (MDCMenuFoundation.__proto__ || Object.getPrototypeOf(MDCMenuFoundation)).call(this, _extends(MDCMenuFoundation.defaultAdapter, adapter)));

    _this.clickHandler_ = function (evt) {
      return _this.handlePossibleSelected_(evt);
    };
    /** @private {function(!Event)} */
    _this.keydownHandler_ = function (evt) {
      return _this.handleKeyboardDown_(evt);
    };
    /** @private {function(!Event)} */
    _this.keyupHandler_ = function (evt) {
      return _this.handleKeyboardUp_(evt);
    };
    /** @private {function(!Event)} */
    _this.documentClickHandler_ = function (evt) {
      return _this.handleDocumentClick_(evt);
    };
    /** @private {boolean} */
    _this.isOpen_ = false;
    /** @private {number} */
    _this.openAnimationEndTimerId_ = 0;
    /** @private {number} */
    _this.closeAnimationEndTimerId_ = 0;
    /** @private {number} */
    _this.selectedTriggerTimerId_ = 0;
    /** @private {number} */
    _this.animationRequestId_ = 0;
    /** @private {!{ width: number, height: number }} */
    _this.dimensions_;
    /** @private {number} */
    _this.itemHeight_;
    /** @private {Corner} */
    _this.anchorCorner_ = Corner.TOP_START;
    /** @private {AnchorMargin} */
    _this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 };
    /** @private {?AutoLayoutMeasurements} */
    _this.measures_ = null;
    /** @private {number} */
    _this.selectedIndex_ = -1;
    /** @private {boolean} */
    _this.rememberSelection_ = false;
    /** @private {boolean} */
    _this.quickOpen_ = false;

    // A keyup event on the menu needs to have a corresponding keydown
    // event on the menu. If the user opens the menu with a keydown event on a
    // button, the menu will only get the key up event causing buggy behavior with selected elements.
    /** @private {boolean} */
    _this.keyDownWithinMenu_ = false;
    return _this;
  }

  createClass(MDCMenuFoundation, [{
    key: 'init',
    value: function init() {
      var _MDCMenuFoundation$cs = MDCMenuFoundation.cssClasses,
          ROOT = _MDCMenuFoundation$cs.ROOT,
          OPEN = _MDCMenuFoundation$cs.OPEN;


      if (!this.adapter_.hasClass(ROOT)) {
        throw new Error(ROOT + ' class required in root element.');
      }

      if (!this.adapter_.hasNecessaryDom()) {
        throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
      }

      if (this.adapter_.hasClass(OPEN)) {
        this.isOpen_ = true;
      }

      this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
      this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      clearTimeout(this.selectedTriggerTimerId_);
      clearTimeout(this.openAnimationEndTimerId_);
      clearTimeout(this.closeAnimationEndTimerId_);
      // Cancel any currently running animations.
      cancelAnimationFrame(this.animationRequestId_);
      this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
      this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
    }

    /**
     * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
     */

  }, {
    key: 'setAnchorCorner',
    value: function setAnchorCorner(corner) {
      this.anchorCorner_ = corner;
    }

    /**
     * @param {!AnchorMargin} margin 4-plet of margins from anchor.
     */

  }, {
    key: 'setAnchorMargin',
    value: function setAnchorMargin(margin) {
      this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
      this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
      this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
      this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
    }

    /** @param {boolean} rememberSelection */

  }, {
    key: 'setRememberSelection',
    value: function setRememberSelection(rememberSelection) {
      this.rememberSelection_ = rememberSelection;
      this.setSelectedIndex(-1);
    }

    /** @param {boolean} quickOpen */

  }, {
    key: 'setQuickOpen',
    value: function setQuickOpen(quickOpen) {
      this.quickOpen_ = quickOpen;
    }

    /**
     * @param {?number} focusIndex
     * @private
     */

  }, {
    key: 'focusOnOpen_',
    value: function focusOnOpen_(focusIndex) {
      if (focusIndex === null) {
        // If this instance of MDCMenu remembers selections, and the user has
        // made a selection, then focus the last selected item
        if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
          this.adapter_.focusItemAtIndex(this.selectedIndex_);
          return;
        }

        this.adapter_.focus();
        // If that doesn't work, focus first item instead.
        if (!this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(0);
        }
      } else {
        this.adapter_.focusItemAtIndex(focusIndex);
      }
    }

    /**
     * Handle clicks and cancel the menu if not a child list-item
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'handleDocumentClick_',
    value: function handleDocumentClick_(evt) {
      var el = evt.target;

      while (el && el !== document.documentElement) {
        if (this.adapter_.getIndexForEventTarget(el) !== -1) {
          return;
        }
        el = el.parentNode;
      }

      this.adapter_.notifyCancel();
      this.close(evt);
    }
  }, {
    key: 'handleKeyboardDown_',


    /**
     * Handle keys that we want to repeat on hold (tab and arrows).
     * @param {!Event} evt
     * @return {boolean}
     * @private
     */
    value: function handleKeyboardDown_(evt) {
      // Do nothing if Alt, Ctrl or Meta are pressed.
      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
        return true;
      }

      var keyCode = evt.keyCode,
          key = evt.key,
          shiftKey = evt.shiftKey;

      var isTab = key === 'Tab' || keyCode === 9;
      var isArrowUp = key === 'ArrowUp' || keyCode === 38;
      var isArrowDown = key === 'ArrowDown' || keyCode === 40;
      var isSpace = key === 'Space' || keyCode === 32;
      var isEnter = key === 'Enter' || keyCode === 13;
      // The menu needs to know if the keydown event was triggered on the menu
      this.keyDownWithinMenu_ = isEnter || isSpace;

      var focusedItemIndex = this.adapter_.getFocusedItemIndex();
      var lastItemIndex = this.adapter_.getNumberOfItems() - 1;

      if (shiftKey && isTab && focusedItemIndex === 0) {
        this.adapter_.focusItemAtIndex(lastItemIndex);
        evt.preventDefault();
        return false;
      }

      if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
        this.adapter_.focusItemAtIndex(0);
        evt.preventDefault();
        return false;
      }

      // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
      if (isArrowUp || isArrowDown || isSpace) {
        evt.preventDefault();
      }

      if (isArrowUp) {
        if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(lastItemIndex);
        } else {
          this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
        }
      } else if (isArrowDown) {
        if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(0);
        } else {
          this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
        }
      }

      return true;
    }

    /**
     * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
     * @param {!Event} evt
     * @return {boolean}
     * @private
     */

  }, {
    key: 'handleKeyboardUp_',
    value: function handleKeyboardUp_(evt) {
      // Do nothing if Alt, Ctrl or Meta are pressed.
      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
        return true;
      }

      var keyCode = evt.keyCode,
          key = evt.key;

      var isEnter = key === 'Enter' || keyCode === 13;
      var isSpace = key === 'Space' || keyCode === 32;
      var isEscape = key === 'Escape' || keyCode === 27;

      if (isEnter || isSpace) {
        // If the keydown event didn't occur on the menu, then it should
        // disregard the possible selected event.
        if (this.keyDownWithinMenu_) {
          this.handlePossibleSelected_(evt);
        }
        this.keyDownWithinMenu_ = false;
      }

      if (isEscape) {
        this.adapter_.notifyCancel();
        this.close();
      }

      return true;
    }

    /**
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'handlePossibleSelected_',
    value: function handlePossibleSelected_(evt) {
      var _this2 = this;

      if (this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true') {
        return;
      }
      var targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
      if (targetIndex < 0) {
        return;
      }
      // Debounce multiple selections
      if (this.selectedTriggerTimerId_) {
        return;
      }
      this.selectedTriggerTimerId_ = setTimeout(function () {
        _this2.selectedTriggerTimerId_ = 0;
        _this2.close();
        if (_this2.rememberSelection_) {
          _this2.setSelectedIndex(targetIndex);
        }
        _this2.adapter_.notifySelected({ index: targetIndex });
      }, numbers.SELECTED_TRIGGER_DELAY);
    }

    /**
     * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
     */

  }, {
    key: 'getAutoLayoutMeasurements_',
    value: function getAutoLayoutMeasurements_() {
      var anchorRect = this.adapter_.getAnchorDimensions();
      var viewport = this.adapter_.getWindowDimensions();

      return {
        viewport: viewport,
        viewportDistance: {
          top: anchorRect.top,
          right: viewport.width - anchorRect.right,
          left: anchorRect.left,
          bottom: viewport.height - anchorRect.bottom
        },
        anchorHeight: anchorRect.height,
        anchorWidth: anchorRect.width,
        menuHeight: this.dimensions_.height,
        menuWidth: this.dimensions_.width
      };
    }

    /**
     * Computes the corner of the anchor from which to animate and position the menu.
     * @return {Corner}
     * @private
     */

  }, {
    key: 'getOriginCorner_',
    value: function getOriginCorner_() {
      // Defaults: open from the top left.
      var corner = Corner.TOP_LEFT;

      var _measures_ = this.measures_,
          viewportDistance = _measures_.viewportDistance,
          anchorHeight = _measures_.anchorHeight,
          anchorWidth = _measures_.anchorWidth,
          menuHeight = _measures_.menuHeight,
          menuWidth = _measures_.menuWidth;

      var isBottomAligned = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
      var availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
      var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;

      var topOverflow = menuHeight - availableTop;
      var bottomOverflow = menuHeight - availableBottom;
      if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
        corner |= CornerBit.BOTTOM;
      }

      var isRtl = this.adapter_.isRtl();
      var isFlipRtl = Boolean(this.anchorCorner_ & CornerBit.FLIP_RTL);
      var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
      var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
      var availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
      var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;

      var leftOverflow = menuWidth - availableLeft;
      var rightOverflow = menuWidth - availableRight;

      if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
        corner |= CornerBit.RIGHT;
      }

      return corner;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
     * @private
     */

  }, {
    key: 'getHorizontalOriginOffset_',
    value: function getHorizontalOriginOffset_(corner) {
      var anchorWidth = this.measures_.anchorWidth;

      var isRightAligned = Boolean(corner & CornerBit.RIGHT);
      var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
      var x = 0;
      if (isRightAligned) {
        var rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
        x = rightOffset;
      } else {
        var leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
        x = leftOffset;
      }
      return x;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
     * @private
     */

  }, {
    key: 'getVerticalOriginOffset_',
    value: function getVerticalOriginOffset_(corner) {
      var _measures_2 = this.measures_,
          viewport = _measures_2.viewport,
          viewportDistance = _measures_2.viewportDistance,
          anchorHeight = _measures_2.anchorHeight,
          menuHeight = _measures_2.menuHeight;

      var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);
      var MARGIN_TO_EDGE = MDCMenuFoundation.numbers.MARGIN_TO_EDGE;

      var avoidVerticalOverlap = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
      var canOverlapVertically = !avoidVerticalOverlap;
      var y = 0;

      if (isBottomAligned) {
        y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
        // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
        // anchor corner. Bottom margin is ignored in such cases.
        if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
          y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
        }
      } else {
        y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top;
        // adjust for when menu can overlap anchor, but too tall to be aligned to top
        // anchor corners. Top margin is ignored in that case.
        if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
          y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
        }
      }
      return y;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
     * @private
     */

  }, {
    key: 'getMenuMaxHeight_',
    value: function getMenuMaxHeight_(corner) {
      var maxHeight = 0;
      var viewportDistance = this.measures_.viewportDistance;

      var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);

      // When maximum height is not specified, it is handled from css.
      if (this.anchorCorner_ & CornerBit.BOTTOM) {
        if (isBottomAligned) {
          maxHeight = viewportDistance.top + this.anchorMargin_.top;
        } else {
          maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
        }
      }

      return maxHeight;
    }

    /** @private */

  }, {
    key: 'autoPosition_',
    value: function autoPosition_() {
      var _position;

      if (!this.adapter_.hasAnchor()) {
        return;
      }

      // Compute measurements for autoposition methods reuse.
      this.measures_ = this.getAutoLayoutMeasurements_();

      var corner = this.getOriginCorner_();
      var maxMenuHeight = this.getMenuMaxHeight_(corner);
      var verticalAlignment = corner & CornerBit.BOTTOM ? 'bottom' : 'top';
      var horizontalAlignment = corner & CornerBit.RIGHT ? 'right' : 'left';
      var horizontalOffset = this.getHorizontalOriginOffset_(corner);
      var verticalOffset = this.getVerticalOriginOffset_(corner);
      var position = (_position = {}, defineProperty(_position, horizontalAlignment, horizontalOffset ? horizontalOffset + 'px' : '0'), defineProperty(_position, verticalAlignment, verticalOffset ? verticalOffset + 'px' : '0'), _position);
      var _measures_3 = this.measures_,
          anchorWidth = _measures_3.anchorWidth,
          menuHeight = _measures_3.menuHeight,
          menuWidth = _measures_3.menuWidth;
      // Center align when anchor width is comparable or greater than menu, otherwise keep corner.

      if (anchorWidth / menuWidth > numbers.ANCHOR_TO_MENU_WIDTH_RATIO) {
        horizontalAlignment = 'center';
      }

      // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
      // scale animation is "anchored" on the anchor.
      if (!(this.anchorCorner_ & CornerBit.BOTTOM) && Math.abs(verticalOffset / menuHeight) > numbers.OFFSET_TO_MENU_HEIGHT_RATIO) {
        var verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
        var originPercent = corner & CornerBit.BOTTOM ? 100 - verticalOffsetPercent : verticalOffsetPercent;
        verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
      }

      this.adapter_.setTransformOrigin(horizontalAlignment + ' ' + verticalAlignment);
      this.adapter_.setPosition(position);
      this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : '');

      // Clear measures after positioning is complete.
      this.measures_ = null;
    }

    /**
     * Open the menu.
     * @param {{focusIndex: ?number}=} options
     */

  }, {
    key: 'open',
    value: function open() {
      var _this3 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$focusIndex = _ref.focusIndex,
          focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

      this.adapter_.saveFocus();

      if (!this.quickOpen_) {
        this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
      }

      this.animationRequestId_ = requestAnimationFrame(function () {
        _this3.dimensions_ = _this3.adapter_.getInnerDimensions();
        _this3.autoPosition_();
        _this3.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
        _this3.focusOnOpen_(focusIndex);
        _this3.adapter_.registerBodyClickHandler(_this3.documentClickHandler_);
        if (!_this3.quickOpen_) {
          _this3.openAnimationEndTimerId_ = setTimeout(function () {
            _this3.openAnimationEndTimerId_ = 0;
            _this3.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
          }, numbers.TRANSITION_OPEN_DURATION);
        }
      });
      this.isOpen_ = true;
    }

    /**
     * Closes the menu.
     * @param {Event=} evt
     */

  }, {
    key: 'close',
    value: function close() {
      var _this4 = this;

      var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var targetIsDisabled = evt ? this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true' : false;

      if (targetIsDisabled) {
        return;
      }

      this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

      if (!this.quickOpen_) {
        this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
      }

      requestAnimationFrame(function () {
        _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);
        if (!_this4.quickOpen_) {
          _this4.closeAnimationEndTimerId_ = setTimeout(function () {
            _this4.closeAnimationEndTimerId_ = 0;
            _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
          }, numbers.TRANSITION_CLOSE_DURATION);
        }
      });
      this.isOpen_ = false;
      this.adapter_.restoreFocus();
    }

    /** @return {boolean} */

  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.isOpen_;
    }

    /** @return {number} */

  }, {
    key: 'getSelectedIndex',
    value: function getSelectedIndex() {
      return this.selectedIndex_;
    }

    /**
     * @param {number} index Index of the item to set as selected.
     */

  }, {
    key: 'setSelectedIndex',
    value: function setSelectedIndex(index) {
      if (index === this.selectedIndex_) {
        return;
      }

      var prevSelectedIndex = this.selectedIndex_;
      if (prevSelectedIndex >= 0) {
        this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
        this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, cssClasses.SELECTED_LIST_ITEM);
      }

      this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;
      if (this.selectedIndex_ >= 0) {
        this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
        this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, cssClasses.SELECTED_LIST_ITEM);
      }
    }
  }]);
  return MDCMenuFoundation;
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

/** @type {string|undefined} */
var storedTransformPropertyName_ = void 0;

/**
 * Returns the name of the correct transform property to use on the current browser.
 * @param {!Window} globalObj
 * @param {boolean=} forceRefresh
 * @return {string}
 */
function getTransformPropertyName(globalObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

var mdcMenu = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticClass: "mdc-menu mdc-simple-menu", class: _vm.classes, style: _vm.styles, attrs: { "tabindex": "-1" } }, [_c('ul', { ref: "items", staticClass: "mdc-simple-menu__items mdc-list", attrs: { "role": "menu", "aria-hidden": "true" } }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'mdc-menu',
  model: {
    prop: 'open',
    event: 'change'
  },
  props: {
    open: [Boolean, Object],
    'quick-open': Boolean,
    'anchor-corner': [String, Number],
    'anchor-margin': Object
  },
  data: function data() {
    return {
      classes: {},
      styles: {},
      items: []
    };
  },

  watch: {
    open: 'onOpen_',
    quickOpen: function quickOpen(nv) {
      this.foundation.setQuickOpen(nv);
    },
    anchorCorner: function anchorCorner(nv) {
      this.foundation.setAnchorCorner(Number(nv));
    },
    anchorMargin: function anchorMargin(nv) {
      this.foundation.setAnchorMargin(nv);
    }
  },
  mounted: function mounted() {
    var _this = this;

    var refreshItems = function refreshItems() {
      _this.items = [].slice.call(_this.$refs.items.querySelectorAll('.mdc-list-item[role]'));
      _this.$emit('update');
    };
    this.slotObserver = new MutationObserver(function () {
      return refreshItems();
    });
    this.slotObserver.observe(this.$el, {
      childList: true,
      subtree: true
    });

    this._previousFocus = undefined;

    this.foundation = new MDCMenuFoundation({
      addClass: function addClass(className) {
        return _this.$set(_this.classes, className, true);
      },
      removeClass: function removeClass(className) {
        return _this.$delete(_this.classes, className);
      },
      hasClass: function hasClass(className) {
        return _this.$refs.root.classList.contains(className);
      },
      hasNecessaryDom: function hasNecessaryDom() {
        return Boolean(_this.$refs.items);
      },
      getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
        return target.getAttribute(attributeName);
      },
      getInnerDimensions: function getInnerDimensions() {
        return {
          width: _this.$refs.items.offsetWidth,
          height: _this.$refs.items.offsetHeight
        };
      },
      hasAnchor: function hasAnchor() {
        return _this.$refs.root.parentElement && _this.$refs.root.parentElement.classList.contains('mdc-menu-anchor');
      },
      getAnchorDimensions: function getAnchorDimensions() {
        return _this.$refs.root.parentElement.getBoundingClientRect();
      },
      getWindowDimensions: function getWindowDimensions() {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      getNumberOfItems: function getNumberOfItems() {
        return _this.items.length;
      },
      registerInteractionHandler: function registerInteractionHandler(type, handler) {
        return _this.$refs.root.addEventListener(type, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
        return _this.$refs.root.removeEventListener(type, handler);
      },
      registerBodyClickHandler: function registerBodyClickHandler(handler) {
        return document.body.addEventListener('click', handler);
      },
      deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
        return document.body.removeEventListener('click', handler);
      },
      getIndexForEventTarget: function getIndexForEventTarget(target) {
        return _this.items.indexOf(target);
      },
      notifySelected: function notifySelected(evtData) {
        var evt = {
          index: evtData.index,
          item: _this.items[evtData.index]
        };
        _this.$emit('change', false);
        _this.$emit('select', evt);
        emitCustomEvent(_this.$el, MDCMenuFoundation.strings.SELECTED_EVENT, evt);
      },
      notifyCancel: function notifyCancel() {
        _this.$emit('change', false);
        _this.$emit('cancel');
        emitCustomEvent(_this.$el, MDCMenuFoundation.strings.CANCEL_EVENT, {});
      },
      saveFocus: function saveFocus() {
        _this._previousFocus = document.activeElement;
      },
      restoreFocus: function restoreFocus() {
        if (_this._previousFocus) {
          _this._previousFocus.focus();
        }
      },
      isFocused: function isFocused() {
        return document.activeElement === _this.$refs.root;
      },
      focus: function focus() {
        return _this.$refs.root.focus();
      },
      getFocusedItemIndex: function getFocusedItemIndex() {
        return _this.items.indexOf(document.activeElement);
      },
      focusItemAtIndex: function focusItemAtIndex(index) {
        return _this.items[index].focus();
      },
      isRtl: function isRtl() {
        return getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
      },
      setTransformOrigin: function setTransformOrigin(origin) {
        _this.$set(_this.styles, getTransformPropertyName(window) + '-origin', origin);
      },
      setPosition: function setPosition(position) {
        _this.$set(_this.styles, 'left', position.left);
        _this.$set(_this.styles, 'right', position.right);
        _this.$set(_this.styles, 'top', position.top);
        _this.$set(_this.styles, 'bottom', position.bottom);
      },
      setMaxHeight: function setMaxHeight(height) {
        _this.$set(_this.styles, 'max-height', height);
      },
      setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
        _this.items[index].setAttribute(attr, value);
      },
      rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
        _this.items[index].removeAttribute(attr);
      },
      addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
        _this.items[index].classList.add(className);
      },
      rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
        _this.items[index].classList.remove(className);
      }
    });

    refreshItems();
    this.foundation.init();
    if (this.anchorCorner !== void 0) {
      this.foundation.setAnchorCorner(Number(this.anchorCorner));
    }
    if (this.anchorMargin !== void 0) {
      this.foundation.setAnchorMargin(this.anchorMargin);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this._previousFocus = null;
    this.slotObserver.disconnect();
    this.foundation.destroy();
  },


  methods: {
    onOpen_: function onOpen_(value) {
      if (value) {
        this.foundation.open((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : void 0);
      } else {
        this.foundation.close();
      }
    },
    show: function show(options) {
      this.foundation.open(options);
    },
    hide: function hide() {
      this.foundation.close();
    },
    isOpen: function isOpen() {
      return this.foundation ? this.foundation.isOpen() : false;
    }
  }
};

var mdcMenuItem = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-menu-item mdc-list-item", attrs: { "tabindex": _vm.disabled ? '-1' : '0', "aria-disabled": _vm.disabled, "role": "menuitem" } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-menu-item',
  props: {
    disabled: Boolean
  }
};

var mdcMenuDivider = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-menu-divider mdc-list-divider", attrs: { "role": "separator" } });
  }, staticRenderFns: [],
  name: 'mdc-menu-divider'
};

var mdcMenuAnchor = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-menu-anchor" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-menu-anchor'
};

var index = BasePlugin({
  mdcMenu: mdcMenu,
  mdcMenuItem: mdcMenuItem,
  mdcMenuDivider: mdcMenuDivider,
  mdcMenuAnchor: mdcMenuAnchor
});

export default index;
export { mdcMenu, mdcMenuItem, mdcMenuDivider, mdcMenuAnchor };
//# sourceMappingURL=index.js.map
