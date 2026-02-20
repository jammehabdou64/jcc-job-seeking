import { Route } from "jcc-express-mvc/Core";
import { JobController } from "@Controllers/JobController";
import { ProfileController } from "@Controllers/ProfileController";

Route.middleware("guest").get("/", (req, res) => {
  return res.inertia("Index");
});

Route.middleware(["auth"]).get("/dashboard", [JobController, "myJobs"]);

Route.prefix("/jobs")
  .controller(JobController)
  .group(() => {
    Route.get("/", "index");
    Route.middleware(["auth"]).get("/create", "create");
    Route.middleware(["auth"]).post("/", "store");
    Route.get("/{slug$job}", "show");
    Route.middleware(["auth"]).get("/{slug$job}/edit", "edit");
    Route.middleware(["auth"]).put("/{slug$job}", "update");
    Route.middleware(["auth"]).delete("/{slug$job}", "destroy");
    Route.middleware(["auth"]).post("/{slug$job}/save", "saveJob");
    Route.middleware(["auth"]).delete("/{slug$job}/save", "unsaveJob");
    Route.middleware(["auth"]).post("/{slug$job}/apply", "apply");
  });

Route.middleware(["auth"])
  .prefix("/profile")
  .controller(ProfileController)
  .group(() => {
    Route.get("/", "show");
    Route.get("/view/{user}", "viewUser");
    Route.put("/{user}", "update");
    Route.post("/{user}", "update"); // POST for file uploads (avatar)
    Route.put("/password/{user}", "updatePassword");
    Route.put("/notifications", "updateNotifications");
  });

Route.middleware(["auth"]).get("/home", (_req, res) => {
  return res.redirect(302, "/dashboard");
});

require("./auth");
