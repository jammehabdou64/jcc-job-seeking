import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Laravel";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(
      `./Pages/${name}.vue`,
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/Login.vue": () => import("./assets/Login-ceYm5Lq8.mjs"), "./Pages/Auth/Register.vue": () => import("./assets/Register-KNxZxcAu.mjs"), "./Pages/Home.vue": () => import("./assets/Home-B5vBjcpP.mjs"), "./Pages/Index.vue": () => import("./assets/Index-DVmIFhL4.mjs") })
    ),
    setup: ({ App, props, plugin }) => createSSRApp({ render: () => h(App, props) }).use(plugin)
  }),
  { cluster: true }
);
