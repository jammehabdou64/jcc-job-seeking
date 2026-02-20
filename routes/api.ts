import { Route } from "jcc-express-mvc/Core";
import { JobController } from "@Controllers/JobController";
import { CategoriesController } from "@Controllers/CategoriesController";

// Route.resource("/categories", CategoriesController);

// Job routes
Route.prefix("/jobs").group(() => {
  // Public routes
  Route.get("/", [JobController, "index"]);
  Route.get("/{job}", [JobController, "show"]);

  // Protected routes (require authentication)
  // Route.middleware(["auth"]).group(() => {
  Route.post("/", [JobController, "store"]);
  Route.put("/{job}", [JobController, "update"]);
  Route.delete("/{job}", [JobController, "destroy"]);
  Route.get("/my/jobs", [JobController, "myJobs"]);
  // });
});
