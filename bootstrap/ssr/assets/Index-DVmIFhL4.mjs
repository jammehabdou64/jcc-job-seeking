import { defineComponent, resolveComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./Header-DU1dfe0y.mjs";
import { ArrowRightIcon, ServerIcon, LockClosedIcon, CircleStackIcon, CodeBracketIcon } from "@heroicons/vue/24/outline";
import "class-variance-authority";
import "./utils-H80jjgLf.mjs";
import "clsx";
import "tailwind-merge";
import "reka-ui";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Server = resolveComponent("Server");
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
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex flex-col min-h-screen"><section class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted"><div class="container mx-auto px-4 md:px-6"><div class="flex flex-col items-center space-y-4 text-center"><div class="space-y-2"><h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"> JCC Framework Simplified </h1><p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl"> A powerful, lightweight framework built on top of Express.js for faster development and better performance. </p></div><div class="space-x-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Get Started `);
                  _push3(ssrRenderComponent(unref(ArrowRightIcon), { class: "ml-2 h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Get Started "),
                    createVNode(unref(ArrowRightIcon), { class: "ml-2 h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createTextVNode(" Get Started "),
                  createVNode(unref(ArrowRightIcon), { class: "ml-2 h-4 w-4" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="https://github.com/jammehabdou64/new-jcc-express-mvc-app" target="_blank">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        variant: "outline",
        size: "lg",
        class: "secondary-button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Documentation `);
          } else {
            return [
              createTextVNode(" Documentation ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</a></div></div></div></section><section class="w-full py-12 md:py-24 lg:py-32 bg-background"><div class="container mx-auto px-4 md:px-6"><div class="flex flex-col items-center justify-center space-y-4 text-center"><div class="space-y-2"><h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"> Key Features </h2><p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl"> Everything you need to build modern web applications </p></div></div><div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">`);
      _push(ssrRenderComponent(unref(ServerIcon), { class: "h-12 w-12 text-primary" }, null, _parent));
      _push(`<h3 class="text-xl font-bold">Express Integration</h3><p class="text-center text-muted-foreground"> Seamlessly built on top of Express.js with enhanced features and simplified APIs. </p></div><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">`);
      _push(ssrRenderComponent(unref(LockClosedIcon), { class: "h-12 w-12 text-primary" }, null, _parent));
      _push(`<h3 class="text-xl font-bold">Authentication</h3><p class="text-center text-muted-foreground"> Built-in authentication system with secure user management. </p></div><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">`);
      _push(ssrRenderComponent(unref(CircleStackIcon), { class: "h-12 w-12 text-primary" }, null, _parent));
      _push(`<h3 class="text-xl font-bold">Database Abstraction</h3><p class="text-center text-muted-foreground"> Simple database integration with ORM-like features. </p></div><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">`);
      _push(ssrRenderComponent(unref(CodeBracketIcon), { class: "h-12 w-12 text-primary" }, null, _parent));
      _push(`<h3 class="text-xl font-bold">Middleware System</h3><p class="text-center text-muted-foreground"> Enhanced middleware system for better request handling. </p></div><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"><svg class="h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg><h3 class="text-xl font-bold">Performance Optimized</h3><p class="text-center text-muted-foreground"> Optimized for high performance and low latency applications. </p></div><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"><svg class="h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg><h3 class="text-xl font-bold">Security First</h3><p class="text-center text-muted-foreground"> Built with security best practices to protect your applications. </p></div></div></div></section><section class="w-full py-12 md:py-24 lg:py-32 bg-muted"><div class="container mx-auto px-4 md:px-6"><div class="flex flex-col items-center justify-center space-y-4 text-center"><div class="space-y-2"><h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"> Ready to Get Started? </h2><p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl"> Join thousands of developers building with our framework. </p></div><div class="space-x-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "primary-button" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign Up Now `);
                  _push3(ssrRenderComponent(unref(ArrowRightIcon), { class: "ml-2 h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Sign Up Now "),
                    createVNode(unref(ArrowRightIcon), { class: "ml-2 h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "primary-button" }, {
                default: withCtx(() => [
                  createTextVNode(" Sign Up Now "),
                  createVNode(unref(ArrowRightIcon), { class: "ml-2 h-4 w-4" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), { href: "/login" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "lg",
              class: "secondary-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Login`);
                } else {
                  return [
                    createTextVNode("Login")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), {
                variant: "outline",
                size: "lg",
                class: "secondary-button"
              }, {
                default: withCtx(() => [
                  createTextVNode("Login")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section><footer class="w-full py-6 bg-background border-t"><div class="container mx-auto px-4 md:px-6"><div class="flex flex-col items-center justify-center space-y-4 text-center"><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_Server, { class: "h-6 w-6" }, null, _parent));
      _push(`<span class="text-lg font-bold">JCC Framework</span></div><p class="text-sm text-muted-foreground"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Framework. All rights reserved. </p></div></div></footer></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
