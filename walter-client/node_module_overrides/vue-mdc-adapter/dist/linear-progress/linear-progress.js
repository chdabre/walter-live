/**
* @module vue-mdc-adapterlinear-progress 0.17.0
* @exports VueMDCLinearProgress
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCLinearProgress = factory());
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

    // Public functions to access getAnimationName() for JavaScript events or CSS
    // property names.

    var transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

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
      CLOSED_CLASS: 'mdc-linear-progress--closed',
      INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
      REVERSED_CLASS: 'mdc-linear-progress--reversed'
    };

    var strings = {
      PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
      BUFFER_SELECTOR: '.mdc-linear-progress__buffer'
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

    var MDCLinearProgressFoundation = function (_MDCFoundation) {
      inherits(MDCLinearProgressFoundation, _MDCFoundation);
      createClass(MDCLinearProgressFoundation, null, [{
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
            getPrimaryBar: function getPrimaryBar() /* el: Element */{},
            getBuffer: function getBuffer() /* el: Element */{},
            hasClass: function hasClass() {
              return (/* className: string */false
              );
            },
            removeClass: function removeClass() /* className: string */{},
            setStyle: function setStyle() /* el: Element, styleProperty: string, value: string */{}
          };
        }
      }]);

      function MDCLinearProgressFoundation(adapter) {
        classCallCheck(this, MDCLinearProgressFoundation);
        return possibleConstructorReturn(this, (MDCLinearProgressFoundation.__proto__ || Object.getPrototypeOf(MDCLinearProgressFoundation)).call(this, _extends(MDCLinearProgressFoundation.defaultAdapter, adapter)));
      }

      createClass(MDCLinearProgressFoundation, [{
        key: 'init',
        value: function init() {
          this.determinate_ = !this.adapter_.hasClass(cssClasses.INDETERMINATE_CLASS);
          this.reverse_ = this.adapter_.hasClass(cssClasses.REVERSED_CLASS);
          this.progress_ = 0;
        }
      }, {
        key: 'setDeterminate',
        value: function setDeterminate(isDeterminate) {
          this.determinate_ = isDeterminate;
          if (this.determinate_) {
            this.adapter_.removeClass(cssClasses.INDETERMINATE_CLASS);
            this.setScale_(this.adapter_.getPrimaryBar(), this.progress_);
          } else {
            this.adapter_.addClass(cssClasses.INDETERMINATE_CLASS);
            this.setScale_(this.adapter_.getPrimaryBar(), 1);
            this.setScale_(this.adapter_.getBuffer(), 1);
          }
        }
      }, {
        key: 'setProgress',
        value: function setProgress(value) {
          this.progress_ = value;
          if (this.determinate_) {
            this.setScale_(this.adapter_.getPrimaryBar(), value);
          }
        }
      }, {
        key: 'setBuffer',
        value: function setBuffer(value) {
          if (this.determinate_) {
            this.setScale_(this.adapter_.getBuffer(), value);
          }
        }
      }, {
        key: 'setReverse',
        value: function setReverse(isReversed) {
          this.reverse_ = isReversed;
          if (this.reverse_) {
            this.adapter_.addClass(cssClasses.REVERSED_CLASS);
          } else {
            this.adapter_.removeClass(cssClasses.REVERSED_CLASS);
          }
        }
      }, {
        key: 'open',
        value: function open() {
          this.adapter_.removeClass(cssClasses.CLOSED_CLASS);
        }
      }, {
        key: 'close',
        value: function close() {
          this.adapter_.addClass(cssClasses.CLOSED_CLASS);
        }
      }, {
        key: 'setScale_',
        value: function setScale_(el, scaleValue) {
          var _this2 = this;

          var value = 'scaleX(' + scaleValue + ')';
          transformStyleProperties.forEach(function (transformStyleProperty) {
            _this2.adapter_.setStyle(el, transformStyleProperty, value);
          });
        }
      }]);
      return MDCLinearProgressFoundation;
    }(MDCFoundation);

    var ProgressPropType = {
      type: [Number, String],
      validator: function validator(value) {
        return Number(value) >= 0 && Number(value) <= 1;
      }
    };

    var mdcLinearProgress = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-linear-progress", class: _vm.classes, style: _vm.styles, attrs: { "role": "progressbar" } }, [_c('div', { staticClass: "mdc-linear-progress__buffering-dots" }), _vm._v(" "), _c('div', { ref: "buffer", staticClass: "mdc-linear-progress__buffer" }), _vm._v(" "), _c('div', { ref: "primary", staticClass: "mdc-linear-progress__bar mdc-linear-progress__primary-bar" }, [_c('span', { staticClass: "mdc-linear-progress__bar-inner" })]), _vm._v(" "), _vm._m(0)]);
      }, staticRenderFns: [function () {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar" }, [_c('span', { staticClass: "mdc-linear-progress__bar-inner" })]);
      }],
      name: 'mdc-linear-progress',
      props: {
        open: { type: Boolean, default: true },
        indeterminate: Boolean,
        reverse: Boolean,
        accent: Boolean,
        progress: ProgressPropType,
        buffer: ProgressPropType
      },
      data: function data() {
        return {
          classes: { 'mdc-linear-progress--accent': this.accent },
          styles: {}
        };
      },

      watch: {
        open: function open() {
          if (this.open) {
            this.foundation.open();
          } else {
            this.foundation.close();
          }
        },
        progress: function progress() {
          this.foundation.setProgress(Number(this.progress));
        },
        buffer: function buffer() {
          this.foundation.setBuffer(Number(this.buffer));
        },
        indeterminate: function indeterminate() {
          this.foundation.setDeterminate(!this.indeterminate);
        },
        reverse: function reverse() {
          this.foundation.setReverse(this.reverse);
        }
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCLinearProgressFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.classes, className, true);
          },
          getPrimaryBar: function getPrimaryBar() /* el: Element */{
            return _this.$refs.primary;
          },
          getBuffer: function getBuffer() /* el: Element */{
            return _this.$refs.buffer;
          },
          hasClass: function hasClass(className) {
            _this.$el.classList.contains(className);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.classes, className);
          },
          setStyle: function setStyle(el, styleProperty, value) {
            el.style[styleProperty] = value;
          }
        });
        this.foundation.init();

        this.foundation.setReverse(this.reverse);
        this.foundation.setProgress(Number(this.progress));
        this.foundation.setBuffer(Number(this.buffer));
        this.foundation.setDeterminate(!this.indeterminate);
        if (this.open) {
          this.foundation.open();
        } else {
          this.foundation.close();
        }
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
      }
    };

    var plugin = BasePlugin({
      mdcLinearProgress: mdcLinearProgress
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLXByb2dyZXNzLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS91bmlxdWVpZC1taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYW5pbWF0aW9uL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lYXItcHJvZ3Jlc3MvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lYXItcHJvZ3Jlc3MvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvbGluZWFyLXByb2dyZXNzL21kYy1saW5lYXItcHJvZ3Jlc3MudnVlIiwiLi4vLi4vY29tcG9uZW50cy9saW5lYXItcHJvZ3Jlc3MvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2xpbmVhci1wcm9ncmVzcy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogdm0gPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfVxufVxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiY29uc3Qgc2NvcGUgPVxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXG5cbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xuICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCB7TURDRm91bmRhdGlvbiwgTURDQ29tcG9uZW50fTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIG5vUHJlZml4OiBzdHJpbmcsXG4gKiAgIHdlYmtpdFByZWZpeDogc3RyaW5nLFxuICogICBzdHlsZVByb3BlcnR5OiBzdHJpbmdcbiAqIH19XG4gKi9cbmxldCBWZW5kb3JQcm9wZXJ0eU1hcFR5cGU7XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgZXZlbnRUeXBlTWFwID0ge1xuICAnYW5pbWF0aW9uc3RhcnQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25zdGFydCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uU3RhcnQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uaXRlcmF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25JdGVyYXRpb24nLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNpdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICd0cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgY3NzUHJvcGVydHlNYXAgPSB7XG4gICdhbmltYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zZm9ybSc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zZm9ybScsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2Zvcm0nLFxuICB9LFxuICAndHJhbnNpdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHtcbiAgcmV0dXJuICh3aW5kb3dPYmpbJ2RvY3VtZW50J10gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10gPT09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSB7XG4gIHJldHVybiAoZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCB8fCBldmVudFR5cGUgaW4gY3NzUHJvcGVydHlNYXApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSBtYXBcbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKSB7XG4gIHJldHVybiBtYXBbZXZlbnRUeXBlXS5zdHlsZVByb3BlcnR5IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGRldGVybWluZSBicm93c2VyIHByZWZpeCBmb3IgQ1NTMyBhbmltYXRpb24gZXZlbnRzXG4gKiBhbmQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIGlmICghaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB8fCAhZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpKSB7XG4gICAgcmV0dXJuIGV2ZW50VHlwZTtcbiAgfVxuXG4gIGNvbnN0IG1hcCA9IC8qKiBAdHlwZSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqLyAoXG4gICAgZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCA/IGV2ZW50VHlwZU1hcCA6IGNzc1Byb3BlcnR5TWFwXG4gICk7XG4gIGNvbnN0IGVsID0gd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10oJ2RpdicpO1xuICBsZXQgZXZlbnROYW1lID0gJyc7XG5cbiAgaWYgKG1hcCA9PT0gZXZlbnRUeXBlTWFwKSB7XG4gICAgZXZlbnROYW1lID0gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50TmFtZSA9IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG4gIH1cblxuICByZXR1cm4gZXZlbnROYW1lO1xufVxuXG4vLyBQdWJsaWMgZnVuY3Rpb25zIHRvIGFjY2VzcyBnZXRBbmltYXRpb25OYW1lKCkgZm9yIEphdmFTY3JpcHQgZXZlbnRzIG9yIENTU1xuLy8gcHJvcGVydHkgbmFtZXMuXG5cbmNvbnN0IHRyYW5zZm9ybVN0eWxlUHJvcGVydGllcyA9IFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdNU1RyYW5zZm9ybSddO1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RFdmVudE5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG5leHBvcnQge3RyYW5zZm9ybVN0eWxlUHJvcGVydGllcywgZ2V0Q29ycmVjdEV2ZW50TmFtZSwgZ2V0Q29ycmVjdFByb3BlcnR5TmFtZX07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgQ0xPU0VEX0NMQVNTOiAnbWRjLWxpbmVhci1wcm9ncmVzcy0tY2xvc2VkJyxcbiAgSU5ERVRFUk1JTkFURV9DTEFTUzogJ21kYy1saW5lYXItcHJvZ3Jlc3MtLWluZGV0ZXJtaW5hdGUnLFxuICBSRVZFUlNFRF9DTEFTUzogJ21kYy1saW5lYXItcHJvZ3Jlc3MtLXJldmVyc2VkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBQUklNQVJZX0JBUl9TRUxFQ1RPUjogJy5tZGMtbGluZWFyLXByb2dyZXNzX19wcmltYXJ5LWJhcicsXG4gIEJVRkZFUl9TRUxFQ1RPUjogJy5tZGMtbGluZWFyLXByb2dyZXNzX19idWZmZXInLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7TURDRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvaW5kZXgnO1xuaW1wb3J0IHt0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXN9IGZyb20gJ0BtYXRlcmlhbC9hbmltYXRpb24vaW5kZXgnO1xuXG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZ2V0UHJpbWFyeUJhcjogKCkgPT4gLyogZWw6IEVsZW1lbnQgKi8ge30sXG4gICAgICBnZXRCdWZmZXI6ICgpID0+IC8qIGVsOiBFbGVtZW50ICovIHt9LFxuICAgICAgaGFzQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4gZmFsc2UsXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlOiAoLyogZWw6IEVsZW1lbnQsIHN0eWxlUHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmRldGVybWluYXRlXyA9ICF0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuSU5ERVRFUk1JTkFURV9DTEFTUyk7XG4gICAgdGhpcy5yZXZlcnNlXyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5SRVZFUlNFRF9DTEFTUyk7XG4gICAgdGhpcy5wcm9ncmVzc18gPSAwO1xuICB9XG5cbiAgc2V0RGV0ZXJtaW5hdGUoaXNEZXRlcm1pbmF0ZSkge1xuICAgIHRoaXMuZGV0ZXJtaW5hdGVfID0gaXNEZXRlcm1pbmF0ZTtcbiAgICBpZiAodGhpcy5kZXRlcm1pbmF0ZV8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5JTkRFVEVSTUlOQVRFX0NMQVNTKTtcbiAgICAgIHRoaXMuc2V0U2NhbGVfKHRoaXMuYWRhcHRlcl8uZ2V0UHJpbWFyeUJhcigpLCB0aGlzLnByb2dyZXNzXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5JTkRFVEVSTUlOQVRFX0NMQVNTKTtcbiAgICAgIHRoaXMuc2V0U2NhbGVfKHRoaXMuYWRhcHRlcl8uZ2V0UHJpbWFyeUJhcigpLCAxKTtcbiAgICAgIHRoaXMuc2V0U2NhbGVfKHRoaXMuYWRhcHRlcl8uZ2V0QnVmZmVyKCksIDEpO1xuICAgIH1cbiAgfVxuXG4gIHNldFByb2dyZXNzKHZhbHVlKSB7XG4gICAgdGhpcy5wcm9ncmVzc18gPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5kZXRlcm1pbmF0ZV8pIHtcbiAgICAgIHRoaXMuc2V0U2NhbGVfKHRoaXMuYWRhcHRlcl8uZ2V0UHJpbWFyeUJhcigpLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0QnVmZmVyKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGV0ZXJtaW5hdGVfKSB7XG4gICAgICB0aGlzLnNldFNjYWxlXyh0aGlzLmFkYXB0ZXJfLmdldEJ1ZmZlcigpLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0UmV2ZXJzZShpc1JldmVyc2VkKSB7XG4gICAgdGhpcy5yZXZlcnNlXyA9IGlzUmV2ZXJzZWQ7XG4gICAgaWYgKHRoaXMucmV2ZXJzZV8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5SRVZFUlNFRF9DTEFTUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5SRVZFUlNFRF9DTEFTUyk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuQ0xPU0VEX0NMQVNTKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5DTE9TRURfQ0xBU1MpO1xuICB9XG5cbiAgc2V0U2NhbGVfKGVsLCBzY2FsZVZhbHVlKSB7XG4gICAgY29uc3QgdmFsdWUgPSAnc2NhbGVYKCcgKyBzY2FsZVZhbHVlICsgJyknO1xuICAgIHRyYW5zZm9ybVN0eWxlUHJvcGVydGllcy5mb3JFYWNoKCh0cmFuc2Zvcm1TdHlsZVByb3BlcnR5KSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKGVsLCB0cmFuc2Zvcm1TdHlsZVByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXG4gICAgOnN0eWxlPVwic3R5bGVzXCIgXG4gICAgcm9sZT1cInByb2dyZXNzYmFyXCIgXG4gICAgY2xhc3M9XCJtZGMtbGluZWFyLXByb2dyZXNzXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1saW5lYXItcHJvZ3Jlc3NfX2J1ZmZlcmluZy1kb3RzXCIvPlxuICAgIDxkaXYgXG4gICAgICByZWY9XCJidWZmZXJcIiBcbiAgICAgIGNsYXNzPVwibWRjLWxpbmVhci1wcm9ncmVzc19fYnVmZmVyXCIvPlxuICAgIDxkaXYgXG4gICAgICByZWY9XCJwcmltYXJ5XCIgXG4gICAgICBjbGFzcz1cIm1kYy1saW5lYXItcHJvZ3Jlc3NfX2JhciBtZGMtbGluZWFyLXByb2dyZXNzX19wcmltYXJ5LWJhclwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtZGMtbGluZWFyLXByb2dyZXNzX19iYXItaW5uZXJcIi8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1saW5lYXItcHJvZ3Jlc3NfX2JhciBtZGMtbGluZWFyLXByb2dyZXNzX19zZWNvbmRhcnktYmFyXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1kYy1saW5lYXItcHJvZ3Jlc3NfX2Jhci1pbm5lclwiLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+ICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9saW5lYXItcHJvZ3Jlc3MvZm91bmRhdGlvbidcblxuY29uc3QgUHJvZ3Jlc3NQcm9wVHlwZSA9IHtcbiAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgdmFsaWRhdG9yKHZhbHVlKSB7XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZSkgPj0gMCAmJiBOdW1iZXIodmFsdWUpIDw9IDFcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtbGluZWFyLXByb2dyZXNzJyxcbiAgcHJvcHM6IHtcbiAgICBvcGVuOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfSxcbiAgICBpbmRldGVybWluYXRlOiBCb29sZWFuLFxuICAgIHJldmVyc2U6IEJvb2xlYW4sXG4gICAgYWNjZW50OiBCb29sZWFuLFxuICAgIHByb2dyZXNzOiBQcm9ncmVzc1Byb3BUeXBlLFxuICAgIGJ1ZmZlcjogUHJvZ3Jlc3NQcm9wVHlwZVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7ICdtZGMtbGluZWFyLXByb2dyZXNzLS1hY2NlbnQnOiB0aGlzLmFjY2VudCB9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBvcGVuKCkge1xuICAgICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24ub3BlbigpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24uY2xvc2UoKVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvZ3Jlc3MoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0UHJvZ3Jlc3MoTnVtYmVyKHRoaXMucHJvZ3Jlc3MpKVxuICAgIH0sXG4gICAgYnVmZmVyKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldEJ1ZmZlcihOdW1iZXIodGhpcy5idWZmZXIpKVxuICAgIH0sXG4gICAgaW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXREZXRlcm1pbmF0ZSghdGhpcy5pbmRldGVybWluYXRlKVxuICAgIH0sXG4gICAgcmV2ZXJzZSgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRSZXZlcnNlKHRoaXMucmV2ZXJzZSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgfSxcbiAgICAgIGdldFByaW1hcnlCYXI6ICgpID0+IC8qIGVsOiBFbGVtZW50ICovIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMucHJpbWFyeVxuICAgICAgfSxcbiAgICAgIGdldEJ1ZmZlcjogKCkgPT4gLyogZWw6IEVsZW1lbnQgKi8ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5idWZmZXJcbiAgICAgIH0sXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIHNldFN0eWxlOiAoZWwsIHN0eWxlUHJvcGVydHksIHZhbHVlKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlW3N0eWxlUHJvcGVydHldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcblxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXRSZXZlcnNlKHRoaXMucmV2ZXJzZSlcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0UHJvZ3Jlc3MoTnVtYmVyKHRoaXMucHJvZ3Jlc3MpKVxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXRCdWZmZXIoTnVtYmVyKHRoaXMuYnVmZmVyKSlcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGV0ZXJtaW5hdGUoIXRoaXMuaW5kZXRlcm1pbmF0ZSlcbiAgICBpZiAodGhpcy5vcGVuKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24ub3BlbigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXG4gICAgfVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNMaW5lYXJQcm9ncmVzcyBmcm9tICcuL21kYy1saW5lYXItcHJvZ3Jlc3MudnVlJ1xuXG5leHBvcnQgeyBtZGNMaW5lYXJQcm9ncmVzcyB9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNMaW5lYXJQcm9ncmVzc1xufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDQ29tcG9uZW50Iiwicm9vdCIsImZvdW5kYXRpb24iLCJ1bmRlZmluZWQiLCJyb290XyIsImFyZ3MiLCJpbml0aWFsaXplIiwiZm91bmRhdGlvbl8iLCJnZXREZWZhdWx0Rm91bmRhdGlvbiIsImluaXQiLCJpbml0aWFsU3luY1dpdGhET00iLCJFcnJvciIsImRlc3Ryb3kiLCJldnRUeXBlIiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiYnViYmxlcyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwidHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzIiwiY3NzQ2xhc3NlcyIsIkNMT1NFRF9DTEFTUyIsIklOREVURVJNSU5BVEVfQ0xBU1MiLCJSRVZFUlNFRF9DTEFTUyIsInN0cmluZ3MiLCJQUklNQVJZX0JBUl9TRUxFQ1RPUiIsIkJVRkZFUl9TRUxFQ1RPUiIsIk1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbiIsImFkZENsYXNzIiwiZ2V0UHJpbWFyeUJhciIsImdldEJ1ZmZlciIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZXRTdHlsZSIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiZGVmYXVsdEFkYXB0ZXIiLCJkZXRlcm1pbmF0ZV8iLCJyZXZlcnNlXyIsInByb2dyZXNzXyIsImlzRGV0ZXJtaW5hdGUiLCJzZXRTY2FsZV8iLCJ2YWx1ZSIsImlzUmV2ZXJzZWQiLCJlbCIsInNjYWxlVmFsdWUiLCJmb3JFYWNoIiwidHJhbnNmb3JtU3R5bGVQcm9wZXJ0eSIsIlByb2dyZXNzUHJvcFR5cGUiLCJ0eXBlIiwiTnVtYmVyIiwiU3RyaW5nIiwidmFsaWRhdG9yIiwicmVuZGVyIiwicHJvcHMiLCJvcGVuIiwiQm9vbGVhbiIsImRlZmF1bHQiLCJpbmRldGVybWluYXRlIiwicmV2ZXJzZSIsImFjY2VudCIsInByb2dyZXNzIiwiYnVmZmVyIiwiZGF0YSIsImNsYXNzZXMiLCJzdHlsZXMiLCJ3YXRjaCIsImNsb3NlIiwic2V0UHJvZ3Jlc3MiLCJzZXRCdWZmZXIiLCJzZXREZXRlcm1pbmF0ZSIsInNldFJldmVyc2UiLCJtb3VudGVkIiwiJHNldCIsImNsYXNzTmFtZSIsIiRyZWZzIiwicHJpbWFyeSIsIiRlbCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiJGRlbGV0ZSIsInN0eWxlUHJvcGVydHkiLCJzdHlsZSIsImJlZm9yZURlc3Ryb3kiLCJtZGNMaW5lYXJQcm9ncmVzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0lBQy9CO0lBQ0EsTUFBSUMsT0FBTyxJQUFYO0lBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0lBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUN4QztJQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0lBQ0Q7SUFDRCxNQUFJRixJQUFKLEVBQVU7SUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0lBQ0Q7SUFDRjs7SUNaTSxTQUFTTSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztJQUNyQyxTQUFPO0lBQ0xDLGFBQVMsUUFESjtJQUVMQyxhQUFTLHFCQUFNO0lBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCSCxVQUFoQixFQUE0QjtJQUMxQixZQUFJSSxZQUFZSixXQUFXRyxHQUFYLENBQWhCO0lBQ0FFLFdBQUdELFNBQUgsQ0FBYUEsVUFBVUUsSUFBdkIsRUFBNkJGLFNBQTdCO0lBQ0Q7SUFDRixLQVBJO0lB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
