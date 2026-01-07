import { Route } from "jcc-express-mvc/Core";

Route.middleware("guest").get("/", (req, res) => {
  return res.inertia("Index");
});

Route.get("/dashboard", (req, res) => {
  return res.inertia("Dashboard");
});

Route.prefix("/jobs").group(() => {
  Route.get("/", (req, res) => {
    return res.inertia("Jobs/JobListings");
  });

  Route.get("/:id", (req, res) => {
    return res.inertia("Jobs/JobListings");
  });
});

Route.middleware(["auth"]).get("/home", (req, res, next) => {
  return res.inertia("Home");
});

require("./auth");
