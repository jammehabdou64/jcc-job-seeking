import { defineComponent, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$a } from "./Header-DU1dfe0y.mjs";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$6, e as _sfc_main$9 } from "./CardTitle-Ct2_Z1z5.mjs";
import { _ as _sfc_main$7, a as _sfc_main$8 } from "./Label-DS_aiBi9.mjs";
import "class-variance-authority";
import "./utils-H80jjgLf.mjs";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "@vueuse/core";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    const submit = () => {
      form.post("/auth/register");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Register</title><meta name="description" content="Your page description"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Register"),
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
      _push(`<div class="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "w-full max-w-md" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Create an account`);
                      } else {
                        return [
                          createTextVNode("Create an account")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Enter your information to create an account`);
                      } else {
                        return [
                          createTextVNode("Enter your information to create an account")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Create an account")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Enter your information to create an account")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<form${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "name",
                    placeholder: "John Doe",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (unref(form)?.errors?.name) {
                    _push3(`<small class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form)?.errors?.name)}</small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "email",
                    type: "email",
                    placeholder: "name@example.com",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (unref(form)?.errors?.email) {
                    _push3(`<small class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form)?.errors?.email)}</small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "password",
                    type: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (unref(form)?.errors?.password) {
                    _push3(`<small class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form)?.errors?.password)}</small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "confirm-password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Confirm Password`);
                      } else {
                        return [
                          createTextVNode("Confirm Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "confirm-password",
                    type: "password",
                    modelValue: unref(form).confirmPassword,
                    "onUpdate:modelValue": ($event) => unref(form).confirmPassword = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (unref(form)?.errors?.confirmPassword) {
                    _push3(`<small class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form)?.errors?.confirmPassword)}</small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "name" }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "name",
                        placeholder: "John Doe",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form)?.errors?.name ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form)?.errors?.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "email",
                        type: "email",
                        placeholder: "name@example.com",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form)?.errors?.email ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form)?.errors?.email), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "password",
                        type: "password",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form)?.errors?.password ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form)?.errors?.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "confirm-password" }, {
                        default: withCtx(() => [
                          createTextVNode("Confirm Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "confirm-password",
                        type: "password",
                        modelValue: unref(form).confirmPassword,
                        "onUpdate:modelValue": ($event) => unref(form).confirmPassword = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form)?.errors?.confirmPassword ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form)?.errors?.confirmPassword), 1)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$9), { class: "flex flex-col space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    type: "submit",
                    class: "w-full",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(form).processing ? "Creating account..." : "Register")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(form).processing ? "Creating account..." : "Register"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="text-center text-sm"${_scopeId2}> Already have an account? `);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/login",
                    class: "text-primary hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Login `);
                      } else {
                        return [
                          createTextVNode(" Login ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), {
                      type: "submit",
                      class: "w-full",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(form).processing ? "Creating account..." : "Register"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode("div", { class: "text-center text-sm" }, [
                      createTextVNode(" Already have an account? "),
                      createVNode(unref(Link), {
                        href: "/login",
                        class: "text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Login ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode(unref(_sfc_main$3), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Create an account")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createTextVNode("Enter your information to create an account")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "name" }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "name",
                        placeholder: "John Doe",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form)?.errors?.name ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form)?.errors?.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "email",
                        type: "email",
                        placeholder: "name@example.com",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form)?.errors?.email ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form)?.errors?.email), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "password",
                        type: "password",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form)?.errors?.password ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form)?.errors?.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "confirm-password" }, {
                        default: withCtx(() => [
                          createTextVNode("Confirm Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "confirm-password",
                        type: "password",
                        modelValue: unref(form).confirmPassword,
                        "onUpdate:modelValue": ($event) => unref(form).confirmPassword = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form)?.errors?.confirmPassword ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form)?.errors?.confirmPassword), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$9), { class: "flex flex-col space-y-4" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$a), {
                      type: "submit",
                      class: "w-full",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(form).processing ? "Creating account..." : "Register"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode("div", { class: "text-center text-sm" }, [
                      createTextVNode(" Already have an account? "),
                      createVNode(unref(Link), {
                        href: "/login",
                        class: "text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Login ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
