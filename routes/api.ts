import { Route } from "jcc-express-mvc/Core";
import { JobController } from "@Controllers/JobController";
import { CategoriesController } from "@Controllers/CategoriesController";

Route.get("/", async function (req, res) {
  return res.json({ msg: "API is working" });
});

Route.resource("/categories", CategoriesController);

// Job routes
Route.prefix("/jobs").group(() => {
  // Public routes
  Route.get("/", [JobController, "index"]);
  Route.get("/{job}", [JobController, "show"]);

  // Protected routes (require authentication)
  Route.middleware(["auth"]).group(() => {
    Route.post("/", [JobController, "store"]);
    Route.put("/:id", [JobController, "update"]);
    Route.delete("/:id", [JobController, "destroy"]);
    Route.get("/my/jobs", [JobController, "myJobs"]);
  });
});
