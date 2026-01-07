import { defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, resolveDynamicComponent, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { UsersIcon, ServerIcon, ClockIcon, BarChartIcon } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardTitle-Ct2_Z1z5.mjs";
import "./utils-H80jjgLf.mjs";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = usePage().props.auth || {};
    const stats = [
      {
        title: "Total Users",
        value: "1,234",
        change: "+12% from last month",
        icon: UsersIcon
      },
      {
        title: "API Requests",
        value: "45.2k",
        change: "+8% from last month",
        icon: ServerIcon
      },
      {
        title: "Response Time",
        value: "42ms",
        change: "-3ms from last month",
        icon: ClockIcon
      },
      {
        title: "Active Projects",
        value: "12",
        change: "+2 from last month",
        icon: BarChartIcon
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Welcome</title><meta name="description" content="Your page description"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Welcome"),
              createVNode("meta", {
                name: "description",
                content: "Your page description"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col min-h-screen"><div class="flex"><aside class="hidden md:flex w-64 flex-col h-screen bg-muted border-r"><div class="p-4 border-b"><h2 class="text-xl font-bold">Dashboard</h2></div><div class="p-4 border-t absolute bottom-0">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/logout",
        class: "text-gray-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Logout `);
          } else {
            return [
              createTextVNode(" Logout ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside><main class="flex-1 p-6 overflow-auto"><div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold">Welcome ${ssrInterpolate(unref(auth)?.name)}</h1>`);
      _push(ssrRenderComponent(unref(Link), { href: "/logout" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Logout `);
          } else {
            return [
              createTextVNode(" Logout ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6"><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          key: stat.title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(stat.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(stat.title), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(stat.icon), { class: "h-4 w-4 text-muted-foreground" }, null), _parent3, _scopeId2);
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), { class: "text-sm font-medium" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(stat.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      (openBlock(), createBlock(resolveDynamicComponent(stat.icon), { class: "h-4 w-4 text-muted-foreground" }))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stat.value)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(stat.change)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stat.value), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(stat.change), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between pb-2" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(stat.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    (openBlock(), createBlock(resolveDynamicComponent(stat.icon), { class: "h-4 w-4 text-muted-foreground" }))
                  ]),
                  _: 2
                }, 1024),
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stat.value), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(stat.change), 1)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></main></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
