/**
* @module vue-mdc-adapterswitch 0.17.0
* @exports VueMDCSwitch
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCSwitch = factory());
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

  /* global CustomEvent */

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

  var mdcSwitch = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-switch-wrapper", class: { 'mdc-form-field': _vm.hasLabel, 'mdc-form-field--align-end': _vm.hasLabel && _vm.alignEnd } }, [_c('div', { staticClass: "mdc-switch", class: { 'mdc-switch--disabled': _vm.disabled } }, [_c('input', { ref: "control", staticClass: "mdc-switch__native-control", attrs: { "name": _vm.name, "id": _vm.vma_uid_, "disabled": _vm.disabled, "type": "checkbox" }, domProps: { "checked": _vm.checked }, on: { "change": _vm.onChanged } }), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _vm.hasLabel ? _c('label', { staticClass: "mdc-switch-label", attrs: { "for": _vm.vma_uid_ } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()]);
    }, staticRenderFns: [function () {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-switch__background" }, [_c('div', { staticClass: "mdc-switch__knob" })]);
    }],
    name: 'mdc-switch',
    mixins: [DispatchFocusMixin, VMAUniqueIdMixin],
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean,
      label: String,
      alignEnd: Boolean,
      disabled: Boolean,
      value: {
        type: String,
        default: function _default() {
          return 'on';
        }
      },
      name: String
    },
    computed: {
      hasLabel: function hasLabel() {
        return this.label || this.$slots.default;
      }
    },
    methods: {
      onChanged: function onChanged(event) {
        this.$emit('change', event.target.checked);
      }
    }
  };

  var plugin = BasePlugin({
    mdcSwitch: mdcSwitch
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1mb2N1cy1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS91bmlxdWVpZC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc3dpdGNoL21kYy1zd2l0Y2gudnVlIiwiLi4vLi4vY29tcG9uZW50cy9zd2l0Y2gvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3N3aXRjaC9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogdm0gPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfVxufVxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRm9jdXNNaXhpbiA9IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4geyBoYXNGb2N1czogZmFsc2UgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZVxuICAgIH0sXG4gICAgb25Gb2N1c0V2ZW50KCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksIDApXG4gICAgfSxcbiAgICBvbkJsdXJFdmVudCgpIHtcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxuICAgICAgLy8gYWxzbyBmaWx0dXIgYmx1ciBpZiBtb3VzZWRvd25cbiAgICAgIHRoaXMuX2FjdGl2ZSB8fCBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksIDApXG4gICAgfSxcbiAgICBkaXNwYXRjaEZvY3VzRXZlbnQoKSB7XG4gICAgICBsZXQgaGFzRm9jdXMgPVxuICAgICAgICB0aGlzLiRlbCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fFxuICAgICAgICB0aGlzLiRlbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KVxuICAgICAgaWYgKGhhc0ZvY3VzICE9IHRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy4kZW1pdChoYXNGb2N1cyA/ICdmb2N1cycgOiAnYmx1cicpXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBoYXNGb2N1c1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25CbHVyRXZlbnQpXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bilcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXG4gIH1cbn1cbiIsImNvbnN0IHNjb3BlID1cbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xuXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcbiAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxuICB9XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXZcbiAgICA6Y2xhc3M9XCJ7XG4gICAgICAnbWRjLWZvcm0tZmllbGQnOiBoYXNMYWJlbCxcbiAgICAgICdtZGMtZm9ybS1maWVsZC0tYWxpZ24tZW5kJzogaGFzTGFiZWwgJiYgYWxpZ25FbmRcbiAgICB9XCJcbiAgICBjbGFzcz1cIm1kYy1zd2l0Y2gtd3JhcHBlclwiID5cblxuICAgIDxkaXZcbiAgICAgIDpjbGFzcz1cInsnbWRjLXN3aXRjaC0tZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCJcbiAgICAgIGNsYXNzPVwibWRjLXN3aXRjaFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj1cImNvbnRyb2xcIlxuICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICA6aWQ9XCJ2bWFfdWlkX1wiXG4gICAgICAgIDpjaGVja2VkPVwiY2hlY2tlZFwiXG4gICAgICAgIDpkaXNhYmxlZD1cImRpc2FibGVkXCJcbiAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgY2xhc3M9XCJtZGMtc3dpdGNoX19uYXRpdmUtY29udHJvbFwiXG4gICAgICAgIEBjaGFuZ2U9XCJvbkNoYW5nZWRcIiA+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc3dpdGNoX19iYWNrZ3JvdW5kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc3dpdGNoX19rbm9iXCIvPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxsYWJlbFxuICAgICAgdi1pZj1cImhhc0xhYmVsXCJcbiAgICAgIDpmb3I9XCJ2bWFfdWlkX1wiXG4gICAgICBjbGFzcz1cIm1kYy1zd2l0Y2gtbGFiZWxcIj5cbiAgICAgIDxzbG90Pnt7IGxhYmVsIH19PC9zbG90PlxuICAgIDwvbGFiZWw+XG5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgRGlzcGF0Y2hGb2N1c01peGluLCBWTUFVbmlxdWVJZE1peGluIH0gZnJvbSAnLi4vYmFzZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXN3aXRjaCcsXG4gIG1peGluczogW0Rpc3BhdGNoRm9jdXNNaXhpbiwgVk1BVW5pcXVlSWRNaXhpbl0sXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ2NoZWNrZWQnLFxuICAgIGV2ZW50OiAnY2hhbmdlJ1xuICB9LFxuICBwcm9wczoge1xuICAgIGNoZWNrZWQ6IEJvb2xlYW4sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBhbGlnbkVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuICdvbidcbiAgICAgIH1cbiAgICB9LFxuICAgIG5hbWU6IFN0cmluZ1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGhhc0xhYmVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMubGFiZWwgfHwgdGhpcy4kc2xvdHMuZGVmYXVsdFxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uQ2hhbmdlZChldmVudCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZXZlbnQudGFyZ2V0LmNoZWNrZWQpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1N3aXRjaCBmcm9tICcuL21kYy1zd2l0Y2gudnVlJ1xuXG5leHBvcnQgeyBtZGNTd2l0Y2ggfVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjU3dpdGNoXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiRGlzcGF0Y2hGb2N1c01peGluIiwiZGF0YSIsImhhc0ZvY3VzIiwibWV0aG9kcyIsIm9uTW91c2VEb3duIiwiX2FjdGl2ZSIsIm9uTW91c2VVcCIsIm9uRm9jdXNFdmVudCIsInNldFRpbWVvdXQiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIiRlbCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJtb3VudGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJlZm9yZURlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIlZNQVVuaXF1ZUlkTWl4aW4iLCJiZWZvcmVDcmVhdGUiLCJ2bWFfdWlkXyIsIl91aWQiLCJyZW5kZXIiLCJtaXhpbnMiLCJtb2RlbCIsInByb3AiLCJldmVudCIsInByb3BzIiwiY2hlY2tlZCIsIkJvb2xlYW4iLCJsYWJlbCIsIlN0cmluZyIsImFsaWduRW5kIiwiZGlzYWJsZWQiLCJ2YWx1ZSIsInR5cGUiLCJkZWZhdWx0IiwiY29tcHV0ZWQiLCJoYXNMYWJlbCIs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
