/**
* @module vue-mdc-adapterlayout-grid 0.17.0
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

/* global CustomEvent */

var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

var mdcLayoutGrid = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_c('div', { staticClass: "mdc-layout-grid__inner" }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'mdc-layout-grid',
  props: {
    'fixed-column-width': Boolean,
    'align-left': Boolean,
    'align-right': Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'mdc-layout-grid': true,
        'mdc-layout-grid--fixed-column-width': this.fixedColumnWidth,
        'mdc-layout-grid--align-left': this.alignLeft,
        'mdc-layout-grid--align-right': this.alignRight
      };
    }
  }
};

var spanOptions = {
  type: [String, Number],
  default: null,
  validator: function validator(value) {
    var num = Number(value);
    return isFinite(num) && num <= 12 && num > 0;
  }
};

var mdcLayoutCell = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-cell mdc-layout-grid__cell", class: _vm.classes }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-layout-cell',
  props: {
    span: spanOptions,
    order: spanOptions,
    phone: spanOptions,
    tablet: spanOptions,
    desktop: spanOptions,
    align: {
      type: String,
      validator: function validator(value) {
        return ['top', 'bottom', 'middle'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    classes: function classes() {
      var classes = [];

      if (this.span) {
        classes.push("mdc-layout-grid__cell--span-" + this.span);
      }

      if (this.order) {
        classes.push("mdc-layout-grid__cell--order-" + this.order);
      }

      if (this.phone) {
        classes.push("mdc-layout-grid__cell--span-" + this.phone + "-phone");
      }

      if (this.tablet) {
        classes.push("mdc-layout-grid__cell--span-" + this.tablet + "-tablet");
      }

      if (this.desktop) {
        classes.push("mdc-layout-grid__cell--span-" + this.desktop + "-desktop");
      }

      if (this.align) {
        classes.push("mdc-layout-grid__cell--align-" + this.align);
      }

      return classes;
    }
  }
};

var mdcLayoutInnerGrid = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-inner-grid mdc-layout-grid__inner" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-layout-inner-grid'
};

var index = BasePlugin({
  mdcLayoutGrid: mdcLayoutGrid,
  mdcLayoutCell: mdcLayoutCell,
  mdcLayoutInnerGrid: mdcLayoutInnerGrid
});

export default index;
export { mdcLayoutGrid, mdcLayoutCell, mdcLayoutInnerGrid };
//# sourceMappingURL=index.js.map
