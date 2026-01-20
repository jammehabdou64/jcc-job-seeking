import { Route } from "jcc-express-mvc/Core";
import { JobController } from "@Controllers/JobController";

Route.middleware("guest").get("/", (req, res) => {
  return res.inertia("Index");
});

Route.middleware(['auth']).get("/dashboard", [JobController, "myJobs"]);

Route.prefix("/jobs")
  .controller(JobController)
  .group(() => {
    Route.get("/", "index");
    Route.middleware(["auth"]).get("/create", "create");
    Route.middleware(["auth"]).post("/", "store");
    Route.get("/{job}", "show");
  });


// Route.middleware(["auth"]).get("/post-job", (req, res) => {
//   return res.inertia("Jobs/PostJob");
// });

Route.middleware(["auth"]).get("/profile", (req, res) => {
  return res.inertia("Profile");
});

Route.middleware(["auth"]).get("/home", (req, res, next) => {
  return res.inertia("Home");
});

require("./auth");
