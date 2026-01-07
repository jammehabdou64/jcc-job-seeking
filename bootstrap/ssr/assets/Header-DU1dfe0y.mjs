import { cva } from "class-variance-authority";
import { defineComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, createBlock, createVNode, openBlock, createTextVNode } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs } from "vue/server-renderer";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { Primitive } from "reka-ui";
import { Link } from "@inertiajs/vue3";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(unref(buttonVariants)({ variant: __props.variant, size: __props.size }), props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ui/button/Button.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded px-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="w-full h-16 border-b bg-white"><div class="container mx-auto flex h-full items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        class: "flex items-center space-x-2",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-server h-6 w-6"${_scopeId}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"${_scopeId}></rect><rect width="20" height="8" x="2" y="14" rx="2" ry="2"${_scopeId}></rect><line x1="6" x2="6.01" y1="6" y2="6"${_scopeId}></line><line x1="6" x2="6.01" y1="18" y2="18"${_scopeId}></line></svg><span class="font-bold"${_scopeId}>JCC Framework</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "lucide lucide-server h-6 w-6"
              }, [
                createVNode("rect", {
                  width: "20",
                  height: "8",
                  x: "2",
                  y: "2",
                  rx: "2",
                  ry: "2"
                }),
                createVNode("rect", {
                  width: "20",
                  height: "8",
                  x: "2",
                  y: "14",
                  rx: "2",
                  ry: "2"
                }),
                createVNode("line", {
                  x1: "6",
                  x2: "6.01",
                  y1: "6",
                  y2: "6"
                }),
                createVNode("line", {
                  x1: "6",
                  x2: "6.01",
                  y1: "18",
                  y2: "18"
                })
              ])),
              createVNode("span", { class: "font-bold" }, "JCC Framework")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="ml-auto flex gap-4 sm:gap-6"><a class="text-sm font-medium hover:underline underline-offset-4" href="https://github.com/jammehabdou64/new-jcc-express-mvc-app" target="_blank">Docs</a>`);
      _push(ssrRenderComponent(unref(Link), {
        class: "text-sm font-medium hover:underline underline-offset-4",
        href: "login"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Login`);
          } else {
            return [
              createTextVNode("Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        class: "text-sm font-medium hover:underline underline-offset-4",
        href: "/register"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Register`);
          } else {
            return [
              createTextVNode("Register")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div></header></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
