/**
* @module vue-mdc-adaptertoolbar 0.17.0
* @exports VueMDCToolbar
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCToolbar = factory());
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
      FIXED: 'mdc-toolbar--fixed',
      FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
      FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
      TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
      FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
      FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
      FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
    };

    var strings = {
      TITLE_SELECTOR: '.mdc-toolbar__title',
      ICON_SELECTOR: '.mdc-toolbar__icon',
      FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
      CHANGE_EVENT: 'MDCToolbar:change'
    };

    var numbers = {
      MAX_TITLE_SIZE: 2.125,
      MIN_TITLE_SIZE: 1.25,
      TOOLBAR_ROW_HEIGHT: 64,
      TOOLBAR_ROW_MOBILE_HEIGHT: 56,
      TOOLBAR_MOBILE_BREAKPOINT: 600
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

    var MDCToolbarFoundation = function (_MDCFoundation) {
      inherits(MDCToolbarFoundation, _MDCFoundation);
      createClass(MDCToolbarFoundation, null, [{
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
            hasClass: function hasClass() {
              return (/* className: string */ /* boolean */false
              );
            },
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
            deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
            registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
            deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
            getViewportWidth: function getViewportWidth() {
              return (/* number */0
              );
            },
            getViewportScrollY: function getViewportScrollY() {
              return (/* number */0
              );
            },
            getOffsetHeight: function getOffsetHeight() {
              return (/* number */0
              );
            },
            getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
              return (/* number */0
              );
            },
            notifyChange: function notifyChange() /* evtData: {flexibleExpansionRatio: number} */{},
            setStyle: function setStyle() /* property: string, value: string */{},
            setStyleForTitleElement: function setStyleForTitleElement() /* property: string, value: string */{},
            setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() /* property: string, value: string */{},
            setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() /* property: string, value: string */{}
          };
        }
      }]);

      function MDCToolbarFoundation(adapter) {
        classCallCheck(this, MDCToolbarFoundation);

        var _this = possibleConstructorReturn(this, (MDCToolbarFoundation.__proto__ || Object.getPrototypeOf(MDCToolbarFoundation)).call(this, _extends(MDCToolbarFoundation.defaultAdapter, adapter)));

        _this.resizeHandler_ = function () {
          return _this.checkRowHeight_();
        };
        _this.scrollHandler_ = function () {
          return _this.updateToolbarStyles_();
        };
        _this.checkRowHeightFrame_ = 0;
        _this.scrollFrame_ = 0;
        _this.executedLastChange_ = false;

        _this.calculations_ = {
          toolbarRowHeight: 0,
          // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
          toolbarRatio: 0, // The ratio of toolbar height to row height
          flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
          maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
          scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
          // Derived Heights based on the above key ratios.
          toolbarHeight: 0,
          flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
          maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
          scrollThreshold: 0
        };
        // Toolbar fixed behavior
        // If toolbar is fixed
        _this.fixed_ = false;
        // If fixed is targeted only at the last row
        _this.fixedLastrow_ = false;
        // Toolbar flexible behavior
        // If the first row is flexible
        _this.hasFlexibleRow_ = false;
        // If use the default behavior
        _this.useFlexDefaultBehavior_ = false;
        return _this;
      }

      createClass(MDCToolbarFoundation, [{
        key: 'init',
        value: function init() {
          this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
          this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
          this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
          if (this.hasFlexibleRow_) {
            this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
          }
          this.initKeyRatio_();
          this.setKeyHeights_();
          this.adapter_.registerResizeHandler(this.resizeHandler_);
          this.adapter_.registerScrollHandler(this.scrollHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterResizeHandler(this.resizeHandler_);
          this.adapter_.deregisterScrollHandler(this.scrollHandler_);
        }
      }, {
        key: 'updateAdjustElementStyles',
        value: function updateAdjustElementStyles() {
          if (this.fixed_) {
            this.adapter_.setStyleForFixedAdjustElement('margin-top', this.calculations_.toolbarHeight + 'px');
          }
        }
      }, {
        key: 'getFlexibleExpansionRatio_',
        value: function getFlexibleExpansionRatio_(scrollTop) {
          // To prevent division by zero when there is no flexibleExpansionHeight
          var delta = 0.0001;
          return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
        }
      }, {
        key: 'checkRowHeight_',
        value: function checkRowHeight_() {
          var _this2 = this;

          cancelAnimationFrame(this.checkRowHeightFrame_);
          this.checkRowHeightFrame_ = requestAnimationFrame(function () {
            return _this2.setKeyHeights_();
          });
        }
      }, {
        key: 'setKeyHeights_',
        value: function setKeyHeights_() {
          var newToolbarRowHeight = this.getRowHeight_();
          if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
            this.calculations_.toolbarRowHeight = newToolbarRowHeight;
            this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
            this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
            this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
            this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
            this.updateAdjustElementStyles();
            this.updateToolbarStyles_();
          }
        }
      }, {
        key: 'updateToolbarStyles_',
        value: function updateToolbarStyles_() {
          var _this3 = this;

          cancelAnimationFrame(this.scrollFrame_);
          this.scrollFrame_ = requestAnimationFrame(function () {
            var scrollTop = _this3.adapter_.getViewportScrollY();
            var hasScrolledOutOfThreshold = _this3.scrolledOutOfThreshold_(scrollTop);

            if (hasScrolledOutOfThreshold && _this3.executedLastChange_) {
              return;
            }

            var flexibleExpansionRatio = _this3.getFlexibleExpansionRatio_(scrollTop);

            _this3.updateToolbarFlexibleState_(flexibleExpansionRatio);
            if (_this3.fixedLastrow_) {
              _this3.updateToolbarFixedState_(scrollTop);
            }
            if (_this3.hasFlexibleRow_) {
              _this3.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
            }
            _this3.executedLastChange_ = hasScrolledOutOfThreshold;
            _this3.adapter_.notifyChange({ flexibleExpansionRatio: flexibleExpansionRatio });
          });
        }
      }, {
        key: 'scrolledOutOfThreshold_',
        value: function scrolledOutOfThreshold_(scrollTop) {
          return scrollTop > this.calculations_.scrollThreshold;
        }
      }, {
        key: 'initKeyRatio_',
        value: function initKeyRatio_() {
          var toolbarRowHeight = this.getRowHeight_();
          var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
          this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
          this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
          this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
          this.calculations_.scrollThresholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
        }
      }, {
        key: 'getRowHeight_',
        value: function getRowHeight_() {
          var breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
          return this.adapter_.getViewportWidth() < breakpoint ? MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
        }
      }, {
        key: 'updateToolbarFlexibleState_',
        value: function updateToolbarFlexibleState_(flexibleExpansionRatio) {
          this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
          this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
          if (flexibleExpansionRatio === 1) {
            this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
          } else if (flexibleExpansionRatio === 0) {
            this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
          }
        }
      }, {
        key: 'updateToolbarFixedState_',
        value: function updateToolbarFixedState_(scrollTop) {
          var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
          this.adapter_.setStyle('transform', 'translateY(' + -translateDistance + 'px)');

          if (translateDistance === this.calculations_.maxTranslateYDistance) {
            this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
          } else {
            this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
          }
        }
      }, {
        key: 'updateFlexibleRowElementStyles_',
        value: function updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
          if (this.fixed_) {
            var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
            this.adapter_.setStyleForFlexibleRowElement('height', height + this.calculations_.toolbarRowHeight + 'px');
          }
          if (this.useFlexDefaultBehavior_) {
            this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
          }
        }
      }, {
        key: 'updateElementStylesDefaultBehavior_',
        value: function updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
          var maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
          var minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
          var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

          this.adapter_.setStyleForTitleElement('font-size', currentTitleSize + 'rem');
        }
      }]);
      return MDCToolbarFoundation;
    }(MDCFoundation);

    var mdcToolbar = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('header', { staticClass: "mdc-toolbar-wrapper" }, [_c('div', { ref: "root", class: _vm.rootClasses, style: _vm.rootStyles }, [_vm._t("default")], 2), _vm._v(" "), _vm.fixed || _vm.waterfall || _vm.fixedLastrow ? _c('div', { ref: "fixed-adjust", staticClass: "mdc-toolbar-fixed-adjust", style: _vm.adjustStyles }) : _vm._e()]);
      }, staticRenderFns: [],
      name: 'mdc-toolbar',
      props: {
        fixed: Boolean,
        waterfall: Boolean,
        'fixed-lastrow': Boolean,
        flexible: Boolean,
        'flexible-default': { type: Boolean, default: true }
      },
      data: function data() {
        return {
          rootClasses: {
            'mdc-toolbar': true,
            'mdc-toolbar--fixed': this.fixed || this.waterfall || this.fixedLastrow,
            'mdc-toolbar--waterfall': this.waterfall,
            'mdc-toolbar--fixed-lastrow-only': this.fixedLastrow,
            'mdc-toolbar--flexible': this.flexible,
            'mdc-toolbar--flexible-default-behavior': this.flexible && this.flexibleDefault
          },
          rootStyles: {},
          adjustStyles: {
            // to avoid top margin collapse with :after el
            // 0.1 px should be rounded to 0px
            // TODO: find a better trick
            // height: '0.1px'
          },
          foundation: null
        };
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCToolbarFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.rootClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.rootClasses, className);
          },
          hasClass: function hasClass(className) {
            return _this.$refs.root.classList.contains(className);
          },
          registerScrollHandler: function registerScrollHandler(handler) {
            window.addEventListener('scroll', handler);
          },
          deregisterScrollHandler: function deregisterScrollHandler(handler) {
            window.removeEventListener('scroll', handler);
          },
          registerResizeHandler: function registerResizeHandler(handler) {
            window.addEventListener('resize', handler);
          },
          deregisterResizeHandler: function deregisterResizeHandler(handler) {
            window.removeEventListener('resize', handler);
          },
          getViewportWidth: function getViewportWidth() {
            return window.innerWidth;
          },
          getViewportScrollY: function getViewportScrollY() {
            return window.pageYOffset;
          },
          getOffsetHeight: function getOffsetHeight() {
            return _this.$refs.root.offsetHeight;
          },
          getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
            var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
            return el ? el.offsetHeight : undefined;
          },
          notifyChange: function notifyChange(evtData) {
            _this.$emit('change', evtData);
          },
          setStyle: function setStyle(property, value) {
            _this.$set(_this.rootStyles, property, value);
          },
          setStyleForTitleElement: function setStyleForTitleElement(property, value) {
            var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR);
            if (el) el.style.setProperty(property, value);
          },
          setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(property, value) {
            var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
            if (el) el.style.setProperty(property, value);
          },
          setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(property, value) {
            _this.$set(_this.adjustStyles, property, value);
          }
        });
        this.foundation.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
      }
    };

    var mdcToolbarRow = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-toolbar-row mdc-toolbar__row" }, [_vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-toolbar-row'
    };

    var mdcToolbarSection = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-toolbar-section mdc-toolbar__section", class: _vm.classes }, [_vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-toolbar-section',
      props: {
        'align-start': Boolean,
        'align-end': Boolean,
        'shrink-to-fit': Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-toolbar__section--align-start': this.alignStart,
            'mdc-toolbar__section--align-end': this.alignEnd,
            'mdc-toolbar__section--shrink-to-fit': this.shrinkToFit
          }
        };
      }
    };

    var mdcToolbarMenuIcon = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', _vm._g({ staticClass: "mdc-toolbar-menu-icon mdc-toolbar__menu-icon", class: { 'material-icons': !!_vm.icon } }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
      }, staticRenderFns: [],
      name: 'mdc-toolbar-menu-icon',
      mixins: [DispatchEventMixin],
      props: {
        icon: { type: String, default: 'menu' }
      }
    };

    var mdcToolbarTitle = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', _vm._g({ staticClass: "mdc-toolbar-title mdc-toolbar__title" }, _vm.listeners), [_vm._t("default")], 2);
      }, staticRenderFns: [],
      name: 'mdc-toolbar-title',
      mixins: [DispatchEventMixin]
    };

    var mdcToolbarIcon = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', _vm._g({ staticClass: "mdc-toolbar-icon mdc-toolbar__icon", class: { 'material-icons': !!_vm.icon } }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
      }, staticRenderFns: [],
      name: 'mdc-toolbar-icon',
      mixins: [DispatchEventMixin],
      props: {
        icon: String
      }
    };

    var plugin = BasePlugin({
      mdcToolbar: mdcToolbar,
      mdcToolbarRow: mdcToolbarRow,
      mdcToolbarSection: mdcToolbarSection,
      mdcToolbarMenuIcon: mdcToolbarMenuIcon,
      mdcToolbarTitle: mdcToolbarTitle,
      mdcToolbarIcon: mdcToolbarIcon
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZXZlbnQtbWl4aW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9vbGJhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3Rvb2xiYXIvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci52dWUiLCIuLi8uLi9jb21wb25lbnRzL3Rvb2xiYXIvbWRjLXRvb2xiYXItcm93LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci1zZWN0aW9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci1tZW51LWljb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLXRpdGxlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci1pY29uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogdm0gPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfVxufVxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRXZlbnRNaXhpbiA9IHtcbiAgcHJvcHM6IHtcbiAgICBldmVudDogU3RyaW5nLFxuICAgICdldmVudC10YXJnZXQnOiBPYmplY3QsXG4gICAgJ2V2ZW50LWFyZ3MnOiBBcnJheVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZGlzcGF0Y2hFdmVudChldnQpIHtcbiAgICAgIGV2dCAmJiB0aGlzLiRlbWl0KGV2dC50eXBlLCBldnQpXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGxpc3RlbmVycygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcbiAgICAgICAgY2xpY2s6IGUgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJjb25zdCBzY29wZSA9XG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcblxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XG4gIGJlZm9yZUNyZWF0ZSgpIHtcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBGSVhFRDogJ21kYy10b29sYmFyLS1maXhlZCcsXG4gIEZJWEVEX0xBU1RST1c6ICdtZGMtdG9vbGJhci0tZml4ZWQtbGFzdHJvdy1vbmx5JyxcbiAgRklYRURfQVRfTEFTVF9ST1c6ICdtZGMtdG9vbGJhci0tZml4ZWQtYXQtbGFzdC1yb3cnLFxuICBUT09MQkFSX1JPV19GTEVYSUJMRTogJ21kYy10b29sYmFyLS1mbGV4aWJsZScsXG4gIEZMRVhJQkxFX0RFRkFVTFRfQkVIQVZJT1I6ICdtZGMtdG9vbGJhci0tZmxleGlibGUtZGVmYXVsdC1iZWhhdmlvcicsXG4gIEZMRVhJQkxFX01BWDogJ21kYy10b29sYmFyLS1mbGV4aWJsZS1zcGFjZS1tYXhpbWl6ZWQnLFxuICBGTEVYSUJMRV9NSU46ICdtZGMtdG9vbGJhci0tZmxleGlibGUtc3BhY2UtbWluaW1pemVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBUSVRMRV9TRUxFQ1RPUjogJy5tZGMtdG9vbGJhcl9fdGl0bGUnLFxuICBJQ09OX1NFTEVDVE9SOiAnLm1kYy10b29sYmFyX19pY29uJyxcbiAgRklSU1RfUk9XX1NFTEVDVE9SOiAnLm1kYy10b29sYmFyX19yb3c6Zmlyc3QtY2hpbGQnLFxuICBDSEFOR0VfRVZFTlQ6ICdNRENUb29sYmFyOmNoYW5nZScsXG59O1xuXG5leHBvcnQgY29uc3QgbnVtYmVycyA9IHtcbiAgTUFYX1RJVExFX1NJWkU6IDIuMTI1LFxuICBNSU5fVElUTEVfU0laRTogMS4yNSxcbiAgVE9PTEJBUl9ST1dfSEVJR0hUOiA2NCxcbiAgVE9PTEJBUl9ST1dfTU9CSUxFX0hFSUdIVDogNTYsXG4gIFRPT0xCQVJfTU9CSUxFX0JSRUFLUE9JTlQ6IDYwMCxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURDVG9vbGJhckZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclNjcm9sbEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBnZXRWaWV3cG9ydFdpZHRoOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIGdldFZpZXdwb3J0U2Nyb2xsWTogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBnZXRPZmZzZXRIZWlnaHQ6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0Rmlyc3RSb3dFbGVtZW50T2Zmc2V0SGVpZ2h0OiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIG5vdGlmeUNoYW5nZTogKC8qIGV2dERhdGE6IHtmbGV4aWJsZUV4cGFuc2lvblJhdGlvOiBudW1iZXJ9ICovKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlOiAoLyogcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBzZXRTdHlsZUZvclRpdGxlRWxlbWVudDogKC8qIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0U3R5bGVGb3JGbGV4aWJsZVJvd0VsZW1lbnQ6ICgvKiBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlRm9yRml4ZWRBZGp1c3RFbGVtZW50OiAoLyogcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMuY2hlY2tSb3dIZWlnaHRfKCk7XG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyXyA9ICgpID0+IHRoaXMudXBkYXRlVG9vbGJhclN0eWxlc18oKTtcbiAgICB0aGlzLmNoZWNrUm93SGVpZ2h0RnJhbWVfID0gMDtcbiAgICB0aGlzLnNjcm9sbEZyYW1lXyA9IDA7XG4gICAgdGhpcy5leGVjdXRlZExhc3RDaGFuZ2VfID0gZmFsc2U7XG5cbiAgICB0aGlzLmNhbGN1bGF0aW9uc18gPSB7XG4gICAgICB0b29sYmFyUm93SGVpZ2h0OiAwLFxuICAgICAgLy8gQ2FsY3VsYXRlZCBIZWlnaHQgcmF0aW8uIFdlIHVzZSByYXRpbyB0byBjYWxjdWxhdGUgY29ycmVzcG9uZGluZyBoZWlnaHRzIGluIHJlc2l6ZSBldmVudC5cbiAgICAgIHRvb2xiYXJSYXRpbzogMCwgLy8gVGhlIHJhdGlvIG9mIHRvb2xiYXIgaGVpZ2h0IHRvIHJvdyBoZWlnaHRcbiAgICAgIGZsZXhpYmxlRXhwYW5zaW9uUmF0aW86IDAsIC8vIFRoZSByYXRpbyBvZiBmbGV4aWJsZSBzcGFjZSBoZWlnaHQgdG8gcm93IGhlaWdodFxuICAgICAgbWF4VHJhbnNsYXRlWVJhdGlvOiAwLCAvLyBUaGUgcmF0aW8gb2YgbWF4IHRvb2xiYXIgbW92ZSB1cCBkaXN0YW5jZSB0byByb3cgaGVpZ2h0XG4gICAgICBzY3JvbGxUaHJlc2hvbGRSYXRpbzogMCwgLy8gVGhlIHJhdGlvIG9mIG1heCBzY3JvbGxUb3AgdGhhdCB3ZSBzaG91bGQgbGlzdGVuIHRvIHRvIHJvdyBoZWlnaHRcbiAgICAgIC8vIERlcml2ZWQgSGVpZ2h0cyBiYXNlZCBvbiB0aGUgYWJvdmUga2V5IHJhdGlvcy5cbiAgICAgIHRvb2xiYXJIZWlnaHQ6IDAsXG4gICAgICBmbGV4aWJsZUV4cGFuc2lvbkhlaWdodDogMCwgLy8gRmxleGlibGUgcm93IG1pbnVzIHRvb2xiYXIgaGVpZ2h0IChkZXJpdmVkKVxuICAgICAgbWF4VHJhbnNsYXRlWURpc3RhbmNlOiAwLCAvLyBXaGVuIHRvb2xiYXIgb25seSBmaXggbGFzdCByb3cgKGRlcml2ZWQpXG4gICAgICBzY3JvbGxUaHJlc2hvbGQ6IDAsXG4gICAgfTtcbiAgICAvLyBUb29sYmFyIGZpeGVkIGJlaGF2aW9yXG4gICAgLy8gSWYgdG9vbGJhciBpcyBmaXhlZFxuICAgIHRoaXMuZml4ZWRfID0gZmFsc2U7XG4gICAgLy8gSWYgZml4ZWQgaXMgdGFyZ2V0ZWQgb25seSBhdCB0aGUgbGFzdCByb3dcbiAgICB0aGlzLmZpeGVkTGFzdHJvd18gPSBmYWxzZTtcbiAgICAvLyBUb29sYmFyIGZsZXhpYmxlIGJlaGF2aW9yXG4gICAgLy8gSWYgdGhlIGZpcnN0IHJvdyBpcyBmbGV4aWJsZVxuICAgIHRoaXMuaGFzRmxleGlibGVSb3dfID0gZmFsc2U7XG4gICAgLy8gSWYgdXNlIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG4gICAgdGhpcy51c2VGbGV4RGVmYXVsdEJlaGF2aW9yXyA9IGZhbHNlO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmZpeGVkXyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GSVhFRCk7XG4gICAgdGhpcy5maXhlZExhc3Ryb3dfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZJWEVEX0xBU1RST1cpICYgdGhpcy5maXhlZF87XG4gICAgdGhpcy5oYXNGbGV4aWJsZVJvd18gPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuVE9PTEJBUl9ST1dfRkxFWElCTEUpO1xuICAgIGlmICh0aGlzLmhhc0ZsZXhpYmxlUm93Xykge1xuICAgICAgdGhpcy51c2VGbGV4RGVmYXVsdEJlaGF2aW9yXyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GTEVYSUJMRV9ERUZBVUxUX0JFSEFWSU9SKTtcbiAgICB9XG4gICAgdGhpcy5pbml0S2V5UmF0aW9fKCk7XG4gICAgdGhpcy5zZXRLZXlIZWlnaHRzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJTY3JvbGxIYW5kbGVyKHRoaXMuc2Nyb2xsSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gIH1cblxuICB1cGRhdGVBZGp1c3RFbGVtZW50U3R5bGVzKCkge1xuICAgIGlmICh0aGlzLmZpeGVkXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZUZvckZpeGVkQWRqdXN0RWxlbWVudCgnbWFyZ2luLXRvcCcsIGAke3RoaXMuY2FsY3VsYXRpb25zXy50b29sYmFySGVpZ2h0fXB4YCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RmxleGlibGVFeHBhbnNpb25SYXRpb18oc2Nyb2xsVG9wKSB7XG4gICAgLy8gVG8gcHJldmVudCBkaXZpc2lvbiBieSB6ZXJvIHdoZW4gdGhlcmUgaXMgbm8gZmxleGlibGVFeHBhbnNpb25IZWlnaHRcbiAgICBjb25zdCBkZWx0YSA9IDAuMDAwMTtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgMSAtIHNjcm9sbFRvcCAvICh0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25IZWlnaHQgKyBkZWx0YSkpO1xuICB9XG5cbiAgY2hlY2tSb3dIZWlnaHRfKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuY2hlY2tSb3dIZWlnaHRGcmFtZV8pO1xuICAgIHRoaXMuY2hlY2tSb3dIZWlnaHRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5zZXRLZXlIZWlnaHRzXygpKTtcbiAgfVxuXG4gIHNldEtleUhlaWdodHNfKCkge1xuICAgIGNvbnN0IG5ld1Rvb2xiYXJSb3dIZWlnaHQgPSB0aGlzLmdldFJvd0hlaWdodF8oKTtcbiAgICBpZiAobmV3VG9vbGJhclJvd0hlaWdodCAhPT0gdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHQpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUm93SGVpZ2h0ID0gbmV3VG9vbGJhclJvd0hlaWdodDtcbiAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFySGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSYXRpbyAqIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUm93SGVpZ2h0O1xuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLmZsZXhpYmxlRXhwYW5zaW9uSGVpZ2h0ID1cbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLmZsZXhpYmxlRXhwYW5zaW9uUmF0aW8gKiB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodDtcbiAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5tYXhUcmFuc2xhdGVZRGlzdGFuY2UgPVxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uc18ubWF4VHJhbnNsYXRlWVJhdGlvICogdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHQ7XG4gICAgICB0aGlzLmNhbGN1bGF0aW9uc18uc2Nyb2xsVGhyZXNob2xkID1cbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLnNjcm9sbFRocmVzaG9sZFJhdGlvICogdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHQ7XG4gICAgICB0aGlzLnVwZGF0ZUFkanVzdEVsZW1lbnRTdHlsZXMoKTtcbiAgICAgIHRoaXMudXBkYXRlVG9vbGJhclN0eWxlc18oKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVUb29sYmFyU3R5bGVzXygpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnNjcm9sbEZyYW1lXyk7XG4gICAgdGhpcy5zY3JvbGxGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5hZGFwdGVyXy5nZXRWaWV3cG9ydFNjcm9sbFkoKTtcbiAgICAgIGNvbnN0IGhhc1Njcm9sbGVkT3V0T2ZUaHJlc2hvbGQgPSB0aGlzLnNjcm9sbGVkT3V0T2ZUaHJlc2hvbGRfKHNjcm9sbFRvcCk7XG5cbiAgICAgIGlmIChoYXNTY3JvbGxlZE91dE9mVGhyZXNob2xkICYmIHRoaXMuZXhlY3V0ZWRMYXN0Q2hhbmdlXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8gPSB0aGlzLmdldEZsZXhpYmxlRXhwYW5zaW9uUmF0aW9fKHNjcm9sbFRvcCk7XG5cbiAgICAgIHRoaXMudXBkYXRlVG9vbGJhckZsZXhpYmxlU3RhdGVfKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8pO1xuICAgICAgaWYgKHRoaXMuZml4ZWRMYXN0cm93Xykge1xuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJGaXhlZFN0YXRlXyhzY3JvbGxUb3ApO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaGFzRmxleGlibGVSb3dfKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRmxleGlibGVSb3dFbGVtZW50U3R5bGVzXyhmbGV4aWJsZUV4cGFuc2lvblJhdGlvKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXhlY3V0ZWRMYXN0Q2hhbmdlXyA9IGhhc1Njcm9sbGVkT3V0T2ZUaHJlc2hvbGQ7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSh7ZmxleGlibGVFeHBhbnNpb25SYXRpbzogZmxleGlibGVFeHBhbnNpb25SYXRpb30pO1xuICAgIH0pO1xuICB9XG5cbiAgc2Nyb2xsZWRPdXRPZlRocmVzaG9sZF8oc2Nyb2xsVG9wKSB7XG4gICAgcmV0dXJuIHNjcm9sbFRvcCA+IHRoaXMuY2FsY3VsYXRpb25zXy5zY3JvbGxUaHJlc2hvbGQ7XG4gIH1cblxuICBpbml0S2V5UmF0aW9fKCkge1xuICAgIGNvbnN0IHRvb2xiYXJSb3dIZWlnaHQgPSB0aGlzLmdldFJvd0hlaWdodF8oKTtcbiAgICBjb25zdCBmaXJzdFJvd01heFJhdGlvID0gdGhpcy5hZGFwdGVyXy5nZXRGaXJzdFJvd0VsZW1lbnRPZmZzZXRIZWlnaHQoKSAvIHRvb2xiYXJSb3dIZWlnaHQ7XG4gICAgdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSYXRpbyA9IHRoaXMuYWRhcHRlcl8uZ2V0T2Zmc2V0SGVpZ2h0KCkgLyB0b29sYmFyUm93SGVpZ2h0O1xuICAgIHRoaXMuY2FsY3VsYXRpb25zXy5mbGV4aWJsZUV4cGFuc2lvblJhdGlvID0gZmlyc3RSb3dNYXhSYXRpbyAtIDE7XG4gICAgdGhpcy5jYWxjdWxhdGlvbnNfLm1heFRyYW5zbGF0ZVlSYXRpbyA9XG4gICAgICB0aGlzLmZpeGVkTGFzdHJvd18gPyB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJhdGlvIC0gZmlyc3RSb3dNYXhSYXRpbyA6IDA7XG4gICAgdGhpcy5jYWxjdWxhdGlvbnNfLnNjcm9sbFRocmVzaG9sZFJhdGlvID1cbiAgICAgICh0aGlzLmZpeGVkTGFzdHJvd18gPyB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJhdGlvIDogZmlyc3RSb3dNYXhSYXRpbykgLSAxO1xuICB9XG5cbiAgZ2V0Um93SGVpZ2h0XygpIHtcbiAgICBjb25zdCBicmVha3BvaW50ID0gTURDVG9vbGJhckZvdW5kYXRpb24ubnVtYmVycy5UT09MQkFSX01PQklMRV9CUkVBS1BPSU5UO1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0V2lkdGgoKSA8IGJyZWFrcG9pbnQgP1xuICAgICAgTURDVG9vbGJhckZvdW5kYXRpb24ubnVtYmVycy5UT09MQkFSX1JPV19NT0JJTEVfSEVJR0hUIDogTURDVG9vbGJhckZvdW5kYXRpb24ubnVtYmVycy5UT09MQkFSX1JPV19IRUlHSFQ7XG4gIH1cblxuICB1cGRhdGVUb29sYmFyRmxleGlibGVTdGF0ZV8oZmxleGlibGVFeHBhbnNpb25SYXRpbykge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GTEVYSUJMRV9NQVgpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GTEVYSUJMRV9NSU4pO1xuICAgIGlmIChmbGV4aWJsZUV4cGFuc2lvblJhdGlvID09PSAxKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkxFWElCTEVfTUFYKTtcbiAgICB9IGVsc2UgaWYgKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8gPT09IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GTEVYSUJMRV9NSU4pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVRvb2xiYXJGaXhlZFN0YXRlXyhzY3JvbGxUb3ApIHtcbiAgICBjb25zdCB0cmFuc2xhdGVEaXN0YW5jZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKFxuICAgICAgc2Nyb2xsVG9wIC0gdGhpcy5jYWxjdWxhdGlvbnNfLmZsZXhpYmxlRXhwYW5zaW9uSGVpZ2h0LFxuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLm1heFRyYW5zbGF0ZVlEaXN0YW5jZSkpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGUoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGVZKCR7LXRyYW5zbGF0ZURpc3RhbmNlfXB4KWApO1xuXG4gICAgaWYgKHRyYW5zbGF0ZURpc3RhbmNlID09PSB0aGlzLmNhbGN1bGF0aW9uc18ubWF4VHJhbnNsYXRlWURpc3RhbmNlKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRklYRURfQVRfTEFTVF9ST1cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRklYRURfQVRfTEFTVF9ST1cpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUZsZXhpYmxlUm93RWxlbWVudFN0eWxlc18oZmxleGlibGVFeHBhbnNpb25SYXRpbykge1xuICAgIGlmICh0aGlzLmZpeGVkXykge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGlvbnNfLmZsZXhpYmxlRXhwYW5zaW9uSGVpZ2h0ICogZmxleGlibGVFeHBhbnNpb25SYXRpbztcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVGb3JGbGV4aWJsZVJvd0VsZW1lbnQoJ2hlaWdodCcsXG4gICAgICAgIGAke2hlaWdodCArIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUm93SGVpZ2h0fXB4YCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnVzZUZsZXhEZWZhdWx0QmVoYXZpb3JfKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVsZW1lbnRTdHlsZXNEZWZhdWx0QmVoYXZpb3JfKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUVsZW1lbnRTdHlsZXNEZWZhdWx0QmVoYXZpb3JfKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8pIHtcbiAgICBjb25zdCBtYXhUaXRsZVNpemUgPSBNRENUb29sYmFyRm91bmRhdGlvbi5udW1iZXJzLk1BWF9USVRMRV9TSVpFO1xuICAgIGNvbnN0IG1pblRpdGxlU2l6ZSA9IE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLm51bWJlcnMuTUlOX1RJVExFX1NJWkU7XG4gICAgY29uc3QgY3VycmVudFRpdGxlU2l6ZSA9IChtYXhUaXRsZVNpemUgLSBtaW5UaXRsZVNpemUpICogZmxleGlibGVFeHBhbnNpb25SYXRpbyArIG1pblRpdGxlU2l6ZTtcblxuICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVGb3JUaXRsZUVsZW1lbnQoJ2ZvbnQtc2l6ZScsIGAke2N1cnJlbnRUaXRsZVNpemV9cmVtYCk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGhlYWRlciBjbGFzcz1cIm1kYy10b29sYmFyLXdyYXBwZXJcIj5cbiAgICA8IS0tVG9vbGJhci0tPlxuICAgIDxkaXYgXG4gICAgICByZWY9XCJyb290XCIgXG4gICAgICA6Y2xhc3M9XCJyb290Q2xhc3Nlc1wiIFxuICAgICAgOnN0eWxlPVwicm9vdFN0eWxlc1wiPlxuICAgICAgPHNsb3QvPlxuICAgIDwvZGl2PlxuICAgIDwhLS0gRml4ZWQgQWRqdXN0IEVsZW1lbnQtLT5cbiAgICA8ZGl2IFxuICAgICAgdi1pZj1cImZpeGVkIHx8IHdhdGVyZmFsbCB8fCBmaXhlZExhc3Ryb3dcIiBcbiAgICAgIHJlZj1cImZpeGVkLWFkanVzdFwiIFxuICAgICAgOnN0eWxlPVwiYWRqdXN0U3R5bGVzXCJcbiAgICAgIGNsYXNzPVwibWRjLXRvb2xiYXItZml4ZWQtYWRqdXN0XCIvPlxuICA8L2hlYWRlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDVG9vbGJhckZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3Rvb2xiYXIvZm91bmRhdGlvbidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXRvb2xiYXInLFxuICBwcm9wczoge1xuICAgIGZpeGVkOiBCb29sZWFuLFxuICAgIHdhdGVyZmFsbDogQm9vbGVhbixcbiAgICAnZml4ZWQtbGFzdHJvdyc6IEJvb2xlYW4sXG4gICAgZmxleGlibGU6IEJvb2xlYW4sXG4gICAgJ2ZsZXhpYmxlLWRlZmF1bHQnOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICByb290Q2xhc3Nlczoge1xuICAgICAgICAnbWRjLXRvb2xiYXInOiB0cnVlLFxuICAgICAgICAnbWRjLXRvb2xiYXItLWZpeGVkJzogdGhpcy5maXhlZCB8fCB0aGlzLndhdGVyZmFsbCB8fCB0aGlzLmZpeGVkTGFzdHJvdyxcbiAgICAgICAgJ21kYy10b29sYmFyLS13YXRlcmZhbGwnOiB0aGlzLndhdGVyZmFsbCxcbiAgICAgICAgJ21kYy10b29sYmFyLS1maXhlZC1sYXN0cm93LW9ubHknOiB0aGlzLmZpeGVkTGFzdHJvdyxcbiAgICAgICAgJ21kYy10b29sYmFyLS1mbGV4aWJsZSc6IHRoaXMuZmxleGlibGUsXG4gICAgICAgICdtZGMtdG9vbGJhci0tZmxleGlibGUtZGVmYXVsdC1iZWhhdmlvcic6XG4gICAgICAgICAgdGhpcy5mbGV4aWJsZSAmJiB0aGlzLmZsZXhpYmxlRGVmYXVsdFxuICAgICAgfSxcbiAgICAgIHJvb3RTdHlsZXM6IHt9LFxuICAgICAgYWRqdXN0U3R5bGVzOiB7XG4gICAgICAgIC8vIHRvIGF2b2lkIHRvcCBtYXJnaW4gY29sbGFwc2Ugd2l0aCA6YWZ0ZXIgZWxcbiAgICAgICAgLy8gMC4xIHB4IHNob3VsZCBiZSByb3VuZGVkIHRvIDBweFxuICAgICAgICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHRyaWNrXG4gICAgICAgIC8vIGhlaWdodDogJzAuMXB4J1xuICAgICAgfSxcbiAgICAgIGZvdW5kYXRpb246IG51bGxcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1Rvb2xiYXJGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5yb290Q2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5yb290LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlclNjcm9sbEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGdldFZpZXdwb3J0V2lkdGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICB9LFxuICAgICAgZ2V0Vmlld3BvcnRTY3JvbGxZOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgIH0sXG4gICAgICBnZXRPZmZzZXRIZWlnaHQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMucm9vdC5vZmZzZXRIZWlnaHRcbiAgICAgIH0sXG4gICAgICBnZXRGaXJzdFJvd0VsZW1lbnRPZmZzZXRIZWlnaHQ6ICgpID0+IHtcbiAgICAgICAgbGV0IGVsID0gdGhpcy4kcmVmcy5yb290LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgTURDVG9vbGJhckZvdW5kYXRpb24uc3RyaW5ncy5GSVJTVF9ST1dfU0VMRUNUT1JcbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gZWwgPyBlbC5vZmZzZXRIZWlnaHQgOiB1bmRlZmluZWRcbiAgICAgIH0sXG4gICAgICBub3RpZnlDaGFuZ2U6IGV2dERhdGEgPT4ge1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBldnREYXRhKVxuICAgICAgfSxcbiAgICAgIHNldFN0eWxlOiAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnJvb3RTdHlsZXMsIHByb3BlcnR5LCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBzZXRTdHlsZUZvclRpdGxlRWxlbWVudDogKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgZWwgPSB0aGlzLiRyZWZzLnJvb3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBNRENUb29sYmFyRm91bmRhdGlvbi5zdHJpbmdzLlRJVExFX1NFTEVDVE9SXG4gICAgICAgIClcbiAgICAgICAgaWYgKGVsKSBlbC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0U3R5bGVGb3JGbGV4aWJsZVJvd0VsZW1lbnQ6IChwcm9wZXJ0eSwgdmFsdWUpID0+IHtcbiAgICAgICAgbGV0IGVsID0gdGhpcy4kcmVmcy5yb290LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgTURDVG9vbGJhckZvdW5kYXRpb24uc3RyaW5ncy5GSVJTVF9ST1dfU0VMRUNUT1JcbiAgICAgICAgKVxuICAgICAgICBpZiAoZWwpIGVsLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBzZXRTdHlsZUZvckZpeGVkQWRqdXN0RWxlbWVudDogKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5hZGp1c3RTdHlsZXMsIHByb3BlcnR5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibWRjLXRvb2xiYXItcm93IG1kYy10b29sYmFyX19yb3dcIj5cbiAgICA8c2xvdC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10b29sYmFyLXJvdydcbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8c2VjdGlvbiBcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXG4gICAgY2xhc3M9XCJtZGMtdG9vbGJhci1zZWN0aW9uIG1kYy10b29sYmFyX19zZWN0aW9uXCI+XG4gICAgPHNsb3QvPlxuICA8L3NlY3Rpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXRvb2xiYXItc2VjdGlvbicsXG4gIHByb3BzOiB7XG4gICAgJ2FsaWduLXN0YXJ0JzogQm9vbGVhbixcbiAgICAnYWxpZ24tZW5kJzogQm9vbGVhbixcbiAgICAnc2hyaW5rLXRvLWZpdCc6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLXRvb2xiYXJfX3NlY3Rpb24tLWFsaWduLXN0YXJ0JzogdGhpcy5hbGlnblN0YXJ0LFxuICAgICAgICAnbWRjLXRvb2xiYXJfX3NlY3Rpb24tLWFsaWduLWVuZCc6IHRoaXMuYWxpZ25FbmQsXG4gICAgICAgICdtZGMtdG9vbGJhcl9fc2VjdGlvbi0tc2hyaW5rLXRvLWZpdCc6IHRoaXMuc2hyaW5rVG9GaXRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8YSBcbiAgICA6Y2xhc3M9XCJ7J21hdGVyaWFsLWljb25zJzohIWljb259XCJcbiAgICBjbGFzcz1cIm1kYy10b29sYmFyLW1lbnUtaWNvbiBtZGMtdG9vbGJhcl9fbWVudS1pY29uXCJcbiAgICB2LW9uPVwibGlzdGVuZXJzXCI+XG4gICAgPHNsb3Q+e3sgaWNvbiB9fTwvc2xvdD5cbiAgPC9hPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IERpc3BhdGNoRXZlbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10b29sYmFyLW1lbnUtaWNvbicsXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgaWNvbjogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdtZW51JyB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8YSBcbiAgICBjbGFzcz1cIm1kYy10b29sYmFyLXRpdGxlIG1kYy10b29sYmFyX190aXRsZVwiIFxuICAgIHYtb249XCJsaXN0ZW5lcnNcIj5cbiAgICA8c2xvdC8+XG4gIDwvYT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBEaXNwYXRjaEV2ZW50TWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtdG9vbGJhci10aXRsZScsXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbl1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8YSBcbiAgICA6Y2xhc3M9XCJ7J21hdGVyaWFsLWljb25zJzohIWljb259XCIgXG4gICAgY2xhc3M9XCJtZGMtdG9vbGJhci1pY29uIG1kYy10b29sYmFyX19pY29uXCJcbiAgICB2LW9uPVwibGlzdGVuZXJzXCI+XG4gICAgPHNsb3Q+e3sgaWNvbiB9fTwvc2xvdD5cbiAgPC9hPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IERpc3BhdGNoRXZlbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10b29sYmFyLWljb24nLFxuICBtaXhpbnM6IFtEaXNwYXRjaEV2ZW50TWl4aW5dLFxuICBwcm9wczoge1xuICAgIGljb246IFN0cmluZ1xuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1Rvb2xiYXIgZnJvbSAnLi9tZGMtdG9vbGJhci52dWUnXG5pbXBvcnQgbWRjVG9vbGJhclJvdyBmcm9tICcuL21kYy10b29sYmFyLXJvdy52dWUnXG5pbXBvcnQgbWRjVG9vbGJhclNlY3Rpb24gZnJvbSAnLi9tZGMtdG9vbGJhci1zZWN0aW9uLnZ1ZSdcbmltcG9ydCBtZGNUb29sYmFyTWVudUljb24gZnJvbSAnLi9tZGMtdG9vbGJhci1tZW51LWljb24udnVlJ1xuaW1wb3J0IG1kY1Rvb2xiYXJUaXRsZSBmcm9tICcuL21kYy10b29sYmFyLXRpdGxlLnZ1ZSdcbmltcG9ydCBtZGNUb29sYmFySWNvbiBmcm9tICcuL21kYy10b29sYmFyLWljb24udnVlJ1xuXG5leHBvcnQge1xuICBtZGNUb29sYmFyLFxuICBtZGNUb29sYmFyUm93LFxuICBtZGNUb29sYmFyU2VjdGlvbixcbiAgbWRjVG9vbGJhck1lbnVJY29uLFxuICBtZGNUb29sYmFyVGl0bGUsXG4gIG1kY1Rvb2xiYXJJY29uXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNUb29sYmFyLFxuICBtZGNUb29sYmFyUm93LFxuICBtZGNUb29sYmFyU2VjdGlvbixcbiAgbWRjVG9vbGJhck1lbnVJY29uLFxuICBtZGNUb29sYmFyVGl0bGUsXG4gIG1kY1Rvb2xiYXJJY29uXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiRGlzcGF0Y2hFdmVudE1peGluIiwicHJvcHMiLCJldmVudCIsIlN0cmluZyIsIk9iamVjdCIsIkFycmF5IiwibWV0aG9kcyIsImRpc3BhdGNoRXZlbnQiLCJldnQiLCIkZW1pdCIsInR5cGUiLCJ0YXJnZXQiLCJldmVudFRhcmdldCIsIiRyb290IiwiYXJncyIsImV2ZW50QXJncyIsImNvbXB1dGVkIiwibGlzdGVuZXJzIiwiJGxpc3RlbmVycyIsImNsaWNrIiwiZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiY3NzQ2xhc3NlcyIsIkZJWEVEIiwiRklYRURfTEFTVFJPVyIsIkZJWEVEX0FUX0xBU1RfUk9XIiwiVE9PTEJBUl9ST1dfRkxFWElCTEUiLCJGTEVYSUJMRV9ERUZBVUxUX0JFSEFWSU9SIiwiRkxFWElCTEVfTUFYIiwiRkxFWElCTEVfTUlOIiwic3RyaW5ncyIsIlRJVExFX1NFTEVDVE9SIiwiSUNPTl9TRUxFQ1RPUiIsIkZJUlNUX1JPV19TRUxFQ1RPUiIsIkNIQU5HRV9FVkVOVCIsIm51bWJlcnMiLCJNQVhfVElUTEVfU0laRSIsIk1JTl9USVRMRV9TSVpFIiwiVE9PTEJBUl9ST1dfSEVJR0hUIiwiVE9PTEJBUl9ST1dfTU9CSUxFX0hFSUdIVCIsIlRPT0xCQVJfTU9CSUxFX0JSRUFLUE9JTlQiLCJNRENUb29sYmFyRm91bmRhdGlvbiIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInJlZ2lzdGVyU2Nyb2xsSGFuZGxlciIsImRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJnZXRWaWV3cG9ydFdpZHRoIiwiZ2V0Vmlld3BvcnRTY3JvbGxZIiwiZ2V0T2Zmc2V0SGVpZ2h0IiwiZ2V0Rmlyc3RSb3dFbGVtZW50T2Zmc2V0SGVpZ2h0Iiwibm90aWZ5Q2hhbmdlIiwic2V0U3R5bGUiLCJzZXRTdHlsZUZvclRpdGxlRWxlbWVudCIsInNldFN0eWxlRm9yRmxleGlibGVSb3dFbGVtZW50Iiwic2V0U3R5bGVGb3JGaXhlZEFkanVzdEVsZW1lbnQiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwicmVzaXplSGFuZGxlcl8iLCJjaGVja1Jvd0hlaWdodF8iLCJzY3JvbGxIYW5kbGVyXyIsInVwZGF0ZVRvb2xiYXJTdHlsZXNfIiwiY2hlY2tSb3dIZWlnaHRGcmFtZV8iLCJzY3JvbGxGcmFtZV8iLCJleGVjdXRlZExhc3RDaGFuZ2VfIiwiY2FsY3VsYXRpb25zXyIsInRvb2xiYXJSb3dIZWlnaHQiLCJ0b29sYmFyUmF0aW8iLCJmbGV4aWJsZUV4cGFuc2lvblJhdGlvIiwibWF4VHJhbnNsYXRlWVJhdGlvIiwic2Nyb2xsVGhyZXNob2xkUmF0aW8iLCJ0b29sYmFySGVpZ2h0IiwiZmxleGlibGVFeHBhbnNpb25IZWlnaHQiLCJtYXhUcmFuc2xhdGVZRGlzdGFuY2UiLCJzY3JvbGxUaHJlc2hvbGQiLCJmaXhlZF8iLCJmaXhlZExhc3Ryb3dfIiwiaGFzRmxleGlibGVSb3dfIiwidXNlRmxleERlZmF1bHRCZWhhdmlvcl8iLCJpbml0S2V5UmF0aW9fIiwic2V0S2V5SGVpZ2h0c18iLCJzY3JvbGxUb3AiLCJkZWx0YSIsIm1heCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibmV3VG9vbGJhclJvd0hlaWdodCIsImdldFJvd0hlaWdodF8iLCJ1cGRhdGVBZGp1c3RFbGVtZW50U3R5bGVzIiwiaGFzU2Nyb2xsZWRPdXRPZlRocmVzaG9sZCIsInNjcm9sbGVkT3V0T2ZUaHJlc2hvbGRfIiwiZ2V0RmxleGlibGVFeHBhbnNpb25SYXRpb18iLCJ1cGRhdGVUb29sYmFyRmxleGlibGVTdGF0ZV8iLCJ1cGRhdGVUb29sYmFyRml4ZWRTdGF0ZV8iLCJ1cGRhdGVGbGV4aWJsZVJvd0VsZW1lbnRTdHlsZXNfIiwiZmlyc3RSb3dNYXhSYXRpbyIsImJyZWFrcG9pbnQiLCJ0cmFuc2xhdGVEaXN0YW5jZSIsIm1pbiIsImhlaWdodCIsInVwZGF0ZUVsZW1lbnRTdHlsZXNEZWZhdWx0QmVoYXZpb3JfIiwibWF4VGl0bGVTaXplIiwibWluVGl0bGVTaXplIiwiY3VycmVudFRpdGxlU2l6ZSIsInJlbmRlciIsImZpeGVkIiwiQm9vbGVhbiIsIndhdGVyZmFsbCIsImZsZXhpYmxlIiwiZGVmYXVsdCIsImRhdGEiLCJyb290Q2xhc3NlcyIsImZpeGVkTGFzdHJvdyIsImZsZXhpYmxlRGVmYXVsdCIsInJvb3RTdHlsZXMiLCJhZGp1c3RTdHlsZXMiLCJmb3VuZGF0aW9uIiwibW91bnRlZCIsIiRzZXQiLCJjbGFzc05hbWUiLCIkZGVsZXRlIiwiJHJlZnMiLCJyb290IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpbm5lcldpZHRoIiwicGFnZVlPZmZzZXQiLCJvZmZzZXRIZWlnaHQiLCJlbCIsInF1ZXJ5U2VsZWN0b3IiLCJ1bmRlZmluZWQiLCJldnREYXRhIiwicHJvcGVydHkiLCJ2YWx1ZSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJpbml0IiwiYmVmb3JlRGVzdHJveSIsImRlc3Ryb3kiLCJjbGFzc2VzIiwiYWxpZ25TdGFydCIsImFsaWduRW5kIiwic2hyaW5rVG9GaXQiLCJtaXhpbnMiLCJpY29uIiwibWRjVG9vbGJhciIsIm1kY1Rvb2xiYXJSb3ciLCJtZGNUb29sYmFyU2VjdGlvbiIsIm1kY1Rvb2xiYXJNZW51SWNvbiIsIm1kY1Rvb2xiYXJUaXRsZSIsIm1kY1Rvb2xiYXJJY29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7SUFDL0I7SUFDQSxNQUFJQyxPQUFPLElBQVg7SUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7SUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ3hDO0lBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7SUFDRDtJQUNELE1BQUlGLElBQUosRUFBVTtJQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7SUFDRDtJQUNGOztJQ1pNLFNBQVNNLFVBQVQsQ0FBb0JDLFVBQXBCLEVBQWdDO0lBQ3JDLFNBQU87SUFDTEMsYUFBUyxRQURKO0lBRUxDLGFBQVMscUJBQU07SUFDYixXQUFLLElBQUlDLEdBQVQsSUFBZ0JILFVBQWhCLEVBQTRCO0lBQzFCLFlBQUlJLFlBQVlKLFdBQVdHLEdBQVgsQ0FBaEI7SUFDQUUsV0FBR0QsU0FBSCxDQUFhQSxVQUFVRSxJQUF2QixFQUE2QkYsU0FBN0I7SUFDRDtJQUNGLEtBUEk7SUFRTEo7SUFSSyxHQUFQO0lBVUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
