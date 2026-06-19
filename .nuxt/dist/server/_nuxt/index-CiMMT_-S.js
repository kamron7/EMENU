import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "G:/EMENU/node_modules/hookable/dist/index.mjs";
import "G:/EMENU/node_modules/unctx/dist/index.mjs";
import "G:/EMENU/node_modules/h3/dist/index.mjs";
import "vue-router";
import "G:/EMENU/node_modules/radix3/dist/index.mjs";
import "G:/EMENU/node_modules/defu/dist/defu.mjs";
import "G:/EMENU/node_modules/ufo/dist/index.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<main${ssrRenderAttrs(_attrs)}><h1>eMenu</h1></main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-CiMMT_-S.js.map
