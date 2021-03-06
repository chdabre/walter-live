/**
* @module vue-mdc-adaptericon 0.17.0
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

var mdcIcon = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { staticClass: "mdc-icon mdc-icon--material", class: { 'material-icons': !!_vm.icon } }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
  }, staticRenderFns: [],
  name: 'mdc-icon',
  props: {
    icon: String
  }
};

var index = BasePlugin({
  mdcIcon: mdcIcon
});

export default index;
export { mdcIcon };
//# sourceMappingURL=index.js.map
